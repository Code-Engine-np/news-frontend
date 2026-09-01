"use client";
import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { EditorProps } from "@/src/types/editor";
import { editorExtensions } from "@/src/editor/editor-config";
import MenuBar from "@/src/editor/Menu-bar";

export default function Editor({ value, onChange }: EditorProps) {
  const editor = useEditor({
    extensions: editorExtensions,
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "min-h-[500px] rounded-md border p-4 focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Sync external value changes into the editor (e.g. when article data arrives
  // after the editor has already mounted with empty content).
  useEffect(() => {
    if (!editor || editor.isDestroyed) return;
    if (value !== editor.getHTML()) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [editor, value]);

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
