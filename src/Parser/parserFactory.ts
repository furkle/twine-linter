import {
  IParser,
 } from './IParser';
/*const GatelyParser = require('../PEG/GatelyParser');
const HarloweParser = require('../PEG/HarloweParser');*/
import {
  parse as htmlParse,
} from '../PEG/HtmlParser';
import {
  parse as sugarParse,
} from '../PEG/SugarParser';

export function parserFactory(format: string): IParser {
  /*if (/gately/i.test(format)) {
    return GatelyParser;
  } else if (/harlowe/i.test(format)) {
    return HarloweParser;*/
  if (/sugar(cane|cube)?/i.test(format)) {
    /* @ts-ignore */
    return { parse: sugarParse, };
  } /*else if (/gately/i.test(format)) {
    return GatelyParser;
  } else if (/harlowe/i.test(format)) {

  }*/ else if (/html/i.test(format)) {
    /* @ts-ignore */
    return { parse: htmlParse, };
  } else {
    throw new Error('Parse type not implemented.');
  }
}

export default parserFactory;