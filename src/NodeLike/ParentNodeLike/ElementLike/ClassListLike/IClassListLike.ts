export interface IClassListLike {
    readonly length:                             number;
    readonly value:                              string;
    add(...classes: Array<string>):              void;
    remove(...classes: Array<string>):           void;
    item(index: number):                         string;
    toggle(...classes: Array<string>):           void;
    replace(oldClass: string, newClass: string): void;
    contains(cls: string):                       void;
    __pushToParent():                            void;
    __pullFromParent():                          void;
}

export default IClassListLike;