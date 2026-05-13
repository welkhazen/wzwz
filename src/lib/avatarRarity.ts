export type AvatarRarity =
  | "common"
  | "uncommon"
  | "rare"
  | "epic"
  | "legendary"
  | "mythic"
  | "exotic"
  | "gold"
  | "platinum";

export interface RarityConfig {
  label: string;
  color: string;
  glow: string;
  defaultWeight: number;
}

export const RARITY_CONFIG: Record<AvatarRarity, RarityConfig> = {
  common:    { label: "Common",    color: "#9ca3af", glow: "#9ca3af60", defaultWeight: 500 },
  uncommon:  { label: "Uncommon",  color: "#f97316", glow: "#f9731660", defaultWeight: 200 },
  rare:      { label: "Rare",      color: "#4ade80", glow: "#4ade8060", defaultWeight: 100 },
  epic:      { label: "Epic",      color: "#3b82f6", glow: "#3b82f660", defaultWeight: 50  },
  legendary: { label: "Legendary", color: "#a855f7", glow: "#a855f760", defaultWeight: 25  },
  mythic:    { label: "Mythic",    color: "#ef4444", glow: "#ef444460", defaultWeight: 10  },
  exotic:    { label: "Exotic",    color: "#ec4899", glow: "#ec489960", defaultWeight: 5   },
  gold:      { label: "Gold",      color: "#facc15", glow: "#facc1560", defaultWeight: 3   },
  platinum:  { label: "Platinum",  color: "#e2e8f0", glow: "#e2e8f060", defaultWeight: 1   },
};

export const RARITY_ORDER: AvatarRarity[] = [
  "common", "uncommon", "rare", "epic", "legendary", "mythic", "exotic", "gold", "platinum",
];
