(() => {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const CONSENT_KEY = "senote_cookie_consent";
  const GA_ID = window.GA_MEASUREMENT_ID || "G-NXDQ4XCE4H";

  const injectGA = () => {
    if (!GA_ID) return;
    if (window.gtag) return;
    const gtagScript = document.createElement("script");
    gtagScript.async = true;
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(gtagScript);

    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", GA_ID);
  };

  const saveConsent = (value) => {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch (e) {
      // localStorageが使えない場合は何もしない
    }
  };

  const loadConsent = () => {
    try {
      return localStorage.getItem(CONSENT_KEY);
    } catch (e) {
      return null;
    }
  };

  const banner = document.getElementById("cookie-banner");
  const acceptBtn = document.getElementById("cookie-accept");
  const rejectBtn = document.getElementById("cookie-reject");

  const consent = loadConsent();
  if (consent === "accepted") {
    if (banner) banner.style.display = "none";
    injectGA();
  } else if (consent === "rejected") {
    if (banner) banner.style.display = "none";
  }

  if (banner && acceptBtn && rejectBtn) {
    acceptBtn.addEventListener("click", () => {
      saveConsent("accepted");
      banner.style.display = "none";
      injectGA();
    });
    rejectBtn.addEventListener("click", () => {
      saveConsent("rejected");
      banner.style.display = "none";
    });
  }
})();
