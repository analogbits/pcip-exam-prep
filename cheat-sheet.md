# PCIP (Payment Card Industry Professional) 2-Day Master Cheat Sheet
**Aligned with PCI DSS v4.0.1 · Comprehensive Audio & Visual Cram Guide**

---

## ⚡ 1. 48-Hour Exam Strategy & Priority Allocation

The PCIP examination consists of **60 to 75 multiple-choice questions** (primarily single-choice A-D, with occasional multi-select questions) administered over **90 minutes** via Pearson VUE. Passing score is **75%**.

| Time Window | Focus Area | High-Yield Activity |
| :--- | :--- | :--- |
| **Day 1: Morning** | Ecosystem & Scoping | Master Ecosystem roles (PCI SSC vs Brands), ACS transaction lifecycle, CDE boundary rules, and strict CHD vs SAD rules. |
| **Day 1: Afternoon & Evening** | Requirements 1 – 12 | Drill Network Security Controls (Req 1-2), Encryption (Req 3-4), Patching (Req 6), Passwords & MFA (Req 8), Logging (Req 10), and Pentesting (Req 11). |
| **Day 2: Morning** | Periodicity & SAQs | Memorize the exact Periodicity Table below and drill the SAQ Selection Tree. |
| **Day 2: Afternoon** | Appendices & Standards | Master Appendix C (Compensating Controls) vs Appendix D (Customized Approach), DESV, and specialized standards (P2PE, PTS, SSF). |
| **Day 2: Evening** | Mock Simulations | Complete 2 full 75-question timed mock simulations in the App; review all missed items in the Weak Areas queue. |

---

## ⏱️ 2. Master Periodicity & Exact Frequencies Table

| Frequency | Required Activity & Scope | PCI DSS Requirement |
| :--- | :--- | :---: |
| **15 Minutes** | Automatic idle session lock on workstations with access to CDE. | Req 8.2.8 |
| **Daily** | Automated/manual review of audit logs for critical security systems (NSCs, IDS/IPS, authentication servers, servers holding CHD). | Req 10.4.1 |
| **Weekly (7 Days)** | File Integrity Monitoring (FIM) verification of critical OS and system files. E-commerce payment page tamper-detection alerts (headers and scripts). | Req 11.5.2 & 11.6.1 |
| **30 Calendar Days** | Deploy all Critical and High-risk security patches. Maximum timeframe to dispute ASV external scan findings. | Req 6.3.3 |
| **90 Calendar Days** | Disable or remove inactive user accounts. Minimum retention for physical visitor logs and video surveillance footage. Password rotation (unless dynamic risk-based auth is used). Maximum validity for ASV external scan reports. | Req 8.2.6, 8.3.9, 9.3.4, 9.4.4 |
| **Quarterly (3 Months)** | Internal vulnerability scans (authenticated in v4.0). External vulnerability scans by an Approved Scanning Vendor (ASV). Rogue wireless access point scans (WIDS/WIPS or physical RF sweep). Purge stored cardholder data exceeding retention policy. | Req 3.1.1, 11.2.1, 11.3.1, 11.3.2 |
| **Semi-Annually (6 Months)** | Review all user accounts and access privileges (Req 7.2.4). Review firewall and NSC rulesets (Req 1.2.7). Service Provider segmentation penetration testing (Req 11.4.5). Service Provider scope confirmation and data flow verification (Req 12.5.2). | Req 1.2.7, 7.2.4, 11.4.5, 12.5.2 |
| **Annually (12 Months)** | Internal and external penetration testing (network and application layer). Merchant segmentation validation pentest. Merchant PCI DSS scope confirmation. Information security policy review. Formal risk assessment. Security awareness training for all personnel. Incident response plan testing. Monitor TPSP compliance status (collect AOCs). Cryptographic key and cryptoperiod review. | Req 11.4.1, 12.1.1, 12.1.2, 12.5.2, 12.6.1, 12.8.4, 12.10.2 |
| **1 Year Retention** | Retain audit trail logs for at least 12 months, with the most recent 3 months immediately accessible online. | Req 10.5.1 |

---

## 💳 3. Account Data: Cardholder Data (CHD) vs Sensitive Authentication Data (SAD)

| Category | Data Element | Can Store Post-Auth? | Mandatory Protection Standard |
| :--- | :--- | :---: | :--- |
| **CHD** | **Primary Account Number (PAN)** | **YES** | Must be rendered unreadable: 1) Strong crypto (AES-128/256), 2) Keyed hash, 3) Truncation, or 4) Tokenization. |
| **CHD** | Cardholder Name | **YES** | Must be protected if stored together with the PAN. |
| **CHD** | Expiration Date | **YES** | Must be protected if stored together with the PAN. |
| **CHD** | Service Code | **YES** | Must be protected if stored together with the PAN. |
| **SAD** | **Full Magnetic Stripe Data** | **NO NEVER** | Strictly forbidden post-auth even if encrypted. Only Issuers with business justification have an exception. |
| **SAD** | **CVV2 / CVC2 / CID / CAV2** | **NO NEVER** | Strictly forbidden post-auth. Storing CVV for recurring billing is illegal! |
| **SAD** | **PIN / PIN Block** | **NO NEVER** | Plaintext PINs must never exist outside certified PTS cryptographic hardware. |

