def test(h, v):
    B = sum((x - h/3)**2 for x in v)
    d1 = sum((x/h)**2 for x in v)
    sum_da = sum((x/h)**2 * (x - h/3) for x in v)
    V1 = d1 * (4*B + 2/3) + 4 * sum_da
    return 4*B - V1

print("h=3, v=(2,1,0):", test(3, [2,1,0]))
print("B=", sum((x-1)**2 for x in [2,1,0]))
print("-4/3 B=", -4/3 * sum((x-1)**2 for x in [2,1,0]))

