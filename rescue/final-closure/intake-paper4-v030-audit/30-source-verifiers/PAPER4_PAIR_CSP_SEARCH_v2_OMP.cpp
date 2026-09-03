
#include <bits/stdc++.h>
using namespace std;

static const string ROLES="abcdef";
static const vector<pair<int,int>> EDGES={
    {0,2},{0,3},{0,5},{1,2},{1,3},{2,1},{2,4},
    {3,2},{3,5},{4,0},{4,1},{5,0},{5,1},{5,4}
};
static const vector<string> TRIS={
"ace","adf","afe","bce","bdc","bdf","cbc","cbd","cea","ceb","dcb",
"dfa","dfb","eac","ead","eaf","ebc","ebd","fad","faf","fbd","fea"};

static bool cleanConcat(const string&s,int maxp=40){
    // Pool words are independently internally clean.  For an 80-letter
    // concatenation only windows crossing the block seam can add a violation.
    int P[81][3]{};
    for(int i=0;i<80;i++){
        for(int c=0;c<3;c++)P[i+1][c]=P[i][c];
        P[i+1][s[i]-'a']++;
    }
    for(int p=2;p<=maxp&&2*p<=80;p++){
        int lo=max(0,40-2*p+1);
        int hi=min(39,80-2*p);
        for(int st=lo;st<=hi;st++){
            bool eq=true;
            for(int c=0;c<3;c++)
                if(P[st+p][c]-P[st][c]!=P[st+2*p][c]-P[st+p][c]){eq=false;break;}
            if(eq)return false;
        }
    }
    return true;
}
static int scoreTri(const array<string,6>&H,const string&tri){
    string s=H[tri[0]-'a']+H[tri[1]-'a']+H[tri[2]-'a'];
    int P[121][3]{};
    for(int i=0;i<120;i++){for(int c=0;c<3;c++)P[i+1][c]=P[i][c];P[i+1][s[i]-'a']++;}
    int z=0;
    for(int p=2;p<=40;p++)for(int st=0;st+2*p<=120;st++){
        bool eq=true;
        for(int c=0;c<3;c++)
            if(P[st+p][c]-P[st][c]!=P[st+2*p][c]-P[st+p][c]){eq=false;break;}
        if(eq)z++;
    }
    return z;
}

struct Bits{
    int n=0,W=0; vector<uint64_t>a;
    Bits(){}
    Bits(int n_,bool ones=false):n(n_),W((n+63)/64),a(W,ones?~0ULL:0){
        if(ones && n%64)a.back()&=((1ULL<<(n%64))-1);
    }
    bool any()const{for(auto x:a)if(x)return true;return false;}
    int count()const{int z=0;for(auto x:a)z+=__builtin_popcountll(x);return z;}
    bool test(int i)const{return (a[i>>6]>>(i&63))&1ULL;}
    void reset(int i){a[i>>6]&=~(1ULL<<(i&63));}
    void setOnly(int i){fill(a.begin(),a.end(),0);a[i>>6]|=1ULL<<(i&63);}
    void intersect(const Bits&b){for(int k=0;k<W;k++)a[k]&=b.a[k];}
    bool intersects(const Bits&b)const{for(int k=0;k<W;k++)if(a[k]&b.a[k])return true;return false;}
    vector<int> indices()const{
        vector<int>v;
        for(int k=0;k<W;k++){uint64_t x=a[k];while(x){int b=__builtin_ctzll(x);v.push_back(k*64+b);x&=x-1;}}
        return v;
    }
};

struct EMat{
    int x,y,N;
    vector<Bits> row,rev;
};

struct Solver{
    int N;
    array<vector<string>,6>pool;
    vector<EMat>E;
    array<Bits,6>cand;
    long long nodes=0,complete=0,propRounds=0;
    long long nodeLimit,completeLimit;
    int bestScore=INT_MAX;
    array<string,6>bestH{};
    bool foundZero=false;

    Solver(int n,long long nl,long long cl):N(n),nodeLimit(nl),completeLimit(cl){
        for(int r=0;r<6;r++)cand[r]=Bits(N,true);
    }

    bool propagate(array<Bits,6>&C){
        bool changed=true;
        while(changed){
            changed=false;propRounds++;
            for(auto &e:E){
                // remove unsupported x
                auto xs=C[e.x].indices();
                for(int i:xs){
                    if(!e.row[i].intersects(C[e.y])){
                        C[e.x].reset(i);changed=true;
                    }
                }
                if(!C[e.x].any())return false;
                auto ys=C[e.y].indices();
                for(int j:ys){
                    if(!e.rev[j].intersects(C[e.x])){
                        C[e.y].reset(j);changed=true;
                    }
                }
                if(!C[e.y].any())return false;
            }
        }
        return true;
    }

