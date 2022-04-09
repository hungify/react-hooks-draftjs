import { Editor, EditorState, RichUtils } from "draft-js";
import React from "react";
import styled from "styled-components";
import DisplayEditor from "../DisplayEditor/DisplayEditor";
import InputLink from "../InputLink/InputLink";
import { linkDecorator } from "../Link/Link";
import Toolbar from "../Toolbar/Toolbar";
const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

const RichEditorRoot = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  font-family: "Georgia", serif;
  font-size: 14px;
  padding: 15px;
`;

export default function RichEditor() {
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty(linkDecorator()));
  const editorRef = React.useRef(null);
  const urlRef = React.useRef(null);
  const [showURLInput, setShowURLInput] = React.useState(false);
  const [urlValue, setUrlValue] = React.useState("");

  React.useEffect(() => {
    editorRef.current.focus();
  }, []);

  React.useEffect(() => {
    if (showURLInput) {
      setTimeout(() => urlRef.current.focus(), 0);
    }
  }, [showURLInput]);

  const handleOpenModal = (e) => {
    e.preventDefault();
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent();
      const startKey = editorState.getSelection().getStartKey();
      const startOffset = editorState.getSelection().getStartOffset();
      const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
      const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);
      if (linkKey) {
        const linkInstance = contentState.getEntity(linkKey);
        setUrlValue(linkInstance.getData().url);
      } else {
        setUrlValue("");
      }
      setShowURLInput(true);
    }
  };

  const handleConfirmLink = (e) => {
    e.preventDefault();
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity("LINK", "MUTABLE", { url: urlValue });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    setEditorState(RichUtils.toggleLink(newEditorState, newEditorState.getSelection(), entityKey));
    setShowURLInput(false);
    setUrlValue("");
  };

  const handleRemoveLink = (e) => {
    e.preventDefault();
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      setEditorState(RichUtils.toggleLink(editorState, selection, null));
    }
    setShowURLInput(false);
  };

  const handleToggleBlockType = (blockType, e, active) => {
    if (blockType === "link" && active) {
      handleOpenModal(e);
    } else {
      setShowURLInput(false);
    }
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const handleToggleInlineType = (inlineType) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineType));
  };

  return (
    <RichEditorRoot>
      <Toolbar
        editorState={editorState}
        onInlineToggle={handleToggleInlineType}
        onBlockToggle={handleToggleBlockType}
        layout="vertical"
      />
      {showURLInput && (
        <div>
          <InputLink
            ref={urlRef}
            type="text"
            urlValue={urlValue}
            onInputChange={(value) => setUrlValue(value)}
            onConfirmLink={handleConfirmLink}
            onRemoveLink={handleRemoveLink}
            onEnterDown={(e) => e.key === "Enter" && handleConfirmLink(e)}
          />
        </div>
      )}

      <div className="RichEditor-editor" onClick={() => editorRef.current.focus()}>
        <Editor
          blockStyleFn={getBlockStyle}
          customStyleMap={styleMap}
          editorState={editorState}
          onChange={(value) => setEditorState(value)}
          placeholder="Tell a story..."
          ref={editorRef}
        />
      </div>
      <DisplayEditor dataRender={editorState} />
    </RichEditorRoot>
  );
}
function getBlockStyle(block) {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    case "new-block-type-name":
      return {
        editable: false,
      };
    default:
      return null;
  }
}
