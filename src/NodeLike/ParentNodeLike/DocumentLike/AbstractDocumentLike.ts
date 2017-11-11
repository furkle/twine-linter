import {
  AbstractNodeLike,
} from '../../AbstractNodeLike';
import {
  AttributeLike,
} from '../ElementLike/AttributeLike/AttributeLike';
import {
  CommentLike,
} from '../../CharacterDataLike/CommentLike/CommentLike';
import {
  DocumentFragmentLike,
} from '../DocumentFragmentLike/DocumentFragmentLike';
import {
  ElementLike,
} from '../ElementLike/ElementLike';
import {
  IAttributeLike,
} from '../ElementLike/AttributeLike/IAttributeLike';
import {
  IChildNodeLike,
} from '../../IChildNodeLike';
import {
  ICommentLike,
} from '../../CharacterDataLike/CommentLike/ICommentLike';
import {
  IDocumentLike,
} from './IDocumentLike';
import {
  IDocumentFragmentLike,
} from '../DocumentFragmentLike/IDocumentFragmentLike';
import {
  IDocumentTypeLike,
} from '../../DocumentTypeLike/IDocumentTypeLike';
import {
  IElementLike,
} from '../ElementLike/IElementLike';
import {
  INonDocumentTypeChildNode,
} from '../../INonDocumentTypeChildNodeLike';
import {
  IParentNodeLike,
} from '../IParentNodeLike';
import {
  IProcessingInstructionLike,
} from '../../CharacterDataLike/ProcessingInstructionLike/IProcessingInstructionLike';
import {
  isIDocumentFragmentLike,
} from '../../../TypeGuards/isIDocumentFragmentLike';
import {
  isIDocumentTypeLike,
} from '../../../TypeGuards/isIDocumentTypeLike';
import {
  isIElementLike,
} from '../../../TypeGuards/isIElementLike';
import {
  ITextLike,
} from '../../CharacterDataLike/TextLike/ITextLike';
import {
  MParentNodeLike,
} from '../MParentNodeLike';
import {
  ProcessingInstructionLike,
} from '../../CharacterDataLike/ProcessingInstructionLike/ProcessingInstructionLike';
import {
  TConstructor,
} from '../../../TypeAliases/TConstructor';
import {
  TextLike,
} from '../../CharacterDataLike/TextLike/TextLike';
import {
  IMatcher,
} from '../../../Matcher/IMatcher';
import {
  OrderedSet,
} from 'immutable';
const nwmatcher = require('nwmatcher');
abstract class AbstractDocumentLike extends MParentNodeLike(<TConstructor<AbstractNodeLike>>AbstractNodeLike) implements IDocumentLike {
  abstract readonly nodeType:          9;
  abstract readonly nodeName:          '#document';
  abstract readonly nodeValue:         null;
  abstract readonly textContent:       null;
  abstract readonly ownerDocument:     null;
  abstract readonly parentNode:        null;
  abstract readonly previousSibling:   null;
  abstract readonly nextSibling:       null;
  abstract readonly doctype:           IDocumentTypeLike | null;
  abstract readonly documentElement:   IElementLike | null;
  protected __head:                    IElementLike | null = null;
  abstract readonly head:              IElementLike | null;
  protected __body:                    IElementLike | null;
  abstract readonly body:              IElementLike | null;
  protected __childNodes:              OrderedSet<IDocumentTypeLike | IElementLike> = OrderedSet([]);
  abstract readonly childNodes:        Array<IDocumentTypeLike | IElementLike>;
  abstract readonly firstChild:        IDocumentTypeLike | IElementLike | null;
  abstract readonly lastChild:         IDocumentTypeLike | IElementLike | null;
  abstract readonly firstElementChild: IElementLike | null;
  abstract readonly lastElementChild:  IElementLike | null;
  protected __matcher:                 IMatcher;

  constructor() {
    super();
  }

  getElementById(id: string): IElementLike | null {
    if (!this.documentElement) {
      return null;
    }
    
    return this.__getMatcher().byId(id);
  }

  getElementsByTagName(tagName: string): Array<IElementLike> {
    if (!this.documentElement) {
      return [];
    }
    
    return this.__getMatcher().byTag(tagName);
  }

  getElementsByClassName(className: string): Array<IElementLike> {
    if (!this.documentElement) {
      return [];
    }
    
    return this.__getMatcher().byClass(className);
  }

  getElementsByName(name: string): Array<IElementLike> {
    if (!this.documentElement) {
      return [];
    }

    return this.__getMatcher().byName(name);
  }

  createAttribute(name: string): IAttributeLike {
    return new AttributeLike(name);
  }

  createElement(tagName: string): IElementLike {
    return new ElementLike(tagName, this);
  }

  createTextNode(value: string = ''): ITextLike {
    return new TextLike(value, this);
  }

  createComment(text: string = ''): ICommentLike {
    return new CommentLike(text, this);
  }

  createProcessingInstruction(
    target: string = '',
    data: string = ''): IProcessingInstructionLike
  {
    return new ProcessingInstructionLike(target, data, this);
  }

  createDocumentFragment(): IDocumentFragmentLike {
    return new DocumentFragmentLike(this);
  }

