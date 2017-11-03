import IChildNodeLike from '../NodeLike/ParentNodeLike/ElementLike/IElementLike';
function isIChildNodeLike(node: any): node is IChildNodeLike {
  return node && typeof node.before === 'function';
}

export default isIChildNodeLike;