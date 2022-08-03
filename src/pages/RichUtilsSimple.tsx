import { Col, Divider, Row } from 'antd';
import Draft, { Editor, EditorState, RichUtils } from 'draft-js';
import { useState } from 'react';
import PreviewJson from '../components/PreviewJson';

export default function RichUtilsSimple() {
  const [editorState, setEditorState] = useState(() => {
    const contentState = Draft.ContentState.createFromText(
      'I am a cat in french. I am walking on sunshine'
    );
    return EditorState.createWithContent(contentState);
  });

  function handleOnChange(newEditorState: EditorState) {
    setEditorState(newEditorState);
  }

  const handleBoldShortcut = (): Draft.DraftHandleValue => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
    return 'handled';
  };
  const handleItalicShortcut = (): Draft.DraftHandleValue => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
    return 'handled';
  };
  const handleUnderlineShortcut = (): Draft.DraftHandleValue => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
    return 'handled';
  };

  function handleKeyCommand(command: string): Draft.DraftHandleValue {
    switch (command) {
      case 'bold':
        return handleBoldShortcut();
      case 'italic':
        return handleItalicShortcut();
      case 'underline':
        return handleUnderlineShortcut();
      default:
        return 'not-handled';
    }
  }

  return (
    <Row gutter={30}>
      <Col span={24}>
        <h2>Try highlighting a section then press</h2>
        <ul>
          <li>Ctrl + B</li>
          <li>Ctrl + U</li>
          <li>Ctrl + I</li>
        </ul>
      </Col>
      <Col span={12}>
        <Divider orientation="left">Editor</Divider>

        {/* Controlled Contenteditable */}
        <div className="editor">
          <Editor
            editorState={editorState}
            onChange={handleOnChange}
            handleKeyCommand={handleKeyCommand}
          />
        </div>
      </Col>

      <Col span={12}>
        <Divider orientation="left">Json View</Divider>
        <PreviewJson editorState={editorState} />
      </Col>
    </Row>
  );
}
