(function () {
  "use strict";

  const STORE_KEY = "construction-site-data-v1";
  const SESSION_KEY = "construction-site-admin";
  const DEFAULT_PASSWORD = "admin123";
  const WORKING_TYPES = ["Residential", "Commercial", "Industrial", "Infrastructure", "Renovation"];
  const STATUSES = ["Planning", "In progress", "On hold"];
  const PHASES = [
    [0, "Site preparation"],
    [0.25, "Foundation"],
    [0.5, "Structure"],
    [0.75, "Finishing"],
    [0.95, "Handover"]
  ];

  /* ---------------- Utilities ---------------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  const esc = (v) => String(v ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const clamp = (n, a, b) => Math.min(b, Math.max(a, n));

  async function sha256(text) {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
    return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, 0)).join("");
  }

  function readImage(file, maxW = 1200) {
    return new Promise((resolve, reject) => {
      if (!file) return resolve("");
      if (!file.type.startsWith("image/")) return reject(new Error("Please choose an image file."));
      const reader = new FileReader();
      reader.onerror = () => reject(new Error("Could not read the file."));
      reader.onload = () => {
        const img = new Image();
        img.onerror = () => reject(new Error("Invalid image."));
        img.onload = () => {
          const scale = Math.min(1, maxW / img.width);
          const canvas = document.createElement("canvas");
          canvas.width = Math.round(img.width * scale);
          canvas.height = Math.round(img.height * scale);
          canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL("image/jpeg", 0.8));
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  }

  /* ---------------- Data store ---------------- */
  function mergeDefaults(saved) {
    const base = structuredClone(DEFAULT_DATA);
    return {
      ...base,
      ...saved,
      settings: { ...base.settings, ...(saved.settings || {}) },
      heroMedia: { ...base.heroMedia, ...(saved.heroMedia || {}) },
      workingSites: Array.isArray(saved.workingSites) ? saved.workingSites : base.workingSites,
      completedSites: Array.isArray(saved.completedSites) ? saved.completedSites : base.completedSites,
      enquiries: Array.isArray(saved.enquiries) ? saved.enquiries : []
    };
  }

  function loadStore() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) return mergeDefaults(JSON.parse(raw));
    } catch (e) { /* fall through */ }
    return structuredClone(DEFAULT_DATA);
  }

  let store = loadStore();

  function saveStore() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(store));
      return true;
    } catch (e) {
      alert("Browser storage is full. Use smaller images or delete some items, then try again.");
      return false;
    }
  }

  /* ---------------- Public rendering ---------------- */
  function renderSettings() {
    const s = store.settings;
    document.title = s.brandName;
    const set = (id, html) => { const el = $(`#${id}`); if (el) el.textContent = html; };
    const setHtml = (id, html) => { const el = $(`#${id}`); if (el) el.innerHTML = html; };
    const setAttr = (id, attr, val) => { const el = $(`#${id}`); if (el) el[attr] = val; };

    const brandEl = $("#brandName");
    if (brandEl) brandEl.innerHTML = s.brandName.replace("Civil Engineering", "Civil Engineering<span>Works</span>");
    set("engineerName", s.engineerName);
    set("heroTitle", s.heroTitle);
    set("heroTagline", s.heroTagline);
    set("footerNote", s.footerNote);
    set("footerBrand", s.brandName);
    set("footerBrandCopy", s.brandName);
    set("year", new Date().getFullYear());
    const phoneLink = s.phone.replace(/\s/g, "");
    setHtml("contactInfo", `
      <h3>Contact</h3>
      <p><strong>${esc(s.engineerName)}</strong></p>
      <p>Phone: <a href="tel:${esc(phoneLink)}">${esc(s.phone)}</a></p>
      <p>Email: <a href="mailto:${esc(s.email)}">${esc(s.email)}</a></p>
      ${s.whatsapp ? `<p>WhatsApp: <a href="https://wa.me/${esc(s.whatsapp.replace(/\D/g, ""))}" target="_blank" rel="noopener">Chat now</a></p>` : ""}
      <p>Address: ${esc(s.address)}</p>`);
    set("contactName", esc(s.engineerName));
    setAttr("contactPhone", "href", `tel:${esc(phoneLink)}`);
    set("contactPhone", esc(s.phone));
    setAttr("contactEmail", "href", `mailto:${esc(s.email)}`);
    set("contactEmail", esc(s.email));
    const wpEl = $("#contactWhatsApp");
    if (wpEl) wpEl.innerHTML = s.whatsapp
      ? `<p>WhatsApp: <a href="https://wa.me/${esc(s.whatsapp.replace(/\D/g, ""))}" target="_blank" rel="noopener">Chat now</a></p>`
      : "";
    set("contactAddress", esc(s.address));
  }

  function imageBlock(item, fallbackLabel) {
    if (item.image) {
      return `<div class="card-img" style="background-image:url('${esc(item.image)}')"></div>`;
    }
    return `<div class="card-img"><div class="ph">${esc(fallbackLabel)}</div></div>`;
  }

  function statusChip(status) {
    const cls = status === "On hold" ? "hold" : "";
    return `<span class="chip ${cls}">${esc(status)}</span>`;
  }

  function renderWorking() {
    const grid = $("#workingGrid");
    if (!store.workingSites.length) {
      grid.innerHTML = `<p class="empty">No active sites right now.</p>`;
      return;
    }
    grid.innerHTML = store.workingSites.map((p) => {
      const pct = clamp(Number(p.progress) || 0, 0, 100);
      return `
      <article class="card" onclick="location.href='project.html?id=${p.id}'">
        ${imageBlock(p, p.type)}
        <div class="card-body">
          ${statusChip(p.status)}
          <h3>${esc(p.name)}</h3>
          <div class="card-meta">${esc(p.location)} &middot; ${esc(p.type)}${p.startDate ? ` &middot; Started ${esc(p.startDate)}` : ""}</div>
          <div class="mini-bar"><span style="width:${pct}%"></span></div>
          <div class="card-meta">${pct}% complete</div>
          <p class="desc">${esc(p.description)}</p>
        </div>
      </article>`;
    }).join("");
  }

  function renderCompleted() {
    const grid = $("#completedGrid");
    if (!store.completedSites.length) {
      grid.innerHTML = `<p class="empty">Completed projects will appear here.</p>`;
      return;
    }
    grid.innerHTML = store.completedSites.map((p) => `
      <article class="card" onclick="location.href='project.html?id=${p.id}'">
        ${imageBlock(p, p.type)}
        <div class="card-body">
          <span class="chip done">Completed ${esc(p.year)}</span>
          <h3>${esc(p.name)}</h3>
          <div class="card-meta">${esc(p.location)} &middot; ${esc(p.type)}${p.area ? ` &middot; ${esc(p.area)}` : ""}${p.client ? ` &middot; ${esc(p.client)}` : ""}</div>
          <p class="desc">${esc(p.description)}</p>
        </div>
      </article>`).join("");
  }

  /* ---------------- Hero: scroll-scrub on desktop, normal on mobile ---------------- */
  const hero = {
    track: null, stage: null, video: null, photos: [],
    bar: null, pct: null, phase: null, hint: null,
    ready: false, isMobile: false, ticking: false
  };

  function isMobileViewport() {
    return window.matchMedia("(max-width: 820px)").matches;
  }

  function setupHero() {
    const container = $("#heroMedia");
    const m = store.heroMedia || {};
    container.innerHTML = "";
    hero.video = null;
    hero.photos = [];
    hero.ready = false;
    hero.isMobile = isMobileViewport();

    if (m.video) {
      const v = document.createElement("video");
      v.src = m.video;
      v.poster = "https://images.unsplash.com/photo-1541888946425-d81bb19940f2?w=1200&q=80";
      v.muted = true;
      v.playsInline = true;
      v.preload = "auto";
      v.setAttribute("muted", "");
      v.setAttribute("playsinline", "");
      v.setAttribute("aria-hidden", "true");
      v.addEventListener("loadedmetadata", () => {
        hero.ready = true;
        if (!hero.isMobile) v.play().catch(() => {}); // autoplay on desktop
        onScrollHero();
      });
      v.addEventListener("error", () => {
        // Fall back to photos if video fails
        if (Array.isArray(m.photos) && m.photos.length) {
          setupHeroPhotos(m.photos);
        } else {
          showHeroEmpty("The hero video could not be loaded. Check the video path in admin Settings.");
        }
      });
      container.appendChild(v);
      hero.video = v;
      v.load();
    } else if (Array.isArray(m.photos) && m.photos.length) {
      hero.photos = m.photos.map((src, i) => {
        const img = document.createElement("img");
        img.src = src;
        img.alt = "";
        img.loading = "lazy";
        if (i === 0) img.classList.add("active", "loaded");
        else img.classList.add("loaded");
        container.appendChild(img);
        return img;
      });
      hero.ready = true;
    } else {
      showHeroEmpty("Add construction footage in the admin panel under Settings &rarr; Hero footage.");
    }

    // Mobile: play video normally, don't scrub by scroll
    if (hero.isMobile && hero.video) {
      hero.video.play().catch(() => {});
    }

    onScrollHero();
  }

  function setupHeroPhotos(photos) {
    const container = $("#heroMedia");
    container.innerHTML = "";
    hero.video = null;
    hero.photos = photos.map((src, i) => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = "";
      img.loading = "lazy";
      if (i === 0) img.classList.add("active", "loaded");
      else img.classList.add("loaded");
      container.appendChild(img);
      return img;
    });
    hero.ready = true;
    onScrollHero();
  }

  function showHeroEmpty(text) {
    const container = $("#heroMedia");
    container.innerHTML = `<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:var(--ink-3);color:#c3cad6;font-size:.9rem;padding:2rem;border:1px dashed var(--line);">${esc(text)}</div>`;
    hero.video = null;
    hero.photos = [];
  }

  function updateHero() {
    const track = hero.track;
    if (!track) return;

    const isMobile = hero.isMobile;
    const total = isMobile ? 0 : (track.offsetHeight - window.innerHeight);
    const scrolled = isMobile ? 0 : -track.getBoundingClientRect().top;
    const p = total > 0 ? clamp(scrolled / total, 0, 1) : 0;

    // Desktop: scrub video / photos by scroll
    if (!isMobile) {
      if (hero.video && hero.ready && isFinite(hero.video.duration)) {
        const target = p * hero.video.duration;
        if (Math.abs(hero.video.currentTime - target) > 0.03) {
          if (hero.video.fastSeek) hero.video.fastSeek(target);
          else hero.video.currentTime = target;
        }
      }
      if (hero.photos.length) {
        const idx = Math.round(p * (hero.photos.length - 1));
        hero.photos.forEach((img, i) => img.classList.toggle("active", i === idx));
      }
    }

    const pct = Math.round(p * 100);
    if (hero.pct) hero.pct.textContent = pct + "%";
    if (hero.bar) hero.bar.style.width = pct + "%";

    let phase = PHASES[0][1];
    PHASES.forEach(([at, name]) => { if (p >= at) phase = name; });
    if (hero.phase) hero.phase.textContent = phase;

    // Mobile: hide scroll hint because hero isn't pinned
    if (hero.hint) {
      hero.hint.style.display = isMobile ? "none" : "block";
    }
  }

  function onScrollHero() {
    if (hero.ticking) return;
    hero.ticking = true;
    requestAnimationFrame(() => { updateHero(); hero.ticking = false; });
  }

  /* ---------------- Enquiry form ---------------- */
  function bindEnquiry() {
    const form = $("#enquiryForm");
    const msg = $("#enquiryMsg");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const d = Object.fromEntries(new FormData(form).entries());
      const name = d.name.trim(), phone = d.phone.trim(), message = d.message.trim();
      if (!name || !phone || !message) return showMsg(msg, "Please fill in name, phone and message.", "err");
      if (!/^[+\d][\d\s()-]{6,}$/.test(phone)) return showMsg(msg, "Please enter a valid phone number.", "err");
      if (d.email && !/^\S+@\S+\.\S+$/.test(d.email)) return showMsg(msg, "Please enter a valid email.", "err");
      store.enquiries.unshift({
        id: uid(), name, phone, email: d.email.trim(), type: d.type, message,
        date: new Date().toISOString(), done: false
      });
      if (!saveStore()) return;
      form.reset();
      showMsg(msg, "Thank you! We will contact you shortly.", "ok");
      updateBadge();
    });
  }

  function showMsg(el, text, kind) {
    el.textContent = text;
    el.className = "form-msg " + (kind || "");
  }

  /* ---------------- Admin ---------------- */
  const admin = { tab: "settings", editing: null, pendingImage: undefined };

  async function ensurePasswordHash() {
    if (!store.adminHash) {
      store.adminHash = await sha256(DEFAULT_PASSWORD);
      saveStore();
    }
  }

  function setLoggedIn(on) {
    sessionStorage.setItem(SESSION_KEY, on ? "1" : "");
    $("#adminLogin").hidden = on;
    $("#adminPanel").hidden = !on;
    if (on) { renderAdmin(); updateBadge(); }
  }

  function updateBadge() {
    const n = store.enquiries.filter((e) => !e.done).length;
    const badge = $("#enqBadge");
    if (badge) badge.textContent = n ? String(n) : "";
  }

  const SITE_FIELDS = {
    working: [
      { key: "name", label: "Project name", type: "text", required: true },
      { key: "location", label: "Location", type: "text", required: true },
      { key: "type", label: "Type", type: "select", options: WORKING_TYPES },
      { key: "status", label: "Status", type: "select", options: STATUSES },
      { key: "progress", label: "Progress (%)", type: "number", min: 0, max: 100 },
      { key: "startDate", label: "Start date", type: "date" },
      { key: "description", label: "Description", type: "textarea" }
    ],
    completed: [
      { key: "name", label: "Project name", type: "text", required: true },
      { key: "location", label: "Location", type: "text", required: true },
      { key: "type", label: "Type", type: "select", options: WORKING_TYPES },
      { key: "year", label: "Year completed", type: "number", min: 1950, max: 2100, required: true },
      { key: "area", label: "Area / size", type: "text" },
      { key: "client", label: "Client (optional)", type: "text" },
      { key: "description", label: "Description", type: "textarea" }
    ]
  };

  const SITE_LISTS = { working: "workingSites", completed: "completedSites" };

  function fieldHtml(f, value) {
    const v = esc(value ?? "");
    const req = f.required ? " required" : "";
    if (f.type === "select") {
      return `<label>${f.label}<select name="${f.key}">${f.options.map((o) =>
        `<option ${o === value ? "selected" : ""}>${esc(o)}</option>`).join("")}</select></label>`;
    }
    if (f.type === "textarea") {
      return `<label>${f.label}<textarea name="${f.key}" rows="4" maxlength="1000">${v}</textarea></label>`;
    }
    const attrs = [f.min !== undefined ? `min="${f.min}"` : "", f.max !== undefined ? `max="${f.max}"` : ""].join(" ");
    return `<label>${f.label}<input name="${f.key}" type="${f.type}" value="${v}" ${attrs}${req} /></label>`;
  }

  function renderAdmin() {
    const body = $("#adminBody");
    document.querySelectorAll("#adminTabs .tab").forEach((b) =>
      b.classList.toggle("active", b.dataset.tab === admin.tab));

    if (admin.tab === "settings") return renderSettingsAdmin(body);
    if (admin.tab === "working" || admin.tab === "completed") return renderSitesAdmin(body, admin.tab);
    if (admin.tab === "enquiries") return renderEnquiriesAdmin(body);
    if (admin.tab === "backup") return renderBackupAdmin(body);
  }

  function renderSettingsAdmin(body) {
    const s = store.settings;
    const rows = [
      ["brandName", "Brand / company name"], ["engineerName", "Engineer name"],
      ["heroTitle", "Hero headline"], ["heroTagline", "Hero tagline"],
      ["phone", "Phone"], ["email", "Email"], ["whatsapp", "WhatsApp number (digits, with country code)"],
      ["address", "Address"], ["footerNote", "Footer note"]
    ];
    const media = store.heroMedia || {};
    body.innerHTML = `
      <h3>Site settings</h3>
      <form data-form="settings">
        <div class="admin-grid">
          ${rows.map(([k, l]) => `<label>${l}${k === "heroTagline" || k === "footerNote"
            ? `<textarea name="${k}" rows="3">${esc(s[k])}</textarea>`
            : `<input name="${k}" value="${esc(s[k])}" />`}</label>`).join("")}
        </div>

        <h3 style="margin-top:1.5rem">Hero footage (scroll-driven real construction)</h3>
        <p class="note">Use either a video <strong>or</strong> a list of photos. Upload the file to the <code>assets</code> folder and enter its path, e.g. <code>assets/site-timelapse-scroll.mp4</code>. On desktop, scrolling scrubs the footage. On mobile, the video plays normally.</p>
        <div class="admin-grid">
          <label>Video path or URL
            <input name="heroVideo" value="${esc(media.video || "")}" placeholder="assets/site-timelapse-scroll.mp4" />
          </label>
          <label>Photo URLs (one per line, in order of progress; used only if no video)
            <textarea name="heroPhotos" rows="4">${esc((media.photos || []).join("\n"))}</textarea>
          </label>
        </div>
        <button class="btn full" type="submit">Save settings</button>
        <p class="form-msg" data-msg></p>
      </form>`;
  }

  function renderSitesAdmin(body, kind) {
    const listKey = SITE_LISTS[kind];
    const items = store[listKey];
    const editing = admin.editing && admin.editing.kind === kind
      ? items.find((i) => i.id === admin.editing.id) : null;
    const isNew = admin.editing && admin.editing.kind === kind && admin.editing.id === "new";
    const label = kind === "working" ? "Working site" : "Completed project";
    const current = editing || {};
    const formOpen = isNew || editing;

    body.innerHTML = `
      <div class="toolbar">
        <h3 style="margin:0;flex:1">${label}s (${items.length})</h3>
        <button class="btn full" data-action="new" data-kind="${kind}">+ Add ${label.toLowerCase()}</button>
      </div>
      <div class="admin-grid">
        <div>
          ${items.length ? items.map((it) => `
            <div class="list-item">
              <div class="thumb" style="${it.image ? `background-image:url('${it.image}')` : ""}"></div>
              <div style="flex:1;min-width:0">
                <strong>${esc(it.name)}</strong><br/>
                <small>${esc(it.location)} &middot; ${esc(it.type)}${kind === "working" ? ` &middot; ${esc(it.status)} ${esc(it.progress)}%` : ` &middot; ${esc(it.year)}`}</small>
              </div>
              <div class="actions">
                <button class="btn small ghost" data-action="edit" data-kind="${kind}" data-id="${it.id}">Edit</button>
                <button class="btn small danger" data-action="delete" data-kind="${kind}" data-id="${it.id}">Delete</button>
              </div>
            </div>`).join("") : `<p class="empty">Nothing added yet.</p>`}
        </div>
        <div>
          ${formOpen ? `
          <h3>${isNew ? "Add" : "Edit"} ${label.toLowerCase()}</h3>
          <form data-form="site" data-kind="${kind}" data-id="${isNew ? "" : current.id}">
            ${SITE_FIELDS[kind].map((f) => fieldHtml(f, current[f.key])).join("")}
            <label>Photo (URL or upload)
              <input type="file" accept="image/*" data-action="pick-image" />
              <span class="note" data-image-note>${current.image ? "Current photo kept unless you choose a new one." : "No photo selected."}</span>
            </label>
            <div class="toolbar">
              <button class="btn full" type="submit">${isNew ? "Add" : "Save changes"}</button>
              <button class="btn ghost full" type="button" data-action="cancel">Cancel</button>
            </div>
            <p class="form-msg" data-msg></p>
          </form>` : `<p class="note">Choose <strong>Add</strong> or <strong>Edit</strong> to change content. Changes appear on the public page immediately in this browser.</p>`}
        </div>
      </div>`;
  }

  function renderEnquiriesAdmin(body) {
    const list = store.enquiries;
    body.innerHTML = `
      <div class="toolbar">
        <h3 style="margin:0;flex:1">Enquiries (${list.length})</h3>
        <button class="btn ghost small" data-action="export-enquiries">Download CSV</button>
      </div>
      ${list.length ? list.map((e) => `
        <div class="enq-item ${e.done ? "done" : ""}">
          <strong>${esc(e.name)}</strong> &middot; <a href="tel:${esc(e.phone)}">${esc(e.phone)}</a>
          ${e.email ? ` &middot; <a href="mailto:${esc(e.email)}">${esc(e.email)}</a>` : ""}
          <p><span class="chip">${esc(e.type)}</span> <small class="note">${new Date(e.date).toLocaleString()}</small></p>
          <p>${esc(e.message)}</p>
          <div class="toolbar">
            <button class="btn small ghost" data-action="toggle-enq" data-id="${e.id}">${e.done ? "Mark as open" : "Mark as handled"}</button>
            <button class="btn small danger" data-action="delete-enq" data-id="${e.id}">Delete</button>
          </div>
        </div>`).join("") : `<p class="empty">No enquiries yet. They appear here when someone submits the form on this browser.</p>`}`;
  }

  function renderBackupAdmin(body) {
    body.innerHTML = `
      <h3>Backup, publish &amp; security</h3>
      <div class="warn">All admin changes are saved in this browser only. Export a backup regularly, and use the export to update the site for every visitor.</div>
      <div class="toolbar" style="margin-top:1rem">
        <button class="btn full" data-action="export">Export site data (JSON)</button>
        <label class="btn ghost full small" style="margin:0;cursor:pointer">
          Import JSON <input type="file" accept="application/json" hidden data-action="import" />
        </label>
        <button class="btn danger full small" data-action="reset">Reset to default content</button>
      </div>
      <h3>Change admin password</h3>
      <form data-form="password" style="max-width:380px">
        <label>New password (min 6 characters)<input type="password" name="pw" required minlength="6" autocomplete="new-password" /></label>
        <button class="btn full" type="submit">Update password</button>
        <p class="form-msg" data-msg></p>
      </form>
      <h3 style="margin-top:1.5rem">How to publish changes to all visitors</h3>
      <ol class="note" style="line-height:1.8">
        <li>Click <strong>Export site data</strong> and save the file.</li>
        <li>Open <code>data.js</code>, replace the object after <code>const DEFAULT_DATA =</code> with the exported JSON, and save.</li>
        <li>Upload the project folder (including the <code>assets</code> folder with your footage) to your web host, e.g. Netlify, Vercel or GitHub Pages.</li>
      </ol>
      <p class="note">Security note: this is a static site, so the password check runs in the browser. It keeps casual visitors out but is not strong protection.</p>`;
  }

  function downloadFile(name, content, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function refreshAll() { renderSettings(); renderWorking(); renderCompleted(); renderAdmin(); updateBadge(); }

  /* Mobile nav toggle */
  function bindMobileNav() {
    const toggle = $("#navToggle");
    const nav = $("#mainNav");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("open");
      toggle.textContent = expanded ? "☰" : "✕";
    });
    // Close menu when clicking a link
    nav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("open");
        toggle.textContent = "☰";
      });
    });
  }

  function bindAdmin() {
    const panel = $("#adminPanel");

    $("#loginForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const pw = new FormData(e.target).get("password");
      await ensurePasswordHash();
      if ((await sha256(pw)) === store.adminHash) {
        e.target.reset();
        showMsg($("#loginMsg"), "", "");
        setLoggedIn(true);
      } else {
        showMsg($("#loginMsg"), "Incorrect password.", "err");
      }
    });

    panel.addEventListener("click", async (e) => {
      const btn = e.target.closest("[data-action]");
      if (!btn) return;
      const { action, tab, kind, id } = btn.dataset;

      if (action === "tab") { admin.tab = tab; admin.editing = null; admin.pendingImage = undefined; renderAdmin(); }
      else if (action === "logout") { setLoggedIn(false); }
      else if (action === "new") { admin.editing = { kind, id: "new" }; admin.pendingImage = undefined; renderAdmin(); }
      else if (action === "edit") { admin.editing = { kind, id }; admin.pendingImage = undefined; renderAdmin(); }
      else if (action === "cancel") { admin.editing = null; admin.pendingImage = undefined; renderAdmin(); }
      else if (action === "delete") {
        const list = store[SITE_LISTS[kind]];
        const item = list.find((i) => i.id === id);
        if (!item || !confirm(`Delete "${item.name}"? This cannot be undone.`)) return;
        store[SITE_LISTS[kind]] = list.filter((i) => i.id !== id);
        if (admin.editing && admin.editing.id === id) admin.editing = null;
        if (saveStore()) { renderAdmin(); renderWorking(); renderCompleted(); }
      }
      else if (action === "toggle-enq") {
        const enq = store.enquiries.find((x) => x.id === id);
        if (enq) { enq.done = !enq.done; saveStore(); renderAdmin(); updateBadge(); }
      }
      else if (action === "delete-enq") {
        if (!confirm("Delete this enquiry?")) return;
        store.enquiries = store.enquiries.filter((x) => x.id !== id);
        saveStore(); renderAdmin(); updateBadge();
      }
      else if (action === "export-enquiries") {
        const quote = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
        const rows = [["Date", "Name", "Phone", "Email", "Type", "Message", "Handled"]]
          .concat(store.enquiries.map((x) => [x.date, x.name, x.phone, x.email, x.type, x.message, x.done ? "yes" : "no"]));
        downloadFile("enquiries.csv", rows.map((r) => r.map(quote).join(",")).join("\n"), "text/csv");
      }
      else if (action === "export") {
        downloadFile("site-data.json", JSON.stringify(store, null, 2), "application/json");
      }
      else if (action === "reset") {
        if (!confirm("Reset ALL content to the defaults? Your current changes and enquiries in this browser will be lost.")) return;
        store = structuredClone(DEFAULT_DATA);
        store.adminHash = await sha256(DEFAULT_PASSWORD);
        saveStore(); setupHero(); refreshAll();
      }
    });

    panel.addEventListener("change", async (e) => {
      const el = e.target;
      if (el.dataset.action === "pick-image") {
        try {
          admin.pendingImage = await readImage(el.files[0]);
          el.closest("form").querySelector("[data-image-note]").textContent = "New photo selected.";
        } catch (err) {
          showMsg(el.closest("form").querySelector("[data-msg]"), err.message, "err");
        }
      }
      if (el.dataset.action === "import") {
        try {
          const data = JSON.parse(await el.files[0].text());
          if (!Array.isArray(data.workingSites) || !Array.isArray(data.completedSites) || !data.settings) {
            throw new Error("This file is not a valid site export.");
          }
          if (!confirm("Replace current content with this file?")) return;
          store = mergeDefaults(data);
          saveStore(); setupHero(); refreshAll();
          alert("Import complete.");
        } catch (err) { alert("Import failed: " + err.message); }
        el.value = "";
      }
    });

    panel.addEventListener("submit", async (e) => {
      e.preventDefault();
      const form = e.target;
      const msg = form.querySelector("[data-msg]");
      const fd = Object.fromEntries(new FormData(form).entries());

      if (form.dataset.form === "settings") {
        Object.keys(store.settings).forEach((k) => { if (k in fd) store.settings[k] = fd[k].trim(); });
        store.heroMedia = {
          video: (fd.heroVideo || "").trim(),
          photos: (fd.heroPhotos || "").split("\n").map((s) => s.trim()).filter(Boolean)
        };
        if (saveStore()) { renderSettings(); setupHero(); showMsg(msg, "Settings saved.", "ok"); }
      }

      if (form.dataset.form === "password") {
        store.adminHash = await sha256(fd.pw);
        if (saveStore()) { form.reset(); showMsg(msg, "Password updated.", "ok"); }
      }

      if (form.dataset.form === "site") {
        const kind = form.dataset.kind;
        const listKey = SITE_LISTS[kind];
        const isNew = !form.dataset.id;
        const fields = SITE_FIELDS[kind];

        for (const f of fields) {
          if (f.required && !String(fd[f.key] || "").trim()) {
            return showMsg(msg, `Please fill in: ${f.label}`, "err");
          }
        }
        const record = {};
        fields.forEach((f) => {
          let v = fd[f.key] ?? "";
          if (f.type === "number") v = v === "" ? "" : Number(v);
          if (kind === "working" && f.key === "progress") v = clamp(v || 0, 0, 100);
          record[f.key] = typeof v === "string" ? v.trim() : v;
        });

        const existing = isNew ? null : store[listKey].find((i) => i.id === form.dataset.id);
        record.image = admin.pendingImage !== undefined ? admin.pendingImage : (existing ? existing.image : "");

        if (isNew) {
          store[listKey].unshift({ id: uid(), ...record });
        } else {
          store[listKey] = store[listKey].map((i) => (i.id === form.dataset.id ? { ...i, ...record } : i));
        }
        if (saveStore()) {
          admin.editing = null;
          admin.pendingImage = undefined;
          renderAdmin();
          renderWorking();
          renderCompleted();
        }
      }
    });
  }

  /* ---------------- Motion: stat count-up and fade-in on scroll ---------------- */
  function initMotion() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = document.querySelectorAll(".section-head, .service, .stat, .reveal");
    targets.forEach((el) => el.classList.add("reveal"));

    if (reduce || !("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("in"));
      document.querySelectorAll("[data-count]").forEach((el) => { el.textContent = el.dataset.count; });
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add("in");
        if (en.target.classList.contains("stat")) countUp(en.target.querySelector("[data-count]"));
        io.unobserve(en.target);
      });
    }, { threshold: 0.15 });
    targets.forEach((el) => io.observe(el));
  }

  function countUp(el) {
    if (!el || el.dataset.done) return;
    el.dataset.done = "1";
    const end = Number(el.dataset.count) || 0;
    const start = performance.now();
    const duration = 1400;
    const step = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(end * eased);
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  /* ---------------- Boot ---------------- */
  function renderPublic() {
    renderSettings();
    renderWorking();
    renderCompleted();
  }

  function bindNavHighlight() {
    const links = [...document.querySelectorAll(".nav nav a")];
    const sections = links.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id));
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach((s) => io.observe(s));
  }

  async function init() {
    hero.track = $("#home");
    hero.stage = $(".hero-stage");
    hero.bar = $("#buildBar");
    hero.pct = $("#buildPct");
    hero.phase = $("#phaseName");
    hero.hint = $("#scrollHint");

    renderPublic();
    setupHero();
    initMotion();
    window.addEventListener("scroll", onScrollHero, { passive: true });
    window.addEventListener("resize", () => {
      const wasMobile = hero.isMobile;
      hero.isMobile = isMobileViewport();
      if (wasMobile !== hero.isMobile) setupHero(); // re-init hero on breakpoint change
      onScrollHero();
    });

    bindEnquiry();
    bindAdmin();
    bindNavHighlight();
    bindMobileNav();
    updateBadge();

    await ensurePasswordHash();
    setLoggedIn(sessionStorage.getItem(SESSION_KEY) === "1");

    if (location.hash === "#admin") {
      document.getElementById("admin").scrollIntoView();
    }
  }

  init();
})();
