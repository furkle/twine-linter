import IDocumentLike    from '../NodeLike/ParentNodeLike/DocumentLike/IDocumentLike';
import IRecurser        from '../Recurser/IRecurser';
import ITask            from './ITask';
import ITaskFunctionMap from './ITaskFunctionMap';
import Recurser         from '../Recurser/Recurser';
import TIndexableObject from '../TypeAliases/TIndexableObject';
abstract class AbstractTask implements ITask {
  /* Allow user-driven tasks to collect results. */
  accumulator: TIndexableObject | Array<any> = {};

  /* Provides four types of recursion: (left|right)-(top|bottom) */
  recurser:    IRecurser = new Recurser();

  execute: Function = (
    document: IDocumentLike,
    format:   string,
    version:  string,
    options?: TIndexableObject,
  ): void => {
    const node = document.documentElement;

    if (!node) {
      throw new Error('The node has no root element.');
    }

    const opts = options || {};
    let recursionMode = 'left-top';
    if (opts.recursionMode && typeof opts.recursionMode === 'string') {
      recursionMode = opts.recursionMode;
    }

    const callback = this.executeMicrotask;
    if (/left-?top/i.test(recursionMode)) {
      this.recurser.leftTopRecurse(node, format, version, callback, opts);
    } else if (/left-?bottom/i.test(recursionMode)) {
      this.recurser.leftBottomRecurse(node, format, version, callback, opts);
    } else if (/right-?top/i.test(recursionMode)) {
      this.recurser.rightTopRecurse(node, format, version, callback, opts);
    } else if (/right-?bottom/i.test(recursionMode)) {
      this.recurser.rightBottomRecurse(node, format, version, callback, opts);
    } else {
      throw new Error('Unrecognized recursionMode value.');
    }
  }

  /* Initialize functions as no-ops to prevent from having to sniff their
   * existence in run(). */
  readonly preSetup:                  Function = () =>  { return; };
  readonly setup:                     Function = () =>  { return; };
  readonly postSetup:                 Function = () =>  { return; };
  readonly preExecute:                Function = () =>  { return; };
  abstract readonly executeMicrotask: Function;
  readonly postExecute:               Function = () =>  { return; };
  readonly preComplete:               Function = () =>  { return; };
  readonly complete:                  Function = () =>  { return; };
  readonly postComplete:              Function = () =>  { return; };

  constructor(functionOrFunctionMap?: Function | ITaskFunctionMap) {
    /* If the function map is provided, assign the existing properties to
     * the object. */
    if (typeof functionOrFunctionMap === 'function') {
      this.executeMicrotask = <Function>functionOrFunctionMap;
    } else if (typeof functionOrFunctionMap !== 'undefined') {
      const functionMap = <ITaskFunctionMap>functionOrFunctionMap;
      if (typeof functionMap.preSetup === 'function') {
        this.preSetup = functionMap.preSetup.bind(this);
      }

      if (typeof functionMap.setup === 'function') {
        this.setup = functionMap.setup.bind(this);
      }

      if (typeof functionMap.postSetup === 'function') {
        this.postSetup = functionMap.postSetup.bind(this);
      }

      if (typeof functionMap.preExecute === 'function') {
        this.preExecute = functionMap.preExecute.bind(this);
      }

      if (typeof functionMap.execute === 'function') {
        this.execute = functionMap.execute.bind(this);
      }
      
      if (typeof functionMap.executeMicrotask !== 'function') {
        throw new Error('The executeMicrotask function was not ' +
                        'provided.');
      }

      this.executeMicrotask = functionMap.executeMicrotask;

      if (typeof functionMap.postExecute === 'function') {
        this.postExecute = functionMap.postExecute.bind(this);
      }

      if (typeof functionMap.preComplete === 'function') {
        this.preComplete = functionMap.preComplete.bind(this);
      }

      if (typeof functionMap.complete === 'function') {
        this.complete = functionMap.complete.bind(this);
      }

      if (typeof functionMap.postComplete === 'function') {
        this.postComplete = functionMap.postComplete.bind(this);
      }
    }
  }
}

export default AbstractTask;