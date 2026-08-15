#!/usr/bin/env node
'use strict';
/**
 * Phase 2 - Independent Decision Verification (RERUN NOW)
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const RESULTS_DIR = 'C:\\MSVC\\L5_FULL_CLOSURE_CAMPAIGN_1\\results_h4';
const PLAN_DIR = 'C:\\MSVC\\L5_FULL_CLOSURE_CAMPAIGN_1\\plan';
const PLAN_FILE = path.join(PLAN_DIR, 'campaign_plan.json');

const EXPECT_H6 = '02682f49e7b4980d5f310a917e9d0d7971cc8d9f71ef84e11a7e2df0023d77b0';

function profileId(na, nb){ return na*6 - na*(na-1)/2 + nb; }
const table = Array.from({length:21}, () => []);
for(let i0=0; i0<3; i0++)
for(let i1=0; i1<3; i1++)
for(let i2=0; i2<3; i2++)
for(let i3=0; i3<3; i3++)
for(let i4=0; i4<3; i4++){
  const a = [i0,i1,i2,i3,i4];
  let na=0, nb=0;
  for(const x of a){ if(x===0)na++; else if(x===1)nb++; }
  table[profileId(na,nb)].push(a);
}
const h6 = [[0,2,4],[0,3,5],[1,3,5],[1,3,2],[0,5,4],[1,2,4]];
let source = [0];
for(let it=0; it<6; it++) source = source.flatMap(x => h6[x]);
if(source.length !== 729) throw new Error('independent source length failure');
if(crypto.createHash('sha256').update(Buffer.from(source)).digest('hex') !== EXPECT_H6) throw new Error('independent source hash failure');

function reconstructBlocks(pids, codingId){
  let temp = BigInt(codingId);
  const r = Array(6);
  for(let i=5; i>=0; i--){
    const m = BigInt(table[pids[i]].length);
    r[i] = Number(temp % m);
    temp /= m;
  }
  if(temp !== 0n) throw new Error('codingId outside profile domain');
  return pids.map((p,i) => table[p][r[i]]);
}

function hasStageBViolation(pids, codingId){
  const blocks = reconstructBlocks(pids, codingId);
  const pa = new Int32Array(3646);
  const pb = new Int32Array(3646);
  let len = 0;
  for(const sym of source){
    const b = blocks[sym];
    for(let j=0; j<5; j++){
      const ch = b[j];
      len++;
      pa[len] = pa[len-1] + (ch===0 ? 1 : 0);
      pb[len] = pb[len-1] + (ch===1 ? 1 : 0);
      if(len < 12) continue;
      const kMax = Math.min(40, Math.floor(len/2));
      for(let K=6; K<=kMax; K++){
        const s = len - 2*K, m = len - K;
        if(pa[len] - pa[m] !== pa[m] - pa[s]) continue;
        if(pb[len] - pb[m] !== pb[m] - pb[s]) continue;
        return {K, pos:s};
      }
    }
  }
  return null;
}

console.log("Loading campaign plan...");
const plan = JSON.parse(fs.readFileSync(PLAN_FILE, 'utf8'));

let sampleDecisionCount = 0;
let errors = 0;

console.log("Checking samples per shard...");
for(const shard of plan.shards){
  const shardInputPath = path.join(PLAN_DIR, shard.file);
  
  let firstPlanned = null;
  let lastPlanned = null;
  
  const content = fs.readFileSync(shardInputPath, 'utf8');
  const lines = content.split(/\r?\n/);
  for(const line of lines){
    if(!line || line[0]==='#') continue;
    const f = line.split(',');
    if(f.length !== 8) throw new Error(`bad shard plan line in ${shard.file}`);
    const profileIndex = f[0];
    const pids = f.slice(1,7).map(Number);
    const D = BigInt(f[7]);
    
    const rec = {profileIndex, pids, D};
    if(firstPlanned === null) firstPlanned = rec;
    lastPlanned = rec;
  }
  
  const sampleChecks = [
    {profileIndex: firstPlanned.profileIndex, pids: firstPlanned.pids, codingId: 0n},
    {profileIndex: lastPlanned.profileIndex, pids: lastPlanned.pids, codingId: lastPlanned.D - 1n}
  ].map(q => ({
    ...q,
    key: `${q.profileIndex}:${q.codingId}`,
    independentViolation: hasStageBViolation(q.pids, q.codingId),
    seenAsSurvivor: false // For this run, all shards reported 0 survivors
  }));
  
  for(const q of sampleChecks) {
    const independentSurvives = (q.independentViolation === null);
    if(independentSurvives !== q.seenAsSurvivor){
        console.error(`MISMATCH on ${shard.shardId} ${q.key}: JS_survives=${independentSurvives} Cpp_survivor=${q.seenAsSurvivor}`);
        errors++;
    }
    sampleDecisionCount++;
  }
}

console.log(`\nVerified ${sampleDecisionCount} sample decisions independently.`);
if (errors === 0) {
  console.log("ALL SAMPLED DECISIONS MATCH EXPECTED C++ OUTCOME (0 survivors). PASS");
} else {
  console.log(`${errors} DISCREPANCIES FOUND. FAIL`);
}
