# Tamcher ![test workflow](https://github.com/eguneys/tamcher/actions/workflows/test.yml/badge.svg)

Make composable text matchers.

## Install

`yarn add tamcher --save`

## Use

```
    import { mm } from 'tamcher';

    let mNumber = mm.mr(/^(\d*)(.*)/s, 'number'); // returns a matcher

    mNumber('333') // returns { number: '333' }
```

See [esra](https://github.com/eguneys/esra) for an example use of this library, that parses chess PGN files.

## Matchers

`import { mm } from 'tamcher';`

`mm.mr(/regex/, matcherType)` Match a regex

**Regex Format** Regex has to match the rest of the string at the end, so it has to be in this format: `/^Extra(YourCapturingGroup)Extra(.*)/s`

`mm.mseq3([matcher, matcher, matcher], reducer)` Match three matchers in sequence:

`reducer` is a [Reducer](#reducer) that defines how to combine the three matchers.

`mm.mstar(matcher)` Match a matcher greedily

`mm.mgroup(matcher, mm.oneMatcherNode(matcherType))` Group a matcher into an object


See [matchmaker.ts](src/matchmaker.ts) for all matchers.

## Reducers

You can make a reducer for selecting matchers like this: `_ => _[0]`.

`import { rr } from 'tamcher';`

`rr.fFirstTwo(matcherType)` Array of first two matchers wrapped to an object with key `matcherType`.

`rr.fLastTwo(matcherType)`

`rr.fAll(matcherType)` Array all matchers

See [reducers.ts](src/reducers.ts) for all reducers.



