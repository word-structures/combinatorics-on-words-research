// removed

let M = [
    [ 19, 21, 27, 18 ],
    [ 18, 19, 21, 27 ],
    [ 27, 18, 19, 21 ],
    [ 21, 27, 18, 19 ]
];

// We know det = 43435
// I'll just use a basic inversion via adjugate matrix
function adjugate(m) {
    let adj = [];
    for(let i=0; i<4; i++) {
        adj[i] = [];
        for(let j=0; j<4; j++) {
            let sub = [];
            for(let r=0; r<4; r++) {
                if (r===i) continue;
                let subRow = [];
                for(let c=0; c<4; c++) {
                    if (c===j) continue;
                    subRow.push(m[r][c]);
                }
                sub.push(subRow);
            }
            let sign = ((i+j)%2 === 0) ? 1 : -1;
            // 3x3 det
            let sdet = sub[0][0]*(sub[1][1]*sub[2][2] - sub[1][2]*sub[2][1]) -
                       sub[0][1]*(sub[1][0]*sub[2][2] - sub[1][2]*sub[2][0]) +
                       sub[0][2]*(sub[1][0]*sub[2][1] - sub[1][1]*sub[2][0]);
            adj[i][j] = sign * sdet;
        }
    }
    // transpose
    let trans = [];
    for(let i=0; i<4; i++) {
        trans[i] = [];
        for(let j=0; j<4; j++) {
            trans[i][j] = adj[j][i];
        }
    }
    return trans;
}

let adj = adjugate(M);
console.log("Adjugate matrix:");
adj.forEach(r => console.log(r));
console.log("Max absolute value in adjugate:", Math.max(...adj.flat().map(Math.abs)));
