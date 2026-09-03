
#include <bits/stdc++.h>
using namespace std;
using V6=array<int,6>;

struct V6Hash{
 size_t operator()(V6 const&v)const noexcept{
  uint64_t h=1469598103934665603ULL;
  for(int x:v){h^=(uint64_t)(x+4096);h*=1099511628211ULL;}
  return h;
 }
};
struct Key6Hash{
 size_t operator()(V6 const&v)const noexcept{return V6Hash{}(v);}
};
struct Tpl{
 unsigned char a1,a2,a3; V6 d;
 bool operator==(Tpl const&o)const{return a1==o.a1&&a2==o.a2&&a3==o.a3&&d==o.d;}
};
struct TplHash{
 size_t operator()(Tpl const&t)const noexcept{
  uint64_t h=(t.a1*49u+t.a2*7u+t.a3)+1469598103934665603ULL;
  for(int x:t.d){h^=(uint64_t)(x+4096);h*=1099511628211ULL;}
  return h;
 }
};

static const string AL="abcdef";
static const string HIMG[6]={"ace","adf","bdf","bdc","afe","bce"};
static const int MH[6][6]={
 {1,1,0,0,1,0},
 {0,0,1,1,0,1},
 {1,0,0,1,0,1},
 {0,1,1,1,0,0},
 {1,0,0,0,1,1},
 {0,1,1,0,1,0}
};
// Q rows.
static const int Q[3][6]={
 {0,2,-1,-1,0,0},
 {1,-1,1,0,-1,0},
 {1,1,-1,0,0,-1}
};
// For r_{+sqrt3}(d)=A(d)+B(d)*sqrt3,
// r_{-sqrt3}(d)=A(d)-B(d)*sqrt3.
static const int RA[6]={2,-1,-2,-3,3,1};
static const int RB[6]={1,0,-1,-2,2,0};

V6 add6(V6 a,const V6&b){for(int i=0;i<6;i++)a[i]+=b[i];return a;}
V6 sub6(V6 a,const V6&b){for(int i=0;i<6;i++)a[i]-=b[i];return a;}
V6 par6(const string&s){V6 v{};for(char c:s)v[c-'a']++;return v;}
V6 applyMH(const V6&v){
 V6 z{};for(int i=0;i<6;i++)for(int j=0;j<6;j++)z[i]+=MH[i][j]*v[j];return z;
}
int l1(const V6&v){int s=0;for(int x:v)s+=abs(x);return s;}

// Exact sign of p+q*sqrt(3), p,q integers.
int algSign(long long p,long long q){
 if(q==0)return (p>0)-(p<0);
 if(p==0)return (q>0)-(q<0);
 if((p>0)==(q>0))return p>0?1:-1;
 __int128 p2=(__int128)p*p, q2=(__int128)3*q*q;
 if(p2==q2)return 0; // cannot occur nontrivially for integer p,q
 bool pDominates=p2>q2;
 return p>0 ? (pDominates?1:-1) : (pDominates?-1:1);
}
// |a+b√3| <= c+d√3 (right side positive)
bool absAlgLE(long long a,long long b,long long c,long long d){
 // RHS - x >=0 and RHS + x >=0
 return algSign(c-a,d-b)>=0 && algSign(c+a,d+b)>=0;
}

struct Opt{unsigned char aprime;V6 p,s;};

vector<Opt> posOpts(unsigned char target){
 vector<Opt> out;
 if(target==0){
  out.push_back({0,V6{},V6{}});
  for(int x=0;x<6;x++){
   const string&z=HIMG[x];
   for(int j=0;j<=3;j++)out.push_back({(unsigned char)(x+1),par6(z.substr(0,j)),par6(z.substr(j))});
  }
 }else{
  char y='a'+target-1;
  for(int x=0;x<6;x++){
   const string&z=HIMG[x];
   for(int j=0;j<3;j++)if(z[j]==y)
    out.push_back({(unsigned char)(x+1),par6(z.substr(0,j)),par6(z.substr(j+1))});
  }
 }
 return out;
}

