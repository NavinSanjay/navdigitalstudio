import { test, expect } from '@playwright/test'
test('smoke: homepage loads and CTA present', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('Nav Digital Studio')).toBeVisible()
  await page.getByRole('link', { name: 'Book a discovery call' }).click()
  await expect(page.locator('#booking')).toBeVisible()
})
