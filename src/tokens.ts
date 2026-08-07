export interface BrandTokens {
  colorPrimary: string;
  colorBorder: string;
  fontFamily: string;
}

export const CommercialTokens: Record<string, BrandTokens> = {
  brandA: {
    colorPrimary: "#D35400",
    colorBorder: "#FFD700",
    fontFamily: "Inter, sans-serif"
  },
  brandB: {
    colorPrimary: "#05D9E8",
    colorBorder: "#FFD700",
    fontFamily: "Roboto, sans-serif"
  }
};
