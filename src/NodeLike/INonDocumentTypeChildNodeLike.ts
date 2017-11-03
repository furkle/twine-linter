import IChildNodeLike from './IChildNodeLike';
import IElementLike   from './ParentNodeLike/ElementLike/IElementLike';
interface INonDocumentTypeChildNodeLike extends IChildNodeLike {
  readonly previousElementSibling: IElementLike | null;
  readonly nextElementSibling:     IElementLike | null;
}

export default INonDocumentTypeChildNodeLike;