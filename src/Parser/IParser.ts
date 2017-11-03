import TAbstractSyntaxContent from '../TypeAliases/TAbstractSyntaxContent';
interface IParser {
  parse(source: string): Array<TAbstractSyntaxContent>;
}

export default IParser;