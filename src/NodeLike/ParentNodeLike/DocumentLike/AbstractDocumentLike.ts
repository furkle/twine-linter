import AbstractNodeLike           from '../../AbstractNodeLike';
import CommentLike                from '../../CharacterDataLike/CommentLike/CommentLike';
import DocumentTypeLike           from '../../DocumentTypeLike/DocumentTypeLike';
import ElementLike                from '../ElementLike/ElementLike';
import IChildNodeLike             from '../../IChildNodeLike';
import ICommentLike               from '../../CharacterDataLike/CommentLike/ICommentLike';
import IDocumentLike              from './IDocumentLike';
import IDocumentTypeLike          from '../../DocumentTypeLike/IDocumentTypeLike';
import IElementLike               from '../ElementLike/IElementLike';
import INonDocumentTypeChildNode from '../../INonDocumentTypeChildNodeLike';
import IParentNodeLike            from '../IParentNodeLike';
import IProcessingInstructionLike from '../../CharacterDataLike/ProcessingInstructionLike/IProcessingInstructionLike';
import isIDocumentTypeLike        from '../../../TypeGuards/isIDocumentTypeLike';
import isIElementLike             from '../../../TypeGuards/isIElementLike';
import ITextLike                  from '../../CharacterDataLike/TextLike/ITextLike';
import MParentNodeLike            from '../MParentNodeLike';
import ProcessingInstructionLike  from '../../CharacterDataLike/ProcessingInstructionLike/ProcessingInstructionLike';
import TConstructor               from '../../../TypeAliases/TConstructor';
import TextLike                   from '../../CharacterDataLike/TextLike/TextLike';
import { OrderedSet, }            from 'immutable';
abstract class AbstractDocumentLike extends MParentNodeLike(<TConstructor<AbstractNodeLike>>AbstractNodeLike) implements IDocumentLike {
  protected __nodeType:                9 | 11 = 9;
  abstract readonly nodeType:          9 | 11;
  abstract readonly textContent:       null;
  readonly nodeName:                   string = '#document';
  readonly nodeValue:                  null;
  readonly ownerDocument:              null;
  readonly parentNode:                 null;
  abstract readonly previousSibling:   null;
  abstract readonly nextSibling:       null;
  abstract readonly doctype:           IDocumentTypeLike | null;
  protected __documentElement:         IElementLike | null = null;
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

  constructor(fragment: boolean = false) {
    super();

    if (fragment) {
      this.__nodeType = 11;
      this.nodeName = '#document-fragment';
    } else {
      const docType = new DocumentTypeLike('gately', this);
      this.appendChild(docType);
      this.documentElement = this.createElement('html');
      this.appendChild(this.documentElement);
      this.head = this.createElement('head');
      this.documentElement.appendChild(this.head);
      this.body = this.createElement('body');
      this.documentElement.appendChild(this.body);
    }
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

  createDocumentFragment(): IDocumentLike {
    const isFragment = true;
    return new (<TConstructor<IDocumentLike>>this.constructor)(isFragment);
  }

  appendChild(child: IDocumentTypeLike | IElementLike): IDocumentTypeLike | IElementLike {
    const count = this.__childNodes.count();
    if (count === 0) {
      super.appendChild(child);
    } else if (count === 1) {
      const firstChild = this.firstChild;
      if (isIDocumentTypeLike(firstChild)) {
        if (!isIElementLike(child)) {
          throw new Error('Documents can only contain a root element node.');
        }
        
        super.appendChild(child);
      } else if (isIElementLike(firstChild)) {
        throw new Error('Only one element can be contained in a document.');
      } else {
        throw new Error('An unknown node type was found as a document child.');
      }
    } else {
      throw new Error('A document can only contain two nodes.');
    }

    return child;
  }

  removeChild(child: IDocumentTypeLike | IElementLike): IDocumentTypeLike | IElementLike {
    super.removeChild(child);
    return child;
  }

  cloneNode(deep: boolean = false): IDocumentLike {
    const ctor = <TConstructor<IDocumentLike>>this.constructor;
    const doc = new ctor();
    const childNodes = this.childNodes;
    if (deep) {
      childNodes.forEach((node: IDocumentTypeLike | IElementLike) => {
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
    const imported: IChildNodeLike = <IChildNodeLike>externalNode.cloneNode(deep);
    this.adoptNode(imported);
    return imported;
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
}

export default AbstractDocumentLike;