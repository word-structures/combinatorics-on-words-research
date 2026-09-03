#include <cstdint>
#include <vector>
#include <fstream>
#include <iostream>
#include <algorithm>
#include <string>
using namespace std;
struct Edge{int u;uint8_t t,a;}; struct InList{vector<Edge>e;};
static inline size_t IX(int st,int d,int D){return(size_t)st*(D+1)+(size_t)d;}
static inline uint32_t addm(uint32_t a,uint32_t b,uint32_t P){uint64_t z=(uint64_t)a+b; if(z>=P)z-=P; return(uint32_t)z;}
static inline uint32_t subm(uint32_t a,uint32_t b,uint32_t P){return a>=b?a-b:(uint32_t)((uint64_t)a+P-b);}
static inline uint32_t scal(uint64_t k,uint32_t a,uint32_t P){return(uint32_t)((k*a)%P);}
static inline void clearv(vector<uint32_t>&z){fill(z.begin(),z.end(),0);}

void step_linear(const vector<InList>&inc,const vector<uint32_t>&in,vector<uint32_t>&out,int K,int D,uint32_t P){
 clearv(out);
 #pragma omp parallel for schedule(static)
 for(int dst=0;dst<K;dst++){
   uint32_t* __restrict o=out.data()+IX(dst,0,D);
   for(const auto&e:inc[dst].e){
     const uint32_t* __restrict a=in.data()+IX(e.u,0,D);
     int sh=(int)e.t;
     for(int d=0;d<=D-sh;d++) o[d+sh]=addm(o[d+sh],a[d],P);
   }
 }
}
void step_scored(const vector<InList>&inc,const vector<uint32_t>&ic,const vector<uint32_t>&is,const vector<uint32_t>&iv,
 vector<uint32_t>&oc,vector<uint32_t>&os,vector<uint32_t>&ov,int K,int D,bool deriv,uint32_t P){
 clearv(oc); clearv(os); clearv(ov);
 #pragma omp parallel for schedule(static)
 for(int dst=0;dst<K;dst++){
   uint32_t* __restrict co=oc.data()+IX(dst,0,D); uint32_t* __restrict so=os.data()+IX(dst,0,D); uint32_t* __restrict vo=ov.data()+IX(dst,0,D);
   for(const auto&e:inc[dst].e){
     if(deriv && !e.t) continue;
     int sh=deriv?0:(int)e.t;
     const uint32_t* __restrict ci=ic.data()+IX(e.u,0,D); const uint32_t* __restrict si=is.data()+IX(e.u,0,D); const uint32_t* __restrict vi=iv.data()+IX(e.u,0,D);
     if(!e.a){
       for(int d=0;d<=D-sh;d++){ int j=d+sh; co[j]=addm(co[j],ci[d],P); so[j]=addm(so[j],si[d],P); vo[j]=addm(vo[j],vi[d],P); }
     }else{
       for(int d=0;d<=D-sh;d++){ int j=d+sh; uint32_t c=ci[d],s=si[d],v=vi[d]; co[j]=addm(co[j],c,P); so[j]=addm(so[j],addm(s,c,P),P); uint32_t vv=addm(v,addm(s,s,P),P); vv=addm(vv,c,P); vo[j]=addm(vo[j],vv,P); }
     }
   }
 }
}
vector<uint32_t> burnout(const vector<InList>&inc,const vector<uint32_t>&mid,const vector<uint8_t>&active,int K,int Dmid,int Dfull,int burn,uint32_t P){
 size_t S=(size_t)K*(Dfull+1); vector<uint32_t>A(S),B(S);
 #pragma omp parallel for schedule(static)
 for(int st=0;st<K;st++)for(int d=0;d<=Dmid;d++)A[IX(st,d,Dfull)]=mid[IX(st,d,Dmid)];
 for(int k=0;k<burn;k++){step_linear(inc,A,B,K,Dfull,P);swap(A,B);} vector<uint32_t>z(Dfull+1);
 #pragma omp parallel
 {
   vector<uint32_t> local(Dfull+1);
   #pragma omp for nowait schedule(static)
   for(int st=0;st<K;st++) if(active[st]){const uint32_t* row=A.data()+IX(st,0,Dfull); for(int d=0;d<=Dfull;d++)local[d]=addm(local[d],row[d],P);}
   #pragma omp critical
   {for(int d=0;d<=Dfull;d++)z[d]=addm(z[d],local[d],P);}
 }
 return z;
}
struct Agg{vector<uint32_t>c,s,v;};
Agg runone(const vector<InList>&inc,const vector<int64_t>&sz,const vector<uint8_t>&active,int K,int burn,int scored,int Dmid,int Dfull,bool num,uint32_t P){
 size_t S=(size_t)K*(Dmid+1); vector<uint32_t>ca(S),cb(S);
 for(int i=0;i<K;i++){int64_t q=sz[i]%P;if(q<0)q+=P;ca[IX(i,0,Dmid)]=(uint32_t)q;}
 for(int k=0;k<burn;k++){step_linear(inc,ca,cb,K,Dmid,P);swap(ca,cb);} vector<uint32_t>().swap(cb);
 vector<uint32_t>sa(S),va(S),co(S),so(S),vo(S);
 for(int k=0;k<scored;k++){step_scored(inc,ca,sa,va,co,so,vo,K,Dmid,false,P);swap(ca,co);swap(sa,so);swap(va,vo);}
 step_scored(inc,ca,sa,va,co,so,vo,K,Dmid,num,P);swap(ca,co);swap(sa,so);swap(va,vo);
 for(int k=0;k<scored;k++){step_scored(inc,ca,sa,va,co,so,vo,K,Dmid,false,P);swap(ca,co);swap(sa,so);swap(va,vo);} vector<uint32_t>().swap(co);vector<uint32_t>().swap(so);vector<uint32_t>().swap(vo);
 Agg z; z.c=burnout(inc,ca,active,K,Dmid,Dfull,burn,P); vector<uint32_t>().swap(ca); z.s=burnout(inc,sa,active,K,Dmid,Dfull,burn,P); vector<uint32_t>().swap(sa); z.v=burnout(inc,va,active,K,Dmid,Dfull,burn,P); return z;
}
vector<uint32_t> conv(const vector<uint32_t>&a,const vector<uint32_t>&b,uint32_t P){vector<uint32_t>z(a.size()+b.size()-1);for(size_t i=0;i<a.size();i++)if(a[i])for(size_t j=0;j<b.size();j++)if(b[j])z[i+j]=addm(z[i+j],(uint32_t)(((uint64_t)a[i]*b[j])%P),P);return z;}
int main(int argc,char**argv){
 if(argc!=10){cerr<<"usage edges sizes active burn scored Dmid Dfull prime out\n";return 2;} string ep=argv[1],sp=argv[2],ap=argv[3],op=argv[9]; int burn=stoi(argv[4]),scored=stoi(argv[5]),Dmid=stoi(argv[6]),D=stoi(argv[7]); uint32_t P=(uint32_t)stoul(argv[8]);
 ifstream f(ep,ios::binary);uint32_t K,E;f.read((char*)&K,4);f.read((char*)&E,4);vector<int32_t>rr(E),cc(E);vector<uint8_t>tt(E),aa(E);f.read((char*)rr.data(),4*E);f.read((char*)cc.data(),4*E);f.read((char*)tt.data(),E);f.read((char*)aa.data(),E);if(!f)return 3;
 vector<InList>inc(K);for(uint32_t e=0;e<E;e++)inc[cc[e]].e.push_back({rr[e],tt[e],aa[e]}); vector<int64_t>sz(K); ifstream sf(sp,ios::binary);sf.read((char*)sz.data(),8*K);if(!sf)return 4; vector<uint8_t>active(K);ifstream af(ap,ios::binary);af.read((char*)active.data(),K);if(!af)return 5;
 Agg den=runone(inc,sz,active,K,burn,scored,Dmid,D,false,P),num=runone(inc,sz,active,K,burn,scored,Dmid,D,true,P); int nscore=2*scored+1; vector<uint32_t>D1(D+1),N1(D+1),D2(D+1),N2(D+1); uint64_t nm=(uint64_t)nscore%P,n2=(nm*nm)%P;
 for(int d=0;d<=D;d++){D1[d]=subm(scal(3,den.s[d],P),scal(nm,den.c[d],P),P);N1[d]=subm(scal(3,num.s[d],P),scal(nm,num.c[d],P),P);uint32_t q=scal(9,den.v[d],P);q=subm(q,scal((6*nm)%P,den.s[d],P),P);q=addm(q,scal(n2,den.c[d],P),P);D2[d]=q;q=scal(9,num.v[d],P);q=subm(q,scal((6*nm)%P,num.s[d],P),P);q=addm(q,scal(n2,num.c[d],P),P);N2[d]=q;}
 auto A1=conv(N1,den.c,P),B1=conv(D1,num.c,P),A2=conv(N2,den.c,P),B2=conv(D2,num.c,P);vector<uint32_t>F(max(A2.size(),B2.size())),G(max(A1.size(),B1.size()));for(size_t i=0;i<F.size();i++)F[i]=subm(i<A2.size()?A2[i]:0,i<B2.size()?B2[i]:0,P);for(size_t i=0;i<G.size();i++)G[i]=subm(i<A1.size()?A1[i]:0,i<B1.size()?B1[i]:0,P);while(F.size()>1&&!F.back())F.pop_back();while(G.size()>1&&!G.back())G.pop_back();ofstream o(op);o<<"P "<<P<<"\nFDEG "<<F.size()-1<<"\nGDEG "<<G.size()-1<<"\n";auto dump=[&](const char*n,const vector<uint32_t>&v){o<<n<<"\n";for(auto x:v)o<<x<<"\n";};dump("F",F);dump("G",G);dump("N0",num.c);dump("D0",den.c);o<<"END\n";return 0;
}
