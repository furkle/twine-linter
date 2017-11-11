import {
  AbstractNodeLike,
} from '../../AbstractNodeLike';
import {
  AttributeLike,
} from './AttributeLike/AttributeLike';
import {
  ClassListLike,
} from './ClassListLike/ClassListLike';
import {
  IAttributeLike,
} from './AttributeLike/IAttributeLike';
import {
  IChildNodeLike,
} from '../../IChildNodeLike';
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
  IElementLike,
} from './IElementLike';
import {
  Map,
  OrderedSet,
} from 'immutable';
import {
  INonDocumentTypeChildNodeLike,
} from '../../INonDocumentTypeChildNodeLike';
import {
  isIDocumentFragmentLike,
} from '../../../TypeGuards/isIDocumentFragmentLike';
import {
  isIElementLike,
} from '../../../TypeGuards/isIElementLike';
import {
  isITextLike,
} from '../../../TypeGuards/isITextLike';
import {
  ITextLike,
} from '../../CharacterDataLike/TextLike/ITextLike';
import {
  MChildNodeLike,
} from '../../MChildNodeLike';
import {
  MParentNodeLike,
} from '../MParentNodeLike';
import {
  TConstructor,
} from '../../../TypeAliases/TConstructor';

const voidElements = require('void-elements');

export abstract class AbstractElementLike extends MParentNodeLike(MChildNodeLike(<TConstructor<AbstractNodeLike>>AbstractNodeLike)) implements IElementLike {
  abstract textContent:                     string;
  abstract innerHTML:                       string;
  abstract outerHTML:                       string;
  protected __attributes:                   Map<string, IAttributeLike> = Map([]);  
  abstract readonly attributes:             object;
  abstract readonly tagName:                string;
  abstract readonly id:                     string;
  abstract readonly className:              string;
  abstract readonly classList:              IClassListLike;
  protected __ownerDocument:                IDocumentLike;
  abstract readonly ownerDocument:          IDocumentLike;
  abstract readonly previousSibling:        IChildNodeLike | null;
  abstract readonly nextSibling:            INonDocumentTypeChildNodeLike | null;
  protected __childNodes:                   OrderedSet<INonDocumentTypeChildNodeLike> = OrderedSet([]);  
  abstract readonly childNodes:             Array<INonDocumentTypeChildNodeLike>;
  abstract readonly firstChild:             INonDocumentTypeChildNodeLike | null;
  abstract readonly lastChild:              INonDocumentTypeChildNodeLike | null;
  abstract readonly previousElementSibling: IElementLike | null;
  abstract readonly nextElementSibling:     IElementLike | null;
  protected __classList:                    IClassListLike = new ClassListLike(this);

  constructor(tagName: string, document: IDocumentLike) {
    super();

    if (!tagName) {
      throw new Error('Empty tag name.');
    }

    this.tagName = tagName;
    this.__ownerDocument = document;
  }

  hasAttribute(name: string): boolean {
    return this.__attributes.has(name);
  }

  getAttribute(name: string | null): string | null {
    const attr = this.__attributes.get(<string>name);
    if (attr) {
      return attr.value;
    } else {
      return null;
    }
  }

  setAttribute(name: string | null, value: string | null): void {
    const attribute = new AttributeLike(<string>name, <string>value);
    this.__attributes = this.__attributes.set(<string>name, attribute);
    if (name === 'class') {
      this.__classList.__pullFromParent();
    }
  }

  removeAttribute(name: string | null): void {
    this.__attributes = this.__attributes.remove(<string>name);
    if (name === 'class') {
      this.__classList.__pullFromParent();
    }
  }

  appendChild(
    child: IDocumentFragmentLike |
      INonDocumentTypeChildNodeLike): IDocumentFragmentLike | INonDocumentTypeChildNodeLike
  {
    if (this.__isVoid()) {
      throw new Error('This AbstractElementLike is a void element, and as ' +
                      'such cannot contain children.');
    }

    if (child.ownerDocument !== this.ownerDocument) {
      throw new Error('A node cannot be appended to an element owned by a ' +
                      'different document than it.');
    }

    if (isIDocumentFragmentLike(child)) {
      this.append(...child.childNodes);
      return child;
    }

    const oldParent = child.parentNode;
    if (oldParent) {
      oldParent.removeChild(child);
    }

    child.__setParentNode(this);
    const last = this.lastChild;
    if (last) {
      last.__setNextSibling(<INonDocumentTypeChildNodeLike>child);
      child.__setPreviousSibling(last);
    }

    this.__childNodes = this.__childNodes.add(
      <INonDocumentTypeChildNodeLike>child);
    if (isIElementLike(child)) {
      this.__children = this.__children.add(child);
    }

    return child;
  }

  removeChild(child: INonDocumentTypeChildNodeLike): INonDocumentTypeChildNodeLike {
    if (this.__isVoid()) {
      throw new Error('This AbstractElementLike is a void element, and as ' +
                      'such cannot contain children.');
    }

    if (!this.__childNodes.contains(child)) {
      throw new Error('The provided child was not a child of this ' +
                      'element.');
    }
    
    if (isIElementLike(child)) {
      this.__children = this.__children.remove(child);
    }

    this.__childNodes = this.__childNodes.remove(child);
    child.__setParentNode(null);
    const prev = child.previousSibling;
    const next = child.nextSibling;
    if (prev) {
      prev.__setNextSibling(next);
    }

    if (next) {
      next.__setPreviousSibling(prev);
    }

    child.__setPreviousSibling(null);
    child.__setNextSibling(null);
    return child;
  }

