# Paper 4 — F96 Full Independent Replay Certificate

**Version 1.0 — 2026-08-27**  
**Status:** `EXACT-CHECKED + INDEPENDENTLY REPLAYED END-TO-END`

Fixed F:

```text
bbaacccaaabaaacaaabbcaabbbaaabbccaaacccb
```

## 1. Global A family

Primary exact fixed-F search:

\[
50\text{ AF-compatible A}.
\]

Independent C++ implementation:
- different traversal order;
- independent cleanliness routine;
- complete role-A profile enumeration.

Result:

\[
\boxed{50}
\]

and the exact 50-word A set equals the primary set.

Status: `PASS`.

## 2. Complete AFD-D enumeration

Primary:

\[
371\text{ complete }(A,D)\text{ records}.
\]

Independent reverse-order D implementation:

\[
\boxed{371}
\]

and the complete \((A,F,D)\) record set equals the primary set.

Status: `PASS`.

## 3. C-support

Primary:

\[
344\text{ }(A,D)\text{ records support at least one C under }AC,DC.
\]

Independent C++ C-support implementation:

\[
\boxed{344}
\]

and the exact \((A,D)\) support set equals the primary set.

Status: `PASS`.

## 4. B-support / D-bridge completeness

The 344 C-support records contain 21 distinct D words.

Primary B-support search produces

\[
325\text{ D-bridge records}.
\]

An independently written reverse-order B implementation gives:

\[
344\text{ ACD records}
\to21\text{ unique D}
\to4\text{ D with B support}
\to
\boxed{325\text{ bridge records}}.
\]

The complete bridge record set equals the primary set exactly.

Independent B DFS:

\[
96\,219\,530\text{ nodes}.
\]

Status: `PASS`.

## 5. Full C closure

Primary search:
- 325 D-bridge records;
- 48 complete role-C words after incremental \(AC,BC,DC\) pruning;
- 0 pass \(CB\);
- 0 full ABCDF.

Independent Python implementation independently reproduces:

\[
\boxed{
325\to48\to0\to0.
}
\]

Status: `PASS`.

## 6. End-to-end certificate

\[
\boxed{
50A
\to371D
\to344\text{ C-support}
\to325\text{ D-bridges}
\to48\text{ prefix-complete C}
\to0\text{ CB}
\to0\text{ ABCDF}.
}
\]

Every load-bearing stage is independently replayed.

## 7. Canonical evidence

- `PAPER4_F96_INDEPENDENT_CPP_GLOBAL_A_COMPARISON.txt`
- `PAPER4_F96_INDEPENDENT_CPP_D_COMPARISON.txt`
- `PAPER4_F96_INDEPENDENT_CPP_ACD_COMPARISON.txt`
- `PAPER4_F96_INDEPENDENT_BRIDGE_COMPARISON_v2.txt`
- `PAPER4_F96_INDEPENDENT_PYTHON_C_REPLAY.txt`

Canonical rebuilt intermediate SHA256 values:

```text
AF_A   3e9c2890502d8d721c94940bcf37d5bb7996ce0658e369d8256d22712043ad5e
AFD_D  e6b6f1e03086cb5ab5096014541c43d77597b990e494ffead8a7e0dbb30ac61b
ACD_D  4be7e05a2b3e07a831793237e0c47e53c3da37c2c301193f371ac8c3f3e9966c
```
