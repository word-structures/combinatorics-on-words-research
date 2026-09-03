function test(h, v) {
    let B = 0;
    for(let x of v) B += Math.pow(x - h/3, 2);
    let d1 = 0;
    for(let x of v) d1 += Math.pow(x/h, 2);
    let sum_da = 0;
    for(let x of v) sum_da += Math.pow(x/h, 2) * (x - h/3);
    let V1 = d1 * (4*B + 2/3) + 4 * sum_da;
    console.log("4B - V1 =", 4*B - V1);
    console.log("B =", B);
    console.log("-4/3 B =", -4/3 * B);
}
test(3, [2,1,0]);

