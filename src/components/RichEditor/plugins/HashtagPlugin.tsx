import Hashtag from '../components/Hashtag';

const regexStrategy = (
  block: Draft.ContentBlock,
  callback: (start: number, end: number) => void
) => {
  const text = block.getText();
  let result: RegExpExecArray;
  let regex = /(^|\s)#\w+/g;

  // Lorem ipsum #hashtag1 Lorem ipsum #hashtag2
  while ((result = regex.exec(text) as RegExpExecArray) != null) {
    let start = result.index === 0 ? 0 : result.index + 1;
    let end = start === 0 ? start + result[0].length : start + result[0].length - 1;
    callback(start, end);
  }
};

const hashtagDecorator = {
  strategy: regexStrategy,
  component: Hashtag,
};

export default hashtagDecorator;
