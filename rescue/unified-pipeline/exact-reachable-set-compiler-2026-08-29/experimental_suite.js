// experimental_suite.js — TASK 1 through TASK 5
// Unified experimental evidence script for prefix-Parikh research line
// Deterministic: no Math.random(). All randomness uses a seeded PRNG.
const fs = require('fs');
const crypto = require('crypto');
const { mapWindow, getParikh } = require('./dynamic_topology_mapper.js');
const { compileSignatureReachableSet } = require('./reachable_set_compiler.js');

const OUTDIR = __dirname + '/hostile_referee_2026_08_29/';

// ============================================================
// SEEDED PRNG (xorshift128+)
// ============================================================
function mkPrng(seed) {
    let s0 = 0x12345678 ^ seed;
    let s1 = 0x9ABCDEF0 ^ (seed << 13);
    return function() {
        let x = s0, y = s1;
        s0 = y;
        x ^= (x << 23) | 0;
        x ^= (x >> 17) | 0;
        x ^= (y ^ (y >> 26)) | 0;
        s1 = x;
        return ((x + y) >>> 0) / 4294967296;
    };
}

// ============================================================
// BASELINE DATA
// ============================================================
const H6 = { a: 'ace', b: 'adf', c: 'bdf', d: 'bdc', e: 'afe', f: 'bce' };
function generateH6(iterations) {
    let src = "a";
    for (let i = 0; i < iterations; i++) {
        let n = "";
        for (let c of src) n += H6[c];
        src = n;
    }
    return src;
}

const sourceString = generateH6(6);
const sourceRoles = sourceString.split('');
console.log("Source roles length:", sourceRoles.length); // 729

// ============================================================
// TASK 1: FREEZE AND REPAIR BASELINES
// ============================================================
console.log("\n=== TASK 1: FREEZE AND REPAIR ===");

// DEFECT AUDIT of existing scripts:
//
// 1. sandbox_phase1_scaling.js (lines 22-37):
//    profiles = { a: [2,1,2], b: [1,2,2], c: [2,2,1], d: [3,1,1], e: [1,3,1], f: [1,1,3] }
//    concreteBlocksDict = { a: "00122", b: "01221", c: "01122", d: "00012", e: "01112", f: "01222" }
//    
//    CHECK: Does getParikh(concreteBlocksDict[r]) == profiles[r] for resolved roles?
//    a: "00122" -> [2,1,2] ✓
//    b: "01221" -> [1,2,2] ✓
//    c: "01122" -> [1,2,2] — BUT profiles.c = [2,2,1]. MISMATCH!
//    d: "00012" -> [3,1,1] ✓
//    e: "01112" -> [1,3,1] ✓
//    f: "01222" -> [1,1,3] ✓
//
// 2. profile_feasibility_engine.js:
//    Uses only profiles (no concrete blocks), so no profile/block mismatch possible.
//    But uses Math.random() — not deterministic. DEFECT for reproducibility.
//
// 3. microbenchmark.js:
//    Uses hand-crafted sourceRolesPool and concreteBlocks, not h6.
//    concreteBlocks are fixed literal strings, profiles are only for the unresolved role.
//    No profile/block mismatch for the unresolved role (rho = [2,1,2] matches the test).

// Verify the profile/block mismatch for role c:
const concreteBlocksDict_old = {
    a: "00122", b: "01221", c: "01122", d: "00012", e: "01112", f: "01222"
};
const profiles_old = {
    a: [2, 1, 2], b: [1, 2, 2], c: [2, 2, 1], d: [3, 1, 1], e: [1, 3, 1], f: [1, 1, 3]
};

let defects = [];
for (let r of Object.keys(concreteBlocksDict_old)) {
    let actual = getParikh(concreteBlocksDict_old[r]);
    let declared = profiles_old[r];
    let match = actual[0] === declared[0] && actual[1] === declared[1] && actual[2] === declared[2];
    if (!match) {
        defects.push({
            role: r,
            declared_profile: declared,
            actual_block_parikh: actual,
            block: concreteBlocksDict_old[r]
        });
    }
}

