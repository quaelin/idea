# Perspectives

A _Perspective_ is a type of immutable data stored in the [Idea-DAG][Idea-DAG].  It is a
mapping of `iCids` (representing [Ideas][Ideas], including
[Relations][Relations]), with a valuation for each.  _Valuations_ are floating
point numbers in the range [-1, 1], where 1 means complete agreement, -1 means
complete disagreement, and 0 means neutral.  

Example perspective referencing 3 different Ideas, with a valuation for each:

```js
{
  "QmXhqJntChQ4WAQZrGuzGnD5Lwpm1DoLjASJfmLD8Q51q7": 0.53,
  "Qme3ZcMHqDUphNALrfAvgDmW3RZkhyZK2FbESDtzV98fbi": -1,
  "Qma2d3zYG18HXJLciXBvE29Bsw9Gw3xbYfPuzgGz8BEiBd": 0.1
}
```

Like Ideas, Perspectives are immutable.  A Perspective is stored as a JSON
object in [IPFS][IPFS], so the content hash that serves as its unique `pCid`
can't change.  However, there are a number of operations that can be performed
on Perspectives, which can result in new or derivative Perspectives being
created.


[Ideas]: ./IDEAS.md
[Idea-DAG]: ./IDEA_DAG.md
[IPFS]: https://ipfs.io
[Relations]: ./RELATIONS.md
