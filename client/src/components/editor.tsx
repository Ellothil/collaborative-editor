import { type Editor, EditorContent } from "@tiptap/react";
import type { JSX } from "react";
import { Toolbar } from "./toolbar";

type EditorProps = {
  editor: Editor | null;
};

/**
 * A component that renders a Tiptap editor and a toolbar.
 *
 * @param {Editor | null} editor - The Tiptap editor instance.
 * @returns {JSX.Element} A JSX element representing the editor component.
 */
export const EditorComponent = ({ editor }: EditorProps): JSX.Element => (
  <div className="flex w-full grow flex-col overflow-y-auto border">
    <Toolbar editor={editor} />
    <EditorContent
      className="h-full flex-1 overflow-y-auto p-8"
      editor={editor}
    />
  </div>
);
