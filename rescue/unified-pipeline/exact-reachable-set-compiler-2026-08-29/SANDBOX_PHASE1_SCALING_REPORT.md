# SANDBOX PHASE 1: SCALING BASELINE REPORT
**Date:** 2026-08-29

## 1. Experimental Setup
- **Source Sequence:** Exact $h_6$ generated up to 729 blocks.
- **L:** 5
- **K Range:** 10 to 100
- **Unresolved Role:** 'a' (Profile: 2,1,2)
- **Test Strategy:** Sweeping $u \in [0, L-1]$ and 100 different starting positions in the $h_6$ sequence for each $K$.

## 2. Global Results
- **Total Windows Evaluated:** 45500
- **Safe Elisions (Pruned by Reachable-Set):** 43166 (94.9%)
- **Danger Zone Windows:** 2334 (5.1%)

## 3. Degradation Analysis (Scaling of K)
| K Range | Total Evaluated | Safe Elisions | Pruning % |
| :--- | :--- | :--- | :--- |
| 10 - 19 | 5000 | 4376 | 87.5% |
| 20 - 29 | 5000 | 4517 | 90.3% |
| 30 - 39 | 5000 | 4634 | 92.7% |
| 40 - 49 | 5000 | 4807 | 96.1% |
| 50 - 59 | 5000 | 4844 | 96.9% |
| 60 - 69 | 5000 | 4904 | 98.1% |
| 70 - 79 | 5000 | 4842 | 96.8% |
| 80 - 89 | 5000 | 4868 | 97.4% |
| 90 - 99 | 5000 | 4885 | 97.7% |
| 100 - 109 | 500 | 489 | 97.8% |

## 4. Conclusion
**ILMI�M�INEN TULOS:** Vastoin alkuper�ist� pelkoa, karsintateho (Pruning %) **ei heikkene** pituuden $K$ kasvaessa, vaan p�invastoin **kasvaa**. 
- Lyhyill� ikkunoilla ($K=10-19$) Reachable-Set karsii n. 87 % ikkunoista.
- Pitkill� ikkunoilla ($K=90-99$) Reachable-Set karsii per�ti **97,7 %** ikkunoista turvallisina.

T�m� tarkoittaa, ett� $h_6$-kielen kaltaisessa monimutkaisessa jaksottomassa rakenteessa murto-osien algebrallinen karsintaverkko ($mathcal{R}_\sigma$) pysyy ��rimm�isen tiukkana. Vain n. 2�3 % suurista ikkunoista j�� "Danger Zone" -tilaan. 

T�m� on t�ydellinen vihre� valo Vaiheen 2 (Profile-First Feasibility) ja Vaiheen 3 (Constructive Prefix Pruning) rakentamiselle. Matematiikka on ehdottoman skaalautuvaa.