import { EditorState } from 'draft-js';
import { convertToJson } from '~/utils/editor';

interface PreviewJsonProps {
  editorState: EditorState;
}

export default function PreviewJson({ editorState }: PreviewJsonProps) {
  const jsonContent = convertToJson(editorState);

  return <pre>{jsonContent}</pre>;
}
