import IDocumentLike from '../NodeLike/ParentNodeLike/DocumentLike/IDocumentLike';
function isIDocumentLike(node: any): node is IDocumentLike {
  return node && (node.nodeType === 9 || node.nodeType === 11);
}

export default isIDocumentLike;