const fs = require('fs');

/*
 * P7_EXT: Oracle B - Binary Artifact Verifier
 * Streams the C++ binary artifact (length 117) and independently verifies it.
 */

const ALPHABET = ['a', 'b', 'c', 'd'];
const SEED = "abcdacbabdabacdacbcdad";

// Exact same definition from Oracle B
function isAbelianSquare(word, start1, end1, start2, end2) {
    const counts = { 'a': 0, 'b': 0, 'c': 0, 'd': 0 };
    for (let i = start1; i < end1; i++) counts[word[i]]++;
    for (let i = start2; i < end2; i++) counts[word[i]]--;
    return counts['a'] === 0 && counts['b'] === 0 && counts['c'] === 0 && counts['d'] === 0;
}

function isAbelianSquareFree(word) {
    const n = word.length;
    for (let K = 1; K <= Math.floor(n / 2); K++) {
        for (let i = 0; i <= n - 2 * K; i++) {
            if (isAbelianSquare(word, i, i + K, i + K, i + 2 * K)) return false;
        }
    }
    return true;
}

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

function verifyArtifact(filePath) {
    const fd = fs.openSync(filePath, 'r');
    
    // Read Header
    const headerBuffer = Buffer.alloc(12 + 4 + 1 + 8 + 32 + 32 + 32);
    fs.readSync(fd, headerBuffer, 0, headerBuffer.length, 0);
    
    let offset = 0;
    const magic = headerBuffer.toString('ascii', offset, offset + 11);
    offset += 12;
    if (magic !== "P7_FRONTIER") throw new Error("Invalid magic bytes: " + magic);
    
    const version = headerBuffer.readUInt32LE(offset); offset += 4;
    const wordLen = headerBuffer.readUInt8(offset); offset += 1;
    const count = headerBuffer.readBigUInt64LE(offset); offset += 8;
    offset += 96; // Skip 3 dummy hashes
    
    console.log(`Verifying Artifact: Length=${wordLen}, Count=${count}`);
    
    // Using a sample for the full direct predicate because 7.8M * 117-length direct checks is slow in JS.
    // The instructions say: "If the direct definition checker is too slow for 7.8 million complete words... 
    // preregistered sample or partition checked with the full direct predicate. State precisely which level..."
    const sampleFrequency = 10000;
    let checkedFull = 0;
    let checkedExtensions = 0;
    
    // Stream records
    const recordSize = 32; // 4 uint64_t
    const recordBuffer = Buffer.alloc(recordSize);
    
    let currentPos = headerBuffer.length;
    
    for (let idx = 0n; idx < count; idx++) {
        fs.readSync(fd, recordBuffer, 0, recordSize, currentPos);
        currentPos += recordSize;
        
        const w = decodeWord(recordBuffer, wordLen);
        
        // 2. Length check
        if (w.length !== 117) throw new Error("Length mismatch");
        
        // 3. Embedded seed check
        // At step 95, 48 rights and 47 lefts were added.
        // So the original seed (length 22) should be at index 47.
        if (w.substring(47, 47 + 22) !== SEED) {
            throw new Error(`Seed mismatch at record ${idx}:\n${w}\nExpected at index 47.`);
        }
        
        // 4. Abelian-square-freeness (Full Direct Predicate on Sample)
        if (idx % BigInt(sampleFrequency) === 0n) {
            if (!isAbelianSquareFree(w)) throw new Error(`Full predicate failed on record ${idx}`);
            checkedFull++;
        }
        
        // 5. Failure of every possible final LEFT extension
        for (const c of ALPHABET) {
            const ext = c + w;
            // Incremental check: only need to check factors starting at index 0
            let survived = true;
            for (let K = 1; K <= Math.floor(ext.length / 2); K++) {
                if (isAbelianSquare(ext, 0, K, K, 2 * K)) {
                    survived = false;
                    break;
                }
            }
            if (survived) throw new Error(`SURVIVOR FOUND! Record ${idx}, Extension: ${ext}`);
            checkedExtensions++;
        }
    }
    
    console.log(`\nVerification PASS.`);
    console.log(`Full definition checks (sample 1/${sampleFrequency}): ${checkedFull}`);
    console.log(`Total left extensions killed: ${checkedExtensions}`);
}

verifyArtifact("P7_117_FRONTIER.bin");
