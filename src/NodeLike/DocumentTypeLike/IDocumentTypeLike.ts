import IChildNodeLike from '../IChildNodeLike';
import IElementLike   from '../ParentNodeLike/ElementLike/IElementLike';
interface IDocumentTypeLike extends IChildNodeLike {
  readonly name:                           string;
  readonly publicId:                       '';
  readonly systemId:                       '';
  readonly previousSibling:                null;
  readonly nextSibling:                    IElementLike | null;
  cloneNode(deep: boolean):                IDocumentTypeLike;
  before():                                void;
  after(...contents: Array<IElementLike>): void;
  isEqualNode(node: IDocumentTypeLike):    boolean;
}

export default IDocumentTypeLike;