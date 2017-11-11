import {
  IChildNodeLike,
} from '../NodeLike/IChildNodeLike';

export function isIChildNodeLike(node: any): node is IChildNodeLike {
  return node && typeof node.before === 'function';
}

export default isIChildNodeLike;