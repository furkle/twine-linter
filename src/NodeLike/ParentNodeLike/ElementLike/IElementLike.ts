import {
  IClassListLike,
} from './ClassListLike/IClassListLike';
import {
  IDocumentFragmentLike,
} from '../DocumentFragmentLike/IDocumentFragmentLike';
import {
  IDocumentLike,
} from '../DocumentLike/IDocumentLike';
import {
  IParentNodeLike,
} from '../IParentNodeLike';
import {
  INonDocumentTypeChildNodeLike,
} from '../../INonDocumentTypeChildNodeLike';

export interface IElementLike extends IParentNodeLike, INonDocumentTypeChildNodeLike {
  readonly tagName:                           string;
  textContent:                                string;
  innerHTML:                                  string;
  outerHTML:                                  string;
  readonly attributes:                        object;
  readonly id:                                string;
  readonly className:                         string;
  readonly classList:                         IClassListLike;
  readonly ownerDocument:                     IDocumentLike;
  readonly childNodes:                        Array<INonDocumentTypeChildNodeLike>;

  hasAttribute(name: string | null):          boolean;
  getAttribute(name: string | null):          string | null;
  setAttribute(
    name: string | null,
    value: string | null):                    void;

  removeAttribute(name: string | null):       void;
  appendChild(
    child: IDocumentFragmentLike |
      INonDocumentTypeChildNodeLike):         IDocumentFragmentLike | INonDocumentTypeChildNodeLike;
  
  removeChild(
    child: INonDocumentTypeChildNodeLike):    INonDocumentTypeChildNodeLike;

  replaceChild(
    oldChild: INonDocumentTypeChildNodeLike,
    newChild: IDocumentFragmentLike |
      INonDocumentTypeChildNodeLike):         IDocumentFragmentLike | INonDocumentTypeChildNodeLike;

  cloneNode(deep: boolean):                   IElementLike;
  __isVoid():                                 boolean;
}

export default IElementLike;