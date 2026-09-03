
#include <bits/stdc++.h>
using namespace std;
static const int DREQ[3]={12,10,18};

static bool exactSquareFree(const string&s,int maxp=40){
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

struct Constraint{
    array<int,3> con{0,0,0};
    vector<pair<uint8_t,int8_t>> vars;
    int lastRank=-1;
};

struct Solver{
    array<string,6> W; // a..f, D index 3 unused as fixed
    array<char,40>D{};
    array<int,40> order{},rankPos{};
    int rem[3]={DREQ[0],DREQ[1],DREQ[2]};
    vector<vector<Constraint>> atStep;
    unordered_set<string> dedup;
    long long nodes=0,checks=0,prunes=0,cap;
    bool found=false,capped=false,fixedViolation=false;
    string hit;

    Solver(string A,string B,string E,string F,long long cp):atStep(40),cap(cp){
        W[0]=move(A);W[1]=move(B);W[4]=move(E);W[5]=move(F);
        int t=0;
        for(int k=0;k<20;k++){order[t]=k;rankPos[k]=t;t++;order[t]=39-k;rankPos[39-k]=t;t++;}
        vector<string> ctx={"D","AD","BD","DF","ADF","BDF","DFA","DFB","EAD","EBD","FAD","FBD"};
        for(auto&s:ctx)buildContext(s);
    }

    string keyOf(array<int,3> con,const vector<pair<uint8_t,int8_t>>&vars,int sign){
        string k;
        for(int c=0;c<3;c++){k+=to_string(sign*con[c]);k+=',';}
        k+='|';
        for(auto [p,w]:vars){k+=to_string((int)p);k+=':';k+=to_string(sign*(int)w);k+=',';}
        return k;
    }
    void addConstraint(array<int,3> con,vector<pair<uint8_t,int8_t>> vars){
        array<int,40> cc{};
        for(auto [p,w]:vars)cc[p]+=w;
        vars.clear();
        for(int p=0;p<40;p++)if(cc[p])vars.push_back({(uint8_t)p,(int8_t)cc[p]});
        if(vars.empty()){
            if(con[0]==0&&con[1]==0&&con[2]==0) fixedViolation=true;
            return;
        }
        string a=keyOf(con,vars,1),b=keyOf(con,vars,-1);
        string key=min(a,b);
        if(!dedup.insert(key).second)return;
        int lr=-1;for(auto [p,w]:vars)lr=max(lr,rankPos[p]);
        Constraint z;z.con=con;z.vars=move(vars);z.lastRank=lr;
        atStep[lr].push_back(move(z));
    }

    void buildContext(const string&ctx){
        int n=40*(int)ctx.size();
        for(int p=2;p<=40&&2*p<=n;p++)for(int st=0;st+2*p<=n;st++){
            array<int,3> con{0,0,0};
            vector<pair<uint8_t,int8_t>> vars;
            for(int q=st;q<st+2*p;q++){
                int sg=(q<st+p)?1:-1;
                int block=q/40,pos=q%40;
                char role=ctx[block];
                if(role=='D')vars.push_back({(uint8_t)pos,(int8_t)sg});
                else{
                    int ri=role-'A'; // A=0 B=1 E=4 F=5
                    char ch=W[ri][pos];
                    con[ch-'a']+=sg;
                }
            }
            addConstraint(con,move(vars));
        }
    }

    bool checkAt(int step){
        for(auto&z:atStep[step]){
            checks++;
            int d[3]={z.con[0],z.con[1],z.con[2]};
            for(auto [p,w]:z.vars)d[D[p]-'a']+=w;
            if(d[0]==0&&d[1]==0&&d[2]==0){prunes++;return false;}
        }
        return true;
    }

    void rec(int step){
        if(found||capped||fixedViolation)return;
        if(++nodes>cap){capped=true;return;}
        if(step==40){
            string d(D.begin(),D.end());
            // Independent fail-closed regression of all required contexts.
            string A=W[0],B=W[1],E=W[4],F=W[5];
            if(!(exactSquareFree(d,20)&&exactSquareFree(A+d,40)&&exactSquareFree(B+d,40)&&
                 exactSquareFree(d+F,40)&&exactSquareFree(A+d+F,40)&&exactSquareFree(B+d+F,40)&&
                 exactSquareFree(d+F+A,40)&&exactSquareFree(d+F+B,40)&&
                 exactSquareFree(E+A+d,40)&&exactSquareFree(E+B+d,40)&&
                 exactSquareFree(F+A+d,40)&&exactSquareFree(F+B+d,40))){
                cerr<<"INVARIANT_FAIL_COMPLETE\n";exit(13);
            }
            found=true;hit=d;return;
        }
        int pos=order[step];
        array<int,3> sy={0,1,2};
        stable_sort(sy.begin(),sy.end(),[&](int x,int y){return rem[x]>rem[y];});
        for(int c:sy){
            if(!rem[c])continue;
            D[pos]=char('a'+c);--rem[c];
            if(checkAt(step))rec(step+1);
            ++rem[c];
            if(found||capped)return;
        }
    }
};

int main(int argc,char**argv){
    if(argc<7){cerr<<"usage fixedABEF_D A B E F NODE_CAP OUT\n";return 3;}
    string A=argv[1],B=argv[2],E=argv[3],F=argv[4];
    long long cap=stoll(argv[5]);ofstream out(argv[6]);
    Solver s(A,B,E,F,cap);
    size_t cons=0;for(auto&v:s.atStep)cons+=v.size();
    cout<<"CONSTRAINTS "<<cons<<"\nFIXED_VIOLATION "<<s.fixedViolation<<"\n";
    s.rec(0);
    cout<<"STATUS "<<(s.found?"HIT":(s.capped?"CAP":"EXHAUSTED_NO_HIT"))<<"\n";
    cout<<"NODES "<<s.nodes<<"\nCHECKS "<<s.checks<<"\nPRUNES "<<s.prunes<<"\n";
    if(s.found){out<<s.hit<<"\n";cout<<"D "<<s.hit<<"\n";}
    return s.found?0:(s.capped?2:1);
}
