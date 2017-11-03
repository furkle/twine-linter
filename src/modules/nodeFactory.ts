import IDocumentLike             from '../NodeLike/ParentNodeLike/DocumentLike/IDocumentLike';
import INonDocumentTypeChildNode from '../NodeLike/INonDocumentTypeChildNodeLike';
import TAbstractSyntaxContent    from '../TypeAliases/TAbstractSyntaxContent';
import TextLike                  from '../NodeLike/CharacterDataLike/TextLike/TextLike';
function nodeFactory(value: TAbstractSyntaxContent, document: IDocumentLike): INonDocumentTypeChildNode {
  if (typeof value === 'string') {
    return new TextLike(value, document);
  } else if (value.type === 'string') {
    const element = document.createElement('tw-string');
    const key = 'data-subtype';
    const subtype = value.subtype ? value.subtype : 'UNKNOWN';
    element.setAttribute(key, subtype);
    element.textContent = <string>value.value;
    return element;
  } else if (value.type === 'number') {
    const element = document.createElement('tw-number');
    element.textContent = <string>value.value;
  } else if (value.type === 'invocation' ||
    value.type === 'element' ||
    value.type === 'link')
  {
    let tagName;
    if (value.type === 'invocation') {
      tagName = 'tw-invocation';
    } else if (value.type === 'link') {
      tagName = 'tw-link';
    } else {
      tagName = value.tagName ? value.tagName : 'tw-unknown-element';
    }

    const element = document.createElement(tagName);
    const key = 'data-subtype';
    const subtype = value.subtype ? value.subtype : 'UNKNOWN';
    element.setAttribute(key, subtype);

    if (value.children &&
      typeof value.children === 'object' &&
      value.children.length >= 1)
    {
      const childNodes = value.children.map((child: TAbstractSyntaxContent) => {
        return nodeFactory(child, document);
      });

      element.append(...childNodes);
    }

    return element;
  } else if (value.type === 'comment') {
    return document.createComment(<string>value.value);
  } else if (value.type === 'processingInstruction') {
    return document.createProcessingInstruction(value.target, value.data);
  }
    
  throw new Error('No condition was matched for constructing a node.');
}

export default nodeFactory;