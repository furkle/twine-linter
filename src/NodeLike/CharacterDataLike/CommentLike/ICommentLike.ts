import ICharacterDataLike from '../ICharacterDataLike';
interface ICommentLike extends ICharacterDataLike {
  cloneNode(deep?: boolean): ICommentLike;
}

export default ICommentLike;