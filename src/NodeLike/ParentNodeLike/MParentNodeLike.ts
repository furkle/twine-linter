import IChildNodeLike                from '../IChildNodeLike';
import IDocumentLike                 from './DocumentLike/IDocumentLike';
import IDocumentTypeLike             from '../DocumentTypeLike/IDocumentTypeLike';
import IElementLike                  from './ElementLike/IElementLike';
import INonDocumentTypeChildNodeLike from '../INonDocumentTypeChildNodeLike';
import isIDocumentLike               from '../../TypeGuards/isIDocumentLike';
import IParentNodeLike               from './IParentNodeLike';
import TConstructor                  from '../../TypeAliases/TConstructor';
import { OrderedSet, }               from 'immutable';
const nwmatcher = require('nwmatcher');
function MParentNodeLike<T extends TConstructor<object>>(Base: T) {
  abstract class MParentNodeLike extends Base {
    abstract readonly nodeType:          number;
    abstract readonly nodeValue:         string | null;
    abstract readonly nodeName:          string;
    abstract textContent:                string | null;
    abstract readonly parentNode:        IParentNodeLike | null;
    abstract readonly parentElement:     IElementLike | null;
    abstract readonly previousSibling:   IChildNodeLike | null;
    abstract readonly nextSibling:       INonDocumentTypeChildNodeLike | null;
    protected __childNodes:              OrderedSet<IChildNodeLike> = OrderedSet([]);    
    abstract readonly childNodes:        Array<IChildNodeLike>;
    abstract readonly firstChild:        IChildNodeLike | null;
    abstract readonly lastChild:         IChildNodeLike | null;
    protected __children:                OrderedSet<IElementLike> = OrderedSet([]);
    abstract readonly children:          Array<IElementLike>;
    abstract readonly firstElementChild: IElementLike | null;
    abstract readonly lastElementChild:  IElementLike | null;
    abstract readonly childElementCount: number;
    abstract readonly ownerDocument:     IDocumentLike | null;

    abstract appendChild(node: IChildNodeLike):    IChildNodeLike;
    abstract removeChild(node: IChildNodeLike):    IChildNodeLike;
    abstract cloneNode():                          IParentNodeLike;
    abstract insertBefore(
      newNode: IChildNodeLike,
      referenceNode: IChildNodeLike):              IChildNodeLike;

    abstract replaceChild(
      oldChild: IChildNodeLike,
      newChild: IChildNodeLike):                   IChildNodeLike;

    abstract getDescendantNodes():                 Array<IChildNodeLike>;
    abstract getDescendants():                     Array<IElementLike>;
    abstract contains(node: IChildNodeLike):       boolean;
    abstract hasChildNodes():                      boolean;
    abstract isEqualNode(node: IParentNodeLike):   boolean;

    abstract isSameNode(node: IParentNodeLike):    boolean;
    abstract normalize():                          void;
    abstract __setParentNode(
      node: IParentNodeLike):                      IParentNodeLike;
    abstract __setDocument(node: IDocumentLike):   IDocumentLike;
    abstract __setPreviousSibling(
      previousSibling: IChildNodeLike):            IChildNodeLike;
    abstract __setNextSibling(
      nextSibling: INonDocumentTypeChildNodeLike): INonDocumentTypeChildNodeLike;

    querySelector(selector: string): IElementLike {
      return nwmatcher.Dom.first(selector, this);
    }

    querySelectorAll(selector: string): Array<IElementLike> {
      return nwmatcher.Dom.select(selector, this);
    }

    append(...contents: Array<IChildNodeLike | string>): void {
      if (isIDocumentLike(this)) {
        contents.forEach((value: IDocumentTypeLike | IElementLike | string) => {
          if (typeof value === 'string') {
            throw new Error('A document cannot contain a text node as a ' +
                            'child.');
          }

          const node = <IDocumentTypeLike | IElementLike>value;
          
          this.appendChild(node);
        });
      } else {
        const document = (<IDocumentLike>this.ownerDocument);
        contents.forEach((value: INonDocumentTypeChildNodeLike | string) => {
          let node = value;
          if (typeof value === 'string') {
            node = document.createTextNode(value);
          }

          node = <INonDocumentTypeChildNodeLike>node;
          this.appendChild(node);
        });
      }
    }

    prepend(...contents: Array<IChildNodeLike | string>): void {
      if (isIDocumentLike(this)) {
        contents.forEach((value: IDocumentTypeLike | IElementLike | string) => {
          if (typeof value === 'string') {
            throw new Error('A document cannot contain a text node as a ' +
                            'child.');
          }

          const node = <IDocumentTypeLike | IElementLike>value;
          
          this.appendChild(node);
        });
      } else {
        const document = (<IDocumentLike>this.ownerDocument);
        contents.forEach((value: INonDocumentTypeChildNodeLike | string) => {
          let node = value;
          if (typeof value === 'string') {
            node = document.createTextNode(value);
          }

          node = <INonDocumentTypeChildNodeLike>node;
          this.appendChild(node);
        });
      }
    }
  }

  return MParentNodeLike;
}

export default MParentNodeLike;