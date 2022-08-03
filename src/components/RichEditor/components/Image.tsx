import styled from '@emotion/styled';

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

interface ImageProps {
  src: string;
  alt: string;
}

export default function Image({ src, alt }: ImageProps) {
  return <Img src={src} alt={alt} />;
}
