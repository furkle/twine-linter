interface IParser {
    parse(source: string): Array<object | string>;
}

export default IParser;