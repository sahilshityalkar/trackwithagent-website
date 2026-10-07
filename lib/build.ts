// The build date is captured in next.config.ts and inlined at build time.
export const buildDate = new Date(process.env.BUILD_DATE ?? "2026-10-07T00:00:00.000Z");
export const buildYear = buildDate.getUTCFullYear();
