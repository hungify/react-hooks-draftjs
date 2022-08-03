import styled from '@emotion/styled';
import React, { ForwardedRef, forwardRef, useDeferredValue, useState } from 'react';
import validUrl from 'valid-url';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Modal = styled.div`
  display: flex;
  white-space: nowrap;
  background: #fff;
  box-shadow: 0 1px 18px 0 rgba(0, 0, 0, 0.3);
  width: 70%;
  justify-content: space-between;
`;
const WrapInput = styled.div`
  width: 100%;
  overflow: hidden;
`;
const ModalInput = styled.input<{ isError: boolean }>`
  width: 100%;
  outline: none;
  border: none;
  color: #181818;
  font-size: 15px;
  height: auto;
  line-height: 1.2;
  padding: 16px;
  ${({ isError }) => `
    color: ${isError && '#ff0000'};
    border: ${isError && '1px solid #ff0000'};
  `}
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

interface PromptProps {
  onInputChange: (value: string) => void;
  urlValue: string;
  onConfirmLink: (evt: React.MouseEvent<HTMLButtonElement>, urlType: string) => void;
  onRemoveLink: (evt: React.MouseEvent<HTMLButtonElement>) => void;
  onEnterDown: (evt: React.KeyboardEvent<HTMLInputElement>, urlType: string) => void;
  urlType: string;
}

function Prompt(props: PromptProps, ref: ForwardedRef<HTMLInputElement>) {
  const { onInputChange, urlValue, onConfirmLink, onRemoveLink, onEnterDown, urlType } = props;
  const [isError, setIsError] = useState(false);
  const value = useDeferredValue(urlValue);

  const handleKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter' && !isError) {
      onEnterDown(evt, urlType);
    }
  };

  const handleMouseDown = (evt: React.MouseEvent<HTMLButtonElement>) => {
    if (!isError) {
      onConfirmLink(evt, urlType);
    }
  };

  const handleValueChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    if (validUrl.isUri(value)) {
      setIsError(false);
    } else {
      setIsError(true);
    }
    onInputChange(value);
  };

  return (
    <Wrapper>
      <Modal>
        <WrapInput>
          <ModalInput
            isError={isError}
            onChange={handleValueChange}
            type="text"
            ref={ref}
            onKeyDown={handleKeyDown}
            value={value}
            placeholder="https://"
          />
        </WrapInput>
        <WrapButton>
          <Button onMouseDown={handleMouseDown}>
            <svg fill="currentColor" width={18} height={18} viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
            </svg>
          </Button>
          <Button onMouseDown={(evt) => onRemoveLink(evt)}>
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

const PromptLink = forwardRef(Prompt);
export default PromptLink;
