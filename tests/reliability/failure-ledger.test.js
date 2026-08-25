const fs = require('fs');
const path = require('path');
const { validateLedger, VALID_ACTORS, VALID_DATASET_ROLES } = require('../../scripts/reliability/validate-failure-ledger.js');

const tmpDir = path.join(__dirname, 'tmp_ledger_tests');
if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);

let errors = 0;
function test(name, data, expectFail, allowEval = false) {
  const file = path.join(tmpDir, 'test.json');
  fs.writeFileSync(file, typeof data === 'string' ? data : JSON.stringify(data));
  let oldError = console.error;
  
  let failed = false;
  console.error = () => {}; // suppress errors
  
  try {
    validateLedger(file, !allowEval);
  } catch (e) {
    if (e.name === 'ValidationError' || e instanceof SyntaxError) {
      failed = true;
    } else {
      throw e;
    }
  }
  
  console.error = oldError;
  
  if (failed !== expectFail) {
    console.error('Test failed: ' + name);
    errors++;
  } else {
    console.log('Test passed: ' + name);
  }
}

// -------------------------------------------------------------------
// SCHEMA/RUNTIME CONTRACT TESTS
// -------------------------------------------------------------------
const schemaPath = path.join(__dirname, '../../research/reliability/schemas/failure-ledger.schema.json');
const schemaStr = fs.readFileSync(schemaPath, 'utf8');
const schema = JSON.parse(schemaStr);
const failureProps = schema.properties.failures.items.properties;

const idRegex = new RegExp(failureProps.failure_id.pattern);
if (idRegex.test("FL-005") !== true) { console.error('Schema test failed: idRegex should accept FL-005'); errors++; }
if (idRegex.test("FL-05") !== false) { console.error('Schema test failed: idRegex should reject FL-05'); errors++; }
console.log('Test passed: Schema failure_id regex');

const dateRegex = new RegExp(failureProps.date.pattern);
if (dateRegex.test("2026-08-25") !== true) { console.error('Schema test failed: dateRegex should accept 2026-08-25'); errors++; }
if (dateRegex.test("25-08-2026") !== false) { console.error('Schema test failed: dateRegex should reject 25-08-2026'); errors++; }
if (dateRegex.test("2026-08-25T10:00") !== false) { console.error('Schema test failed: dateRegex should reject with time'); errors++; }
console.log('Test passed: Schema date regex');

const schemaActors = failureProps.actors.items.enum;
if (schemaActors.length !== VALID_ACTORS.length || !VALID_ACTORS.every(a => schemaActors.includes(a))) {
  console.error('Schema test failed: actors enum mismatch'); errors++;
}
console.log('Test passed: Schema actors enum');

const schemaRoles = failureProps.dataset_role.enum;
if (schemaRoles.length !== VALID_DATASET_ROLES.length || !VALID_DATASET_ROLES.every(r => schemaRoles.includes(r))) {
  console.error('Schema test failed: dataset_role enum mismatch'); errors++;
}
console.log('Test passed: Schema dataset_role enum');
// -------------------------------------------------------------------

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
  let failed = false;
  try {
    validateLedger(realLedgerPath, true);
  } catch (e) {
    if (e.name === 'ValidationError' || e instanceof SyntaxError) {
      failed = true;
    } else {
      throw e;
    }
  }
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