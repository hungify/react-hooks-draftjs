import { convertToRaw, EditorState } from 'draft-js';

interface PreviewJsonProps {
  editorState: EditorState;
}
export default function PreviewJson({ editorState }: PreviewJsonProps) {
  const jsonContent = () => {
    const contentState = editorState.getCurrentContent();
    const rawJson = convertToRaw(contentState); // This is important
    const jsonStr = JSON.stringify(rawJson, null, 1);
    return jsonStr;
  };

  return <pre>{jsonContent()}</pre>;
}
