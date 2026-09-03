const fs = require('fs');
const crypto = require('crypto');
function hashFile(p) {
    if(!fs.existsSync(p)) return "MISSING";
    return crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
}
const manifestPath = 'C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/paper4-repro-replay-2026-08-29/PAPER4_REPRODUCIBILITY_MANIFEST_2026-08-29.json';
let manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

manifest[0].replay_output = "scratch\\paper4-repro-replay-2026-08-29\\sixdomain_full_output.txt";
manifest[0].replay_output_sha256 = hashFile("C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/" + manifest[0].replay_output);

manifest[1].replay_output = "scratch\\paper4-repro-replay-2026-08-29\\impl_semantics_output.txt";
manifest[1].replay_output_sha256 = hashFile("C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/" + manifest[1].replay_output);

manifest[2].replay_output = "scratch\\paper4-repro-replay-2026-08-29\\rx_h_matched_output.txt";
manifest[2].replay_output_sha256 = hashFile("C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/" + manifest[2].replay_output);

manifest[3].replay_output = "scratch\\paper4-repro-replay-2026-08-29\\afe_263_run_output.txt";
manifest[3].replay_output_sha256 = hashFile("C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/" + manifest[3].replay_output);

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log("Replay outputs added.");
