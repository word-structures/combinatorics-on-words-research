
#include <bits/stdc++.h>
using namespace std;
const int ROLEB[3]={11,12,17}, ROLEC[3]={10,14,16};
const string A="abccacccbbaccbbbacbbaaabccaaacbbaaabbbaa";
const string F="cbbaaacaaabaaacccaabcccbbaaabbbacbbaaaca";

bool cyclicOK(const string&q){
 string s=q+q; int p[161][3]{};
 for(int i=0;i<160;i++){for(int c=0;c<3;c++)p[i+1][c]=p[i][c];p[i+1][s[i]-'a']++;}
 for(int st=0;st<80;st++)for(int k=2;k<=40;k++){bool e=1;
  for(int c=0;c<3;c++)if(p[st+k][c]-p[st][c]!=p[st+2*k][c]-p[st+k][c]){e=0;break;}
  if(e)return false;
 }
 return true;
}

struct BGen{
 int p[81][3]{},rem[3];string w;vector<string>out;long long nodes=0;
 BGen(){for(int i=0;i<40;i++){for(int c=0;c<3;c++)p[i+1][c]=p[i][c];p[i+1][F[i]-'a']++;}for(int c=0;c<3;c++)rem[c]=ROLEB[c];}
 bool bad(int n){for(int k=2;2*k<=n;k++){bool e=1;for(int c=0;c<3;c++)if(p[n-k][c]-p[n-2*k][c]!=p[n][c]-p[n-k][c]){e=0;break;}if(e)return 1;}return 0;}
 void dfs(int pos){nodes++;if(pos==40){out.push_back(w);return;}for(int c=0;c<3;c++){if(!rem[c])continue;int n=40+pos;w.push_back('a'+c);rem[c]--;for(int j=0;j<3;j++)p[n+1][j]=p[n][j]+(j==c);if(!bad(n+1))dfs(pos+1);rem[c]++;w.pop_back();}}
};

struct CSearch{
 const string&B; int pa[81][3]{},pb[81][3]{},rem[3];string C; long long nodes=0,complete=0,cap;bool found=false;
 CSearch(const string&bb,long long cp):B(bb),cap(cp){
  for(int i=0;i<40;i++){
   for(int c=0;c<3;c++){pa[i+1][c]=pa[i][c];pb[i+1][c]=pb[i][c];}
   pa[i+1][A[i]-'a']++;pb[i+1][B[i]-'a']++;
  }
  for(int c=0;c<3;c++)rem[c]=ROLEC[c];
 }
 bool badOne(int p[][3],int n){
  for(int k=2;2*k<=n;k++){bool e=1;for(int c=0;c<3;c++)if(p[n-k][c]-p[n-2*k][c]!=p[n][c]-p[n-k][c]){e=0;break;}if(e)return 1;}return 0;
 }
 void dfs(int pos){
  if(found||nodes++>=cap)return;
  if(pos==40){complete++;if(cyclicOK(B+C))found=true;return;}
  // rotate order by a hash of B and depth for diversity but deterministic
  int shift=(B[pos%40]-'a'+pos)%3;
  for(int ii=0;ii<3;ii++){int c=(shift+ii)%3;if(!rem[c])continue;int n=40+pos;
   C.push_back('a'+c);rem[c]--;
   for(int j=0;j<3;j++){pa[n+1][j]=pa[n][j]+(j==c);pb[n+1][j]=pb[n][j]+(j==c);}
   if(!badOne(pa,n+1)&&!badOne(pb,n+1))dfs(pos+1);
   rem[c]++;C.pop_back();
   if(found||nodes>=cap)return;
  }
 }
};

int main(int argc,char**argv){
 long long ccap=argc>1?stoll(argv[1]):5000000;
 int maxB=argc>2?stoi(argv[2]):100000;
 BGen bg; bg.dfs(0);
 cerr<<"FB-clean B exact count="<<bg.out.size()<<" Bnodes="<<bg.nodes<<"\n";
 long long totalCNodes=0,totalComplete=0;int tested=0;
 for(auto&B:bg.out){
  if(tested++>=maxB)break;
  CSearch cs(B,ccap);cs.dfs(0); totalCNodes+=cs.nodes;totalComplete+=cs.complete;
  if(tested%250==0)cerr<<"tested B="<<tested<<" totalCnodes="<<totalCNodes<<" complete="<<totalComplete<<"\n";
  if(cs.found){
   cout<<"FOUND_ABCF\nA "<<A<<"\nB "<<B<<"\nC "<<cs.C<<"\nF "<<F<<"\n";
   cout<<"B_TESTED "<<tested<<"\nC_NODES_THIS "<<cs.nodes<<"\nC_COMPLETE_THIS "<<cs.complete<<"\n";
   return 0;
  }
 }
 cout<<"NO_ABCF_FOR_TESTED_B\nB_TOTAL "<<bg.out.size()<<"\nB_TESTED "<<min(maxB,(int)bg.out.size())<<"\n";
 cout<<"TOTAL_C_NODES "<<totalCNodes<<"\nTOTAL_C_COMPLETE "<<totalComplete<<"\n";
 return 2;
}
