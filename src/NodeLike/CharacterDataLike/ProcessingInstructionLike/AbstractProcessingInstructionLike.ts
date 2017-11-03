import AbstractCharacterDataLike  from '../AbstractCharacterDataLike';
import IDocumentLike              from '../../ParentNodeLike/DocumentLike/IDocumentLike';
import IProcessingInstructionLike from './IProcessingInstructionLike';
abstract class AbstractProcessingInstructionLike extends AbstractCharacterDataLike implements IProcessingInstructionLike {
  abstract readonly nodeType: 7;
  abstract target:            string;  
  protected __target:         string = '';

  constructor(target: string, data: string, document: IDocumentLike) {
    super(data, document);
    this.__target = target;
  }

  cloneNode(deep: boolean = false): IProcessingInstructionLike {
    /* Get rid of VS not-used error. */deep;
    return this.ownerDocument.createProcessingInstruction(
      this.target,
      this.data);
  }
}

export default AbstractProcessingInstructionLike;