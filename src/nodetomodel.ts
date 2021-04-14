import * as tt from './types';
import * as mt from './model';
import { Node, reducePlus } from './node';

export default class NodeToModel<LeafMatcherType extends string, BranchMatcherType extends string, LeafType, BranchType> {

  leafRefs: mt.LeafMatcherMap<LeafMatcherType, LeafType>
  branchRefs: mt.BranchMatcherMap<BranchMatcherType, BranchType>  
  
  constructor(leafRefs: mt.LeafMatcherMap<LeafMatcherType, LeafType>,
              branchRefs: mt.BranchMatcherMap<BranchMatcherType, BranchType>) {
    this.leafRefs = leafRefs;
    this.branchRefs = branchRefs;
  }

  mrLeaf(rmv: tt.OneMatcherNode, mv: string): tt.Maybe<mt.ModelRef> {
    return this.leafRefs[rmv.tpe as LeafMatcherType]?.(mv);
  }

  mrBranch(rmv: tt.OneMatcherNode, children: Array<mt.ModelRef>): tt.Maybe<mt.ModelRef> {
    return this.branchRefs[rmv.tpe as BranchMatcherType]?.(children);
  }

  reducer(rmv: tt.OneMatcherValue,
          mv: tt.OneMatcherValue,
          children: Array<mt.ModelRef>): tt.Maybe<mt.ModelRef> {

    let cFlat = children.filter(Boolean) as Array<mt.ModelRef>;
    if (mv === 'root') {
      return cFlat[0];
    } else if (typeof mv === 'string') {
      if (typeof rmv === 'string') {
      } else if (Array.isArray(rmv)) {
      } else {
        return this.mrLeaf(rmv, mv);
      }
    } else if (Array.isArray(mv)) {
      if (typeof rmv === 'string') {
        if (rmv === 'rootroot') {
          return cFlat;
        }
      } else if (Array.isArray(rmv)) {
      } else {
        return this.mrBranch(rmv, cFlat);
      }
    } else {
      return cFlat[0];
    }
  }
}
