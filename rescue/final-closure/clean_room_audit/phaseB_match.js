const fs = require('fs');

function extract() {
    let output = '';
    // My Domain definitions
    output += 'Clean-Room Domains:\n';
    output += 'Flat_Coin (c1=c2, 0=1=2)\n';
    output += 'Flat_Dist (c1=c2, 0<1<2)\n';
    output += 'Up_Coin (c1=0, c2=1, 0=1<2)\n';
    output += 'Up_Dist (c1=0, c2=1, 0<1<2)\n';
    output += 'Down_Coin (c1=1, c2=0, 0<1=2)\n';
    output += 'Down_Dist (c1=1, c2=0, 0<1<2)\n';
    
    output += '\nManuscript Domains:\n';
    output += 'Z_s (Zero-curvature short / Flat_Coin)\n';
    output += 'Z (Zero-curvature long / Flat_Dist)\n';
    output += 'P_t (Positive-curvature truncated / Up_Coin)\n';
    output += 'P (Positive-curvature full / Up_Dist)\n';
    output += 'M_t (Minus-curvature truncated / Down_Coin)\n';
    output += 'M (Minus-curvature full / Down_Dist)\n';
    
    return output;
}
console.log(extract());

