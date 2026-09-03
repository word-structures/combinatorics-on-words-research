#include <bits/stdc++.h>
#ifdef _OPENMP
#include <omp.h>
#endif
using namespace std;
struct E { int v; uint8_t t,a; };
static inline size_t ix(int s,int d,int D){return (size_t)s*(D+1)+(size_t)d;}
struct Mom { vector<uint32_t> c,s,v; Mom(size_t n=0):c(n),s(n),v(n){} };
static inline uint32_t addm(uint32_t a,uint32_t b,uint32_t P){ uint64_t x=(uint64_t)a+b; if(x>=P)x-=P; return (uint32_t)x; }
static inline uint32_t mulm(uint32_t a,uint32_t b,uint32_t P){ return (uint32_t)(((uint64_t)a*b)%P); }

void step_out(const vector<vector<E>>& out, const Mom& in, Mom& z,int K,int D,uint32_t P){
 fill(z.c.begin(),z.c.end(),0); fill(z.s.begin(),z.s.end(),0); fill(z.v.begin(),z.v.end(),0);
 // Destination/d are disjoint if parallelized this way using incoming; to remain structurally independent,
 // we use outgoing propagation serially over states, with d inner loop.
 for(int u=0;u<K;u++){
   for(const auto &e: out[u]){
     int sh=(int)e.t;
     for(int d=0;d+sh<=D;d++){
       size_t q=ix(u,d,D); uint32_t c=in.c[q]; if(!c) continue;
       uint32_t s=in.s[q], v=in.v[q]; size_t r=ix(e.v,d+sh,D);
       uint32_t nc=c, ns=s, nv=v;
       if(e.a){ ns=addm(ns,c,P); nv=addm(nv,addm(s,s,P),P); nv=addm(nv,c,P); }
       z.c[r]=addm(z.c[r],nc,P); z.s[r]=addm(z.s[r],ns,P); z.v[r]=addm(z.v[r],nv,P);
     }
   }
 }
}
void center_deriv_out(const vector<vector<E>>& out,const Mom& in,Mom& z,int K,int D,uint32_t P){
 fill(z.c.begin(),z.c.end(),0); fill(z.s.begin(),z.s.end(),0); fill(z.v.begin(),z.v.end(),0);
 for(int u=0;u<K;u++) for(const auto &e:out[u]) if(e.t){
   for(int d=0;d<=D;d++){
     size_t q=ix(u,d,D); uint32_t c=in.c[q]; if(!c) continue; uint32_t s=in.s[q],v=in.v[q]; size_t r=ix(e.v,d,D);
     uint32_t ns=s,nv=v; if(e.a){ns=addm(ns,c,P);nv=addm(nv,addm(s,s,P),P);nv=addm(nv,c,P);}
     z.c[r]=addm(z.c[r],c,P); z.s[r]=addm(z.s[r],ns,P); z.v[r]=addm(z.v[r],nv,P);
   }
 }
}
vector<uint32_t> conv(const vector<uint32_t>&a,const vector<uint32_t>&b,uint32_t P){
 vector<uint32_t> z(a.size()+b.size()-1);
 for(size_t i=0;i<a.size();i++) if(a[i]) for(size_t j=0;j<b.size();j++) if(b[j])
   z[i+j]=addm(z[i+j],mulm(a[i],b[j],P),P);
 return z;
}
static inline uint32_t subm(uint32_t a,uint32_t b,uint32_t P){return a>=b?a-b:(uint32_t)((uint64_t)a+P-b);}
static inline uint32_t scal(uint64_t k,uint32_t a,uint32_t P){return (uint32_t)((k*a)%P);}

