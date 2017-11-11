import {
  IDocumentFragmentLike,
} from '../NodeLike/ParentNodeLike/DocumentFragmentLike/IDocumentFragmentLike';
import {
  IDocumentLike,
} from '../NodeLike/ParentNodeLike/DocumentLike/IDocumentLike';
import {
  IIntermediateRepresentationGenerator,
} from './IIntermediateRepresentationGenerator';
import {
  isIDocumentLike,
} from '../TypeGuards/isIDocumentLike';
import {
  storyDataFactory,
} from '../modules/storyDataFactory';
import {
  IPassage,
} from '../Passage/IPassage';
import {
  IIntermediateRepresentationGeneratorOptions,
} from './IIntermediateRepresentationGeneratorOptions';

export class DocumentFragmentIntermediateRepresentationGenerator implements IIntermediateRepresentationGenerator {
  generate(
    passages: Array<IPassage>,
    options:  IIntermediateRepresentationGeneratorOptions): IDocumentFragmentLike
  {
    let doc: IDocumentLike | null = null;
    if (options.documentConstructor &&
      typeof options.documentConstructor === 'function')
    {
      doc = options.documentConstructor();
    }
  
    if (!isIDocumentLike(doc)) {
      throw new Error('The documentConstructor argument did not produce a ' +
                      'valid document.');
    }
  
    const docFragment = doc.createDocumentFragment();
    docFragment.append(storyDataFactory(passages, doc));
    return docFragment;
  }
  
}

export default DocumentFragmentIntermediateRepresentationGenerator;