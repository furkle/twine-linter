import {
  TIndexableObject,
} from '../TypeAliases/TIndexableObject';

export interface ITask {
  accumulator:                TIndexableObject | Array<any>;
  readonly preSetup:          Function;
  readonly setup:             Function;
  readonly postSetup:         Function;
  readonly preExecute:        Function;
  readonly execute?:          Function;
  readonly executeMicrotask?: Function;
  readonly postExecute:       Function;
  readonly preComplete:       Function;
  readonly complete:          Function;
  readonly postComplete:      Function;
}

export default ITask;