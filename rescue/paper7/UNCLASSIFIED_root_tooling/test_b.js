const { buildContainer } = require('./src/sft-container.js');

const c = buildContainer(6);
console.log('buildContainer(6) states:', c.states.length);
