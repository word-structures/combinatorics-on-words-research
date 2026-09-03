
#include <bits/stdc++.h>
using namespace std;

struct Constraint{
    array<int,3> con{0,0,0};
    vector<pair<uint8_t,int8_t>> vars; // A position, +/-1
    int lastRank=-1;
};

static inline bool exactSquareFree(const string&s,int maxp=40){
    vector<array<int,3>>P(s.size()+1);
    for(size_t i=0;i<s.size();i++){P[i+1]=P[i];P[i+1][s[i]-'a']++;}
    for(int p=2;p<=maxp&&2*p<=(int)s.size();p++)
        for(int st=0;st+2*p<=(int)s.size();st++){
            bool eq=true;
            for(int c=0;c<3;c++)
                if(P[st+p][c]-P[st][c]!=P[st+2*p][c]-P[st+p][c]){eq=false;break;}
            if(eq)return false;
        }
    return true;
}

struct Solver{
    string F;
    array<char,40>A{};
    array<int,40> rankPos{};
    array<int,40> order{};
    int rem[3]={15,14,11};
    vector<vector<Constraint>> atStep;
    long long nodes=0,cap;
    bool found=false,capped=false;
    string hit;
    long long checks=0,prunes=0;
    unordered_set<string> dedup;

    Solver(string f,long long cp):F(move(f)),atStep(40),cap(cp){
        // alternating-end assignment order: 0,39,1,38,...
        int t=0;
        for(int k=0;k<20;k++){
            order[t]=k;rankPos[k]=t;t++;
            order[t]=39-k;rankPos[39-k]=t;t++;
        }
        buildContext("A");
        buildContext("AF");
        buildContext("FA");
        buildContext("FAF");
    }

    string keyOf(array<int,3> con, vector<pair<uint8_t,int8_t>> vars){
        // canonicalize sign.
        auto make=[&](int sign){
            string k;
            for(int c=0;c<3;c++){k+=to_string(sign*con[c]);k+=',';}
            k+='|';
            for(auto [p,w]:vars){k+=to_string((int)p);k+=':';k+=to_string(sign*(int)w);k+=',';}
            return k;
        };
        string a=make(1),b=make(-1);
        return min(a,b);
    }

    void addConstraint(array<int,3> con, vector<pair<uint8_t,int8_t>> vars){
        // combine duplicate A positions if any (not expected, but fail closed).
        array<int,40> cc{};
        for(auto [p,w]:vars)cc[p]+=w;
        vars.clear();
        for(int p=0;p<40;p++)if(cc[p])vars.push_back({(uint8_t)p,(int8_t)cc[p]});

        if(vars.empty()){
            if(con[0]==0&&con[1]==0&&con[2]==0){
                cerr<<"FIXED_ONLY_VIOLATION\n";
                exit(12);
            }
            return;
        }
        string key=keyOf(con,vars);
        if(!dedup.insert(key).second)return;
        int lr=-1;
        for(auto [p,w]:vars)lr=max(lr,rankPos[p]);
        Constraint z;z.con=con;z.vars=move(vars);z.lastRank=lr;
        atStep[lr].push_back(move(z));
    }

    void buildContext(const string&ctx){
        int n=40*ctx.size();
        for(int p=2;p<=40&&2*p<=n;p++){
            for(int st=0;st+2*p<=n;st++){
                array<int,3> con{0,0,0};
                vector<pair<uint8_t,int8_t>> vars;
                for(int q=st;q<st+2*p;q++){
                    int sg=(q<st+p)?1:-1;
                    int b=q/40,pos=q%40;
                    char role=ctx[b];
                    if(role=='A')vars.push_back({(uint8_t)pos,(int8_t)sg});
                    else {
                        int c=F[pos]-'a';
                        con[c]+=sg;
                    }
                }
                addConstraint(con,move(vars));
            }
        }
    }

    bool constraintsAt(int step){
        for(auto &z:atStep[step]){
            checks++;
            int d[3]={z.con[0],z.con[1],z.con[2]};
            for(auto [p,w]:z.vars)d[A[p]-'a']+=w;
            if(d[0]==0&&d[1]==0&&d[2]==0){prunes++;return false;}
        }
        return true;
    }

    void rec(int step){
        if(found||capped)return;
        if(++nodes>cap){capped=true;return;}
        if(step==40){
            string a(A.begin(),A.end());
            if(!exactSquareFree(a,20) || !exactSquareFree(a+F,40) ||
               !exactSquareFree(F+a,40) || !exactSquareFree(F+a+F,40)){
                cerr<<"INVARIANT_FAIL_COMPLETE\n";exit(13);
            }
            found=true;hit=a;return;
        }
        int pos=order[step];

        // Mild deterministic order using remaining abundance.
        array<int,3> sy={0,1,2};
        stable_sort(sy.begin(),sy.end(),[&](int x,int y){return rem[x]>rem[y];});
        for(int c:sy){
            if(!rem[c])continue;
            // feasibility of remaining profile after this assignment.
            A[pos]=char('a'+c);--rem[c];
            int left=39-step;
            bool feasible=true;
            int sum=0;
            for(int q=0;q<3;q++){if(rem[q]<0)feasible=false;sum+=rem[q];}
            if(sum!=left)feasible=false;
            if(feasible && constraintsAt(step))rec(step+1);
            ++rem[c];
            if(found||capped)return;
        }
    }
};

int main(int argc,char**argv){
    if(argc<4){cerr<<"usage solveA F NODE_CAP OUT\n";return 3;}
    string F=argv[1];long long cap=stoll(argv[2]);ofstream out(argv[3]);
    Solver s(F,cap);
    size_t cons=0;for(auto&v:s.atStep)cons+=v.size();
    cout<<"CONSTRAINTS "<<cons<<"\n";
    s.rec(0);
    cout<<"STATUS "<<(s.found?"HIT":(s.capped?"CAP":"EXHAUSTED_NO_HIT"))<<"\n";
    cout<<"NODES "<<s.nodes<<"\nCHECKS "<<s.checks<<"\nPRUNES "<<s.prunes<<"\n";
    if(s.found){out<<F<<'\t'<<s.hit<<"\n";cout<<"A "<<s.hit<<"\n";}
    return s.found?0:(s.capped?2:1);
}
