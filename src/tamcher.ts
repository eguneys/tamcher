import { FFilter, Node, node, addChild, reduce, filter, reducePlus } from './node';
import * as tt from './types';
import * as mt from './model';

export function addOneMatcherToNode(root: Node<tt.OneMatcherValue>, 
                             mv: tt.OneMatcherValue): Node<tt.OneMatcherValue> {
  let nn = node(mv);
  if (Array.isArray(mv)) {
    mv.map(_ => addOneMatcherToNode(nn, _));
  } else if (typeof mv === 'string') {
  } else {
    addOneMatcherToNode(nn, mv.value);
  }
  addChild(root, nn);

  return root;
}

export function maybeOneMatcherNode(_: tt.OneMatcherValue): tt.Maybe<tt.OneMatcherNode> {
  if (typeof _ === 'string') {
  } else if (Array.isArray(_)) {
  } else {
    return _;
  }
}

export function fMatchNode(f: FFilter<tt.OneMatcherNode>): FFilter<tt.OneMatcherValue> {
  return (_: tt.OneMatcherValue): boolean => {
    let n = maybeOneMatcherNode(_);

    if (n) {
      return f(n);
    } else {
      return false;
    }
  };
}

export function fOfType(tpe: tt.OneMatcherType): FFilter<tt.OneMatcherNode> {
  return function(_: tt.OneMatcherNode): boolean {
    return _.tpe === tpe;
  }
}

export function toNode(mv: tt.OneMatcherValue) {
  return addOneMatcherToNode(node('root'), mv);
}

export default function tamcher(mv: tt.OneMatcherValue) {
  return toNode(mv);
}
