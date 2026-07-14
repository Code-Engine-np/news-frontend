"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import { EditorProps } from "@/src/types/editor";
import { editorExtensions } from "@/src/editor/editor-config";
import MenuBar from "@/src/editor/Menu-bar";
// import MenuBar from "@/src/editor/Menu-bar";

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

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
