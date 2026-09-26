"use strict";

let danhXung = "";
let tenKhach = "";
let nhacDangPhat = false;

// ── KHỞI CHẠY ──
document.addEventListener("DOMContentLoaded", () => {
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
  kiemTraRSVP();
  demNguoc();
  hatBuiVang();

  // Giới hạn lời chúc tối đa 1000 từ
  const loiChucInput = document.getElementById("rsvp-message");
  if (loiChucInput) {
    loiChucInput.addEventListener("input", gioiHanLoiChuc);
    gioiHanLoiChuc();
  }

  // Cho phép nhấn Enter trong ô nhập tên
  const guestNameInput = document.getElementById("guest-name-input");
  if (guestNameInput) {
    guestNameInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        batDauPhongBi();
      }
    });
  }
});

// ── BƯỚC 1: CHỌN DANH XƯNG ──
function chonDanhXung(ten) {
  danhXung = ten;
  const badge = document.getElementById("danh-xung-badge");
  badge.textContent = ten;
  if (ten === "Baby") {
    Object.assign(badge.style, {
      background: "rgba(236,72,153,0.18)",
      color: "#f9a8d4",
      borderColor: "rgba(236,72,153,0.4)",
    });
  } else {
    Object.assign(badge.style, {
      background: "rgba(212,175,55,0.14)",
      color: "#fbbf24",
      borderColor: "rgba(212,175,55,0.3)",
    });
  }
  chuyen(2);
}

function chuyen(buoc) {
  const s1 = document.getElementById("modal-step-1");
  const s2 = document.getElementById("modal-step-2");
  const d1 = document.getElementById("step-dot-1");
  const d2 = document.getElementById("step-dot-2");
  if (buoc === 1) {
    s1.classList.remove("hidden");
    s2.classList.add("hidden");
    d1.style.cssText =
      "background:#d4af37; box-shadow:0 0 8px rgba(212,175,55,0.6); width:10px; height:10px; border-radius:50%;";
    d2.style.cssText =
      "background:#1f2937; width:10px; height:10px; border-radius:50%;";
  } else {
    s1.classList.add("hidden");
    s2.classList.remove("hidden");
    d1.style.cssText =
      "background:#1f2937; width:10px; height:10px; border-radius:50%;";
    d2.style.cssText =
      "background:#d4af37; box-shadow:0 0 8px rgba(212,175,55,0.6); width:10px; height:10px; border-radius:50%;";
    setTimeout(() => document.getElementById("guest-name-input").focus(), 80);
  }
}

// ── XÓA LỖI KHI NGƯỜI DÙNG BẮT ĐẦU GÕ ──
function xoaLoi() {
  const input = document.getElementById("guest-name-input");
  const errorMsg = document.getElementById("name-error-msg");
  if (input.value.trim()) {
    errorMsg.style.display = "none";
    input.style.borderColor = "";
    input.style.boxShadow = "";
  }
}

function quayLaiBuoc1() {
  chuyen(1);
}

// ── CHUYỂN CẢNH CINEMATIC 3D – NHẸ GPU ──
function chuyenTrangCinematic(fromEl, toEl, enterClass, duration = 700) {
  if (!fromEl || !toEl) return;

  const fx = document.getElementById("page-transition-fx");
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (window.scrollY !== 0) {
    window.scrollTo(0, 0);
  }

  document.body.classList.add("is-transitioning");
  if (typeof window.pauseGoldParticles === "function") {
    window.pauseGoldParticles();
  }

  fromEl.classList.remove("cinematic-out");
  toEl.classList.remove("cinematic-in", "cinematic-envelope-in");
  toEl.classList.remove("hidden", "opacity-0");

  void fromEl.offsetWidth;

  requestAnimationFrame(() => {
    fromEl.classList.add("cinematic-out");
    toEl.classList.add(enterClass);

    fx.classList.remove("play");
    void fx.offsetWidth;
    fx.classList.add("play");
  });

  setTimeout(() => {
    fromEl.classList.add("hidden");
    fromEl.classList.remove("cinematic-out");
    toEl.classList.remove(enterClass);
    fx.classList.remove("play");

    document.body.classList.remove("is-transitioning");
    if (!reduceMotion && typeof window.resumeGoldParticles === "function") {
      window.resumeGoldParticles();
    }
  }, duration);
}

