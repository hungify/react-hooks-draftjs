import styled from '@emotion/styled';
import { SVGProps } from 'react';

export const Button = styled.button<Pick<ButtonMarkProps, 'active'>>`
  color: ${(props) => (props.active ? '#00ad9e' : '#616c7a')};
  background-color: ${(props) => (props.active ? 'rgba(0, 173, 158, 0.1)' : 'transparent')};
  border: none;
  padding: 0.25rem;
  width: 2rem;
  margin: 2px;
  border-radius: 6px;
  outline: none;
  cursor: pointer;
  transition: 250ms;
  &:hover {
    color: ${(props) => (props.active ? '#00ad9e' : '#0e1e25')};
    background-color: ${(props) =>
      props.active ? 'rgba(0, 173, 158, 0.2)' : 'rgba(14, 30, 37, 0.05)'};
  }
  &:active {
    color: ${(props) => (props.active ? '#00ad9e' : '#0e1e25')};
    background-color: ${(props) =>
      props.active ? 'rgba(0, 173, 158, 0.3)' : 'rgba(14, 30, 37, 0.1)'};
  }
`;

interface ButtonMarkProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active: boolean;
  onToggle: (styleType: string, evt: React.MouseEvent<HTMLButtonElement>, active: boolean) => void;
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  styleType: string;
  label?: string;
}

export default function ButtonMark(props: ButtonMarkProps) {
  const { icon, label, active, onToggle, styleType, children, ...restProps } = props;

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
