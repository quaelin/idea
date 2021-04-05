# @quaelin/idea-cli

CLI tool for interacting with the [Idea-DAG][Idea-DAG]: decentralized
[Idea][Ideas], [Relation][Relations] & [Perspective][Perspectives] data.
Provides convenient command-line access to the [idea-api][idea-api].

```sh
$ npm install -g @quaelin/idea-cli
```

This installs the commands `idea`, `relation` and `perspective`.

**Note**: For the commands to work, you'll need to have an [IPFS daemon][IPFS]
running.  The commands will look for a daemon running on the default local port
(5001), but if your daemon is running elsewhere, use the `IDEA_IPFS_HTTP`
environment variable to specify where it can be found.

```sh
$ export IDEA_IPFS_HTTP=http://localhost:5001/api/v0

$ idea add "Not a bad idea"
QmRXZEpbAqbZtj59g7D8rWSFJ6KpAVAVhDRxNAEpwUYW4L

$ idea get QmRXZEpbAqbZtj59g7D8rWSFJ6KpAVAVhDRxNAEpwUYW4L
Not a bad idea
```

# Commands

## Ideas

### idea add

### idea get

## Relations

### relation R:Analogy

### relation R:And

### relation R:Identity

### relation R:Implies

### relation R:Improves

### relation R:IsA

### relation R:Negation

### relation R:Or

### relation R:XOr

## Perspectives

In the CLI commands below, a `<pex>` represents a "perspective expression",
which can be either a pCid, or else a literal list of iCid=valuation pairs.

### perspective average

Merge two or more perspectives together, taking the average valuation for a any
given key.

```
$ perspective average <pex> <pex> [<pex> ...]
```

### perspective get

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

### perspective intersect

Two or more perspectives can be "intersected", resulting in a new perspective
that contains _only_ the iCids common to ALL the input perspectives.  The
valuations for each kept iCid will be the _average_ of those input.

```
$ perspective intersect <pex> <pex> [<pex> ...]
```

### perspective keys

Lists just the iCids from a perspective, with no valuations.

```
$ perspective keys 3t5837yert87erygeryt345t
a48t9y348t7yreusghseighuseg
34t98w4eyrgtuseyrghesuyrghiwe7r
```

### perspective merge

Two or more perspectives can be "merged", resulting in a new perspective with
_all_ the iCid:valuation pairs of the constituent perspectives.  With merge
operations, there is right-to-left precedence.  That is, whichever perspective
is specified _last_ in the order of arguments is the one whose valuations are
used in the case of any duplicate iCids.

```
$ perspective merge <pex> [<pex> ...]
```

### perspective neutralize

A perspective can be "neutralized", resulting in a new perspective with all
valuations set to 0.  Neutralizing is the same as polarizing with a polarization
factor of -1.

```
$ perspective neutralize <pex>
```

### perspective polarize

A perspective can be "polarized", where all valuations are adjusted by a
`<factor>` in the range [-1, 1], where:
 * -1 is the same as neutralize (all valuations set to 0)
 * <0 means valuations get skewed towards 0
 * 0 means no change
 * >0 all negative valuations get skewed towards -1, and positive ones towards 1
 * 1 means all negative valuations become -1 and all positive ones become 1

```
$ perspective polarize <pex> <factor>
```

### perspective scope

You can select a subset of a Perspective A, preserving only the iCids (and
valuations) from A where the iCid is found in Perspective B.  (Valuations of B
are ignored.)

```
$ perspective scope <pex A> <pex B>
```

### perspective skew

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


[idea-api]: https://github.com/quaelin/idea/tree/main/packages/idea-api#readme
[Idea-DAG]: https://github.com/quaelin/idea/blob/main/doc/IDEA_DAG.md
[Ideas]: https://github.com/quaelin/idea/blob/main/doc/IDEAS.md
[IPFS]: https://ipfs.io
[Perspectives]: https://github.com/quaelin/idea/blob/main/doc/PERSPECTIVES.md
[Relations]: https://github.com/quaelin/idea/blob/main/doc/RELATIONS.md
