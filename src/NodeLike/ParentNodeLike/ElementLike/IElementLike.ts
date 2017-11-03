import IClassListLike                from './ClassListLike/IClassListLike';
import IDocumentLike                 from '../DocumentLike/IDocumentLike';
import IParentNodeLike               from '../IParentNodeLike';
import INonDocumentTypeChildNodeLike from '../../INonDocumentTypeChildNodeLike';
interface IElementLike extends IParentNodeLike, INonDocumentTypeChildNodeLike {
  readonly tagName:                        string;
  textContent:                             string;
  readonly attributes:                     object;
  readonly id:                             string;
  readonly className:                      string;
  readonly classList:                      IClassListLike;
  readonly ownerDocument:                  IDocumentLike;
  readonly childNodes:                     Array<INonDocumentTypeChildNodeLike>;
  hasAttribute(name: string):              boolean;
  getAttribute(name: string):              string;
  setAttribute(
    name: string, value: string):          void;
  removeAttribute(name: string):           void;
  appendChild(
    child: INonDocumentTypeChildNodeLike): INonDocumentTypeChildNodeLike;
  removeChild(
    child: INonDocumentTypeChildNodeLike): INonDocumentTypeChildNodeLike;
  cloneNode(deep: boolean):                IElementLike;
}

export default IElementLike;