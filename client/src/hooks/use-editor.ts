import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export const useTiptapEditor = () => {
  const editor = useEditor({
    extensions: [StarterKit, Highlight, Typography],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none",
      },
    },
    content: "<p>Hello World</p>",
  });

  return editor;
};
