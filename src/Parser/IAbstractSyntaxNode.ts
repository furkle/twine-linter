import TAbstractSyntaxContent from '../TypeAliases/TAbstractSyntaxContent';
import TIndexableObject       from '../TypeAliases/TIndexableObject';
interface IAbstractSyntaxNode extends TIndexableObject {
  type:         string;
  subtype?:     string;
  children?:    Array<TAbstractSyntaxContent>;
  passageName?: string;
  value?:       string | number;
  tagName?:     string;
  attributes?:  TIndexableObject;
}

export default IAbstractSyntaxNode;