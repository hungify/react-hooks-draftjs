import { SVGProps } from 'react';

const Image = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='20'
    height='20'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    {...props}
  >
    <rect x='3' y='3' width='18' height='18' rx='2' ry='2'></rect>
    <circle cx='8.5' cy='8.5' r='1.5'></circle>
    <polyline points='21 15 16 10 5 21'></polyline>
  </svg>
);

export default Image;
