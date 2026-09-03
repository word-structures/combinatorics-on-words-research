// reachable_set_compiler.js
const fs = require('fs');

/**
 * Enumerates all valid Parikh vectors (arrays of length alphabetSize)
 * that sum to `length` and are component-wise <= `maxVector`.
 */
function enumerateSegments(length, alphabetSize, maxVector) {
    let results = [];
    
    function search(charIdx, currentSum, currentVector) {
        if (charIdx === alphabetSize - 1) {
            let remainder = length - currentSum;
            if (remainder >= 0 && remainder <= maxVector[charIdx]) {
                let v = [...currentVector];
                v.push(remainder);
                results.push(v);
            }
            return;
        }
        
        let maxForChar = Math.min(length - currentSum, maxVector[charIdx]);
        for (let i = 0; i <= maxForChar; i++) {
            currentVector.push(i);
            search(charIdx + 1, currentSum + i, currentVector);
            currentVector.pop();
        }
    }
    
    search(0, 0, []);
    return results;
}

/**
 * signature format: array of { d: depth, a: coefficient }
 * Sorted strictly by d ascending.
 */
function compileSignatureReachableSet({ L, alphabetSize, rho, signature }) {
    // 1. Extract distinct depths
    let depths = [];
    for (let term of signature) {
        if (!depths.includes(term.d) && term.d > 0 && term.d < L) {
            depths.push(term.d);
        }
    }
    depths.sort((a, b) => a - b);
    
    // Map depths back to coefficients
    let coeffMap = new Map();
    for (let term of signature) {
        coeffMap.set(term.d, (coeffMap.get(term.d) || 0) + term.a);
    }
    
    let reachable = new Set();
    
    function dfs(depthIndex, currentTotalV, currentEval) {
        if (depthIndex === depths.length) {
            // Check if final segment up to L is valid (meaning currentTotalV <= rho)
            // By construction during enumeration, currentTotalV <= rho is always enforced.
            let key = currentEval.join(',');
            reachable.add(key);
            return;
        }
        
        let prevDepth = depthIndex === 0 ? 0 : depths[depthIndex - 1];
        let currentDepth = depths[depthIndex];
        let segmentLen = currentDepth - prevDepth;
        
        // max bounds for this segment
        let maxBounds = [];
        for (let i = 0; i < alphabetSize; i++) {
            maxBounds.push(rho[i] - currentTotalV[i]);
        }
        
        let segments = enumerateSegments(segmentLen, alphabetSize, maxBounds);
        let coeff = coeffMap.get(currentDepth) || 0;
        
        for (let seg of segments) {
            let nextTotal = [];
            for (let i = 0; i < alphabetSize; i++) nextTotal.push(currentTotalV[i] + seg[i]);
            
            // To evaluate sum(alpha_d * Y_d), we add alpha_d * nextTotal
            let nextEval = [...currentEval];
            if (coeff !== 0) {
                for (let i = 0; i < alphabetSize; i++) {
                    nextEval[i] += coeff * nextTotal[i];
                }
            }
            
            dfs(depthIndex + 1, nextTotal, nextEval);
        }
    }
    
    let startEval = new Array(alphabetSize).fill(0);
    // If there is a coefficient at d=L, it always evaluates to alpha_L * rho
    let coeffL = coeffMap.get(L);
    if (coeffL) {
        for(let i=0; i<alphabetSize; i++) startEval[i] += coeffL * rho[i];
    }
    // d=0 is always 0 vector, contributes nothing.
    
    dfs(0, new Array(alphabetSize).fill(0), startEval);
    
    let result = Array.from(reachable).map(str => str.split(',').map(Number));
    return result;
}

function compileFamilyReachableSet({ L, alphabetSize, rho, familySignatures }) {
    let unionSet = new Set();
    for (let sig of familySignatures) {
        let set = compileSignatureReachableSet({ L, alphabetSize, rho, signature: sig });
        for (let v of set) {
            unionSet.add(v.join(','));
        }
    }
    return Array.from(unionSet).map(str => str.split(',').map(Number));
}

module.exports = {
    compileSignatureReachableSet,
    compileFamilyReachableSet
};
