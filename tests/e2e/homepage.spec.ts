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
    await expect(page.locator('h1')).toContainText(/Превратите своё дело/);
  });

  test('should navigate to services section', async ({ page }) => {
    await page.click('a[href="#services"]');
    await expect(page.locator('#services')).toBeInViewport();
  });

  test('should display all three service cards', async ({ page }) => {
    const serviceCards = page.locator('#services .rounded-2xl');
    await expect(serviceCards).toHaveCount(3);
  });

  test('should have working CTA buttons', async ({ page }) => {
    const ctaButton = page.locator('a:has-text("Связаться в Telegram")').first();
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

  test('should have language consistent (Russian)', async ({ page }) => {
    const content = await page.textContent('body');
    expect(content).toContain('Коучинговые предложения');
    expect(content).toContain('Записаться');
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
      await expect(img).toHaveJSProperty('complete', true);
    }
  });
});

test.describe('Mobile Responsiveness', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('should be mobile responsive', async ({ page }) => {
    await page.goto('/');
    
    const hero = page.locator('section').first();
    await expect(hero).toBeVisible();
    
    const serviceCards = page.locator('#services .rounded-2xl');
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
