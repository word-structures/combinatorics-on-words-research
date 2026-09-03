
#include <bits/stdc++.h>
using namespace std;

static const string ROLES="abcdef";
static const vector<string> TRIS={
"ace","adf","afe","bce","bdc","bdf","cbc","cbd","cea","ceb","dcb",
"dfa","dfb","eac","ead","eaf","ebc","ebd","fad","faf","fbd","fea"};

struct Win{
    int tri,st,p;
    int d[3];
    bool bad;
};
struct RW{
    int wid;
    array<int8_t,40> c;
};

static int rid(char r){return r-'a';}

int coefFor(const string&tri,int st,int p,int role,int pos){
    int z=0;
    for(int b=0;b<3;b++) if(rid(tri[b])==role){
        int q=b*40+pos;
        if(st<=q && q<st+p) z++;
        else if(st+p<=q && q<st+2*p) z--;
    }
    return z;
}

struct Search {
    array<string,6> H;
    vector<Win> W;
    vector<RW> byRole[6];
    vector<int> viol;
    vector<int> vpos;
    mt19937_64 rng;
    unordered_map<int, vector<pair<int,int8_t>>> cache;
    long long evals=0,accepted=0;
    int bestCost;
    array<string,6> bestH;

    Search(array<string,6> h,uint64_t seed):H(move(h)),rng(seed){
        buildWindows();
        bestCost=viol.size();bestH=H;
        cache.reserve(4096);
    }

    void addViol(int w){
        if(vpos[w]>=0)return;
        vpos[w]=viol.size();viol.push_back(w);
    }
    void delViol(int w){
        int p=vpos[w];if(p<0)return;
        int last=viol.back();
        viol[p]=last;vpos[last]=p;
        viol.pop_back();vpos[w]=-1;
    }

    void buildWindows(){
        // Build all windows and exact current deltas.
        for(int ti=0;ti<(int)TRIS.size();ti++){
            string s=H[rid(TRIS[ti][0])]+H[rid(TRIS[ti][1])]+H[rid(TRIS[ti][2])];
            int P[121][3]{};
            for(int q=0;q<120;q++){
                for(int c=0;c<3;c++)P[q+1][c]=P[q][c];
                P[q+1][s[q]-'a']++;
            }
            for(int p=2;p<=40;p++)for(int st=0;st+2*p<=120;st++){
                Win w;w.tri=ti;w.st=st;w.p=p;
                w.bad=true;
                for(int c=0;c<3;c++){
                    w.d[c]=(P[st+p][c]-P[st][c])-(P[st+2*p][c]-P[st+p][c]);
                    if(w.d[c]!=0)w.bad=false;
                }
                W.push_back(w);
            }
        }
        vpos.assign(W.size(),-1);
        for(int w=0;w<(int)W.size();w++)if(W[w].bad)addViol(w);

        // role-window coefficient records.
        for(int w=0;w<(int)W.size();w++){
            auto &x=W[w];const string&tri=TRIS[x.tri];
            bool present[6]{};
            for(char q:tri)present[rid(q)]=true;
            for(int r=0;r<6;r++)if(present[r]){
                RW z;z.wid=w;
                for(int i=0;i<40;i++)z.c[i]=coefFor(tri,x.st,x.p,r,i);
                byRole[r].push_back(z);
            }
        }
    }

    const vector<pair<int,int8_t>>& moveList(int r,int i,int j){
        if(i>j)swap(i,j);
        int key=(r*40+i)*40+j;
        auto it=cache.find(key);
        if(it!=cache.end())return it->second;
        vector<pair<int,int8_t>> v;
        v.reserve(byRole[r].size()/2);
        for(auto &rw:byRole[r]){
            int k=(int)rw.c[i]-(int)rw.c[j];
            if(k)v.push_back({rw.wid,(int8_t)k});
        }
        auto pr=cache.emplace(key,move(v));
        return pr.first->second;
    }

    int deltaCost(int r,int i,int j){
        if(H[r][i]==H[r][j])return INT_MAX/4;
        int ai=H[r][i]-'a', aj=H[r][j]-'a';
        int delta=0;
        auto &ml=moveList(r,i,j);
        for(auto [w,k8]:ml){
            int k=k8;
            auto &x=W[w];
            bool old=x.bad;
            int di=x.d[ai]-k;
            int dj=x.d[aj]+k;
            bool neu=(di==0 && dj==0);
            if(neu){
                for(int c=0;c<3;c++)if(c!=ai&&c!=aj&&x.d[c]!=0){neu=false;break;}
            }
            delta += (int)neu-(int)old;
        }
        evals++;
        return delta;
    }

    void apply(int r,int i,int j){
        int ai=H[r][i]-'a', aj=H[r][j]-'a';
        auto &ml=moveList(r,i,j);
        for(auto [w,k8]:ml){
            int k=k8;auto &x=W[w];
            bool old=x.bad;
            x.d[ai]-=k;x.d[aj]+=k;
            bool neu=(x.d[0]==0&&x.d[1]==0&&x.d[2]==0);
            x.bad=neu;
            if(old&&!neu)delViol(w);
            else if(!old&&neu)addViol(w);
        }
        swap(H[r][i],H[r][j]);
        accepted++;
        if((int)viol.size()<bestCost){
            bestCost=viol.size();bestH=H;
        }
    }

