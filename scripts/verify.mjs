const routes = [
  "/",
  "/about",
  "/hemophilia",
  "/emergency",
  "/treatment-centres",
  "/factor-availability",
  "/services",
  "/services/get-support",
  "/membership",
  "/healthcare-professionals",
  "/advocacy",
  "/data-research",
  "/resources",
  "/elearning",
  "/news",
  "/news/world-hemophilia-day-2026-nepal-call-for-equitable-factor-access",
  "/events",
  "/donate",
  "/transparency",
  "/contact",
  "/portal/patient",
  "/portal/member",
  "/auth/login",
  "/admin",
  "/privacy",
  "/terms",
  "/accessibility-statement",
  "/sitemap.xml",
  "/robots.txt"
];

async function verifyAll() {
  console.log("Starting full HTTP route verification against http://localhost:3000...\n");
  let passed = 0;
  let failed = 0;

  for (const r of routes) {
    try {
      const res = await fetch(`http://localhost:3000${r}`);
      const text = await res.text();
      if (res.status === 200) {
        console.log(`✓ [200 OK] ${r} (${text.length} bytes)`);
        passed++;
      } else {
        console.error(`✗ [${res.status}] ${r}`);
        failed++;
      }
    } catch (err) {
      console.error(`✗ [ERROR] ${r}: ${err.message}`);
      failed++;
    }
  }

  console.log(`\n========================================`);
  console.log(`TOTAL VERIFIED: ${passed}/${routes.length} ROUTES PASSED (Failed: ${failed})`);
  console.log(`========================================\n`);

  if (failed > 0) process.exit(1);
}

verifyAll();
