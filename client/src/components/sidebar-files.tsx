import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { env } from "@/config/env";
import { AddButton } from "./add-button";
import { DeleteButton } from "./delete-button";

type Document = {
  name: string;
  updated_at: string;
};

type SidebarFilesProps = {
  isCollapsed: boolean;
  currentDoc: string;
  setCurrentDoc: (name: string) => void;
};

export const SidebarFiles = ({
  isCollapsed,
  currentDoc,
  setCurrentDoc,
}: SidebarFilesProps) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDocuments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`${env.BACKEND_URL}/api/documents`);
      setDocuments(response.data);
    } catch (err) {
      const errorMessage = axios.isAxiosError(err)
        ? err.response?.data?.message || err.message
        : "Failed to load documents";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  // Refresh documents when a new document is created or deleted
  useEffect(() => {
    const socket = io(env.SOCKET_URL);

    socket.on("documentCreated", () => {
      fetchDocuments();
    });

    socket.on("documentDeleted", () => {
      fetchDocuments();
    });

    return () => {
      socket.disconnect();
    };
  }, [fetchDocuments]);

  // Handle current document deletion by checking documents array
  useEffect(() => {
    if (loading || error) {
      return;
    }

    const currentDocStillExists = documents.some(
      (doc) => doc.name === currentDoc
    );
    if (!currentDocStillExists && currentDoc !== "Welcome (undeletable)") {
      setCurrentDoc("Welcome (undeletable)");
    }
  }, [documents, currentDoc, setCurrentDoc, loading, error]);

  return (
    <div
      className={`flex h-full flex-col bg-background transition-all duration-300 ease-in-out ${isCollapsed ? "w-0 opacity-0" : "w-64 overflow-hidden rounded-l-xl border bg-clip-padding opacity-100"}`}
    >
      <div
        className={`flex-1 overflow-y-auto transition-opacity duration-300 ${isCollapsed ? "opacity-0" : "opacity-100"}`}
      >
        <div className="px-4 py-2">
          <h3 className="mb-2 flex h-6 justify-center border-line bg-linear-to-r from-start to-end bg-clip-text font-semibold text-transparent text-xl">
            Files
          </h3>
          <AddButton setCurrentDoc={setCurrentDoc} />
          {loading && <div />}

          {error && (
            <div className="text-red-500 text-sm">
              <p>{error}</p>
              <button
                className="mt-2 text-xs underline hover:text-red-700"
                onClick={fetchDocuments}
                type="button"
              >
                Retry
              </button>
            </div>
          )}

          {!(loading || error) && (
            <div className="flex flex-col gap-2">
              {documents.length === 0 ? (
                <p className="text-gray-500 text-sm">No documents found</p>
              ) : (
                documents.map((doc) => (
                  <div className="flex items-center" key={doc.name}>
                    <button
                      className={`box-border flex grow cursor-pointer items-center truncate rounded-md border-start p-2 pr-0 transition-colors hover:border-l-5 ${currentDoc === doc.name && "font-bold"}`}
                      onClick={() => {
                        setCurrentDoc(doc.name);
                      }}
                      type="button"
                    >
                      <span className="w-full truncate text-left">
                        {doc.name}
                      </span>
                    </button>
                    <DeleteButton docName={doc.name} />
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
