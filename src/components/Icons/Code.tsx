import { SVGProps } from 'react';

const Code = (props: SVGProps<SVGSVGElement>) => (
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
    <polyline points='16 18 22 12 16 6' />
    <polyline points='8 6 2 12 8 18' />
  </svg>
);

export default Code;
