import { isPlaceholder } from "@/site.config";

/**
 * A mailto link with a screen-reader hint. While the address is still a
 * [PLACEHOLDER] it renders as plain text, so nothing links to a fake address.
 */
export function EmailLink({ email, subject, className = "" }: { email: string; subject?: string; className?: string }) {
  if (isPlaceholder(email)) return <span className={className}>{email}</span>;
  const href = `mailto:${email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;
  return (
    <a href={href} aria-label={`Email ${email}`} className={`font-semibold text-primary underline-offset-4 hover:underline ${className}`}>
      {email}
    </a>
  );
}
