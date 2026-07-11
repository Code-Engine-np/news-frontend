import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import { BulletList, OrderedList } from "@tiptap/extension-list";
import { Image } from "@/src/editor/extensions/Image";

export const editorExtensions = [
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3],
    },
  }),

  Underline.configure({
    HTMLAttributes: {
      class: "underline",
    },
  }),

  Link.configure({
    openOnClick: false,
    autolink: true,
  }),

  Image.configure({
    inline: false,
    allowBase64: true,
    HTMLAttributes: {
      class: "max-w-full rounded-xl border border-line",
    },
  }),

  Placeholder.configure({
    placeholder: "Write your article...",
  }),

  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),

  BulletList.configure({
    HTMLAttributes: {
      class: "list-disc",
    },
  }),
  OrderedList.configure({
    HTMLAttributes: {
      class: "list-decimal",
    },
  }),
];
