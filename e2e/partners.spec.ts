import { test, expect } from "./fixtures"

test.describe("協力会社管理", () => {
  test("協力会社一覧が表示される", async ({ authenticatedPage: page }) => {
    await page.goto("/partners")

    // ページヘッダーが表示される
    await expect(
      page.getByRole("heading", { name: "協力会社管理" })
    ).toBeVisible()
    await expect(page.getByText("取引先の会社情報を管理します")).toBeVisible()

    // 新規登録ボタンが表示される
    await expect(page.getByRole("link", { name: "新規登録" })).toBeVisible()

    // テーブルヘッダーが表示される
    await expect(
      page.getByRole("columnheader", { name: "会社コード" })
    ).toBeVisible()
    await expect(
      page.getByRole("columnheader", { name: "会社名" })
    ).toBeVisible()
    await expect(
      page.getByRole("columnheader", { name: "種別" })
    ).toBeVisible()
  })

  test("新規会社を登録できる", async ({ authenticatedPage: page }) => {
    await page.goto("/partners/new")

    // フォームが表示される
    await expect(
      page.getByRole("heading", { name: "会社新規登録" })
    ).toBeVisible()

    // フォームに入力
    const timestamp = Date.now()
    await page.fill('input[name="code"]', `E2E-${timestamp}`)
    await page.locator('select[name="companyType"]').selectOption("SUBCONTRACTOR")
    await page.fill('input[name="name"]', `E2Eテスト会社 ${timestamp}`)
    await page.fill('input[name="postalCode"]', "100-0001")
    await page.fill('input[name="phone"]', "03-1234-5678")
    await page.fill('input[name="address"]', "東京都千代田区1-1-1")
    await page.fill('input[name="email"]', `e2e-${timestamp}@test.co.jp`)
    await page.fill('input[name="registrationNumber"]', "T1234567890123")

    // フォームを送信
    await page.getByRole("button", { name: "登録" }).click()

    // 協力会社一覧ページにリダイレクトされる
    await page.waitForURL(/\/partners$/)
    await expect(
      page.getByRole("heading", { name: "協力会社管理" })
    ).toBeVisible()
  })
})
