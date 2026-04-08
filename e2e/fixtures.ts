import { test as base, Page } from "@playwright/test"

async function login(page: Page, email: string, password: string) {
  await page.goto("/auth/login")
  await page.fill('input[name="email"]', email)
  await page.fill('input[name="password"]', password)
  await page.click('button[type="submit"]')
  await page.waitForURL("/")
}

export const test = base.extend<{ authenticatedPage: Page }>({
  authenticatedPage: async ({ page }, use) => {
    await login(page, "admin@sample-kensetsu.co.jp", "password123")
    await use(page)
  },
})

export { expect } from "@playwright/test"
