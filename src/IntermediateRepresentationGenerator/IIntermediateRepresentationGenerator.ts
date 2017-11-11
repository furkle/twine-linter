import {
  IIntermediateRepresentationGeneratorOptions,
} from './IIntermediateRepresentationGeneratorOptions';

export interface IIntermediateRepresentationGenerator {
  generate(
    value:   any,
    options: IIntermediateRepresentationGeneratorOptions): any;
}

export default IIntermediateRepresentationGenerator;