import type { HocuspocusProvider } from "@hocuspocus/provider";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCaret from "@tiptap/extension-collaboration-caret";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import { type Editor, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import type { Doc } from "yjs";
import type { User } from "@/types/user";

/**
 * Returns a Tiptap editor instance with the given user as the collaborator.
 *
 * @param {User} user - The user to set as the collaborator.
 * @returns {Editor} - The Tiptap editor instance.
 */
export const useTiptapEditor = (
  user: User,
  provider: HocuspocusProvider,
  yDoc: Doc
): Editor => {
  const editor: Editor = useEditor({
    extensions: [
      StarterKit.configure({ undoRedo: false }),
      Highlight,
      Typography,
      Collaboration.configure({ document: yDoc }),
      CollaborationCaret.configure({ provider, user }),
    ],
  });

  return editor;
};
