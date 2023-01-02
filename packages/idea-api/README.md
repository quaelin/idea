# @quaelin/idea-api

JavaScript API for interacting with the [Idea-DAG][Idea-DAG]: decentralized
Idea, Relation & Perspective data.  

You'll need access to an [IPFS daemon][IPFS], ideally a locally running one.

# API Reference

Most of the API methods are asynchronous, returning promises.  Data objects
([Ideas][Ideas], [Relations][Relations] & [Perspectives][Perspectives]) are
referenced by their IPFS content ID, or `cid`, which is a specially formatted
string that also happens to be a cryptographic hash of the object itself.

## Initialization

The `idea.*` APIs are an abstraction atop IPFS, and as such it's necessary to
initialize the API by passing in some connection info.

```js
import { initApi } from '@quaelin/idea-api';

const idea = initApi({
  ipfsConfig: {
    http: 'http://127.0.0.1:5001/api/v0',
  },
});
```

## Ideas

Ideas are the foundational data type &mdash; the leaves of the Idea-DAG.  They
are referenced by their IPFS content ID, which we conventionally abbreviate as
`iCid` (for Idea Content ID).

### ideas.add(text)

```js
// iCid is the IPFS content ID of this idea
const iCid = await idea.add('This is an idea');
```

### ideas.get(iCid)

```js
console.log(await idea.get(iCid));
// This is an idea
```

Can also be used to fetch Relations, in which case they are returned as an
object rather than a string.

## Relations

Relations are a special subtype of Idea.  They are logical or otherwise
meaningful operators that use Ideas and other Relations as operands.

Relations can be created using the `idea.relations.*()` methods, and fetched
using `idea.get()`.  We often call their content IDs `rCids`, but they're also
Ideas so `iCid` is still applicable.

The operands provided must be content IDs for other Ideas or Relations.

### idea.relation.analogy(A, B, C, D)

Create an `Analogy` relation, meaning _"A is to B as C is to D"_, returning the
`rCid`.

```js
const rCid = await idea.relation.analogy(a, b, c, d);

console.log(await idea.get(rCid));
// {
//   Relation: 'Analogy',
//   A: <a>,
//   B: <b>,
//   C: <c>,
//   D: <d>
// }
```

### idea.relation.and(A, B)

Create an `And` relation, meaning _"both A and B are true"_, returning the
`rCid`.

`And` is a commutative relation, so it doesn't matter which order you pass the
operands.  Calling `.and(a, b)` will result in the same `rCid` as `.and(b, a)`.

### idea.relation.identity(A, B)

Create an `Identity` relation, meaning _"A is essentially the same as B"_,
returning the `rCid`.

`Identity` is a commutative relation, so it doesn't matter which order you pass
the operands.  Calling `.identity(a, b)` will result in the same `rCid` as
`.identity(b, a)`.

### idea.relation.implies(A, B)

Create an `Implies` relation, meaning _"to the extend A is true, B must also be
true"_, returning the `rCid`.

### idea.relation.improves(A, B)

Create an `Improves` relation, meaning _"A is better than B"_, and returning the
`rCid`.

### idea.relation.isa(A, B)

Create an `IsA` relation, meaning _"A is an example, instance, or subtype of
B"_, and returning the `rCid`.

### idea.relation.negation(A)

Create a `Negation` relation, meaning _"the opposite of A"_, and returning the
`rCid`.

### idea.relation.or(A, B)

Create an `Or` relation, meaning _"A is true, or else B is; possibly both"_,
and returning the `rCid`.

`Or` is a commutative relation, so it doesn't matter which order you pass the
operands.  Calling `.or(a, b)` will result in the same `rCid` as `.or(b, a)`.

### idea.relation.xor(A, B)

Create an `XOr` relation, meaning _"A is true, or else B is; but not both"_,
and returning the `rCid`.

`XOr` is a commutative relation, so it doesn't matter which order you pass the
operands.  Calling `.xor(a, b)` will result in the same `rCid` as `.xor(b, a)`.

## Perspectives

A Perspective is a mapping of `iCids` (which can include `rCids`) to
floating-point numeric _valuations_ in the range -1 to 1, where -1 indicates
complete disagreement with an Idea, 0 means neutral, and 1 means complete
agreement.

In the API functions described here, most take 1 or more _perspective
expressions_.  A perspective expression, or `pex`, can be either a `pCid`, or
else a literal object with `iCids` for keys and valuations for values.

### idea.perspective.average(...pexes)

Merge two or more perspectives together, taking the _average_ of the valuations
for any matching `iCids`.  Return the `pCid` of the new perspective.

### idea.perspective.get(pCid)

Fetch a perspective by `pCid`, returning an object with `iCid:valuation` pairs.

### idea.perspective.intersect(...pexes)

Merge two or more perspectives together, but only retain keys that were present
in _all_ the input perspectives.  For each key, take the _average_ of the input
valuations.  Return the `pCid` of the new perspective.

### idea.perspective.neutralize(pex)

Create a new perspective containing all the keys from `pex`, but with all
valuations set to 0, and return the `pCid`.

### idea.perspective.polarize(pex, factor)

Create a new perspective containing all the keys from `pex`, but with all
valuations skewed according to `factor`, which must be a number in the range
`[-1,1]`:
 - `-1` sets all valuations to 0 (same as _neutralize)
 - `<0` skews valuations towards 0
 - `0` leaves all valuations the same
 - `>0` skews all positive valuations towards 1, negative towards -1
 - `1` sets all valuations to 1 or -1

Returns the `pCid` of the new perspective.

### idea.perspective.scope(pexA, pexB)

Create a new perspective based on `pexA`, but containing only those keys found
in `pexB`.  Similar to `.intersect()` but always keeps the valuations from
`pexA`.  Returns the `pCid` of the new perspective.

### idea.perspective.skew(pexA, pexB, weighting)

Create a new perspective by merging `pexA` and `pexB`, but for any keys found in
both inputs we skew the valuations towards one or the other, based on the
`weighting` value in the range `[-1,1]`.
 - `-1` just take the valuations from `pexA`
 - `<0` skew valuations towards `pexA`
 - `0` take a straight average of the valuations
 - `>0` skew valuations towards `pexB`
 - `1` take the valutaions from `pexB`

Returns the `pCid` of the new perspective.


[Idea-DAG]: https://github.com/quaelin/idea/blob/main/doc/IDEA_DAG.md
[Ideas]: https://github.com/quaelin/idea/blob/main/doc/IDEAS.md
[IPFS]: https://ipfs.io
[Perspectives]: https://github.com/quaelin/idea/blob/main/doc/PERSPECTIVES.md
[Relations]: https://github.com/quaelin/idea/blob/main/doc/RELATIONS.md
