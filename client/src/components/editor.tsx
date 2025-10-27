import { type Editor, EditorContent } from "@tiptap/react";
import type { JSX } from "react";
import { Toolbar } from "./toolbar";

type EditorProps = {
  editor: Editor | null;
  isFilesBarCollapsed: boolean;
  isUserBarCollapsed: boolean;
  setIsFilesBarCollapsed: (collapsed: boolean) => void;
  setIsUserBarCollapsed: (collapsed: boolean) => void;
};

/**
 * A component that renders a Tiptap editor and a toolbar.
 *
 * @param {EditorProps} props - The props for the EditorComponent.
 * @param {Editor | null} props.editor - The Tiptap editor instance.
 * @param {boolean} props.isSidebarCollapsed - Whether the sidebar is collapsed.
 * @param {Function} props.setIsSidebarCollapsed - Function to set the sidebar collapse state.
 * @returns {JSX.Element} A JSX element representing the editor component.
 */
export const EditorComponent = ({
  editor,
  isFilesBarCollapsed,
  isUserBarCollapsed,
  setIsFilesBarCollapsed,
  setIsUserBarCollapsed,
}: EditorProps): JSX.Element => (
  <div
    className={`flex h-full grow flex-col overflow-y-auto transition-all duration-300 ease-in-out ${isFilesBarCollapsed && "rounded-l-xl"} ${isUserBarCollapsed && "rounded-r-xl"} border`}
  >
    <Toolbar
      editor={editor}
      isFilesBarCollapsed={isFilesBarCollapsed}
      isUserBarCollapsed={isUserBarCollapsed}
      setIsFilesBarCollapsed={setIsFilesBarCollapsed}
      setIsUserBarCollapsed={setIsUserBarCollapsed}
    />
    <EditorContent
      className="h-full flex-1 overflow-y-auto p-8"
      editor={editor}
    />
  </div>
);
