import AbstractTask     from './AbstractTask';
import INodeLike        from '../NodeLike/INodeLike';
import isIElementLike   from '../TypeGuards/isIElementLike';
import TIndexableObject from '../TypeAliases/TIndexableObject';
class DisplayUsageTask extends AbstractTask {
  executeMicrotask: Function = (
    node:        INodeLike,
    passageName: string,
    format:      string,
    version:     string,
    options:     Array<any>
  ): void => {
    /* Get rid of VS not-used errors. */format;version;options;
    if (isIElementLike(node)) {
      const tagName = node.tagName.toLowerCase();
      let accumulator = this.accumulator;
      const dataName = node.getAttribute('data-name');
      const lineNumber = node.getAttribute('data-line-number');
      const columnNumber = node.getAttribute('data-column-number');
      if (tagName === 'tw-macro' && dataName === 'display') {
        const elem = (node.firstElementChild || <TIndexableObject>{});
        const macroPassageName = elem.textContent || 'UNKNOWN';
        accumulator = <TIndexableObject>accumulator;
        if (passageName in this.accumulator) {
          if (macroPassageName in accumulator[passageName].displays) {
            accumulator[passageName].displays[macroPassageName].push({
              lineNumber,
              columnNumber,
            });
          } else {
            accumulator[passageName].displays[macroPassageName] = [
              {
                lineNumber,
                columnNumber,
              },
            ];
          }
        } else {
          accumulator[passageName] = {
            displays: {
              [macroPassageName]: {
                lineNumber,
                columnNumber,
              },
            },

            links: {},
          };
        }
      } else if (tagName === 'tw-link') {
        const macroPassageName = node.getAttribute('passage-name');
        accumulator = <TIndexableObject>accumulator;
        if (passageName in this.accumulator) {
          if (macroPassageName in accumulator[passageName].links) {
            accumulator[passageName].links[macroPassageName].push({
              lineNumber,
              columnNumber,
            });
          } else {
            accumulator[passageName].links[macroPassageName] = [
              {
                lineNumber,
                columnNumber,
              },
            ];
          }
        } else {
          accumulator[passageName] = {
            displays: {},
            links: {
              [macroPassageName]: {
                lineNumber,
                columnNumber,
              },
            },
          };
        }
      }
    }
  }
}

export default DisplayUsageTask;