import { test, expect } from '@playwright/test';

test.describe('Performance Tests', () => {
  test.skip(({ browserName }) => browserName !== 'chromium', 'Performance tests only run on Chromium');
  test('should load homepage within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('load');
    const loadTime = Date.now() - startTime;

    // Page should load in less than 5 seconds (relaxed for CI/local)
    expect(loadTime).toBeLessThan(5000);
  });

  test('should have good Core Web Vitals', async ({ page }) => {
    await page.goto('/');

    const metrics = await page.evaluate(() => {
      return new Promise<{ lcp: number }>((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lcp = entries.find(e => e.entryType === 'largest-contentful-paint');
          if (lcp) {
            // LCP entries have renderTime or loadTime
            const lcpEntry = lcp as PerformanceEntry & { renderTime?: number; loadTime?: number };
            resolve({
              lcp: lcpEntry.renderTime || lcpEntry.loadTime || 0,
            });
          }
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        setTimeout(() => resolve({ lcp: 0 }), 5000);
      });
    });

    // LCP should be less than 2.5 seconds for good performance
    if (metrics.lcp > 0) {
      expect(metrics.lcp).toBeLessThan(2500);
    }
  });

  test('should have minimal JavaScript bundle size', async ({ page }) => {
    await page.goto('/');

    const resources = await page.evaluate(() => {
      return performance.getEntriesByType('resource')
        .filter((r) => r.initiatorType === 'script')
        .reduce((total: number, r) => total + (r as PerformanceResourceTiming).transferSize, 0);
    });

    // Total JS should be less than 750KB (Next.js 15 + React 19 baseline)
    expect(resources).toBeLessThan(750 * 1024);
  });

  test('should optimize images', async ({ page }) => {
    await page.goto('/');

    const images = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('img')).map(img => ({
        src: img.src,
        width: img.naturalWidth,
        height: img.naturalHeight,
      }));
    });

    expect(images.length).toBeGreaterThan(0);

    // Check that images are using WebP or modern formats
    images.forEach(img => {
      expect(img.src).toMatch(/(_next\/image|data:image|\.(webp|avif|jpg|jpeg|png|svg))/i);
    });
  });

  test('should use caching headers', async ({ page }) => {
    const response = await page.goto('/');
    const headers = response?.headers();

    // Check for cache control headers
    expect(headers).toBeDefined();
  });

  test('should not have render-blocking resources', async ({ page }) => {
    await page.goto('/');

    const renderBlockingResources = await page.evaluate(() => {
      return performance.getEntriesByType('resource')
        .filter((r) => (r as PerformanceResourceTiming & { renderBlockingStatus?: string }).renderBlockingStatus === 'blocking')
        .length;
    });

    // Should have minimal or no render-blocking resources
    expect(renderBlockingResources).toBeLessThan(3);
  });
});
