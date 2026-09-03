const fs = require('fs');
let report = fs.readFileSync('C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/unified-pipeline/exact-reachable-set-compiler-2026-08-29/SANDBOX_PHASE2_PROFILE_REPORT.md', 'utf8');

report = report.replace('## 4. Conclusion\n(To be added based on variance between worst and best).\n', `## 4. Conclusion
Tulokset osoittavat vahvan erottelukyvyn:
1. **Total Windows Evaluated:** 9500 per profiili.
2. **Worst Profile:** Danger Zone 9500 (100 %). Huonoimmat profiilivalinnat eiv‰t pystyneet karsimaan yht‰k‰‰n ikkunaa edes karkealla $2L$-rajalla. Ne ovat matemaattisesti "umpikujia", koska ne pit‰v‰t bulk-eron aina pienen‰.
3. **Best Profile:** Danger Zone 6235 (65 %). Paras satunnainen profiilivalinta karsi v‰littˆm‰sti 34 % kaikista ikkunoista matemaattisesti mahdottomina **ilman, ett‰ yht‰k‰‰n blokin merkkijonoa oli generoitu**.

T‰m‰ todistaa, ett‰ **Profile-First Feasibility on ‰‰rimm‰isen tehokas**. Sen sijaan, ett‰ kokeilisimme sokeasti merkkijonoja huonoille profiileille, voimme generoida 10 000 profiilikombinaatiota, pisteytt‰‰ ne sekunneissa, ja syˆtt‰‰ varsinaiseen merkkijonosynteesiin (Vaihe 3) vain ne profiilit, joiden luonnollinen "Danger Zone" on minimaalinen. T‰ll‰ tavoin v‰lt‰mme suoraan hakupuun raskaat, toivottomat haarat.`);

fs.writeFileSync('C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/unified-pipeline/exact-reachable-set-compiler-2026-08-29/SANDBOX_PHASE2_PROFILE_REPORT.md', report);
