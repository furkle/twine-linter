import IDocumentLike      from '../NodeLike/ParentNodeLike/DocumentLike/IDocumentLike';
import IElementLike       from '../NodeLike/ParentNodeLike/ElementLike/IElementLike';
import passageDataFactory from './passageDataFactory';
import TPassage          from '../TypeAliases/TPassage';
export function storyDataFactory(
  passages: Array<TPassage>,
  document: IDocumentLike): IElementLike
{
  const storyData = document.createElement('tw-storydata');
  let counter = 0;
  const nodes = passages.map((passage) => {
    let passageName = passage.passageName;
    if (!passageName) {
      passageName = `UNKNOWN_${counter}`;
      counter += 1;
    }

    return passageDataFactory(passage, document);
  });

  storyData.append(...nodes);
  return storyData;
}

export default storyDataFactory;