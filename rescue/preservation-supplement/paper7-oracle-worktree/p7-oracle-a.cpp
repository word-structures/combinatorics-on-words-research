#include <iostream>
#include <vector>
#include <string>
#include <cstdint>
#include <cassert>
#include <chrono>
#include <algorithm>
#include <fstream>
#include <iomanip>

/*
 * P7_EXT: Oracle A - C++ optimized exhaustive replay
 * Single-threaded, deterministic, no randomized hashing, explicit bounds.
 */

const char ALPHABET_CHARS[4] = {'a', 'b', 'c', 'd'};

struct PackedWord {
    uint64_t limbs[4] = {0, 0, 0, 0};

    inline uint8_t get(uint8_t idx) const {
        uint8_t limb_idx = idx / 32;
        uint8_t bit_offset = (idx % 32) * 2;
        return (limbs[limb_idx] >> bit_offset) & 0x3;
    }

    inline void set(uint8_t idx, uint8_t val) {
        uint8_t limb_idx = idx / 32;
        uint8_t bit_offset = (idx % 32) * 2;
        limbs[limb_idx] &= ~(3ULL << bit_offset);
        limbs[limb_idx] |= (uint64_t(val) << bit_offset);
    }

    inline void append_right(uint8_t len, uint8_t val) {
        set(len, val);
    }

    inline void prepend_left(uint8_t val) {
        limbs[3] = (limbs[3] << 2) | (limbs[2] >> 62);
        limbs[2] = (limbs[2] << 2) | (limbs[1] >> 62);
        limbs[1] = (limbs[1] << 2) | (limbs[0] >> 62);
        limbs[0] = (limbs[0] << 2) | val;
    }

    std::string to_string(uint8_t len) const {
        std::string s;
        s.reserve(len);
        for (uint8_t i = 0; i < len; i++) {
            s.push_back(ALPHABET_CHARS[get(i)]);
        }
        return s;
    }

    void write_le(std::ofstream& out) const {
        for (int i = 0; i < 4; i++) {
            uint64_t v = limbs[i];
            for (int b = 0; b < 8; b++) {
                uint8_t byte = (v >> (b * 8)) & 0xFF;
                out.write(reinterpret_cast<const char*>(&byte), 1);
            }
        }
    }
};

bool isAbelianSquareFreeIncremental(const PackedWord& w, uint8_t len, bool isRight) {
    assert(len <= 118 && "Implementation valid only for length <= 118");
    uint8_t max_K = len / 2;

    for (uint8_t K = 1; K <= max_K; K++) {
        uint8_t counts[4] = {0, 0, 0, 0};
        
        if (isRight) {
            uint8_t start1 = len - 2 * K;
            uint8_t end1 = len - K;
            uint8_t start2 = len - K;
            uint8_t end2 = len;
            for (uint8_t i = start1; i < end1; i++) counts[w.get(i)]++;
            for (uint8_t i = start2; i < end2; i++) counts[w.get(i)]--;
        } else {
            uint8_t start1 = 0;
            uint8_t end1 = K;
            uint8_t start2 = K;
            uint8_t end2 = 2 * K;
            for (uint8_t i = start1; i < end1; i++) counts[w.get(i)]++;
            for (uint8_t i = start2; i < end2; i++) counts[w.get(i)]--;
        }
        
        if (counts[0] == 0 && counts[1] == 0 && counts[2] == 0 && counts[3] == 0) {
            return false;
        }
    }
    return true;
}

// Extract witness for a failed left extension
void getWitnessLeft(const PackedWord& w, uint8_t len, uint8_t& out_K, uint8_t out_counts[4]) {
    uint8_t max_K = len / 2;
    for (uint8_t K = 1; K <= max_K; K++) {
        uint8_t counts[4] = {0, 0, 0, 0};
        uint8_t start1 = 0, end1 = K, start2 = K, end2 = 2 * K;
        for (uint8_t i = start1; i < end1; i++) counts[w.get(i)]++;
        for (uint8_t i = start2; i < end2; i++) counts[w.get(i)]--;
        
        if (counts[0] == 0 && counts[1] == 0 && counts[2] == 0 && counts[3] == 0) {
            out_K = K;
            // Record absolute Parikh counts of one half
            out_counts[0] = out_counts[1] = out_counts[2] = out_counts[3] = 0;
            for (uint8_t i = 0; i < K; i++) out_counts[w.get(i)]++;
            return;
        }
    }
}

