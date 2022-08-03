import { Button, Col, Divider, Form, Input, Row, Select, Tag } from 'antd';
import Draft, { Editor, EditorState } from 'draft-js';
import { useState } from 'react';
import PreviewJson from '~/components/PreviewJson';
import { getJsonSelectionString } from './SelectionState';

function getEntityAtCursor(editorState: EditorState) {
  const selectionState = editorState.getSelection();
  const selectionKey = selectionState.getStartKey();
  const contentState = editorState.getCurrentContent();

  // get the block where the cursor is
  const block = contentState.getBlockForKey(selectionKey);

  // get the Entity key at the where the cursor is
  const entityKey = block.getEntityAt(selectionState.getStartOffset());

  if (entityKey) {
    // use the following method to get the entity instance
    const entityInstance = contentState.getEntity(entityKey);
    const data = entityInstance.getData();
    return data.storedText;
  }

  return '';
}

export default function Entities() {
  const [editorState, setEditorState] = useState(() => {
    const contentState = Draft.ContentState.createFromText(
      'I am a cat in french\nI am walking on sunshine',
    );
    return Draft.EditorState.createWithContent(contentState);
  });

  function handleOnChange(newEditorState: EditorState) {
    setEditorState(newEditorState);
  }

  function handleSetEntity(data: string, mutability: Draft.DraftEntityMutability = 'IMMUTABLE') {
    const contentState = editorState.getCurrentContent();

    // the entity is created from the content state and returns the actual entity
    // we don't need the actual entity but we do need a key
    contentState.createEntity('myEntityIdentifier', mutability, { storedText: data });

    // This is how we get the key
    const entityKey = contentState.getLastCreatedEntityKey();

    // get the current selection
    const selectionState = editorState.getSelection();

    // associate the text in the selection (from - to) to the entity and get a new content state
    const newContentState = Draft.Modifier.applyEntity(contentState, selectionState, entityKey);

    // add the new content state to the existing editor state and return a new editorState
    const newEditorState = Draft.EditorState.push(editorState, newContentState, 'apply-entity');

    // update the Edit State
    setEditorState(newEditorState);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onSubmitForm(values: any) {
    const data = values.data;
    const mutability = values.mutability;

    handleSetEntity(data, mutability);
  }

  const retrievedData = getEntityAtCursor(editorState);
  return (
    <Row gutter={30}>
      {/* Introduction */}
      <Col span={24}>
        <h1>Entities</h1>
        <p>
          Entities allow you to store <strong>Metadata</strong> along with a section of text. The
          range of text is determined by a selection state
        </p>
        <p>
          In the sample you can create an Entity by selecting a range of text and clicking the
          create entity button.
        </p>
      </Col>

      <Col span={12}>
        <Divider orientation='left'>Editor</Divider>

        {/* Controlled Contenteditable */}
        <div className='editor'>
          <Editor editorState={editorState} onChange={handleOnChange} />
        </div>

        {/* Form create a entity */}
        <Divider orientation='left'>Create an entity</Divider>
        <Form onFinish={onSubmitForm} initialValues={{ data: '', mutability: 'MUTABLE' }}>
          <Row gutter={30}>
            {/* Anchor Offset Input */}
            <Col span={12}>
              <Form.Item name='data'>
                <Input size='large' placeholder='Data string to save' />
              </Form.Item>
            </Col>

            {/* Focus Offset Input */}
            <Col span={12}>
              <Form.Item name='mutability'>
                <Select size='large'>
                  <Select.Option value='MUTABLE'>MUTABLE</Select.Option>
                  <Select.Option value='IMMUTABLE'>IMMUTABLE</Select.Option>
                  <Select.Option value='SEGMENTED'>SEGMENTED</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            {/* Button Submit */}
            <Col span={12}>
              <Button type='primary' htmlType='submit' size='large'>
                Set Selection
              </Button>
            </Col>

            {/* Retrieved Data based on selection state */}
            <Col>
              <h3>Retrieved Data {retrievedData && <Tag color='#87d068'>{retrievedData}</Tag>}</h3>
            </Col>
          </Row>
        </Form>

        {/* Json View of Selection State */}
        <Divider orientation='left'>Json View Selection State</Divider>
        <pre>{getJsonSelectionString(editorState).jsonSelectionState}</pre>
      </Col>

      <Col span={12}>
        <Divider orientation='left'>Json View</Divider>
        <PreviewJson editorState={editorState} />
      </Col>
    </Row>
  );
}
