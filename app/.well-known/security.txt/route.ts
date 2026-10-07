import { site } from "@/site.config";
import { buildDate } from "@/lib/build";

// RFC 9116 security contact file, generated at build time.
const expires = new Date(buildDate);
expires.setUTCFullYear(expires.getUTCFullYear() + 1);

const body = [
  `Contact: mailto:${site.securityEmail}`,
  `Expires: ${expires.toISOString()}`,
  "Preferred-Languages: en, hi",
  `Canonical: ${site.url}/.well-known/security.txt`,
  `Policy: ${site.url}/security#report`,
  "",
].join("\n");

export function GET() {
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
