import IChildNodeLike                from './IChildNodeLike';
import IDocumentLike                 from './ParentNodeLike/DocumentLike/IDocumentLike';
import IElementLike                  from './ParentNodeLike/ElementLike/IElementLike';
import IParentNodeLike               from './ParentNodeLike/IParentNodeLike';
import isIChildNodeLike              from '../TypeGuards/isIChildNodeLike';
import isIDocumentLike               from '../TypeGuards/isIDocumentLike';
import isIParentNodeLike             from '../TypeGuards/isIParentNodeLike';
import INodeLike                     from './INodeLike';
import INonDocumentTypeChildNodeLike from './INonDocumentTypeChildNodeLike';
import { OrderedSet, }     from 'immutable';
abstract class AbstractNodeLike implements INodeLike {
  abstract textContent:              string | null;
  abstract readonly ownerDocument:   IDocumentLike | null;
  abstract readonly parentNode:      IParentNodeLike | null;
  abstract readonly parentElement:   IElementLike | null;
  abstract readonly nodeType:        number;
  abstract readonly nodeValue:       string | null;
  abstract readonly nodeName:        string;
  abstract readonly previousSibling: IChildNodeLike | null;
  abstract readonly nextSibling:     INonDocumentTypeChildNodeLike | null;
  abstract readonly childNodes:      Array<IChildNodeLike>;
  abstract readonly firstChild:      IChildNodeLike | null;
  abstract readonly lastChild:       IChildNodeLike | null;
  
  protected __ownerDocument:         IDocumentLike | null = null;
  protected __parentNode:            IParentNodeLike | null = null;
  protected __previousSibling:       IChildNodeLike | null = null;
  protected __nextSibling:           INonDocumentTypeChildNodeLike | null = null;
  protected __childNodes:            OrderedSet<IChildNodeLike> = OrderedSet([]);
  
  abstract cloneNode(deep: boolean):               INodeLike;
  abstract appendChild(child: IChildNodeLike):     IChildNodeLike;
  
  abstract removeChild(child: IChildNodeLike):     IChildNodeLike;

  abstract insertBefore(
    newNode: IChildNodeLike,
    referenceNode: INonDocumentTypeChildNodeLike): IChildNodeLike;

  abstract replaceChild(
    oldNode: IChildNodeLike,
    newNode: IChildNodeLike):                      IChildNodeLike;

  abstract normalize():                            void;


  readonly ELEMENT_NODE:                            1  = 1;
  readonly TEXT_NODE:                               3  = 3;
  readonly PROCESSING_INSTRUCTION_NODE:             7  = 7;
  readonly COMMENT_NODE:                            8  = 8;
  readonly DOCUMENT_NODE:                           9  = 9;
  readonly DOCUMENT_TYPE_NODE:                      10 = 10;
  readonly DOCUMENT_FRAGMENT_NODE:                  11 = 11;

  getDescendantNodes(): Array<IChildNodeLike> {
    return this.__childNodes
      .map((node: IChildNodeLike) => {
        return [ node, ].concat(node.getDescendantNodes());
      }).reduce((previousArray: Array<IChildNodeLike>, nextArray: Array<IChildNodeLike>) => {
        return previousArray.concat(nextArray);
      });
  }

  getDescendants(): Array<IElementLike> {
    if (!isIParentNodeLike(this)) {
      throw new Error('This node is not a parent node, and therefore cannot ' +
                      'have children.');
    }

    return this.children
      .map((element) => {
        return [ element, ].concat(element.getDescendants());
      }).reduce((previousArray, nextArray) => {
        return previousArray.concat(nextArray);
      });
  }

  contains(node: IChildNodeLike): boolean {
    return __recurse(this, node);

    function __recurse(
      searchNode: INodeLike,
      targetNode: INodeLike)
    {
      /* In Chrome, at least, node.contains(node) is true. */
      if (searchNode === targetNode) {
        return true;
      } else {
        const childNodes: Array<IChildNodeLike> = searchNode.childNodes;
        for (let ii = 0; ii < childNodes.length; ii += 1) {
          const childNode: IChildNodeLike = childNodes[ii];
          if (__recurse(searchNode, childNode)) {
            return true;
          }
        }
      }

      return false;
    }
  }

  hasChildNodes(): boolean {
    return this.__childNodes.count() > 0;
  }

  isEqualNode(node: INodeLike): boolean {
    if (node.nodeType === this.nodeType ||
        node.childNodes.length !== this.__childNodes.count())
    {
      return false;
    }

    const nodeChilds = node.childNodes;
    let equal = true;
    this.__childNodes
      .entrySeq()
      .forEach((tuple: Array<number | IChildNodeLike>) => {
        const index = <number>tuple[0];
        if (!nodeChilds[index].isEqualNode(<IChildNodeLike>tuple[1])) {
          equal = false;
        }

        /* Abort early if equal is false. */
        return equal;
      });

      return equal;
  }

  isSameNode(node: INodeLike): boolean {
    return node === this;
  }

  __setDocument(document: IDocumentLike): IDocumentLike {
    if (isIDocumentLike(this)) {
      throw new Error('A document cannot be owned by a document.');
    }

    this.__ownerDocument = document;
    return document;
  }

  __setParentNode(parentNode: IParentNodeLike | null): IParentNodeLike | null {
    if (isIDocumentLike(this)) {
      throw new Error('A document cannot have a parent node.');
    }

    if (parentNode) {
      if ((isIDocumentLike(parentNode) && parentNode !== this.ownerDocument) ||
        parentNode !== this.ownerDocument)
      {
        console.log(parentNode);
        throw new Error('A node must be adopted before it can be placed in a ' +
                        'new document.');
      } else if (isIChildNodeLike(this) &&
        this.contains(<IChildNodeLike & IParentNodeLike>parentNode))
      {
        throw new Error('The intended child node is a parent of the intended ' +
                        'parent node.');
      }
    }

    this.__parentNode = parentNode;
    return parentNode;
  }

  __setPreviousSibling(previousSibling: IChildNodeLike | null): IChildNodeLike | null {
    if (previousSibling) {
      if (previousSibling.ownerDocument !== this.ownerDocument) {
        throw new Error('A node must be adopted before it can be placed in a ' +
                        'new document.');
      } else if (previousSibling.parentNode !== this.parentNode) {
        throw new Error('Sibling nodes must have the same parent node.');
      }
    }

    this.__previousSibling = previousSibling;
    return previousSibling;
  }

  __setNextSibling(nextSibling: INonDocumentTypeChildNodeLike | null): INonDocumentTypeChildNodeLike | null {
    if (nextSibling) {
      if (nextSibling.ownerDocument !== this.ownerDocument) {
        throw new Error('A node must be adopted before it can be placed in a ' +
                        'new document.');
      } else if (nextSibling.parentNode !== this.parentNode) {
        throw new Error('Sibling nodes must have the same parent node.');
      }
    }

    this.__nextSibling = nextSibling;
    return nextSibling;
  }
}

export default AbstractNodeLike;