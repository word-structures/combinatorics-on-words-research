# CORRECT VARIANCE FORMULA DERIVATION

Let f be a centered observable (<f, 1>_pi = 0).
The asymptotic variance is:

sigma^2
  = <f,f> + 2 sum_{k>=1}<f,P^k f>

Let g = sum_{k>=0} P^k f.
Then Pg = sum_{k>=1} P^k f = g - f.

Substitute into the series:
  = <f,f> + 2<f,Pg>
  = <f,f> + 2<f,g - f>
  = <f,f> + 2<f,g> - 2<f,f>
  = 2<f,g> - <f,f>.

RUN2_IMPLEMENTED_FORMULA = 2<f,Pg> - <f,f>
CORRECT_FORMULA = 2<f,g> - <f,f>
FORMULA_DIFFERENCE = RUN2 implemented 2<f,g> - 3<f,f>, which incorrectly subtracts the zero-lag variance multiple times.
