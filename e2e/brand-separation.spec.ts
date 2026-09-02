import { expect, test } from "@playwright/test"

/**
 * 受発注Lシステム と 電子取引くん が別製品として分離されていることの回帰テスト。
 *
 * ブランドはリクエストホストで解決される（src/lib/brand.ts）。
 * `*.localhost` は RFC 6761 によりブラウザが自動でループバックに解決するため、
 * hosts ファイルを書き換えずに 電子取引くん 側（dlsystem.*）を検証できる。
 *
 * この分離が壊れると、ITツール登録審査で「同一システムの二重登録」と
 * 判定されるおそれがあるため、必ず緑を維持すること。
 */

const DSYSTEM_ORIGIN = "http://dlsystem.localhost:3000"

const DSYSTEM_ONLY_PATHS = ["/partners/accounts", "/archive", "/partners/invite"]

async function login(page: import("@playwright/test").Page, origin: string, email: string) {
  await page.goto(`${origin}/auth/login`)
  await page.fill('input[name="email"]', email)
  await page.fill('input[name="password"]', "password123")
  await page.click('button[type="submit"]')
  await page.waitForURL(`${origin}/`)
}

test.describe("ブランド分離", () => {
  test("受発注Lシステムでは電子取引くん固有機能がメニューに出ない", async ({ page }) => {
    await login(page, "http://localhost:3000", "admin@sample-trading.co.jp")
    const nav = page.locator("aside")
    await expect(nav.getByRole("link", { name: "取引先管理", exact: true })).toBeVisible()
    await expect(nav.getByRole("link", { name: "取引先招待" })).toHaveCount(0)
    await expect(nav.getByRole("link", { name: "アカウント利用状況" })).toHaveCount(0)
    await expect(nav.getByRole("link", { name: "電子取引アーカイブ" })).toHaveCount(0)
  })

  for (const path of DSYSTEM_ONLY_PATHS) {
    test(`受発注Lシステムでは ${path} が404になる`, async ({ page }) => {
      await login(page, "http://localhost:3000", "admin@sample-trading.co.jp")
      await page.goto(`http://localhost:3000${path}`)
      await expect(page.getByText("ページが見つかりません")).toBeVisible()
    })
  }

  test("受発注Lシステムでは招待APIが404を返す", async ({ request }) => {
    const res = await request.get("http://localhost:3000/api/invitations/demo-pending-2b6e0a4c9d1f7e83")
    expect(res.status()).toBe(404)
  })

  test("電子取引くんでは固有機能が利用できる", async ({ page }) => {
    await login(page, DSYSTEM_ORIGIN, "admin@aoba-sangyo.example.jp")

    await page.goto(`${DSYSTEM_ORIGIN}/partners/accounts`)
    await expect(page.getByRole("heading", { name: "アカウント利用状況" })).toBeVisible()
    // 発行上限（無制限発行ではないこと）が画面上で確認できる
    await expect(page.getByText("上限に達すると新規の招待発行はできません")).toBeVisible()

    await page.goto(`${DSYSTEM_ORIGIN}/archive`)
    await expect(page.getByRole("heading", { name: "電子取引アーカイブ" })).toBeVisible()
    // 電子帳簿保存法の検索要件3項目
    await expect(page.getByText("電子帳簿保存法 検索要件 3項目")).toBeVisible()
  })

  test("アカウント利用状況には自社の取引先だけが表示される", async ({ page }) => {
    await login(page, DSYSTEM_ORIGIN, "admin@aoba-sangyo.example.jp")
    await page.goto(`${DSYSTEM_ORIGIN}/partners/accounts`)
    // 電子取引くんのデモ取引先
    await expect(page.getByRole("cell", { name: "ケヤキ工房株式会社" })).toBeVisible()
    // 受発注Lシステム側のデモ取引先が混ざらないこと
    await expect(page.getByRole("cell", { name: "田中サービス株式会社" })).toHaveCount(0)
  })

  test("両ブランドでツール名が混在しない", async ({ page }) => {
    await page.goto("http://localhost:3000/auth/login")
    await expect(page.locator("body")).toContainText("受発注")
    await expect(page.locator("body")).not.toContainText("電子取引くん")

    await page.goto(`${DSYSTEM_ORIGIN}/auth/login`)
    await expect(page.locator("body")).toContainText("電子取引くん")
    await expect(page.locator("body")).not.toContainText("受発注Lシステム")
  })
})
