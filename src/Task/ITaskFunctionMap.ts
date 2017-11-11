interface ITaskFunctionMap {
  preSetup?:         Function;
  setup?:            Function;
  postSetup?:        Function;
  preExecute?:       Function;
  execute?:          Function;
  executeMicrotask?: Function;
  postExecute?:      Function;
  preComplete?:      Function;
  complete?:         Function;
  postComplete?:     Function;
}

export default ITaskFunctionMap;