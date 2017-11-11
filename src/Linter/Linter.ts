import {
  DetectionModes,
  Formats,
  NodeTypes,
  passageIgnores,
} from '../constants';
import {
  ArrayIntermediateRepresentationGenerator,
} from '../IntermediateRepresentationGenerator/ArrayIntermediateRepresentationGenerator';
import {
  detectFormat,
} from '../modules/detectFormat';
import {
  detectVersion,
} from '../modules/detectVersion';
import {
  documentConstructor,
} from '../modules/documentConstructor';
import {
  DocumentFragmentIntermediateRepresentationGenerator,
} from '../IntermediateRepresentationGenerator/DocumentFragmentIntermediateRepresentationGenerator';
import {
  IDocumentFragmentLike,
} from '../NodeLike/ParentNodeLike/DocumentFragmentLike/IDocumentFragmentLike';
import {
  IElementLike,
} from '../NodeLike/ParentNodeLike/ElementLike/IElementLike';
import {
  ILinter,
} from './ILinter';
import {
  ILinterOptions,
} from './ILinterOptions';
import {
  ILinterOptionsArgument,
} from './ILinterOptionsArgument'
import {
  IParser,
} from '../Parser/IParser';
import {
  isIElementLike,
} from '../TypeGuards/isIElementLike';
import {
  ITask,
} from '../Task/ITask';
import {
} from '../constants';      
import {
  TIndexableObject,
} from '../TypeAliases/TIndexableObject';
import {
  IPassage,
} from '../Passage/IPassage';
import { IIntermediateRepresentationGeneratorOptions } from '../IntermediateRepresentationGenerator/IIntermediateRepresentationGeneratorOptions';

const semver = require('semver');

export class Linter implements ILinter {
  readonly parser:  IParser;
  readonly options: ILinterOptions;

  constructor(
    parser:  IParser,
    options: ILinterOptionsArgument = {})
  { 
    if (!parser || typeof parser.parse !== 'function') {
      throw new Error('The parser argument did not have a parse method.');
    }

    this.parser = parser;

    if (!options || typeof options !== 'object') {
      throw new Error('The options argument was not an object.');
    }

    const opts = <TIndexableObject>{};

    if ('passageIgnores' in options) {
      if (typeof options.passageIgnores !== 'object') {
        throw new Error('The passageIgnores property of the options ' +
                        'argument was not an object.');
      }

      opts.passageIgnores = options.passageIgnores;
    } else {
      opts.passageIgnores = passageIgnores;
    }

    if ('detectionMode' in options) {
      if (!options.detectionMode ||
        typeof options.detectionMode !== 'string')
      {
        throw new Error('The detectionMode property of the options argument ' +
                        'was not a string with content.');
      }

      const detectionMode = options.detectionMode.toLowerCase();
      const keys = Object.keys(DetectionModes);
      if (keys.indexOf(detectionMode) === -1) {
        throw new Error('The detectionMode property of the options argument ' +
                        'was not a recognized detection mode. Recognized modes ' +
                        `are ${keys.join(', ')}.`);
      }

      opts.detectionMode = detectionMode;
    } else {
      opts.detectionMode = 'manual';
    }

    if ('format' in options) {
      if (typeof options.format !== 'string') {
        throw new Error('The format property of the options argument was ' +
                        'not a string.');
      }

      const format = options.format.toLowerCase();
      const keys = Object.keys(DetectionModes);
      if (keys.indexOf(format) === -1) {
        throw new Error('The format property of the options argument ' +
                        'was not a recognized format. Recognized formats ' +
                        `are ${keys.join(', ')}.`);
      }

      opts.format = format;
    } else {
      if (!isIElementLike(options.storyData)) {
        throw new Error('The options.storyData argument is not an element.');
      }

      opts.format = detectFormat(options.storyData, opts.detectionMode);
    }

    if ('version' in options) {
      if (typeof options.version !== 'string') {
        throw new Error('The version property of the options argument was ' +
                        'not a string.');
      } else if (!semver.valid(options.version)) {
        throw new Error('The version property of the options argument was ' +
                        'not a valid semantic version.');
      }

      opts.version = options.version;
    } else {
      if (!isIElementLike(options.storyData)) {
        throw new Error('The storyData argument is not an element.');
      }

      opts.version = detectVersion(options.storyData, opts.detectionMode);
    }

    if ('documentConstructor' in options) {
      if (typeof options.documentConstructor !== 'function') {
        console.log(options);
        throw new Error('The documentConstructor property of the options ' +
                        'argument is not a function.');
      }

      opts.documentConstructor = options.documentConstructor;
    } else {
      opts.documentConstructor = documentConstructor;
    }

    this.options = <ILinterOptions>opts;
  }

