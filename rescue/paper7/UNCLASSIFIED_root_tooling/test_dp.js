function compute() {
  const N = 2;
  const essAdj = [[0, 1], [0, 1]];
  const essStates = [0, 1]; // 0 is 0, 1 is 1
  let C_arr = new Float64Array(N).fill(0.5);
  let S_arr = new Float64Array(N);
  let V_arr = new Float64Array(N);
  const varAt = {};
  for(let iter=1; iter<=2000; iter++) {
    let nC = new Float64Array(N), nS = new Float64Array(N), nV = new Float64Array(N);
    for(let i=0; i<N; i++) {
      for(let j of essAdj[i]) {
        const x_val = (essStates[j] === 0) ? 1 : 0;
        nC[j] += C_arr[i];
        nS[j] += S_arr[i] + x_val*C_arr[i];
        nV[j] += V_arr[i] + 2*x_val*S_arr[i] + x_val*C_arr[i];
      }
    }
    let sumC = nC[0] + nC[1];
    let inv = 1.0 / sumC;
    let totS = 0, totV = 0;
    for(let i=0; i<N; i++) {
      C_arr[i] = nC[i]*inv; S_arr[i] = nS[i]*inv; V_arr[i] = nV[i]*inv;
      totS += S_arr[i]; totV += V_arr[i];
    }
    if (iter % 1000 === 0) varAt[iter] = totV - totS*totS;
  }
  console.log(varAt[2000] - varAt[1000]); // should be 1000 * 0.25 = 250
}
compute();
