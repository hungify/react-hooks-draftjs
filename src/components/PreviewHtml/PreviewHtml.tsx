import draftToHtml from 'draftjs-to-html';
import Draft, { EditorState } from 'draft-js';

interface PreviewPlainTextProps {
  editorState: EditorState;
}
export default function PreviewHtml({ editorState }: PreviewPlainTextProps) {
  function getPreviewHTML() {
    const rawContentState = Draft.convertToRaw(editorState.getCurrentContent());
    const markup = draftToHtml(rawContentState, {
      trigger: '#',
      separator: ' ',
    });
    return markup;
  }

  return (
    <div
      className='preview'
      dangerouslySetInnerHTML={{
        __html: getPreviewHTML(),
      }}
    />
  );
}
