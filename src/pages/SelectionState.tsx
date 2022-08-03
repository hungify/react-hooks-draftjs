import { EyeOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Form, Input, Modal, Row } from 'antd';
import Draft, { Editor, EditorState } from 'draft-js';
import { useState } from 'react';
import PreviewJson from '~/components/PreviewJson';

export function getJsonSelectionString(editorState: EditorState) {
  // the editorState has a getSelection() method to get the selection
  const selectionState = editorState.getSelection();

  // Sample of some data we can get from the selection state
  const anchorKey = selectionState.getAnchorKey();
  const anchorOffset = selectionState.getAnchorOffset();
  const focusKey = selectionState.getFocusKey();
  const focusOffset = selectionState.getFocusOffset();

  const isBackwards = selectionState.getIsBackward();

  const jsonStr = {
    anchorKey,
    anchorOffset,
    focusKey,
    focusOffset,
    isBackwards,
  };

  return {
    jsonSelectionState: JSON.stringify(jsonStr, null, 1),
  };
}

export default function SelectionState() {
  const [isJsonView, setIsJsonView] = useState(false);
  const [editorState, setEditorState] = useState(() => {
    const contentState = Draft.ContentState.createFromText(
      'SelectionState represents the cursor, its position and what it is selecting. You can use selection to manipulate text such as inserting or deleting.',
    );
    return Draft.EditorState.createWithContent(contentState);
  });

  function handleOnChange(newEditorState: EditorState) {
    setEditorState(newEditorState);
  }

  function handleSetSelection(anchorOffset: number, focusOffset: number) {
    const selectionState = editorState.getSelection();

    // We cannot set the selection state directly because its immutable.
    // So make a copy
    const newSelection = selectionState.merge({
      anchorOffset,
      focusOffset,
    }) as Draft.SelectionState;

    // Draft API helper set the selection into a new editorState
    const newEditorState = Draft.EditorState.forceSelection(editorState, newSelection);

    // update the editorState
    setEditorState(newEditorState);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onSubmitForm(values: any) {
    const anchorOffset = parseInt(values.anchorOffset || 0) || 0;
    const focusOffset = parseInt(values.focusOffset || 0) || 0;

    handleSetSelection(anchorOffset, focusOffset);
  }

  const { jsonSelectionState } = getJsonSelectionString(editorState);
  return (
    <Row gutter={30}>
      {/* Introduction */}
      <Col span={24}>
        <h1>Selection editorState</h1>
        <p>
          SelectionState represents the cursor, its position and what it is selecting. You can use
          selection to manipulate text such as inserting or deleting.
        </p>
      </Col>

      {/* Demo Editor */}
      <Col span={12}>
        <Divider orientation='left'>
          Editor
          <Button
            onClick={() => setIsJsonView(true)}
            shape='circle'
            type='primary'
            icon={<EyeOutlined />}
          />
        </Divider>

        {/* Editor Draft-Js  */}
        <div className='editor'>
          <Editor editorState={editorState} onChange={handleOnChange} />
        </div>

        <Divider orientation='left'>Set Selection by offset</Divider>
        <Form onFinish={onSubmitForm}>
          <Row gutter={30}>
            {/* Anchor Offset Input */}
            <Col span={12}>
              <Form.Item name='anchorOffset'>
                <Input size='large' placeholder='Enter anchorOffset' type='number' />
              </Form.Item>
            </Col>

            {/* Focus Offset Input */}
            <Col span={12}>
              <Form.Item name='focusOffset'>
                <Input size='large' placeholder='Enter focusOffset' type='number' />
              </Form.Item>
            </Col>

            {/* Button Submit */}
            <Col span={24}>
              <Button type='primary' htmlType='submit' size='large'>
                Set Selection
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>

      {/* Json View Selection State */}
      <Col span={12}>
        <Divider orientation='left'>Json View Selection State</Divider>
        <pre>{jsonSelectionState}</pre>
      </Col>

      <Modal
        width='600px'
        visible={isJsonView}
        className='modal-json-view'
        onOk={() => setIsJsonView(false)}
        onCancel={() => setIsJsonView(false)}
      >
        <PreviewJson editorState={editorState} />
      </Modal>
    </Row>
  );
}
