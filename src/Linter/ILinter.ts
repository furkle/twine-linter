import ICompiler from '../Compiler/ICompiler';
interface ILinter {
    readonly compiler: ICompiler;
    readonly definitionDetectionRegexps: object;
    readonly format: string;
    readonly formatAttribute: string;
    readonly formatDetectionRegexps: {
        [key: string]: RegExp,
    };

    readonly formats: object;
    readonly passageIgnoreDefaults: {
        elementTags: Array<string>,
        passageNames: Array<string>,
        passageTags: Array<string>,
    };

    readonly storyData: Element | Array<Element>;
}

export default ILinter;