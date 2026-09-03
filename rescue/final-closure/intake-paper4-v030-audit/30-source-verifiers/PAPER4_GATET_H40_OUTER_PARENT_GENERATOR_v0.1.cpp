
#include <bits/stdc++.h>
using namespace std;

using V3 = array<int,3>;
using V6 = array<int,6>;

struct V3Hash {
    size_t operator()(V3 const& v) const noexcept {
        return ((uint64_t)(v[0]+256)*1000003ULL) ^
               ((uint64_t)(v[1]+256)*10007ULL) ^
               (uint64_t)(v[2]+256);
    }
};
struct Parent {
    unsigned char a1,a2,a3; // 0=eps, 1..6=a..f
    V6 d;
    bool operator==(Parent const&o) const {
        return a1==o.a1&&a2==o.a2&&a3==o.a3&&d==o.d;
    }
};
struct ParentHash {
    size_t operator()(Parent const&p) const noexcept {
        uint64_t h=(p.a1*49u+p.a2*7u+p.a3)+1469598103934665603ULL;
        for(int x:p.d){ h^=(uint64_t)(x+4096); h*=1099511628211ULL; }
        return (size_t)h;
    }
};

static const int ROLE[6][3]={
    {15,14,11},{11,12,17},{10,14,16},
    {12,10,18},{13,16,11},{19,11,10}
};
// Q is a primitive integer basis for the left generalized 0-eigenspace of Mh6:
// Q * Mh6^2 = 0.
static const int QBOUND[3]={4,4,2};

// A = [M40;Q], det(A)=19920.
// Exact adjugate computed independently with SymPy and recorded here.
static const long long ADJ[6][6]={
 { 495,  375, -585, -840, 6000, 7680},
 {-329, -209,  751, 7480,  640,-1040},
 {-1268,1132,  412, 3520, 6160,-7520},
 { 610,-1550, 1090,-8480,-4880, 5440},
 {-444, 1716, -924,-4800,-8400, 1200},
 {1434, -966, -246, 3120,  480,-5760}
};
static const long long DET=19920;

struct Opt{
    unsigned char a; // 0=eps, 1..6
    V3 p,s;
};

V3 add3(const V3&a,const V3&b){return {a[0]+b[0],a[1]+b[1],a[2]+b[2]};}
V3 sub3(const V3&a,const V3&b){return {a[0]-b[0],a[1]-b[1],a[2]-b[2]};}

V3 par3(const string&s){
    V3 v{0,0,0};
    for(char c:s) v[c-'a']++;
    return v;
}

vector<V6> boundedSolutions(const V3&v){
    vector<V6> out;
    for(int q0=-QBOUND[0];q0<=QBOUND[0];q0++)
    for(int q1=-QBOUND[1];q1<=QBOUND[1];q1++)
    for(int q2=-QBOUND[2];q2<=QBOUND[2];q2++){
        long long rhs[6]={v[0],v[1],v[2],q0,q1,q2};
        long long num[6]{};
        bool ok=true;
        for(int i=0;i<6;i++){
            for(int j=0;j<6;j++) num[i]+=ADJ[i][j]*rhs[j];
            if(num[i]%DET){ok=false;break;}
        }
        if(!ok)continue;
        V6 d{};
        for(int i=0;i<6;i++)d[i]=(int)(num[i]/DET);
        out.push_back(d);
    }
    sort(out.begin(),out.end());
    out.erase(unique(out.begin(),out.end()),out.end());
    return out;
}

