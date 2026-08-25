const fs = require('fs');

function fail(msg) {
  console.error('RELIABILITY FAILURE LEDGER INVALID\n');
  console.error(msg);
  process.exit(1);
}

function validateLedger(filePath, requireDesignSetOnly = true) {
  if (!fs.existsSync(filePath)) {
    fail('File not found: ' + filePath);
  }

  let data;
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    data = JSON.parse(raw);
  } catch (e) {
    fail('Failed to parse JSON: ' + e.message);
  }

  if (typeof data !== 'object' || data === null || Array.isArray(data)) {
    fail('Root must be a JSON object.');
  }

  // Check strict root fields
  const rootKeys = Object.keys(data);
  for (const k of rootKeys) {
    if (k !== 'schema_version' && k !== 'failures') {
      fail('Unknown root field: ' + k);
    }
  }

  if (data.schema_version !== '0.1') {
    fail('schema_version must be exactly \"0.1\".');
  }

  if (!Array.isArray(data.failures)) {
    fail('failures must be an array.');
  }

  const ids = new Set();

  for (let i = 0; i < data.failures.length; i++) {
    const f = data.failures[i];
    if (typeof f !== 'object' || f === null || Array.isArray(f)) {
      fail('Failure record at index ' + i + ' must be an object.');
    }

    const id = f.failure_id;
    if (typeof id !== 'string' || !/^FL-\d{3}$/.test(id)) {
      fail('Invalid failure_id at index ' + i + '. Must match FL-XXX.');
    }

    if (ids.has(id)) {
      fail('Duplicate failure_id: ' + id);
    }
    ids.add(id);

    // Strict fields check
    const allowed = new Set([
      'failure_id', 'episode', 'date', 'observed_symptom', 'failure_mode',
      'actors', 'triggering_conditions', 'why_plausible', 'scientific_impact',
      'epistemic_impact', 'detection_layer', 'preserved_artifacts',
      'corrective_action', 'defense_introduced', 'recurrence_test',
      'dataset_role', 'residual_risk'
    ]);

    for (const k of Object.keys(f)) {
      if (!allowed.has(k)) {
        fail(id + ':\n  field: ' + k + '\n  reason: unknown field');
      }
    }

    // Check presence and string types
    const stringFields = [
      'episode', 'observed_symptom', 'failure_mode', 'why_plausible',
      'scientific_impact', 'epistemic_impact', 'detection_layer', 'residual_risk'
    ];
    for (const sf of stringFields) {
      if (typeof f[sf] !== 'string' || f[sf].trim() === '') {
        fail(id + ':\n  field: ' + sf + '\n  reason: must be a non-empty string');
      }
    }

    // Date
    if (typeof f.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(f.date)) {
      fail(id + ':\n  field: date\n  reason: invalid format, expected YYYY-MM-DD');
    }
    const dateObj = new Date(f.date);
    if (isNaN(dateObj.getTime()) || f.date !== dateObj.toISOString().split('T')[0]) {
      fail(id + ':\n  field: date\n  reason: impossible calendar date');
    }

    // Actors
    if (!Array.isArray(f.actors) || f.actors.length === 0) {
      fail(id + ':\n  field: actors\n  reason: must be a non-empty array');
    }
    const validActors = ['human', 'AI', 'tool', 'system'];
    for (const a of f.actors) {
      if (!validActors.includes(a)) {
        fail(id + ':\n  field: actors\n  reason: unknown actor \"' + a + '\"');
      }
    }

    // Triggering conditions
    if (!Array.isArray(f.triggering_conditions) || f.triggering_conditions.length === 0) {
      fail(id + ':\n  field: triggering_conditions\n  reason: must be a non-empty array of strings');
    }
    for(const t of f.triggering_conditions) {
      if (typeof t !== 'string' || t.trim() === '') {
        fail(id + ':\n  field: triggering_conditions\n  reason: items must be non-empty strings');
      }
    }

    // Preserved artifacts
    if (!Array.isArray(f.preserved_artifacts)) {
      fail(id + ':\n  field: preserved_artifacts\n  reason: must be an array');
    }
    for (const art of f.preserved_artifacts) {
      if (typeof art !== 'object' || art === null || Array.isArray(art)) {
        fail(id + ':\n  field: preserved_artifacts\n  reason: items must be objects');
      }
      for (const k of Object.keys(art)) {
        if (k !== 'path' && k !== 'sha256') {
          fail(id + ':\n  field: preserved_artifacts\n  reason: unknown field \"' + k + '\"');
        }
      }
      if (typeof art.path !== 'string' || art.path.trim() === '') {
        fail(id + ':\n  field: preserved_artifacts\n  reason: path must be a non-empty string');
      }
      if (art.sha256 !== null) {
        if (typeof art.sha256 !== 'string' || !/^[A-Fa-f0-9]{64}$/.test(art.sha256)) {
          fail(id + ':\n  field: preserved_artifacts\n  reason: sha256 must be null or exactly 64 hex characters');
        }
      }
    }

    // Corrective action
    if (!Array.isArray(f.corrective_action) || f.corrective_action.length === 0) {
      fail(id + ':\n  field: corrective_action\n  reason: must contain at least one action');
    }
    for(const t of f.corrective_action) {
      if (typeof t !== 'string' || t.trim() === '') {
        fail(id + ':\n  field: corrective_action\n  reason: items must be non-empty strings');
      }
    }

    // Defense introduced
    if (!Array.isArray(f.defense_introduced)) {
      fail(id + ':\n  field: defense_introduced\n  reason: must be an array');
    }
    for(const t of f.defense_introduced) {
      if (typeof t !== 'string' || t.trim() === '') {
        fail(id + ':\n  field: defense_introduced\n  reason: items must be non-empty strings');
      }
    }

    // Recurrence test
    if (typeof f.recurrence_test !== 'object' || f.recurrence_test === null || Array.isArray(f.recurrence_test)) {
      fail(id + ':\n  field: recurrence_test\n  reason: must be an object');
    }
    for (const k of Object.keys(f.recurrence_test)) {
      if (k !== 'path') {
        fail(id + ':\n  field: recurrence_test\n  reason: unknown field \"' + k + '\"');
      }
    }
    if (!('path' in f.recurrence_test)) {
      fail(id + ':\n  field: recurrence_test\n  reason: missing path');
    }
    if (f.recurrence_test.path !== null && (typeof f.recurrence_test.path !== 'string' || f.recurrence_test.path.trim() === '')) {
      fail(id + ':\n  field: recurrence_test\n  reason: path must be null or non-empty string');
    }

    // Dataset role
    if (f.dataset_role !== 'ENGINE_DESIGN_SET' && f.dataset_role !== 'ENGINE_EVAL_SET') {
      fail(id + ':\n  field: dataset_role\n  reason: must be ENGINE_DESIGN_SET or ENGINE_EVAL_SET');
    }
    if (requireDesignSetOnly && f.dataset_role !== 'ENGINE_DESIGN_SET') {
      fail(id + ':\n  field: dataset_role\n  reason: current historical ledger must contain only ENGINE_DESIGN_SET');
    }
  }
}

// Parse args
const args = process.argv.slice(2);
let filePath = 'research/reliability/failure-ledger.json';
let requireDesignSetOnly = true;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--file' && i + 1 < args.length) {
    filePath = args[i + 1];
    i++;
  } else if (args[i] === '--allow-eval') {
    requireDesignSetOnly = false;
  }
}

// Only execute if not required by another module (for testing)
if (require.main === module) {
  validateLedger(filePath, requireDesignSetOnly);
  console.log('RELIABILITY FAILURE LEDGER');
  console.log('PASS  schema_version 0.1');
  console.log('PASS  ' + JSON.parse(fs.readFileSync(filePath)).failures.length + ' failure records');
  console.log('PASS  unique failure IDs');
  console.log('PASS  dataset roles');
  console.log('PASS  artifact hash syntax');
  console.log('\nALL FAILURE LEDGER CHECKS PASSED');
}

module.exports = { validateLedger };
