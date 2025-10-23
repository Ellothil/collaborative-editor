import { EditorComponent } from "./components/editor";
import { useTiptapEditor } from "./hooks/use-editor";

function App() {
  const editor = useTiptapEditor();

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-background p-8 text-foreground">
      <EditorComponent editor={editor} />
    </div>
  );
}

export default App;
