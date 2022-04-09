import React from "react";
import styled from "styled-components";
import { ALL_TYPE } from "../../constants/typesEditor";
import ButtonMark from "../ButtonMark/ButtonMark";

const ButtonGroup = styled.div`
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  margin: 0 -0.5rem;
`;

const RichEditorControl = styled.div`
  font-family: "Helvetica", sans-serif;
  font-size: 14px;
  padding: 10px 20px;
  user-select: none;
  display: flex;
  flex-direction: ${(prop) => (prop.layout === "vertical" ? "column" : "row")};
  align-items: flex-start;
  justify-content: flex-start;
`;
export default function Toolbar({ editorState, onInlineToggle, onBlockToggle, layout }) {
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
          {ALL_TYPE.block.map((type) => (
            <ButtonMark
              key={type.label}
              active={type.style === blockType}
              icon={type.icon}
              onToggle={onBlockToggle}
              style={type.style}
            />
          ))}
        </div>
      </ButtonGroup>
      <ButtonGroup>
        <div>
          {ALL_TYPE.inline.map((type) => (
            <ButtonMark
              key={type.label}
              active={currentStyle.has(type.style)}
              label={type.label}
              onToggle={onInlineToggle}
              style={type.style}
              icon={type.icon}
            />
          ))}
        </div>
      </ButtonGroup>
    </RichEditorControl>
  );
}
