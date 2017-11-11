import documentFactory   from './modules/documentFactory';
import DisplayUsageTask  from './Task/DisplayUsageTask';
import DocumentLike      from './NodeLike/ParentNodeLike/DocumentLike/DocumentLike';
import nodeFactory       from './modules/nodeFactory';
import Linter            from './Linter/Linter';
import linterFactory     from './Linter/linterFactory';
import parserFactory     from './Parser/parserFactory';
import VariableUsageTask from './Task/VariableUsageTask';
import {
  parse as sugarParse,
} from './PEG/SugarParser';
const nwmatcher = require('nwmatcher');

export default {
  documentFactory,
  DocumentLike,
  Linter,
  linterFactory,
  nodeFactory,
  nwmatcher,
  parserFactory,

  parsers: {
    SugarParser: { parse: sugarParse },
  },

  tasks: {
    DisplayUsageTask,
    VariableUsageTask,
  },
};