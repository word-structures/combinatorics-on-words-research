#include <bits/stdc++.h>
using namespace std;
int main(int argc,char**argv){
 if(argc<5){cerr<<"file rows cols prime\n";return 1;}
 string fn=argv[1]; int m=stoi(argv[2]), n=stoi(argv[3]); uint32_t p=stoul(argv[4]);
 ifstream f(fn,ios::binary); vector<uint16_t> raw((size_t)m*n); f.read((char*)raw.data(),raw.size()*2); if(!f){cerr<<"read fail\n";return 2;}
 vector<uint32_t>A(raw.begin(),raw.end());
 auto modpow=[&](uint32_t a,uint32_t e){uint64_t r=1,b=a;while(e){if(e&1)r=r*b%p;b=b*b%p;e>>=1;}return (uint32_t)r;};
 int r=0;
 for(int c=0;c<n && r<m;c++){
  int piv=-1; for(int i=r;i<m;i++) if(A[(size_t)i*n+c]%p){piv=i;break;}
  if(piv<0)continue;
  if(piv!=r) for(int j=c;j<n;j++) swap(A[(size_t)r*n+j],A[(size_t)piv*n+j]);
  uint32_t inv=modpow(A[(size_t)r*n+c]%p,p-2);
  for(int j=c;j<n;j++) A[(size_t)r*n+j]=(uint64_t)A[(size_t)r*n+j]*inv%p;
  // eliminate below only
  for(int i=r+1;i<m;i++){
   uint32_t fac=A[(size_t)i*n+c]%p; if(!fac)continue;
   A[(size_t)i*n+c]=0;
   for(int j=c+1;j<n;j++){
    uint32_t sub=(uint64_t)fac*A[(size_t)r*n+j]%p;
    uint32_t x=A[(size_t)i*n+j]; A[(size_t)i*n+j]=(x>=sub)?x-sub:x+p-sub;
   }
  }
  r++; if(r%100==0) cerr<<"rank "<<r<<" col "<<c<<"\n";
 }
 cout<<r<<"\n";
}
