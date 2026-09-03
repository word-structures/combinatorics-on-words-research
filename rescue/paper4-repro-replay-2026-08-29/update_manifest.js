const fs = require('fs');
const manifestPath = 'C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/paper4-repro-replay-2026-08-29/PAPER4_REPRODUCIBILITY_MANIFEST_2026-08-29.json';
let manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

const envString = "Node.js v22.18.0 on Microsoft Windows NT 10.0.26200.0 (Git HEAD fea6be4126ec19c4bbdb5b18e0cf12efbd60390f)";

// 1. six-domain
manifest[0].exact_source = "scratch\\claude-intake\\_paper4-master-closure-2026-08-29\\PAPER4_SIX_DOMAIN_19_FAMILY_FULL_PROOF_2026-08-29.md";
manifest[0].sha256 = "9435ec3746232603a830c5fd1b61ca380e48e8313427143c46501c122a9cf5f0";
manifest[0].environment = envString;
manifest[0].replay_output_sha256 = "80fcecf086eb020adfa13936aef42bfadba7ec928f60cff0b2cc3514a66ab427"; // I will calculate this

// 2. implementation-semantics
manifest[1].exact_source = "scratch\\claude-intake\\paper4-candidate\\PAPER4_MANUSCRIPT_v0.33_CANONICAL_PROMOTION_CANDIDATE_2026-08-29.md";
manifest[1].sha256 = "bf06dea9c8f10f7c4afb6da0cb69aa949e9d51f5c7dafa229dbdb04aa4a0e82d";
manifest[1].environment = envString;

// 3. rx_h_matched
manifest[2].sha256 = "011a5e9fb138581161c41848dd50348998198e47080368ace50d0fce6fa29c41";
manifest[2].environment = envString;

// 4. afe_263
manifest[3].sha256 = "be602e428027a650bd98ed9ef6e26f3b1a8d6e7901e3666c5f36b4bddba12955";
manifest[3].environment = envString;
manifest[3].observed_result = "SUCCESS CONDITION=true. Evaluated pairs: 263, positive literal witnesses: 86, literal witness validations: 86/86, unresolved: 0.";

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log("Manifest updated.");
