import documentFactory   from './modules/documentFactory';
import DisplayUsageTask  from './Task/DisplayUsageTask';
import DocumentLike      from './NodeLike/ParentNodeLike/DocumentLike/DocumentLike';
import Linter            from './Linter/Linter';
import linterFactory     from './Linter/linterFactory';
import parserFactory     from './Parser/parserFactory';
import VariableUsageTask from './Task/VariableUsageTask';

console.log(new DocumentLike());

export default {
  documentFactory,
  DocumentLike,
  Linter,
  linterFactory,
  parserFactory,

  tasks: {
    DisplayUsageTask,
    VariableUsageTask,
  },
};