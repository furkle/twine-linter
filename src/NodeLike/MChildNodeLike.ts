import IChildNodeLike                from './IChildNodeLike';
import INonDocumentTypeChildNodeLike from './INonDocumentTypeChildNodeLike';
import isIChildNodeLike              from '../TypeGuards/isIChildNodeLike';
import TConstructor                  from '../TypeAliases/TConstructor';
function MChildNodeLike<T extends TConstructor<object>>(Base: T) {
  class MChildNodeLike extends Base {
    before(...contents: Array<IChildNodeLike | string>): void {
      if (!isIChildNodeLike(this)) {
        throw new Error('The object implementing the MChildNodeLike mixin ' +
                        'does not pass the isIChildNodeLike type guard.');
      }

      const _this: IChildNodeLike = this;
      const parent = _this.parentNode;
      if (!parent) {
        throw new Error('The node has no parent.');
      }

      const ownerDocument = _this.ownerDocument;
      if (!ownerDocument) {
        throw new Error('The node has no owner document.');
      }

      let childNodes = parent.childNodes;
      let index = childNodes.indexOf(_this);
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
        parent.insertBefore(newNode, _this);
      });
    }

    after(...contents: Array<INonDocumentTypeChildNodeLike | string>): void {
      if (!isIChildNodeLike(this)) {
        throw new Error('The object implementing the MChildNodeLike mixin ' +
                        'does not pass the isIChildNodeLike type guard.');
      }

      const _this: IChildNodeLike = this;

      const parent = _this.parentNode;
      if (!parent) {
        throw new Error('The node has no parent.');
      }

      const ownerDocument = _this.ownerDocument;
      if (!ownerDocument) {
        throw new Error('The node has no owner document.');
      }

      contents.forEach((value: INonDocumentTypeChildNodeLike | string) => {        
        let newNode = value;
        if (typeof value === 'string') {
          newNode = ownerDocument.createTextNode(value);
        }

        newNode = <INonDocumentTypeChildNodeLike>newNode;
        parent.insertBefore(newNode, _this);
      });
    }

    replaceWith(...contents: Array<IChildNodeLike | string>) {
      if (!isIChildNodeLike(this)) {
        throw new Error('The object implementing the MChildNodeLike mixin ' +
                        'does not pass the isIChildNodeLike type guard.');
      }

      const _this: IChildNodeLike = this;

      const parent = _this.parentNode;
      if (!parent) {
        throw new Error('The node has no parent.');
      }

      const ownerDocument = _this.ownerDocument;
      if (!ownerDocument) {
        throw new Error('The node has no owner document.');
      }

      const sibling = _this.nextSibling;
      parent.removeChild(_this);
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
      if (!isIChildNodeLike(this)) {
        throw new Error('The object implementing the MChildNodeLike mixin ' +
                        'does not pass the isIChildNodeLike type guard.');
      }

      const _this: IChildNodeLike = this;
      const parent = _this.parentNode;
      if (!parent) {
        throw new Error('The node has no parent.');
      }

      parent.removeChild(_this);
    }
  }

  return MChildNodeLike;
}

export default MChildNodeLike;