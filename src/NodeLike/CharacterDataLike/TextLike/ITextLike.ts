import {
  ICharacterDataLike,
} from '../ICharacterDataLike';

export interface ITextLike extends ICharacterDataLike {
  splitText(offset: number):  ITextLike;
  cloneNode(deep?:  boolean): ITextLike;
}

export default ITextLike;