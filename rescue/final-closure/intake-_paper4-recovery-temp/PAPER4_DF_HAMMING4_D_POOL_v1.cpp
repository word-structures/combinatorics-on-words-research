
#include <bits/stdc++.h>
using namespace std;
static bool clean(const string&s,int maxp=40){
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
int main(int argc,char**argv){
    if(argc<4){cerr<<"usage D0 F OUT\n";return 3;}
    string D0=argv[1],F=argv[2];
    unordered_set<string>S;S.reserve(50000);
    if(clean(D0,20)&&clean(D0+F,40))S.insert(D0);
    long long tested[5]{},pass[5]{};
    for(int k=2;k<=4;k++){
        vector<int>comb(k);
        function<void(int,int)> rec=[&](int dep,int start){
            if(dep==k){
                string vals;for(int p:comb)vals+=D0[p];
                sort(vals.begin(),vals.end());
                do{
                    string D=D0;bool same=true;
                    for(int q=0;q<k;q++){D[comb[q]]=vals[q];if(vals[q]!=D0[comb[q]])same=false;}
                    if(same)continue;
                    tested[k]++;
                    if(clean(D,20)&&clean(D+F,40)){pass[k]++;S.insert(D);}
                }while(next_permutation(vals.begin(),vals.end()));
                return;
            }
            for(int p=start;p<=40-(k-dep);p++){comb[dep]=p;rec(dep+1,p+1);}
        };
        rec(0,0);
    }
    vector<string>v(S.begin(),S.end());sort(v.begin(),v.end());
    ofstream out(argv[3]);for(auto&s:v)out<<s<<"\n";
    cout<<"POOL "<<v.size()<<"\n";
    for(int k=2;k<=4;k++)cout<<"K"<<k<<" TESTED "<<tested[k]<<" PASS "<<pass[k]<<"\n";
}
