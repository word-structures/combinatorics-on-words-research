const fs = require('fs');
let src = fs.readFileSync('run3d2.js', 'utf8');
src = src.replace("const dir = 'scratch/profile-response-baseline-h2-h7-2026-08-25/run_3d2_profile_certificate_repair';", "const dir = 'scratch/profile-response-baseline-h2-h7-2026-08-25/run_3c_durable_recovery';");

src = src.replace("DIRECT_WORD_ENUMERATOR.json", "DIRECT_WORD_PROFILE_ENUMERATION.json");
src = src.replace("GRAPH_EDGE_ENUMERATOR.json", "GRAPH_EDGE_PROFILE_ENUMERATION.json");
src = src.replace("RUN3C_ACTUAL_PROFILE_ROWS_AUDIT.json", "RUN3C_ACTUAL_PROFILE_ROWS_FINAL_AUDIT.json");

// In run3d2.js it compares against "PROFILE_BASELINE.json" in root scratch dir.
// I should make it compare against run_3c_durable_recovery/PROFILE_BASELINE_RUN3C_RECOVERED.json
src = src.replace("JSON.parse(fs.readFileSync('scratch/profile-response-baseline-h2-h7-2026-08-25/PROFILE_BASELINE.json', 'utf8'))", "JSON.parse(fs.readFileSync('scratch/profile-response-baseline-h2-h7-2026-08-25/run_3c_durable_recovery/PROFILE_BASELINE_RUN3C_RECOVERED.json', 'utf8'))");

fs.writeFileSync('run_enum.js', src);
