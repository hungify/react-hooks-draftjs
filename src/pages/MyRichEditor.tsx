import { Col, Divider, Row } from 'antd';
import { EditorState } from 'draft-js';
import { useState } from 'react';
import PreviewHtml from '../components/PreviewHtml';
import RichEditor from '../components/RichEditor';
import compositeDecorator from '../components/RichEditor/plugins';

export default function MyRichEditor() {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty(compositeDecorator));

  return (
    <Row gutter={30}>
      <Col span={12}>
        <Divider orientation="left">Editor</Divider>

        {/* Controlled Contenteditable */}
        <RichEditor editorState={editorState} setEditorState={setEditorState} />
      </Col>

      <Col span={12}>
        <Divider orientation="left">Preview</Divider>
        <PreviewHtml editorState={editorState} />
      </Col>
    </Row>
  );
}