console.log("Profile/block defects found:", defects.length);
for (let d of defects) console.log("  DEFECT:", JSON.stringify(d));

// CORRECTED data: blocks must match profiles.
// For role c with profile [2,2,1], a valid block would be "00112" (Parikh [2,2,1])
const profiles = {
    a: [2, 1, 2], b: [1, 2, 2], c: [2, 2, 1], d: [3, 1, 1], e: [1, 3, 1], f: [1, 1, 3]
};
const concreteBlocksDict = {
    a: "00122", b: "01221", c: "00112", d: "00012", e: "01112", f: "01222"
};
// Verify correction:
for (let r of Object.keys(concreteBlocksDict)) {
    let actual = getParikh(concreteBlocksDict[r]);
    let declared = profiles[r];
    if (actual[0] !== declared[0] || actual[1] !== declared[1] || actual[2] !== declared[2]) {
        throw new Error(`STILL MISMATCHED: role ${r}`);
    }
}

const L = 5;
const compiledData = JSON.parse(fs.readFileSync(__dirname + '/compiled_sets.json'));
const Ldata = compiledData[L];
const catalogueData = JSON.parse(fs.readFileSync('C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/claude-intake/_paper4-master-closure-2026-08-29/runs/sixdomain_full.json')).table;
const rowToClass = new Map();
for (let row of catalogueData) { rowToClass.set(row.domain + "|" + row.roleMask, row.classId); }

const unresolvedRole = 'a';
const rho = profiles[unresolvedRole];

// Helper: look up reachable set for a mapped window result
function lookupReachableSet(res) {
    let chiStr = res.chi.join('');
    let cid = rowToClass.get(res.domain + "|" + chiStr);
    if (cid === undefined || !Ldata[cid]) return null;
    let rhoKey = rho.join(',');
    let sigList = Ldata[cid][rhoKey];
    if (!sigList) return null;
    let sigStr = res.sigma.map(x => x.d + ':' + x.a).join('|');
    if (sigStr === "") sigStr = "0:0";
    for (let s of sigList) {
        if (s.signature === sigStr || (sigStr === "0:0" && s.signature === "")) {
            return s.reachable;
        }
    }
    return null;
}

function isLayerDSafe(res) {
    let rs = lookupReachableSet(res);
    if (!rs) return false;
    let minusTStr = res.t.map(x => -x).join(',');
    return !rs.includes(minusTStr);
}

// Re-run Phase 1 scaling with corrected blocks
console.log("Re-running Phase 1 scaling with corrected profiles...");
let old_stats = { total: 0, safe: 0, k_ranges: {} };
let new_stats = { total: 0, safe: 0, k_ranges: {} };

for (let K = 10; K <= 100; K++) {
    let k_group = Math.floor(K / 10) * 10;
    if (!old_stats.k_ranges[k_group]) old_stats.k_ranges[k_group] = { total: 0, safe: 0 };
    if (!new_stats.k_ranges[k_group]) new_stats.k_ranges[k_group] = { total: 0, safe: 0 };

    for (let u = 0; u < L; u++) {
        for (let start_idx = 0; start_idx < 100; start_idx++) {
            let m2 = start_idx + Math.floor((u + 2 * K) / L);
            if (m2 >= sourceRoles.length) continue;

            let windowRoles = sourceRoles.slice(start_idx, m2 + 1);

            // OLD (buggy blocks)
            let oldBlocks = windowRoles.map(r => concreteBlocksDict_old[r]);
            let oldRes = mapWindow({ L, start: u, K, sourceRoles: windowRoles, concreteBlocks: oldBlocks, unresolvedRole, rho });
            let oldSafe = isLayerDSafe(oldRes);
            old_stats.total++;
            old_stats.k_ranges[k_group].total++;
            if (oldSafe) { old_stats.safe++; old_stats.k_ranges[k_group].safe++; }

            // NEW (corrected blocks)
            let newBlocks = windowRoles.map(r => concreteBlocksDict[r]);
            let newRes = mapWindow({ L, start: u, K, sourceRoles: windowRoles, concreteBlocks: newBlocks, unresolvedRole, rho });
            let newSafe = isLayerDSafe(newRes);
            new_stats.total++;
            new_stats.k_ranges[k_group].total++;
            if (newSafe) { new_stats.safe++; new_stats.k_ranges[k_group].safe++; }
        }
    }
}

