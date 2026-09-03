#include <iostream>
#include <vector>
#include <string>
#include <set>
#include <map>
#include <chrono>

const std::string SEED = "abacabadabacadcacbabda";

struct Parikh {
    int c[4] = {0,0,0,0};
    bool operator<(const Parikh& o) const {
        if (c[0]!=o.c[0]) return c[0]<o.c[0];
        if (c[1]!=o.c[1]) return c[1]<o.c[1];
        if (c[2]!=o.c[2]) return c[2]<o.c[2];
        return c[3]<o.c[3];
    }
    bool operator==(const Parikh& o) const {
        return c[0]==o.c[0] && c[1]==o.c[1] && c[2]==o.c[2] && c[3]==o.c[3];
    }
};

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

Parikh get_P(const std::string& w, int len) {
    Parikh p;
    for (int i=0; i<len; i++) p.c[w[i]-'a']++;
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
    std::vector<std::string> current_frontier;
    current_frontier.push_back(SEED);
    
    std::cout << "t | L_t | Q1 | Q2 | Q3\n";
    
    for (int step = 1; step <= 96; step++) {
        bool isRight = (step % 2 == 0);
        std::vector<std::string> next_frontier;
        
        for (const std::string& w : current_frontier) {
            for (char c : {'a','b','c','d'}) {
                std::string cand = isRight ? (w + c) : (c + w);
                if (!has_square(cand)) {
                    next_frontier.push_back(cand);
                }
            }
        }
        current_frontier = next_frontier;
        
        int k = (step + 1) / 2; // number of left extensions
        
        std::set<std::string> q0_set;
        std::set<std::vector<Parikh>> q1_set;
        std::set<std::vector<int>> q2_set;
        std::set<std::vector<int>> q3_set;
        
        for (const std::string& w : current_frontier) {
            std::string u = w.substr(0, k);
            q0_set.insert(u);
            
            std::vector<Parikh> q1;
            for (int i = 1; i <= k; i++) q1.push_back(get_P(u, i));
            q1_set.insert(q1);
            
            std::string u_seed = u + SEED.substr(0, 6);
            std::vector<int> q2;
            int max_len = u_seed.length(); // k + 6
            int K_targets[] = {1, 5, 7, 11, 27};
            for (int K : K_targets) {
                if (2*K - 1 <= max_len) {
                    q2.push_back(get_D_val(u_seed, K));
                } else {
                    q2.push_back(-2); // undefined
                }
            }
            q2_set.insert(q2);
            
            std::vector<int> q3;
            int K_max = (k + 6) / 2;
            for (int K = 1; K <= K_max; K++) {
                q3.push_back(get_D_val(u_seed, K));
            }
            q3_set.insert(q3);
        }
        
        std::cout << step << " | " << q0_set.size() << " | " << q1_set.size() << " | " << q2_set.size() << " | " << q3_set.size() << "\n";
        std::cout.flush();
    }
    
    return 0;
}
