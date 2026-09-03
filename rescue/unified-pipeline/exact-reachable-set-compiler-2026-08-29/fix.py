with open("run_cleanroom_audit.py", "r") as f:
    text = f.read()

text = text.replace("concreteBlocks = [\"00012\", \"01122\", \"02222\", \"11111\", \"01010\", \"11100\", \"22211\", \"00220\", \"11221\", \"00000\"]",
"")

text = text.replace("""    test_cases = []
    for L in range(5, 9):""", """    test_cases = []
    for L in range(5, 9):
        concreteBlocks = []
        import random
        random.seed(42)
        for _ in range(12):
            b = "".join([str(random.randint(0,2)) for _ in range(L)])
            concreteBlocks.append(b)""")

with open("run_cleanroom_audit.py", "w") as f:
    f.write(text)
