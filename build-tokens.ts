import { CommercialTokens } from './tokens';

function compileTokens() {
  console.log("Compiling enterprise DSaaS tokens via TypeScript engine...");
  Object.entries(CommercialTokens).forEach(([brand, tokens]) => {
    console.log(`Brand: ${brand} -> Primary: ${tokens.colorPrimary}`);
  });
}

compileTokens();