// ── BƯỚC 2: MỞ PHONG BÌ ──
function batDauPhongBi() {
  const input = document.getElementById("guest-name-input");
  const errorMsg = document.getElementById("name-error-msg");
  tenKhach = input.value.trim();

  if (!tenKhach) {
    errorMsg.style.display = "flex";
    input.style.borderColor = "rgba(239,68,68,0.7)";
    input.style.boxShadow =
      "0 0 0 3px rgba(239,68,68,0.15), 0 0 14px rgba(239,68,68,0.2)";
    input.classList.remove("shake-anim");
    void input.offsetWidth;
    input.classList.add("shake-anim");
    input.focus();
    return;
  }

  errorMsg.style.display = "none";
  input.style.borderColor = "";
  input.style.boxShadow = "";

  const guestModal = document.getElementById("guest-modal");
  const envelopeScreen = document.getElementById("envelope-screen");

  chuyenTrangCinematic(
    guestModal,
    envelopeScreen,
    "cinematic-envelope-in",
    950,
  );

  const ten =
    danhXung === "Gia đình"
      ? "Gia đình " + tenKhach
      : `${danhXung} ${tenKhach}`;
  document.getElementById("envelope-guest-name").textContent = ten;

  const wrap = document.getElementById("envelope-wrapper");
  wrap.style.cssText = "opacity:0; transform:translateY(36px) scale(0.96);";
  requestAnimationFrame(() => {
    wrap.style.transition = "all 0.75s cubic-bezier(0.22,1,0.36,1)";
    wrap.style.opacity = "1";
    wrap.style.transform = "translateY(0) scale(1)";
  });
}

// ── MỞ PHONG BÌ ──
function moPhongBi() {
  const sealBtn = document.getElementById("seal-btn");
  sealBtn.style.pointerEvents = "none";
  sealBtn.style.opacity = "0.55";

  document.getElementById("env-flap").classList.add("open");

  const nhac = document.getElementById("bg-music");
  nhac
    .play()
    .then(() => {
      nhacDangPhat = true;
      document.getElementById("music-toggle").classList.add("on");
    })
    .catch(() => {});

  const loiMoi = document.getElementById("loi-moi-ca-nhan");
  const ten = tenKhach ? `${danhXung} ${tenKhach}` : danhXung;

  if (danhXung === "Baby") {
    loiMoi.innerHTML = `Thân mời <span style="color:#f9a8d4; font-weight:700;">Baby ${tenKhach}</span> đến tham dự và chung vui cùng <span style="color:#fbbf24; font-weight:700; white-space:nowrap;">Lê Thành Vinh</span> trong ngày lễ tốt nghiệp đáng nhớ này! 🌸`;
  } else if (danhXung === "Gia đình") {
    loiMoi.innerHTML = `Trân trọng kính mời <span style="color:#fbbf24; font-weight:700;">Gia đình ${tenKhach}</span> đến tham dự lễ tốt nghiệp của <span style="color:#fbbf24; font-weight:700; white-space:nowrap;">Lê Thành Vinh</span>. Sự có mặt của quý gia đình là niềm vinh hạnh lớn lao. 🎓`;
  } else {
    loiMoi.innerHTML = `Trân trọng kính mời <span style="color:#fbbf24; font-weight:700;">${ten}</span> đến tham dự và chung vui cùng <span style="color:#fbbf24; font-weight:700; white-space:nowrap;">Lê Thành Vinh</span> trong ngày lễ tốt nghiệp trọng đại này! 🎓`;
  }

  const wrap = document.getElementById("envelope-wrapper");

  setTimeout(() => {
    wrap.style.transition =
      "transform 0.55s cubic-bezier(0.22,1,0.36,1), opacity 0.55s ease";
    wrap.style.transform = "scale(0.975) translateZ(-8px)";
    wrap.style.opacity = "0";
  }, 1400);

  setTimeout(() => {
    const envelopeScreen = document.getElementById("envelope-screen");
    const card = document.getElementById("main-card");

    card.classList.remove("hidden", "opacity-0");
    card.style.transform = "";

    chuyenTrangCinematic(envelopeScreen, card, "cinematic-in", 700);

    setTimeout(phaoGiay, 760);
  }, 1800);
}

// ── PHÁO GIẤY ──
function phaoGiay() {
  if (typeof confetti !== "function") return;

  const mau = [
    "#d4af37",
    "#fbbf24",
    "#fde68a",
    "#f59e0b",
    "#fff",
    "#fef3c7",
    "#fb923c",
  ];
  const opts = {
    colors: mau,
    disableForReducedMotion: true,
  };

  confetti({
    ...opts,
    particleCount: 55,
    spread: 70,
    origin: { y: 0.62 },
  });
  setTimeout(
    () =>
      confetti({
        ...opts,
        particleCount: 24,
        spread: 95,
        origin: { y: 0.5, x: 0.2 },
      }),
    220,
  );
  setTimeout(
    () =>
      confetti({
        ...opts,
        particleCount: 24,
        spread: 95,
        origin: { y: 0.5, x: 0.8 },
      }),
    360,
  );
}

// ── NHẠC NỀN ──
function toggleMusic() {
  const nhac = document.getElementById("bg-music");
  const btn = document.getElementById("music-toggle");
  if (nhacDangPhat) {
    nhac.pause();
    nhacDangPhat = false;
    btn.classList.remove("on");
  } else {
    nhac.play();
    nhacDangPhat = true;
    btn.classList.add("on");
  }
}

