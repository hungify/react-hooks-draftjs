import { EditorState } from 'draft-js';

interface PreviewPlainTextProps {
  editorState: EditorState;
}
export default function PreviewPlainText({ editorState }: PreviewPlainTextProps) {
  const plainText = () => {
    const contentState = editorState.getCurrentContent();
    return contentState.getPlainText();
  };

  return <div>{plainText()}</div>;
}
