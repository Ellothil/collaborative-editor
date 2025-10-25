import { HocuspocusProvider } from "@hocuspocus/provider";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCaret from "@tiptap/extension-collaboration-caret";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Doc } from "yjs";
import type { User } from "@/types/user";

export const useTiptapEditor = (user: User) => {
  const yDoc = new Doc();

  const provider = new HocuspocusProvider({
    url: "ws://127.0.0.1:1234",
    name: "demo-doc",
    document: yDoc,
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      Typography,
      Collaboration.configure({ document: yDoc }),
      CollaborationCaret.configure({ provider, user }),
    ],
  });

  return editor;
};
