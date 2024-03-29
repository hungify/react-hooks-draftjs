import {
  BlockQuote,
  Bold,
  BulletedList,
  Code,
  CodeBlock,
  HeadingOne,
  HeadingThree,
  HeadingTwo,
  Image,
  Italic,
  Link,
  NumberedList,
  Underline,
} from '~/components/Icons';

const inline = [
  { label: 'Bold', style: 'BOLD', icon: Bold },
  { label: 'Italic', style: 'ITALIC', icon: Italic },
  { label: 'Underline', style: 'UNDERLINE', icon: Underline },
  { label: 'Link', style: 'LINK', icon: Link },
  { label: 'Image', style: 'IMAGE', icon: Image },
  { label: 'Monospace', style: 'CODE', icon: Code },
] as const;

const block = [
  { label: 'H1', style: 'header-one', icon: HeadingOne },
  { label: 'H2', style: 'header-two', icon: HeadingTwo },
  { label: 'H3', style: 'header-three', icon: HeadingThree },
  { label: 'Blockquote', style: 'blockquote', icon: BlockQuote },
  { label: 'OL', style: 'ordered-list-item', icon: NumberedList },
  { label: 'UL', style: 'unordered-list-item', icon: BulletedList },
  { label: 'Code Block', style: 'code-block', icon: CodeBlock },
] as const;

export const allTypes = {
  inline,
  block,
};
