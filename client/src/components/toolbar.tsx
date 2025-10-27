import { type Editor, useEditorState } from "@tiptap/react";
import {
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  Italic,
  List,
  ListOrdered,
  MessageSquareQuote,
  PanelRightClose,
  PanelRightOpen,
  Strikethrough,
} from "lucide-react";
import type React from "react";
import type { JSX } from "react";
import { ToolbarButton } from "./toolbar-button";

type ToolbarProps = {
  editor: Editor | null;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (collapsed: boolean) => void;
};

/**
 * A component that renders a toolbar for a Tiptap editor.
 * If the given editor is null, the component will return null.
 * The toolbar contains buttons for the following formatting options:
 * - Bold
 * - Italic
 * - Strikethrough
 * - Highlight
 * - Heading 1
 * - Heading 2
 * - Heading 3
 * - Bullet list
 * - Ordered list
 * - Code block
 * - Blockquote
 * - Horizontal rule
 *
 * @param {Editor | null} editor - The Tiptap editor instance.
 * @returns {JSX.Element | null} A JSX element representing the toolbar component or null if the editor is null.
 */
export const Toolbar: React.FC<ToolbarProps> = ({
  editor,
  isSidebarCollapsed,
  setIsSidebarCollapsed,
}): JSX.Element | null => {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor?.isActive("bold") ?? false,
      isItalic: ctx.editor?.isActive("italic") ?? false,
      isStrike: ctx.editor?.isActive("strike") ?? false,
      isCode: ctx.editor?.isActive("code") ?? false,
      isHeading1: ctx.editor?.isActive("heading", { level: 1 }) ?? false,
      isHeading2: ctx.editor?.isActive("heading", { level: 2 }) ?? false,
      isHeading3: ctx.editor?.isActive("heading", { level: 3 }) ?? false,
      isBulletList: ctx.editor?.isActive("bulletList") ?? false,
      isOrderedList: ctx.editor?.isActive("orderedList") ?? false,
      isCodeBlock: ctx.editor?.isActive("codeBlock") ?? false,
      isBlockquote: ctx.editor?.isActive("blockquote") ?? false,
      isHighlight: ctx.editor?.isActive("highlight") ?? false,
    }),
  });

  if (!editor) {
    return null;
  }

  const toolbarButtons = [
    {
      name: "bold",
      display: <Bold className="bg-transparent" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
    },
    {
      name: "italic",
      display: <Italic className="bg-transparent" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
    },
    {
      name: "strikethrough",
      display: <Strikethrough className="bg-transparent" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
    },
    {
      name: "highlight",
      display: <Highlighter className="bg-transparent" />,
      onClick: () => editor.chain().focus().toggleHighlight().run(),
    },
    {
      name: "heading 1",
      display: <Heading1 className="bg-transparent" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    },
    {
      name: "heading 2",
      display: <Heading2 className="bg-transparent" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      name: "heading 3",
      display: <Heading3 className="bg-transparent" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    },
    {
      name: "bullet list",
      display: <List className="bg-transparent" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
    },
    {
      name: "ordered list",
      display: <ListOrdered className="bg-transparent" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
    },
    {
      name: "code block",
      display: <Code className="bg-transparent" />,
      onClick: () => editor.chain().focus().toggleCodeBlock().run(),
    },
    {
      name: "blockquote",
      display: <MessageSquareQuote className="bg-transparent" />,
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
    },
  ];

  return (
    <div className="relative flex border-b px-8 py-4">
      <div className="flex flex-wrap items-center gap-2 pr-10">
        {toolbarButtons.map((button) => (
          <ToolbarButton
            display={button.display}
            isActive={
              (editorState?.isBold && button.name === "bold") ||
              (editorState?.isItalic && button.name === "italic") ||
              (editorState?.isStrike && button.name === "strike") ||
              (editorState?.isCode && button.name === "code") ||
              (editorState?.isHeading1 && button.name === "heading 1") ||
              (editorState?.isHeading2 && button.name === "heading 2") ||
              (editorState?.isHeading3 && button.name === "heading 3") ||
              (editorState?.isBulletList && button.name === "bullet list") ||
              (editorState?.isOrderedList && button.name === "ordered list") ||
              (editorState?.isCodeBlock && button.name === "code block") ||
              (editorState?.isBlockquote && button.name === "blockquote") ||
              (editorState?.isHighlight && button.name === "highlight")
            }
            key={button.name}
            name={button.name}
            onClick={button.onClick}
            title={button.name}
          />
        ))}
      </div>
      <button
        aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="absolute top-5 right-1 m-1 rounded border px-2 py-1 hover:bg-background-hover"
        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        type="button"
      >
        {isSidebarCollapsed ? (
          <PanelRightOpen className="bg-transparent" />
        ) : (
          <PanelRightClose className="bg-transparent" />
        )}
      </button>
    </div>
  );
};