void test_representation() {
    std::cout << "Running representation self-tests..." << std::endl;
    // Test basic encode/decode
    PackedWord w1;
    w1.append_right(0, 1); // b
    w1.append_right(1, 2); // c
    w1.append_right(2, 3); // d
    w1.append_right(3, 0); // a
    assert(w1.to_string(4) == "bcda");

    // Test boundaries (31-33)
    PackedWord w2;
    for (int i = 0; i < 31; i++) w2.append_right(i, 0); // 'a'
    assert(w2.to_string(31) == std::string(31, 'a'));
    w2.append_right(31, 1); // 'b'
    assert(w2.to_string(32) == std::string(31, 'a') + "b");
    w2.append_right(32, 2); // 'c'
    assert(w2.to_string(33) == std::string(31, 'a') + "bc");

    // Test prepend_left around boundaries
    PackedWord w3;
    w3.append_right(0, 1); // b
    for (int i = 0; i < 32; i++) {
        w3.prepend_left(0); // prepend 'a'
    }
    std::string expected = std::string(32, 'a') + "b";
    assert(w3.to_string(33) == expected);

    // Ensure unused bits are zero
    assert((w3.limbs[1] >> 2) == 0);
    assert(w3.limbs[2] == 0);
    assert(w3.limbs[3] == 0);

    // Test a longer prepend sequence
    PackedWord w4;
    for (int i = 0; i < 64; i++) {
        w4.prepend_left((i % 4)); // cycle through a, b, c, d
    }
    assert(w4.to_string(64).length() == 64);
    
    std::cout << "Representation self-tests passed." << std::endl;
}

int main(int argc, char* argv[]) {
    if (argc > 1 && std::string(argv[1]) == "--test") {
        test_representation();
        return 0;
    }

    uint8_t max_depth = 96; // default max depth for w_K
    if (argc > 1) max_depth = std::stoi(argv[1]);

    std::string seed = "abcdacbabdabacdacbcdad";
    uint8_t seed_len = seed.length();
    
    PackedWord initial_word;
    for (uint8_t i = 0; i < seed_len; i++) {
        uint8_t val = (seed[i] == 'b') ? 1 : (seed[i] == 'c') ? 2 : (seed[i] == 'd') ? 3 : 0;
        initial_word.set(i, val);
    }

    std::vector<PackedWord> current_frontier;
    current_frontier.push_back(initial_word);

    auto start_time = std::chrono::high_resolution_clock::now();

    for (uint8_t step = 1; step <= max_depth; step++) {
        bool isRight = (step % 2 != 0);
        uint8_t current_len = seed_len + step - 1;
        uint8_t next_len = seed_len + step;
        
        std::vector<PackedWord> next_frontier;
        // For step 96, we don't need to save next_frontier unless we want survivors
        uint64_t attempts = 0;
        
        for (const auto& w : current_frontier) {
            for (uint8_t c = 0; c < 4; c++) {
                PackedWord candidate = w;
                if (isRight) candidate.append_right(current_len, c);
                else candidate.prepend_left(c);
                
                attempts++;
                
                if (isAbelianSquareFreeIncremental(candidate, next_len, isRight)) {
                    next_frontier.push_back(candidate);
                } else if (step == 96) {
                    // It's a kill on the final step, we could log witness histograms here
                    // (Omitted printing here to avoid 31 million lines, but logic can hook in)
                }
            }
        }
        
        current_frontier = std::move(next_frontier);
        std::cout << "Length: " << (int)next_len << ", Side: " << (isRight ? "RIGHT" : "LEFT") << ", Count: " << current_frontier.size() << std::endl;
        
        if (max_depth <= 96) {
            std::string out_file = "p7_frontier_len_" + std::to_string((int)next_len) + ".txt";
            std::ofstream out(out_file);
            for (const auto& w : current_frontier) {
                out << w.to_string((int)next_len) << "\n";
            }
            out.close();
        }

        if (next_len == 117 && max_depth >= 95) {
            std::cout << "Emitting binary artifact for length 117..." << std::endl;
            std::ofstream out("P7_117_FRONTIER.bin", std::ios::binary);
            out.write("P7_FRONTIER\0", 12);
            uint32_t version = 1;
            out.write(reinterpret_cast<char*>(&version), 4);
            uint8_t wlen = 117;
            out.write(reinterpret_cast<char*>(&wlen), 1);
            uint64_t count = current_frontier.size();
            out.write(reinterpret_cast<char*>(&count), 8);
            
            // Dummy hashes for demonstration (32 bytes each)
            char dummy_hash[32] = {0};
            out.write(dummy_hash, 32); // Seed Hash
            out.write(dummy_hash, 32); // Protocol Hash
            out.write(dummy_hash, 32); // Oracle A Source Hash
            
            for (const auto& w : current_frontier) {
                w.write_le(out);
            }
            out.write(dummy_hash, 32); // Payload Hash
            out.close();
        }

        if (current_frontier.empty()) {
            std::cout << "Extinction reached at step " << (int)step << std::endl;
            if (step == 96) {
                std::cout << "Attempts made: " << attempts << " (4 * F(117))" << std::endl;
            }
            break;
        }
    }
    
    auto end_time = std::chrono::high_resolution_clock::now();
    std::chrono::duration<double> elapsed = end_time - start_time;
    std::cout << "Elapsed time: " << elapsed.count() << " seconds." << std::endl;

    return 0;
}
