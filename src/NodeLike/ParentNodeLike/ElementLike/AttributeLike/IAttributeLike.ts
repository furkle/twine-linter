interface IAttributeLike {
    readonly name:      string;
    readonly localName: string;
    readonly value:     string;
    readonly prefix:    null;
    specified():        true;
}

export default IAttributeLike;