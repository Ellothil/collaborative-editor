import type { Editor } from "@tiptap/react";
import type React from "react";
import { ToolbarButton } from "./toolbar-button";

type ToolbarProps = {
  editor: Editor | null;
};

export const Toolbar: React.FC<ToolbarProps> = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const toolbarButtons = [
    {
      name: "bold",
      display: <strong className="bg-transparent">B</strong>,
      onClick: () => editor.chain().focus().toggleBold().run(),
    },
    {
      name: "italic",
      display: <em className="bg-transparent">I</em>,
      onClick: () => editor.chain().focus().toggleItalic().run(),
    },
    {
      name: "strikethrough",
      display: <s className="bg-transparent">S</s>,
      onClick: () => editor.chain().focus().toggleStrike().run(),
    },
    {
      name: "highlight",
      display: <mark className="bg-transparent">H</mark>,
      onClick: () => editor.chain().focus().toggleHighlight().run(),
    },
    {
      name: "heading",
      display: <h1 className="bg-transparent">H1</h1>,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    },
    {
      name: "heading2",
      display: <h2 className="bg-transparent">H2</h2>,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      name: "heading3",
      display: <h3 className="bg-transparent">H3</h3>,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    },
    {
      name: "bulletList",
      display: <ul className="bg-transparent">•</ul>,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
    },
    {
      name: "orderedList",
      display: <ol className="bg-transparent">1.</ol>,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
    },
    {
      name: "codeBlock",
      display: <p className="bg-transparent">{"</>"}</p>,
      onClick: () => editor.chain().focus().toggleCodeBlock().run(),
    },
    {
      name: "blockquote",
      display: <p className="bg-transparent">{'"'}</p>,
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
    },
    {
      name: "horizontalRule",
      display: <p className="bg-transparent">—</p>,
      onClick: () => editor.chain().focus().setHorizontalRule().run(),
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 border-b px-8 py-4">
      {toolbarButtons.map((button) => (
        <ToolbarButton
          display={button.display}
          key={button.name}
          name={button.name}
          onClick={button.onClick}
          title={button.name}
        />
      ))}
    </div>
  );
};
