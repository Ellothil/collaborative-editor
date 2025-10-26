import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCaret from "@tiptap/extension-collaboration-caret";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import { type Editor, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import type { User } from "@/types/user";
import { useCollaboration } from "./use-collaboration";

/**
 * Returns a Tiptap editor instance with the given user as the collaborator.
 *
 * @param {User} user - The user to set as the collaborator.
 * @returns {Editor} - The Tiptap editor instance.
 */
export const useTiptapEditor = (user: User): Editor => {
  const { provider, yDoc } = useCollaboration(user);

  const editor: Editor = useEditor({
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
