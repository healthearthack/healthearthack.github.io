export type ThemeMode = 'light' | 'dark' | 'high-contrast';

export interface EnterpriseThemeConfig {
  mode: ThemeMode;
  scale: number;
  prefix: string;
}

export interface DesignTokenRegistry {
  version: string;
  timestamp: number;
  config: EnterpriseThemeConfig;
  tokens: Record<string, unknown>;
}
