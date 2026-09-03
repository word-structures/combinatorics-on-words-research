import sys,json,time,multiprocessing as mp
from fractions import Fraction
sys.path.insert(0,'/mnt/data/PAPER8_332_WORK')
THR=.90
segments=[(Fraction(0),Fraction(1,100),Fraction(1,4000)),(Fraction(1,100),Fraction(1,20),Fraction(1,1000)),(Fraction(1,20),Fraction(1,10),Fraction(1,500)),(Fraction(1,10),Fraction(3,10),Fraction(3,1000)),(Fraction(3,10),Fraction(7,10),Fraction(1,200)),(Fraction(7,10),Fraction(1),Fraction(3,500))]
intervals=[]
for a,z,w in segments:
 x=a
 while x<z:
  y=min(z,x+w);intervals.append((x,y));x=y
assert intervals[0][0]==0 and intervals[-1][1]==1 and all(intervals[i][1]==intervals[i+1][0] for i in range(len(intervals)-1))
def one(arg):
 i,a,b,rev=arg
 import pid1_interval_lib as C
 t=time.time();q=C.certify(float(a),float(b),m=44,batch=256,reverse=rev);q['i']=i;q['a_fraction']=str(a);q['b_fraction']=str(b);q['seconds']=time.time()-t;return q
if __name__=='__main__':
 args=[(i,a,b,rev) for i,(a,b) in enumerate(intervals) for rev in (False,True)]
 out=[];t=time.time();fail=False
 with mp.get_context('fork').Pool(8) as p:
  for k,q in enumerate(p.imap_unordered(one,args,chunksize=1),1):
   out.append(q)
   if q['alphaP_lower']<=THR: fail=True
   if k%20==0 or q['alphaP_lower']<=THR: print('done',k,'/',len(args),'min',min(x['alphaP_lower'] for x in out),'latest',q['i'],q['reverse'],q['alphaP_lower'],flush=True)
 out.sort(key=lambda q:(q['i'],q['reverse']))
 seen={(q['i'],bool(q['reverse'])) for q in out}
 complete=len(out)==2*len(intervals) and all((i,r) in seen for i in range(len(intervals)) for r in (False,True))
 weakest=min(out,key=lambda q:q['alphaP_lower'])
 result={'profile':[3,3,2],'m':44,'threshold':THR,'interval_count':len(intervals),'record_count':len(out),'segments':[[str(a),str(b),str(w)] for a,b,w in segments],'min_alpha44_lower':weakest['alphaP_lower'],'weakest_record':weakest,'complete':complete,'all_pass':all(q['alphaP_lower']>THR for q in out),'seconds':time.time()-t,'records':out}
 result['PASS']=result['complete'] and result['all_pass']
 json.dump(result,open('/mnt/data/PAPER8_332_WORK/FIXED_BIDIRECTIONAL_COVER.json','w'),indent=2)
 print('SUMMARY',json.dumps({k:v for k,v in result.items() if k!='records'},indent=2),flush=True)
 if not result['PASS']:raise SystemExit(1)
