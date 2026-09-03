
const h = 3;
const L = 2*h;

function Parikh(word) {
    let counts = [0,0,0];
    for(let c of word) counts[c]++;
    return counts;
}

function isAbelianSquare(word) {
    let p1 = Parikh(word.slice(0, h));
    let p2 = Parikh(word.slice(h, 2*h));
    return p1[0]===p2[0] && p1[1]===p2[1] && p1[2]===p2[2];
}

let targets = [];
for(let i=0; i<Math.pow(3, 2*h); i++) {
    let w = [];
    let temp = i;
    for(let j=0; j<2*h; j++) {
        w.push(temp % 3);
        temp = Math.floor(temp / 3);
    }
    if (isAbelianSquare(w)) {
        targets.push(w);
    }
}

// Compute the exact phi_tt components for a profile v
let v = [2,1,0];
let orbit_targets = targets.filter(w => {
    let p = Parikh(w.slice(0, h));
    let sorted = [...p].sort((a,b)=>b-a);
    return sorted[0]===v[0] && sorted[1]===v[1] && sorted[2]===v[2];
});

let Nv = orbit_targets.length;
console.log("Nv =", Nv);

function B(v) { return Math.pow(v[0]-h/3, 2) + Math.pow(v[1]-h/3, 2) + Math.pow(v[2]-h/3, 2); }

let m_tt = 0;
orbit_targets.forEach(w => {
    let Y = Parikh(w);
    let c = Math.pow(Y[0]-L/3, 2) + Math.pow(Y[1]-L/3, 2) + Math.pow(Y[2]-L/3, 2) - 2/3*L;
    m_tt += c;
});
console.log("I term (ell^T m_tt) / Nv =", m_tt / Nv);
console.log("Expected 4 B(v) =", 4 * B(v));

