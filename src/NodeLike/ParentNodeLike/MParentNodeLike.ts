import IChildNodeLike                from '../IChildNodeLike';
import IDocumentLike                 from './DocumentLike/IDocumentLike';
import IDocumentTypeLike             from '../DocumentTypeLike/IDocumentTypeLike';
import IElementLike                  from './ElementLike/IElementLike';
import INonDocumentTypeChildNodeLike from '../INonDocumentTypeChildNodeLike';
import isIDocumentLike               from '../../TypeGuards/isIDocumentLike';
import isIParentNodeLike             from '../../TypeGuards/isIParentNodeLike';
import IParentNodeLike               from './IParentNodeLike';
import TConstructor                  from '../../TypeAliases/TConstructor';
import { OrderedSet, }               from 'immutable';

export function MParentNodeLike<T extends TConstructor<object>>(Base: T) {
  class MParentNodeLike extends Base {
    readonly nodeType:          number;
    protected __childNodes:     OrderedSet<IChildNodeLike> = OrderedSet([]);
    protected __children:       OrderedSet<IElementLike> = OrderedSet([]);
    readonly ownerDocument:     IDocumentLike | null;
    readonly children:          Array<IElementLike>;
    readonly firstElementChild: IElementLike | null;
    readonly lastElementChild:  IElementLike | null;
    readonly childElementCount: number;

    getDescendantNodes(): Array<IChildNodeLike> {
      return this.__childNodes
        .map((node: IChildNodeLike) => {
          if (isIParentNodeLike(node)) {
            const _node: IParentNodeLike = node;
            const arr: Array<IChildNodeLike> = [ node, ];
            return arr.concat(_node.getDescendantNodes());
          } else {
            return [ node, ];
          }
        }).reduce((previousArray: Array<IChildNodeLike>, nextArray: Array<IChildNodeLike>) => {
          return previousArray.concat(nextArray);
        }, []);
    }

    getDescendants(): Array<IElementLike> {
      if (!isIParentNodeLike(this)) {
        throw new Error('This node is not a parent node, and therefore cannot ' +
                        'have children.');
      }

      return this.__getMatcher().byTag('*');
    }

    querySelector(selector: string): IElementLike {
      if (!isIParentNodeLike(this)) {
        throw new Error('The node on which the MParentNodeLike mixin was ' +
                        'applied does not satisfy the type guard for parent ' +
                        'nodes.');
      }

      return this.__getMatcher().first(selector, this);
    }

    querySelectorAll(selector: string): Array<IElementLike> {
      if (!isIParentNodeLike(this)) {
        throw new Error('The node on which the MParentNodeLike mixin was ' +
                        'applied does not satisfy the type guard for parent ' +
                        'nodes.');
      }

      return this.__getMatcher().select(selector, this);
    }

    append(...contents: Array<IChildNodeLike | string>): void {
      if (isIDocumentLike(this)) {
        const _this: IDocumentLike = this;
        contents.forEach((value: IDocumentTypeLike | IElementLike | string) => {
          if (typeof value === 'string') {
            throw new Error('A document cannot contain a text node as a ' +
                            'child.');
          }

          const node = <IDocumentTypeLike | IElementLike>value;
          
          _this.appendChild(node);
        });
      } else if (isIParentNodeLike(this)) {
        const _this: IParentNodeLike = this;
        const document = (<IDocumentLike>this.ownerDocument);
        contents.forEach((value: INonDocumentTypeChildNodeLike | string) => {
          let node = value;
          if (typeof value === 'string') {
            node = document.createTextNode(value);
          }

          node = <INonDocumentTypeChildNodeLike>node;
          _this.appendChild(node);
        });
      } else {
        throw new Error('The node to which the ParentNodeLike mixin was ' +
                        'applied does not meet the IParentNodeLike type ' +
                        'guard.');
      }
    }

    prepend(...contents: Array<IChildNodeLike | string>): void {
      if (isIDocumentLike(this)) {
        const _this: IDocumentLike = <IDocumentLike>this;
        const firstChild = _this.firstChild;
        contents.forEach((value: IDocumentTypeLike | IElementLike | string) => {
          if (typeof value === 'string') {
            throw new Error('A document cannot contain a text node as a ' +
                            'child.');
          }

          const node = <IDocumentTypeLike | IElementLike>value;
          if (firstChild) {
            _this.insertBefore(node, firstChild);
          } else {
            _this.appendChild(node);
          }
        });
      } else if (isIParentNodeLike(this)) {
        const _this: IParentNodeLike = <IParentNodeLike>this;
        const firstChild = _this.firstChild;
        const document = (<IDocumentLike>this.ownerDocument);
        contents.forEach((value: INonDocumentTypeChildNodeLike | string) => {
          let node = value;
          if (typeof value === 'string') {
            node = document.createTextNode(value);
          }

          node = <INonDocumentTypeChildNodeLike>node;
          if (firstChild) {
            _this.insertBefore(node, firstChild);
          } else {
            _this.appendChild(node);
          }
        });
      } else {
        throw new Error('The node to which the ParentNodeLike mixin was ' +
                        'applied does not meet the IParentNodeLike type ' +
                        'guard.');
      }
    }
  }

  return MParentNodeLike;
}

export default MParentNodeLike;