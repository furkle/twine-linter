import INodeLike        from '../NodeLike/INodeLike';
import IRecurser        from './IRecurser';
import TIndexableObject from '../TypeAliases/TIndexableObject';
class Recurser implements IRecurser {
  leftTopRecurse(
    node:     INodeLike,
    format:   string,
    version:  string,
    callback: Function,
    options?: TIndexableObject,
  ): void {
    callback(node, format, version, options);
    const childNodes = node.childNodes;
    for (let ii = 0; ii < childNodes.length; ii += 1) {
      const childNode = childNodes[ii];
      this.leftTopRecurse(childNode, format, version, callback, options);
    }
  }

  leftBottomRecurse(
    node:     INodeLike,
    format:   string,
    version:  string,
    callback: Function,
    options?: TIndexableObject,
  ): void {
    const childNodes = node.childNodes;
    for (let ii = 0; ii < childNodes.length; ii += 1) {
      const childNode = childNodes[ii];
      this.leftBottomRecurse(childNode, format, version, callback, options);
    }

    callback(node, format, version, options);
  }

  rightTopRecurse(
    node:     INodeLike,
    format:   string,
    version:  string,
    callback: Function,
    options?: TIndexableObject,
  ): void {
    callback(node, format, version, options);
    const childNodes = node.childNodes;
    for (let ii = childNodes.length - 1; ii >= 0; ii -= 1) {
      const child = childNodes[ii];
      this.rightTopRecurse(child, format, version, callback, options);
    }
  }

  rightBottomRecurse(
    element:  INodeLike,
    format:   string,
    version:  string,
    callback: Function,
    options?: TIndexableObject,
  ): void {
    const childNodes = element.childNodes;
    for (let ii = childNodes.length - 1; ii >= 0; ii -= 1) {
        const child = childNodes[ii];
        this.rightBottomRecurse(child, format, version, callback, options);
    }

    callback(element, format, version, options);
  }
}

export default Recurser;