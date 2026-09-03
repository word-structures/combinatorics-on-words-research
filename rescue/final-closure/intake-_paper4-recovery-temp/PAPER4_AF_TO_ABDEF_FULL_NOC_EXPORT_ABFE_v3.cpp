
#include <bits/stdc++.h>
using namespace std;
static ofstream* G_ABFE=nullptr;
static int G_PAIR=0;
static const int EREQ[3]={13,16,11};
static const int BREQ[3]={11,12,17};
static const int DREQ[3]={12,10,18};

static inline bool eqP(const vector<array<int,3>>&P,int a,int b,int c,int d){
    for(int x=0;x<3;x++) if(P[b][x]-P[a][x]!=P[d][x]-P[c][x]) return false;
    return true;
}
static bool clean(const string&s,int kmax=40){
    vector<array<int,3>>P(s.size()+1);
    for(size_t i=0;i<s.size();i++){P[i+1]=P[i];P[i+1][s[i]-'a']++;}
    for(int k=2;k<=kmax&&2*k<=(int)s.size();k++)
        for(int i=0;i+2*k<=(int)s.size();i++)
            if(eqP(P,i,i+k,i+k,i+2*k)) return false;
    return true;
}
static bool suffixBad(const vector<array<int,3>>&P,int n,int kmax=40){
    for(int k=2;k<=kmax&&2*k<=n;k++)
        if(eqP(P,n-2*k,n-k,n-k,n)) return true;
    return false;
}

struct DExists{
    string A,B,E,F,D,hit;
    int rem[3];
    vector<string>bases;
    vector<vector<array<int,3>>> P;
    vector<array<int,3>>PD;
    long long nodes=0,complete=0,cap;
    bool found=false,capped=false;
    DExists(string a,string b,string e,string f,long long cp):
        A(move(a)),B(move(b)),E(move(e)),F(move(f)),PD(41),cap(cp){
        for(int c=0;c<3;c++)rem[c]=DREQ[c];
        bases={A,B,E+A,F+A,F+B,E+B};
        for(auto&base:bases){
            P.emplace_back(base.size()+41);
            for(size_t i=0;i<base.size();i++){
                P.back()[i+1]=P.back()[i];
                P.back()[i+1][base[i]-'a']++;
            }
        }
    }
    void rec(int pos){
        if(found||capped)return;
        if(++nodes>cap){capped=true;return;}
        if(pos==40){
            complete++;
            if(clean(D+F,40) &&
               clean(A+D+F,40) &&
               clean(B+D+F,40) &&
               clean(D+F+A,40) &&
               clean(D+F+B,40)){
                found=true;hit=D;
            }
            return;
        }
        for(int c=0;c<3;c++){
            if(!rem[c])continue;
            D.push_back(char('a'+c));--rem[c];
            PD[pos+1]=PD[pos];PD[pos+1][c]++;
            bool ok=!suffixBad(PD,pos+1,20);
            for(size_t q=0;q<bases.size()&&ok;q++){
                int n=bases[q].size()+pos;
                P[q][n+1]=P[q][n];P[q][n+1][c]++;
                if(suffixBad(P[q],n+1,40))ok=false;
            }
            if(ok)rec(pos+1);
            ++rem[c];D.pop_back();
            if(found||capped)return;
        }
    }
};

struct SearchPair{
    string F,A,RA,R,E,B,D;
    int erem[3];
    vector<array<int,3>>PER,PEA;
    long long eNodes=0,eComplete=0,bNodes=0,bComplete=0,dNodes=0,dComplete=0;
    long long eCap,bCap,dCap;
    bool found=false,capped=false;

    SearchPair(string f,string a,long long ec,long long bc,long long dc):
        F(move(f)),A(move(a)),RA(A.rbegin(),A.rend()),PER(41),PEA(81),
        eCap(ec),bCap(bc),dCap(dc){
        for(int c=0;c<3;c++)erem[c]=EREQ[c];
        for(int i=0;i<40;i++){PEA[i+1]=PEA[i];PEA[i+1][RA[i]-'a']++;}
    }

