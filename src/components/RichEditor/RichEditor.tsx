import styled from '@emotion/styled';
import {
  AtomicBlockUtils,
  ContentBlock,
  DraftHandleValue,
  DraftStyleMap,
  Editor,
  EditorState,
  RichUtils,
} from 'draft-js';
import React, { useMemo, useState } from 'react';
import PromptLink from './components/Prompt';
import Toolbar from './components/Toolbar';
import { Media } from './plugins';

const styleMap: DraftStyleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: '3px 8px',
  },
};

const RichEditorRoot = styled.div`
  background: #fff;
  font-size: 1.5rem;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  padding: 20px;
`;
const WrapEditor = styled.div`
  width: 100%;
`;

const EditorInner = styled.div`
  border-top: 1px solid #ddd;
  min-height: 100px;
  padding: 10px 0px;
`;

interface RichEditorProps {
  editorState: EditorState;
  setEditorState: (editorState: EditorState) => void;
}

export default function RichEditor({ editorState, setEditorState }: RichEditorProps) {
  const [showURLInput, setShowURLInput] = useState(false);
  const [urlValue, setUrlValue] = useState('');
  const [urlType, setUrlType] = useState('');

  const editorRef = React.useRef<Editor | null>(null);
  const urlRef = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, []);

  React.useEffect(() => {
    if (showURLInput) {
      setTimeout(() => {
        if (urlRef.current) {
          urlRef.current.focus();
        }
      }, 0);
    }
  }, [showURLInput]);

  const handleKeyCommand = (command: string, editorState: EditorState): DraftHandleValue => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const handleRemoveLink = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      setEditorState(RichUtils.toggleLink(editorState, selection, null));
      setEditorState(editorState);
    }
    setShowURLInput(false);
  };

  const handleToggleBlockType = (blockType: string) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const handleToggleInlineType = (
    inlineType: string,
    evt: React.MouseEvent<HTMLButtonElement>,
    active: boolean,
  ) => {
    if (inlineType === 'LINK' && active) {
      setUrlType(inlineType);
      evt.preventDefault();
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
          setUrlValue('');
        }
        setShowURLInput(true);
      }
    } else if (inlineType === 'IMAGE' && active) {
      setShowURLInput(true);
      setUrlType(inlineType);
      setUrlValue('');
    } else {
      setShowURLInput(false);
    }
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineType));
  };

  const handleConfirmLink = (
    evt: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>,
  ) => {
    evt.preventDefault();
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(urlType, 'MUTABLE', { url: urlValue });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    setEditorState(RichUtils.toggleLink(newEditorState, newEditorState.getSelection(), entityKey));
    setShowURLInput(false);
    setUrlValue('');
  };

  const handleConfirmImage = (
    evt: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>,
  ) => {
    evt.preventDefault();
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(urlType, 'IMMUTABLE', {
      src: urlValue,
    });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    setShowURLInput(false);
    setUrlValue('');
    setEditorState(AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' '));
  };

  const handleConfirm = (evt: React.MouseEvent<HTMLButtonElement>, type: string) => {
    if (type === 'IMAGE') {
      handleConfirmImage(evt);
    } else if (type === 'LINK') {
      handleConfirmLink(evt);
    }
  };

  const handleEnterDown = (evt: React.KeyboardEvent<HTMLInputElement>, type: string) => {
    if (type === 'IMAGE') {
      handleConfirmImage(evt);
    } else if (type === 'LINK') {
      handleConfirmLink(evt);
    }
  };

  const getBlockStyle = (block: ContentBlock) => {
    switch (block.getType()) {
      case 'blockquote':
        return 'RichEditor-blockquote';
      default:
        return '';
    }
  };

  const mediaBlockRenderer = (contentBlock: ContentBlock) => {
    if (contentBlock.getType() === 'atomic') {
      return {
        component: Media,
        editable: false,
        props: {
          alt: 'my hero',
        },
      };
    }
    return null;
  };

  const showPlaceholder = useMemo(() => {
    const isShow = editorState.getCurrentContent().getBlockMap().first().getType() !== 'unstyled';
    return isShow;
  }, [editorState]);

  return (
    <RichEditorRoot>
      <WrapEditor>
        <Toolbar
          editorState={editorState}
          onInlineToggle={handleToggleInlineType}
          onBlockToggle={handleToggleBlockType}
          layout='vertical'
        />

        {showURLInput && (
          <PromptLink
            ref={urlRef}
            urlValue={urlValue}
            onInputChange={(value) => setUrlValue(value)}
            urlType={urlType}
            onConfirmLink={handleConfirm}
            onRemoveLink={handleRemoveLink}
            onEnterDown={handleEnterDown}
          />
        )}

        <EditorInner onClick={() => editorRef.current && editorRef.current.focus()}>
          <Editor
            blockRendererFn={mediaBlockRenderer}
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            onChange={(value) => setEditorState(value)}
            placeholder={showPlaceholder ? '' : 'Start writing...'}
            handleKeyCommand={handleKeyCommand}
            ref={editorRef}
          />
        </EditorInner>
      </WrapEditor>
    </RichEditorRoot>
  );
}
