import { ContentBlock, ContentState } from 'draft-js';
import Image from '../components/Image';

interface MediaProps {
  block: ContentBlock; // block not contentBlock
  contentState: ContentState;
  blockProps: { alt: string };
}
export default function Media({ block, contentState, blockProps }: MediaProps) {
  const entity = contentState.getEntity(block.getEntityAt(0));
  const src = entity.getData()?.src;
  const alt = blockProps.alt || 'avatar';

  if (src) {
    return <Image src={src} alt={alt} />;
  }
  return null;
}
