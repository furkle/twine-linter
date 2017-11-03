import IDocumentLike                 from '../ParentNodeLike/DocumentLike/IDocumentLike';
import IElementLike                  from '../ParentNodeLike/ElementLike/IElementLike';
import INonDocumentTypeChildNodeLike from '../INonDocumentTypeChildNodeLike';
interface ICharacterDataLike extends INonDocumentTypeChildNodeLike {
  data:                                       string;
  readonly length:                            number;
  readonly ownerDocument:                     IDocumentLike;
  readonly parentNode:                        IElementLike | null;
  readonly parentElement:                     IElementLike | null;
  readonly childNodes:                        Array<INonDocumentTypeChildNodeLike>;
  appendData(data: string):                   string;
  deleteData(offset: number, length: number): string;
  insertData(offset: number, data: string):   string;
  replaceData(
    offset: number,
    length: number,
    data: string):                            string;
  substringData(
    offset: number,
    length: number):                          string;
  cloneNode(deep: boolean):                   ICharacterDataLike;
}

export default ICharacterDataLike;