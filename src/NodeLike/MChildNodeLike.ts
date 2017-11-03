import IChildNodeLike                from './IChildNodeLike';
import IDocumentLike                 from './ParentNodeLike/DocumentLike/IDocumentLike';
import IElementLike                  from './ParentNodeLike/ElementLike/IElementLike';
import IParentNodeLike               from './ParentNodeLike/IParentNodeLike';
import INonDocumentTypeChildNodeLike from './INonDocumentTypeChildNodeLike';
import TConstructor                  from '../TypeAliases/TConstructor';
function MChildNodeLike<T extends TConstructor<object>>(Base: T) {
  abstract class MChildNodeLike extends Base {
    abstract readonly nodeType:                    number;
    abstract readonly nodeValue:                   string | null;
    abstract readonly nodeName:                    string;
    abstract textContent:                          string;
    abstract readonly parentNode:                  IParentNodeLike | null;
    abstract readonly parentElement:               IElementLike | null;
    abstract readonly ownerDocument:               IDocumentLike;
    abstract readonly previousSibling:             IChildNodeLike | null;
    abstract readonly nextSibling:                 INonDocumentTypeChildNodeLike | null;
    abstract readonly childNodes:                  Array<INonDocumentTypeChildNodeLike>;
    abstract readonly firstChild:                  INonDocumentTypeChildNodeLike | null;
    abstract readonly lastChild:                   INonDocumentTypeChildNodeLike | null;

    abstract readonly ELEMENT_NODE:                1;
    abstract readonly TEXT_NODE:                   3;
    abstract readonly PROCESSING_INSTRUCTION_NODE: 7;
    abstract readonly COMMENT_NODE:                8;
    abstract readonly DOCUMENT_NODE:               9;
    abstract readonly DOCUMENT_TYPE_NODE:          10;
    abstract readonly DOCUMENT_FRAGMENT_NODE:      11;

    abstract cloneNode(deep?: boolean):        IChildNodeLike;
    abstract appendChild(
      node: INonDocumentTypeChildNodeLike):    INonDocumentTypeChildNodeLike;

    abstract removeChild(
      node: INonDocumentTypeChildNodeLike):    INonDocumentTypeChildNodeLike;

    abstract insertBefore(
      newNode: IChildNodeLike,
      referenceNode: IChildNodeLike):          IChildNodeLike;

    abstract replaceChild(
      oldNode: INonDocumentTypeChildNodeLike,
      newNode: INonDocumentTypeChildNodeLike): INonDocumentTypeChildNodeLike;

    abstract getDescendantNodes():             Array<INonDocumentTypeChildNodeLike>;
    abstract getDescendants():                 Array<IElementLike>;
    abstract contains(node: IChildNodeLike):   boolean;
    abstract hasChildNodes():                  boolean;
    abstract isEqualNode(
      node: IChildNodeLike):                   boolean;

    abstract isSameNode(node: IChildNodeLike): boolean;
    abstract normalize():                      void;

    abstract __setParentNode(
      parent: IParentNodeLike | null):         IParentNodeLike | null;
    abstract __setDocument(
      document: IDocumentLike):                IDocumentLike;
    abstract __setPreviousSibling(
      previousSibling: IChildNodeLike | null): IChildNodeLike | null;
    abstract __setNextSibling(
      nextSibling: INonDocumentTypeChildNodeLike | null): INonDocumentTypeChildNodeLike | null;

    before(...contents: Array<IChildNodeLike | string>): void {
      const parent = this.parentNode;
      const ownerDocument = this.ownerDocument;
      if (!parent) {
        throw new Error('The node has no parent.');
      }

      let childNodes = parent.childNodes;
      let index = childNodes.indexOf(this);
      if (index === -1) {
        throw new Error('The node on which before was called is not a ' +
                        'member of its parent\'s childNodes.');
      }

      contents.forEach((value: IChildNodeLike | string) => {
        let newNode = value;
        if (typeof value === 'string') {
          newNode = ownerDocument.createTextNode(value);
        }

        newNode = <IChildNodeLike>newNode;
        parent.insertBefore(newNode, this);
      });
    }

    after(...contents: Array<INonDocumentTypeChildNodeLike | string>): void {
      const parent = this.parentNode;
      const ownerDocument = this.ownerDocument;
      if (!parent) {
        throw new Error('The node has no parent.');
      }

      contents.forEach((value: INonDocumentTypeChildNodeLike | string) => {        
        let newNode = value;
        if (typeof value === 'string') {
          newNode = ownerDocument.createTextNode(value);
        }

        newNode = <INonDocumentTypeChildNodeLike>newNode;
        parent.insertBefore(newNode, this);
      });
    }

    replaceWith(...contents: Array<IChildNodeLike | string>) {
      const parent = this.parentNode;
      const ownerDocument = this.ownerDocument;      
      if (!parent) {
        throw new Error('The node has no parent.');
      }

      const sibling = this.nextSibling;
      parent.removeChild(this);
      contents.forEach((value: IChildNodeLike | string) => {
        let newNode = value;
        if (typeof value === 'string') {
          newNode = ownerDocument.createTextNode(value);
        }

        newNode = <IChildNodeLike>newNode;
        if (sibling) {
          parent.insertBefore(sibling, newNode);
        } else {
          parent.appendChild(newNode);
        }
      });
    }

    remove() {
      const parent = this.parentNode;
      if (!parent) {
        throw new Error('The node has no parent.');
      }

      parent.removeChild(this);
    }
  }

  return MChildNodeLike;
}

export default MChildNodeLike;