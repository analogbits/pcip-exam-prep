# PCIP Exam Preparation Accelerator (PCI DSS v4.0.1)

A complete, interactive study suite designed for rapid 2-day preparation to pass the **Payment Card Industry Professional (PCIP)** examination.

## 🚀 Quick Start

You can open the application in several convenient ways:

### Option 1: Direct File Open (Zero Setup)
Simply open `index.html` in your web browser:
```bash
open /Users/michaelfitzgerald/.gemini/antigravity/scratch/pcip-study-app/index.html
```

### Option 2: Local Web Server
Run using the included helper script:
```bash
cd /Users/michaelfitzgerald/.gemini/antigravity/scratch/pcip-study-app
./start.sh
```
Or with Python:
```bash
python3 -m http.server 8080
```
Then navigate to `http://localhost:8080`.

---

## 🎯 Key Application Features

1. **Practice Mode with Instant Feedback & Deep Reasoning:**
   - Filter by domain or search for specific terms (`SAQ`, `SAD`, `MFA`, `FIM`, `30 days`, etc.).
   - Instant visual check upon submission (green for correct, red for incorrect).
   - Detailed official explanations referencing PCI DSS v4.0.1 requirements.
   - Specific **Exam Tips** highlighting recurring test traps.

2. **Exam Simulator (Pearson VUE Standard):**
   - 75 questions randomly sampled across all domains.
   - 90-minute countdown timer with warnings.
   - "Mark for Review" flag and clickable question grid for quick navigation.
   - Complete performance report with 75% pass mark, domain proficiency breakdown, and full item review.

3. **Rapid Cram Flashcards:**
   - Flip cards for fast memorization of high-yield definitions, acronyms, and rules of thumb.

4. **2-Day Master Cheat Sheet:**
   - All critical audit frequencies and numbers table (Daily, Weekly, 30 days, 90 days, 6 months, Annually).
   - Strict Cardholder Data (CHD) vs Sensitive Authentication Data (SAD) storage rules.
   - The 12 Requirements matrix.
   - SAQ Selection Decision Tree.
   - Compensating Controls (Appendix C) vs Customized Approach (Appendix D / TRA).
   - Major v4.0.1 new mandates (Req 6.4.3, Req 11.6.1, Req 8.4.2 MFA, 12-char passwords).

5. **Weak Area Review Queue:**
   - Any question bookmarked or missed during mock tests is automatically recorded in your browser (`localStorage`) for focused drilling.
