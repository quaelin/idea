# Perspectives

A _Perspective_ is a collection of iids (representing Ideas, including
[Relations](./RELATIONS.md)), with a Valuation for each.  _Valuations_ are
floating point numbers in the range [-1,1], where 1 means complete agreement, -1
means complete disagreement, and 0 means neutral.

Like all data types that `idea` deals with, Perspectives are immutable.  A
Perspective is stored as a JSON object in IPFS, so the content hash that serves
as its "id" can't change.  However, there are a number of operations that can be
performed on Perspectives, which can result in new or derivative Perspectives
being created.

## Merging

Two or more perspectives can be "merged", resulting in a new perspective with
_all_ the iid:valuation pairs of the constituent perspectives.  With merge
operations, there is right-to-left precedence.  That is, whichever perspective
is specified _last_ in the order of arguments is the one whose valuations are
used in the case of any duplicate iids.

```
$ idea perspective merge <perspective_expression> [<perspective_expression> ...]
```

A `<perspective_expression>` can be either a Perspective content hash, or else a
literal list of iid=valuation pairs.

## Intersection

Two or more perspectives can be "intersected", resulting in a new perspective
that contains _only_ the iids common to ALL the input perspectives.  The
valuations for each kept iid will be the _average_ of those input.

```
$ idea perspective intersect <perspective_expression> [<perspective_expression> ...]
```
