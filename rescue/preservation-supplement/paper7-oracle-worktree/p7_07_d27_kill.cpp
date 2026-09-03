#include <iostream>
#include <vector>
#include <string>

struct Parikh {
    int c[4] = {0,0,0,0};
    bool operator==(const Parikh& o) const {
        return c[0]==o.c[0] && c[1]==o.c[1] && c[2]==o.c[2] && c[3]==o.c[3];
    }
};

bool has_as_suffix(const std::string& s) {
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

bool check_D(const std::string& w, int K, int target_char) {
    Parikh p2K = get_P(w, 2*K - 1);
    Parikh pK = get_P(w, K - 1);
    int D[4];
    for (int j=0; j<4; j++) D[j] = p2K.c[j] - 2*pK.c[j];
    
    for (int j=0; j<4; j++) {
        if (j == target_char) {
            if (D[j] != 1) return false;
        } else {
            if (D[j] != 0) return false;
        }
    }
    return true;
}

std::string unrestricted_ex = "";
std::string asf_ex = "";
bool found_asf = false;

void dfs(std::string current) {
    if (found_asf) return;
    int len = current.length();
    
    if (len == 1) {
        if (!check_D(current, 1, 0)) return; // a
    }
    if (len == 9) {
        if (!check_D(current, 5, 2)) return; // c
    }
    if (len == 13) {
        if (!check_D(current, 7, 1)) return; // b
    }
    if (len == 21) {
        if (!check_D(current, 11, 3)) return; // d
    }
    if (len == 53) {
        if (!check_D(current, 27, 0)) {
            // Found a counterexample!
            if (unrestricted_ex == "") unrestricted_ex = current;
            asf_ex = current;
            found_asf = true;
        }
        return;
    }
    
    for (char c : {'a','b','c','d'}) {
        std::string next = current + c;
        if (!has_as_suffix(next)) {
            dfs(next);
        }
    }
}

void dfs_unrestricted(std::string current) {
    if (unrestricted_ex != "") return;
    int len = current.length();
    
    if (len == 1) {
        if (!check_D(current, 1, 0)) return; // a
    }
    if (len == 9) {
        if (!check_D(current, 5, 2)) return; // c
    }
    if (len == 13) {
        if (!check_D(current, 7, 1)) return; // b
    }
    if (len == 21) {
        if (!check_D(current, 11, 3)) return; // d
    }
    if (len == 53) {
        if (!check_D(current, 27, 0)) {
            unrestricted_ex = current;
        }
        return;
    }
    
    for (char c : {'a','b','c','d'}) {
        dfs_unrestricted(current + c);
        if (unrestricted_ex != "") return;
    }
}

int main() {
    std::cout << "Searching for unrestricted counterexample...\n";
    dfs_unrestricted("");
    if (unrestricted_ex != "") {
        std::cout << "Unrestricted Counterexample found: " << unrestricted_ex << "\n";
    } else {
        std::cout << "No unrestricted counterexample!\n";
    }
    
    std::cout << "Searching for ASF counterexample...\n";
    dfs("");
    if (asf_ex != "") {
        std::cout << "ASF Counterexample found: " << asf_ex << "\n";
    } else {
        std::cout << "No ASF counterexample (or exhausted search space if not found)!\n";
    }
    
    return 0;
}
