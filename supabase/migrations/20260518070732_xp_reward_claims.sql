CREATE TABLE IF NOT EXISTS public.user_xp_claims (
  id          UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID NOT NULL,
  source      TEXT NOT NULL,
  claim_key   TEXT NOT NULL,
  amount      INTEGER NOT NULL CONSTRAINT user_xp_claims_amount_check CHECK (amount >= 0),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, source, claim_key)
);

ALTER TABLE public.user_xp_claims ENABLE ROW LEVEL SECURITY;

CREATE POLICY "user_xp_claims_select_own" ON public.user_xp_claims
  FOR SELECT USING (auth.uid() = user_id);

GRANT SELECT ON public.user_xp_claims TO anon, authenticated;

CREATE OR REPLACE FUNCTION public.award_xp_once(
  p_user_id UUID,
  p_source TEXT,
  p_claim_key TEXT,
  p_amount INTEGER
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_claim_id UUID;
  v_award JSON;
  v_progress public.user_progress%ROWTYPE;
BEGIN
  INSERT INTO public.user_xp_claims (user_id, source, claim_key, amount)
  VALUES (p_user_id, p_source, p_claim_key, GREATEST(0, p_amount))
  ON CONFLICT (user_id, source, claim_key) DO NOTHING
  RETURNING id INTO v_claim_id;

  IF v_claim_id IS NULL THEN
    SELECT * INTO v_progress
    FROM public.user_progress
    WHERE user_id = p_user_id;

    IF NOT FOUND THEN
      INSERT INTO public.user_progress (user_id)
      VALUES (p_user_id)
      ON CONFLICT (user_id) DO NOTHING;

      SELECT * INTO v_progress
      FROM public.user_progress
      WHERE user_id = p_user_id;
    END IF;

    RETURN json_build_object(
      'xp', v_progress.xp,
      'level', v_progress.level,
      'leveled_up', false,
      'awarded', false
    );
  END IF;

  v_award := public.award_xp(p_user_id, p_amount);

  RETURN json_build_object(
    'xp', (v_award->>'xp')::INTEGER,
    'level', (v_award->>'level')::INTEGER,
    'leveled_up', (v_award->>'leveled_up')::BOOLEAN,
    'awarded', true
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.award_xp_once(UUID, TEXT, TEXT, INTEGER) TO anon, authenticated;

CREATE OR REPLACE FUNCTION public.get_user_progress(p_user_id UUID)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_progress public.user_progress%ROWTYPE;
BEGIN
  INSERT INTO public.user_progress (user_id)
  VALUES (p_user_id)
  ON CONFLICT (user_id) DO NOTHING;

  SELECT * INTO v_progress
  FROM public.user_progress
  WHERE user_id = p_user_id;

  RETURN json_build_object(
    'xp', v_progress.xp,
    'level', v_progress.level,
    'total_polls_answered', v_progress.total_polls_answered,
    'streak_days', v_progress.streak_days
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.get_user_xp_claim_keys(p_user_id UUID, p_source TEXT)
RETURNS TEXT[]
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN ARRAY(
    SELECT claim_key
    FROM public.user_xp_claims
    WHERE user_id = p_user_id
      AND source = p_source
    ORDER BY created_at DESC
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_user_progress(UUID) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_user_xp_claim_keys(UUID, TEXT) TO anon, authenticated;

-- Larger XP curve: level 10 now requires 50,000 XP.
CREATE OR REPLACE FUNCTION public.calculate_level(xp_amount INTEGER)
RETURNS INTEGER
LANGUAGE plpgsql
IMMUTABLE
SET search_path = public
AS $$
BEGIN
  IF xp_amount >= 50000 THEN RETURN 10;
  ELSIF xp_amount >= 38000 THEN RETURN 9;
  ELSIF xp_amount >= 28000 THEN RETURN 8;
  ELSIF xp_amount >= 19000 THEN RETURN 7;
  ELSIF xp_amount >= 12000 THEN RETURN 6;
  ELSIF xp_amount >= 7000  THEN RETURN 5;
  ELSIF xp_amount >= 3500  THEN RETURN 4;
  ELSIF xp_amount >= 1500  THEN RETURN 3;
  ELSIF xp_amount >= 500   THEN RETURN 2;
  ELSE RETURN 1;
  END IF;
END;
$$;

CREATE OR REPLACE FUNCTION public.xp_for_level(target_level INTEGER)
RETURNS INTEGER
LANGUAGE plpgsql
IMMUTABLE
SET search_path = public
AS $$
BEGIN
  CASE target_level
    WHEN 1  THEN RETURN 0;
    WHEN 2  THEN RETURN 500;
    WHEN 3  THEN RETURN 1500;
    WHEN 4  THEN RETURN 3500;
    WHEN 5  THEN RETURN 7000;
    WHEN 6  THEN RETURN 12000;
    WHEN 7  THEN RETURN 19000;
    WHEN 8  THEN RETURN 28000;
    WHEN 9  THEN RETURN 38000;
    WHEN 10 THEN RETURN 50000;
    ELSE RETURN 999999;
  END CASE;
END;
$$;
