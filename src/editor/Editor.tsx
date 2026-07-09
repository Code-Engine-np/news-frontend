"use client";
import { useRef, useState, type ChangeEvent } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { EditorProps } from "@/src/types/editor";
import { editorExtensions } from "@/src/editor/editor-config";
import MenuBar from "@/src/editor/Menu-bar";

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

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file || !editor) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setUploadError("Please choose an image file.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Images must be 5 MB or smaller.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;

      if (typeof result !== "string") {
        setUploadError("Unable to read that image.");
        event.target.value = "";
        return;
      }

      editor.chain().focus().setImage({ src: result, alt: file.name }).run();
      event.target.value = "";
    };

    reader.onerror = () => {
      setUploadError("Unable to read that image.");
      event.target.value = "";
    };

    reader.readAsDataURL(file);
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />
      <MenuBar editor={editor} onUploadImage={openImagePicker} />
      {uploadError && (
        <p className="mt-2 text-sm text-red-600">{uploadError}</p>
      )}
      <EditorContent editor={editor} />
    </div>
  );
}
