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

### perspective average

### perspective get

### perspective intersect

### perspective keys

### perspective merge

### perspective neutralize

### perspective polarize

### perspective scope

### perspective skew


[idea-api]: https://github.com/quaelin/idea/tree/main/packages/idea-api#readme
[Idea-DAG]: https://github.com/quaelin/idea/blob/main/doc/IDEA_DAG.md
[Ideas]: https://github.com/quaelin/idea/blob/main/doc/IDEAS.md
[IPFS]: https://ipfs.io
[Perspectives]: https://github.com/quaelin/idea/blob/main/doc/PERSPECTIVES.md
[Relations]: https://github.com/quaelin/idea/blob/main/doc/RELATIONS.md
