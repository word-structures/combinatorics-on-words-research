// Rasterize PDF pages to PNG for visual audit.
// Uses node-canvas plus an explicit canvas factory so that pdf.js can allocate the
// scratch canvases it needs for transparency groups (the newer pdfTeX wraps included
// figure XObjects in one).
const fs = require('fs');
const path = require('path');
const { createCanvas, DOMMatrix, ImageData } = require('canvas');

if (DOMMatrix) globalThis.DOMMatrix = DOMMatrix;
if (ImageData) globalThis.ImageData = ImageData;

class NodeCanvasFactory {
  create(width, height) {
    const canvas = createCanvas(Math.max(1, width | 0), Math.max(1, height | 0));
    return { canvas, context: canvas.getContext('2d') };
  }
  reset(cc, width, height) {
    cc.canvas.width = Math.max(1, width | 0);
    cc.canvas.height = Math.max(1, height | 0);
  }
  destroy(cc) {
    cc.canvas.width = 0;
    cc.canvas.height = 0;
    cc.canvas = null;
    cc.context = null;
  }
}

async function main() {
  const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
  const [, , pdfPath, outDir, spec = 'all', scaleArg = '2.0'] = process.argv;
  const scale = parseFloat(scaleArg);
  fs.mkdirSync(outDir, { recursive: true });

  const factory = new NodeCanvasFactory();
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjs.getDocument({ data, useSystemFonts: true, canvasFactory: factory }).promise;

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
    const cc = factory.create(Math.ceil(vp.width), Math.ceil(vp.height));
    cc.context.fillStyle = '#ffffff';
    cc.context.fillRect(0, 0, cc.canvas.width, cc.canvas.height);
    await page.render({ canvasContext: cc.context, viewport: vp, canvasFactory: factory }).promise;
    const out = path.join(outDir, `p${String(n).padStart(2, '0')}.png`);
    fs.writeFileSync(out, cc.canvas.toBuffer('image/png'));
    console.log(`${out}  ${cc.canvas.width}x${cc.canvas.height}`);
    page.cleanup();
  }
  console.log(`pages in document: ${doc.numPages}`);
}

main().catch(e => { console.error('RENDER FAILED:', e); process.exit(1); });
