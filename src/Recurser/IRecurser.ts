import INodeLike        from '../NodeLike/INodeLike';
import TIndexableObject from '../TypeAliases/TIndexableObject';
interface IRecurser {
  leftTopRecurse(
    node: INodeLike,
    format: string,
    version: string,
    callback: Function,
    options: TIndexableObject):             any;

    leftBottomRecurse(
    node: INodeLike,
    format: string,
    version: string,
    callback: Function,
    options: TIndexableObject):             any;

    rightTopRecurse(
    node: INodeLike,
    format: string,
    version: string,
    callback: Function,
    options: TIndexableObject):             any;

    rightBottomRecurse(
    node: INodeLike,
    format: string,
    version: string,
    callback: Function,
    options: TIndexableObject):             any;
}

export default IRecurser;