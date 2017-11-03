import detectFormat   from '../modules/detectFormat';
import detectVersion  from '../modules/detectVersion';
import IElementLike   from '../NodeLike/ParentNodeLike/ElementLike/IElementLike';
import ILinter        from './ILinter';
import ILinterOptions from './ILinterOptions';
import IParser        from '../Parser/IParser';
import Linter         from './Linter';
import parserFactory  from '../Parser/parserFactory';
function linterFactory(
  storyData:       IElementLike,
  options:         ILinterOptions = {},
  formatDetector:  Function       = detectFormat,
  versionDetector: Function       = detectVersion): ILinter
{
  let parser: IParser;
  let format = options.format;
  if (!format) {
    if (options.detectionMode === 'auto') {
      format = formatDetector(storyData);
    } else {
      throw new Error('No format was provided, but the detection mode ' +
                      'was manual.');
    }
  }

  if (!format) {
    throw new Error('No format could be detected.');
  }

  format = <string>format;
  
  let version = options.version;
  if (!version) {
    if (options.detectionMode === 'auto') {
      version = versionDetector(storyData);
    } else {
      throw new Error('No version was provided, but the detection mode ' +
                      'was manual.');
    }
  }

  if (!version) {
    throw new Error('No version could be detected.');
  }

  version = <string>version;
  parser = parserFactory(format);
  return new Linter(storyData, parser, format, version, options);
}

export default linterFactory;