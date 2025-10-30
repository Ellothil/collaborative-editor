import { HocuspocusProvider } from "@hocuspocus/provider";
import { useEffect, useMemo } from "react";
import { Doc } from "yjs";
import { env } from "@/config/env";
import type { User } from "@/types/user";

// Shared document store
const sharedDocs = new Map<
  string,
  { provider: HocuspocusProvider; yDoc: Doc }
>();

type CollaborationResult = {
  provider: HocuspocusProvider;
  yDoc: Doc;
};

/**
 * Hook to create a collaborative document instance using Hocuspocus.
 * Creates a shared instance of the document store, so that multiple components can share the same
 * collaborative document instance.
 *
 * @param {User} user - The user object to set as the awareness field.
 * @param {string} documentName - The name of the document to create.
 * @returns {CollaborationResult} A result object containing the Hocuspocus provider instance and the Yjs document instance.
 */
export const useCollaboration = (
  user: User,
  documentName = "Welcome (undeletable)"
): CollaborationResult => {
  const { provider, yDoc } = useMemo(() => {
    const existing = sharedDocs.get(documentName);

    if (existing) {
      return existing;
    }

    const newDoc = new Doc();
    const newProvider = new HocuspocusProvider({
      url: env.HOCUSPOCUS_URL.replace("http://", "ws://").replace(
        "https://",
        "wss://"
      ),
      name: documentName,
      document: newDoc,
    });

    newProvider.setAwarenessField("user", {
      name: user.name,
      color: user.color,
    });

    const result = { provider: newProvider, yDoc: newDoc };
    sharedDocs.set(documentName, result);
    return result;
  }, [documentName, user.name, user.color]);

  // Update awareness when user changes
  useEffect(() => {
    provider.setAwarenessField("user", {
      name: user.name,
      color: user.color,
    });
  }, [user.name, user.color, provider]);

  return { provider, yDoc };
};
