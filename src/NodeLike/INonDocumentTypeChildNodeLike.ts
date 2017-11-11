import {
  IChildNodeLike,
} from './IChildNodeLike';
import {
  IElementLike,
} from './ParentNodeLike/ElementLike/IElementLike';

export interface INonDocumentTypeChildNodeLike extends IChildNodeLike {
  readonly previousElementSibling: IElementLike | null;
  readonly nextElementSibling:     IElementLike | null;
}

export default INonDocumentTypeChildNodeLike;