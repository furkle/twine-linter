import {
  INodeLike,
} from '../INodeLike';
import {
  IChildNodeLike,
} from '../IChildNodeLike';
import {
  IElementLike,
} from './ElementLike/IElementLike';
import {
  IQueryable,
} from './IQueryable';

export interface IParentNodeLike extends INodeLike, IQueryable {
  readonly children:                                    Array<IElementLike>;
  readonly firstElementChild:                           IElementLike | null;
  readonly lastElementChild:                            IElementLike | null;
  readonly childElementCount:                           number;
  append(...contents: Array<IChildNodeLike | string>):  void;
  prepend(...contents: Array<IChildNodeLike | string>): void;
  getDescendantNodes():                                 Array<IChildNodeLike>;
  getDescendants():                                     Array<IElementLike>;
}

export default IParentNodeLike;