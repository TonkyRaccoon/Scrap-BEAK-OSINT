// ============================================================
//  Scrap BEAK OSINT v2.0 — Background Service Worker
//  Clean, deduplicated, Manifest V3 compliant
// ============================================================

// ── Menu structure definition ────────────────────────────────
// Each category holds its items. IDs must be unique.
const MENU_TREE = [
  // ─── WHOIS ─────────────────────────────────────────────────
  {
    id: "whois", title: "🔍 WHOIS", children: [
      { id: "whois-domaintools",    title: "DomainTools" },
      { id: "whois-securitytrails", title: "SecurityTrails" },
      { id: "whois-who-is",         title: "Who.is" },
    ]
  },

  // ─── IP — IPv4 ────────────────────────────────────────────
  {
    id: "ip", title: "🌐 IP Address", children: [
      {
        id: "ipv4", title: "IPv4", children: [
          { id: "ipv4-abuseipdb",      title: "AbuseIPDB" },
          { id: "ipv4-shodan",         title: "Shodan" },
          { id: "ipv4-censys",         title: "Censys" },
          { id: "ipv4-virustotal",     title: "VirusTotal" },
          { id: "ipv4-greynoise",      title: "GreyNoise" },
          { id: "ipv4-hackertarget",   title: "HackerTarget Reverse IP" },
          { id: "ipv4-dnslytics",      title: "DNSlytics" },
          { id: "ipv4-tor",            title: "Tor Relay Search" },
          { id: "ipv4-ipinfo",         title: "IPinfo.io" },
          { id: "ipv4-bgptools",       title: "BGP.tools" },
          { id: "ipv4-criminalip",     title: "Criminal IP" },
        ]
      },
      {
        id: "ipv6", title: "IPv6", children: [
          { id: "ipv6-dnslytics",  title: "DNSlytics IPv6" },
          { id: "ipv6-ipinfo",     title: "IPinfo.io" },
          { id: "ipv6-shodan",     title: "Shodan" },
        ]
      }
    ]
  },

  // ─── DOMAIN ────────────────────────────────────────────────
  {
    id: "domain", title: "🏠 Domain", children: [
      { id: "domain-shodan",          title: "Shodan" },
      { id: "domain-censys",          title: "Censys" },
      { id: "domain-virustotal",      title: "VirusTotal" },
      { id: "domain-securitytrails",  title: "SecurityTrails" },
      { id: "domain-urlhaus",         title: "URLhaus" },
      { id: "domain-securityheaders", title: "Security Headers" },
      { id: "domain-hackertarget-tr", title: "HackerTarget Traceroute" },
      { id: "domain-tor",             title: "Tor Relay Search" },
      { id: "domain-dnsdumpster",     title: "DNSDumpster" },
      { id: "domain-subdomainfinder", title: "Subfinder (crt.sh)" },
    ]
  },

  // ─── ASN ───────────────────────────────────────────────────
  {
    id: "asn", title: "📡 ASN", children: [
      { id: "asn-dnslytics", title: "DNSlytics" },
      { id: "asn-bgptools",  title: "BGP.tools" },
      { id: "asn-he",        title: "Hurricane Electric" },
    ]
  },

  // ─── SSL CERTIFICATES ─────────────────────────────────────
  {
    id: "ssl", title: "🔒 SSL / Certificate", children: [
      { id: "ssl-crtsh",   title: "crt.sh" },
      { id: "ssl-sslbl",   title: "Abuse.ch SSLBL" },
      { id: "ssl-ssllabs", title: "SSL Labs" },
    ]
  },

  // ─── URL ───────────────────────────────────────────────────
  {
    id: "url", title: "🔗 URL / Website", children: [
      { id: "url-urlscan",   title: "URLScan.io" },
      { id: "url-checkhost", title: "Check-Host" },
      { id: "url-archive",   title: "Wayback Machine" },
      { id: "url-aguse",     title: "aguse.jp" },
      { id: "url-urlhaus",   title: "URLhaus" },
      { id: "url-httpstatus", title: "HTTP Status" },
    ]
  },

  // ─── VULNERABILITY / CVE ──────────────────────────────────
  {
    id: "vuln", title: "🛡️ Vulnerability / CVE", children: [
      { id: "vuln-nist",       title: "NIST NVD" },
      { id: "vuln-circl",      title: "CIRCL CVE" },
      { id: "vuln-sploitus",   title: "Sploitus" },
      { id: "vuln-vulmon",     title: "Vulmon" },
      { id: "vuln-fortiguard", title: "FortiGuard" },
      { id: "vuln-exploitdb",  title: "Exploit-DB" },
      { id: "vuln-cvedetails", title: "CVE Details" },
    ]
  },

  // ─── HASHES / MALWARE ─────────────────────────────────────
  {
    id: "hash", title: "🦠 Hash / Malware", children: [
      { id: "hash-virustotal",  title: "VirusTotal" },
      { id: "hash-malshare",    title: "MalShare" },
      { id: "hash-hybridanalysis", title: "Hybrid Analysis" },
      { id: "hash-malwarebazaar", title: "MalwareBazaar" },
      { id: "hash-triage",       title: "Triage" },
    ]
  },

  // ─── EMAIL ─────────────────────────────────────────────────
  {
    id: "email", title: "✉️ Email", children: [
      { id: "email-haveibeenpwned", title: "Have I Been Pwned" },
      { id: "email-hunter",        title: "Hunter.io" },
      { id: "email-epieos",        title: "Epieos" },
    ]
  },

  // ─── SOCIAL / OSINT ───────────────────────────────────────
  {
    id: "social", title: "👤 Social / OSINT", children: [
      {
        id: "social-profiles", title: "Profile Lookup", children: [
          { id: "social-x",         title: "X (Twitter)" },
          { id: "social-github",    title: "GitHub" },
          { id: "social-facebook",  title: "Facebook" },
          { id: "social-instagram", title: "Instagram" },
          { id: "social-linkedin",  title: "LinkedIn" },
          { id: "social-reddit",    title: "Reddit" },
        ]
      },
      {
        id: "social-search", title: "Search / Timeline", children: [
          { id: "social-x-search",        title: "X (Twitter) Search" },
          { id: "social-facebook-search",  title: "Facebook Search" },
          { id: "social-reddit-search",    title: "Reddit Search" },
          { id: "social-google-dork",      title: "Google Dork" },
        ]
      },
    ]
  },

  // ─── ENCODING / DECODE TOOLS ──────────────────────────────
  {
    id: "encode", title: "🧰 Encode / Decode", children: [
      { id: "encode-cyberchef",   title: "CyberChef" },
      { id: "encode-dencode",     title: "DenCode" },
      { id: "encode-base64",      title: "Base64 Decode" },
    ]
  },

  // ─── THREAT INTEL ─────────────────────────────────────────
  {
    id: "threatintel", title: "🕵️ Threat Intelligence", children: [
      { id: "ti-otx",          title: "AlienVault OTX" },
      { id: "ti-pulsedive",    title: "Pulsedive" },
      { id: "ti-threatfox",    title: "ThreatFox" },
    ]
  },
];