let baselineReport = `# EXPERIMENTAL BASELINE FREEZE
**Date:** 2026-08-29
**Script:** experimental_suite.js

## 1. Defects Found in Prior Scripts

### Defect 1: Profile/Block Mismatch (sandbox_phase1_scaling.js)
- **Role c:** declared profile [2,2,1], actual block "01122" has Parikh [1,2,2].
- **Impact:** All t-vector computations for windows crossing a resolved role-c block were incorrect.
- **Correction:** Changed block for role c from "01122" to "00112" (Parikh [2,2,1]).

### Defect 2: Non-deterministic PRNG (profile_feasibility_engine.js)
- Used Math.random() without seed. Results not reproducible.
- **Correction:** All experiments in this suite use seeded xorshift128+ PRNG (seed=42).

## 2. Corrected Baseline Comparison

### Old (buggy) vs New (corrected) Phase 1 Scaling
| K Range | Old Safe% | New Safe% | Difference |
| :--- | :--- | :--- | :--- |
`;

for (let k of Object.keys(old_stats.k_ranges).sort((a, b) => a - b)) {
    let oldPct = ((old_stats.k_ranges[k].safe / old_stats.k_ranges[k].total) * 100).toFixed(1);
    let newPct = ((new_stats.k_ranges[k].safe / new_stats.k_ranges[k].total) * 100).toFixed(1);
    let diff = (parseFloat(newPct) - parseFloat(oldPct)).toFixed(1);
    baselineReport += `| ${k}-${parseInt(k) + 9} | ${oldPct}% | ${newPct}% | ${diff >= 0 ? '+' : ''}${diff}pp |\n`;
}

baselineReport += `
### Totals
- **Old:** ${old_stats.safe}/${old_stats.total} safe (${((old_stats.safe / old_stats.total) * 100).toFixed(1)}%)
- **New:** ${new_stats.safe}/${new_stats.total} safe (${((new_stats.safe / new_stats.total) * 100).toFixed(1)}%)

## 3. Frozen Parameters
- **Source:** h6^6(a), length ${sourceRoles.length} roles
- **L:** ${L}
- **Alphabet size:** 3 (characters 0,1,2)
- **Unresolved role:** '${unresolvedRole}', profile [${rho}]
- **Profiles:** ${JSON.stringify(profiles)}
- **Concrete blocks:** ${JSON.stringify(concreteBlocksDict)}
- **PRNG seed:** 42
- **K range:** 10..100
- **Start positions:** 0..99
- **Offsets u:** 0..${L - 1}
`;

fs.writeFileSync(OUTDIR + 'EXPERIMENTAL_BASELINE_FREEZE.md', baselineReport);
console.log("Task 1 done. Old safe:", old_stats.safe, "New safe:", new_stats.safe);


// ============================================================
// TASK 2: MEASURE ACTIVE CUTPOINT COMPLEXITY
// ============================================================
console.log("\n=== TASK 2: CUTPOINT DEPTH SCALING ===");

let cutpointData = {};

