import DocumentLike              from '../NodeLike/ParentNodeLike/DocumentLike/DocumentLike';
import IDocumentLike             from '../NodeLike/ParentNodeLike/DocumentLike/IDocumentLike';
import INonDocumentTypeChildNode from '../NodeLike/INonDocumentTypeChildNodeLike';
import nodeFactory               from './nodeFactory';
import TAbstractSyntaxContent    from '../TypeAliases/TAbstractSyntaxContent';
function documentFactory(root: Array<TAbstractSyntaxContent>): IDocumentLike {
  const document = new DocumentLike();
  const nodes = root.map((val): INonDocumentTypeChildNode => {
    return nodeFactory(val, document);
  });

  document.body.append(...nodes);
  return document;
}

export default documentFactory;