// ── URL mapping ──────────────────────────────────────────────
// Each menu item ID maps to a function that returns the target URL.
// `a` = artifact (cleaned text), `e` = encodeURIComponent(artifact)
const URL_MAP = {
  // WHOIS
  "whois-domaintools":    a => `https://whois.domaintools.com/${a}`,
  "whois-securitytrails": a => `https://securitytrails.com/domain/${a}/dns`,
  "whois-who-is":         a => `https://who.is/whois/${a}`,

  // IPv4
  "ipv4-abuseipdb":    a => `https://www.abuseipdb.com/check/${a}`,
  "ipv4-shodan":       a => `https://www.shodan.io/host/${a}`,
  "ipv4-censys":       a => `https://app.censys.io/hosts/${a}`,
  "ipv4-virustotal":   a => `https://www.virustotal.com/gui/ip-address/${a}`,
  "ipv4-greynoise":    a => `https://viz.greynoise.io/ip/${a}`,
  "ipv4-hackertarget": a => `https://api.hackertarget.com/reverseiplookup/?q=${a}`,
  "ipv4-dnslytics":    a => `https://dnslytics.com/ip/${a}`,
  "ipv4-tor":          a => `https://metrics.torproject.org/rs.html#search/${a}`,
  "ipv4-ipinfo":       a => `https://ipinfo.io/${a}`,
  "ipv4-bgptools":     a => `https://bgp.tools/prefix/${a}`,
  "ipv4-criminalip":   a => `https://www.criminalip.io/asset/report/${a}`,

  // IPv6
  "ipv6-dnslytics": a => `https://dnslytics.com/ipv6/${a}`,
  "ipv6-ipinfo":    a => `https://ipinfo.io/${a}`,
  "ipv6-shodan":    a => `https://www.shodan.io/host/${a}`,

  // Domain
  "domain-shodan":          a => `https://www.shodan.io/search?query=${a}`,
  "domain-censys":          a => `https://app.censys.io/search?resource=hosts&q=${a}`,
  "domain-virustotal":      a => `https://www.virustotal.com/gui/domain/${a}`,
  "domain-securitytrails":  a => `https://securitytrails.com/domain/${a}`,
  "domain-urlhaus":         a => `https://urlhaus.abuse.ch/browse.php?search=${a}`,
  "domain-securityheaders": a => `https://securityheaders.com/?q=${a}&followRedirects=on`,
  "domain-hackertarget-tr": a => `https://api.hackertarget.com/mtr/?q=${a}`,
  "domain-tor":             a => `https://metrics.torproject.org/rs.html#search/${a}`,
  "domain-dnsdumpster":     a => `https://dnsdumpster.com/`,
  "domain-subdomainfinder": a => `https://crt.sh/?q=%25.${a}`,

  // ASN
  "asn-dnslytics": a => `https://dnslytics.com/bgp/${a.toLowerCase()}`,
  "asn-bgptools":  a => `https://bgp.tools/as/${a.replace(/\D/g, "")}`,
  "asn-he":        a => `https://bgp.he.net/${a}`,

  // SSL
  "ssl-crtsh":   a => `https://crt.sh/?q=${a}`,
  "ssl-sslbl":   a => `https://sslbl.abuse.ch/ssl-certificates/sha1/${a}`,
  "ssl-ssllabs": a => `https://www.ssllabs.com/ssltest/analyze.html?d=${a}`,

  // URL
  "url-urlscan":    a => `https://urlscan.io/search/#${a}`,
  "url-checkhost":  a => `https://check-host.net/ip-info?host=${a}`,
  "url-archive":    a => `https://web.archive.org/web/*/${a}`,
  "url-aguse":      (a, e) => `https://www.aguse.jp/?url=${e}`,
  "url-urlhaus":    a => `https://urlhaus.abuse.ch/browse.php?search=${a}`,
  "url-httpstatus": a => `https://httpstatus.io/${a}`,

  // Vulnerability
  "vuln-nist":       a => `https://nvd.nist.gov/vuln/detail/${a}`,
  "vuln-circl":      a => `https://vulnerability.circl.lu/vuln/${a}`,
  "vuln-sploitus":   a => `https://sploitus.com/?query=${a}#exploits`,
  "vuln-vulmon":     a => `https://vulmon.com/searchpage?q=${a}`,
  "vuln-fortiguard": a => `https://fortiguard.com/search?q=${a}&engine=3`,
  "vuln-exploitdb":  a => `https://www.exploit-db.com/search?cve=${a}`,
  "vuln-cvedetails": a => `https://www.cvedetails.com/cve/${a}`,

  // Hashes
  "hash-virustotal":     a => `https://www.virustotal.com/gui/search/${a}`,
  "hash-malshare":       a => `https://malshare.com/search.php?query=${a}`,
  "hash-hybridanalysis": a => `https://www.hybrid-analysis.com/search?query=${a}`,
  "hash-malwarebazaar":  a => `https://bazaar.abuse.ch/browse.php?search=${a}`,
  "hash-triage":         a => `https://tria.ge/s?q=${a}`,

  // Email
  "email-haveibeenpwned": a => `https://haveibeenpwned.com/unifiedsearch/${a}`,
  "email-hunter":         a => `https://hunter.io/email-verifier/${a}`,
  "email-epieos":         a => `https://epieos.com/?q=${a}&t=email`,

  // Social — Profile
  "social-x":         a => `https://x.com/${a}`,
  "social-github":    a => `https://github.com/${a}`,
  "social-facebook":  a => `https://www.facebook.com/public/${a}`,
  "social-instagram": a => `https://www.instagram.com/${a}`,
  "social-linkedin":  a => `https://www.linkedin.com/in/${a}`,
  "social-reddit":    a => `https://www.reddit.com/user/${a}`,

  // Social — Search
  "social-x-search":       a => `https://x.com/search?q=${a}`,
  "social-facebook-search": a => `https://www.facebook.com/search/top/?q=${a}`,
  "social-reddit-search":   a => `https://www.reddit.com/search/?q=${a}`,
  "social-google-dork":     a => `https://www.google.com/search?q=%22${encodeURIComponent(a)}%22`,

  // Encode / Decode
  "encode-cyberchef": a => `https://gchq.github.io/CyberChef/#input=${btoa(a)}`,
  "encode-dencode":   a => `https://dencode.com/string?v=${encodeURIComponent(a)}`,
  "encode-base64":    a => `https://www.base64decode.org/?val=${encodeURIComponent(a)}`,

  // Threat Intelligence
  "ti-otx":       a => `https://otx.alienvault.com/indicator/search/${a}`,
  "ti-pulsedive": a => `https://pulsedive.com/indicator/?ioc=${encodeURIComponent(a)}`,
  "ti-threatfox": a => `https://threatfox.abuse.ch/browse.php?search=ioc%3A${a}`,
};


