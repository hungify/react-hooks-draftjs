import styled from '@emotion/styled';
import { EditorState } from 'draft-js';
import { allTypes } from '../../../configs/editor';
import ButtonMark from './ButtonMark';

const RichEditorControl = styled.div<Pick<ToolbarProps, 'layout'>>`
  font-family: 'Helvetica', sans-serif;
  font-size: 14px;
  padding: 10px 0px;
  user-select: none;
  display: flex;
  flex-direction: ${(prop) => (prop.layout === 'vertical' ? 'column' : 'row')};
  width: 80%;
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;
interface ToolbarProps {
  layout: 'horizontal' | 'vertical';
  editorState: EditorState;
  onInlineToggle: (
    styleType: string,
    evt: React.MouseEvent<HTMLButtonElement>,
    active: boolean,
  ) => void;
  onBlockToggle: (
    styleType: string,
    evt: React.MouseEvent<HTMLButtonElement>,
    active: boolean,
  ) => void;
}

export default function Toolbar(props: ToolbarProps) {
  const { editorState, onInlineToggle, onBlockToggle, layout } = props;

  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
  const currentStyle = editorState.getCurrentInlineStyle();

  return (
    <RichEditorControl layout={layout}>
      <ButtonGroup>
        <div>
          {allTypes.block.map((type) => (
            <ButtonMark
              key={type.label}
              active={type.style === blockType}
              icon={type.icon}
              onToggle={onBlockToggle}
              styleType={type.style}
            />
          ))}
        </div>
        <div>
          {allTypes.inline.map((type) => (
            <ButtonMark
              key={type.label}
              active={currentStyle.has(type.style)}
              label={type.label}
              onToggle={onInlineToggle}
              styleType={type.style}
              icon={type.icon}
            />
          ))}
        </div>
      </ButtonGroup>
    </RichEditorControl>
  );
}
