"use client";

import { Editor } from "@tiptap/react";
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
} from "lucide-react";
import { cn } from "../utils/helper";

interface TextAlignButtonProps {
  editor?: Editor | null;
  align: "left" | "center" | "right" | "justify";
}

export const TextAlignButton = ({ editor, align }: TextAlignButtonProps) => {
  if (!editor) return null;

  const isActive = editor.isActive({ textAlign: align });

  const Icon = {
    left: AlignLeft,
    center: AlignCenter,
    right: AlignRight,
    justify: AlignJustify,
  }[align];

  return (
    <button
      onClick={() => editor.chain().focus().setTextAlign(align).run()}
      className={cn(
        "p-1 mx-1 rounded hover:bg-gray-200",
        isActive && "bg-gray-300"
      )}
      title={`Align ${align}`}
    >
      <Icon size={16} />
    </button>
  );
};
