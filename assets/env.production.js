/**
 * Konfigurasi environment PRODUCTION untuk Kuy Dinas Blog.
 *
 * Deploy file ini ke server production sebagai assets/env.js
 * (menggantikan env.js default yang berisi URL local).
 *
 * Cara deploy:
 *   cp assets/env.production.js assets/env.js
 *   (atau atur via CI/CD pipeline)
 */
window.APP_CONFIG = {
  apiBase: "https://apikuy.kuydinas.id"
}