string morph(const string&w){
 string z;z.reserve(3*w.size());
 for(char c:w)z+=HIMG[c-'a'];
 return z;
}

int main(int argc,char**argv){
 if(argc<2){cerr<<"usage: source_realizability <outer-parent-tsv>\n";return 3;}
 auto start=chrono::steady_clock::now();

 // ------------------------------------------------------------
 // 1. Load initial outer-parent templates.
 // ------------------------------------------------------------
 ifstream in(argv[1]); string s1,s2,s3,ds;
 vector<Tpl> initial;
 auto dec=[](const string&s)->unsigned char{return s=="eps"?0:(unsigned char)(s[0]-'a'+1);};
 while(in>>s1>>s2>>s3>>ds){
  V6 d{};stringstream ss(ds);string q;int i=0;
  while(getline(ss,q,','))d[i++]=stoi(q);
  if(i!=6)throw runtime_error("bad d");
  initial.push_back({dec(s1),dec(s2),dec(s3),d});
 }
 cout<<"INITIAL_OUTER_PARENTS "<<initial.size()<<"\n";

 // Verify exact target expanding maxima fit the regression constants:
 // sum | <=2, |A+B√3| <= 10+7√3, |A-B√3| <=2+√3.
 for(auto&t:initial){
  long long S=0,A=0,B=0;
  for(int i=0;i<6;i++){S+=t.d[i];A+=(long long)RA[i]*t.d[i];B+=(long long)RB[i]*t.d[i];}
  if(abs(S)>2 || !absAlgLE(A,B,10,7) || !absAlgLE(A,-B,2,1))
   throw runtime_error("initial target expanding bound regression failed");
 }

 // ------------------------------------------------------------
 // 2. Global sound ancestor vector box.
 //
 // Contracting realizable factor-difference bounds: |Qd| <= (4,4,2).
 //
 // Expanding invariant bounds under d_parent=(d_target-c)/lambda:
 // lambda=3:       |r3| <= max(2, 6/(3-1)) = 3
 // lambda=+sqrt3: |r+| <= max(10+7s, (24+12s)/(s-1))
 //                = 30+18s
 // lambda=-sqrt3: |r-| <= max(2+s, 4s/(s-1))
 //                = 6+2s.
 //
 // Coordinate inversion plus 5/3 < sqrt3 < 7/4 gives safe free-variable
 // ranges d_4 in [-10,10], d_5 in [-10,10], d_6 in [-9,9].
 // Every candidate is accepted by exact algebraic tests below.
 // ------------------------------------------------------------
 vector<V6> box;
 box.reserve(100000);
 for(int q1=-4;q1<=4;q1++)
 for(int q2=-4;q2<=4;q2++)
 for(int q3=-2;q3<=2;q3++)
 for(int D=-10;D<=10;D++)
 for(int E=-10;E<=10;E++)
 for(int F=-9;F<=9;F++){
  // q1=2b-c-D
  // q2=a-b+c-E
  // q3=a+b-c-F
  long long nb=q2+2LL*D+E+2LL*q1-F-q3; // 2b
  if(nb&1LL)continue;
  int b=(int)(nb/2);
  int c=2*b-D-q1;
  int a=q2-b+D+E+q1;
  V6 d{a,b,c,D,E,F};
  int qq1=0,qq2=0,qq3=0;
  for(int i=0;i<6;i++){qq1+=Q[0][i]*d[i];qq2+=Q[1][i]*d[i];qq3+=Q[2][i]*d[i];}
  if(qq1!=q1||qq2!=q2||qq3!=q3)throw runtime_error("Q parameterization");
  long long sum=0,aa=0,bb=0;
  for(int i=0;i<6;i++){sum+=d[i];aa+=(long long)RA[i]*d[i];bb+=(long long)RB[i]*d[i];}
  if(abs(sum)>3)continue;
  if(!absAlgLE(aa,bb,30,18))continue;
  if(!absAlgLE(aa,-bb,6,2))continue;
  box.push_back(d);
 }
 sort(box.begin(),box.end());box.erase(unique(box.begin(),box.end()),box.end());
 cout<<"GLOBAL_ANCESTOR_VECTOR_BOX "<<box.size()<<"\n";

 unordered_map<V6,vector<V6>,Key6Hash> byImage;
 byImage.reserve(box.size()*2);
 for(auto&d:box)byImage[applyMH(d)].push_back(d);
 cout<<"DISTINCT_MH_IMAGES "<<byImage.size()<<"\n";

 // ------------------------------------------------------------
 // 3. Union ancestor closure of all outer parents.
 // Only parents whose d' lies in the sound global box are retained.
 // ------------------------------------------------------------
 unordered_set<Tpl,TplHash> seen;
 seen.reserve(1000000);
 vector<Tpl> frontier;
 for(auto&t:initial)if(seen.insert(t).second)frontier.push_back(t);
 size_t round=0;
 while(!frontier.empty()){
  round++;
  vector<Tpl> next;
  for(auto&t:frontier){
   auto O1=posOpts(t.a1),O2=posOpts(t.a2),O3=posOpts(t.a3);
   for(auto&o1:O1)for(auto&o2:O2)for(auto&o3:O3){
    // target d = Mh*d' + (s2+p3) - (s1+p2)
    // Mh*d' = target d - (s2+p3) + (s1+p2)
    V6 v=t.d;
    v=sub6(v,add6(o2.s,o3.p));
    v=add6(v,add6(o1.s,o2.p));
    auto it=byImage.find(v);
    if(it==byImage.end())continue;
    for(auto&dp:it->second){
     Tpl p{o1.aprime,o2.aprime,o3.aprime,dp};
     if(seen.insert(p).second)next.push_back(p);
    }
   }
  }
  cout<<"ANCESTOR_ROUND "<<round<<" NEW "<<next.size()<<" TOTAL "<<seen.size()<<"\n";
  frontier.swap(next);
  if(round>50)throw runtime_error("closure did not close");
 }
 cout<<"ANCESTOR_CLOSURE_SIZE "<<seen.size()<<"\n";

 int Delta=0;
 for(auto&t:seen)Delta=max(Delta,l1(t.d));
 int s=Delta+9; // Proposition 8 for k=2, delta=3
 cout<<"DELTA_MAX "<<Delta<<"\n";
 cout<<"FACTOR_LENGTH_BOUND "<<s<<"\n";
 if(s>200){cerr<<"factor bound unexpectedly large\n";return 7;}

 // ------------------------------------------------------------
 // 4. Exact factor sets F_m of Fact_infty(h6).
 // F2/F3 are the independently certified base language.
 // For m>=4, every length-m factor lies in h(u) for a source factor
 // of length ceil((m+2)/3)=(m+4)/3, which is <m.
 // ------------------------------------------------------------
 vector<unordered_set<string>> FS(s+1);
 FS[0].insert("");
 if(s>=1)for(char c:AL)FS[1].insert(string(1,c));
 if(s>=2){
  for(string z:{"ac","ad","af","bc","bd","cb","ce","dc","df","ea","eb","fa","fb","fe"})FS[2].insert(z);
 }
 if(s>=3){
  for(string z:{"ace","adf","afe","bce","bdc","bdf","cbc","cbd","cea","ceb","dcb",
                "dfa","dfb","eac","ead","eaf","ebc","ebd","fad","faf","fbd","fea"})FS[3].insert(z);
 }
 for(int m=4;m<=s;m++){
  int k=(m+4)/3;
  for(auto&u:FS[k]){
   string z=morph(u);
   for(int i=0;i+m<=(int)z.size();i++)FS[m].insert(z.substr(i,m));
  }
  if(FS[m].empty())throw runtime_error("empty factor set");
 }
 size_t totalFactors=0;
 for(int m=0;m<=s;m++)totalFactors+=FS[m].size();
 cout<<"TOTAL_FACTORS_LE_BOUND "<<totalFactors<<"\n";
 cout<<"FACTORS_AT_BOUND "<<FS[s].size()<<"\n";

 // ------------------------------------------------------------
 // 5. Direct realization search over all factors <= s.
 // Standard nonempty w1,w2 convention.
 // ------------------------------------------------------------
 auto tplPresent=[&](unsigned char a1,unsigned char a2,unsigned char a3,const V6&d){
  return seen.find(Tpl{a1,a2,a3,d})!=seen.end();
 };
 bool hit=false;string hitWord;Tpl hitTpl{};
 uint64_t decomps=0;

 for(int n=2;n<=s && !hit;n++)for(auto&w:FS[n]){
  // prefix Parikh for O(1) interval vectors
  vector<V6>P(n+1); P[0]=V6{};
  for(int i=0;i<n;i++){P[i+1]=P[i];P[i+1][w[i]-'a']++;}
  for(int first=0;first<=1 && !hit;first++){
   if(first && n<1)continue;
   unsigned char a1=first?(unsigned char)(w[0]-'a'+1):0;
   int lo=first?1:0;
   for(int last=0;last<=1 && !hit;last++){
    if(last && n-1<lo)continue;
    unsigned char a3=last?(unsigned char)(w[n-1]-'a'+1):0;
    int hi=last?n-1:n;
    int m=hi-lo;

    // a2=epsilon, split j; w1,w2 nonempty
    for(int j=1;j<m;j++){
     V6 p1{},p2{};
     for(int c=0;c<6;c++){p1[c]=P[lo+j][c]-P[lo][c];p2[c]=P[hi][c]-P[lo+j][c];}
     V6 d=sub6(p2,p1);decomps++;
     if(tplPresent(a1,0,a3,d)){hit=true;hitWord=w;hitTpl={a1,0,a3,d};break;}
    }
    if(hit)break;

    // a2 = letter at j; require nonempty sides => j=1..m-2
    for(int j=1;j<=m-2;j++){
     unsigned char a2=(unsigned char)(w[lo+j]-'a'+1);
     V6 p1{},p2{};
     for(int c=0;c<6;c++){p1[c]=P[lo+j][c]-P[lo][c];p2[c]=P[hi][c]-P[lo+j+1][c];}
     V6 d=sub6(p2,p1);decomps++;
     if(tplPresent(a1,a2,a3,d)){hit=true;hitWord=w;hitTpl={a1,a2,a3,d};break;}
    }
   }
  }
 }

 cout<<"REALIZATION_DECOMPOSITIONS_CHECKED "<<decomps<<"\n";
 cout<<"REALIZABLE_ANCESTOR_FOUND "<<(hit?"YES":"NO")<<"\n";
 if(hit){
  auto nm=[](unsigned char x){return x?string(1,char('a'+x-1)):"eps";};
  cout<<"WITNESS_WORD "<<hitWord<<"\n";
  cout<<"WITNESS_TEMPLATE "<<nm(hitTpl.a1)<<" "<<nm(hitTpl.a2)<<" "<<nm(hitTpl.a3)<<" ";
  for(int i=0;i<6;i++){if(i)cout<<",";cout<<hitTpl.d[i];}cout<<"\n";
 }
 double sec=chrono::duration<double>(chrono::steady_clock::now()-start).count();
 cout<<"SECONDS "<<fixed<<setprecision(3)<<sec<<"\n";
 cout<<"STATUS "<<(hit?"G3_REGRESSION_FAIL_REALIZABLE_PARENT":"G3_THEOREM10_SOURCE_REALIZABILITY_REGRESSION_PASS")<<"\n";
 return hit?2:0;
}
