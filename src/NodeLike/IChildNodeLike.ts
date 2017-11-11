import {
  IElementLike,
} from './ParentNodeLike/ElementLike/IElementLike';
import {
  INodeLike,
} from './INodeLike';

export interface IChildNodeLike extends INodeLike {
  readonly parentElement:                              IElementLike | null;
  before(...contents: Array<INodeLike | string>):      void;
  after(...contents: Array<INodeLike | string>):       void;
  replaceWith(...contents: Array<INodeLike | string>): void;
  remove():                                            void
}

export default IChildNodeLike;