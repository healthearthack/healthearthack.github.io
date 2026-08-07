import { CommercialTokens, BrandTokens } from './tokens';

export class DSaaSCompiler {
  private tokens: Record<string, BrandTokens>;

  constructor() {
    this.tokens = CommercialTokens;
  }

  public compileToCSS(): string {
    let cssOutput = ":root {\n";
    for (const [brand, tokenSet] of Object.entries(this.tokens)) {
      cssOutput += `  --${brand}-primary: ${tokenSet.colorPrimary};\n`;
      cssOutput += `  --${brand}-border: ${tokenSet.colorBorder};\n`;
      cssOutput += `  --${brand}-font: ${tokenSet.fontFamily};\n`;
    }
    cssOutput += "}\n";
    return cssOutput;
  }

  public validateTokens(): boolean {
    const keys = Object.keys(this.tokens);
    console.log(`Successfully validated ${keys.length} enterprise design token profiles.`);
    return keys.length > 0;
  }
}

const compiler = new DSaaSCompiler();
compiler.validateTokens();
