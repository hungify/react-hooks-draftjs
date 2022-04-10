import Link from "components/Editor/components/Link";
import { CompositeDecorator } from "draft-js";

function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return entityKey !== null && contentState.getEntity(entityKey).getType() === "LINK";
  }, callback);
}

export const linkDecorator = () =>
  new CompositeDecorator([
    {
      strategy: findLinkEntities,
      component: Link,
    },
  ]);
