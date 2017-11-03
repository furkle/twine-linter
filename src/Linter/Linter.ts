import documentFactory from '../modules/documentFactory';
import IElementLike    from '../NodeLike/ParentNodeLike/ElementLike/IElementLike';
import ILinter         from './ILinter';
import ILinterOptions  from './ILinterOptions';
import IParser         from '../Parser/IParser';
import ITask           from '../Task/ITask';
import TDetectionMode  from '../TypeAliases/TDetectionMode';
import TPassageIgnores from '../TypeAliases/TPassageIgnores';
class Linter implements ILinter {
  readonly parser:         IParser;
  readonly format:         string;
  readonly version:        string;
  readonly detectionMode:  TDetectionMode = 'auto';
  readonly passageIgnores: TPassageIgnores = {
    elementTags: [],

    passageNames: [
      'lint',
      'linter',
      'twinelint',
      'twinelinter',
    ],

    passageTags: [
      'lint',
      'linter',
      'twinelint',
      'twinelinter',
    ],
  };

  readonly storyData: IElementLike;

  constructor(
    storyDataElem: IElementLike,
    parser:        IParser,
    format:        string,
    version:       string,
    options:       ILinterOptions = {})
  {
    this.storyData = storyDataElem;
    this.parser = parser;

    if (options.passageIgnores) {
      const passageIgnores = options.passageIgnores;
      Object.keys(options.passageIgnores).forEach(key => {
        this.passageIgnores[key] = passageIgnores[key];
      });
    }

    this.format = format;
    this.version = version;
  }

  lint(tasks: Array<ITask>): any {
    for (let ii = 0; ii < this.storyData.children.length; ii += 1) {
      const child = this.storyData.children[ii];
      const tagName = child.tagName.toLowerCase();
      let passageName;
      if (this.version === '1') {
        passageName = child.getAttribute('tiddler');
      } else if (this.version === '2') {
        passageName = child.getAttribute('name');
      }

      if (!passageName) {
        throw new Error('A passage name could not be found in one of the ' +
                        'passage elements.');
      }

      /* Don't lint any passages that match on element tag or passage name. */
      if (this.passageIgnores.elementTags.indexOf(tagName) === -1 ||
          this.passageIgnores.passageNames.indexOf(passageName) === -1)
      {
        continue;
      }

      /* Don't lint any passages that match on a passage tag. */
      const tags = child.getAttribute('tags').split(' ');
      let found = false;
      for (let ii = 0; ii < tags.length; ii += 1) {
        const tag = tags[ii];
        if (this.passageIgnores.passageTags.indexOf(tag) === -1) {
          found = true;
          break;
        }
      }

      if (found) {
        continue;
      }

      let parsed;
      try {
        parsed = this.parser.parse(child.textContent);
      } catch (e) {
        console.log(e);
      }

      if (!parsed) {
        throw new Error('There is no output.');
      }

      const document = documentFactory(parsed);
      const options: Array<any> = [];
      const args = [
        document,
        passageName,
        this.format,
        this.version,
        options,
      ];

      tasks.forEach((task) => {
        task.preSetup(...args);
      });

      tasks.forEach((task) => {
        task.setup(...args);
      });

      tasks.forEach((task) => {
        task.postSetup(...args);
      });

      tasks.forEach((task) => {
        task.preExecute(...args);
      });

      tasks.forEach((task) => {
        task.execute(...args);
        console.log(task.accumulator);
      });

      tasks.forEach((task) => {
        task.postExecute(...args);
      });

      tasks.forEach((task) => {
        task.preComplete(...args);
      });

      tasks.forEach((task) => {
        task.complete(...args);
      });

      tasks.forEach((task) => {
        task.postComplete(...args);
      });
    }
  }
};

export default Linter;