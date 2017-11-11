export interface IMatcher {
  [key: string]: any,
  first:         Function,
  match:         Function,
  select:        Function,
  byId:          Function,
  byTag:         Function,
  byClass:       Function,
  byName:        Function,
};

export default IMatcher;