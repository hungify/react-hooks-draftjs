export default function Image(props) {
  const entity = props.contentState.getEntity(props.block.getEntityAt(0));
  const { src } = entity.getData();
  return <img alt="" src={src} />;
}
