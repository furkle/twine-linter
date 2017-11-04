import AbstractNodeLike              from '../AbstractNodeLike';
import IChildNodeLike                from '../IChildNodeLike';
import IDocumentLike                 from '../ParentNodeLike/DocumentLike/IDocumentLike';
import IDocumentTypeLike             from './IDocumentTypeLike';
import IElementLike                  from '../ParentNodeLike/ElementLike/IElementLike';
import INonDocumentTypeChildNodeLike from '../INonDocumentTypeChildNodeLike';
import isIElementLike                from '../../TypeGuards/isIElementLike';
import MChildNodeLike                from '../MChildNodeLike';
import TConstructor                  from '../../TypeAliases/TConstructor';
abstract class AbstractDocumentTypeLike extends MChildNodeLike(<TConstructor<AbstractNodeLike>>AbstractNodeLike) implements IDocumentTypeLike {
  abstract readonly nodeType:        10;
  abstract readonly nodeValue:       null;
  abstract readonly name:            string;
  protected __name:                  string;
  abstract readonly publicId:        '';
  abstract readonly systemId:        '';
  protected __ownerDocument:         IDocumentLike;
  abstract readonly ownerDocument:   IDocumentLike;
  protected __parentNode:            IDocumentLike | null = null;
  abstract readonly parentNode:      IDocumentLike | null;
  abstract readonly parentElement:   null;
  abstract readonly previousSibling: null;
  protected __nextSibling:           IElementLike | null  = null;
  abstract readonly nextSibling:     IElementLike | null;
  abstract readonly childNodes:      Array<INonDocumentTypeChildNodeLike>;

  constructor(name: string, document: IDocumentLike) {
    super();
    this.__ownerDocument = document;
    this.__parentNode = document;
    this.__name = name;
    this.__setParentNode(document);
  }

  replaceWith(doctype: IDocumentTypeLike): void {
    const parent = this.__parentNode;
    if (!parent) {
      throw new Error('Cannot replace a child node which has no parent node.');
    }

    parent.removeChild(this);
    parent.prepend(doctype);
  }

  cloneNode(deep: boolean = false): IDocumentTypeLike {
    /* Get rid of VS not-used error. */deep;
    const ctor = <TConstructor<IDocumentTypeLike>>this.constructor;
    const doctype = new ctor(this.name);
    return doctype;
  }

  appendChild(child: INonDocumentTypeChildNodeLike): INonDocumentTypeChildNodeLike {
    /* Get rid of VS not-used error. */child;
    throw new Error('A document type node cannot have child nodes.');
  }

  removeChild(child: INonDocumentTypeChildNodeLike): INonDocumentTypeChildNodeLike {
    /* Get rid of VS not-used error. */child;
    throw new Error('A document type node cannot have child nodes.');
  }

  insertBefore(
    referenceNode: INonDocumentTypeChildNodeLike,
    newNode: INonDocumentTypeChildNodeLike): INonDocumentTypeChildNodeLike
  {
    /* Get rid of VS not-used error. */referenceNode;newNode;
    throw new Error('A document type cannot have any children.');
  }

  before(...contents: Array<IChildNodeLike | string>): void {
    /* Get rid of VS not-used error. */contents;
    throw new Error('Nothing can be added before a document type.');
  }

  after(...contents: Array<IElementLike>): void {
    const parent = this.parentNode;
    if (!parent) {
      throw new Error('This node has no parent node and therefore nothing can be added after it.');
    } else if (contents.length > 1) {
      throw new Error('Only one root element can be added to a document.');
    } else if (isIElementLike(parent.firstElementChild)) {
      throw new Error('Only one root element can be added to a document and one ' +
                      'already exists within it.');
    }

    parent.appendChild(contents[0]);
  }

  isEqualNode(node: IDocumentTypeLike): boolean {
    if (node.name !== this.name) {
      return false;
    }

    return super.isEqualNode(node);
  }

  replaceChild(
    oldChild: INonDocumentTypeChildNodeLike,
    newChild: INonDocumentTypeChildNodeLike): INonDocumentTypeChildNodeLike
  {
    /* Get rid of VS not-used error. */oldChild;newChild;
    throw new Error('Document type nodes cannot have children.');
  }

  __setParentNode(document: IDocumentLike): IDocumentLike {
    super.__setParentNode(document);
    return document;
  }

  __setPreviousSibling(previousSibling: null): null {
    /* Get rid of VS not-used error. */previousSibling;
    throw new Error('Document type nodes cannot have a previous sibling.');
  }
  
  __setNextSibling(nextSibling: IElementLike | null): IElementLike | null {
    /* Get rid of VS not-used error. */nextSibling;
    super.__setNextSibling(nextSibling);
    return nextSibling;
  }
}

export default AbstractDocumentTypeLike;