import { HocuspocusProvider } from "@hocuspocus/provider";
import { useEffect, useRef } from "react";
import { Doc } from "yjs";
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
  documentName: string
): CollaborationResult => {
  const providerRef = useRef<HocuspocusProvider | null>(null);
  const yDocRef = useRef<Doc | null>(null);

  // Use shared instances
  if (providerRef.current === null) {
    const existing = sharedDocs.get(documentName);

    if (existing) {
      providerRef.current = existing.provider;
      yDocRef.current = existing.yDoc;
    } else {
      const yDoc = new Doc();
      const provider = new HocuspocusProvider({
        url: "ws://127.0.0.1:1234",
        name: documentName,
        document: yDoc,
      });

      provider.setAwarenessField("user", {
        name: user.name,
        color: user.color,
      });

      sharedDocs.set(documentName, { provider, yDoc });
      providerRef.current = provider;
      yDocRef.current = yDoc;
    }
  }

  useEffect(() => {
    if (providerRef.current) {
      providerRef.current.setAwarenessField("user", {
        name: user.name,
        color: user.color,
      });
    }
  }, [user.name, user.color]);

  if (providerRef.current === null || yDocRef.current === null) {
    throw new Error("Provider and yDoc must be initialized");
  }

  return {
    provider: providerRef.current,
    yDoc: yDocRef.current,
  };
};
