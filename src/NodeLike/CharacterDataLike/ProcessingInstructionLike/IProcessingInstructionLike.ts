import ICharacterDataLike from '../ICharacterDataLike';
interface IProcessingInstructionLike extends ICharacterDataLike {
  target:                    string;
  cloneNode(deep?: boolean): IProcessingInstructionLike;
}

export default IProcessingInstructionLike;