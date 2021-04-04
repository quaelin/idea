# @quaelin/idea-cli

CLI tool for accessing the Idea-DAG: decentralized Idea, Relation & Perspective
data.  Provides convenient command-line access to the
[idea-api](/quaelin/idea/tree/main/packages/idea-api).

```sh
$ npm install -g @quaelin/idea-cli
```

This installs the commands `idea`, `relation` and `perspective`.

**Note**: For the commands to work, you'll need to have an IPFS daemon running.

```sh
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
