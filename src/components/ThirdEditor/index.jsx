import { convertToRaw, EditorState } from "draft-js";
import { Editor } from "medium-draft";
import "medium-draft/lib/index.css";
import React, { Component } from "react";
import { stateToHTML } from "draft-js-export-html";

export default class ThirdEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
  }

  onEditorStateChange(state) {
    this.setState({
      editorState: state,
    });
  }
  // <Header />

  render() {
    const { editorState } = this.state;
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const html = stateToHTML(editorState.getCurrentContent());

    return (
      <div
        style={{
          height: "100%",
        }}
      >
        <div
          style={{
            overflowY: "auto",
            overflowX: "hidden",
            background: "blue",
            height: "100%",

            width: "100%",
            paddingTop: 50,
          }}
        >
          <Editor editorState={editorState} onChange={this.onEditorStateChange} sideButtons={[]} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: html }}></div>
      </div>
    );
  }
}
