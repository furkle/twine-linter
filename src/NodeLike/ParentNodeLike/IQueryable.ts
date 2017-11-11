import IElementLike from './ElementLike/IElementLike';
export interface IQueryable {
    querySelector(selector: string):    IElementLike;
    querySelectorAll(selector: string): Array<IElementLike>;
}

export default IQueryable;