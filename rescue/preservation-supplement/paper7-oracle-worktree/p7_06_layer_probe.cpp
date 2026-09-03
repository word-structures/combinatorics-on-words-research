#include <iostream>
#include <vector>
#include <set>
#include <string>
#include <map>

// We'll just generate the exact words recursively.
const std::string SEED = "abacabadabacadcacbabda";
std::vector<std::string> current_frontier;
std::vector<std::string> next_frontier;

struct Parikh {
    int c[4] = {0,0,0,0};
};

int get_D(const std::string& w, int K) {
    Parikh pK, p2K;
    for (int i=0; i<K-1; i++) pK.c[w[i]-'a']++;
    for (int i=0; i<2*K-1; i++) p2K.c[w[i]-'a']++;
    
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

bool has_square(const std::string& s) {
    int len = s.length();
    for (int k = 1; k <= len / 2; ++k) {
        int counts[4] = {0};
        for (int i = len - 2 * k; i < len - k; ++i) counts[s[i] - 'a']++;
        for (int i = len - k; i < len; ++i) counts[s[i] - 'a']--;
        if (counts[0] == 0 && counts[1] == 0 && counts[2] == 0 && counts[3] == 0)
            return true;
    }
    return false;
}

int main() {
    current_frontier.push_back(SEED);
    
    for (int step = 1; step <= 96; step++) {
        bool isRight = (step % 2 == 0);
        next_frontier.clear();
        
        for (const std::string& w : current_frontier) {
            for (char c : {'a','b','c','d'}) {
                std::string cand = isRight ? (w + c) : (c + w);
                if (!has_square(cand)) {
                    next_frontier.push_back(cand);
                }
            }
        }
        
        current_frontier = next_frontier;
        int current_len = current_frontier[0].length();
        
        // Compute U1 and U2
        int u1_words = 0;
        int u2_words = 0;
        
        std::set<std::string> prefix21;
        std::set<std::string> prefix53;
        
        std::set<std::string> u1_prefixes;
        std::set<std::string> u2_prefixes;
        
        for (const std::string& w : current_frontier) {
            int d1 = get_D(w, 1);
            int d5 = get_D(w, 5);
            int d7 = get_D(w, 7);
            int d11 = (current_len >= 21) ? get_D(w, 11) : -1;
            
            bool u1 = false;
            if (d1 >= 0 && d5 >= 0 && d7 >= 0 && d11 >= 0) {
                if (((1<<d1) | (1<<d5) | (1<<d7) | (1<<d11)) == 15) u1 = true;
            }
            if (u1) u1_words++;
            
            bool u2 = false;
            int d27 = (current_len >= 53) ? get_D(w, 27) : -1;
            if (d27 == d1 && d1 == w[0]-'a') u2 = true;
            if (u2) u2_words++;
            
            if (current_len >= 21) {
                std::string p = w.substr(0, 21);
                prefix21.insert(p);
                if (u1) u1_prefixes.insert(p);
            }
            if (current_len >= 53) {
                std::string p = w.substr(0, 53);
                prefix53.insert(p);
                if (u2) u2_prefixes.insert(p);
            }
        }
        
        std::cout << "Depth " << step << " (Len " << current_len << "): " << current_frontier.size() << " words\n";
        if (current_len >= 21) {
            std::cout << "  U1 Words: " << u1_words << " / " << current_frontier.size() 
                      << "  | U1 Prefixes(21): " << u1_prefixes.size() << " / " << prefix21.size() << "\n";
        }
        if (current_len >= 53) {
            std::cout << "  U2 Words: " << u2_words << " / " << current_frontier.size() 
                      << "  | U2 Prefixes(53): " << u2_prefixes.size() << " / " << prefix53.size() << "\n";
        }
        std::cout.flush();
        
        // If we hit depth 35, that's enough to see universality.
        if (step == 35) {
            break;
        }
    }
    
    return 0;
}
