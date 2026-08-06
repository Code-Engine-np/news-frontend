import {
  NodeViewProps,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from "@tiptap/react";
import ImageExtension from "@tiptap/extension-image";
import { X } from "lucide-react";

function ImageNodeView({ node, selected, deleteNode }: NodeViewProps) {
  return (
    <NodeViewWrapper className="group relative my-4 inline-block w-full">
      <img
        src={node.attrs.src}
        alt={node.attrs.alt ?? ""}
        className="max-w-full rounded-xl border border-line"
      />
      <button
        type="button"
        aria-label="Remove image"
        onMouseDown={(event) => event.preventDefault()}
        onClick={deleteNode}
        className={`absolute right-2 top-2 rounded-full bg-black/70 p-1.5 text-white opacity-0 transition-opacity hover:bg-black group-hover:opacity-100 ${
          selected ? "opacity-100" : ""
        }`}
      >
        <X className="size-3.5" />
      </button>
    </NodeViewWrapper>
  );
}

export const Image = ImageExtension.extend({
  inline: false,
  addNodeView() {
    return ReactNodeViewRenderer(ImageNodeView);
  },
});
