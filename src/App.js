import RichEditor from "components/Editor";
import RichEditorPlugin from "components/EditorPlugin";
import "draft-js/dist/Draft.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <RichEditor />
      <RichEditorPlugin />
    </div>
  );
}

export default App;
