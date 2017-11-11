import {
  IElementLike,
} from '../NodeLike/ParentNodeLike/ElementLike/IElementLike';

export function isIElementLike(node: any): node is IElementLike {
  return node && node.nodeType === 1;
}

export default isIElementLike;