for (let testL of [5, 6, 8, 10, 12]) {
    console.log("  L =", testL);
    cutpointData[testL] = {};

    for (let K = 2; K <= Math.min(3 * testL, 50); K++) {
        let depth_counts = []; // D_r for each block position

        // Sample 50 block positions in h6 sequence
        for (let blockPos = 0; blockPos < Math.min(50, sourceRoles.length); blockPos++) {
            let relevantDepths = new Set();

            // Find all windows that touch this block
            // A window with half-period K starting at offset u in block start_idx
            // touches blocks start_idx through start_idx + m2.
            // We want all windows where blockPos is in [start_idx, start_idx + m2].
            for (let u = 0; u < testL; u++) {
                let m2_val = Math.floor((u + 2 * K) / testL);
                // The window starting at some start_idx touches blocks start_idx..start_idx+m2_val
                // For blockPos to be touched: start_idx <= blockPos <= start_idx + m2_val
                // => blockPos - m2_val <= start_idx <= blockPos
                for (let start_idx = Math.max(0, blockPos - m2_val); start_idx <= blockPos; start_idx++) {
                    if (start_idx + m2_val >= sourceRoles.length) continue;
                    // Which cutpoint(s) of this window fall in blockPos?
                    let m1_val = Math.floor((u + K) / testL);
                    let cutpoints = [
                        { block: start_idx + 0, depth: u },
                        { block: start_idx + m1_val, depth: (u + K) % testL },
                        { block: start_idx + m2_val, depth: (u + 2 * K) % testL }
                    ];
                    for (let cp of cutpoints) {
                        if (cp.block === blockPos && cp.depth > 0 && cp.depth < testL) {
                            // Only if this block is the unresolved role
                            if (sourceRoles[blockPos] === unresolvedRole) {
                                relevantDepths.add(cp.depth);
                            }
                        }
                    }
                }
            }
            if (sourceRoles[blockPos] === unresolvedRole) {
                depth_counts.push(relevantDepths.size);
            }
        }

        if (depth_counts.length > 0) {
            depth_counts.sort((a, b) => a - b);
            let sum = depth_counts.reduce((a, b) => a + b, 0);
            cutpointData[testL][K] = {
                n: depth_counts.length,
                min: depth_counts[0],
                median: depth_counts[Math.floor(depth_counts.length / 2)],
                mean: parseFloat((sum / depth_counts.length).toFixed(2)),
                p90: depth_counts[Math.floor(depth_counts.length * 0.9)],
                max: depth_counts[depth_counts.length - 1],
                D_r_over_L: {
                    min: parseFloat((depth_counts[0] / testL).toFixed(3)),
                    median: parseFloat((depth_counts[Math.floor(depth_counts.length / 2)] / testL).toFixed(3)),
                    mean: parseFloat(((sum / depth_counts.length) / testL).toFixed(3)),
                    p90: parseFloat((depth_counts[Math.floor(depth_counts.length * 0.9)] / testL).toFixed(3)),
                    max: parseFloat((depth_counts[depth_counts.length - 1] / testL).toFixed(3))
                }
            };
        }
    }
}

fs.writeFileSync(OUTDIR + 'CUTPOINT_DEPTH_SCALING.json', JSON.stringify(cutpointData, null, 2));
console.log("Task 2 done.");


// ============================================================
// TASK 3: SMALL-L JOINT PREFIX-PARIKH ORACLE
// ============================================================
console.log("\n=== TASK 3: JOINT PREFIX-PARIKH ORACLE ===");

function generateAllWords(L_val, rho_val) {
    let chars = "";
    for (let i = 0; i < 3; i++) chars += i.toString().repeat(rho_val[i]);
    let words = new Set();
    function permute(arr, l, r) {
        if (l === r) { words.add(arr.join('')); return; }
        let used = new Set();
        for (let i = l; i <= r; i++) {
            if (used.has(arr[i])) continue;
            used.add(arr[i]);
            [arr[l], arr[i]] = [arr[i], arr[l]];
            permute([...arr], l + 1, r);
            [arr[l], arr[i]] = [arr[i], arr[l]];
        }
    }
    permute(chars.split(''), 0, chars.length - 1);
    return Array.from(words);
}

// For Task 3, we test L=5 (and L=6 if feasible).
// We pick a small number of concrete windows and compare literal vs CSP solutions.

let oracleReport = `# JOINT PREFIX-PARIKH ORACLE REPORT
**Date:** 2026-08-29

## Methodology
For each test window:
- **Literal pass (A):** Enumerate all words with profile ρ. For each word, compute
  σ(prefix Parikh vectors) + t and check if it equals 0.
- **CSP pass (B):** Enumerate all monotone prefix-Parikh chains Y_0=0, Y_{d1}, ..., Y_L=ρ
  satisfying |Y_d|₁ = d and 0 ≤ Y_{d1} ≤ ... ≤ ρ componentwise.
  For each chain, evaluate σ(Y) + t and check if it equals 0.
- **Compare:** The set of σ(X)+t values reachable by literal words must equal
  those reachable by valid chains. Any discrepancy is a STOP condition.

## Results
`;

