import { test, expect } from '@playwright/test';

test('日次入力の基本フロー', async ({ page }) => {
  await page.goto('/');

  await page.fill('#part1', '800');
  await page.fill('#part2', '700');

  // blur to trigger save
  await page.click('body');

  await expect(page.locator('#daily-total')).toHaveText('1500');

  await page.reload();

  await expect(page.locator('#part1')).toHaveValue('800');
  await expect(page.locator('#part2')).toHaveValue('700');
});

test('週進捗セクションが表示される', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('.week-progress-section')).toBeVisible();
  await expect(page.locator('#week-range')).not.toBeEmpty();
});

test('週目標ページの基本表示', async ({ page }) => {
  await page.goto('/week-target.html');

  await expect(page.locator('#week-number')).not.toBeEmpty();
  await expect(page.locator('#target-input')).toBeVisible();
  await expect(page.locator('#schedule-body')).toBeVisible();
});