### Cryptographic Key Management (Req 3.5 - 3.7)
- **Display Masking (Req 3.3):** Maximum displayed digits = first 6 (or 8) and last 4 digits (BIN + last 4).
- **Dual Control & Split Knowledge (Req 3.6):** Key operations require 2 people (dual control) and key components split so no single person knows the full key (split knowledge).
- **DEK vs KEK:** Data Encryption Key (DEK) encrypts card data; Key Encrypting Key (KEK) encrypts the DEK. KEK must be at least as strong as DEK and stored separately.

---

## 🏛️ 4. Payment Ecosystem Roles & Brand Enforcement

- **PCI SSC (Security Standards Council):** Founded by Visa, MC, Amex, Discover, JCB. Publishes standards and qualifies assessors. **THE COUNCIL HAS ZERO ENFORCEMENT POWER AND LEVIES NO FINES!**
- **Payment Card Brands:** Enforce compliance, define merchant levels (1-4), set deadlines, and assess penalties against Acquiring Banks for merchant non-compliance.
  - *Visa:* CISP (Cardholder Information Security Program)
  - *MasterCard:* SDP (Site Data Protection)
  - *Discover:* DISC
  - *American Express:* DSOP (Data Security Operating Policy)
- **Acquirer (Merchant's Bank):** Financial institution processing card transactions for merchants. Acquirers pass brand penalties down to non-compliant merchants.
- **Issuer (Cardholder's Bank):** Bank that issues cards to consumers. **ONLY THE ISSUER has the authority to approve or decline a purchase during authorization.**
- **Transaction Lifecycle (ACS):**
  1. *Authorization:* Merchant requests approval; Issuer validates cardholder funds/credit and returns approval/decline code.
  2. *Clearing:* Acquirer and Issuer exchange final settlement records via brand network.
  3. *Settlement:* Financial movement of funds from Issuer to Acquirer, and from Acquirer to Merchant account.
- **Open-Loop (4-Party) vs Closed-Loop (3-Party):**
  - *Open-Loop (Visa/MC):* 4 parties: Cardholder, Issuer, Acquirer, Merchant.
  - *Closed-Loop (Amex/Discover):* 3 parties: Cardholder, Brand (acts as both Issuer & Acquirer), Merchant.
- **Assessor Qualifications:**
  - *QSA (Qualified Security Assessor):* Independent external consultant who audits Level 1 entities and signs Reports on Compliance (ROC).
  - *ISA (Internal Security Assessor):* Internal employee trained by PCI SSC to sponsor internal compliance and perform internal assessments.
  - *PCIP (Payment Card Industry Professional):* Professional credential proving comprehensive knowledge; does not sign official audit ROCs.
  - *ASV (Approved Scanning Vendor):* Company certified to perform quarterly external vulnerability scans.
- **Disciplinary Sanctions:** 1) Warning, 2) Suspension, 3) Revocation.

---

## 🎯 5. Scoping & Network Segmentation

1. **Cardholder Data Environment (CDE):** Systems, people, and processes that store, process, or transmit CHD/SAD, plus all systems on the same unsegmented network.
2. **Connected-To Systems:** Systems directly connected to the CDE (e.g. jump boxes, admin workstations, backup servers, SIEM). In scope for all applicable requirements.
3. **Security-Impacting Systems:** Systems that provide security services or whose compromise could impact CDE security (Active Directory, NTP, DNS, firewalls, patching servers).
4. **Flat Networks:** Without firewalls/VLANs, the ENTIRE corporate network is in scope for all 12 requirements!
5. **Segmentation Testing:** Must be validated via technical penetration testing: annually for merchants, semi-annually (every 6 months) for service providers.

---

## 📋 6. Summary of the 12 Requirements

### Goal 1: Build and Maintain a Secure Network and Systems
- **Req 1:** Install and Maintain Network Security Controls (NSCs). Restrict traffic to authorized business needs (default deny). Review rulesets every 6 months. Direct Internet-to-CDE connections strictly forbidden (DMZ required).
- **Req 2:** Apply Secure Configurations. Change vendor defaults prior to deployment. Maintain documented hardening standards (CIS/NIST). One primary function per system/VM. Encrypt non-console admin access (SSH/HTTPS; Telnet/HTTP forbidden).

