import IElementLike   from '../NodeLike/ParentNodeLike/ElementLike/IElementLike';
import TDetectionMode from '../TypeAliases/TDetectionMode';
function detectFormat(
  value:         IElementLike | string,
  detectionMode: TDetectionMode): string
{
  let formatStr = value;
  if (typeof value !== 'string') {
    /* Currently only present on 2^. */
    formatStr = value.getAttribute('format');
    if (!formatStr) {
      if (detectionMode === 'manual') {
        throw new Error('Detection mode was manual, ' +
                        'but there was no format attribute.');
      }
      
      /* Only present on 1^. */
      if (value.getAttribute('id') === 'storeArea') {
        formatStr = 'sugarcane';
      }

      /* No reliable information on storyData element. Check contents
       * instead. */
      if (!formatStr) {
        for (let ii = 0; ii < value.children.length; ii += 1) {
          const child = value.children[ii];
          if (child.getAttribute('tiddler')) {
            formatStr = 'sugarcane';
            break;
          }
        }

        if (!formatStr) {
          throw new Error('Format could not be detected in ' +
                          'element value.');
        }
      }
    }
  } else if (!formatStr) {
    throw new Error('The value argument was a string, but the string ' +
                    'was empty.');
  }

  return (<string>formatStr).toUpperCase();
}

export default detectFormat;