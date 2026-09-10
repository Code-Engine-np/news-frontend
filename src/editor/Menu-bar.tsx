"use client";

import { useRef } from "react";
import { Toggle } from "@/components/ui/toggle";
import { Editor } from "@tiptap/react";
import {
  Heading1,
  Heading2,
  Heading3,
  Bold,
  Italic,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  ImageIcon,
} from "lucide-react";

type MenuBarProps = {
  editor: Editor | null;
};

export default function MenuBar({ editor }: MenuBarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!editor) {
    return null;
  }

  // Open image file picker
  const addImage = () => {
    fileInputRef.current?.click();
  };

  // Handle selected image
  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      event.target.value = "";
      return;
    }

    // Check file size - 5MB
    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      alert("Image size must be less than 5MB.");
      event.target.value = "";
      return;
    }

    // Convert image to Base64
    const reader = new FileReader();

    reader.onload = () => {
      const src = reader.result as string;

      if (!src) {
        return;
      }

      editor
        .chain()
        .focus()
        .setImage({
          src: src,
          alt: file.name,
        })
        .run();
    };

    reader.onerror = () => {
      alert("Failed to read the image.");
    };

    reader.readAsDataURL(file);

    // Allow selecting the same image again
    event.target.value = "";
  };

  const Options = [
    {
      icon: <Heading1 className="size-4" />,
      onClick: () =>
        editor
          .chain()
          .focus()
          .toggleHeading({ level: 1 })
          .run(),
      pressed: editor.isActive("heading", { level: 1 }),
      label: "Heading 1",
    },

    {
      icon: <Heading2 className="size-4" />,
      onClick: () =>
        editor
          .chain()
          .focus()
          .toggleHeading({ level: 2 })
          .run(),
      pressed: editor.isActive("heading", { level: 2 }),
      label: "Heading 2",
    },

    {
      icon: <Heading3 className="size-4" />,
      onClick: () =>
        editor
          .chain()
          .focus()
          .toggleHeading({ level: 3 })
          .run(),
      pressed: editor.isActive("heading", { level: 3 }),
      label: "Heading 3",
    },

    {
      icon: <Bold className="size-4" />,
      onClick: () =>
        editor
          .chain()
          .focus()
          .toggleBold()
          .run(),
      pressed: editor.isActive("bold"),
      label: "Bold",
    },

    {
      icon: <Italic className="size-4" />,
      onClick: () =>
        editor
          .chain()
          .focus()
          .toggleItalic()
          .run(),
      pressed: editor.isActive("italic"),
      label: "Italic",
    },

    {
      icon: <Strikethrough className="size-4" />,
      onClick: () =>
        editor
          .chain()
          .focus()
          .toggleStrike()
          .run(),
      pressed: editor.isActive("strike"),
      label: "Strikethrough",
    },

    {
      icon: <AlignLeft className="size-4" />,
      onClick: () =>
        editor
          .chain()
          .focus()
          .setTextAlign("left")
          .run(),
      pressed: editor.isActive({ textAlign: "left" }),
      label: "Align left",
    },

    {
      icon: <AlignCenter className="size-4" />,
      onClick: () =>
        editor
          .chain()
          .focus()
          .setTextAlign("center")
          .run(),
      pressed: editor.isActive({ textAlign: "center" }),
      label: "Align center",
    },

    {
      icon: <AlignRight className="size-4" />,
      onClick: () =>
        editor
          .chain()
          .focus()
          .setTextAlign("right")
          .run(),
      pressed: editor.isActive({ textAlign: "right" }),
      label: "Align right",
    },

    {
      icon: <List className="size-4" />,
      onClick: () =>
        editor
          .chain()
          .focus()
          .toggleBulletList()
          .run(),
      pressed: editor.isActive("bulletList"),
      label: "Bullet list",
    },

    {
      icon: <ListOrdered className="size-4" />,
      onClick: () =>
        editor
          .chain()
          .focus()
          .toggleOrderedList()
          .run(),
      pressed: editor.isActive("orderedList"),
      label: "Ordered list",
    },
  ];

  return (
    <div className="flex flex-wrap gap-2 border-b p-2">

      {/* Text formatting buttons */}
      {Options.map((option, index) => (
        <Toggle
          key={index}
          type="button"
          pressed={option.pressed}
          onPressedChange={option.onClick}
          aria-label={option.label}
          title={option.label}
        >
          {option.icon}
        </Toggle>
      ))}

      {/* Image button */}
      <Toggle
        type="button"
        pressed={false}
        onPressedChange={addImage}
        aria-label="Add image"
        title="Add image"
      >
        <ImageIcon className="size-4" />
      </Toggle>

      {/* Hidden image file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/webp,image/gif"
        className="hidden"
        onChange={handleImageUpload}
      />
    </div>
  );
}