    int completeScore(const array<Bits,6>&C,array<string,6>&H){
        for(int r=0;r<6;r++){
            auto v=C[r].indices();
            if(v.size()!=1)return INT_MAX;
            H[r]=pool[r][v[0]];
        }
        int sc=0;
        for(auto&t:TRIS)sc+=scoreTri(H,t);
        return sc;
    }

    void dfs(array<Bits,6> C){
        if(foundZero || nodes>=nodeLimit || complete>=completeLimit)return;
        nodes++;
        if(!propagate(C))return;

        int var=-1,mn=INT_MAX;
        for(int r=0;r<6;r++){
            int z=C[r].count();
            if(z>1 && z<mn){mn=z;var=r;}
        }
        if(var<0){
            complete++;
            array<string,6>H;
            int sc=completeScore(C,H);
            if(sc<bestScore){
                bestScore=sc;bestH=H;
                cout<<"COMPLETE "<<complete<<" BEST "<<bestScore<<" NODES "<<nodes<<"\n";
                ofstream o("/mnt/data/PAPER4_PAIR_CSP_BEST_H.txt");
                for(int r=0;r<6;r++)o<<ROLES[r]<<" "<<H[r]<<"\n";
            }
            if(sc==0){foundZero=true;cout<<"FINITE_ZERO\n";}
            return;
        }

        // Candidate ordering: low immediate outgoing/incoming degree first to diversify.
        auto vals=C[var].indices();
        sort(vals.begin(),vals.end(),[&](int i,int j){
            long long di=0,dj=0;
            for(auto&e:E){
                if(e.x==var){di+=e.row[i].count();dj+=e.row[j].count();}
                if(e.y==var){di+=e.rev[i].count();dj+=e.rev[j].count();}
            }
            return di<dj;
        });
        for(int i:vals){
            if(foundZero||nodes>=nodeLimit||complete>=completeLimit)return;
            auto D=C;D[var].setOnly(i);dfs(D);
        }
    }
};

int main(int argc,char**argv){
    int N=argc>1?stoi(argv[1]):400;
    long long nodeLim=argc>2?stoll(argv[2]):200000;
    long long compLim=argc>3?stoll(argv[3]):20000;
    Solver S(N,nodeLim,compLim);

    for(int r=0;r<6;r++){
        string fn="/mnt/data/PAPER4_CSP_POOL_";fn+=char('a'+r);fn+=".txt";
        ifstream in(fn);string w;while(in>>w && (int)S.pool[r].size()<N)S.pool[r].push_back(w);
        if((int)S.pool[r].size()!=N){cerr<<"domain "<<r<<" has "<<S.pool[r].size()<<"\n";return 3;}
    }

    long long pairChecks=0,compatEdges=0;
    for(auto [x,y]:EDGES){
        EMat e;e.x=x;e.y=y;e.N=N;e.row.assign(N,Bits(N,false));e.rev.assign(N,Bits(N,false));
        #pragma omp parallel for schedule(dynamic,4)
        for(int i=0;i<N;i++){
            for(int j=0;j<N;j++){
                if(cleanConcat(S.pool[x][i]+S.pool[y][j],40))
                    e.row[i].a[j>>6]|=1ULL<<(j&63);
            }
        }
        // Build transpose serially from immutable rows.
        for(int i=0;i<N;i++){
            auto js=e.row[i].indices();
            for(int j:js)e.rev[j].a[i>>6]|=1ULL<<(i&63);
        }
        pairChecks += 1LL*N*N;
        long long ec=0;for(auto&b:e.row)ec+=b.count();
        compatEdges += ec;
        cout<<"EDGE "<<ROLES[x]<<ROLES[y]<<" COMPAT "<<ec<<"\n";
        S.E.push_back(move(e));
    }
    cout<<"PAIR_CHECKS "<<pairChecks<<" COMPAT_TOTAL "<<compatEdges<<"\n";

    auto C=S.cand;
    bool ok=S.propagate(C);
    cout<<"ROOT_PROPAGATE "<<(ok?"PASS":"EMPTY")<<"\n";
    for(int r=0;r<6;r++)cout<<"DOMAIN "<<ROLES[r]<<" "<<C[r].count()<<"\n";
    if(ok)S.dfs(C);

    cout<<"SUMMARY NODES "<<S.nodes<<" COMPLETE "<<S.complete
        <<" BEST "<<(S.bestScore==INT_MAX?-1:S.bestScore)
        <<" PROP_ROUNDS "<<S.propRounds
        <<" ZERO "<<(S.foundZero?1:0)<<"\n";
    return S.foundZero?0:1;
}
