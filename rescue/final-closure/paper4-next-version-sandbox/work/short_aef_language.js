'use strict';
/* §1 — exact short AEF factor language, regenerated from the morphism (nothing assumed).
   Claim to check: for K<=40 every square whose macro support lies in {a,e,f} is contained
   in H(v) for v in {faf, afe, eaf, fea}, and no further A/E/F trigram is needed. */
const H6={a:"ace",b:"adf",c:"bdf",d:"bdc",e:"afe",f:"bce"};
function prefix(it){let w="a";for(let i=0;i<it;i++){let n="";for(const c of w)n+=H6[c];w=n;}return w;}
const W=prefix(12);
function factorsOfLen(n){const s=new Set();for(let i=0;i+n<=W.length;i++)s.add(W.substr(i,n));return s;}
const S=new Set(["a","e","f"]);
const onlyS=n=>[...factorsOfLen(n)].filter(x=>[...x].every(c=>S.has(c))).sort();
console.log("A/E/F-only macro factors, by length:");
let R=0;
for(let n=1;n<=8;n++){const v=onlyS(n);console.log("  n="+n+": ["+v.join(", ")+"]  count="+v.length);if(v.length)R=n;}
console.log("max A/E/F-only macro length R =",R);
const tri=onlyS(3);
console.log("\nA/E/F-only TRIGRAMS:",JSON.stringify(tri));
const claimed=["afe","eaf","faf","fea"].sort();
console.log("matches claimed {FAF,AFE,EAF,FEA}:",JSON.stringify(tri)===JSON.stringify(claimed));
console.log("no A/E/F-only factor of length 4 needed beyond trigram coverage:",onlyS(4).length===0?"(none of length 4)":"length-4 exist: "+onlyS(4).join(","));
// every shorter A/E/F-only factor must sit inside one of the trigrams
let ok=true;
for(const n of [1,2]) for(const v of onlyS(n))
  if(!tri.some(t=>t.includes(v))){ok=false;console.log("UNCOVERED short factor:",v);}
console.log("all A/E/F-only unigrams+bigrams contained in a trigram:",ok);
console.log("  unigrams:",onlyS(1).join(","),"  bigrams:",onlyS(2).join(","));
/* K<=40 reduction: square length <=80 spans at most 3 consecutive blocks */
console.log("\nK<=40 => square length <= 80 <= 3*40, so it lies in at most 3 consecutive blocks.");
console.log("If its macro support is within {a,e,f}, that 3-block window is an A/E/F-only");
console.log("macro factor of length <=3, hence one of the "+tri.length+" trigrams above.");
/* complete-AF already certifies faf through K<=60 */
console.log("\ncomplete-AF gate certifies H(faf) for K=2..60, which covers K<=40 on faf.");
console.log("=> NEW E-dependent K<=40 obligations reduce exactly to: H(afe), H(eaf), H(fea).");
