import AbstractDocumentTypeLike from './AbstractDocumentTypeLike';
import IDocumentLike        from '../ParentNodeLike/DocumentLike/IDocumentLike';
import IElementLike         from '../ParentNodeLike/ElementLike/IElementLike';
class DocumentTypeLike extends AbstractDocumentTypeLike {
  get nodeType(): 10 {
    return 10;
  }

  get nodeValue(): null {
    return null;
  }

  get name(): string {
    return this.__name;
  }

  get nodeName(): string {
    return this.__name;
  }

  get ownerDocument(): IDocumentLike {
    return this.__ownerDocument;
  }

  get parentNode(): IDocumentLike | null {
    return this.__parentNode;
  }

  get parentElement(): null {
    return null;
  }

  get previousSibling(): null {
    return null;
  }

  get nextSibling(): IElementLike | null {
    return this.__nextSibling;
  }

  get childNodes(): Array<any> {
    return [];
  }

  get publicId(): '' {
    return '';
  }

  get systemId(): '' {
    return '';
  }
}

export default DocumentTypeLike;