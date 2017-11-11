import IDocumentLike from '../NodeLike/ParentNodeLike/DocumentLike/IDocumentLike';
import IElementLike  from '../NodeLike/ParentNodeLike/ElementLike/IElementLike';
import nodeFactory   from './nodeFactory';
import TPassage      from '../TypeAliases/TPassage';
function passageDataFactory(
  passage: TPassage,
  document: IDocumentLike): IElementLike
{
  const passageData = document.createElement('tw-passagedata');
  passageData.setAttribute('name', passage.passageName);
  passageData.setAttribute('tags', passage.tags.join(' '));
  const nodes = passage.abstractSyntaxTree.map((node) => {
    return nodeFactory(node, document);
  });

  passageData.append(...nodes);
  return passageData;
}

export default passageDataFactory;