    pair<int,pair<int,int>> randomConflictMove(int wid){
        auto &w=W[wid];string tri=TRIS[w.tri];
        vector<int> roles;
        bool seen[6]{};
        for(char q:tri){int r=rid(q);if(!seen[r]){seen[r]=1;roles.push_back(r);}}
        int bestD=INT_MAX,bR=-1,bI=-1,bJ=-1;
        // Sample targeted candidates from nonzero-coefficient positions.
        for(int attempt=0;attempt<18;attempt++){
            int r=roles[rng()%roles.size()];
            vector<int> nz;
            for(int i=0;i<40;i++)if(coefFor(tri,w.st,w.p,r,i)!=0)nz.push_back(i);
            if(nz.empty())continue;
            int i=nz[rng()%nz.size()];
            int ci=coefFor(tri,w.st,w.p,r,i);
            vector<int> js;
            for(int j=0;j<40;j++)
                if(j!=i && H[r][j]!=H[r][i] && coefFor(tri,w.st,w.p,r,j)!=ci)
                    js.push_back(j);
            if(js.empty())continue;
            int j=js[rng()%js.size()];
            int d=deltaCost(r,i,j);
            if(d<bestD){bestD=d;bR=r;bI=i;bJ=j;}
        }
        // fallback random move
        if(bR<0){
            int r=rng()%6,i=rng()%40,j=rng()%40;
            while(j==i||H[r][j]==H[r][i])j=rng()%40;
            bestD=deltaCost(r,i,j);bR=r;bI=i;bJ=j;
        }
        return {bestD,{bR,bI*40+bJ}};
    }

    void restoreBest(){
        H=bestH;
        // Rebuild deltas/violations only; coefficients/cache remain valid.
        // Easier recalc each W using coefficients and H.
        viol.clear();fill(vpos.begin(),vpos.end(),-1);
        for(int wi=0;wi<(int)W.size();wi++){
            auto &w=W[wi];const string&tri=TRIS[w.tri];
            int d[3]{};
            for(int b=0;b<3;b++){
                int r=rid(tri[b]);
                for(int pos=0;pos<40;pos++){
                    int coef=coefFor(tri,w.st,w.p,r,pos);
                    if(coef)d[H[r][pos]-'a']+=coef;
                }
            }
            for(int c=0;c<3;c++)w.d[c]=d[c];
            w.bad=(d[0]==0&&d[1]==0&&d[2]==0);
            if(w.bad)addViol(wi);
        }
    }

    void run(long long steps,const string&outPrefix){
        int start=viol.size();
        cout<<"WINDOWS "<<W.size()<<"\nSTART_VIOL "<<start<<"\n";
        double T=1.5;
        int noImprove=0;
        for(long long step=1;step<=steps && !viol.empty();step++){
            int wid=viol[rng()%viol.size()];
            auto mv=randomConflictMove(wid);
            int d=mv.first,r=mv.second.first;
            int i=mv.second.second/40,j=mv.second.second%40;
            bool accept=false;
            if(d<=0)accept=true;
            else{
                double prob=exp(-d/T);
                double u=(double)(rng()>>11)*(1.0/9007199254740992.0);
                if(u<prob)accept=true;
            }
            if(accept)apply(r,i,j);
            if((int)viol.size()==bestCost)noImprove++;
            else noImprove=0;

            T=max(0.05,T*0.9998);
            if(step%1000==0){
                cout<<"STEP "<<step<<" CUR "<<viol.size()<<" BEST "<<bestCost
                    <<" CACHE "<<cache.size()<<" EVALS "<<evals<<"\n";
            }
            if(noImprove>4000){
                restoreBest();T=1.0;noImprove=0;
            }
        }
        ofstream out(outPrefix+"_BEST_H.txt");
        for(int r=0;r<6;r++)out<<ROLES[r]<<" "<<bestH[r]<<"\n";
        ofstream rep(outPrefix+"_REPORT.txt");
        rep<<"START_VIOL "<<start<<"\nBEST_VIOL "<<bestCost<<"\n"
           <<"EVALS "<<evals<<"\nACCEPTED "<<accepted<<"\nCACHE "<<cache.size()<<"\n";
        cout<<"FINAL_CUR "<<viol.size()<<"\nBEST_VIOL "<<bestCost<<"\n";
    }
};

int main(int argc,char**argv){
    if(argc<5){cerr<<"usage local_search H_INPUT STEPS SEED OUTPREFIX\n";return 3;}
    ifstream in(argv[1]);array<string,6>H;char r;string s;int n=0;
    while(in>>r>>s){if(r<'a'||r>'f'||s.size()!=40)return 4;H[r-'a']=s;n++;}
    if(n!=6)return 5;
    long long steps=stoll(argv[2]);uint64_t seed=stoull(argv[3]);
    Search z(H,seed);
    z.run(steps,argv[4]);
}
