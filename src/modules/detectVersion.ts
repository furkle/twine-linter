import constants        from '../constants';
import IElementLike     from '../NodeLike/ParentNodeLike/ElementLike/IElementLike';
import TDetectionMode   from '../TypeAliases/TDetectionMode';
import TIndexableObject from '../TypeAliases/TIndexableObject';
const semver = require('semver');
function detectVersion(
  value:         IElementLike | string,
  detectionMode: TDetectionMode   = 'auto',
  versionMap:    TIndexableObject = constants.versions): string
{
  let versionStr: IElementLike | string | null = value;
  if (typeof value !== 'string') {
    /* Currently only present on ^2. */
    versionStr = value.getAttribute('creator-version');
    if (!versionStr) {
      if (detectionMode === 'manual') {
        throw new Error('Detection mode was manual, ' +
                        'but there was no version attribute.');
      }
    
      /* Only present on ^1. */
      if (value.getAttribute('id') === 'storeArea') {
        versionStr = '1.0.0';
      }

      /* No reliable information on storyData element. Check contents
       * instead. */
      if (!versionStr) {
        for (let ii = 0; ii < value.children.length; ii += 1) {
          const child = value.children[ii];
          if (child.getAttribute('tiddler')) {
            versionStr = '1.0.0';
            break;
          } else if (child.tagName.toLowerCase() === 'tw-passagedata') {
            versionStr = '2.0.0';
            break;
          }
        }

        if (!versionStr) {
          throw new Error('Version could not be detected in ' +
                          'element value.');
        }
      }
    }
  } else if (!versionStr) {
    throw new Error('The value argument was a string, but the string ' +
                    'was empty.');
  }

  const cleanVersion = semver.clean(versionStr);
  if (!semver.valid(cleanVersion)) {
    throw new Error('The version string was not a valid semantic ' +
                    'version.');
  }

  const keys = Object.keys(versionMap);
  let valid = false;
  for (let ii = 0; ii < keys.length; ii += 1) {
    const key = keys[ii];
    if (semver.satisfies(cleanVersion, key)) {
      valid = true;
      versionStr = versionMap[key];
      break;
    }
  }

  if (!valid) {
    throw new Error('The version was found, but it did not fulfill a ' +
                    'recognized version.');
  }

  return (<string>versionStr).toUpperCase();
}

export default detectVersion;