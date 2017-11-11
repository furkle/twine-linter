import constants           from '../constants';
import detectFormat        from '../modules/detectFormat';
jest.mock('../modules/detectFormat');
import detectVersion       from '../modules/detectVersion';
jest.mock('../modules/detectVersion');
import documentConstructor from '../modules/documentConstructor';
jest.mock('../modules/documentConstructor');
import documentFactory     from '../modules/documentFactory';
jest.mock('../modules/documentFactory');
import isIElementLike      from '../TypeGuards/isIElementLike';
jest.mock('../TypeGuards/isIElementLike');
import Linter              from './Linter';
const semver = require('semver');
jest.mock('semver');
describe('Linter constructor unit tests.', () => {
  beforeEach(() => {
    isIElementLike.mockClear();
    isIElementLike.mockReturnValue(true);
    semver.valid.mockClear();
    semver.valid.mockReturnValue(true);
    detectFormat.mockClear();
    detectVersion.mockClear();
  });

  it('Rejects parser arguments without a parse method.', () => {
    const func = () => new Linter();
    expect(func).toThrow('The parser argument did not have a parse method.');
  });

  it('Rejects options arguments which are not objects.', () => {
    const parser = { parse: () => null, };
    const func = () => new Linter(parser, null);
    expect(func).toThrow('The options argument was not an object.');
  });

  it('Rejects options arguments which have a non-object passageIgnores property.', () => {
    const parser = { parse: () => null, };
    const options = { passageIgnores: 'foo', };
    const func = () => new Linter(parser, options);
    expect(func).toThrow('The passageIgnores property of the options argument ' +
                        'was not an object.');
  });

  it('Allows through options arguments which have a passageIgnores object property.', () => {
    const parser = { parse: () => null, };
    const options = { passageIgnores: { foo: 'bar', }, };
    const linter = new Linter(parser, options);
    expect(linter.options.passageIgnores).toEqual({ foo: 'bar', });
  });

  it('Creates a default argument for passageIgnores if the argument property is falsy.', () => {
    const parser = { parse: () => null, };
    const linter = new Linter(parser);
    expect(linter.options.passageIgnores).toEqual(constants.passageIgnores);
  });

  it('Rejects non-string options.detectionMode arguments.', () => {
    const parser = { parse: () => null, };
    const options = { detectionMode: 2, };
    const func = () => new Linter(parser, options);
    expect(func).toThrow('The detectionMode property of the options argument ' +
                         'was not a string with content.');
  });

  it('Rejects options.detectionMode arguments which are not in constants.detectionModes.', () => {
    const parser = { parse: () => null, };
    const options = { detectionMode: 'foo', };
    const func = () => new Linter(parser, options);
    expect(func).toThrow('The detectionMode property of the options argument ' +
                         'was not a recognized detection mode. Recognized ' +
                         'modes are ' +
                         Object.keys(constants.detectionModes).join(', ') +
                         '.');
  });

  it('Passes through valid options.detectionMode arguments.', () => {
    const parser = { parse: () => null, };
    const options = { detectionMode: 'auto', };
    const linter = new Linter(parser, options);
    expect(linter.options.detectionMode).toBe('auto');
  });

  it('Accepts case-insensitive arguments for values of options.detectionMode.', () => {
    const parser = { parse: () => null, };
    const options = { detectionMode: 'AuTo', };
    const linter = new Linter(parser, options);
    expect(linter.options.detectionMode).toBe('auto');
  });

  it('Rejects non-string options.format arguments.', () => {
    const parser = { parse: () => null, };
    const options = { format: 3, };
    const func = () => new Linter(parser, options);
    expect(func).toThrow('The format property of the options argument was ' +
                        'not a string.');
  });

  it('Rejects options.format arguments which are not in constants.formats.', () => {
    const parser = { parse: () => null, };
    const options = { format: 'foo', };
    const func = () => new Linter(parser, options);
    expect(func).toThrow('The format property of the options argument ' +
                        'was not a recognized format. Recognized formats ' +
                        `are ${Object.keys(constants.formats).join(', ')}.`);
  });

  it('Passes through options.format arguments which are present in constants.formats.', () => {
    const parser = { parse: () => null, };
    const options = { format: 'gately', };
    detectVersion.mockReturnValue(null);
    const linter = new Linter(parser, options);
    expect(linter.options.format).toBe('gately');
  });

  it('Passes through options.format arguments which are present in constants.formats in a case-blind sense.', () => {
    const parser = { parse: () => null, };
    const options = { format: 'GaTeLy', };
    detectVersion.mockReturnValue(null);
    const linter = new Linter(parser, options);
    expect(linter.options.format).toBe('gately');
  });

  it('Throws if options.format is undefined and options.storyData is not like IElementLike.', () => {
    isIElementLike.mockReturnValue(false);
    const parser = { parse: () => null, };
    const func = () => new Linter(parser);
    expect(func).toThrow('The options.storyData argument is not an element.');
  });

  it('Detects the format if options.format exists.', () => {
    const parser = { parse: () => null, };
    detectFormat.mockReturnValue('_format');
    const linter = new Linter(parser);
    expect(linter.options.format).toBe('_format');
    expect(detectFormat.mock.calls.length).toBe(1);
  });

  it('Rejects the options.version argument if it is not a string.', () => {
    const parser = { parse: () => null, };
    const options = { version: [], };
    const func = () => new Linter(parser, options);
    expect(func).toThrow('The version property of the options argument was ' +
                        'not a string.');
  });

  it('Rejects the options.version argument if it is not a valid semantic version.', () => {
    const parser = { parse: () => null, };
    semver.valid.mockReturnValue(false);
    const options = { version: 'foo', };
    const func = () => new Linter(parser, options);
    expect(func).toThrow('The version property of the options argument was ' +
                        'not a valid semantic version.');
  });

  it('Accepts and passes through the options.version argument if it is a valid semantic version.', () => {
    const parser = { parse: () => null, };
    const options = { version: '1.2.3', };
    const linter = new Linter(parser, options);
    expect(linter.options.version).toBe('1.2.3');
  });

  it('Detects the version if no options.version property is provided.', () => {
    const parser = { parse: () => null, };
    detectVersion.mockReturnValue('2.3.4');
    const linter = new Linter(parser);
    expect(linter.options.version).toBe('2.3.4');
    expect(detectVersion.mock.calls.length).toBe(1);
  });

  it('Rejects the options.documentConstructor argument if it is not a function.', () => {
    const parser = { parse: () => null, };
    const options = { documentConstructor: 'foo', };
    const func = () => new Linter(parser, options);
    expect(func).toThrow('The documentConstructor property of the options ' +
                         'argument is not a function.');
  });

  it('Accepts and passes through the options.documentConstructor argument if it is a function.', () => {
    const parser = { parse: () => null, };
    const documentConstructor = () => {};
    const options = { documentConstructor, };
    const linter = new Linter(parser, options);
    expect(linter.options.documentConstructor).toBe(documentConstructor);
  });

  it('Accepts and stores (with cloning) the options argument.', () => {
    const parser = { parse: () => null, };
    const documentConstructor = () => {};
    const options = {
      detectionMode: constants.detectionModes.auto,
      documentConstructor,
      format: 'gately',
      passageIgnores: constants.passageIgnores,
      version: '2.3.4',
    };

    const linter = new Linter(parser, options);
    expect(linter.options).toEqual(options);
    expect(linter.options).not.toBe(options);
  });
});

