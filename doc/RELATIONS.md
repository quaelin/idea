# Relations

A _Relation_ is a type of immutable data stored in the [Idea-DAG][Idea-DAG].
Relations are specially formatted [Ideas][Ideas] that assert some meaningful
relationship between _other_ Ideas (including other Relations).

When notating Relations, we use **A-D** as operands representing different
`iCids`.  The types are as follows.

## Analogy(A, B, C)

The 3-term analogy relation represents an analogy of the form **A:B::A:C**
(_"**A** is to **B** as **A** is to **C**"_).

## Analogy(A, B, C, D)

The most complex relation, the 4-term analogy asserts an analogy of the form
**A:B::C:D** (_"**A** is to **B** as **C** is to **D**"_).

## And(A, B)

Asserts that _both_ **A** and **B** are true.

## Identity(A, B)

Asserts that **A** and **B** are the same, or so similar as to be effectively
the same thing.

## Implies(A, B)

Asserts that if **A** is true, **B** must also be true.  Or, more fuzzily, _"to
the extent that **A** is true, **B** must also be true"_.

## Improves(A, B)

Asserts that **A** _improves upon_ **B** in some meaningful way, overall.

## IsA(A, B)

Asserts that **A** is in some way a _specific example_, _subgroup_ or _instance_
of **B** (and hence **B** is a _generalization_ of **A**).

## Negation(A)

The simplest relation, this asserts the _opposite_ of **A**.

## Or(A, B)

Asserts that either **A** or **B** must be true.  This is an "inclusive or",
meaning it allows for _both_ to be true.  Contrast with `R:XOr`.

## XOr(A, B)

_Exclusive_ "or".  Asserts that either **A** or **B** must be true, _but NOT
both_.


[Ideas]: ./IDEAS.md
[Idea-DAG]: ./IDEA_DAG.md
