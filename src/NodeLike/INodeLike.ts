import IChildNodeLike            from './IChildNodeLike';
import IDocumentLike             from './ParentNodeLike/DocumentLike/IDocumentLike';
import IElementLike              from './ParentNodeLike/ElementLike/IElementLike';
import IParentNodeLike           from './ParentNodeLike/IParentNodeLike';
import INonDocumentTypeChildNode from './INonDocumentTypeChildNodeLike';
interface INodeLike {
  textContent:                                      string | null;
  readonly nodeType:                                number;
  nodeValue:                                        string | null;
  readonly nodeName:                                string;
  readonly ownerDocument:                           IDocumentLike | null;
  readonly parentNode:                              IParentNodeLike | null;
  readonly parentElement:                           IElementLike | null;
  readonly previousSibling:                         IChildNodeLike | null;
  readonly nextSibling:                             INonDocumentTypeChildNode | null;
  readonly childNodes:                              Array<IChildNodeLike>;
  readonly firstChild:                              IChildNodeLike | null;
  readonly lastChild:                               IChildNodeLike | null;

  readonly ELEMENT_NODE:                            1;
  readonly TEXT_NODE:                               3;
  readonly PROCESSING_INSTRUCTION_NODE:             7;
  readonly COMMENT_NODE:                            8;
  readonly DOCUMENT_NODE:                           9;
  readonly DOCUMENT_TYPE_NODE:                      10;
  readonly DOCUMENT_FRAGMENT_NODE:                  11;

  cloneNode(deep: boolean):                         INodeLike;
  appendChild(child: IChildNodeLike):               IChildNodeLike;
  removeChild(child: IChildNodeLike):               IChildNodeLike;
  insertBefore(
    newNode: IChildNodeLike | IDocumentLike,
    referenceNode: IChildNodeLike):                 IChildNodeLike | IDocumentLike;
  
  replaceChild(
    oldChild: IChildNodeLike,
    newChild: IChildNodeLike):                      IChildNodeLike;
  
  getDescendantNodes():                             Array<IChildNodeLike>;
  getDescendants():                                 Array<IElementLike>;
  contains(node: IChildNodeLike):                   boolean;
  hasChildNodes():                                  boolean;
  isEqualNode(node: INodeLike):                     boolean;
  isSameNode(node: INodeLike):                      boolean;
  normalize():                                      void;
  __setParentNode(parent: IParentNodeLike | null):  IParentNodeLike | null;
  __setDocument(document: IDocumentLike):           IDocumentLike;
  __setPreviousSibling(
    previousSibling: IChildNodeLike | null):        IChildNodeLike | null;
  
  __setNextSibling(
    nextSibling: INonDocumentTypeChildNode | null): INonDocumentTypeChildNode | null;
}

export default INodeLike;