int main(int argc,char**argv){
 if(argc!=7){cerr<<"usage edges sizes L D prime out\n";return 2;}
 string ep=argv[1],sp=argv[2],op=argv[6]; int L=stoi(argv[3]),D=stoi(argv[4]); uint32_t P=(uint32_t)stoul(argv[5]);
 ifstream f(ep,ios::binary); uint32_t K,Ecnt; f.read((char*)&K,4);f.read((char*)&Ecnt,4); if(!f)return 3;
 vector<int32_t> rr(Ecnt),cc(Ecnt);vector<uint8_t> tt(Ecnt),aa(Ecnt); f.read((char*)rr.data(),4*Ecnt);f.read((char*)cc.data(),4*Ecnt);f.read((char*)tt.data(),Ecnt);f.read((char*)aa.data(),Ecnt);if(!f)return 4;
 vector<int64_t> sizes(K); ifstream sf(sp,ios::binary);sf.read((char*)sizes.data(),8*K);if(!sf)return 5;
 vector<vector<E>> out(K); for(uint32_t i=0;i<Ecnt;i++)out[rr[i]].push_back({cc[i],tt[i],aa[i]});
 size_t SZ=(size_t)K*(D+1); Mom A(SZ),B(SZ),Den(SZ),Num(SZ),T1(SZ),T2(SZ);
 for(uint32_t i=0;i<K;i++) A.c[ix(i,0,D)]=(uint32_t)(((sizes[i]%P)+P)%P);
 auto t0=chrono::steady_clock::now();
 for(int k=0;k<L;k++){step_out(out,A,B,K,D,P);swap(A,B);}
 step_out(out,A,Den,K,D,P); center_deriv_out(out,A,Num,K,D,P);
 for(int k=0;k<L;k++){step_out(out,Den,T1,K,D,P);swap(Den,T1);step_out(out,Num,T2,K,D,P);swap(Num,T2);}
 vector<uint32_t> Dc(D+1),Ds(D+1),Dv(D+1),Nc(D+1),Ns(D+1),Nv(D+1);
 for(int st=0;st<(int)K;st++)for(int d=0;d<=D;d++){auto q=ix(st,d,D); Dc[d]=addm(Dc[d],Den.c[q],P);Ds[d]=addm(Ds[d],Den.s[q],P);Dv[d]=addm(Dv[d],Den.v[q],P);Nc[d]=addm(Nc[d],Num.c[q],P);Ns[d]=addm(Ns[d],Num.s[q],P);Nv[d]=addm(Nv[d],Num.v[q],P);}
 int n=2*L+1; vector<uint32_t>D1(D+1),N1(D+1),D2(D+1),N2(D+1);
 uint64_t nmod=n%P, n2=((uint64_t)n*n)%P;
 for(int d=0;d<=D;d++){
   D1[d]=subm(scal(3,Ds[d],P),scal(nmod,Dc[d],P),P);N1[d]=subm(scal(3,Ns[d],P),scal(nmod,Nc[d],P),P);
   uint32_t x=scal(9,Dv[d],P);x=subm(x,scal((6*nmod)%P,Ds[d],P),P);x=addm(x,scal(n2,Dc[d],P),P);D2[d]=x;
   x=scal(9,Nv[d],P);x=subm(x,scal((6*nmod)%P,Ns[d],P),P);x=addm(x,scal(n2,Nc[d],P),P);N2[d]=x;
 }
 auto A1=conv(N1,Dc,P),B1=conv(D1,Nc,P),A2=conv(N2,Dc,P),B2=conv(D2,Nc,P);
 vector<uint32_t> F(max(A2.size(),B2.size())),G(max(A1.size(),B1.size()));
 for(size_t i=0;i<F.size();i++)F[i]=subm(i<A2.size()?A2[i]:0,i<B2.size()?B2[i]:0,P);
 for(size_t i=0;i<G.size();i++)G[i]=subm(i<A1.size()?A1[i]:0,i<B1.size()?B1[i]:0,P);
 while(F.size()>1&&F.back()==0)F.pop_back();while(G.size()>1&&G.back()==0)G.pop_back();
 ofstream o(op);o<<"P "<<P<<"\nL "<<L<<"\nD "<<D<<"\nFDEG "<<F.size()-1<<"\nGDEG "<<G.size()-1<<"\n";
 auto dump=[&](const char*name,const vector<uint32_t>&x){o<<name<<"\n";for(auto v:x)o<<v<<"\n";};dump("F",F);dump("G",G);dump("N0",Nc);dump("D0",Dc);o<<"END\n";
 cerr<<"done P="<<P<<" sec="<<chrono::duration<double>(chrono::steady_clock::now()-t0).count()<<" Fdeg="<<F.size()-1<<"\n";
}
