# idea

`idea` is a suite of tools for interacting with the [Idea-DAG][Idea-DAG].

It is intended as a foundational technology for applications dealing with fact
verification, fuzzy logic, beliefs, agreement, preferences,
argumentation/discourse, etc.

It uses [IPFS][IPFS], meaning data goes into a global, decentralized and
content-addressable storage network.  You'll need to have an IPFS daemon running
locally for it to work.

Install the whole suite via npm:

```
$ npm i -g @quaelin/idea
```

Or else have a look in [packages/](./packages/) and install just components you
need.

# Concepts

[Idea][Idea]: an immutable text document asserting an idea, thought or statement
of fact.  Identifiable by its unique IPFS cid, which we refer to as an `iCid`.

Using the CLI tools:

```
$ idea add "Grass is green"
QmQ5yJw5nW3D5zyt9xJcJ9wiKA7vreborfrvRxyVsaT9zC
```

The idea "Grass is green" has been stored in IPFS, and its unique iCid was
returned.  It can be fetched by anyone who has the iCid:

```
$ idea get QmQ5yJw5nW3D5zyt9xJcJ9wiKA7vreborfrvRxyVsaT9zC
Grass is green
```

[Relation][Relation]: an Idea subtype that, instead of containing free text,
asserts a logical or otherwise meaningful relationship between other iCids.
There are numerous types of Relations, the simplest being "Negation".

```
$ relation R:Negation A=QmQ5yJw5nW3D5zyt9xJcJ9wiKA7vreborfrvRxyVsaT9zC
QmXTAPeuEEtuonUQy16pdc9VakSJufeg3BwcPyhevURrzW
```

The above is asserting an idea that is the logical negation of "Grass is green".
Relations have a JSON representation that makes them easier to work with:

```
$ idea get QmXTAPeuEEtuonUQy16pdc9VakSJufeg3BwcPyhevURrzW
{"Relation":"Negation","A":"QmQ5yJw5nW3D5zyt9xJcJ9wiKA7vreborfrvRxyVsaT9zC"}
```

[Perspective][Perspective]: a hash of iCids to valuations, representing a point
of view with respect to the veracity of the Ideas represented.  Identifiable by
a unique `pCid`.

The valuations are floating point numbers in the range [-1, 1], where 1 means
total agreement, -1 means total disagreement, and 0 is neutral.

A Perspective can easily be created by providing one or more iCid:valuation
pairs:

```
$ perspective merge QmQ5yJw5nW3D5zyt9xJcJ9wiKA7vreborfrvRxyVsaT9zC=0.5
QmfLkCRRR8FViV2i59FbGjxx8UV65AkD8sXXwkxRZRQK6G
```

This is ascribing a valuation of 0.5 (indicating _partial agreement_) to the
idea "Grass is green".  The resulting Perspective (with only 1 iCid:valuation
pair) can be identified by its unique ID:

```
$ perspective get QmfLkCRRR8FViV2i59FbGjxx8UV65AkD8sXXwkxRZRQK6G
{
  "QmQ5yJw5nW3D5zyt9xJcJ9wiKA7vreborfrvRxyVsaT9zC": 0.5
}
```

Although Perspectives are immutable, there are convenient ways to augment or
combine them into _new_ Perspectives.

```
$ idea add "Cows eat grass"
Qma8LMQ92Audtnc2jnRWy7uXo3X6Z1whQjR9v4eBqcdyBf

$ perspective merge QmfLkCRRR8FViV2i59FbGjxx8UV65AkD8sXXwkxRZRQK6G Qma8LMQ92Audtnc2jnRWy7uXo3X6Z1whQjR9v4eBqcdyBf=1
QmbRJAZa5yzRgAeFWDFaWjQ9zjDCaM81uiCXz5Zm2cDW4F

$ perspective get QmbRJAZa5yzRgAeFWDFaWjQ9zjDCaM81uiCXz5Zm2cDW4F
{
  "QmQ5yJw5nW3D5zyt9xJcJ9wiKA7vreborfrvRxyVsaT9zC": 0.5,
  "Qma8LMQ92Audtnc2jnRWy7uXo3X6Z1whQjR9v4eBqcdyBf": 1
}
```

Here we have started with one Perspective, and used it as a base while adding
additional idea valuations to it to generate a new Perspective.


[Idea]: ./doc/IDEAS.md
[Idea-DAG]: ./doc/IDEA_DAG.md
[IPFS]: https://ipfs.io
[Perspective]: ./doc/PERSPECTIVES.md
[Relation]: ./doc/RELATIONS.md
