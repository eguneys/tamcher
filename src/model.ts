import * as tt from './types';

export type ModelRef = any

export type LeafRef<LeafType> = (_: string) => LeafType
export type BranchRef<BranchType> = (_: Array<ModelRef>) => BranchType

export type LeafMatcherMap<LeafMatcherType extends string, LeafType> = {
  [k in LeafMatcherType]: LeafRef<LeafType>
}

export type BranchMatcherMap<BranchMatcherType extends string, BranchType> = {
  [k in BranchMatcherType]: BranchRef<BranchType>
}

export function wrapLeaf<A>(prop: string): LeafRef<A> {
  return (_: string): A => {
    return {
      [prop]: _
    } as unknown as A;
  };
}

export function makeId<A>(_: string): A {
  return _ as unknown as A;
}

export function wrapSingleBranch<A>(_: Array<ModelRef>): A {
  return _[0];
}

export function wrapBranch<A>(prop: string): BranchRef<A> {
  return (_: Array<ModelRef>): A => {
    return {
      [prop]: _
    } as unknown as A;
  }
}

export function makeNarrower<A, B extends A>(property: string) {
  return (_: A): _ is B => {
    return (property in _)
  };
}
