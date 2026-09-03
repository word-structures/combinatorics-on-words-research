import sys,json,time,multiprocessing as mp
sys.path.insert(0,'/mnt/data/p8work')
import interval_alpha36_cert_bidir as C
THR=0.889533455923282

def one(args):
 i,den,rev=args
 a=i/den;b=(i+1)/den
 return C.certify(a,b,reverse=rev)
def run(den,rev,i0,i1,out,workers=5):
 t=time.time();args=[(i,den,rev) for i in range(i0,i1)]
 with mp.get_context('fork').Pool(workers) as p:res=list(p.imap(one,args,chunksize=1))
 s={'denominator':den,'reverse':rev,'i0':i0,'i1':i1,'threshold':THR,'n':len(res),'min_alpha36_lower':min(x['alphaP_lower'] for x in res),'all_pass':all(x['alphaP_lower']>THR for x in res),'min_record':min(res,key=lambda x:x['alphaP_lower']),'seconds':time.time()-t,'intervals':res}
 json.dump(s,open(out,'w'),indent=2);print(json.dumps({k:v for k,v in s.items() if k!='intervals'},indent=2))
if __name__=='__main__':run(int(sys.argv[1]),bool(int(sys.argv[2])),int(sys.argv[3]),int(sys.argv[4]),sys.argv[5])
