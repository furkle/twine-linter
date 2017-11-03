import IParentNodeLike from '../NodeLike/ParentNodeLike/IParentNodeLike';
function isIParentNodeLike(node: any): node is IParentNodeLike {
  return node &&
    node.children &&
    typeof node.children === 'object' &&
    node.children.length >= 0;
}

export default isIParentNodeLike;