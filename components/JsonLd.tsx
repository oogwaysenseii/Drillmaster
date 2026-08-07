// Injects a JSON-LD <script> into the page. Server component — renders in the
// static HTML so crawlers see it without executing JS.

export function JsonLd({ data }: { data: object | object[] }) {
  const json = Array.isArray(data) ? data : [data];
  return (
    <>
      {json.map((obj, i) => (
        <script
          key={i}
          type="application/ld+json"
          // Schema JSON is trusted, built from our own typed data.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }}
        />
      ))}
    </>
  );
}
