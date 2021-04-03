# Perspectives

A _Perspective_ is a hash collection of iCids (representing Ideas, including
[Relations](./RELATIONS.md)), with a valuation for each.  _Valuations_ are
floating point numbers in the range [-1, 1], where 1 means complete agreement,
-1 means complete disagreement, and 0 means neutral.

Like Ideas, Perspectives are immutable.  A Perspective is stored as a JSON
object in IPFS, so the content hash that serves as its unique `pCid` can't
change.  However, there are a number of operations that can be performed on
Perspectives, which can result in new or derivative Perspectives being created.   

In the CLI commands below, a `<pex>` represents a "perspective expression",
which can be either a pCid, or else a literal list of iCid=valuation pairs.

## Get

Fetches the actual content of a perspective.

```
$ perspective get <pex>
```

The default output format is JSON, eg:

```
$ perspective get 3t5837yert87erygeryt345t
{
  "a48t9y348t7yreusghseighuseg": 0.5,
  "34t98w4eyrgtuseyrghesuyrghiwe7r": -0.25
}
```

or:

```
$ perspective get 34r9834y5tg87rgy=0.75391 34r9385ytge8rgherg=-1 --format=csv
34r9385ytge8rgherg,-1
34r9834y5tg87rgy,0.75391
```

## Intersect

Two or more perspectives can be "intersected", resulting in a new perspective
that contains _only_ the iCids common to ALL the input perspectives.  The
valuations for each kept iCid will be the _average_ of those input.

```
$ perspective intersect <pex> [<pex> ...]
```

## Keys

Lists just the iCids from a perspective, with no valuations.

```
$ perspective keys 3t5837yert87erygeryt345t
a48t9y348t7yreusghseighuseg
34t98w4eyrgtuseyrghesuyrghiwe7r
```

## Merge

Two or more perspectives can be "merged", resulting in a new perspective with
_all_ the iCid:valuation pairs of the constituent perspectives.  With merge
operations, there is right-to-left precedence.  That is, whichever perspective
is specified _last_ in the order of arguments is the one whose valuations are
used in the case of any duplicate iCids.

```
$ perspective merge <pex> [<pex> ...]
```

## Neutralize

A perspective can be "neutralized", resulting in a new perspective with all
valuations set to 0.  Neutralizing is the same as polarizing with a polarization
factor of -1.

```
$ perspective neutralize <pex>
```

## Polarize

A perspective can be "polarized", where all valuations are adjusted by a
`<polarization_factor>` in the range [-1, 1], where:
 * -1 is the same as neutralize (all valuations set to 0)
 * <0 means valuations get skewed towards 0
 * 0 means no change
 * >0 all negative valuations get skewed towards -1, and positive ones towards 1
 * 1 means all negative valuations become -1 and all positive ones become 1

```
$ perspective polarize <pex> <polarization_factor>
```

## Scope By

You can select a subset of a Perspective A, preserving only the iCids (and
valuations) from A where the iCid is found in Perspective B.  (Valuations of B
are ignored.)

```
$ perspective scope <pex A> <pex B>
```

## Skew

Two perspectives can be merged with a weighting indicating how much to skew
valuations towards one or the other.

```
$ perspective skew <pex> <pex> <weighting>
```

The `<weighting>` value can be in the range [-1, 1], where for duplicate iCids:
 * -1 means to take the valuation from the _first_ perspective
 * \<0 means to skew towards the first
 * 0 means take a straight average
 * \>0 means skew towards the second
 * 1 means take the valuation from the _second_ perspective
