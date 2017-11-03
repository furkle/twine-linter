import TDetectionMode  from '../TypeAliases/TDetectionMode';
import TPassageIgnores from '../TypeAliases/TPassageIgnores';
interface ILinterOptions {
  format?:         string;
  version?:        string;
  passageIgnores?: TPassageIgnores;
  detectionMode?:  TDetectionMode;
}

export default ILinterOptions;