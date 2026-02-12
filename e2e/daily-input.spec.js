import { test, expect } from '@playwright/test';

test('日次入力の基本フロー', async ({ page }) => {
  // Set up console logging to debug database operations
  page.on('console', (msg) => console.log('Browser:', msg.text()));

  await page.goto('/');

  await page.fill('#part1', '800');
  await page.fill('#part2', '700');

  // blur to trigger save
  await page.click('body');

  await expect(page.locator('#daily-total')).toHaveText('1500');

  await page.reload();
  // Wait for page to finish loading and initialize
  await page.waitForLoadState('networkidle');

  await expect(page.locator('#part1')).toHaveValue('800');
  await expect(page.locator('#part2')).toHaveValue('700');
});