    bool searchB(const string&E){
        string b;int rem[3];for(int c=0;c<3;c++)rem[c]=BREQ[c];
        vector<array<int,3>>PB(41),PFB(81),PEB(81);
        for(int i=0;i<40;i++){
            PFB[i+1]=PFB[i];PFB[i+1][F[i]-'a']++;
            PEB[i+1]=PEB[i];PEB[i+1][E[i]-'a']++;
        }
        bool localFound=false,localCap=false;
        function<void(int)> recB=[&](int pos){
            if(localFound||localCap||found)return;
            if(++bNodes>bCap){localCap=true;return;}
            if(pos==40){
                bComplete++;
                if(G_ABFE && *G_ABFE){
                    (*G_ABFE)<<G_PAIR<<'\t'<<A<<'\t'<<b<<'\t'<<E<<'\t'<<F<<"\n";
                }
                DExists ds(A,b,E,F,dCap);
                ds.rec(0);dNodes+=ds.nodes;dComplete+=ds.complete;
                if(ds.capped){capped=true;return;}
                if(ds.found){
                    found=true;B=b;D=ds.hit;this->E=E;localFound=true;
                }
                return;
            }
            for(int c=0;c<3;c++){
                if(!rem[c])continue;
                b.push_back(char('a'+c));--rem[c];
                PB[pos+1]=PB[pos];PB[pos+1][c]++;
                int n=40+pos;
                PFB[n+1]=PFB[n];PFB[n+1][c]++;
                PEB[n+1]=PEB[n];PEB[n+1][c]++;
                if(!suffixBad(PB,pos+1,20)&&!suffixBad(PFB,n+1,40)&&!suffixBad(PEB,n+1,40))
                    recB(pos+1);
                ++rem[c];b.pop_back();
                if(localFound||localCap||found||capped)return;
            }
        };
        recB(0);
        if(localCap)capped=true;
        return found;
    }

    void recE(int pos){
        if(found||capped)return;
        if(++eNodes>eCap){capped=true;return;}
        if(pos==40){
            eComplete++;
            string Ecur(R.rbegin(),R.rend());
            if(!clean(F+Ecur,40))return; // FE
            // Full actual no-C A/E/F trigram pruning.
            if(!clean(A+F+Ecur,40))return; // AFE
            if(!clean(Ecur+A+F,40))return; // EAF
            if(!clean(F+Ecur+A,40))return; // FEA
            searchB(Ecur);
            return;
        }
        for(int c=0;c<3;c++){
            if(!erem[c])continue;
            R.push_back(char('a'+c));--erem[c];
            PER[pos+1]=PER[pos];PER[pos+1][c]++;
            int n=40+pos;
            PEA[n+1]=PEA[n];PEA[n+1][c]++;
            if(!suffixBad(PER,pos+1,20)&&!suffixBad(PEA,n+1,40))recE(pos+1);
            ++erem[c];R.pop_back();
            if(found||capped)return;
        }
    }
};

int main(int argc,char**argv){
    if(argc<7){cerr<<"usage AFpairs Ecap Bcap Dcap OUT ABFE_OUT\n";return 3;}
    ifstream in(argv[1]);long long ec=stoll(argv[2]),bc=stoll(argv[3]),dc=stoll(argv[4]);ofstream out(argv[5]);
    ofstream abfe(argv[6]); G_ABFE=&abfe;
    string F,A;int idx=0,hits=0,caps=0;
    long long TE=0,TEC=0,TB=0,TBC=0,TD=0,TDC=0;
    while(in>>F>>A){
        ++idx; G_PAIR=idx; SearchPair s(F,A,ec,bc,dc);s.recE(0);
        TE+=s.eNodes;TEC+=s.eComplete;TB+=s.bNodes;TBC+=s.bComplete;TD+=s.dNodes;TDC+=s.dComplete;
        if(s.capped)caps++;
        if(s.found){
            hits++;
            out<<idx<<'\t'<<A<<'\t'<<s.B<<'\t'<<s.D<<'\t'<<s.E<<'\t'<<F<<"\n";
            cout<<"ABDEF_HIT "<<idx<<"\nA "<<A<<"\nB "<<s.B<<"\nD "<<s.D<<"\nE "<<s.E<<"\nF "<<F<<"\n";
            break;
        }
        if(idx%25==0)
            cout<<"PROGRESS "<<idx<<" E_COMPLETE "<<TEC<<" B_COMPLETE "<<TBC<<" D_NODES "<<TD<<" CAPS "<<caps<<"\n";
        if(s.capped){
            cout<<"CAP_AT_PAIR "<<idx<<"\n";
            // fail-closed for this discovery run: continue, but final status will report caps.
        }
    }
    cout<<"SUMMARY PAIRS "<<idx<<" HITS "<<hits<<" CAPS "<<caps
        <<" E_NODES "<<TE<<" E_COMPLETE "<<TEC
        <<" B_NODES "<<TB<<" B_COMPLETE "<<TBC
        <<" D_NODES "<<TD<<" D_COMPLETE "<<TDC<<"\n";
}
