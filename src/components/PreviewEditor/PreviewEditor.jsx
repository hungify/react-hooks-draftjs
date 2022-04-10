import { linkDecorator } from "components/Editor/plugins/Link/Link";
import { convertFromRaw, Editor, convertToRaw, EditorState } from "draft-js";
import React from "react";
import styled from "styled-components";
import { stateToHTML } from "draft-js-export-html";

const Wrapper = styled.div`
  background: #dddddd;
  font-size: 2rem;
  width: 100%;
  height: 100%;
  min-height: 500px;
  max-width: 100%;
  word-wrap: break-word;
  word-break: break-all;
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
  const contentState = convertToEditorContent(dataRender);

  const __html = stateToHTML(dataRender.getCurrentContent());

  return (
    <Wrapper>
      <Title>Preview</Title>
      <WrapEditorPreview>
        <Editor editorState={contentState} readOnly={true} />
        <div>{__html}</div>
      </WrapEditorPreview>
    </Wrapper>
  );
}