  appendChild(child: IDocumentFragmentLike | IDocumentTypeLike | IElementLike): IDocumentFragmentLike | IDocumentTypeLike | IElementLike {
    if (isIDocumentFragmentLike(child)) {
      this.append(...child.childNodes);
      return child;
    }

    const count = this.__childNodes.count();
    if (child.ownerDocument !== this) {
      throw new Error('A child cannot be appended to a document it is not ' +
                      'owned by.');
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

  removeChild(child: IDocumentTypeLike | IElementLike): IDocumentTypeLike | IElementLike {
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
    newChild: IDocumentTypeLike,
    referenceNode: IElementLike): IDocumentTypeLike
  {
    if (newChild.ownerDocument !== this.ownerDocument) {
      throw new Error('A node must be adopted before it can be inserted ' +
                      'into a document.');
    } else if (isIDocumentTypeLike(this.firstChild)) {
      throw new Error('The document already has a doctype.');
    }

    referenceNode.__setPreviousSibling(newChild);
    const arr: Array<IDocumentTypeLike | IElementLike> = [ newChild, ];
    this.__childNodes = OrderedSet(arr).union(this.__childNodes);
    return newChild;
  }

  replaceChild(
    oldChild: IDocumentTypeLike |
      IElementLike,
    newChild: IDocumentFragmentLike |
      IDocumentTypeLike |
      IElementLike): IDocumentFragmentLike | IDocumentTypeLike | IElementLike
  {
    if (newChild.ownerDocument !== this) {
      throw new Error('A node must be adopted before it can be inserted ' +
                      'into a document.');
    } else if (!this.__childNodes.contains(oldChild)) {
      throw new Error('The node to be replaced is not a child of this document.');
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
    } else if (isIDocumentFragmentLike(newChild)) {
      if (oldType === 'DocumentType') {
        throw new Error('A document type element cannot be replaced with a ' +
                        'non-document type node. As document fragments ' +
                        'cannot contain document type nodes, this usage is ' +
                        'forbidden.');
      }

      this.removeChild(oldChild);
      this.append(...newChild.childNodes);
      return newChild;
    } else {
      newType = 'Element';
    }

    if (oldType !== newType) {
      if (oldType === 'DocumentType') {
        throw new Error('A document type node cannot be replaced with an ' +
                        'element node.');
      } else {
        throw new Error('An element node cannot be replaced with a document ' +
                        'type node.');
      }
    }

    const func = (node: IDocumentTypeLike | IElementLike) => {
      if (node === oldChild) {
        const prev = node.previousSibling;
        if (prev) {
          prev.__setNextSibling(<IElementLike>newChild);
        }

        const next = node.nextSibling;
        if (next) {
          next.__setPreviousSibling(<IDocumentTypeLike>newChild);
        }

        return newChild;
      } else {
        return node;
      }
    };

    this.__childNodes = OrderedSet(this.__childNodes.map(func));

    if (oldType === 'Element') {
      const func = (node: IElementLike) => {
        if (node === oldChild) {
          return newChild;
        } else {
          return node;
        }
      };

      this.__children = OrderedSet<IElementLike>(this.__children.map(func));
    }

    return newChild;
  }

  cloneNode(deep: boolean = false): IDocumentLike {
    const ctor = <TConstructor<IDocumentLike>>this.constructor;
    const doc = new ctor();
    const childNodes = this.childNodes;
    if (deep) {
      childNodes.forEach((node) => {
          doc.appendChild(node.cloneNode(deep));
      });
    }

    return doc;
  }

  adoptNode(externalNode: IChildNodeLike): IChildNodeLike {
    externalNode.__setDocument(this);
    return externalNode;
  }

  importNode(externalNode: IChildNodeLike, deep: boolean = false): IChildNodeLike {
    const imported = <IChildNodeLike>externalNode.cloneNode(deep);
    return this.adoptNode(imported);
  }

  __setParentNode(parent: IParentNodeLike): IParentNodeLike {
    /* Get rid of VS not-used error. */parent;
    throw new Error('Cannot set the parent node of a document.');
  }

  __setDocument(document: IDocumentLike): IDocumentLike {
    /* Get rid of VS not-used error. */document;
    throw new Error('Cannot set the owner document of a document.');
  }

  __setPreviousSibling(previousSibling: IChildNodeLike): IChildNodeLike {
    /* Get rid of VS not-used error. */previousSibling;
    throw new Error('A document cannot have siblings.');
  }

  __setNextSibling(nextSibling: INonDocumentTypeChildNode): INonDocumentTypeChildNode {
    /* Get rid of VS not-used error. */nextSibling;
    throw new Error('A document cannot have siblings.');
  }

  __getMatcher(): TMatcher {
    if (!this.__matcher) {
      this.__matcher = new nwmatcher({ document: this, });
    }

    return this.__matcher;
  }

  __setHead(head: IElementLike | null): IElementLike | null {
    this.__head = head;
    return head;
  }

  __setBody(body: IElementLike | null): IElementLike | null {
    this.__body = body;
    return body;
  }
}

export default AbstractDocumentLike;