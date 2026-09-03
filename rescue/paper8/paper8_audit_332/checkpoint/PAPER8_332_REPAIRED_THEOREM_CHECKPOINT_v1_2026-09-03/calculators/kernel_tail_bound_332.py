from fractions import Fraction
import json
b=44; tau=Fraction(1,10); m0=16
# centered ternary f has osc(f)=1 and ||f||inf=2/3
C_same=Fraction(4,3)  # osc(f * P^d f) <= 4/3 tau^floor(d/b)
C_cross=Fraction(5,3) # conditional straddling <=1 + baseline <=2/3
A=Fraction(43,1)+Fraction(44,1)*tau/(1-tau)  # sum_{d>=1} tau^floor(d/b)
def w(d): return tau**(d//b)
def side(R):
    Ain=sum((w(d) for d in range(1,R+1)), Fraction())
    Dtail=A-Ain
    tri=sum((w(r)*w(g) for r in range(1,R+1) for g in range(1,R+1-r)), Fraction())
    # ordered same-side pairs: diagonal tail + two off-diagonal orientations
    same=C_same*(Dtail+2*(A*A-tri))
    inside=2*m0*C_same*Dtail # inside/outside, both orderings
    return Ain,Dtail,same,inside
# target edge closes a 16-letter event supported on positions -15,...,0.
# scored transitions are -308,...,308, so included outside distances are RL=293, RR=308.
RL,RR=293,308
Al,Dl,Sl,Il=side(RL); Ar,Dr,Sr,Ir=side(RR)
Cross=2*C_cross*(A*A-Al*Ar) # left-right, both orderings
Total=Sl+Sr+Il+Ir+Cross
out={
 'profile':[3,3,2], 'block_length':b,'tau_num':tau.numerator,'tau_den':tau.denominator,
 'event_support_length':m0,'score_radius':308,'left_distance_included':RL,'right_distance_included':RR,
 'same_side_constant_num':C_same.numerator,'same_side_constant_den':C_same.denominator,
 'cross_constant_num':C_cross.numerator,'cross_constant_den':C_cross.denominator,
 'components':{}, 'tail_num':Total.numerator,'tail_den':Total.denominator,'tail_float':float(Total),
 'status':'DERIVED_BOUND_PENDING_LEMMA_REVIEW',
 'note':'Uses forward/reverse 44-step Dobrushin contraction <= 0.1. Polynomial shell factor is explicit; no pure tau^B continuation claim.'
}
for k,v in [('same_left',Sl),('same_right',Sr),('inside_left',Il),('inside_right',Ir),('cross',Cross)]:
    out['components'][k]={'num':v.numerator,'den':v.denominator,'float':float(v)}
json.dump(out,open('/mnt/data/PAPER8_BURN_REPAIR/KERNEL_TAIL_332_SAFE.json','w'),indent=2)
print(json.dumps(out,indent=2))
