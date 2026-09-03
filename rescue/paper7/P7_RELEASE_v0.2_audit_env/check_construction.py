import json
import check_asf

with open("release_v0.2_extracted/P7_MAIN_THEOREM_RELEASE_v0.2/G85.json") as f:
    g85 = json.load(f)

C = "abacabadcdb"
print(f"C is ASF: {check_asf.check_asf(C)[0]}")

W0 = C
W1 = C + "".join(g85[c] for c in W0)
W2 = C + "".join(g85[c] for c in W1)

print(f"|W0| = {len(W0)}")
print(f"|W1| = {len(W1)}")
print(f"|W2| = {len(W2)}")

print(f"W0 is prefix of W1: {W1.startswith(W0)}")
print(f"W1 is prefix of W2: {W2.startswith(W1)}")

print(f"W0 is ASF: {check_asf.check_asf(W0)[0]}")
print(f"W1 is ASF: {check_asf.check_asf(W1)[0]}")
# W2 length is 80k, checking it might take a moment, let's just check the first 2000 chars as a proxy, or check the whole thing if fast.