// ── Build context menus recursively ──────────────────────────
function buildMenus(items, parentId = null) {
  for (const item of items) {
    const opts = {
      id:       item.id,
      title:    item.title,
      contexts: ["selection", "link"],
    };
    if (parentId) opts.parentId = parentId;

    chrome.contextMenus.create(opts);

    if (item.children) {
      buildMenus(item.children, item.id);
    }
  }
}

// Rebuild menus on install / update
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.removeAll(() => {
    buildMenus(MENU_TREE);
  });
});


// ── Refang function ──────────────────────────────────────────
function refang(text) {
  return text
    .replace(/\[\.]/g, ".")
    .replace(/hxxps?:\/\//gi, m => m.replace("hxxp", "http"))
    .replace(/\[:\]\/\//g, "://")
    .replace(/\[\/@]/g, "@")        // email defang
    .trim();
}


// ── Click handler ────────────────────────────────────────────
chrome.contextMenus.onClicked.addListener((info, tab) => {
  let artifact = "";

  if (info.selectionText) {
    artifact = info.selectionText.trim();
  } else if (info.linkUrl) {
    try { artifact = new URL(info.linkUrl).host; } catch { artifact = info.linkUrl; }
  } else if (info.srcUrl) {
    try { artifact = new URL(info.srcUrl).host; } catch { artifact = info.srcUrl; }
  }

  artifact = refang(artifact);
  const encoded = encodeURIComponent(artifact);

  const builder = URL_MAP[info.menuItemId];
  if (!builder) return;  // clicked a parent menu, ignore

  const url = builder(artifact, encoded);
  chrome.tabs.create({ url });
});
