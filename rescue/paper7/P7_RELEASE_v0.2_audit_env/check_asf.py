def get_parikh(w):
    p = [0,0,0,0]
    for c in w:
        if c == 'a': p[0] += 1
        elif c == 'b': p[1] += 1
        elif c == 'c': p[2] += 1
        elif c == 'd': p[3] += 1
    return tuple(p)

def check_asf(w):
    for K in range(1, len(w)//2 + 1):
        for i in range(len(w) - 2*K + 1):
            if get_parikh(w[i:i+K]) == get_parikh(w[i+K:i+2*K]):
                return False, K, i, w[i:i+K], w[i+K:i+2*K]
    return True, None, None, None, None

s = "abacabadc"
print(f"s is ASF: {check_asf(s)}")

for x in ['a', 'b', 'c', 'd']:
    ws = x + s
    res = check_asf(ws)
    if not res[0]:
        K, i, u, v = res[1], res[2], res[3], res[4]
        print(f"Prefix {x} -> square at {i}, K={K}, u={u}, v={v}, parikh={get_parikh(u)}")
    else:
        print(f"Prefix {x} -> IS ASF!")
