import { Button, Col, Divider, Input, Row } from 'antd';
import Draft, { Editor, EditorState } from 'draft-js';
import { useState } from 'react';
import PreviewJson from '~/components/PreviewJson';

const defaultImage =
  'https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg';

export default function BlockFunction() {
  const [urlImage, setUrlImage] = useState(defaultImage);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  function handleOnChange(newEditorState: EditorState) {
    setEditorState(newEditorState);
  }

  // Step1: create an atomic block with an entity
  function handleInsertImage() {
    // create an entity
    const contentState = editorState.getCurrentContent();

    // set the url of the entity to the url chosen for the image
    const contentStateWithEntity = contentState.createEntity('img', 'IMMUTABLE', { src: urlImage });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });

    // insert a new atomic block with the entity and a whit space as the text - VERY IMPORTANT
    const newEditorStateWithBlock = Draft.AtomicBlockUtils.insertAtomicBlock(
      newEditorState,
      entityKey,
      ' ',
    );

    // setUrlImage('');
    setEditorState(newEditorStateWithBlock);
  }

  // Step3: create the method called by blockRendererFn
  function blockImageRendererFn(contentBlock: Draft.ContentBlock) {
    if (contentBlock.getType() === 'atomic') {
      return {
        // The component is a method that will return our custom react component.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        component: (props: any) => {
          // get the entity
          const entity = props.contentState.getEntity(props.block.getEntityAt(0));
          // get the entity data
          const { src } = entity.getData(); // ???

          // return our custom react component
          return <img src={src} alt={src} className='draftImg' />;
        },
        editable: false,
      };
    }
    return null;
  }

  return (
    <Row gutter={30}>
      <Col span={24}>
        <h1>blockRendererFn</h1>
        <p>The block function allows you to render a block with a custom react component</p>
        <p>In this example, an image is inserted directly into the editor.</p>
      </Col>
      <Col span={12}>
        <Divider orientation='left'>Editor</Divider>

        {/* Controlled Contenteditable */}
        <div className='editor'>
          <Editor
            editorState={editorState}
            onChange={handleOnChange}
            blockRendererFn={blockImageRendererFn} // Step2: Tell the Edit control to render blocks in a custom manner
          />
        </div>

        {/* Insert Image */}
        <Divider orientation='left'>Insert Image</Divider>

        <Row gutter={30}>
          <Col span={24}>
            <Input
              value={urlImage}
              onChange={(e) => setUrlImage(e.target.value)}
              size='large'
              type='text'
              placeholder='Enter the url image'
            />
          </Col>
          <Col span={6}>
            <Button
              style={{ marginTop: '1rem' }}
              onClick={handleInsertImage}
              size='large'
              type='primary'
            >
              Insert Image
            </Button>
          </Col>
        </Row>
      </Col>

      <Col span={12}>
        <Divider orientation='left'>Json View</Divider>
        <PreviewJson editorState={editorState} />
      </Col>
    </Row>
  );
}
