import AbstractCommentLike           from './AbstractCommentLike';
import IChildNodeLike                from '../../IChildNodeLike';
import IDocumentLike                 from '../../ParentNodeLike/DocumentLike/IDocumentLike';
import IElementLike                  from '../../ParentNodeLike/ElementLike/IElementLike';
import INonDocumentTypeChildNodeLike from '../../INonDocumentTypeChildNodeLike';
import isIElementLike                from '../../../TypeGuards/isIElementLike';
class CommentLike extends AbstractCommentLike {
  get nodeType(): 8 {
    return 8;
  }

  get nodeName(): '#comment' {
    return '#comment';
  }

  get data(): string {
    return this.__data;
  }

  set data(data: string) {
    this.__data = data;
  }

  get textContent(): string {
    return this.__data;
  }

  set textContent(textContent: string) {
    this.__data = textContent;
  }

  get nodeValue(): string {
    return this.__data;
  }

  set nodeValue(value: string) {
    this.__data = value;
  }

  get length(): number {
    return this.__data.length;
  }

  get ownerDocument(): IDocumentLike {
    return this.__ownerDocument;
  }

  get parentNode(): IElementLike | null {
    return this.__parentNode;
  }

  get parentElement(): IElementLike | null {
    return this.__parentNode;
  }

  get previousSibling(): INonDocumentTypeChildNodeLike | null {
    return this.__previousSibling;
  }

  get nextSibling(): INonDocumentTypeChildNodeLike | null {
    return this.__nextSibling;
  }
  
  get previousElementSibling(): IElementLike | null {
    /* An element with no parent cannot have siblings. */
    if (!this.__parentNode) {
      return null;
    }

    let node: IChildNodeLike | null = this.previousSibling;
    let counter = 0;
    const length = this.__parentNode.childNodes.length;
    while (node) {
      if (counter > length) {
        throw new Error('Possible infinite loop detected. A previousSibling ' +
                        'property may be misset.');
      }

      if (isIElementLike(node)) {
        return node;
      }
      
      node = node.previousSibling;
      counter += 1;
    }

    return null;
  }
  
  get nextElementSibling(): IElementLike | null {
    /* An element with no parent cannot have siblings. */
    if (!this.__parentNode) {
      return null;
    }

    let node = this.nextSibling;
    let counter = 0;
    const length = this.__parentNode.childNodes.length;
    while (node) {
      if (counter > length) {
        throw new Error('Possible infinite loop detected. A previousSibling ' +
                        'property may be misset.');
      }

      if (isIElementLike(node)) {
        return node;
      }

      node = node.nextSibling;
      counter += 1;
    }

    return null;
  }

  get childNodes(): Array<any> {
    return [];
  }

  get firstChild(): null {
    return null;
  }

  get lastChild(): null {
    return null;
  }
}

export default CommentLike;