let counterexamples = [];
let oracleTotals = { literal_solution_count: 0, csp_solution_count: 0, literal_only: 0, csp_only: 0, windows_tested: 0 };

for (let testL of [5, 6]) {
    let testRho = testL === 5 ? [2, 1, 2] : [2, 2, 2];
    let allWords = generateAllWords(testL, testRho);
    console.log(`  L=${testL}, rho=[${testRho}], ${allWords.length} words`);

    // Generate a controlled set of windows
    // Use actual h6 windows at multiple K values
    let windowsToTest = [];
    for (let K = 2; K <= Math.min(15, 3 * testL); K++) {
        for (let u = 0; u < testL; u++) {
            for (let start_idx = 0; start_idx < 5; start_idx++) {
                let m2 = start_idx + Math.floor((u + 2 * K) / testL);
                if (m2 >= sourceRoles.length) continue;
                let m1 = start_idx + Math.floor((u + K) / testL);

                let windowRoles = sourceRoles.slice(start_idx, m2 + 1);
                // Only test windows where the unresolved role appears
                if (!windowRoles.some(r => r === unresolvedRole)) continue;

                // Use corrected blocks for resolved roles
                let testBlocks = windowRoles.map(r => concreteBlocksDict[r]);

                let res = mapWindow({ L: testL, start: u, K, sourceRoles: windowRoles, concreteBlocks: testBlocks, unresolvedRole, rho: testRho });
                if (res.sigma.length === 0 && res.chi.every(c => c === 0)) continue; // trivial

                windowsToTest.push({ L: testL, u, K, start_idx, m1, m2, res, testBlocks, windowRoles });
                if (windowsToTest.length >= 200) break;
            }
            if (windowsToTest.length >= 200) break;
        }
        if (windowsToTest.length >= 200) break;
    }

    console.log(`  Testing ${windowsToTest.length} windows...`);

    for (let w of windowsToTest) {
        oracleTotals.windows_tested++;

        // LITERAL PASS: which words make σ(X)+t = 0?
        let literalSolutions = new Set();
        for (let word of allWords) {
            let sigEval = [0, 0, 0];
            for (let term of w.res.sigma) {
                let prefix = word.substring(0, term.d);
                let pPrefix = getParikh(prefix);
                for (let i = 0; i < 3; i++) sigEval[i] += term.a * pPrefix[i];
            }
            let isSquare = true;
            for (let i = 0; i < 3; i++) {
                if (w.res.t[i] + sigEval[i] !== 0) { isSquare = false; break; }
            }
            if (isSquare) literalSolutions.add(word);
        }

        // CSP PASS: enumerate valid prefix-Parikh chains
        // Depths from the signature
        let depths = w.res.sigma.map(term => term.d).filter(d => d > 0 && d < w.L);
        depths = [...new Set(depths)].sort((a, b) => a - b);

        let cspSolutionChains = 0;
        // Build the chains by enumerating prefix Parikh vectors at each depth
        function enumerateChains(depthIdx, prevVec, evalSoFar) {
            if (depthIdx === depths.length) {
                // Check: can we complete from prevVec to testRho?
                let remaining = w.L - (prevVec[0] + prevVec[1] + prevVec[2]);
                let diff = [w.res.rho || testRho];
                let canComplete = true;
                for (let i = 0; i < 3; i++) {
                    if (prevVec[i] > testRho[i]) { canComplete = false; break; }
                }
                if (remaining < 0) canComplete = false;
                if (!canComplete) return;

                // Check if σ(chain) + t = 0
                let isSquare = true;
                for (let i = 0; i < 3; i++) {
                    if (w.res.t[i] + evalSoFar[i] !== 0) { isSquare = false; break; }
                }
                if (isSquare) cspSolutionChains++;
                return;
            }

            let d = depths[depthIdx];
            let prevSum = prevVec[0] + prevVec[1] + prevVec[2];
            let segLen = d - prevSum; // This is wrong — should be d minus previous depth's value
            // Actually |Y_d|_1 = d, and prevVec had |prevVec|_1 = prevDepth.
            // So we need exactly segLen = d - prevDepthValue characters.
            let prevDepth = depthIdx === 0 ? 0 : depths[depthIdx - 1];
            segLen = d - prevDepth;

            // Enumerate all vectors Y_d such that:
            // Y_d >= prevVec componentwise
            // |Y_d|_1 = d
            // Y_d <= testRho componentwise
            for (let a = prevVec[0]; a <= Math.min(testRho[0], prevVec[0] + segLen); a++) {
                for (let b = prevVec[1]; b <= Math.min(testRho[1], prevVec[1] + segLen - (a - prevVec[0])); b++) {
                    let c = d - a - b;
                    if (c < prevVec[2] || c > testRho[2]) continue;
                    let newVec = [a, b, c];

                    // Get coefficient for this depth
                    let coeff = 0;
                    for (let term of w.res.sigma) {
                        if (term.d === d) coeff += term.a;
                    }
                    let newEval = [...evalSoFar];
                    for (let i = 0; i < 3; i++) newEval[i] += coeff * newVec[i];

                    enumerateChains(depthIdx + 1, newVec, newEval);
                }
            }
        }

        enumerateChains(0, [0, 0, 0], [0, 0, 0]);

        oracleTotals.literal_solution_count += literalSolutions.size;
        oracleTotals.csp_solution_count += cspSolutionChains;

        // Compare: literal solutions => CSP chains should be >= literal (since multiple words
        // can map to the same chain). But every literal solution's chain must be in the CSP set,
        // and every CSP chain must be realizable by some literal word.
        // The correct comparison is: does the set of achievable σ-values match?
        // A literal solution exists iff a CSP chain with σ(Y)+t=0 exists.
        // So: literalSolutions.size > 0  iff  cspSolutionChains > 0.
        let literalHas = literalSolutions.size > 0;
        let cspHas = cspSolutionChains > 0;

        if (literalHas && !cspHas) {
            oracleTotals.literal_only++;
            counterexamples.push({
                L: w.L, K: w.K, u: w.u, start_idx: w.start_idx,
                sigma: w.res.sigma, t: w.res.t,
                literal_count: literalSolutions.size,
                csp_count: cspSolutionChains,
                issue: "LITERAL_ONLY"
            });
        }
        if (cspHas && !literalHas) {
            oracleTotals.csp_only++;
            counterexamples.push({
                L: w.L, K: w.K, u: w.u, start_idx: w.start_idx,
                sigma: w.res.sigma, t: w.res.t,
                literal_count: literalSolutions.size,
                csp_count: cspSolutionChains,
                issue: "CSP_ONLY"
            });
        }
    }

    oracleReport += `### L = ${testL}, ρ = [${testRho}]
- Words tested: ${allWords.length}
- Windows tested: ${windowsToTest.length}
- Literal solutions (total): ${oracleTotals.literal_solution_count}
- CSP chain solutions (total): ${oracleTotals.csp_solution_count}
- Literal-only (STOP if > 0): ${oracleTotals.literal_only}
- CSP-only (STOP if > 0): ${oracleTotals.csp_only}

`;
    windowsToTest.length = 0; // reset for next L
}

