import RichEditor from "components/Editor";
import RichEditorPlugin from "components/EditorPlugin";
import ThirdEditor from "components/ThirdEditor";
import "draft-js/dist/Draft.css";
import React from "react";
import "./App.css";

function App() {

  return (
    <div className="App">
      <RichEditor />
      <RichEditorPlugin />
      <ThirdEditor />
    </div>
  );
}

export default App;
