import { type JSX, useState } from "react";
import { EditorComponent } from "@/components/editor";
import { SidebarUser } from "@/components/sidebar-user";
import { useCollaboration } from "@/hooks/use-collaboration";
import { useTiptapEditor } from "@/hooks/use-editor";
import { useName } from "@/hooks/use-name";
import { SidebarFiles } from "./components/sidebar-files";

/**
 * The main application component.
 *
 * @returns {JSX.Element} The JSX element representing the application base.
 */
function App(): JSX.Element {
  const [currentDocName, setCurrentDocName] = useState<string>("welcome-doc");

  const [user] = useState(useName());
  const { provider, yDoc } = useCollaboration(user, currentDocName);
  const editor = useTiptapEditor(user, provider, yDoc);

  const [isUserBarCollapsed, setIsUserBarCollapsed] = useState(false);
  const [isFilesBarCollapsed, setIsFilesBarCollapsed] = useState(false);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-linear-to-r from-[#5c8fd6] to-[#09288f69] p-8 text-foreground">
      <SidebarFiles isCollapsed={isFilesBarCollapsed} provider={provider} />
      <EditorComponent
        editor={editor}
        isFilesBarCollapsed={isFilesBarCollapsed}
        isUserBarCollapsed={isUserBarCollapsed}
        setIsFilesBarCollapsed={setIsFilesBarCollapsed}
        setIsUserBarCollapsed={setIsUserBarCollapsed}
      />
      <SidebarUser isCollapsed={isUserBarCollapsed} provider={provider} />
    </div>
  );
}

export default App;
