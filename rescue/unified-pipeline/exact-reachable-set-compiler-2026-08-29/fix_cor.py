with open("PAPER4_REACHABLE_SET_COROLLARY_CANDIDATE_2026-08-29.md", "r") as f:
    text = f.read()

import re

# Remove section 4
text = re.sub(r'## 4\. Empirical Tightness \(Converse Control Observation\).*?## 5\. Recommendation', '## 4. Recommendation', text, flags=re.DOTALL)

with open("PAPER4_REACHABLE_SET_COROLLARY_CANDIDATE_2026-08-29.md", "w") as f:
    f.write(text)
