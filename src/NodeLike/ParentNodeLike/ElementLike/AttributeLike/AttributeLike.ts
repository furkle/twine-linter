import {
  IAttributeLike,
} from './IAttributeLike';

export class AttributeLike implements IAttributeLike {
    readonly name:      string;
    readonly localName: string;
    readonly value:     string;
    readonly prefix:    null = null;
    constructor(name: string, value?: string) {
        this.name = name;
        this.localName = name;
        this.value = value || '';
    }

    specified(): true { return true; }
}

export default AttributeLike;