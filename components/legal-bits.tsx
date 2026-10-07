import { site } from "@/site.config";

/** Service providers that process personal data, built from site.config.ts. */
export function ProcessorsTable() {
  const ai =
    site.ai.processors.length > 0
      ? site.ai.processors
      : [{ name: site.ai.providersShort, role: "Process assistant requests", location: "[AI PROVIDER LOCATIONS]" }];
  const rows = [
    {
      name: "Vercel Inc.",
      role: "Hosts the Website and Finance, keeps request logs, provides cookieless analytics",
      location: site.hosting.vercelRegion,
    },
    { name: "Neon (Databricks, Inc.)", role: "Hosts the Finance database", location: site.hosting.neonRegion },
    ...ai,
    { name: "Cloudflare, Inc.", role: "DNS only (does not receive page content or your data)", location: "Global" },
  ];
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th scope="col">Provider</th>
            <th scope="col">What they do</th>
            <th scope="col">Location</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <td>{row.name}</td>
              <td>{row.role}</td>
              <td>{row.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Legal entity name and registered address on one line. */
export function EntityLine() {
  return (
    <>
      {site.legalName}, {site.address}
    </>
  );
}
