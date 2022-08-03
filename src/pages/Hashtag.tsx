import { Col, Divider, Row } from 'antd';
import Draft, { Editor, EditorState } from 'draft-js';
import { useState } from 'react';
import PreviewHtml from '~/components/PreviewHtml';

type Callback = (start: number, end: number) => void;

const regexStrategy = (block: Draft.ContentBlock, callback: Callback) => {
  const text = block.getText();
  let result: RegExpExecArray | null = null;
  const regex = /(^|\s)#\w+/g;

  // Lorem ipsum #hashtag1 Lorem ipsum #hashtag2
  while ((result = regex.exec(text) as RegExpExecArray) != null) {
    const start = result.index === 0 ? 0 : result.index + 1;
    const end = start === 0 ? start + result[0]!.length : start + result[0]!.length - 1;
    callback(start, end);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const regexComponent = (props: any) => {
  return <span style={{ backgroundColor: '#dce6f8' }}>{props.children}</span>;
};

const compositeDecorator = new Draft.CompositeDecorator([
  {
    strategy: regexStrategy,
    component: regexComponent,
  },
]);

export default function Hashtag() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty(compositeDecorator));

  function handleOnChange(newEditorState: EditorState) {
    setEditorState(newEditorState);
  }

  return (
    <Row gutter={30}>
      <Col span={24}>
        <h1>use #tag regex to find matches</h1>
      </Col>
      <Col span={12}>
        <Divider orientation='left'>Editor</Divider>

        {/* Controlled Contenteditable */}
        <div className='editor'>
          <Editor editorState={editorState} onChange={handleOnChange} />
        </div>
      </Col>

      <Col span={12}>
        <Divider orientation='left'>Preview</Divider>
        <PreviewHtml editorState={editorState} />
      </Col>
    </Row>
  );
}
