# @quaelin/idea-web

A web UI for interacting with the [Idea-DAG][Idea-DAG]: decentralized
[Idea][Ideas], [Relation][Relations] & [Perspective][Perspectives] data.

To install:

```sh
$ npm i -g @quaelin/idea-web
```

To run:

```sh
$ idea-web --port=8088 [--ipfs=http://localhost:5001/api/v0]
```

You will need access to a running [IPFS daemon][IPFS].  `idea-web` will look for
one running locally on the default port (5001), but if yours is running
elsewhere, make sure to either pass in the connection string using the `--ipfs`
argument, or else set using the `IDEA_IPFS_HTTP` environment variable.


[Idea-DAG]: https://github.com/quaelin/idea/blob/main/doc/IDEA_DAG.md
[Ideas]: https://github.com/quaelin/idea/blob/main/doc/IDEAS.md
[IPFS]: https://ipfs.io
[Perspectives]: https://github.com/quaelin/idea/blob/main/doc/PERSPECTIVES.md
[Relations]: https://github.com/quaelin/idea/blob/main/doc/RELATIONS.md
