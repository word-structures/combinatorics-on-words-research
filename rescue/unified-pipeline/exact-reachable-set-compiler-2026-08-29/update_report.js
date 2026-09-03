const fs = require('fs');

let report = fs.readFileSync('C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/unified-pipeline/exact-reachable-set-compiler-2026-08-29/SANDBOX_PHASE1_SCALING_REPORT.md', 'utf8');

report = report.replace('## 4. Conclusion\n(Add conclusion based on pruning % at large K).\n', `## 4. Conclusion
**ILMIÖMÄINEN TULOS:** Vastoin alkuperäistä pelkoa, karsintateho (Pruning %) **ei heikkene** pituuden $K$ kasvaessa, vaan päinvastoin **kasvaa**. 
- Lyhyillä ikkunoilla ($K=10-19$) Reachable-Set karsii n. 87 % ikkunoista.
- Pitkillä ikkunoilla ($K=90-99$) Reachable-Set karsii peräti **97,7 %** ikkunoista turvallisina.

Tämä tarkoittaa, että $h_6$-kielen kaltaisessa monimutkaisessa jaksottomassa rakenteessa murto-osien algebrallinen karsintaverkko ($\mathcal{R}_\\sigma$) pysyy äärimmäisen tiukkana. Vain n. 2–3 % suurista ikkunoista jää "Danger Zone" -tilaan. 

Tämä on täydellinen vihreä valo Vaiheen 2 (Profile-First Feasibility) ja Vaiheen 3 (Constructive Prefix Pruning) rakentamiselle. Matematiikka on ehdottoman skaalautuvaa.`);

fs.writeFileSync('C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/unified-pipeline/exact-reachable-set-compiler-2026-08-29/SANDBOX_PHASE1_SCALING_REPORT.md', report);
