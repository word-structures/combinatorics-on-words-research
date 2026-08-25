const fs = require('fs');
const path = require('path');

// 1. Schema
const schemaPath = path.join(__dirname, '../../research/reliability/schemas/failure-ledger.schema.json');
let schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));

schema.properties.failures.items.properties.failure_id.pattern = '^FL-\\\\d{3}$';
schema.properties.failures.items.properties.date.pattern = '^\\\\d{4}-\\\\d{2}-\\\\d{2}$';

fs.writeFileSync(schemaPath, JSON.stringify(schema, null, 2) + '\n');

// 2. README
const readmePath = path.join(__dirname, '../../research/reliability/README.md');
let readme = fs.readFileSync(readmePath, 'utf8');
readme = readme.replace(/\schemas\\/g, '\schemas/').replace(/\scripts\\/g, '\scripts/');
readme = readme.replace(/\schemas\\\\failure-ledger.schema.json\/g, '\schemas/failure-ledger.schema.json\');
readme = readme.replace(/\scripts\\\\reliability\\\\validate-failure-ledger.js\/g, '\scripts/reliability/validate-failure-ledger.js\');
// Add Actors clarification and Evidence Anchor Note
const actorClarification = "\n\n### Actors Semantics\n\nThe \ctors\ field records roles materially involved in the episode. It is NOT a blame or causal-attribution field. Detection responsibility belongs in \detection_layer\.\n";
const evidenceAnchorNote = "\n\n### Evidence Anchor Note\n\nFailure Ledger entries are historical assertions and must be reviewable against preserved repository artifacts / Git history. \preserved_artifacts\ does not mean that every historical state is stored as a current working-tree file; Git history may contain the relevant before/after evidence.\n";
readme += actorClarification + evidenceAnchorNote;

fs.writeFileSync(readmePath, readme);

console.log('Schema and README updated.');
