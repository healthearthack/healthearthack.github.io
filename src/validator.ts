import { DesignTokenRegistry, EnterpriseThemeConfig } from './types';
import { CommercialTokens } from './tokens';

export function createRegistry(config: EnterpriseThemeConfig): DesignTokenRegistry {
  return {
    version: "2.4.0-enterprise",
    timestamp: Date.now(),
    config,
    tokens: CommercialTokens
  };
}

export function auditTokens(): void {
  const registry = createRegistry({ mode: 'dark', scale: 1.25, prefix: 'ds' });
  console.log(`[DSaaS Audit] Registry initialized for version ${registry.version}`);
}
auditTokens();
