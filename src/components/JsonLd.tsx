/**
 * Renders a JSON-LD structured-data script. Server component – the object is
 * serialised at render time so search engines see it in the initial HTML.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe; we control the input objects.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
