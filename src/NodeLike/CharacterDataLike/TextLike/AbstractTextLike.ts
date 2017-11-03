import AbstractCharacterDataLike     from '../AbstractCharacterDataLike';
import ITextLike                     from './ITextLike';
abstract class AbstractTextLike extends AbstractCharacterDataLike implements ITextLike {
  readonly nodeType:           number = 3;
  readonly nodeName:           string = '#text';

  cloneNode(deep: boolean = false): ITextLike {
    /* Get rid of VS not-used error. */deep;
    return this.ownerDocument.createTextNode(this.textContent);
  }

  splitText(offset: number): ITextLike {
    const data = this.__data;
    const before = data.slice(0, offset);
    const after = data.slice(offset);
    this.__data = before;
    const afterNode = this.ownerDocument.createTextNode(after);
    this.after(afterNode);
    return afterNode;
  }
}

export default AbstractTextLike;