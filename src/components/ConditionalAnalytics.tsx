'use client';

import { useEffect } from 'react';

export function ConditionalAnalytics() {
  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    
    if (consent === 'accepted') {
      // Load Umami Analytics
      const umamiScript = document.createElement('script');
      umamiScript.defer = true;
      umamiScript.src = 'https://cloud.umami.is/script.js';
      umamiScript.setAttribute('data-website-id', '364b0838-3aa5-4e05-b188-973f850487c5');
      document.head.appendChild(umamiScript);

      // Load Google Analytics
      const gtagScript = document.createElement('script');
      gtagScript.async = true;
      gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-LG9ST0FWMZ';
      document.head.appendChild(gtagScript);

      const gtagConfig = document.createElement('script');
      gtagConfig.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-LG9ST0FWMZ');
      `;
      document.head.appendChild(gtagConfig);
    }
  }, []);

  return null;
}