int main(int argc,char**argv){
    if(argc<2){
        cerr<<"usage: h40_outer_parents <six-block-file> [parent-output]\n";
        return 3;
    }
    map<char,string> H;
    ifstream in(argv[1]); char r; string w;
    while(in>>r>>w) if(r>='a'&&r<='f') H[r]=w;
    if(H.size()!=6){cerr<<"need six lines: a WORD ... f WORD\n";return 4;}
    for(int i=0;i<6;i++){
        char x='a'+i;
        if(H[x].size()!=40){cerr<<"role "<<x<<" length !=40\n";return 5;}
        V3 pv=par3(H[x]);
        for(int c=0;c<3;c++)if(pv[c]!=ROLE[i][c]){
            cerr<<"role "<<x<<" Parikh mismatch\n";return 6;
        }
    }

    vector<Opt> opts;
    opts.push_back({0,{0,0,0},{0,0,0}});
    for(int i=0;i<6;i++){
        char x='a'+i; const string& z=H[x];
        for(int cut=0;cut<=40;cut++){
            opts.push_back({(unsigned char)(i+1),par3(z.substr(0,cut)),par3(z.substr(cut))});
        }
    }
    if(opts.size()!=247) throw runtime_error("option count");

    auto t0=chrono::steady_clock::now();
    unordered_set<V3,V3Hash> vset;
    vset.reserve(200000);
    for(auto&o1:opts)for(auto&o2:opts){
        V3 left=add3(o1.s,o2.p);
        for(auto&o3:opts) vset.insert(sub3(left,add3(o2.s,o3.p)));
    }

    unordered_map<V3,vector<V6>,V3Hash> sol;
    sol.reserve(vset.size()*2);
    size_t nonemptyV=0;
    for(auto&v:vset){
        auto s=boundedSolutions(v);
        if(!s.empty())nonemptyV++;
        sol.emplace(v,move(s));
    }

    unordered_set<Parent,ParentHash> parents;
    parents.reserve(200000);
    uint64_t nonemptyTriples=0;
    for(auto&o1:opts)for(auto&o2:opts){
        V3 left=add3(o1.s,o2.p);
        for(auto&o3:opts){
            V3 v=sub3(left,add3(o2.s,o3.p));
            auto it=sol.find(v);
            if(it==sol.end()||it->second.empty())continue;
            nonemptyTriples++;
            for(auto&d:it->second)parents.insert({o1.a,o2.a,o3.a,d});
        }
    }
    auto t1=chrono::steady_clock::now();
    double sec=chrono::duration<double>(t1-t0).count();

    cout<<"STATUS EXACT_OUTER_PARENT_SUPERSET__REALIZABILITY_NOT_CHECKED\n";
    cout<<"BOUNDARY_OPTIONS_PER_SLOT "<<opts.size()<<"\n";
    cout<<"BOUNDARY_TRIPLES "<<(uint64_t)opts.size()*opts.size()*opts.size()<<"\n";
    cout<<"UNIQUE_CORRECTION_V "<<vset.size()<<"\n";
    cout<<"NONEMPTY_CORRECTION_V "<<nonemptyV<<"\n";
    cout<<"NONEMPTY_BOUNDARY_TRIPLES "<<nonemptyTriples<<"\n";
    cout<<"UNIQUE_PARENT_TEMPLATES "<<parents.size()<<"\n";
    cout<<"Q_DIFFERENCE_BOUNDS 4 4 2\n";
    cout<<"STACK_DET 19920\n";
    cout<<"SECONDS "<<fixed<<setprecision(3)<<sec<<"\n";

    if(argc>=3){
        vector<Parent> P(parents.begin(),parents.end());
        sort(P.begin(),P.end(),[](auto&a,auto&b){
            if(a.a1!=b.a1)return a.a1<b.a1;
            if(a.a2!=b.a2)return a.a2<b.a2;
            if(a.a3!=b.a3)return a.a3<b.a3;
            return a.d<b.d;
        });
        ofstream f(argv[2]);
        auto nm=[](unsigned char a)->string{return a?string(1,char('a'+a-1)):"eps";};
        for(auto&p:P){
            f<<nm(p.a1)<<'\t'<<nm(p.a2)<<'\t'<<nm(p.a3)<<'\t';
            for(int i=0;i<6;i++){if(i)f<<',';f<<p.d[i];}
            f<<'\n';
        }
    }
}
