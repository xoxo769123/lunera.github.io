// =========================================================
// Lunéra — script.js
// =========================================================

/* رقم واتساب الأعمال — بصيغة دولية بدون + أو مسافات */
const WHATSAPP_NUMBER = "966596032819";

/* رابط إنستقرام — استبدلي "#" بحسابكم الحقيقي مثل:
   https://instagram.com/lunera.perfumes */
const INSTAGRAM_URL = "https://www.instagram.com/luneraaura1?igsh=ZWVoYjJ3cWliN3Ey";

document.addEventListener("DOMContentLoaded", () => {
  setInstagramLinks();
  setYear();
  initNav();
  initStarfield();
  initOrderForm();
  initScentButtons();
  initScrollReveal();
});

/* ---------------------------------------------------------
   روابط إنستقرام
--------------------------------------------------------- */
function setInstagramLinks() {
  document
    .querySelectorAll("#instagramLink, #instagramLinkFooter")
    .forEach((el) => {
      el.setAttribute("href", INSTAGRAM_URL);
    });
}

/* ---------------------------------------------------------
   سنة الفوتر
--------------------------------------------------------- */
function setYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

/* ---------------------------------------------------------
   قائمة الجوال
--------------------------------------------------------- */
function initNav() {
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  links.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---------------------------------------------------------
   خلفية النجوم المتلألئة
--------------------------------------------------------- */
function initStarfield() {
  const canvas = document.getElementById("starfield");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let stars = [];
  let w, h;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    const count = Math.floor((w * h) / 9000);
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.2 + 0.2,
      alpha: Math.random(),
      speed: Math.random() * 0.015 + 0.003,
    }));
  }

  function tick() {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#eef1fb";
    stars.forEach((s) => {
      s.alpha += s.speed;
      const a = Math.abs(Math.sin(s.alpha));
      ctx.globalAlpha = a;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(tick);
  }

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  window.addEventListener("resize", resize);
  resize();
  if (!prefersReduced) {
    tick();
  } else {
    // ارسم لقطة ثابتة فقط
    ctx.fillStyle = "#eef1fb";
    stars.forEach((s) => {
      ctx.globalAlpha = s.alpha;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  }
}

/* ---------------------------------------------------------
   أزرار "اطلب" داخل بطاقات العطور — تعبئة النموذج تلقائياً
--------------------------------------------------------- */
function initScentButtons() {
  const priceMap = {
    Sora: "SORA — 75 ريال",
    Aera: "AERA — 75 ريال",
    Vera: "VERA — 85 ريال",
  };

  document.querySelectorAll(".order-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const scent = btn.dataset.scent;
      const select = document.getElementById("fScent");
      if (select && priceMap[scent]) {
        select.value = priceMap[scent];
      }
      document.getElementById("order").scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        document.getElementById("fName")?.focus();
      }, 500);
    });
  });
}

/* ---------------------------------------------------------
   نموذج الطلب → فتح واتساب برسالة جاهزة
--------------------------------------------------------- */
function initOrderForm() {
  const form = document.getElementById("orderForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.fName.value.trim();
    const phone = form.fPhone.value.trim();
    const scent = form.fScent.value;
    const qty = form.fQty.value;
    const area = form.fArea.value.trim();

    if (!name || !phone || !scent || !qty || !area) {
      alert("يرجى تعبئة جميع الحقول قبل إرسال الطلب.");
      return;
    }

    const message =
      `مرحباً Lunéra 🌙\n` +
      `أرغب بطلب عطر جديد:\n\n` +
      `الاسم: ${name}\n` +
      `الجوال: ${phone}\n` +
      `العطر: ${scent}\n` +
      `الكمية: ${qty}\n` +
      `المنطقة: ${area}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank", "noopener");
  });
}

/* ---------------------------------------------------------
   ظهور تدريجي للأقسام عند التمرير
--------------------------------------------------------- */
function initScrollReveal() {
  const targets = document.querySelectorAll(
    ".story__wrap, .product, .review-card, .order__wrap, .instagram__wrap"
  );
  if (!("IntersectionObserver" in window) || targets.length === 0) return;

  targets.forEach((t) => {
    t.style.opacity = "0";
    t.style.transform = "translateY(24px)";
    t.style.transition = "opacity .8s ease, transform .8s ease";
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  targets.forEach((t) => observer.observe(t));
}
