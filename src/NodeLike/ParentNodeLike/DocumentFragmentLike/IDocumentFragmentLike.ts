import {
  IDocumentLike,
} from '../DocumentLike/IDocumentLike';
import {
  IElementLike,
} from '../ElementLike/IElementLike';
import {
  INonDocumentTypeChildNodeLike,
} from '../../INonDocumentTypeChildNodeLike';
import {
  IParentNodeLike,
} from '../IParentNodeLike';
import {
  IQueryable,
} from '../IQueryable';

export interface IDocumentFragmentLike extends IParentNodeLike, IQueryable {
  readonly nodeType:                11;
  readonly nodeValue:               null;
  readonly textContent:             null;
  readonly ownerDocument:           IDocumentLike;
  readonly parentNode:              null;
  readonly childNodes:              Array<INonDocumentTypeChildNodeLike>;
  readonly firstChild:              INonDocumentTypeChildNodeLike | null;
  readonly lastChild:               INonDocumentTypeChildNodeLike | null;
  readonly previousSibling:         null;
  readonly nextSibling:             null;
  
  getElementsByTagName(
    tagName: string):               Array<IElementLike>;

  getElementById(id: string):       IElementLike | null;
  getElementsByClassName(
    className: string):             Array<IElementLike>;

  getElementsByName(name: string):  Array<IElementLike>;

  cloneNode():                      IDocumentFragmentLike;
}

export default IDocumentFragmentLike;