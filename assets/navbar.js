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
      class="navbar-mobile-menu absolute top-full left-0 right-0 mt-2 rounded-2xl border border-white/70 bg-white/95 p-4 shadow-lg backdrop-blur hidden lg:hidden"
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
  header.classList.add("mx-auto", "max-w-7xl", "px-6", "py-6", "lg:px-8")
  header.innerHTML = navbarHTML

  // Attach hamburger toggle event listener
  const hamburgerBtn = header.querySelector(".navbar-hamburger")
  const mobileMenu = header.querySelector(".navbar-mobile-menu")

  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener("click", () => {
      const isHidden = mobileMenu.classList.toggle("hidden")
      hamburgerBtn.setAttribute("aria-expanded", String(!isHidden))
    })

    // Tutup mobile menu saat klik di luar
    document.addEventListener("click", (e) => {
      if (!header.contains(e.target)) {
        mobileMenu.classList.add("hidden")
        hamburgerBtn.setAttribute("aria-expanded", "false")
      }
    })
  }
}
