/**
 * Shared Navbar Component — Kuy Dinas Blog
 *
 * Usage:
 *   <script src="assets/navbar.js"></script>
 *   document.addEventListener('DOMContentLoaded', () => injectNavbar('index'));
 *
 * @param {('index'|'jadwal'|'statistik')} currentPage - Halaman aktif saat ini
 */
function injectNavbar(currentPage) {
  const navLinks = [
    { label: "Fitur", href: "index.html#fitur", page: "index" },
    { label: "Jadwal Tryout", href: "jadwal.html", page: "jadwal" },
    { label: "Statistik", href: "statistik.html", page: "statistik" },
    { label: "FAQ", href: "index.html#faq", page: "index" }
  ]

  const desktopLinks = navLinks
    .map(({ label, href, page }) => {
      const isActive = page === currentPage
      const activeClass = isActive ? "text-coral font-bold" : "transition hover:text-coral"
      return `<a href="${href}" class="${activeClass}">${label}</a>`
    })
    .join("\n            ")

  const mobileLinks = navLinks
    .map(({ label, href, page }) => {
      const isActive = page === currentPage
      const activeClass = isActive
        ? "text-coral font-bold block rounded-xl px-4 py-3 text-sm font-bold"
        : "block rounded-xl px-4 py-3 text-sm font-semibold transition hover:bg-mist hover:text-coral"
      return `<a href="${href}" class="${activeClass}">${label}</a>`
    })
    .join("\n          ")

  const navbarHTML = `
    <nav class="flex items-center justify-between rounded-full border border-white/70 bg-white/75 px-5 py-3 shadow-lg backdrop-blur">
      <!-- Logo -->
      <div class="flex items-center gap-3">
        <div class="grid h-11 w-11 place-items-center rounded-2xl bg-ink text-lg font-extrabold text-white shadow-glow">
          KD
        </div>
        <div>
          <p class="text-lg font-extrabold tracking-tight">Kuy Dinas</p>
          <p class="text-sm text-ink/60">Tryout CPNS intensif &amp; adaptif</p>
        </div>
      </div>

      <!-- Desktop links -->
      <div class="hidden items-center gap-8 text-sm font-semibold lg:flex">
        ${desktopLinks}
      </div>

      <!-- Desktop CTA + Hamburger -->
      <div class="flex items-center gap-3">
        <a
          href="https://tryout.kuydinas.id"
          class="rounded-full bg-ink px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-coral"
        >
          Mulai Tryout
        </a>
        <button
          class="navbar-hamburger lg:hidden rounded-full border border-ink/15 px-3 py-2 text-sm font-bold"
          aria-label="Buka menu navigasi"
          aria-expanded="false"
          aria-controls="navbar-mobile-menu"
        >
          ☰
        </button>
      </div>
    </nav>

    <!-- Mobile dropdown menu -->
    <div
      id="navbar-mobile-menu"
      class="navbar-mobile-menu absolute top-full left-0 right-0 mt-2 rounded-2xl border border-white/70 bg-white/95 p-4 shadow-lg backdrop-blur lg:hidden"
      style="display: none; z-index: 50;"
    >
      <div class="flex flex-col gap-1">
        ${mobileLinks}
        <div class="mt-2 border-t border-ink/10 pt-2">
          <a
            href="https://tryout.kuydinas.id"
            class="block rounded-full bg-ink px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-coral"
          >
            Mulai Tryout
          </a>
        </div>
      </div>
    </div>
  `

  // Inject ke header element
  const header = document.getElementById("main-header") || document.querySelector("header")
  if (!header) {
    console.warn("[navbar.js] Tidak ditemukan elemen <header> atau #main-header di DOM.")
    return
  }

  // Pastikan header punya posisi relative agar mobile menu absolute bisa bekerja
  header.style.position = "relative"
  header.style.overflow = "visible"
  header.classList.add("mx-auto", "max-w-7xl", "px-6", "py-6", "lg:px-8")
  header.innerHTML = navbarHTML

  // Attach hamburger toggle event listener
  const hamburgerBtn = header.querySelector(".navbar-hamburger")
  const mobileMenu = header.querySelector(".navbar-mobile-menu")

  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener("click", (e) => {
      e.stopPropagation()
      const isVisible = mobileMenu.style.display === "block"
      mobileMenu.style.display = isVisible ? "none" : "block"
      hamburgerBtn.setAttribute("aria-expanded", String(!isVisible))
    })

    // Tutup mobile menu saat klik di luar
    document.addEventListener("click", (e) => {
      if (!header.contains(e.target)) {
        mobileMenu.style.display = "none"
        hamburgerBtn.setAttribute("aria-expanded", "false")
      }
    })
  }

  // ─── Scroll-to-top button ────────────────────────────────────────────────
  const scrollBtn = document.createElement("button")
  scrollBtn.setAttribute("aria-label", "Kembali ke atas")
  scrollBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
  `
  Object.assign(scrollBtn.style, {
    position: "fixed",
    bottom: "28px",
    right: "24px",
    zIndex: "999",
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #FF7A59, #F6C453)",
    color: "#081F2D",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 24px rgba(255,122,89,0.45)",
    opacity: "0",
    transform: "translateY(12px)",
    transition: "opacity 250ms ease, transform 250ms ease, box-shadow 200ms ease, scale 200ms ease",
    pointerEvents: "none"
  })

  document.body.appendChild(scrollBtn)

  // Tampilkan setelah scroll 300px
  window.addEventListener(
    "scroll",
    () => {
      const visible = window.scrollY > 300
      scrollBtn.style.opacity = visible ? "1" : "0"
      scrollBtn.style.transform = visible ? "translateY(0)" : "translateY(12px)"
      scrollBtn.style.pointerEvents = visible ? "auto" : "none"
    },
    { passive: true }
  )

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  })

  scrollBtn.addEventListener("mouseenter", () => {
    scrollBtn.style.boxShadow = "0 6px 32px rgba(255,122,89,0.65)"
    scrollBtn.style.scale = "1.1"
  })
  scrollBtn.addEventListener("mouseleave", () => {
    scrollBtn.style.boxShadow = "0 4px 24px rgba(255,122,89,0.45)"
    scrollBtn.style.scale = "1"
  })
}
