# Relation types

_Relations_ are specially formatted Ideas that assert some meaningful
relationship between _other_ Ideas (including other Relations).

When notating Relations, we use **A-D** as variables representing different
iids.     

## Analogy(A, B, C, D)

The most complex relation, this asserts an analogy of the form **A:B::C:D**.  In
other words, _"**A** is to **B** as **C** is to **D**"_.    

## And(A, B)

Asserts that _both_ **A** and **B** are true.

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
meaning it allows for _both_ to be true.  Contrast with `XOr`.

## XOr(A, B)

_Exclusive_ "or".  Asserts that either **A** or **B** must be true, _but NOT
both_.
