import IAttributeLike             from '../ElementLike/AttributeLike/IAttributeLike';
import IChildNodeLike             from '../../IChildNodeLike';
import ICommentLike               from '../../CharacterDataLike/CommentLike/ICommentLike';
import IDocumentTypeLike          from '../../DocumentTypeLike/IDocumentTypeLike';
import IDocumentFragmentLike      from '../../ParentNodeLike/DocumentFragmentLike/IDocumentFragmentLike';
import IElementLike               from '../ElementLike/IElementLike';
import IParentNodeLike            from '../IParentNodeLike';
import IProcessingInstructionLike from '../../CharacterDataLike/ProcessingInstructionLike/IProcessingInstructionLike';
import IQueryable                 from '../IQueryable';
import ITextLike                  from '../../CharacterDataLike/TextLike/ITextLike';
export interface IDocumentLike extends IParentNodeLike, IQueryable {
  readonly nodeValue:               null;
  readonly textContent:             null;
  readonly ownerDocument:           null;
  readonly doctype:                 IDocumentTypeLike | null;
  readonly documentElement:         IElementLike | null;
  readonly head:                    IElementLike | null;
  readonly body:                    IElementLike | null;
  readonly childNodes:              Array<IDocumentTypeLike | IElementLike>;
  readonly firstChild:              IDocumentTypeLike | IElementLike | null;
  readonly lastChild:               IDocumentTypeLike | IElementLike | null;
  readonly previousSibling:         null;
  readonly nextSibling:             null;

  appendChild(
    child: IDocumentFragmentLike |
      IDocumentTypeLike |
      IElementLike):                IDocumentFragmentLike | IDocumentTypeLike | IElementLike;

  removeChild(
    child: IDocumentTypeLike |
      IElementLike):                IDocumentTypeLike | IElementLike;
  
  getElementsByTagName(
    tagName: string):               Array<IElementLike>;
  
  getElementById(id: string):       IElementLike | null;
  getElementsByClassName(
    className: string):             Array<IElementLike>;
  
  createAttribute(name: string):    IAttributeLike;
  createElement(tagName: string):   IElementLike;
  createTextNode(text?: string):    ITextLike;
  createComment(text?: string):     ICommentLike;
  createProcessingInstruction(
    target?: string,
    data?: string):                 IProcessingInstructionLike;
  
  createDocumentFragment():         IDocumentFragmentLike;
  adoptNode(node: IChildNodeLike):  IChildNodeLike;
  importNode(node: IChildNodeLike): IChildNodeLike;
  cloneNode():                      IDocumentLike;
}

export default IDocumentLike;