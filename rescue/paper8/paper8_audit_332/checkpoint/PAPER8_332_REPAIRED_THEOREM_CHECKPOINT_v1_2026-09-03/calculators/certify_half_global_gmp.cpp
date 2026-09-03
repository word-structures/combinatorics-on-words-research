#include <gmpxx.h>
#include <algorithm>
#include <fstream>
#include <iostream>
#include <string>
#include <vector>
using namespace std;

static vector<mpz_class> conv(const vector<mpz_class>&a,const vector<mpz_class>&b){
    vector<mpz_class> z(a.size()+b.size()-1);
    for(size_t i=0;i<a.size();++i) if(a[i]!=0)
        for(size_t j=0;j<b.size();++j) if(b[j]!=0) z[i+j]+=a[i]*b[j];
    return z;
}
int main(int argc,char**argv){
    if(argc!=3){cerr<<"usage poly out_json\n";return 2;}
    ifstream f(argv[1]); if(!f)return 3;
    vector<mpz_class> F,G,N0,D0; vector<mpz_class>*cur=nullptr; string s;
    while(f>>s){
      if(s=="F"){cur=&F;continue;} if(s=="G"){cur=&G;continue;} if(s=="N0"){cur=&N0;continue;} if(s=="D0"){cur=&D0;continue;}
      if(s=="ENDPOLY"||s=="END"){cur=nullptr;continue;}
      // metadata value: skip both key and next token
      if(s=="BURN"||s=="SCORED"||s=="TOTAL"||s=="NSCORE"||s=="DMID"||s=="D"||s=="FDEG"||s=="GDEG"){ string v; f>>v; continue; }
      if(cur){ mpz_class x; if(x.set_str(s,10)!=0){cerr<<"bad integer "<<s<<"\n";return 4;} cur->push_back(std::move(x)); }
    }
    if(F.empty()||G.empty()||N0.empty()||D0.empty())return 5;
    bool Gzero=all_of(G.begin(),G.end(),[](const mpz_class&x){return x==0;});
    bool Nnon=all_of(N0.begin(),N0.end(),[](const mpz_class&x){return x>=0;});
    bool Dnon=all_of(D0.begin(),D0.end(),[](const mpz_class&x){return x>=0;});
    auto ND=conv(N0,D0); size_t nn=max(F.size(),ND.size());F.resize(nn);ND.resize(nn);
    vector<mpz_class> H(nn); for(size_t i=0;i<nn;i++) H[i]=-2*F[i]-9*ND[i];
    while(H.size()>1&&H.back()==0){ H.pop_back(); }
    unsigned n=(unsigned)H.size()-1;
    vector<mpz_class> S(n+1); // S_i=sum_k H_k C(n-k,i-k)
    for(unsigned k=0;k<=n;k++) if(H[k]!=0){
      mpz_class c=1; unsigned N=n-k;
      for(unsigned j=0;j<=N;j++){
        unsigned i=k+j; S[i]+=H[k]*c;
        if(j<N){ c *= (N-j); c /= (j+1); }
      }
    }
    size_t pos=0,zero=0,neg=0; unsigned first_bad=n+1;
    for(unsigned i=0;i<=n;i++){ if(S[i]>0)pos++; else if(S[i]==0){zero++;if(first_bad==n+1)first_bad=i;} else {neg++;if(first_bad==n+1)first_bad=i;} }
    // endpoints exact numerator/denominator for -C = -F/(9 N0 D0)
    auto sumv=[](const vector<mpz_class>&v){mpz_class z=0;for(auto&x:v)z+=x;return z;};
    mpz_class x0_num=-F[0], x0_den=9*N0[0]*D0[0];
    mpz_class Fs=sumv(F), Ns=sumv(N0), Ds=sumv(D0); mpz_class x1_num=-Fs, x1_den=9*Ns*Ds;
    ofstream o(argv[2]);
    o<<"{\n";
    o<<"  \"claim\": \"-C_burn(x) > 1/2 for all x in [0,1]\",\n";
    o<<"  \"H_degree\": "<<n<<",\n";
    o<<"  \"bernstein_count\": "<<(n+1)<<",\n";
    o<<"  \"bernstein_positive\": "<<pos<<",\n";
    o<<"  \"bernstein_zero\": "<<zero<<",\n";
    o<<"  \"bernstein_negative\": "<<neg<<",\n";
    o<<"  \"first_nonpositive_index\": "<<(first_bad==n+1?-1:(int)first_bad)<<",\n";
    o<<"  \"G_zero\": "<<(Gzero?"true":"false")<<",\n";
    o<<"  \"N0_nonnegative_coeffs\": "<<(Nnon?"true":"false")<<",\n";
    o<<"  \"D0_nonnegative_coeffs\": "<<(Dnon?"true":"false")<<",\n";
    o<<"  \"x0_minus_C_num\": \""<<x0_num.get_str()<<"\",\n";
    o<<"  \"x0_minus_C_den\": \""<<x0_den.get_str()<<"\",\n";
    o<<"  \"x1_minus_C_num\": \""<<x1_num.get_str()<<"\",\n";
    o<<"  \"x1_minus_C_den\": \""<<x1_den.get_str()<<"\",\n";
    o<<"  \"PASS\": "<<((pos==n+1&&Gzero&&Nnon&&Dnon)?"true":"false")<<"\n}\n";
    cerr<<"degree "<<n<<" positive "<<pos<<" zero "<<zero<<" negative "<<neg<<" first_bad "<<(first_bad==n+1?-1:(int)first_bad)<<"\n";
    return (pos==n+1&&Gzero&&Nnon&&Dnon)?0:10;
}
