#include <iostream>
#include <vector>
#include <string>
#include <cstdint>
#include <cassert>
#include <chrono>
#include <algorithm>
#include <fstream>
#include <iomanip>
#include <map>
#include <unordered_map>
#include <unordered_set>
#include <set>

// P7-EXT Anatomy Analysis
// Artifact: P7_117_FRONTIER.bin

struct PackedWord {
    uint64_t limbs[4];
    inline uint8_t get(uint8_t idx) const {
        return (limbs[idx / 32] >> ((idx % 32) * 2)) & 0x3;
    }
};

struct Parikh {
    uint8_t c[4];
    uint32_t pack() const {
        return c[0] | (c[1]<<8) | (c[2]<<16) | (c[3]<<24);
    }
};

uint64_t getMask(const PackedWord& w, uint8_t added_char, std::vector<std::pair<uint8_t, Parikh>>& profiles) {
    uint64_t mask = 0;
    int16_t diff[4] = {0,0,0,0};
    diff[added_char]++;
    diff[w.get(0)]--;

    if (diff[0] == 0 && diff[1] == 0 && diff[2] == 0 && diff[3] == 0) {
        mask |= (1ULL << 1);
        Parikh p; p.c[0]=0; p.c[1]=0; p.c[2]=0; p.c[3]=0;
        p.c[added_char]++;
        profiles.push_back({1, p});
    }

    uint8_t counts1[4] = {0,0,0,0};
    counts1[added_char]++;

    for (uint8_t K = 2; K <= 59; K++) {
        uint8_t m_char = w.get(K - 2);
        counts1[m_char]++;
        diff[m_char] += 2;
        diff[w.get(2 * K - 3)]--;
        diff[w.get(2 * K - 2)]--;

        if (diff[0] == 0 && diff[1] == 0 && diff[2] == 0 && diff[3] == 0) {
            mask |= (1ULL << K);
            Parikh p; p.c[0]=counts1[0]; p.c[1]=counts1[1]; p.c[2]=counts1[2]; p.c[3]=counts1[3];
            profiles.push_back({K, p});
        }
    }
    return mask;
}

uint8_t popcount(uint64_t m) {
    uint8_t c = 0;
    for (; m; m >>= 1) c += (m & 1);
    return c;
}

struct Signature {
    uint64_t m[4];
    bool operator==(const Signature& o) const {
        return m[0]==o.m[0] && m[1]==o.m[1] && m[2]==o.m[2] && m[3]==o.m[3];
    }
};

namespace std {
    template<> struct hash<Signature> {
        size_t operator()(const Signature& s) const {
            return std::hash<uint64_t>()(s.m[0]) ^ 
                   (std::hash<uint64_t>()(s.m[1]) << 1) ^ 
                   (std::hash<uint64_t>()(s.m[2]) << 2) ^ 
                   (std::hash<uint64_t>()(s.m[3]) << 3);
        }
    };
}

uint8_t global_tau = 64;
std::vector<uint64_t> all_min_covers;

void find_covers(const std::vector<uint64_t>& antichain, uint64_t current_cover, int cover_size, int mask_idx) {
    if (cover_size > global_tau) return;
    
    int first_uncovered = -1;
    for (size_t i = mask_idx; i < antichain.size(); i++) {
        if ((antichain[i] & current_cover) == 0) {
            first_uncovered = (int)i;
            break;
        }
    }
    
    if (first_uncovered == -1) {
        if (cover_size < global_tau) {
            global_tau = cover_size;
            all_min_covers.clear();
        }
        all_min_covers.push_back(current_cover);
        return;
    }
    
    uint64_t m = antichain[first_uncovered];
    for (uint8_t bit = 1; bit <= 59; bit++) {
        if ((m >> bit) & 1) {
            find_covers(antichain, current_cover | (1ULL << bit), cover_size + 1, first_uncovered + 1);
        }
    }
}

uint8_t local_cover(const Signature& sig) {
    for (uint8_t i = 1; i <= 59; i++) {
        uint64_t s = (1ULL << i);
        if ((sig.m[0] & s) && (sig.m[1] & s) && (sig.m[2] & s) && (sig.m[3] & s)) return 1;
    }
    for (uint8_t i = 1; i <= 59; i++) {
        for (uint8_t j = i + 1; j <= 59; j++) {
            uint64_t s = (1ULL << i) | (1ULL << j);
            if ((sig.m[0] & s) && (sig.m[1] & s) && (sig.m[2] & s) && (sig.m[3] & s)) return 2;
        }
    }
    for (uint8_t i = 1; i <= 59; i++) {
        for (uint8_t j = i + 1; j <= 59; j++) {
            for (uint8_t k = j + 1; k <= 59; k++) {
                uint64_t s = (1ULL << i) | (1ULL << j) | (1ULL << k);
                if ((sig.m[0] & s) && (sig.m[1] & s) && (sig.m[2] & s) && (sig.m[3] & s)) return 3;
            }
        }
    }
    return 4;
}

