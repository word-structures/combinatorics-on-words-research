#include <iostream>
#include <fstream>
#include <vector>
#include <cstdint>
#include <map>
#include <set>
#include <algorithm>

struct PackedWord {
    uint32_t limbs[4];

    uint8_t get(uint8_t idx) const {
        uint8_t limb_idx = idx / 16;
        uint8_t bit_idx = (idx % 16) * 2;
        return (limbs[limb_idx] >> bit_idx) & 3;
    }
};

struct Parikh {
    int c[4] = {0,0,0,0};
};

int main() {
    std::ifstream in("P7_117_FRONTIER.bin", std::ios::binary);
    if (!in) {
        std::cerr << "File not found\n";
        return 1;
    }
    
    char header[121];
    in.read(header, 121);
    uint64_t count = *reinterpret_cast<uint64_t*>(header + 17);
    
    uint64_t count_S1 = 0;
    uint64_t count_S2 = 0;
    
    std::map<uint32_t, uint64_t> pi_counts;
    std::map<uint8_t, std::map<uint32_t, uint64_t>> pi_by_w0;
    
    for (uint64_t idx = 0; idx < count; idx++) {
        PackedWord w;
        in.read(reinterpret_cast<char*>(&w.limbs[0]), 32);
        
        Parikh P[60];
        P[0].c[0]=0; P[0].c[1]=0; P[0].c[2]=0; P[0].c[3]=0;
        for (int i = 1; i <= 59; i++) {
            P[i] = P[i-1];
            P[i].c[w.get(i-1)]++;
        }
        
        auto get_D = [&](int K) -> int {
            int D[4];
            for (int j = 0; j < 4; j++) {
                D[j] = P[2*K-1].c[j] - 2 * P[K-1].c[j];
            }
            int ones = 0;
            int ones_idx = -1;
            for (int j = 0; j < 4; j++) {
                if (D[j] == 1) { ones++; ones_idx = j; }
                else if (D[j] != 0) return -1;
            }
            if (ones == 1) return ones_idx;
            return -1;
        };
        
        int d1 = get_D(1);
        int d5 = get_D(5);
        int d7 = get_D(7);
        int d11 = get_D(11);
        int d27 = get_D(27);
        if (idx == 0) {
            std::cout << "Record 0: ";
            for(int i=0; i<117; i++) {
                std::cout << "abcd"[w.get(i)];
            }
            std::cout << "\n";
            for (int K : {1,5,7,11,27}) {
                std::cout << "K=" << K << " D=[";
                for (int j=0; j<4; j++) std::cout << P[2*K-1].c[j] - 2*P[K-1].c[j] << ",";
                std::cout << "]\n";
            }
            
            auto getMask2 = [&](uint8_t added_char) -> uint64_t {
                uint64_t mask = 0;
                for (uint8_t K = 1; K <= 59; K++) {
                    uint8_t counts1[4] = {0,0,0,0};
                    uint8_t counts2[4] = {0,0,0,0};
                    counts1[added_char]++;
                    for (uint8_t i = 0; i < K - 1; i++) counts1[w.get(i)]++;
                    for (uint8_t i = K - 1; i < 2 * K - 1; i++) counts2[w.get(i)]++;
                    if (counts1[0] == counts2[0] && counts1[1] == counts2[1] && 
                        counts1[2] == counts2[2] && counts1[3] == counts2[3]) {
                        mask |= (1ULL << K);
                    }
                }
                return mask;
            };
            std::cout << "Unoptimized: m_a=" << getMask2(0) << " m_b=" << getMask2(1) << " m_c=" << getMask2(2) << " m_d=" << getMask2(3) << "\n";
        }
        
        bool S1_ok = false;
        if (d1 >= 0 && d5 >= 0 && d7 >= 0 && d11 >= 0) {
            int mask = (1<<d1) | (1<<d5) | (1<<d7) | (1<<d11);
            if (mask == 15) S1_ok = true;
        }
        if (S1_ok) count_S1++;
        
        if (d27 == d1 && d1 == w.get(0)) count_S2++;
        
        if (S1_ok) {
            uint32_t pi = (d1 << 6) | (d5 << 4) | (d7 << 2) | d11;
            pi_counts[pi]++;
            pi_by_w0[w.get(0)][pi]++;
        }
    }
    
    std::cout << "Total records: " << count << "\n";
    std::cout << "Satisfy S1 {1,5,7,11} invariant: " << count_S1 << "\n";
    std::cout << "Satisfy S2 D_27=D_1=w_0 invariant: " << count_S2 << "\n";
    std::cout << "Distinct permutations pi_w: " << pi_counts.size() << "\n";
    for (auto const& [pi, c] : pi_counts) {
        int d1 = (pi >> 6) & 3;
        int d5 = (pi >> 4) & 3;
        int d7 = (pi >> 2) & 3;
        int d11 = pi & 3;
        std::cout << "  pi=(" << d1 << "," << d5 << "," << d7 << "," << d11 << "): " << c << "\n";
    }
    
    std::cout << "\nBy w0:\n";
    for (auto const& [w0, map_pi] : pi_by_w0) {
        std::cout << "w0 = " << (int)w0 << " has " << map_pi.size() << " permutations\n";
    }
    
    return 0;
}
