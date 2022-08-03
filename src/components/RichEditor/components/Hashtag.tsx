/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

interface HashTagProps {
  children: React.ReactNode;
}

export default function Hashtag({ children }: HashTagProps) {
  return (
    <span
      css={css`
        background-color: #dce6f8;
      `}
    >
      {children}
    </span>
  );
}
