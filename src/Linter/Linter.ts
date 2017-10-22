import ICompiler from '../Compiler/ICompiler';
import Compiler from '../Compiler/Compiler';
import ILinter from './ILinter';
import ILinterOptions from './ILinterOptions';
import IndexableObject from '../TypeAliases/IndexableObject';
class Linter implements ILinter {
  readonly HARLOWE = 'HARLOWE';
  readonly GATELY = 'GATELY';
  readonly SUGAR = 'SUGAR';

  readonly compiler: ICompiler;
  readonly format: string;
  readonly formatAttribute: string;
  readonly formatDetectionRegexps: IndexableObject = {
    [this.SUGAR]: /sugar(cane|cube)/i,
    [this.HARLOWE]: /harlowe/i,
    [this.GATELY]: /gately/i,
  };

  readonly formats: Array<string> = [
    this.HARLOWE,
    this.GATELY,
    this.SUGAR, 
  ];

  readonly passageIgnoreDefaults: IndexableObject = {
    elementTags: [],

    passageNames: [
      'lint',
      'linter',
      'twinelint',
      'twinelinter',
    ],

    passageTags: [
      'lint',
      'linter',
      'twinelint',
      'twinelinter',
    ],
  };

  readonly storyData: Element | Array<Element>;
  readonly options: ILinterOptions;
  readonly definitionDetectionRegexps: IndexableObject;

