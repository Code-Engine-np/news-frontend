import { ChangeEvent } from "react";
import { Editor } from "@tiptap/react";

export const handleImageUpload = (
  setUploadError: (error: string) => void,
  event: ChangeEvent<HTMLInputElement>,
  editor: Editor | null,
) => {
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
