#include <iostream>
#include <fstream>
#include <vector>
#include <chrono>
#include <iomanip>
#include <set>
#include <map>
#include <tuple>
#include <string>
#include <sstream>

struct PackedWord {
    uint32_t limbs[8];
    
    PackedWord() {
        for(int i=0; i<8; i++) limbs[i] = 0;
    }
    
    inline uint8_t get(uint8_t idx) const {
        uint8_t l = idx / 16;
        uint8_t b = (idx % 16) * 2;
        return (limbs[l] >> b) & 3;
    }
    
    inline void set(uint8_t idx, uint8_t c) {
        uint8_t l = idx / 16;
        uint8_t b = (idx % 16) * 2;
        limbs[l] &= ~(3u << b);
        limbs[l] |= (uint32_t(c) << b);
    }
    
    inline void append_right(uint8_t current_len, uint8_t c) {
        set(current_len, c);
    }
    
    inline void prepend_left(uint8_t c) {
        uint32_t carries[7];
        for(int i=0; i<7; i++) carries[i] = limbs[i] >> 30;
        
        for(int i=7; i>0; i--) {
            limbs[i] = (limbs[i] << 2) | carries[i-1];
        }
        limbs[0] = (limbs[0] << 2) | c;
    }
};

bool isAbelianSquareFreeIncremental(const PackedWord& w, uint8_t new_len, bool isRight) {
    if (new_len < 2) return true;
    uint8_t max_k = new_len / 2;
    
    if (isRight) {
        for (uint8_t k = 1; k <= max_k; k++) {
            int counts[4] = {0,0,0,0};
            uint8_t right_start = new_len - k;
            for (uint8_t i = 0; i < k; i++) counts[w.get(right_start + i)]++;
            uint8_t left_start = new_len - 2*k;
            for (uint8_t i = 0; i < k; i++) counts[w.get(left_start + i)]--;
            
            if (counts[0]==0 && counts[1]==0 && counts[2]==0 && counts[3]==0) return false;
        }
    } else {
        for (uint8_t k = 1; k <= max_k; k++) {
            int counts[4] = {0,0,0,0};
            for (uint8_t i = 0; i < k; i++) counts[w.get(i)]++;
            for (uint8_t i = 0; i < k; i++) counts[w.get(k + i)]--;
            
            if (counts[0]==0 && counts[1]==0 && counts[2]==0 && counts[3]==0) return false;
        }
    }
    return true;
}

const std::string SEED = "abcdacbabdabacdacbcdad";

struct Parikh {
    int c[4] = {0,0,0,0};
    bool operator<(const Parikh& o) const {
        if (c[0]!=o.c[0]) return c[0]<o.c[0];
        if (c[1]!=o.c[1]) return c[1]<o.c[1];
        if (c[2]!=o.c[2]) return c[2]<o.c[2];
        return c[3]<o.c[3];
    }
};

Parikh get_P(const std::string& w, int len) {
    Parikh p;
    for(int i=0; i<len; i++) p.c[w[i]-'a']++;
    return p;
}

int get_D_val(const std::string& w, int K) {
    Parikh p2K = get_P(w, 2*K - 1);
    Parikh pK = get_P(w, K - 1);
    int D[4];
    for (int j=0; j<4; j++) D[j] = p2K.c[j] - 2*pK.c[j];
    int ones = 0;
    int ones_idx = -1;
    for (int j = 0; j < 4; j++) {
        if (D[j] == 1) { ones++; ones_idx = j; }
        else if (D[j] != 0) return -1;
    }
    if (ones == 1) return ones_idx;
    return -1;
}

int main() {
    PackedWord seed_w;
    for (int i=0; i<SEED.length(); i++) seed_w.set(i, SEED[i] - 'a');
    
    std::vector<PackedWord> current_frontier;
    current_frontier.push_back(seed_w);
    
    std::cout << "Depth | Left-Len | Q0 (Literal) | Q1 (Parikh Traj) | Q2 (Obstruction) | Q3 (Full Scale)\n";
    std::cout << "--------------------------------------------------------------------------------------\n";
    
    uint8_t seed_len = SEED.length();
    
    for (uint8_t step = 1; step <= 96; step++) {
        bool isRight = (step % 2 != 0);
        uint8_t current_len = seed_len + step - 1;
        uint8_t next_len = seed_len + step;
        
        std::vector<PackedWord> next_frontier;
        for (const auto& w : current_frontier) {
            for (uint8_t c = 0; c < 4; c++) {
                PackedWord cand = w;
                if (isRight) cand.append_right(current_len, c);
                else cand.prepend_left(c);
                
                if (isAbelianSquareFreeIncremental(cand, next_len, isRight)) {
                    next_frontier.push_back(cand);
                }
            }
        }
        current_frontier = next_frontier;
        
        // We only care about tracking when left-context grows
        if (!isRight || step == 96) {
            int k = step / 2; // number of left extensions
            
            std::set<std::string> q0_set;
            for (const auto& w : current_frontier) {
                std::string u = "";
                for (int i=0; i < k; i++) u += (char)('a' + w.get(i));
                q0_set.insert(u);
            }
            
            std::set<std::vector<Parikh>> q1_set;
            std::set<std::vector<int>> q2_set;
            std::set<std::vector<int>> q3_set;
            
            for (const std::string& u : q0_set) {
                std::string s = u + SEED.substr(0, 6);
                
                std::vector<Parikh> q1;
                int relevant[] = {1, 4, 6, 9, 10, 13, 21, 26};
                for (int n : relevant) {
                    if (n <= k) q1.push_back(get_P(u, n));
                }
                q1_set.insert(q1);
                
                std::vector<int> q2;
                int targets[] = {1, 5, 7, 11, 27};
                for (int K : targets) {
                    if (2*K - 1 <= k + 6) q2.push_back(get_D_val(s, K));
                    else q2.push_back(-2);
                }
                q2_set.insert(q2);
                
                std::vector<int> q3;
                int K_max = (k + 6) / 2;
                for (int K = 1; K <= K_max; K++) {
                    q3.push_back(get_D_val(s, K));
                }
                q3_set.insert(q3);
            }
            
            std::cout << std::setw(5) << (int)step << " | "
                      << std::setw(8) << k << " | "
                      << std::setw(12) << q0_set.size() << " | "
                      << std::setw(16) << q1_set.size() << " | "
                      << std::setw(16) << q2_set.size() << " | "
                      << std::setw(15) << q3_set.size() << "\n";
            std::cout.flush();
        }
    }
    
    return 0;
}
