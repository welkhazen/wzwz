alter table public.avatar_catalog
  add column if not exists rarity text not null default 'common'
    constraint avatar_catalog_rarity_check check (
      rarity in ('common','uncommon','rare','epic','legendary','mythic','exotic','gold','platinum')
    ),
  add column if not exists drop_weight integer not null default 100
    constraint avatar_catalog_drop_weight_check check (drop_weight >= 1);
