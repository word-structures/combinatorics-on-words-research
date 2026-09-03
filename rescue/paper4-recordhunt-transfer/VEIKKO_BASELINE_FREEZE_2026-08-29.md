# VEIKKO BASELINE FREEZE

**Date:** 2026-08-29

## Target File
a2fr-worker.js
SHA256: F3E0CC90F09DF876F146FC70DFD5BF5EDDD5364FA9840EA5A0CF252AA61A45A2

## Current Engine State
- **Exact forbidden language:** Forbid4 = ['b','a','a','c'], ['c','a','a','b'], ['a','b','b','c'], ['c','b','b','a'], ['a','c','c','b'], ['b','c','c','a'] + period-1 squares (allowed) + all Abelian squares of half-length >= 2.
- **DFS state:** wordArr, wordLen, maxLen, stack, currentDepth.
- **Incremental Parikh representation:** O(1) prefix-sum arrays prefixA, prefixB, prefixC, prefixPacked.
- **Exact checker:** alidateWordConstraints which checks Forbid4 (if aa2fr) and Abelian Squares by scanning suffixes i to 
-1.
- **Lazy candidate execution:** The search loop runs iteratively using setTimeout(searchLoop, 0) or synchronously depending on depth, using pushLetter and popLetter to maintain state without copying arrays.
- **Pruning rules:** None beyond exact constraint violations.
- **Checkpoint/resume semantics:** postMessage based state export and import.
- **Current performance bottleneck:** Deep backtracking. The DFS checks every character against all suffix combinations. When an abelian square is forced much later, it wastes millions of nodes.

