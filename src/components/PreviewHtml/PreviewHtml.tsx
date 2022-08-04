import { EditorState } from 'draft-js';
import { convertToHtml } from '~/utils/editor';
import compositeDecorator from '../RichEditor/plugins';

interface PreviewHtmlProps {
  editorState: EditorState;
}

export default function PreviewHtml({ editorState }: PreviewHtmlProps) {
  const __html = convertToHtml(editorState, compositeDecorator);

  return (
    <div
      className='preview'
      dangerouslySetInnerHTML={{
        __html,
      }}
    />
  );
}
