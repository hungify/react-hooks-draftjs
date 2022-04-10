import { Editor, EditorState, RichUtils } from "draft-js";
import React from "react";
import styled from "styled-components";
import { AtomicBlockUtils } from "draft-js";
import Prompt from "components/Editor/components/Prompt";
import Toolbar from "components/Editor/components/Toolbar";
import PreviewEditor from "components/PreviewEditor/PreviewEditor";
import { linkDecorator } from "components/Editor/plugins/Link/Link";
import Media from "components/Editor/plugins/Media/Media";
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
  font-family: "Georgia", serif;
  padding: 15px;
  font-size: 2rem;
  display: flex;
  justify-content: space-around;
`;
const WrapEditor = styled.div`
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  width: 100%;
`;

const EditorInner = styled.div`
  min-height: 300px;
  padding: 20px;
`;

export default function RichEditor() {
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty(linkDecorator()));
  const editorRef = React.useRef(null);
  const urlRef = React.useRef(null);
  const [showURLInput, setShowURLInput] = React.useState(false);
  const [urlValue, setUrlValue] = React.useState("");
  const [urlType, setUrlType] = React.useState("");

  React.useEffect(() => {
    editorRef.current.focus();
  }, []);

  React.useEffect(() => {
    if (showURLInput) {
      setTimeout(() => urlRef.current.focus(), 0);
    }
  }, [showURLInput]);

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return true;
    }
    return false;
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
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const handleToggleInlineType = (inlineType, e, active) => {
    if (inlineType === "LINK" && active) {
      setUrlType(inlineType);
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
    } else if (inlineType === "IMAGE" && active) {
      setShowURLInput(true);
      setUrlType(inlineType);
      setUrlValue("");
    } else {
      setShowURLInput(false);
    }
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineType));
  };

  const handleConfirmLink = (e) => {
    e.preventDefault();
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(urlType, "MUTABLE", { url: urlValue });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    setEditorState(RichUtils.toggleLink(newEditorState, newEditorState.getSelection(), entityKey));
    setShowURLInput(false);
    setUrlValue("");
  };
  const handleConfirmImage = (e) => {
    e.preventDefault();
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(urlType, "IMMUTABLE", {
      src: urlValue,
    });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    setEditorState(AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " "));
    setShowURLInput(false);
    setUrlValue("");
  };

  const handleConfirm = (e, type) => {
    if (type === "IMAGE") {
      handleConfirmImage(e);
    } else if (type === "LINK") {
      handleConfirmLink(e);
    }
  };

  const handleEnterDown = (e, type) => {
    if (type === "IMAGE") {
      handleConfirmImage(e);
    } else if (type === "LINK") {
      handleConfirmLink(e);
    }
  };

  return (
    <RichEditorRoot>
      <WrapEditor>
        <Toolbar
          editorState={editorState}
          onInlineToggle={handleToggleInlineType}
          onBlockToggle={handleToggleBlockType}
          layout="vertical"
        />

        {showURLInput && (
          <Prompt
            ref={urlRef}
            type="text"
            urlValue={urlValue}
            onInputChange={(value) => setUrlValue(value)}
            onConfirm={handleConfirm}
            urlType={urlType}
            onRemoveLink={handleRemoveLink}
            onEnterDown={handleEnterDown}
          />
        )}

        <EditorInner onClick={() => editorRef.current.focus()}>
          <Editor
            blockRendererFn={mediaBlockRenderer}
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            onChange={(value) => setEditorState(value)}
            placeholder="Tell a story..."
            handleKeyCommand={handleKeyCommand}
            ref={editorRef}
          />
        </EditorInner>
      </WrapEditor>
      <PreviewEditor dataRender={editorState} />
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

function mediaBlockRenderer(block) {
  if (block.getType() === "atomic") {
    return {
      component: Media,
      editable: false,
    };
  }

  return null;
}
