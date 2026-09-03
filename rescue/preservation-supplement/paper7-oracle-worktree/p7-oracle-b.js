const crypto = require('crypto');

/*
 * P7_EXT: Oracle B - Clean-room reference implementation
 * Purpose: Establish semantics independently and produce frozen small/mid-size replay checkpoints.
 */

// 1. DIRECT PREDICATE
// The ultimate slow reference predicate.
// Checks every possible factor for Abelian squares.
function isAbelianSquareFree(word) {
    const n = word.length;
    for (let K = 1; K <= Math.floor(n / 2); K++) {
        for (let i = 0; i <= n - 2 * K; i++) {
            if (isAbelianSquare(word, i, i + K, i + K, i + 2 * K)) {
                return false;
            }
        }
    }
    return true;
}

function isAbelianSquare(word, start1, end1, start2, end2) {
    const counts = { 'a': 0, 'b': 0, 'c': 0, 'd': 0 };
    for (let i = start1; i < end1; i++) {
        counts[word[i]]++;
    }
    for (let i = start2; i < end2; i++) {
        counts[word[i]]--;
    }
    return counts['a'] === 0 && counts['b'] === 0 && counts['c'] === 0 && counts['d'] === 0;
}

// 2. INCREMENTAL PREDICATE
/*
 * PROOF OF INCREMENTAL SAFETY:
 * Suppose a word W is already certified Abelian-square-free.
 * This means there is no Abelian square entirely contained within W.
 * If we append a character 'x' to the right to form Wx, any newly created Abelian square 
 * must include the newly added character 'x'. Therefore, the new Abelian square must end 
 * exactly at the new right boundary of Wx.
 * Thus, we only need to check factors of even length 2K that end at the rightmost index.
 * By symmetry, prepending a character 'x' to form xW means any new Abelian square must 
 * start at the new left boundary of xW. We only need to check factors of even length 2K 
 * that start at index 0.
 */
function isAbelianSquareFreeIncremental(word, addedChar, isRight) {
    const n = word.length + 1;
    const newWord = isRight ? word + addedChar : addedChar + word;
    
    for (let K = 1; K <= Math.floor(n / 2); K++) {
        if (isRight) {
            // Check suffix of length 2K
            const start1 = n - 2 * K;
            const end1 = n - K;
            const start2 = n - K;
            const end2 = n;
            if (isAbelianSquare(newWord, start1, end1, start2, end2)) return false;
        } else {
            // Check prefix of length 2K
            const start1 = 0;
            const end1 = K;
            const start2 = K;
            const end2 = 2 * K;
            if (isAbelianSquare(newWord, start1, end1, start2, end2)) return false;
        }
    }
    return true;
}

// Cross-check incremental vs direct on small random extensions
function crossCheckPredicates() {
    const alphabet = ['a', 'b', 'c', 'd'];
    const validWords = ['a', 'ab', 'abc', 'abcd', 'abac', 'abcb'];
    
    for (const w of validWords) {
        for (const c of alphabet) {
            // Right
            const rightW = w + c;
            const directRight = isAbelianSquareFree(rightW);
            const incRight = isAbelianSquareFreeIncremental(w, c, true);
            if (directRight !== incRight) throw new Error(`Predicate mismatch on right append: ${w} + ${c}`);
            
            // Left
            const leftW = c + w;
            const directLeft = isAbelianSquareFree(leftW);
            const incLeft = isAbelianSquareFreeIncremental(w, c, false);
            if (directLeft !== incLeft) throw new Error(`Predicate mismatch on left prepend: ${c} + ${w}`);
        }
    }
    console.log("Cross-check passed.");
}

crossCheckPredicates();

// 3. PROTOCOL EXECUTION
const seed = "abcdacbabdabacdacbcdad";
const alphabet = ['a', 'b', 'c', 'd'];

function runProtocol(maxDepth) {
    console.log(`\nStarting Oracle B execution for seed ${seed}`);
    console.log(`Seed is legal: ${isAbelianSquareFree(seed)}`);
    
    let currentFrontier = [seed];
    
    const results = [];

    // Protocol: Right, Left, Right, Left...
    for (let step = 1; step <= maxDepth; step++) {
        const isRight = (step % 2 !== 0); // Step 1 is Right, Step 2 is Left
        const nextFrontier = [];
        
        for (const w of currentFrontier) {
            for (const c of alphabet) {
                if (isAbelianSquareFreeIncremental(w, c, isRight)) {
                    nextFrontier.push(isRight ? w + c : c + w);
                }
            }
        }
        
        currentFrontier = nextFrontier;
        
        // Canonical serialization and hashing
        // Sort lexicographically to ensure deterministic order
        currentFrontier.sort();
        const payload = currentFrontier.join(',');
        const hash = crypto.createHash('sha256').update(payload).digest('hex');
        
        const record = {
            length: seed.length + step,
            step: step,
            extension_side: isRight ? 'RIGHT' : 'LEFT',
            frontier_count: currentFrontier.length,
            sha256: hash
        };
        
        results.push(record);
        console.log(`Length: ${record.length}, Side: ${record.extension_side}, Count: ${record.frontier_count}, Hash: ${record.sha256.substring(0, 8)}...`);
        
        if (step === 96) {
            console.assert(currentFrontier.length === 0, "Regression assertion failed: F(118) should be 0. Extinction at step 96 (48 right, 48 left extensions) is exactly T_{48}(w_K) = ∅.");
        }
        
        if (currentFrontier.length === 0) {
            console.log("Extinction reached.");
            break;
        }
    }
    
    return results;
}

// Run up to length 32 (10 steps) to freeze small Oracle-B results before C++
const smallCheckpoints = runProtocol(10);
const fs = require('fs');
fs.writeFileSync('P7_04_DIRECTIONAL_EXTENSION_ORACLE_B_SMALL_FREEZE.json', JSON.stringify(smallCheckpoints, null, 2));
console.log("\nSmall checkpoints written to P7_04_DIRECTIONAL_EXTENSION_ORACLE_B_SMALL_FREEZE.json");
