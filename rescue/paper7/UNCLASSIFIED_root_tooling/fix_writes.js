const fs = require('fs');
let src = fs.readFileSync('scratch/profile-response-baseline-h2-h7-2026-08-25/run_3c_durable_recovery/generate_run3c.js', 'utf8');

src = src.replace("fs.writeFileSync(`${OUT_DIR}/Q_PARTITION_FINAL_AUDIT.json`, JSON.stringify(q_partition_audit, null, 2));", "fs.writeFileSync(`${OUT_DIR}/Q_PARTITION_FINAL_AUDIT.json`, JSON.stringify(q_partition_audit, null, 2));\nfs.writeFileSync(`${OUT_DIR}/QV_INDEPENDENT_AUDIT.json`, JSON.stringify(qv_independent_audit, null, 2));");

src = src.replace("fs.writeFileSync(`${OUT_DIR}/VARIANCE_METHOD_A.json`, JSON.stringify(variance_method_A_audit, null, 2));\nfs.writeFileSync(`${OUT_DIR}/VARIANCE_METHOD_B.json`, JSON.stringify(variance_method_B_audit, null, 2));", "fs.writeFileSync(`${OUT_DIR}/VARIANCE_AB_FINAL_AUDIT.json`, JSON.stringify({A: variance_method_A_audit, B: variance_method_B_audit}, null, 2));");

let csvBlock = `
let csv = "h,profile,a_A,a_B,delta_A,delta_B,most_balanced,q_v\\n";
for(let r of profile_baseline_arr) {
    csv += \`\${r.h},"\${r.profile}",\${r.a_A},\${r.a_B},\${r.delta_A},\${r.delta_B},\${r.most_balanced},\${r.q_v}\\n\`;
}
fs.writeFileSync(\`\${OUT_DIR}/PROFILE_BASELINE_RUN3C_RECOVERED.csv\`, csv);
`;
src = src.replace("fs.writeFileSync(`${OUT_DIR}/PROFILE_BASELINE_RUN3C_RECOVERED.json`, JSON.stringify(profile_baseline_arr, null, 2));", "fs.writeFileSync(`${OUT_DIR}/PROFILE_BASELINE_RUN3C_RECOVERED.json`, JSON.stringify(profile_baseline_arr, null, 2));\n" + csvBlock);

fs.writeFileSync('scratch/profile-response-baseline-h2-h7-2026-08-25/run_3c_durable_recovery/generate_run3c.js', src);
console.log("Fixed writes");
