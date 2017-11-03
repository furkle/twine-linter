import TIndexableObject from '../TypeAliases/TIndexableObject';
interface ITask extends TIndexableObject {
  accumulator:           TIndexableObject | Array<any>;
  readonly preSetup:     Function;
  readonly setup:        Function;
  readonly postSetup:    Function;
  readonly preExecute:   Function;
  readonly execute:      Function;
  readonly postExecute:  Function;
  readonly preComplete:  Function;
  readonly complete:     Function;
  readonly postComplete: Function;
}

export default ITask;