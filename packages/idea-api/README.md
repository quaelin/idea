# @quaelin/idea-api

JavaScript API for accessing the Idea-DAG: decentralized Idea, Relation &
Perspective data.

You'll need access to an IPFS daemon, ideally a locally running one.

# API Reference

Most of the API methods are asynchronous, returning promises.  Data objects
(Ideas, Relations & Perspectives) are referenced by their IPFS content ID, or
`cid`, which is a specially formatted string that also happens to be a
cryptographic hash of the object itself.

## Initialization

The `idea.*` APIs are an abstraction atop IPFS, and as such it's necessary to
initialize the API by passing in some connection info.

```js
const { initApi } = require('@quaelin/idea-api');

const idea = initApi({
  ipfsConfig: {
    http: 'http://localhost:5001/api/v0',
  },
});
```

## Ideas

Ideas are the foundational data type &mdash; the leaves of the Idea-DAG.  They
are referenced by their IPFS content ID, which we conventionally abbreviate as
`iCid`.

### ideas.add("<text>")

```js
// iCid is the IPFS content ID of this idea
const iCid = await idea.add('This is an idea');
```

### ideas.get(iCid)

```js
console.log(await idea.get(iCid));
// This is an idea
```

Can also be used to fetch _relations_, in which case they are returned as an
object rather than a string.

## Relations

Relations are a special subtype of Idea.  They are logical or otherwise
meaningful operators that use Ideas and other Relations as operands.

Relations can be created using the `idea.relations.*()` methods, and fetched
using `idea.get()`.  We often call their content IDs `rCid`, but they're also
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

### idea.relation.xor(A, B)

Create an `XOr` relation, meaning _"A is true, or else B is; but not both"_,
and returning the `rCid`.

## Perspectives

A Perspective is a mapping of `iCids` (which can include `rCids`) to
floating-point numeric _valuations_ in the range -1 to 1, where -1 indicates
complete disagreement with an Idea, 0 means neutral, and 1 means complete
agreement.

In the API functions described here, most take 1 or more _perspective
exoression_.  A perspective expression, or `pex`, can be either a `pCid`, or
else a literal object with `iCids` for keys and valuations for values.

### idea.perspective.average()

### idea.perspective.get()

### idea.perspective.intersect()

### idea.perspective.neutralize(pexA)

### idea.perspective.polarize(pexA, factor)

### idea.perspective.scope(pexA, pexB)

### idea.perspective.skew(pexA, pexB, weighting)