int main() {
    std::ifstream in("P7_117_FRONTIER.bin", std::ios::binary);
    char header[121];
    in.read(header, 121);
    uint64_t count = *reinterpret_cast<uint64_t*>(header + 17);
    // Already read 121 bytes. No need to seekg!
    
    std::unordered_map<uint64_t, uint64_t> mask_counts;
    std::map<uint8_t, uint64_t> marginals;
    std::unordered_map<Signature, uint64_t> sig_counts;
    std::unordered_map<uint64_t, uint64_t> profile_counts;
    std::map<uint8_t, uint64_t> local_tau_counts;
    
    for (uint64_t idx = 0; idx < count; idx++) {
        PackedWord w;
        in.read(reinterpret_cast<char*>(&w), 32);
        
        Signature sig;
        for (uint8_t c = 0; c < 4; c++) {
            std::vector<std::pair<uint8_t, Parikh>> profiles;
            uint64_t m = getMask(w, c, profiles);
            sig.m[c] = m;
            mask_counts[m]++;
            
            for (uint8_t bit = 1; bit <= 59; bit++) {
                if ((m >> bit) & 1) marginals[bit]++;
            }
            
            for (auto& p : profiles) {
                uint64_t p_id = ((uint64_t)p.first << 32) | p.second.pack();
                profile_counts[p_id]++;
            }
        }
        sig_counts[sig]++;
        local_tau_counts[local_cover(sig)]++;
        
        if ((idx + 1) % 1000000 == 0) {
            std::cout << "Processed " << (idx + 1) << " words..." << std::endl;
        }
    }
    
    std::vector<uint64_t> unique_masks;
    for (auto& kv : mask_counts) unique_masks.push_back(kv.first);
    
    std::sort(unique_masks.begin(), unique_masks.end(), [](uint64_t a, uint64_t b) {
        return popcount(a) < popcount(b);
    });
    
    std::vector<uint64_t> antichain;
    for (uint64_t m : unique_masks) {
        bool is_superset = false;
        for (uint64_t a : antichain) {
            if ((m & a) == a) {
                is_superset = true;
                break;
            }
        }
        if (!is_superset) antichain.push_back(m);
    }
    
    find_covers(antichain, 0, 0, 0);
    
    auto write_json_u64 = [](const std::string& fname, const auto& map) {
        std::ofstream o(fname); o << "{\n"; bool first = true;
        for (auto& kv : map) {
            if (!first) o << ",\n";
            o << "  \"" << kv.first << "\": " << kv.second;
            first = false;
        }
        o << "\n}\n";
    };

    write_json_u64("P7_05_TERMINAL_KILL_MASK_COUNTS.json", mask_counts);
    write_json_u64("P7_05_WITNESS_PROFILE_COUNTS.json", profile_counts);
    
    std::ofstream am("P7_05_MINIMAL_MASK_ANTICHAIN.json");
    am << "[\n";
    for(size_t i=0; i<antichain.size(); i++){
        am << "  " << antichain[i] << (i+1==antichain.size()?"\n":",\n");
    }
    am << "]\n";
    am.close();

    std::ofstream mc("P7_05_MINIMUM_SCALE_COVER.json");
    mc << "{\n";
    mc << "  \"tau\": " << (int)global_tau << ",\n";
    mc << "  \"covers\": [\n";
    for(size_t i=0; i<all_min_covers.size(); i++){
        mc << "    " << all_min_covers[i] << (i+1==all_min_covers.size()?"\n":",\n");
    }
    mc << "  ]\n}\n";
    mc.close();
    
    std::ofstream r("P7_05_RESULTS.txt");
    r << "Tau: " << (int)global_tau << "\n";
    r << "Num Min Covers: " << all_min_covers.size() << "\n";
    r << "Distinct Signatures (D): " << sig_counts.size() << "\n";
    r << "Unique Masks: " << unique_masks.size() << "\n";
    r << "Antichain size: " << antichain.size() << "\n";
    for(int i=1; i<=4; i++) r << "Local Tau=" << i << ": " << local_tau_counts[i] << "\n";
    r.close();
    
    return 0;
}
