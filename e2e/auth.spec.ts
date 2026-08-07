import { test, expect } from "@playwright/test"

test.describe("認証", () => {
  test("ログインページが表示される", async ({ page }) => {
    await page.goto("/auth/login")

    // ページタイトルとフォーム要素が表示される
    await expect(page.getByText("受発注Lシステム")).toBeVisible()
    await expect(page.getByText("インボイス対応クラウド受発注プラットフォーム")).toBeVisible()
    await expect(page.getByLabel("メールアドレス")).toBeVisible()
    await expect(page.getByLabel("パスワード")).toBeVisible()
    await expect(page.getByRole("button", { name: "ログイン" })).toBeVisible()
  })

  test("正しい認証情報でログインできる", async ({ page }) => {
    await page.goto("/auth/login")

    await page.fill('input[name="email"]', "admin@sample-trading.co.jp")
    await page.fill('input[name="password"]', "password123")
    await page.click('button[type="submit"]')

    // ダッシュボードにリダイレクトされる
    await page.waitForURL("/")
    await expect(page.getByRole("heading", { name: "ダッシュボード" })).toBeVisible()
  })

  test("間違ったパスワードでエラーが表示される", async ({ page }) => {
    await page.goto("/auth/login")

    await page.fill('input[name="email"]', "admin@sample-trading.co.jp")
    await page.fill('input[name="password"]', "wrongpassword")
    await page.click('button[type="submit"]')

    // エラーメッセージが表示される
    await expect(
      page.getByText("メールアドレスまたはパスワードが正しくありません")
    ).toBeVisible()

    // ログインページのままである
    await expect(page).toHaveURL(/\/auth\/login/)
  })

  test("未認証ユーザーはログインページにリダイレクトされる", async ({ page }) => {
    // ダッシュボードに直接アクセスを試みる
    await page.goto("/")

    // ログインページにリダイレクトされる
    await expect(page).toHaveURL(/\/auth\/login/)
  })
})
