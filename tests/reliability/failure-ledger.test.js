const fs = require('fs');
const path = require('path');
const { validateLedger } = require('../../scripts/reliability/validate-failure-ledger.js');

const tmpDir = path.join(__dirname, 'tmp_ledger_tests');
if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);

let errors = 0;
function test(name, data, expectFail, allowEval = false) {
  const file = path.join(tmpDir, 'test.json');
  fs.writeFileSync(file, typeof data === 'string' ? data : JSON.stringify(data));
  let oldExit = process.exit;
  let oldError = console.error;
  
  let failed = false;
  process.exit = (code) => { if (code !== 0) failed = true; };
  console.error = () => {}; // suppress errors
  
  try {
    validateLedger(file, !allowEval);
  } catch (e) {
    failed = true;
  }
  
  process.exit = oldExit;
  console.error = oldError;
  
  if (failed !== expectFail) {
    console.error('Test failed: ' + name);
    errors++;
  } else {
    console.log('Test passed: ' + name);
  }
}

const baseRecord = {
  failure_id: 'FL-999',
  episode: 'Test',
  date: '2026-01-01',
  observed_symptom: 'test',
  failure_mode: 'test',
  actors: ['human'],
  triggering_conditions: ['test'],
  why_plausible: 'test',
  scientific_impact: 'test',
  epistemic_impact: 'test',
  detection_layer: 'test',
  preserved_artifacts: [],
  corrective_action: ['test'],
  defense_introduced: [],
  recurrence_test: { path: null },
  dataset_role: 'ENGINE_DESIGN_SET',
  residual_risk: 'test'
};

const baseLedger = { schema_version: '0.1', failures: [baseRecord] };

// T2 duplicate failure_id fails
test('T2 duplicate failure_id', { schema_version: '0.1', failures: [baseRecord, baseRecord] }, true);

// T3 malformed failure_id fails
test('T3 malformed failure_id', { schema_version: '0.1', failures: [{...baseRecord, failure_id: 'FL-99'}] }, true);

// T4 invalid dataset_role fails
test('T4 invalid dataset_role', { schema_version: '0.1', failures: [{...baseRecord, dataset_role: 'INVALID'}] }, true);

// T5 invalid date fails
test('T5 invalid date format', { schema_version: '0.1', failures: [{...baseRecord, date: '01-01-2026'}] }, true);

// T6 impossible calendar date fails
test('T6 impossible calendar date', { schema_version: '0.1', failures: [{...baseRecord, date: '2026-02-30'}] }, true);

// T7 invalid SHA256 fails
test('T7 invalid SHA256', { schema_version: '0.1', failures: [{...baseRecord, preserved_artifacts: [{path:'a', sha256: 'abc'}]}] }, true);

// T8 null SHA256 passes
test('T8 null SHA256 passes', { schema_version: '0.1', failures: [{...baseRecord, preserved_artifacts: [{path:'a', sha256: null}]}] }, false);

// T9 missing corrective_action fails
let copyT9 = {...baseRecord}; delete copyT9.corrective_action;
test('T9 missing corrective_action', { schema_version: '0.1', failures: [copyT9] }, true);

// T10 empty corrective_action fails
test('T10 empty corrective_action', { schema_version: '0.1', failures: [{...baseRecord, corrective_action: []}] }, true);

// T11 unknown field "blame" fails
test('T11 unknown field blame', { schema_version: '0.1', failures: [{...baseRecord, blame: 'someone'}] }, true);

// T12 invalid actor fails
test('T12 invalid actor', { schema_version: '0.1', failures: [{...baseRecord, actors: ['hacker']}] }, true);

// T13 malformed JSON fails
test('T13 malformed JSON', '{"schema_version": "0.1", "failures": [}', true);

// T14 ENGINE_EVAL_SET syntax valid isolated, but current history must contain only DESIGN_SET
test('T14 EVAL_SET allowed isolated', { schema_version: '0.1', failures: [{...baseRecord, dataset_role: 'ENGINE_EVAL_SET'}] }, false, true);
test('T14 EVAL_SET fails in real ledger default mode', { schema_version: '0.1', failures: [{...baseRecord, dataset_role: 'ENGINE_EVAL_SET'}] }, true, false);

// T15 validator does not modify the input file
const t15Content = JSON.stringify(baseLedger);
test('T15 test pass', baseLedger, false);
const t15After = fs.readFileSync(path.join(tmpDir, 'test.json'), 'utf8');
if (t15Content !== t15After) {
  console.error('T15 failed: file was modified');
  errors++;
}

// Clean up
fs.rmSync(tmpDir, { recursive: true, force: true });

// T1 real committed ledger passes
const realLedgerPath = path.join(__dirname, '../../research/reliability/failure-ledger.json');
if (fs.existsSync(realLedgerPath)) {
  let oldExit = process.exit;
  let failed = false;
  process.exit = (code) => { if (code !== 0) failed = true; };
  try { validateLedger(realLedgerPath, true); } catch (e) { failed = true; }
  process.exit = oldExit;
  if (failed) {
    console.error('T1 Real ledger failed validation');
    errors++;
  } else {
    console.log('Test passed: T1 Real ledger validation');
  }
}

if (errors > 0) {
  console.error(errors + " tests failed.");
  process.exit(1);
} else {
  console.log('All tests passed.');
}