"use client";

import { useEffect, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { EditorProps } from "@/src/types/editor";
import { editorExtensions } from "@/src/editor/editor-config";
import MenuBar from "@/src/editor/Menu-bar";

export default function Editor({ value, onChange }: EditorProps) {
  const contentLoaded = useRef(false);

  const editor = useEditor({
    extensions: editorExtensions,

    // Don't initialize with value and then call setContent again.
    content: "",

    immediatelyRender: false,

    editorProps: {
      attributes: {
        class:
          "min-h-[500px] rounded-md border p-4 focus:outline-none",
      },
    },

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Load initial/existing article content
  useEffect(() => {
    if (!editor || editor.isDestroyed) return;
    if (!value || contentLoaded.current) return;

    contentLoaded.current = true;

    const frame = requestAnimationFrame(() => {
      if (!editor.isDestroyed) {
        editor.commands.setContent(value, {
          emitUpdate: false,
        });
      }
    });

    return () => cancelAnimationFrame(frame);
  }, [editor, value]);

  return (
    <div>
      <MenuBar editor={editor} />

      <EditorContent editor={editor} />
    </div>
  );
}