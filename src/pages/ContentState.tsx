import { Col, Divider, Row } from 'antd';
import { Editor, EditorState } from 'draft-js';
import { useState } from 'react';
import PreviewJson from '~/components/PreviewJson';
import PreviewPlainText from '~/components/PreviewPlainText';

export default function ContentState() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  function handleOnChange(newEditorState: EditorState) {
    setEditorState(newEditorState);
  }

  return (
    <Row gutter={30}>
      <Col span={24}>
        <h1>Content state</h1>
        <p>The ContentState object represents</p>
        <ul>
          <li>text in an array of blocks.</li>
          <li>Entities (metadata that accompanies some text)</li>
        </ul>
        <p>
          In this sample you can observe what happens when you type some text. The resulting JSON
          can be stored in a database to recreate the ContentState at a later stage The content
          within a ContentState can be retrieved as follows:
        </p>
      </Col>
      <Col span={12}>
        <Divider orientation='left'>Editor</Divider>

        <div className='editor'>
          <Editor editorState={editorState} onChange={handleOnChange} />
        </div>

        <Divider orientation='left'>Plaintext retrieve from contentState</Divider>
        <PreviewPlainText editorState={editorState} />
      </Col>

      <Col span={12}>
        <Divider orientation='left'>Json View</Divider>
        <PreviewJson editorState={editorState} />
      </Col>
    </Row>
  );
}