oracleReport += `## Verdict
- **Total windows tested:** ${oracleTotals.windows_tested}
- **literal_only:** ${oracleTotals.literal_only}
- **csp_only:** ${oracleTotals.csp_only}
`;

if (oracleTotals.literal_only > 0 || oracleTotals.csp_only > 0) {
    oracleReport += `\n> **STOP CONDITION TRIGGERED.** See counterexamples file.\n`;
} else {
    oracleReport += `\n> **No discrepancies found.** Literal and CSP feasibility agree on all tested windows.\n`;
}

fs.writeFileSync(OUTDIR + 'JOINT_PREFIX_PARIKH_ORACLE_REPORT.md', oracleReport);
fs.writeFileSync(OUTDIR + 'JOINT_PREFIX_PARIKH_COUNTEREXAMPLES.json', JSON.stringify(counterexamples, null, 2));
console.log("Task 3 done. literal_only:", oracleTotals.literal_only, "csp_only:", oracleTotals.csp_only);


// ============================================================
// TASK 4: SCALING DATA
// ============================================================
console.log("\n=== TASK 4: H6 BULK VS REACHABLE SCALING ===");

let csvRows = ["K,start_idx,u,domain,chi,sig_str,t_norm,t_max_abs,rs_size,rs_coord_radius,safe_elision,danger_zone"];