### Goal 2: Protect Account Data
- **Req 3:** Protect Stored Account Data. SAD cannot be stored post-auth. Render PAN unreadable (crypto, keyed hash, truncation, tokens). Mask displays (max first 6/8 and last 4). Key management dual control & split knowledge.
- **Req 4:** Protect Cardholder Data with Strong Cryptography in Transit. Use TLS 1.2/1.3 over open, public networks. Insecure ciphers (RC4, 3DES, SSL) forbidden. Never send cleartext PAN via email/SMS/chat.

### Goal 3: Maintain a Vulnerability Management Program
- **Req 5:** Protect from Malicious Software. Anti-malware on all susceptible systems. TRA required for non-susceptible systems. Automated updates and behavioral detection. Automated anti-phishing technical mechanisms (DMARC/SPF/DKIM).
- **Req 6:** Develop and Maintain Secure Systems and Software. Patch Critical/High flaws within 30 calendar days. Protect public web apps with WAF. Inventory and verify browser scripts on payment pages (Req 6.4.3). Independent code reviews; separate dev/test/production environments (no live PAN in test!).

### Goal 4: Implement Strong Access Control Measures
- **Req 7:** Restrict Access by Business Need-to-Know. Role-Based Access Control (RBAC). Review user privileges every 6 months (Req 7.2.4).
- **Req 8:** Identify Users and Authenticate Access. Unique user IDs (shared accounts banned). Minimum 12-character passwords (v4.0). Lockout after <= 10 failed attempts for >= 30 minutes. Inactive accounts disabled within 90 days. 15-minute idle screen lock. MFA mandatory for ALL access into the CDE (Req 8.4.2).
- **Req 9:** Restrict Physical Access. Badges and escorts for visitors. Retain visitor logs and CCTV footage for 90 days. Periodic physical inspections of POI devices for skimming (Req 9.5). Secure destruction of media (cross-cut shred paper, degauss/shred electronic media).

### Goal 5: Regularly Monitor and Test Networks
- **Req 10:** Log and Monitor All Access. Audit log contents: User, Event, Time, Status, Origin, Affected asset. Daily log review of critical security systems via automated SIEM. NTP time synchronization. Retain logs for 1 year total (3 months immediately accessible).
- **Req 11:** Test Security of Systems and Networks Regularly. Quarterly rogue wireless scans. Quarterly internal vulnerability scans (authenticated). Quarterly external ASV scans (zero CVSS >= 4.0). Annual internal/external penetration testing. Weekly FIM checks. Weekly payment page tamper checks (Req 11.6.1).

### Goal 6: Maintain an Information Security Policy
- **Req 12:** Support Information Security with Organizational Policies. Review security policy annually. Annual risk assessment. Annual scope confirmation (semi-annually for service providers). Annual security awareness training with phishing drills. TPSP written agreements and annual compliance status monitoring (AOCs). Annual Incident Response Plan test.

---

## 🧭 7. SAQ Selection Flowchart & Criteria

| SAQ | Processing Channel & Criteria | Architecture |
| :--- | :--- | :--- |
| **SAQ A** | Card-not-present merchant; 100% outsourced to compliant third party; no card storage. | Hosted iFrame or URL Redirect |
| **SAQ A-EP** | E-commerce merchant whose website impacts transaction security (serves payment scripts). | Direct Post, JavaScript API, Custom Checkout |
| **SAQ B** | Brick-and-mortar merchant using standalone dial-up terminals on POTS phone lines; no card storage. | Standalone Dial-up Terminal |
| **SAQ B-IP** | Merchant using standalone PTS-approved POI terminals connected via IP network; no card storage. | Standalone IP Terminals |
| **SAQ C-VT** | Merchant entering transactions manually one-by-one into web virtual terminal on isolated PC; no storage. | Web Browser Virtual Terminal |
| **SAQ C** | Merchant with payment application systems (POS on PC) connected to Internet; no card storage. | Networked POS Software |
| **SAQ P2PE** | Merchant using validated PCI SSC-listed hardware P2PE solution; no card storage. | Validated Hardware P2PE (~33 Reqs) |
| **SAQ D Merchant** | All other merchants, including ANY merchant storing card data electronically. | Full Merchant DSS |
| **SAQ D Service Provider** | ALL eligible Service Providers. Service providers CAN NEVER USE SAQ A, B, or C! | Sole SAQ for Service Providers |

---

## 📚 8. Appendices Deep-Dive (A1, A2, A3, C, D)

