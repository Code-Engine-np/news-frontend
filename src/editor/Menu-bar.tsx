
"use client";

import { useRef, useState } from "react";
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
  Loader2,
} from "lucide-react";

import { uploadImageToCloudinary } from "@/src/lib/cloudinary";

type MenuBarProps = {
  editor: Editor | null;
};

export default function MenuBar({ editor }: MenuBarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  if (!editor) {
    return null;
  }

  /**
   * Open image picker
   */
  const addImage = () => {
    if (uploading) {
      return;
    }

    fileInputRef.current?.click();
  };

  /**
   * Upload image to Cloudinary
   * using the existing project helper.
   */
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    /**
     * Reset input so the same image
     * can be selected again later.
     */
    event.target.value = "";

    if (!file) {
      return;
    }

    /**
     * Validate image
     */
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      return;
    }

    /**
     * Maximum 5MB
     */
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB.");
      return;
    }

    try {
      setUploading(true);

      /**
       * Existing Cloudinary helper handles:
       *
       * 1. JWT authentication
       * 2. Getting Cloudinary signature
       * 3. Uploading image
       * 4. Returning secure_url
       */
      const imageResponse =
        await uploadImageToCloudinary(file);

      if (!imageResponse.secure_url) {
        throw new Error(
          "Cloudinary did not return an image URL.",
        );
      }

      console.log(
        "Image uploaded:",
        imageResponse,
      );

      /**
       * Insert only the Cloudinary URL
       * into Tiptap.
       *
       * No base64 data is stored.
       */
      editor
        .chain()
        .focus()
        .setImage({
          src: imageResponse.secure_url,
          alt: file.name,
        })
        .run();

      console.log(
        "Image inserted into editor.",
      );
    } catch (error) {
      console.error(
        "Image upload error:",
        error,
      );

      alert(
        error instanceof Error
          ? error.message
          : "Failed to upload image.",
      );
    } finally {
      setUploading(false);
    }
  };

  /**
   * Toolbar options
   */
  const Options = [
    {
      icon: <Heading1 className="size-4" />,
      onClick: () =>
        editor
          .chain()
          .focus()
          .toggleHeading({ level: 1 })
          .run(),
      pressed: editor.isActive("heading", {
        level: 1,
      }),
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
      pressed: editor.isActive("heading", {
        level: 2,
      }),
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
      pressed: editor.isActive("heading", {
        level: 3,
      }),
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
      pressed: editor.isActive({
        textAlign: "left",
      }),
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
      pressed: editor.isActive({
        textAlign: "center",
      }),
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
      pressed: editor.isActive({
        textAlign: "right",
      }),
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
      {/* Formatting buttons */}
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

      {/* Image upload */}
      <Toggle
        type="button"
        pressed={false}
        onPressedChange={addImage}
        disabled={uploading}
        aria-label="Add image"
        title={
          uploading
            ? "Uploading image..."
            : "Add image"
        }
      >
        {uploading ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <ImageIcon className="size-4" />
        )}
      </Toggle>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/webp,image/gif"
        className="hidden"
        onChange={handleImageUpload}
        disabled={uploading}
      />
    </div>
  );
}
