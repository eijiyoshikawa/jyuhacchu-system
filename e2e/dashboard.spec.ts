import { test, expect } from "./fixtures"

test.describe("ダッシュボード", () => {
  test("ダッシュボードにサマリーカードが表示される", async ({
    authenticatedPage: page,
  }) => {
    // サマリーカードが4つ表示される
    await expect(page.getByText("発注件数")).toBeVisible()
    await expect(page.getByText("請求件数")).toBeVisible()
    await expect(page.getByText("承認待ち件数")).toBeVisible()
    await expect(page.getByText("今月の発注金額")).toBeVisible()
  })

  test("最近の発注テーブルが表示される", async ({
    authenticatedPage: page,
  }) => {
    // 最近の発注セクションが表示される
    await expect(page.getByText("最近の発注")).toBeVisible()

    // テーブルヘッダーが表示される
    await expect(page.getByRole("columnheader", { name: "発注番号" }).first()).toBeVisible()
    await expect(page.getByRole("columnheader", { name: "案件名" }).first()).toBeVisible()
    await expect(page.getByRole("columnheader", { name: "金額" }).first()).toBeVisible()
    await expect(page.getByRole("columnheader", { name: "ステータス" }).first()).toBeVisible()
  })

  test("ナビゲーションリンクが正しく動作する", async ({
    authenticatedPage: page,
  }) => {
    // サイドバーのナビゲーションリンクをテスト
    await page.getByRole("link", { name: "発注管理" }).click()
    await expect(page).toHaveURL(/\/orders/)
    await expect(page.getByText("発注管理")).toBeVisible()

    await page.getByRole("link", { name: "取引先管理" }).click()
    await expect(page).toHaveURL(/\/partners/)
    await expect(page.getByText("取引先管理")).toBeVisible()

    await page.getByRole("link", { name: "案件管理" }).click()
    await expect(page).toHaveURL(/\/projects/)
    await expect(page.getByText("案件管理")).toBeVisible()

    // ダッシュボードに戻る
    await page.getByRole("link", { name: "ダッシュボード" }).click()
    await expect(page).toHaveURL("/")
  })
})
