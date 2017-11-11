import {
  IDocumentFragmentLike,
} from '../NodeLike/ParentNodeLike/DocumentFragmentLike/IDocumentFragmentLike';

export function isIDocumentFragmentLike(node: any): node is IDocumentFragmentLike {
  return node && node.nodeType === 11;
}

export default isIDocumentFragmentLike;