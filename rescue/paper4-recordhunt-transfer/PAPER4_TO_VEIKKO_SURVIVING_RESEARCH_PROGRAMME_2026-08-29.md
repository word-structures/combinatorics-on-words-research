# PAPER4_TO_VEIKKO_SURVIVING_RESEARCH_PROGRAMME_2026-08-29

## Surviving Tracks Ranked by Viability

### R1. Record-Word Macro-Structure Mining
**Mathematical question:** Can empirically discovered long record words (e.g., length > 2000) be uniquely factored into a small candidate block alphabet and an infinite transition system?
**Why Paper 4 helps:** Once a transition system is conjectured, Paper 4 provides the exact geometric compiler to turn the infinite Abelian-square constraint checking into a finite, rigorous affine verification problem.
**Missing theorem:** A formal theorem that proves the transition DAG extracted from the finite record word correctly extrapolates to an infinite generator.
**Cheapest falsification experiment:** Chunk 
ecord_word_2500_pure.txt at varying L (4..80) and measure if the empirical block alphabet size collapses compared to random valid strings. If no collapse occurs, the record word lacks exploitable macroscopic structure.
**Value to record hunting:** High. Bridges the gap between empirical discovery and formal mathematical proof of morphisms.
**Standalone-paper value:** Very High. Demonstrating an automated pipeline from raw characters to discovered morphism would be a major combinatorial result.

### R2. Restricted Macro-Alphabet Record Hunter
**Mathematical question:** Does there exist an infinite sequence over a heavily restricted subset of aa2fr macro-blocks (e.g., L=40) that avoids all Abelian squares?
**Why Paper 4 helps:** The 19 families restrict the K >= 2L search space, turning the problem into a macroscopic constraint satisfaction problem rather than a letter-by-letter string matching problem.
**Missing theorem:** No theorem guarantees that a restricted subset of blocks *can* form an infinite word. The search space might be artificially constrained to a dead end.
**Cheapest falsification experiment:** Run a DFS using only the 137 positive AFE targets as the block alphabet and measure the maximum depth reached before exhaustion.
**Value to record hunting:** High. It could leapfrog the letter-by-letter DFS barrier by searching directly in L-sized jumps.
**Standalone-paper value:** High, if it successfully generates a record length word that eclipses current limits.

### R3. Paper-4 Schema-Aware SAT/SMT/ILP Encoding
**Mathematical question:** Does encoding the Abelian square constraints as integer affine equations (via the 19 support families) yield faster solver times than naive Boolean substring comparisons?
**Why Paper 4 helps:** Replaces the need for O(N^2) Boolean adders with native solver arithmetic constraints bounded by macro-geometry.
**Missing theorem:** None required for empirical benchmarking, but formally quantifying the exact clause/variable reduction requires formal bounds on the instantiated constraint schemas.
**Cheapest falsification experiment:** Implement a minimal N=200 SMT(LIA) encoding using both the naive string model and the Paper-4 schema model, and compare solver memory and time-to-first-solution.
**Value to record hunting:** Moderate. Solvers historically struggle with the density of Abelian square constraints, but if this encoding changes the empirical solver performance, it could automate finite record hunting.
**Standalone-paper value:** Moderate. Primarily a computational/algorithmic optimization paper.

### R4. Exact Transfer Pruning Under a Restricted Continuation Class
**Mathematical question:** If the DFS future is restricted to a specific symbolic class (e.g., bounded Parikh profiles or dictionary of suffixes), does Paper 4 yield a necessary, early-pruning condition?
**Why Paper 4 helps:** It maps the known prefix algebraically to a required future target. If the future is restricted, the target may become provably unreachable long before a local violation occurs.
**Missing theorem:** A mathematically rigorous definition of a "restricted continuation class" that is small enough to allow algebraic pruning but large enough to contain valid infinite words.
**Cheapest falsification experiment:** Restrict the DFS to only allow continuations that match the empirical profile frequency of known long record words. Test if Paper 4's affine equations can prune states that the exact checker allows.
**Value to record hunting:** Moderate. It could drastically reduce DFS branching factor, but relies heavily on the correctness of the restriction.
**Standalone-paper value:** Low to Moderate. 

### R5. Finite-State / Continuation-Equivalence Theory
**Mathematical question:** Is the language of valid aa2fr future continuations regular, or does it strictly require infinite memory? Can states with equivalent continuation languages be compressed?
**Why Paper 4 helps:** The 19 families provide a structured way to categorize the geometric "threats" a state projects into the future.
**Missing theorem:** A formal proof (e.g., using the Pumping Lemma or Myhill-Nerode theorem) that the number of equivalence classes of valid continuations is infinite.
**Cheapest falsification experiment:** Generate the exact valid continuation trees up to depth 40 for two prefixes that share the same 19-family signature and bounded history. If their continuation trees differ, simple equivalence fails.
**Value to record hunting:** Low for direct operational speedup, as state compression has already failed in bounded prototypes.
**Standalone-paper value:** High. A formal proof that aa2fr continuation languages are strictly non-regular would be a significant theoretical contribution to combinatorics on words.

## FINAL VERDICT
**C. STRUCTURE-DISCOVERY PROGRAMME PROMISING**
