import * as mm from './matchmaker';
import * as tt from './types';

export type SequenceReducer = (_: tt.Triple<tt.OneMatcherValue>) => tt.OneMatcherValue
export type StringReducer = (_: Array<string>) => tt.OneMatcherNode

export const fFirstTwo = (tpe: tt.OneMatcherType): SequenceReducer => {
  return fSliceTriple(tpe, 0, 2);
}
export const fLastTwo = (tpe: tt.OneMatcherType): SequenceReducer => {
  return fSliceTriple(tpe, 1, 3);
}

export const fAll = (tpe: tt.OneMatcherType): SequenceReducer => {
  return fSliceTriple(tpe, 0, 3);
}

export function fSliceTriple(tpe: tt.OneMatcherType, s: number, e: number): SequenceReducer {
  return function fReduceMove(_: tt.Triple<tt.OneMatcherValue>): tt.OneMatcherValue {
    return mm.oneMatcherNode(tpe)(_.slice(s,e) as tt.Triple<tt.OneMatcherNode>);
  }
}

export const fOneAndThree = fReduceOneAndThree;

export function fReduceOneAndThree(tpe: tt.OneMatcherType): SequenceReducer {
  return function (_: tt.Triple<tt.OneMatcherValue>): tt.OneMatcherValue {
    let [line, __, fen] = _ as tt.Triple<tt.OneMatcherNode>;

    return mm.oneMatcherNode(tpe)([line, fen]);
  }
}

export function fSecond(tpe: tt.OneMatcherType): SequenceReducer {
  return function (_: tt.Triple<tt.OneMatcherValue>): tt.OneMatcherValue {
    let [__, second, ___] = _ as tt.Triple<tt.OneMatcherNode>;

    return mm.oneMatcherNode(tpe)(second);
  }
}

