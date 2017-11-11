import {
  AbstractDocumentLike,
} from './AbstractDocumentLike';
import {
  IDocumentTypeLike,
} from '../../DocumentTypeLike/IDocumentTypeLike';
import {
  IElementLike,
} from '../ElementLike/IElementLike';
import {
  isIDocumentTypeLike,
} from '../../../TypeGuards/isIDocumentTypeLike';

export class DocumentLike extends AbstractDocumentLike {
  get nodeType(): 9 {
    return 9;
  }

  get nodeName(): '#document' {
    return '#document';
  }

  get nodeValue(): null {
    return null;
  }
  
  get textContent(): null {
    return null;
  }

  get doctype(): IDocumentTypeLike | null {
    const firstChild = this.childNodes[0];
    if (isIDocumentTypeLike(firstChild)) {
      return firstChild;
    }

    return null;
  }

  get documentElement(): IElementLike | null {
    return this.firstElementChild;
  }

  get head(): IElementLike | null {
    const docElem = this.documentElement;
    if (docElem) {
      return docElem.querySelector('head');
    }

    return null;
  }

  get body(): IElementLike | null {
    const docElem = this.documentElement;
    if (docElem) {
      return docElem.querySelector('body');
    }

    return null;
  }

  get ownerDocument(): null {
    return null;
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

  get childNodes(): Array<IDocumentTypeLike | IElementLike> {
    return this.__childNodes.toArray();
  }

  get childElementCount(): number {
    return this.__childNodes.count();
  }

  get children(): Array<IElementLike> {
    return this.__children.toArray();
  }

  get firstChild(): IDocumentTypeLike | IElementLike | null {
    return this.__childNodes.first() || null;
  }

  get lastChild(): IDocumentTypeLike | IElementLike | null {
    return this.__childNodes.last() || null;
  }

  get firstElementChild(): IElementLike | null {
    return this.__children.first() || null;
  }

  get lastElementChild(): IElementLike | null {
    return this.__children.last() || null;
  }
}

export default DocumentLike;