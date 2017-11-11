import IDocumentLike from '../NodeLike/ParentNodeLike/DocumentLike/IDocumentLike';
export function isIDocumentLike(node: any): node is IDocumentLike {
  return node && node.nodeType === 9;
}

export default isIDocumentLike;