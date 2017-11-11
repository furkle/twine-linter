import {
  DocumentLike,
} from '../NodeLike/ParentNodeLike/DocumentLike/DocumentLike';
import {
  IDocumentLike,
} from '../NodeLike/ParentNodeLike/DocumentLike/IDocumentLike';

export function documentConstructor(): IDocumentLike {
  // @ts-ignore
  if (typeof Document === 'function') {
    // @ts-ignore
    return new Document();
  } else {
    return new DocumentLike();
  }
}

export default documentConstructor;