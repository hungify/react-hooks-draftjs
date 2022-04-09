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
  const editorRef = React.useRef();
  const [urlValue, setUrlValue] = React.useState("");
  const urlRef = React.useRef();
  const [showModalLink, setShowModalLink] = React.useState(false);

  function focusEditor() {
    editorRef.current.focus();
  }

  React.useEffect(() => {
    focusEditor();
  }, []);

  const handleOpenPrompt = (e) => {
    setShowModalLink(true);
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
      setShowModalLink(true);
      setTimeout(() => {
        editorRef.urlRef.focus();
      }, 0);
    }
  };

  const handleConfirmLink = (e) => {
    e.preventDefault();
    const contentState = editorState.getCurrentContent();

    const contentStateWithEntity = contentState.createEntity("LINK", "MUTABLE", { url: urlValue });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

    const nextEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });

    const newNextEditorState = RichUtils.toggleLink(
      nextEditorState,
      nextEditorState.getSelection(),
      entityKey
    );

    setEditorState(newNextEditorState);
    setShowModalLink(false);
    setUrlValue("");
    setTimeout(() => editorRef.current.focus(), 0);
  };

  const handleRemoveLink = (e) => {
    e.preventDefault();
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      setEditorState(RichUtils.toggleLink(editorState, selection, null));
    }
    setShowModalLink(false);
  };

  const handleToggleBlockType = (blockType, active) => {
    if (blockType === "link") {
      setShowModalLink(active);
    } else {
      setShowModalLink(false);
    }
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const handleToggleInlineType = (inlineType, e, active) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineType));
  };

  return (
    <RichEditorRoot className="RichEditor-root">
      <Toolbar
        editorState={editorState}
        onInlineToggle={handleToggleInlineType}
        onBlockToggle={handleToggleBlockType}
        layout="vertical"
      />
      {showModalLink && (
        <div>
          <InputLink
            ref={urlRef}
            type="text"
            value={urlValue}
            onInputChange={(value) => setUrlValue(value)}
            onConfirmLink={handleConfirmLink}
            onRemoveLink={handleRemoveLink}
          />
        </div>
      )}

      <div className="RichEditor-editor" onClick={focusEditor}>
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
