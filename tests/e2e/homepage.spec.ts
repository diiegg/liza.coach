import { test, expect } from '@playwright/test';

test.describe('Homepage E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load homepage successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Liza Coaching/);
  });

  test('should have hero section visible', async ({ page }) => {
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('h1')).toContainText(/Clarity\. Confidence\. Consistent Action\./);
  });

  test('should navigate to services section', async ({ page, isMobile }) => {
    if (isMobile) {
      await page.getByLabel('Open menu').click();
      const mobileNav = page.getByLabel('Mobile navigation');
      await expect(mobileNav).toBeVisible();
      await mobileNav.locator('a[href="#services"]').click();
    } else {
      await page.click('a[href="#services"]');
    }
    await expect(page.locator('#services')).toBeInViewport();
  });

  test('should display all three service cards', async ({ page }) => {
    const serviceCards = page.locator('[data-testid="service-card"]');
    await expect(serviceCards).toHaveCount(3);
  });

  test('should have working CTA buttons', async ({ page }) => {
    const ctaButton = page.locator('a:has-text("Book a free call")').first();
    await expect(ctaButton).toBeVisible();
    await expect(ctaButton).toHaveAttribute('href', /calendly/);
  });

  test('should display video element', async ({ page }) => {
    const video = page.locator('video');
    await expect(video).toBeVisible();
    await expect(video).toHaveAttribute('autoplay');
  });

  test('should show testimonials section', async ({ page }) => {
    await page.locator('#services').scrollIntoViewIfNeeded();
    const testimonials = page.locator('.space-y-6').first();
    await expect(testimonials).toBeVisible();
  });

  test('should have consistent English content by default', async ({ page }) => {
    const content = await page.textContent('body');
    expect(content).toContain('Coaching offers');
    expect(content).toContain('Book a free call');
  });

  test('should have proper meta tags', async ({ page }) => {
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description).toContain('коуч');
  });

  test('should load images properly', async ({ page }) => {
    const images = page.locator('img');
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      // Scroll image into view to trigger lazy loading
      await img.scrollIntoViewIfNeeded();
      // Wait for image to be visible first
      await expect(img).toBeVisible();
      // Wait for the image to actually load by waiting for naturalWidth > 0
      await img.evaluate((el: HTMLImageElement) => {
        return new Promise<void>((resolve, reject) => {
          if (el.complete && el.naturalWidth > 0) {
            resolve();
          } else {
            el.onload = () => resolve();
            el.onerror = () => reject(new Error('Image failed to load'));
            // Timeout after 10 seconds
            setTimeout(() => reject(new Error('Image load timeout')), 10000);
          }
        });
      });
      // Verify the image loaded successfully
      const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
      expect(naturalWidth).toBeGreaterThan(0);
    }
  });
});

test.describe('Mobile Responsiveness', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('should be mobile responsive', async ({ page }) => {
    await page.goto('/');

    const hero = page.locator('section').first();
    await expect(hero).toBeVisible();

    const serviceCards = page.locator('[data-testid="service-card"]');
    await expect(serviceCards).toHaveCount(3);
  });
});

test.describe('Accessibility', () => {
  test('should have skip to content link', async ({ page }) => {
    await page.goto('/');

    const skipLink = page.locator('a:has-text("Skip to main content")');
    await expect(skipLink).toHaveCount(1);
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');

    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);

    const h2 = page.locator('h2');
    await expect(h2.first()).toBeVisible();
  });
});
