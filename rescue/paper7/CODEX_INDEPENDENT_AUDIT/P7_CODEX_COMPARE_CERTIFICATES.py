#!/usr/bin/env python3
"""Compare clean-room finite objects with the untrusted submitted package."""

from __future__ import annotations

import ast
import csv
import json
from pathlib import Path

import P7_CODEX_CLEANROOM_VERIFIER as clean


HERE = Path(__file__).resolve().parent
PACKAGE = HERE / "INNER_UNPACKED" / "P7_MAIN_THEOREM_RELEASE_v0.2"


def load_csv(name: str):
    with (PACKAGE / name).open(newline="", encoding="utf-8") as stream:
        return list(csv.DictReader(stream))


def literal_assignment(path: Path, variable: str):
    tree = ast.parse(path.read_text(encoding="utf-8"))
    for node in tree.body:
        if isinstance(node, ast.Assign):
            if any(isinstance(target, ast.Name) and target.id == variable for target in node.targets):
                return ast.literal_eval(node.value)
    raise KeyError(variable)


def main():
    seed_rows, states = clean.derive_seed_rows()
    transitions = clean.derive_transitions(states)

    submitted_states_rows = load_csv("P7_V2_RESIDUAL_STATES.csv")
    submitted_states = {
        (
            int(row["q_a"]), int(row["q_b"]), int(row["q_c"]), int(row["q_d"]),
            row["x"], row["y"],
        )
        for row in submitted_states_rows
    }
    submitted_state_ids = {
        (
            int(row["q_a"]), int(row["q_b"]), int(row["q_c"]), int(row["q_d"]),
            row["x"], row["y"],
        ): row["StateID"]
        for row in submitted_states_rows
    }

    submitted_seed_rows_raw = load_csv("P7_V2_SEED_ROWS.csv")
    submitted_seed_rows = {
        (
            int(row["start_i"]), row["mid_block_x"], int(row["mid_offset_r"]),
            row["end_block_y"], int(row["end_offset_t"]), int(row["q_a"]),
            int(row["q_b"]), int(row["q_c"]), int(row["q_d"]),
        )
        for row in submitted_seed_rows_raw
    }

    submitted_transition_rows_raw = load_csv("P7_V2_RECURSIVE_TRANSITIONS.csv")
    submitted_transitions = {
        (
            int(row["target_q_a"]), int(row["target_q_b"]),
            int(row["target_q_c"]), int(row["target_q_d"]),
            row["target_x"], row["target_y"], row["source_block_h"],
            int(row["target_x_offset_r"]), row["source_block_k"],
            int(row["target_y_offset_t"]), int(row["source_q_a"]),
            int(row["source_q_b"]), int(row["source_q_c"]),
            int(row["source_q_d"]),
        )
        for row in submitted_transition_rows_raw
    }

    clean_seed = set(seed_rows)
    clean_states = set(states)
    clean_transitions = set(transitions)
    print("P7 SUBMISSION COMPARISON")
    print("seed exact set equality:", clean_seed == submitted_seed_rows)
    print("seed missing from submission:", sorted(clean_seed - submitted_seed_rows))
    print("seed extra in submission:", sorted(submitted_seed_rows - clean_seed))
    print("seed duplicate submitted rows:", len(submitted_seed_rows_raw) - len(submitted_seed_rows))
    print("state exact set equality:", clean_states == submitted_states)
    print("states missing from submission:", sorted(clean_states - submitted_states))
    print("states extra in submission:", sorted(submitted_states - clean_states))
    print("state duplicate submitted rows:", len(submitted_states_rows) - len(submitted_states))
    print("transition exact set equality:", clean_transitions == submitted_transitions)
    print("transitions missing from submission:", sorted(clean_transitions - submitted_transitions))
    print("transitions extra in submission:", sorted(submitted_transitions - clean_transitions))
    print("transition duplicate submitted rows:", len(submitted_transition_rows_raw) - len(submitted_transitions))

    bad_state_ids = []
    for row in submitted_seed_rows_raw:
        state = (
            int(row["q_a"]), int(row["q_b"]), int(row["q_c"]), int(row["q_d"]),
            row["mid_block_x"], row["end_block_y"],
        )
        if submitted_state_ids.get(state) != row["StateID"]:
            bad_state_ids.append((row, state))
    print("seed StateID mismatches:", len(bad_state_ids))

    bad_transition_ids = []
    for row in submitted_transition_rows_raw:
        target = (
            int(row["target_q_a"]), int(row["target_q_b"]),
            int(row["target_q_c"]), int(row["target_q_d"]),
            row["target_x"], row["target_y"],
        )
        source = (
            int(row["source_q_a"]), int(row["source_q_b"]),
            int(row["source_q_c"]), int(row["source_q_d"]),
            row["source_block_h"], row["source_block_k"],
        )
        if submitted_state_ids.get(target) != row["TargetState"] or submitted_state_ids.get(source) != row["SourceState"]:
            bad_transition_ids.append((row, target, source))
    print("transition StateID mismatches:", len(bad_transition_ids))

    json_g = json.loads((PACKAGE / "G85.json").read_text(encoding="utf-8"))
    verifier_g = literal_assignment(PACKAGE / "verify_p7_main_theorem_v2.py", "G")
    manuscript_md = (PACKAGE / "P7_MANUSCRIPT_v0.2.md").read_text(encoding="utf-8")
    manuscript_tex = (PACKAGE / "P7_MANUSCRIPT_v0.2.tex").read_text(encoding="utf-8")
    print("G85 JSON equals clean-room transcription:", json_g == clean.G)
    print("submitted verifier G equals clean-room transcription:", verifier_g == clean.G)
    print("all four images occur verbatim in manuscript MD:", all(image in manuscript_md for image in clean.G.values()))
    print("all four images occur verbatim in manuscript TeX:", all(image in manuscript_tex for image in clean.G.values()))


if __name__ == "__main__":
    main()
