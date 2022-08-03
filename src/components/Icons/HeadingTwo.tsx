import { SVGProps } from 'react';

const HeadingTwo = (props: SVGProps<SVGSVGElement>) => (
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
    <polyline points='3,20 3,12 13,12 13,20 '></polyline>
    <path d='M22,20h-4c2.7-3.3,4-5.3,4-6c0-1-1-2-2-2c-1,0-2,1-2,2'></path>
    <polyline points='13,4 13,12 3,12 3,4 '></polyline>
  </svg>
);

export default HeadingTwo;
