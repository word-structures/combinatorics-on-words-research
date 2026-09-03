function verifyLocalWindowSpan(L) {
    let H = 2 * L - 1;
    let maxK = H;
    let maxLen = 2 * maxK; // 4L - 2
    
    let maxBlocks = 0;
    let maxStart = 0;
    
    // new block is indices [0, L-1]
    // previous blocks are [-L, -1], [-2L, -L-1], etc.
    
    for (let e = 0; e < L; e++) {
        // e is the index of the last character of the square
        // The length is 2K
        for (let K = 1; K <= H; K++) {
            let len = 2 * K;
            // The square must end at e, so it starts at e - len + 1
            let start = e - len + 1;
            
            // It must be a newly completed square, meaning it must include at least one character of the new block
            // Since e >= 0, it includes character e of the new block. This is always true.
            
            // Calculate which block the start index falls into
            let startBlock = Math.floor(start / L);
            let endBlock = 0; // The new block is block 0
            
            let blocksSpanned = endBlock - startBlock + 1;
            if (blocksSpanned > maxBlocks) {
                maxBlocks = blocksSpanned;
            }
            if (start < maxStart) {
                maxStart = start;
            }
        }
    }
    
    console.log(`L = ${L}: max total length = ${maxLen}, max start index = ${maxStart}, blocks spanned = ${maxBlocks}`);
}

for (let L of [2, 3, 4, 5, 10]) {
    verifyLocalWindowSpan(L);
}
