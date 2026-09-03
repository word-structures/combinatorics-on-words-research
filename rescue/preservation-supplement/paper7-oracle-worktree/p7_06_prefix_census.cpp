#include <iostream>
#include <fstream>
#include <vector>
#include <cstdint>
#include <string>
#include <set>
#include <map>

struct PackedWord {
    uint32_t limbs[4];

    uint8_t get(uint8_t idx) const {
        uint8_t limb_idx = idx / 16;
        uint8_t bit_idx = (idx % 16) * 2;
        return (limbs[limb_idx] >> bit_idx) & 3;
    }
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
    
    std::set<std::string> prefixes_1;
    std::set<std::string> prefixes_4;
    std::set<std::string> prefixes_6;
    std::set<std::string> prefixes_9;
    std::set<std::string> prefixes_10;
    std::set<std::string> prefixes_13;
    std::set<std::string> prefixes_21;
    std::set<std::string> prefixes_26;
    std::set<std::string> prefixes_47;
    std::set<std::string> prefixes_53;
    
    std::map<std::string, uint64_t> count_47;
    
    for (uint64_t idx = 0; idx < count; idx++) {
        PackedWord w;
        in.read(reinterpret_cast<char*>(&w.limbs[0]), 32);
        
        std::string s_53;
        s_53.reserve(53);
        for (int i = 0; i < 53; i++) {
            s_53.push_back("abcd"[w.get(i)]);
        }
        
        prefixes_1.insert(s_53.substr(0, 1));
        prefixes_4.insert(s_53.substr(0, 4));
        prefixes_6.insert(s_53.substr(0, 6));
        prefixes_9.insert(s_53.substr(0, 9));
        prefixes_10.insert(s_53.substr(0, 10));
        prefixes_13.insert(s_53.substr(0, 13));
        prefixes_21.insert(s_53.substr(0, 21));
        prefixes_26.insert(s_53.substr(0, 26));
        
        std::string p47 = s_53.substr(0, 47);
        prefixes_47.insert(p47);
        prefixes_53.insert(s_53);
        count_47[p47]++;
    }
    
    std::cout << "N_1 = " << prefixes_1.size() << "\n";
    std::cout << "N_4 = " << prefixes_4.size() << "\n";
    std::cout << "N_6 = " << prefixes_6.size() << "\n";
    std::cout << "N_9 = " << prefixes_9.size() << "\n";
    std::cout << "N_10 = " << prefixes_10.size() << "\n";
    std::cout << "N_13 = " << prefixes_13.size() << "\n";
    std::cout << "N_21 = " << prefixes_21.size() << "\n";
    std::cout << "N_26 = " << prefixes_26.size() << "\n";
    std::cout << "N_47 = " << prefixes_47.size() << "\n";
    std::cout << "N_53 = " << prefixes_53.size() << "\n";
    
    std::cout << "\nMultiplicities for N_47:\n";
    for (auto const& [p, c] : count_47) {
        std::cout << p << ": " << c << " right extensions\n";
    }
    
    return 0;
}
