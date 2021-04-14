export * as tt from './types';
export * as mm from './matchmaker';
export * as rr from './reducers';
export { default as NodeToModel } from './nodetomodel';
export * as model from './model';

export { toNode } from './tamcher';
import * as tt from './types';
import tamcher from './tamcher';
import NodeToModel from './nodetomodel';
import * as mt from './model';
import { Node, reducePlus } from './node';

export default function mm<A>(met: tt.MatcherResult, reducer: any): tt.Maybe<A> {
  let n = tamcher(met.acc);
  return reducePlus(n, 'rootroot', reducer);
}
