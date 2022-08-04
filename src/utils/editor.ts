import { convertFromRaw, convertToRaw, DraftDecoratorType, EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

export const convertToPlainText = (editorState: EditorState) => {
  const contentState = editorState.getCurrentContent();
  return contentState.getPlainText();
};

export const convertToJson = (editorState: EditorState) => {
  const contentState = editorState.getCurrentContent();
  const rawJson = convertToRaw(contentState); // This is important
  const jsonStr = JSON.stringify(rawJson, null, 1);
  return jsonStr;
};

export const convertToHtml = (editorState: EditorState, combinesDecorator: DraftDecoratorType) => {
  let content = EditorState.createEmpty();
  if (editorState.getCurrentContent().hasText()) {
    const editorStateRaw = convertToRaw(editorState.getCurrentContent());
    content = EditorState.createWithContent(convertFromRaw(editorStateRaw), combinesDecorator);
  }
  return stateToHTML(content.getCurrentContent());
};
