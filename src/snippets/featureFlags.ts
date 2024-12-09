export type FeatureFlagName = keyof typeof FEATURE_FLAGS;
export const FEATURE_FLAGS = {
  NEW_FEATURE: "NEW_FEATURE",
  FEATURE_B: "FEATURE_B",
  FEATURE_C: "FEATURE_C",
} as const;
