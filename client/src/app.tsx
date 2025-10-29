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
  const [currentDoc, setCurrentDoc] = useState<string>("welcome");

  const [user] = useState(useName());
  const { provider, yDoc } = useCollaboration(user, currentDoc);
  const editor = useTiptapEditor(user, provider, yDoc);

  const [isUserBarCollapsed, setIsUserBarCollapsed] = useState(false);
  const [isFilesBarCollapsed, setIsFilesBarCollapsed] = useState(false);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-linear-to-r from-start to-end p-8 text-foreground">
      <SidebarFiles
        currentDoc={currentDoc}
        isCollapsed={isFilesBarCollapsed}
        setCurrentDoc={setCurrentDoc}
      />
      <EditorComponent
        editor={editor}
        isFilesBarCollapsed={isFilesBarCollapsed}
        isUserBarCollapsed={isUserBarCollapsed}
        setIsFilesBarCollapsed={setIsFilesBarCollapsed}
        setIsUserBarCollapsed={setIsUserBarCollapsed}
      />
      <SidebarUser isCollapsed={isUserBarCollapsed} user={user} />
    </div>
  );
}

export default App;
