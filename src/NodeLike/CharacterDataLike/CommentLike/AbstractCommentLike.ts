import AbstractCharacterDataLike from '../AbstractCharacterDataLike';
import ICommentLike     from './ICommentLike';
import TConstructor     from '../../../TypeAliases/TConstructor';
abstract class AbstractCommentLike extends AbstractCharacterDataLike implements ICommentLike {
  readonly nodeType: number = 8;
  
  cloneNode(deep: boolean = false): ICommentLike {
    /* Get rid of VS not-used error. */deep;
    const ctor = <TConstructor<ICommentLike>>this.constructor;
    const comment = new ctor(this.__data);
    return comment;
  }
}

export default AbstractCommentLike;