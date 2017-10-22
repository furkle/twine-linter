interface IOptions {
    readonly definitionDetectionRegexps?: object;
    readonly format?: string;
    readonly formatAttribute?: string;
    readonly formatDetectionRegexps?: {
        [key: string]: RegExp,
    };
    readonly formats?: Array<string>;
    readonly passageIgnoreDefaults?: {
        [key: string]: Array<string>,
    };
}

export default IOptions;