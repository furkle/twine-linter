import IElementLike     from '../NodeLike/ParentNodeLike/ElementLike/IElementLike';
import TPassageIgnores  from '../TypeAliases/TPassageIgnores';
import {
  DetectionModes,
  Formats,
} from '../constants';
export interface ILinterOptionsArgument {
  detectionMode?:       DetectionModes;
  documentConstructor?: Function;
  format?:              Formats;
  passageIgnores?:      TPassageIgnores;
  storyData?:           IElementLike;
  runInIsolation?:      boolean;
  version?:             string;
}

export default ILinterOptionsArgument;