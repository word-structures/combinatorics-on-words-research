import sys,json,math,time,multiprocessing as mp
sys.path.insert(0,'/mnt/data/p8work')
import interval_alpha36_cert_bidir as C

def work(args):
 i,n,rev=args;a=i/n;b=(i+1)/n
 o=C.certify(a,b,reverse=rev)
 return o

def run(n,rev,start=0,end=None,workers=5,out=None):
 if end is None:end=n
 t=time.time();args=[(i,n,rev) for i in range(start,end)]
 with mp.get_context('fork').Pool(workers) as p:res=list(p.imap(work,args,chunksize=1))
 mn=min(x['alphaP_lower'] for x in res);mi=min(range(len(res)),key=lambda i:res[i]['alphaP_lower'])
 summary={'n_intervals':n,'reverse':rev,'start_index':start,'end_index_exclusive':end,'min_alpha36_lower':mn,'min_interval':res[mi],'all_gt_0_9':all(x['alphaP_lower']>0.9 for x in res),'seconds':time.time()-t,'intervals':res}
 if out:json.dump(summary,open(out,'w'),indent=2)
 print(json.dumps({k:v for k,v in summary.items() if k!='intervals'},indent=2))
if __name__=='__main__':
 n=int(sys.argv[1]);rev=bool(int(sys.argv[2]));start=int(sys.argv[3]);end=int(sys.argv[4]);out=sys.argv[5]
 run(n,rev,start,end,5,out)
