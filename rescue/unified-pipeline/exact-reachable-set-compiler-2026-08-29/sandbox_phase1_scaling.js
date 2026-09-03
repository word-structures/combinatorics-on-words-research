const fs = require('fs');
const { mapWindow, getParikh } = require('./dynamic_topology_mapper.js');
const compiledData = JSON.parse(fs.readFileSync('C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/unified-pipeline/exact-reachable-set-compiler-2026-08-29/compiled_sets.json'));
let catalogueData = JSON.parse(fs.readFileSync('C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/claude-intake/_paper4-master-closure-2026-08-29/runs/sixdomain_full.json')).table;
let rowToClass = new Map();
for(let row of catalogueData) { rowToClass.set(row.domain + "|" + row.roleMask, row.classId); }

const H6 = { a: 'ace', b: 'adf', c: 'bdf', d: 'bdc', e: 'afe', f: 'bce' };
let src = "a";
for(let i=0; i<6; i++) {
    let n = "";
    for(let c of src) n += H6[c];
    src = n;
}
let sourceRoles = src.split(''); // length 729
console.log("Source roles generated:", sourceRoles.length);

let L = 5;
let Ldata = compiledData[L];

// Assign random profiles that sum to L
let profiles = {
    a: [2, 1, 2],
    b: [1, 2, 2],
    c: [2, 2, 1],
    d: [3, 1, 1],
    e: [1, 3, 1],
    f: [1, 1, 3]
};
// We can use concrete blocks to generate the fractional parts for the resolved blocks.
let concreteBlocksDict = {
    a: "00122",
    b: "01221",
    c: "01122",
    d: "00012",
    e: "01112",
    f: "01222"
};

let unresolvedRole = 'a';
let rho = profiles[unresolvedRole];

let stats = {
    L: L,
    total_windows: 0,
    safe_elisions: 0,
    danger_zone: 0,
    k_ranges: {}
};

for (let K = 10; K <= 100; K++) {
    let k_group = Math.floor(K / 10) * 10;
    if (!stats.k_ranges[k_group]) stats.k_ranges[k_group] = { total: 0, safe: 0 };
    
    // We test multiple u offsets
    for (let u = 0; u < L; u++) {
        // We test multiple starting blocks to get varied windows
        for (let start_idx = 0; start_idx < 100; start_idx++) {
            let m2 = start_idx + Math.floor((u + 2 * K) / L);
            if (m2 >= sourceRoles.length) continue;
            
            let windowRoles = sourceRoles.slice(start_idx, m2 + 1);
            let windowBlocks = windowRoles.map(r => concreteBlocksDict[r]);
            
            let res = mapWindow({ L, start: u, K, sourceRoles: windowRoles, concreteBlocks: windowBlocks, unresolvedRole, rho });
            stats.total_windows++;
            stats.k_ranges[k_group].total++;
            
            let layerD_safe = false;
            let chiStr = res.chi.join('');
            let cid = rowToClass.get(res.domain + "|" + chiStr);
            if (cid !== undefined && Ldata[cid]) {
                let rhoKey = rho.join(',');
                let sigList = Ldata[cid][rhoKey];
                let rs = null;
                if (sigList) {
                    for (let s of sigList) {
                        let sigStr = res.sigma.map(x => x.d + ':' + x.a).join('|');
                        if (sigStr === "") sigStr = "0:0";
                        if (s.signature === sigStr || (sigStr === "0:0" && s.signature === "")) {
                            rs = s.reachable;
                            break;
                        }
                    }
                }
                if (rs) {
                    let minusTStr = res.t.map(x => -x).join(',');
                    if (!rs.includes(minusTStr)) {
                        layerD_safe = true;
                    }
                }
            }
            
            if (layerD_safe) {
                stats.safe_elisions++;
                stats.k_ranges[k_group].safe++;
            } else {
                stats.danger_zone++;
            }
        }
    }
}

let report = `# SANDBOX PHASE 1: SCALING BASELINE REPORT
**Date:** 2026-08-29

## 1. Experimental Setup
- **Source Sequence:** Exact $h_6$ generated up to 729 blocks.
- **L:** 5
- **K Range:** 10 to 100
- **Unresolved Role:** 'a' (Profile: ${rho.join(',')})
- **Test Strategy:** Sweeping $u \\in [0, L-1]$ and 100 different starting positions in the $h_6$ sequence for each $K$.

## 2. Global Results
- **Total Windows Evaluated:** ${stats.total_windows}
- **Safe Elisions (Pruned by Reachable-Set):** ${stats.safe_elisions} (${((stats.safe_elisions/stats.total_windows)*100).toFixed(1)}%)
- **Danger Zone Windows:** ${stats.danger_zone} (${((stats.danger_zone/stats.total_windows)*100).toFixed(1)}%)

## 3. Degradation Analysis (Scaling of K)
| K Range | Total Evaluated | Safe Elisions | Pruning % |
| :--- | :--- | :--- | :--- |
`;

for(let k in stats.k_ranges) {
    let r = stats.k_ranges[k];
    let pct = ((r.safe / r.total) * 100).toFixed(1);
    report += `| ${k} - ${parseInt(k)+9} | ${r.total} | ${r.safe} | ${pct}% |\n`;
}

report += `
## 4. Conclusion
(Add conclusion based on pruning % at large K).
`;

fs.writeFileSync('C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/unified-pipeline/exact-reachable-set-compiler-2026-08-29/SANDBOX_PHASE1_SCALING_REPORT.md', report);
console.log("Done.");
