import BlockFunction from '~/pages/BlockFunction';
import ContentState from '~/pages/ContentState';
import CreateContentState from '~/pages/CreateContentState';
import Entities from '~/pages/Entities';
import Hashtag from '~/pages/Hashtag';
import MediumDraftEditor from '~/pages/MediumDraftEditor';
import MyRichEditor from '~/pages/MyRichEditor';
import RichUtilsSimple from '~/pages/RichUtilsSimple';
import SelectionState from '~/pages/SelectionState';
import Simple from '~/pages/Simple';

const routesDefine = [
  {
    path: '/simple',
    text: 'Simple',
    element: <Simple />,
  },
  {
    path: '/content-state',
    text: 'ContentState',
    element: <ContentState />,
  },
  {
    path: '/create-content-state',
    text: 'Create ContentState',
    element: <CreateContentState />,
  },
  {
    path: '/selection-state',
    text: 'SelectionState',
    element: <SelectionState />,
  },
  {
    path: '/entities',
    text: 'Entities',
    element: <Entities />,
  },
  {
    path: '/rich-utils',
    text: 'Rich Utils Simple',
    element: <RichUtilsSimple />,
  },
  {
    path: '/block-function',
    text: 'Block Function',
    element: <BlockFunction />,
  },
  {
    path: '/hashtags',
    text: 'HashTags Simple',
    element: <Hashtag />,
  },
  {
    path: '/my-rich-editor',
    text: 'My Rich Editor',
    element: <MyRichEditor />,
  },
  {
    path: '/medium-draft-editor',
    text: 'Third Medium Editor',
    element: <MediumDraftEditor />,
  },
];

export default routesDefine;
