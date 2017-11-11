import {
  IDocumentFragmentLike,
} from '../NodeLike/ParentNodeLike/DocumentFragmentLike/IDocumentFragmentLike';
import {
  IElementLike,
} from '../NodeLike/ParentNodeLike/ElementLike/IElementLike';
import {
  ILinterOptions,
} from './ILinterOptions';
import {
  IParser,
} from '../Parser/IParser';
import {
  ITask,
} from '../Task/ITask';
import {
  IPassage,
} from '../Passage/IPassage';

export interface ILinter {
  readonly parser:  IParser;
  readonly options: ILinterOptions;

  lint(storyData: IElementLike, tasks: Array<ITask>): Array<ITask>;
  generateILStageOne(storyData: IElementLike):        Array<IPassage>;
  generateILStageTwo(passages: Array<IPassage>):      IDocumentFragmentLike;
}

export default ILinter;