for (let K = 2; K <= 100; K += (K < 20 ? 1 : 5)) {
    for (let u = 0; u < L; u++) {
        for (let start_idx = 0; start_idx < 50; start_idx++) {
            let m2 = start_idx + Math.floor((u + 2 * K) / L);
            if (m2 >= sourceRoles.length) continue;

            let windowRoles = sourceRoles.slice(start_idx, m2 + 1);
            let windowBlocks = windowRoles.map(r => concreteBlocksDict[r]);
            let res = mapWindow({ L, start: u, K, sourceRoles: windowRoles, concreteBlocks: windowBlocks, unresolvedRole, rho });

            let t_norm = Math.sqrt(res.t[0] ** 2 + res.t[1] ** 2 + res.t[2] ** 2);
            let t_max_abs = Math.max(Math.abs(res.t[0]), Math.abs(res.t[1]), Math.abs(res.t[2]));

            let rs = lookupReachableSet(res);
            let rs_size = rs ? rs.length : -1;
            let rs_coord_radius = 0;
            if (rs) {
                for (let entry of rs) {
                    let vals = entry.split(',').map(Number);
                    for (let v of vals) rs_coord_radius = Math.max(rs_coord_radius, Math.abs(v));
                }
            }

            let safe = isLayerDSafe(res) ? 1 : 0;
            let chiStr = res.chi.join('');
            let sigStr = res.sigma.map(x => x.d + ':' + x.a).join('|') || 'E';

            csvRows.push(`${K},${start_idx},${u},${res.domain},${chiStr},${sigStr},${t_norm.toFixed(2)},${t_max_abs},${rs_size},${rs_coord_radius},${safe},${1 - safe}`);
        }
    }
}

fs.writeFileSync(OUTDIR + 'H6_BULK_VS_REACHABLE_SCALING.csv', csvRows.join('\n'));
console.log("Task 4 done.", csvRows.length - 1, "rows written.");


// ============================================================
// TASK 5: PROFILE MAP COMPARISON
// ============================================================
console.log("\n=== TASK 5: PROFILE MAP COMPARISON ===");

let prng = mkPrng(42);
function getSeededProfile(L_val) {
    let a = Math.floor(prng() * (L_val + 1));
    let b = Math.floor(prng() * (L_val + 1 - a));
    let c = L_val - a - b;
    return [a, b, c];
}

let profileResults = [];