- **Appendix A1 (Multi-Tenant Providers):** Cloud/hosting providers must ensure logical tenant separation, hypervisor security, log isolation, and customer pentest rights.
- **Appendix A2 (Shared Hosting):** Shared web hosting providers must protect cardholder data and maintain isolated audit logging for each merchant.
- **Appendix A3 (DESV):** Designated Entities Supplemental Validation. Mandated by card brands or acquirers for entities with high breach history or systemic non-compliance. Requires formal continuous BAU compliance programs and an executive compliance officer.
- **Appendix C (Compensating Controls):** Used when a technical or business constraint prevents meeting the Defined Requirement. **Financial cost or lack of budget is NEVER an acceptable constraint!** Must satisfy 4 tests: 1) intent/rigor, 2) offset risk, 3) above and beyond other requirements, 4) commensurate with risk. Documented on Compensating Controls Worksheet (CCW).
- **Appendix D (Customized Approach):** Flexible option in v4.0 for mature entities to meet the Requirement's Stated Objective using custom controls. Requires NO constraint! Mandates a documented Targeted Risk Analysis (TRA) for every custom requirement, and the Assessor designs custom audit test procedures.

---

## 🛡️ 9. Specialized PCI Standards Quick Reference

- **PCI P2PE (Point-to-Point Encryption):** Hardware encryption in certified PTS terminal directly to provider decryption environment. Decryption keys never exist at merchant site.
- **PCI PTS POI (PIN Transaction Security):** Physical and logical tamper-resistance and anti-skimming controls for hardware terminals and PIN pads.
- **PCI SSF (Software Security Framework):** Replaced PA-DSS. Comprises 1) Secure Software Standard (payment software technical security) and 2) Secure Software Lifecycle (Secure SLC) Standard (vendor software development processes).
- **PCI 3DS Core:** Card-not-present identity authentication protocol between cardholder and issuer before purchase authorization.
- **PCI PIN:** Governs secure processing and key management of PINs at ATMs and POS.
- **PCI MPoC (Mobile Payments on COTS):** Standard for accepting contactless payments (Tap to Pay) and PIN entry directly on commercial off-the-shelf consumer devices (smartphones/tablets).

---

## ⚠️ 10. Top 25 Cardinal Exam Traps & Rules

1. **SAD Post-Auth:** NEVER allowed post-auth under ANY circumstances, even if customer signs consent or data is encrypted! Only Issuers have an exception.
2. **Council Enforcement:** The PCI SSC has ZERO enforcement power and assesses NO fines. Only Card Brands and Acquirers enforce compliance.
3. **Critical Patching:** Must be deployed within 30 calendar days (1 month). Not 24 hours, not 90 days.
4. **User Access Reviews:** User accounts and privileges must be reviewed at least once every 6 months (semi-annually).
5. **Password Length:** Baseline in v4.0 is 12 characters (alphanumeric), or 8 if system technical constraints are documented.
6. **Universal CDE MFA:** Required for ALL users entering the CDE (Req 8.4.2), not just remote users or administrators.
7. **Account Lockout:** Max 10 failed login attempts; lockout duration minimum 30 minutes.
8. **Inactive Accounts:** Disabled or deleted within 90 days of inactivity.
9. **Physical Logs & CCTV:** Visitor access logs and video surveillance footage must be retained for at least 90 calendar days.
10. **Audit Log Retention:** Retain logs for 1 year total, with the most recent 3 months immediately accessible online.
11. **Daily Log Review:** Required daily for critical security systems (NSCs, IDS, auth servers) and servers storing/processing CHD.
12. **File Integrity Monitoring:** FIM must check critical files at least weekly (every 7 days).
13. **Rogue Wireless Scans:** Quarterly testing is mandatory even if company policy prohibits wireless networks!
14. **External ASV Scans:** Must be performed quarterly by an ASV. Zero vulnerabilities with CVSS >= 4.0 permitted to pass.
15. **Pentest Frequency:** At least annually (12 months) and after any significant change.
16. **Service Provider Segmentation:** Service providers must test segmentation controls every 6 months (merchants test annually).
17. **Service Provider Scope:** Service providers must confirm scope every 6 months (merchants confirm annually).
18. **Service Provider SAQ:** Service providers can NEVER use SAQ A, B, or C. They must use SAQ D for Service Providers.
19. **Card Data Storage:** ANY electronic card storage immediately disqualifies a merchant from SAQs A, B, B-IP, C-VT, C, P2PE and mandates SAQ D.
20. **Virtual Terminal (SAQ C-VT):** Manual entry of single card transactions into a browser web portal provided by processor = SAQ C-VT.
21. **Compensating Controls & Cost:** Budget shortfalls or financial cost are NEVER acceptable justifications for compensating controls!
22. **Customized Approach & TRA:** Does not require a constraint, but requires a documented Targeted Risk Analysis (TRA) for every custom control.
23. **Payment Page Scripts (Req 6.4.3):** Inventory, business justification, and integrity check for ALL scripts executing in browser on payment pages.
24. **Live PAN in Dev/Test:** Strictly forbidden under Requirement 6.5.3 under all circumstances!
25. **Transaction Approval:** ONLY the Card Issuer approves or declines transactions during authorization.
