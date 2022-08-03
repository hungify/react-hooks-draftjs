import { Col, Divider, Row } from 'antd';
import { Editor, EditorState } from 'draft-js';
import { useState } from 'react';
import PreviewPlainText from '~/components/PreviewPlainText';

export default function Simple() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  function handleOnChange(newEditorState: EditorState) {
    setEditorState(newEditorState);
  }

  return (
    <Row gutter={30}>
      <Col span={12}>
        <Divider orientation='left'>Editor</Divider>

        {/* Controlled Contenteditable */}
        <div className='editor'>
          <Editor editorState={editorState} onChange={handleOnChange} />
        </div>
      </Col>

      <Col span={12}>
        <Divider orientation='left'>Preview</Divider>
        <PreviewPlainText editorState={editorState} />
      </Col>
    </Row>
  );
}
