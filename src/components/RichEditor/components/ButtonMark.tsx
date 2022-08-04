import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { SVGProps } from 'react';

export const Button = styled.button<Pick<ButtonMarkProps, 'active'>>`
  display: inline-flex;
  align-items: center;
  border: none;
  padding: 6px;
  margin: 4px;
  border-radius: 6px;
  outline: none;
  cursor: pointer;
  transition: 250ms;
  ${({ active }) => css`
    color: ${active ? '#00ad9e' : '#616c7a'};
    background-color: ${active ? 'rgba(0, 173, 158, 0.1)' : 'transparent'};
    &:hover {
      color: ${active ? '#00ad9e' : '#616c7a'};
      background-color: ${active ? 'rgba(0, 173, 158, 0.2)' : 'rgba(14, 30, 37, 0.05)'};
    }
    &:active {
      color: ${active ? '#00ad9e' : '#0e1e25'};
      background-color: ${active ? 'rgba(0, 173, 158, 0.3)' : 'rgba(14, 30, 37, 0.1)'};
    }
  `}
`;

interface ButtonMarkProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active: boolean;
  onToggle: (styleType: string, evt: React.MouseEvent<HTMLButtonElement>, active: boolean) => void;
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  styleType: string;
  label?: string;
}

export default function ButtonMark(props: ButtonMarkProps) {
  const { icon, active, onToggle, styleType, ...restProps } = props;

  const handleToggle = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    onToggle(styleType, evt, !active);
  };
  const Icon = icon;

  return (
    <Button {...restProps} active={active} onMouseDown={handleToggle}>
      <Icon />
    </Button>
  );
}
