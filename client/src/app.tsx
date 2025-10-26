import type { JSX } from "react";
import { EditorComponent } from "./components/editor";
import { SidebarUser } from "./components/sidebar-user";
import { useTiptapEditor } from "./hooks/use-editor";
import { useName } from "./hooks/use-name";

/**
 * The main application component.
 *
 * @returns {JSX.Element} The JSX element representing the application base.
 */
function App(): JSX.Element {
  const user = useName();

  const editor = useTiptapEditor(user);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background p-8 text-foreground">
      <EditorComponent editor={editor} />
      <SidebarUser user={user} />
    </div>
  );
}

export default App;
