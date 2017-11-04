import AbstractElementLike           from './AbstractElementLike';
import AttributeLike                 from './AttributeLike/AttributeLike';
import IChildNodeLike                from '../../IChildNodeLike';
import IClassListLike                from './ClassListLike/IClassListLike';
import IDocumentLike                 from '../DocumentLike/IDocumentLike';
import IElementLike                  from './IElementLike';
import IParentNodeLike               from '../IParentNodeLike';
import isIElementLike                from '../../../TypeGuards/isIElementLike';
import INonDocumentTypeChildNodeLike from '../../INonDocumentTypeChildNodeLike';
class ElementLike extends AbstractElementLike {
  readonly nodeType: number = 1;
  readonly tagName:  string;

  get nodeName(): string {
    return this.tagName;
  }

  get nodeValue(): null {
    return null;
  }

  get textContent(): string {
    return this.childNodes.reduce((str: string, node: INonDocumentTypeChildNodeLike): string => {
      return str + (node.textContent || '');
    }, '');
  };

  set textContent(content: string) {
    this.childNodes.forEach((node: INonDocumentTypeChildNodeLike) => {
      this.removeChild(node);
    });

    const textNode = this.ownerDocument.createTextNode(content);
    this.__childNodes = this.__childNodes.add(textNode);
    textNode.__setParentNode(this);
  }

  get attributes(): object {
    return this.__attributes.toObject();
  }

  get id(): string {
    const attr = this.__attributes.get('id');
    if (attr) {
      return attr.value;
    } else {
      return '';
    }
  }

  set id(value: string) {
    const name = 'id';
    this.__attributes.set(name, new AttributeLike(name, value));
  }

  get className(): string {
    const attr = this.__attributes.get('class');
    if (attr) {
      return attr.value;
    } else {
      return '';
    }
  }

  set className(value: string) {
    const name = 'class';
    this.__attributes.set(name, new AttributeLike(name, value));
  }

  get classList(): IClassListLike {
    return this.__classList;
  }

  get ownerDocument(): IDocumentLike {
    return this.__ownerDocument;
  }

  get parentNode(): IParentNodeLike | null {
    return this.__parentNode;
  }

  get parentElement(): IElementLike | null {
    if (isIElementLike(this.__parentNode)) {
      return this.__parentNode;
    }

    return null;
  }

  get previousSibling(): IChildNodeLike | null {
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

    let node = this.previousSibling;
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

  get childNodes(): Array<INonDocumentTypeChildNodeLike> {
    return this.__childNodes.toArray();
  }

  get firstChild(): INonDocumentTypeChildNodeLike | null {
    return this.__childNodes.first();
  }
  
  get lastChild(): INonDocumentTypeChildNodeLike | null {
    return this.__childNodes.last();
  }

  get children(): Array<IElementLike> {
    return this.__children.toArray();
  }

  get firstElementChild(): IElementLike | null {
    return this.__children.first();
  }

  get lastElementChild(): IElementLike | null {
    return this.__children.last();
  }

  get childElementCount(): number {
    return this.children.length;
  }

  constructor(tagName: string, document: IDocumentLike) {
    super();

    if (!tagName) {
      throw new Error('Empty tag name.');
    }

    this.tagName = tagName;
    this.__ownerDocument = document;
  }
}

export default ElementLike;