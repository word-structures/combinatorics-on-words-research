const fs = require('fs');

const groups = [
    { name: "E", families: ["E"] },
    { name: "A", families: ["Zs-A", "Z-A", "P-A", "M-A"] },
    { name: "O", families: ["Z-O", "P-O", "M-O"] },
    { name: "C", families: ["Z-C", "P-C", "M-C"] },
    { name: "M", families: ["Z-M", "P-M", "Pt-M", "M-M", "Mt-M"] },
    { name: "OO", families: ["Z-OO", "P-OO", "M-OO"] }
];

let families = [];
for (let g of groups) {
    for (let f of g.families) {
        families.push({ name: f, group: g.name });
    }
}

let csv = "Family_1,Family_2,Separating_Invariant,Symbolic_Argument\n";

for (let i = 0; i < families.length; i++) {
    for (let j = i + 1; j < families.length; j++) {
        let f1 = families[i];
        let f2 = families[j];
        
        let inv = "";
        let arg = "";
        
        if (f1.group === f2.group) {
            // Inside groups
            if (f1.group === "A") {
                if ((f1.name === "Zs-A" && f2.name === "Z-A") || (f1.name === "Z-A" && f2.name === "Zs-A")) {
                    inv = "Zero membership";
                    arg = "0 in Z-A (take u=v=w) but 0 not in Zs-A (h >= 2 prevents u=v=w).";
                } else {
                    inv = "Depth moment mu(sigma)";
                    arg = `mu is constant for A-types: Z-A/Zs-A = 0, P-A = -L, M-A = +L.`;
                }
            } else if (f1.group === "O") {
                inv = "Maximum / Minimum depth";
                arg = "Z-O has depths [1,L-1]; P-O has [1,L-2]; M-O has [1,L-1] but no 0. Zero membership separates Z-O/P-O from M-O. Max depth separates Z-O from P-O.";
            } else if (f1.group === "C") {
                inv = "Zero membership / Depth range";
                arg = "P-C lacks 0; Z-C has 0 and -2e_{L-1}; M-C has 0 but lacks -2e_{L-1}.";
            } else if (f1.group === "M") {
                if ((f1.name === "P-M" && f2.name === "Pt-M") || (f1.name === "Pt-M" && f2.name === "P-M")) {
                    inv = "Truncation witness tau_P";
                    arg = "tau_P = e_{L-2} - 2e_{L-1} is in P-M but not Pt-M.";
                } else if ((f1.name === "M-M" && f2.name === "Mt-M") || (f1.name === "Mt-M" && f2.name === "M-M")) {
                    inv = "Truncation witness e_1";
                    arg = "e_1 is in M-M but not Mt-M.";
                } else {
                    inv = "Depth moment range";
                    arg = "Z-M in [-(L-1),0], P-M/Pt-M in [-2L+2,-L], M-M/Mt-M in [1,L-1]. Ranges are mutually disjoint for L>=5.";
                }
            } else if (f1.group === "OO") {
                inv = "Depth moment range";
                arg = "Z-OO spans [0, 2L-2]; P-OO spans [0, L-2]; M-OO spans [L, 2L-2]. Mutually disjoint max/min bounds.";
            } else {
                inv = "Should not happen";
                arg = "";
            }
        } else {
            // Across groups
            if (f1.group === "E" || f2.group === "E") {
                inv = "Non-empty signatures";
                arg = "E contains only 0; all other families contain at least one non-zero signature for L>=5.";
            } else if ((f1.group === "A" && f2.group !== "A") || (f1.group !== "A" && f2.group === "A")) {
                inv = "Moment constancy / Shape";
                arg = "A-type families have exactly one constant moment value and genuine (+1,-2,+1) shapes. Non-A families either have multiple moment values (M, OO, O, C) or lack the shape.";
            } else if ((f1.group === "M" && f2.group !== "M") || (f1.group !== "M" && f2.group === "M")) {
                inv = "Mixed Shape";
                if (f1.group === "C" || f2.group === "C") {
                    arg = "M-type contains genuine (+1,-2) shapes; C-type is strictly {-2}.";
                } else if (f1.group === "O" || f2.group === "O") {
                    arg = "M-type contains genuine (+1,-2) shapes; O-type is strictly {+1}.";
                } else if (f1.group === "OO" || f2.group === "OO") {
                    arg = "M-type contains negative coefficients (-2 or -1); OO-type is strictly non-negative.";
                }
            } else if ((f1.group === "OO" && f2.group !== "OO") || (f1.group !== "OO" && f2.group === "OO")) {
                if (f1.group === "O" || f2.group === "O") {
                    inv = "Shape (+2 or {1,1})";
                    arg = "OO-type contains either a +2 coefficient or a {1,1} two-depth shape for L>=5; O-type only has unary {1}.";
                } else if (f1.group === "C" || f2.group === "C") {
                    inv = "Coefficient signs";
                    arg = "OO-type is strictly non-negative; C-type is strictly negative (-2).";
                }
            } else if ((f1.group === "O" && f2.group === "C") || (f1.group === "C" && f2.group === "O")) {
                inv = "Coefficient signs";
                arg = "O-type has +1 coefficients; C-type has -2 coefficients.";
            }
        }
        
        csv += `${f1.name},${f2.name},"${inv}","${arg}"\n`;
    }
}

fs.writeFileSync('PAPER4_171_PAIR_DISTINCTNESS_MATRIX_2026-08-29.csv', csv);
