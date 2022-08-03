import { ContentState } from 'draft-js';

interface LinkProps {
  children: React.ReactNode;
  contentState: ContentState;
  entityKey: string;
}
export default function Link({ contentState, entityKey, children }: LinkProps) {
  const { url } = contentState.getEntity(entityKey).getData();
  return (
    <a href={url} rel="noopener noreferrer" target="_blank">
      {children}
    </a>
  );
}
