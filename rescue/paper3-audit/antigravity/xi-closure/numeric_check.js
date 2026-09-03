
// Exact finite evaluation of the generating function curvature for h=3
const h = 3;
const profiles = [
    [3,0,0], [2,1,0], [1,1,1]
];

function B(v) {
    return Math.pow(v[0]-1, 2) + Math.pow(v[1]-1, 2) + Math.pow(v[2]-1, 2);
}

function d1(v) {
    return (v[0]*v[0] + v[1]*v[1] + v[2]*v[2])/9.0;
}

profiles.forEach(v => {
    let b = B(v);
    let d = d1(v);
    console.log(`v=[${v}], B=${b}, d1=${d}, 1/3+B/9=${1/3 + b/9}`);
});

