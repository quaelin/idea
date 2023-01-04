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
$ export IDEA_IPFS_HTTP=http://127.0.0.1:5001/api/v0
```

# Commands

## Ideas

### idea add

Create a text Idea, printing its resulting `iCid`:

```sh
$ idea add "Not a bad idea"
QmRXZEpbAqbZtj59g7D8rWSFJ6KpAVAVhDRxNAEpwUYW4L
```

### idea get

Fetch an Idea (or Relation) by `iCid`:

```sh
$ idea get QmRXZEpbAqbZtj59g7D8rWSFJ6KpAVAVhDRxNAEpwUYW4L
Not a bad idea
```

## Relations

All of the `relation` commands are for _creating_ Relations, and they all return
the `rCid` of the created Relation.  Use `idea get` to fetch the Relation object
itself.

### relation R:Analogy

```sh
$ relation R:Analogy A=<icid> B=<icid> C=<icid> D=<icid>
```

### relation R:And

```sh
$ relation R:And A=<icid> B=<icid>
```

### relation R:Identity

```sh
$ relation R:Identity A=<icid> B=<icid>
```

### relation R:Implies

```sh
$ relation R:Implies A=<icid> B=<icid>
```

### relation R:Improves

```sh
$ relation R:Improves A=<icid> B=<icid>
```

### relation R:IsA

```sh
$ relation R:IsA A=<icid> B=<icid>
```

### relation R:Negation

```sh
$ relation R:Negation A=<icid>
```

### relation R:Or

```sh
$ relation R:Or A=<icid> B=<icid>
```

### relation R:XOr

```sh
$ relation R:XOr A=<icid> B=<icid>
```

## Perspectives

In the CLI commands below, a `<pex>` represents a _"perspective expression"_,
which can be either a `pCid`, or else a literal list of `iCid=valuation` pairs.

### perspective average

Merge two or more perspectives together, taking the average valuation for a any
given key.

```sh
$ perspective average <pex> <pex> [<pex> ...]
```

### perspective get

Fetches the actual content of a perspective.

```sh
$ perspective get <pex>
```

The default (and currently only) output format is `console.log()` style, eg:

```sh
$ perspective get QmdE8HdS615NjvtypfF2FPZc4H7WnS5why67ueUqVdR7tZ
{
  QmWP7mJwoH9a63yB5YEGnKeVz73Trimn4783w9XCRRM1QA: 0.78,
  QmaFpVwJJc8V4tZLjD3hFTTqTquTR7QFkGy6rYhMEPELva: -0.78
}
```

### perspective intersect

Two or more perspectives can be "intersected", resulting in a new perspective
that contains _only_ the iCids common to ALL the input perspectives.  The
valuations for each kept iCid will be the _average_ of those input.

```sh
$ perspective intersect <pex> <pex> [<pex> ...]
```

### perspective keys

Lists just the iCids from a perspective, with no valuations.

```sh
$ perspective keys QmdE8HdS615NjvtypfF2FPZc4H7WnS5why67ueUqVdR7tZ
[
  'QmWP7mJwoH9a63yB5YEGnKeVz73Trimn4783w9XCRRM1QA',
  'QmaFpVwJJc8V4tZLjD3hFTTqTquTR7QFkGy6rYhMEPELva'
]
```

### perspective merge

Two or more perspectives can be "merged", resulting in a new perspective with
_all_ the iCid:valuation pairs of the constituent perspectives.  With merge
operations, there is right-to-left precedence.  That is, whichever perspective
is specified _last_ in the order of arguments is the one whose valuations are
used in the case of any duplicate iCids.

```sh
$ perspective merge <pex> [<pex> ...]
```

You can also _create_ arbitrary perspectives using `perspective merge` by
specifying a set of iCid=valuation pairs:

```sh
$ perspective merge <icid>=<valuation> [<icid>=<valuation> ...]
```

### perspective neutralize

A perspective can be "neutralized", resulting in a new perspective with all
valuations set to 0.  Neutralizing is the same as polarizing with a polarization
factor of -1.

```sh
$ perspective neutralize <pex>
```

### perspective polarize

A perspective can be "polarized", where all valuations are adjusted by a
`<factor>` in the range [-1, 1], where:
 * `-1` is the same as neutralize (all valuations set to 0)
 * `<0` means valuations get skewed towards 0
 * `0` means no change
 * `>0` all negative valuations get skewed towards -1, and positive ones towards 1
 * `1` means all negative valuations become -1 and all positive ones become 1

```sh
$ perspective polarize <pex> <factor>
```

### perspective scope

You can select a subset of a Perspective A, preserving only the iCids (and
valuations) from A where the iCid is found in Perspective B.  (Valuations of B
are ignored.)

```sh
$ perspective scope <pex A> <pex B>
```

### perspective skew

Two perspectives can be merged with a weighting indicating how much to skew
valuations towards one or the other.

```sh
$ perspective skew <pex> <pex> <weighting>
```

The `<weighting>` value can be in the range [-1, 1], where for duplicate iCids:
 * `-1` means to take the valuation from the _first_ perspective
 * `<0` means to skew towards the first
 * `0` means take a straight average
 * `>0` means skew towards the second
 * `1` means take the valuation from the _second_ perspective


[idea-api]: https://github.com/quaelin/idea/tree/main/packages/idea-api#readme
[Idea-DAG]: https://github.com/quaelin/idea/blob/main/doc/IDEA_DAG.md
[Ideas]: https://github.com/quaelin/idea/blob/main/doc/IDEAS.md
[IPFS]: https://ipfs.io
[Perspectives]: https://github.com/quaelin/idea/blob/main/doc/PERSPECTIVES.md
[Relations]: https://github.com/quaelin/idea/blob/main/doc/RELATIONS.md
