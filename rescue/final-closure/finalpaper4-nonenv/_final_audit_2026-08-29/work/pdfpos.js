// Positioned-text extractor: reports (x, y, text) for each text-showing operator.
// Purpose: decide table alignment and glyph presence from the PDF itself, not from a
// reflowed text dump.
const fs = require('fs');
const zlib = require('zlib');

const buf = fs.readFileSync(process.argv[2]);
const wantPages = process.argv.slice(3).map(Number);

// --- collect all indirect objects -------------------------------------------
const objs = new Map();
{
  const s = buf.latin1Slice(0);
  const re = /(\d+)\s+(\d+)\s+obj\b/g;
  let m;
  while ((m = re.exec(s)) !== null) {
    const start = m.index + m[0].length;
    const end = s.indexOf('endobj', start);
    if (end < 0) continue;
    objs.set(Number(m[1]), { start, end, dict: s.slice(start, Math.min(end, start + 3000)) });
  }
}

function streamData(num) {
  const o = objs.get(num);
  if (!o) return null;
  const s = buf.latin1Slice(o.start, o.end);
  const si = s.indexOf('stream');
  if (si < 0) return null;
  let ds = si + 6;
  if (s[ds] === '\r') ds++;
  if (s[ds] === '\n') ds++;
  let de = s.lastIndexOf('endstream');
  if (de < 0) de = s.length;
  const raw = buf.subarray(o.start + ds, o.start + de);
  const head = s.slice(0, si);
  if (/FlateDecode/.test(head)) {
    try { return zlib.inflateSync(raw); } catch (e) {
      try { return zlib.inflateRawSync(raw.subarray(2)); } catch (e2) { return null; }
    }
  }
  return raw;
}

// --- page objects in document order -----------------------------------------
const pages = [];
for (const [num, o] of objs) {
  if (/\/Type\s*\/Page[^s]/.test(o.dict)) pages.push(num);
}
pages.sort((a, b) => a - b);

function contentsOf(pageNum) {
  const d = objs.get(pageNum).dict;
  const m = d.match(/\/Contents\s+(\d+)\s+\d+\s+R/);
  if (m) return [Number(m[1])];
  const m2 = d.match(/\/Contents\s*\[([^\]]*)\]/);
  if (m2) return [...m2[1].matchAll(/(\d+)\s+\d+\s+R/g)].map(x => Number(x[1]));
  return [];
}

// --- minimal content-stream text tracer -------------------------------------
function trace(data) {
  const s = data.latin1Slice(0);
  const out = [];
  // Tm: a b c d e f Tm  -> e,f is translation
  // Td/TD: tx ty  ; T*: newline
  let tm = [1, 0, 0, 1, 0, 0], tlm = [1, 0, 0, 1, 0, 0], leading = 0;
  const tok = s.match(/\[(?:[^\][\\]|\\.)*\]|\((?:[^)\\]|\\.)*\)|<[0-9A-Fa-f\s]*>|\/[^\s\/\[\]<>()]+|[-+]?[\d.]+|[A-Za-z'"*]+/g) || [];
  const stack = [];
  const decode = (lit) => lit
    .replace(/\\([nrtbf()\\])/g, (_, c) => ({ n: '\n', r: '\r', t: '\t', b: '\b', f: '\f' }[c] || c))
    .replace(/\\([0-7]{1,3})/g, (_, o) => String.fromCharCode(parseInt(o, 8)));
  for (const t of tok) {
    if (/^[-+]?[\d.]+$/.test(t)) { stack.push(parseFloat(t)); continue; }
    if (t.startsWith('(') || t.startsWith('[') || t.startsWith('<') || t.startsWith('/')) { stack.push(t); continue; }
    switch (t) {
      case 'BT': tm = [1, 0, 0, 1, 0, 0]; tlm = tm.slice(); break;
      case 'Tm': {
        const f = stack.slice(-6).map(Number);
        if (f.length === 6 && f.every(n => !isNaN(n))) { tm = f; tlm = f.slice(); }
        break;
      }
      case 'TD': leading = -Number(stack[stack.length - 1]); // fallthrough
      case 'Td': {
        const ty = Number(stack[stack.length - 1]), tx = Number(stack[stack.length - 2]);
        if (!isNaN(tx) && !isNaN(ty)) { tlm = [tlm[0], tlm[1], tlm[2], tlm[3], tlm[4] + tx * tlm[0] + ty * tlm[2], tlm[5] + tx * tlm[1] + ty * tlm[3]]; tm = tlm.slice(); }
        break;
      }
      case 'TL': leading = Number(stack[stack.length - 1]); break;
      case 'T*': tlm = [tlm[0], tlm[1], tlm[2], tlm[3], tlm[4] - leading * tlm[2], tlm[5] - leading * tlm[3]]; tm = tlm.slice(); break;
      case 'Tj': case "'": case '"': {
        const lit = stack[stack.length - 1];
        if (typeof lit === 'string' && lit.startsWith('(')) out.push({ x: tm[4], y: tm[5], s: decode(lit.slice(1, -1)) });
        break;
      }
      case 'TJ': {
        const arr = stack[stack.length - 1];
        if (typeof arr === 'string' && arr.startsWith('[')) {
          const parts = arr.match(/\((?:[^)\\]|\\.)*\)/g) || [];
          out.push({ x: tm[4], y: tm[5], s: parts.map(p => decode(p.slice(1, -1))).join('') });
        }
        break;
      }
    }
    if (!/^(Tf|Tc|Tw|Tz|Ts|Tr|gs|cm|q|Q|re|W|n|f|S|BT|ET)$/.test(t)) stack.length = 0;
    else if (t === 'Tf' || t === 'cm' || t === 're') stack.length = 0;
  }
  return out;
}

for (const p of wantPages) {
  const pageObj = pages[p - 1];
  console.log(`\n===== PAGE ${p} (obj ${pageObj}) =====`);
  let items = [];
  for (const c of contentsOf(pageObj)) {
    const d = streamData(c);
    if (d) items = items.concat(trace(d));
  }
  items.sort((a, b) => (b.y - a.y) || (a.x - b.x));
  for (const it of items) {
    if (!it.s.trim()) continue;
    console.log(`y=${it.y.toFixed(1).padStart(7)}  x=${it.x.toFixed(1).padStart(7)}  |${it.s}`);
  }
}
