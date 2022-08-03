import { CompositeDecorator } from 'draft-js';
import linkDecorator from './LinkPlugin';
import hashtagDecorator from './HashtagPlugin';

export { default as Media } from './MediaPlugin';
export { default as linkDecorator } from './LinkPlugin';
export { default as hashtagDecorator } from './HashtagPlugin';

const compositeDecorator = new CompositeDecorator([linkDecorator, hashtagDecorator]);

export default compositeDecorator;
