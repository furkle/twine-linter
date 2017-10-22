import IParser from './IParser';
/*import GatelyParser from '../PEG/GatelyParser';
import HarloweParser from '../PEG/HarloweParser';*/
const SugarParser = require('../PEG/SugarParser');
function parserBuilder(
    format:
        'gately' |
        'GATELY' |
        'harlowe' |
        'HARLOWE' |
        'sugar' |
        'SUGAR'): IParser
{
    /*if (/gately/i.test(format)) {
        return GatelyParser;
    } else if (/harlowe/i.test(format)) {
        return HarloweParser;*/
    if (/sugar/i.test(format)) {
        return SugarParser;
    }

    throw new Error('Format type not implemented.');
}

export default parserBuilder;