# Kavach: SIH-PS26125 Prototype

**Blockchain-Based Secure Platform for Identity, Access Control, and Digital Asset Management**

This repository contains the core Minimum Viable Product (MVP) for the **Kavach** Identity Management platform, built for the Smart India Hackathon (SIH) 2026.

## Architecture

- **Smart Contracts (`contracts/`)**: Implements ERC-5192 (Minimal Soulbound Tokens) on top of ERC-721 for non-transferable identity credentials. Also contains the foundational logic for Adaptive Attribute-Based Access Control (ABAC) anchored in NIST SP 800-162.
- **Frontend Dashboard (`web/`)**: A sleek, Next.js (React) enterprise UI designed to mock the interaction between the user, their Account Abstraction wallet, and the underlying smart contracts, providing an immutable audit trail.

## Getting Started

### 1. Compile Contracts
```bash
cd contracts
npm install
npx hardhat compile
```

### 2. Run the Dashboard UI
```bash
cd web
npm install
npm run dev
```
Open `http://localhost:3000` to view the prototype.

---
*Designed for Bharat Electronics Limited (BEL).*
