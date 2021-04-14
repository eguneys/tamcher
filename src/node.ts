export type Node<A> = {
  value: A,
  children: Array<Node<A>>
}

export function node<A>(value: A): Node<A> {
  return {
    value,
    children: []
  }
}

export function addChild<A>(root: Node<A>, child: Node<A>) {
  root.children.push(child);
}

export type FFilter<A> = (_: A) => boolean

export function filter<A>(root: Node<A>,
                          f: FFilter<A>): Array<A> {
  return reduce(root,
                (_: A, children: Array<Array<A>>): Array<A> => {
                  let res = children.flat();
                  if (f(_)) {
                    res.push(_);
                  }
                  return res;
                });
}

export function reduce<A, B>(root: Node<A>,
                             f: (_: A, children: Array<B>) => B): B {
  return reducePlus(root, root.value,
                    (_r, _, children) => f(_, children));                    
}

export function reducePlus<A, B>(root: Node<A>,
                                 rootValue: A,
                                 f: (_r: A, _: A, children: Array<B>) => B): B {

  let { value } = root;
  let children: Array<B> = root.children
    .flatMap(_ =>
      reducePlus(_, value, f));
  
  return f(rootValue, value, children);
}
