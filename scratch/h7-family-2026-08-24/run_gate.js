const { buildContainer } = require('../../src/sft-container.js');
const t0 = process.uptime();
const container = buildContainer(7);
console.log(container.states.length);
console.log('TIME: ' + (process.uptime() - t0).toFixed(3));
