#include <gmpxx.h>
#include <vector>
#include <fstream>
#include <iostream>
#include <cstdint>
#include <algorithm>
#include <string>
#include <chrono>
#include <numeric>
using namespace std;
struct Edge{int u; uint8_t t,a;};
struct InList{vector<Edge> e;};
struct Mom { vector<mpz_class> c,s,v; Mom(){} Mom(size_t n):c(n),s(n),v(n){} };
static inline size_t IX(int st,int d,int D){return (size_t)st*(D+1)+d;}
void step(const vector<InList>& inc, const Mom& in, Mom& out, int K,int D){
  fill(out.c.begin(),out.c.end(),0);fill(out.s.begin(),out.s.end(),0);fill(out.v.begin(),out.v.end(),0);
  #pragma omp parallel for schedule(static)
  for(int dst=0;dst<K;dst++) for(int d=0;d<=D;d++){
    auto &oc=out.c[IX(dst,d,D)]; auto &os=out.s[IX(dst,d,D)]; auto &ov=out.v[IX(dst,d,D)];
    for(const auto &ed:inc[dst].e){
      int sd=d-(int)ed.t; if(sd<0) continue;
      const auto &c=in.c[IX(ed.u,sd,D)]; if(c==0) continue;
      const auto &s=in.s[IX(ed.u,sd,D)]; const auto &v=in.v[IX(ed.u,sd,D)];
      oc += c; os += s; ov += v; if(ed.a){ os += c; ov += (s<<1); ov += c; }
    }
  }
}
void step_target_derivative(const vector<InList>& inc, const Mom& in, Mom& out, int K,int D){
  fill(out.c.begin(),out.c.end(),0);fill(out.s.begin(),out.s.end(),0);fill(out.v.begin(),out.v.end(),0);
  #pragma omp parallel for schedule(static)
  for(int dst=0;dst<K;dst++) for(int d=0;d<=D;d++){
    auto &oc=out.c[IX(dst,d,D)]; auto &os=out.s[IX(dst,d,D)]; auto &ov=out.v[IX(dst,d,D)];
    for(const auto &ed:inc[dst].e){ if(!ed.t) continue; const auto &c=in.c[IX(ed.u,d,D)]; if(c==0) continue; const auto &ss=in.s[IX(ed.u,d,D)]; const auto &vv=in.v[IX(ed.u,d,D)]; oc+=c;os+=ss;ov+=vv;if(ed.a){os+=c;ov+=(ss<<1);ov+=c;} }
  }
}
vector<mpz_class> conv(const vector<mpz_class>&a,const vector<mpz_class>&b){
 vector<mpz_class> z(a.size()+b.size()-1);
 for(size_t i=0;i<a.size();i++) if(a[i]!=0) for(size_t j=0;j<b.size();j++) if(b[j]!=0) z[i+j]+=a[i]*b[j];
 return z;
}
int main(int argc,char**argv){
 if(argc<6){cerr<<"usage edges.bin sizes.bin L D out.txt\n";return 2;} string fp=argv[1], sfp=argv[2]; int L=stoi(argv[3]),D=stoi(argv[4]); string outp=argv[5];
 ifstream f(fp,ios::binary);uint32_t K,E;f.read((char*)&K,4);f.read((char*)&E,4);vector<int32_t> rr(E),cc(E);vector<uint8_t> tt(E),aa(E);f.read((char*)rr.data(),4*E);f.read((char*)cc.data(),4*E);f.read((char*)tt.data(),E);f.read((char*)aa.data(),E); if(!f){cerr<<"bad edges input\n";return 3;}
 vector<InList> inc(K);for(uint32_t e=0;e<E;e++)inc[cc[e]].e.push_back({rr[e],tt[e],aa[e]});
 vector<int64_t> sizesv(K); { ifstream sf(sfp,ios::binary); sf.read((char*)sizesv.data(),8*K); if(!sf){cerr<<"bad sizes input\n";return 4;} }
 int n=2*L+1; size_t SZ=(size_t)K*(D+1); cerr<<"K "<<K<<" E "<<E<<" L "<<L<<" n "<<n<<" D "<<D<<" cells "<<SZ<<"\n";
 Mom A(SZ),B(SZ),Den(SZ),Num(SZ),TmpD(SZ),TmpN(SZ); for(uint32_t i=0;i<K;i++) A.c[IX(i,0,D)]=sizesv[i];
 auto t0=chrono::steady_clock::now(); for(int k=0;k<L;k++){step(inc,A,B,K,D); swap(A,B); if((k+1)%25==0) cerr<<"left "<<k+1<<" sec "<<chrono::duration<double>(chrono::steady_clock::now()-t0).count()<<"\n";}
 step(inc,A,Den,K,D); step_target_derivative(inc,A,Num,K,D);
 for(int k=0;k<L;k++){step(inc,Den,TmpD,K,D);swap(Den,TmpD);step(inc,Num,TmpN,K,D);swap(Num,TmpN); if((k+1)%25==0) cerr<<"right "<<k+1<<" sec "<<chrono::duration<double>(chrono::steady_clock::now()-t0).count()<<"\n";}
 vector<mpz_class> Dc(D+1),Ds(D+1),Dv(D+1),Nc(D+1),Ns(D+1),Nv(D+1);
 for(uint32_t i=0;i<K;i++)for(int d=0;d<=D;d++){size_t x=IX(i,d,D);Dc[d]+=Den.c[x];Ds[d]+=Den.s[x];Dv[d]+=Den.v[x];Nc[d]+=Num.c[x];Ns[d]+=Num.s[x];Nv[d]+=Num.v[x];}
 vector<mpz_class> D1(D+1),N1(D+1),D2(D+1),N2(D+1); for(int d=0;d<=D;d++){D1[d]=3*Ds[d]-n*Dc[d]; N1[d]=3*Ns[d]-n*Nc[d]; D2[d]=9*Dv[d]-6*n*Ds[d]+(mpz_class)n*n*Dc[d]; N2[d]=9*Nv[d]-6*n*Ns[d]+(mpz_class)n*n*Nc[d];}
 auto A1=conv(N1,Dc), B1=conv(D1,Nc), A2=conv(N2,Dc), B2=conv(D2,Nc); size_t deg=max(A2.size(),B2.size());vector<mpz_class> F(deg),G(max(A1.size(),B1.size()));
 for(size_t i=0;i<deg;i++){if(i<A2.size())F[i]+=A2[i];if(i<B2.size())F[i]-=B2[i];} for(size_t i=0;i<G.size();i++){if(i<A1.size())G[i]+=A1[i];if(i<B1.size())G[i]-=B1[i];}
 while(F.size()>1&&F.back()==0) F.pop_back();
 while(G.size()>1&&G.back()==0) G.pop_back();
 ofstream o(outp);o<<"L "<<L<<"\nN "<<n<<"\nD "<<D<<"\nFDEG "<<F.size()-1<<"\nGDEG "<<G.size()-1<<"\n"; o<<"F\n";for(auto &x:F)o<<x.get_str()<<"\n";o<<"G\n";for(auto &x:G)o<<x.get_str()<<"\n";o<<"N0\n";for(auto &x:Nc)o<<x.get_str()<<"\n";o<<"D0\n";for(auto &x:Dc)o<<x.get_str()<<"\n";o<<"ENDPOLY\n"; o<<"N0AT1 "<<accumulate(Nc.begin(),Nc.end(),mpz_class(0)).get_str()<<"\n";o<<"D0AT1 "<<accumulate(Dc.begin(),Dc.end(),mpz_class(0)).get_str()<<"\n"; cerr<<"total "<<chrono::duration<double>(chrono::steady_clock::now()-t0).count()<<" Fdeg "<<F.size()-1<<"\n";
}
