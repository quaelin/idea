# Perspectives

A _Perspective_ is a hash collection of iids (representing Ideas, including
[Relations](./RELATIONS.md)), with a valuation for each.  _Valuations_ are
floating point numbers in the range [-1, 1], where 1 means complete agreement,
-1 means complete disagreement, and 0 means neutral.

Like all data types that `idea` deals with, Perspectives are immutable.  A
Perspective is stored as a JSON object in IPFS, so the content hash that serves
as its "id" can't change.  However, there are a number of operations that can be
performed on Perspectives, which can result in new or derivative Perspectives
being created.

In the following commands, a `<perspective_expression>` can be either a
Perspective content hash/id, or else a literal list of iid=valuation pairs.

## Get

Fetches and dumps a representation of a the actual content of a perspective.

```
$ idea perspective get <perspective_expression>
```

The default output type is JSON, eg:

```
$ idea perspective get 3t5837yert87erygeryt345t
{
  "a48t9y348t7yreusghseighuseg": 0.5,
  "34t98w4eyrgtuseyrghesuyrghiwe7r": -0.25
}
```

or:

```
$ idea perspective get 34r9834y5tg87rgy=0.75391 34r9385ytge8rgherg=-1 --type=csv
34r9385ytge8rgherg,-1
34r9834y5tg87rgy,0.75391
```

## Intersect

Two or more perspectives can be "intersected", resulting in a new perspective
that contains _only_ the iids common to ALL the input perspectives.  The
valuations for each kept iid will be the _average_ of those input.

```
$ idea perspective intersect <perspective_expression> [<perspective_expression> ...]
```

## Keys

Lists just the iids from a perspective.

```
$ idea perspective keys 3t5837yert87erygeryt345t
a48t9y348t7yreusghseighuseg
34t98w4eyrgtuseyrghesuyrghiwe7r
```

## Merge

Two or more perspectives can be "merged", resulting in a new perspective with
_all_ the iid:valuation pairs of the constituent perspectives.  With merge
operations, there is right-to-left precedence.  That is, whichever perspective
is specified _last_ in the order of arguments is the one whose valuations are
used in the case of any duplicate iids.

```
$ idea perspective merge <perspective_expression> [<perspective_expression> ...]
```

## Neutralize

A perspective can be "neutralized", resulting in a new perspective with all
valuations set to 0.  Neutralizing is the same as polarizing with a polarization
factor of 0.

## Polarize

A perspective can be "polarized", where all valuations are adjusted by a
`<polarization_factor>` in the range [0, 1], where:
 * 0 is the same as neutralize (all valuations set to 0)
 * >0 means all valuations get skewed towards -1 and 1
 * 1 means all negative valuations become -1 and all positive ones become 1

## Scope By

You can select a subset of a Perspective A, preserving only the keys (and
values) from A where the iid is found in Perspective B.

```
$ idea perspective scope 349t8yesrguhsdfg by 4598twy7er87gsyerg
```

## Weighted Merge

Two perspectives can be merged with a weighting indicating how much to skew
valuations towards the _second_ `<perspective_expression>`.

```
$ idea perspective weighted <perspective_expression> <perspective_expression> <weighting>
```

The `<weighting>` value can be in the range [-1, 1], where for duplicate iids:
 * -1 means to take the valuation from the _first_ perspective
 * <0 means to skew towards the first
 * 0 means take a straight average
 * >0 means skew towards the second
 * 1 means take the valuation from the _second_ perspective
