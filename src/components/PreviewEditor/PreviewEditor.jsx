import { convertFromRaw, Editor, convertToRaw, EditorState } from "draft-js";
import React from "react";
import { linkDecorator } from "../Link/Link";
import styled from "styled-components";
const Wrapper = styled.div`
  background: #dddddd;
  color: #006778;
  font-size: 2rem;
  width: 100%;
  height: 100%;
  min-height: 500px;
`;
const Title = styled.div`
  padding: 10px;
  width: 100%;
  text-align: center;
  border-bottom: 1px solid #ccc;
`;
const WrapEditorPreview = styled.div`
  padding: 10px;
`;
const convertToEditorContent = (editorState) => {
  if (editorState.getCurrentContent().hasText()) {
    const editorStateRaw = convertToRaw(editorState.getCurrentContent());
    const content = EditorState.createWithContent(convertFromRaw(editorStateRaw), linkDecorator());
    return content;
  }
  return EditorState.createEmpty();
};

export default function PreviewEditor({ dataRender }) {
  const contentState = convertToEditorContent(dataRender, linkDecorator());

  return (
    <Wrapper>
      <Title>Preview</Title>
      <WrapEditorPreview>
        <Editor editorState={contentState} readOnly={true} />
      </WrapEditorPreview>
    </Wrapper>
  );
}
