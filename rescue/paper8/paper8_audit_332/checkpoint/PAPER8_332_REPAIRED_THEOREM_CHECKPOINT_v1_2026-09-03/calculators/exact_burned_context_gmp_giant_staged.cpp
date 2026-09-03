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
static inline size_t IX(int st,int d,int D){return (size_t)st*(D+1)+d;}
void clearv(vector<mpz_class>&z){fill(z.begin(),z.end(),0);}
void step_linear(const vector<InList>&inc,const vector<mpz_class>&in,vector<mpz_class>&out,int K,int D){
 clearv(out);
 #pragma omp parallel for schedule(static)
 for(int dst=0;dst<K;dst++) for(int d=0;d<=D;d++){
  auto& o=out[IX(dst,d,D)];
  for(const auto&e:inc[dst].e){int sd=d-(int)e.t;if(sd>=0){const auto&x=in[IX(e.u,sd,D)];if(x!=0)o+=x;}}
 }
}
void step_scored(const vector<InList>&inc,const vector<mpz_class>&ic,const vector<mpz_class>&is,const vector<mpz_class>&iv,
                 vector<mpz_class>&oc,vector<mpz_class>&os,vector<mpz_class>&ov,int K,int D,bool deriv){
 clearv(oc);clearv(os);clearv(ov);
 #pragma omp parallel for schedule(static)
 for(int dst=0;dst<K;dst++) for(int d=0;d<=D;d++){
  auto& c0=oc[IX(dst,d,D)];auto&s0=os[IX(dst,d,D)];auto&v0=ov[IX(dst,d,D)];
  for(const auto&e:inc[dst].e){
   if(deriv && !e.t) continue;
   int sd=deriv?d:d-(int)e.t;
   if(sd<0) continue;
   const auto&c=ic[IX(e.u,sd,D)];if(c==0)continue;const auto&s=is[IX(e.u,sd,D)];const auto&v=iv[IX(e.u,sd,D)];
   c0+=c;s0+=s;v0+=v;if(e.a){s0+=c;v0+=(s<<1);v0+=c;}
  }
 }
}
vector<mpz_class> burnout_aggregate(const vector<InList>&inc,const vector<mpz_class>&mid,int K,int Dmid,int Dfull,int burn,const vector<uint8_t>&active){
 size_t Sf=(size_t)K*(Dfull+1);vector<mpz_class>A(Sf),B(Sf);
 #pragma omp parallel for schedule(static)
 for(int st=0;st<K;st++)for(int d=0;d<=Dmid;d++)A[IX(st,d,Dfull)]=mid[IX(st,d,Dmid)];
 for(int k=0;k<burn;k++){step_linear(inc,A,B,K,Dfull);swap(A,B);}
 vector<mpz_class>z(Dfull+1);for(int st=0;st<K;st++)if(active[st])for(int d=0;d<=Dfull;d++)z[d]+=A[IX(st,d,Dfull)];return z;
}
struct Agg{vector<mpz_class>c,s,v;};
Agg run_one(const vector<InList>&inc,const vector<int64_t>&sz,const vector<uint8_t>&active,int K,int burn,int scored,int Dmid,int Dfull,bool numerator){
 size_t Sm=(size_t)K*(Dmid+1);vector<mpz_class>ca(Sm),cb(Sm);
 for(int i=0;i<K;i++)ca[IX(i,0,Dmid)]=sz[i];
 for(int k=0;k<burn;k++){step_linear(inc,ca,cb,K,Dmid);swap(ca,cb);} vector<mpz_class>().swap(cb);
 vector<mpz_class>sa(Sm),va(Sm),cb2(Sm),sb(Sm),vb(Sm);
 for(int k=0;k<scored;k++){step_scored(inc,ca,sa,va,cb2,sb,vb,K,Dmid,false);swap(ca,cb2);swap(sa,sb);swap(va,vb);}
 step_scored(inc,ca,sa,va,cb2,sb,vb,K,Dmid,numerator);swap(ca,cb2);swap(sa,sb);swap(va,vb);
 for(int k=0;k<scored;k++){step_scored(inc,ca,sa,va,cb2,sb,vb,K,Dmid,false);swap(ca,cb2);swap(sa,sb);swap(va,vb);}
 vector<mpz_class>().swap(cb2);vector<mpz_class>().swap(sb);vector<mpz_class>().swap(vb);
 Agg out;out.c=burnout_aggregate(inc,ca,K,Dmid,Dfull,burn,active); vector<mpz_class>().swap(ca);
 out.s=burnout_aggregate(inc,sa,K,Dmid,Dfull,burn,active); vector<mpz_class>().swap(sa);
 out.v=burnout_aggregate(inc,va,K,Dmid,Dfull,burn,active); vector<mpz_class>().swap(va);
 return out;
}
vector<mpz_class> conv(const vector<mpz_class>&a,const vector<mpz_class>&b){vector<mpz_class>z(a.size()+b.size()-1);for(size_t i=0;i<a.size();i++)if(a[i]!=0)for(size_t j=0;j<b.size();j++)if(b[j]!=0)z[i+j]+=a[i]*b[j];return z;}
int main(int argc,char**argv){
 if(argc!=9){cerr<<"usage edges sizes active burn scored Dmid Dfull out\n";return 2;}string ep=argv[1],sp=argv[2],ap=argv[3],op=argv[8];int burn=stoi(argv[4]),scored=stoi(argv[5]),Dmid=stoi(argv[6]),D=stoi(argv[7]);
 ifstream f(ep,ios::binary);uint32_t K,E;f.read((char*)&K,4);f.read((char*)&E,4);vector<int32_t>rr(E),cc(E);vector<uint8_t>tt(E),aa(E);f.read((char*)rr.data(),4*E);f.read((char*)cc.data(),4*E);f.read((char*)tt.data(),E);f.read((char*)aa.data(),E);if(!f)return 3;
 vector<InList>inc(K);for(uint32_t e=0;e<E;e++)inc[cc[e]].e.push_back({rr[e],tt[e],aa[e]});vector<int64_t>sz(K);ifstream sf(sp,ios::binary);sf.read((char*)sz.data(),8*K);if(!sf)return 4; vector<uint8_t>active(K);ifstream af(ap,ios::binary);af.read((char*)active.data(),K);if(!af)return 5;
 auto t0=chrono::steady_clock::now();int total=2*(burn+scored)+1,nscore=2*scored+1;cerr<<"K "<<K<<" E "<<E<<" burn "<<burn<<" scored "<<scored<<" total "<<total<<" nscore "<<nscore<<" Dmid "<<Dmid<<" Dfull "<<D<<"\n";
 Agg den=run_one(inc,sz,active,K,burn,scored,Dmid,D,false);cerr<<"den done "<<chrono::duration<double>(chrono::steady_clock::now()-t0).count()<<"\n";
 Agg num=run_one(inc,sz,active,K,burn,scored,Dmid,D,true);cerr<<"num done "<<chrono::duration<double>(chrono::steady_clock::now()-t0).count()<<"\n";
 vector<mpz_class>D1(D+1),N1(D+1),D2(D+1),N2(D+1);for(int d=0;d<=D;d++){D1[d]=3*den.s[d]-nscore*den.c[d];N1[d]=3*num.s[d]-nscore*num.c[d];D2[d]=9*den.v[d]-6*nscore*den.s[d]+(mpz_class)nscore*nscore*den.c[d];N2[d]=9*num.v[d]-6*nscore*num.s[d]+(mpz_class)nscore*nscore*num.c[d];}
 auto A1=conv(N1,den.c),B1=conv(D1,num.c),A2=conv(N2,den.c),B2=conv(D2,num.c);vector<mpz_class>F(max(A2.size(),B2.size())),G(max(A1.size(),B1.size()));for(size_t i=0;i<F.size();i++){if(i<A2.size())F[i]+=A2[i];if(i<B2.size())F[i]-=B2[i];}for(size_t i=0;i<G.size();i++){if(i<A1.size())G[i]+=A1[i];if(i<B1.size())G[i]-=B1[i];}while(F.size()>1&&F.back()==0)F.pop_back();while(G.size()>1&&G.back()==0)G.pop_back();
 ofstream o(op);o<<"BURN "<<burn<<"\nSCORED "<<scored<<"\nTOTAL "<<total<<"\nNSCORE "<<nscore<<"\nDMID "<<Dmid<<"\nD "<<D<<"\nFDEG "<<F.size()-1<<"\nGDEG "<<G.size()-1<<"\nF\n";for(auto&x:F)o<<x.get_str()<<"\n";o<<"G\n";for(auto&x:G)o<<x.get_str()<<"\n";o<<"N0\n";for(auto&x:num.c)o<<x.get_str()<<"\n";o<<"D0\n";for(auto&x:den.c)o<<x.get_str()<<"\n";o<<"ENDPOLY\n";
 cerr<<"total_sec "<<chrono::duration<double>(chrono::steady_clock::now()-t0).count()<<" Fdeg "<<F.size()-1<<" Gdeg "<<G.size()-1<<"\n";
}
