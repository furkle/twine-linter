import {
  TIndexableObject,
} from '../TypeAliases/TIndexableObject';
import {
  TPassageIgnores,
} from '../TypeAliases/TPassageIgnores';

export interface IIntermediateRepresentationGeneratorOptions extends TIndexableObject {
  passageIgnores:      TPassageIgnores,
  documentConstructor: Function,
}

export default IIntermediateRepresentationGeneratorOptions;