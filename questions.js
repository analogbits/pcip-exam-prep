var PCIP_QUESTIONS = [
  {
    "id": 1,
    "question": "What is the primary goal of the Payment Card Industry Data Security Standard (PCI DSS)?",
    "options": [
      "Establish uniform baseline technical and operational requirements to protect account data across payment environments.",
      "Mandate financial transaction processing standards to eliminate processing fees charged by merchant acquiring banks.",
      "Define global accounting and statutory financial reporting requirements for merchants accepting electronic card payments.",
      "Provide statutory legal frameworks for law enforcement agencies investigating global electronic commerce payment fraud."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "PCI DSS Foundations & Roles",
    "explanation": "The primary goal of PCI DSS is to protect payment account data (cardholder data and sensitive authentication data) by establishing baseline technical and operational security requirements across all systems that store, process, or transmit account data, or could impact CDE security.",
    "tip": "PCI DSS focuses on technical and operational controls to protect account data; it does not set transaction fees, legal statutes, or accounting rules.",
    "v4_ref": "PCI DSS v4.0.1 Overview"
  },
  {
    "id": 2,
    "question": "Which of the following entities is required to comply with the PCI DSS?",
    "options": [
      "Only Level 1 e-commerce merchants processing more than six million payment card transactions annually.",
      "Any entity that stores, processes, or transmits account data or can impact the security of the CDE.",
      "Exclusively financial institutions and merchant acquiring banks operating interbank clearing houses.",
      "Only third-party service providers that manage multi-tenant infrastructure hosting payment databases."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "PCI DSS Foundations & Roles",
    "explanation": "PCI DSS applies globally to all entities that store, process, or transmit account data (CHD and/or SAD) and/or systems that can impact the security of the Cardholder Data Environment (CDE), regardless of entity size or transaction volume.",
    "tip": "Transaction volume determines the reporting validation level (e.g., SAQ vs. QSA ROC), but compliance with the standard is mandatory for all entities touching card data.",
    "v4_ref": "PCI DSS v4.0.1 Applicability"
  },
  {
    "id": 3,
    "question": "Which of the following represents one of the six core control goals defined within PCI DSS v4.0.1?",
    "options": [
      "Implement enterprise business continuity and automated disaster recovery failover sites.",
      "Enforce mandatory sovereign data localization policies for electronic remittances.",
      "Maintain a vulnerability management program to protect systems against malicious attacks.",
      "Mandate zero-trust application firewalls for every external public browsing connection."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "PCI DSS Foundations & Roles",
    "explanation": "The six core control goals of PCI DSS are: 1. Build and Maintain a Secure Network and Systems; 2. Protect Account Data; 3. Maintain a Vulnerability Management Program; 4. Implement Strong Access Control Measures; 5. Regularly Monitor and Test Networks; 6. Maintain an Information Security Policy.",
    "tip": "Memorize the 6 control goals and their mapping to Requirements 1 through 12.",
    "v4_ref": "PCI DSS v4.0.1 High-Level Goals"
  },
  {
    "id": 4,
    "question": "Who enforces PCI DSS compliance, establishes merchant reporting levels, and determines non-compliance penalties?",
    "options": [
      "The PCI Security Standards Council (PCI SSC) through its global compliance registry.",
      "The Federal Trade Commission and federal banking regulatory bodies via public audits.",
      "The individual payment card brands and acquiring banks through merchant agreements.",
      "Qualified Security Assessor (QSA) companies during formal annual validation reviews."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "PCI DSS Foundations & Roles",
    "explanation": "The PCI SSC manages and authors the security standards, but does NOT enforce compliance or assess fines. Compliance enforcement, merchant levels, validation deadlines, and non-compliance penalties are established and enforced by the payment card brands (Visa, Mastercard, Amex, Discover, JCB) and merchant acquiring banks.",
    "tip": "Remember: PCI SSC writes the standard; card brands and acquirers enforce it; QSAs evaluate it.",
    "v4_ref": "PCI DSS v4.0.1 Overview & Roles"
  },
  {
    "id": 5,
    "question": "Which entity is responsible for approving or declining a payment transaction during authorization?",
    "options": [
      "The acquiring bank that provides the merchant processing contract and payment gateway terminal.",
      "The payment brand network switch that routes the authorization request between member banks.",
      "The merchant point-of-sale software that performs initial account validation during checkout.",
      "The issuing bank that provides the payment card and verifies funds availability for the user."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "PCI DSS Foundations & Roles",
    "explanation": "The issuing bank (issuer) is the financial institution that issued the card to the cardholder. During transaction authorization, the issuer evaluates account status, card validity, available credit/funds, and fraud risk before returning an approval or decline response.",
    "tip": "The acquirer is the merchant's bank; the issuer is the cardholder's bank and the sole entity that approves/declines transactions.",
    "v4_ref": "Payment Processing Fundamentals"
  },
  {
    "id": 6,
    "question": "Which of the following lists the correct chronological order for the three primary phases of a payment transaction?",
    "options": [
      "Authorization, Clearing, Settlement",
      "Clearing, Authorization, Settlement",
      "Authorization, Settlement, Clearing",
      "Clearing, Settlement, Authorization"
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "PCI DSS Foundations & Roles",
    "explanation": "A payment card transaction flows in three chronological phases: 1. Authorization (merchant requests and receives issuer approval at purchase); 2. Clearing (transaction details are exchanged between acquirer and issuer via network); 3. Settlement (actual funds transfer between banks).",
    "tip": "Mnemonic: ACS - Authorization (immediate approval), Clearing (reconciliation exchange), Settlement (funds transferred).",
    "v4_ref": "Payment Lifecycle Guidance"
  },
  {
    "id": 7,
    "question": "How are Visa and Mastercard classified in terms of payment network architecture compared to traditional American Express models?",
    "options": [
      "Visa and Mastercard operate open-loop networks with separate issuers and acquirers, whereas traditional American Express operates a closed-loop network.",
      "Visa and Mastercard operate closed-loop networks where the brand acts as the sole issuer, whereas American Express operates a decentralized open-loop model.",
      "Visa and Mastercard require three-party transaction models without independent acquiring banks, whereas American Express relies solely on four-party systems.",
      "Visa and Mastercard operate hybrid clearing networks exempt from interchange fees, whereas American Express utilizes direct peer-to-peer settlement networks."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "PCI DSS Foundations & Roles",
    "explanation": "Visa and Mastercard operate open-loop (four-party) networks where cards are issued by independent member financial institutions and merchant accounts are held by separate acquirers. Traditional American Express and Discover models operate closed-loop (three-party) networks where the network brand acts directly as both issuer and acquirer.",
    "tip": "Open-loop = 4 parties (Cardholder, Issuer, Acquirer, Merchant). Closed-loop = 3 parties (Cardholder, Network/Issuer/Acquirer, Merchant).",
    "v4_ref": "Card Architecture Basics"
  },
  {
    "id": 8,
    "question": "What three disciplinary actions may the PCI Security Standards Council impose against an assessor for Code of Professional Responsibility violations?",
    "options": [
      "Formal Censure, Mandatory Re-certification, and Civil Litigation",
      "Written Warning, Temporary Suspension, and Credential Revocation",
      "Professional Probation, Monetary Penalty, and Terminal Barring",
      "Compliance Audit, Administrative Reprimand, and License Forfeiture"
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "PCI DSS Foundations & Roles",
    "explanation": "The PCI SSC Code of Professional Responsibility outlines three formal disciplinary actions that may be imposed against certified professionals (such as QSAs, ISAs, and PCIPs): 1. Warning, 2. Suspension, and 3. Revocation of credentials.",
    "tip": "The three formal actions are Warning, Suspension, and Revocation. PCI SSC cannot impose criminal penalties or civil lawsuits directly.",
    "v4_ref": "PCI SSC Code of Professional Responsibility"
  },
  {
    "id": 9,
    "question": "What defined major revision lifecycle does the PCI Security Standards Council follow for updating the PCI DSS standard?",
    "options": [
      "An ongoing continuous revision cycle releasing major updates every 12 calendar months.",
      "A bi-annual standard lifecycle updating technical requirements every 24 calendar months.",
      "A structured triennial lifecycle revising the baseline standard every 36 calendar months.",
      "A five-year major release lifecycle aligned directly with international standard reviews."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "PCI DSS Foundations & Roles",
    "explanation": "The PCI SSC operates on a structured three-year (36-month) lifecycle for major standard updates, including periods for request for comments (RFC), draft review, publication, and transition periods before prior versions retire.",
    "tip": "PCI DSS follows a 3-year standard revision lifecycle, although minor point releases (e.g., v4.0.1) can be published between major versions.",
    "v4_ref": "PCI SSC Standard Lifecycle"
  },
  {
    "id": 10,
    "question": "How many principal numbered requirements comprise the technical and operational control baseline of PCI DSS v4.0.1?",
    "options": [
      "6 principal numbered requirements",
      "8 principal numbered requirements",
      "10 principal numbered requirements",
      "12 principal numbered requirements"
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "PCI DSS Foundations & Roles",
    "explanation": "PCI DSS v4.0.1 is organized into 12 principal numbered requirements grouped under 6 major control goals, covering network security, configuration hardening, account data protection, vulnerability management, access control, logging/monitoring, testing, and information security policy.",
    "tip": "6 Goals, 12 Requirements. The 12 requirements have remained consistent in high-level structure across versions 1.0 through 4.0.1.",
    "v4_ref": "PCI DSS v4.0.1 Overview"
  },
  {
    "id": 11,
    "question": "In the context of a PCI DSS assessment, what constitutes the scope of the compliance evaluation?",
    "options": [
      "All people, processes, and technologies that handle account data, plus connected-to or security-impacting systems.",
      "All enterprise corporate computing assets regardless of business function, network location, or card data access.",
      "Exclusively database servers and storage area networks physically retaining primary account numbers in cleartext.",
      "All third-party multi-tenant cloud platforms hosting consumer web portals subject to Level 1 service attestations."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "PCI DSS Scoping & Network Segmentation",
    "explanation": "PCI DSS scope encompasses all people, processes, and technologies that store, process, or transmit account data (CDE system components), as well as systems that are connected to the CDE or could impact the security of the CDE.",
    "tip": "Scope includes 3 categories: 1. CDE (stores/processes/transmits account data); 2. Connected-to systems; 3. Security-impacting systems.",
    "v4_ref": "PCI DSS v4.0.1 Scoping Guidance"
  },
  {
    "id": 12,
    "question": "What critical activity must an entity perform as the foundational first step of any PCI DSS compliance assessment?",
    "options": [
      "Execute automated external vulnerability scans using an Approved Scanning Vendor to detect network vulnerabilities.",
      "Accurately determine and document the assessment scope by identifying all payment data flows and connected systems.",
      "Perform multi-factor authentication penetration testing across all perimeter network security controls and firewalls.",
      "Distribute formal security policy acknowledgment forms to all personnel with logical access to corporate networks."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "PCI DSS Scoping & Network Segmentation",
    "explanation": "Requirement 12.5.2 and PCI scoping guidance mandate that the very first step in any PCI DSS assessment is to accurately determine and document the scope of the review by identifying all payment card data flows, storage locations, and system components.",
    "tip": "Scoping always comes first. You cannot assess controls without knowing what systems and data flows are in scope.",
    "v4_ref": "PCI DSS v4.0.1 Req 12.5.2 & Scoping"
  },
  {
    "id": 13,
    "question": "Which of the following statements accurately characterizes network segmentation within the PCI DSS framework?",
    "options": [
      "It is a mandatory requirement for all entities regardless of network complexity, architecture, or environment size.",
      "It completely exempts the separated out-of-scope systems from all corporate information security governance policies.",
      "It is not strictly mandatory, but is strongly recommended to isolate the CDE and reduce compliance scope and overhead.",
      "It eliminates the requirement to validate Point of Interaction devices under applicable Payment Card Industry standards."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "PCI DSS Scoping & Network Segmentation",
    "explanation": "Network segmentation is not a mandatory requirement of PCI DSS; an entity may choose to have its entire corporate network in scope as a single flat network. However, segmentation is strongly recommended because it isolates the CDE, substantially reducing assessment scope, cost, and risk.",
    "tip": "Segmentation is optional/recommended, not mandatory. Without segmentation, an organization's entire network is in scope.",
    "v4_ref": "PCI DSS v4.0.1 Scoping and Segmentation"
  },
  {
    "id": 14,
    "question": "Under PCI DSS Requirement 11.4.6, how frequently must service providers perform penetration testing to confirm network segmentation controls?",
    "options": [
      "At least once every 12 months and after any planned hardware maintenance in the corporate network.",
      "At least quarterly alongside external Approved Scanning Vendor vulnerability scans across the perimeter.",
      "Exclusively following an uncontained data breach or upon explicit written direction from card brands.",
      "At least once every six months and after any changes to segmentation controls or security boundaries."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "PCI DSS Scoping & Network Segmentation",
    "explanation": "Under Requirement 11.4.6, service providers must perform penetration testing on segmentation controls at least once every six months and after any changes to segmentation controls/methods, whereas merchants perform this testing at least once every 12 months (Req 11.4.5).",
    "tip": "Service providers = semi-annually (every 6 months) for segmentation pen testing. Merchants = annually (every 12 months).",
    "v4_ref": "PCI DSS v4.0.1 Req 11.4.6"
  },
  {
    "id": 15,
    "question": "Which of the following implementations is recognized under PCI DSS guidance as an effective strategy to reduce CDE scope?",
    "options": [
      "Implementing a PCI-validated Point-to-Point Encryption (P2PE) solution to reduce merchant system touchpoints.",
      "Transferring all unencrypted cardholder databases to external cloud backup storage drives on a daily schedule.",
      "Disabling firewall stateful inspection logs for internal subnets to decrease logged network traffic volume.",
      "Transitioning from multi-factor authentication to static twenty-character administrative passwords in the CDE."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "PCI DSS Scoping & Network Segmentation",
    "explanation": "Deploying a PCI SSC-listed, validated Point-to-Point Encryption (P2PE) solution significantly reduces merchant CDE scope because the card data is encrypted directly at the secure hardware interaction device and cannot be decrypted within the merchant environment.",
    "tip": "Scope reduction strategies include: eliminating storage, tokenization, P2PE solutions, and robust network segmentation.",
    "v4_ref": "PCI DSS v4.0.1 Scope Reduction Guidance"
  },
  {
    "id": 16,
    "question": "What core security condition applies to cardholder data handled through a PCI-validated Point-to-Point Encryption (P2PE) solution?",
    "options": [
      "The point-of-interaction terminal decrypts cardholder data into cleartext before transmitting packets across local area networks.",
      "Encrypted data remains unreadable to the merchant environment because decryption keys are held solely by the P2PE solution provider.",
      "Decryption keys are stored locally within the merchant operating system registry to enable offline batch settlement transaction audits.",
      "Encrypted ciphertext is routed through public web proxies where intermediate firewalls inspect and decrypt payloads for malware analysis."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "PCI DSS Scoping & Network Segmentation",
    "explanation": "In a PCI-validated P2PE solution, cardholder data is encrypted inside a secure cryptographic device (POI) and remains encrypted throughout the merchant environment. Decryption occurs only at the validated solution provider's decryption environment, and the merchant has no access to the cryptographic keys.",
    "tip": "The merchant never possesses the cryptographic keys to decrypt P2PE ciphertext, ensuring the merchant environment cannot access cleartext CHD.",
    "v4_ref": "PCI P2PE Standard Guidance"
  },
  {
    "id": 17,
    "question": "How do PCI DSS requirements apply when virtualization or multi-tenant cloud technologies are implemented within the cardholder data environment?",
    "options": [
      "Virtualized hypervisors are strictly out of scope provided that all hosted guest virtual machines run validated operating systems.",
      "Hardware-level abstraction removes virtual network switches and hypervisors from scope, leaving only logical storage in scope.",
      "All virtualization components, including hypervisors, management consoles, virtual switches, and guest instances, are fully in scope.",
      "Virtualization is strictly prohibited under PCI DSS Requirement 2 unless physical air-gapped host machines are provisioned."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "PCI DSS Scoping & Network Segmentation",
    "explanation": "When virtualization is used in the CDE, all virtualization components—including hypervisors, virtual machines, virtual switches, virtual management tools, and shared storage—are considered system components and are fully in scope for PCI DSS.",
    "tip": "Virtualization does not eliminate scope. If a VM is in the CDE, the host hypervisor and virtual management infrastructure are also in scope.",
    "v4_ref": "PCI DSS v4.0.1 Scoping / Virtualization"
  },
  {
    "id": 18,
    "question": "According to PCI DSS v4.0.1, which of the following data elements is classified as Cardholder Data (CHD) rather than Sensitive Authentication Data?",
    "options": [
      "Card verification code (CAV2/CVC2/CVV2/CID) located on the front or reverse of the card",
      "Full magnetic stripe track data or equivalent technical payload read from a payment chip",
      "Personal Identification Number (PIN) or the cryptographically secured PIN data block",
      "Primary Account Number (PAN) representing the unique payment card identification string"
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Cardholder Data (CHD) vs Sensitive Authentication Data (SAD)",
    "explanation": "Cardholder Data (CHD) consists of Primary Account Number (PAN), Cardholder Name, Expiration Date, and Service Code. Sensitive Authentication Data (SAD) includes full track data, card verification codes (CVV2/CVC2/CID), and PIN/PIN blocks.",
    "tip": "PAN is the defining element of CHD. If PAN is stored with Cardholder Name, Expiration Date, or Service Code, those elements must also be protected as CHD.",
    "v4_ref": "PCI DSS v4.0.1 Account Data Table"
  },
  {
    "id": 19,
    "question": "Under PCI DSS Requirement 3.2, which of the following data elements is classified as Sensitive Authentication Data that must NOT be stored post-authorization?",
    "options": [
      "Full magnetic stripe data including track 1, track 2, or chip equivalents",
      "Primary Account Number rendered unreadable using keyed cryptographic hashes",
      "Expiration date consisting of the month and year embossed on card plastics",
      "Cardholder name printed across the front surface of the payment instrument"
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Cardholder Data (CHD) vs Sensitive Authentication Data (SAD)",
    "explanation": "Requirement 3.2 strictly forbids storing Sensitive Authentication Data (SAD) after transaction authorization, which includes full magnetic stripe (track 1 and 2) or chip equivalent data, card verification codes (CAV2/CVC2/CVV2/CID), and PIN/PIN blocks.",
    "tip": "SAD can NEVER be stored post-authorization by merchants or acquirers, even if encrypted.",
    "v4_ref": "PCI DSS v4.0.1 Req 3.2"
  },
  {
    "id": 20,
    "question": "Under PCI DSS Requirement 3.3, what is the sole permissible exception for storing Sensitive Authentication Data (SAD) after transaction authorization?",
    "options": [
      "When an e-commerce merchant retains CVV2 data within an AES-256 encrypted database to facilitate customer recurring subscription billing cycles.",
      "When issuers and issuing service providers demonstrate a documented business need and maintain the data in an explicitly secured environment.",
      "When an acquiring payment gateway stores full track data inside a FIPS 140-3 Level 4 Hardware Security Module for dispute chargeback defense.",
      "When a retail merchant retains cardholder PIN blocks within dedicated offsite cold storage vaults for annual qualified assessor audit reviews."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Cardholder Data (CHD) vs Sensitive Authentication Data (SAD)",
    "explanation": "Requirement 3.3 states that SAD must not be retained after authorization. The only permitted exception is for issuers and entities providing issuing services that have a documented business need to store SAD, and that SAD must be securely stored.",
    "tip": "Only ISSUERS and entities providing issuing services can store SAD post-authorization if justified. Merchants can never store SAD post-auth.",
    "v4_ref": "PCI DSS v4.0.1 Req 3.3.1 & 3.3.2"
  },
  {
    "id": 21,
    "question": "What is the fundamental distinction between truncation and masking as defined in PCI DSS Requirement 3?",
    "options": [
      "Truncation applies to temporary screen displays, while masking permanently purges card data from storage media.",
      "Truncation requires an irreversible cryptographic key, whereas masking replaces characters using surrogate token values.",
      "Truncation permanently renders stored PAN unreadable, whereas masking conceals PAN digits on screens or paper displays.",
      "Truncation applies only to sensitive authentication data, whereas masking applies exclusively to magnetic stripe data."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Cardholder Data (CHD) vs Sensitive Authentication Data (SAD)",
    "explanation": "Truncation permanently removes a segment of PAN data so that only a portion (typically BIN and last 4) is permanently stored on media (Req 3.5.1). Masking conceals PAN digits when displayed on computer screens, paper receipts, or terminals (Req 3.4.1), without altering underlying stored data.",
    "tip": "Truncation = permanent modification of stored data. Masking = temporary visual concealment on display/printout.",
    "v4_ref": "PCI DSS v4.0.1 Req 3.4.1 & Req 3.5.1"
  },
  {
    "id": 22,
    "question": "According to PCI DSS Requirement 3.5.1, which of the following is an acceptable method for rendering stored PAN unreadable?",
    "options": [
      "Standard Base64 algorithmic encoding without cryptographic key management",
      "Proprietary XOR bitwise obfuscation using a static recurring system seed",
      "Reversible compression algorithms applied directly to cardholder tables",
      "One-way cryptographic hashing of the entire PAN using keyed hash functions"
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Cardholder Data (CHD) vs Sensitive Authentication Data (SAD)",
    "explanation": "Requirement 3.5.1 permits four methods for rendering PAN unreadable: 1. One-way hashes based on strong cryptography of the entire PAN (with keyed hashing under v4.0); 2. Truncation; 3. Index tokens and securely stored pads; 4. Strong cryptography with associated key-management processes.",
    "tip": "PCI DSS v4.0 requires keyed hashes (HMAC) when hashing is used to render stored PAN unreadable.",
    "v4_ref": "PCI DSS v4.0.1 Req 3.5.1"
  },
  {
    "id": 23,
    "question": "In a payment security architecture, how does PCI DSS define the process of tokenization?",
    "options": [
      "Replacing the PAN with a surrogate token value that has no mathematical relationship or algorithmic derivation to the original PAN.",
      "Encrypting the PAN with a public key and storing the resulting base-encoded ciphertext string inside an internal relational database.",
      "Compressing payment records into proprietary digital archives accessible only by certified qualified security assessor audit tools.",
      "Masking the first six and last four digits of the account number across transaction receipts printed for cardholder physical signatures."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Cardholder Data (CHD) vs Sensitive Authentication Data (SAD)",
    "explanation": "Tokenization is a process by which the primary account number (PAN) is replaced with a surrogate value (token). De-tokenization cannot be performed mathematically or algorithmically because tokens bear no mathematical relation to the original PAN.",
    "tip": "Tokens have NO mathematical correlation to the original PAN; they are mapped exclusively via a secure token vault.",
    "v4_ref": "PCI SSC Tokenization Product Security Guidelines"
  },
  {
    "id": 24,
    "question": "Does outsourcing cardholder data handling to an external tokenization solution eliminate an entity's PCI DSS compliance obligations?",
    "options": [
      "Yes, tokenization completely exempts the merchant from having to perform annual compliance assessments or validate security controls.",
      "No, tokenization reduces scope by removing payment data from systems, but the entity must still validate controls for remaining systems.",
      "Yes, provided that the third-party tokenization service provider signs a binding legal waiver indemnifying the merchant against breaches.",
      "No, tokenization classifies all corporate endpoints as cardholder systems, requiring complete Level 1 on-site QSA audits for all assets."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Cardholder Data (CHD) vs Sensitive Authentication Data (SAD)",
    "explanation": "Tokenization reduces the scope of the CDE by removing PAN from systems and networks that handle only tokens. However, the merchant or entity must still maintain compliance and validate applicable PCI DSS requirements for all remaining systems, processes, and service provider management (Req 12.8).",
    "tip": "Tokenization reduces scope, but NEVER eliminates compliance responsibilities entirely.",
    "v4_ref": "PCI DSS Scoping & Tokenization Guidance"
  },
  {
    "id": 25,
    "question": "Under PCI DSS Requirement 1.2, which documentation must an entity maintain to illustrate all connections between the CDE and other networks?",
    "options": [
      "A high-level organizational structure chart detailing administrative reporting lines for network engineers and system administrators.",
      "A comprehensive inventory of physical network cables, patch panels, and switch rack elevations located within corporate telecom closets.",
      "An accurate network diagram that identifies all connections between the cardholder data environment and other networks, including wireless.",
      "A vendor risk management registry documenting the sovereign physical headquarters locations of all hardware firewall appliance suppliers."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 1 & 2: Network Security & System Hardening",
    "explanation": "Requirement 1.2.3 requires an entity to maintain an up-to-date network diagram that identifies all connections between the CDE and other networks, including any wireless networks. Requirement 1.2.4 requires maintaining data flow diagrams showing all account data flows.",
    "tip": "Entities must maintain both network diagrams (connections/boundaries) and data flow diagrams (account data movement).",
    "v4_ref": "PCI DSS v4.0.1 Req 1.2.3 & 1.2.4"
  },
  {
    "id": 26,
    "question": "Under PCI DSS Requirement 1.2.7, how frequently must network security control (firewall) configurations and rule sets be reviewed?",
    "options": [
      "At least once every 30 calendar days",
      "At least once every 90 calendar days",
      "At least once every 12 calendar months",
      "At least once every six calendar months"
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 1 & 2: Network Security & System Hardening",
    "explanation": "PCI DSS Requirement 1.2.7 requires that configurations and rule sets for network security controls (firewalls, routers, cloud security groups) be reviewed at least once every six months to verify they remain necessary and secure.",
    "tip": "Firewall and router rule sets must be reviewed at least once every 6 months (semi-annually).",
    "v4_ref": "PCI DSS v4.0.1 Req 1.2.7"
  },
  {
    "id": 27,
    "question": "What is the mandate of PCI DSS Requirement 2 regarding vendor-supplied defaults such as passwords and administrator accounts?",
    "options": [
      "All vendor-supplied defaults must be changed before deploying a system component on the network.",
      "Vendor defaults may be retained if the system component resides behind a stateful network firewall.",
      "Default passwords must be replaced within ninety calendar days of putting the device into service.",
      "Vendor settings are acceptable provided that remote access is restricted to corporate VPN tunnels."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 1 & 2: Network Security & System Hardening",
    "explanation": "Requirement 2.2.2 mandates that vendor-supplied defaults (passwords, SNMP community strings, default accounts, encryption keys) must always be changed before installing a system on the network.",
    "tip": "Always change vendor defaults BEFORE connecting any system to the network.",
    "v4_ref": "PCI DSS v4.0.1 Req 2.2.2"
  },
  {
    "id": 28,
    "question": "Under PCI DSS Requirement 2.2.7, which of the following protocols is considered secure for non-console administrative access to CDE systems?",
    "options": [
      "Telnet over transmission control protocol port 23",
      "Secure Shell (SSH) version 2 with strong ciphers",
      "Remote Login (rlogin) utilizing trusted host files",
      "Trivial File Transfer Protocol over user datagrams"
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 1 & 2: Network Security & System Hardening",
    "explanation": "Requirement 2.2.7 requires encrypted administrative communications using strong cryptography (such as SSHv2 or TLS). Insecure and cleartext protocols such as Telnet, rlogin, unencrypted FTP, and TFTP are strictly prohibited for administrative access.",
    "tip": "Administrative access must always use encrypted protocols (SSH, TLS/HTTPS, IPsec). Telnet, rlogin, and FTP are insecure.",
    "v4_ref": "PCI DSS v4.0.1 Req 2.2.7"
  },
  {
    "id": 29,
    "question": "Under PCI DSS Requirement 5.3, which operational capability is required for deployed anti-malware solutions?",
    "options": [
      "Executing manual offline scanning routines whenever an administrative staff member reports suspicious device behavior.",
      "Permitting end users to disable real-time file scanning when executing resource-intensive local database queries.",
      "Maintaining current malware definitions and conducting continuous behavioral analysis or scheduled periodic scans.",
      "Quarantining suspicious binaries exclusively on external offline optical storage media awaiting quarterly reviews."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 5 & 6: Malware & Secure Systems",
    "explanation": "Requirement 5.3 mandates that anti-malware mechanisms are kept up to date via automated definition updates, actively running, and configured to perform either continuous behavioral monitoring or regular scheduled periodic scans.",
    "tip": "Anti-malware must be actively running, updated, and perform automatic scans or real-time behavioral analysis.",
    "v4_ref": "PCI DSS v4.0.1 Req 5.3.1 - 5.3.3"
  },
  {
    "id": 30,
    "question": "Under PCI DSS Requirement 6.3.3, what is the maximum permissible timeframe to install critical security patches on in-scope systems?",
    "options": [
      "Within 14 calendar days of vendor release",
      "Within 60 calendar days of vendor release",
      "Within 90 calendar days of vendor release",
      "Within 30 calendar days of vendor release"
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 5 & 6: Malware & Secure Systems",
    "explanation": "Requirement 6.3.3 requires that critical security patches (and security patches identified as high risk per Req 6.3.1) must be installed on all system components within one month (30 calendar days) of release.",
    "tip": "Critical security patches must be installed within 30 days of release. Less critical patches can follow entity policy or TRA.",
    "v4_ref": "PCI DSS v4.0.1 Req 6.3.3"
  },
  {
    "id": 31,
    "question": "What does PCI DSS v4.0 Requirement 6.4.3 require for all scripts loaded and executed in the consumer's browser on payment pages?",
    "options": [
      "All scripts must be inventoried, justified with documented business need, and verified for integrity to prevent script tampering.",
      "All client-side JavaScript must be completely disabled and replaced with static server-side HTML form-action processing scripts.",
      "Third-party script execution must be restricted to authenticated administrative sessions utilizing smart card hardware tokens.",
      "Script integrity must be validated exclusively by submitting source code to an Approved Scanning Vendor during quarterly audits."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 5 & 6: Malware & Secure Systems",
    "explanation": "PCI DSS v4.0 introduced Requirement 6.4.3 to combat digital skimming (Magecart attacks). It requires managing all scripts executed in the consumer's browser on payment pages: maintaining an inventory, confirming documented business justification, and implementing a method to verify script integrity.",
    "tip": "Requirement 6.4.3 addresses client-side script integrity on payment pages (CSP, SRI, tag management).",
    "v4_ref": "PCI DSS v4.0.1 Req 6.4.3"
  },
  {
    "id": 32,
    "question": "Under PCI DSS Requirement 6.2, which practice is mandatory when managing development and testing environments for custom software?",
    "options": [
      "Development and test environments may mirror production environments provided that database administrator credentials match.",
      "Development, testing, and production environments must be separated, and production cardholder data must not be used in test.",
      "Live cardholder data may be copied into staging systems if sanitized through base64 encoding prior to functional unit testing.",
      "Developers must maintain direct unrestricted administrative access to production systems to facilitate real-time patch releases."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 5 & 6: Malware & Secure Systems",
    "explanation": "Requirements 6.2.3 and 6.2.4 mandate that development and test environments must be strictly separated from production environments, with access controlled, and production account data (live PAN/SAD) must NEVER be used in pre-production development or testing.",
    "tip": "Development/testing must be separated from production, and live PAN/SAD is strictly prohibited in test environments.",
    "v4_ref": "PCI DSS v4.0.1 Req 6.2.3 & 6.2.4"
  },
  {
    "id": 33,
    "question": "What fundamental security principle governs the granting of logical access privileges under PCI DSS Requirement 7?",
    "options": [
      "Access is granted across all functional departments by default to ensure operational redundancy and organizational resilience.",
      "Access privileges are allocated based primarily on employee organizational seniority and professional title within the entity.",
      "Access must be restricted strictly according to business need-to-know and the principle of least privilege required for job duties.",
      "Access rights are established based on individual requests approved informally by peer colleagues within technical workgroups."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 7 & 8: Access Control & Authentication",
    "explanation": "Requirement 7 is titled 'Restrict Access to System Components and Cardholder Data by Business Need to Know.' It mandates least privilege and need-to-know access control, ensuring users only have access necessary to perform their assigned job responsibilities.",
    "tip": "Requirement 7 enforces 'need-to-know' and 'least privilege' access control.",
    "v4_ref": "PCI DSS v4.0.1 Req 7.1 & 7.2"
  },
  {
    "id": 34,
    "question": "Under PCI DSS v4.0 Requirement 7.2.4, how frequently must an entity review all user accounts and assigned access privileges?",
    "options": [
      "At least once every 30 calendar days",
      "At least once every 90 calendar days",
      "At least once every 12 calendar months",
      "At least once every six calendar months"
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 7 & 8: Access Control & Authentication",
    "explanation": "Requirement 7.2.4 requires that all user accounts and related access privileges be reviewed at least once every six months to confirm that privileges remain appropriate based on job function.",
    "tip": "User account and access privilege reviews must take place at least semi-annually (every 6 months).",
    "v4_ref": "PCI DSS v4.0.1 Req 7.2.4"
  },
  {
    "id": 35,
    "question": "Under PCI DSS Requirement 8.2.6, what action must an entity take regarding user accounts that have remained inactive?",
    "options": [
      "Inactive user accounts must be removed or disabled within 90 calendar days of inactivity.",
      "Inactive accounts must have their authentication credentials reassigned to new personnel.",
      "Inactive accounts must be migrated to an unmonitored legacy organizational unit domain.",
      "Inactive accounts may remain enabled indefinitely provided their passwords never expire."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 7 & 8: Access Control & Authentication",
    "explanation": "Requirement 8.2.6 requires that inactive user accounts be removed or disabled within 90 days of inactivity to prevent dormant accounts from being compromised or misused.",
    "tip": "Inactive accounts must be removed or disabled after 90 days of inactivity.",
    "v4_ref": "PCI DSS v4.0.1 Req 8.2.6"
  },
  {
    "id": 36,
    "question": "What does PCI DSS v4.0 Requirement 8.4.2 mandate regarding the implementation of multi-factor authentication (MFA)?",
    "options": [
      "MFA is required only for remote third-party vendor connections initiating sessions into the corporate perimeter network.",
      "MFA is required for all individual access into the cardholder data environment, encompassing both console and non-console sessions.",
      "MFA is optional for privileged system administrators who authenticate using complex passphrase credentials exceeding 20 characters.",
      "MFA is required exclusively for point-of-sale retail cashiers processing magnetic stripe transactions at checkout terminals."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 7 & 8: Access Control & Authentication",
    "explanation": "In PCI DSS v4.0, Requirement 8.4.2 expanded MFA to require multi-factor authentication for ALL individual access into the CDE (console and non-console, administrative and non-administrative), replacing the prior v3.2.1 rule that limited MFA to non-console administrative access and remote network access.",
    "tip": "Under v4.0.1, MFA is required for ALL access into the CDE, not just remote access.",
    "v4_ref": "PCI DSS v4.0.1 Req 8.4.2"
  },
  {
    "id": 37,
    "question": "Under PCI DSS v4.0 Requirement 8.3.6, what is the minimum required character length for user passwords when passwords are used for authentication?",
    "options": [
      "A minimum length of seven alphanumeric characters across all systems",
      "A minimum length of eight alphanumeric characters across all systems",
      "A minimum length of 12 characters (or at least 8 if unsupported by system)",
      "A minimum length of 16 characters containing upper, lower, and symbols"
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 7 & 8: Access Control & Authentication",
    "explanation": "Requirement 8.3.6 in PCI DSS v4.0 raised the minimum password length from 7 characters to 12 characters (or at least 8 characters if the system component does not support 12). Passwords must also contain both numeric and alphabetic characters.",
    "tip": "PCI DSS v4.0 minimum password length: 12 characters (or at least 8 if system cannot support 12). Under v3.2.1 it was 7.",
    "v4_ref": "PCI DSS v4.0.1 Req 8.3.6"
  },
  {
    "id": 38,
    "question": "Under PCI DSS Requirement 8.2.5, what procedure must be executed immediately upon the separation or termination of an employee?",
    "options": [
      "Transfer the former employee's user account and private encryption keys to their departmental replacement.",
      "Allow the former employee's credentials to remain active for thirty days to facilitate off-boarding knowledge transfer.",
      "Retain the user account in an active status but downgrade access privileges to standard read-only domain guest rights.",
      "Revoke all logical access privileges and immediately deactivate or terminate the former employee's user accounts."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 7 & 8: Access Control & Authentication",
    "explanation": "Requirement 8.2.5 mandates that upon termination or separation of any employee, contractor, or other personnel, all their access privileges must be immediately revoked and their accounts deactivated or deleted.",
    "tip": "Access revocation upon termination must be IMMEDIATE, not deferred or transferred.",
    "v4_ref": "PCI DSS v4.0.1 Req 8.2.5"
  },
  {
    "id": 39,
    "question": "Under PCI DSS Requirement 9.2, which control is mandatory for managing physical visitor access to sensitive areas within the CDE?",
    "options": [
      "Authorizing visitors with identification badges, maintaining visitor logs retained for at least three months, and escorting visitors.",
      "Granting unescorted facility badges to external contractor personnel who submit valid national government identity documentation.",
      "Maintaining physical visitor log books at entry checkpoints with mandatory record retention requirements of at least five years.",
      "Permitting unaccompanied visitor exploration throughout server rooms provided that visitors surrender personal mobile devices."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 9 & 10: Physical & Logging",
    "explanation": "Requirement 9.2 mandates controls for physical access to sensitive areas, including: identifying visitors (badges that expire), escorting visitors at all times in sensitive areas, and maintaining physical visitor logs with name, firm, and authorizing staff member retained for at least 3 months.",
    "tip": "Visitors in sensitive areas: must be authorized, badged, escorted at all times, and visitor logs retained for at least 3 months.",
    "v4_ref": "PCI DSS v4.0.1 Req 9.2.2 & 9.2.4"
  },
  {
    "id": 40,
    "question": "Under PCI DSS Requirement 9.5.1, what controls must entities deploy to safeguard Point of Interaction (POI) terminals from physical tampering?",
    "options": [
      "Replace all deployed point-of-interaction payment terminals every twelve months regardless of hardware condition or physical security.",
      "Maintain an up-to-date POI inventory, perform periodic physical inspections for tampering or substitution, and train staff to spot anomalies.",
      "Mandate that point-of-interaction devices be permanently hardwired to analog telephone lines without logical local network connections.",
      "Restrict terminal inspections exclusively to annual on-site assessment reviews performed by certified Qualified Security Assessors."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 9 & 10: Physical & Logging",
    "explanation": "Requirement 9.5.1 requires maintaining an up-to-date POI device inventory (make, model, location, serial number), conducting periodic physical inspections of devices to detect tampering or substitution, and training staff to identify suspicious behavior and report anomalies.",
    "tip": "POI security requires inventorying devices, inspecting them periodically for skimmers/tampering, and training cashiers/staff.",
    "v4_ref": "PCI DSS v4.0.1 Req 9.5.1"
  },
  {
    "id": 41,
    "question": "Under PCI DSS Requirement 10.5.1, what are the mandatory retention timeframes for audit log history?",
    "options": [
      "Retain logs for at least six months total, with at least thirty calendar days immediately available for online querying.",
      "Retain logs for at least three years total, with at least twelve months archived in write-once-read-many optical storage.",
      "Retain logs for at least 12 months total, with at least three months immediately available for analysis and querying.",
      "Retain logs for at least five years total, with all historical audit records maintained exclusively in cold tape archives."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 9 & 10: Physical & Logging",
    "explanation": "Requirement 10.5.1 mandates retaining audit log history for at least 12 months (one year), with at least the most recent three months immediately available for analysis (online, searchable).",
    "tip": "Audit log retention: at least 12 months total, with at least the first 3 months immediately available online.",
    "v4_ref": "PCI DSS v4.0.1 Req 10.5.1"
  },
  {
    "id": 42,
    "question": "Under PCI DSS Requirement 10.4.1, how frequently must audit logs of systems performing security functions or handling account data be reviewed?",
    "options": [
      "At least once every calendar month",
      "At least once every calendar week",
      "Exclusively when a breach occurs",
      "At least once every calendar day"
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 9 & 10: Physical & Logging",
    "explanation": "Requirement 10.4.1 requires that audit logs of systems performing security functions (firewalls, IDS/IPS, authentication/radius servers) and system components that store, process, or transmit CHD/SAD be reviewed at least once daily.",
    "tip": "Critical logs (security functions and CDE components) must be reviewed at least daily (automated SIEM alerts qualify).",
    "v4_ref": "PCI DSS v4.0.1 Req 10.4.1"
  },
  {
    "id": 43,
    "question": "Under PCI DSS Requirement 10.2.1, which of the following events is explicitly required to be recorded within automated audit logs?",
    "options": [
      "All individual logical access to cardholder data and all actions taken by individuals with administrative privileges",
      "Routine operating system CPU clock cycle fluctuations and non-privileged file system defragmentation schedules",
      "Standard end-user desktop screen saver activations occurring during normal authorized corporate business hours",
      "Outbound network ping requests generated by internal workstations browsing publicly available vendor web portals"
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 9 & 10: Physical & Logging",
    "explanation": "Requirement 10.2.1 mandates recording audit logs for: all individual access to cardholder data, all actions taken by individuals with administrative/root privileges, access to audit trails, invalid logical access attempts, use of identification/authentication mechanisms, and stopping/starting of audit logs.",
    "tip": "Key logged events: user access to CHD, root/admin actions, failed logins, log access, and audit log daemon start/stop.",
    "v4_ref": "PCI DSS v4.0.1 Req 10.2.1"
  },
  {
    "id": 44,
    "question": "What time synchronization controls are mandated under PCI DSS Requirement 10.6 across all critical system components?",
    "options": [
      "Critical system clocks must be adjusted manually by system administrators at the conclusion of each business day.",
      "System clocks must synchronize using Network Time Protocol (NTP) to designated reference sources with protected timestamps.",
      "Each standalone server must rely independently on its local hardware BIOS quartz oscillator without network synchronization.",
      "Clock synchronization must be executed exclusively during scheduled quarterly vulnerability scans via external ASV servers."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 9 & 10: Physical & Logging",
    "explanation": "Requirement 10.6 requires using Network Time Protocol (NTP) or a similar technology to synchronize all critical system clocks to designated central reference time sources, with time settings protected from unauthorized modification and consistent timestamps across all logs.",
    "tip": "Time synchronization requires NTP referencing designated authoritative time servers to maintain forensic integrity.",
    "v4_ref": "PCI DSS v4.0.1 Req 10.6"
  },
  {
    "id": 45,
    "question": "Under PCI DSS Requirement 11.2.1, how frequently must an entity test for the presence of unauthorized (rogue) wireless access points?",
    "options": [
      "At least once every calendar month",
      "At least once every twelve months",
      "At least once every three months",
      "Only when wireless devices fail"
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 11.2.1 requires testing for the presence of unauthorized (rogue) wireless access points at least once every three months (quarterly) across all locations connected to or impacting the CDE, even if wireless is forbidden in the environment.",
    "tip": "Rogue wireless detection is required at least quarterly (every 3 months), even where wireless networking is prohibited.",
    "v4_ref": "PCI DSS v4.0.1 Req 11.2.1"
  },
  {
    "id": 46,
    "question": "Under PCI DSS Requirement 11.3.2, what are the frequency and assessor requirements for performing external vulnerability scans?",
    "options": [
      "Performed semi-annually by an internal certified security analyst using proprietary open-source port scanning utilities.",
      "Performed annually by the merchant's acquiring banking institution using automated network mapping protocols.",
      "Performed monthly by internal system administrators following the release of critical operating system vendor patches.",
      "Performed at least quarterly and after significant changes by a Qualified Approved Scanning Vendor (ASV) certified by PCI SSC."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 11.3.2 requires external vulnerability scans to be performed at least quarterly (every 90 days) and after any significant change, and they MUST be conducted by a PCI SSC Qualified Approved Scanning Vendor (ASV).",
    "tip": "External scans = quarterly + after significant change, performed by an Approved Scanning Vendor (ASV). Internal scans = quarterly by qualified internal/external staff.",
    "v4_ref": "PCI DSS v4.0.1 Req 11.3.2"
  },
  {
    "id": 47,
    "question": "Under PCI DSS Requirement 11.4, how frequently must internal and external penetration testing be performed for the CDE?",
    "options": [
      "At least once every 12 months and after any significant infrastructure or application change",
      "At least once every 90 calendar days concurrently with quarterly vulnerability scanning cycles",
      "At least once every six months regardless of whether changes occur to network architecture",
      "Exclusively following a confirmed security incident or upon formal request from card brands"
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 11.4 requires both internal and external penetration testing to be conducted at least once every 12 months (annually) and after any significant infrastructure or application modification.",
    "tip": "Penetration testing = at least annually (every 12 months) and after significant changes. (Note: Service provider segmentation pen testing is every 6 months).",
    "v4_ref": "PCI DSS v4.0.1 Req 11.4.1 - 11.4.4"
  },
  {
    "id": 48,
    "question": "What is the key distinction between an automated vulnerability scan and a penetration test under PCI DSS guidance?",
    "options": [
      "Vulnerability scans involve manual exploitation of network weaknesses, whereas penetration tests rely strictly on automated port scans.",
      "Vulnerability scans identify potential known flaws using automation, whereas penetration tests involve active exploitation of weaknesses.",
      "Vulnerability scans are conducted exclusively by external assessors, whereas penetration tests can only be run by internal IT staff.",
      "Vulnerability scans are performed once every three years, whereas penetration tests must be executed continuously on a weekly schedule."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "A vulnerability scan is an automated process designed to identify known vulnerabilities (such as unpatched software versions or open misconfigured ports) without exploiting them. A penetration test is an active security exercise where skilled ethical testers actively attempt to exploit vulnerabilities and simulate real-world attacks.",
    "tip": "Vulnerability scanning = automated identification of known weaknesses. Penetration testing = simulated attack involving active exploitation.",
    "v4_ref": "PCI DSS Penetration Testing Guidance"
  },
  {
    "id": 49,
    "question": "What mechanism is mandated under PCI DSS v4.0 Requirement 11.6.1 to safeguard e-commerce payment pages against unauthorized changes?",
    "options": [
      "Deploying physical intrusion sensors and biometric locks on web servers hosting public checkout portals.",
      "Mandating end-to-end hardware security module encryption for all web server administrative SSH sessions.",
      "Deploying a tamper-detection mechanism to alert on unauthorized modifications to HTTP headers and scripts.",
      "Enforcing mandatory CAPTCHA challenges before allowing consumer web browsers to submit payment card forms."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 11.6.1 is a new v4.0 control requiring deployment of a change- and tamper-detection mechanism to alert personnel to unauthorized modifications to HTTP headers and the contents of payment pages as received by the consumer's browser, evaluated at least once every seven days or per targeted risk analysis.",
    "tip": "Requirement 11.6.1 detects tampering with HTTP headers and payment page scripts to thwart digital skimming (Magecart) attacks.",
    "v4_ref": "PCI DSS v4.0.1 Req 11.6.1"
  },
  {
    "id": 50,
    "question": "Under PCI DSS Requirement 12.10.2, how frequently must an entity test its incident response plan for payment security incidents?",
    "options": [
      "At least once every 30 calendar days",
      "At least once every 90 calendar days",
      "At least once every six calendar months",
      "At least once every 12 calendar months"
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 12.10.2 mandates that the incident response plan must be tested at least once every 12 months (annually), including simulated scenarios, tabletop walkthroughs, and notification procedures.",
    "tip": "Incident response plan must be tested at least once every 12 months (annually).",
    "v4_ref": "PCI DSS v4.0.1 Req 12.10.2"
  },
  {
    "id": 51,
    "question": "What is the initial operational priority an organization should execute upon suspecting an active cardholder data security incident?",
    "options": [
      "Execute containment procedures to isolate affected systems and preserve volatile memory evidence.",
      "Format operating system storage drives to eliminate malicious binaries before taking forensic images.",
      "Report the potential security breach to acquiring banks and card brands before containing the breach.",
      "Power off all affected server hardware immediately to halt active outbound network transmissions."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Under Requirement 12.10.1, the immediate priority upon suspecting a security incident is to initiate the incident response plan to contain the exposure and preserve volatile evidence for forensic analysis. Powering off systems or wiping drives destroys critical evidence in volatile memory, while public or external reporting occurs after initial containment.",
    "tip": "First step in an incident: Contain the threat and preserve evidence without destroying volatile memory.",
    "v4_ref": "PCI DSS Req 12.10.1"
  },
  {
    "id": 52,
    "question": "How often must an organization's overall information security policy and operational procedures be formally reviewed under Requirement 12.1.1?",
    "options": [
      "At least once every six months and following each scheduled internal vulnerability assessment",
      "At least once every 12 months and following any significant change in the operating environment",
      "At least once every 90 days in conjunction with quarterly external network vulnerability scans",
      "At least once every 24 months provided no significant infrastructure modifications have occurred"
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 12.1.1 mandates that the information security policy and supporting operational procedures must be reviewed at least once every 12 months (annually) and updated as necessary when significant environmental or organizational changes occur.",
    "tip": "Security policies must be reviewed at least once every 12 months and whenever significant changes occur.",
    "v4_ref": "PCI DSS Req 12.1.1"
  },
  {
    "id": 53,
    "question": "Under Requirement 12.8, which control must an entity implement when outsourcing cardholder data functions to a third-party service provider (TPSP)?",
    "options": [
      "Require the service provider to submit daily firewall modification logs for direct customer review",
      "Mandate that the service provider undergo quarterly penetration testing conducted by the entity",
      "Maintain a documented matrix defining which requirements are met by the provider versus the entity",
      "Obtain written indemnification that relieves the entity of all payment brand compliance liabilities"
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 12.8.5 requires entities to maintain documentation that outlines which PCI DSS requirements are met by each third-party service provider and which are the responsibility of the entity (a responsibility matrix). Outsourcing does not relieve the entity of responsibility or liabilities.",
    "tip": "Req 12.8.5 mandates maintaining a responsibility matrix for all third-party service providers (TPSPs).",
    "v4_ref": "PCI DSS Req 12.8.5"
  },
  {
    "id": 54,
    "question": "Which Self-Assessment Questionnaire (SAQ) applies to an e-commerce merchant who completely outsources all payment processing to a PCI DSS compliant third party via URL redirect or hosted iframe?",
    "options": [
      "SAQ B-IP, applicable to merchants using standalone payment terminals with IP connections",
      "SAQ C-VT, applicable to merchants using isolated web virtual terminals for manual entry",
      "SAQ A-EP, applicable to merchants operating websites that impact transaction security",
      "SAQ A, applicable to merchants outsourcing all card processing via iframe or redirect"
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "SAQs & Assessment Validation",
    "explanation": "SAQ A is specifically intended for e-commerce merchants whose entire payment card processing function is fully outsourced to a validated third-party service provider via an inline frame (iframe) or direct URL redirection, meaning merchant servers never store, process, or transmit cardholder data.",
    "tip": "SAQ A = 100% outsourced e-commerce (iframe or URL redirect). No cardholder data ever reaches merchant systems.",
    "v4_ref": "PCI SSC SAQ Instructions"
  },
  {
    "id": 55,
    "question": "Which Self-Assessment Questionnaire (SAQ) is required for an e-commerce merchant whose website generates the payment form and delivers scripts directing customer payment data to the payment gateway?",
    "options": [
      "SAQ A-EP, covering merchants whose web architecture impacts the security of payment transactions",
      "SAQ A, covering merchants that entirely outsource payment processing through third-party iframes",
      "SAQ C, covering merchants that operate isolated point-of-sale applications linked to the Internet",
      "SAQ D-Merchant, covering merchants who store electronically collected cardholder account numbers"
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "SAQs & Assessment Validation",
    "explanation": "SAQ A-EP applies to e-commerce merchants who have website architectures that do not directly receive cardholder data but deliver payment forms or JavaScript (direct post/API) that can impact the security of the payment transaction.",
    "tip": "SAQ A-EP is for merchants whose e-commerce servers generate payment forms or scripts affecting transactions.",
    "v4_ref": "PCI SSC SAQ Instructions"
  },
  {
    "id": 56,
    "question": "Which Self-Assessment Questionnaire (SAQ) is designated for merchants who process card payments exclusively using standalone dial-out terminals with no IP connectivity, or manual imprint machines?",
    "options": [
      "SAQ A, covering card-not-present merchants that outsource processing to compliant service providers",
      "SAQ B, covering brick-and-mortar merchants using standalone dial-out terminals without IP links",
      "SAQ B-IP, covering merchants operating standalone point-of-interaction devices on IP networks",
      "SAQ C, covering merchants with point-of-sale systems connected via local area network segments"
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "SAQs & Assessment Validation",
    "explanation": "SAQ B applies to merchants using only standalone, dial-out terminals (connected via POTS telephone lines) or manual imprint machines, with no electronic cardholder data storage and no IP network connection.",
    "tip": "SAQ B = Standalone dial-out terminals (no IP connectivity) or manual imprint machines.",
    "v4_ref": "PCI SSC SAQ Instructions"
  },
  {
    "id": 57,
    "question": "Which Self-Assessment Questionnaire (SAQ) applies to merchants who process card transactions solely through standalone Point of Interaction (POI) terminals connected via an IP network, without electronic card storage?",
    "options": [
      "SAQ P2PE, applying only to merchants using validated point-to-point encryption hardware solutions",
      "SAQ C-VT, applying only to merchants using browser-based virtual terminals for manual key entry",
      "SAQ B-IP, applying to merchants using standalone IP-connected point-of-interaction hardware devices",
      "SAQ A-EP, applying to merchants whose web servers impact payment transaction processing scripts"
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "SAQs & Assessment Validation",
    "explanation": "SAQ B-IP is designed for merchants using standalone, PTS-approved Point of Interaction (POI) payment terminals that connect via an IP network (Ethernet or Wi-Fi) directly to the processor, with no local card data storage.",
    "tip": "SAQ B-IP = Standalone IP-connected PTS-approved terminals without cardholder data storage.",
    "v4_ref": "PCI SSC SAQ Instructions"
  },
  {
    "id": 58,
    "question": "Which Self-Assessment Questionnaire (SAQ) is designed for merchants who manually enter single payment card transactions via a secure, web-based virtual terminal hosted by a PCI DSS compliant service provider?",
    "options": [
      "SAQ B, covering merchants operating standalone dial-up payment terminals on non-IP telephone circuits",
      "SAQ C, covering merchants using network-connected payment application systems without card storage",
      "SAQ P2PE, covering merchants processing transactions using validated hardware encryption solutions",
      "SAQ C-VT, covering merchants using isolated workstations dedicated solely to web virtual terminals"
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "SAQs & Assessment Validation",
    "explanation": "SAQ C-VT is specifically intended for merchants who manually process card-not-present transactions one by one using a web-based virtual terminal provided by a PCI DSS compliant service provider, on an isolated computer with no attached card readers.",
    "tip": "SAQ C-VT = Web-based Virtual Terminals (manual key entry on isolated PCs, no hardware readers).",
    "v4_ref": "PCI SSC SAQ Instructions"
  },
  {
    "id": 59,
    "question": "When a third-party service provider is permitted by a payment brand or acquirer to validate PCI DSS compliance using a Self-Assessment Questionnaire, which SAQ must be submitted?",
    "options": [
      "SAQ D for Service Providers, which encompasses all requirements applicable to service provider environments",
      "SAQ A, provided that the service provider processes card transactions strictly through hosted iframe forms",
      "SAQ C, provided that the service provider hosts segmented payment application servers without card storage",
      "SAQ B-IP, provided that the service provider connects terminals exclusively across private IP network links"
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "SAQs & Assessment Validation",
    "explanation": "All service providers eligible to validate compliance via an SAQ must complete SAQ D for Service Providers. The shorter questionnaires (SAQs A, B, B-IP, C, C-VT, P2PE) are exclusively available to qualifying merchants.",
    "tip": "Service providers have only ONE self-assessment questionnaire option: SAQ D for Service Providers.",
    "v4_ref": "PCI SSC SAQ Instructions"
  },
  {
    "id": 60,
    "question": "Which formal document is signed by an entity's executive management and the assessment team to certify the final validation results and compliance status under PCI DSS?",
    "options": [
      "The Report on Compliance (ROC), detailing technical testing procedures and assessor evidence findings",
      "The Attestation of Compliance (AOC), certifying overall validation results and executive sign-off",
      "The Targeted Risk Analysis (TRA), justifying operational frequencies for customized requirements",
      "The Prioritized Approach Worksheet, establishing milestone schedules for security remediation efforts"
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "SAQs & Assessment Validation",
    "explanation": "The Attestation of Compliance (AOC) is the formal declaration signed by executive leadership and the assessor certifying that the entity has met the requirements of PCI DSS. The ROC contains the detailed technical findings supporting the AOC.",
    "tip": "The Attestation of Compliance (AOC) is the official executive sign-off document certifying compliance.",
    "v4_ref": "PCI DSS Validation Process"
  },
  {
    "id": 61,
    "question": "Under PCI DSS, under which circumstance is an entity legitimately permitted to implement a compensating control in place of a defined requirement?",
    "options": [
      "When the commercial cost of implementing the defined technical control exceeds available budget allocations",
      "When executive leadership signs a formal risk acceptance memorandum transferring liability to underwriters",
      "When legitimate technical or documented business constraints prevent compliance with the stated requirement",
      "When internal vulnerability scanning demonstrates that no critical software exposures exist in production"
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Compensating Controls & v4.0 Customized Approach",
    "explanation": "Under PCI DSS (Appendix C), compensating controls may only be considered when an entity cannot meet a requirement explicitly as stated due to legitimate technical constraints (e.g. legacy mainframe limitation) or documented business constraints.",
    "tip": "Compensating controls require legitimate technical or documented business constraints; cost alone is never valid.",
    "v4_ref": "PCI DSS Appendix C"
  },
  {
    "id": 62,
    "question": "According to PCI DSS Appendix C guidelines, which criterion must be satisfied for a proposed compensating control to be considered valid by an assessor?",
    "options": [
      "It must be formally certified and approved by the PCI Security Standards Council prior to implementation",
      "It must rely entirely on existing PCI DSS controls that the entity is already obligated to meet elsewhere",
      "It must reduce annual compliance expenditures by at least twenty percent compared to the defined control",
      "It must meet the intent and rigor of the original requirement while going beyond existing requirements"
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Compensating Controls & v4.0 Customized Approach",
    "explanation": "To be valid, a compensating control must meet the intent and rigor of the original requirement, provide a defense that offsets the risk, be 'above and beyond' other existing PCI DSS requirements (cannot be something already mandated), and be commensurate with the risk.",
    "tip": "Compensating controls must meet intent and rigor and go 'above and beyond' existing requirements.",
    "v4_ref": "PCI DSS Appendix C"
  },
  {
    "id": 63,
    "question": "Which core components must be documented within the Compensating Controls Worksheet (Appendix C) to substantiate an alternative security measure?",
    "options": [
      "Documented constraints, requirement objective, identified risk, control definition, validation, and maintenance",
      "Financial justification, vendor invoice records, formal brand approval letters, and residual risk acceptance",
      "Executive board minutes, cyber insurance policy thresholds, vulnerability scan reports, and penetration test logs",
      "Third-party supplier agreements, cryptographic key inventories, employee training logs, and disaster recovery plans"
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Compensating Controls & v4.0 Customized Approach",
    "explanation": "Appendix C of PCI DSS specifies the Compensating Controls Worksheet structure: Constraints, Objective, Identified Risk, Definition of Compensating Controls, Validation of Controls, and Maintenance.",
    "tip": "Compensating Controls Worksheet sections: Constraints, Objective, Identified Risk, Definition, Validation, Maintenance.",
    "v4_ref": "PCI DSS Appendix C Worksheet"
  },
  {
    "id": 64,
    "question": "What is the principal distinction between the Defined Approach and the Customized Approach for validating requirements under PCI DSS v4.0?",
    "options": [
      "The Defined Approach applies exclusively to merchants, whereas the Customized Approach is restricted to service providers",
      "The Defined Approach follows prescriptive testing procedures, whereas the Customized Approach validates tailored controls",
      "The Defined Approach requires validation by an external QSA, whereas the Customized Approach permits unverified self-attestation",
      "The Defined Approach requires annual assessment, whereas the Customized Approach requires triennial compliance validation"
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Compensating Controls & v4.0 Customized Approach",
    "explanation": "In PCI DSS v4.0, the Defined Approach follows traditional prescriptive requirements and defined testing procedures, while the Customized Approach allows entities to design custom security controls to meet the stated Customized Approach Objective.",
    "tip": "Defined Approach = Prescriptive; Customized Approach = Tailored controls meeting the Requirement's Objective.",
    "v4_ref": "PCI DSS v4.0 Appendix D"
  },
  {
    "id": 65,
    "question": "Under PCI DSS v4.0 Requirement 12.3.2, what documentation must an entity produce for each requirement validated through the Customized Approach?",
    "options": [
      "A formal waiver endorsed by each participating payment card brand",
      "A standard Compensating Controls Worksheet signed by legal counsel",
      "A targeted risk analysis documenting threats and control design",
      "A certified forensic readiness report from an external lab vendor"
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Compensating Controls & v4.0 Customized Approach",
    "explanation": "Requirement 12.3.2 mandates that for each requirement addressed via the Customized Approach, the entity must document a Targeted Risk Analysis (TRA) identifying the risk, justifying the alternative control design, and establishing testing procedures.",
    "tip": "Each Customized Approach control mandates a dedicated Targeted Risk Analysis (TRA) under Req 12.3.2.",
    "v4_ref": "PCI DSS Req 12.3.2"
  },
  {
    "id": 66,
    "question": "What is the primary focus of the Payment Card Industry PIN Transaction Security (PCI PTS) standard?",
    "options": [
      "Regulating the software architecture and release lifecycle of payment applications deployed in cloud environments",
      "Establishing security requirements for secure cryptographic key exchange between acquiring banks and card brands",
      "Defining network segmentation standards and perimeter firewall configurations for enterprise corporate networks",
      "Ensuring physical and logical security of devices that capture and process cardholder PINs and payment card data"
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Other PCI Standards (P2PE, PTS, SSF, PIN)",
    "explanation": "PCI PTS (PIN Transaction Security) focuses on the physical and logical security characteristics of Point of Interaction (POI) devices, encrypting PIN pads, and secure card readers to protect PINs and sensitive account data during physical entry.",
    "tip": "PCI PTS governs the hardware security, tamper resistance, and cryptographic protection of PIN-entry devices.",
    "v4_ref": "PCI PTS Standard Overview"
  },
  {
    "id": 67,
    "question": "Which standard framework formally retired and replaced the legacy Payment Application Data Security Standard (PA-DSS)?",
    "options": [
      "The PCI Software Security Framework (SSF), containing the Secure Software Standard and Secure SLC Standard",
      "The Point-to-Point Encryption (P2PE) standard, establishing secure payment terminal hardware architectures",
      "The Payment Card Industry Data Security Standard (PCI DSS), expanding to incorporate commercial applications",
      "The PCI Card Production and Provisioning Security Standards, governing physical chip card manufacturing"
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Other PCI Standards (P2PE, PTS, SSF, PIN)",
    "explanation": "The PCI Software Security Framework (SSF) superseded PA-DSS in October 2022. SSF includes two primary standards: the Secure Software Standard (for software products) and the Secure Software Lifecycle (Secure SLC) Standard (for development organizations).",
    "tip": "PCI SSF replaced PA-DSS and comprises the Secure Software Standard and Secure SLC Standard.",
    "v4_ref": "PCI SSF Program Guide"
  },
  {
    "id": 68,
    "question": "Can a commercial payment software vendor validate their payment application under the PCI Software Security Framework (SSF) on an operating system that has reached end-of-life without vendor security support?",
    "options": [
      "Yes, provided the vendor implements a network intrusion prevention system in front of the application",
      "No, because commercial software must run on vendor-supported platforms that receive active security patches",
      "Yes, provided the acquiring bank issues an annual formal risk acceptance letter approving the platform",
      "No, unless the end customer agrees in writing to bear sole financial responsibility for data compromise"
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Other PCI Standards (P2PE, PTS, SSF, PIN)",
    "explanation": "Payment applications cannot be validated on unsupported operating systems that no longer receive vendor security patches. Compensating controls cannot be used by vendors to validate commercial software on end-of-life operating systems without extended vendor support.",
    "tip": "Commercial software cannot be validated on end-of-life operating systems lacking vendor security updates.",
    "v4_ref": "PCI SSF Secure Software Standard"
  },
  {
    "id": 69,
    "question": "What is the authoritative status of PCI SSC Information Supplements and guidance documents relative to official PCI DSS requirements?",
    "options": [
      "They possess full authority to amend, supersede, and legally replace published PCI DSS requirements",
      "They apply exclusively to Level 1 service providers and override conflicting requirements for cloud",
      "They provide contextual guidance and best practices but cannot supersede or alter PCI DSS requirements",
      "They establish mandatory compliance criteria that assessors must evaluate during annual assessments"
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "PCI DSS Foundations & Roles",
    "explanation": "Information Supplements, guidelines, and FAQs published by the PCI SSC provide interpretive guidance, technical clarification, and best practices, but they do NOT have the authority to amend, supersede, or override any official PCI DSS requirement.",
    "tip": "Information Supplements clarify and guide implementation but NEVER supersede or change PCI DSS requirements.",
    "v4_ref": "PCI SSC Technical Guidelines"
  },
  {
    "id": 70,
    "question": "Under Requirement 1.2, which configuration practice is strictly required when managing network security controls (such as firewalls and routers) that secure the CDE?",
    "options": [
      "Permitting administrative access to network security controls from any external network using cleartext protocols",
      "Utilizing automated script generation tools without maintaining human-reviewed baseline configuration standards",
      "Granting all internal corporate workstations default outbound connectivity to backend CDE database segments",
      "Securing configuration files from unauthorized access and synchronizing router clocks to trusted time sources"
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 1 & 2: Network & Configurations",
    "explanation": "Requirement 1.2 requires establishing and maintaining baseline configurations for network security controls (NSCs), protecting configuration files from unauthorized access, and synchronizing system clocks to ensure reliable forensic logging across firewalls and routers.",
    "tip": "Network security controls must have secured configuration files, documented rules, and synchronized clocks.",
    "v4_ref": "PCI DSS Req 1.2.1 - 1.2.5"
  },
  {
    "id": 71,
    "question": "Under Requirements 1.3 and 2.2, which architecture and security control is mandatory for database servers that store cardholder data within the CDE?",
    "options": [
      "Database servers must reside in secure internal network zones and must never be directly accessible from the Internet",
      "Database servers must be hosted within the internet-facing DMZ to facilitate rapid direct customer payment queries",
      "Database servers must allow administrative access using default vendor service accounts to avoid service lockouts",
      "Database servers must store cryptographic encryption keys in unencrypted configuration tables for faster lookups"
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 1 & 2: Network & Configurations",
    "explanation": "Requirement 1.3.1 mandates that systems storing cardholder data must reside in an internal network zone segmented from the DMZ and other untrusted networks. Inbound Internet traffic must never have direct access to database servers storing cardholder data.",
    "tip": "Databases storing cardholder data must never be placed in the DMZ or directly accessible from the Internet.",
    "v4_ref": "PCI DSS Req 1.3.1"
  },
  {
    "id": 72,
    "question": "Under Requirements 2.1.2 and 4.2.1, what is required when deploying wireless networks that connect to or transmit data within the cardholder data environment?",
    "options": [
      "Employing legacy WEP encryption paired with MAC address filtering to accommodate older barcode inventory hardware",
      "Implementing industry-accepted strong encryption protocols and changing all default encryption keys and passwords",
      "Restricting security measures strictly to hiding the wireless SSID beacon broadcast across all access points",
      "Prohibiting all wireless network technologies across the entire enterprise regardless of network segmentation"
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 1 & 2: Network & Configurations",
    "explanation": "Requirement 2.1.2 and Requirement 4.2.1 require that wireless networks transmitting cardholder data or connected to the CDE use industry-accepted strong cryptography (e.g. WPA2-Enterprise or WPA3) and that vendor defaults (passwords, encryption keys) are changed prior to deployment.",
    "tip": "Wireless CDE networks require strong encryption (WPA2/WPA3-Enterprise) and changing all vendor default keys.",
    "v4_ref": "PCI DSS Req 2.1.2 & 4.2.1"
  },
  {
    "id": 73,
    "question": "Under Requirement 6.5, which security practice is mandatory regarding the separation and protection of software development and test environments?",
    "options": [
      "Replicating unmasked production cardholder databases directly into developer sandboxes to support rigorous testing",
      "Permitting software development engineers unmonitored administrative credentials across production payment hosts",
      "Enforcing complete separation between development and production environments while utilizing sanitized test data",
      "Retaining development debugging accounts and test transaction records indefinitely within production releases"
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 5 & 6: Vulnerability & Secure Systems",
    "explanation": "Requirement 6.5.1 and 6.5.3 require strict separation between development/test and production environments, and prohibit the use of production cardholder data in non-production environments. Test data must be sanitized or fictitious.",
    "tip": "Separate dev/test from production; never use live cardholder data (PAN/SAD) in test environments.",
    "v4_ref": "PCI DSS Req 6.5.1 - 6.5.3"
  },
  {
    "id": 74,
    "question": "Under Requirement 6.2.2, how frequently must personnel involved in developing software for the CDE receive training in secure coding techniques and common vulnerabilities?",
    "options": [
      "Once during initial employment onboarding with no ongoing refresher requirements unless a critical flaw occurs",
      "At least once every 90 days in synchronization with internal vulnerability scanning cycles and code reviews",
      "Every 24 months provided that static application security testing tools are integrated into the CI/CD pipeline",
      "At least once every 12 months to maintain currency on emerging vulnerabilities and secure programming practices"
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 5 & 6: Vulnerability & Secure Systems",
    "explanation": "Requirement 6.2.2 requires software development personnel to be trained in secure coding techniques at least once every 12 months, covering relevant emerging vulnerabilities and common software development weaknesses.",
    "tip": "Developer secure coding training must take place at least once every 12 months (annually).",
    "v4_ref": "PCI DSS Req 6.2.2"
  },
  {
    "id": 75,
    "question": "Under Requirement 6.4.1 and 6.4.2, how must an entity protect public-facing web applications that process or impact cardholder data from known application attacks?",
    "options": [
      "Deploy an automated technical solution such as a web application firewall to detect and prevent web-based attacks",
      "Rely exclusively on standard network-level stateful firewalls without evaluating application-layer HTTP traffic",
      "Conduct manual vulnerability code assessments once every three years while omitting automated runtime inspection",
      "Mandate the use of client-side browser certificates while disabling server-side transport layer encryption"
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 5 & 6: Vulnerability & Secure Systems",
    "explanation": "Requirement 6.4.1 / 6.4.2 requires public-facing web applications to be protected from attacks by either conducting security vulnerability assessments or deploying an automated technical solution (such as a WAF). In v4.0 (Req 6.4.2), an automated technical solution that continually detects and prevents attacks is mandatory.",
    "tip": "Public-facing web applications must be protected by an automated technical solution (e.g. WAF) under Req 6.4.2.",
    "v4_ref": "PCI DSS Req 6.4.1 & 6.4.2"
  },
  {
    "id": 76,
    "question": "Under Requirement 12.3.1, which element is an explicit requirement of an entity's formal, enterprise-wide information security risk assessment process?",
    "options": [
      "Engaging an Approved Scanning Vendor to perform weekly external vulnerability scans of corporate email servers",
      "Identifying threats and vulnerabilities, assessing likelihood and impact, and performing reviews annually",
      "Automatically classifying all detected system vulnerabilities as low risk to prevent operational system outages",
      "Submitting quarterly risk registers directly to the PCI Security Standards Council for regulatory approval"
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 12.3.1 mandates an enterprise risk assessment process that identifies critical assets, threats, and vulnerabilities, assesses likelihood and impact, documents risk treatment decisions, and is performed at least once every 12 months.",
    "tip": "Formal risk assessment under Req 12.3.1 must be conducted at least annually and after significant changes.",
    "v4_ref": "PCI DSS Req 12.3.1"
  },
  {
    "id": 77,
    "question": "Under PCI DSS v4.0, what is the specific operational purpose of a Targeted Risk Analysis (TRA)?",
    "options": [
      "To provide legal indemnity that completely excuses an entity from annual third-party compliance validation",
      "To replace quarterly external vulnerability scans conducted by PCI SSC Approved Scanning Vendors (ASVs)",
      "To determine activity frequencies for flexible requirements or define controls under the Customized Approach",
      "To negotiate financial transaction interchange fee reductions directly with acquiring payment institutions"
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Compensating Controls & v4.0 Customized Approach",
    "explanation": "In PCI DSS v4.0, a Targeted Risk Analysis (TRA) is utilized in two scenarios: (1) under Req 12.3.1 when an entity determines its own frequency for requirements specifying 'periodically', and (2) under Req 12.3.2 when implementing the Customized Approach.",
    "tip": "TRAs justify custom activity frequencies (Req 12.3.1) or support Customized Approach controls (Req 12.3.2).",
    "v4_ref": "PCI DSS Req 12.3.1 & 12.3.2"
  },
  {
    "id": 78,
    "question": "Does a merchant's implementation of EMV (chip-and-PIN) payment terminals exempt the merchant from PCI DSS compliance?",
    "options": [
      "Yes, because EMV hardware encryption legally eliminates all merchant compliance obligations under payment card brand rules",
      "Yes, provided that at least eighty percent of the merchant's aggregate card transactions utilize physical chip validation",
      "No, but compliance obligations are strictly reduced to completing a one-page self-declaration without technical testing",
      "No, because payment data still traverses merchant network systems, meaning full PCI DSS scoping and compliance still apply"
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "PCI DSS Foundations & Roles",
    "explanation": "EMV chip cards protect against counterfeit card fraud at the point of sale, but account data still flows into the merchant's POS environment and payment network. EMV does NOT eliminate the need for PCI DSS compliance.",
    "tip": "EMV reduces card counterfeiting fraud but does NOT exempt any entity from PCI DSS compliance.",
    "v4_ref": "PCI SSC EMV Guidance"
  },
  {
    "id": 79,
    "question": "Under Requirement 5.2.3.1, which category of systems must be periodically evaluated to confirm whether evolving malware threats necessitate deploying anti-malware software?",
    "options": [
      "Specialized platforms such as mainframe environments and Unix systems historically less targeted by malware",
      "Windows desktop operating systems deployed within corporate administrative office and marketing divisions",
      "Mobile operating systems running commercial e-commerce point-of-sale applications in retail branch stores",
      "Network perimeter firewalls and layer-3 core routers running vendor-hardened proprietary firmware images"
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 5 & 6: Vulnerability & Secure Systems",
    "explanation": "Requirement 5.2.3.1 requires entities to periodically evaluate system components that are not commonly affected by malicious software (such as mainframes, AIX, Solaris, HP-UX, or custom Linux appliances) to confirm that anti-malware solutions are still not required.",
    "tip": "Systems not commonly targeted by malware (e.g. mainframes, Unix) require periodic evaluation under Req 5.2.3.1.",
    "v4_ref": "PCI DSS Req 5.2.3.1"
  },
  {
    "id": 80,
    "question": "How is the core architecture of the PCI DSS v4.0.1 standard organized across technical requirements?",
    "options": [
      "It comprises 10 core requirements focused strictly on infrastructure architecture and network segmentation",
      "It comprises exactly 12 numbered requirements organized systematically under six principal security goals",
      "It comprises 14 requirements divided equally between merchant operations and third-party service providers",
      "It comprises 16 dynamic requirements updated quarterly by the Payment Card Industry Security Standards Council"
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "PCI DSS Foundations & Roles",
    "explanation": "The PCI DSS framework consists of exactly 12 numbered requirements structured under six principal goals (Build and Maintain a Secure Network, Protect Account Data, Maintain a Vulnerability Management Program, Implement Strong Access Control Measures, Regularly Monitor and Test Networks, Maintain an Information Security Policy).",
    "tip": "PCI DSS contains exactly 12 principal requirements categorized across 6 overarching security goals.",
    "v4_ref": "PCI DSS Overview"
  },
  {
    "id": 81,
    "question": "Under Requirement 10.5, how must an entity protect audit log files and audit trails from unauthorized modifications or deletions?",
    "options": [
      "Distribute log read-and-write permissions to all system users to ensure continuous transparency and accountability",
      "Store log files solely on local endpoint disk partitions without automated replication or centralized log retention",
      "Restrict viewing access to authorized personnel, centralize logs on secure servers, and utilize tamper-detection controls",
      "Retain log records in unencrypted plain text on public network shares to accelerate external auditor verification reviews"
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 9 & 10: Physical & Logging",
    "explanation": "Requirement 10.5 mandates that audit log trails are protected from unauthorized tampering and deletion by limiting viewing access to authorized individuals, offloading logs immediately to a centralized log server or SIEM, and using write-once media or file integrity monitoring / cryptographic hashing.",
    "tip": "Audit logs must be centralized, read-restricted, and protected with tamper-detection controls (Req 10.5).",
    "v4_ref": "PCI DSS Req 10.5.1 - 10.5.4"
  },
  {
    "id": 82,
    "question": "Under Requirement 11.3, what action must an entity take when high-risk or critical vulnerabilities are identified during vulnerability scanning?",
    "options": [
      "Defer remediation activities until the next formal annual Report on Compliance assessment cycle commences",
      "Submit an immediate request for an exemption waiver to the PCI SSC without modifying underlying software",
      "Disable all vulnerability scanning daemons temporarily until system administrators resolve application bugs",
      "Remediate identified vulnerabilities according to organizational risk rankings and rescan until passing"
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 11.3.1 (internal scans) and 11.3.2 (external ASV scans) mandate that high-risk and critical vulnerabilities must be remediated in accordance with Requirement 6.3.1 rankings, and rescans must be conducted until a passing scan is achieved.",
    "tip": "Critical and high vulnerabilities must be remediated according to risk ranking and rescanned until clean.",
    "v4_ref": "PCI DSS Req 11.3.1 & 11.3.2"
  },
  {
    "id": 83,
    "question": "Under PCI DSS Requirement 12.11, which additional obligation applies specifically to Third-Party Service Providers (TPSPs)?",
    "options": [
      "Perform quarterly operational reviews to verify that personnel are actively following security policies and procedures",
      "Undergo on-site compliance examinations conducted by PCI SSC internal auditors at least once every calendar quarter",
      "Submit audited financial balance sheets to payment brand executives quarterly to prove ongoing commercial viability",
      "Replace all cryptographic keys and encryption hardware across production systems at least once every three months"
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 12.11 applies specifically to service providers: they must perform reviews at least once every three months (quarterly) to confirm that personnel are performing their tasks in accordance with security policies and operational procedures.",
    "tip": "Requirement 12.11 is a service provider-only requirement: quarterly operational policy compliance reviews.",
    "v4_ref": "PCI DSS Req 12.11"
  },
  {
    "id": 84,
    "question": "Under Requirement 9.4, how must an entity handle physical paper media containing cardholder data (such as printed receipts or chargeback files)?",
    "options": [
      "Archive paper records in unlocked filing cabinets located in reception areas to facilitate prompt staff access",
      "Physically secure paper records, restrict access based on need, and destroy them by cross-cut shredding or pulping",
      "Discard obsolete physical card records into standard office recycling containers provided bins are emptied daily",
      "Retain paper records permanently in offsite warehouse facilities without establishing formal retention schedules"
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 9 & 10: Physical & Logging",
    "explanation": "Requirement 9.4 mandates that physical media containing cardholder data (hard-copy receipts, faxes, paper reports) must be strictly controlled, stored in locked containers with access limited to authorized staff, and permanently destroyed (cross-cut shredded, incinerated, or pulped) when no longer needed.",
    "tip": "Paper containing CHD must be physically secured in locked cabinets and destroyed via cross-cut shredding.",
    "v4_ref": "PCI DSS Req 9.4.1 - 9.4.4"
  },
  {
    "id": 85,
    "question": "Under Requirement 11.5.1, what type of security tool must be deployed to alert personnel to unauthorized modifications of critical system files?",
    "options": [
      "An automated endpoint performance monitor that tracks system memory usage and network bandwidth limits",
      "A centralized patch distribution manager that deploys operating system updates without testing baselines",
      "A change-detection mechanism such as file integrity monitoring that evaluates file cryptographic hashes",
      "A disk optimization utility that verifies physical storage sector alignments on production database drives"
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 11.5.1 requires deploying a change-detection mechanism (such as File Integrity Monitoring / FIM) to alert personnel to unauthorized modification, addition, or deletion of critical system files, configuration files, or content files.",
    "tip": "File Integrity Monitoring (FIM) or change-detection mechanisms alert on unauthorized critical file changes.",
    "v4_ref": "PCI DSS Req 11.5.1"
  },
  {
    "id": 86,
    "question": "Under Requirements 3.6 and 3.7, which control is mandatory for the secure management of cryptographic keys used to protect stored cardholder data?",
    "options": [
      "Storing cryptographic keys in plaintext configuration files on the database server to minimize decryption latency",
      "Sharing master cryptographic keys among all system administrators via encrypted corporate email distribution lists",
      "Embedding cryptographic keys directly within compiled application binary source code to eliminate key store queries",
      "Protecting keys with key-encrypting keys, restricting custody via split knowledge and dual control, and revoking them"
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 3 & 4: Data Protection & Encryption",
    "explanation": "Requirements 3.6 and 3.7 mandate strong key management procedures: storing keys in secure cryptographic devices (HSMs), protecting data encryption keys with key-encrypting keys of equal strength, enforcing split knowledge and dual control for manual management, and revoking retired or compromised keys.",
    "tip": "Cryptographic key management requires split knowledge, dual control, and key-encrypting keys (KEKs).",
    "v4_ref": "PCI DSS Req 3.6 & 3.7"
  },
  {
    "id": 87,
    "question": "Which of the following technical capabilities is NOT an explicitly mandated requirement within the PCI DSS framework?",
    "options": [
      "Deploying automated Data Loss Prevention (DLP) client agents across all corporate employee workstations",
      "Requiring multi-factor authentication for all personnel accessing the cardholder data environment",
      "Restricting physical access to network jacks, wireless access points, and sensitive server hardware",
      "Conducting quarterly internal vulnerability scans and external scans using an Approved Scanning Vendor"
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "PCI DSS Foundations & Roles",
    "explanation": "PCI DSS does NOT mandate enterprise-wide Data Loss Prevention (DLP) agent deployment across all non-CDE user endpoints. In contrast, MFA for CDE access (Req 8.4.2), physical security controls (Req 9), and quarterly vulnerability scanning (Req 11.3) are explicitly required.",
    "tip": "Automated enterprise DLP client software is a good practice but is not a mandated PCI DSS requirement.",
    "v4_ref": "PCI DSS Core Principles"
  },
  {
    "id": 88,
    "question": "Under Requirement 3.2.1, what standard dictates the maximum retention period for stored Primary Account Numbers (PAN)?",
    "options": [
      "A fixed statutory duration of exactly twelve months following the initial authorization of the transaction",
      "The minimum duration strictly required to satisfy documented business, legal, or regulatory obligations",
      "A rolling duration of ninety calendar days, after which all cardholder records must be permanently purged",
      "An indefinite retention period provided that account numbers are encrypted using modern symmetric ciphers"
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 3 & 4: Data Protection & Encryption",
    "explanation": "Requirement 3.2.1 mandates that account data storage must be kept to the absolute minimum necessary to satisfy formal legal, regulatory, and business requirements, backed by a formal data retention and disposal policy.",
    "tip": "PAN retention is limited to the minimum time strictly required for documented business, legal, or regulatory needs.",
    "v4_ref": "PCI DSS Req 3.2.1"
  },
  {
    "id": 89,
    "question": "Which of the following symmetric cryptographic algorithms is classified as weak and is prohibited for protecting stored cardholder data?",
    "options": [
      "AES-128, utilizing approved cipher block chaining modes and secure operational key rotation schedules",
      "AES-256, utilizing Galois/Counter Mode authenticated encryption across relational database column stores",
      "Single DES (56-bit key length), due to inadequate key length and vulnerability to modern cryptanalysis",
      "Triple DES (using three independent 56-bit keys), configured under appropriate block retirement thresholds"
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 3 & 4: Data Protection & Encryption",
    "explanation": "Single DES (Data Encryption Standard) uses an effective key length of only 56 bits, which is completely broken and vulnerable to brute-force cryptanalysis. It does not meet the PCI DSS definition of strong cryptography.",
    "tip": "Single DES (56-bit) and weak ciphers like RC4 are strictly prohibited under PCI DSS strong cryptography rules.",
    "v4_ref": "PCI DSS Glossary - Strong Cryptography"
  },
  {
    "id": 90,
    "question": "If an entity discovers unauthorized Sensitive Authentication Data (SAD) stored post-authorization during a cardholder data discovery review, what primary actions must be executed?",
    "options": [
      "Encrypt the stored authentication data using AES-256 and document a compensating control for ongoing retention",
      "Reclassify the affected database systems as out-of-scope while adjusting internal access control permission lists",
      "Notify the local law enforcement authorities and suspend all customer merchant processing contracts immediately",
      "Securely delete the data immediately, perform root-cause analysis, and remediate the underlying logging process"
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 3 & 4: Data Protection & Encryption",
    "explanation": "Under Requirement 3.2 and 3.3.1, SAD (full track data, CVV/CVC, PIN/PIN blocks) must never be stored post-authorization. If found, the data must be securely purged immediately, root-cause analysis performed, and the logging/storage process remediated.",
    "tip": "Discovered post-auth SAD must be securely purged immediately and the logging/code defect remediated.",
    "v4_ref": "PCI DSS Req 3.3.1"
  },
  {
    "id": 91,
    "question": "Under Requirement 3.4 (formerly 3.3), what is the technical standard for masking Primary Account Numbers (PAN) when displayed on computer screens or paper receipts?",
    "options": [
      "Displaying no more than the first six and last four digits, unless a legitimate documented business need exists",
      "Blanking out the entire account number completely with asterisks across all administrative user interfaces",
      "Displaying the full sixteen-digit account number in plaintext whenever an authorized supervisor is logged in",
      "Replacing the middle six digits with a cryptographic hash while displaying the remaining ten digits in cleartext"
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 3 & 4: Data Protection & Encryption",
    "explanation": "Requirement 3.4 requires PAN masking when displayed: displaying no more than the first six (BIN) and last four digits, unless a legitimate, documented business need requires seeing more digits. (Note: in v4.0.1, up to the first eight digits may be visible if justified for 8-digit BINs).",
    "tip": "PAN display masking standard: show no more than the first six (or eight with justification) and last four digits.",
    "v4_ref": "PCI DSS Req 3.4"
  },
  {
    "id": 92,
    "question": "Under Requirement 1.3, where must system components that store cardholder data be placed within an organization's network architecture?",
    "options": [
      "In an internet-facing Demilitarized Zone (DMZ) configured to handle incoming web customer transaction traffic",
      "In an internal secure network zone that is isolated from the DMZ and all untrusted or public network segments",
      "On any corporate subnet provided that the host machine utilizes private IP addresses assigned through DHCP",
      "In a cloud edge perimeter subnet to enable direct API communication with acquiring financial institutions"
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 1 & 2: Network & Configurations",
    "explanation": "Requirement 1.3 mandates that systems storing cardholder data must be located in internal, secure network zones segregated from the DMZ and other untrusted networks. Inbound Internet traffic must never directly access systems that store cardholder data.",
    "tip": "Systems storing cardholder data must reside in an internal network zone isolated from the DMZ and untrusted nets.",
    "v4_ref": "PCI DSS Req 1.3"
  },
  {
    "id": 93,
    "question": "Under Requirement 2.2, which system hardening standard must an entity enforce on server components deployed within the cardholder data environment?",
    "options": [
      "Retaining all default vendor services and background daemons active to support unexpected operational needs",
      "Installing office productivity tools and development compilers directly on production database servers",
      "Configuring only one primary function per server or logical partition and disabling all unnecessary services",
      "Enabling legacy remote administration services such as Telnet and FTP for emergency administrative fallback"
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 1 & 2: Network & Configurations",
    "explanation": "Requirement 2.2 mandates system hardening: configuring only one primary function per system component (or isolating functions using virtualization/containers) and removing or disabling all unnecessary services, protocols, daemons, and software.",
    "tip": "One primary function per server/VM, and disable all unnecessary protocols, daemons, and services (Req 2.2).",
    "v4_ref": "PCI DSS Req 2.2"
  },
  {
    "id": 94,
    "question": "What is the fundamental difference in eligibility and scope between SAQ A and SAQ A-EP for e-commerce merchants?",
    "options": [
      "SAQ A applies to physical retail point-of-sale systems, whereas SAQ A-EP applies exclusively to mail-order centers",
      "SAQ A requires an on-site assessment by a QSA, whereas SAQ A-EP allows self-attestation without external scrutiny",
      "SAQ A applies to entities that store PAN, whereas SAQ A-EP applies to entities that transmit cardholder data only",
      "SAQ A merchants outsource payment handling completely, whereas SAQ A-EP merchants host pages impacting security"
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "SAQs & Assessment Validation",
    "explanation": "SAQ A is for e-commerce merchants who fully outsource payment processing (e.g. hosted iframes or URL redirects). SAQ A-EP is for e-commerce merchants who host payment form web pages or deliver JavaScript code that directly affects how cardholder data is collected and transmitted.",
    "tip": "SAQ A = 100% outsourced handling; SAQ A-EP = merchant hosts web pages/scripts impacting payment collection.",
    "v4_ref": "PCI SSC SAQ Instructions"
  },
  {
    "id": 95,
    "question": "When an entity utilizes a third-party cloud service provider (such as AWS, Azure, or GCP) to host components of its CDE, what is required to achieve PCI DSS compliance?",
    "options": [
      "Verify provider compliance annually, define a shared responsibility matrix, and assess all customer-managed controls",
      "Rely entirely on the cloud provider's compliance attestation to automatically satisfy all customer audit obligations",
      "Execute a formal liability transfer contract that completely relieves the customer of card brand financial penalties",
      "Restrict cloud usage to non-production environments because multi-tenant cloud architectures cannot be certified"
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Under the cloud shared responsibility model (Req 12.8), the entity must verify the provider's PCI DSS compliance status annually, establish a documented responsibility matrix clarifying control ownership, and assess all customer-managed components (IaaS VMs, firewalls, IAM, encryption).",
    "tip": "Cloud PCI compliance is shared: obtain provider's AOC, maintain a responsibility matrix, and assess customer controls.",
    "v4_ref": "PCI DSS Cloud Computing Guidelines"
  },
  {
    "id": 96,
    "question": "Under Requirement 1.2.7, what is the minimum required frequency for reviewing network security control (firewall and router) rule sets?",
    "options": [
      "At least once every ninety calendar days in coordination with internal vulnerability scanning schedules",
      "At least once every six months to confirm that all permitted traffic has an active business justification",
      "At least once every twelve months during the formal annual Report on Compliance on-site assessment review",
      "At least once every thirty days following scheduled operating system security patch installation cycles"
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 1 & 2: Network & Configurations",
    "explanation": "Requirement 1.2.7 requires firewall and router rule sets to be reviewed at least once every six months to verify that all permitted traffic continues to have a valid business justification and that obsolete rules are removed.",
    "tip": "Firewall and router rule reviews must occur at least once every six months (Req 1.2.7).",
    "v4_ref": "PCI DSS Req 1.2.7"
  },
  {
    "id": 97,
    "question": "Under Requirement 9.5.1.2.1 of PCI DSS v4.0, how must an entity determine the frequency for physically inspecting Point of Interaction (POI) devices for tampering or substitution?",
    "options": [
      "By executing physical device inspections strictly once every thirty days across all store checkout terminals",
      "By inspecting device casing seals exclusively during the annual on-site audit conducted by a Qualified Assessor",
      "By establishing inspection intervals supported by a documented targeted risk analysis of the device environment",
      "By conducting hardware checks only when a terminal experiences hardware communication failures or restarts"
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 9 & 10: Physical & Logging",
    "explanation": "Requirement 9.5.1.2.1 mandates that the frequency of periodic physical inspections of POI devices must be established based on a Targeted Risk Analysis (TRA) documented in accordance with Requirement 12.3.1.",
    "tip": "In v4.0, POI device physical inspection frequency must be defined in a Targeted Risk Analysis (Req 9.5.1.2.1).",
    "v4_ref": "PCI DSS Req 9.5.1"
  },
  {
    "id": 98,
    "question": "Under the governance model of the PCI Security Standards Council, which party holds ultimate responsibility for maintaining ongoing PCI DSS compliance?",
    "options": [
      "The Qualified Security Assessor (QSA) conducting the independent validation assessment",
      "The Approved Scanning Vendor (ASV) validating external network perimeter vulnerability scans",
      "The PCI Security Standards Council (PCI SSC) responsible for publishing security standards",
      "The assessed entity itself, whether operating as a payment card merchant or service provider"
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "PCI DSS Foundations & Roles",
    "explanation": "While QSAs, ASVs, and acquiring banks play key validation and monitoring roles, ultimate responsibility for achieving and maintaining compliance with PCI DSS rests solely on the assessed entity (the merchant or service provider).",
    "tip": "Ultimate compliance responsibility always belongs to the entity itself (the merchant or service provider).",
    "v4_ref": "PCI DSS Governance"
  },
  {
    "id": 99,
    "question": "What is the primary operational role of a Qualified Security Assessor (QSA) during a PCI DSS validation engagement?",
    "options": [
      "Independently evaluate security controls, validate evidence, and author the Report on Compliance",
      "Enforce financial non-compliance penalties and determine transaction interchange fee schedules",
      "Design and operate commercial perimeter firewalls and security software inside client environments",
      "Authorize exceptions and grant formal legal waivers exempting organizations from standard controls"
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "PCI DSS Foundations & Roles",
    "explanation": "A Qualified Security Assessor (QSA) is an independent assessor certified by the PCI SSC to perform formal assessments, evaluate evidence, verify control effectiveness, and author the Report on Compliance (ROC) and Attestation of Compliance (AOC).",
    "tip": "QSAs independently assess controls, validate evidence, and produce Reports on Compliance (ROC).",
    "v4_ref": "QSA Qualification Requirements"
  },
  {
    "id": 100,
    "question": "What constitutes an Internal Security Assessor (ISA) within the PCI Security Standards Council framework?",
    "options": [
      "An external law enforcement investigator contracted by card brands to investigate suspected breaches",
      "An organizational employee certified by PCI SSC to lead internal assessments and liaise with QSAs",
      "An automated security information tool that continuously monitors network traffic logs for malware",
      "A certified commercial software developer licensed to build PCI SSF-compliant payment applications"
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "PCI DSS Foundations & Roles",
    "explanation": "An Internal Security Assessor (ISA) is an internal employee of an organization who has completed PCI SSC training and certification to manage internal compliance assessments, maintain compliance programs, and liaise with external QSAs.",
    "tip": "An ISA is an in-house employee certified by PCI SSC to lead internal assessments and interface with QSAs.",
    "v4_ref": "PCI SSC ISA Program"
  },
  {
    "id": 101,
    "question": "A cloud provider hosts virtual machines (VMs) for forty different merchants on shared physical server hardware, where each merchant stores or processes cardholder data. What additional requirements apply to this hosting provider under PCI DSS?",
    "options": [
      "Appendix A1 applies because the entity is a Multi-Tenant Service Provider hosting cardholder data on shared infrastructure.",
      "Appendix A2 applies because the provider must eliminate legacy encryption protocols across all tenant hypervisors.",
      "Appendix A3 applies because the entity must implement supplementary validation criteria as a designated entity.",
      "No appendix applies because multi-tenant cloud providers are classified as out of scope if tenant storage is encrypted."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Scope & Segmentation",
    "explanation": "Appendix A1 applies specifically to Multi-Tenant Service Providers (MTSPs) that host cardholder data or provide shared infrastructure, platforms, or applications to multiple customers. Appendix A2 addresses legacy SSL/early TLS, while Appendix A3 contains Designated Entities Supplementary Validation (DESV) requirements.",
    "tip": "Multi-tenant cloud providers hosting multiple merchants on shared hardware must comply with Appendix A1.",
    "v4_ref": "PCI DSS Appendix A1"
  },
  {
    "id": 102,
    "question": "Under Appendix A1.1.1, what logical separation must a Multi-Tenant Service Provider (MTSP) enforce across its hosting environment?",
    "options": [
      "Physical separation must be maintained by assigning dedicated physical server racks and network switches to each individual tenant.",
      "Logical separation must be maintained between all customer environments and between customer workloads and the management plane.",
      "Logical separation is only mandated between production database instances and pre-production testing systems within each tenant.",
      "Administrative separation is only required when two or more competing merchant organizations occupy the same cloud availability zone."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Scope & Segmentation",
    "explanation": "Appendix A1.1.1 mandates that multi-tenant service providers isolate all customer environments from one another and isolate customer environments from the provider's own management infrastructure (management plane) to prevent cross-tenant or provider compromise.",
    "tip": "MTSPs must logically isolate customer environments from each other and from the provider's management plane.",
    "v4_ref": "PCI DSS Appendix A1.1.1"
  },
  {
    "id": 103,
    "question": "Under Requirement 11.4.7, what must a Multi-Tenant Service Provider (MTSP) do when a customer requests to perform an external penetration test on the hosted infrastructure to satisfy their own PCI DSS compliance?",
    "options": [
      "Refuse the testing request unconditionally to protect adjacent tenant workloads from inadvertent denial of service conditions.",
      "Require the requesting customer to obtain written authorization and liability waivers from all other co-hosted cloud tenants.",
      "Support the customer's penetration test or provide access to penetration testing evidence under agreed rules of engagement.",
      "Provide quarterly external vulnerability scan reports as a full substitute for permitting external penetration testing."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 11.4.7 explicitly requires multi-tenant service providers to support their customers for external penetration testing, or provide access to penetration testing evidence demonstrating that the provider's controls meet testing objectives under agreed rules of engagement. Blanket refusals violate this requirement.",
    "tip": "Requirement 11.4.7 prevents MTSPs from blocking customer penetration testing without providing compliant alternatives.",
    "v4_ref": "PCI DSS Req 11.4.7"
  },
  {
    "id": 104,
    "question": "Under Appendix A1.2.1, how must audit log data be managed within a multi-tenant hosting environment?",
    "options": [
      "Aggregate all tenant log records into a shared repository accessible to designated administrative personnel of any tenant.",
      "Retain tenant audit records for a maximum of thirty days to minimize cross-tenant data exposure risks during an investigation.",
      "Delegate all audit logging functions to tenant virtual machines while disabling provider-level hypervisor event capture.",
      "Restrict each tenant's access strictly to their own audit logs while preventing access to other tenants' or provider logs."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 9 & 10: Physical & Logging",
    "explanation": "Appendix A1.2.1 requires multi-tenant service providers to segregate audit logs so that each tenant can access only their own log data. Tenants must never have visibility into logs belonging to other hosted tenants or the service provider's internal management infrastructure.",
    "tip": "MTSP logging must guarantee strict tenant log segregation and prevent cross-tenant log visibility.",
    "v4_ref": "PCI DSS Appendix A1.2.1"
  },
  {
    "id": 105,
    "question": "What is the operational principle of 'Split Knowledge and Dual Control' in cryptographic key management under Requirement 3.6 and 3.7?",
    "options": [
      "Two or more individuals possess separate key components, so no single person knows the key, and both must act to reconstruct it.",
      "Two system administrators possess duplicate copies of the same cryptographic key stored across separate secure hardware tokens.",
      "One custodian maintains the active decryption key while a separate compliance officer maintains the encrypted database backup.",
      "Cryptographic keys are divided automatically into algorithmic shards distributed across cloud servers without human intervention."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 3 & 4: Data Protection & Encryption",
    "explanation": "Split knowledge means that two or more individuals possess separate key components (shares) such that no single individual knows or has access to the full plaintext key. Dual control means that the coordinated action of two or more individuals is required to perform key management tasks or activate the key.",
    "tip": "Split knowledge = no single person knows the whole key; dual control = two people required to perform the action.",
    "v4_ref": "PCI DSS Req 3.6.1 & 3.7"
  },
  {
    "id": 106,
    "question": "What is the cryptographic strength rule when using a Key-Encrypting Key (KEK) to protect a Data-Encrypting Key (DEK)?",
    "options": [
      "The KEK may use a less complex cipher than the DEK provided administrative access to the KEK is protected by multi-factor controls.",
      "The KEK must be at least as cryptographically strong as the DEK it protects and must be stored in a separate physical location.",
      "The KEK must be derived directly from the DEK using a reversible cryptographic hash function implemented within an approved HSM.",
      "The KEK must maintain exactly twice the bit length of the protected DEK regardless of the underlying encryption cipher in use."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 3 & 4: Data Protection & Encryption",
    "explanation": "Under Requirements 3.6 and 3.7, any key-encrypting key (KEK) used to encrypt data-encrypting keys (DEKs) must be at least as cryptographically strong as the DEK it protects, and must be stored separately from the DEK to avoid compromise of both keys simultaneously.",
    "tip": "A KEK must always be at least as strong as the DEK it protects and stored separately.",
    "v4_ref": "PCI DSS Req 3.6.2 & 3.7.3"
  },
  {
    "id": 107,
    "question": "Which of the following describes an acceptable method for retiring and destroying expired or compromised cryptographic keys under Requirement 3.7.8?",
    "options": [
      "Archiving the retired cryptographic keys in an offline, password-protected archive stored on a segmented network file share.",
      "Re-encrypting the retired keys with a legacy key-encrypting key and maintaining the resulting ciphertext in active storage.",
      "Securely zeroizing, overwriting, or physically destroying key management devices so that key reconstruction is impossible.",
      "Deprecating the key state in the key management registry while leaving the key material in non-volatile appliance memory."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 3 & 4: Data Protection & Encryption",
    "explanation": "Requirement 3.7.8 mandates that cryptographic keys that have reached the end of their cryptoperiod or have been compromised are revoked and permanently destroyed. Destruction must prevent any reconstruction of the key through techniques such as zeroization in HSMs, secure cryptographic wiping, or physical destruction.",
    "tip": "Key destruction requires complete zeroization, secure erasure, or physical destruction preventing reconstruction.",
    "v4_ref": "PCI DSS Req 3.7.8"
  },
  {
    "id": 108,
    "question": "Which of the following combinations satisfies the definition of Multi-Factor Authentication (MFA) under PCI DSS Requirement 8.4?",
    "options": [
      "A knowledge-based alphanumeric passphrase combined with a secondary secret personal identification number (PIN).",
      "A hardware security token providing one-time codes combined with an SMS verification passcode sent to a mobile device.",
      "A biometric fingerprint verification scan combined with an automated biometric facial recognition pattern comparison.",
      "A knowledge-based personal passphrase combined with a time-based one-time passcode from an authenticator hardware token."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 7 & 8: Access Control & Authentication",
    "explanation": "Multi-Factor Authentication requires using at least two different categories from: something you know (knowledge: password/passphrase), something you have (possession: hardware token/mobile authenticator app), and something you are (inherence: biometrics). Combining two factors from the same category (e.g. password + PIN, or two biometrics, or two possession tokens) does NOT satisfy MFA.",
    "tip": "MFA requires at least two DIFFERENT factor types: something you know, have, or are.",
    "v4_ref": "PCI DSS Req 8.4.1"
  },
  {
    "id": 109,
    "question": "Under PCI DSS v4.0 Requirement 8.4.3, what technical control must be enforced on Multi-Factor Authentication (MFA) implementations?",
    "options": [
      "MFA mechanisms must be resistant to replay attacks and ensure that neither factor can be bypassed by an unauthorized user.",
      "MFA mechanisms must require physical biometric verification for all system logins rather than software-based one-time codes.",
      "MFA mechanisms must automatically cache user authentication tokens for at least twenty-four hours to reduce session latency.",
      "MFA mechanisms must be implemented exclusively at perimeter network firewalls rather than on individual critical endpoints."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 7 & 8: Access Control & Authentication",
    "explanation": "Requirement 8.4.3 mandates that MFA systems: 1) Are not susceptible to replay attacks, 2) Do not allow factors to be bypassed, 3) Cannot be compromised by the compromise of one factor, and 4) Require successful validation of all factors prior to granting access.",
    "tip": "Requirement 8.4.3 prevents replay attacks and ensures factors cannot be bypassed or compromised sequentially.",
    "v4_ref": "PCI DSS v4.0 Req 8.4.3"
  },
  {
    "id": 110,
    "question": "Under Requirement 8.3.4, what action must occur after a defined number of consecutive invalid authentication attempts (not to exceed ten attempts)?",
    "options": [
      "The user account must be suspended indefinitely until an on-site forensic analysis confirms no brute-force attempt occurred.",
      "The user account must be locked out for at least 30 minutes or until an authorized administrator explicitly unlocks the ID.",
      "The system must trigger an automatic forced password reset delivered via an unencrypted notification to the user's manager.",
      "The system must restrict account privileges to read-only operational mode for twenty-four hours before restoring privileges."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 7 & 8: Access Control & Authentication",
    "explanation": "Requirement 8.3.4 requires limiting repeated failed login attempts by locking out the user account after not more than 10 consecutive failed attempts. The lockout duration must be at least 30 minutes or until an authorized administrator resets the account.",
    "tip": "Lockout threshold: maximum 10 attempts; lockout duration: minimum 30 minutes or until administrator release.",
    "v4_ref": "PCI DSS Req 8.3.4"
  },
  {
    "id": 111,
    "question": "How does PCI DSS Requirement 8.2.2 and 8.3.7 regulate the use of shared or generic administrative user accounts?",
    "options": [
      "Shared administrative accounts are permitted across systems provided the shared password is rotated every thirty calendar days.",
      "Shared accounts are acceptable for third-party vendors provided connections are established over encrypted secure shell sessions.",
      "Shared or generic administrative accounts are strictly prohibited unless exceptional, documented business justification is approved.",
      "Shared accounts may be used freely across development and staging environments that maintain network connections to the CDE."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 7 & 8: Access Control & Authentication",
    "explanation": "Requirement 8.2.2 and 8.3.7 mandate individual accountability by strictly prohibiting shared or generic administrative credentials. They are only allowed on an exceptional basis where documented business justification exists, explicit management approval is granted, and individual identity is confirmed prior to access.",
    "tip": "Individual accountability is foundational in PCI DSS: shared and generic accounts are prohibited with very narrow exceptions.",
    "v4_ref": "PCI DSS Req 8.2.2 & 8.3.7"
  },
  {
    "id": 112,
    "question": "Under PCI DSS Requirement 10.4.1.1 (an additional requirement for Service Providers), what must a service provider do when a critical security control system fails?",
    "options": [
      "Document the failure in the next annual Report on Compliance without implementing immediate operational remediation measures.",
      "Disable automated alerting mechanisms temporarily to prevent log buffer exhaustion while technicians troubleshoot the issue.",
      "Notify all payment card brands and acquiring banks within sixty minutes regardless of root cause or actual security impact.",
      "Promptly detect, alert, and respond to failures of critical security controls, restoring security functions without delay."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 9 & 10: Physical & Logging",
    "explanation": "Requirement 10.4.1.1 mandates that service providers have processes in place to promptly detect, alert on, and respond to failures of critical security control systems (including firewalls, IDS/IPS, FIM, anti-malware, and physical access controls), and restore security operations quickly.",
    "tip": "Service providers must promptly detect, alert, and respond to failures in critical security control systems.",
    "v4_ref": "PCI DSS Req 10.4.1.1"
  },
  {
    "id": 113,
    "question": "Under Requirements 12.5.2 and 12.5.3, what is the mandatory frequency for Service Providers to confirm their PCI DSS scope and test segmentation controls?",
    "options": [
      "At least once every six months and upon any significant change to the environment, network architecture, or scope boundaries.",
      "At least once every twelve months and following major commercial product updates or annual corporate restructuring events.",
      "At least once quarterly in conjunction with external Approved Scanning Vendor vulnerability assessments of network perimeters.",
      "Only when explicitly requested by a merchant customer's Qualified Security Assessor during a formal compliance assessment."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Scope & Segmentation",
    "explanation": "Under Requirements 12.5.2 and 12.5.3, service providers must confirm PCI DSS scope and perform penetration testing of segmentation controls at least once every six months and following any significant change. In contrast, merchants perform segmentation testing annually.",
    "tip": "Service providers must confirm scope and test segmentation every 6 months; merchants test segmentation annually.",
    "v4_ref": "PCI DSS Req 12.5.2 & 12.5.3"
  },
  {
    "id": 114,
    "question": "What is the contractual requirement mandated by PCI DSS Requirement 12.9 regarding Third-Party Service Providers (TPSPs)?",
    "options": [
      "Service providers must obtain written consent from acquiring banks before entering into service agreements with merchant clients.",
      "Service providers must confirm in writing to customers that they are responsible for the security of cardholder data they manage.",
      "Service providers must complete on-site QSA audits semi-annually and publish complete technical workpapers to public web portals.",
      "Service providers must maintain a dedicated financial liability reserve fund proportional to the volume of card data processed."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 12.9 requires service providers to acknowledge in writing to their customers that they are responsible for the security of cardholder data the provider possesses, stores, processes, or transmits on behalf of the customer, or to the extent they impact customer CDE security.",
    "tip": "Requirement 12.9 requires service providers to provide written acknowledgment of their responsibility for cardholder data.",
    "v4_ref": "PCI DSS Req 12.9"
  },
  {
    "id": 115,
    "question": "Under Requirement 3.5.1.1, what must Service Providers maintain regarding their cryptographic architecture?",
    "options": [
      "A secure escrow repository containing unencrypted copies of all customer private keys maintained on offline backup media.",
      "A signed executive affidavit certifying that no asymmetric cryptographic ciphers are deployed within production facilities.",
      "Detailed documentation of the cryptographic architecture, including algorithms, keys, cryptoperiods, and management schemes.",
      "A quarterly penetration testing report evaluating the resistance of retired cryptographic keys to distributed compute attacks."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 3 & 4: Data Protection & Encryption",
    "explanation": "Requirement 3.5.1.1 (an additional requirement for service providers) requires maintaining detailed documentation of the cryptographic architecture. This includes details of all algorithms, protocols, key lengths, cryptoperiods, key usage descriptions, and key inventory management.",
    "tip": "Service providers must maintain documented cryptographic architecture including algorithms, keys, and cryptoperiods.",
    "v4_ref": "PCI DSS Req 3.5.1.1"
  },
  {
    "id": 116,
    "question": "What transaction volume threshold typically classifies a merchant as a Level 1 Merchant under payment card brand operating rules?",
    "options": [
      "Over 1,000,000 card transactions processed annually across combined point-of-sale retail and telephone order processing channels.",
      "Over 2,500,000 e-commerce transactions processed annually through an outsourced payment application or hosted iframe solution.",
      "Over 5,000,000 card transactions processed annually regardless of payment brand, channel environment, or transaction currency.",
      "Over 6,000,000 card transactions processed annually across all channels, or any merchant designated as Level 1 by an acquirer."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "PCI DSS Foundations & Roles",
    "explanation": "Card brand operating rules classify merchants processing over 6,000,000 transactions per year across all channels as Level 1 Merchants, requiring an annual on-site Report on Compliance (ROC) conducted by a QSA or ISA, along with quarterly ASV scans.",
    "tip": "Level 1 Merchant threshold: over 6 million transactions annually across all channels (or designated by brand/acquirer).",
    "v4_ref": "Payment Brand Operating Rules & PCI SSC Scoping"
  },
  {
    "id": 117,
    "question": "Can an e-commerce merchant processing 500,000 transactions annually validate PCI DSS compliance using a Self-Assessment Questionnaire (SAQ)?",
    "options": [
      "Yes, merchants in Levels 2, 3, and 4 are generally permitted by acquirers to validate via an applicable SAQ and ASV scans.",
      "No, all e-commerce merchants must complete an on-site assessment conducted by an independent Qualified Security Assessor.",
      "Yes, but only if the merchant processes transactions exclusively through validated Point-to-Point Encryption architectures.",
      "No, Self-Assessment Questionnaires were retired under PCI DSS v4.0 and replaced with mandatory external third-party audits."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "SAQs & Assessment Validation",
    "explanation": "Merchants processing under 6 million transactions annually are classified as Level 2, 3, or 4 by the card brands. Acquirers generally permit these merchants to validate compliance using the applicable Self-Assessment Questionnaire (such as SAQ A or SAQ A-EP) paired with quarterly ASV scans.",
    "tip": "Level 2, 3, and 4 merchants are generally eligible to validate via SAQs and quarterly ASV scans as directed by their acquirer.",
    "v4_ref": "Payment Brand Validation Guidelines & SAQ Instructions"
  },
  {
    "id": 118,
    "question": "What is the primary role and qualification of a Payment Card Industry Forensic Investigator (PFI)?",
    "options": [
      "An internal software security engineer certified by an acquirer to conduct static application vulnerability code reviews.",
      "An independent, specialized digital forensics firm accredited by the PCI SSC to investigate suspected payment card breaches.",
      "A sworn federal law enforcement investigator designated to execute criminal warrants against fraudulent merchant operations.",
      "A licensed legal compliance attorney specialized in representing payment entities during payment brand sanction hearings."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "PCI DSS Foundations & Roles",
    "explanation": "A Payment Card Industry Forensic Investigator (PFI) is an independent forensic investigation company formally accredited by the PCI SSC to conduct digital forensics investigations when an entity has experienced a suspected compromise of cardholder data.",
    "tip": "PFIs are specialized, PCI SSC-accredited forensic firms authorized to investigate card data breaches.",
    "v4_ref": "PCI SSC PFI Program Guide"
  },
  {
    "id": 119,
    "question": "When an entity suspects an active compromise of cardholder data, what is the critical forensic evidence preservation rule regarding server power?",
    "options": [
      "Immediately power off and unplug affected servers to prevent ongoing exfiltration of sensitive cardholder account records.",
      "Reboot the server into single-user recovery mode and immediately execute operating system security patch installation scripts.",
      "Do not reboot or power down the system; isolate it from the network while preserving volatile memory for forensic triage.",
      "Re-image the server from baseline master images immediately while storing disk partition copies in offline archive storage."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Rebooting or powering off a compromised machine destroys volatile system memory (RAM), which contains critical artifacts such as running malware, active socket connections, and encryption keys. The correct procedure is to logically isolate the host from the network while maintaining power to allow volatile memory capture.",
    "tip": "Never reboot or power down a compromised server during triage; isolate from the network to preserve RAM.",
    "v4_ref": "PCI Forensic Investigation Guidance & Req 12.10"
  },
  {
    "id": 120,
    "question": "What is the primary scope and purpose of the PCI Mobile Payments on COTS (MPoC) standard?",
    "options": [
      "Mandating biometric fingerprint scanners for consumer smartphones participating in e-commerce browser checkout transactions.",
      "Regulating internal software development lifecycles for mobile banking applications executing automated ACH fund transfers.",
      "Governing physical tamper-detection mechanisms deployed within traditional dedicated attended point-of-sale retail terminals.",
      "Governing modular payment solutions that accept contactless transactions and PIN entry on commercial off-the-shelf devices."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Other PCI Standards (P2PE, PTS, SSF, PIN)",
    "explanation": "The PCI Mobile Payments on COTS (MPoC) standard is a modular standard governing mobile payment solutions that accept contactless transactions and/or PIN entry directly on commercial off-the-shelf (COTS) devices such as consumer smartphones and tablets.",
    "tip": "MPoC governs contactless card acceptance and PIN entry directly on commercial off-the-shelf (COTS) mobile devices.",
    "v4_ref": "PCI MPoC Standard Overview"
  },
  {
    "id": 121,
    "question": "What is the primary security role of an Encrypting PIN Pad (EPP) under the PCI PTS standard?",
    "options": [
      "Capturing cardholder PINs and immediately encrypting them within a secure cryptographic module before transmission to the POS.",
      "Storing cardholder PIN blocks in unencrypted local storage to support offline payment processing during communication outages.",
      "Validating cardholder account balances directly against card brand networks without passing data through local POS applications.",
      "Generating dynamic card verification values for magnetic stripe presentations during fallback swipe transactions at checkout."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Other PCI Standards (P2PE, PTS, SSF, PIN)",
    "explanation": "An Encrypting PIN Pad (EPP) is a secure, tamper-responsive hardware device certified under the PCI PTS standard to capture cardholder PINs and immediately encrypt the PIN block using strong cryptography before the data leaves the secure physical boundary.",
    "tip": "EPPs capture and immediately encrypt PIN blocks inside a tamper-resistant hardware module.",
    "v4_ref": "PCI PTS Device Security Requirements"
  },
  {
    "id": 122,
    "question": "Why does PCI DSS v4.0 use the term 'Network Security Controls (NSCs)' instead of 'Firewalls'?",
    "options": [
      "To restrict compliance obligations strictly to hardware appliances deployed at the physical perimeter of enterprise data centers.",
      "To encompass modern traffic filtering controls such as cloud security groups, virtual firewalls, and software-defined policies.",
      "To eliminate network filtering requirements for containerized environments running microservices in serverless cloud deployments.",
      "To indicate that network segmentation is no longer an acceptable method for reducing the scope of the cardholder data environment."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 1 & 2: Network & Configurations",
    "explanation": "PCI DSS v4.0 replaced 'firewalls and routers' with 'Network Security Controls (NSCs)' to reflect modern, diverse architectures including cloud virtual networks, security groups, software-defined networks, and container network policies that perform traffic filtering beyond hardware firewalls.",
    "tip": "Network Security Controls (NSCs) includes cloud security groups, virtual firewalls, and SDN policies.",
    "v4_ref": "PCI DSS Req 1 Overview"
  },
  {
    "id": 123,
    "question": "Under Requirement 1.4.2, what network security control applies to personnel connecting to the CDE from mobile or remote devices?",
    "options": [
      "Remote devices are exempt from firewall controls provided personnel connect over multi-factor authenticated remote desktop sessions.",
      "Remote devices must disable local operating system protections to permit corporate network monitoring agents complete inspection.",
      "Client-based Network Security Controls such as personal firewalls must be installed, active, and unalterable by remote personnel.",
      "Remote devices must be physically connected to an enterprise hardware firewall deployed at the employee's residential location."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 1 & 2: Network & Configurations",
    "explanation": "Requirement 1.4.2 mandates that client-based Network Security Controls (such as host-based firewalls) must be installed, operational, and configured such that they cannot be disabled by users on all mobile and employee-owned devices that connect to the CDE.",
    "tip": "Requirement 1.4.2 mandates client-based NSCs (personal/host firewalls) on mobile/remote devices connecting to the CDE.",
    "v4_ref": "PCI DSS Req 1.4.2"
  },
  {
    "id": 124,
    "question": "Under Requirement 2.2.4, what configuration standard must be followed regarding system management parameters?",
    "options": [
      "System management parameters must permit unauthenticated remote administration from any internal host within the corporate network.",
      "Default vendor cryptographic keys and account passwords must be retained for six months following initial production deployment.",
      "Management protocols must transmit operational telemetry in cleartext to maximize compatibility with legacy syslog collectors.",
      "Configuration standards must define system management parameters to prevent insecure configurations before network deployment."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 1 & 2: Network & Configurations",
    "explanation": "Requirement 2.2.4 requires that system configuration standards define system management parameters to prevent insecure configurations, ensuring that only necessary and secure parameters are enabled, default credentials are removed, and settings are validated prior to connection to a network.",
    "tip": "System management parameters must be hardened and defined in configuration standards prior to production deployment.",
    "v4_ref": "PCI DSS Req 2.2.4"
  },
  {
    "id": 125,
    "question": "Under Requirement 3.4.2, what technical controls must be deployed regarding the unauthorized copy or relocation of Primary Account Numbers (PANs)?",
    "options": [
      "Technical controls must prevent unauthorized copying or moving of PANs when personnel perform remote access or use mobile devices.",
      "Technical controls must permit unencrypted clipboard copying across virtual desktops provided that remote user sessions expire hourly.",
      "Technical controls are only mandated for physical hard-copy printouts and do not apply to digital clipboard or local file transfers.",
      "Technical controls must automatically transmit all copied PAN strings to a central compliance log repository in unmasked cleartext."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 3 & 4: Data Protection & Encryption",
    "explanation": "Requirement 3.4.2 mandates technical controls to prevent the unauthorized copying or relocation of PANs when personnel use remote access or personal devices (e.g. disabling local clipboard copy/paste, screen captures, or printing), unless explicitly approved for documented business needs.",
    "tip": "Requirement 3.4.2 requires technical controls preventing unauthorized copying or relocation of PAN during remote access.",
    "v4_ref": "PCI DSS v4.0 Req 3.4.2"
  },
  {
    "id": 126,
    "question": "If an organization stores BOTH a truncated version of a PAN and a hashed version of the same PAN in the same environment, how does PCI DSS treat the data?",
    "options": [
      "Both datasets remain compliant and out of scope because one-way cryptographic hashing is irreversible under standard conditions.",
      "The PAN is considered recoverable because an attacker possessing both elements can easily brute-force the remaining middle digits.",
      "Truncation supersedes hashing, meaning only the truncated representation is subject to PCI DSS Requirement 3 storage limitations.",
      "The entity qualifies for scope reduction provided the hash digest and truncated PAN reside on separate logical storage partitions."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 3 & 4: Data Protection & Encryption",
    "explanation": "Under PCI DSS guidance for Requirement 3.5.1, storing both a truncated PAN (e.g. BIN and last four) and a hashed PAN in the same environment renders the data recoverable. An attacker can easily calculate hashes for the unknown middle digits (only 10^6 combinations) and match the stored hash, defeating the protection.",
    "tip": "Storing both hashed PAN and truncated PAN in the same environment makes the full PAN easily recoverable.",
    "v4_ref": "PCI DSS Req 3.5.1 Guidance"
  },
  {
    "id": 127,
    "question": "Under Requirement 4.2.1, how must sensitive account data be protected when transmitted over open, public networks?",
    "options": [
      "Account data may be transmitted in cleartext provided internal network switches utilize proprietary virtual routing protocols.",
      "Account data only requires transit encryption if network transmissions traverse international borders or third-party networks.",
      "Account data must be protected using strong cryptography and secure protocols such as TLS 1.2 or TLS 1.3 with approved ciphers.",
      "Account data may rely solely on base64 encoding combined with URL obfuscation to prevent packet inspection on public backbones."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 3 & 4: Data Protection & Encryption",
    "explanation": "Requirement 4.2.1 mandates that strong cryptography and secure transit protocols (e.g., TLS 1.2 or TLS 1.3 configured with secure cipher suites, SSH, IPsec) must be used to safeguard sensitive account data during transmission over open, public networks.",
    "tip": "Transmissions of cardholder data across open, public networks must be protected using strong cryptography.",
    "v4_ref": "PCI DSS Req 4.2.1"
  },
  {
    "id": 128,
    "question": "What is the primary difference between Static Application Security Testing (SAST) and Dynamic Application Security Testing (DAST) under Requirement 6.3.2?",
    "options": [
      "SAST evaluates web applications during live runtime execution, whereas DAST inspects uncompiled source code in code repositories.",
      "SAST is used exclusively for third-party commercial software, whereas DAST is restricted to internally developed bespoke software.",
      "SAST evaluates network perimeter firewall rule sets, whereas DAST scans internal database tables for unencrypted cardholder data.",
      "SAST analyzes source or binary code from the inside out without running it, whereas DAST tests running applications from outside."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 5 & 6: Vulnerability & Secure Systems",
    "explanation": "SAST (Static Application Security Testing) evaluates uncompiled source code or compiled binary code from the inside out without executing the application, identifying security flaws early in development. DAST (Dynamic Application Security Testing) evaluates the running application from the outside in during runtime execution.",
    "tip": "SAST = white-box static code review without execution; DAST = black-box dynamic runtime testing of executing software.",
    "v4_ref": "PCI DSS Req 6.3.2 Guidance"
  },
  {
    "id": 129,
    "question": "Under Requirement 6.4.2, what automated technical solution must be deployed for public-facing web applications to detect and prevent attacks?",
    "options": [
      "A Web Application Firewall (WAF) or automated technical solution that continually inspects traffic to prevent web-based attacks.",
      "An intrusion detection system operating in passive promiscuous mode without the capability to block or drop hostile HTTP traffic.",
      "A reverse proxy server configured solely to cache static media assets and execute round-robin network connection load balancing.",
      "A host-based file integrity monitoring agent configured to scan web server file system modifications on a seven-day interval."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 5 & 6: Vulnerability & Secure Systems",
    "explanation": "Requirement 6.4.2 mandates that for public-facing web applications, an automated technical solution (such as a Web Application Firewall) must be continually detecting and preventing web-based attacks. Under v4.0.1, automated technical solutions are required (manual application vulnerability reviews are no longer an ongoing alternative to WAFs).",
    "tip": "Requirement 6.4.2 requires an automated technical solution (such as a WAF) for public-facing web applications.",
    "v4_ref": "PCI DSS Req 6.4.2"
  },
  {
    "id": 130,
    "question": "Under Requirement 10.2.1, which of the following administrative actions must generate an audit log record?",
    "options": [
      "An administrator browsing public marketing pages on the corporate external website during scheduled business hours.",
      "Creation, modification, or deletion of user accounts, privilege elevations, or changes to audit logging parameters.",
      "Routine automatic screen locking triggered by operating system inactivity timeout mechanisms on user workstations.",
      "Standard non-administrative user navigation across authenticated customer self-service billing and support portals."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 9 & 10: Physical & Logging",
    "explanation": "Requirement 10.2.1 requires audit logs to record all administrative actions, including user identification and authentication actions, creation, modification, or deletion of user accounts, elevation of privileges, and any changes or stops to audit logging mechanisms.",
    "tip": "Requirement 10.2.1 requires logging all administrative actions, account provisioning, privilege changes, and log config edits.",
    "v4_ref": "PCI DSS Req 10.2.1"
  },
  {
    "id": 131,
    "question": "Under Requirement 10.7, how must organizations respond to audit log monitoring failures and suspicious anomalies?",
    "options": [
      "Log review findings are compiled into an annual risk register and presented to executive management during budget reviews.",
      "Suspicious log events are purged from central SIEM systems after seven days to conserve high-performance database storage.",
      "Failures of critical security controls and suspicious anomalies detected in logs must be investigated and addressed promptly.",
      "Security anomalies only require formal incident responses if they cause confirmed payment processor service interruptions."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 9 & 10: Physical & Logging",
    "explanation": "Requirement 10.7 requires that failures of critical security control systems and suspicious anomalies detected during log monitoring or review are investigated and addressed promptly according to documented incident response procedures.",
    "tip": "Requirement 10.7 requires prompt investigation and response when log monitoring reveals anomalies or control failures.",
    "v4_ref": "PCI DSS Req 10.7"
  },
  {
    "id": 132,
    "question": "What is the required standard for an Approved Scanning Vendor (ASV) external vulnerability scan report to achieve a passing status under Requirement 11.3.2?",
    "options": [
      "The scan must identify zero open network ports across all external Internet-facing IP addresses belonging to the entity.",
      "The scan must confirm that external firewalls block all inbound Internet Control Message Protocol (ICMP) echo ping requests.",
      "The scan must verify that no third-party JavaScript libraries are embedded within customer checkout payment input web forms.",
      "The scan report must contain no vulnerabilities with a CVSS score of 4.0 or higher and no automatic scan failure components."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Under Requirement 11.3.2 and the ASV Program Guide, an external scan passes only when there are no vulnerabilities present with a Common Vulnerability Scoring System (CVSS) base score of 4.0 or higher (Medium, High, Critical), and no automatic failure items (e.g., SQL injection, directory traversal, default accounts).",
    "tip": "ASV scan passing threshold: no vulnerabilities with CVSS score >= 4.0 and no automatic failure items.",
    "v4_ref": "PCI DSS Req 11.3.2 & ASV Program Guide"
  },
  {
    "id": 133,
    "question": "When an organization conducts penetration testing under Requirement 11.4, which architectural layers must be included in the testing scope?",
    "options": [
      "Both the application layer (APIs, web applications) and the network layer (operating systems, network protocols, perimeters).",
      "Only the network layer, because application vulnerabilities are evaluated exclusively through automated static code scanners.",
      "Only the external perimeter firewall interfaces, excluding internal network segmentation controls and internal database tiers.",
      "Only custom-developed software components, excluding commercial off-the-shelf operating systems and physical network switches."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 11.4 mandates that penetration testing include both network-layer penetration testing (operating systems, network protocols, routing, firewalls) and application-layer penetration testing (APIs, web applications, business logic), covering both internal and external perimeters.",
    "tip": "Penetration testing must cover BOTH network-layer and application-layer components externally and internally.",
    "v4_ref": "PCI DSS Req 11.4"
  },
  {
    "id": 134,
    "question": "Under Requirement 11.5.1, what is the primary operational role of File Integrity Monitoring (FIM) or change-detection mechanisms?",
    "options": [
      "To automatically compress and archive older system event logs into long-term immutable cloud storage repositories.",
      "To monitor critical system files, configuration files, and application binaries, alerting on unauthorized changes.",
      "To inspect outbound network traffic in real time and block unauthorized cardholder data exfiltration attempts.",
      "To identify and uninstall unapproved end-user software applications installed on employee corporate workstations."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 11.5.1 mandates deploying a change-detection mechanism (such as File Integrity Monitoring / FIM) to alert personnel to unauthorized modifications (additions, modifications, and deletions) of critical operating system files, configuration files, and application libraries at least weekly.",
    "tip": "FIM monitors critical operating system and configuration files to detect and alert on unauthorized modifications.",
    "v4_ref": "PCI DSS Req 11.5.1"
  },
  {
    "id": 135,
    "question": "An e-commerce merchant uses a payment gateway's hosted fields solution where credit card input fields (iframes) are injected into the checkout page directly from the payment processor. The merchant's web server hosts the checkout page but never receives or processes card data. Which Self-Assessment Questionnaire (SAQ) applies?",
    "options": [
      "SAQ A-EP, because the merchant web server delivers the parent checkout page that executes the payment gateway integration.",
      "SAQ B-IP, because the customer transaction involves browser-based IP communication directly with an external payment gateway.",
      "SAQ A, because cardholder data capture is fully outsourced and merchant servers never process, store, or transmit card data.",
      "SAQ C-VT, because customer billing information is processed through an online virtual terminal interface hosted by a vendor."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "SAQs & Assessment Validation",
    "explanation": "SAQ A applies to e-commerce merchants whose payment functions are completely outsourced to a PCI DSS compliant third-party payment processor, and whose website uses hosted fields or iframes to capture payment credentials directly in the consumer's browser without touching merchant servers.",
    "tip": "Hosted iframe/hosted fields checkout where merchant servers never touch card data validates using SAQ A.",
    "v4_ref": "PCI SSC SAQ A Instructions"
  },
  {
    "id": 136,
    "question": "An e-commerce merchant creates a checkout form on their own website. When the customer clicks 'Pay Now', a JavaScript snippet on the merchant's page collects the cardholder data and transmits it directly from the consumer's browser to the payment processor's API (Direct Post / API). Which SAQ must this merchant complete?",
    "options": [
      "SAQ A, because cardholder data transmits directly from the browser to the payment processor without traversing merchant servers.",
      "SAQ C, because the merchant operates an isolated web payment application connected via dedicated virtual private network tunnels.",
      "SAQ P2PE, because the merchant website utilizes strong TLS encryption to secure payment credentials in transit to the gateway.",
      "SAQ A-EP, because the merchant hosts the payment page that can directly impact the security of the consumer payment transaction."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "SAQs & Assessment Validation",
    "explanation": "SAQ A-EP applies to e-commerce merchants whose website creates or controls the payment form and directs the consumer's browser to post cardholder data directly to the payment gateway (Direct Post or API). Because the merchant's server delivers the code generating the form, it can impact transaction security.",
    "tip": "Merchant hosts the payment form or script directing payment to third party = SAQ A-EP (e-commerce partially outsourced).",
    "v4_ref": "PCI SSC SAQ A-EP Instructions"
  },
  {
    "id": 137,
    "question": "A retail clothing store processes transactions exclusively using standalone, PTS-approved payment terminals connected to the merchant's internet router via Ethernet cables. The merchant does not store cardholder data electronically. Which SAQ should they use?",
    "options": [
      "SAQ B-IP, because the merchant uses standalone PTS-approved point-of-interaction terminals connected via an IP network connection.",
      "SAQ B, because standalone payment terminals are deployed in a face-to-face retail environment with no electronic card data storage.",
      "SAQ C, because point-of-sale terminals connect to an internal IP local area network containing back-office inventory workstations.",
      "SAQ P2PE, because standalone payment terminals provide hardware encryption of payment data prior to IP network transmission routes."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "SAQs & Assessment Validation",
    "explanation": "SAQ B-IP is designed specifically for merchants processing transactions exclusively using standalone, PTS-approved Point of Interaction (POI) devices that connect to the processor via an IP network connection (Ethernet or cellular), with no electronic card data storage.",
    "tip": "Standalone PTS terminals connected via IP/Ethernet = SAQ B-IP. Dial-up standalone terminals = SAQ B.",
    "v4_ref": "PCI SSC SAQ B-IP Instructions"
  },
  {
    "id": 138,
    "question": "A call center takes customer credit card orders over the phone. The call center operators manually type cardholder numbers into a web browser portal provided by a compliant payment processor on dedicated workstations. Which SAQ applies?",
    "options": [
      "SAQ A, because the merchant outsources all cardholder data processing to a PCI DSS compliant third-party payment processor.",
      "SAQ C-VT, because personnel manually enter card transactions into an isolated web-based third-party virtual terminal interface.",
      "SAQ B-IP, because operator workstations connect to the third-party payment processor over an enterprise IP network connection.",
      "SAQ D-Merchant, because telephone call centers capturing cardholder data are ineligible for simplified validation assessments."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "SAQs & Assessment Validation",
    "explanation": "SAQ C-VT applies to merchants who manually enter a single transaction at a time via a keyboard into an isolated web-based virtual terminal solution hosted by a PCI DSS compliant third-party service provider, from workstations with no electronic card data storage.",
    "tip": "Manual keyboard entry into a third-party hosted virtual terminal = SAQ C-VT.",
    "v4_ref": "PCI SSC SAQ C-VT Instructions"
  },
  {
    "id": 139,
    "question": "A company cannot implement the required 12-character password on a legacy mainframe system due to architectural character limits. Which document must be completed to validate an alternative security control under the Defined Approach?",
    "options": [
      "A Targeted Risk Analysis documenting operational threat assessments and mitigating technical controls for legacy systems.",
      "A Customized Approach Objective Matrix demonstrating equivalence to the defined password length requirement in v4.0.",
      "A Compensating Controls Worksheet documenting legitimate constraints, risk mitigation, and validation of the control.",
      "A formal Attestation of Exemption approved and signed by the executive leadership of the merchant's acquiring bank."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Compensating Controls & v4.0 Customized Approach",
    "explanation": "Under the Defined Approach, when an entity cannot meet a requirement exactly as stated due to a legitimate technical or documented business constraint, they must complete a Compensating Controls Worksheet (CCW) under Appendix C detailing constraints, risk, compensating controls, validation, and maintenance.",
    "tip": "Defined Approach with technical constraints uses Compensating Controls Worksheet (CCW) under Appendix C.",
    "v4_ref": "PCI DSS Appendix C"
  },
  {
    "id": 140,
    "question": "Under PCI DSS v4.0 Requirement 12.3.1, when an entity defines its own frequency for requirements that state 'periodically' (such as periodic POI device inspections or malware evaluations), what must be completed?",
    "options": [
      "A Compensating Controls Worksheet demonstrating technical constraints preventing adherence to industry standard intervals.",
      "A formal compliance waiver granted by each participating payment card brand and countersigned by the acquiring processor.",
      "A third-party penetration testing engagement verifying that custom operational intervals do not introduce vulnerabilities.",
      "A documented Targeted Risk Analysis establishing and justifying the defined frequency based on asset risk and threat factors."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 12.3.1 mandates that whenever an entity defines its own frequency for a PCI DSS requirement that specifies an activity must be performed 'periodically', the entity must perform and document a formal Targeted Risk Analysis (TRA) establishing and justifying that frequency.",
    "tip": "Custom frequencies for 'periodically' performed tasks require a formal Targeted Risk Analysis (TRA) under Req 12.3.1.",
    "v4_ref": "PCI DSS v4.0 Req 12.3.1"
  },
  {
    "id": 141,
    "question": "What specific type of cyberattack are PCI DSS v4.0 Requirements 6.4.3 and 11.6.1 designed to detect and prevent?",
    "options": [
      "Client-side digital skimming and formjacking attacks that tamper with scripts executed in consumer checkout browsers.",
      "Distributed Denial of Service (DDoS) amplification attacks targeting edge DNS servers and payment gateway entry points.",
      "Server-side Structured Query Language (SQL) injection attacks attempting to extract unencrypted primary account numbers.",
      "Man-in-the-Middle (MitM) packet sniffing attacks intercepting unencrypted wireless payment traffic within store premises."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 5 & 6: Vulnerability & Secure Systems",
    "explanation": "Requirements 6.4.3 (authorizing and verifying script integrity on payment pages) and 11.6.1 (detecting unauthorized changes to HTTP headers and payment page contents) were introduced specifically to combat client-side digital skimming and Magecart-style formjacking attacks that steal payment credentials directly from consumer browsers.",
    "tip": "Requirements 6.4.3 and 11.6.1 defend against client-side e-skimming (Magecart/formjacking) attacks in consumer browsers.",
    "v4_ref": "PCI DSS v4.0 Req 6.4.3 & 11.6.1"
  },
  {
    "id": 142,
    "question": "Under Requirement 6.4.3, which mechanism is explicitly recognized to confirm that scripts loaded into a consumer payment page remain authentic and authorized?",
    "options": [
      "Deploying an intrusion detection system to analyze packet headers transmitted between internal web servers and database tiers.",
      "Implementing Subresource Integrity (SRI) attributes, Content Security Policies (CSP), or automated script monitoring tools.",
      "Enforcing multi-factor authentication for retail cashiers operating electronic point-of-sale terminals in retail branch stores.",
      "Restricting web server administrative access exclusively to secure shell sessions authenticated with asymmetric SSH key pairs."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 5 & 6: Vulnerability & Secure Systems",
    "explanation": "Requirement 6.4.3 guidance lists Subresource Integrity (SRI) cryptographic hash attributes, Content Security Policy (CSP) directives, and automated script monitoring and integrity verification tools as valid methods to ensure payment page scripts are authorized and have not been tampered with.",
    "tip": "Script integrity under Req 6.4.3 is verified via SRI hashes, CSP headers, or automated script monitoring tools.",
    "v4_ref": "PCI DSS Req 6.4.3 Guidance"
  },
  {
    "id": 143,
    "question": "Under the Cloud Shared Responsibility Model (Requirement 12.8.5), which security responsibilities typically belong solely to the customer in an Infrastructure as a Service (IaaS) environment?",
    "options": [
      "Physical security controls protecting the cloud service provider's data center perimeter, generator rooms, and server cages.",
      "Hardware virtualization hypervisor configuration, firmware patch management, and maintenance of physical storage SAN arrays.",
      "Guest operating system hardening, application security, patch management, security group rules, and user access control.",
      "Environmental temperature management, biometric access controls to physical server racks, and disposal of physical drives."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "In an IaaS cloud model, the cloud provider secures the underlying physical data center, physical hardware, and virtualization hypervisor. The customer is responsible for everything inside their guest instance: guest OS hardening, OS patching, application security, cloud firewall rules (security groups), and IAM.",
    "tip": "In IaaS, customer controls the guest OS, patches, firewall rules (security groups), applications, and access control.",
    "v4_ref": "PCI DSS Cloud Guidance & Req 12.8.5"
  },
  {
    "id": 144,
    "question": "Under Requirement 12.8.5, what document must an entity maintain to establish exactly which PCI DSS requirements are met by a Third-Party Service Provider (TPSP) versus the customer?",
    "options": [
      "A vendor Master Services Agreement (MSA) containing standard business indemnification and commercial warranty clauses.",
      "An Approved Scanning Vendor (ASV) executive scan report confirming no high-severity vulnerabilities on perimeter firewalls.",
      "A corporate business continuity and disaster recovery plan approved by the board of directors and senior management.",
      "A documented PCI DSS Responsibility Matrix detailing requirement allocations between the entity and the service provider."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 12.8.5 mandates that entities maintain information about which PCI DSS requirements are managed by each Third-Party Service Provider, which are managed by the entity, and which are shared responsibilities, typically formalized via a documented PCI DSS Responsibility Matrix.",
    "tip": "Requirement 12.8.5 mandates maintaining a documented PCI DSS Responsibility Matrix for all third-party service providers.",
    "v4_ref": "PCI DSS Req 12.8.5"
  },
  {
    "id": 145,
    "question": "Under Requirement 9.5.2, what essential training must personnel with access to Point of Interaction (POI) devices receive?",
    "options": [
      "Verifying the identity of third-party technicians before granting device access and recognizing signs of tampering or skimmers.",
      "Disassembling terminal enclosures to repair damaged internal circuitry and replacing depleted cryptographic battery cells.",
      "Configuring custom packet filtering rules on local routers and testing failover virtual private network tunnel connections.",
      "Calculating cryptographic hash values of terminal firmware binaries and uploading integrity records to acquirer databases."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 9 & 10: Physical & Logging",
    "explanation": "Requirement 9.5.2 requires personnel with access to POI devices to be trained to: 1) Verify the identity of third-party repair personnel or technicians before granting access, 2) Be aware of suspicious behavior around devices, and 3) Report suspicious behavior and device tampering immediately.",
    "tip": "POI personnel training covers verifying technician identities, recognizing tampering/skimmers, and immediate reporting.",
    "v4_ref": "PCI DSS Req 9.5.2"
  },
  {
    "id": 146,
    "question": "Under Requirement 9.5.1, what elements must be included in an up-to-date Point of Interaction (POI) device inventory?",
    "options": [
      "The purchase price, vendor warranty expiration date, and depreciation schedule for each deployed payment terminal.",
      "The make, model, physical location, and serial number or other unique identifier for each deployed payment device.",
      "The daily transaction volume, merchant discount rate, and settlement bank account details associated with each terminal.",
      "The names, home addresses, and personal emergency contact numbers of all cashiers assigned to each payment register."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 9 & 10: Physical & Logging",
    "explanation": "Requirement 9.5.1 mandates maintaining an up-to-date inventory of all POI devices. The inventory must include: 1) Make and model of the device, 2) Location of the device (e.g., register number, lane, or retail store), and 3) Serial number or other unique method of device identification.",
    "tip": "POI inventory required elements: make, model, physical location, and serial number / unique ID.",
    "v4_ref": "PCI DSS Req 9.5.1"
  },
  {
    "id": 147,
    "question": "Under PCI DSS Requirement 10.3.3, what data element must NEVER be written to audit logs or system diagnostic logs under any circumstance?",
    "options": [
      "The date, time stamp, and source IP address associated with an administrative login attempt on a CDE jump server.",
      "The success or failure status and user ID associated with an elevation of privileges on an authentication server.",
      "Sensitive Authentication Data (SAD) and unencrypted or unmasked Primary Account Numbers (PANs) under any circumstances.",
      "The names of affected applications, system processes, or file paths impacted by critical system configuration updates."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 9 & 10: Physical & Logging",
    "explanation": "Requirement 10.3.3 strictly prohibits recording Sensitive Authentication Data (SAD) or unprotected Primary Account Numbers (PANs) in audit logs. Logging cleartext cardholder account data or authentication elements creates severe security exposure.",
    "tip": "SAD and unmasked PAN must never be written to audit logs, debug logs, or error traces under Req 10.3.3.",
    "v4_ref": "PCI DSS Req 10.3.3"
  },
  {
    "id": 148,
    "question": "Why does PCI DSS Requirement 10.6 mandate that all critical system clocks be synchronized using Network Time Protocol (NTP)?",
    "options": [
      "To ensure that automated database backup jobs initiate at the exact same minute across all global cloud hosting regions.",
      "To prevent hardware system performance degradation caused by unsynchronized operating system clock oscillator frequencies.",
      "To synchronize employee physical access control badge swipes with corporate payroll and time-tracking accounting software.",
      "To establish consistent, accurate timestamps across all systems to facilitate log correlation and incident reconstruction."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 9 & 10: Physical & Logging",
    "explanation": "Requirement 10.6 mandates time synchronization via NTP across all critical systems to ensure consistent timestamps across all logs. This is critical during forensic investigations to establish an accurate sequence of events and reconstruct the attack timeline across multiple hosts.",
    "tip": "NTP clock synchronization ensures consistent timestamps across all systems for forensic event correlation.",
    "v4_ref": "PCI DSS Req 10.6"
  },
  {
    "id": 149,
    "question": "Under Requirement 9.4.4, how must physical media containing cardholder data be protected when transported outside the facility?",
    "options": [
      "Sent via a secure courier or other delivery method that can be accurately tracked and requires signed confirmation of delivery.",
      "Shipped via standard untracked postal services provided the media is enclosed in tamper-evident plastic security envelopes.",
      "Transported by an authorized employee using personal vehicles provided the transit occurs during daylight business hours.",
      "Dispatched via standard commercial freight without tracking provided the recipient verbally confirms arrival via telephone."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 9 & 10: Physical & Logging",
    "explanation": "Requirement 9.4.4 requires that physical media containing cardholder data transported outside the facility is sent via a secure courier or other delivery method that can be accurately tracked, requiring documented chain of custody and signed proof of delivery.",
    "tip": "Off-site transport of media with CHD requires secure courier, tracking, and signed confirmation of delivery.",
    "v4_ref": "PCI DSS Req 9.4.4"
  },
  {
    "id": 150,
    "question": "Under Requirement 3.5.1, when Primary Account Numbers (PANs) are stored on electronic backup media, what protection must be applied?",
    "options": [
      "Backup media is completely exempt from encryption requirements provided it is stored within a locked off-site archive facility.",
      "PANs stored on backup media must be rendered unreadable using strong cryptography and associated key management mechanisms.",
      "Backup media only requires truncation of the first six digits of the PAN while storing the remaining digits in cleartext.",
      "Backup media must be wiped and overwritten every thirty days to prevent long-term exposure of archival payment records."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 3 & 4: Data Protection & Encryption",
    "explanation": "Requirement 3.5.1 mandates that Primary Account Numbers (PANs) stored electronically anywhere—including on backup tapes, off-site disaster recovery media, and archival media—must be rendered unreadable using strong cryptography with proper key management.",
    "tip": "Stored PAN on all electronic media, including backup tapes and DR archives, must be rendered unreadable using cryptography.",
    "v4_ref": "PCI DSS Req 3.5.1"
  },
  {
    "id": 151,
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "question": "After penetration testing identifies exploitable security vulnerabilities in the CDE, what action is required under Requirement 11.4.3?",
    "options": [
      "Remediate identified vulnerabilities according to risk ranking and repeat penetration testing to confirm successful resolution.",
      "Document the identified vulnerabilities within the risk register and schedule remediation during the subsequent annual test cycle.",
      "Apply virtual patching controls at the perimeter firewall and obtain sign-off from the qualified assessor without active re-testing.",
      "Implement compensating controls for all critical findings and submit an updated targeted risk analysis to the acquiring processor."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "explanation": "Requirement 11.4.3 mandates that exploitable vulnerabilities identified during penetration testing are remediated according to risk ranking, and testing is repeated until vulnerabilities are verified as resolved.",
    "tip": "Vulnerabilities found during pen testing must be remediated AND re-tested to verify resolution.",
    "v4_ref": "PCI DSS Req 11.4.3"
  },
  {
    "id": 152,
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "question": "What event triggers the requirement to execute an unscheduled penetration test outside the normal annual cycle under Requirement 11.4?",
    "options": [
      "Any discovery of a critical vulnerability during quarterly automated internal network vulnerability scans.",
      "Any significant infrastructure or application change, such as network topology modifications or new system integrations.",
      "Any administrative transition involving designated personnel in the internal information security governance office.",
      "Any quarterly update to merchant acquiring processing rules or international payment card brand compliance standards."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "explanation": "Requirement 11.4 mandates that penetration testing be performed at least once every 12 months AND after any significant infrastructure or application change (e.g., operating system upgrades, subnetwork additions, new server deployments).",
    "tip": "Pen tests are required annually AND after any significant infrastructure or application changes.",
    "v4_ref": "PCI DSS Req 11.4"
  },
  {
    "id": 153,
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "question": "Which operational element is explicitly required to be included in an entity's Incident Response Plan under Requirement 12.10.1?",
    "options": [
      "Documented authorization allowing designated executives to unilaterally suppress external breach notifications.",
      "Mandatory installation guidelines for deploying endpoint monitoring agents on unmanaged personal contractor devices.",
      "Specific business recovery and continuity procedures, including defined containment and brand notification protocols.",
      "Automated workflows to isolate and permanently decommission any production server generating suspicious log events."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "explanation": "Requirement 12.10.1 specifies that incident response plans must include: designated roles/responsibilities, communication strategies, containment/mitigation steps, business recovery/continuity procedures, forensic data preservation, and mandatory notifications to payment brands and acquirers.",
    "tip": "Incident Response Plans must include roles, containment, recovery, and payment brand notification procedures.",
    "v4_ref": "PCI DSS Req 12.10.1"
  },
  {
    "id": 154,
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "question": "Under Requirement 12.10.5, which monitoring mechanism must be incorporated into an incident response process to detect compromises?",
    "options": [
      "Periodic manual audits of workstation screen saver settings conducted quarterly across all administrative departments.",
      "Weekly review of physical badge swipe logs across exterior corporate building doors and customer waiting areas.",
      "Semi-annual surveys of customer feedback channels and social media mentions regarding unauthorized transactions.",
      "Systematic monitoring of security alerts from intrusion detection systems, firewalls, and file integrity mechanisms."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "explanation": "Requirement 12.10.5 mandates monitoring alerts from security mechanisms (including intrusion detection/prevention systems, firewalls, and file integrity monitoring) to facilitate early detection of unauthorized access or payment card data compromise.",
    "tip": "Incident response monitoring must include active alert monitoring from IDS/IPS, firewalls, and FIM systems.",
    "v4_ref": "PCI DSS Req 12.10.5"
  },
  {
    "id": 155,
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "question": "Under Requirement 12.1.2, what action must an organization take to verify that personnel understand and commit to security policies?",
    "options": [
      "Require all relevant personnel to confirm in writing or electronically that they adhere to security policies at least annually.",
      "Mandate that third-party contractors sign non-disclosure agreements prior to reviewing operational architectural diagrams.",
      "Conduct unannounced quarterly inspections of administrative workstations to ensure physical policy manuals are displayed.",
      "Publish documented acceptable use guidelines on the public corporate intranet portal without tracking individual acceptance."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "explanation": "Requirement 12.1.2 requires that personnel formally acknowledge in writing or electronically that they have read, understood, and agreed to follow the security policy upon hire and at least once every 12 months.",
    "tip": "Security policy acknowledgment must be documented annually in writing or electronically.",
    "v4_ref": "PCI DSS Req 12.1.2"
  },
  {
    "id": 156,
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "question": "Under Requirement 12.7, what procedure must an organization execute prior to hiring personnel who will have CDE access privileges?",
    "options": [
      "Administer technical certification assessments evaluating proficiency in payment network routing protocols.",
      "Conduct candidate background screening, such as employment and criminal history, to the extent allowed by law.",
      "Require prospective candidates to obtain personal liability insurance covering data security breaches.",
      "Collect biometric authentication credentials and register personal mobile devices within corporate directory services."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "explanation": "Requirement 12.7 mandates personnel screening procedures (e.g., employment history verification, background checks, reference checks) prior to hiring for candidates granted access to the Cardholder Data Environment, within local legal constraints.",
    "tip": "Screen personnel prior to hiring for CDE access roles, subject to local labor laws.",
    "v4_ref": "PCI DSS Req 12.7"
  },
  {
    "id": 157,
    "category": "SAQs & Assessment Validation",
    "question": "Which statement accurately distinguishes a Report on Compliance (ROC) from a Self-Assessment Questionnaire (SAQ)?",
    "options": [
      "A ROC evaluates perimeter firewall configurations, whereas an SAQ assesses database tokenization mechanisms.",
      "An SAQ requires an independent forensic assessment, whereas a ROC relies entirely on internal self-attestation.",
      "A ROC is an exhaustive audit report documenting every requirement, whereas an SAQ is a tailored self-evaluation tool.",
      "A ROC is exclusively used by Level 4 merchants, whereas an SAQ is strictly mandated for multinational service providers."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "explanation": "A Report on Compliance (ROC) is an exhaustive, detailed audit document completed by a QSA or ISA that covers all 12 requirements for Level 1 entities. An SAQ is a targeted validation tool used by eligible lower-volume merchants and service providers.",
    "tip": "ROC = Comprehensive on-site assessment report; SAQ = Streamlined self-assessment for eligible entities.",
    "v4_ref": "PCI DSS Reporting Overview"
  },
  {
    "id": 158,
    "category": "SAQs & Assessment Validation",
    "question": "When an assessor or entity marks a specific PCI DSS requirement as 'Not Applicable (N/A)' in an assessment report, what must be documented?",
    "options": [
      "A formal waiver signed by executive management indemnifying the acquiring bank against potential compromise costs.",
      "A compensating control worksheet demonstrating alternative security measures that achieve equivalent risk reduction.",
      "A formal exception request submitted to and approved by the payment brands prior to completing the assessment.",
      "A clear, detailed justification explaining why the specific control cannot apply to the assessed environment."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "explanation": "Both the ROC Reporting Template and SAQs require that any requirement marked 'Not Applicable (N/A)' must be accompanied by explicit documented justification explaining why the control does not apply to the environment.",
    "tip": "N/A responses require documented technical justification explaining why the requirement does not apply.",
    "v4_ref": "PCI DSS Reporting Template"
  },
  {
    "id": 159,
    "category": "PCI DSS Foundations & Roles",
    "question": "How long is a Payment Card Industry Professional (PCIP) qualification valid before the credential holder must complete formal recertification?",
    "options": [
      "Exactly three years, provided the individual adheres to the code of conduct and maintains required educational credits.",
      "Exactly one year, requiring the individual to retake the foundational certification examination on an annual basis.",
      "Exactly two years, provided the sponsoring corporate employer maintains continuous active registration with the SSC.",
      "Exactly five years, after which the credential permanently transitions into an unverified lifetime associate status."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "explanation": "The PCIP credential is valid for three (3) years. Qualification maintenance requires adherence to the PCI SSC Code of Professional Responsibility and earning required CPEs or passing the recertification exam.",
    "tip": "PCIP credential validity = 3 years (36 months).",
    "v4_ref": "PCI SSC PCIP Qualification Program"
  },
  {
    "id": 160,
    "category": "PCI DSS Foundations & Roles",
    "question": "Which of the following characteristics distinguishes the PCIP qualification from the Qualified Security Assessor (QSA) credential?",
    "options": [
      "The PCIP credential authorizes the holder to independently sign and submit official Level 1 Reports on Compliance.",
      "The PCIP credential belongs to the individual and remains active independently of corporate employer sponsorship.",
      "The PCIP credential mandates that the individual be currently employed by an approved third-party auditing firm.",
      "The PCIP credential requires completion of extensive annual on-site forensic lab evaluations supervised by the SSC."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "explanation": "Unlike the QSA qualification (which requires employment by an approved QSA company) or ISA (requiring employer sponsorship), the PCIP credential is an individual certification that stays with the person regardless of their employer.",
    "tip": "PCIP stays with the individual and is portable across employers.",
    "v4_ref": "PCI SSC PCIP Program Guide"
  },
  {
    "id": 161,
    "category": "PCI DSS Foundations & Roles",
    "question": "If an applicable sovereign data privacy regulation or local statute directly conflicts with a PCI DSS requirement, how must an entity proceed?",
    "options": [
      "The PCI DSS requirement strictly supersedes local legislation under contractual payment processing agreements.",
      "The entity must suspend all card transaction operations until obtaining an official legislative exemption.",
      "Local laws and sovereign regulations supersede PCI DSS requirements, and the conflict must be formally documented.",
      "The entity must implement an unapproved custom cipher suite to circumvent the conflicting statutory provision."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "explanation": "Local, state, and sovereign laws and regulations always supersede PCI DSS requirements in cases of direct legal conflict. The entity must adhere to applicable law, document the conflict, and implement alternative controls where possible.",
    "tip": "Legal statutes and sovereign regulations always take precedence over PCI DSS.",
    "v4_ref": "PCI DSS Legal & Regulatory Governance"
  },
  {
    "id": 162,
    "category": "PCI DSS Foundations & Roles",
    "question": "Can a single business entity be classified as both a Merchant and a Service Provider under PCI DSS compliance validation criteria?",
    "options": [
      "No, because an organization must be legally incorporated as either a retail merchant or a processing vendor.",
      "No, because payment card brand operating regulations strictly prohibit combining acquiring merchant IDs with service roles.",
      "Yes, but only if the entity maintains completely separate corporate parent entities registered in different countries.",
      "Yes, if the entity accepts payment cards for its own sales and also provides services impacting another entity's CDE."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "explanation": "An entity can be both a merchant (e.g., selling goods and accepting payment cards directly) and a service provider (e.g., providing hosting, gateway, or processing services to other entities). Such entities must meet both merchant and service provider obligations.",
    "tip": "An entity can be both a Merchant and a Service Provider simultaneously.",
    "v4_ref": "PCI DSS Scoping & Applicability"
  },
  {
    "id": 163,
    "category": "Scope & Segmentation",
    "question": "Under PCI DSS Requirement 1.2.4, what specific information must be illustrated in an entity's cardholder data flow diagrams?",
    "options": [
      "All flows of cardholder data across all systems, networks, communication paths, and storage or processing locations.",
      "All internal network routing paths used exclusively for employee administrative traffic and corporate email messaging.",
      "All physical pathways traversed by physical security guards and facilities maintenance staff within the data center.",
      "All external supply chain vendor locations supplying physical hardware components to corporate hosting facilities."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "explanation": "Requirement 1.2.4 mandates documented cardholder data flow diagrams showing all flows of cardholder data (CHD) across all systems, networks, and communication channels—from entry points, through internal processing and storage, to egress endpoints.",
    "tip": "Data flow diagrams must illustrate all paths and systems handling cardholder data from entry to exit.",
    "v4_ref": "PCI DSS Req 1.2.4"
  },
  {
    "id": 164,
    "category": "Req 1 & 2: Network & Configurations",
    "question": "How frequently must an entity review and confirm the accuracy of its network diagrams under PCI DSS Requirement 1.2.5?",
    "options": [
      "At least once every six months and immediately after any routine perimeter firewall access rule change.",
      "At least once every 12 months and immediately following any significant network architecture modification.",
      "At least once every calendar quarter during the execution of scheduled external vulnerability assessments.",
      "At least once every three years during the formal recertification of the organization's business strategy."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "explanation": "Requirement 1.2.5 requires that network diagrams (depicting network connections, boundaries between CDE and other networks, and wireless networks) be kept current and reviewed at least once every 12 months and after any significant change.",
    "tip": "Network diagrams must be reviewed at least once every 12 months and after any significant network changes.",
    "v4_ref": "PCI DSS Req 1.2.5"
  },
  {
    "id": 165,
    "category": "Req 3 & 4: Data Protection & Encryption",
    "question": "Under Requirement 4.2.2, which communication channel is explicitly prohibited from transmitting unprotected Primary Account Numbers (PANs)?",
    "options": [
      "Dedicated point-to-point leased line circuits connecting private corporate data center routing enclaves.",
      "Secure Socket Layer (TLS 1.3) encrypted API tunnels between authorized e-commerce processing endpoints.",
      "End-user messaging technologies, such as unencrypted email, SMS text messaging, and corporate instant messaging.",
      "Site-to-site IPsec VPN tunnels with mutual certificate authentication connecting branch offices to corporate cores."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "explanation": "Requirement 4.2.2 strictly prohibits sending unprotected PANs using end-user messaging technologies (e.g., email, SMS, instant messaging, chat platforms) because these channels are vulnerable to interception and unmonitored cleartext storage.",
    "tip": "Never transmit unprotected PAN over end-user messaging technologies (email, SMS, chat).",
    "v4_ref": "PCI DSS Req 4.2.2"
  },
  {
    "id": 166,
    "category": "Req 3 & 4: Data Protection & Encryption",
    "question": "If a customer transmits an unencrypted PAN to a merchant's general customer support email inbox, what is the required response?",
    "options": [
      "Process the payment transaction immediately and move the customer email into an encrypted long-term archive folder.",
      "Forward the unencrypted email to the internal fraud investigation unit and retain a copy for future forensic review.",
      "Redact the expiration date while retaining the unencrypted PAN within the customer relationship management database.",
      "Securely purge the email following documented policy, refrain from processing it, and notify the sender via secure means."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "explanation": "PCI SSC guidance for unsolicited PAN received via insecure channels requires entities to follow documented procedures: securely delete/purge the message, never process card data received via email, and educate the customer to use secure channels.",
    "tip": "Unsolicited PAN received via email: Purge securely, do not process, and notify sender.",
    "v4_ref": "PCI DSS Email Ingestion Guidance"
  },
  {
    "id": 167,
    "category": "Req 7 & 8: Access Control & Authentication",
    "question": "Under PCI DSS Requirement 8.2.8, what is the maximum permissible duration of session inactivity before an administrative screen must automatically lock?",
    "options": [
      "A duration not to exceed 15 minutes, requiring re-authentication to re-establish the session.",
      "A duration not to exceed 30 minutes, after which the active session is placed into sleep mode.",
      "A duration not to exceed 60 minutes, provided the physical office perimeter remains secured.",
      "A duration determined entirely by the system administrator based on individual job functions."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "explanation": "Requirement 8.2.8 requires system sessions to automatically lock or disconnect after a period of inactivity not exceeding 15 minutes, requiring user re-authentication to resume.",
    "tip": "Session inactivity timeout: Maximum 15 minutes before screen lock.",
    "v4_ref": "PCI DSS Req 8.2.8"
  },
  {
    "id": 168,
    "category": "Req 7 & 8: Access Control & Authentication",
    "question": "Under PCI DSS Requirement 8.3.9, what minimum password history control must be enforced to prevent users from reusing recent passwords?",
    "options": [
      "New passwords must not match any of the previous two passwords used by that individual account.",
      "New passwords must not match any of the previous four passwords used by that individual account.",
      "New passwords must not match any of the previous eight passwords used by that individual account.",
      "New passwords must not match any password utilized by the user across the preceding 12 months."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "explanation": "Requirement 8.3.9 mandates that new passwords cannot match any of the previous four (4) passwords used for that account.",
    "tip": "Password history minimum: Cannot reuse the last 4 passwords.",
    "v4_ref": "PCI DSS Req 8.3.9"
  },
  {
    "id": 169,
    "category": "Req 7 & 8: Access Control & Authentication",
    "question": "How does PCI DSS Requirement 8.3.10.1 address periodic password changes for user accounts in version 4.0.1?",
    "options": [
      "Passwords must be changed every 30 days regardless of additional authentication controls implemented.",
      "Passwords must be changed every 60 days unless multi-factor authentication is disabled on the host.",
      "Passwords must change every 90 days, or account posture must be dynamically and continuously analyzed.",
      "Passwords never require expiration if they meet the minimum sixteen-character complexity standard."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "explanation": "Requirement 8.3.10.1 offers two options: either change passwords at least once every 90 days, or deploy automated mechanisms that continuously evaluate the security posture of the account (e.g., dynamic threat intelligence, identity risk analysis).",
    "tip": "Password rotation in v4.0: Every 90 days OR continuous dynamic risk-based account posture analysis.",
    "v4_ref": "PCI DSS v4.0 Req 8.3.10.1"
  },
  {
    "id": 170,
    "category": "Req 5 & 6: Vulnerability & Secure Systems",
    "question": "Under Requirement 5.2.3.1, what obligation applies to CDE system components that are not commonly affected by malicious software?",
    "options": [
      "The entity must permanently exclude the systems from the assessment scope without technical justification.",
      "The entity must install commercial signature-based antivirus software regardless of operating system support.",
      "The entity must isolate the systems onto an air-gapped physical network segment disconnected from routers.",
      "The entity must perform documented periodic evaluations to confirm that emerging malware threats do not impact them."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "explanation": "Requirement 5.2.3.1 requires documented periodic evaluations (defined in the entity's targeted risk analysis, at least annually) for systems not commonly affected by malware to verify that the threat landscape has not changed.",
    "tip": "Systems not commonly affected by malware require documented periodic evaluations to confirm ongoing risk status.",
    "v4_ref": "PCI DSS Req 5.2.3.1"
  },
  {
    "id": 171,
    "category": "Req 5 & 6: Vulnerability & Secure Systems",
    "question": "Under Requirement 5.3.3, what scanning mechanism must be deployed on system components commonly affected by malicious software?",
    "options": [
      "Continuous behavioral monitoring or periodic automated malware scans to detect and prevent malicious code execution.",
      "Manual file system scans conducted by administrative staff following quarterly operating system maintenance cycles.",
      "Static signature checks executed exclusively upon initial system deployment prior to production network connection.",
      "Weekly automated integrity scans confined strictly to active directory user authentication database repositories."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "explanation": "Requirement 5.3.3 requires anti-malware mechanisms to perform continuous behavioral analysis of systems or periodic automated malware scans to detect and neutralize threats.",
    "tip": "Anti-malware execution: Continuous behavioral analysis OR periodic automated scanning.",
    "v4_ref": "PCI DSS Req 5.3.3"
  },
  {
    "id": 172,
    "category": "Req 5 & 6: Vulnerability & Secure Systems",
    "question": "Under PCI DSS Requirement 6.3.2, what specific software inventory must an entity maintain to protect applications within the CDE?",
    "options": [
      "An inventory consisting exclusively of operating system kernels and commercial endpoint productivity suites.",
      "An inventory of bespoke and custom software, including third-party and open-source software libraries utilized.",
      "An inventory tracking all hardware firmware revisions and network switch microcode releases across the enterprise.",
      "An inventory listing all end-user productivity software and web browser extensions installed on administrative laptops."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "explanation": "Requirement 6.3.2 requires maintaining an inventory of bespoke and custom software, including third-party software components and open-source libraries incorporated into software, to actively monitor for known vulnerabilities.",
    "tip": "Software inventory under Req 6.3.2 includes bespoke/custom code and all third-party/open-source libraries.",
    "v4_ref": "PCI DSS Req 6.3.2"
  },
  {
    "id": 173,
    "category": "Req 5 & 6: Vulnerability & Secure Systems",
    "question": "Under PCI DSS Requirement 6.3.1, how must an organization identify and manage newly discovered security vulnerabilities?",
    "options": [
      "Rank vulnerabilities solely according to vendor marketing severity advisories without assessing technical impact.",
      "Prioritize patching exclusively based on ease of remediation rather than potential threat exploitation exposure.",
      "Establish an ongoing process to identify vulnerabilities and rank them using industry criteria like CVSS scores.",
      "Defer vulnerability categorization until external third-party compliance assessors initiate their annual audit."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "explanation": "Requirement 6.3.1 mandates an ongoing process to identify security vulnerabilities and rank them using industry-recognized criteria (such as CVSS) into risk rankings (critical, high, medium, low).",
    "tip": "Vulnerability management requires ongoing identification and formal ranking using industry criteria (e.g., CVSS).",
    "v4_ref": "PCI DSS Req 6.3.1"
  },
  {
    "id": 174,
    "category": "Req 9 & 10: Physical & Logging",
    "question": "Under PCI DSS Requirement 9.3, which physical security control must be enforced for visitors entering sensitive areas like server rooms?",
    "options": [
      "Visitors must provide an insurance bond and submit to biometric retinal scanning prior to entering facilities.",
      "Visitors must be restricted to visiting sensitive areas exclusively during standard daytime administrative hours.",
      "Visitors may be granted unescorted keycard access if they present government-issued photographic identification.",
      "Visitors must be escorted at all times, wear visible identification badges, and be documented in a visitor log."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "explanation": "Requirement 9.3 mandates that physical visitors in sensitive areas be escorted at all times, visibly identified with expiring badges surrendered upon departure, and logged with visitor details retained for at least 3 months.",
    "tip": "Visitor controls: Continuous escort, distinctive badges surrendered upon exit, and physical logs retained 3+ months.",
    "v4_ref": "PCI DSS Req 9.3"
  },
  {
    "id": 175,
    "category": "Req 9 & 10: Physical & Logging",
    "question": "Under Requirement 9.1.2, what is the minimum retention period for video surveillance recordings monitoring sensitive CDE areas?",
    "options": [
      "At least three months (90 days), unless strictly prohibited by applicable sovereign data privacy legislation.",
      "At least thirty days, provided motion-detection alerts are archived on centralized physical backup repositories.",
      "At least six months (180 days), regardless of local jurisdictional constraints or storage retention limits.",
      "At least twelve months, matching the retention timeframe mandated for centralized electronic audit trail records."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "explanation": "Requirement 9.1.2 mandates that video monitoring recordings and physical access control logs for sensitive areas be retained for at least three (3) months, unless otherwise restricted by local sovereign law.",
    "tip": "Physical video surveillance retention = At least 3 months (90 days).",
    "v4_ref": "PCI DSS Req 9.1.2"
  },
  {
    "id": 176,
    "category": "Req 9 & 10: Physical & Logging",
    "question": "Under PCI DSS Requirement 10.6.2, who is authorized to modify system clock settings or time synchronization parameters on critical servers?",
    "options": [
      "Any systems engineer or contractor possessing active root or domain administrative privileges on host endpoints.",
      "Only designated, authorized personnel in accordance with documented and approved change management processes.",
      "Third-party managed service providers operating external network time protocol servers without internal review.",
      "Database administrators possessing local write access to application transactional audit logging directories."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "explanation": "Requirement 10.6.2 restricts access to time data and NTP clock settings to designated, authorized personnel only to ensure log timestamp integrity and prevent tampering with forensic evidence.",
    "tip": "Time settings and clock synchronization access must be restricted to authorized personnel only.",
    "v4_ref": "PCI DSS Req 10.6.2"
  },
  {
    "id": 177,
    "category": "Req 9 & 10: Physical & Logging",
    "question": "Under PCI DSS Requirement 10.2.2, which data element is mandatory in every generated audit log record to ensure forensic integrity?",
    "options": [
      "The full sixteen-digit primary account number associated with the initiating transactional request.",
      "The geographic GPS location of the physical client device connecting to the corporate access gateway.",
      "User identification, event date and time, event type, success or failure indication, and event origination.",
      "The cryptographic public key certificate fingerprint used by the endpoint during TLS session negotiation."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "explanation": "Requirement 10.2.2 requires six specific fields in every audit log record: user identification, event date and time, event type, success or failure indication, event origination (e.g., IP address/terminal), and identity of affected resource.",
    "tip": "Audit log records must capture: User ID, Date/Time, Event Type, Success/Failure, Origin, and Affected Resource.",
    "v4_ref": "PCI DSS Req 10.2.2"
  },
  {
    "id": 178,
    "category": "SAQs & Assessment Validation",
    "question": "When an assessor uses sampling to evaluate system components during a PCI DSS compliance assessment, what standard must be satisfied?",
    "options": [
      "The assessor must evaluate at least 75 percent of all physical and virtual servers deployed within the CDE.",
      "The assessed merchant independently selects and prepares the sample pool of systems submitted for review.",
      "Sampling is strictly prohibited across all Level 1 and Level 2 PCI DSS compliance validation assessments.",
      "The sample must represent all system types and locations, with selection rationale documented in workpapers."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "explanation": "PCI SSC Assessment Procedures allow sampling, but mandate that the sample must be representative across all system types, operating systems, and physical locations, with assessor rationale formally documented in workpapers.",
    "tip": "Sampling must be representative of all system types and locations, with documented justification by the assessor.",
    "v4_ref": "PCI DSS Sampling Guidance"
  },
  {
    "id": 179,
    "category": "PCI DSS Foundations & Roles",
    "question": "Under PCI SSC Qualification requirements, how long must a Qualified Security Assessor (QSA) company retain all assessment workpapers?",
    "options": [
      "At least three years, to support quality assurance reviews, brand inquiries, or council compliance audits.",
      "At least one year, coinciding with the operational validity duration of the executed Report on Compliance.",
      "At least five years, matching standard federal statutory financial records retention regulatory frameworks.",
      "At least seven years, in alignment with internal corporate tax auditing and legal discovery protocols."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "explanation": "PCI SSC QSA Program requirements mandate that QSA Companies retain all assessment workpapers, evidence, and interview documentation for a minimum of three (3) years.",
    "tip": "QSA workpaper retention = At least 3 years.",
    "v4_ref": "PCI SSC QSA Program Agreement"
  },
  {
    "id": 180,
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "question": "Under PCI DSS Requirement 12.10.4, what availability standard applies to personnel designated to respond to security incidents?",
    "options": [
      "Designated responders must be on duty during standard operational corporate business hours on weekdays.",
      "Designated personnel must be available on a 24/7 basis to respond immediately to suspected security alerts.",
      "Designated personnel must be available within four hours of an alert during standard daytime operating shifts.",
      "Designated responders must monitor incident channels twice weekly and document pending escalation tickets."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "explanation": "Requirement 12.10.4 mandates that designated incident response personnel must be available 24/7 to respond to alerts indicating potential security incidents.",
    "tip": "Incident response personnel must be available on a 24/7 basis.",
    "v4_ref": "PCI DSS Req 12.10.4"
  },
  {
    "id": 181,
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "question": "Under PCI DSS Requirement 12.6.2, which specific threat vector must be addressed within the personnel security awareness training program?",
    "options": [
      "Advanced techniques for decompiling proprietary firmware microcode deployed on network perimeter switches.",
      "Mathematical methodologies for deriving symmetric keys from intercepted elliptic curve cipher exchanges.",
      "Social engineering attacks, including phishing, spear-phishing, vishing, and suspicious identity verification.",
      "Configuration procedures for establishing automated failover clusters within multi-region cloud infrastructures."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "explanation": "Requirement 12.6.2 explicitly requires that security awareness training educate personnel on recognizing and reporting social engineering attacks, such as phishing, spear-phishing, and vishing.",
    "tip": "Security awareness training must specifically cover social engineering (phishing, vishing, impersonation).",
    "v4_ref": "PCI DSS Req 12.6.2"
  },
  {
    "id": 182,
    "category": "SAQs & Assessment Validation",
    "question": "Can an e-commerce or retail merchant that electronically stores cardholder data post-authorization validate compliance using SAQ A, B, or C?",
    "options": [
      "Yes, provided the cardholder data database is encrypted using industry-standard AES-256 cipher algorithms.",
      "Yes, provided the merchant obtains an annual compliance waiver from their designated merchant acquirer.",
      "Yes, if the merchant processes fewer than twenty thousand e-commerce transactions across the calendar year.",
      "No, because any electronic storage of cardholder data mandates completion of SAQ D Merchant or a full ROC."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "explanation": "Electronic storage of cardholder data disqualifies merchants from SAQs A, B, B-IP, C-VT, C, and P2PE. Any merchant storing cardholder data electronically must complete SAQ D for Merchants or undergo a full ROC.",
    "tip": "Electronic storage of cardholder data automatically requires SAQ D (or ROC).",
    "v4_ref": "PCI SSC SAQ Eligibility Rules"
  },
  {
    "id": 183,
    "category": "Scope & Segmentation",
    "question": "If an organization discovers unencrypted cardholder data residing on a server previously documented as out of scope, what is the consequence?",
    "options": [
      "The server immediately enters PCI DSS scope, requiring isolation, root cause analysis, and secure data purging.",
      "The server remains out of scope provided the file is deleted prior to the arrival of the external QSA assessor.",
      "The server must be permanently decommissioned and replaced with new hardware certified under the PTS framework.",
      "The server maintains out-of-scope status if host-based intrusion prevention blocking rules are deployed."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "explanation": "Any system storing, processing, or transmitting cardholder data is immediately in scope. The entity must isolate the data leak, identify how the data arrived there, remediate the process flaw, and securely delete the cardholder data.",
    "tip": "Discovered cardholder data brings the system immediately into PCI DSS scope.",
    "v4_ref": "PCI DSS Scoping Guidance"
  },
  {
    "id": 184,
    "category": "Req 3 & 4: Data Protection & Encryption",
    "question": "Under PCI DSS v4.0.1 Requirement 12.3.3, how frequently must an entity review cryptographic cipher suites and protocols in use?",
    "options": [
      "At least once every six months during internal penetration testing cycles and network configuration audits.",
      "At least once every 12 months to identify emerging vulnerabilities and plan transitions from deprecated algorithms.",
      "At least once every three years in conjunction with hardware refresh cycles and operating system migrations.",
      "Only when a formal security advisory is released by the National Institute of Standards and Technology (NIST)."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "explanation": "Requirement 12.3.3 requires that cryptographic cipher suites and protocols in use be reviewed at least once every 12 months to prepare for protocol deprecation and plan transitions to strong algorithms.",
    "tip": "Cryptographic cipher suite and protocol review = At least once every 12 months.",
    "v4_ref": "PCI DSS Req 12.3.3"
  },
  {
    "id": 185,
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "question": "Under PCI DSS Requirement 12.3.4, what obligation does an entity have regarding technologies approaching End-of-Life (EOL) or End-of-Support?",
    "options": [
      "Decommission the underlying hardware immediately regardless of business continuity or software availability needs.",
      "Negotiate extended third-party maintenance agreements that eliminate the obligation to patch newly found flaws.",
      "Maintain a documented plan that identifies aging components and defines migration strategies before support ceases.",
      "Implement compensating physical security barriers around legacy server racks to prevent unapproved network access."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "explanation": "Requirement 12.3.4 mandates a documented technology lifecycle management plan to monitor hardware and software approaching end-of-life/end-of-support and outline upgrade or replacement plans before vendor support ceases.",
    "tip": "Req 12.3.4 requires a documented plan to manage hardware and software approaching EOL/EOS.",
    "v4_ref": "PCI DSS Req 12.3.4"
  },
  {
    "id": 186,
    "category": "Req 3 & 4: Data Protection & Encryption",
    "question": "Under PCI DSS Requirement 3.4.1, how must an entity prevent unauthorized personnel from copying cardholder data to removable electronic media?",
    "options": [
      "Require personnel to sign a physical property acknowledgment form each time they exit corporate office facilities.",
      "Conduct unannounced monthly manual searches of employee backpacks, personal computing bags, and storage items.",
      "Inspect file modification timestamps across local administrative desktop workstations at the end of each shift.",
      "Deploy technical mechanisms to block unauthorized media usage or restrict copying strictly to authorized devices."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "explanation": "Requirement 3.4.1 mandates technical controls (such as endpoint DLP or USB port disabling) to prevent unauthorized copying of PAN to removable electronic media unless explicitly authorized for defined business needs.",
    "tip": "Copying PAN to removable media must be technically prevented or strictly restricted and authorized.",
    "v4_ref": "PCI DSS Req 3.4.1"
  },
  {
    "id": 187,
    "category": "Req 5 & 6: Vulnerability & Secure Systems",
    "question": "Under Requirement 6.3.3, how does the patching compliance deadline for 'Critical' vulnerabilities differ from other high-ranking vulnerabilities?",
    "options": [
      "Critical patches must be installed within 30 days, while other vulnerabilities follow defined risk ranking schedules.",
      "Critical patches must be installed within 14 days, while high-risk vulnerabilities must be remediated in 30 days.",
      "Critical patches must be deployed within 24 hours, while high-risk patches require deployment within 7 days.",
      "Critical patches require assessor pre-approval, whereas high-risk patches may be deployed during normal cycles."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "explanation": "Requirement 6.3.3 requires all critical security patches to be installed within 30 calendar days of release. Other high-risk vulnerabilities must be installed within timeframes defined in the entity's risk ranking process.",
    "tip": "Critical patches = Within 30 calendar days; other rankings = According to entity's defined risk ranking timeframe.",
    "v4_ref": "PCI DSS Req 6.3.3"
  },
  {
    "id": 188,
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "question": "Under PCI DSS Requirement 11.3.1.1, what mandatory step must follow the remediation of vulnerabilities detected during internal scans?",
    "options": [
      "Submit patch management deployment logs to the acquiring payment processor for formal validation sign-off.",
      "Perform rescan procedures until all identified high-risk vulnerabilities are verified as successfully resolved.",
      "Obtain written attestation from server administrators confirming that security patches were successfully applied.",
      "Commission an external Approved Scanning Vendor (ASV) to execute a validation scan against internal endpoints."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "explanation": "Requirement 11.3.1.1 states that rescanning must be performed as needed until all vulnerabilities ranked as high or critical by the entity are confirmed to be resolved.",
    "tip": "Internal vulnerability scans require rescanning until all high-risk vulnerabilities are resolved.",
    "v4_ref": "PCI DSS Req 11.3.1.1"
  },
  {
    "id": 189,
    "category": "Req 7 & 8: Access Control & Authentication",
    "question": "Under PCI DSS Requirement 8.2.7, what visual display control must be enforced when an individual enters an authentication credential on a screen?",
    "options": [
      "Display credentials in cleartext for three seconds to ensure user accuracy before automatically obscuring them.",
      "Require users to input credentials exclusively via encrypted on-screen touch keyboards rather than keyboards.",
      "Mask authentication credentials during entry to prevent shoulder-surfing and unauthorized viewing by observers.",
      "Project warning banners across display terminals advising bystanders to avert their gaze during authentication."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "explanation": "Requirement 8.2.7 mandates that authentication credentials (passwords, passphrases, PINs) must be masked during entry on screens to protect against observation and shoulder-surfing.",
    "tip": "Passwords must be masked during entry on display screens.",
    "v4_ref": "PCI DSS Req 8.2.7"
  },
  {
    "id": 190,
    "category": "Req 9 & 10: Physical & Logging",
    "question": "Under PCI DSS Requirement 10.5.2, how must an organization safeguard audit log files against local system failure or server compromise?",
    "options": [
      "Compress local audit files into password-protected archives stored on the local operating system boot partition.",
      "Retain audit records in memory-resident cache buffers and purge them automatically every twenty-four hours.",
      "Transmit audit trails to an external third-party cloud analytics provider without maintaining internal copies.",
      "Promptly offload audit logs to a secure centralized log server or media that is difficult to alter or delete."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "explanation": "Requirement 10.5.2 requires that audit log files are offloaded promptly to a secure centralized log server or media that is difficult to alter, ensuring availability even if the originating host fails or is compromised.",
    "tip": "Audit logs must be offloaded promptly to a secure, centralized log server.",
    "v4_ref": "PCI DSS Req 10.5.2"
  },
  {
    "id": 191,
    "category": "Req 1 & 2: Network & Configurations",
    "question": "Under Requirement 2.2.5, what configuration standard must be enforced regarding unnecessary functions, scripts, and software drivers on CDE systems?",
    "options": [
      "Remove or disable all unnecessary functions, scripts, drivers, features, and file systems to minimize attack surfaces.",
      "Reconfigure unnecessary system daemons to execute under administrative service accounts with elevated privileges.",
      "Retain default system utilities and legacy communication scripts to facilitate remote emergency troubleshooting.",
      "Restrict execution of superfluous software packages to off-peak operational maintenance windows via policy rules."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "explanation": "Requirement 2.2.5 mandates removing or disabling all unnecessary functions, scripts, drivers, features, subsystems, and file systems to reduce the attack surface on system components in scope.",
    "tip": "Hardening: Remove or disable all unnecessary functions, scripts, and software drivers.",
    "v4_ref": "PCI DSS Req 2.2.5"
  },
  {
    "id": 192,
    "category": "Req 9 & 10: Physical & Logging",
    "question": "Under PCI DSS Requirement 9.2.1, how must physical access privileges to sensitive areas such as data centers be granted to personnel?",
    "options": [
      "Grant blanket keycard access to all permanent full-time corporate staff members following initial onboarding.",
      "Restrict physical access strictly based on job need-to-know, with individual access approved by authorized managers.",
      "Provide unrestricted entry badges to third-party facility maintenance contractors upon presentation of business cards.",
      "Authorize physical entry based solely on departmental seniority without maintaining formal written approval logs."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "explanation": "Requirement 9.2.1 mandates that physical access to sensitive areas (e.g., data centers, server rooms) be restricted based on job need-to-know and approved by authorized personnel.",
    "tip": "Physical access to sensitive areas must be granted based strictly on job need-to-know and management approval.",
    "v4_ref": "PCI DSS Req 9.2.1"
  },
  {
    "id": 193,
    "category": "Req 1 & 2: Network & Configurations",
    "question": "Under PCI DSS Requirement 1.3.2, which rule strictly regulates inbound network traffic originating from untrusted networks into the CDE?",
    "options": [
      "Inbound network traffic is permitted across any network port provided source IP packets utilize secure TLS tunnels.",
      "Inbound administrative connections from public networks directly into internal database servers are permitted via SSH.",
      "Inbound traffic must be restricted to explicitly authorized protocols, and direct connections to databases are prohibited.",
      "Inbound connections from untrusted networks are allowed without restriction if dynamic deep-packet inspection is active."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "explanation": "Requirement 1.3.2 requires inbound traffic from untrusted networks to be restricted to only explicitly authorized IP addresses, ports, and protocols. Direct inbound connections from untrusted networks to databases storing cardholder data are strictly prohibited.",
    "tip": "Inbound traffic must be restricted to authorized ports/protocols; direct inbound access to databases is forbidden.",
    "v4_ref": "PCI DSS Req 1.3.2"
  },
  {
    "id": 194,
    "category": "Other PCI Standards (P2PE, PTS, SSF, PIN)",
    "question": "What is the primary role of a Qualified PIN Assessor (QPA) credentialed under the PCI Security Standards Council?",
    "options": [
      "To evaluate merchant Point-of-Interaction terminal hardware against the physical PTS device evaluation criteria.",
      "To validate payment software applications against the PCI Secure Software Standard for commercial distribution.",
      "To perform external vulnerability scans and validate quarterly perimeter compliance as an approved scanning vendor.",
      "To assess and validate an entity's compliance with the PCI PIN Standard governing secure PIN processing and management."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "explanation": "A Qualified PIN Assessor (QPA) is an independent assessor certified by the PCI SSC to perform assessments against the PCI PIN Security Standard, which governs the secure management, processing, and transmission of PIN data at ATMs and POS terminals.",
    "tip": "QPA = Assesses compliance against the PCI PIN Security Standard.",
    "v4_ref": "PCI SSC QPA Program"
  },
  {
    "id": 195,
    "category": "Other PCI Standards (P2PE, PTS, SSF, PIN)",
    "question": "Which two distinct security standards comprise the PCI Software Security Framework (SSF) established by the PCI SSC?",
    "options": [
      "The Secure Software Standard and the Secure Software Lifecycle (Secure SLC) Standard.",
      "The Payment Application Data Security Standard (PA-DSS) and the Secure POS Architecture Standard.",
      "The Point-to-Point Encryption (P2PE) Application Standard and the Cloud Security Module Standard.",
      "The PTS Device Security Standard and the Hardware Security Module (HSM) Operations Standard."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "explanation": "The PCI Software Security Framework (SSF) comprises two standards: 1) The Secure Software Standard (evaluating payment software products), and 2) The Secure Software Lifecycle (Secure SLC) Standard (evaluating vendor development processes).",
    "tip": "PCI SSF = Secure Software Standard + Secure SLC Standard.",
    "v4_ref": "PCI SSF Framework Overview"
  },
  {
    "id": 196,
    "category": "Req 9 & 10: Physical & Logging",
    "question": "Under Requirement 10.4.2, what review frequency is mandated for audit logs from systems that do not perform security functions or process CHD?",
    "options": [
      "Daily automated review executed within twenty-four hours of log event generation across all secondary endpoints.",
      "Periodic log reviews, with the frequency defined and justified by the entity's targeted risk analysis (TRA).",
      "Weekly manual log reviews conducted by senior administrative personnel and submitted to external auditors.",
      "Log reviews are completely optional for system components that do not store primary account numbers directly."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "explanation": "Requirement 10.4.2 requires periodic log reviews for system components that do not perform security functions and do not store/process/transmit CHD, with the review frequency determined and documented in a Targeted Risk Analysis (TRA). Critical security systems require daily reviews.",
    "tip": "Non-critical system log review frequency is determined periodically via Targeted Risk Analysis (TRA).",
    "v4_ref": "PCI DSS Req 10.4.2"
  },
  {
    "id": 197,
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "question": "Under PCI DSS Requirement 12.3.1, which core components must be documented within an entity's formal Targeted Risk Analysis (TRA)?",
    "options": [
      "Executive salary compensation tables, cyber liability insurance policy limits, and legal defense retainer agreements.",
      "Software source code repository URLs, third-party vendor sales invoices, and hardware depreciation tax schedules.",
      "Asset identification, threat analysis, vulnerability evaluation, impact assessment, and control frequency justification.",
      "Quarterly vulnerability scan attestation reports, approved scanning vendor contracts, and merchant acquirer IDs."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "explanation": "Requirement 12.3.1 outlines the mandatory elements of a Targeted Risk Analysis (TRA): asset identification, threats evaluated, vulnerabilities considered, likelihood and impact assessment, risk mitigations, and justification for the defined control frequency.",
    "tip": "TRA components: Assets, threats, vulnerabilities, impact/likelihood, mitigations, and frequency justification.",
    "v4_ref": "PCI DSS v4.0 Req 12.3.1"
  },
  {
    "id": 198,
    "category": "Scope & Segmentation",
    "question": "Under PCI DSS Requirement 11.4.6, how frequently must a multi-tenant service provider test its logical segmentation controls?",
    "options": [
      "At least once every twelve months and following any major firmware update applied to perimeter core routing equipment.",
      "At least once every calendar quarter concurrently with external Approved Scanning Vendor network vulnerability scans.",
      "At least once every three years during the comprehensive recertification of the multi-tenant cloud infrastructure.",
      "At least once every six months and after any changes to segmentation controls, via penetration testing procedures."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "explanation": "Requirement 11.4.6 requires service providers to perform penetration testing on multi-tenant segmentation controls at least once every six months and after any changes to segmentation controls/methods to confirm logical tenant isolation.",
    "tip": "Multi-tenant service provider segmentation penetration testing = At least once every 6 months.",
    "v4_ref": "PCI DSS Req 11.4.6"
  },
  {
    "id": 199,
    "category": "Req 7 & 8: Access Control & Authentication",
    "question": "Under PCI DSS Requirement 8.3.5, if passwords are used as an authentication factor, what minimum complexity rule must be enforced?",
    "options": [
      "Passwords must contain both numeric and alphabetic characters, requiring a combination of letters and numbers.",
      "Passwords must contain at least three uppercase letters, three lowercase letters, and two unique symbols.",
      "Passwords must incorporate dictionary word permutations and change characters based on seasonal schedules.",
      "Passwords must exclude any repeating sequential numbers and match the cryptographic hash of the username."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "explanation": "Requirement 8.3.5 requires passwords/passphrases used for user authentication to contain both numeric and alphabetic characters.",
    "tip": "Password complexity: Must contain both numeric and alphabetic characters.",
    "v4_ref": "PCI DSS Req 8.3.5"
  },
  {
    "id": 200,
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "question": "How does PCI DSS Requirement 12.2 define organizational governance and executive responsibility for information security?",
    "options": [
      "Operational security responsibilities may be delegated entirely to external third-party cloud hosting vendors.",
      "Executive management must assign formal security responsibilities to designated roles and maintain ongoing oversight.",
      "Information security accountability rests exclusively with front-line system administrators and helpdesk personnel.",
      "Governance requirements are satisfied if the organization designates an external legal counsel as compliance lead."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "explanation": "Requirement 12.2 requires executive management to formally assign information security responsibilities to specific roles and maintain documented governance and accountability for the overall PCI DSS compliance program.",
    "tip": "Requirement 12.2 mandates executive management assignment of security roles and active governance oversight.",
    "v4_ref": "PCI DSS Req 12.2"
  },
  {
    "id": 201,
    "question": "Under Requirement 1.1.2, how must roles and operational responsibilities for managing Network Security Controls (NSCs) be documented and assigned?",
    "options": [
      "Formally documented, assigned to specific personnel, and communicated to all responsible staff members.",
      "Delegated to external managed security providers with oversight maintained by executive leadership.",
      "Recorded within network device configuration comments and updated during annual audit cycles.",
      "Outlined in generic IT department job descriptions without naming individual system custodians."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 1 & 2: Network & Configurations",
    "explanation": "Requirement 1.1.2 mandates that roles and operational responsibilities for performing activities in Requirement 1 are clearly documented, assigned, and understood by designated personnel.",
    "tip": "Documentation and assignment of responsibilities is required for every requirement in v4.0.",
    "v4_ref": "PCI DSS v4.0.1 Req 1.1.2"
  },
  {
    "id": 202,
    "question": "Under Requirement 1.2.1, what must configuration standards for Network Security Controls (NSCs) establish?",
    "options": [
      "Automatic synchronization of firewall rules with commercial threat intelligence vulnerability feeds.",
      "A formal process for approving and testing all network connections and changes to configurations.",
      "Mandatory quarterly replacement of all network security hardware reaching operational end-of-life.",
      "Strict delegation of rule-authoring authority exclusively to independent third-party assessors."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 1 & 2: Network & Configurations",
    "explanation": "Requirement 1.2.1 requires configuration standards for NSCs that establish a formal approval and testing process for all network connections and rule modifications.",
    "tip": "All changes to firewall and router configurations require formal testing and management approval.",
    "v4_ref": "PCI DSS v4.0.1 Req 1.2.1"
  },
  {
    "id": 203,
    "question": "Under Requirement 1.2.2, which requirement applies to all permitted network services, protocols, and ports across NSCs?",
    "options": [
      "All outbound ports below 1024 must be permitted by default to support standard operating systems.",
      "All legacy remote administration ports may remain active if protected by perimeter rate limiting.",
      "All allowed services, protocols, and ports must be formally documented with business justification.",
      "All inbound services must undergo continuous automated penetration testing prior to rule creation."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 1 & 2: Network & Configurations",
    "explanation": "Requirement 1.2.2 mandates that every allowed service, protocol, and port must have documented business justification. Any port without justification must be closed.",
    "tip": "Every permitted port/service must have a documented business justification.",
    "v4_ref": "PCI DSS v4.0.1 Req 1.2.2"
  },
  {
    "id": 204,
    "question": "Under Requirement 1.2.3, what must an entity do if an insecure service, protocol, or daemon is required for business purposes?",
    "options": [
      "Reclassify the affected system component as out-of-scope through a signed executive policy waiver.",
      "Restrict traffic transmission to internal local subnets while disabling boundary packet inspection.",
      "Maintain unencrypted protocol streams provided that authentication occurs through active directory.",
      "Document the business justification and implement compensating security controls to mitigate risk."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 1 & 2: Network & Configurations",
    "explanation": "Requirement 1.2.3 specifies that if an insecure protocol is required for business purposes, the organization must implement additional mitigating controls to reduce the associated risk.",
    "tip": "Insecure services must be justified and secured with mitigating controls (e.g., SSH tunneling or IPsec).",
    "v4_ref": "PCI DSS v4.0.1 Req 1.2.3"
  },
  {
    "id": 205,
    "question": "Under Requirement 1.2.6, how must security features for Network Security Controls (NSCs) be managed during deployment?",
    "options": [
      "Enabled and configured in accordance with vendor guidance and industry-accepted security baselines.",
      "Adjusted dynamically by external intrusion prevention systems based on real-time traffic volume.",
      "Left at default factory settings during initial deployment until vulnerability scans are completed.",
      "Configured to permit unrestricted internal transit while inspecting only external inbound packets."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 1 & 2: Network & Configurations",
    "explanation": "Requirement 1.2.6 requires NSC security capabilities (such as stateful inspection and anti-spoofing) to be actively enabled and maintained according to configuration baselines to block malicious traffic.",
    "tip": "NSC security features must be actively configured and maintained, not left in default or disabled states.",
    "v4_ref": "PCI DSS v4.0.1 Req 1.2.6"
  },
  {
    "id": 206,
    "question": "Under Requirement 1.3.1, what network boundary architecture must be implemented between untrusted networks and the internal network?",
    "options": [
      "A stateless packet filter establishing direct socket connections to internal database clusters.",
      "A demilitarized zone (DMZ) to inspect, manage, and filter inbound traffic before internal entry.",
      "An unsegmented corporate gateway routing untrusted traffic directly to application endpoints.",
      "A virtual private network concentrator terminating external connections within core data tiers."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 1 & 2: Network & Configurations",
    "explanation": "Requirement 1.3.1 mandates the implementation of a DMZ to manage all connections between untrusted networks and the internal network. Direct traffic from the Internet to internal zones is prohibited.",
    "tip": "All inbound traffic from untrusted networks must pass through a DMZ; no direct internet connections to internal networks are permitted.",
    "v4_ref": "PCI DSS v4.0.1 Req 1.3.1"
  },
  {
    "id": 207,
    "question": "Under Requirement 1.3.3, what restriction applies to direct public internet access into databases storing cardholder data?",
    "options": [
      "Direct access is allowed if database administrators connect through cryptographically secure TLS.",
      "Direct access is permitted provided multi-factor authentication is enforced at the network edge.",
      "Direct public access is strictly prohibited; all requests must traverse intermediate DMZ tiers.",
      "Direct access is authorized solely during scheduled off-peak database maintenance windows."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 1 & 2: Network & Configurations",
    "explanation": "Requirement 1.3.3 states that direct public internet routes to system components storing cardholder data are completely forbidden. Intermediary application tiers or proxies in the DMZ must handle connections.",
    "tip": "Databases storing CHD must never be directly accessible from the internet.",
    "v4_ref": "PCI DSS v4.0.1 Req 1.3.3"
  },
  {
    "id": 208,
    "question": "Under Requirement 1.4.1, how must Network Security Controls be implemented between wireless networks and the Cardholder Data Environment?",
    "options": [
      "Wireless networks must be connected to internal switches using dedicated VLAN tags without firewalls.",
      "Wireless traffic may route directly into the CDE if WPA3 Enterprise authentication is implemented.",
      "Wireless bridges must permit outbound traffic by default while restricting inbound internet sessions.",
      "NSCs must deny all traffic from wireless networks by default and permit only authorized connections."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 1 & 2: Network & Configurations",
    "explanation": "Requirement 1.4.1 mandates that all wireless networks (regardless of whether they transmit CHD) are separated from the CDE using NSCs that deny all traffic by default.",
    "tip": "All wireless networks must be separated from the CDE by NSCs that deny all traffic by default.",
    "v4_ref": "PCI DSS v4.0.1 Req 1.4.1"
  },
  {
    "id": 209,
    "question": "Under Requirement 1.4.3, what restriction applies to mobile or remote computing devices that connect to both the CDE and untrusted networks?",
    "options": [
      "Split-tunneling must be prohibited unless traffic is explicitly controlled, monitored, and secured.",
      "Split-tunneling is automatically permitted if endpoint anti-malware definitions are kept current.",
      "Remote devices must use client-side proxies that bypass corporate network inspection mechanisms.",
      "Dual-homed network adapters may bridge internet and CDE segments if host firewalls are active."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 1 & 2: Network & Configurations",
    "explanation": "Requirement 1.4.3 requires that split-tunneling for remote devices connecting to the CDE is prohibited unless the entity demonstrates that traffic is isolated and secured.",
    "tip": "Split-tunneling must be prohibited unless strictly controlled and secured.",
    "v4_ref": "PCI DSS v4.0.1 Req 1.4.3"
  },
  {
    "id": 210,
    "question": "Under Requirement 1.5.1, what protection must be applied to Network Security Control (NSC) configuration files and rule sets?",
    "options": [
      "Distributed to all IT administrative workstations to maintain decentralized configuration redundancy.",
      "Secured from unauthorized access, modification, or exposure, with changes tracked and backed up.",
      "Stored on public cloud storage buckets provided the files are obfuscated using base64 encoding.",
      "Published to internal developer repositories without access controls to facilitate peer auditing."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 1 & 2: Network & Configurations",
    "explanation": "Requirement 1.5.1 requires that NSC configuration files and rules are protected from unauthorized access and backed up regularly.",
    "tip": "Configuration files and rule sets contain sensitive architectural intelligence and must be strictly safeguarded.",
    "v4_ref": "PCI DSS v4.0.1 Req 1.5.1"
  },
  {
    "id": 211,
    "question": "Under Requirement 2.1.1, what must be done with vendor-supplied default accounts and passwords prior to deploying a system component into production?",
    "options": [
      "Vendor-supplied passwords must be rotated annually, and default administrative accounts left enabled.",
      "Default credentials may remain active if systems are placed behind an external network firewall.",
      "Vendor-supplied default passwords must be changed, and unneeded default accounts disabled or removed.",
      "Default account privileges must be downgraded to read-only access while retaining default passwords."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 1 & 2: Network & Configurations",
    "explanation": "Requirement 2.1.1 requires changing vendor default passwords and removing or disabling unneeded default accounts before placing any device into production.",
    "tip": "Always change vendor defaults before installing a system on the network.",
    "v4_ref": "PCI DSS v4.0.1 Req 2.1.1"
  },
  {
    "id": 212,
    "question": "Under Requirement 2.2.1, how must system configuration standards address known security vulnerabilities across in-scope assets?",
    "options": [
      "Standards may rely entirely on proprietary hardware vendor advisories published upon release.",
      "Standards must be updated solely after a confirmed data compromise affects production systems.",
      "Standards require applying experimental developer patches prior to formal stability testing.",
      "Standards must be based on industry-accepted system hardening standards and updated regularly."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 1 & 2: Network & Configurations",
    "explanation": "Requirement 2.2.1 requires entities to base their system configuration standards on established industry-accepted hardening baselines (e.g. CIS Benchmarks, NIST SP 800-123).",
    "tip": "Configuration standards must align with recognized industry hardening baselines (CIS, NIST).",
    "v4_ref": "PCI DSS v4.0.1 Req 2.2.1"
  },
  {
    "id": 213,
    "question": "Under Requirement 2.2.3, what does the 'one primary function per system component' requirement mandate for servers in the CDE?",
    "options": [
      "Servers must implement only one primary function, or isolate conflicting functions via virtualization.",
      "Physical hosts must never run hypervisors or container runtimes hosting multiple service roles.",
      "High-volume production servers may collocate database and web services if logging is enabled.",
      "In-scope systems must restrict user logins to a single administrative user account per server."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 1 & 2: Network & Configurations",
    "explanation": "Requirement 2.2.3 mandates one primary function per server (or isolated using virtual machines/containers) so that a compromise of an internet-facing web service does not grant direct access to a collocated database.",
    "tip": "One primary function per server prevents lateral movement across services on the same host.",
    "v4_ref": "PCI DSS v4.0.1 Req 2.2.3"
  },
  {
    "id": 214,
    "question": "Under Requirement 2.2.6, what configuration rule applies to system security parameters that have default insecure settings?",
    "options": [
      "Insecure defaults are permissible if documented in internal standard operating procedure drafts.",
      "Security parameters must be configured to prevent insecure settings before production deployment.",
      "Default parameters may remain enabled on internal staging servers that mirror cardholder systems.",
      "Unhardened parameters are allowed if external vulnerability scans show no high-severity findings."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 1 & 2: Network & Configurations",
    "explanation": "Requirement 2.2.6 mandates configuring all system security settings to prevent vulnerabilities, verifying configurations prior to production release.",
    "tip": "Security parameters must be configured to prevent insecure settings before production release.",
    "v4_ref": "PCI DSS v4.0.1 Req 2.2.6"
  },
  {
    "id": 215,
    "question": "Under Requirement 2.3.1, what encryption standards must be enforced for all non-console administrative access to system components?",
    "options": [
      "Cryptographic protection is optional if administrators connect from within the physical office LAN.",
      "Password hashing via SHA-256 is sufficient without requiring transport-layer session encryption.",
      "Strong cryptographic protocols such as SSH, TLS 1.2+, or IPsec must safeguard all admin traffic.",
      "Legacy protocols like Telnet and HTTP are acceptable if restricted to administrative subnets."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 1 & 2: Network & Configurations",
    "explanation": "Requirement 2.3.1 requires that all remote or non-console administrative sessions (e.g. SSH, RDP over TLS, HTTPS admin portals) are protected with strong cryptography.",
    "tip": "All non-console administrative access must use strong cryptography (SSH, TLS, IPsec).",
    "v4_ref": "PCI DSS v4.0.1 Req 2.3.1"
  },
  {
    "id": 216,
    "question": "Under Requirement 3.1.1, what is required regarding the retention and disposal of Cardholder Data (CHD)?",
    "options": [
      "CHD may be retained indefinitely provided it is encrypted with AES-256 and stored off-site.",
      "Retention periods are determined entirely by third-party storage vendor volume limitations.",
      "All transactional CHD must be purged within twenty-four hours regardless of legal demands.",
      "Retention must be kept to the minimum time necessary for legal, regulatory, or business needs."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 3 & 4: Data Protection & Encryption",
    "explanation": "Requirement 3.1.1 requires a formal data retention and disposal policy limiting CHD storage to only what is strictly necessary for business, legal, or regulatory requirements.",
    "tip": "Data retention must be minimized to only what is strictly necessary for legal, regulatory, or business needs.",
    "v4_ref": "PCI DSS v4.0.1 Req 3.1.1"
  },
  {
    "id": 217,
    "question": "Under Requirement 3.2.1, how often must an automated or manual data purge mechanism be executed to remove expired cardholder data?",
    "options": [
      "At least once every three months (quarterly) or per a documented automated schedule.",
      "At least annually as part of the formal Qualified Security Assessor annual review.",
      "Only when physical storage capacity reaches predetermined high-utilization thresholds.",
      "Bi-annually following the completion of scheduled internal vulnerability assessments."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 3 & 4: Data Protection & Encryption",
    "explanation": "Requirement 3.2.1 requires quarterly execution of data purge processes (or continuous automated purging) to ensure data exceeding the retention period is promptly deleted.",
    "tip": "Data purging must occur at least quarterly or follow a continuous automated deletion schedule.",
    "v4_ref": "PCI DSS v4.0.1 Req 3.2.1"
  },
  {
    "id": 218,
    "question": "Under Requirement 3.3.2, what must an entity do if Sensitive Authentication Data (SAD) is received prior to transaction authorization completion?",
    "options": [
      "Write the raw SAD to secure non-volatile audit logs to facilitate historical transaction dispute handling.",
      "Hold the SAD in volatile memory only as strictly necessary to authorize, and securely purge it immediately.",
      "Encrypt the SAD using asymmetric key pairs and retain it for merchant dispute resolution periods.",
      "Tokenize the SAD and store the surrogate token alongside the corresponding Primary Account Number."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 3 & 4: Data Protection & Encryption",
    "explanation": "Requirement 3.3.2 allows temporary holding of SAD in volatile memory prior to authorization completion, but mandates immediate, secure deletion once authorization finishes.",
    "tip": "Pre-authorization SAD must only be held in volatile memory and purged immediately post-authorization.",
    "v4_ref": "PCI DSS v4.0.1 Req 3.3.2"
  },
  {
    "id": 219,
    "question": "Under Requirement 3.3.3, what restriction applies to card issuers storing Sensitive Authentication Data (SAD) after authorization?",
    "options": [
      "Issuers may store SAD in cleartext provided storage partitions are physically segregated in data centers.",
      "Issuers are completely exempt from Requirement 3 and may store all authorization data indefinitely.",
      "Issuers may store SAD only with a documented business need and must protect it using strong cryptography.",
      "Issuers cannot store SAD under any circumstances, even if operating proprietary closed-loop schemes."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 3 & 4: Data Protection & Encryption",
    "explanation": "Requirement 3.3.3 states that issuers storing SAD must have a documented business justification and must secure the stored SAD with strong cryptography.",
    "tip": "Only issuers with a documented business justification may retain post-authorization SAD, and it must be strongly encrypted.",
    "v4_ref": "PCI DSS v4.0.1 Req 3.3.3"
  },
  {
    "id": 220,
    "question": "Under Requirement 3.4.1, who is permitted to view the full, unmasked Primary Account Number (PAN) when displayed on screens or paper?",
    "options": [
      "Any customer service representative who has completed mandatory PCI DSS security awareness training.",
      "All internal IT personnel who possess active administrator credentials for the payment application.",
      "Executive leadership and financial officers regardless of their specific role within operations.",
      "Only personnel with an explicit, documented business need-to-know to view the full unmasked number."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 3 & 4: Data Protection & Encryption",
    "explanation": "Requirement 3.4.1 (and 3.3) mandates that full PAN displays are restricted solely to individuals with an explicit, documented business need to view the full account number.",
    "tip": "Full PAN displays are permitted only for personnel with a verified, documented business need-to-know.",
    "v4_ref": "PCI DSS v4.0.1 Req 3.4.1"
  },
  {
    "id": 221,
    "question": "Under Requirement 3.6.1.1, what security controls must be implemented when cryptographic keys used to protect cardholder data are generated?",
    "options": [
      "Keys must be generated using industry-accepted algorithms and approved pseudorandom number generators.",
      "Keys must be generated using proprietary algorithms created and maintained by internal developers.",
      "Keys may be generated using standard operating system default seeds without entropy verification.",
      "Keys must be derived directly from administrative user passwords using single-iteration hashing."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 3 & 4: Data Protection & Encryption",
    "explanation": "Requirement 3.6.1.1 requires key generation to use strong, industry-accepted cryptographic algorithms and secure random number generators with sufficient entropy.",
    "tip": "Cryptographic key generation must use industry-accepted algorithms and approved PRNGs.",
    "v4_ref": "PCI DSS v4.0.1 Req 3.6.1.1"
  },
  {
    "id": 222,
    "question": "Under Requirement 3.6.1.2, how must secret and private cryptographic keys used for cardholder data encryption be distributed to key custodians?",
    "options": [
      "Transmitted via password-protected email attachments to designated cryptographic administrators.",
      "Distributed securely using split knowledge and dual control or secure key-transport protocols.",
      "Stored in a centralized shared directory accessible to authorized members of the security team.",
      "Delivered verbally over telephone connections after verifying the custodian's identity badge."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 3 & 4: Data Protection & Encryption",
    "explanation": "Requirement 3.6.1.2 requires key distribution to occur securely, using split knowledge and dual control or secure key-transport protocols.",
    "tip": "Key distribution requires split knowledge and dual control, or secure automated key exchange protocols.",
    "v4_ref": "PCI DSS v4.0.1 Req 3.6.1.2"
  },
  {
    "id": 223,
    "question": "Under Requirement 3.7.4, when must cryptographic keys used to protect cardholder data be rotated or replaced?",
    "options": [
      "Only when the underlying encryption algorithm is formally deprecated by national security bodies.",
      "Automatically every five years, or when the physical host running the cryptographic tool retires.",
      "At the end of their defined cryptoperiod based on industry standards, and immediately if compromised.",
      "Solely upon the resignation or termination of any key custodian who managed key components."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 3 & 4: Data Protection & Encryption",
    "explanation": "Requirement 3.7.4 mandates key rotation at the end of their defined cryptoperiod (typically annually for DEKs) or immediately upon suspected key compromise.",
    "tip": "Keys must be rotated at the end of their cryptoperiod and immediately when compromise is suspected.",
    "v4_ref": "PCI DSS v4.0.1 Req 3.7.4"
  },
  {
    "id": 224,
    "question": "Under Requirement 4.1.2, what inventory must an entity maintain regarding cryptographic keys and certificates used to protect cardholder data in transit?",
    "options": [
      "A list of hardware security modules deployed across perimeter networks and their firmware revisions.",
      "An informal repository of public key fingerprints retained on internal developer documentation wikis.",
      "A register of third-party vendors who provide certificate validation services for external portals.",
      "An inventory of all trusted keys and certificates, including CA, system, purpose, and expiry date."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 3 & 4: Data Protection & Encryption",
    "explanation": "Requirement 4.1.2 mandates an inventory of all trusted keys and certificates used for transmission of CHD, tracking expiration dates to ensure timely renewal before expiration.",
    "tip": "Maintain an inventory of all trusted keys/certificates to track CA, usage, and expiration dates.",
    "v4_ref": "PCI DSS v4.0.1 Req 4.1.2"
  },
  {
    "id": 225,
    "question": "Why are self-signed SSL/TLS certificates generally non-compliant for public-facing e-commerce websites under Requirement 4.2.1?",
    "options": [
      "They lack third-party CA validation, prompting client browser warnings and risking MITM attacks.",
      "They fail to implement symmetric key exchange protocols required for payment network sessions.",
      "They cannot support modern transport layer security protocols exceeding version TLS 1.1 cipher tiers.",
      "They require proprietary decryption algorithms that are not recognized by payment card brands."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 3 & 4: Data Protection & Encryption",
    "explanation": "Public-facing transmissions must use certificates issued and signed by recognized, trusted commercial CAs to prevent MITM spoofing attacks.",
    "tip": "Self-signed certs lack trusted third-party validation and expose users to man-in-the-middle attacks.",
    "v4_ref": "PCI DSS v4.0.1 Req 4.2.1"
  },
  {
    "id": 226,
    "question": "Under Requirement 4.2.1.1, what must an entity do regarding weak or deprecated cipher suites in TLS configurations on payment systems?",
    "options": [
      "Maintain deprecated cipher suites to guarantee backward compatibility with legacy customer browsers.",
      "Configure servers to support only secure cipher suites and disable insecure or deprecated ciphers.",
      "Rely on application-layer HMAC signatures while allowing cleartext TLS negotiation over port 443.",
      "Enable export-grade ciphers exclusively during high-traffic promotional events to optimize speed."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 3 & 4: Data Protection & Encryption",
    "explanation": "Requirement 4.2.1.1 requires that only secure cipher suites are enabled in TLS configurations. Deprecated ciphers (RC4, DES, export ciphers) must be explicitly disabled.",
    "tip": "Configure systems to only accept secure cipher suites and reject deprecated or weak algorithms.",
    "v4_ref": "PCI DSS v4.0.1 Req 4.2.1.1"
  },
  {
    "id": 227,
    "question": "Under PCI DSS v4.0 Requirement 5.4.1, what technical mechanism must an entity deploy to protect personnel against phishing attacks?",
    "options": [
      "Mandatory completion of quarterly social engineering awareness quizzes without automated tooling.",
      "Manual human review of all inbound electronic mail messages by security operations center staff.",
      "Automated technical controls such as SPF, DKIM, DMARC, and email filtering to detect spoofing.",
      "Routine simulated phishing assessments conducted annually by external penetration test teams."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 5 & 6: Vulnerability & Secure Systems",
    "explanation": "Requirement 5.4.1 (new v4.0 requirement) mandates deploying automated technical anti-phishing mechanisms (e.g. SPF, DKIM, DMARC, DNS filtering, secure email gateways) to block phishing attacks.",
    "tip": "Requirement 5.4.1 mandates automated technical anti-phishing mechanisms (SPF, DKIM, DMARC, filters).",
    "v4_ref": "PCI DSS v4.0.1 Req 5.4.1"
  },
  {
    "id": 228,
    "question": "Under Requirement 5.3.2.1, how must audit logs generated by anti-malware mechanisms be maintained and reviewed?",
    "options": [
      "Retained for thirty days in volatile memory and purged automatically once scans complete cleanly.",
      "Archived in offline tape backup systems without requiring ongoing log monitoring or inspection.",
      "Reviewed exclusively during annual external assessments conducted by Qualified Security Assessors.",
      "Retained in accordance with Requirement 10.5.1 and reviewed periodically per Requirement 10.4."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 5 & 6: Vulnerability & Secure Systems",
    "explanation": "Requirement 5.3.2.1 mandates that anti-malware logs are collected and retained per Requirement 10 (1 year total, 3 months immediately online) and reviewed per Req 10.4.",
    "tip": "Anti-malware logs must be retained and reviewed in accordance with Requirement 10 standards.",
    "v4_ref": "PCI DSS v4.0.1 Req 5.3.2.1"
  },
  {
    "id": 229,
    "question": "Under Requirement 5.3.5, what protection must be applied to removable electronic media (such as USB drives) connected to in-scope systems?",
    "options": [
      "Anti-malware solutions must actively scan removable media upon connection, or media must be blocked.",
      "Removable media must be pre-formatted using proprietary file systems prior to physical insertion.",
      "Removable media usage is permitted unrestricted provided write-protection switches are enabled.",
      "Anti-malware scanning may be bypassed if removable drives are signed out by management personnel."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 5 & 6: Vulnerability & Secure Systems",
    "explanation": "Requirement 5.3.5 requires that anti-malware mechanisms scan all removable media upon insertion, or the system must technically prohibit connecting removable media.",
    "tip": "Removable electronic media must be scanned upon connection or prohibited completely.",
    "v4_ref": "PCI DSS v4.0.1 Req 5.3.5"
  },
  {
    "id": 230,
    "question": "Under Requirement 6.2.3, who must review custom software code prior to release to production to identify potential security vulnerabilities?",
    "options": [
      "The primary software developer who authored the source code following a self-inspection checklist.",
      "An individual other than the author, trained in code review techniques and secure coding practices.",
      "The enterprise product manager responsible for approving business functionality and schedules.",
      "An external Qualified Security Assessor prior to every incremental production software release."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 5 & 6: Vulnerability & Secure Systems",
    "explanation": "Requirement 6.2.3 mandates that code reviews must be performed by knowledgeable personnel other than the author before merging or deploying to production.",
    "tip": "Code reviews must be conducted by knowledgeable individuals other than the original author.",
    "v4_ref": "PCI DSS v4.0.1 Req 6.2.3"
  },
  {
    "id": 231,
    "question": "Under Requirement 6.2.4, which vulnerability occurs when untrusted user input is passed directly to an interpreter without proper sanitization?",
    "options": [
      "Cross-Site Request Forgery resulting in unauthorized state changes on authenticated web portals.",
      "Insecure Direct Object References allowing users to bypass authorization and view other records.",
      "Injection flaws such as SQL Injection, Command Injection, or LDAP Injection executing commands.",
      "Server-Side Request Forgery coercing internal systems to send requests to unintended destinations."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 5 & 6: Vulnerability & Secure Systems",
    "explanation": "Requirement 6.2.4 explicitly references common application coding vulnerabilities, prioritizing injection attacks (SQLi, command injection) where malicious inputs alter database queries or shell commands.",
    "tip": "Input passed directly to an interpreter without sanitization causes injection flaws (SQLi, OS command).",
    "v4_ref": "PCI DSS v4.0.1 Req 6.2.4"
  },
  {
    "id": 232,
    "question": "Under Requirement 6.2.4, how must Cross-Site Scripting (XSS) vulnerabilities be prevented in payment web applications?",
    "options": [
      "By restricting all web application access exclusively to clients running enterprise managed browsers.",
      "By implementing Transport Layer Security (TLS 1.3) encryption across all public web transactions.",
      "By relying on client-side JavaScript validation routines without server-side parameter checking.",
      "By validating and sanitizing user inputs and contextually encoding output before browser rendering."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 5 & 6: Vulnerability & Secure Systems",
    "explanation": "Requirement 6.2.4 requires robust input validation, output encoding, and contextual sanitization to prevent Cross-Site Scripting (XSS) attacks in custom code.",
    "tip": "Prevent XSS via robust input validation/sanitization and contextual output encoding.",
    "v4_ref": "PCI DSS v4.0.1 Req 6.2.4"
  },
  {
    "id": 233,
    "question": "Under Requirement 6.5.2, what separation of duties must be enforced between development/test environments and production environments?",
    "options": [
      "Development and test environments must be separated from production, with developers restricted.",
      "Developers may possess full production root credentials if changes are logged to an audit file.",
      "Staging environments must share live cardholder data repositories to ensure realistic testing.",
      "System administrators may write and deploy custom application code directly during emergencies."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 5 & 6: Vulnerability & Secure Systems",
    "explanation": "Requirement 6.5.2 mandates separation of duties between personnel who develop code and personnel who manage and deploy code to production, preventing unauthorized code tampering.",
    "tip": "Enforce separation between dev/test and prod; developers should not have unmonitored prod access.",
    "v4_ref": "PCI DSS v4.0.1 Req 6.5.2"
  },
  {
    "id": 234,
    "question": "Under Requirement 6.5.5, what documentation and procedural controls are required for software and infrastructure changes deployed to the CDE?",
    "options": [
      "Informal peer notifications sent via enterprise messaging platforms prior to production rollout.",
      "Documented impact analysis, formal management approval, testing results, and back-out procedures.",
      "Retrospective change documentation prepared thirty days following successful release deployment.",
      "Vendor sign-off confirming that underlying hardware components meet operational specifications."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 5 & 6: Vulnerability & Secure Systems",
    "explanation": "Requirement 6.5.5 mandates formal change control documentation: business impact analysis, testing verification, management sign-off, and back-out/rollback plans.",
    "tip": "Production changes require impact analysis, approval, testing documentation, and back-out procedures.",
    "v4_ref": "PCI DSS v4.0.1 Req 6.5.5"
  },
  {
    "id": 235,
    "question": "Under Requirement 7.2.1, how must access privileges to system components and cardholder data be assigned to users?",
    "options": [
      "Granted broadly across department groups to prevent operational bottlenecks during shift changes.",
      "Assigned based on organizational seniority and manager discretion without formal role profiles.",
      "Assigned based on defined job roles and responsibilities, following the principle of least privilege.",
      "Configured with full administrative privileges during initial employee probationary periods."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 7 & 8: Access Control & Authentication",
    "explanation": "Requirement 7.2.1 requires access to be granted strictly according to documented job responsibilities, using role-based access control (RBAC).",
    "tip": "Privileges must be assigned based on job responsibilities adhering to least privilege.",
    "v4_ref": "PCI DSS v4.0.1 Req 7.2.1"
  },
  {
    "id": 236,
    "question": "Under Requirement 7.2.3, what default access setting must be configured on all access control systems governing CDE resources?",
    "options": [
      "Default permit for internal network subnets while enforcing strict perimeter firewall filters.",
      "Implicit allow for all domain authenticated users with granular restrictions on export tools.",
      "Default allow with automated anomaly detection alerting administrators to irregular activity.",
      "Default deny, ensuring that all access is blocked unless explicitly authorized and documented."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 7 & 8: Access Control & Authentication",
    "explanation": "Requirement 7.2.3 mandates that access control systems must be set to 'default deny'—all access is denied unless explicitly authorized.",
    "tip": "Access control systems must be set to 'default deny' for all accounts and network routes.",
    "v4_ref": "PCI DSS v4.0.1 Req 7.2.3"
  },
  {
    "id": 237,
    "question": "Under Requirement 7.2.6, how must temporary access granted to third-party vendors or external contractors be managed?",
    "options": [
      "Enabled only for the duration needed, monitored while active, and disabled immediately after use.",
      "Maintained permanently active with passwords expiring every ninety days to ensure continuity.",
      "Delegated to vendor account managers who self-attest monthly compliance via written statements.",
      "Restricted solely by IP filtering while allowing continuous unrestricted administrative logins."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 7 & 8: Access Control & Authentication",
    "explanation": "Requirement 7.2.6 requires that vendor access is enabled only when strictly necessary, monitored during use, and disabled immediately afterward.",
    "tip": "Vendor access must be enabled only on-demand, monitored actively, and disabled right after use.",
    "v4_ref": "PCI DSS v4.0.1 Req 7.2.6"
  },
  {
    "id": 238,
    "question": "Under PCI DSS v4.0 Requirement 8.6.1, what security requirement applies to system accounts and application service accounts?",
    "options": [
      "Service accounts must share generic administrator credentials across redundant server clusters.",
      "System accounts must not be used for interactive user logins and credentials must be secured.",
      "Service account credentials should be embedded directly within compiled binary source files.",
      "Application service accounts are completely exempt from credential rotation and complexity rules."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 7 & 8: Access Control & Authentication",
    "explanation": "Requirement 8.6.1 through 8.6.3 mandate that system/application accounts are restricted from interactive logins, have secrets stored securely in password vaults, and have hardcoded credentials eliminated.",
    "tip": "System/application accounts must not be used for interactive logins and must be stored in secure vaults.",
    "v4_ref": "PCI DSS v4.0.1 Req 8.6.1"
  },
  {
    "id": 239,
    "question": "Under Requirement 8.3.2, what verification must occur before an administrator resets a user's password or authentication credential?",
    "options": [
      "The administrator must confirm the user has an active corporate email address without challenge.",
      "The user must submit a written request co-signed by an external Qualified Security Assessor.",
      "The identity of the user must be positively verified before resetting credentials or tokens.",
      "The administrator must verify that the requesting user's account has not generated error logs."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 7 & 8: Access Control & Authentication",
    "explanation": "Requirement 8.3.2 requires positive verification of a user's identity (e.g. out-of-band challenge, callback) before resetting passwords or MFA tokens to prevent social engineering helpdesk takeovers.",
    "tip": "User identity must be positively verified before performing any credential or token reset.",
    "v4_ref": "PCI DSS v4.0.1 Req 8.3.2"
  },
  {
    "id": 240,
    "question": "Under Requirement 8.2.2, what action must occur when an employee transfers to a different department within the organization?",
    "options": [
      "Access privileges remain active for thirty days to facilitate knowledge transfer to successors.",
      "All system credentials must be permanently deleted, requiring creation of new domain accounts.",
      "Prior permissions are retained while new department roles are appended to existing privileges.",
      "Privileges must be immediately reviewed and modified or revoked to match the new role only."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 7 & 8: Access Control & Authentication",
    "explanation": "Requirement 8.2.2 mandates revoking or adjusting access privileges immediately when personnel change job roles within an organization to prevent privilege creep.",
    "tip": "When an employee changes roles, review and adjust privileges immediately to prevent privilege creep.",
    "v4_ref": "PCI DSS v4.0.1 Req 8.2.2"
  },
  {
    "id": 241,
    "question": "Under Requirement 9.4.1, how must hard-copy materials containing cardholder data (such as paper transaction records or receipts) be secured?",
    "options": [
      "Physically secured in locked containers, cabinets, or secure rooms with access strictly restricted.",
      "Maintained in designated open office filing areas accessible to all daytime corporate personnel.",
      "Stored in off-site commercial storage facilities without requiring physical access log tracking.",
      "Retained in cashier drawers during business hours without physical locking mechanisms active."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 9 & 10: Physical & Logging",
    "explanation": "Requirement 9.4.1 mandates that all hard-copy materials containing cardholder data are physically secured in locked containers or rooms with access restricted to authorized personnel.",
    "tip": "Paper records containing CHD must be stored in locked drawers, cabinets, or secure rooms.",
    "v4_ref": "PCI DSS v4.0.1 Req 9.4.1"
  },
  {
    "id": 242,
    "question": "Under Requirement 9.4.2, what strict controls apply to visitors attempting to access areas where hard-copy cardholder data is stored?",
    "options": [
      "Visitors must be issued unescorted electronic access cards valid solely during normal office hours.",
      "Visitors must be authorized, identified, and continuously escorted by designated personnel at all times.",
      "Visitors may enter unattended provided they sign a non-disclosure agreement at reception desks.",
      "Visitors require physical escorts only when visiting computing facilities housing core servers."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 9 & 10: Physical & Logging",
    "explanation": "Requirement 9.4.2 requires that visitors in areas where hard-copy cardholder data is held are authorized and constantly escorted to prevent unauthorized data access.",
    "tip": "Visitors in physical cardholder data storage areas must be continuously escorted.",
    "v4_ref": "PCI DSS v4.0.1 Req 9.4.2"
  },
  {
    "id": 243,
    "question": "Under Requirement 9.4.5, what are the approved methods for destroying hard-copy cardholder data materials when no longer needed?",
    "options": [
      "Standard strip shredding into uniform vertical ribbons discarded in commercial paper bins.",
      "Manual tearing of paper documents followed by disposal in standard corporate recycling carts.",
      "Cross-cut shredding, incinerating, or pulping so cardholder data cannot be reconstructed.",
      "Archiving hard-copy files in marked disposal boxes awaiting annual third-party site pickup."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 9 & 10: Physical & Logging",
    "explanation": "Requirement 9.4.5 requires permanent destruction: cross-cut shredding (strip shredding is insufficient), incineration, or pulping so cardholder data cannot be recovered.",
    "tip": "Hard copy destruction requires cross-cut shredding, incineration, or pulping (strip shredding is non-compliant).",
    "v4_ref": "PCI DSS v4.0.1 Req 9.4.5"
  },
  {
    "id": 244,
    "question": "Under Requirement 9.4.6, how must electronic media containing cardholder data be destroyed when decommissioned or retired?",
    "options": [
      "Formatting storage volumes using standard operating system rapid drive partitioning utilities.",
      "Reallocating storage drives to non-CDE internal testing environments without prior sanitization.",
      "Deleting partition tables and storing drives in unlocked storage rooms pending manufacturer RMA.",
      "Physically destroying media or securely sanitizing it in accordance with industry wipe standards."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 9 & 10: Physical & Logging",
    "explanation": "Requirement 9.4.6 requires electronic media to be rendered permanently unrecoverable via physical destruction (degaussing, shredding, crushing) or secure wiping per NIST SP 800-88 guidelines.",
    "tip": "Destroy or securely sanitize electronic media per industry standards (NIST SP 800-88, degaussing).",
    "v4_ref": "PCI DSS v4.0.1 Req 9.4.6"
  },
  {
    "id": 245,
    "question": "Under Requirement 9.2.2, how must physical access badges for employees and contractors entering sensitive areas be managed?",
    "options": [
      "Clearly identify individuals, be revoked upon termination, and modified when job roles change.",
      "Issued as generic department visitor badges that are shared among team members during shifts.",
      "Remain permanently active following employee departure until the badge's annual expiry date.",
      "Require visual identification badges only for external contractors while exempting employees."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 9 & 10: Physical & Logging",
    "explanation": "Requirement 9.2.2 requires strict physical badge controls: individual identification, revocation upon termination, and immediate return upon departure.",
    "tip": "Access badges must identify individuals and be revoked immediately upon role change or termination.",
    "v4_ref": "PCI DSS v4.0.1 Req 9.2.2"
  },
  {
    "id": 246,
    "question": "Under Requirement 9.5.3, what training must personnel receive regarding third-party service personnel seeking access to Point of Interaction (POI) devices?",
    "options": [
      "Permit device maintenance if technicians provide verbal assurance of third-party employment.",
      "Verify identity and credentials before granting access, and check work orders with management.",
      "Allow unescorted device replacement provided the contractor wears vendor-branded work attire.",
      "Escort technicians only when devices are physically removed from merchant operational premises."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 9 & 10: Physical & Logging",
    "explanation": "Requirement 9.5.3 mandates that personnel must verify the identity and authorization of any third party before allowing them to inspect, maintain, or replace payment terminals.",
    "tip": "Always verify identity and authorization before letting third-party service personnel near POI devices.",
    "v4_ref": "PCI DSS v4.0.1 Req 9.5.3"
  },
  {
    "id": 247,
    "question": "Under Requirement 10.1.1, how must audit log mechanisms be maintained across system components within or connected to the CDE?",
    "options": [
      "Audit logging may be suspended during high-volume processing periods to preserve system memory.",
      "Audit logging is required only on perimeter firewall devices and central database repositories.",
      "Audit logs must be enabled and active, continuously capturing required security-relevant events.",
      "Audit logging may be restricted to local console logins while omitting remote admin sessions."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 9 & 10: Physical & Logging",
    "explanation": "Requirement 10.1.1 mandates that audit logging mechanisms are enabled and active across all system components within or connected to the CDE.",
    "tip": "Audit logging must be continuously enabled and active across all in-scope systems.",
    "v4_ref": "PCI DSS v4.0.1 Req 10.1.1"
  },
  {
    "id": 248,
    "question": "Under Requirement 10.2.1.2, what event involving user accounts must be recorded by audit logging mechanisms?",
    "options": [
      "Updates to user contact profile details and emergency notification telephone contact lists.",
      "Routine workstation lock screen activations following standard user inactivity time-outs.",
      "Periodic automated synchronization of corporate directory attributes with cloud providers.",
      "All additions, deletions, or modifications to user accounts, system accounts, and privileges."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 9 & 10: Physical & Logging",
    "explanation": "Requirement 10.2.1.2 mandates logging for all actions related to user accounts (creation, modification, privilege elevation, deletion) to track unauthorized account manipulation.",
    "tip": "Log all account management events: creation, modification, elevation, and deletion.",
    "v4_ref": "PCI DSS v4.0.1 Req 10.2.1.2"
  },
  {
    "id": 249,
    "question": "Under Requirement 10.2.1.4, why must invalid logical access attempts (failed authentications) be recorded in audit logs?",
    "options": [
      "To detect and alert on unauthorized access attempts, brute-force attacks, and credential stuffing.",
      "To automatically re-route network traffic to honeypot subnets following three consecutive errors.",
      "To calculate employee productivity metrics based on daily workstation login error frequencies.",
      "To enable automatic password resets without requiring verification from system administrators."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 9 & 10: Physical & Logging",
    "explanation": "Requirement 10.2.1.4 requires logging all invalid access attempts to provide early detection of password spraying, brute-forcing, and unauthorized intrusion attempts.",
    "tip": "Log invalid logical access attempts to identify brute-force attacks and credential spraying.",
    "v4_ref": "PCI DSS v4.0.1 Req 10.2.1.4"
  },
  {
    "id": 250,
    "question": "Under Requirement 10.2.1.6, what administrative event regarding audit logging services must be captured in the logs?",
    "options": [
      "Routine query operations executed by security analysts during daily log monitoring workflows.",
      "Initialization, stopping, or pausing of audit logging mechanisms on any in-scope component.",
      "Scheduled archival of audit records to offline write-once storage media during maintenance.",
      "Automated log indexing processes performed by centralized security information event tools."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 9 & 10: Physical & Logging",
    "explanation": "Requirement 10.2.1.6 requires that any stopping, pausing, or re-initialization of audit logs is recorded, as attackers frequently disable logging before executing malicious commands.",
    "tip": "Log any stopping, pausing, or restarting of audit logging functions to detect tampering.",
    "v4_ref": "PCI DSS v4.0.1 Req 10.2.1.6"
  },
  {
    "id": 251,
    "question": "Under Requirement 10.3.1, what type of user activity must be recorded in audit logs?",
    "options": [
      "All individual user access to cardholder data environments and account data records.",
      "Only administrative user access to perimeter firewalls and border routing devices.",
      "Any privileged escalation events triggered by service accounts and system daemons.",
      "External contractor access to web servers during approved quarterly change windows."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 9 & 10: Physical & Logging",
    "explanation": "Requirement 10.3.1 states that all individual access to cardholder data must be logged to ensure traceability for every query, view, or export of cardholder data.",
    "tip": "Requirement 10.3.1 requires logging of all individual user access to cardholder data.",
    "v4_ref": "PCI DSS Req 10.3.1"
  },
  {
    "id": 252,
    "question": "Under Requirement 10.5.3, what protection must be applied to audit logs to ensure they cannot be altered after being recorded?",
    "options": [
      "Storing audit logs locally on endpoints with daily manual reviews by security personnel.",
      "Promptly copying audit logs to centralized write-once media or tamper-resistant servers.",
      "Encrypting log archives with proprietary algorithms before deleting uncompressed files.",
      "Applying operating system compression utilities and restricting direct physical console access."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 9 & 10: Physical & Logging",
    "explanation": "Requirement 10.5.3 mandates that current and archive audit logs are protected from unauthorized modification and tampering using write-once media, centralized log servers with FIM, or cryptographic protection.",
    "tip": "Audit logs must be protected from tampering via write-once media or secure centralized log servers.",
    "v4_ref": "PCI DSS Req 10.5.3"
  },
  {
    "id": 253,
    "question": "Under Requirement 10.6.1, where must critical systems obtain their time synchronization data?",
    "options": [
      "From internal hardware real-time clock crystals configured on local server motherboards.",
      "From public web browsing proxies operating across non-cardholder administrative networks.",
      "From designated central Network Time Protocol servers synchronized to trusted time sources.",
      "From manual operating system clock updates executed during scheduled maintenance cycles."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 9 & 10: Physical & Logging",
    "explanation": "Requirement 10.6.1 mandates that all critical system clocks are synchronized to designated central time servers using Network Time Protocol (NTP) synchronized to acceptable external reference clocks.",
    "tip": "Time synchronization must use designated central NTP servers tied to international reference sources.",
    "v4_ref": "PCI DSS Req 10.6.1"
  },
  {
    "id": 254,
    "question": "Under Requirement 11.1.2, what must an entity maintain regarding their regular security testing activities?",
    "options": [
      "Formal third-party vendor certifications verifying the scanning engines used during quarterly assessments.",
      "Public disclosure statements detailing all confirmed vulnerabilities remediated within the prior twelve months.",
      "Automated software receipts confirming licensing fees paid for enterprise vulnerability assessment utilities.",
      "Documented security testing procedures and formal records of all testing results, findings, and remediations."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 11.1.2 requires an entity to maintain documented security testing procedures and comprehensive records of all testing activities, vulnerability results, and remediation verification.",
    "tip": "Documented testing procedures and formal records of all results and remediations must be maintained.",
    "v4_ref": "PCI DSS Req 11.1.2"
  },
  {
    "id": 255,
    "question": "Under Requirement 11.2.2, what action is required if an unauthorized (rogue) wireless access point is detected?",
    "options": [
      "Initiate the incident response plan immediately to locate, isolate, and remove the unauthorized device.",
      "Document the rogue access point in the risk register and review its activity during the next annual assessment.",
      "Modify perimeter firewall rules to block traffic from the unauthorized device while keeping it operational.",
      "Reconfigure wireless intrusion detection sensors to downgrade the alert severity to an informational status."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 11.2.2 mandates that unauthorized wireless access points are detected and handled through immediate incident response procedures to locate, isolate, and physically remove the unauthorized device.",
    "tip": "Detecting an unauthorized wireless access point triggers immediate incident response to locate and remove it.",
    "v4_ref": "PCI DSS Req 11.2.2"
  },
  {
    "id": 256,
    "question": "Under Requirement 11.3.1.3, what must be done regarding internal vulnerability scans after a significant change is made to the environment?",
    "options": [
      "Defer vulnerability scanning until the next regularly scheduled quarterly internal assessment cycle.",
      "Perform an internal vulnerability scan following the change and rescan until high risks are resolved.",
      "Request an emergency external scan from an Approved Scanning Vendor to validate internal changes.",
      "Execute manual configuration script audits in lieu of conducting automated network vulnerability scans."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 11.3.1.3 requires internal vulnerability scans to be performed after any significant change, with rescans performed as needed until all high-risk vulnerabilities and applicable requirements are satisfied.",
    "tip": "Internal vulnerability scans must be conducted after any significant change, not just quarterly.",
    "v4_ref": "PCI DSS Req 11.3.1.3"
  },
  {
    "id": 257,
    "question": "Under Requirement 11.3.2.1, what must an entity do if an Approved Scanning Vendor (ASV) external scan identifies a false positive?",
    "options": [
      "Request that the internal security team edit the final scan report to suppress the disputed finding.",
      "Provide a signed corporate officer attestation declaring that the scan finding presents negligible risk.",
      "Submit a formal dispute with technical evidence to the ASV for review and documented resolution.",
      "Replace the Approved Scanning Vendor with an alternate scanning provider to obtain a clean report."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Under the ASV Program Guide and Requirement 11.3.2.1, disputed findings or suspected false positives must go through a formal dispute process where technical justification is reviewed and approved by the ASV.",
    "tip": "False positives in ASV scans must be formally disputed with technical evidence and approved by the ASV.",
    "v4_ref": "PCI DSS Req 11.3.2.1"
  },
  {
    "id": 258,
    "question": "Under Requirement 11.4.1, who is qualified to perform penetration testing for an organization?",
    "options": [
      "The primary network administrator who configures perimeter firewalls and security group rule sets.",
      "The lead application software engineer responsible for committing source code to production systems.",
      "Any certified information technology professional employed within the internal corporate help desk.",
      "A qualified, organizationally independent internal resource or an accredited external security firm."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 11.4.1 specifies that penetration testing must be performed by a qualified, organizationally independent internal resource (not responsible for administering target systems) or an external third party.",
    "tip": "Penetration testers must be qualified and organizationally independent from management of the CDE.",
    "v4_ref": "PCI DSS Req 11.4.1"
  },
  {
    "id": 259,
    "question": "Under Requirement 11.4.2, what testing methodology must penetration testing align with?",
    "options": [
      "Industry-accepted penetration testing methodologies covering both network and application layers.",
      "Automated vulnerability scanner default workflows without custom exploitation or manual attempts.",
      "Proprietary commercial evaluation frameworks restricted exclusively to internal network segments.",
      "Standardized operating system hardening checklists verifying administrative configuration settings."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 11.4.2 mandates that penetration testing methodologies must be based on industry-accepted standards (such as NIST SP 800-115, PTES, or OWASP) covering network and application layers.",
    "tip": "Pen testing must follow industry-accepted methodologies covering both network and application layers.",
    "v4_ref": "PCI DSS Req 11.4.2"
  },
  {
    "id": 260,
    "question": "Under Requirement 11.5.1.1, what must a Service Provider do when change-detection mechanisms detect unauthorized modifications?",
    "options": [
      "Suppress recurring monitoring alerts until confirmed during quarterly vulnerability scan reviews.",
      "Promptly respond to and investigate unauthorized file modifications according to incident procedures.",
      "Restore affected system components immediately from backups without conducting forensic discovery.",
      "Reconfigure detection monitoring baselines to automatically accept all detected file modifications."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 11.5.1.1 (an additional requirement for service providers) mandates prompt response to and investigation of alerts generated by change-detection mechanisms according to incident response procedures.",
    "tip": "Service providers must promptly investigate unauthorized file modification alerts generated by FIM.",
    "v4_ref": "PCI DSS Req 11.5.1.1"
  },
  {
    "id": 261,
    "question": "Under Requirement 12.1.3, which of the following requirements must be explicitly defined in the acceptable use policy for end-user technologies?",
    "options": [
      "Mandatory quarterly hardware upgrades for all remote workstations and mobile processing devices.",
      "Automatic encryption of all non-cardholder administrative data stored on shared network storage.",
      "Prohibition of unauthorized copying, moving, or storing of cardholder data on local hard drives.",
      "Requirement that all technical staff obtain commercial information security certifications annually."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 12.1.3 requires acceptable use policies for end-user technologies to define explicit approval, authentication requirements, approved products, and explicit prohibition of unauthorized copying or moving of cardholder data.",
    "tip": "Acceptable use policies must explicitly prohibit unauthorized copying, moving, or storing of CHD.",
    "v4_ref": "PCI DSS Req 12.1.3"
  },
  {
    "id": 262,
    "question": "Under Requirement 12.4.1, who is responsible for establishing and communicating information security policies and operational procedures across an organization?",
    "options": [
      "The external Qualified Security Assessor engaged to conduct the annual compliance assessment.",
      "The procurement department manager overseeing software licensing contracts and equipment leases.",
      "The third-party managed service provider delivering perimeter firewall filtering services.",
      "Executive management, who must formally assign overall responsibility to designated leaders."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 12.4.1 establishes that executive management holds ultimate responsibility for establishing, communicating, and maintaining security policies and assigning formal governance roles.",
    "tip": "Executive management must establish, communicate, and assign responsibility for the security program.",
    "v4_ref": "PCI DSS Req 12.4.1"
  },
  {
    "id": 263,
    "question": "Under Requirement 12.8.1, what information must an entity maintain within its inventory of Third-Party Service Providers (TPSPs)?",
    "options": [
      "A list of TPSPs indicating services provided, compliance status, and assigned requirement responsibilities.",
      "A comprehensive registry of all commercial software vendors supplying off-the-shelf desktop applications.",
      "An archived collection of marketing agreements and non-disclosure contracts executed with legal advisors.",
      "A financial accounting ledger recording all annual software subscription fees paid to service providers."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 12.8.1 mandates maintaining a list of TPSPs including services provided, PCI DSS compliance status, and information on which PCI DSS requirements are met by the TPSP and which by the entity.",
    "tip": "The TPSP inventory must detail services provided, compliance status, and shared requirement responsibilities.",
    "v4_ref": "PCI DSS Req 12.8.1"
  },
  {
    "id": 264,
    "question": "Under Requirement 12.8.2, what written agreement must an entity maintain with each of its Third-Party Service Providers (TPSPs)?",
    "options": [
      "A mutual indemnification contract absolving the entity from liability arising from vendor data breaches.",
      "A written acknowledgment that the service provider is responsible for the security of cardholder data handled.",
      "A service level guarantee ensuring ninety-nine point nine percent uninterrupted operational cloud uptime.",
      "A non-disclosure agreement prohibiting public disclosure of proprietary intellectual property and source code."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 12.8.2 requires written agreements where the TPSP acknowledges responsibility for the security of cardholder data the provider possesses, stores, processes, or transmits on behalf of the customer.",
    "tip": "TPSPs must formally acknowledge in writing their responsibility for the security of cardholder data.",
    "v4_ref": "PCI DSS Req 12.8.2"
  },
  {
    "id": 265,
    "question": "Under Requirement 12.8.3, what due diligence process must an entity execute prior to engaging a Third-Party Service Provider?",
    "options": [
      "Requesting commercial credit rating reports to confirm the financial stability of the external vendor.",
      "Conducting criminal background evaluations on all executive officers employed by the service provider.",
      "Evaluating the prospective provider's information security posture and PCI DSS compliance capabilities.",
      "Performing automated vulnerability port scans against all public web assets owned by the service vendor."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 12.8.3 mandates a formal due diligence process prior to engaging TPSPs to evaluate their information security posture and ability to maintain PCI DSS compliance.",
    "tip": "Due diligence must evaluate the TPSP's information security posture and PCI DSS compliance capabilities.",
    "v4_ref": "PCI DSS Req 12.8.3"
  },
  {
    "id": 266,
    "question": "Under Requirement 12.10.3, what elements must be included in an entity's incident response plan regarding business recovery?",
    "options": [
      "Procedures for reallocating marketing budgets toward post-incident brand management and media campaigns.",
      "Protocols for filing immediate commercial insurance reimbursement claims for reported hardware damages.",
      "Guidelines for retaining external legal counsel to handle potential consumer dispute arbitrations.",
      "Specific business recovery and continuity procedures to securely restore operations and verify integrity."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 12.10.3 requires incident response plans to include business recovery and continuity procedures to ensure operations are restored securely without re-introducing vulnerabilities.",
    "tip": "Incident response plans must incorporate business recovery and continuity workflows to securely restore systems.",
    "v4_ref": "PCI DSS Req 12.10.3"
  },
  {
    "id": 267,
    "question": "What is the primary purpose of PCI DSS Appendix A3: Designated Entities Supplementary Validation (DESV)?",
    "options": [
      "To provide supplemental validation criteria for entities designated by payment brands or acquirers as elevated risk.",
      "To offer an expedited compliance evaluation framework for newly registered merchants seeking initial certification.",
      "To exempt large multinational payment processors from completing annual Report on Compliance documentation.",
      "To establish technical security standards for point-of-sale hardware terminal manufacturing and assembly lines."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "PCI DSS Foundations & Roles",
    "explanation": "Appendix A3 (DESV) contains additional validation requirements for entities designated by payment brands or acquirers due to elevated risk, transaction volume, or history of compromises.",
    "tip": "DESV provides additional ongoing validation for entities designated by payment brands or acquirers.",
    "v4_ref": "PCI DSS Appendix A3"
  },
  {
    "id": 268,
    "question": "Under Appendix A3 (DESV), what additional governance requirement is imposed on a designated entity?",
    "options": [
      "Mandatory quarterly rotation of all executive leadership personnel overseeing corporate IT operations.",
      "Establishing a formal PCI DSS compliance program with executive oversight and quarterly compliance reviews.",
      "Submitting weekly financial auditing records directly to the payment brand global risk management council.",
      "Implementing biometric multi-factor authentication across all corporate non-cardholder workstation assets."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "PCI DSS Foundations & Roles",
    "explanation": "Requirement A3.1 requires designated entities to implement a formal PCI DSS compliance program with documented charter, assigned executive accountability, and quarterly reviews by senior management.",
    "tip": "DESV mandates an executive-sponsored compliance program with formal charters and quarterly reviews.",
    "v4_ref": "PCI DSS Req A3.1"
  },
  {
    "id": 269,
    "question": "Under Appendix A3 (DESV), how often must designated entities perform penetration testing on segmentation controls?",
    "options": [
      "Annually and after any major network upgrade or corporate reorganization.",
      "Once every three years as part of an enterprise security maturity review.",
      "At least once every six months and following any change to segmentation.",
      "Monthly for external perimeters and quarterly for internal boundaries."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Scope & Segmentation",
    "explanation": "Requirement A3.3.1 mandates that designated entities test segmentation controls at least once every six months (semi-annually) and after any change to segmentation controls or methods.",
    "tip": "Under DESV, segmentation control penetration testing is required at least semi-annually (every 6 months).",
    "v4_ref": "PCI DSS Req A3.3.1"
  },
  {
    "id": 270,
    "question": "What is the primary role of the Access Control Server (ACS) within the PCI 3-D Secure (3DS) architecture?",
    "options": [
      "It encrypts account data at the merchant browser and manages web checkout session tokens.",
      "It routes transaction authorization requests between the acquiring bank and payment brand.",
      "It provides hardware-based key management services to merchant payment gateway databases.",
      "It resides on the issuer side to authenticate cardholders during online card transactions."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Other PCI Standards (P2PE, PTS, SSF, PIN)",
    "explanation": "In the 3DS environment, the Access Control Server (ACS) is operated by or for the card issuer to authenticate the cardholder during e-commerce card-not-present transactions.",
    "tip": "The ACS resides in the issuer domain to authenticate cardholders during 3DS transactions.",
    "v4_ref": "PCI 3DS Core Security Standard"
  },
  {
    "id": 271,
    "question": "What is the primary function of the 3DS Server (3DSS) within the PCI 3-D Secure ecosystem?",
    "options": [
      "It initiates and manages authentication requests between merchant platforms and directory servers.",
      "It generates cryptographic card verification values printed on physical debit and credit cards.",
      "It authenticates cardholders through risk analysis algorithms deployed by the card issuer bank.",
      "It tokenizes primary account numbers before passing authorization payloads to clearing houses."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Other PCI Standards (P2PE, PTS, SSF, PIN)",
    "explanation": "The 3DS Server (3DSS) operates in the merchant environment to initiate and manage the 3DS authentication exchange with the payment brand Directory Server (DS).",
    "tip": "The 3DSS facilitates 3DS authentication requests between the merchant environment and the Directory Server.",
    "v4_ref": "PCI 3DS Core Security Standard"
  },
  {
    "id": 272,
    "question": "Under the PCI PIN Security Standard, what is the definition and function of a Key Injection Facility (KIF)?",
    "options": [
      "A software deployment server that distributes security patches to commercial payment terminals.",
      "A secure, audited facility where cryptographic keys are securely loaded into PIN entry devices.",
      "A cloud-based key escrow platform hosting symmetric master keys for payment gateway servers.",
      "A certified hardware manufacturing laboratory where encrypted payment cards are imprinted."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Other PCI Standards (P2PE, PTS, SSF, PIN)",
    "explanation": "A Key Injection Facility (KIF) is a physically and logically secured environment where cryptographic keys are injected into Secure Cryptographic Devices (SCDs/PEDs) under dual control.",
    "tip": "A KIF is a secure, audited facility for injecting cryptographic keys into PIN entry devices.",
    "v4_ref": "PCI PIN Security Standard"
  },
  {
    "id": 273,
    "question": "What is the primary architectural difference between the PCI CPoC and PCI SPPoC security standards?",
    "options": [
      "CPoC secures cloud-based payment gateways, while SPPoC governs hardware point-of-sale terminals.",
      "CPoC mandates dedicated hardware tamper meshes, while SPPoC applies to virtualized environments.",
      "CPoC covers contactless acceptance on COTS without PIN, while SPPoC supports PIN on COTS with SCRP.",
      "CPoC requires annual third-party source code audits, while SPPoC requires quarterly ASV scanning."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Other PCI Standards (P2PE, PTS, SSF, PIN)",
    "explanation": "PCI CPoC governs contactless payments on commercial off-the-shelf devices without PIN entry. PCI SPPoC governs software PIN entry on COTS paired with an external Secure Card Reader for PIN (SCRP). Both are now consolidated into MPoC.",
    "tip": "CPoC addresses contactless payments on COTS without PIN; SPPoC covers PIN entry on COTS with an external reader.",
    "v4_ref": "PCI CPoC / SPPoC / MPoC Standards"
  },
  {
    "id": 274,
    "question": "Under the PCI Software Security Framework (SSF), how do Secure Software Assessors differ from Secure SLC Assessors?",
    "options": [
      "Secure Software Assessors evaluate hardware terminals, while Secure SLC Assessors review web apps.",
      "Secure Software Assessors audit payment networks, while Secure SLC Assessors audit cloud vendors.",
      "Secure Software Assessors inspect firmware chips, while Secure SLC Assessors inspect data centres.",
      "Secure Software Assessors evaluate software products, while Secure SLC Assessors evaluate vendors."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Other PCI Standards (P2PE, PTS, SSF, PIN)",
    "explanation": "Under the SSF, Secure Software Assessors evaluate specific software products against the Secure Software Standard, whereas Secure SLC Assessors evaluate vendor software development lifecycle processes against the Secure SLC Standard.",
    "tip": "Secure Software Assessors validate software products; Secure SLC Assessors evaluate vendor SDLC processes.",
    "v4_ref": "PCI SSF Program Guide"
  },
  {
    "id": 275,
    "question": "What is the primary role and definition of a Hardware Security Module (HSM) under PCI standards?",
    "options": [
      "A tamper-resistant, physically hardened hardware device that securely generates, manages, and stores keys.",
      "A specialized network firewall appliance configured to intercept and inspect encrypted web checkout payloads.",
      "An enterprise storage array equipped with self-encrypting magnetic drives to safeguard database backups.",
      "A virtualized software appliance designed to monitor file integrity and detect unauthorized system alterations."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Other PCI Standards (P2PE, PTS, SSF, PIN)",
    "explanation": "A Hardware Security Module (HSM) is a physically hardened, tamper-resistant cryptographic hardware device certified under PCI PTS HSM to securely generate, store, and manage cryptographic keys.",
    "tip": "An HSM is a tamper-resistant hardware device that securely generates, manages, and protects cryptographic keys.",
    "v4_ref": "PCI PTS HSM Standard"
  },
  {
    "id": 276,
    "question": "What is the name of Visa's global compliance program that mandates merchant and service provider adherence to PCI DSS?",
    "options": [
      "Site Data Protection (SDP) compliance program",
      "Cardholder Information Security Program (CISP)",
      "Data Security Operating Policy (DSOP) program",
      "Discover Information Security & Compliance (DISC)"
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "PCI DSS Foundations & Roles",
    "explanation": "Visa enforces compliance with PCI DSS through its Cardholder Information Security Program (CISP).",
    "tip": "Visa's PCI DSS compliance enforcement program is the Cardholder Information Security Program (CISP).",
    "v4_ref": "Visa CISP Regulations"
  },
  {
    "id": 277,
    "question": "What is the name of MasterCard's global data security compliance program governing PCI DSS compliance?",
    "options": [
      "Cardholder Information Security Program (CISP)",
      "Data Security Operating Policy (DSOP) program",
      "Site Data Protection (SDP) compliance program",
      "Discover Information Security & Compliance (DISC)"
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "PCI DSS Foundations & Roles",
    "explanation": "MasterCard enforces adherence to PCI DSS through its Site Data Protection (SDP) program.",
    "tip": "MasterCard's compliance enforcement program is Site Data Protection (SDP).",
    "v4_ref": "MasterCard SDP Rules"
  },
  {
    "id": 278,
    "question": "What is the name of Discover Network's data security compliance program enforcing PCI DSS adherence?",
    "options": [
      "Cardholder Information Security Program (CISP)",
      "Site Data Protection (SDP) compliance program",
      "Data Security Operating Policy (DSOP) program",
      "Discover Information Security & Compliance (DISC)"
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "PCI DSS Foundations & Roles",
    "explanation": "Discover Network enforces merchant and service provider compliance through the Discover Information Security and Compliance (DISC) program.",
    "tip": "Discover Network's data security compliance program is known as DISC.",
    "v4_ref": "Discover DISC Program"
  },
  {
    "id": 279,
    "question": "What is the name of American Express's merchant and service provider data security compliance program?",
    "options": [
      "Data Security Operating Policy (DSOP) program",
      "Cardholder Information Security Program (CISP)",
      "Site Data Protection (SDP) compliance program",
      "Discover Information Security & Compliance (DISC)"
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "PCI DSS Foundations & Roles",
    "explanation": "American Express mandates data security compliance through its Data Security Operating Policy (DSOP).",
    "tip": "American Express's data security program is the Data Security Operating Policy (DSOP).",
    "v4_ref": "American Express DSOP"
  },
  {
    "id": 280,
    "question": "What is the primary role and function of the Payment Card Industry Security Standards Council (PCI SSC)?",
    "options": [
      "To assess non-compliant merchants directly and collect monetary penalties for card processing violations.",
      "To develop, maintain, and publish security standards while training and certifying qualified assessors.",
      "To operate global payment clearing networks and resolve interbank transaction dispute settlements.",
      "To conduct mandatory forensic security investigations following confirmed cardholder data breaches."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "PCI DSS Foundations & Roles",
    "explanation": "The PCI SSC develops, enhances, and manages PCI security standards and qualifies assessors. Individual payment brands and acquirers enforce compliance and levy fines.",
    "tip": "The PCI SSC manages and publishes security standards; payment brands and acquirers enforce them.",
    "v4_ref": "PCI SSC Charter"
  },
  {
    "id": 281,
    "question": "Under Visa operating rules, which factors primarily determine an organization's merchant compliance level?",
    "options": [
      "The total count of active employee user accounts having administrative access to internal IT systems.",
      "The gross annual revenue generated by the merchant across all corporate business operations globally.",
      "The total annual volume of payment card transactions processed and the specific transaction channels.",
      "The geographic location of corporate headquarters and the total number of physical retail storefronts."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "PCI DSS Foundations & Roles",
    "explanation": "Card brands establish merchant compliance levels based on annual transaction volume, transaction channel (e.g., e-commerce vs card-present), and compromise history.",
    "tip": "Merchant levels are determined by annual payment card transaction volumes and channels.",
    "v4_ref": "Payment Brand Merchant Levels"
  },
  {
    "id": 282,
    "question": "If an entity operating as a Level 3 merchant suffers an account data compromise, how is their validation level affected?",
    "options": [
      "Their compliance validation requirements remain unchanged at Level 3 until the end of the calendar year.",
      "The merchant is automatically downgraded to Level 4 and must submit an updated Self-Assessment form.",
      "The merchant is permanently prohibited by payment brands from accepting credit and debit card payments.",
      "The merchant may be reclassified as a Level 1 entity by payment brands, requiring an on-site ROC audit."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "PCI DSS Foundations & Roles",
    "explanation": "Under card brand operating rules, any merchant that suffers a data breach compromising cardholder data can be escalated to Level 1, requiring an annual on-site assessment and ROC conducted by a QSA.",
    "tip": "A breached merchant can be escalated to Level 1, requiring an annual on-site ROC assessment.",
    "v4_ref": "Payment Brand Operating Regulations"
  },
  {
    "id": 283,
    "question": "What is the standard compliance validation requirement for a Level 2 Merchant under Visa operating regulations?",
    "options": [
      "An annual Self-Assessment Questionnaire or on-site ROC as required by the acquirer, plus quarterly ASV scans.",
      "A quarterly on-site assessment performed by a Qualified Security Assessor with monthly internal scan audits.",
      "A semi-annual executive attestation letter submitted directly to card brands without technical testing.",
      "Completion of an annual Self-Assessment Questionnaire A-EP with no requirement for external vulnerability scans."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "SAQs & Assessment Validation",
    "explanation": "Under Visa rules, Level 2 merchants typically validate compliance annually by completing an SAQ (or full on-site ROC if required by their acquirer) and passing quarterly ASV scans if external IPs exist.",
    "tip": "Level 2 merchants typically validate via an annual SAQ (or ROC if required by acquirer) and quarterly ASV scans.",
    "v4_ref": "Visa Merchant Validation Matrix"
  },
  {
    "id": 284,
    "question": "Which organization qualifies and certifies an individual as an Internal Security Assessor (ISA)?",
    "options": [
      "The corporate compliance department of the candidate's employer following an internal skills review.",
      "The PCI Security Standards Council (PCI SSC), upon completion of training, testing, and sponsorship.",
      "The acquiring bank that provides payment gateway processing services to the sponsoring organization.",
      "An independent accredited Qualified Security Assessor company designated by card brand authorities."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "PCI DSS Foundations & Roles",
    "explanation": "The PCI SSC provides formal training, testing, and certification for ISAs, who must be sponsored by an eligible merchant or service provider.",
    "tip": "The PCI SSC trains and certifies ISAs sponsored by their employers.",
    "v4_ref": "PCI SSC ISA Program Guide"
  },
  {
    "id": 285,
    "question": "What is the primary purpose of the Associate Qualified Security Assessor (AQSA) credential?",
    "options": [
      "To authorize independent consultants to perform standalone merchant compliance assessments without oversight.",
      "To certify internal IT staff members to validate Self-Assessment Questionnaires for their corporate employers.",
      "To provide an entry pathway for security professionals to conduct assessments under certified QSA supervision.",
      "To license third-party software developers to certify commercial payment applications under SSF standards."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "PCI DSS Foundations & Roles",
    "explanation": "The Associate QSA (AQSA) credential is an entry-level program by the PCI SSC enabling candidates to gain experience and participate in assessments under the supervision of a certified QSA.",
    "tip": "The AQSA credential provides an entry-level path to work on assessments under the supervision of a certified QSA.",
    "v4_ref": "PCI SSC AQSA Program Guide"
  },
  {
    "id": 286,
    "question": "In PCI DSS scoping, what distinguishes 'Connected-To' systems from 'Security-Impacting' systems?",
    "options": [
      "Connected-To systems reside inside the CDE; Security-Impacting systems reside exclusively in cloud environments.",
      "Connected-To systems store account data; Security-Impacting systems handle only encrypted non-financial payloads.",
      "Connected-To systems are subject to annual testing; Security-Impacting systems are exempt from technical audits.",
      "Connected-To systems share direct network routing; Security-Impacting systems provide shared security services."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Scope & Segmentation",
    "explanation": "Connected-to systems share direct logical connectivity with CDE assets. Security-impacting systems provide services (such as DNS, NTP, Active Directory, patch management, or jump hosts) that could affect the security of the CDE.",
    "tip": "Connected-to systems share network connectivity; Security-impacting systems provide services affecting CDE security.",
    "v4_ref": "PCI DSS Scoping Guidance"
  },
  {
    "id": 287,
    "question": "Can an Active Directory domain controller residing outside the cardholder data environment network be in-scope for PCI DSS?",
    "options": [
      "Yes, because providing authentication services to CDE systems makes it a security-impacting system component.",
      "No, because system components located on segmented corporate networks are automatically excluded from scope.",
      "Yes, but only if the Active Directory domain controller physically stores encrypted primary account numbers.",
      "No, because identity and access management directories are evaluated under separate ISO standards frameworks."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Scope & Segmentation",
    "explanation": "Authentication servers (Active Directory, LDAP, etc.) that manage authentication or group policy for CDE systems directly impact CDE security, making them fully in-scope as security-impacting components.",
    "tip": "Authentication servers managing CDE access are security-impacting systems and fully in-scope.",
    "v4_ref": "PCI DSS Scoping Guidance"
  },
  {
    "id": 288,
    "question": "If administrators use a jump box (bastion host) to remotely manage systems within the CDE, how is that jump box scoped?",
    "options": [
      "It is considered out-of-scope if multi-factor authentication is enforced at the corporate network perimeter.",
      "It is an in-scope system component because it controls access and provides connectivity into the CDE network.",
      "It is in-scope only if administrative sessions are recorded and stored on dedicated optical write-once media.",
      "It is out-of-scope because administrative jump boxes do not directly store, process, or transmit card data."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Scope & Segmentation",
    "explanation": "Jump boxes (bastion hosts) provide intermediate administrative access and connectivity into the CDE, thereby impacting CDE security and requiring full compliance with all applicable PCI DSS controls.",
    "tip": "Jump boxes providing administrative access to the CDE are in-scope system components.",
    "v4_ref": "PCI DSS Scoping Guidance"
  },
  {
    "id": 289,
    "question": "Which criteria must be fully satisfied for a system component to be classified as 'Out-of-Scope' under PCI DSS?",
    "options": [
      "The system stores only encrypted account data and enforces multi-factor authentication for administrators.",
      "The system is operated by a certified third-party vendor and isolated behind a commercial intrusion sensor.",
      "The system does not touch account data, has no connectivity to the CDE, and cannot impact CDE security.",
      "The system is deployed in a public cloud environment certified under ISO 27001 compliance specifications."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Scope & Segmentation",
    "explanation": "To be truly out-of-scope, a system component must not store, process, or transmit account data, must not share network connectivity with the CDE, and must have no capability to impact CDE security.",
    "tip": "Out-of-scope components must have zero account data, zero CDE connectivity, and zero impact on CDE security.",
    "v4_ref": "PCI DSS Scoping Guidance"
  },
  {
    "id": 290,
    "question": "Under Requirement 1.2.7, what must an entity examine during the semi-annual review of network security control rule sets?",
    "options": [
      "Confirm that all network routing hardware firmware patches have been successfully applied across data centers.",
      "Verify that all intrusion detection signature libraries are refreshed automatically every twenty-four hours.",
      "Inspect physical cable connections and interface bandwidth utilization across all perimeter core switches.",
      "Verify business justifications for permitted rules, remove obsolete entries, and validate default-deny rules."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 1 & 2: Network & Configurations",
    "explanation": "Requirement 1.2.7 requires reviewing network security control rule sets at least once every six months to confirm business justification for allowed ports/protocols, eliminate obsolete rules, and maintain default-deny configurations.",
    "tip": "Semi-annual NSC rule reviews verify business justifications, remove obsolete rules, and ensure default-deny.",
    "v4_ref": "PCI DSS Req 1.2.7"
  },
  {
    "id": 291,
    "question": "Under Requirement 2.2.2, what action must an entity take regarding system services, daemons, and unnecessary utilities?",
    "options": [
      "Remove or disable all unnecessary services, protocols, daemons, and scripts across in-scope system components.",
      "Configure automated system monitoring alerts to notify administrators whenever any background daemon is executed.",
      "Isolate all non-essential operating system services into separate virtualized containers on production hosts.",
      "Require executive management approval before allowing standard operating system utilities to start on boot."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 1 & 2: Network & Configurations",
    "explanation": "Requirement 2.2.2 mandates enabling only necessary services, protocols, daemons, and functions, and removing or disabling all unneeded services to minimize the attack surface.",
    "tip": "Only necessary services and functions must be enabled; all unneeded daemons and scripts must be removed or disabled.",
    "v4_ref": "PCI DSS Req 2.2.2"
  },
  {
    "id": 292,
    "question": "Under Requirement 3.4.1.1, how must Primary Account Numbers (PANs) be masked when displayed to personnel?",
    "options": [
      "Display only the final two digits of the account number while replacing all preceding numbers with asterisks.",
      "Display no more than the first six and last four digits unless a documented business justification requires more.",
      "Mask all numeric characters completely unless the viewing employee possesses root or domain administrator rights.",
      "Truncate the account number to show only the middle eight digits across all customer service console screens."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 3 & 4: Data Protection & Encryption",
    "explanation": "Requirement 3.4.1.1 states that displayed PANs must be masked showing at maximum the first six and last four digits (BIN and last 4), unless documented business justification requires otherwise.",
    "tip": "Mask displayed PAN to no more than the first six and last four digits unless business needs require otherwise.",
    "v4_ref": "PCI DSS Req 3.4.1.1"
  },
  {
    "id": 293,
    "question": "Under Requirement 3.5.1.2, if disk-level encryption is used to protect stored cardholder data on non-removable media, what additional control is required?",
    "options": [
      "Cryptographic keys must be rotated every thirty calendar days using manual key entry split-knowledge procedures.",
      "The underlying storage partition must be mirrored across two physically separate enterprise storage area networks.",
      "Decryption must be managed independently of native OS authentication, or separate data-level protection implemented.",
      "Anti-malware software must execute continuous real-time scanning against all encrypted virtual volume sectors."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 3 & 4: Data Protection & Encryption",
    "explanation": "Requirement 3.5.1.2 specifies that if disk-level or file-system-level encryption is used on non-removable media, access must be managed independently of operating system authentication, or account data must be encrypted with separate column/application-level encryption.",
    "tip": "Disk encryption on fixed media requires access mechanisms independent of native OS logon credentials.",
    "v4_ref": "PCI DSS Req 3.5.1.2"
  },
  {
    "id": 294,
    "question": "Under Requirement 3.6.1.4, how must cryptographic keys used for cardholder data protection be securely stored?",
    "options": [
      "Within encrypted database tables using identical algorithms and symmetric keys as the protected account data.",
      "On dedicated external USB flash drives locked inside the corporate security office fire-resistant safe box.",
      "Inside configuration files protected with standard operating system read-only permissions for root users.",
      "In secure cryptographic devices or encrypted with a key-encrypting key at least as strong as the data key."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 3 & 4: Data Protection & Encryption",
    "explanation": "Requirement 3.6.1.4 states that cryptographic keys must be stored in secure cryptographic devices (HSMs) or encrypted with a key-encrypting key (KEK) of equal or greater strength.",
    "tip": "Store keys in secure cryptographic devices or encrypt them with a key-encrypting key of equal or greater strength.",
    "v4_ref": "PCI DSS Req 3.6.1.4"
  },
  {
    "id": 295,
    "question": "Under Requirement 4.2.1.2, what security measures must be implemented for wireless networks transmitting cardholder data?",
    "options": [
      "Industry-standard strong encryption protocols such as WPA2-Enterprise or WPA3-Enterprise must be enforced.",
      "Hiding the wireless network Service Set Identifier (SSID) broadcast to obscure the access point visibility.",
      "Static Wired Equivalent Privacy (WEP) keys combined with hardware Media Access Control address filtering.",
      "Preshared passphrase authentication refreshed semi-annually across all corporate wireless connection points."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 3 & 4: Data Protection & Encryption",
    "explanation": "Requirement 4.2.1.2 mandates industry-accepted strong encryption (such as WPA2-Enterprise or WPA3-Enterprise) with mutual authentication for wireless networks transmitting cardholder data.",
    "tip": "Wireless transmission of cardholder data must be secured using strong encryption like WPA2/WPA3-Enterprise.",
    "v4_ref": "PCI DSS Req 4.2.1.2"
  },
  {
    "id": 296,
    "question": "Under Requirement 5.2.2, how often must an entity evaluate system components that are not protected by anti-malware software?",
    "options": [
      "Weekly through automated signature vulnerability scans conducted across all unmanaged endpoint hosts.",
      "Periodically based on a targeted risk analysis or at least annually to confirm continued low risk.",
      "Only after a confirmed account data security incident or malware infection has occurred internally.",
      "Every six months during mandatory external penetration tests conducted by an accredited security firm."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 5 & 6: Vulnerability & Secure Systems",
    "explanation": "Requirement 5.2.2 requires periodic documented evaluations (justified via targeted risk analysis or at least annually) for systems not running anti-malware to confirm they remain safe from emerging malware threats.",
    "tip": "Systems not running anti-malware must be evaluated periodically (justified via TRA or at least annually).",
    "v4_ref": "PCI DSS Req 5.2.2"
  },
  {
    "id": 297,
    "question": "Under Requirement 6.3.3, what are the mandatory installation timeframes for critical and high-risk security patches?",
    "options": [
      "Install critical patches within twenty-four hours and high-risk patches within thirty calendar days.",
      "Apply all critical and high-risk patches within fourteen days of public security bulletin publication.",
      "Install critical patches within 30 days of release and high-risk patches per defined entity risk policy.",
      "Deploy critical patches within ninety days and high-risk updates during annual maintenance shutdowns."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 5 & 6: Vulnerability & Secure Systems",
    "explanation": "Requirement 6.3.3 requires critical security patches to be installed within 30 days of release, while applicable high-risk patches must be applied within a defined timeframe established in the entity's risk ranking policy.",
    "tip": "Critical patches must be installed within 30 days; other high-risk patches per defined policy timeframe.",
    "v4_ref": "PCI DSS Req 6.3.3"
  },
  {
    "id": 298,
    "question": "Under Requirement 6.4.1, which of the following is an approved method for protecting public-facing web applications against attacks?",
    "options": [
      "Enforcing multi-factor authentication for all customer e-commerce account logins across web interfaces.",
      "Restricting public web traffic exclusively to registered corporate Internet Protocol address allocations.",
      "Deploying network-level stateful packet filtering firewalls between external clients and web servers.",
      "Deploying an automated Web Application Firewall or conducting manual or automated security code reviews."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 5 & 6: Vulnerability & Secure Systems",
    "explanation": "Requirement 6.4.1 allows protecting public-facing web apps by either reviewing public-facing web apps via manual or automated vulnerability assessments after changes, or installing an automated technical solution (such as a WAF).",
    "tip": "Protect public web applications by automated technical solutions (WAF) or code reviews/assessments.",
    "v4_ref": "PCI DSS Req 6.4.1"
  },
  {
    "id": 299,
    "question": "Under Requirement 7.1.1, what fundamental principles must an entity's documented access control model enforce?",
    "options": [
      "Access based on business need-to-know, least privilege, and formal job responsibilities for all users.",
      "Universal administrative access granted to senior management across all internal information systems.",
      "Access permissions assigned strictly according to employee department size and physical office location.",
      "Discretionary access authorization decided independently by individual workstation users and operators."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 7 & 8: Access Control & Authentication",
    "explanation": "Requirement 7.1.1 requires access control policies to establish access based on business need-to-know, least privilege, and role-based permissions defining job responsibilities.",
    "tip": "Access control must strictly enforce least privilege and business need-to-know based on job responsibilities.",
    "v4_ref": "PCI DSS Req 7.1.1"
  },
  {
    "id": 300,
    "question": "Under Requirement 8.3.1, what are the three recognized categories of authentication factors required for multi-factor authentication?",
    "options": [
      "Something you generate, something you compute, and something you verify through automated cryptographic handshakes.",
      "Something you know (knowledge), something you have (possession), and something you are (inherence biometric trait).",
      "Something you enter, something you send via cellular SMS notification, and something you confirm with an administrator.",
      "Something you sign on paper, something you read from an identity badge, and something you vocalize to phone dispatch."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 7 & 8: Access Control & Authentication",
    "explanation": "Requirement 8.3.1 defines the three recognized categories of authentication factors: something you know (knowledge), something you have (possession), and something you are (inherence).",
    "tip": "The 3 authentication factors: something you know, something you have, and something you are.",
    "v4_ref": "PCI DSS Req 8.3.1"
  },
  {
    "id": 301,
    "question": "Under Requirement 8.3.6, why did PCI DSS v4.0 increase the minimum password length from 7 to 12 characters?",
    "options": [
      "Because modern automated GPU cracking tools compute billions of hashes per second, making short passwords trivial to crack offline.",
      "Because cryptographic hash algorithms like SHA-256 require input blocks of at least 12 characters to prevent collision vulnerabilities.",
      "Because multi-factor authentication systems cannot generate secure secondary time-based tokens for passphrases shorter than 12 characters.",
      "Because federal cybersecurity frameworks mandate that user passwords match symmetric encryption key lengths in total bit entropy."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 7 & 8: Access Control & Authentication",
    "explanation": "Requirement 8.3.6 increased the minimum password length from 7 to 12 characters (and 15 characters for service providers under some conditions) because modern GPU-accelerated computing power allows brute-force attacks to crack 7-character passwords in minutes or seconds.",
    "tip": "PCI DSS v4.0 raised the password length minimum from 7 to 12 alphanumeric characters.",
    "v4_ref": "PCI DSS v4.0.1 Req 8.3.6"
  },
  {
    "id": 302,
    "question": "Under Requirement 9.3.2, what physical access restriction applies to publicly accessible network jacks located in visitor areas or retail store floors?",
    "options": [
      "They must require 802.1X certificate authentication and maintain continuous automated intrusion detection sensors.",
      "They must be physically disabled, kept logically isolated, or routed to non-CDE networks to stop unauthorized connections.",
      "They must be restricted exclusively to PCI-listed point-of-sale terminals using hardware MAC address filtering lists.",
      "They must be monitored continuously with dedicated CCTV cameras retaining captured footage for at least ninety days."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 9 & 10: Physical & Logging",
    "explanation": "Requirement 9.3.2 mandates that network jacks located in public or easily accessible visitor areas must be physically disabled or logically segregated from the cardholder data environment to prevent unauthorized devices from connecting directly to sensitive networks.",
    "tip": "Publicly accessible network jacks must be disabled or isolated from the CDE.",
    "v4_ref": "PCI DSS v4.0.1 Req 9.3.2"
  },
  {
    "id": 303,
    "question": "Under Requirement 10.4.1, which system components require DAILY log reviews by security personnel or automated log monitoring tools?",
    "options": [
      "All corporate user laptops, general email servers, and employee document collaboration storage repositories.",
      "All out-of-scope file servers, staging application environments, and internal network print spooler queues.",
      "All systems that perform security functions and all system components that store, process, or transmit card data.",
      "All border routers connecting corporate headquarters to external branch offices and third-party logistics vendors."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 9 & 10: Physical & Logging",
    "explanation": "Requirement 10.4.1 requires daily review of logs for all systems that perform security functions (such as firewalls, IDS/IPS, authentication servers) and all system components that store, process, or transmit CHD/SAD.",
    "tip": "Daily log review is mandatory for security systems (firewalls, IDS/IPS, AD) and all CDE components.",
    "v4_ref": "PCI DSS v4.0.1 Req 10.4.1"
  },
  {
    "id": 304,
    "question": "Under Requirement 11.3.1.2, what vulnerability severity threshold requires remediation and rescanning in internal vulnerability scans?",
    "options": [
      "Only vulnerabilities categorized with a CVSS score of 9.0 or higher indicating imminent zero-day exploitability.",
      "Any vulnerability identified as medium risk or higher having an active public exploit circulating in the wild.",
      "Only vulnerabilities that directly allow unauthenticated administrative remote command execution on production hosts.",
      "All high-risk vulnerabilities as defined in Requirement 6.3.1, or those ranked high or critical by the entity."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 11.3.1.2 mandates that entities remediate all high-risk vulnerabilities identified in internal scans (based on the risk ranking defined in Req 6.3.1) and perform rescans to verify remediation.",
    "tip": "Internal scans require remediation of all 'high-risk' vulnerabilities; external ASV scans require CVSS < 4.0.",
    "v4_ref": "PCI DSS v4.0.1 Req 11.3.1.2"
  },
  {
    "id": 305,
    "question": "Under Requirement 11.4.5, how often must MERCHANTS perform penetration testing against network segmentation controls?",
    "options": [
      "At least once every 12 months, and after any change to segmentation controls or network boundary configurations.",
      "At least once every 6 months, and after any deployment of updated firewall firmware or core routing protocols.",
      "At least once every 3 months, coinciding with scheduled internal and external automated vulnerability assessments.",
      "At least once every 24 months, provided that quarterly internal network vulnerability scans show zero findings."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 11.4.5 requires merchants to validate network segmentation controls via penetration testing at least once every 12 months and after any changes. Service providers must test every 6 months under Requirement 11.4.6.",
    "tip": "Segmentation penetration testing: Merchants = every 12 months (Req 11.4.5); Service Providers = every 6 months (Req 11.4.6).",
    "v4_ref": "PCI DSS v4.0.1 Req 11.4.5"
  },
  {
    "id": 306,
    "question": "Under Requirement 12.3.2, what must an organization document when adopting the Customized Approach for a PCI DSS requirement?",
    "options": [
      "A formal Compensating Controls Worksheet signed by the acquiring bank proving technical or legal constraints.",
      "A documented Targeted Risk Analysis demonstrating that the customized control meets the defined objective.",
      "A third-party architectural attestation showing that compensating hardware firewalls replace software logic.",
      "An executive dispensation waiver from the card brands approving non-compliance for the current annual audit."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Compensating Controls & v4.0 Customized Approach",
    "explanation": "Under PCI DSS v4.0 Requirement 12.3.2, an entity using the Customized Approach must document a Targeted Risk Analysis (TRA) for each customized control and provide detailed evidence demonstrating that the control meets the Defined Approach Objective.",
    "tip": "Customized Approach requires a Targeted Risk Analysis (TRA); Defined Approach uses traditional prescriptive testing.",
    "v4_ref": "PCI DSS v4.0.1 Req 12.3.2"
  },
  {
    "id": 307,
    "question": "Under Requirement 12.10.6, what must an entity do regarding incident response personnel and training?",
    "options": [
      "Provide mandatory secure development training covering OWASP Top 10 vulnerabilities to all technical managers.",
      "Conduct unannounced simulated phishing campaigns every 90 days across all corporate employees and contractors.",
      "Provide incident response training at least once every 12 months to personnel designated to respond to incidents.",
      "Require external forensics certifications for all systems engineers and network administrators in the company."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 12.10.6 states that personnel assigned to the incident response team must receive training regarding their responsibilities at least once every 12 months.",
    "tip": "Incident response training for designated response personnel is required at least once every 12 months.",
    "v4_ref": "PCI DSS v4.0.1 Req 12.10.6"
  },
  {
    "id": 308,
    "question": "Under Requirement 1.2.8, what documentation must exist for all third-party software connections and services across firewalls?",
    "options": [
      "A non-disclosure agreement and cyber insurance certificate detailing minimum third-party indemnity limits.",
      "A cryptographic verification hash of the external software binary signed by the primary software distributor.",
      "An approved vendor architectural schematic showing all software developers with console administrative access.",
      "A documented business justification, authorized protocol, service, and ports for each third-party connection."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 1 & 2: Network & Configurations",
    "explanation": "Requirement 1.2.8 mandates that third-party connections into the CDE or across network security controls must have a documented business justification, including approved ports, protocols, and services.",
    "tip": "All third-party connections require documented business justification and authorized protocols/ports.",
    "v4_ref": "PCI DSS v4.0.1 Req 1.2.8"
  },
  {
    "id": 309,
    "question": "Under Requirement 1.3.4, what network control prevents untrusted devices from directly addressing internal CDE components?",
    "options": [
      "Network Address Translation (NAT) and strict routing rules that prevent direct addressing of internal CDE IPs.",
      "Mandatory deployment of TLS 1.3 mutual client certificate authentication across all internal workstation hosts.",
      "Disabling dynamic routing protocols and restricting all internal network switching to unmanaged physical hubs.",
      "Configuring DNS sinkholing on boundary firewalls to intercept external lookups originating from internal CDE."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 1 & 2: Network & Configurations",
    "explanation": "Requirement 1.3.4 requires entities to implement Network Address Translation (NAT) or other technologies to prevent direct routing and conceal internal IP addresses of the cardholder data environment from unauthorized networks.",
    "tip": "NAT and routing controls prevent external networks from directly addressing internal CDE IP schemes.",
    "v4_ref": "PCI DSS v4.0.1 Req 1.3.4"
  },
  {
    "id": 310,
    "question": "Under Requirement 2.2.7, what must be done with administrative passwords and credentials transmitted across internal or public networks?",
    "options": [
      "They may be sent in cleartext internally provided that network access control restricts physical port patching.",
      "They must be encrypted with strong cryptography whenever transmitted across any network, internal or public.",
      "They must be obscured using reversible Base64 encoding schemes before transmission over corporate local VLANs.",
      "They must be segmented into dual control password fragments transmitted across separate communication channels."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 1 & 2: Network & Configurations",
    "explanation": "Requirement 2.2.7 states that all non-console administrative access must use strong cryptography to encrypt all credentials and administrative commands in transit across any network, including internal corporate networks.",
    "tip": "Cleartext administrative credentials are NEVER permitted across any network; strong encryption is mandatory.",
    "v4_ref": "PCI DSS v4.0.1 Req 2.2.7"
  },
  {
    "id": 311,
    "question": "Under Requirement 3.7.4 (and cryptographic key management principles), when must cryptographic keys used to protect cardholder data be retired?",
    "options": [
      "At the start of every calendar fiscal year regardless of algorithm strength or cumulative transaction volume.",
      "Whenever the cardholder data environment undergoes an annual Report on Compliance audit by an external QSA.",
      "When reaching the end of their defined cryptoperiod, or immediately when key compromise is suspected or known.",
      "After encrypting exactly one million Primary Account Numbers to prevent initialization vector degradation risks."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 3 & 4: Data Protection & Encryption",
    "explanation": "Cryptographic keys must be retired and replaced when they reach the end of their defined cryptoperiod (as defined by key management policy/industry standards) or immediately if key compromise is suspected or detected.",
    "tip": "Retire cryptographic keys when their cryptoperiod expires or upon suspected compromise.",
    "v4_ref": "PCI DSS v4.0.1 Req 3.7.4"
  },
  {
    "id": 312,
    "question": "Under Requirement 4.2.1, which version of TLS is the minimum acceptable industry baseline for securing cardholder data in transit over open, public networks?",
    "options": [
      "TLS 1.0, provided that weak cipher suites like RC4, 3DES, and CBC mode algorithms are completely disabled.",
      "TLS 1.1, provided that SHA-256 HMAC integrity signatures and authenticated Diffie-Hellman keys are deployed.",
      "TLS 1.3 exclusively, as all prior versions have been formally deprecated by the PCI Security Standards Council.",
      "TLS 1.2 or higher, using approved strong cipher suites that provide secure authentication and encryption."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 3 & 4: Data Protection & Encryption",
    "explanation": "PCI DSS requires early TLS (TLS 1.0 and 1.1) and SSL to be migrated away; TLS 1.2 or higher is the minimum acceptable version for protecting cardholder data over open, public networks.",
    "tip": "TLS 1.2 or higher is required; SSL and TLS 1.0/1.1 are considered insecure and prohibited.",
    "v4_ref": "PCI DSS v4.0.1 Req 4.2.1"
  },
  {
    "id": 313,
    "question": "Under Requirement 5.3.4, who is permitted to disable anti-malware mechanisms on a system component, and under what conditions?",
    "options": [
      "Only authorized personnel, on an exceptional and temporary basis, with explicit documented management approval.",
      "Any certified system administrator troubleshooting production server latency without requiring formal approvals.",
      "Third-party support vendors performing scheduled quarterly software patch deployments across database clusters.",
      "Development teams configuring pre-production staging systems that do not contain live cardholder account data."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 5 & 6: Vulnerability & Secure Systems",
    "explanation": "Requirement 5.3.4 dictates that anti-malware mechanisms must not be disabled or altered by users unless specifically authorized by management on a case-by-case basis for a limited, documented period.",
    "tip": "Disabling anti-malware requires management approval on an exceptional, temporary basis with documented justification.",
    "v4_ref": "PCI DSS v4.0.1 Req 5.3.4"
  },
  {
    "id": 314,
    "question": "Under Requirement 6.2.1, how must bespoke and custom software be developed to ensure ongoing security?",
    "options": [
      "By restricting programming activities exclusively to ISO 27001 certified external software engineering vendors.",
      "In accordance with a secure software development lifecycle that integrates security across all project phases.",
      "By mandating that software developers compile application source code using obfuscation and binary signing keys.",
      "By requiring that all application code repositories undergo weekly peer reviews by internal executive management."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 5 & 6: Vulnerability & Secure Systems",
    "explanation": "Requirement 6.2.1 requires bespoke and custom software to be developed securely based on industry standards and in accordance with a secure software development lifecycle (Secure SDLC) covering design, development, and testing.",
    "tip": "Custom software must follow a secure software development lifecycle (Secure SDLC).",
    "v4_ref": "PCI DSS v4.0.1 Req 6.2.1"
  },
  {
    "id": 315,
    "question": "Under Requirement 6.5.3, what data must NEVER be used in pre-production, development, or test environments?",
    "options": [
      "Synthetic payment card account records created by automated software testing frameworks for load evaluations.",
      "Test Primary Account Numbers specifically provisioned by payment brands for sandbox payment authorization flows.",
      "Live production Cardholder Data (CHD) or Sensitive Authentication Data (SAD) under any operational circumstances.",
      "Anonymized transaction amounts, timestamps, and terminal identifier logs extracted from staging test databases."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 5 & 6: Vulnerability & Secure Systems",
    "explanation": "Requirement 6.5.3 strictly forbids using live production cardholder data (CHD) or sensitive authentication data (SAD) in pre-production, development, or test environments.",
    "tip": "Live production CHD/SAD must NEVER be used in test or development environments.",
    "v4_ref": "PCI DSS v4.0.1 Req 6.5.3"
  },
  {
    "id": 316,
    "question": "Under Requirement 7.2.2, who must authorize access privileges before a user account is granted access to the CDE?",
    "options": [
      "The designated internal IT helpdesk technician processing user onboarding tickets during standard work shifts.",
      "A peer system administrator holding equivalent administrative privileges within the target production cluster.",
      "The external Qualified Security Assessor conducting the annual Report on Compliance assessment verification.",
      "Authorized management personnel confirming that access is strictly aligned with documented business need-to-know."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 7 & 8: Access Control & Authentication",
    "explanation": "Requirement 7.2.2 mandates that access privileges to system components in the CDE are granted only after explicit authorization by authorized management personnel based on business need-to-know.",
    "tip": "Access privileges must be formally authorized by designated management based on need-to-know.",
    "v4_ref": "PCI DSS v4.0.1 Req 7.2.2"
  },
  {
    "id": 317,
    "question": "Under Requirement 8.2.4, how must accounts provisioned for third-party vendors and remote service providers be managed?",
    "options": [
      "Enabled only for the specific duration needed for services, and disabled immediately when access is finished.",
      "Permanently enabled with static credentials provided that the vendor signs an annual confidentiality agreement.",
      "Assigned shared administrative passwords that are rotated every 90 days by the internal security operations team.",
      "Configured to bypass multi-factor authentication if vendor connections originate from dedicated corporate VPNs."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 7 & 8: Access Control & Authentication",
    "explanation": "Requirement 8.2.4 requires that vendor remote access accounts are enabled only during the time period needed for a specific task and disabled immediately when not in active use.",
    "tip": "Vendor remote access accounts must be enabled only on-demand and disabled immediately after use.",
    "v4_ref": "PCI DSS v4.0.1 Req 8.2.4"
  },
  {
    "id": 318,
    "question": "Under Requirement 8.3.7, what is required if shared administrative accounts are used on legacy systems that cannot support individual user accounts?",
    "options": [
      "The legacy systems must be formally documented as compensating controls with no additional identity monitoring.",
      "Every administrative action must be uniquely attributable to an individual user via explicit secondary controls.",
      "The shared account credentials must be published in an encrypted password vault accessible by all system admins.",
      "Administrative access must be restricted to standard business operating hours without generating audit records."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 7 & 8: Access Control & Authentication",
    "explanation": "Requirement 8.3.7 allows shared administrative accounts only on an exceptional basis where individual accounts are not technically feasible, provided that actions taken can be explicitly traced and attributed to an individual user.",
    "tip": "Shared administrative accounts require secondary mechanisms to trace actions back to a unique individual.",
    "v4_ref": "PCI DSS v4.0.1 Req 8.3.7"
  },
  {
    "id": 319,
    "question": "Under Requirement 9.4.1.1, how must offline media (such as backup tapes or external drives) containing cardholder data be stored?",
    "options": [
      "Inside standard office file cabinets located within general employee areas equipped with electronic key fobs.",
      "In any secure network operations center provided that media labels do not mention cardholder data contents.",
      "In secure, locked locations or safes with physical access restricted to authorized personnel and logged access.",
      "Within off-site commercial storage warehouses without requiring explicit individual physical access tracking."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 9 & 10: Physical & Logging",
    "explanation": "Requirement 9.4.1.1 mandates that all offline media containing cardholder data is stored securely in locked cabinets, rooms, or safes with access strictly limited to authorized personnel.",
    "tip": "Offline backup media with CHD must be stored in physically secured, locked areas with controlled access.",
    "v4_ref": "PCI DSS v4.0.1 Req 9.4.1.1"
  },
  {
    "id": 320,
    "question": "Under Requirement 10.3.2, what user identification detail must be recorded in audit logs for every system event?",
    "options": [
      "The network IP address and hardware MAC address of the workstation initiating the specific transaction event.",
      "The department cost center code and job classification title associated with the user performing the command.",
      "The cryptographic hash of the user session cookie generated during multi-factor authentication handshakes.",
      "The unique user identification (User ID) of the individual who performed or initiated the logged system action."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 9 & 10: Physical & Logging",
    "explanation": "Requirement 10.3.2 requires audit logs to record the unique user identification (User ID) for all logged events, ensuring individual accountability for every action performed on in-scope systems.",
    "tip": "Audit logs must capture unique user identification (User ID) for every event to maintain accountability.",
    "v4_ref": "PCI DSS v4.0.1 Req 10.3.2"
  },
  {
    "id": 321,
    "question": "Under Requirement 11.3.1, who is permitted to perform internal vulnerability scans within an organization?",
    "options": [
      "Qualified, trained personnel who are organizationally independent of the systems being scanned, or an external party.",
      "Any certified systems administrator who holds operational responsibility for maintaining the targeted servers.",
      "Exclusively an accredited Approved Scanning Vendor (ASV) utilizing certified cloud-based scanning infrastructure.",
      "Only a PCI SSC certified Qualified Security Assessor (QSA) during the formal on-site validation assessment."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 11.3.1 permits internal scans to be performed by qualified internal staff who maintain organizational independence from the target environment, or by a qualified third party.",
    "tip": "Internal vulnerability scans can be performed by qualified internal staff (independent of the target) or a third party.",
    "v4_ref": "PCI DSS v4.0.1 Req 11.3.1"
  },
  {
    "id": 322,
    "question": "Under Requirement 11.6.1, what elements of an e-commerce payment page must be monitored for unauthorized modification or tampering?",
    "options": [
      "The web server underlying kernel binaries, local system configuration files, and database storage schemas.",
      "HTTP headers received by the consumer browser and payment page script elements executing within user sessions.",
      "The payment gateway merchant account configuration settings and processing settlement reconciliation feeds.",
      "The TLS cryptographic cipher negotiation strings and external domain name resolution latency metrics only."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 11.6.1 requires a change- and tamper-detection mechanism to monitor payment page HTTP headers received by the consumer browser and script elements that execute in the consumer browser.",
    "tip": "Req 11.6.1 monitors payment page scripts and HTTP headers in the consumer browser for unauthorized changes.",
    "v4_ref": "PCI DSS v4.0.1 Req 11.6.1"
  },
  {
    "id": 323,
    "question": "Under Requirement 12.5.2 (and 12.5.2.1), what is the mandatory frequency for Service Providers to confirm and document their PCI DSS scope?",
    "options": [
      "At least once every 12 months, coinciding with the annual Report on Compliance assessment cycle.",
      "At least once every 3 months (quarterly), alongside scheduled external ASV vulnerability scanning.",
      "At least once every 6 months (semi-annually), and upon any significant change to the environment.",
      "At least once every 24 months, provided that no architectural modifications occurred in the CDE."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Scope & Segmentation",
    "explanation": "Under Requirement 12.5.2.1 (an additional requirement for service providers), third-party service providers must confirm and document their PCI DSS scope at least once every 6 months and upon significant changes. For merchants, Requirement 12.5.2 is annual.",
    "tip": "Service providers must confirm PCI DSS scope every 6 months (semi-annually); merchants do so every 12 months.",
    "v4_ref": "PCI DSS v4.0.1 Req 12.5.2.1"
  },
  {
    "id": 324,
    "question": "An e-commerce merchant experiences a payment card breach resulting in 50,000 compromised card accounts. Which entity imposes contractual financial fines and penalties against the merchant's acquiring bank?",
    "options": [
      "The PCI Security Standards Council (PCI SSC) through its global compliance enforcement executive committee.",
      "The Qualified Security Assessor (QSA) company that performed the most recent annual compliance validation.",
      "The Federal Trade Commission (FTC) under statutory authority governing electronic commerce transactions.",
      "The Payment Card Brands (e.g., Visa, Mastercard) under their operating regulations and merchant contracts."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "PCI DSS Foundations & Roles",
    "explanation": "The PCI Security Standards Council (PCI SSC) manages the standards but does NOT enforce compliance or levy fines. Financial penalties and compliance mandates are enforced contractually by the individual Payment Card Brands (Visa, Mastercard, Amex, Discover, JCB) through acquiring banks.",
    "tip": "Card brands enforce compliance and assess fines; the PCI SSC only authors and manages the standards.",
    "v4_ref": "PCI DSS v4.0.1 Scope & Governance"
  },
  {
    "id": 325,
    "question": "What transaction volume threshold generally defines a Visa or Mastercard Level 1 merchant requiring an annual Report on Compliance (ROC)?",
    "options": [
      "Processing over 6,000,000 transactions per year across all channels, or designated as Level 1 by an acquirer.",
      "Processing over 1,000,000 transactions per year across all channels, regardless of acquirer risk determinations.",
      "Processing over 300,000 e-commerce transactions annually, or processing over $100,000,000 in gross sales revenue.",
      "Operating more than 50 brick-and-mortar retail locations with integrated point-of-sale terminal networks."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "PCI DSS Foundations & Roles",
    "explanation": "Visa and Mastercard classify merchants processing over 6 million transactions annually across all channels as Level 1 merchants. Level 1 merchants must typically undergo an annual on-site assessment documented in a Report on Compliance (ROC).",
    "tip": "Merchant Level 1 threshold = over 6 million card transactions per year (or designated by acquirer/brand).",
    "v4_ref": "PCI DSS v4.0.1 Brand Compliance Programs"
  },
  {
    "id": 326,
    "question": "What transaction volume threshold defines a Visa Level 1 Third-Party Service Provider (TPSP) requiring an annual on-site assessment?",
    "options": [
      "Processing, storing, or transmitting more than 100,000 payment card transactions annually for merchant clients.",
      "Processing, storing, or transmitting more than 300,000 payment card transactions annually for merchant clients.",
      "Processing, storing, or transmitting more than 1,000,000 payment card transactions annually for merchant clients.",
      "Processing, storing, or transmitting more than 6,000,000 payment card transactions annually for merchant clients."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "PCI DSS Foundations & Roles",
    "explanation": "Under Visa's compliance program, a Level 1 Third-Party Service Provider (TPSP) is defined as one processing, storing, or transmitting more than 300,000 Visa transactions annually, requiring an annual on-site QSA assessment and ROC.",
    "tip": "Visa Service Provider tiers: Level 1 TPSP = > 300,000 transactions per year; Level 2 = < 300,000.",
    "v4_ref": "PCI DSS v4.0.1 Service Provider Tiers"
  },
  {
    "id": 327,
    "question": "Which document is officially signed by executive management and the assessor to attest that an entity has complied with PCI DSS?",
    "options": [
      "Report on Compliance (ROC), detailing technical assessment findings, testing evidence, and gap remediation.",
      "Compensating Controls Worksheet (CCW), defining technical alternatives for specific unmet requirements.",
      "Attestation of Compliance (AOC), formalizing executive declaration and validation of compliance status.",
      "Self-Assessment Questionnaire (SAQ), documenting internal security control evaluations by the merchant."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "SAQs & Assessment Validation",
    "explanation": "The Attestation of Compliance (AOC) is the formal summary document signed by the assessed entity's executive officer and the assessor (QSA/ISA), certifying the compliance status of the organization to acquirers and brands.",
    "tip": "AOC = Attestation of Compliance (the signed attestation form submitted to acquirers/brands).",
    "v4_ref": "PCI DSS v4.0.1 Reporting Instructions"
  },
  {
    "id": 328,
    "question": "What is the primary role of an Internal Security Assessor (ISA) under PCI SSC qualification programs?",
    "options": [
      "An external contractor accredited to conduct formal third-party Reports on Compliance for client entities.",
      "A dedicated hardware engineer certified by PTS labs to validate physical terminal tamper-detection circuits.",
      "A corporate legal compliance officer authorized to negotiate contractual liability terms with card brands.",
      "An employee of an entity trained and certified by PCI SSC to assess their own firm and improve compliance."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "PCI DSS Foundations & Roles",
    "explanation": "An Internal Security Assessor (ISA) is an internal employee sponsored by their employer to receive PCI SSC training and certification. ISAs perform internal assessments, liaise with QSAs, and maintain security compliance internally.",
    "tip": "ISA = Internal employee certified by PCI SSC to assess and maintain their own organization's compliance.",
    "v4_ref": "PCI SSC Qualification Programs"
  },
  {
    "id": 329,
    "question": "What is the key purpose of the Qualified Integrator and Reseller (QIR) program established by the PCI SSC?",
    "options": [
      "To train and qualify professionals who securely install and configure payment applications and POS terminals.",
      "To accredit independent testing laboratories that validate physical tamper resistance on encrypting PIN pads.",
      "To certify external penetration testers who perform annual network segmentation validation testing for CDEs.",
      "To license software development firms that author commercial off-the-shelf payment software for e-commerce."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "PCI DSS Foundations & Roles",
    "explanation": "The QIR program certifies integrators and resellers to securely install and configure validated payment software and point-of-sale systems into merchant environments in compliance with PCI standards.",
    "tip": "QIRs securely install, configure, and maintain payment applications and POS devices at merchant sites.",
    "v4_ref": "PCI SSC QIR Program"
  },
  {
    "id": 330,
    "question": "According to the PCI SSC Code of Professional Responsibility, what must a PCIP or QSA do if they discover a material conflict of interest regarding an assessment?",
    "options": [
      "Proceed with the assessment provided that the client signs a comprehensive liability and confidentiality waiver.",
      "Promptly disclose the conflict in writing to all relevant parties and recuse themselves if objectivity is lost.",
      "Subcontract the technical scanning portion of the assessment to an Approved Scanning Vendor to ensure parity.",
      "Increase sampling size during testing procedures to statistically counterbalance potential assessment bias."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "PCI DSS Foundations & Roles",
    "explanation": "The PCI SSC Code of Professional Responsibility mandates that certified professionals identify, avoid, and immediately disclose in writing any real or potential conflict of interest, and recuse themselves where independence cannot be maintained.",
    "tip": "Conflicts of interest must be disclosed in writing to the client and PCI SSC, leading to recusal if needed.",
    "v4_ref": "PCI SSC Code of Professional Responsibility"
  },
  {
    "id": 331,
    "question": "In the PCI DSS Prioritized Approach, what is the primary objective of Milestone 1 for an organization beginning compliance?",
    "options": [
      "Milestone 1: Protect perimeter networks by deploying network security controls and segmented firewall DMZs.",
      "Milestone 1: Secure core payment applications by remediating critical application vulnerabilities and flaws.",
      "Milestone 1: Remove sensitive authentication data and limit retention of cardholder data to business needs.",
      "Milestone 1: Implement strong multi-factor authentication mechanisms for all remote administrative access."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "PCI DSS Foundations & Roles",
    "explanation": "Milestone 1 of the Prioritized Approach is 'Remove sensitive authentication data and limit data retention'. By deleting unnecessary card data and eliminating SAD, organizations immediately eliminate their most severe breach risks.",
    "tip": "Prioritized Approach Milestone 1 = Remove Sensitive Authentication Data and limit data retention.",
    "v4_ref": "PCI DSS Prioritized Approach"
  },
  {
    "id": 332,
    "question": "How does PCI DSS interact with statutory and legal privacy regulations such as GDPR, HIPAA, or CCPA?",
    "options": [
      "PCI DSS is a statutory federal regulation that supersedes privacy laws regarding payment transaction records.",
      "Achieving full compliance with HIPAA or GDPR automatically satisfies all requirements mandated by PCI DSS.",
      "Entities demonstrating strict compliance with GDPR are legally exempt from undergoing PCI DSS assessments.",
      "PCI DSS is a private contractual industry standard; it does not replace statutory laws, nor do laws exempt it."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "PCI DSS Foundations & Roles",
    "explanation": "PCI DSS is a contractual standard established by the payment brands. It does not supersede statutory law, compliance with statutory laws (like GDPR or HIPAA) does not satisfy PCI DSS, and statutory compliance does not exempt entities from PCI DSS.",
    "tip": "PCI DSS is a contractual standard; statutory privacy laws (GDPR/HIPAA) do not exempt entities from PCI DSS.",
    "v4_ref": "PCI DSS v4.0.1 Legal & Contractual Context"
  },
  {
    "id": 333,
    "question": "Regarding PCI governance, which function is performed by the Payment Card Brands (Visa, Mastercard, Amex, Discover, JCB) rather than the PCI Security Standards Council (PCI SSC)?",
    "options": [
      "Defining compliance validation levels, enforcing compliance mandates, and penalizing acquiring banks for merchant violations.",
      "Developing, authoring, and maintaining the technical requirements of the PCI Data Security Standard (PCI DSS).",
      "Administering training courses and certifying individual Payment Card Industry Professionals (PCIPs) and QSAs.",
      "Publishing and maintaining the official lists of validated PTS devices, validated P2PE solutions, and certified QSAs."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "PCI DSS Foundations & Roles",
    "explanation": "The Payment Card Brands are responsible for establishing compliance validation tiers, enforcing compliance deadlines, and levying monetary penalties against acquiring banks. The PCI SSC manages the security standards and assessor programs, but has no legal authority to enforce compliance or collect fines.",
    "tip": "PCI SSC = Standards & Assessor Certification. Payment Brands = Enforcement, Compliance Levels & Fines.",
    "v4_ref": "PCI SSC Governance & Brand Roles"
  },
  {
    "id": 334,
    "question": "An organization has a flat network with no internal firewalls or VLAN segmentation. Its web server processes credit cards, but its employee HR workstation has no cardholder data. What is the scope of PCI DSS?",
    "options": [
      "Only the web server that processes payment cards is in scope; the rest of the network is entirely excluded.",
      "Every system component on the flat network is in scope because no segmentation exists to isolate the CDE.",
      "Only systems running database engines or server operating systems are in scope; user endpoints are exempt.",
      "The entire network is exempt from assessment because corporate employee human resource data is present."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Scope & Segmentation",
    "explanation": "In a flat network where no adequate segmentation controls are in place, all system components on the entire network are considered in-scope for PCI DSS because untrusted systems have unrestricted access to CDE systems.",
    "tip": "Without network segmentation, the entire network is in scope for PCI DSS.",
    "v4_ref": "PCI DSS Scoping Guidance"
  },
  {
    "id": 335,
    "question": "What characterizes a 'Security-Impacting System' when defining PCI DSS scope?",
    "options": [
      "A system component that directly stores, processes, or transmits cardholder data or sensitive authentication data.",
      "A system component that has direct network connectivity to the CDE but does not store, process, or transmit data.",
      "A system component that provides security services like authentication, logging, or patch management to the CDE.",
      "A system component that is properly isolated and segmented such that it cannot access or impact the security of CDE."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Scope & Segmentation",
    "explanation": "Security-impacting systems (such as Active Directory, NTP servers, SIEM/logging platforms, and patch management servers) do not directly store or process cardholder data, but their compromise could directly compromise the security of the CDE.",
    "tip": "Security-impacting systems provide critical security services (AD, NTP, DNS, SIEM) to CDE components.",
    "v4_ref": "PCI DSS v4.0.1 Scoping Principles"
  },
  {
    "id": 336,
    "question": "What is required to validate that network segmentation controls are functioning effectively to isolate the CDE from out-of-scope networks?",
    "options": [
      "Reviewing firewall vendor warranty documentation and confirming routing hardware firmware support lifecycles.",
      "Inspecting physical cable pathways and verifying that color-coded patch cords separate production switch ports.",
      "Conducting administrative interviews with network engineers to verify that segmentation policies are observed.",
      "Performing penetration testing against segmentation controls to verify out-of-scope systems cannot reach CDE."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Scope & Segmentation",
    "explanation": "Requirement 11.4.5 and 11.4.6 mandate that network segmentation controls must be validated through penetration testing to confirm that out-of-scope networks cannot communicate with or access systems in the CDE.",
    "tip": "Penetration testing is the required method to validate network segmentation controls.",
    "v4_ref": "PCI DSS v4.0.1 Req 11.4.5"
  },
  {
    "id": 337,
    "question": "Under Requirement 11.4.5, how often must a Merchant validate its network segmentation controls via penetration testing?",
    "options": [
      "At least once every 12 months, and after any change to segmentation controls or network boundary configurations.",
      "At least once every 6 months, and after any change to segmentation controls or network boundary configurations.",
      "At least once every 3 months, coinciding with mandatory quarterly external ASV vulnerability scanning runs.",
      "At least once every 24 months, provided that no network security hardware or routing changes were introduced."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Scope & Segmentation",
    "explanation": "Requirement 11.4.5 requires merchants to test network segmentation controls via penetration testing at least once every 12 months (annually) and after any changes to segmentation controls.",
    "tip": "Merchants validate segmentation via pen testing every 12 months; Service Providers validate every 6 months.",
    "v4_ref": "PCI DSS v4.0.1 Req 11.4.5"
  },
  {
    "id": 338,
    "question": "In an Infrastructure as a Service (IaaS) cloud deployment, which PCI DSS responsibilities typically remain the responsibility of the customer?",
    "options": [
      "Physical datacenter security, HVAC facilities maintenance, and hardware hypervisor virtualization updates.",
      "Guest OS patching, firewall rule definition, access control configuration, and virtual machine application security.",
      "Physical destruction of decommissioned storage arrays, biometric perimeter access controls, and power grids.",
      "Physical server blade replacement, network cable infrastructure maintenance, and fiber optic splice testing."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Scope & Segmentation",
    "explanation": "In an IaaS deployment, the cloud service provider manages physical infrastructure, hypervisor, and physical facilities. The customer is responsible for guest operating systems, virtual firewalls, user access controls, patch management, and applications.",
    "tip": "IaaS customer responsibilities: guest OS, virtual networking/firewalls, application security, IAM, logging.",
    "v4_ref": "PCI DSS Cloud Computing Guidelines"
  },
  {
    "id": 339,
    "question": "Under Requirement 12.5.2, what must an entity document and verify regarding its PCI DSS scope?",
    "options": [
      "A complete list of external marketing web domains, customer service phone numbers, and corporate social handles.",
      "A registry of public IP ranges assigned to external customer browsers accessing cloud-hosted marketing portals.",
      "An accurate inventory of all CDE systems, connected-to systems, security-impacting systems, and card data flows.",
      "An architectural diagram of executive office suites and physical badge reader locations for corporate facilities."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Scope & Segmentation",
    "explanation": "Requirement 12.5.2 requires documented confirmation of PCI DSS scope, including an inventory of all CDE systems, connected-to systems, security-impacting systems, third-party connections, and data flows.",
    "tip": "Req 12.5.2 mandates documenting all CDE, connected-to, and security-impacting systems and data flows.",
    "v4_ref": "PCI DSS v4.0.1 Req 12.5.2"
  },
  {
    "id": 340,
    "question": "Requirement 1.2.1 mandates that network security control (NSC) configurations must:",
    "options": [
      "Permit all inbound traffic from public networks by default to maximize payment gateway transaction throughput.",
      "Rely exclusively on vendor default access control lists supplied with enterprise edge routing hardware devices.",
      "Disable stateful inspection logging on perimeter firewalls to minimize packet processing latency on gateway links.",
      "Restrict traffic to only that which is necessary for the cardholder data environment, denying all other traffic."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 1 & 2: Network & Configurations",
    "explanation": "Requirement 1.2.1 requires network security controls to restrict traffic to only that which is necessary for the cardholder data environment, and deny all other inbound and outbound traffic by default.",
    "tip": "Firewalls/NSCs must operate on a default-deny principle: allow only necessary traffic, deny all else.",
    "v4_ref": "PCI DSS v4.0.1 Req 1.2.1"
  },
  {
    "id": 341,
    "question": "How often must Network Security Control (NSC) rulesets be reviewed under Requirement 1.2.7?",
    "options": [
      "At least once every 6 months, to verify that only authorized, documented ports and protocols remain active.",
      "At least once every 12 months, coinciding with the annual Report on Compliance formal assessment validation.",
      "At least once every 30 days, or immediately following any minor software patch update applied to edge routers.",
      "Only upon decommissioning legacy firewall hardware or upgrading core network routing infrastructure devices."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 1 & 2: Network & Configurations",
    "explanation": "Requirement 1.2.7 requires that configurations and rulesets for network security controls are reviewed at least once every six months to confirm they are valid and authorized.",
    "tip": "Firewall and NSC ruleset reviews must be conducted at least once every 6 months.",
    "v4_ref": "PCI DSS v4.0.1 Req 1.2.7"
  },
  {
    "id": 342,
    "question": "Under Requirement 1.3.1, how must direct traffic between the Internet and the Cardholder Data Environment (CDE) be handled?",
    "options": [
      "Permitted directly if the CDE host is secured with multi-factor authentication and endpoint threat detection.",
      "Direct traffic between the Internet and any CDE system component is strictly prohibited; a DMZ must be deployed.",
      "Direct inbound connections are permitted for HTTPS traffic on port 443 provided that an ASV scan has passed.",
      "Direct traffic is allowed during scheduled maintenance windows if supervised by network operations engineers."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 1 & 2: Network & Configurations",
    "explanation": "Requirement 1.3.1 states that inbound traffic from untrusted networks (such as the Internet) directly to any system component in the CDE is prohibited. Inbound traffic must pass through a DMZ where security controls inspect and terminate connections.",
    "tip": "Direct connections between the Internet and CDE are prohibited; inbound traffic must terminate in a DMZ.",
    "v4_ref": "PCI DSS v4.0.1 Req 1.3.1"
  },
  {
    "id": 343,
    "question": "What is the requirement regarding vendor-supplied default passwords and credentials under Requirement 2.2.2?",
    "options": [
      "Vendor default accounts may be retained for 90 days following system deployment while testing takes place.",
      "Default credentials may remain active provided that the system is located behind an internal stateful firewall.",
      "All vendor default passwords and accounts must be changed or disabled prior to deploying systems on any network.",
      "Vendor defaults only need to be modified if system components are directly accessible from the public Internet."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 1 & 2: Network & Configurations",
    "explanation": "Requirement 2.2.2 mandates that all vendor-supplied defaults (including default passwords, accounts, and SNMP community strings) are changed or disabled before installing or connecting a system on the network.",
    "tip": "Always change or disable vendor default passwords before placing any system into production or on a network.",
    "v4_ref": "PCI DSS v4.0.1 Req 2.2.2"
  },
  {
    "id": 344,
    "question": "Under Requirement 2.2.3, what is the 'primary function' rule for system components?",
    "options": [
      "All enterprise servers must run virtualized hypervisors to combine web, database, and DNS roles on one physical box.",
      "Production system components must dedicate primary resources to processing payment transactions over all tasks.",
      "System components may combine multiple high-risk functions provided that host-based intrusion prevention runs.",
      "Each system component must have only one primary function to prevent services of differing security levels clashing."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 1 & 2: Network & Configurations",
    "explanation": "Requirement 2.2.3 requires that primary functions with different security levels (e.g., web server vs. database server) are isolated on separate system components or virtual machines to prevent cross-service compromise.",
    "tip": "One primary function per server/virtual host to isolate services requiring different security levels.",
    "v4_ref": "PCI DSS v4.0.1 Req 2.2.3"
  },
  {
    "id": 345,
    "question": "Which administrative protocol is prohibited for non-console management of CDE systems due to lack of encryption?",
    "options": [
      "Telnet, because it transmits administrative user credentials and management command sessions across the wire in cleartext.",
      "Secure Shell (SSH), because it provides encrypted shell sessions that obscure administrative activities from IDS inspection.",
      "Transport Layer Security (TLS), because it requires centralized certificate authority trust chains to authenticate endpoints.",
      "IPsec VPN, because it encapsulates administrative network traffic within encrypted tunnels preventing firewall deep inspection."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 1 & 2: Network & Configurations",
    "explanation": "Telnet transmits user IDs, passwords, and commands in cleartext, violating Requirement 2.2.6/2.2.7. Encrypted protocols such as SSH or HTTPS must be used for non-console administrative access.",
    "tip": "Telnet, rlogin, and cleartext HTTP are prohibited for non-console administrative access; use SSH or HTTPS.",
    "v4_ref": "PCI DSS v4.0.1 Req 2.2.6"
  },
  {
    "id": 346,
    "question": "Under Requirement 3.1.1, how must an entity handle cardholder data retention and disposal?",
    "options": [
      "Retain all cardholder data records indefinitely in secondary storage archives for longitudinal data mining.",
      "Implement a formal retention policy and quarterly purge process to remove data exceeding defined business needs.",
      "Store unencrypted primary account numbers on offline backup tapes without applying automated deletion schedules.",
      "Purge historical payment transaction records only when database cluster storage capacity exceeds ninety percent."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 3 & 4: Data Protection & Encryption",
    "explanation": "Requirement 3.1.1 requires a formal data retention and disposal policy, including limiting storage amount and retention time to strictly necessary business/legal needs, and executing a quarterly purge process.",
    "tip": "Cardholder data retention must be minimized, with a quarterly process to purge data exceeding retention periods.",
    "v4_ref": "PCI DSS v4.0.1 Req 3.1.1"
  },
  {
    "id": 347,
    "question": "An acquirer asks a merchant if they can retain the Card Verification Code (CVV2/CVC2) after transaction authorization completes to handle customer returns and recurring billing. What is the correct response under PCI DSS?",
    "options": [
      "Yes, provided that the CVV2 value is strongly encrypted using AES-256 and stored within a dedicated hardware HSM.",
      "Yes, provided that the cardholder gives explicit written consent authorizing recurring subscription renewals.",
      "No, post-authorization storage of Sensitive Authentication Data such as CVV2 is strictly prohibited in all cases.",
      "Yes, provided that the merchant stores the validation code on an isolated server disconnected from the Internet."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 3 & 4: Data Protection & Encryption",
    "explanation": "Under Requirement 3.2.1, Sensitive Authentication Data (SAD)—including CVV2, CVC2, CID, and CAV2—must NEVER be retained after transaction authorization, even if encrypted. No customer consent or encryption allows post-authorization SAD storage for merchants.",
    "tip": "SAD (CVV2/CVC2/PIN/track data) must NEVER be stored post-authorization, even if encrypted.",
    "v4_ref": "PCI DSS v4.0.1 Req 3.2.1"
  },
  {
    "id": 348,
    "question": "Which entity is the ONLY exception permitted to store Sensitive Authentication Data (SAD) post-authorization?",
    "options": [
      "Level 1 Merchants who process more than six million payment card transactions across all channels each year.",
      "Third-Party Payment Processors and Gateways that execute payment tokenization services on behalf of merchants.",
      "Approved Scanning Vendors (ASVs) conducting authorized penetration testing and vulnerability scan evaluations.",
      "Card issuers (issuing banks) that have a documented business justification and secure cryptographic safeguards."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 3 & 4: Data Protection & Encryption",
    "explanation": "PCI DSS Requirement 3.2 allows only card issuers and entities supporting issuing services to retain Sensitive Authentication Data (SAD) post-authorization, and only if there is a legitimate business need and the data is secured.",
    "tip": "Only card issuers (and issuing processors) may store SAD post-authorization with legitimate business need.",
    "v4_ref": "PCI DSS v4.0.1 Req 3.2"
  },
  {
    "id": 349,
    "question": "What is the maximum number of digits of a Primary Account Number (PAN) that may generally be displayed to personnel without a documented business need under Requirement 3.3.1?",
    "options": [
      "No more than the first six and last four digits (BIN and last 4), or the BIN length plus last 4 digits for 8-digit BINs.",
      "No more than the first twelve digits, ensuring that the final four digits are masked across all user workstations.",
      "Exactly the first four and last four digits, requiring all middle account digits to be permanently truncated.",
      "All sixteen digits of the account number, provided that the viewing employee has passed a formal criminal check."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 3 & 4: Data Protection & Encryption",
    "explanation": "Requirement 3.3.1 states that PAN displays must be masked so that only personnel with a legitimate business need can view more than the BIN (first six or eight digits) and the last four digits.",
    "tip": "PAN display masking: Show no more than the first 6 (or 8 for newer BINs) and last 4 digits unless business need exists.",
    "v4_ref": "PCI DSS v4.0.1 Req 3.3.1"
  },
  {
    "id": 350,
    "question": "Under PCI DSS v4.0 Requirement 3.5.1.2, if an entity uses one-way hashing to render PAN unreadable, what additional control is required?",
    "options": [
      "The hashing algorithm must be standard MD5 or SHA-1 executed without secret keys to ensure global cross-system lookup.",
      "The hash must be a keyed cryptographic hash (such as HMAC) using strong cryptography and secure cryptographic keys.",
      "The entity must maintain a reversible decryption cipher lookup table stored on a separate security-impacting server.",
      "The resulting hash digest must be truncated to twelve characters to prevent rainbow table precomputation exposures."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 3 & 4: Data Protection & Encryption",
    "explanation": "PCI DSS v4.0 Requirement 3.5.1.2 mandates that if one-way hashing is used to render PAN unreadable, it must be a keyed cryptographic hash (e.g., HMAC) with secret key management, or salted with an entity-wide secret.",
    "tip": "v4.0 Requirement 3.5.1.2 requires keyed cryptographic hashes (HMAC) with key management for PAN hashing.",
    "v4_ref": "PCI DSS v4.0.1 Req 3.5.1.2"
  },
  {
    "id": 351,
    "question": "What is the difference between a Data Encryption Key (DEK) and a Key Encrypting Key (KEK)?",
    "options": [
      "A DEK encrypts plaintext account data directly, while a KEK encrypts and protects the stored DEK.",
      "A DEK establishes mutual TLS sessions, while a KEK generates one-time authentication tokens.",
      "A DEK signs digital software certificates, while a KEK hashes transaction payloads at rest.",
      "A DEK masks primary account numbers on screens, while a KEK enforces storage truncated salts."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 3 & 4: Data Protection & Encryption",
    "explanation": "A Data Encryption Key (DEK) is used to encrypt plaintext account data. A Key Encrypting Key (KEK) is a cryptographic key used to wrap and protect the DEK. The KEK must be at least as strong as the DEK.",
    "tip": "DEK encrypts data; KEK encrypts the DEK.",
    "v4_ref": "PCI DSS v4.0.1 Req 3.6.1"
  },
  {
    "id": 352,
    "question": "Under Requirement 3.6.1.4, cryptographic keys must be retired or rotated when:",
    "options": [
      "The underlying physical server hosting the HSM undergoes major operating system kernel patching.",
      "The key reaches the end of its defined cryptoperiod or when key integrity is suspected compromised.",
      "A senior cryptoperiod custodian completes an annual security awareness compliance recertification.",
      "The corporate certificate authority renews its baseline public key infrastructure trust anchors."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 3 & 4: Data Protection & Encryption",
    "explanation": "Requirement 3.6.1.4 requires periodic key rotation at the end of the key's defined cryptoperiod (defined in accordance with industry standards like NIST SP 800-57) and immediate retirement upon suspicion of compromise.",
    "tip": "Key rotation: End of cryptoperiod OR upon suspected compromise.",
    "v4_ref": "PCI DSS v4.0.1 Req 3.6.1.4"
  },
  {
    "id": 353,
    "question": "Under Requirement 4.2.1, what security measure is required when transmitting cardholder data across open, public networks (e.g. the Internet)?",
    "options": [
      "Encoding payloads using Base64 with proprietary obfuscation hashing across standard network sockets.",
      "Enforcing perimeter MAC address filtering combined with stateful transport layer packet inspection.",
      "Deploying strong cryptography such as TLS 1.2 or TLS 1.3 using trusted keys and approved ciphers.",
      "Segmenting network packets using static virtual local area network tags over unencrypted backbones."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 3 & 4: Data Protection & Encryption",
    "explanation": "Requirement 4.2.1 requires strong cryptography (such as TLS 1.2/1.3, IPsec, or SSH) to protect PAN during transmission over public networks. SSL and early TLS are insecure and strictly prohibited.",
    "tip": "Transmission over public networks requires strong cryptography (e.g. TLS 1.2+).",
    "v4_ref": "PCI DSS v4.0.1 Req 4.2.1"
  },
  {
    "id": 354,
    "question": "Under Requirement 4.2.2, is it permissible to send unprotected Primary Account Numbers (PAN) via end-user messaging technologies (e.g., email, SMS, WhatsApp, instant messaging)?",
    "options": [
      "Yes, provided the messaging application operates over an authenticated enterprise corporate VPN.",
      "Yes, provided explicit written consent is obtained from the cardholder prior to message delivery.",
      "Yes, provided end-to-end messaging transmission is limited strictly to internal company staff.",
      "No, transmitting unprotected primary account numbers via end-user messaging is never permitted."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 3 & 4: Data Protection & Encryption",
    "explanation": "Requirement 4.2.2 explicitly prohibits transmitting unencrypted PAN via end-user messaging technologies (email, SMS, chat, instant messaging) because these channels are vulnerable to interception and storage.",
    "tip": "Unprotected PAN cannot be sent via end-user messaging (email, SMS, chat, etc.).",
    "v4_ref": "PCI DSS v4.0.1 Req 4.2.2"
  },
  {
    "id": 355,
    "question": "What is the key management requirement regarding split knowledge and dual control (Req 3.6.1.3)?",
    "options": [
      "Two individuals must operate key controls together, with components split so no single person knows the whole key.",
      "Two system administrators must independently approve key rotation schedules through an automated ticketing system.",
      "A single designated security custodian may generate cryptographic master keys if audited by an external assessor.",
      "Cryptographic keys must be divided into public and private pairs where separate engineering teams hold each pair."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 3 & 4: Data Protection & Encryption",
    "explanation": "Requirement 3.6.1.3 mandates that manual key management operations enforce dual control (two people must participate) and split knowledge (no individual possesses the entire key or key password).",
    "tip": "Dual control = 2 people needed; Split knowledge = no single person knows the whole key.",
    "v4_ref": "PCI DSS v4.0.1 Req 3.6.1.3"
  },
  {
    "id": 356,
    "question": "Under Requirement 5.2.1, how must anti-malware software be deployed?",
    "options": [
      "Exclusively on edge firewalls and intrusion prevention appliances filtering perimeter ingress traffic.",
      "On all system components, unless an entity demonstrates through a targeted risk analysis they are immune.",
      "Solely on Windows-based administrative jump boxes and user workstations accessing external websites.",
      "Exclusively on web application servers that directly accept cardholder submissions from the internet."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 5 & 6: Vulnerability & Secure Systems",
    "explanation": "Requirement 5.2.1 requires anti-malware on all system components commonly affected by malware. Systems claimed to be immune (e.g. Linux/mainframe) must be formally evaluated in a documented Targeted Risk Analysis (TRA).",
    "tip": "Anti-malware is required on all systems unless a TRA formally demonstrates they are not susceptible.",
    "v4_ref": "PCI DSS v4.0.1 Req 5.2.1"
  },
  {
    "id": 357,
    "question": "Requirement 5.3.3 mandates that anti-malware mechanisms must:",
    "options": [
      "Be configured to permit local desktop users to suspend signature engine updates during peak sales.",
      "Be configured to execute full file system integrity scans only during scheduled maintenance halts.",
      "Be actively running and unable to be disabled or altered unless authorized by management in writing.",
      "Be operated in passive logging mode without active blocking capabilities to maximize performance."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 5 & 6: Vulnerability & Secure Systems",
    "explanation": "Requirement 5.3.3 states anti-malware mechanisms must be actively running and protected against unauthorized disablement. Temporary suspension requires documented management approval.",
    "tip": "Anti-malware must be actively running and protected from user tampering/disablement.",
    "v4_ref": "PCI DSS v4.0.1 Req 5.3.3"
  },
  {
    "id": 358,
    "question": "Under Requirement 6.3.1, how must software development vulnerabilities be identified and ranked?",
    "options": [
      "By reviewing internal helpdesk incident tickets and classifying issues based on operational downtime.",
      "By relying exclusively on annual external penetration testing reports without continuous monitoring.",
      "By assessing vendor marketing security bulletins and applying vendor-suggested commercial scores.",
      "By monitoring recognized industry vulnerability sources and assigning formal risk rankings to flaws."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 5 & 6: Vulnerability & Secure Systems",
    "explanation": "Requirement 6.3.1 requires an active vulnerability identification process using trusted external sources and an established risk ranking methodology to prioritize patching.",
    "tip": "Identify vulnerabilities using industry sources and assign formal risk rankings (Req 6.3.1).",
    "v4_ref": "PCI DSS v4.0.1 Req 6.3.1"
  },
  {
    "id": 359,
    "question": "What is the mandatory installation timeframe for security patches classified as 'Critical' or 'High' under Requirement 6.3.3?",
    "options": [
      "Within 30 calendar days of release.",
      "Within 60 calendar days of release.",
      "Within 90 calendar days of release.",
      "Within 14 calendar days of release."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 5 & 6: Vulnerability & Secure Systems",
    "explanation": "Requirement 6.3.3 explicitly requires all 'Critical' and 'High' security patches to be installed within one month (30 calendar days) of vendor release.",
    "tip": "Critical & High security patches must be installed within 30 days (Req 6.3.3).",
    "v4_ref": "PCI DSS v4.0.1 Req 6.3.3"
  },
  {
    "id": 360,
    "question": "Under Requirement 6.4.2, what is mandatory for public-facing web applications to protect against web-based attacks?",
    "options": [
      "Conducting manual static code reviews of all web application pages at least once every quarter.",
      "Deploying an automated technical solution like a WAF that detects and prevents web-based attacks.",
      "Implementing multi-factor authentication for public consumers accessing the web shopping cart.",
      "Performing weekly credentialed internal vulnerability scans across the web application cluster."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 5 & 6: Vulnerability & Secure Systems",
    "explanation": "Requirement 6.4.2 mandates an automated technical solution (such as a WAF) to continually detect and prevent web application attacks on public-facing web applications.",
    "tip": "Public web apps require an automated detection/prevention technical solution (e.g. WAF).",
    "v4_ref": "PCI DSS v4.0.1 Req 6.4.2"
  },
  {
    "id": 361,
    "question": "What new control does PCI DSS v4.0 Requirement 6.4.3 introduce for payment pages in e-commerce websites?",
    "options": [
      "Requiring all consumer browser sessions to block third-party cookies during the online checkout checkout flow.",
      "Mandating that payment pages utilize only server-side CGI scripts while completely disabling client JavaScript.",
      "Maintaining an inventory, business justification, and integrity checks for all scripts run in consumer browsers.",
      "Enforcing hardware-based security tokens for all cardholders completing remote transactions on payment pages."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 5 & 6: Vulnerability & Secure Systems",
    "explanation": "Requirement 6.4.3 was introduced in v4.0 to stop Magecart/e-skimming attacks. It requires merchants to manage, justify, and ensure the cryptographic integrity of all third-party and first-party JavaScript running on payment pages.",
    "tip": "Req 6.4.3: Inventory, business justification & integrity verification for all payment page scripts.",
    "v4_ref": "PCI DSS v4.0.1 Req 6.4.3"
  },
  {
    "id": 362,
    "question": "Under Requirement 6.5.1, what separation of environments is strictly required during the software development lifecycle?",
    "options": [
      "Staging environments must share the same network segment as production systems to ensure test parity.",
      "Development systems may reside within production if database schemas utilize column-level masking.",
      "Production administrator credentials must be mirrored across development and quality assurance hosts.",
      "Development and test environments must be strictly separated from production, with access controlled."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 5 & 6: Vulnerability & Secure Systems",
    "explanation": "Requirement 6.5.1 requires complete logical or physical separation between development/test environments and production environments to prevent untested code or compromised dev tools from affecting production.",
    "tip": "Dev and test environments must be strictly separated from production.",
    "v4_ref": "PCI DSS v4.0.1 Req 6.5.1"
  },
  {
    "id": 363,
    "question": "Under Requirement 6.5.3, what data is strictly forbidden from being used in pre-production test environments?",
    "options": [
      "Live production cardholder data or sensitive authentication data.",
      "Synthetically generated cardholder numbers with valid Luhn checks.",
      "Anonymized transaction amounts paired with dummy customer records.",
      "Deprecated test encryption keys utilized in staging environments."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 5 & 6: Vulnerability & Secure Systems",
    "explanation": "Requirement 6.5.3 forbids using live production Cardholder Data or Sensitive Authentication Data in development or test environments. Test environments typically lack production-grade security.",
    "tip": "Production cardholder data and SAD are strictly forbidden in test/dev environments.",
    "v4_ref": "PCI DSS v4.0.1 Req 6.5.3"
  },
  {
    "id": 364,
    "question": "Under Requirement 6.2.2, how often must personnel involved in bespoke and custom software development be trained in secure coding practices?",
    "options": [
      "At least once every 6 months.",
      "At least once every 12 months.",
      "At least once every 24 months.",
      "At least once every 36 months."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 5 & 6: Vulnerability & Secure Systems",
    "explanation": "Requirement 6.2.2 mandates annual training for developers covering secure coding techniques, common application vulnerabilities (e.g. OWASP Top 10), and authentication/data protection.",
    "tip": "Software developer secure coding training = at least once every 12 months.",
    "v4_ref": "PCI DSS v4.0.1 Req 6.2.2"
  },
  {
    "id": 365,
    "question": "What is the requirement for custom software code review prior to release to production under Requirement 6.2.3?",
    "options": [
      "Code changes must be reviewed solely by the original author following the successful execution of unit test suites.",
      "Code reviews are only required for third-party commercial plugins before integration into custom software modules.",
      "Code changes must be reviewed prior to release by individuals other than the author or validated via code scanning.",
      "Code reviews can be completely bypassed if software modules are compiled with cryptographic code signing anchors."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 5 & 6: Vulnerability & Secure Systems",
    "explanation": "Requirement 6.2.3 requires independent code reviews before code is released into production, conducted by qualified individuals other than the originating author, or verified by automated static/dynamic code analysis.",
    "tip": "Code review must be performed by someone OTHER than the author, or via automated tools.",
    "v4_ref": "PCI DSS v4.0.1 Req 6.2.3"
  },
  {
    "id": 366,
    "question": "What is the core principle that must govern all user access to Cardholder Data Environment components under Requirement 7.1?",
    "options": [
      "Access is granted broadly across IT departments to facilitate rapid troubleshooting during critical outages.",
      "Access privileges are provisioned based on departmental seniority rather than specific job responsibilities.",
      "Access is assigned universally to all technical personnel possessing active security clearance certificates.",
      "Access is restricted strictly to the minimum necessary for an individual's job role on a need-to-know basis."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 7 & 8: Access Control & Authentication",
    "explanation": "Requirement 7.1 mandates restricting access to system components and cardholder data to only those individuals whose job requires such access, implementing the principle of least privilege.",
    "tip": "Access must be restricted based on need-to-know and least privilege.",
    "v4_ref": "PCI DSS v4.0.1 Req 7.1"
  },
  {
    "id": 367,
    "question": "Under PCI DSS v4.0 Requirement 7.2.4, how often must an entity review all user accounts and related access privileges to ensure they remain appropriate?",
    "options": [
      "At least once every 6 months.",
      "At least once every 3 months.",
      "At least once every 12 months.",
      "At least once every 24 months."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 7 & 8: Access Control & Authentication",
    "explanation": "Requirement 7.2.4 requires that all user accounts and access privileges are reviewed at least once every six months to confirm that privileges remain aligned with current job duties and unnecessary accounts are revoked.",
    "tip": "User account and privilege review = at least once every 6 months.",
    "v4_ref": "PCI DSS v4.0.1 Req 7.2.4"
  },
  {
    "id": 368,
    "question": "Under Requirement 8.2.1, how must individual users authenticate to system components?",
    "options": [
      "Using shared role-based credentials managed within an encrypted team password safe for administrative duties.",
      "Using a unique user identification accompanied by at least one valid authentication factor prior to access.",
      "Using anonymous service accounts authenticated via shared Kerberos tickets configured without audit trails.",
      "Using generic team login profiles provided that all access timestamps are manually recorded in shift logs."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 7 & 8: Access Control & Authentication",
    "explanation": "Requirement 8.2.1 requires all users to be uniquely identified. Unique user IDs ensure individual accountability and non-repudiation in audit trails.",
    "tip": "Unique user IDs are mandatory for individual accountability (Req 8.2.1).",
    "v4_ref": "PCI DSS v4.0.1 Req 8.2.1"
  },
  {
    "id": 369,
    "question": "How must accounts allocated to third-party vendors and service providers for remote maintenance be managed under Requirement 8.2.4?",
    "options": [
      "Maintained active permanently to allow vendor support personnel to address unexpected outages immediately.",
      "Configured with shared enterprise credentials that rotate automatically on a semi-annual scheduled window.",
      "Enabled only for the duration needed to deliver remote services and disabled immediately upon conclusion.",
      "Granted without multi-factor authentication if remote connections originate from known static vendor IPs."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 7 & 8: Access Control & Authentication",
    "explanation": "Requirement 8.2.4 mandates that vendor remote access accounts are enabled only during the approved maintenance window, monitored while active, and disabled immediately upon completion.",
    "tip": "Vendor remote access accounts: Enabled ONLY when needed, disabled immediately after.",
    "v4_ref": "PCI DSS v4.0.1 Req 8.2.4"
  },
  {
    "id": 370,
    "question": "Under Requirement 8.2.6, what must be done with user accounts that have been inactive?",
    "options": [
      "Reset authentication credentials and assign the account to the employee's direct supervisor.",
      "Demote the user account to read-only guest privileges pending formal departmental review.",
      "Lock access temporarily until the user completes mandatory security awareness training.",
      "Disable or permanently remove the account within 90 calendar days of observed inactivity."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 7 & 8: Access Control & Authentication",
    "explanation": "Requirement 8.2.6 requires that user accounts that have been inactive for more than 90 days are disabled or removed to prevent stale accounts from being leveraged by attackers.",
    "tip": "Inactive accounts must be disabled or removed within 90 days.",
    "v4_ref": "PCI DSS v4.0.1 Req 8.2.6"
  },
  {
    "id": 371,
    "question": "Under Requirement 8.3.4, what is the maximum number of consecutive invalid authentication attempts permitted before an account is locked out?",
    "options": [
      "No more than 10 attempts.",
      "No more than 3 attempts.",
      "No more than 5 attempts.",
      "No more than 15 attempts."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 7 & 8: Access Control & Authentication",
    "explanation": "Requirement 8.3.4 mandates that accounts must be locked out after no more than 10 consecutive failed login attempts to prevent brute-force credential guessing.",
    "tip": "Account lockout threshold = no more than 10 invalid authentication attempts.",
    "v4_ref": "PCI DSS v4.0.1 Req 8.3.4"
  },
  {
    "id": 372,
    "question": "Under Requirement 8.3.5, once an account is locked out due to excessive failed attempts, how long must the lockout duration be enforced?",
    "options": [
      "For at least 15 minutes, or until an automated password reset verification link is emailed.",
      "For at least 30 minutes, or until an authorized administrator explicitly unlocks the user.",
      "For at least 60 minutes, after which the account lockout state resets without intervention.",
      "For at least 24 hours, unless the affected user inputs an administrative override passcode."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 7 & 8: Access Control & Authentication",
    "explanation": "Requirement 8.3.5 states that the lockout duration must be at least 30 minutes, or require manual administrator intervention to unlock.",
    "tip": "Lockout duration = at least 30 minutes, or until unlocked by an administrator.",
    "v4_ref": "PCI DSS v4.0.1 Req 8.3.5"
  },
  {
    "id": 373,
    "question": "What is the new baseline password length requirement under PCI DSS v4.0 Requirement 8.3.6?",
    "options": [
      "Minimum 8 characters containing both alphabetic and special characters across all production systems.",
      "Minimum 10 characters combining uppercase letters, numbers, and symbols without legacy exceptions.",
      "Minimum 12 characters with letters and numbers, or at least 8 if systems cannot support 12 characters.",
      "Minimum 16 characters combining mixed-case alphanumeric strings with mandatory 60-day expiry cycles."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 7 & 8: Access Control & Authentication",
    "explanation": "PCI DSS v4.0 increased the minimum password length to 12 characters (combining numbers and letters). If a legacy system technically cannot support 12 characters, a minimum of 8 characters is permitted.",
    "tip": "Password length in v4.0 = min 12 characters (or min 8 if system cannot support 12).",
    "v4_ref": "PCI DSS v4.0.1 Req 8.3.6"
  },
  {
    "id": 374,
    "question": "Under Requirement 8.4.2 (new in PCI DSS v4.0), Multi-Factor Authentication (MFA) is required for:",
    "options": [
      "Only external third-party contractors connecting to the cardholder environment from untrusted networks.",
      "Only administrative personnel performing privileged configuration modifications on production databases.",
      "Only remote employees accessing enterprise internal applications through client-to-gateway VPN tunnels.",
      "All personnel entering the cardholder data environment, regardless of administrative or non-admin roles."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 7 & 8: Access Control & Authentication",
    "explanation": "Requirement 8.4.2 expanded MFA in v4.0: MFA is now required for ALL individuals entering the CDE, not just administrative users or remote workers.",
    "tip": "v4.0 Req 8.4.2: MFA is mandatory for ALL access into the CDE.",
    "v4_ref": "PCI DSS v4.0.1 Req 8.4.2"
  },
  {
    "id": 375,
    "question": "Under Requirement 8.5.1, what controls govern Multi-Factor Authentication (MFA) mechanisms?",
    "options": [
      "Systems must ensure factor independence, prevent bypass mechanisms, and resist replay attacks.",
      "Systems may derive secondary authentication factors directly from primary password credentials.",
      "Systems must allow administrators to bypass second factors using master hardware security keys.",
      "Systems may deliver reusable unencrypted SMS tokens valid across sequential logon connections."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 7 & 8: Access Control & Authentication",
    "explanation": "Requirement 8.5.1 dictates that MFA systems must enforce factor independence, prevent factor bypass, and ensure resistance to replay attacks.",
    "tip": "MFA systems must: 1) be independent, 2) prevent bypass, 3) resist replay attacks.",
    "v4_ref": "PCI DSS v4.0.1 Req 8.5.1"
  },
  {
    "id": 376,
    "question": "Under PCI DSS Requirement 10.4.1.1, what operational technology must be used to perform daily log reviews across large-scale CDE environments?",
    "options": [
      "Manual command-line inspection of local log files conducted daily by designated system administrators.",
      "Automated mechanisms such as SIEM or log correlation engines to analyze logs and alert on anomalies.",
      "Periodic script-based archiving of raw system logs directly to offsite write-once storage repositories.",
      "Weekly sampling audits performed by certified external assessors against firewall connection logs."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 9 & 10: Physical & Logging",
    "explanation": "Requirement 10.4.1.1 requires using automated mechanisms (such as SIEM, log analytics, or event harvesting engines) to perform daily log reviews and detect anomalies, recognizing that manual review of millions of log lines is impractical.",
    "tip": "Req 10.4.1.1: Automated log review tools (e.g. SIEM) are mandatory for daily log reviews.",
    "v4_ref": "PCI DSS v4.0.1 Req 10.4.1.1"
  },
  {
    "id": 377,
    "question": "How must visitors in sensitive areas be managed under Requirement 9.3.1 and 9.3.2?",
    "options": [
      "Visitors must display government identification at reception and can move unescorted within data centers.",
      "Visitors must be authorized by management but require physical escorts only within executive office suites.",
      "Visitors must be authorized prior to entry, escorted at all times, and issued distinctive physical badges.",
      "Visitors are exempt from visitor badging protocols provided they sign an annual physical security waiver."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 9 & 10: Physical & Logging",
    "explanation": "Requirement 9.3 requires authorizing visitors prior to entry, escorting them at all times in sensitive areas, and issuing badges that clearly distinguish visitors from full-time staff.",
    "tip": "Visitors: Pre-authorized, escorted at all times, clearly badged.",
    "v4_ref": "PCI DSS v4.0.1 Req 9.3.1"
  },
  {
    "id": 378,
    "question": "How long must physical visitor logs and video camera surveillance footage be retained under Requirement 9.3.4 and 9.4.4?",
    "options": [
      "At least 30 calendar days.",
      "At least 60 calendar days.",
      "At least 180 calendar days.",
      "At least 90 calendar days."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 9 & 10: Physical & Logging",
    "explanation": "Requirements 9.3.4 (visitor logs) and 9.4.4 (video surveillance data) mandate retention of logs and video recordings for a minimum of 90 calendar days.",
    "tip": "Visitor logs and video surveillance footage must be kept for at least 90 days.",
    "v4_ref": "PCI DSS v4.0.1 Req 9.3.4 & 9.4.4"
  },
  {
    "id": 379,
    "question": "Under Requirement 9.5.1, what periodic activity must be performed on Point of Interaction (POI) payment devices to prevent skimming?",
    "options": [
      "Maintaining an inventory of devices and periodically inspecting them for tampering or skimming attachments.",
      "Rotating physical terminal serial numbers across merchant retail branches during semi-annual store audits.",
      "Replacing all customer-facing PIN entry modules annually with newly certified factory firmware images.",
      "Operating point of interaction devices exclusively behind physical teller glass enclosures at all times."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 9 & 10: Physical & Logging",
    "explanation": "Requirement 9.5 mandates maintaining an inventory of all POI devices (model, serial number, location) and periodically inspecting them for signs of physical tampering or rogue skimmer attachments.",
    "tip": "POI devices: Maintain inventory + periodic inspections for tampering/skimming.",
    "v4_ref": "PCI DSS v4.0.1 Req 9.5.1"
  },
  {
    "id": 380,
    "question": "Under Requirement 10.2.1, which of the following events must be logged by audit mechanisms?",
    "options": [
      "Only administrative access to core database tables and perimeter firewall policy modifications.",
      "All access to cardholder data, administrative actions, invalid attempts, and log initialization.",
      "Only successful multi-factor authentication sessions and authorized remote VPN tunnel handshakes.",
      "Network throughput statistics, DNS lookup latency, and routine user desktop workstation logoffs."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 9 & 10: Physical & Logging",
    "explanation": "Requirement 10.2.1 enumerates mandatory audit log events: user access to CHD, actions by administrative accounts, invalid login attempts, access to audit trails, and changes to logging configuration.",
    "tip": "Mandatory audit events: User access to CHD, admin actions, failed logins, log system changes.",
    "v4_ref": "PCI DSS v4.0.1 Req 10.2.1"
  },
  {
    "id": 381,
    "question": "Under Requirement 10.2.2, which data elements must be captured for each logged audit event?",
    "options": [
      "User ID, unencrypted primary account number, session encryption cipher, and storage partition path.",
      "Source MAC address, operating system build version, kernel patch release, and terminal shell type.",
      "User ID, event type, date and time, success or failure, event origin, and affected system identity.",
      "Network switch interface name, transport layer payload size, packet checksum, and routing latency."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 9 & 10: Physical & Logging",
    "explanation": "Requirement 10.2.2 specifies six mandatory log fields: 1) User identification, 2) Type of event, 3) Date and time, 4) Success/failure, 5) Event origination, and 6) Identity/name of affected system component or data.",
    "tip": "Log fields: User, Event, Date/Time, Success/Fail, Origin, Affected Component/Data.",
    "v4_ref": "PCI DSS v4.0.1 Req 10.2.2"
  },
  {
    "id": 382,
    "question": "Under Requirement 10.4.1, how often must audit logs of critical security systems (e.g., NSCs, IDS/IPS, authentication servers, servers holding CHD) be reviewed?",
    "options": [
      "At least once every 7 calendar days.",
      "At least once every 30 calendar days.",
      "At least once every 90 calendar days.",
      "At least once daily (every 24 hours)."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 9 & 10: Physical & Logging",
    "explanation": "Requirement 10.4.1 requires daily review of logs for all components that perform security functions (firewalls, IDS/IPS, authentication systems) and all systems that store, process, or transmit cardholder data.",
    "tip": "Security systems & CHD servers = daily log reviews (at least once per day).",
    "v4_ref": "PCI DSS v4.0.1 Req 10.4.1"
  },
  {
    "id": 383,
    "question": "What is the total mandatory retention period for audit logs under Requirement 10.5.1, and how much must be immediately available?",
    "options": [
      "Retain for at least 12 months, with the most recent 3 months immediately available for analysis.",
      "Retain for at least 6 months, with the most recent 30 calendar days immediately available online.",
      "Retain for at least 24 months, with the most recent 6 months maintained on unencrypted storage.",
      "Retain for at least 90 calendar days, with the full logging history immediately queryable online."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 9 & 10: Physical & Logging",
    "explanation": "Requirement 10.5.1 mandates retaining audit trail history for at least one year, with a minimum of the most recent three months immediately available for analysis (online or readily restorable).",
    "tip": "Audit log retention: At least 1 year total, with the last 3 months immediately available.",
    "v4_ref": "PCI DSS v4.0.1 Req 10.5.1"
  },
  {
    "id": 384,
    "question": "Why does Requirement 10.6 mandate time synchronization using Network Time Protocol (NTP) across all in-scope systems?",
    "options": [
      "To eliminate timestamp drift that could degrade database query execution across sharded clusters.",
      "To ensure audit trails reflect consistent chronological sequence for investigations and forensics.",
      "To prevent automated patching tasks from executing concurrently across clustered database servers.",
      "To synchronize cryptographic key rotation intervals with external commercial payment card gateways."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 9 & 10: Physical & Logging",
    "explanation": "Requirement 10.6 requires time synchronization technology (e.g. NTP) so that log timestamps across firewalls, servers, and switches can be accurately correlated during breach investigations.",
    "tip": "Time synchronization ensures log timestamps can be correlated during forensic investigations.",
    "v4_ref": "PCI DSS v4.0.1 Req 10.6"
  },
  {
    "id": 385,
    "question": "How must audit log files be protected from tampering or deletion under Requirement 10.5?",
    "options": [
      "Granting full write privileges to systems engineers while encrypting log archives on local workstation drives.",
      "Storing log files in decentralized local directories while restricting access to senior developers and testers.",
      "Restricting viewing to authorized staff, enforcing read-only controls, offloading logs, and monitoring integrity.",
      "Replicating raw audit events across public cloud storage buckets without requiring access control restrictions."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 9 & 10: Physical & Logging",
    "explanation": "Requirement 10.5 requires securing audit trails to prevent alteration or deletion. Controls include centralized logging, read-only permissions, and cryptographic hashing/file integrity monitoring.",
    "tip": "Log security: Read-only access, offload to centralized servers, FIM to detect tampering.",
    "v4_ref": "PCI DSS v4.0.1 Req 10.5"
  },
  {
    "id": 386,
    "question": "Under Requirement 11.2.1, how does a corporate policy strictly prohibiting the deployment of wireless networks affect the requirement to test for unauthorized (rogue) wireless access points?",
    "options": [
      "The entity is exempt from testing because an administrative policy legally and operationally forbids all wireless devices.",
      "Testing for unauthorized wireless access points remains mandatory at least once every three months, even if wireless is forbidden.",
      "The entity only needs to test for rogue wireless access points once annually during the comprehensive penetration test.",
      "Testing is required only if an employee or visitor formally requests guest Wi-Fi access on an internal corporate VLAN."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 11.2.1 explicitly states that testing for unauthorized (rogue) wireless access points must be performed at least once every three months across all locations, even when a corporate policy strictly prohibits wireless technology. Rogue devices can be plugged in by unauthorized personnel or attackers regardless of written policy.",
    "tip": "Exam Trap: A policy forbidding wireless NEVER exempts an entity from quarterly rogue wireless testing!",
    "v4_ref": "PCI DSS v4.0.1 Req 11.2.1"
  },
  {
    "id": 387,
    "question": "Under Requirement 11.3.1, how often must internal vulnerability scans be conducted, and who may perform them?",
    "options": [
      "At least quarterly and after significant changes, performed by qualified internal or external personnel.",
      "At least monthly and following minor patch releases, performed exclusively by an external certified QSA.",
      "At least semi-annually and after infrastructure migrations, performed solely by third-party ASV vendors.",
      "At least annually and following physical hardware upgrades, performed by internal network administrators."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 11.3.1 requires internal vulnerability scans at least quarterly and after any significant changes to the environment, performed by qualified internal staff or a third party.",
    "tip": "Internal vulnerability scans: At least quarterly + after significant changes; by qualified personnel.",
    "v4_ref": "PCI DSS v4.0.1 Req 11.3.1"
  },
  {
    "id": 388,
    "question": "Under PCI DSS v4.0 Requirement 11.3.1.2, what is the new scanning requirement for internal vulnerability assessments?",
    "options": [
      "Scans must be performed using non-credentialed port sweeps to avoid exposing service authentication tokens.",
      "Scans must be performed via authenticated scanning using sufficient credentials to assess system security.",
      "Scans must be executed exclusively against perimeter web proxies without probing internal subnet hosts.",
      "Scans must utilize passive network packet sniffers without establishing active socket connections on hosts."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "PCI DSS v4.0 Requirement 11.3.1.2 introduced a requirement for authenticated internal vulnerability scanning to ensure deep visibility into unpatched software, misconfigurations, and local flaws.",
    "tip": "PCI DSS v4.0 Req 11.3.1.2 requires internal scans to be AUTHENTICATED.",
    "v4_ref": "PCI DSS v4.0.1 Req 11.3.1.2"
  },
  {
    "id": 389,
    "question": "Who is authorized to perform mandatory external vulnerability scans under Requirement 11.3.2?",
    "options": [
      "Any internal system administrator holding recognized security certifications.",
      "An external independent penetration tester approved by corporate management.",
      "An Approved Scanning Vendor (ASV) formally qualified and listed by the PCI SSC.",
      "The acquiring bank's internal fraud investigation and risk assessment unit."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 11.3.2 mandates that external vulnerability scans must be performed at least quarterly by an Approved Scanning Vendor (ASV) qualified by the PCI SSC.",
    "tip": "External vulnerability scans must be conducted by an Approved Scanning Vendor (ASV).",
    "v4_ref": "PCI DSS v4.0.1 Req 11.3.2"
  },
  {
    "id": 390,
    "question": "What constitutes a passing result for an ASV quarterly external vulnerability scan?",
    "options": [
      "A scan report demonstrating zero vulnerabilities of any severity across all discovered perimeter assets.",
      "An overall average CVSS score below 5.0 with no high-risk exploitable buffer overflows or SQL injections.",
      "Remediation of all critical-rated CVEs within 90 days, validated by internal vulnerability test scripts.",
      "Zero vulnerabilities with CVSS scores of 4.0 or higher and no automatic scan failure conditions present."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Under ASV Program Guidelines, a passing scan requires that no vulnerabilities with a CVSS base score of 4.0 or higher exist, and all components pass with no automatic failure conditions.",
    "tip": "ASV passing score: Zero vulnerabilities with CVSS >= 4.0 and no auto-fails.",
    "v4_ref": "PCI DSS v4.0.1 Req 11.3.2 & ASV Guide"
  },
  {
    "id": 391,
    "question": "Under Requirement 11.4.3.1, what specific attack surface must application-layer penetration testing evaluate?",
    "options": [
      "Application vulnerabilities including injection flaws, broken access control, and business logic flaws.",
      "Perimeter router packet filtering tables, border gateway routing convergence, and transit link MTU sizes.",
      "Physical data center access locks, visitor badging logbooks, and perimeter CCTV motion sensor coverage.",
      "Public domain DNS zone transfers, SPF email authentication records, and external registrar WHOIS privacy."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 11.4.3.1 requires penetration testing at the application layer to validate defenses against application-specific vulnerabilities (e.g., OWASP Top 10 vulnerabilities, injection, broken access control) in bespoke software.",
    "tip": "Application penetration testing must cover OWASP/6.2.4 application-layer attack vectors.",
    "v4_ref": "PCI DSS v4.0.1 Req 11.4.3.1"
  },
  {
    "id": 392,
    "question": "Under Requirement 11.4.4, if penetration testing uncovers vulnerabilities, what is the required next step?",
    "options": [
      "Log the vulnerabilities in the corporate risk register and schedule remediation during annual audits.",
      "Remediate identified vulnerabilities and perform re-testing until verified as successfully resolved.",
      "Request a formal compensatory security waiver from the PCI SSC to defer vulnerability remediation.",
      "Isolate affected systems into separate VLAN segments without repeating the technical penetration test."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 11.4.4 mandates that all identified vulnerabilities are remediated and the penetration test is repeated to confirm that vulnerabilities have been successfully resolved.",
    "tip": "Pentest findings require mandatory remediation AND re-testing validation.",
    "v4_ref": "PCI DSS v4.0.1 Req 11.4.4"
  },
  {
    "id": 393,
    "question": "How frequently must File Integrity Monitoring (FIM) or change detection mechanisms verify critical system files under Requirement 11.5.2?",
    "options": [
      "At least once every day.",
      "At least once every month.",
      "At least once every week.",
      "At least once every year."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 11.5.2 requires that change detection mechanisms (such as FIM tools) perform file comparisons on critical system files, configuration files, and content files at least weekly.",
    "tip": "FIM file comparisons must occur at least weekly.",
    "v4_ref": "PCI DSS v4.0.1 Req 11.5.2"
  },
  {
    "id": 394,
    "question": "What does PCI DSS v4.0 Requirement 11.6.1 mandate regarding consumer-facing e-commerce payment pages?",
    "options": [
      "Deploying a pop-up modal requiring consumers to verify SSL certificate serial numbers before paying.",
      "Disabling client session cookies and local storage tokens completely during the e-commerce checkout.",
      "Restricting payment card processing exclusively to cardholders with verified mobile device telemetry.",
      "Implementing a tamper-detection mechanism to alert on unauthorized script or HTTP header modifications."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 11.6.1 requires deploying tamper-detection mechanisms on payment pages to alert personnel to unauthorized modifications (e.g. malicious script injections, altered form actions) at least weekly.",
    "tip": "Req 11.6.1 = Weekly tamper/change monitoring on payment page scripts & headers.",
    "v4_ref": "PCI DSS v4.0.1 Req 11.6.1"
  },
  {
    "id": 395,
    "question": "What is the difference between vulnerability scanning and penetration testing in PCI DSS?",
    "options": [
      "Scanning identifies potential vulnerabilities via automated tools, while pentesting actively attempts exploitation.",
      "Scanning examines operating system configurations, while pentesting is restricted to testing physical data centers.",
      "Scanning is performed exclusively by internal staff, while pentesting can only be conducted by card brand auditors.",
      "Scanning evaluates source code repositories, while pentesting assesses network encryption cryptographic protocols."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Vulnerability scanning identifies potential known vulnerabilities using automated tools. Penetration testing goes further: a skilled tester actively attempts to exploit vulnerabilities to determine if unauthorized access can be gained.",
    "tip": "Scanning identifies weaknesses; Penetration testing actively attempts exploitation.",
    "v4_ref": "PCI DSS v4.0.1 Testing Definitions"
  },
  {
    "id": 396,
    "question": "Under Requirement 12.1.1, how often must an entity review and update its overall information security policy?",
    "options": [
      "At least once every 6 months and upon each minor internal software patch deployment.",
      "At least once every 12 months and upon significant environmental or operational changes.",
      "At least once every 24 months or when mandated by an acquiring bank audit notification.",
      "At least once every 36 months following the release of updated PCI DSS baseline rules."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 12.1.1 requires that the information security policy is published, disseminated to all relevant personnel, and reviewed at least once every 12 months.",
    "tip": "Security policy review = at least annually (every 12 months).",
    "v4_ref": "PCI DSS v4.0.1 Req 12.1.1"
  },
  {
    "id": 397,
    "question": "Under Requirement 12.1.2, how frequently must a formal risk assessment process be performed?",
    "options": [
      "At least once every 30 days and upon any minor network firewall configuration change.",
      "At least once every 6 months and following any major internal employee reorganization.",
      "At least once every 12 months and upon significant changes to the card environment.",
      "At least once every 24 months or whenever requested by acquiring payment processors."
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 12.1.2 requires an annual formal risk assessment process that identifies critical assets, threats, and vulnerabilities.",
    "tip": "Formal risk assessment = at least annually.",
    "v4_ref": "PCI DSS v4.0.1 Req 12.1.2"
  },
  {
    "id": 398,
    "question": "How often must general security awareness training be provided to employees under Requirement 12.6.1?",
    "options": [
      "Exclusively during initial onboarding without recurring mandatory training cycles.",
      "Semi-annually for system administrators and once every two years for general staff.",
      "Solely after an employee demonstrates failure during simulated phishing exercises.",
      "Upon hire and at least once every 12 months (annually) throughout their employment."
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 12.6.1 requires security awareness training upon hire and at least once every 12 months thereafter, with content updated to address emerging threats.",
    "tip": "Security awareness training: Upon hire + at least annually.",
    "v4_ref": "PCI DSS v4.0.1 Req 12.6.1"
  },
  {
    "id": 399,
    "question": "What specific threat awareness topic was explicitly added to Requirement 12.6.3 in PCI DSS v4.0?",
    "options": [
      "Phishing, spear phishing, social engineering, and acceptable use of end-user technologies.",
      "Secure application programming against buffer overflows and memory allocation vulnerabilities.",
      "Advanced cryptographic hardware installation and high-availability clustered switch cabling.",
      "Forensic disk imaging protocols and formal legal chain of custody preservation procedures."
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 12.6.3 emphasizes training personnel on detecting social engineering techniques, specifically including phishing and spear phishing, which represent primary initial access vectors.",
    "tip": "Req 12.6.3 explicitly mandates phishing & social engineering awareness training.",
    "v4_ref": "PCI DSS v4.0.1 Req 12.6.3"
  },
  {
    "id": 400,
    "question": "Under Requirement 12.8.2, what written documentation must an entity maintain with all Third-Party Service Providers (TPSPs)?",
    "options": [
      "A bilateral non-disclosure agreement protecting intellectual property and trade secrets.",
      "A written agreement where the TPSP acknowledges its responsibility to secure cardholder data.",
      "An annual certificate of insurance indemnifying the customer against commercial data losses.",
      "A copy of the vendor's commercial business operating license and municipal tax registration."
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 12.8.2 requires written agreements where service providers formally acknowledge responsibility for securing cardholder data entrusted to them.",
    "tip": "Req 12.8.2: Written TPSP acknowledgment of card data security responsibility is mandatory.",
    "v4_ref": "PCI DSS v4.0.1 Req 12.8.2"
  },
  {
    "id": 401,
    "question": "Under Requirement 12.8.4, how often must an entity monitor the PCI DSS compliance status of its Third-Party Service Providers (TPSPs)?",
    "options": [
      "At least once every 12 months (annually) to verify their ongoing compliance status",
      "At least once every six months in conjunction with recurring internal control reviews",
      "At least once every 90 days alongside quarterly external network vulnerability scans",
      "At contract inception and upon each agreement renewal if no service changes occur"
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 12.8.4 mandates that entities maintain and implement a process to monitor TPSPs' PCI DSS compliance status at least once every 12 months, typically by collecting their current Attestation of Compliance (AOC).",
    "tip": "Monitor TPSP compliance status at least annually (every 12 months) by collecting an AOC.",
    "v4_ref": "PCI DSS v4.0.1 Req 12.8.4"
  },
  {
    "id": 402,
    "question": "Under Requirement 12.8.5, what documentation must an entity maintain regarding services provided by third-party service providers (TPSPs)?",
    "options": [
      "A complete inventory of all hardware devices and operating system builds operated by each TPSP",
      "Documentation indicating which PCI DSS requirements are managed by each TPSP and by the entity",
      "Formal quarterly executive sign-offs acknowledging full acceptance of all residual vendor risk",
      "Copies of all background check records and non-disclosure agreements for third-party personnel"
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 12.8.5 requires entities to maintain information about which PCI DSS requirements are managed by each TPSP, and which are managed by the entity (often termed a Responsibility Matrix).",
    "tip": "Requirement 12.8.5 mandates a responsibility matrix clarifying which entity manages which requirement.",
    "v4_ref": "PCI DSS v4.0.1 Req 12.8.5"
  },
  {
    "id": 403,
    "question": "Under PCI DSS Requirements 12.10.1 and 12.10.2, how frequently must an entity test its security incident response plan?",
    "options": [
      "At least once every six months using automated tabletop breach simulation software",
      "At least once every 90 days following external vulnerability scanning cycles",
      "At least once every 12 months (annually) and after any significant incident",
      "At least once every three years as part of external penetration test reviews"
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 12.10.2 states that the incident response plan must be tested at least once every 12 months, including simulated scenarios or tabletop walkthroughs, and updated following security incidents.",
    "tip": "Incident response plans must be tested at least annually (every 12 months).",
    "v4_ref": "PCI DSS v4.0.1 Req 12.10.2"
  },
  {
    "id": 404,
    "question": "Under Requirement 12.10.5, what specific detection response procedure must be included in an entity's incident response plan?",
    "options": [
      "Automated triggers that isolate administrative workstations when failed login thresholds are met",
      "Escalation protocols for reporting unauthorized physical access attempts to local building security",
      "Workflows for revoking cryptographic keys whenever an internal network penetration test concludes",
      "Procedures to respond immediately upon detection of primary account numbers in unauthorized locations"
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 12.10.5 mandates that the incident response plan include specific procedures to be initiated immediately upon the detection of Primary Account Numbers (PAN) stored in unauthorized locations.",
    "tip": "Incident response plans must have explicit procedures for responding to PAN found outside the CDE.",
    "v4_ref": "PCI DSS v4.0.1 Req 12.10.5"
  },
  {
    "id": 405,
    "question": "An e-commerce merchant integrates payment functionality using an inline frame (iFrame) delivered directly from a validated third-party payment processor. No account data ever traverses or resides on merchant systems. Which Self-Assessment Questionnaire (SAQ) should this merchant complete?",
    "options": [
      "SAQ A, because all cardholder data functions are fully outsourced to a compliant payment service provider",
      "SAQ A-EP, because the merchant web server delivers the parent webpage that loads the processor iframe",
      "SAQ C-VT, because transactions are processed electronically via a web interface without local storage",
      "SAQ P2PE, because payment data transmission is cryptographically isolated from the merchant network"
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "SAQs & Assessment Validation",
    "explanation": "SAQ A applies to e-commerce merchants whose entire payment functionality is completely outsourced to a validated third-party service provider via hosted iframe or URL redirection, with no cardholder data traversing or stored on merchant systems.",
    "tip": "Hosted iframe or URL redirection without card data touching merchant systems = SAQ A.",
    "v4_ref": "PCI DSS v4.0.1 SAQ Instructions and Guidelines - SAQ A"
  },
  {
    "id": 406,
    "question": "An e-commerce merchant hosts its own website and checkout pages, but uses payment-processor JavaScript to collect and transmit card details directly from the consumer's browser to the gateway. The merchant server never receives account data. Which SAQ applies?",
    "options": [
      "SAQ A, because cardholder data transmits directly from the browser to the payment processor",
      "SAQ A-EP, because the merchant web server delivers scripts that impact transaction security",
      "SAQ C, because payment applications are hosted on the merchant's internet-connected servers",
      "SAQ D-Merchant, because merchant servers impact the cardholder data environment perimeter"
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "SAQs & Assessment Validation",
    "explanation": "SAQ A-EP applies to e-commerce merchants whose web servers deliver pages containing scripts (such as Direct Post, JavaScript APIs) that collect and direct payment data to the payment processor, because the merchant's web servers can impact the security of the transaction.",
    "tip": "Merchant hosts checkout page and serves scripts directing card data to gateway = SAQ A-EP.",
    "v4_ref": "PCI DSS v4.0.1 SAQ Instructions and Guidelines - SAQ A-EP"
  },
  {
    "id": 407,
    "question": "A brick-and-mortar retailer processes card-present transactions exclusively through standalone terminals connected via dedicated analog telephone dial-up lines. No account data is ever stored electronically. Which Self-Assessment Questionnaire is appropriate?",
    "options": [
      "SAQ A, because transaction processing is entirely outsourced to the acquiring processor",
      "SAQ B-IP, because payment transactions originate from physical point-of-sale hardware",
      "SAQ B, because terminals use analog phone lines with no electronic card data storage",
      "SAQ C, because point-of-sale hardware is located locally within the merchant facility"
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "SAQs & Assessment Validation",
    "explanation": "SAQ B applies to merchants who process payments solely via standalone, dial-up terminals connected via traditional analog telephone lines, with no electronic cardholder data storage.",
    "tip": "Standalone dial-up terminals via phone lines with no electronic storage = SAQ B.",
    "v4_ref": "PCI DSS v4.0.1 SAQ Instructions and Guidelines - SAQ B"
  },
  {
    "id": 408,
    "question": "A hospitality merchant utilizes standalone, PTS-approved Point of Interaction (POI) terminals that connect to the payment processor solely across an internal IP-based network. No card data is stored electronically. Which SAQ governs this environment?",
    "options": [
      "SAQ B, because the standalone devices operate independently of back-office retail management servers",
      "SAQ C, because network-connected point-of-sale devices communicate across an internal local network",
      "SAQ P2PE, because PTS-approved point of interaction hardware encrypts all transactional cardholder data",
      "SAQ B-IP, because standalone PTS-approved terminals connect directly to the processor via an IP network"
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "SAQs & Assessment Validation",
    "explanation": "SAQ B-IP applies to merchants with standalone, PTS-approved payment terminals that connect to the processor via an IP network, with no electronic cardholder data storage.",
    "tip": "Standalone PTS-approved terminals connecting via IP network = SAQ B-IP.",
    "v4_ref": "PCI DSS v4.0.1 SAQ Instructions and Guidelines - SAQ B-IP"
  },
  {
    "id": 409,
    "question": "A healthcare provider processes card-not-present payments by having staff manually enter cardholder data one transaction at a time into an online virtual terminal hosted by a PCI DSS compliant service provider. No electronic storage occurs. Which SAQ applies?",
    "options": [
      "SAQ C-VT, because payments are keyed one-by-one into a third-party web virtual terminal",
      "SAQ A-EP, because staff workstations deliver web requests that manage payment sessions",
      "SAQ B-IP, because administrative computers communicate across an internal IP network",
      "SAQ D-Merchant, because telephone workstations represent an internal card environment"
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "SAQs & Assessment Validation",
    "explanation": "SAQ C-VT applies to merchants who manually enter card transactions one by one into an isolated online virtual terminal hosted securely by a third-party service provider via an internet browser, with no hardware card readers attached and no electronic storage.",
    "tip": "Manual single-transaction entry into a third-party hosted virtual terminal = SAQ C-VT.",
    "v4_ref": "PCI DSS v4.0.1 SAQ Instructions and Guidelines - SAQ C-VT"
  },
  {
    "id": 410,
    "question": "A supermarket operates payment application software installed on PC-based electronic cash registers connected to the Internet via a local network, with attached card readers. No card data is stored electronically. Which SAQ must the merchant complete?",
    "options": [
      "SAQ B-IP, because hardware payment card readers are connected to internal electronic networks",
      "SAQ C, because payment software runs on networked point-of-sale systems with no data storage",
      "SAQ P2PE, because point of sale card readers encrypt primary account data upon initial card tap",
      "SAQ D-Merchant, because PC-based registers require full verification of all twelve requirements"
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "SAQs & Assessment Validation",
    "explanation": "SAQ C applies to merchants with payment application systems (such as POS software on PC-based registers) connected to the Internet, with no electronic cardholder data storage post-authorization.",
    "tip": "POS software installed on internet-connected PC systems with no storage = SAQ C.",
    "v4_ref": "PCI DSS v4.0.1 SAQ Instructions and Guidelines - SAQ C"
  },
  {
    "id": 411,
    "question": "A retailer deploys a PCI SSC-listed, validated Point-to-Point Encryption (P2PE) solution using certified PTS POI devices. The merchant has no access to cleartext cardholder data or cryptographic keys and stores no card data. Which SAQ should they complete?",
    "options": [
      "SAQ B-IP, because PTS payment terminals connect to acquirer gateways over an internal IP network",
      "SAQ C, because point-of-sale hardware terminal devices connect to internal store network controllers",
      "SAQ P2PE, because the merchant operates an officially validated point-to-point encryption solution",
      "SAQ D-Merchant, because complex retail environments must undergo validation under all requirements"
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "SAQs & Assessment Validation",
    "explanation": "SAQ P2PE applies to merchants who use a validated, PCI SSC-listed Point-to-Point Encryption solution with approved hardware POI terminals, where the merchant has no electronic storage and cannot access decryption keys or cleartext card data.",
    "tip": "Merchants using a certified, listed P2PE solution qualify for the reduced SAQ P2PE.",
    "v4_ref": "PCI DSS v4.0.1 SAQ Instructions and Guidelines - SAQ P2PE"
  },
  {
    "id": 412,
    "question": "Under PCI DSS validation rules, is a Third-Party Service Provider (TPSP) permitted to validate its compliance using Self-Assessment Questionnaire (SAQ) A, B, or C?",
    "options": [
      "Yes, provided the service provider processes fewer than one million annual cardholder transactions",
      "Yes, if the service provider operates exclusively as a hosted web redirect payment gateway vendor",
      "Yes, provided the acquiring processor issues a written waiver authorizing a simplified questionnaire",
      "No, because merchant SAQs are strictly reserved for merchants and never apply to service providers"
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "SAQs & Assessment Validation",
    "explanation": "Service providers are never eligible to complete merchant-specific SAQs (such as SAQ A, B, B-IP, C, C-VT, or P2PE). They must complete SAQ D for Service Providers or undergo an on-site assessment resulting in a Report on Compliance (ROC).",
    "tip": "Service providers can NEVER use SAQ A, B, or C—they must use SAQ D for Service Providers or a ROC.",
    "v4_ref": "PCI DSS v4.0.1 SAQ Instructions and Guidelines"
  },
  {
    "id": 413,
    "question": "A merchant retains encrypted Primary Account Numbers (PAN) within an on-premises relational database to handle recurring customer billing. Which Self-Assessment Questionnaire is required for this merchant?",
    "options": [
      "SAQ D for Merchants, because electronic storage of cardholder data precludes the use of simplified SAQs",
      "SAQ C, because database software manages recurring transactions without retaining sensitive card data",
      "SAQ P2PE, because cryptographic encryption protects stored cardholder numbers from unauthorized access",
      "SAQ A-EP, because recurring subscription processing originates from secure e-commerce web applications"
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "SAQs & Assessment Validation",
    "explanation": "Any merchant that stores cardholder data electronically post-authorization (even if encrypted) is ineligible for simplified SAQs (A, B, C, P2PE) and must complete SAQ D for Merchants (or an on-site assessment).",
    "tip": "Electronic storage of PAN automatically forces a merchant into SAQ D for Merchants.",
    "v4_ref": "PCI DSS v4.0.1 SAQ Instructions and Guidelines - SAQ D"
  },
  {
    "id": 414,
    "question": "What is the impact on a merchant's PCI DSS assessment validation eligibility if the merchant begins storing cardholder data electronically without an approved P2PE solution?",
    "options": [
      "The merchant retains eligibility for SAQ A or C provided strong asymmetric cryptographic encryption is applied",
      "The merchant loses eligibility for simplified SAQs (A, B, C, P2PE) and must assess under SAQ D for Merchants",
      "The merchant transitions to SAQ A-EP and must perform quarterly ASV external vulnerability network scans",
      "The merchant is granted a transitional grace period to validate compliance using compensating control sheets"
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "SAQs & Assessment Validation",
    "explanation": "Storing cardholder data electronically immediately disqualifies a merchant from all shortened SAQs (A, B, B-IP, C-VT, C, P2PE), requiring the merchant to complete SAQ D for Merchants.",
    "tip": "Electronic card data storage disqualifies merchants from all simplified SAQ types.",
    "v4_ref": "PCI DSS v4.0.1 SAQ Instructions and Guidelines"
  },
  {
    "id": 415,
    "question": "What is the primary security objective governed by Appendix A1 of the PCI DSS for Multi-Tenant Service Providers?",
    "options": [
      "Ensuring that all tenant systems maintain identical operating system patch levels across hypervisors",
      "Requiring multi-tenant service providers to perform physical security background checks on all tenants",
      "Ensuring logical separation between tenant environments so no tenant can access another tenant's data",
      "Mandating that hosting providers assume full operational liability for all tenant payment card breaches"
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Compensating Controls & v4.0 Customized Approach",
    "explanation": "Appendix A1 applies to multi-tenant service providers (such as cloud and shared hosting vendors) and mandates logical separation between tenant environments, hypervisor isolation, and tenant penetration testing rights.",
    "tip": "Appendix A1 governs multi-tenant service providers and requires strict logical tenant separation.",
    "v4_ref": "PCI DSS v4.0.1 Appendix A1"
  },
  {
    "id": 416,
    "question": "What is the purpose of Appendix A3: Designated Entities Supplemental Validation (DESV) in PCI DSS v4.0.1?",
    "options": [
      "Providing voluntary discounted assessment guidelines for non-profit organizations handling payment data",
      "Mandating technical compliance requirements for entities operating commercial mobile payment terminals",
      "Establishing specialized penetration testing methodologies for multi-tenant software-as-a-service clouds",
      "Requiring enhanced business-as-usual validation for entities designated by payment brands or acquirers"
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Compensating Controls & v4.0 Customized Approach",
    "explanation": "Appendix A3 (DESV) applies only to entities designated by a payment brand or acquirer due to high risk, transaction aggregation, or previous breaches, requiring rigorous ongoing business-as-usual (BAU) compliance evidence.",
    "tip": "DESV (Appendix A3) applies to designated high-risk/breached entities requiring extra BAU controls.",
    "v4_ref": "PCI DSS v4.0.1 Appendix A3"
  },
  {
    "id": 417,
    "question": "Under Appendix C of PCI DSS v4.0.1, which factor is NEVER recognized as a valid justification for implementing a Compensating Control?",
    "options": [
      "Financial constraints, cost considerations, or lack of capital budget to implement the defined control",
      "Documented legal, statutory, or regulatory requirements that conflict with the defined technical control",
      "Legitimate technical constraints arising from legacy hardware or operating system architecture limits",
      "Severe operational limitations where applying the defined control directly disrupts core business operations"
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Compensating Controls & v4.0 Customized Approach",
    "explanation": "Appendix C explicitly states that financial constraints, lack of budget, or the expense of compliance are NEVER valid justifications for a Compensating Control. Only legitimate technical or documented legal constraints qualify.",
    "tip": "Financial/budget constraints are NEVER a valid justification for compensating controls.",
    "v4_ref": "PCI DSS v4.0.1 Appendix C"
  },
  {
    "id": 418,
    "question": "To be considered valid under Appendix C, what four core criteria must any proposed Compensating Control satisfy?",
    "options": [
      "1) Approved by corporate legal counsel; 2) Documented in policy; 3) Tested by internal audit; 4) Commensurate with business cost",
      "1) Meets original intent and rigor; 2) Provides equivalent defense; 3) Goes beyond existing rules; 4) Commensurate with extra risk",
      "1) Supported by formal vendor SLAs; 2) Implemented via automation; 3) Validated by an ASV scan; 4) Reviewed on an annual schedule",
      "1) Adheres to generic ISO standards; 2) Mitigates legal liability; 3) Replaces obsolete controls; 4) Certified by executive staff"
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Compensating Controls & v4.0 Customized Approach",
    "explanation": "Appendix C defines four strict criteria for compensating controls: 1) Meets the intent and rigor of the original requirement; 2) Provides an equivalent level of defense; 3) Goes above and beyond other requirements; 4) Commensurate with the additional risk.",
    "tip": "Compensating controls must meet intent/rigor, provide equivalent defense, go beyond other reqs, and offset risk.",
    "v4_ref": "PCI DSS v4.0.1 Appendix C"
  },
  {
    "id": 419,
    "question": "What is the fundamental distinction between the Defined Approach and the Customized Approach in PCI DSS v4.0.1 assessments?",
    "options": [
      "The Defined Approach applies exclusively to merchants, whereas the Customized Approach is restricted to service providers",
      "The Defined Approach permits self-assessment, whereas the Customized Approach mandates validation by a certified QSA firm",
      "The Defined Approach uses prescriptive testing, whereas the Customized Approach allows custom controls meeting the objective",
      "The Defined Approach enforces strict technical requirements, whereas the Customized Approach waives non-applicable controls"
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Compensating Controls & v4.0 Customized Approach",
    "explanation": "The Defined Approach follows traditional prescriptive requirements and testing procedures. The Customized Approach allows mature entities to implement custom controls designed to meet the Requirement's Stated Objective, verified by custom assessor testing.",
    "tip": "Defined = prescriptive controls; Customized = tailored controls meeting the Requirement's Stated Objective.",
    "v4_ref": "PCI DSS v4.0.1 Section 2.2"
  },
  {
    "id": 420,
    "question": "What documentation must an assessed entity prepare and maintain for each requirement addressed using the PCI DSS v4.0.1 Customized Approach?",
    "options": [
      "An official waiver endorsement signed by acquiring bank executives and payment brand compliance managers",
      "A formal Compensating Control Worksheet documented in accordance with guidelines specified in Appendix C",
      "A third-party cryptographic audit attestation certifying cipher strength and key lifecycle management",
      "A documented Targeted Risk Analysis (TRA) satisfying all analytical criteria under Requirement 12.3.2"
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Compensating Controls & v4.0 Customized Approach",
    "explanation": "Requirement 12.3.2 mandates that for every requirement addressed via the Customized Approach, the entity must document a Targeted Risk Analysis (TRA) showing how the customized control achieves the requirement's stated objective.",
    "tip": "Every customized approach requirement requires a documented Targeted Risk Analysis (Req 12.3.2).",
    "v4_ref": "PCI DSS v4.0.1 Req 12.3.2 & Appendix E"
  },
  {
    "id": 421,
    "question": "When an entity utilizes the Customized Approach in a PCI DSS v4.0.1 assessment, who is responsible for developing the testing procedures?",
    "options": [
      "The independent assessor (QSA or ISA), who designs and executes custom procedures to validate the control",
      "The assessed entity's internal security team, who creates the testing procedures for assessor sign-off",
      "The PCI Security Standards Council, which publishes tailored testing procedures upon formal petition",
      "The acquiring bank compliance officer, who outlines verification procedures based on regional risk"
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Compensating Controls & v4.0 Customized Approach",
    "explanation": "Under the Customized Approach, the assessor (QSA or ISA) must independently design, document, and execute custom testing procedures to validate that the entity's custom controls effectively meet the requirement's stated objective.",
    "tip": "In the Customized Approach, the assessor designs and executes the custom testing procedures.",
    "v4_ref": "PCI DSS v4.0.1 Section 2.2 & Appendix E"
  },
  {
    "id": 422,
    "question": "What security characteristics are evaluated under the PCI PIN Transaction Security Point of Interaction (PTS POI) standard?",
    "options": [
      "The logical isolation and administrative access rights across multi-tenant cloud payment application servers",
      "The physical and logical tamper-resistance and cryptographic key protection within hardware terminal devices",
      "The end-to-end network encryption protocols used to secure merchant web shopping carts against data leaks",
      "The secure coding processes and vulnerability remediation lifecycles followed by software vendor teams"
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Other PCI Standards (P2PE, PTS, SSF, PIN)",
    "explanation": "The PCI PTS POI standard evaluates payment terminals (such as POS devices, unattended kiosks, and ATMs) for physical tamper-detection, cryptographic key management, and resistance to eavesdropping and physical tampering.",
    "tip": "PTS POI evaluates physical and logical tamper-resistance and cryptographic security of payment terminals.",
    "v4_ref": "PCI PTS POI Standard v6"
  },
  {
    "id": 423,
    "question": "What is the core architectural principle of a validated PCI Point-to-Point Encryption (P2PE) solution?",
    "options": [
      "Payment data is decrypted on an in-scope store controller before being transmitted across private VPN tunnels",
      "Card data is tokenized on local merchant servers prior to transmission to an offsite cloud payment gateway",
      "Account data is encrypted inside a PTS device and remains indecipherable until reaching a secure decryptor",
      "Transactions are secured using software-level symmetric encryption applied within merchant operating memory"
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Other PCI Standards (P2PE, PTS, SSF, PIN)",
    "explanation": "In a PCI SSC-listed P2PE solution, cardholder data is encrypted inside a certified PTS Point of Interaction (POI) terminal and remains encrypted across all merchant networks until it reaches a secure decryption environment operated by the solution provider.",
    "tip": "P2PE encrypts data within the PTS terminal; decryption occurs only at the secure service provider environment.",
    "v4_ref": "PCI P2PE Standard v3.1"
  },
  {
    "id": 424,
    "question": "Which two distinct standards constitute the PCI Software Security Framework (SSF) replacing PA-DSS?",
    "options": [
      "The Payment Application Data Security Standard and the Point of Interaction Device Evaluation Standard",
      "The Commercial Off-The-Shelf Mobile Standard and the Software-Based PIN Entry on COTS Security Standard",
      "The Cardholder Information Security Standard and the Qualified Security Assessor Validation Methodology",
      "The Secure Software Standard and the Secure Software Lifecycle (Secure SLC) Standard for software vendors"
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Other PCI Standards (P2PE, PTS, SSF, PIN)",
    "explanation": "The PCI Software Security Framework (SSF) consists of two standards: 1) Secure Software Standard (evaluating software products) and 2) Secure Software Lifecycle (Secure SLC) Standard (evaluating the software vendor's engineering processes).",
    "tip": "The SSF comprises the Secure Software Standard and the Secure Software Lifecycle (Secure SLC) Standard.",
    "v4_ref": "PCI SSF Program Guide v1.2"
  },
  {
    "id": 425,
    "question": "What is the primary objective of the PCI 3-D Secure (3DS) Core Security Standard?",
    "options": [
      "Protecting the security, integrity, and confidentiality of 3DS transaction messaging and core directory environments",
      "Establishing physical security standards for hardware manufacturing facilities producing chip-and-PIN credit cards",
      "Defining cryptographic key management and injection procedures for point-of-sale terminals in retail checkout lanes",
      "Regulating the secure deletion and unrecoverable disposal of electronic storage media containing cardholder data"
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Other PCI Standards (P2PE, PTS, SSF, PIN)",
    "explanation": "The PCI 3DS Core Security Standard defines physical and logical security requirements for environments performing 3DS functions (Access Control Server, Directory Server, 3DS Server) to authenticate online CNP transactions.",
    "tip": "PCI 3DS Core secures cardholder authentication messaging and directory servers for e-commerce transactions.",
    "v4_ref": "PCI 3DS Core Security Standard v1.0"
  },
  {
    "id": 426,
    "question": "What payment acceptance architecture is governed by the PCI Mobile Payments on COTS (MPoC) standard?",
    "options": [
      "Desktop point-of-sale software running on hardened cash registers deployed within traditional retail outlets",
      "Contactless payment acceptance and PIN entry on commercial off-the-shelf devices without dedicated dongles",
      "Dedicated hardware automated teller machine (ATM) cash dispensing modules and physical safe enclosures",
      "Backend cloud payment switches processing high-volume batched automated clearing house fund transfers"
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Other PCI Standards (P2PE, PTS, SSF, PIN)",
    "explanation": "PCI MPoC (Mobile Payments on COTS) standardizes contactless card acceptance and PIN entry directly on commercial off-the-shelf mobile devices (smartphones/tablets) without requiring an external hardware card reader.",
    "tip": "MPoC governs contactless card reading and PIN entry directly on consumer smartphones and tablets.",
    "v4_ref": "PCI MPoC Standard v1.0"
  },
  {
    "id": 427,
    "question": "What is the primary objective of the PCI PIN Security Standard during electronic payment processing?",
    "options": [
      "Ensuring that web-based e-commerce shopping cart payment forms complete checkout transactions within five seconds",
      "Establishing password complexity, rotation intervals, and lockout policies for administrative corporate accounts",
      "Governing the secure management, processing, and cryptographic transmission of personal identification numbers",
      "Standardizing interchange fee schedules and chargeback settlement workflows between issuing and acquiring banks"
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Other PCI Standards (P2PE, PTS, SSF, PIN)",
    "explanation": "The PCI PIN Security Standard provides requirements for the secure management, processing, and transmission of PIN data in all online and offline card transactions at ATMs and unattended or attended POS terminals.",
    "tip": "PCI PIN Security governs secure cryptographic management, processing, and transmission of PIN data.",
    "v4_ref": "PCI PIN Security Standard v3.1"
  },
  {
    "id": 428,
    "question": "Under PCI DSS Requirement 3.2, may an entity retain Sensitive Authentication Data (SAD) post-authorization if the cardholder provides explicit consent?",
    "options": [
      "Yes, provided explicit written authorization is documented and renewed by the consumer every twelve calendar months",
      "Yes, provided the cardholder data is stored on air-gapped magnetic media within a physically restricted vault",
      "Yes, provided the sensitive authentication data is encrypted with an asymmetric key pair stored in an HSM module",
      "No, because cardholder consent has no legal standing under PCI DSS and post-authorization SAD storage is prohibited"
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 3 & 4: Data Protection & Encryption",
    "explanation": "Requirement 3.2 strictly prohibits post-authorization storage of Sensitive Authentication Data (card verification codes, full track data, PIN/PIN block). Customer consent or agreement has zero validity under PCI DSS.",
    "tip": "SAD can NEVER be retained post-authorization, regardless of customer consent.",
    "v4_ref": "PCI DSS v4.0.1 Req 3.2"
  },
  {
    "id": 429,
    "question": "When physical media containing cardholder data is moved outside an entity's facility, what mandatory controls are enforced by Requirement 9.6?",
    "options": [
      "Securing media during transit, tracking shipments with an authorized log, and obtaining management authorization prior to release",
      "Encrypting media labels with barcode identifiers and conducting real-time GPS tracking across public courier road transport",
      "Requiring that physical courier drivers hold active Qualified Security Assessor certifications before taking custody of tapes",
      "Restricting media transport exclusively to overnight delivery flights operated by federally certified commercial cargo carriers"
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 9 & 10: Physical & Logging",
    "explanation": "Requirement 9.6 requires that media containing cardholder data is physically secured during transit, tracked with a log, authorized by management prior to release, and sent via secure courier with tracking/signature.",
    "tip": "Media in transit must be physically secured, logged, authorized by management, and sent via secure courier.",
    "v4_ref": "PCI DSS v4.0.1 Req 9.6"
  },
  {
    "id": 430,
    "question": "Under PCI DSS Requirement 9.7.1, what destruction method is mandatory when disposing of hard-copy materials containing cardholder data?",
    "options": [
      "Depositing documents in locked municipal recycling bins located within access-controlled office facilities",
      "Cross-cut shredding, incinerating, or pulping materials so that cardholder data cannot be reconstructed",
      "Blacking out cardholder numbers using industrial permanent markers before placing sheets in office trash",
      "Storing discarded paper files in secure offsite record repositories until the standard retention period ends"
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 9 & 10: Physical & Logging",
    "explanation": "Requirement 9.7.1 specifies that hard-copy materials containing cardholder data must be cross-cut shredded, incinerated, or pulped such that there is reasonable assurance the data cannot be reconstructed.",
    "tip": "Hard-copy card data destruction requires cross-cut shredding, incineration, or pulping.",
    "v4_ref": "PCI DSS v4.0.1 Req 9.7.1"
  },
  {
    "id": 431,
    "question": "Under PCI DSS Requirement 9.7.2, how must electronic storage media containing cardholder data be sanitized or destroyed prior to disposal?",
    "options": [
      "Reformatting drives using standard operating system volume formatting tools before reassigning hardware",
      "Overwriting partition tables and placing storage drives into restricted IT storage pending asset resale",
      "Rendering data unrecoverable via secure wiping per industry standards, degaussing, or physical destruction",
      "Encrypting the entire file system with AES-256 and discarding decryption keys during equipment retirement"
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 9 & 10: Physical & Logging",
    "explanation": "Requirement 9.7.2 requires electronic media to be rendered unrecoverable via secure wiping following industry standards (e.g., NIST SP 800-88), degaussing, or physical destruction (shredding, crushing).",
    "tip": "Electronic media must be destroyed via secure wipe (NIST SP 800-88), degaussing, or physical crushing.",
    "v4_ref": "PCI DSS v4.0.1 Req 9.7.2"
  },
  {
    "id": 432,
    "question": "A systems administrator accesses an in-scope database server residing within the cardholder data environment from a corporate workstation on the internal LAN. What authentication control is mandated by Requirement 8.4.2?",
    "options": [
      "Complex alphanumeric password authentication combined with single-sign-on Kerberos ticket validation",
      "Transport Layer Security (TLS) client certificate verification without additional interactive user factors",
      "Single-factor biometric verification managed through enterprise Active Directory domain group policies",
      "Multi-Factor Authentication (MFA) for all access into the CDE, including internal network connections"
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 7 & 8: Access Control & Authentication",
    "explanation": "In PCI DSS v4.0, Requirement 8.4.2 mandates Multi-Factor Authentication (MFA) for all access into the CDE, regardless of whether access originates from a remote network or an internal corporate network.",
    "tip": "PCI DSS v4.0 requires MFA for ALL access into the CDE, including internal corporate network access.",
    "v4_ref": "PCI DSS v4.0.1 Req 8.4.2"
  },
  {
    "id": 433,
    "question": "Under PCI DSS Requirement 8.2.8, what is the maximum permissible period of user inactivity before an administrative session screen is automatically locked?",
    "options": [
      "No more than 15 minutes of inactivity, requiring re-authentication to reactivate the session",
      "No more than 30 minutes of inactivity, requiring domain administrative credentials to unlock",
      "No more than 60 minutes of inactivity, provided the physical office perimeter is secured",
      "No timeout is mandated if endpoint detection and response (EDR) software monitors activity"
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 7 & 8: Access Control & Authentication",
    "explanation": "Requirement 8.2.8 requires system sessions to be locked after a maximum of 15 minutes of inactivity, requiring user re-authentication to resume the session.",
    "tip": "Idle session lock timeout is a maximum of 15 minutes.",
    "v4_ref": "PCI DSS v4.0.1 Req 8.2.8"
  },
  {
    "id": 434,
    "question": "Under Requirement 8.3.9, if an entity does NOT implement dynamic, risk-based authentication to evaluate access security in real time, how often must passwords be changed?",
    "options": [
      "At least once every 30 days for administrative accounts and every 90 days for general user accounts",
      "At least once every 90 days, or periodically as determined in accordance with a targeted risk analysis",
      "At least once every 180 days, provided passwords meet a minimum complexity length of 15 characters",
      "Passwords never expire under PCI DSS v4.0.1 provided multi-factor authentication is strictly enforced"
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 7 & 8: Access Control & Authentication",
    "explanation": "Requirement 8.3.9 states that if an entity does not utilize dynamic, risk-based authentication, passwords/passphrases must be changed at least once every 90 days, or at an interval established via a documented targeted risk analysis.",
    "tip": "Passwords must be changed at least every 90 days unless dynamic risk-based authentication is implemented.",
    "v4_ref": "PCI DSS v4.0.1 Req 8.3.9"
  },
  {
    "id": 435,
    "question": "Under PCI DSS Requirement 8.3.7, what password history control must an entity enforce when users establish new passwords or passphrases?",
    "options": [
      "Users must not reuse any password previously utilized during the preceding twelve calendar months",
      "Users must not select a new password that shares more than four consecutive characters with the old one",
      "Users must not submit a new password or passphrase that is identical to any of their last four passwords",
      "Users must not reuse any of their last ten passwords unless authorized through a security exception form"
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 7 & 8: Access Control & Authentication",
    "explanation": "Requirement 8.3.7 mandates that new passwords/passphrases cannot be identical to any of the user's previous four passwords.",
    "tip": "Password history requirement: cannot reuse the last four (4) passwords.",
    "v4_ref": "PCI DSS v4.0.1 Req 8.3.7"
  },
  {
    "id": 436,
    "question": "A customer service call center accepts payments over telephone lines. Under PCI DSS Requirement 3.2, may audio recordings containing card verification codes (CAV2/CVC2/CVV2/CID) be stored post-authorization?",
    "options": [
      "Yes, provided the audio recordings are encrypted with AES-256 and stored on write-once optical media",
      "Yes, provided the audio recordings are maintained solely for quality assurance and training purposes",
      "Yes, provided the customer verbally consents to call recording during the transaction intake session",
      "No, because retaining card verification codes post-authorization is prohibited, requiring redaction"
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 3 & 4: Data Protection & Encryption",
    "explanation": "Requirement 3.2 prohibits post-authorization storage of Sensitive Authentication Data, including CVV2/CVC2 in audio recordings. Call recording systems must mute, redact, or prevent the recording of SAD.",
    "tip": "Audio recordings must never contain CVV2/CVC2 post-authorization; redaction/muting is mandatory.",
    "v4_ref": "PCI DSS v4.0.1 Req 3.2"
  },
  {
    "id": 437,
    "question": "What is the architectural structure of a standard Primary Account Number (PAN) defined by ISO/IEC 7812?",
    "options": [
      "An Issuer Identification Number (BIN/IIN), an individual account identification number, and a Luhn check digit",
      "A bank routing number, a customer account sequence identifier, and a public-key asymmetric digital signature",
      "A cardholder postal routing code, a unique payment card sequence number, and a cyclic redundancy checksum",
      "A country dial code prefix, an issuing institution clearing identifier, and an encrypted hash digest token"
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "PCI DSS Foundations & Roles",
    "explanation": "ISO/IEC 7812 defines the standard PAN structure: 1) Major Industry Identifier and Issuer Identification Number (IIN/BIN, first 6-8 digits); 2) Individual account identifier (variable length up to 12 digits); 3) Final single check digit calculated using the Luhn algorithm.",
    "tip": "PAN format per ISO/IEC 7812 = Issuer Identification Number (BIN/IIN) + Account Number + Luhn check digit.",
    "v4_ref": "ISO/IEC 7812 & PCI DSS v4.0.1 Terminology"
  },
  {
    "id": 438,
    "question": "Under PCI DSS Requirement 3.4.2, what technical control must be enforced when personnel view or interact with cardholder data on remote access technologies?",
    "options": [
      "Restricting remote desktop display resolutions and watermarking user screens with logged-in employee credentials",
      "Enforcing technical controls preventing unauthorized copying, relocation, or downloading of cardholder data",
      "Requiring remote users to route network traffic through dual-homed virtual private networks with IPsec tunnels",
      "Mandating continuous video recording of user screens during any session involving account data interaction"
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 3 & 4: Data Protection & Encryption",
    "explanation": "Requirement 3.4.2 requires technical controls to prevent copy-and-paste, unauthorized copying, or relocation of cardholder data when accessed via remote access technologies.",
    "tip": "Requirement 3.4.2 mandates technical controls preventing unauthorized copying/relocation of PAN remotely.",
    "v4_ref": "PCI DSS v4.0.1 Req 3.4.2"
  },
  {
    "id": 439,
    "question": "Under PCI DSS Requirement 5.4.1, what controls must an entity implement to detect and defend personnel against phishing attacks?",
    "options": [
      "Annual employee security awareness presentations detailing social engineering attack vectors and penalties",
      "Mandatory weekly password rotation policies for all corporate email accounts with access to cardholder data",
      "Automated technical mechanisms such as anti-spoofing protocols and email filtering to detect phishing emails",
      "Network perimeter firewalls configured to block all incoming Simple Mail Transfer Protocol traffic on port 25"
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 5 & 6: Vulnerability & Secure Systems",
    "explanation": "Requirement 5.4.1 requires automated mechanisms (such as email filtering, SPF, DKIM, and DMARC) to detect and protect personnel against phishing and email spoofing attacks.",
    "tip": "Requirement 5.4.1 mandates automated technical anti-phishing mechanisms (e.g. SPF/DKIM/DMARC, filtering).",
    "v4_ref": "PCI DSS v4.0.1 Req 5.4.1"
  },
  {
    "id": 440,
    "question": "Under PCI DSS Requirement 7.2.5, how must an entity manage and review access privileges for application and system accounts?",
    "options": [
      "Privileges must be assigned with full administrative rights and verified annually during external assessments",
      "Privileges must be refreshed automatically every 30 days and revoked if no automated calls occur for 60 days",
      "Privileges must be restricted to read-only access and evaluated whenever firewall security policies change",
      "Privileges must be assigned on least privilege and reviewed at least every 6 months or per targeted risk analysis"
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 7 & 8: Access Control & Authentication",
    "explanation": "Requirement 7.2.5 mandates that all application and system accounts and related access privileges are assigned based on least privilege, and reviewed at least once every six months, or at an interval established via a targeted risk analysis.",
    "tip": "Review application/system accounts at least every 6 months (or per TRA) under least privilege.",
    "v4_ref": "PCI DSS v4.0.1 Req 7.2.5"
  },
  {
    "id": 441,
    "question": "Under PCI DSS Requirement 8.6.1, what restriction applies to interactive user logins using system and application accounts?",
    "options": [
      "System and application accounts must not be used for interactive logins unless documented and needed for administrative tasks",
      "Interactive logins are permitted for system accounts provided dual-custody MFA authorization is completed at console logon",
      "System accounts may be used for interactive human sessions during scheduled quarterly maintenance maintenance windows",
      "Interactive logins are unrestricted for application accounts if all commands executed are logged to a central SIEM server"
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 7 & 8: Access Control & Authentication",
    "explanation": "Requirement 8.6.1 requires that system and application accounts are not used for interactive human logins, except in documented exceptional circumstances where interactive access is strictly necessary for administrative tasks.",
    "tip": "System and application accounts cannot be used for interactive logins (Req 8.6.1).",
    "v4_ref": "PCI DSS v4.0.1 Req 8.6.1"
  },
  {
    "id": 442,
    "question": "Under PCI DSS Requirement 8.6.2, how must passwords and passphrases for application and system accounts be protected?",
    "options": [
      "Stored in plaintext configuration files that are restricted to local root and domain administrator accounts",
      "Stored securely using credential vaults or encrypted managers, and never hard-coded in scripts or source code",
      "Hard-coded directly in compiled application binaries provided that source code repositories are encrypted",
      "Maintained in digitally signed spreadsheet documents stored within restricted network administrative shares"
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 7 & 8: Access Control & Authentication",
    "explanation": "Requirement 8.6.2 forbids hardcoding passwords and credentials in source code, scripts, or configuration files, and requires secure storage (such as secrets management vaults or encrypted credential stores).",
    "tip": "System/application credentials must never be hard-coded; use secure secrets managers or vaults.",
    "v4_ref": "PCI DSS v4.0.1 Req 8.6.2"
  },
  {
    "id": 443,
    "question": "Under PCI DSS Requirement 10.7.2, how must a service provider respond upon detecting the failure of any critical security control?",
    "options": [
      "Record the failure in annual audit logs and notify acquiring processors during the next scheduled attestation cycle",
      "Reboot affected host servers and suspend external merchant transaction processing until the next scheduled maintenance",
      "Promptly alert personnel, initiate response procedures, address the root cause, and restore security control functions",
      "Decommission the failing security control device and deploy an interim compensating control worksheet within 30 days"
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 9 & 10: Physical & Logging",
    "explanation": "Requirement 10.7.2 (applicable to Service Providers) requires prompt detection, alerting, and response to failures of critical security control systems (firewalls, IDS/IPS, FIM, AV, audit logging), followed by root-cause remediation and immediate restoration.",
    "tip": "Service providers must promptly detect, alert on, and restore failed critical security controls (Req 10.7.2).",
    "v4_ref": "PCI DSS v4.0.1 Req 10.7.2"
  },
  {
    "id": 444,
    "question": "Under PCI DSS Requirement 11.5.1, where must intrusion detection or intrusion prevention techniques (IDS/IPS) be deployed?",
    "options": [
      "Exclusively on external firewalls that connect public web servers directly to internet payment processors",
      "Only on internal domain controllers and database servers that store encrypted primary account numbers",
      "Across physical security perimeters and badge-controlled entry points leading into corporate datacenters",
      "At the perimeter of the cardholder data environment and at critical points inside the card environment"
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 11.5.1 requires deploying intrusion detection and/or intrusion prevention techniques to monitor traffic at the perimeter of the cardholder data environment and at critical points inside the CDE.",
    "tip": "Deploy IDS/IPS at the perimeter of the CDE and at critical internal points within the CDE.",
    "v4_ref": "PCI DSS v4.0.1 Req 11.5.1"
  },
  {
    "id": 445,
    "question": "Under PCI DSS Requirement 12.3.1, what core elements must an entity include in its acceptable use policy for end-user technologies?",
    "options": [
      "Explicit management approval, acceptable network locations, prohibition of unauthorized card copying, and approved products",
      "Mandatory bring-your-own-device allowances, unrestricted remote software installations, and employee privacy protections",
      "Guidelines permitting personal family device usage, open social media messaging channels, and flexible data export rules",
      "Third-party vendor software licensing agreements, hardware depreciation schedules, and electronic equipment warranty terms"
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 12.3.1 mandates documented acceptable use policies for end-user technologies covering explicit management authorization, defined acceptable use, acceptable network locations, prohibition of unauthorized card data copying, and an approved list of products.",
    "tip": "Acceptable use policies must require explicit management approval, define allowed use, and forbid unauthorized card data copying.",
    "v4_ref": "PCI DSS v4.0.1 Req 12.3.1"
  },
  {
    "id": 446,
    "question": "Under PCI DSS Requirement 12.7.1, what screening procedures must an entity perform prior to hiring prospective personnel?",
    "options": [
      "Continuous biometric screening and annual polygraph testing for all employees who enter corporate administrative offices",
      "Background checks (such as previous employment history, criminal records, and credit checks where legally permissible)",
      "Formal technical aptitude testing and mandatory Qualified Security Assessor certification verification for IT candidates",
      "Peer-conducted integrity evaluations and credit bureau reviews conducted exclusively after the initial 90-day probation"
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 12.7.1 mandates background screening of prospective personnel who will have access to the CDE prior to employment, subject to local labor laws, to minimize risk of unauthorized activity.",
    "tip": "Personnel screening prior to employment includes employment history, criminal checks, and credit checks where legal.",
    "v4_ref": "PCI DSS v4.0.1 Req 12.7.1"
  },
  {
    "id": 447,
    "question": "What is the primary purpose of the official Report on Compliance (ROC) Template provided by the PCI SSC?",
    "options": [
      "To outline mandatory contractual billing rates, invoicing schedules, and fee arrangements between assessors and clients",
      "To provide a marketing summary document that merchants distribute publicly to verify ongoing secure transaction handling",
      "To establish a standardized, mandatory reporting format for assessors to document findings during on-site assessments",
      "To replace technical penetration testing reports and automated quarterly vulnerability scan executive summaries"
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "PCI DSS Foundations & Roles",
    "explanation": "The PCI SSC Report on Compliance (ROC) Template provides a mandatory, standardized reporting format for Qualified Security Assessors (QSAs) and Internal Security Assessors (ISAs) to document the scope, evidence, and validation findings of an on-site PCI DSS assessment.",
    "tip": "The ROC Template provides the mandatory, standardized reporting format for assessors during on-site assessments.",
    "v4_ref": "PCI DSS v4.0.1 ROC Template Instructions"
  },
  {
    "id": 448,
    "question": "If an assessed entity complies with every requirement of PCI DSS except for a single non-compliant finding, what overall finding must be documented on the Attestation of Compliance (AOC)?",
    "options": [
      "Compliant with Documented Exception, granting the assessed entity a 90-day remediation period",
      "Substantially Compliant, provided the non-compliant finding does not impact card data storage",
      "Provisionally Approved, pending formal validation of an executive corrective action roadmap",
      "Non-Compliant, because PCI DSS mandates full adherence to all requirements to achieve a pass"
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "PCI DSS Foundations & Roles",
    "explanation": "PCI DSS is strictly a pass/fail standard. There is no partial compliance, provisional pass, or compliant with exceptions. If even one single requirement is found to be In Place = No, the overall assessment result is Non-Compliant.",
    "tip": "PCI DSS is 100% pass/fail: failing even one requirement results in an overall Non-Compliant finding.",
    "v4_ref": "PCI DSS v4.0.1 AOC Instructions"
  },
  {
    "id": 449,
    "question": "Under Visa's global operating regulations, what is the official designation of Visa's compliance program governing entity security?",
    "options": [
      "Cardholder Information Security Program (CISP), promoting compliance across merchants and service providers",
      "Site Data Protection (SDP) program, managing transaction compliance levels and payment processor oversight",
      "Data Security Operating Policy (DSOP), enforcing quarterly network vulnerability scans across acquirers",
      "Secure POS Operations Mandate (SPOM), regulating hardware terminal deployments and tamper-evident controls"
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "PCI DSS Foundations & Roles",
    "explanation": "Visa's data security enforcement program is known globally as the Cardholder Information Security Program (CISP) and Account Information Security (AIS) program in certain regions.",
    "tip": "Visa's compliance program is CISP (Cardholder Information Security Program); MasterCard's is SDP.",
    "v4_ref": "Visa Core Rules & Visa Product and Service Rules"
  },
  {
    "id": 450,
    "question": "Under Mastercard's rules and operational regulations, what is the designated name of Mastercard's data security compliance program?",
    "options": [
      "Cardholder Information Security Program (CISP), defining annual merchant compliance validation levels",
      "Data Security Operating Policy (DSOP), standardizing security requirements across issuing members",
      "Site Data Protection (SDP) program, supporting merchant and service provider adherence to PCI DSS",
      "Payment Security Risk Reduction (PSRR), monitoring compromised account notifications from processors"
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "PCI DSS Foundations & Roles",
    "explanation": "Mastercard's data security compliance enforcement program is the Site Data Protection (SDP) program, which establishes merchant and service provider validation levels and penalty structures.",
    "tip": "Mastercard's program is Site Data Protection (SDP); Visa's is CISP.",
    "v4_ref": "Mastercard Rules, Chapter 10"
  },
  {
    "id": 451,
    "question": "Under Requirement 12.9, what formal written commitment must Third-Party Service Providers (TPSPs) provide to their merchant customers?",
    "options": [
      "A written agreement acknowledging responsibility for the security of cardholder data they handle or could impact",
      "A comprehensive indemnification clause covering all forensic investigation fees and financial penalties from card brands",
      "A formal delegation of security governance transferring all merchant compliance monitoring to the service provider",
      "A binding warranty certifying continuous compliance across all twelve requirements regardless of service boundaries"
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 12.9 is a service-provider-specific requirement mandating that TPSPs confirm in writing to their customers that they acknowledge responsibility for the security of cardholder data they store, process, or transmit on the customer's behalf, or to the extent they could impact the customer's cardholder data environment.",
    "tip": "Req 12.9 = Service Provider's written acknowledgment of responsibility to customers.",
    "v4_ref": "PCI DSS v4.0.1 Req 12.9"
  },
  {
    "id": 452,
    "question": "Under Requirement 12.5.3 (a Service Provider requirement), what cadence is mandated for documenting and confirming PCI DSS scope?",
    "options": [
      "Documenting and confirming PCI DSS scope at least once every twelve months and after major structural shifts",
      "Documenting and confirming PCI DSS scope at least once every six months and following any significant changes",
      "Documenting and confirming PCI DSS scope on a mandatory quarterly schedule aligned with internal vulnerability scans",
      "Documenting and confirming PCI DSS scope every thirty days through automated cloud configuration compliance tools"
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Scope & Segmentation",
    "explanation": "Requirement 12.5.3 requires service providers to document and confirm their PCI DSS scope at least once every six months and upon significant changes. (Note that merchants perform scope confirmation at least annually under Requirement 12.5.2).",
    "tip": "Service providers must confirm scope at least semi-annually (every 6 months) under Req 12.5.3.",
    "v4_ref": "PCI DSS v4.0.1 Req 12.5.3"
  },
  {
    "id": 453,
    "question": "In a card-not-present call center environment, which technology is recommended to prevent audio recordings from capturing Sensitive Authentication Data (SAD)?",
    "options": [
      "Asymmetric storage volume encryption applied to call recording archives immediately following session termination",
      "Real-time natural language processing algorithms that redact spoken card numbers from text transcription records",
      "Dual-Tone Multi-Frequency masking technology that suppresses touch-tone keypad signals from entering call audio",
      "Role-based playback permissions that restrict audio retrieval access exclusively to senior compliance managers"
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Scope & Segmentation",
    "explanation": "PCI SSC Telephone Payment Guidance recommends Dual-Tone Multi-Frequency (DTMF) masking/suppression or pause-and-resume mechanisms so that customers enter SAD via phone touch-tones without capturing or storing audio tones in call recordings.",
    "tip": "DTMF suppression prevents capture and storage of SAD in telephone audio recordings.",
    "v4_ref": "PCI SSC Telephone Payment Guidance"
  },
  {
    "id": 454,
    "question": "When an entity implements tokenization to replace Primary Account Numbers (PANs) with surrogate values, what determines the PCI DSS scope of the token systems?",
    "options": [
      "Token systems are out of scope if the tokens generated use irreversible cryptographic one-way hashing algorithms",
      "Token systems are in scope only when tokens are transmitted across external public networks to third-party gateways",
      "Token systems are automatically exempt from PCI DSS scope if hosted inside a certified multi-tenant cloud facility",
      "Token systems that generate, store, or map tokens to original PANs are fully in scope for all applicable requirements"
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Scope & Segmentation",
    "explanation": "Under PCI SSC Tokenization Guidance, the tokenization system (the vault, engine, or server that creates tokens and maps them to PANs) stores and processes PANs and is therefore fully in scope. In contrast, downstream systems that only store or transmit non-reversible tokens (without access to PANs or the vault) are out of scope.",
    "tip": "Token generation/vault systems that store or map PAN are fully in scope; token-only systems are out of scope.",
    "v4_ref": "PCI SSC Tokenization Guidance"
  },
  {
    "id": 455,
    "question": "Under Requirement 4.2.1.2, which wireless encryption protocol is considered legacy and strictly prohibited for transmitting cardholder data?",
    "options": [
      "Wired Equivalent Privacy due to documented cryptographic vulnerabilities in its shared-key stream cipher algorithm",
      "Wi-Fi Protected Access 2 Enterprise implementing Extensible Authentication Protocol with Transport Layer Security",
      "Wi-Fi Protected Access 3 utilizing Simultaneous Authentication of Equals with Advanced Encryption Standard ciphers",
      "Internet Protocol Security configured in tunnel mode with authenticated twenty-four-hour ephemeral session keys"
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 3 & 4: Data Protection & Encryption",
    "explanation": "Requirement 4.2.1.2 explicitly prohibits Wired Equivalent Privacy (WEP) as a security control for wireless environments connected to the CDE or transmitting cardholder data due to critical flaws. Strong wireless encryption such as WPA2-Enterprise or WPA3 must be used.",
    "tip": "WEP is prohibited; modern industry-accepted wireless protocols (WPA2/WPA3-Enterprise) are required.",
    "v4_ref": "PCI DSS v4.0.1 Req 4.2.1.2"
  },
  {
    "id": 456,
    "question": "Under Requirement 1.2.5, what documentation and controls are required for all permitted services, protocols, and ports?",
    "options": [
      "Annual vendor certificates verifying that default firewall filtering parameters meet international security criteria",
      "Documented business justifications along with security features implemented for any insecure protocols allowed",
      "Signed scanning vendor attestations affirming that all dynamic ports have been cataloged in quarterly audit reports",
      "Cryptographic hashes proving that hardware routing rules match approved network baseline configuration standards"
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 1 & 2: Network & Configurations",
    "explanation": "Requirement 1.2.5 mandates that all services, protocols, and ports allowed are documented, have an approved business justification, and implement security features for all insecure protocols.",
    "tip": "Permitted ports/services require documented business justification and security controls for insecure protocols.",
    "v4_ref": "PCI DSS v4.0.1 Req 1.2.5"
  },
  {
    "id": 457,
    "question": "Under Requirement 2.2.4, what must an entity do regarding system security parameters during system component configuration?",
    "options": [
      "Retain vendor default security settings provided perimeter firewalls isolate the host from untrusted external zones",
      "Deploy customized proprietary parameters without referencing recognized industry system hardening benchmarks",
      "Configure system security parameters to prevent misuse and document any approved exceptions to hardening standards",
      "Rely exclusively on vendor patch management utilities to configure baseline kernel flags and access restrictions"
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 1 & 2: Network & Configurations",
    "explanation": "Requirement 2.2.4 mandates that system security parameters are configured to prevent misuse, consistent with system hardening standards, and any exceptions are formally documented and approved.",
    "tip": "System security parameters must align with recognized hardening standards, with exceptions formally documented.",
    "v4_ref": "PCI DSS v4.0.1 Req 2.2.4"
  },
  {
    "id": 458,
    "question": "Under Requirement 3.4.1, if Primary Account Numbers (PAN) and sensitive data exist in temporary storage or volatile memory, what requirement applies?",
    "options": [
      "Temporary files may remain unencrypted in volatile caches provided operating system root access is strictly restricted",
      "Cardholder data stored in temporary swap partitions is exempt from encryption if systems reboot every twenty-four hours",
      "Volatile memory caches containing account data require encryption only when mirrored to secondary disaster recovery sites",
      "Temporary files and memory containing account data must be securely purged or protected with strong cryptography"
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 3 & 4: Data Protection & Encryption",
    "explanation": "Under Requirement 3.4.1, any temporary files, memory caches, or swap spaces containing PAN or SAD must be protected with strong cryptography or securely purged immediately upon completion of processing.",
    "tip": "Temporary files containing account data must be protected or securely deleted immediately after use.",
    "v4_ref": "PCI DSS v4.0.1 Req 3.4.1"
  },
  {
    "id": 459,
    "question": "Under Requirement 3.7.1, what must an entity do regarding cryptographic architecture documentation across the organization?",
    "options": [
      "Maintain documented procedures describing all cryptographic architecture, algorithms, key lengths, and cryptoperiods",
      "Retain proprietary encryption source code under non-disclosure agreements strictly for internal software developer review",
      "Rely on manufacturer hardware security module specification sheets without maintaining internal key lifecycle records",
      "Archive public certificate validation trees while omitting internal symmetric key lifecycles from audit documentation"
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 3 & 4: Data Protection & Encryption",
    "explanation": "Requirement 3.7.1 mandates that entities maintain documented procedures describing all cryptographic architecture, including algorithms, key lengths, cryptoperiods, and key management systems across the organization.",
    "tip": "Cryptographic architecture documentation must detail all algorithms, key lengths, and cryptoperiods.",
    "v4_ref": "PCI DSS v4.0.1 Req 3.7.1"
  },
  {
    "id": 460,
    "question": "Under Requirement 5.2.2, how frequently must anti-malware signatures and definitions be updated on in-scope system components?",
    "options": [
      "Updated manually on a predetermined calendar monthly schedule following approval by the technical advisory board",
      "Updated automatically and continuously to ensure defense against recent malicious software threats and exploits",
      "Refreshed exclusively during scheduled maintenance windows when underlying operating system patches are applied",
      "Synchronized on a quarterly schedule aligned with internal vulnerability scans and system compliance reporting"
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 5 & 6: Vulnerability & Secure Systems",
    "explanation": "Requirement 5.2.2 requires anti-malware mechanisms to be kept current via automatic updates and regular scans to protect against current and evolving malware threats.",
    "tip": "Anti-malware signatures/definitions must update automatically and continuously.",
    "v4_ref": "PCI DSS v4.0.1 Req 5.2.2"
  },
  {
    "id": 461,
    "question": "Under Requirement 6.4.1, how must public-facing web applications be defended against injection and software vulnerabilities?",
    "options": [
      "By isolating all web servers in a demilitarized zone and disabling external directory browsing functionality",
      "By restricting all web application administrative access to encrypted multi-factor virtual private networks",
      "By deploying an automated technical solution such as a WAF or conducting application vulnerability assessments",
      "By executing quarterly network-layer port scans combined with weekly automated operating system patch cycles"
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 5 & 6: Vulnerability & Secure Systems",
    "explanation": "Requirement 6.4.1 requires public-facing web applications to address new threats continually through an automated technical solution (e.g., Web Application Firewall - WAF) or by conducting manual/automated application vulnerability assessments at least annually and after any changes.",
    "tip": "Public-facing web apps must be protected by an automated solution (WAF) or regular vulnerability reviews.",
    "v4_ref": "PCI DSS v4.0.1 Req 6.4.1"
  },
  {
    "id": 462,
    "question": "What is the primary function of a Targeted Risk Analysis (TRA) under PCI DSS v4.0 Requirement 12.3.2?",
    "options": [
      "A qualitative checklist used by qualified assessors to waive mandatory technical requirements during annual assessments",
      "A financial liability calculation submitted to acquiring banks to estimate exposure under merchant operating agreements",
      "A formal risk justification used exclusively to explain why external penetration testing intervals can exceed twelve months",
      "A documented risk evaluation for requirements with entity-defined frequencies specifying assets, threats, and review cycles"
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 12.3.2 establishes the Targeted Risk Analysis (TRA) framework for requirements that permit entity-defined frequencies. The TRA documents the specific assets, threats, and risks, and justifies how frequently the security control must be performed.",
    "tip": "Requirement 12.3.2 TRA establishes and justifies the frequency for controls with entity-defined intervals.",
    "v4_ref": "PCI DSS v4.0.1 Req 12.3.2"
  },
  {
    "id": 463,
    "question": "What is the primary operational distinction between a single-tenant and a multi-tenant hosting environment under Appendix A1?",
    "options": [
      "Single-tenant environments dedicate underlying computing hardware to one client, whereas multi-tenant environments share resources",
      "Single-tenant environments require annual penetration testing, whereas multi-tenant architectures are entirely exempt from testing",
      "Single-tenant systems store tokenized account data, whereas multi-tenant cloud platforms are legally forbidden from storing card data",
      "Single-tenant hosting requires hardware security modules, whereas multi-tenant platforms utilize software-based virtual key vaults"
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Compensating Controls & v4.0 Customized Approach",
    "explanation": "Under Appendix A1, single-tenant hosting dedicates physical hardware, hypervisors, and storage to one entity, whereas multi-tenant hosting shares physical and virtual infrastructure among multiple customer tenants, necessitating rigorous logical isolation controls.",
    "tip": "Appendix A1 applies to multi-tenant service providers sharing infrastructure among different clients.",
    "v4_ref": "PCI DSS v4.0.1 Appendix A1"
  },
  {
    "id": 464,
    "question": "Under Requirement 9.4.1, how must physical access to media containing cardholder data be controlled in office environments?",
    "options": [
      "Positioned behind reception security desks with continuous visual monitoring during regular business working hours",
      "Stored in securely locked drawers, cabinets, or rooms with access restricted exclusively to authorized personnel",
      "Retained on designated administrative workstations with password-protected screen savers enabled at all times",
      "Encrypted onto removable storage drives and placed inside standard departmental document filing cabinets"
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 9 & 10: Physical & Logging",
    "explanation": "Requirement 9.4.1 mandates that all media containing cardholder data be physically secured (e.g., in secure cabinets, locked drawers, or locked rooms) with access restricted strictly to authorized individuals.",
    "tip": "All physical media containing CHD must be physically secured in locked cabinets, drawers, or rooms.",
    "v4_ref": "PCI DSS v4.0.1 Req 9.4.1"
  },
  {
    "id": 465,
    "question": "Under Requirement 9.4.2, how must media containing cardholder data be classified to ensure proper handling?",
    "options": [
      "Cataloged according to hardware storage media type and serial number in the central fixed asset register",
      "Designated by the highest monetary transaction volume processed across the associated logical partition",
      "Classified so that media containing cardholder data is clearly designated as confidential or sensitive",
      "Marked with the specific payment card brand identifiers corresponding to the card transaction types"
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 9 & 10: Physical & Logging",
    "explanation": "Requirement 9.4.2 mandates that media containing cardholder data be classified so that it is identified as confidential or sensitive, ensuring personnel handle, store, and transport it securely.",
    "tip": "Media with CHD must be classified as confidential/sensitive to govern handling and protection.",
    "v4_ref": "PCI DSS v4.0.1 Req 9.4.2"
  },
  {
    "id": 466,
    "question": "Under Requirement 10.3.1, how must access to audit trails and event logs be controlled to maintain integrity?",
    "options": [
      "Granted to all system administrative staff to facilitate distributed forensic troubleshooting and debugging",
      "Controlled by delegating complete log storage and integrity monitoring to external cloud storage vendors",
      "Provided on an unrestricted read-and-write basis to certified internal and external compliance auditors",
      "Restricted to personnel with a job need and configured as view-only to prevent unauthorized modification"
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 9 & 10: Physical & Logging",
    "explanation": "Requirement 10.3.1 requires that access to audit trails is restricted to individuals with a strict job need, and user access is configured as view-only to prevent unauthorized modification or deletion of log files.",
    "tip": "Audit trail access must be restricted by job need and configured as view-only.",
    "v4_ref": "PCI DSS v4.0.1 Req 10.3.1"
  },
  {
    "id": 467,
    "question": "Under Requirement 10.7.1, what failover procedure is required when audit logging systems encounter a critical operational failure?",
    "options": [
      "Promptly generate critical alerts to designated personnel and halt transaction processing if required",
      "Silently truncate legacy audit entries to maintain uninterrupted cardholder payment transaction flows",
      "Route pending audit log records to local unencrypted workstation drives until disk space is restored",
      "Disable security information and event management alerts while operating in temporary degraded modes"
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 9 & 10: Physical & Logging",
    "explanation": "Requirement 10.7.1 requires that failures of critical security control systems (including audit logging mechanisms) are detected, alerted, and addressed promptly. Systems should alert personnel immediately and halt transaction processing if unlogged activity cannot be tolerated.",
    "tip": "Logging system failures must generate immediate alerts to prevent unmonitored processing.",
    "v4_ref": "PCI DSS v4.0.1 Req 10.7.1"
  },
  {
    "id": 468,
    "question": "Under Requirement 11.3.1.3, what must an entity do regarding internal vulnerability scan findings ranked as High or Critical?",
    "options": [
      "Document the findings in the risk register and review remediation status during the next annual assessment",
      "Remediate the identified vulnerabilities according to risk ranking and perform rescans to verify resolution",
      "Reclassify high-risk findings as low severity if compensatory host-based intrusion software is active",
      "Submit remediation postponement requests directly to the Approved Scanning Vendor for quarterly approval"
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 11.3.1.3 dictates that internal vulnerability scan findings ranked as high-risk or critical (based on Requirement 6.3.1 risk rankings) must be remediated, and rescans must be conducted to confirm the vulnerabilities have been successfully resolved.",
    "tip": "Internal scan vulnerabilities must be resolved based on risk ranking, with rescans verifying remediation.",
    "v4_ref": "PCI DSS v4.0.1 Req 11.3.1.3"
  },
  {
    "id": 469,
    "question": "Under Requirement 11.4.6, what must be done with all exploitable vulnerabilities identified during penetration testing?",
    "options": [
      "Logged as residual risk exceptions provided firewall configurations filter inbound traffic from the internet",
      "Forwarded to executive management for quarterly review while deferring technical fixes to next major release",
      "Remediated in accordance with risk ranking and re-tested until verified that exploitation is no longer possible",
      "Accepted under formal risk waivers signed by application owners without requiring secondary penetration rescans"
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 11.4.6 requires that exploitable vulnerabilities found during penetration testing are remediated according to the entity's risk ranking, and repeated testing is performed until the vulnerabilities are verified as corrected.",
    "tip": "Penetration test exploitable findings must be remediated and retested until verified fixed.",
    "v4_ref": "PCI DSS v4.0.1 Req 11.4.6"
  },
  {
    "id": 470,
    "question": "Under Requirement 12.10.3, what must an entity's incident response plan include regarding payment card brand notifications?",
    "options": [
      "Procedures to notify affected cardholders directly prior to alerting acquiring banks or law enforcement agencies",
      "Mandatory reporting protocols that require notification only when a breach exceeds fifty thousand account records",
      "Protocols to delay notifying payment brands until an independent forensic investigation produces a final report",
      "Documented procedures to immediately notify acquiring banks and payment card brands upon suspected compromise"
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 12.10.3 requires incident response plans to include procedures for the immediate notification of acquiring banks and payment card brands in the event of a suspected or confirmed cardholder data compromise.",
    "tip": "Incident response plan must mandate immediate notification to acquirers and payment brands upon compromise.",
    "v4_ref": "PCI DSS v4.0.1 Req 12.10.3"
  },
  {
    "id": 471,
    "question": "Under Requirement 12.10.4, how often must an entity monitor incident alert sources such as IDS/IPS and file integrity monitoring alerts?",
    "options": [
      "Continually through automated monitoring tools with procedures to respond promptly to critical security alerts",
      "Once every business day during morning operational reviews conducted by senior network engineering personnel",
      "On a scheduled weekly cycle aligned with system vulnerability ticket triage and change management approvals",
      "On a calendar quarterly basis synchronized with internal vulnerability scanning and external audit reviews"
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 12.10.4 requires security alerts (including IDS/IPS, FIM, anti-malware, and automated log alerts) to be monitored continually / 24/7, with established procedures to respond to alerts immediately.",
    "tip": "Incident alert sources must be monitored continually/24x7 to ensure immediate response.",
    "v4_ref": "PCI DSS v4.0.1 Req 12.10.4"
  },
  {
    "id": 472,
    "question": "What is the primary operational distinction between a Merchant and a Service Provider under PCI DSS definitions?",
    "options": [
      "Merchants store cardholder data in relational databases, whereas service providers only handle encrypted transit",
      "Merchants accept cards for goods or services, whereas service providers process or impact data for other entities",
      "Merchants are assessed under self-assessments, whereas service providers must always undergo on-site QSA audits",
      "Merchants establish rules for cardholder verification, whereas service providers manage acquiring bank relationships"
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "PCI DSS Foundations & Roles",
    "explanation": "Under the PCI DSS Glossary, a merchant is defined as an entity that accepts payment cards bearing card brand logos for goods or services, while a service provider is an entity directly involved in processing, storing, or transmitting cardholder data on behalf of another entity, or that could impact CDE security.",
    "tip": "Merchants accept cards for goods/services; Service Providers handle or impact data on behalf of others.",
    "v4_ref": "PCI DSS v4.0.1 Glossary & Roles"
  },
  {
    "id": 473,
    "question": "Under Requirement 8.3.1, when passwords or passphrases are used as an authentication factor, how must they be protected during transmission and storage?",
    "options": [
      "Protected via transport layer encryption in transit and retained in reversible encoded formats within system directories",
      "Safeguarded using private network segmentation in transit and secured via role-based access controls in databases",
      "Protected using strong cryptography during transmission and rendered unreadable in storage using salted hash algorithms",
      "Obfuscated via proprietary encoding routines during transit and isolated within dedicated system configuration registries"
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 7 & 8: Access Control & Authentication",
    "explanation": "Requirement 8.3.1 requires that all passwords and passphrases are protected against unauthorized disclosure using strong cryptography when in transit and when stored (e.g., using salted one-way hashes).",
    "tip": "Passwords must be protected with strong cryptography in transit and stored as salted cryptographic hashes.",
    "v4_ref": "PCI DSS v4.0.1 Req 8.3.1"
  },
  {
    "id": 474,
    "question": "Under Requirement 8.3.3, what security control must be applied to initial passwords distributed to new users and temporary reset passwords?",
    "options": [
      "Configured to expire automatically after thirty days if the account owner does not initiate an interactive login session",
      "Generated from standard organizational role templates and encrypted using public-key credentials issued by directory services",
      "Delivered in encrypted email messages with explicit management authorization allowing multi-factor bypass on initial login",
      "Set to a unique value for each individual and configured to require an immediate password change upon initial login"
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 7 & 8: Access Control & Authentication",
    "explanation": "Requirement 8.3.3 requires that initial passwords distributed to new users and temporary passwords distributed during password resets are set to a unique value for each user and must be forced to change immediately upon first use.",
    "tip": "Initial/temporary passwords must be unique per user and forced to change immediately on first login.",
    "v4_ref": "PCI DSS v4.0.1 Req 8.3.3"
  },
  {
    "id": 475,
    "question": "What is the maximum validity timeframe for an external vulnerability scan report performed by an Approved Scanning Vendor (ASV)?",
    "options": [
      "No more than ninety days, requiring external scans to be completed at least once per calendar quarter",
      "No more than thirty days, requiring external scans to be performed prior to monthly compliance reviews",
      "No more than one hundred eighty days, allowing external scans to be conducted on a semi-annual cadence",
      "No more than three hundred sixty-five days, aligning external scans with the annual assessment cycle"
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 11.3.2 dictates that external vulnerability scans must be conducted at least once every 90 days by an ASV. An ASV report older than 90 days is expired and cannot satisfy the quarterly requirement.",
    "tip": "ASV external scans are valid for at most 90 days (must be run at least once every 90 days / quarterly).",
    "v4_ref": "PCI DSS v4.0.1 Req 11.3.2"
  },
  {
    "id": 476,
    "question": "How many consecutive quarterly passing ASV scans must an entity provide during an annual PCI DSS compliance assessment?",
    "options": [
      "A single passing scan completed within thirty days immediately prior to the formal annual compliance assessment",
      "Four consecutive passing quarterly scans demonstrating continuous compliance over the full assessment year",
      "Two consecutive passing semi-annual scans accompanied by documented internal vulnerability remediation logs",
      "Three consecutive passing quarterly scans provided that the fourth quarter remediation cycle is in progress"
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 11.3.2 requires an entity to demonstrate four consecutive passing quarterly ASV scans to satisfy annual compliance, proving ongoing vulnerability management across all four quarters.",
    "tip": "Entities must provide 4 consecutive passing quarterly ASV scans for annual compliance.",
    "v4_ref": "PCI DSS v4.0.1 Req 11.3.2"
  },
  {
    "id": 477,
    "question": "Under Requirement 1.4.1, how must mobile and employee laptops connecting remotely to the entity's network and CDE be protected?",
    "options": [
      "Configured to enforce biometric user authentication prior to establishing secure browser sessions with payment apps",
      "Restricted to read-only virtual desktop infrastructure sessions with file transfer and clipboard functions disabled",
      "Protected by personal firewall software or host-based security software that is active and cannot be disabled by users",
      "Monitored through daily manual log reviews conducted by security analysts whenever remote connections are initiated"
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 1 & 2: Network & Configurations",
    "explanation": "Requirement 1.4.1 requires personal firewall software or equivalent host-based endpoint protection software to be installed on any mobile or employee laptop that connects to the internet outside the CDE and also connects to the network. The software must be actively running and not alterable by users.",
    "tip": "Remote and mobile laptops connecting to CDE must have active personal firewalls unalterable by users.",
    "v4_ref": "PCI DSS v4.0.1 Req 1.4.1"
  },
  {
    "id": 478,
    "question": "Under Requirement 1.5.1, what documentation is required regarding the entity's network architecture?",
    "options": [
      "A complete hardware inventory listing serial numbers and physical rack locations for all switches and routers",
      "A routing configuration export displaying dynamic Border Gateway Protocol peering sessions across datacenters",
      "A documented list of external internet service provider agreements detailing bandwidth and failover redundancy",
      "An up-to-date network diagram depicting all connections between the cardholder data environment and other networks"
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 1 & 2: Network & Configurations",
    "explanation": "Requirement 1.5.1 mandates maintaining an up-to-date network diagram that depicts all connections between the CDE and other networks, including any wireless networks.",
    "tip": "Req 1.5.1 mandates an up-to-date network diagram showing all connections to/from the CDE.",
    "v4_ref": "PCI DSS v4.0.1 Req 1.5.1"
  },
  {
    "id": 479,
    "question": "Under Requirement 1.5.2, what data flow documentation is required to validate PCI DSS scope?",
    "options": [
      "An up-to-date data flow diagram illustrating all locations where account data is stored, processed, or transmitted",
      "A network bandwidth utilization matrix tracing transaction packet volume across all internal virtual local area networks",
      "A database schema diagram illustrating field mappings between payment transaction tables and customer account indices",
      "A documented cryptographic key distribution map identifying key creation, escrow, distribution, and destruction nodes"
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 1 & 2: Network & Configurations",
    "explanation": "Requirement 1.5.2 mandates maintaining an up-to-date data flow diagram that illustrates all locations where account data is stored, processed, or transmitted across all applications, systems, and networks.",
    "tip": "Req 1.5.2 requires an up-to-date data flow diagram mapping all cardholder data flows.",
    "v4_ref": "PCI DSS v4.0.1 Req 1.5.2"
  },
  {
    "id": 480,
    "question": "Under Requirement 2.2.7, what must an entity do regarding administrative passwords on system components?",
    "options": [
      "Rotate all local administrative account passwords every thirty days across all production and non-production network devices",
      "Ensure system components do not share identical administrative passwords across multiple systems or use privileged access tools",
      "Restrict local administrative accounts to domain-level security groups managed through centralized enterprise directory services",
      "Mandate that administrative passwords contain at least twenty characters when shared among authorized system administration staff"
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 1 & 2: Network & Configurations",
    "explanation": "Requirement 2.2.7 requires that system components do not share the same administrative password across multiple systems, or password management tools must be used to ensure uniqueness across systems.",
    "tip": "Administrative accounts must have unique passwords across systems to prevent lateral movement.",
    "v4_ref": "PCI DSS v4.0.1 Req 2.2.7"
  },
  {
    "id": 481,
    "question": "Under Requirement 3.5.1, what are the only four approved technical methods to render stored Primary Account Numbers (PAN) unreadable?",
    "options": [
      "Symmetric block ciphers, asymmetric public certificates, database access controls, and operating system file obfuscation",
      "Base64 encoding schemes, cryptographic data masking, ephemeral tokenization, and virtual machine volume level encryption",
      "One-way cryptographic hashing, truncation, index tokens and pads, and strong cryptography with associated key management",
      "Elliptic curve Diffie-Hellman exchanges, salt-free hashing algorithms, hardware security tokens, and key escrow vaults"
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 3 & 4: Data Protection & Encryption",
    "explanation": "Requirement 3.5.1 specifies exactly four methods to render stored PAN unreadable: 1) One-way hashes based on strong cryptography; 2) Truncation; 3) Index tokens and securely stored pads; 4) Strong cryptography with associated key management processes and procedures.",
    "tip": "Four approved PAN unreadable methods: 1) One-way hash, 2) Truncation, 3) Index tokens/pads, 4) Strong cryptography.",
    "v4_ref": "PCI DSS v4.0.1 Req 3.5.1"
  },
  {
    "id": 482,
    "question": "Under Requirement 3.5.1.3 (formerly 3.4.1), if both a truncated PAN and a hashed version of the same PAN exist in the same environment, what risk must be addressed?",
    "options": [
      "Database indexing latency caused by collisions between truncated account strings and fixed cryptographic hash digests",
      "Accidental overwriting of full account records during scheduled database replication and synchronization operations",
      "Assessor rejection of cryptographic key management processes due to overlapping token generation and validation mechanisms",
      "Correlating the truncated PAN with the hash digest to reverse-engineer and reconstruct the full original account number"
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 3 & 4: Data Protection & Encryption",
    "explanation": "Requirement 3.5.1.3 states that if an entity stores both hashed and truncated versions of the same PAN, controls must be implemented to prevent correlation of the two that would allow reconstruction of the full original PAN.",
    "tip": "Storing both hashed and truncated PAN in the same environment creates a correlation risk to reconstruct the PAN.",
    "v4_ref": "PCI DSS v4.0.1 Req 3.5.1.3"
  },
  {
    "id": 483,
    "question": "Under Requirement 5.3.1, how must anti-malware software perform scanning activities across in-scope system components?",
    "options": [
      "Conduct continuous behavioral monitoring and either perform periodic scans or active real-time scanning of all files",
      "Execute scheduled batch scans exclusively during off-peak maintenance windows without real-time file monitoring",
      "Perform file system integrity checksums upon administrative login and scan executables prior to software release",
      "Restrict active scanning routines to external network boundary gateways while relying on host whitelisting tools"
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 5 & 6: Vulnerability & Secure Systems",
    "explanation": "Requirement 5.3.1 dictates that anti-malware mechanisms must perform continuous behavioral analysis of systems and either perform periodic malware scans or active, real-time scans of files on all system components.",
    "tip": "Req 5.3.1 requires continuous behavioral monitoring and either active real-time scanning or periodic scans.",
    "v4_ref": "PCI DSS v4.0.1 Req 5.3.1"
  },
  {
    "id": 484,
    "question": "Under Requirement 5.3.2, what advanced mechanism is required to protect system components against evolving and unknown malware threats?",
    "options": [
      "Implementing strict firewall packet filtering and disabling all remote command-line administration protocols",
      "Employing advanced detection techniques such as heuristic analysis, behavioral monitoring, or machine learning",
      "Enforcing daily automated operating system reboots and clearing non-persistent volatile memory configurations",
      "Restricting software installations to digitally signed binaries validated through enterprise domain controllers"
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 5 & 6: Vulnerability & Secure Systems",
    "explanation": "Requirement 5.3.2 requires anti-malware mechanisms to employ advanced detection techniques—such as heuristic analysis, behavioral monitoring, or machine learning—to detect and protect against evolving and zero-day malware threats.",
    "tip": "Req 5.3.2 mandates advanced techniques (heuristics/behavioral/ML) for evolving and zero-day threats.",
    "v4_ref": "PCI DSS v4.0.1 Req 5.3.2"
  },
  {
    "id": 485,
    "question": "Under Requirement 6.3.2, how must an entity maintain an inventory of software to manage vulnerabilities effectively?",
    "options": [
      "Documenting proprietary source code repositories within version control change tickets without tracking external modules",
      "Maintaining software licensing agreements and vendor warranty contracts inside a centralized procurement inventory",
      "Maintaining an up-to-date inventory of bespoke software and third-party components to manage known vulnerabilities",
      "Tracking application binary checksums on network gateways to identify unauthorized custom scripts in production"
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 5 & 6: Vulnerability & Secure Systems",
    "explanation": "Requirement 6.3.2 requires maintaining an up-to-date inventory of bespoke and custom software, as well as third-party software components incorporated into custom software (e.g., open source libraries, commercial APIs), to manage known vulnerabilities.",
    "tip": "Req 6.3.2 requires an inventory of bespoke software and third-party software components (SBOM).",
    "v4_ref": "PCI DSS v4.0.1 Req 6.3.2"
  },
  {
    "id": 486,
    "question": "Under Requirement 7.2.2, what formal process must be enforced for assigning user access privileges to system components?",
    "options": [
      "Delegating privilege assignment to departmental supervisors through informal verbal approvals during team standups",
      "Automatically granting standard administrative privileges upon hire subject to quarterly retrospective privilege audits",
      "Assigning system permissions based on employee job title seniority without requiring formal management approval forms",
      "Enforcing a formal documented access request process authorized by management based on business need and job role"
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 7 & 8: Access Control & Authentication",
    "explanation": "Requirement 7.2.2 dictates that access must be granted through a formal documented access request process, authorized by designated management based on documented business need and role responsibilities.",
    "tip": "Privilege assignment requires a formal documented process with management approval based on need-to-know.",
    "v4_ref": "PCI DSS v4.0.1 Req 7.2.2"
  },
  {
    "id": 487,
    "question": "Under Requirement 7.3.1, how must logical access control systems be configured by default across in-scope systems?",
    "options": [
      "Configured to deny all access by default, granting privileges only on an explicit exception and least privilege basis",
      "Configured to permit read-only access by default across internal network subnets while restricting external access",
      "Configured to permit authenticated corporate domain users baseline access while blocking untrusted guest connections",
      "Configured to allow all operational traffic by default while relying on host-based intrusion systems to block threats"
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 7 & 8: Access Control & Authentication",
    "explanation": "Requirement 7.3.1 mandates that access control systems are configured to 'deny all' by default, granting access only on an explicit exception basis and adhering strictly to least privilege and need-to-know principles.",
    "tip": "Access control systems must be set to 'deny all' by default.",
    "v4_ref": "PCI DSS v4.0.1 Req 7.3.1"
  },
  {
    "id": 488,
    "question": "Under Requirement 8.3.10.1, what authentication requirement applies when multi-factor authentication (MFA) tokens or security keys are used?",
    "options": [
      "Hardware tokens may be shared among operational shift workers provided physical badge checkout times are documented",
      "Tokens and security keys must be assigned to an individual user, and access revoked immediately upon loss or departure",
      "Security tokens must be re-keyed cryptographically on a thirty-day cycle through enterprise public key infrastructure",
      "Multi-factor tokens must incorporate biometric fingerprint sensors to validate physical possession on each login event"
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 7 & 8: Access Control & Authentication",
    "explanation": "Requirement 8.3.10.1 dictates that MFA tokens, smart cards, or security keys must be assigned to an individual user, never shared, and access to revoked, expired, or lost tokens must be disabled immediately.",
    "tip": "MFA devices/tokens must be assigned to an individual user and revoked immediately if lost or compromised.",
    "v4_ref": "PCI DSS v4.0.1 Req 8.3.10.1"
  },
  {
    "id": 489,
    "question": "Under Requirement 9.1.2, what physical security controls are required at physical perimeter entry points such as facility doors and loading docks?",
    "options": [
      "Security guard checkpoints stationed exclusively during scheduled courier delivery and equipment freight transfer windows",
      "Biometric palm scanners installed at loading dock bays with secondary video surveillance reviewed on a quarterly cadence",
      "Physical access controls restricting entry to authorized individuals and monitoring mechanisms to detect unauthorized access",
      "Proximity badge sensors linked to visitor sign-in logs without requiring continuous video surveillance or physical locks"
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 9 & 10: Physical & Logging",
    "explanation": "Requirement 9.1.2 requires facility entry controls at physical perimeter entry points to restrict physical access to authorized personnel and detect/prevent unauthorized access (e.g., tailgating, forced entry).",
    "tip": "Perimeter entry points must restrict entry to authorized individuals and detect unauthorized access.",
    "v4_ref": "PCI DSS v4.0.1 Req 9.1.2"
  },
  {
    "id": 490,
    "question": "Under Requirement 9.4.3, how must physical media containing cardholder data be stored prior to formal destruction?",
    "options": [
      "Placed in tamper-evident plastic bags stored in general office supply rooms awaiting vendor courier pickup",
      "Retained on open staging shelves inside administrative IT departments with badge-controlled door access",
      "Deposited in standard departmental recycling containers provided that shredding occurs within twenty-four hours",
      "Stored securely in locked bins or designated secure containers to prevent unauthorized access prior to destruction"
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 9 & 10: Physical & Logging",
    "explanation": "Requirement 9.4.3 mandates that physical media containing cardholder data is securely stored in locked bins or containers labeled for destruction to prevent theft or unauthorized access prior to destruction.",
    "tip": "Physical media awaiting destruction must be stored in locked bins or secure containers.",
    "v4_ref": "PCI DSS v4.0.1 Req 9.4.3"
  },
  {
    "id": 491,
    "question": "Under Requirement 10.4.3, what must an entity do with exceptions and anomalies identified during audit log reviews?",
    "options": [
      "Investigate anomalies and exceptions promptly in accordance with established operational security procedures",
      "Document discrepancies in quarterly compliance reports while continuing automated transaction processing routines",
      "Re-baseline logging correlation rules to prevent repetitive alerts from generating false positive incident tickets",
      "Forward anomalous event records directly to acquiring banks within twenty-four hours for external review"
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 9 & 10: Physical & Logging",
    "explanation": "Requirement 10.4.3 requires that exceptions and anomalies identified during the audit log review process are investigated and addressed promptly according to documented procedures.",
    "tip": "Log review exceptions and security anomalies must be investigated and resolved promptly.",
    "v4_ref": "PCI DSS v4.0.1 Req 10.4.3"
  },
  {
    "id": 492,
    "question": "Under Requirement 11.2.1, if an entity has a policy prohibiting wireless technology, what testing is still required?",
    "options": [
      "Rogue wireless detection testing is entirely waived if network perimeter firewalls block standard 802.11 traffic",
      "Testing for unauthorized wireless access points must still be performed at least quarterly to detect rogue connections",
      "Physical inspections of network racks must be conducted semi-annually in lieu of radio frequency spectrum analysis",
      "Wireless testing is required only if an acquiring bank or qualified assessor issues a formal compliance finding"
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 11.2.1 states that even if an entity prohibits wireless technology in policy, testing for unauthorized (rogue) wireless access points must still be performed at least quarterly to confirm no unauthorized wireless devices have been connected to the network.",
    "tip": "A written policy banning wireless does NOT exempt an entity from quarterly rogue scans.",
    "v4_ref": "PCI DSS v4.0.1 Req 11.2.1"
  },
  {
    "id": 493,
    "question": "Under Requirement 11.3.1.1, when must vulnerability scans be performed outside the normal quarterly schedule?",
    "options": [
      "Only upon the formal recommendation of an internal audit committee during semi-annual risk governance meetings",
      "Following the release of major commercial operating system updates regardless of whether changes impact the CDE",
      "After any significant change to the network or systems, such as new infrastructure, firewall rules, or upgrades",
      "Exclusively when external threat intelligence feeds identify active zero-day exploits targeting web applications"
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 11.3.1.1 dictates that internal vulnerability scans must be executed at least quarterly AND after any significant change to systems or networks (e.g., new system component installations, changes in network topology, firewall modifications, product upgrades).",
    "tip": "Vulnerability scans are required quarterly AND after any significant change.",
    "v4_ref": "PCI DSS v4.0.1 Req 11.3.1.1"
  },
  {
    "id": 494,
    "question": "Under Requirement 11.4.7 and Appendix A1, what penetration testing requirement applies to multi-tenant cloud service providers?",
    "options": [
      "Providers are exempt from external penetration testing if multi-tenant hypervisors maintain common criteria certification",
      "Providers must restrict penetration testing to physical datacenter infrastructure while prohibiting hypervisor testing",
      "Providers must mandate that each tenant execute quarterly vulnerability scans using a single designated ASV vendor",
      "Providers must enable tenant penetration testing or provide verifiable test evidence confirming effective isolation"
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 11.4.7 and Appendix A1 mandate that multi-tenant cloud service providers support customer penetration testing or provide verifiable penetration test results confirming that logical isolation controls effectively prevent tenant data leakage.",
    "tip": "Multi-tenant providers must validate tenant isolation via penetration testing or allow customer testing.",
    "v4_ref": "PCI DSS v4.0.1 Appendix A1 & Req 11.4"
  },
  {
    "id": 495,
    "question": "Under Requirement 12.4.1, who in executive management must be assigned overall responsibility for the entity's information security program?",
    "options": [
      "A designated executive officer or senior management role formally assigned with authority and accountability",
      "The external Qualified Security Assessor who signs the annual Report on Compliance or Self-Assessment Questionnaire",
      "A rotating committee consisting of departmental line supervisors without an individual designated lead executive",
      "The primary acquiring bank relationship manager overseeing credit card processing merchant accounts and settlement"
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 12.4.1 requires executive management to establish overall responsibility for information security and assign it to a designated executive or other senior management role with appropriate authority.",
    "tip": "Formal information security program ownership must be assigned to an executive or senior management individual.",
    "v4_ref": "PCI DSS v4.0.1 Req 12.4.1"
  },
  {
    "id": 496,
    "question": "Under Requirement 12.5.1, what asset inventory is required for PCI DSS compliance?",
    "options": [
      "A documented register restricted to physical servers and network firewalls located within corporate datacenters",
      "An up-to-date inventory of all system components in scope for PCI DSS, including hardware, software, and cloud assets",
      "A centralized database tracking payment transaction processing volumes and connected point-of-sale terminal models",
      "A fixed asset ledger maintained by procurement detailing hardware purchase dates, serial numbers, and depreciation"
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 12.5.1 mandates maintaining an up-to-date inventory of all system components that are in scope for PCI DSS, including hardware, software, virtual systems, and cloud components.",
    "tip": "System inventory must be current and complete, covering all in-scope hardware, software, and virtual components.",
    "v4_ref": "PCI DSS v4.0.1 Req 12.5.1"
  },
  {
    "id": 497,
    "question": "Under Requirement 12.10.7 (new in v4.0), what must an entity do regarding security incidents involving payment card account data compromises?",
    "options": [
      "Retain third-party public relations counsel and notify affected cardholders prior to initiating technical mitigation",
      "Submit quarterly forensic telemetry directly to payment card brand representatives until formal remediation sign-off",
      "Conduct post-incident reviews to determine root cause and incorporate lessons learned into incident response plans",
      "Re-execute annual penetration testing and replace all compromised network infrastructure before resuming operations"
    ],
    "correct": [
      2
    ],
    "type": "single",
    "category": "Req 11 & 12: Testing, Monitoring & Policy",
    "explanation": "Requirement 12.10.7 requires incident response procedures to include containment, mitigation, post-incident review, and incorporating lessons learned into the incident response plan and operational security controls.",
    "tip": "Post-incident reviews and lessons learned must be integrated into the incident response plan.",
    "v4_ref": "PCI DSS v4.0.1 Req 12.10.7"
  },
  {
    "id": 498,
    "question": "What is the primary operational role of the Payment Card Industry Professional (PCIP) credential within the payment ecosystem?",
    "options": [
      "Authorizing independent third-party assessments and signing official Reports on Compliance as a licensed auditor",
      "Validating commercial software applications against the PCI Secure Software Standard for listing on the SSC website",
      "Conducting formal forensic investigations following merchant card data compromise as an accredited investigator",
      "Demonstrating individual professional knowledge of PCI standards to guide and support internal compliance programs"
    ],
    "correct": [
      3
    ],
    "type": "single",
    "category": "PCI DSS Foundations & Roles",
    "explanation": "The PCIP credential establishes an individual's comprehensive knowledge of PCI standards. Unlike a QSA (who conducts external third-party compliance assessments and signs ROCs), a PCIP helps an organization maintain continuous internal compliance and governance.",
    "tip": "PCIP validates professional knowledge; PCIPs guide and maintain internal compliance programs.",
    "v4_ref": "PCI SSC PCIP Qualification"
  },
  {
    "id": 499,
    "question": "What consequences under Card Brand rules can result if an entity suffers a data breach and is found to have retained prohibited Sensitive Authentication Data (SAD)?",
    "options": [
      "Substantial brand penalties, mandatory PCI Forensic Investigation, card processing restrictions, and elevated compliance tiers",
      "Temporary suspension of corporate web domains, forfeiture of processing merchant accounts, and mandatory cloud infrastructure audits",
      "Mandatory reclassification to merchant self-assessment status accompanied by bi-weekly vulnerability scanning and reporting",
      "Revocation of merchant operational licensing, transfer of customer account databases, and executive management reassignment"
    ],
    "correct": [
      0
    ],
    "type": "single",
    "category": "PCI DSS Foundations & Roles",
    "explanation": "Storing prohibited SAD post-authorization is considered an egregious violation by payment card brands. Penalties include substantial fines, mandatory PCI Forensic Investigator (PFI) audits at entity expense, potential loss of payment card acceptance privileges, and elevation to higher compliance tiers.",
    "tip": "SAD storage violations trigger maximum brand fines, mandatory PFI investigations, and severe merchant sanctions.",
    "v4_ref": "PCI DSS v4.0.1 Req 3.2 & Brand Rules"
  },
  {
    "id": 500,
    "question": "In a cardholder-activated terminal (e.g., automated fuel dispenser at a gas pump), what specific physical security inspection must be performed under Requirement 9.5.1?",
    "options": [
      "Verifying terminal operating system kernel integrity through weekly cryptographic hash reconciliation against vendor baselines",
      "Periodically inspecting the terminal housing, card slot, and keypad for overlay skimmers, eavesdropping wires, or broken seals",
      "Reviewing daily automated transaction transmission retry counts to identify intermittent data interception or drop anomalies",
      "Testing electromagnetic shielding around PIN pads using calibrated spectrum analyzers during scheduled quarterly maintenance"
    ],
    "correct": [
      1
    ],
    "type": "single",
    "category": "Req 9 & 10: Physical & Logging",
    "explanation": "Requirement 9.5.1 mandates periodic physical inspection of POI devices (especially unattended terminals like automated fuel dispensers and ATMs) to detect tampering (e.g., overlay skimmers, fake keypads, hidden eavesdropping wires) or substitution (broken tamper seals or swapped serial numbers).",
    "tip": "Unattended POI terminals require regular physical inspection for tamper & skimmer overlays.",
    "v4_ref": "PCI DSS v4.0.1 Req 9.5.1"
  }
];
if (typeof window !== 'undefined') window.PCIP_QUESTIONS = PCIP_QUESTIONS;
if (typeof global !== 'undefined') global.PCIP_QUESTIONS = PCIP_QUESTIONS;
if (typeof module !== 'undefined' && module.exports) module.exports = { PCIP_QUESTIONS };
