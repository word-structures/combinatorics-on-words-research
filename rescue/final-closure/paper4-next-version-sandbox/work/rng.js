'use strict';
/* mulberry32 -- well-tested 32-bit PRNG, full 2^32 period, deterministic from seed.
   Replaces an earlier mangled xorshift128+ whose short period collapsed sampler
   diversity (54 distinct F out of 4000 draws).  See RUN_NOTES. */
function mk(seed){
  let a=seed>>>0;
  return function(){
    a=(a+0x6D2B79F5)|0;
    let t=Math.imul(a^(a>>>15),1|a);
    t=(t+Math.imul(t^(t>>>7),61|t))^t;
    return ((t^(t>>>14))>>>0)/4294967296;
  };
}
module.exports={mk};
