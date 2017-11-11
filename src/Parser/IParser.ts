import {
  TAbstractSyntaxContent,
} from '../TypeAliases/TAbstractSyntaxContent';

export interface IParser {
  parse(source: string): Array<TAbstractSyntaxContent>;
}

export default IParser;