describe('Linter lint unit tests.', () => {
  beforeEach(() => {
    semver.valid.mockClear();
    semver.valid.mockReturnValue(true);
    detectFormat.mockClear();
    detectFormat.mockReturnValue('gately');
    detectVersion.mockClear();
    detectVersion.mockReturnValue('2.0.0');
    documentFactory.mockClear();
    documentFactory.mockReturnValue({ doctest: 'doctest', });
    isIElementLike.mockClear();
    isIElementLike.mockReturnValue(true);
  });

  it('Rejects the storyData argument if it is not an element.', () => {
    isIElementLike.mockReturnValue(false);
    const parser = { parse: () => {}, };
    const linter = new Linter(parser, {
      format: constants.formats.gately,
      version: '3.4.5',
    });

    const func = () => linter.lint();
    expect(func).toThrow('The storyData argument was not an element.');
  });

  it('Rejects the tasks argument if it is falsy.', () => {
    const parser = { parse: () => {}, };
    const linter = new Linter(parser);
    const func = () => linter.lint(null, false);
    expect(func).toThrow('The tasks argument was not an array.');
  });
  
  it('Rejects the tasks argument if it is not an object.', () => {
    const parser = { parse: () => {}, };
    const linter = new Linter(parser);
    const func = () => linter.lint('foo');
    expect(func).toThrow('The tasks argument was not an array.');
  });

  it('Rejects the tasks argument if its length property is not a number.', () => {
    const parser = { parse: () => {}, };
    const linter = new Linter(parser);
    const func = () => linter.lint({ length: 'bar', });
    expect(func).toThrow('The tasks argument was not an array.');
  });

  it('Rejects the tasks arugment if its length is less than or equal to one.', () => {
    const parser = { parse: () => {}, };
    const linter = new Linter(parser);
    const func = () => linter.lint(null, { length: 0, forEach: () => {}, });
    expect(func).toThrow('No tasks were provided to the lint method.');
  });
  
  it('Rejects the tasks argument if its forEach property is not a function.', () => {
    const parser = { parse: () => {}, };
    const linter = new Linter(parser);
    const func = () => linter.lint(null, { length: 2, forEach: 'baz', });
    expect(func).toThrow('The tasks argument was not an array.');
  });

  it('Rejects the tasks argument if one of the tasks is not an object.', () => {
    const parser = { parse: () => {}, };
    const linter = new Linter(parser);
    const func = () => linter.lint(null, [ 'foo', ]);
    expect(func).toThrow('One of the tasks was not an object.');
  });

  it('Rejects the tasks argument if one of the tasks lacks both execute and executeMicrotask methods.', () => {
    const parser = { parse: () => {}, };
    const linter = new Linter(parser);
    const func = () => linter.lint(null, [ {}, ]);
    expect(func).toThrow('One of the tasks had neither an execute nor an ' +
                         'executeMicrotask method.');
  });

  it('Passes through valid arrays of tasks.', () => {
    const parser = { parse: () => {}, };
    const linter = new Linter(parser);
    linter.generateILStageOne = jest.fn();
    linter.options.documentConstructor = jest.fn();
    const tasks = [
      { executeMicrotask: () => {}, },
    ];

    linter.runTasks = jest.fn(() => tasks);
    expect(linter.lint(null, tasks)).toBe(tasks);
  });

  it('Uses the storyData element to generate passage objects.', () => {
    const parser = { parse: () => {}, };
    const linter = new Linter(parser);
    linter.storyData = { test: 'test', };
    linter.generateILStageOne = jest.fn();
    const tasks = [
      { executeMicrotask: () => {}, },
    ];

    linter.runTasks = jest.fn();
    linter.lint(null, tasks);
    expect(linter.generateILStageOne.mock.calls).toEqual([
      [ linter.storyData, ],
    ]);
  });

  it('Creates a single document if options.runInIsolation is falsy.', () => {
    const parser = { parse: () => {}, };
    const linter = new Linter(parser);
    linter.storyData = { testStoryData: 'testStoryData', };
    const func = () => ({ testStoryMap: 'testStoryMap', });
    linter.generateILStageOne = jest.fn(func);
    documentFactory.mockReturnValue({ test: 'test', });
    linter.runTasks = jest.fn();
    const tasks = [
      { executeMicrotask: () => {}, },
      { executeMicrotask: () => {}, },
    ];

    linter.lint(null, tasks);
    expect(documentFactory.mock.calls.length).toBe(1);
    expect(documentFactory.mock.calls).toEqual([
      [
        { testStoryMap: 'testStoryMap', },
        documentConstructor,
      ],
    ]);
  });

  it('Creates multiple documents if options.runInIsolation is truthy.', () => {
    const parser = { parse: () => {}, };
    const linter = new Linter(parser);
    linter.options.runInIsolation = true;
    linter.storyData = { testStoryData: 'testStoryData', };
    const func = () => ({ testStoryMap: 'testStoryMap', });
    linter.generateILStageOne = jest.fn(func);
    documentFactory.mockReturnValue({ test: 'test', });
    linter.runTasks = jest.fn();
    const tasks = [
      { executeMicrotask: () => {}, },
      { executeMicrotask: () => {}, },
      { executeMicrotask: () => {}, },
    ];

    linter.lint(tasks);
    expect(documentFactory.mock.calls.length).toBe(3);
    expect(documentFactory.mock.calls).toEqual([
      [
        { testStoryMap: 'testStoryMap', },
        documentConstructor,
      ],
      [
        { testStoryMap: 'testStoryMap', },
        documentConstructor,
      ],
      [
        { testStoryMap: 'testStoryMap', },
        documentConstructor,
      ],
    ]);
  });

  it('Errors out if the options property of the Linter is not an object.', () => {
    const parser = { parse: () => {}, };
    const linter = new Linter(parser);
    delete linter.options;
    linter.storyData = { testStoryData: 'testStoryData', };
    const func = () => ({ testStoryMap: 'testStoryMap', });
    linter.generateILStageOne = jest.fn(func);
    documentFactory.mockReturnValue({ test: 'test', });
    const tasks = [
      { executeMicrotask: () => {}, },
    ];

    const fun = () => linter.lint(tasks);
    expect(fun).toThrow('The options property of this Linter is not an ' +
                        'object.');
  });

  it('Errors out if the options.format property of the Linter is falsy.', () => {
    const parser = { parse: () => {}, };
    const linter = new Linter(parser);
    linter.options = { format: '', };
    linter.storyData = { testStoryData: 'testStoryData', };
    const func = () => ({ testStoryMap: 'testStoryMap', });
    linter.generateILStageOne = jest.fn(func);
    documentFactory.mockReturnValue({ test: 'test', });
    const tasks = [
      { executeMicrotask: () => {}, },
    ];

    const fun = () => linter.lint(tasks);
    expect(fun).toThrow('The options.format property of this Linter was not ' +
                        'a string with content.');
  });

  it('Errors out if the options.format property of the Linter is not a string.', () => {
    const parser = { parse: () => {}, };
    const linter = new Linter(parser);
    linter.options = { format: 2, };
    linter.storyData = { testStoryData: 'testStoryData', };
    const func = () => ({ testStoryMap: 'testStoryMap', });
    linter.generateILStageOne = jest.fn(func);
    documentFactory.mockReturnValue({ test: 'test', });
    const tasks = [
      { executeMicrotask: () => {}, },
    ];

    const fun = () => linter.lint(tasks);
    expect(fun).toThrow('The options.format property of this Linter was not ' +
                        'a string with content.');
  });

  it('Errors out if the options.format property of the Linter is not contained in constants.formats.', () => {
    const parser = { parse: () => {}, };
    const linter = new Linter(parser);
    linter.options = { format: 'bux', };
    linter.storyData = { testStoryData: 'testStoryData', };
    const func = () => ({ testStoryMap: 'testStoryMap', });
    linter.generateILStageOne = jest.fn(func);
    documentFactory.mockReturnValue({ test: 'test', });
    const tasks = [
      { executeMicrotask: () => {}, },
    ];

    const fun = () => linter.lint(tasks);
    expect(fun).toThrow('The options.format property on this Linter is not ' +
                        'contained in constants.formats.');
  });

  it('Errors out if options.version property of this Linter is falsy.', () => {
    const parser = { parse: () => {}, };
    const linter = new Linter(parser);
    linter.options = { format: 'sugarcane', };
    linter.storyData = { testStoryData: 'testStoryData', };
    const func = () => ({ testStoryMap: 'testStoryMap', });
    linter.generateILStageOne = jest.fn(func);
    documentFactory.mockReturnValue({ test: 'test', });
    const tasks = [
      { executeMicrotask: () => {}, },
    ];

    const fun = () => linter.lint(tasks);
    expect(fun).toThrow('The options.version property of this Linter was ' +
                        'not a string.');
  });

  it('Errors out if options.version property of this Linter is not a string.', () => {
    const parser = { parse: () => {}, };
    const linter = new Linter(parser);
    linter.options = {
      format: 'sugarcane',
      version: {},
    };

    linter.storyData = { testStoryData: 'testStoryData', };
    const func = () => ({ testStoryMap: 'testStoryMap', });
    linter.generateILStageOne = jest.fn(func);
    documentFactory.mockReturnValue({ test: 'test', });
    const tasks = [
      { executeMicrotask: () => {}, },
    ];

    const fun = () => linter.lint(tasks);
    expect(fun).toThrow('The options.version property of this Linter was ' +
                        'not a string.');
  });
  
  it('Errors out if options.version property of this Linter is not a valid semantic version.', () => {
    const parser = { parse: () => {}, };
    const linter = new Linter(parser);
    linter.storyData = { testStoryData: 'testStoryData', };
    const func = () => ({ testStoryMap: 'testStoryMap', });
    linter.generateILStageOne = jest.fn(func);
    documentFactory.mockReturnValue({ test: 'test', });
    semver.valid.mockReturnValue(false);
    const tasks = [
      { executeMicrotask: () => {}, },
    ];

    const fun = () => linter.lint(tasks);
    expect(fun).toThrow('The options.version property of this Linter was ' +
                        'not a valid semantic version.');

    expect(semver.valid.mock.calls.length).toBe(1);
  });

  it('Errors out if options.documentConstructor property of this Linter is not a function.', () => {
    const parser = { parse: () => {}, };
    const linter = new Linter(parser);
    linter.options = {
      format: 'sugarcane',
      version: '1.2.3',
      documentConstructor: 15,
    };

    linter.storyData = { testStoryData: 'testStoryData', };
    const func = () => ({ testStoryMap: 'testStoryMap', });
    linter.generateILStageOne = jest.fn(func);
    documentFactory.mockReturnValue({ test: 'test', });
    const tasks = [
      { executeMicrotask: () => {}, },
    ];

    const fun = () => linter.lint(tasks);
    expect(fun).toThrow('The options.documentConstructor property on this ' +
                        'Linter was not a function.');
  });

  it('Passes the tasks, created documents, and constructor options to Linter.runTasks.', () => {
    const parser = { parse: () => {}, };
    const linter = new Linter(parser);
    linter.options.runInIsolation = true;
    linter.storyData = { testStoryData: 'testStoryData', };
    const func = () => ({ testStoryMap: 'testStoryMap', });
    linter.generateILStageOne = jest.fn(func);
    documentFactory.mockReturnValue({ test: 'test', });
    linter.runTasks = jest.fn();
    const tasks = [
      { executeMicrotask: () => {}, },
      { executeMicrotask: () => {}, },
      { executeMicrotask: () => {}, },
    ];

    linter.lint(tasks);
    expect(linter.runTasks.mock.calls).toEqual([
      [
        tasks,
        [
          { test: 'test', },
          { test: 'test', },
          { test: 'test', },
        ],
        {
          detectionMode: 'manual',
          documentConstructor,
          format: 'gately',
          passageIgnores: constants.passageIgnores,
          runInIsolation: true,
          version: '2.0.0',
        },
      ],
    ]);
  });
});

describe('Linter generateILStageOne unit tests.', () => {
  it('Rejects if the storyDataElem', () => {

  })
});