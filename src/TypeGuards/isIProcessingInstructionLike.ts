import IProcessingInstructionLike from '../NodeLike/CharacterDataLike/ProcessingInstructionLike/IProcessingInstructionLike';
function isIProcessingInstructionLike(node: any): node is IProcessingInstructionLike {
  return node && node.nodeType === 7;
}

export default isIProcessingInstructionLike;