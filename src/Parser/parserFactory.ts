import IParser from './IParser';
/*const GatelyParser = require('../PEG/GatelyParser');
const HarloweParser = require('../PEG/HarloweParser');*/
const SugarParser = require('../PEG/SugarParser');
function parserBuilder(format: string): IParser {
  /*if (/gately/i.test(format)) {
    return GatelyParser;
  } else if (/harlowe/i.test(format)) {
    return HarloweParser;*/
  if (/sugar(cane|cube)/i.test(format)) {
    return SugarParser;
  } /*else if (/gately/i.test(format)) {
    return GatelyParser;
  } else if (/harlowe/i.test(format)) {

  }*/ else {
    throw new Error('Format type not implemented.');
  }
}

export default parserBuilder;