
let v = [2,1,0];
let h = 3;
let L = 6;
let sum = 0;
for(let a=0; a<3; a++) {
    let Y = [2*v[0], 2*v[1], 2*v[2]];
    Y[a] += 1;
    let c = Math.pow(Y[0] - 7/3, 2) + Math.pow(Y[1] - 7/3, 2) + Math.pow(Y[2] - 7/3, 2) - 14/3;
    let prob = Math.pow(v[a]/h, 2);
    sum += prob * c;
    console.log(`a=${a}, Y=${Y}, c=${c}, prob=${prob}`);
}
console.log("Expected O1_tt/Nv =", sum);

