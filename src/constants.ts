export enum DetectionModes {
  Auto             = 'auto',
  Manual           = 'manual',
};

export enum Formats {
  Gately           = 'gately',
  Harlowe          = 'harlowe',
  Sugarcane        = 'sugarcane',
  Sugarcube        = 'sugarcube',
  Unknown          = 'unknown',
};

export enum IgnoredElementTags {
  Script           = 'script',
  Style            = 'style',
};

export enum NodeTypes {
  Element          = 1,
  Text             = 3,
  Comment          = 8,
  Document         = 9,
  DocumentType     = 10,
  DocumentFragment = 11,
};

export enum IgnoredPassageNames {
  Lint             = 'lint',
  Linter           = 'linter',
  Twinelint        = 'twinelint',
  Twinelinter      = 'twinelinter',
  Wreath           = 'wreath',
};

export enum IgnoredPassageTags {
  Lint             = 'lint',
  Linter           = 'linter',
  Twinelint        = 'twinelint',
  Twinelinter      = 'twinelinter',
  Wreath           = 'wreath',
};

export const passageIgnores = {
  elementTags:  IgnoredElementTags,
  passageNames: IgnoredPassageNames,
  passageTags:  IgnoredPassageTags,
};

export enum Versions {
  '^1'             = '1.0.0',
  '^2'             = '2.0.0',
};

export default {
  DetectionModes,
  Formats,
  passageIgnores,
  Versions,
};