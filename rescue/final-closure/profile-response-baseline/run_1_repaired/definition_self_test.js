function codeToWord(code, len) {
  const w = new Array(len);
  for (let i = len - 1; i >= 0; i--) {
    w[i] = code % 3;
    code = Math.floor(code / 3);
  }
  return w;
}

function hasAbelianSquare(w, klo, khi) {
  const n = w.length;
  for (let K = klo; K <= khi; K++) {
    if (2*K > n) continue;
    for (let i = 0; i + 2 * K <= n; i++) {
      let da = 0, db = 0, dc = 0;
      for (let j = i; j < i + K; j++) { const c = w[j]; if (c === 0) da++; else if (c === 1) db++; else dc++; }
      for (let j = i + K; j < i + 2 * K; j++) { const c = w[j]; if (c === 0) da--; else if (c === 1) db--; else dc--; }
      if (da === 0 && db === 0 && dc === 0) return true;
    }
  }
  return false;
}

function buildOld(h) {
  const m = 2 * h - 1;
  const raw = Math.pow(3, m);
  const states = [];
  for (let code = 0; code < raw; code++) {
    if (!hasAbelianSquare(codeToWord(code, m), 2, h - 1)) {
      states.push(codeToWord(code, m));
    }
  }
  return states;
}

const states2 = buildOld(2);
if (states2.length !== 27) {
  console.log('FAMILY_DEFINITION_BREACH = YES');
  process.exit(1);
}

const states3 = buildOld(3);
let hasK1 = false;
for (let s of states3) {
  if (hasAbelianSquare(s, 1, 1)) hasK1 = true;
}
if (!hasK1) {
  console.log('FAMILY_DEFINITION_BREACH = YES');
  process.exit(1);
}

console.log('Definition self-test passed.');