// ── ĐẾM NGƯỢC ──
function demNguoc() {
  const dich = new Date("2026-10-03T08:30:00+07:00").getTime();
  const pad = (n) => String(Math.floor(n)).padStart(2, "0");
  const ids = ["cd-days", "cd-hours", "cd-minutes", "cd-seconds"];

  function cap() {
    const con = dich - Date.now();
    if (con <= 0) {
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.textContent = "00";
      });
      return;
    }
    const daysEl = document.getElementById("cd-days");
    const hoursEl = document.getElementById("cd-hours");
    const minsEl = document.getElementById("cd-minutes");
    const secsEl = document.getElementById("cd-seconds");

    if (daysEl) daysEl.textContent = pad(con / 86400000);
    if (hoursEl) hoursEl.textContent = pad((con % 86400000) / 3600000);
    if (minsEl) minsEl.textContent = pad((con % 3600000) / 60000);
    if (secsEl) secsEl.textContent = pad((con % 60000) / 1000);
  }
  cap();
  setInterval(cap, 1000);
}

// ── GIỚI HẠN LỜI CHÚC: TỐI ĐA 1000 TỪ ──
function gioiHanLoiChuc() {
  const input = document.getElementById("rsvp-message");
  const counter = document.getElementById("rsvp-word-count");
  if (!input) return;

  const words = input.value.match(/\S+/g) || [];

  if (words.length > 1000) {
    input.value = words.slice(0, 1000).join(" ");
  }

  const count = (input.value.match(/\S+/g) || []).length;

  if (counter) {
    counter.textContent = `${count}/1000 từ`;
    counter.style.color =
      count >= 950 ? "rgba(239,68,68,0.85)" : "rgba(212,175,55,0.5)";
  }
}

// ── RSVP ──
function kiemTraRSVP() {
  if (localStorage.getItem("rsvp_v3") === "1") {
    const form = document.getElementById("rsvp-form");
    const thanks = document.getElementById("rsvp-thankyou");
    if (form) form.classList.add("hidden");
    if (thanks) thanks.classList.remove("hidden");
  }
}

async function guiXacNhan(e) {
  e.preventDefault();

  const submitBtn = document.getElementById("rsvp-submit-btn");
  const attendance = document.getElementById("rsvp-attendance").value;
  const message = document.getElementById("rsvp-message").value.trim();

  submitBtn.disabled = true;
  submitBtn.textContent = "Đang gửi...";

  const data = {
    name: tenKhach,
    title: danhXung,
    attending: attendance,
    guests: attendance === "co-mat" ? 1 : 0,
    message: message,
  };

  try {
    await fetch(
      "https://script.google.com/macros/s/AKfycbyQCYpIkAF_WCVAuic7g-1OvjoJEzI03-A-BTxZwKhrLpoM_KiFCZze2ldzgaxcGKRR/exec",
      {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(data),
      },
    );

    localStorage.setItem("rsvp_v3", "1");
    phaoGiay();

    document.getElementById("rsvp-form").classList.add("hidden");
    document.getElementById("rsvp-thankyou").classList.remove("hidden");
  } catch (error) {
    console.error("Lỗi gửi RSVP:", error);

    submitBtn.disabled = false;
    submitBtn.textContent = "Gửi Xác Nhận";

    alert("Không thể gửi phản hồi. Vui lòng kiểm tra kết nối mạng và thử lại.");
  }
}

// ── HẠT BỤI VÀNG ──
function hatBuiVang() {
  const canvas = document.getElementById("particles-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d", { alpha: true });

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener("resize", resize, { passive: true });

  const lowPower = (navigator.hardwareConcurrency || 8) <= 4;
  const count = lowPower ? 34 : 48;

  const hat = Array.from({ length: count }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 1.55 + 0.35,
    vx: (Math.random() - 0.5) * 0.18,
    vy: -Math.random() * 0.32 - 0.07,
    alpha: Math.random() * 0.4 + 0.08,
    doi: Math.random(),
    toc: Math.random() * 0.0022 + 0.0009,
    h: 38 + Math.random() * 22,
    s: 62 + Math.random() * 28,
    l: 52 + Math.random() * 32,
  }));

  let running = true;
  let frameId = 0;

  function ve() {
    if (!running) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const p of hat) {
      p.doi += p.toc;

      if (p.doi > 1) {
        p.doi = 0;
        p.y = canvas.height + 8;
        p.x = Math.random() * canvas.width;
      }

      const a = Math.sin(p.doi * Math.PI) * p.alpha;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.h},${p.s}%,${p.l}%,${a})`;
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;
    }

    frameId = requestAnimationFrame(ve);
  }

  window.pauseGoldParticles = () => {
    if (!running) return;
    running = false;
    cancelAnimationFrame(frameId);
  };

  window.resumeGoldParticles = () => {
    if (running) return;
    running = true;
    frameId = requestAnimationFrame(ve);
  };

  frameId = requestAnimationFrame(ve);
}
