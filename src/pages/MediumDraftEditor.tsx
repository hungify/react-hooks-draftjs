import { Col, Divider, Row } from 'antd';
import { EditorState } from 'draft-js';
import { Editor } from 'medium-draft';
import 'medium-draft/lib/index.css';
import { useState } from 'react';
import PreviewHtml from '../components/PreviewHtml';

export default function MediumDraftEditor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleEditorChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
  };

  return (
    <Row gutter={30}>
      <Col span={12}>
        <Divider orientation="left">Third Party Medium Draft Editor</Divider>

        {/* Controlled Contenteditable */}
        <div className="editor">
          <Editor editorState={editorState} onChange={handleEditorChange} sideButtons={[]} />
        </div>
      </Col>

      <Col span={12}>
        <Divider orientation="left">Preview</Divider>
        <PreviewHtml editorState={editorState} />
      </Col>
    </Row>
  );
}
