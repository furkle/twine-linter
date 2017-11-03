import AbstractNodeLike          from '../../AbstractNodeLike';
import AttributeLike             from './AttributeLike/AttributeLike';
import ClassListLike             from './ClassListLike/ClassListLike';
import IAttributeLike            from './AttributeLike/IAttributeLike';
import IChildNodeLike            from '../../IChildNodeLike';
import IClassListLike            from './ClassListLike/IClassListLike';
import IDocumentLike             from '../DocumentLike/IDocumentLike';
import IElementLike              from './IElementLike';
import INonDocumentTypeChildNode from '../../INonDocumentTypeChildNodeLike';
import isIDocumentLike           from '../../../TypeGuards/isIDocumentLike';
import isIElementLike            from '../../../TypeGuards/isIElementLike';
import isITextLike               from '../../../TypeGuards/isITextLike';
import MChildNodeLike            from '../../MChildNodeLike';
import MParentNodeLike           from '../MParentNodeLike';
import TConstructor              from '../../../TypeAliases/TConstructor';
import {
  Iterable,
  Map,
  OrderedSet,
}                                from 'immutable';
abstract class AbstractElementLike extends MParentNodeLike(MChildNodeLike(<TConstructor<AbstractNodeLike>>AbstractNodeLike)) implements IElementLike {
  abstract readonly attributes:             object;
  abstract readonly tagName:                string;
  abstract readonly id:                     string;
  abstract readonly className:              string;
  abstract readonly classList:              IClassListLike;
  abstract readonly previousSibling:        IChildNodeLike | null;
  abstract readonly nextSibling:            INonDocumentTypeChildNode | null;
  abstract readonly childNodes:             Array<INonDocumentTypeChildNode>;
  abstract readonly firstChild:             INonDocumentTypeChildNode | null;
  abstract readonly lastChild:              INonDocumentTypeChildNode | null;
  abstract readonly previousElementSibling: IElementLike | null;
  abstract readonly nextElementSibling:     IElementLike | null;

  protected __ownerDocument:                IDocumentLike;                 
  protected __attributes:                   Map<string, IAttributeLike> = Map([]);
  protected __classList:                    IClassListLike = new ClassListLike(this);
  protected __childNodes:                   OrderedSet<INonDocumentTypeChildNode> = OrderedSet([]);

  hasAttribute(name: string): boolean {
    return this.__attributes.has(name);
  }

  getAttribute(name: string): string {
    const attr = this.__attributes.get(name);
    if (attr) {
      return attr.value;
    } else {
      return '';
    }
  }

  setAttribute(name: string, value: string): void {
    const attribute = new AttributeLike(name, value);
    this.__attributes = this.__attributes.set(name, attribute);
    if (name === 'class') {
      this.__classList.pullFromParent();
    }
  }

  removeAttribute(name: string): void {
    this.__attributes = this.__attributes.remove(name);
    if (name === 'class') {
      this.__classList.pullFromParent();
    }
  }

  appendChild(child: INonDocumentTypeChildNode): INonDocumentTypeChildNode {
    this.__childNodes = this.__childNodes.add(child);
    /* Child is element. */
    if (isIElementLike(child)) {
      this.__children = this.__children.add(child);
    }

    const oldParent = child.parentNode;
    if (oldParent) {
      oldParent.removeChild(child);
    }

    child.__setParentNode(this);
    return child;
  }

  removeChild(child: INonDocumentTypeChildNode): INonDocumentTypeChildNode {
    if (!this.__childNodes.contains(child)) {
      throw new Error('The provided child was not a child of this ' +
                      'element.');
    } else if (isIElementLike(child)) {
      this.__children = this.__children.remove(child);
    }

    this.__childNodes = this.__childNodes.remove(child);
    child.__setParentNode(null);
    return child;
  }

  insertBefore(
    newNode: INonDocumentTypeChildNode,
    referenceNode: INonDocumentTypeChildNode): IChildNodeLike
  {
    const childNodes = this.__childNodes.toIndexedSeq();
    if (!this.__childNodes.has(referenceNode)) {
      throw new Error('The reference node is not contained within this node.');
    } else if (newNode.ownerDocument !== this.ownerDocument) {
      throw new Error('The new node is not a member of the same document ' +
                      'as this node.');
    } else if (referenceNode.ownerDocument !== this.ownerDocument) {
      throw new Error('The reference node is not a member of the same ' +
                      'document as this node.');
    }

    if (isIDocumentLike(newNode)) {
      return newNode;
    }

    const index = childNodes.toIndexedSeq().indexOf(referenceNode);
    if (index === -1) {
      throw new Error('The reference node was not a child of this node.');
    }

    const before = childNodes.slice(0, index);
    const after = childNodes.slice(index);
    this.__childNodes = OrderedSet(before.concat([ newNode, ]).concat(after));
    newNode.__setParentNode(this);
    return newNode;
  }

  replaceChild(oldChild: INonDocumentTypeChildNode, newChild: INonDocumentTypeChildNode): INonDocumentTypeChildNode {
    if (!this.__childNodes.has(oldChild)) {
      throw new Error('The child to be replaced was not inside of the ' +
                      'parent on which replaceChild was called.');
    } else if (newChild.ownerDocument !== this.ownerDocument) {
      throw new Error('A document cannot append a child not owned by it ' +
                      'without adopting the node first.');
    }

    const iterable: Iterable<INonDocumentTypeChildNode, INonDocumentTypeChildNode> =
      this.__childNodes.map((node: INonDocumentTypeChildNode) => {
        if (node === oldChild) {
          return newChild;
        } else {
          return node;
        }
      });

    this.__childNodes = OrderedSet(iterable);
    newChild.__setParentNode(this);
    return newChild;
  }

  cloneNode(deep: boolean = false): IElementLike {
    const ctor = <TConstructor<IElementLike>>this.constructor;
    const elem = new ctor(this.tagName, this.ownerDocument);
    const childNodes = this.childNodes;
    if (deep) {
      childNodes.forEach((node: INonDocumentTypeChildNode) => {
        elem.appendChild(<INonDocumentTypeChildNode>node.cloneNode(deep));
      });
    }

    return elem;
  }

  normalize(): void {
    let buffer: string = '';
    this.childNodes.forEach((node: INonDocumentTypeChildNode) => {
      if (isITextLike(node)) {
        buffer += node.data;
        if (!isITextLike(node.nextSibling)) {
          if (buffer) {
            const textNode = this.ownerDocument.createTextNode(buffer);
            this.replaceChild(node, textNode);
            buffer = '';
          }
        }
        
        if (node.parentNode) {
          this.removeChild(node);
        }
      }
    });
  }
}

export default AbstractElementLike;