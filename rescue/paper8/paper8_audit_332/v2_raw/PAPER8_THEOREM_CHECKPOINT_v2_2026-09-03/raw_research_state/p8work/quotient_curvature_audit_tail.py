# Continue curvature audit only for pids 2..4, using the same definitions as quotient_equivalence_audit.py.
exec(open('/mnt/data/h8cp/quotient_equivalence_audit.py').read().split("xs=[1.0,0.5,0.01]")[0])
import math, json
out=[]
for pid in [2,3,4]:
 p=profiles[pid-1]
 for x in [1.0,0.1,0.01]:
  vals={}
  for t in [-1e-3,0.0,1e-3]:
   ao,_,_,_,_=pf_original(pid,x,t,tol=8e-14)
   aq,_,_,_,_=pf_quot(pid,x,t,tol=8e-14)
   vals[t]=(ao,aq)
  h=1e-3
  co=(math.log(vals[h][0])-2*math.log(vals[0.0][0])+math.log(vals[-h][0]))/h**2
  cq=(math.log(vals[h][1])-2*math.log(vals[0.0][1])+math.log(vals[-h][1]))/h**2
  rec={'profile':p.tolist(),'pid':pid,'x':x,'curvature_original':co,'curvature_quotient':cq,'abs_diff':abs(co-cq)}
  out.append(rec); print(rec,flush=True)
open('/mnt/data/h8cp/quotient_curvature_audit_tail.json','w').write(json.dumps(out,indent=2))
