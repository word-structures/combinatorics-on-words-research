#include <iostream>
#include <vector>
#include <string>
#include <map>

struct PackedWord {
    uint32_t limbs[8];
    PackedWord() { for(int i=0; i<8; i++) limbs[i] = 0; }
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
};

const std::string SEED = "abcdacbabdabacdacbcdad";

int get_kill_K(const PackedWord& w, uint8_t new_len) {
    if (new_len < 2) return 0;
    uint8_t max_k = new_len / 2;
    for (uint8_t k = 1; k <= max_k; k++) {
        int counts[4] = {0,0,0,0};
        uint8_t right_start = new_len - k;
        for (uint8_t i = 0; i < k; i++) counts[w.get(right_start + i)]++;
        uint8_t left_start = new_len - 2*k;
        for (uint8_t i = 0; i < k; i++) counts[w.get(left_start + i)]--;
        if (counts[0]==0 && counts[1]==0 && counts[2]==0 && counts[3]==0) return k;
    }
    return 0; // Not killed
}

int main() {
    PackedWord seed_w;
    for (int i=0; i<SEED.length(); i++) seed_w.set(i, SEED[i] - 'a');
    
    std::vector<PackedWord> current_frontier;
    current_frontier.push_back(seed_w);
    uint8_t seed_len = SEED.length();
    
    std::cout << "d | r_d | Branching\n";
    std::cout << "--------------------------------\n";
    
    for (uint8_t step = 1; step <= 150; step++) {
        uint8_t current_len = seed_len + step - 1;
        uint8_t next_len = seed_len + step;
        
        std::vector<PackedWord> next_frontier;
        
        int branch_counts[5] = {0,0,0,0,0}; // 0 to 4 children
        
        for (const auto& w : current_frontier) {
            int children = 0;
            for (uint8_t c = 0; c < 4; c++) {
                PackedWord cand = w;
                cand.append_right(current_len, c);
                
                int K = get_kill_K(cand, next_len);
                if (K == 0) {
                    next_frontier.push_back(cand);
                    children++;
                }
            }
            branch_counts[children]++;
        }
        
        if (next_frontier.empty()) {
            std::cout << (int)step << " | 0 | Extinct\n";
            break;
        }
        
        std::cout << (int)step << " | " << next_frontier.size() << " | ";
        for(int i=0; i<=4; i++) {
            if (branch_counts[i] > 0) std::cout << i << ":" << branch_counts[i] << " ";
        }
        std::cout << "\n";
        
        current_frontier = next_frontier;
    }
    return 0;
}
