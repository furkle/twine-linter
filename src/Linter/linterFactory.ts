import Compiler from '../Compiler/Compiler';
import ILinter from './ILinter';
import Linter from './Linter';
import ILinterOptions from './ILinterOptions';
function linterFactory(
    storyData: Element,
    options: ILinterOptions): ILinter
{
    const compiler = new Compiler();
    return new Linter(storyData, compiler, options);
}

if (typeof module !== 'object') {
    window.twineLinterFactory = linterFactory;
}

export default linterFactory;