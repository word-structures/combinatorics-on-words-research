
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

let v = [2,1,0];
let orbit_targets = targets.filter(w => {
    let p = Parikh(w.slice(0, h));
    let sorted = [...p]; // keep exact profile for test
    return p[0]===v[0] && p[1]===v[1] && p[2]===v[2];
});

let Nv = orbit_targets.length;
console.log("Nv = ", Nv);

for(let a=0; a<3; a++) {
    let count = 0;
    for(let W of orbit_targets) {
        if (W[0] === a && W[h] === a) count++;
    }
    console.log(`a=${a}, count=${count}, fraction=${count/Nv}, expected=${Math.pow(v[a]/h, 2)}`);
}

