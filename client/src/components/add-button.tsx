import axios from "axios";
import { Plus } from "lucide-react";
import { env } from "@/config/env";

type AddButtonProps = {
  setCurrentDoc: (name: string) => void;
};

export const AddButton = ({ setCurrentDoc }: AddButtonProps) => {
  const createNewDocument = async (name: string) => {
    try {
      await axios.post(`${env.BACKEND_URL}/api/documents`, { name });
      setCurrentDoc(name);
    } catch (err) {
      // biome-ignore lint/style/noMagicNumbers: <HTTP 409 Conflict>
      if (axios.isAxiosError(err) && err.response?.status === 409) {
        // biome-ignore lint/suspicious/noAlert: <allow alert for user feedback>
        alert("Document with this name already exists");
      }
    }
  };

  return (
    <div className="my-4 w-full rounded-lg border bg-linear-to-r from-start to-end p-0.5">
      <button
        className="flex w-full items-center justify-center rounded-md bg-background transition-colors hover:bg-linear-to-r hover:from-start hover:to-end"
        onClick={() => {
          // biome-ignore lint/suspicious/noAlert: <use alert for file name input>
          const name = prompt("Enter document name:");
          if (name) {
            createNewDocument(name);
          }
        }}
        type="button"
      >
        <Plus />
      </button>
    </div>
  );
};
