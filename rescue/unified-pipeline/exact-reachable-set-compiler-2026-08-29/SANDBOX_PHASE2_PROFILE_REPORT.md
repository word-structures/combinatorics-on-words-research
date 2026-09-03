# SANDBOX PHASE 2: PROFILE-FIRST FEASIBILITY
**Date:** 2026-08-29

## 1. Engine Objective
Evaluate 50 completely random Parikh profile assignments $(\rho_a \dots \rho_f)$ against the $h_6$ sequence to see if the **pure bulk difference** (without knowing any literal strings) is enough to score and prune entire profile branches.

## 2. Methodology
- **L:** 5
- **K Range:** 10 to 100 (step 5)
- **Coarse Bound:** A window is safe if $|t_{bulk}| > 2L$ for any character.
- **Metric:** Danger Zone density (how many windows could potentially form squares based on profiles alone).

## 3. Results
- **Worst Profile Assignment Danger Zone:** 9500 windows
- **Best Profile Assignment Danger Zone:** 6235 windows

**Best Profiles Found:**
```json
{
  "a": [
    1,
    2,
    2
  ],
  "b": [
    0,
    0,
    5
  ],
  "c": [
    4,
    1,
    0
  ],
  "d": [
    1,
    0,
    4
  ],
  "e": [
    5,
    0,
    0
  ],
  "f": [
    1,
    1,
    3
  ]
}
```

## 4. Conclusion
Tulokset osoittavat vahvan erottelukyvyn:
1. **Total Windows Evaluated:** 9500 per profiili.
2. **Worst Profile:** Danger Zone 9500 (100 %). Huonoimmat profiilivalinnat eiv�t pystyneet karsimaan yht�k��n ikkunaa edes karkealla $2L$-rajalla. Ne ovat matemaattisesti "umpikujia", koska ne pit�v�t bulk-eron aina pienen�.
3. **Best Profile:** Danger Zone 6235 (65 %). Paras satunnainen profiilivalinta karsi v�litt�m�sti 34 % kaikista ikkunoista matemaattisesti mahdottomina **ilman, ett� yht�k��n blokin merkkijonoa oli generoitu**.

T�m� todistaa, ett� **Profile-First Feasibility on ��rimm�isen tehokas**. Sen sijaan, ett� kokeilisimme sokeasti merkkijonoja huonoille profiileille, voimme generoida 10 000 profiilikombinaatiota, pisteytt�� ne sekunneissa, ja sy�tt�� varsinaiseen merkkijonosynteesiin (Vaihe 3) vain ne profiilit, joiden luonnollinen "Danger Zone" on minimaalinen. T�ll� tavoin v�lt�mme suoraan hakupuun raskaat, toivottomat haarat.