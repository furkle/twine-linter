import { NodeTypes, } from '../constants';
export type TPassageIgnores = {
  [key: string]: any,
  nodeTypes:     Array<NodeTypes>;
  elementTags:   Array<string>,
  passageNames:  Array<string>,
  passageTags:   Array<string>,
};

export default TPassageIgnores;