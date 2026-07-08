/* Read UTM params from the current URL → compact source string
 * like "fb/group/singleparentsatl". Returns null if none. */
export function getUtmSource() {
  if (typeof window === "undefined") return null;
  const p = new URLSearchParams(window.location.search);
  const parts = [
    p.get("utm_source"),
    p.get("utm_medium"),
    p.get("utm_campaign"),
  ].filter(Boolean);
  if (parts.length === 0) return null;
  return parts.join("/").slice(0, 180);
}
