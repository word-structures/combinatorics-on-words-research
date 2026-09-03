import sys,json,time
sys.path.insert(0,'/mnt/data/p8work');import interval_alpha36_cert_bidir as C
THR=0.889533455923282
WIDTHS=[0.05,0.02,0.01,0.005,0.002,0.001]
def run(reverse,start=0.0,stop=1.0,max_steps=10000,out=None):
 a=start;res=[];tests=0;t0=time.time()
 while a < stop-1e-14 and len(res)<max_steps:
  ok=None
  for w in WIDTHS:
   b=min(stop,a+w)
   if b-a<0.999*w and b<stop-1e-14:continue
   o=C.certify(a,b,reverse=reverse);tests+=1
   if o['alphaP_lower']>THR:
    ok=o;break
  if ok is None:
   raise RuntimeError(f'no width passed at {a}')
  res.append(ok);a=ok['b']
  print(('R' if reverse else 'F'),len(res),f"[{ok['a']:.6f},{ok['b']:.6f}]",'alpha',f"{ok['alphaP_lower']:.9f}",'w',ok['b']-ok['a'],'elapsed',time.time()-t0,flush=True)
 summary={'reverse':reverse,'threshold':THR,'start':start,'stop':stop,'n_intervals':len(res),'n_tests':tests,'min_alpha36_lower':min(x['alphaP_lower'] for x in res),'min_record':min(res,key=lambda x:x['alphaP_lower']),'all_pass':all(x['alphaP_lower']>THR for x in res),'seconds':time.time()-t0,'intervals':res}
 if out:json.dump(summary,open(out,'w'),indent=2)
 print('SUMMARY',json.dumps({k:v for k,v in summary.items() if k!='intervals'},indent=2),flush=True)
 return summary
if __name__=='__main__':
 rev=bool(int(sys.argv[1]));start=float(sys.argv[2]);stop=float(sys.argv[3]);out=sys.argv[4]
 run(rev,start,stop,out=out)
