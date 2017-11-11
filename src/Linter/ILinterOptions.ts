import TPassageIgnores from '../TypeAliases/TPassageIgnores';
import {
  DetectionModes,
  Formats,
} from '../constants';
export interface ILinterOptions {
  detectionMode:       DetectionModes;
  documentConstructor: Function;
  format:              Formats;
  passageIgnores:      TPassageIgnores;
  runInIsolation:      boolean;
  version:             string;
}

export default ILinterOptions;