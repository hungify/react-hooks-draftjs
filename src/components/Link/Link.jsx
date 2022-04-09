import { CompositeDecorator } from "draft-js";

function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return entityKey !== null && contentState.getEntity(entityKey).getType() === "LINK";
  }, callback);
}

export const Link = (props) => {
  const { contentState, entityKey } = props;
  const { url } = contentState.getEntity(entityKey).getData();
  return (
    <a className="link" href={url} rel="noopener noreferrer" target="_blank" aria-label={url}>
      {props.children}
    </a>
  );
};
export const linkDecorator = () =>
  new CompositeDecorator([
    {
      strategy: findLinkEntities,
      component: Link,
    },
  ]);
