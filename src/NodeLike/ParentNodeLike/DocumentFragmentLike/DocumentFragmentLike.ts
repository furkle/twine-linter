import AbstractDocumentFragmentLike  from './AbstractDocumentFragmentLike';
import IDocumentLike                 from '../DocumentLike/IDocumentLike';
import IElementLike                  from '../ElementLike/IElementLike';
import INonDocumentTypeChildNodeLike from '../../INonDocumentTypeChildNodeLike'
class DocumentFragmentLike extends AbstractDocumentFragmentLike {
  get nodeType(): 11 {
    return 11;
  }

  get nodeName(): '#document-fragment' {
    return '#document-fragment';
  }

  get nodeValue(): null {
    return null;
  }
  
  get textContent(): null {
    return null;
  }

  get ownerDocument(): IDocumentLike {
    return this.__ownerDocument;
  }

  get parentNode(): null {
    return null;
  }

  get parentElement(): null {
    return null;
  }

  get previousSibling(): null {
    return null;
  }

  get nextSibling(): null {
    return null;
  }

  get childNodes(): Array<INonDocumentTypeChildNodeLike> {
    return this.__childNodes.toArray();
  }

  get childElementCount(): number {
    return this.__childNodes.count();
  }

  get children(): Array<IElementLike> {
    return this.__children.toArray();
  }

  get firstChild(): INonDocumentTypeChildNodeLike | null {
    return this.__childNodes.first() || null;
  }

  get lastChild(): INonDocumentTypeChildNodeLike | null {
    return this.__childNodes.last() || null;
  }

  get firstElementChild(): IElementLike | null {
    return this.__children.first() || null;
  }

  get lastElementChild(): IElementLike | null {
    return this.__children.last() || null;
  }
}

export default DocumentFragmentLike;