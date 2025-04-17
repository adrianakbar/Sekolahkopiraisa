"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import { TextAlign } from "@tiptap/extension-text-align";
import { TextAlignButton } from "@/components/tiptap-ui/text-align-button";
import { ImageIcon } from "lucide-react";

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
        levels: [1, 2, 3, 4, 5], // H1, H2, H3, H4, H5
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
    immediatelyRender: false
  });

  const [image, setImage] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("");

  // Handle image upload
  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
      // Insert image into editor
      editor?.chain().focus().setImage({ src: reader.result as string }).run();
    };
    if (file) reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles[0]) {
        handleImageUpload(acceptedFiles[0]);
      }
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
    <div className="flex">
      {/* Left side - Editor */}
      <div className="w-2/3 pr-4 flex flex-col">
        {/* Toolbar */}
        <div className="flex items-center border-b pb-2 mb-4">
          {/* Bold */}
          <button
            onClick={() => editor?.chain().focus().toggleBold().run()}
            className="p-1 mx-1"
            title="Bold"
          >
            <span className="font-bold">B</span>
          </button>

          {/* Italic */}
          <button
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            className="p-1 mx-1"
            title="Italic"
          >
            <span className="italic">I</span>
          </button>

          {/* Underline */}
          <button
            onClick={() => editor?.chain().focus().toggleUnderline().run()}
            className="p-1 mx-1"
            title="Underline"
          >
            <span className="underline">U</span>
          </button>

          {/* Strikethrough */}
          <button
            onClick={() => editor?.chain().focus().toggleStrike().run()}
            className="p-1 mx-1"
            title="Strikethrough"
          >
            <span className="line-through">S</span>
          </button>

          {/* Bullet List */}
          <button
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            className="p-1 mx-1"
            title="Bullet List"
          >
            •
          </button>

          {/* Numbered List */}
          <button
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
            className="p-1 mx-1"
            title="Numbered List"
          >
            1.
          </button>

          {/* Text Align Buttons */}
          <TextAlignButton align="left" />
          <TextAlignButton align="center" />
          <TextAlignButton align="right" />
          <TextAlignButton align="justify" />

          {/* Heading Controls */}
          {[1, 2, 3, 4, 5].map((level) => (
            <button
              key={level}
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 }).run()
              }
              className="p-1 mx-1"
              title={`Heading ${level}`}
            >
              H{level}
            </button>
          ))}

          {/* Image Upload Button */}
          <button
            onClick={() => (document.querySelector('input[type="file"]') as HTMLInputElement)?.click()}
            className="p-1 mx-1"
            title="Insert Image"
          >
            <ImageIcon size={16} />
          </button>
        </div>

        {/* Editor Content */}
        <div className="flex-grow min-h-[400px] p-4">
          <EditorContent
            editor={editor}
            placeholder="Begin writing here..."
            className="h-full outline-none"
          />
        </div>

        {/* Character Count */}
        <div className="text-sm text-gray-500 py-2">
          {content.replace(/<[^>]*>/g, "").length}/{maxCharacters || 1200}
        </div>
      </div>

      {/* Right side - Image upload and title */}
      <div className="w-1/3 pl-4">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Judul"
            className="w-full p-4 border rounded"
          />
        </div>

        <div className="mb-2 flex justify-between items-center">
          <span>Sampul Gambar</span>
          <button className="text-gray-400">⋮</button>
        </div>

        <div
          {...getRootProps()}
          className="bg-gray-50 border rounded flex items-center justify-center h-40 mb-4 cursor-pointer"
        >
          <input {...getInputProps()} />
          {image ? (
            <img
              src={image}
              alt="Uploaded"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-gray-300">📷</div>
          )}
        </div>

        <div className="text-right">
          <button className="text-gray-500">Ganti Gambar</button>
        </div>

        <div className="mt-6">
          <textarea
            placeholder="Masukkan deskripsi"
            className="w-full p-4 border rounded min-h-[120px] resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={200}
          />
          <div className="text-sm text-gray-500 text-right pt-1">
            {description.length}/200
          </div>
        </div>
      </div>

      {/* Upload Button */}
      <div className="absolute bottom-4 right-4">
        <button className="bg-brown-700 text-white px-6 py-2 rounded">
          Unggah
        </button>
      </div>
    </div>
  );
}
