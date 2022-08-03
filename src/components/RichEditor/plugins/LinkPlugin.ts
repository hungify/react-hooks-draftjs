import { ContentBlock, ContentState } from 'draft-js';
import Link from '../components/Link';

type Callback = (start: number, end: number) => void;

function findLinkStrategy(
  contentBlock: ContentBlock,
  callback: Callback,
  contentState: ContentState
) {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK';
  }, callback);
}

const linkDecorator = {
  strategy: findLinkStrategy,
  component: Link,
};

export default linkDecorator;