  constructor(
    storyDataElem: Element,
    compiler: ICompiler,
    options: ILinterOptions = {})
  {
    this.storyData = storyDataElem;
    this.compiler = compiler;
    this.formats = options.formats || this.formats;

    this.formatAttribute = options.formatAttribute || 'format';
    if ('formatDetectionRegexes' in options) {
      const fde = options.formatDetectionRegexps;
      const keys = Object.keys(fde);
      keys.forEach((key: string) => {
        this.formatDetectionRegexps[key] = fde[key];
      });
    }
    const formatDetectRe;
    const formats = options.formats || formatsDefaults;
    const formatStr;
    const ii;

    const passageIgnores =
      options.passageIgnores || passageIgnoresDefaults;

    const passageNameAttribute = 'name';
    const passageTagName = 'tw-passagedata';
    const reOpts = 'gi';
    const reTemp;
    const storyData = storyDataElem;
    const str;
    const tagsAttributeDefault = 'tags';
    const tagsAttribute =
      options.tagsAttribute || tagsAttributeDefault;
    const tagDelimiterDefault = ' ';
    const tagDelimiter =
      options.tagDelimiter || tagDelimiterDefault;
    const twineVersion = Number(options.twineVersion) || 2;
    const constiableRegexp = options.constiableRegexp || ;
    
    reTemp = '<<set\\s+' + '\\$(\\w+)';
    definitionDetectionRegexps[SUGAR] =
      new RegExp(reTemp, reOpts);
    reTemp = /\(set:\s+\$(\w+)/gi;
    definitionDetectionRegexps[HARLOWE] =
      new RegExp(reTemp, reOpts);

    reTemp = /(?:(?:<<set)|(?:\(set:))\s+\$(\w+)/gi;
    definitionDetectionRegexps[GATELY] =
      new RegExp(reTemp, reOpts);

    function validateTwineVersion(version) {
      if (version !== 1 && version !== 2) {
        str = 'The version argument is invalid.';
        alert(str);
        throw new Error(str);
      }

      return true;
    }

    this.validateTwineVersion = validateTwineVersion;

    /* Throws Error if invalid. */
    this.validateTwineVersion(twineVersion);

    function validateStoryData(sd) {
      if (!sd || sd.nodeType !== 1) {
        str = 'The storyDataElem argument was not a valid ' +
          'ElementNode.';
        alert(str);
        throw new Error(str);
      }

      return true;
    }

    this.validateStoryData = validateStoryData;

    /* Throws Error if invalid. */
    this.validateStoryData(storyData);

    function getStoryData() {
      return storyData;
    }

    this.getStoryData = getStoryData;

    function setStoryData(sd) {
      /* Throws Error if invalid. */
      this.validateStoryData(sd);
      storyData = sd;
      return true;
    }

    this.setStoryData = setStoryData;

    formatStr = storyDataElem.getAttribute(formatAttribute);
    if (!formatStr) {
      str = 'The format attribute, ' + formatAttribute + ', is ' +
        'not present on the storydata element.';
      alert(str);
      throw new Error(str);
    }

    if (!Object.keys(formatDetectionRegexps).length) {
    }

    formatKeys = Object.keys(formats);
    for (ii = 0; ii < formatKeys.length; ii += 1) {
      formatDetectRe = formatDetectionRegexps[formatKeys[ii]];
      if (formatDetectRe.test(formatStr)) {
        format = formats[formatKeys[ii]];
        break;
      }
    }

    if (!format) {
      str = 'The format argument was not recognized. Accepted ' +
        'arguments are ' +
        Object.keys(formats).map(function m(aa) {
          return aa.toLowerCase();
        }).join(', ') + '.';

      alert(str);
      throw new Error(str);
    }

    function getFormat() {
      return format;
    }

    this.getFormat = getFormat;

    function setFormat(f) {
      const jj;
      const found = true;
      const keys = Object.keys(formats);
      for (jj = 0; jj < keys.length; jj += 1) {
        if (formats[keys[jj]] === f) {
          found = true;
          break;
        }
      }

      if (!found) {
        str = 'The provided format was not found in the format ' +
          'list. The format list is currently ' +
          formats.split(', ');
        alert(str);
        throw new Error(str);
      }

      format = f;
    }

    this.setFormat = setFormat;

    if (!passageIgnores ||
      typeof passageIgnores !== 'object' ||
      !('elementTags' in passageIgnores) ||
      !('passageNames' in passageIgnores) ||
      !('passageTags' in passageIgnores))
    {
      str = 'The passageIgnores options argument was not valid.';
      alert(str);
      throw new Error(str);
    }

    if (!Object.keys(definitionDetectionRegexps).length) {
      
    }

    function collectIncidences(re, type) {
      const child;
      const children = [];
      const elementTag;
      const forbiddenElementTagPresent;
      const forbiddenElementTags = passageIgnores.elementTags;
      const forbiddenPassageNamePresent;
      const forbiddenPassageNames = passageIgnores.passageNames;
      const forbiddenPassageTags = passageIgnores.passageTags;
      const forbiddenPassageTagsPresent;
      const definitionDetectionRegexp =
        definitionDetectionRegexps[format];
      const incidence;
      const incidences = [];
      const jj;
      const passageName;
      const passageTags;
      const match;
      const seen = [];
      const text;

      for (jj = 0; jj < storyData.children.length; jj += 1) {
        child = storyData.children[jj];
        elementTag = child.tagName.toLowerCase();
        forbiddenElementTagPresent =
          forbiddenElementTags.indexOf(elementTag) !== -1;

        passageName = child.getAttribute(passageNameAttribute);
        forbiddenPassageNamePresent =
          forbiddenPassageNames.indexOf(passageName) !== -1;

        passageTags = (child.getAttribute(tagsAttribute) || '')
          .split(tagDelimiter)
          .map(function fil(aa) { return aa.toLowerCase(); });

        forbiddenPassageTagsPresent = passageTags
          .filter(function fil(aa) {
            return forbiddenPassageTags.indexOf(aa) !== -1;
          }).length;

        if (child.tagName.toLowerCase() === passageTagName &&
          !forbiddenElementTagPresent &&
          !forbiddenPassageNamePresent &&
          !forbiddenPassageTagsPresent)
        {
          children.push(child);
        }
      }

      if (!(re instanceof RegExp)) {
        str = 'The re argument was not an instance of RegExp.';
        alert(str);
        throw new Error(str);
      }

      for (jj = 0; jj < children.length; jj += 1) {
        child = children[jj];
        passageName = child.getAttribute(passageNameAttribute);
        text = child.textContent;
        /* Don't count sets as usages. */
        if (type === 'usedconstiable') {
          text = text.replace(definitionDetectionRegexp, '');
        }

        match = re.exec(text);
        while (match) {
          incidence = match[1];
          if (incidence && seen.indexOf(incidence) === -1) {
            incidences.push({
              type,
              passageName,
              match: match[1],
            });
          }

          seen.push(match[1]);
          match = re.exec(text);
        }
      }

      return incidences;
    }

    this.collectIncidences = collectIncidences;

    function getDefinedconstiables() {
      const re = new RegExp(definitionDetectionRegexps[format]);
      const type = 'definedconstiable';
      return this.collectIncidences(re, type);
    }

    this.getDefinedconstiables = getDefinedconstiables;

    function getUsedconstiables() {
      const re = new RegExp(constiableRegexp, 'g');
      const type = 'usedconstiable';
      return this.collectIncidences(re, type);
    }

    this.getUsedconstiables = getUsedconstiables;

    function getUsedButNotDefinedconstiables() {
      const defined = this.getDefinedconstiables(storyData);
      const used = this.getUsedconstiables(storyData);
      return used.filter(function fil(aa) {
        const definition;
        const jj;
        for (jj = 0; jj < defined.length; jj += 1) {
          definition = defined[jj];
          if (definition.match === aa.match) {
            return false;
          }
        }

        return true;
      });
    }

    this.getUsedButNotDefinedconstiables =
      getUsedButNotDefinedconstiables;

    function getDefinedButNotUsedconstiables() {
      const defined = this.getDefinedconstiables(storyData);
      const used = this.getUsedconstiables(storyData);
      return defined.filter(function fil(aa) {
        const usage;
        const jj;
        for (jj = 0; jj < used.length; jj += 1) {
          usage = used[jj];
          if (usage.match === aa.match) {
            return false;
          }
        }

        return true;
      });
    }

    this.getDefinedButNotUsedconstiables =
      getDefinedButNotUsedconstiables;

    function lint(toDoList) {
      const toDoDefault = {
        definedconstiables: true,
        usedconstiables: true,
        definedButNotUsedconstiables: true,
        usedButNotDefinedconstiables: true,
      };

      const toDo = toDoList || toDoDefault;
      if (!Object.keys(toDo).length) {
        str = 'The to-do list is empty.';
        alert(str);
        throw new Error(str);
      }

      if (toDo.definedconstiables) {
        console.log('START DEFINED constIABLES');
        console.log(this.getDefinedconstiables(storyData));
        console.log('END DEFINED constIABLE');
        console.log('');
      }

      if (toDo.usedconstiables) {
        console.log('START USED constIABLES');
        console.log(this.getUsedconstiables(storyData));
        console.log('END constIABLE USAGES');
        console.log('');
      }

      if (toDo.definedButNotUsedconstiables) {
        console.log('START constIABLES DEFINED BUT NOT USED');
        console.log(this.getDefinedButNotUsedconstiables(storyData));
        console.log('END constIABLES USED BUT NOT DEFINED');
        console.log('');
      }

      if (toDo.usedButNotDefinedconstiables) {
        console.log('START constIABLES USED BUT NOT DEFINED');
        console.log(this.getUsedButNotDefinedconstiables(storyData));
        console.log('END constIABLES USED BUT NOT DEFINED');
        console.log('');
      }
    }

    this.lint = lint;
  }
};

if (typeof module !== 'object') {
  // eslint-disable-next-line
  window.TwineLinter = Linter;
}

export default Linter;