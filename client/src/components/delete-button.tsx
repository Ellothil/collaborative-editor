import axios from "axios";
import { Trash } from "lucide-react";

type DeleteButtonProps = {
  docName: string;
};

export const DeleteButton = ({ docName }: DeleteButtonProps) => {
  const deleteDocument = async () => {
    // biome-ignore lint/suspicious/noAlert: <allow confirm for user confirmation>
    const confirmed = window.confirm(
      `Are you sure you want to delete "${docName}"?`
    );
    if (!confirmed) {
      return;
    }

    try {
      await axios.delete("http://localhost:3000/api/documents", {
        data: { name: docName },
      });
    } catch (err) {
      // biome-ignore lint/style/noMagicNumbers: <HTTP 404 Not Found>
      if (axios.isAxiosError(err) && err.response?.status === 404) {
        // biome-ignore lint/suspicious/noAlert: <allow alert for user feedback>
        alert("Document does not exist");
      }
    }
  };

  return (
    <button
      className="flex h-8 w-8 items-center justify-center rounded-lg p-1.5 hover:bg-gray-100/40 disabled:cursor-not-allowed disabled:opacity-50"
      disabled={docName === "Welcome (undeletable)"}
      onClick={deleteDocument}
      type="button"
    >
      <Trash className="h-4 w-4" />
    </button>
  );
};
