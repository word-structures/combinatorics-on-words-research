const w = "abacccaaacbc";
const t = 4;

function get_witnesses(word) {
    let res = [];
    let n = word.length;
    for (let len = 2; len <= Math.floor(n / 2); len++) {
        let i = n - 2 * len;
        let c1 = [0,0,0], c2 = [0,0,0];
        for (let j = 0; j < len; j++) c1[word.charCodeAt(i+j)-97]++;
        for (let j = 0; j < len; j++) c2[word.charCodeAt(i+len+j)-97]++;
        if (c1[0]===c2[0] && c1[1]===c2[1] && c1[2]===c2[2]) {
            res.push(len);
        }
    }
    return res;
}

let futures = [];
let all_W = [];

function search(current_w, depth) {
    if (depth === 0) return;
    
    for (let c of ['a', 'b', 'c']) {
        let next_w = current_w + c;
        let W = get_witnesses(next_w);
        if (W.length > 0) {
            // First failure!
            // But we need to record this for the *full length-t future* that starts with this.
            // Wait, "for every length-t future u... earliest append at which wu first becomes invalid".
            // So if it fails here, all futures of length t starting with this prefix share this same failure point.
            all_W.push(W);
            continue;
        } else {
            search(next_w, depth - 1);
        }
    }
}

let valid_at_4 = 0;
function search_valid(current_w, depth) {
    if (depth === 0) {
        valid_at_4++;
        return;
    }
    for (let c of ['a', 'b', 'c']) {
        let next_w = current_w + c;
        if (get_witnesses(next_w).length === 0) {
            search_valid(next_w, depth - 1);
        }
    }
}

search_valid(w, 4);
console.log("Valid extensions of length 4: " + valid_at_4);

search(w, 4);
console.log("Number of failure branches: " + all_W.length);

// Compute transversal
// We need to find the minimum size of a set S that intersects every W in all_W
// Universe of K is 2..8
let universe = [2,3,4,5,6,7,8];
let min_size = 999;
let best_S = null;

for (let mask = 0; mask < (1 << 7); mask++) {
    let S = [];
    for (let bit = 0; bit < 7; bit++) {
        if (mask & (1 << bit)) S.push(universe[bit]);
    }
    let hits_all = true;
    for (let W of all_W) {
        let hit = false;
        for (let k of W) {
            if (S.includes(k)) { hit = true; break; }
        }
        if (!hit) { hits_all = false; break; }
    }
    if (hits_all) {
        if (S.length < min_size) {
            min_size = S.length;
            best_S = S;
        }
    }
}

console.log("Min transversal size: " + min_size);
console.log("Transversal S: " + best_S);

// Singleton witnesses
let singletons = new Set();
for (let W of all_W) {
    if (W.length === 1) {
        singletons.add(W[0]);
    }
}
let singletons_arr = Array.from(singletons).sort((a,b)=>a-b);
console.log("Singleton witness K values: " + singletons_arr);

