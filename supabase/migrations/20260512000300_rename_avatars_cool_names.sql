-- Rename all avatars from generic "Avatar N" labels to thematic cool names.
-- Groups are based on image set and color palette:
--   avatar-1..10     : original SVG avatars
--   img_4395_0_*     : electric blue tech squad
--   img_4395_1_*     : violet phantom squad
--   img_4395_2_*     : toxic green squad
--   img_4395_3_*     : inferno orange squad
--   img_4756_2_*     : neon magenta squad
--   img_4756_3_*     : arctic cyan squad
--   img_4764_1_*     : solar gold squad

UPDATE avatar_catalog SET name = CASE id
  -- Original 10 SVG avatars
  WHEN 'avatar-1'  THEN 'Cyborg Prime'
  WHEN 'avatar-2'  THEN 'Chrome Ghost'
  WHEN 'avatar-3'  THEN 'Iron Specter'
  WHEN 'avatar-4'  THEN 'Steampunk Drake'
  WHEN 'avatar-5'  THEN 'Solar Enforcer'
  WHEN 'avatar-6'  THEN 'Neon Oracle'
  WHEN 'avatar-7'  THEN 'Void Phantom'
  WHEN 'avatar-8'  THEN 'Copper Wraith'
  WHEN 'avatar-9'  THEN 'Inferno Shade'
  WHEN 'avatar-10' THEN 'Golden Reaper'

  -- Electric blue tech squad (img_4395_0)
  WHEN 'img_4395_0_avatar_01_60x60' THEN 'Volt Edge'
  WHEN 'img_4395_0_avatar_02_60x60' THEN 'Neon Striker'
  WHEN 'img_4395_0_avatar_03_60x60' THEN 'Azure Knight'
  WHEN 'img_4395_0_avatar_04_60x60' THEN 'Pulse Echo'
  WHEN 'img_4395_0_avatar_05_60x60' THEN 'Cobalt Force'
  WHEN 'img_4395_0_avatar_06_60x60' THEN 'Static Surge'
  WHEN 'img_4395_0_avatar_07_60x60' THEN 'Electric Ghost'
  WHEN 'img_4395_0_avatar_08_60x60' THEN 'Ionic Shield'
  WHEN 'img_4395_0_avatar_09_60x60' THEN 'Plasma Core'
  WHEN 'img_4395_0_avatar_10_60x60' THEN 'Cyber Wave'
  WHEN 'img_4395_0_avatar_11_60x60' THEN 'Binary Storm'
  WHEN 'img_4395_0_avatar_12_60x60' THEN 'Quantum Drift'

  -- Violet phantom squad (img_4395_1)
  WHEN 'img_4395_1_avatar_01_60x60' THEN 'Dark Prism'
  WHEN 'img_4395_1_avatar_02_60x60' THEN 'Shadow Weave'
  WHEN 'img_4395_1_avatar_03_60x60' THEN 'Phantom Tide'
  WHEN 'img_4395_1_avatar_04_60x60' THEN 'Void Dancer'
  WHEN 'img_4395_1_avatar_05_60x60' THEN 'Astral Rift'
  WHEN 'img_4395_1_avatar_06_60x60' THEN 'Eclipse Born'
  WHEN 'img_4395_1_avatar_07_60x60' THEN 'Mystic Pulse'
  WHEN 'img_4395_1_avatar_08_60x60' THEN 'Nebula Drift'
  WHEN 'img_4395_1_avatar_09_60x60' THEN 'Spectra Shade'

  -- Toxic green squad (img_4395_2)
  WHEN 'img_4395_2_avatar_01_60x60' THEN 'Venom Coil'
  WHEN 'img_4395_2_avatar_02_60x60' THEN 'Jungle Phantom'
  WHEN 'img_4395_2_avatar_03_60x60' THEN 'Emerald Rogue'
  WHEN 'img_4395_2_avatar_04_60x60' THEN 'Toxic Wraith'
  WHEN 'img_4395_2_avatar_05_60x60' THEN 'Forest Shade'
  WHEN 'img_4395_2_avatar_06_60x60' THEN 'Neon Viper'
  WHEN 'img_4395_2_avatar_07_60x60' THEN 'Bio Circuit'
  WHEN 'img_4395_2_avatar_08_60x60' THEN 'Acid Flash'
  WHEN 'img_4395_2_avatar_09_60x60' THEN 'Sage Specter'

  -- Inferno orange squad (img_4395_3)
  WHEN 'img_4395_3_avatar_01_60x60' THEN 'Blaze Surge'
  WHEN 'img_4395_3_avatar_02_60x60' THEN 'Ember Storm'
  WHEN 'img_4395_3_avatar_03_60x60' THEN 'Solar Flare'
  WHEN 'img_4395_3_avatar_04_60x60' THEN 'Inferno Edge'
  WHEN 'img_4395_3_avatar_05_60x60' THEN 'Flame Drift'
  WHEN 'img_4395_3_avatar_06_60x60' THEN 'Molten Core'
  WHEN 'img_4395_3_avatar_07_60x60' THEN 'Cinder Strike'
  WHEN 'img_4395_3_avatar_08_60x60' THEN 'Pyro Ghost'
  WHEN 'img_4395_3_avatar_09_60x60' THEN 'Amber Wraith'
  WHEN 'img_4395_3_avatar_10_60x60' THEN 'Scorch Pulse'
  WHEN 'img_4395_3_avatar_11_60x60' THEN 'Lava Rush'
  WHEN 'img_4395_3_avatar_12_60x60' THEN 'Char Blade'
  WHEN 'img_4395_3_avatar_13_60x60' THEN 'Wildfire'
  WHEN 'img_4395_3_avatar_14_60x60' THEN 'Phoenix Ash'

  -- Neon magenta squad (img_4756_2)
  WHEN 'img_4756_2_avatar_01_60x60' THEN 'Neon Rose'
  WHEN 'img_4756_2_avatar_02_60x60' THEN 'Fuchsia Shade'
  WHEN 'img_4756_2_avatar_03_60x60' THEN 'Sakura Ghost'
  WHEN 'img_4756_2_avatar_04_60x60' THEN 'Pink Phantom'
  WHEN 'img_4756_2_avatar_05_60x60' THEN 'Magenta Rift'
  WHEN 'img_4756_2_avatar_06_60x60' THEN 'Vivid Storm'
  WHEN 'img_4756_2_avatar_07_60x60' THEN 'Ultraviolet'
  WHEN 'img_4756_2_avatar_08_60x60' THEN 'Rose Specter'
  WHEN 'img_4756_2_avatar_09_60x60' THEN 'Bloom Surge'
  WHEN 'img_4756_2_avatar_10_60x60' THEN 'Orchid Pulse'
  WHEN 'img_4756_2_avatar_11_60x60' THEN 'Iris Wraith'
  WHEN 'img_4756_2_avatar_12_60x60' THEN 'Petal Edge'

  -- Arctic cyan squad (img_4756_3)
  WHEN 'img_4756_3_avatar_01_60x60' THEN 'Frost Shade'
  WHEN 'img_4756_3_avatar_02_60x60' THEN 'Arctic Wraith'
  WHEN 'img_4756_3_avatar_03_60x60' THEN 'Glacier Edge'
  WHEN 'img_4756_3_avatar_04_60x60' THEN 'Teal Ghost'
  WHEN 'img_4756_3_avatar_05_60x60' THEN 'Ice Surge'
  WHEN 'img_4756_3_avatar_06_60x60' THEN 'Cryo Drift'
  WHEN 'img_4756_3_avatar_07_60x60' THEN 'Polar Storm'
  WHEN 'img_4756_3_avatar_08_60x60' THEN 'Aqua Phantom'
  WHEN 'img_4756_3_avatar_09_60x60' THEN 'Chill Strike'
  WHEN 'img_4756_3_avatar_10_60x60' THEN 'Cryo Pulse'
  WHEN 'img_4756_3_avatar_11_60x60' THEN 'Zenith Frost'
  WHEN 'img_4756_3_avatar_12_60x60' THEN 'Blue Mirage'

  -- Solar gold squad (img_4764_1)
  WHEN 'img_4764_1_avatar_01_60x60' THEN 'Solar Crown'
  WHEN 'img_4764_1_avatar_02_60x60' THEN 'Golden Wraith'
  WHEN 'img_4764_1_avatar_03_60x60' THEN 'Amber Phantom'
  WHEN 'img_4764_1_avatar_04_60x60' THEN 'Gilded Storm'
  WHEN 'img_4764_1_avatar_05_60x60' THEN 'Radiant Edge'
  WHEN 'img_4764_1_avatar_06_60x60' THEN 'Aurelius Shade'
  WHEN 'img_4764_1_avatar_07_60x60' THEN 'Sunstone Ghost'
  WHEN 'img_4764_1_avatar_08_60x60' THEN 'Topaz Surge'
  WHEN 'img_4764_1_avatar_09_60x60' THEN 'Dusk Knight'

  ELSE name
END;