  lint(
    storyData: IElementLike,
    tasks: Array<ITask>,
    options?: ILinterOptions): Array<ITask>
  {
    if (!isIElementLike(storyData)) {
      throw new Error('The storyData argument was not an element.');
    }

    if (!tasks ||
      typeof tasks !== 'object' ||
      Number.isNaN(Number(tasks.length)) ||
      typeof tasks.forEach !== 'function')
    {
      throw new Error('The tasks argument was not an array.');
    } else if (tasks.length <= 0) {
      throw new Error('No tasks were provided to the lint method.');
    }

    tasks.forEach((task) => {
      if (!task || typeof task !== 'object') {
        throw new Error('One of the tasks was not an object.');
      } if (typeof task.execute !== 'function' &&
        typeof task.executeMicrotask !== 'function')
      {
        throw new Error('One of the tasks had neither an execute nor an ' +
                        'executeMicrotask method.');
      }
    });

    let argOpts: ILinterOptionsArgument = options || {};
    const opts: ILinterOptions = typeof this.options === 'undefined' ?
      JSON.parse(JSON.stringify(this.options)) : {};
    if ('detectionMode' in argOpts) {
      if (!argOpts.detectionMode ||
        typeof argOpts.detectionMode !== 'string')
      {
        throw new Error('The detectionMode property was present in the ' +
                        'options argument, but it was not a string with ' +
                        'content.');
      }

      opts.detectionMode = argOpts.detectionMode;
    }

    opts.detectionMode = <DetectionModes>opts.detectionMode.toLowerCase();
    let keys = Object.keys(DetectionModes);
    if (keys.indexOf(opts.detectionMode) === -1) {
      throw new Error('The detectionMode property was present in the ' +
                      'options argument, but it was not one of the ' +
                      `following: ${keys.join(', ')})`);
    }

    if ('documentConstructor' in argOpts) {
      if (typeof argOpts.documentConstructor !== 'function') {
        throw new Error('The documentConstructor property was present in ' +
                        'the options argument, but it was not a function.');
      }

      opts.documentConstructor = argOpts.documentConstructor;
    } else if (typeof opts.documentConstructor !== 'function') {
      throw new Error('The options.documentConstructor property of this ' +
                      'Linter was not a function.');
    }

    if ('format' in argOpts) {
      if (!argOpts.format || typeof argOpts.format !== 'string') {
        throw new Error('The format property was present in the options ' +
                        'argument, but it was not a string with content.');
      }

      opts.format = argOpts.format;
    } else if (!opts.format || typeof opts.format !== 'string') {
      throw new Error('The options.format property of this Linter was not a ' +
                      'string with content.');
    }

    opts.format = <Formats>opts.format.toLowerCase();
    keys = Object.keys(Formats);
    if (keys.indexOf(opts.format.toLowerCase()) === -1) {
      throw new Error('The options.format property on this Linter is not ' +
                      'contained in constants.formats.');
    } else if (!opts.version || typeof opts.version !== 'string') {
      throw new Error('The options.version property of this Linter was not ' +
                      'a string.');
    } else if (!semver.valid(opts.version)) {
      throw new Error('The options.version property of this Linter was not ' +
                      'a valid semantic version.');
    }

    const stageOne = this.generateILStageOne(storyData, opts);
    let len = 1;
    if (opts.runInIsolation) {
      len = tasks.length;
    }

    const stageTwo = this.generateILStageTwo(storyData, opts);
    const isolationChambers: Array<IDocumentFragmentLike> = [ stageTwo, ];
    for (let ii = 1; ii < len; ii += 1) {
      isolationChambers.push(stageTwo.cloneNode());
    }

    return this.runTasks(tasks, isolationChambers, opts);
  }

