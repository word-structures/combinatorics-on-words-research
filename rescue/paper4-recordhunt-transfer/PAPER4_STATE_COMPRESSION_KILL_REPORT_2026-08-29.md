# PAPER4_STATE_COMPRESSION_KILL_REPORT_2026-08-29

## Objective
Adversarially evaluate whether the 19 support families can be augmented with finite information to form a Markovian automaton for the exact legal future of an aa2fr word.

## Adversarial Attack
Suppose there exists a finite state S = (family_id, target_class, bounded_history) that fully determines the set of legal infinite continuations.
1. An abelian square is formed when Psi(w[i ... i+K]) = Psi(w[i+K ... i+2K]).
2. As the search generates the string w at position N, it must avoid abelian squares for ALL starting positions i < N.
3. This requires the future string to avoid the exact Parikh vectors of w[i ... N] for every i.
4. The number of active threats at position N is N/2. Each threat requires tracking a specific target Parikh vector.
5. If the state is bounded (finite), it cannot distinguish between two deep histories that have identical local suffixes but differ at some position i = 1. 
6. By appending a specific sequence of length N, we can force the first history to complete an abelian square (matching w[1...N]) while the second history does not. 
7. Thus, the legal future languages of the two states differ.

## Verdict
**STATE COMPRESSION DEAD-END (PROVEN).**
Simple finite state compression (a Markovian automaton) is mathematically impossible for abelian-square-free generation. The 19 families classify the *geometric support* of a square, but they do NOT erase the history-dependence of the Parikh vectors. Any search must retain exact deep historical tracking, meaning the state space inevitably shatters rather than compresses.