  insertBefore(
    newChild: INonDocumentTypeChildNodeLike,
    referenceNode: INonDocumentTypeChildNodeLike): INonDocumentTypeChildNodeLike
  {
    if (this.__isVoid()) {
      throw new Error('This AbstractElementLike is a void element, and as ' +
                      'such cannot contain children.');
    }

    if (newChild.ownerDocument !== this.ownerDocument) {
      throw new Error('A node cannot be inserted into a document it is not ' +
                      'owned by.');
    }

    const childNodes = this.__childNodes.toIndexedSeq();
    const refIndex = childNodes.indexOf(referenceNode);
    if (refIndex === -1) {
      throw new Error('The reference node was not a child of this node.');
    }

    newChild.__setParentNode(this);
    const prev = referenceNode.previousSibling;
    if (prev) {
      prev.__setNextSibling(newChild);
    }

    referenceNode.__setPreviousSibling(newChild);

    const before = childNodes.slice(0, refIndex);
    const after = childNodes.slice(refIndex);
    this.__childNodes = OrderedSet(before.concat([ newChild, ]).concat(after));

    if (isIElementLike(newChild)) {
      const func = (node: INonDocumentTypeChildNodeLike) => {
        if (isIElementLike(node)) {
          return node;
        } else {
          return null;
        }
      };

      const children = this.__childNodes.map(func).filter((aa) => Boolean(aa));
      this.__children = OrderedSet<IElementLike>(children);
    }

    return newChild;
  }

  replaceChild(
    oldChild: INonDocumentTypeChildNodeLike,
    newChild: INonDocumentTypeChildNodeLike): INonDocumentTypeChildNodeLike
  {
    if (this.__isVoid()) {
      throw new Error('This AbstractElementLike is a void element, and as ' +
                      'such cannot contain children.');
    }

    if (!this.__childNodes.has(oldChild)) {
      throw new Error('The child to be replaced was not inside of the ' +
                      'parent on which replaceChild was called.');
    } else if (newChild.ownerDocument !== this.ownerDocument) {
      throw new Error('A document cannot append a child not owned by it ' +
                      'without adopting the node first.');
    }

    const iterable = this.__childNodes
      .map((node) => {
        if (node === oldChild) {
          newChild.__setParentNode(this);
          const prev = oldChild.previousSibling;
          if (prev) {
            prev.__setNextSibling(newChild);
          }

          const next = oldChild.nextSibling;
          if (next) {
            next.__setPreviousSibling(newChild);
          }

          node.__setParentNode(null);
          node.__setPreviousSibling(null);
          node.__setNextSibling(null);
          return newChild;
        } else {
          return node;
        }
      });

    this.__childNodes = OrderedSet<INonDocumentTypeChildNodeLike>(iterable);
    if (isIElementLike(oldChild) || isIElementLike(newChild)) {
      const func = (node: INonDocumentTypeChildNodeLike) => {
        if (isIElementLike(node)) {
          return node;
        } else {
          return null;
        }
      };
      
      const children = this.__childNodes
        .map(func)
        .filter((aa) => Boolean(aa));
      this.__children = OrderedSet<IElementLike>(children);
    }

    newChild.__setParentNode(this);
    return newChild;
  }

  cloneNode(deep: boolean = false): IElementLike {
    const ctor = <TConstructor<IElementLike>>this.constructor;
    const elem = new ctor(this.tagName, this.ownerDocument);
    const childNodes = this.__childNodes;
    if (deep) {
      childNodes.forEach((node: INonDocumentTypeChildNodeLike) => {
        elem.appendChild(<INonDocumentTypeChildNodeLike>node.cloneNode(deep));
      });
    }

    return elem;
  }

  normalize(): void {
    let buffer = '';
    let lastSeenText: ITextLike | null = null;
    this.childNodes.forEach((node: INonDocumentTypeChildNodeLike) => {
      if (isITextLike(node)) {
        if (!lastSeenText) {
          lastSeenText = node;
        }

        buffer += node.data;
        let replaced = false;
        if (!isITextLike(node.nextSibling)) {
          if (buffer) {
            lastSeenText.data = buffer;
            buffer = '';
            lastSeenText = null;
            replaced = true;
          }
        }
        
        if (!replaced) {
          this.removeChild(node);
        }
      }

      node.normalize();
    });
  }

  __flushToHtml(): string {
    let str = `<${this.tagName}`;
    if (this.__attributes.count() === 0) {
      str += '>';
    } else {
      const keys = this.__attributes.keys();
      const values = this.__attributes.values();
      let key;
      while (key = keys.next()) {
        const value = values.next();
        str += ` ${key}="${value}"`;
      }
    }

    if (this.__isVoid()) {
      str += '/>';
    } else {
      const func = (str: string, child: INonDocumentTypeChildNodeLike) => {
        return str + child.__flushToHtml;
      };

      str += `>${this.__childNodes.reduce(func)}</${this.tagName}>`;
    }

    return str;
  }

  __isVoid(): boolean {
    return this.tagName.toLowerCase() in voidElements;
  }
}

export default AbstractElementLike;