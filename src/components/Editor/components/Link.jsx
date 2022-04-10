export default function Link(props) {
  const { contentState, entityKey } = props;
  const { url } = contentState.getEntity(entityKey).getData();
  return (
    <a href={url} rel="noopener noreferrer" target="_blank" aria-label={url}>
      {props.children}
    </a>
  );
}
