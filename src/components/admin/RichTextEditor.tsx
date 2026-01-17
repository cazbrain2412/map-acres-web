"use client";

import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Write here...",
}: {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}) {
  const editor = useEditor({
immediatelyRender: false,

    extensions: [
      StarterKit,
      Underline,
      Highlight,
      Link.configure({ openOnClick: false }),
    ],
    content: value || "",
    editorProps: {
  attributes: {
    class:
      "min-h-[180px] rounded-2xl border border-[#E6EEFF] bg-white px-4 py-3 outline-none text-[#0B1220] caret-[#0B1220] [&_*]:text-[#0B1220]",
    spellcheck: "false",
  },
},


    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // keep editor in sync if value changed from outside
  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    if ((value || "") !== current) editor.commands.setContent(value || "");

  }, [value, editor]);

  if (!editor) return null;

  const Btn = ({ onClick, active, children }: any) => (
    <button
      type="button"
      onClick={onClick}
      className={
        "rounded-xl border px-3 py-1 text-xs font-semibold " +
        (active
  ? "bg-[#225BA0] text-white border-[#225BA0]"
  : "bg-white text-[#0B1220] border-[#E6EEFF] hover:bg-[#F3F7FF]")

      }
    >
      {children}
    </button>
  );

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 text-[#0B1220]">

        <Btn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")}>B</Btn>
        <Btn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")}>I</Btn>
        <Btn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")}>U</Btn>
        <Btn onClick={() => editor.chain().focus().toggleHighlight().run()} active={editor.isActive("highlight")}>Highlight</Btn>
        <Btn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")}>• List</Btn>
        <Btn
          onClick={() => {
            const url = prompt("Enter link URL");
            if (!url) return;
            editor.chain().focus().setLink({ href: url }).run();
          }}
          active={editor.isActive("link")}
        >
          Link
        </Btn>
        <Btn onClick={() => editor.chain().focus().unsetLink().run()} active={false}>Unlink</Btn>
      </div>

      <div className="text-xs text-[#0B1220]/60">{placeholder}</div>
      <EditorContent editor={editor} />
    </div>
  );
}