for (let trial = 0; trial < 100; trial++) {
    let testProfiles = {};
    for (let r of ['a', 'b', 'c', 'd', 'e', 'f']) {
        testProfiles[r] = getSeededProfile(L);
    }
    let testRho = testProfiles[unresolvedRole];

    let stats = {
        trial,
        profiles: testProfiles,
        rho: testRho,
        certified_safe: 0,
        unresolved: 0,
        invalid_local: 0,
        coarse_safe: 0,
        exact_safe: 0,
        total: 0
    };

    for (let K = 10; K <= 50; K += 5) {
        for (let u = 0; u < L; u++) {
            for (let start_idx = 0; start_idx < 20; start_idx++) {
                let m2 = start_idx + Math.floor((u + 2 * K) / L);
                if (m2 >= sourceRoles.length) continue;

                let windowRoles = sourceRoles.slice(start_idx, m2 + 1);
                stats.total++;

                // Compute bulk t using these profiles (no literal blocks needed for coarse)
                let m1 = start_idx + Math.floor((u + K) / L);
                let t_bulk = [0, 0, 0];
                // Left half bulk: blocks 1..m1-1 (relative to start_idx)
                for (let i = start_idx + 1; i < start_idx + m1; i++) {
                    if (i >= sourceRoles.length) break;
                    let p = testProfiles[sourceRoles[i]];
                    for (let j = 0; j < 3; j++) t_bulk[j] += p[j];
                }
                // Right half bulk: blocks m1+1..m2-1
                for (let i = start_idx + m1 + 1; i < start_idx + m2; i++) {
                    if (i >= sourceRoles.length) break;
                    let p = testProfiles[sourceRoles[i]];
                    for (let j = 0; j < 3; j++) t_bulk[j] -= p[j];
                }

                // Coarse bound: safe if |t_bulk_i| > 2L for any i
                let coarse_safe = false;
                for (let i = 0; i < 3; i++) {
                    if (Math.abs(t_bulk[i]) > 2 * L) { coarse_safe = true; break; }
                }
                if (coarse_safe) stats.coarse_safe++;

                // Exact reachable-set check (only possible if we have literal blocks)
                // We need concrete blocks matching these profiles. Generate simple ones.
                // For profile [a,b,c], a valid block is "0".repeat(a) + "1".repeat(b) + "2".repeat(c)
                let testBlocks = windowRoles.map(r => {
                    let p = testProfiles[r];
                    return "0".repeat(p[0]) + "1".repeat(p[1]) + "2".repeat(p[2]);
                });

                let res = mapWindow({ L, start: u, K, sourceRoles: windowRoles, concreteBlocks: testBlocks, unresolvedRole, rho: testRho });

                // Check if profile is valid for local block (must sum to L)
                let pSum = testRho[0] + testRho[1] + testRho[2];
                if (pSum !== L) {
                    stats.invalid_local++;
                    continue;
                }

                let safe = isLayerDSafe(res);
                if (safe) stats.exact_safe++;

                if (safe) stats.certified_safe++;
                else stats.unresolved++;
            }
        }
    }

    profileResults.push(stats);
}

fs.writeFileSync(OUTDIR + 'PROFILE_MAP_SCREENING.json', JSON.stringify(profileResults, null, 2));
console.log("Task 5 done.", profileResults.length, "profile trials.");

// ============================================================
// SHA256 SUMS
// ============================================================
console.log("\n=== SHA256 SUMS ===");

let sha256sums = "";
let filesToHash = [
    __dirname + '/dynamic_topology_mapper.js',
    __dirname + '/reachable_set_compiler.js',
    __dirname + '/compiled_sets.json',
    __dirname + '/experimental_suite.js',
    'C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/claude-intake/_paper4-master-closure-2026-08-29/runs/sixdomain_full.json'
];

for (let f of filesToHash) {
    try {
        let data = fs.readFileSync(f);
        let hash = crypto.createHash('sha256').update(data).digest('hex');
        sha256sums += `${hash}  ${f}\n`;
    } catch (e) {
        sha256sums += `ERROR: ${e.message}  ${f}\n`;
    }
}

// Also hash the output files
let outputFiles = [
    'EXPERIMENTAL_BASELINE_FREEZE.md',
    'CUTPOINT_DEPTH_SCALING.json',
    'JOINT_PREFIX_PARIKH_ORACLE_REPORT.md',
    'JOINT_PREFIX_PARIKH_COUNTEREXAMPLES.json',
    'H6_BULK_VS_REACHABLE_SCALING.csv',
    'PROFILE_MAP_SCREENING.json'
];
for (let f of outputFiles) {
    try {
        let data = fs.readFileSync(OUTDIR + f);
        let hash = crypto.createHash('sha256').update(data).digest('hex');
        sha256sums += `${hash}  ${OUTDIR + f}\n`;
    } catch (e) {
        sha256sums += `ERROR: ${e.message}  ${OUTDIR + f}\n`;
    }
}

fs.writeFileSync(OUTDIR + 'SHA256SUMS.txt', sha256sums);
console.log("All tasks complete.");
console.log(sha256sums);
