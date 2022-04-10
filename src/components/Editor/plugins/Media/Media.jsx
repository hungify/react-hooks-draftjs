import Image from "components/Editor/components/Image";

export default function Media({ contentState, block }) {
  const entity = contentState.getEntity(block.getEntityAt(0));
  const { src } = entity.getData();
  const type = entity.getType();

  let media;
  if (type === "IMAGE") {
    media = <Image src={src} />;
  }

  return media;
}
