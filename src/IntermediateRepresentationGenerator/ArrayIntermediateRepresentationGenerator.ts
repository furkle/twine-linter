import {
  IElementLike,
} from '../NodeLike/ParentNodeLike/ElementLike/IElementLike';
import {
  IIntermediateRepresentationGenerator,
} from './IIntermediateRepresentationGenerator';
import {
  IIntermediateRepresentationGeneratorOptions,
} from './IIntermediateRepresentationGeneratorOptions';
import {
  IPassage,
} from '../Passage/IPassage';
export class ArrayIntermediateRepresentationGenerator implements IIntermediateRepresentationGenerator {
  generate(
    value: IElementLike,
    options: IIntermediateRepresentationGeneratorOptions): Array<IPassage>
  {
    let opts = options;
    if (!isIElementLike(storyData)) {
      throw new Error('The storyDataElem argument was not an element.');
    } else if (typeof opts === 'undefined') {
      opts = this.options;
      if (!opts || typeof opts !== 'object') {
        throw new Error('The options argument was not provided, and the ' +
                        'options property on this Linter was not an object.');
      }
    }

    const passages: Array<TPassage> = [];
    const childNodes = storyData.childNodes;
    for (let ii = 0; ii < childNodes.length; ii += 1) {
      const childNode = childNodes[ii];
      const values = Object.values(NodeTypes);
      if (values.indexOf(childNode.nodeType.toString()) !== -1) {
        continue;
      }

      if (isIElementLike(childNode)) {
      const tagName = childNode.tagName.toLowerCase();
      let passageName;
      const version = opts.version;
      let requirement = '^1';
      if (semver.satisfies(version, requirement)) {
        passageName = childNode.getAttribute('tiddler');
      }

      requirement = '^2';
      if (semver.satisfies(require, '2')) {
        passageName = childNode.getAttribute('name');
      }

      if (!passageName) {
        throw new Error('A passage name could not be found in one of the ' +
                        'passage elements.');
      }

      /* Don't lint any passages that match on element tag or passage name. */
      if (this.options.passageIgnores.elementTags.indexOf(tagName) !== -1 ||
          this.options.passageIgnores.passageNames.indexOf(passageName) !== -1)
      {
        continue;
      }

      /* Don't lint any passages that match on a passage tag. */
      const tags = (child.getAttribute('tags') || '')
        .split(' ')
        .filter(aa => aa);

      let found = false;
      for (let ii = 0; ii < tags.length; ii += 1) {
        const tag = tags[ii];
        if (this.options.passageIgnores.passageTags.indexOf(tag) !== -1) {
          found = true;
          break;
        }
      }

      /* Skip the passage if a tag matched an ignore rule. */
      if (found) {
        continue;
      }

      const abstractSyntaxTree = this.parser.parse(child.textContent);
      if (!abstractSyntaxTree || !abstractSyntaxTree.length) {
        throw new Error('There is no output.');
      }

      passages.push({
        abstractSyntaxTree,
        passageName,
        tags,
      });
    }
    
    return passages;
  }
}

export default ArrayIntermediateRepresentationGenerator;