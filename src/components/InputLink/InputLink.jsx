import React from "react";
import styled from "styled-components";
const Wrapper = styled.div`
  position: relative;
`;

const Modal = styled.div`
  display: flex;
  justify-content: space-between;
  white-space: nowrap;
  background: #fff;
  box-shadow: 0 1px 18px 0 rgba(0, 0, 0, 0.3);
  width: 360px;
`;
const ModalInput = styled.input`
  outline: none;
  border: none;
  color: #181818;
  font-size: 15px;
  height: auto;
  line-height: 1.2;
  padding: 16px;
`;
const WrapButton = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Button = styled.button`
  padding: 0;
  cursor: pointer;
  border: 0;
  height: 100%;
  width: 46px;
  background: transparent;
  cursor: pointer;
  transition: 250ms;
  color: #616c7a;
  &:hover {
    color: #00ad9e;
    background-color: rgba(14, 30, 37, 0.05);
  }
`;

function Input({ onInputChange, urlValue, onConfirmLink, onRemoveLink, onEnterDown }, ref) {
  console.log("🚀 :: ref", ref);
  return (
    <Wrapper>
      <Modal>
        <ModalInput
          onChange={(e) => onInputChange(e.target.value)}
          ref={ref}
          type="text"
          onKeyDown={(e) => onEnterDown(e)}
          value={urlValue}
          placeholder="Enter a link and press enter"
        />
        <WrapButton>
          <Button type="button" onMouseDown={(e) => onConfirmLink(e)}>
            <svg fill="currentColor" width={18} height={18} viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
            </svg>
          </Button>
          <Button type="button" onMouseDown={(e) => onRemoveLink(e)}>
            <svg width={18} height={18} viewBox="0 0 24 24">
              <g fill="currentColor" fillRule="evenodd">
                <path d="M16.95 5.636l1.414 1.414L7.05 18.364 5.636 16.95z" />
                <path d="M16.95 18.364l1.414-1.414L7.05 5.636 5.636 7.05z" />
              </g>
            </svg>
          </Button>
        </WrapButton>
      </Modal>
    </Wrapper>
  );
}

const InputLink = React.forwardRef(Input);
export default InputLink;
