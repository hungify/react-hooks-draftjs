import { EyeOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Input, Modal, Row } from 'antd';
import Draft, { Editor, EditorState } from 'draft-js';
import { useState } from 'react';
import PreviewJson from '~/components/PreviewJson';

const jsonObject = {
  entityMap: {},
  blocks: [
    {
      key: '5h45l',
      text: 'the quick brown fox jumps over the lazy dog ',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [
        {
          offset: 4,
          length: 5,
          style: 'ITALIC',
        },

        {
          offset: 10,
          length: 5,
          style: 'UNDERLINE',
        },
        {
          offset: 16,
          length: 3,
          style: 'BOLD',
        },
      ],
      entityRanges: [],
      data: {},
    },
  ],
};

// console.log(Draft.DefaultDraftInlineStyle);

export default function CreateContentState() {
  const [isJsonView, setIsJsonView] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  function handleOnChange(newEditorState: EditorState) {
    setEditorState(newEditorState);
  }

  function createWithPlainText(text: string) {
    const contentState = Draft.ContentState.createFromText(text);
    const newEditorState = Draft.EditorState.createWithContent(contentState);
    setEditorState(newEditorState);
  }

  function createWithHTML(html: string) {
    const { contentBlocks, entityMap } = Draft.convertFromHTML(html);
    const contentState = Draft.ContentState.createFromBlockArray(contentBlocks, entityMap);
    const newEditorState = Draft.EditorState.createWithContent(contentState);
    setEditorState(newEditorState);
  }

  function createWithJsonObject() {
    const contentState = Draft.convertFromRaw(jsonObject as Draft.RawDraftContentState);
    const newEditorState = Draft.EditorState.createWithContent(contentState);
    setEditorState(newEditorState);
  }

  return (
    <Row gutter={30}>
      <Col span={24}>
        <h1>Creating content</h1>
        <p>
          There will be times when we want to initiate an Edit control with text. To do this we must
          first create a new content state. There are a few ways to do this.
        </p>
        <ul>
          <li>plain text</li>
          <li>HTML</li>
          <li>a JSON object</li>
        </ul>
      </Col>

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

        <div className='editor'>
          <Editor editorState={editorState} onChange={handleOnChange} />
        </div>

        {/* Create EditorState from the plain text */}
        <Divider orientation='left'>Create from PlainText</Divider>
        <Input.Search
          size='large'
          enterButton='Create with text'
          defaultValue='This is a plain string of text'
          onSearch={createWithPlainText}
        />

        {/* Create EditorState from the HTML text */}
        <Divider orientation='left'>Create from HTML</Divider>
        <Input.Search
          size='large'
          enterButton='Create with HTML'
          defaultValue='<h1>Header</h1> <b>Bold text</b>, <i>Italic text</i><br/ ><br />'
          onSearch={createWithHTML}
        />

        {/* Create EditorState from the Json Object */}
        <Divider orientation='left'>Create from Json Object</Divider>
        <Input.Search
          size='large'
          className='json-object-input'
          enterButton='Create with JSON'
          defaultValue='See json in document on the right side'
          onSearch={createWithJsonObject}
        />
      </Col>

      <Col span={12}>
        <Divider orientation='left'>Json Document</Divider>
        <PreviewJson editorState={editorState} />
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
