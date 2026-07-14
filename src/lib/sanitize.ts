import sanitizeHtml from "sanitize-html";

/**
 * Sanitizes article HTML produced by the TipTap editor for safe rendering
 * via dangerouslySetInnerHTML. Uses sanitize-html (htmlparser2-based) so it
 * runs in Server Components without pulling in jsdom.
 */
export function sanitizeArticleHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      "p",
      "br",
      "span",
      "strong",
      "b",
      "em",
      "i",
      "u",
      "s",
      "strike",
      "mark",
      "sub",
      "sup",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "ul",
      "ol",
      "li",
      "blockquote",
      "code",
      "pre",
      "hr",
      "a",
      "img",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "alt", "title", "width", "height"],
      "*": ["style", "class"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    // Drop images without a usable src so empty <img> never reaches the DOM.
    exclusiveFilter: (frame) =>
      frame.tag === "img" && !frame.attribs.src,
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", {
        rel: "noopener noreferrer",
        target: "_blank",
      }),
    },
  });
}
