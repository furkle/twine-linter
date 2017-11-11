import AbstractNodeLike              from '../../AbstractNodeLike';
import IChildNodeLike                from '../../IChildNodeLike';
import IDocumentFragmentLike         from './IDocumentFragmentLike';
import IDocumentLike                 from '../DocumentLike/IDocumentLike';
import IElementLike                  from '../ElementLike/IElementLike';
import INonDocumentTypeChildNodeLike from '../../INonDocumentTypeChildNodeLike';
import IParentNodeLike               from '../IParentNodeLike';
import isIDocumentTypeLike           from '../../../TypeGuards/isIDocumentTypeLike';
import isIElementLike                from '../../../TypeGuards/isIElementLike';
import MParentNodeLike               from '../MParentNodeLike';
import TConstructor                  from '../../../TypeAliases/TConstructor';
import {
  OrderedSet,
} from 'immutable';
abstract class AbstractDocumentFragmentLike extends MParentNodeLike(<TConstructor<AbstractNodeLike>>AbstractNodeLike) implements IDocumentFragmentLike {
  abstract readonly nodeType:          11;
  abstract readonly nodeName:          '#document-fragment';
  abstract readonly nodeValue:         null;
  abstract readonly textContent:       null;
  protected __ownerDocument:           IDocumentLike;
  abstract readonly ownerDocument:     IDocumentLike;
  abstract readonly parentNode:        null;
  abstract readonly previousSibling:   null;
  abstract readonly nextSibling:       null;
  protected __childNodes:              OrderedSet<INonDocumentTypeChildNodeLike> = OrderedSet([]);
  abstract readonly childNodes:        Array<INonDocumentTypeChildNodeLike>;
  abstract readonly firstChild:        INonDocumentTypeChildNodeLike | null;
  abstract readonly lastChild:         INonDocumentTypeChildNodeLike | null;
  abstract readonly firstElementChild: IElementLike | null;
  abstract readonly lastElementChild:  IElementLike | null;

  constructor(document: IDocumentLike) {
    super();

    this.__setDocument(document);
  }
  
  getElementById(id: string): IElementLike | null {
    return this.__getMatcher().byId(id);
  }

  getElementsByTagName(tagName: string): Array<IElementLike> {
    return this.__getMatcher().byTag(tagName);
  }

  getElementsByClassName(className: string): Array<IElementLike> {
    return this.__getMatcher().byClass(className);
  }

  getElementsByName(name: string): Array<IElementLike> {
    return this.__getMatcher().byName(name);
  }

  appendChild(child: INonDocumentTypeChildNodeLike): INonDocumentTypeChildNodeLike {
    const count = this.__childNodes.count();
    if (child.ownerDocument !== this.ownerDocument) {
      throw new Error('A node cannot be appended to a parent node if the ' +
                      'parent is not owned by the same document as the ' +
                      'child.');
    } else if (count === 1) {
      const firstChild = this.firstChild;
      if (isIDocumentTypeLike(firstChild)) {
        if (!isIElementLike(child)) {
          throw new Error('Documents can only contain a doctype and an ' +
                          'element node.');
        }
      } else if (isIElementLike(firstChild)) {
        throw new Error('Only one element can be contained in a document.');
      } else {
        throw new Error('An unknown node type was found as a document child.');
      }
    } else if (count > 1) {
      throw new Error('A document can only contain two nodes.');
    }

    child.__setParentNode(this);
    const lastChild = this.lastChild;
    child.__setPreviousSibling(lastChild);
    if (lastChild) {
      lastChild.__setNextSibling(<IElementLike>child);
    }

    this.__childNodes = this.__childNodes.add(child);
    if (isIElementLike(child)) {
      this.__children = this.__children.add(child);
    }

    return child;
  }

  removeChild(child: INonDocumentTypeChildNodeLike): INonDocumentTypeChildNodeLike {
    if (!this.__childNodes.contains(child)) {
      throw new Error('The child argument is not a child of the document.');
    }

    child.__setParentNode(null);
    const prev = child.previousSibling;
    const next = child.nextSibling;
    if (prev) {
      prev.__setNextSibling(next);
    }

    if (next) {
      next.__setPreviousSibling(prev);
    }

    this.__childNodes = this.__childNodes.remove(child);
    return child;
  }

  insertBefore(
    newChild: INonDocumentTypeChildNodeLike,
    referenceNode: INonDocumentTypeChildNodeLike): INonDocumentTypeChildNodeLike
  {
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
    if (newChild.ownerDocument !== this.ownerDocument) {
      throw new Error('A node must be adopted before it can be inserted ' +
                      'into a document.');
    } else if (!this.__childNodes.contains(oldChild)) {
      throw new Error('The reference node is not a child of the parent node.');
    }

    let oldType;
    if (isIDocumentTypeLike(oldChild)) {
      oldType = 'DocumentType';
    } else {
      oldType = 'Element';
    }

    let newType;
    if (isIDocumentTypeLike(newChild)) {
      newType = 'DocumentType';
    } else {
      newType = 'Element';
    }

    if (oldType !== newType) {
      if (oldType === 'DocumentType') {
        throw new Error('A document type node cannot be replaced with an ' +
                        'element node.');;
      } else {
        throw new Error('An element node cannot be replaced with a document ' +
                        'type node.');
      }
    }

    const func = (node: INonDocumentTypeChildNodeLike) => {
      if (node === oldChild) {
        const prev = node.previousSibling;
        if (prev) {
          prev.__setNextSibling(newChild);
        }

        const next = node.nextSibling;
        if (next) {
          next.__setPreviousSibling(newChild);
        }

        return newChild;
      } else {
        return node;
      }
    };

    this.__childNodes = OrderedSet(this.__childNodes.map(func));

    if (isIElementLike(oldChild) || isIElementLike(newChild)) {
      const elements = this.__childNodes.filter((node) => {
        return isIElementLike(node);
      });

      this.__children = OrderedSet<IElementLike>(elements);
    }

    return newChild;
  }

  cloneNode(deep: boolean = false): IDocumentFragmentLike {
    const ctor = <TConstructor<IDocumentFragmentLike>>this.constructor;
    const doc = new ctor(this.ownerDocument);
    const childNodes = this.__childNodes;
    if (deep) {
      childNodes.forEach((node: INonDocumentTypeChildNodeLike) => {
          doc.appendChild(<INonDocumentTypeChildNodeLike>node.cloneNode(deep));
      });
    }

    return doc;
  }

  __setParentNode(): IParentNodeLike {
    throw new Error('Cannot set the parent node of a document fragment.');
  }
  
  __setDocument(document: IDocumentLike): IDocumentLike {
    this.__ownerDocument = document;
    return document;
  }

  __setPreviousSibling(): IChildNodeLike {
    throw new Error('A document fragment cannot have siblings.');
  }

  __setNextSibling(): INonDocumentTypeChildNodeLike {
    throw new Error('A document fragment cannot have siblings.');
  }
}

export default AbstractDocumentFragmentLike;