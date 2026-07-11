"use client";
import { useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { EditorProps } from "@/src/types/editor";
import { editorExtensions } from "@/src/editor/editor-config";
import MenuBar from "@/src/editor/Menu-bar";
import { handleImageUpload } from "@/src/editor/utils/imageUpload";

export default function Editor({ value, onChange }: EditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadError, setUploadError] = useState("");

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

  const openImagePicker = () => {
    setUploadError("");
    fileInputRef.current?.click();
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => handleImageUpload(setUploadError, event, editor)}
      />
      <MenuBar editor={editor} onUploadImage={openImagePicker} />
      {uploadError && (
        <p className="mt-2 text-sm text-red-600">{uploadError}</p>
      )}
      <EditorContent editor={editor} />
    </div>
  );
}
