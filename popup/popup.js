// ============================================================
//  Scrap BEAK OSINT v2.0 — Popup Script
// ============================================================

const input  = document.getElementById("artifact-input");
const output = document.getElementById("tool-output");

// ── Quick action URL map ─────────────────────────────────────
const QUICK_ACTIONS = {
  shodan:     a => `https://www.shodan.io/host/${a}`,
  virustotal: a => `https://www.virustotal.com/gui/search/${a}`,
  abuseipdb:  a => `https://www.abuseipdb.com/check/${a}`,
  censys:     a => `https://app.censys.io/search?resource=hosts&q=${a}`,
  greynoise:  a => `https://viz.greynoise.io/ip/${a}`,
  crtsh:      a => `https://crt.sh/?q=${a}`,
  urlscan:    a => `https://urlscan.io/search/#${a}`,
  nist:       a => `https://nvd.nist.gov/vuln/detail/${a}`,
  otx:        a => `https://otx.alienvault.com/indicator/search/${a}`,
  hibp:       a => `https://haveibeenpwned.com/unifiedsearch/${a}`,
  cyberchef:  a => `https://gchq.github.io/CyberChef/#input=${btoa(a)}`,
  archive:    a => `https://web.archive.org/web/*/${a}`,
};

// ── Paste button ─────────────────────────────────────────────
document.getElementById("paste-btn").addEventListener("click", async () => {
  try {
    const text = await navigator.clipboard.readText();
    input.value = text;
    input.focus();
    showToast("Pasted!");
  } catch {
    showToast("Clipboard access denied");
  }
});

// ── Quick actions ────────────────────────────────────────────
document.getElementById("quick-actions").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-action]");
  if (!btn) return;

  const artifact = input.value.trim();
  if (!artifact) {
    showToast("⚠️ Enter an artifact first");
    input.focus();
    return;
  }

  const action = btn.dataset.action;
  const builder = QUICK_ACTIONS[action];
  if (builder) {
    chrome.tabs.create({ url: builder(artifact) });
  }
});

// Allow Enter key on input to trigger first action (Shodan by default)
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && input.value.trim()) {
    chrome.tabs.create({ url: QUICK_ACTIONS.shodan(input.value.trim()) });
  }
});

// ── Defang / Refang tools ────────────────────────────────────
function defang(text) {
  return text
    .replace(/\./g, "[.]")
    .replace(/:\/\//g, "[:]//")
    .replace(/https?/gi, m => m.replace("http", "hxxp"))
    .replace(/@/g, "[@]");
}

function refang(text) {
  return text
    .replace(/\[\.]/g, ".")
    .replace(/hxxps?/gi, m => m.replace("hxxp", "http"))
    .replace(/\[:\]\/\//g, "://")
    .replace(/\[\/@]/g, "@");
}

document.getElementById("defang-btn").addEventListener("click", () => {
  const val = input.value.trim();
  if (!val) return showToast("⚠️ Enter text first");
  output.value = defang(val);
});

document.getElementById("refang-btn").addEventListener("click", () => {
  const val = input.value.trim();
  if (!val) return showToast("⚠️ Enter text first");
  output.value = refang(val);
});

document.getElementById("base64enc-btn").addEventListener("click", () => {
  const val = input.value.trim();
  if (!val) return showToast("⚠️ Enter text first");
  try { output.value = btoa(val); }
  catch { output.value = "Error: cannot encode (non-latin chars?)"; }
});

document.getElementById("base64dec-btn").addEventListener("click", () => {
  const val = input.value.trim();
  if (!val) return showToast("⚠️ Enter text first");
  try { output.value = atob(val); }
  catch { output.value = "Error: invalid Base64"; }
});

document.getElementById("urlencode-btn").addEventListener("click", () => {
  const val = input.value.trim();
  if (!val) return showToast("⚠️ Enter text first");
  output.value = encodeURIComponent(val);
});

document.getElementById("urldecode-btn").addEventListener("click", () => {
  const val = input.value.trim();
  if (!val) return showToast("⚠️ Enter text first");
  try { output.value = decodeURIComponent(val); }
  catch { output.value = "Error: invalid URL encoding"; }
});

// ── Copy output ──────────────────────────────────────────────
document.getElementById("copy-output").addEventListener("click", async () => {
  const text = output.value;
  if (!text) return showToast("Nothing to copy");
  try {
    await navigator.clipboard.writeText(text);
    showToast("✅ Copied!");
  } catch {
    showToast("Copy failed");
  }
});

// ── Toast helper ─────────────────────────────────────────────
function showToast(msg) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1800);
}

// ── Auto-focus input on open ─────────────────────────────────
input.focus();
