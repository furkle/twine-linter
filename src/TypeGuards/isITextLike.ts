import {
  ITextLike,
} from '../NodeLike/CharacterDataLike/TextLike/ITextLike';

export function isITextLike(node: any): node is ITextLike {
  return node && node.nodeType === 3;
}

export default isITextLike;