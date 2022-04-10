import BoldIcon from "images/icons/format_bold_black_24dp.svg";
import BoldWhiteIcon from "images/icons/format_bold_white_24dp.svg";
import ItalicIcon from "images/icons/format_italic_black_24dp.svg";
import ItalicWhiteIcon from "images/icons/format_italic_white_24dp.svg";
import UnderlineIcon from "images/icons/format_underlined_black_24dp.svg";
import UnderlineWhiteIcon from "images/icons/format_underlined_white_24dp.svg";
import styled from "styled-components";

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

var INLINE_STYLES = [
  {
    label: "Bold",
    style: "BOLD",
    icon: BoldIcon,
    whiteIcon: BoldWhiteIcon,
  },
  {
    label: "Italic",
    style: "ITALIC",
    icon: ItalicIcon,
    whiteIcon: ItalicWhiteIcon,
  },
  {
    label: "Underline",
    style: "UNDERLINE",
    icon: UnderlineIcon,
    whiteIcon: UnderlineWhiteIcon,
  },
];

const InlineStyleControls = ({ onToggle, editorState }) => {
  const currentStyle = editorState?.getCurrentInlineStyle();
  return (
    <div>
      {INLINE_STYLES.map((type) => (
        <StyledButton
          key={type.label}
          onMouseDown={(event) => {
            event.preventDefault();
            onToggle(type.style);
          }}
          className={currentStyle?.has(type.style) ? "is-active" : ""}
        >
          <img src={currentStyle?.has(type.style) ? type.whiteIcon : type.icon} alt="a" />
        </StyledButton>
      ))}
    </div>
  );
};

export default InlineStyleControls;
