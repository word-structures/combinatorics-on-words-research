// Rasterize PDF pages to PNG for visual audit.
// usage: node render.js <pdf> <outdir> [pageSpec e.g. 1,5,9-10,25] [scale]
const fs = require('fs');
const path = require('path');
const napi = require('canvas');
const { createCanvas } = napi;

// pdf.js constructs Path2D/DOMMatrix from the global scope; in Node they must be
// the backend's own classes or the canvas rejects them.
if (napi.Path2D) globalThis.Path2D = napi.Path2D;
if (napi.DOMMatrix) globalThis.DOMMatrix = napi.DOMMatrix;
if (napi.ImageData) globalThis.ImageData = napi.ImageData;

async function main() {
  const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
  const [, , pdfPath, outDir, spec = 'all', scaleArg = '2.0'] = process.argv;
  const scale = parseFloat(scaleArg);
  fs.mkdirSync(outDir, { recursive: true });

  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjs.getDocument({ data, useSystemFonts: true }).promise;

  let pages;
  if (spec === 'all') {
    pages = Array.from({ length: doc.numPages }, (_, i) => i + 1);
  } else {
    pages = [];
    for (const part of spec.split(',')) {
      const m = part.match(/^(\d+)-(\d+)$/);
      if (m) for (let i = +m[1]; i <= +m[2]; i++) pages.push(i);
      else pages.push(+part);
    }
  }

  for (const n of pages) {
    if (n < 1 || n > doc.numPages) continue;
    const page = await doc.getPage(n);
    const vp = page.getViewport({ scale });
    const canvas = createCanvas(Math.ceil(vp.width), Math.ceil(vp.height));
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    await page.render({ canvasContext: ctx, viewport: vp }).promise;
    const out = path.join(outDir, `p${String(n).padStart(2, '0')}.png`);
    fs.writeFileSync(out, canvas.toBuffer('image/png'));
    console.log(`${out}  ${canvas.width}x${canvas.height}`);
  }
  console.log(`pages in document: ${doc.numPages}`);
}

main().catch(e => { console.error('RENDER FAILED:', e); process.exit(1); });
