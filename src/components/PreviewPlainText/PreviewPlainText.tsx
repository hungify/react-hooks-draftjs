import { EditorState } from 'draft-js';
import { convertToPlainText } from '~/utils/editor';

interface PreviewPlainTextProps {
  editorState: EditorState;
}
export default function PreviewPlainText({ editorState }: PreviewPlainTextProps) {
  const plainText = convertToPlainText(editorState);

  return <div>{plainText}</div>;
}
