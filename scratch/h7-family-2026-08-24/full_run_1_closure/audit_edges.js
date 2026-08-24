const fs = require('fs');

function hasAbelianSquare(w, minK, maxK) {
  const n = w.length;
  for (let K = minK; K <= maxK; K++) {
    if (2 * K > n) continue;
    for (let i = 0; i <= n - 2 * K; i++) {
      let a1 = 0, b1 = 0, c1 = 0;
      for (let j = 0; j < K; j++) {
        if (w[i + j] === 0) a1++; else if (w[i + j] === 1) b1++; else c1++;
      }
      let a2 = 0, b2 = 0, c2 = 0;
      for (let j = K; j < 2 * K; j++) {
        if (w[i + j] === 0) a2++; else if (w[i + j] === 1) b2++; else c2++;
      }
      if (a1 === a2 && b1 === b2 && c1 === c2) return true;
    }
  }
  return false;
}

function codeToWord(code, len) {
  const w = new Array(len);
  for (let i = len - 1; i >= 0; i--) {
    w[i] = code % 3;
    code = Math.floor(code / 3);
  }
  return w;
}

const raw = Math.pow(3, 13);
const states = [];
const stateIdx = new Int32Array(raw).fill(-1);
for (let code = 0; code < raw; code++) {
  if (!hasAbelianSquare(codeToWord(code, 13), 2, 6)) {
    stateIdx[code] = states.length;
    states.push(code);
  }
}

let TOTAL_CANDIDATES = 0;
let FULL_PREDICATE_ALLOWED = 0;
let OPTIMIZED_PREDICATE_ALLOWED = 0;
let K7_REJECTIONS = 0;
let INVALID_TARGET_REJECTIONS = 0;
let EQUIVALENCE_MISMATCH_COUNT = 0;

for (let i = 0; i < states.length; i++) {
  const code = states[i];
  const w13 = codeToWord(code, 13);
  const suffix = code % Math.pow(3, 12);
  
  for (let s = 0; s < 3; s++) {
    TOTAL_CANDIDATES++;
    const w14 = w13.slice();
    w14.push(s);
    
    // METHOD A: Full mathematical predicate
    const fullRejected = hasAbelianSquare(w14, 2, 7);
    const fullAllowed = !fullRejected;
    
    // METHOD B: Optimized equivalence
    const ncode = suffix * 3 + s;
    const targetValid = stateIdx[ncode] !== -1;
    
    let a1 = 0, b1 = 0, c1 = 0, a2 = 0, b2 = 0, c2 = 0;
    for (let j = 0; j < 7; j++) {
      if (w14[j] === 0) a1++; else if (w14[j] === 1) b1++; else c1++;
    }
    for (let j = 7; j < 14; j++) {
      if (w14[j] === 0) a2++; else if (w14[j] === 1) b2++; else c2++;
    }
    const k7Square = (a1 === a2 && b1 === b2 && c1 === c2);
    
    const optAllowed = targetValid && !k7Square;
    
    if (fullAllowed) FULL_PREDICATE_ALLOWED++;
    if (optAllowed) OPTIMIZED_PREDICATE_ALLOWED++;
    if (!targetValid) INVALID_TARGET_REJECTIONS++;
    if (targetValid && k7Square) K7_REJECTIONS++;
    
    if (fullAllowed !== optAllowed) {
      EQUIVALENCE_MISMATCH_COUNT++;
    }
  }
}

console.log(TOTAL_CANDIDATES =  + TOTAL_CANDIDATES);
console.log(FULL_PREDICATE_ALLOWED =  + FULL_PREDICATE_ALLOWED);
console.log(OPTIMIZED_PREDICATE_ALLOWED =  + OPTIMIZED_PREDICATE_ALLOWED);
console.log(K7_REJECTIONS =  + K7_REJECTIONS);
console.log(INVALID_TARGET_REJECTIONS =  + INVALID_TARGET_REJECTIONS);
console.log(EQUIVALENCE_MISMATCH_COUNT =  + EQUIVALENCE_MISMATCH_COUNT);
