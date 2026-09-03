#include <gmpxx.h>
#include <vector>
#include <fstream>
#include <iostream>
#include <cstdint>
#include <algorithm>
#include <string>
#include <chrono>
using namespace std;
struct Edge{int u; uint8_t t,a;}; struct InList{vector<Edge> e;};
struct Mom{vector<mpz_class> c,s,v;Mom(size_t n=0):c(n),s(n),v(n){}};
static inline size_t IX(int st,int d,int D){return (size_t)st*(D+1)+d;}
void clear(Mom&z){fill(z.c.begin(),z.c.end(),0);fill(z.s.begin(),z.s.end(),0);fill(z.v.begin(),z.v.end(),0);}
void step(const vector<InList>&inc,const Mom&in,Mom&out,int K,int D,bool deriv=false){
 clear(out);
 #pragma omp parallel for schedule(static)
 for(int dst=0;dst<K;dst++)for(int d=0;d<=D;d++){
  auto&oc=out.c[IX(dst,d,D)];auto&os=out.s[IX(dst,d,D)];auto&ov=out.v[IX(dst,d,D)];
  for(const auto&e:inc[dst].e){
   if(deriv && !e.t) continue;
   int sd=deriv?d:d-(int)e.t;
   if(sd<0) continue;
   const auto&c=in.c[IX(e.u,sd,D)];if(c==0)continue;const auto&s=in.s[IX(e.u,sd,D)];const auto&v=in.v[IX(e.u,sd,D)];
   oc+=c;os+=s;ov+=v;if(e.a){os+=c;ov+=(s<<1);ov+=c;}
  }
 }
}
void init(Mom&A,const vector<int64_t>&sz,int K,int D){clear(A);for(int i=0;i<K;i++)A.c[IX(i,0,D)]=sz[i];}
void run_left(const vector<InList>&inc,Mom&A,Mom&B,const vector<int64_t>&sz,int K,int D,int L){init(A,sz,K,D);clear(B);for(int k=0;k<L;k++){step(inc,A,B,K,D,false);swap(A,B);}}
void aggregate(const Mom&A,vector<mpz_class>&c,vector<mpz_class>&s,vector<mpz_class>&v,int K,int D){for(int d=0;d<=D;d++){c[d]=0;s[d]=0;v[d]=0;}for(int i=0;i<K;i++)for(int d=0;d<=D;d++){auto q=IX(i,d,D);c[d]+=A.c[q];s[d]+=A.s[q];v[d]+=A.v[q];}}
vector<mpz_class> conv(const vector<mpz_class>&a,const vector<mpz_class>&b){vector<mpz_class>z(a.size()+b.size()-1);for(size_t i=0;i<a.size();i++)if(a[i]!=0)for(size_t j=0;j<b.size();j++)if(b[j]!=0)z[i+j]+=a[i]*b[j];return z;}
int main(int argc,char**argv){
 if(argc!=6){cerr<<"usage edges sizes L D out\n";return 2;}string ep=argv[1],sp=argv[2],op=argv[5];int L=stoi(argv[3]),D=stoi(argv[4]);
 ifstream f(ep,ios::binary);uint32_t K,E;f.read((char*)&K,4);f.read((char*)&E,4);vector<int32_t>rr(E),cc(E);vector<uint8_t>tt(E),aa(E);f.read((char*)rr.data(),4*E);f.read((char*)cc.data(),4*E);f.read((char*)tt.data(),E);f.read((char*)aa.data(),E);if(!f)return 3;
 vector<InList>inc(K);for(uint32_t e=0;e<E;e++)inc[cc[e]].e.push_back({rr[e],tt[e],aa[e]});vector<int64_t>sz(K);ifstream sf(sp,ios::binary);sf.read((char*)sz.data(),8*K);if(!sf)return 4;
 size_t S=(size_t)K*(D+1);Mom A(S),B(S);vector<mpz_class>Dc(D+1),Ds(D+1),Dv(D+1),Nc(D+1),Ns(D+1),Nv(D+1);auto t0=chrono::steady_clock::now();
 cerr<<"K "<<K<<" E "<<E<<" L "<<L<<" D "<<D<<" cells "<<S<<"\n";
 run_left(inc,A,B,sz,K,D,L);step(inc,A,B,K,D,false);swap(A,B);for(int k=0;k<L;k++){step(inc,A,B,K,D,false);swap(A,B);}aggregate(A,Dc,Ds,Dv,K,D);cerr<<"den done "<<chrono::duration<double>(chrono::steady_clock::now()-t0).count()<<"\n";
 run_left(inc,A,B,sz,K,D,L);step(inc,A,B,K,D,true);swap(A,B);for(int k=0;k<L;k++){step(inc,A,B,K,D,false);swap(A,B);}aggregate(A,Nc,Ns,Nv,K,D);cerr<<"num done "<<chrono::duration<double>(chrono::steady_clock::now()-t0).count()<<"\n";
 int n=2*L+1;vector<mpz_class>D1(D+1),N1(D+1),D2(D+1),N2(D+1);for(int d=0;d<=D;d++){D1[d]=3*Ds[d]-n*Dc[d];N1[d]=3*Ns[d]-n*Nc[d];D2[d]=9*Dv[d]-6*n*Ds[d]+(mpz_class)n*n*Dc[d];N2[d]=9*Nv[d]-6*n*Ns[d]+(mpz_class)n*n*Nc[d];}
 auto A1=conv(N1,Dc),B1=conv(D1,Nc),A2=conv(N2,Dc),B2=conv(D2,Nc);vector<mpz_class>F(max(A2.size(),B2.size())),G(max(A1.size(),B1.size()));for(size_t i=0;i<F.size();i++){if(i<A2.size())F[i]+=A2[i];if(i<B2.size())F[i]-=B2[i];}for(size_t i=0;i<G.size();i++){if(i<A1.size())G[i]+=A1[i];if(i<B1.size())G[i]-=B1[i];}while(F.size()>1&&F.back()==0)F.pop_back();while(G.size()>1&&G.back()==0)G.pop_back();
 ofstream o(op);o<<"L "<<L<<"\nN "<<n<<"\nD "<<D<<"\nFDEG "<<F.size()-1<<"\nGDEG "<<G.size()-1<<"\nF\n";for(auto&x:F)o<<x.get_str()<<"\n";o<<"G\n";for(auto&x:G)o<<x.get_str()<<"\n";o<<"N0\n";for(auto&x:Nc)o<<x.get_str()<<"\n";o<<"D0\n";for(auto&x:Dc)o<<x.get_str()<<"\n";o<<"ENDPOLY\n";
 cerr<<"total "<<chrono::duration<double>(chrono::steady_clock::now()-t0).count()<<" Fdeg "<<F.size()-1<<" Gdeg "<<G.size()-1<<"\n";
}
