import {
  TAbstractSyntaxContent,
} from '../TypeAliases/TAbstractSyntaxContent';

export type IPassage = {
  abstractSyntaxTree: Array<TAbstractSyntaxContent>;
  passageName:        string;
  tags:               Array<string>;
};

export default IPassage;