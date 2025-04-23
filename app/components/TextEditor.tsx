"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import { TextAlign } from "@tiptap/extension-text-align";
import { TextAlignButton } from "@/components/tiptap-ui/text-align-button";
import { AlignLeft, ImageIcon } from "lucide-react";

interface TextEditorProps {
  content: string;
  setContent: (value: string) => void;
  maxCharacters: number;
}

export default function TextEditor({
  content,
  setContent,
  maxCharacters,
}: TextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Image,
      Link,
      Underline,
      Heading.configure({
        levels: [1, 2, 3, 4, 5],
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
    autofocus: true,
  });

  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("");

  // Untuk unggah gambar ke editor
  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageUrl = reader.result as string;
      editor?.chain().focus().setImage({ src: imageUrl }).run();
    };
    reader.readAsDataURL(file);
  };

  // Untuk upload thumbnail (sampul)
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(reader.result as string);
      };
      if (file) reader.readAsDataURL(file);
    },
    accept: { "image/*": [] },
    multiple: false,
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <div className="flex gap-6">
      {/* LEFT - Editor */}
      <div className="w-full">
        

        {/* Editor */}
        <div className="min-h-[300px] border p-3 rounded-xl">
          <EditorContent editor={editor} className="outline-none" />
        </div>

        {/* Word Count / Character Count */}
        <div className="text-sm text-gray-500 mt-2">
          {content.replace(/<[^>]*>/g, "").length}/{maxCharacters} karakter
        </div>
      </div>
    </div>
  );
}
