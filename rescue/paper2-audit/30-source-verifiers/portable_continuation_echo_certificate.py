"""
Portable continuation-echo certificate helpers.

This module intentionally does NOT implement an h=4-specific graph.
It implements the generic certificate arithmetic and a portable context
signature interface.

Status: research reference implementation; not a proof verifier.
"""

from dataclasses import dataclass
from typing import Any, Callable, Hashable, Iterable, Mapping, Sequence, Tuple


@dataclass(frozen=True)
class Cell:
    mass: float
    transition_floor: float


def kernel_lower_bound(cells: Iterable[Cell], baseline_same: float) -> float:
    """Lower-bound K = P(same|target) - P(same baseline)."""
    conditional_floor = sum(c.mass * c.transition_floor for c in cells)
    return conditional_floor - baseline_same


def oriented_mechanism_strength(
    target_probability: float,
    alphabet_size: int,
    kernel_lowers: Iterable[float],
) -> float:
    """
    Certified negative-response magnitude from oriented one-endpoint placements.

    Each selected placement contributes at most
        -(2 p_G / q) K
    to A'(0).  Only positive certified K lower bounds are credited.
    """
    if alphabet_size <= 0:
        raise ValueError("alphabet_size must be positive")
    coeff = 2.0 * target_probability / alphabet_size
    return coeff * sum(max(k, 0.0) for k in kernel_lowers)


def sign_upper_bound(rest_upper: float, mechanism_lower: float) -> float:
    """A'(0) <= rest_upper - mechanism_lower."""
    return rest_upper - mechanism_lower


def certifies_negative(rest_upper: float, mechanism_lower: float) -> bool:
    return sign_upper_bound(rest_upper, mechanism_lower) < 0.0


def canonical_equality_pattern(
    suffix: Sequence[Hashable],
    reference: Hashable,
) -> Tuple[int, ...]:
    """
    Canonicalize equality relations relative to a distinguished reference.

    Label 0 is reserved for the reference color.
    New non-reference symbols receive labels 1,2,... in order of first use.
    """
    labels = {reference: 0}
    next_label = 1
    out = []
    for x in suffix:
        if x not in labels:
            labels[x] = next_label
            next_label += 1
        out.append(labels[x])
    return tuple(out)


def pex3_signature(
    context: Sequence[Hashable],
    reference: Hashable,
    alphabet: Sequence[Hashable],
    exclusion_signature: Callable[[Sequence[Hashable], Hashable], Hashable],
) -> Tuple[Any, ...]:
    """
    Frozen PEX-3 context signature.

    exclusion_signature(context, x) must return a hashable object identifying
    which baseline forbidden-pattern classes would be completed by appending x.
    """
    if len(context) < 3:
        raise ValueError("PEX-3 requires at least 3 context symbols")

    excl = tuple(exclusion_signature(context, x) for x in alphabet)
    last3 = canonical_equality_pattern(context[-3:], reference)

    if len(context) >= 4:
        fourth_is_ref = context[-4] == reference
        fourth_eq_third = context[-4] == context[-3]
    else:
        # Frozen deterministic convention for short-memory presentations.
        fourth_is_ref = False
        fourth_eq_third = False

    return (excl, last3, fourth_is_ref, fourth_eq_third)


def criterion_from_cells(
    target_probability: float,
    alphabet_size: int,
    placements: Iterable[Tuple[Iterable[Cell], float]],
    rest_upper: float,
) -> Tuple[float, float, bool]:
    """
    End-to-end arithmetic once cell masses/floors and baseline same-color
    probabilities have been independently certified.

    placements: iterable of (cells, baseline_same).
    Returns (mechanism_lower, response_upper, certifies_negative).
    """
    lowers = [
        kernel_lower_bound(cells, baseline_same)
        for cells, baseline_same in placements
    ]
    mechanism = oriented_mechanism_strength(
        target_probability, alphabet_size, lowers
    )
    upper = sign_upper_bound(rest_upper, mechanism)
    return mechanism, upper, upper < 0.0


if __name__ == "__main__":
    # Arithmetic smoke test from the current h=4 mechanism-aware certificate.
    # This does not reproduce the graph or certify the inputs.
    mechanism_lower = 0.034210298987926202
    rest_upper = 0.028130171156249308
    upper = sign_upper_bound(rest_upper, mechanism_lower)
    assert upper < 0
    print("Portable criterion arithmetic: PASS")
    print("response upper bound:", upper)
