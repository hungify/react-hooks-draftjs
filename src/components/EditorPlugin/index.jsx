import React, { useState, useRef } from "react";
import Editor from "@draft-js-plugins/editor";
import { EditorState, RichUtils, AtomicBlockUtils } from "draft-js";
import "draft-js/dist/Draft.css";
import styled from "styled-components";
import ImageIcon from "images/icons/image_black_24dp.svg";
import Modal from "components/EditorPlugin/components/Modal";
import InlineStyleControls from "components/EditorPlugin/InlineStyleControls";
import Image from "components/EditorPlugin/components/Image";

const DraftJsEditor = () => {
  const editor = useRef(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [state, setState] = useState({
    editorState: EditorState.createEmpty(),
    showURLInput: false,
    urlValue: "",
    urlType: "",
  });

  const handleChange = (editorState) => setState({ ...state, editorState });

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      handleChange(newState);
      return true;
    }
    return false;
  };

  const toggleInlineStyle = (inlineStyle) => {
    handleChange(RichUtils.toggleInlineStyle(state.editorState, inlineStyle));
  };

  const imageBlockRenderer = (block) => {
    if (block.getType() === "atomic") {
      return {
        component: Image,
        editable: false,
      };
    }
    return null;
  };

  const insertImage = ({ url }) => {
    const { editorState } = state;
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity("image", "IMMUTABLE", { src: url });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });
    setState({
      editorState: AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " "),
      showURLInput: false,
      urlValue: "",
    });
  };

  return (
    <>
      <Container>
        <h2>DraftEditor</h2>
        <OuterEditor>
          <Toolbar>
            <FormatButtonsGroup>
              <InlineStyleControls onToggle={toggleInlineStyle} editorState={state.editorState} />
            </FormatButtonsGroup>
            <Divider />
            <StyledButton onClick={() => handleOpen()}>
              <img src={ImageIcon} alt="a" />
            </StyledButton>
            <Divider />
          </Toolbar>

          <EditorContainer onClick={() => editor.current.focus()}>
            <Editor
              blockRendererFn={imageBlockRenderer}
              ref={editor}
              editorState={state.editorState}
              handleKeyCommand={handleKeyCommand}
              onChange={handleChange}
              placeholder="Type something..."
            />
          </EditorContainer>
        </OuterEditor>
      </Container>
      <Modal open={open} handleClose={handleClose} addImage={insertImage} />
    </>
  );
};

const StyledButton = styled.button`
  height: 24px;
  width: 24px;
  padding: 0;
  border: none;
  margin-right: 4px;
  background-color: #fff;
  &.is-active {
    background-color: #855cd6;
    border-radius: 4px;
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
`;

const OuterEditor = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  width: 600px;
  background: #f4f6f7;
  border-radius: 8px;
`;

const EditorContainer = styled.div`
  :focus {
    border: solid 2px black;
    border-radius: 4px;
  }
  padding: 10px;
  overflow-y: auto;
  height: 165px;
  max-height: 165px;
  width: 560px;
  cursor: text;
  margin: 0 50px 0 50px;
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border-radius: 4px;
  background-color: #fff;
  padding: 5px;
  margin-bottom: 10px;
`;

const FormatButtonsGroup = styled.div`
  :first-child {
    margin-left: 15px;
  }
`;

const Divider = styled.div`
  border-left: 1px solid #cacbd5;
  height: 24px;
  margin: 0 10px;
`;

export default DraftJsEditor;
