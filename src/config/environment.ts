export const env = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3001/api",
  apiDocsUrl: process.env.NEXT_PUBLIC_API_DOCS_URL ?? "https://apidog.com/",
  heroPreviewUrl: process.env.NEXT_PUBLIC_DEFAULT_HERO_VIDEO ?? null,
};
