# 🦅 Scrap BEAK OSINT

> **OSINT & Cybersecurity toolkit** — a Chrome extension that gives you instant right-click access to 60+ investigation tools.

![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-blue?logo=googlechrome&logoColor=white)
![Manifest V3](https://img.shields.io/badge/Manifest-V3-green)
![Version](https://img.shields.io/badge/version-2.0.0-58a6ff)

## ✨ Features

### 🖱️ Right-Click Context Menus
Select any text (IP, domain, hash, CVE, email, username…) and right-click to instantly search it across:

| Category | Tools |
|----------|-------|
| **🔍 WHOIS** | DomainTools, SecurityTrails, Who.is |
| **🌐 IP Address** | AbuseIPDB, Shodan, Censys, VirusTotal, GreyNoise, IPinfo, Criminal IP, HackerTarget, DNSlytics, Tor Relay, BGP.tools |
| **🏠 Domain** | Shodan, Censys, VirusTotal, SecurityTrails, URLhaus, Security Headers, DNSDumpster, crt.sh subdomains |
| **📡 ASN** | DNSlytics, BGP.tools, Hurricane Electric |
| **🔒 SSL / Certificates** | crt.sh, Abuse.ch SSLBL, SSL Labs |
| **🔗 URL / Website** | URLScan.io, Check-Host, Wayback Machine, aguse.jp, URLhaus |
| **🛡️ Vulnerability / CVE** | NIST NVD, CIRCL, Sploitus, Vulmon, FortiGuard, Exploit-DB, CVE Details |
| **🦠 Hash / Malware** | VirusTotal, MalShare, Hybrid Analysis, MalwareBazaar, Triage |
| **✉️ Email** | Have I Been Pwned, Hunter.io, Epieos |
| **👤 Social / OSINT** | X (Twitter), GitHub, Facebook, Instagram, LinkedIn, Reddit + Search |
| **🧰 Encode / Decode** | CyberChef, DenCode, Base64 |
| **🕵️ Threat Intelligence** | AlienVault OTX, Pulsedive, ThreatFox |

### 🚀 Popup Quick Actions
Click the extension icon for:
- **Quick search bar** — paste any artifact and query 12 major tools in one click
- **Defang / Refang** — safely share IOCs
- **Base64 encode/decode**
- **URL encode/decode**

### 🔧 IOC Handling
- Automatic **refanging** of defanged indicators: `hxxps://`, `[.]`, `[:]//`, `[@]`
- Works with both **selected text** and **links**

## 📦 Installation

1. Download or clone this repository
2. Open Chrome → `chrome://extensions/`
3. Enable **Developer mode** (top right)
4. Click **Load unpacked** → select this folder
5. Pin the extension for quick access

## 🗂️ Project Structure

```
Scrap-BEAK-OSINT/
├── manifest.json          # Manifest V3 config
├── background.js          # Service worker + context menus
├── popup/
│   ├── popup.html         # Popup UI
│   ├── popup.css          # Dark theme styles
│   └── popup.js           # Popup logic
├── icons/
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md
```

## 📝 Changelog

### v2.0.0 (2026)
- ⬆️ Migrated to **Manifest V3** (service worker)
- 🗑️ Removed all dead/deprecated services (ThreatCrowd, IPAlyzer, Vulncode DB, BGPView, CXSecurity, DomainWatch, WHOISDS, UltraTools)
- 🔄 Updated URLs: Censys, CIRCL CVE, Twitter → X
- ➕ Added **25+ new tools**: Criminal IP, IPinfo, BGP.tools, SSL Labs, NIST NVD, Exploit-DB, CVE Details, MalwareBazaar, Triage, Have I Been Pwned, Hunter.io, Epieos, AlienVault OTX, Pulsedive, ThreatFox, CyberChef, DenCode, DNSDumpster, Reddit, Google Dork, Hurricane Electric BGP
- 🎨 Added **popup UI** with dark theme, quick-action grid, and encoding/decoding tools
- 🐛 Fixed duplicate menu entries
- 🔧 Added email defang support (`[@]`)

### v1.0.0
- Initial release with basic context menu OSINT lookups

## 📄 License

MIT
