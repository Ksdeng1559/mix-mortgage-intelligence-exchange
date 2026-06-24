/**
 * Serialize a JSON-LD object for safe inline script injection.
 * Unicode-escapes <, >, and & so no value can break out of the <script> tag.
 * All callers must pass developer-controlled static objects — never user input.
 */
function serializeJsonLd(value: object): string {
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
}

/**
 * Server Component — renders a <script type="application/ld+json"> tag.
 * Centralises the single dangerouslySetInnerHTML usage so no page file needs it.
 */
export function JsonLdScript({ data }: { data: object }) {
  // dangerouslySetInnerHTML is safe here: serializeJsonLd Unicode-escapes all
  // HTML special characters before injection. Content is always static/dev-controlled.
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  )
}
