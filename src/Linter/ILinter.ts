import IElementLike    from '../NodeLike/ParentNodeLike/ElementLike/IElementLike';
import IParser         from '../Parser/IParser';
import ITask           from '../Task/ITask';
import TPassageIgnores from '../TypeAliases/TPassageIgnores';
interface ILinter {
  readonly parser:           IParser;
  readonly format:           string;
  readonly version:          string;
  readonly passageIgnores:   TPassageIgnores;
  readonly storyData:        IElementLike;
  lint(tasks: Array<ITask>): any;
}

export default ILinter;