  generateILStageOne(
    storyData: IElementLike,
    options:   IIntermediateRepresentationGeneratorOptions): Array<IPassage>
  {
    const gen = new ArrayIntermediateRepresentationGenerator();
    return gen.generate(storyData, options);
  }

  generateILStageTwo(
    passages: Array<IPassage>,
    options:  IIntermediateRepresentationGeneratorOptions): IDocumentFragmentLike
  {
    const gen = new DocumentFragmentIntermediateRepresentationGenerator();
    return gen.generate(passages, options);
  }

  protected runTasks(
    tasks:             Array<ITask>,
    isolationChambers: Array<IDocumentFragmentLike>,
    linterOptions:     ILinterOptions,
    taskOptions:       Array<any> = []): Array<ITask>
  {
    if (linterOptions.runInIsolation) {
      return this.runTasksInIsolation(
        tasks,
        isolationChambers,
        linterOptions,
        taskOptions);
    } else {
      return this.runTasksInParallel(
        tasks,
        isolationChambers[0],
        linterOptions,
        taskOptions);
    }
  }

  protected runTasksInParallel(
    tasks:            Array<ITask>,
    documentFragment: IDocumentFragmentLike,
    linterOptions:    ILinterOptions,
    options:          Array<any> = []): Array<ITask>
  {
    tasks.forEach((task) => {
      task.preSetup(documentFragment, options);
    });

    tasks.forEach((task) => {
      task.setup(documentFragment, options);
    });

    tasks.forEach((task) => {
      task.postSetup(documentFragment, options);
    });

    tasks.forEach((task) => {
      task.preExecute(documentFragment, options);
    });
    
    const children = documentFragment.querySelector('tw-storydata').children;
    for (let ii = 0; ii < children.length; ii += 1) {
      const passageData = children[ii];
      const passageName = passageData.getAttribute('name');
      const descendants = passageData.querySelectorAll('*');
      for (let jj = 0; jj < descendants.length; jj += 1) {
        const descendant = descendants[jj];
        tasks.forEach((task) => {
          (<Function>task.executeMicrotask)(
            descendant,
            passageName,
            linterOptions.format,
            linterOptions.version
          );
        });
      }
    }

    tasks.forEach((task) => {
      task.postExecute(documentFragment, options);
    });

    tasks.forEach((task) => {
      task.preComplete(documentFragment, options);
    });

    tasks.forEach((task) => {
      task.complete(documentFragment, options);
    });

    tasks.forEach((task) => {
      task.postComplete(documentFragment, options);
    });

    return tasks;
  }

  protected runTasksInIsolation(
    tasks:             Array<ITask>,
    isolationChambers: Array<IDocumentFragmentLike>,
    linterOptions:     ILinterOptions,
    options:           Array<any> = []): Array<ITask>
  {
    tasks.forEach((task, ii) => {
      task.preSetup(isolationChambers[ii], options);
    });

    tasks.forEach((task, ii) => {
      task.setup(isolationChambers[ii], options);
    });

    tasks.forEach((task, ii) => {
      task.postSetup(isolationChambers[ii], options);
    });

    tasks.forEach((task, ii) => {
      task.preExecute(isolationChambers[ii], options);
    });

    tasks.forEach((task, ii) => {
      if (typeof task.execute === 'function') {
        task.execute(isolationChambers[ii], options);
      } else if (typeof task.executeMicrotask === 'function') {
        const doc = isolationChambers[ii];
        doc.querySelector('tw-storydata').children
          .forEach((passageData) => {
            const passageName = passageData.getAttribute('name');
            passageData.getDescendants().forEach((descendant) => {
              (<Function>task.executeMicrotask)(
                descendant,
                passageName,
                linterOptions.format,
                linterOptions.version
              )
            });
          });
      } else {
        throw new Error('ITask has neither execute or executeMicrotask ' +
                        'methods.');
      }
    });

    tasks.forEach((task, ii) => {
      task.postExecute(isolationChambers[ii], options);
    });

    tasks.forEach((task, ii) => {
      task.preComplete(isolationChambers[ii], options);
    });

    tasks.forEach((task, ii) => {
      task.complete(isolationChambers[ii], options);
    });

    tasks.forEach((task, ii) => {
      task.postComplete(isolationChambers[ii], options);
    });

    return tasks;
  }
};

export default Linter;