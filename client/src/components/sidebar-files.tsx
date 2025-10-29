import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AddButton } from "./add-button";

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

      const response = await axios.get("http://localhost:3000/api/documents");
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

  // Refresh documents when a new document is created
  useEffect(() => {
    const socket = io("http://localhost:3000");

    socket.on("documentCreated", () => {
      fetchDocuments();
    });

    socket.on("documentCreated", () => {
      fetchDocuments();
    });

    return () => {
      socket.disconnect();
    };
  }, [fetchDocuments]);

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
          <AddButton fetchDocuments={fetchDocuments} />
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
                  <button
                    className={`flex cursor-pointer items-center justify-between rounded-md p-2 text-md transition-colors hover:bg-gray-100/50 ${currentDoc === doc.name && "font-bold"}`}
                    key={doc.name}
                    onClick={() => {
                      setCurrentDoc(doc.name);
                    }}
                    type="button"
                  >
                    <span className="truncate">{doc.name}</span>
                  </button>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
