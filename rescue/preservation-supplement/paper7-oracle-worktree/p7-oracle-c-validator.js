const fs = require('fs');
const crypto = require('crypto');

const ALPHABET = ['a', 'b', 'c', 'd'];

function decodeWord(buffer, length) {
    let word = "";
    for (let i = 0; i < length; i++) {
        const byteIndex = Math.floor(i / 4);
        const bitOffset = (i % 4) * 2;
        const val = (buffer[byteIndex] >> bitOffset) & 0x3;
        word += ALPHABET[val];
    }
    return word;
}

function getMask(word, addedChar) {
    const ext = addedChar + word;
    let mask = 0n;
    for (let K = 1; K <= Math.floor(ext.length / 2); K++) {
        const counts = { 'a': 0, 'b': 0, 'c': 0, 'd': 0 };
        for (let i = 0; i < K; i++) counts[ext[i]]++;
        for (let i = K; i < 2 * K; i++) counts[ext[i]]--;
        if (counts['a'] === 0 && counts['b'] === 0 && counts['c'] === 0 && counts['d'] === 0) {
            mask |= (1n << BigInt(K));
        }
    }
    return mask;
}

function runValidation() {
    const fd = fs.openSync('P7_117_FRONTIER.bin', 'r');
    const headerBuffer = Buffer.alloc(121);
    fs.readSync(fd, headerBuffer, 0, 121, 0);
    const count = headerBuffer.readBigUInt64LE(17);
    
    // Sample every 1000th record for independent mask validation
    const sampleFreq = 1000n;
    const recordSize = 32;
    const recordBuffer = Buffer.alloc(recordSize);
    
    let currentPos = 121 + 96;
    let checked = 0;
    
    console.log(`Starting independent mask validation on 1/${sampleFreq} sample of ${count} records...`);
    
    for (let idx = 0n; idx < count; idx++) {
        fs.readSync(fd, recordBuffer, 0, recordSize, currentPos);
        currentPos += recordSize;
        
        if (idx % sampleFreq === 0n) {
            const w = decodeWord(recordBuffer, 117);
            
            for (const c of ALPHABET) {
                const mask = getMask(w, c);
                if (mask === 0n) throw new Error("Found 0 mask! Extinction is violated!");
            }
            checked++;
        }
    }
    console.log(`V1 Validation Complete. Checked ${checked} records.`);
}

runValidation();
