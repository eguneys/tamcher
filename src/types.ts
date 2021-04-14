export type Maybe<T> = T | undefined

export type Either<A, B> = A | B

export type Triple<A> = [A, A, A]

export type Many<A> = A | Array<A>

export type OneMatcherType = string

export type OneMatcherValue = 
  string | 
  Many<OneMatcherNode>

export type OneMatcherNode = {
  tpe: OneMatcherType,
  value: OneMatcherValue
}

export type MatcherResult = {
  rest: string,
  acc: OneMatcherValue
}

export type Matcher = (rest: string) => Maybe<MatcherResult>;

