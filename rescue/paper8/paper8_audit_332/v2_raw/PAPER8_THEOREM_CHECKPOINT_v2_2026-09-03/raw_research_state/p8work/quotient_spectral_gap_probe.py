import numpy as np, scipy.sparse as sp, scipy.sparse.linalg as sla, json,sys
pid=int(sys.argv[1]);x=float(sys.argv[2]);Q=np.load(f'/mnt/data/h8cp/a_tilt_quotient_pid{pid}.npz');r=Q['rows'];c=Q['cols'];tar=Q['target'];m=Q['mult'].astype(float);K=len(Q['sizes']);w=m*np.where(tar==1,x,1.0);A=sp.csr_matrix((w,(r,c)),shape=(K,K))
vals=sla.eigs(A,k=6,which='LM',return_eigenvectors=False,tol=1e-10,maxiter=20000);vals=sorted(vals,key=lambda z:abs(z),reverse=True)
out={'pid':pid,'profile':Q['profile'].tolist(),'x':x,'K':K,'eigenvalues':[[float(z.real),float(z.imag),float(abs(z))] for z in vals],'ratio2':float(abs(vals[1])/abs(vals[0]))}
print(json.dumps(out,indent=2));open(f'/mnt/data/h8cp/gap_pid{pid}_x{x}.json','w').write(json.dumps(out,indent=2))
