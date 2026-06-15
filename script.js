(function () {
  const CONFIG = {
    ca: "91Dk2x4ckHjrzrD7TNnLYC4BPe2wyrncWh8i6zzbpump",
    ticker: "$HORMUZPEACE",
    name: "Hormuz Peace",
    x: "https://x.com/Hormuzpeace",
    xHandle: "@Hormuzpeace",
  };

  const SOL = "So11111111111111111111111111111111111111112";
  const pumpswap = `https://swap.pump.fun/?input=${SOL}&output=${CONFIG.ca}`;
  const pumpfun = `https://pump.fun/coin/${CONFIG.ca}`;
  const dexscreener = `https://dexscreener.com/solana/${CONFIG.ca}`;
  const dexEmbed = `${dexscreener}?embed=1&theme=dark&trades=0&info=0`;

  document.querySelectorAll("[data-pumpswap]").forEach((el) => {
    el.href = pumpswap;
  });
  document.querySelectorAll("[data-pumpfun]").forEach((el) => {
    el.href = pumpfun;
  });
  document.querySelectorAll("[data-dex]").forEach((el) => {
    el.href = dexscreener;
  });
  document.querySelectorAll("[data-x]").forEach((el) => {
    el.href = CONFIG.x;
  });

  const caEl = document.getElementById("ca");
  if (caEl) caEl.textContent = CONFIG.ca;

  const chartFrame = document.getElementById("chart-frame");
  if (chartFrame) chartFrame.src = dexEmbed;

  document.getElementById("year").textContent = new Date().getFullYear();

  const copyBtn = document.getElementById("copy-ca");
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(CONFIG.ca);
        copyBtn.textContent = "Copied!";
        copyBtn.classList.add("copied");
        setTimeout(() => {
          copyBtn.textContent = "Copy";
          copyBtn.classList.remove("copied");
        }, 2000);
      } catch {
        copyBtn.textContent = "Failed";
        setTimeout(() => {
          copyBtn.textContent = "Copy";
        }, 2000);
      }
    });
  }

  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const header = document.querySelector(".site-header");
  if (header) {
    window.addEventListener("scroll", () => {
      header.style.background =
        window.scrollY > 40 ? "rgba(6, 14, 28, 0.96)" : "rgba(6, 14, 28, 0.78)";
    });
  }

  const galleryItems = document.querySelectorAll(".gallery-item");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxClose = document.getElementById("lightbox-close");

  if (lightbox && lightboxImg) {
    galleryItems.forEach((item) => {
      item.addEventListener("click", () => {
        const img = item.querySelector("img");
        if (!img) return;
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.hidden = false;
        document.body.style.overflow = "hidden";
      });
    });

    const closeLightbox = () => {
      lightbox.hidden = true;
      lightboxImg.src = "";
      document.body.style.overflow = "";
    };

    lightboxClose?.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !lightbox.hidden) closeLightbox();
    });
  }
})();
