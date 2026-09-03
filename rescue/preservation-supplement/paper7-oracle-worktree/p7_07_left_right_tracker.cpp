#include <iostream>
#include <fstream>
#include <vector>
#include <map>
#include <set>
#include <string>
#include <tuple>
#include <iomanip>

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
    inline void prepend_left(uint8_t c) {
        uint32_t carries[7];
        for(int i=0; i<7; i++) carries[i] = limbs[i] >> 30;
        for(int i=7; i>0; i--) limbs[i] = (limbs[i] << 2) | carries[i-1];
        limbs[0] = (limbs[0] << 2) | c;
    }
};

const std::string SEED = "abcdacbabdabacdacbcdad";

int get_kill_K(const PackedWord& w, uint8_t new_len, bool isRight) {
    if (new_len < 2) return 0;
    uint8_t max_k = new_len / 2;
    if (isRight) {
        for (uint8_t k = 1; k <= max_k; k++) {
            int counts[4] = {0,0,0,0};
            uint8_t right_start = new_len - k;
            for (uint8_t i = 0; i < k; i++) counts[w.get(right_start + i)]++;
            uint8_t left_start = new_len - 2*k;
            for (uint8_t i = 0; i < k; i++) counts[w.get(left_start + i)]--;
            if (counts[0]==0 && counts[1]==0 && counts[2]==0 && counts[3]==0) return k;
        }
    } else {
        for (uint8_t k = 1; k <= max_k; k++) {
            int counts[4] = {0,0,0,0};
            for (uint8_t i = 0; i < k; i++) counts[w.get(i)]++;
            for (uint8_t i = 0; i < k; i++) counts[w.get(k + i)]--;
            if (counts[0]==0 && counts[1]==0 && counts[2]==0 && counts[3]==0) return k;
        }
    }
    return 0; // Not killed
}

int main() {
    PackedWord seed_w;
    for (int i=0; i<SEED.length(); i++) seed_w.set(i, SEED[i] - 'a');
    
    std::vector<PackedWord> current_frontier;
    current_frontier.push_back(seed_w);
    uint8_t seed_len = SEED.length();
    
    std::cout << "t | Side | |R_t| | Extinctions\n";
    std::cout << "--------------------------------\n";
    
    for (uint8_t step = 1; step <= 96; step++) {
        bool isRight = (step % 2 != 0);
        uint8_t current_len = seed_len + step - 1;
        uint8_t next_len = seed_len + step;
        
        std::vector<PackedWord> next_frontier;
        std::map<std::string, std::string> extinctions; // L_child -> reason
        
        for (const auto& w : current_frontier) {
            for (uint8_t c = 0; c < 4; c++) {
                PackedWord cand = w;
                if (isRight) cand.append_right(current_len, c);
                else cand.prepend_left(c);
                
                int K = get_kill_K(cand, next_len, isRight);
                if (K == 0) {
                    next_frontier.push_back(cand);
                } else if (!isRight) { // Record local left extinction
                    int k = step / 2;
                    std::string L_child = "";
                    for(int i=0; i<k; i++) L_child += (char)('a' + cand.get(i));
                    extinctions[L_child] = "Local K=" + std::to_string(K);
                }
            }
        }
        current_frontier = next_frontier;
        
        int left_k = step / 2;
        std::map<std::string, uint64_t> R_counts;
        for (const auto& w : current_frontier) {
            std::string L = "";
            for(int i=0; i<left_k; i++) L += (char)('a' + w.get(i));
            R_counts[L]++;
        }
        
        std::cout << (int)step << " | " << (isRight ? "R" : "L") << " | " << R_counts.size() << " | ";
        if (!isRight) {
            std::cout << extinctions.size() << " local kills. ";
            int max_k = 0;
            for(auto const& [child, reason] : extinctions) {
                int K = std::stoi(reason.substr(8)); // "Local K="
                if (K > max_k) max_k = K;
            }
            std::cout << "Max Kill K=" << max_k << " vs k+22=" << (left_k+22);
            if (max_k > (left_k+22)/2) std::cout << " (CROSSED SEED!)";
        }
        std::cout << "\n";
        
        // Print the counts for the exact trajectories occasionally or just keep track.
        if (step % 2 == 0) { // After Left
            std::cout << "  Left states: ";
            for (auto const& [L, count] : R_counts) {
                std::cout << L << ":" << count << " ";
            }
            std::cout << "\n";
        }
        std::cout.flush();
    }
    return 0;
}
