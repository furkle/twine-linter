import AbstractCharacterDataLike     from '../AbstractCharacterDataLike';
import ICommentLike                  from './ICommentLike';
import TConstructor                  from '../../../TypeAliases/TConstructor';
abstract class AbstractCommentLike extends AbstractCharacterDataLike implements ICommentLike {
  abstract readonly nodeType: 8;
  abstract readonly nodeName: '#comment';

  /* Comment nodes have no children, so this is a no-op. */
  normalize(): void {
    return;
  }

  cloneNode(deep: boolean = false): ICommentLike {
    /* Get rid of VS not-used error. */deep;
    const ctor = <TConstructor<ICommentLike>>this.constructor;
    const comment = new ctor(this.__data);
    return comment;
  }
}

export default AbstractCommentLike;