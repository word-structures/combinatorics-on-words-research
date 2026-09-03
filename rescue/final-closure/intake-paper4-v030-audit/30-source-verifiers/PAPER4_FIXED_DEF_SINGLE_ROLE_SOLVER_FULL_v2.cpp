
#include <bits/stdc++.h>
using namespace std;

static inline bool eq3(const array<int,3>&x){return x[0]==0&&x[1]==0&&x[2]==0;}

struct Constraint{
    array<int,3> con{0,0,0};
    array<int8_t,40> coef{};
    int lastRank=-1;
};

struct Solver{
    char X;
    array<int,3> req;
    map<char,string> fixed;
    vector<string> contexts;
    array<char,40> W{};
    array<int,40> order{},rankPos{};
    int rem[3];
    vector<vector<Constraint>> atStep;
    unordered_set<string> dedup;
    long long nodes=0,checks=0,prunes=0,cap;
    bool found=false,capped=false,fixedViolation=false;
    string hit;

    Solver(char x,array<int,3>rq,map<char,string>fx,vector<string>ctx,long long cp):
        X(x),req(rq),fixed(move(fx)),contexts(move(ctx)),atStep(40),cap(cp){
        for(int c=0;c<3;c++)rem[c]=req[c];
        int t=0;
        for(int k=0;k<20;k++){order[t]=k;rankPos[k]=t;t++;order[t]=39-k;rankPos[39-k]=t;t++;}
        for(auto&s:contexts)buildContext(s);
    }
    string canonKey(array<int,3> con,const array<int8_t,40>&co){
        string a,b;
        for(int sign: {1,-1}){
            string k;
            for(int c=0;c<3;c++){k+=to_string(sign*con[c]);k+=',';}
            k+='|';
            for(int p=0;p<40;p++)if(co[p]){
                k+=to_string(p);k+=':';k+=to_string(sign*(int)co[p]);k+=',';
            }
            if(sign==1)a=k;else b=k;
        }
        return min(a,b);
    }
    void add(array<int,3>con,array<int8_t,40>co){
        bool any=false;int lr=-1;
        for(int p=0;p<40;p++)if(co[p]){any=true;lr=max(lr,rankPos[p]);}
        if(!any){
            if(eq3(con)) fixedViolation=true;
            return;
        }
        string key=canonKey(con,co);
        if(!dedup.insert(key).second)return;
        Constraint z;z.con=con;z.coef=co;z.lastRank=lr;
        atStep[lr].push_back(z);
    }
    void buildContext(const string&ctx){
        int n=40*(int)ctx.size();
        for(int p=2;p<=40&&2*p<=n;p++)for(int st=0;st+2*p<=n;st++){
            array<int,3> con{0,0,0};
            array<int8_t,40> co{};
            for(int q=st;q<st+2*p;q++){
                int sg=(q<st+p)?1:-1;
                int b=q/40,pos=q%40;char role=ctx[b];
                if(role==X) co[pos]+=sg;
                else{
                    auto it=fixed.find(role);
                    if(it==fixed.end()){cerr<<"MISSING FIXED ROLE "<<role<<"\n";exit(7);}
                    con[it->second[pos]-'a']+=sg;
                }
            }
            add(con,co);
        }
    }
    bool checkAt(int step){
        for(auto&z:atStep[step]){
            checks++;
            int d[3]={z.con[0],z.con[1],z.con[2]};
            for(int p=0;p<40;p++)if(z.coef[p])d[W[p]-'a']+=z.coef[p];
            if(d[0]==0&&d[1]==0&&d[2]==0){prunes++;return false;}
        }
        return true;
    }
    void rec(int step){
        if(found||capped||fixedViolation)return;
        if(++nodes>cap){capped=true;return;}
        if(step==40){found=true;hit=string(W.begin(),W.end());return;}
        int pos=order[step];
        array<int,3> sy={0,1,2};
        stable_sort(sy.begin(),sy.end(),[&](int a,int b){return rem[a]>rem[b];});
        for(int c:sy){
            if(!rem[c])continue;
            W[pos]=char('a'+c);--rem[c];
            if(checkAt(step))rec(step+1);
            ++rem[c];
            if(found||capped)return;
        }
    }
};

int main(int argc,char**argv){
    if(argc<9){
        cerr<<"usage single_role ROLE reqA reqB reqC D E F CAP OUT\n";
        return 3;
    }
    char X=argv[1][0];
    array<int,3>rq={stoi(argv[2]),stoi(argv[3]),stoi(argv[4])};
    string D=argv[5],E=argv[6],F=argv[7];
    long long cap=stoll(argv[8]);
    string outname=argc>=10?argv[9]:"/dev/null";
    map<char,string>fx={{'d',D},{'e',E},{'f',F}};
    vector<string>ctx;
    if(X=='a') ctx={"a","af","fa","faf","ea","ad","ead","fad","adf","dfa","afe","eaf","fea"};
    else if(X=='b') ctx={"b","fb","eb","bd","bdf","dfb","ebd","fbd"};
    else {cerr<<"ROLE must be a or b\n";return 4;}
    Solver s(X,rq,fx,ctx,cap);
    size_t cons=0;for(auto&v:s.atStep)cons+=v.size();
    cout<<"ROLE "<<X<<"\nCONSTRAINTS "<<cons<<"\nFIXED_VIOLATION "<<s.fixedViolation<<"\n";
    s.rec(0);
    cout<<"STATUS "<<(s.found?"HIT":(s.capped?"CAP":"EXHAUSTED_NO_HIT"))<<"\n";
    cout<<"NODES "<<s.nodes<<"\nCHECKS "<<s.checks<<"\nPRUNES "<<s.prunes<<"\n";
    if(s.found){
        ofstream out(outname);out<<s.hit<<"\n";
        cout<<char(toupper(X))<<" "<<s.hit<<"\n";
    }
    return s.found?0:(s.capped?2:1);
}
