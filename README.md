# idea

`idea` is a command-line and web interface that facilitates the creation of
Ideas, Relations, Perspectives.  Uses IPFS for decentralized storage.

# Concepts

**Idea**: an immutable text document asserting an idea, thought or statement of
fact. Identifiable by a unique iid.     

```
$ idea add "Grass is green"
349t8ureughsiet7y45hteisuhtg
```

The idea "Grass is green" has been stored in IPFS, and its unique iid was
returned.  It can be fetched by anyone who has the iid:

```
$ idea get 349t8ureughsiet7y45hteisuhtg
Grass is green
```

**Relation**: an Idea subtype that, instead of containing free text, asserts a
logical or otherwise meaningful relationship between other iids.  There are
numerous types of Relations, the simplest being "Negation".

```
$ idea add --R:Negation A=349t8ureughsiet7y45hteisuhtg
dfg78yr5tuehrte875y859586495
```

The above is asserting an idea that is the logical negation of "Grass is green".
Relations have a JSON representation that makes them easier to work with:

```
$ idea get dfg78yr5tuehrte875y859586495
{
  "Relation": "Negation(A)",
  "A": "349t8ureughsiet7y45hteisuhtg"
}
```

**Perspective**: a hash of iids (incl. Relations) to Valuations.  Immutable, and identifiable by a unique pid.

**Valuation**: a floating point number in the range [-1, 1], where 1 means
total agreement, -1 means total disagreement, and 0 is neutral.    

A Perspective can easily be created by providing one or more pairs of
iid->valuation:

```
$ idea perspective 349t8ureughsiet7y45hteisuhtg=0.5
w487yeruhs8e75t345ttre
```

This is ascribing a valuation of 0.5, indicating _partial agreement_, to the
idea "Grass is green".  The resulting perspective (with only 1 idea:valuation
pair) can be identified by its unique ID;

```
$ idea perspective get w487yeruhs8e75t345ttre
{
  "349t8ureughsiet7y45hteisuhtg": 0.5
}
```

Although Perspectives are immutable, there are convenient ways to augment or
combine them into _new_ Perspectives.

```
$ idea add "Cows eat grass"
4587yser8gs7yert8745yt

$ idea perspective --with=w487yeruhs8e75t345ttre 4587yser8gs7yert8745yt=1
aw4t87yarughsudryghsdfg

$ idea perspective get aw4t87yarughsudryghsdfg
{
  "349t8ureughsiet7y45hteisuhtg": 0.5,
  "4587yser8gs7yert8745yt": 1
}
```

Here we have started with one Perspective, and used it as a base while adding
additional idea valuations to it to generate a new Perspective.
