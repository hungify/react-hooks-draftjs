import { convertFromRaw, Editor, convertToRaw, EditorState } from "draft-js";
import React from "react";
import { linkDecorator } from "../Link/Link";

const convertToEditorContent = (editorState) => {
  if (editorState.getCurrentContent().hasText()) {
    const editorStateRaw = convertToRaw(editorState.getCurrentContent());
    return EditorState.createWithContent(convertFromRaw(editorStateRaw), linkDecorator());
  }
  return EditorState.createEmpty();
};

export default function DisplayEditor({ dataRender }) {
  const contentState = convertToEditorContent(dataRender, linkDecorator());

  return <Editor editorState={contentState} readOnly={true} />;
}
