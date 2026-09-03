const fs = require('fs');

function validateV3() {
    console.log("Starting V3 independent minimum scale cover validation...");
    const antichain = JSON.parse(fs.readFileSync('P7_05_MINIMAL_MASK_ANTICHAIN.json', 'utf8'));
    const coversData = JSON.parse(fs.readFileSync('P7_05_MINIMUM_SCALE_COVER.json', 'utf8'));
    const tau = coversData.tau;
    const covers = coversData.covers;
    
    // Convert json array of strings/numbers to BigInts
    const masks = antichain.map(x => BigInt(x));
    
    // Verify each provided cover actually covers all masks
    for (const cStr of covers) {
        const c = BigInt(cStr);
        let ones = 0n;
        for (let i = 0n; i < 64n; i++) {
            if ((c >> i) & 1n) ones++;
        }
        if (ones !== BigInt(tau)) {
            throw new Error(`Cover ${c} has size ${ones}, expected tau=${tau}`);
        }
        
        for (const m of masks) {
            if ((m & c) === 0n) {
                throw new Error(`Cover ${c} fails to intersect mask ${m}`);
            }
        }
    }
    console.log(`V3 Validated: All reported covers of size ${tau} successfully intersect all ${masks.length} minimal masks.`);
    console.log("Minimality is verified by exhaustive branch-and-bound in C++.");
}

validateV3();
