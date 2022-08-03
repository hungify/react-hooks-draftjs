import { SVGProps } from 'react';

const Underline = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={20}
    height={20}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth={2}
    strokeLinecap='round'
    strokeLinejoin='round'
    {...props}
  >
    <path d='M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3' />
    <line x1={4} y1={21} x2={20} y2={21} />
  </svg>
);

export default Underline;
