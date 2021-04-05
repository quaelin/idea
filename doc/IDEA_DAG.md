# The Idea-DAG

The _Idea-DAG_ is a global, distributed, directed acyclic graph of immutable
[Ideas][Ideas], [Relations][Relations], and [Perspectives][Perspectives].  Text
Ideas serve as the "leaves" of the DAG, whereas Relations and Perspectives
reference other Ideas & Relations so they can be thought of as the non-leaf
nodes.

Data objects are stored in [IPFS][IPFS], and can be referenced by their IPFS
content ID, or `cid`.

Tools for interacting with the Idea-DAG include the [JavaScript client
API][idea-api] and the [CLI commands][idea-cli]... and also a web interface
(coming soon!).


[idea-api]: https://github.com/quaelin/idea/tree/main/packages/idea-api#readme
[idea-cli]: https://github.com/quaelin/idea/tree/main/packages/idea-cli#readme
[Ideas]: ./IDEAS.md
[IPFS]: https://ipfs.io
[Perspectives]: ./PERSPECTIVES.md
[Relations]: ./RELATIONS.md
