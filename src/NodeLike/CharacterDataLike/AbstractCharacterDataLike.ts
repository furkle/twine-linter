import AbstractNodeLike              from '../AbstractNodeLike';
import ICharacterDataLike            from './ICharacterDataLike';
import IDocumentLike                 from '../ParentNodeLike/DocumentLike/IDocumentLike';
import IElementLike                  from '../ParentNodeLike/ElementLike/IElementLike';
import INonDocumentTypeChildNodeLike from '../INonDocumentTypeChildNodeLike';
import MChildNodeLike                from '../MChildNodeLike';
import TConstructor                  from '../../TypeAliases/TConstructor';
abstract class AbstractCharacterDataLike extends MChildNodeLike(<TConstructor<AbstractNodeLike>>AbstractNodeLike) implements ICharacterDataLike {
  abstract data:                            string;
  abstract textContent:                     string;
  abstract readonly length:                 number;
  protected __ownerDocument:                IDocumentLike;
  abstract readonly ownerDocument:          IDocumentLike;
  abstract readonly parentNode:             IElementLike | null;
  abstract readonly parentElement:          IElementLike | null;
  abstract readonly previousSibling:        INonDocumentTypeChildNodeLike | null;
  abstract readonly nextSibling:            INonDocumentTypeChildNodeLike | null;
  abstract readonly previousElementSibling: IElementLike | null;
  abstract readonly nextElementSibling:     IElementLike | null;
  
  abstract readonly childNodes:             Array<INonDocumentTypeChildNodeLike>;

  protected __data:                         string = '';
  protected __parentNode:                   IElementLike | null = null;
  protected __previousSibling:              INonDocumentTypeChildNodeLike | null = null;
  protected __nextSibling:                  INonDocumentTypeChildNodeLike | null = null;
  
  abstract cloneNode(deep: boolean):        ICharacterDataLike;

  constructor(data: string, document: IDocumentLike) {
    super();

    this.__data = data;
    this.__ownerDocument = document;
  }
  
  appendData(data: string): string {
    this.data += data;
    return this.data;
  }

  deleteData(offset: number, length: number): string {
    if (offset < 0 || offset % 1 !== 0) {
      throw new Error('The offset argument was invalid.');
    }

    if (length < 0 || length % 1 !== 0) {
      throw new Error('The length argument was invalid.');
    } else if (length === 0) {
      return this.data;
    }

    const before = this.data.slice(0, offset);
    const after = this.data.slice(offset + length, this.length);
    this.data = before + after;
    return this.data;
  }

  insertData(offset: number, data: string): string {
      if (offset < 0 || offset % 1 !== 0) {
        throw new Error('The offset argument was invalid.');
      }

      if (data.length === 0) {
        return this.data;
      }

      const before = this.data.slice(0, offset);
      const after = this.data.slice(offset, this.length);
      this.data = before + data + after;
      return this.data;
  }
  
  replaceData(offset: number, length: number, data: string): string {
      if (offset < 0 || offset % 1 !== 0) {
        throw new Error('The offset argument was invalid.');
      }
      
      if (length < 0 || length % 1 !== 0) {
        throw new Error('The length argument was invalid.');
      }

      if (data.length === 0) {
        return this.data;
      }

      const before = this.data.slice(0, offset);
      const after = this.data.slice(offset + length, this.length);
      this.data = before + data + after;
      return this.data;
  }

  substringData(offset: number, length: number) {
      if (offset < 0 || offset % 1 !== 0) {
        throw new Error('The offset argument was invalid.');
      }

      if (length < 0 || length % 1 !== 0) {
        throw new Error('The length argument was invalid.');
      }

      return this.data.slice(offset, length);
  }

  appendChild(node: INonDocumentTypeChildNodeLike): INonDocumentTypeChildNodeLike {
    /* Get rid of VS not-used error. */node;
    throw new Error('Text nodes do not support appending children.');
  }

  removeChild(node: INonDocumentTypeChildNodeLike): INonDocumentTypeChildNodeLike {
    /* Get rid of VS not-used error. */node;
    throw new Error('Text nodes do not support removing children.');
  }

  insertBefore(
    newNode: INonDocumentTypeChildNodeLike,
    referenceNode: INonDocumentTypeChildNodeLike): INonDocumentTypeChildNodeLike
  {
    /* Get rid of VS not-used error. */newNode;referenceNode;
    throw new Error('Character data nodes cannot have child nodes, and as ' +
                    'such insertions cannot be performed on them.');
  }

  replaceChild(
    oldNode: INonDocumentTypeChildNodeLike,
    newNode: INonDocumentTypeChildNodeLike): INonDocumentTypeChildNodeLike
  {
    /* Get rid of VS not-used error. */oldNode;newNode;
    throw new Error('Character data nodes cannot have child nodes, and as ' +
                    'such replacements cannot be performed on a child of ' +
                    'theirs.');
  }
  
  normalize(): void {
    return;
  }

  __setParentNode(parent: IElementLike): IElementLike {
    super.__setParentNode(parent);
    return parent;
  }

  __setPreviousSibling(previousSibling: INonDocumentTypeChildNodeLike): INonDocumentTypeChildNodeLike {
    super.__setPreviousSibling(previousSibling);
    return previousSibling;
  }
}

export default AbstractCharacterDataLike;