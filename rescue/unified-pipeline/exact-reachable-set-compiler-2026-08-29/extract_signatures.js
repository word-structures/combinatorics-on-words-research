// extract_signatures.js
const fs = require('fs');

function domains(L) {
  const Zs = [], Pt = [], Mt = [], Z = [], P = [], M = [];
  // q=0, (c0,c1)=(0,0): i=(a, a+r, a+2r), r=K>=2, a+2r<=L-1
  for (let a = 0; a < L; a++) for (let r = 2; a + 2 * r <= L - 1; r++) Zs.push([a, a + r, a + 2 * r]);
  // q=0, (0,1): i=(a, a+r, a+2r-L), r>=2, a+r<=L-1, a+2r>=L
  for (let a = 0; a < L; a++) for (let r = 2; r < L; r++) {
    if (a + r > L - 1) continue; const w = a + 2 * r - L;
    if (w < 0 || w > L - 1) continue; Pt.push([a, a + r, w]);
  }
  // q=0, (1,0): i=(a, a+r-L, a+2r-L), r>=2, a+r>=L, a+2r<=2L-1
  for (let a = 0; a < L; a++) for (let r = 2; r < L; r++) {
    const v = a + r - L, w = a + 2 * r - L;
    if (v < 0 || v > L - 1 || w < 0 || w > L - 1) continue; Mt.push([a, v, w]);
  }
  // full lattice domains (q>=1)
  for (let u = 0; u < L; u++) for (let v = 0; v < L; v++) {
    const wZ = 2 * v - u, wP = 2 * v - L - u, wM = 2 * v + L - u;
    if (wZ >= 0 && wZ < L) Z.push([u, v, wZ]);
    if (wP >= 0 && wP < L) P.push([u, v, wP]);
    if (wM >= 0 && wM < L) M.push([u, v, wM]);
  }
  
  // Truncate P+ / P-
  let Pt_trunc = Pt.filter(t => !(t[0]===L-2 && t[1]===L-1 && t[2]===0));
  let Mt_trunc = Mt.filter(t => !(t[0]===L-1 && t[1]===0 && t[2]===1));
  
  return { Zs, Pt: Pt_trunc, Mt: Mt_trunc, Z, P, M };
}

function getSignatures(L) {
    const D = domains(L);
    let rawTable = JSON.parse(fs.readFileSync('C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/claude-intake/_paper4-master-closure-2026-08-29/runs/sixdomain_full.json')).table;
    
    let families = {};
    for (let row of rawTable) {
        let domName = row.domain;
        let chiStr = row.roleMask;
        let chi = chiStr.split('').map(Number);
        
        let domTriples = D[domName];
        let sigsForPattern = [];
        
        for (let tr of domTriples) {
            const acc = new Map();
            const coef = [1, -2, 1];
            for (let j = 0; j < 3; j++) {
                if (!chi[j]) continue;
                const d = tr[j];
                if (d === 0) continue;
                acc.set(d, (acc.get(d) || 0) + coef[j]);
            }
            let sig = [];
            for (let [d, a] of acc.entries()) {
                if (a !== 0) sig.push({ d, a });
            }
            // Sort by depth
            sig.sort((a,b) => a.d - b.d);
            sigsForPattern.push(sig);
        }
        
        let cid = row.classId;
        if (!families[cid]) families[cid] = { name: row.className, signatures: [] };
        
        // Deduplicate signatures within the family
        for(let s of sigsForPattern) {
            let key = s.map(x => x.d + ':' + x.a).join('|');
            if(!families[cid].signatures.some(ex => ex.map(x => x.d + ':' + x.a).join('|') === key)) {
                families[cid].signatures.push(s);
            }
        }
    }
    
    return families;
}

module.exports = { getSignatures };
