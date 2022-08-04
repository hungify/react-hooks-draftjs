import { SVGProps } from 'react';

const Bold = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={22}
    height={22}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth={2}
    strokeLinecap='round'
    strokeLinejoin='round'
    {...props}
  >
    <path d='M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z' />
    <path d='M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z' />
  </svg>
);

export default Bold;
