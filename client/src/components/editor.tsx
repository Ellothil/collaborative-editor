import { type Editor, EditorContent } from "@tiptap/react";
import { Toolbar } from "./toolbar";

type EditorProps = {
  editor: Editor | null;
};

export const EditorComponent: React.FC<EditorProps> = ({ editor }) => (
  <div className="flex w-full grow flex-col overflow-y-auto border">
    <Toolbar editor={editor} />
    <EditorContent
      className="h-full flex-1 overflow-y-auto p-8"
      editor={editor}
    />
  </div>
);
