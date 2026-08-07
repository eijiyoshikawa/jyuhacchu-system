import { test, expect } from "./fixtures"

test.describe("発注管理", () => {
  test("発注一覧ページが表示される", async ({ authenticatedPage: page }) => {
    await page.goto("/orders")

    // ページヘッダーが表示される
    await expect(
      page.getByRole("heading", { name: "発注管理" })
    ).toBeVisible()
    await expect(page.getByText("発注書の一覧を管理します")).toBeVisible()

    // 新規作成ボタンが表示される
    await expect(page.getByRole("link", { name: "新規作成" })).toBeVisible()

    // テーブルヘッダーが表示される
    await expect(
      page.getByRole("columnheader", { name: "発注番号" })
    ).toBeVisible()
    await expect(
      page.getByRole("columnheader", { name: "案件名" })
    ).toBeVisible()
    await expect(
      page.getByRole("columnheader", { name: "ステータス" })
    ).toBeVisible()
  })

  test("発注書を新規作成できる", async ({ authenticatedPage: page }) => {
    await page.goto("/orders/new")

    // フォームが表示される
    await expect(
      page.getByRole("heading", { name: "発注書新規作成" })
    ).toBeVisible()

    // 基本情報を入力
    // ドロップダウンの選択肢がロードされるのを待つ
    await page.waitForResponse((res) =>
      res.url().includes("/api/projects") && res.status() === 200
    )
    await page.waitForResponse((res) =>
      res.url().includes("/api/companies") && res.status() === 200
    )

    // 案件を選択
    const projectSelect = page.locator('select[name="projectId"]')
    await projectSelect.waitFor({ state: "visible" })
    const projectOptions = await projectSelect.locator("option").all()
    if (projectOptions.length > 1) {
      await projectSelect.selectOption({ index: 1 })
    }

    // 取引先を選択
    const receiverSelect = page.locator('select[name="receiverId"]')
    const receiverOptions = await receiverSelect.locator("option").all()
    if (receiverOptions.length > 1) {
      await receiverSelect.selectOption({ index: 1 })
    }

    // 件名を入力
    await page.fill('input[name="subject"]', "E2Eテスト発注")

    // 発注種別を選択
    await page.locator('select[name="orderType"]').selectOption("業務")

    // 明細を入力
    const itemNameInput = page
      .locator('input[placeholder="品名"]')
      .first()
    await itemNameInput.fill("テスト資材")

    const specInput = page
      .locator('input[placeholder="仕様"]')
      .first()
    await specInput.fill("A規格")

    const quantityInput = page
      .locator('table input[type="number"]')
      .first()
    await quantityInput.fill("10")

    const unitPriceInput = page
      .locator('table input[type="number"]')
      .nth(1)
    await unitPriceInput.fill("5000")

    // フォームを送信
    await page.getByRole("button", { name: "登録" }).click()

    // 発注一覧ページにリダイレクトされる
    await page.waitForURL(/\/orders$/)
    await expect(
      page.getByRole("heading", { name: "発注管理" })
    ).toBeVisible()
  })

  test("発注書の詳細が表示される", async ({ authenticatedPage: page }) => {
    await page.goto("/orders")

    // 一覧にデータがある場合、最初の発注書リンクをクリック
    const orderLink = page.locator("table a").first()
    const hasOrders = await orderLink.isVisible().catch(() => false)

    if (hasOrders) {
      await orderLink.click()
      await page.waitForURL(/\/orders\//)

      // 詳細ページの要素が表示される
      await expect(
        page.getByRole("heading", { name: "発注書詳細" })
      ).toBeVisible()
      await expect(page.getByText("発注情報")).toBeVisible()
      await expect(page.getByText("明細")).toBeVisible()
      await expect(page.getByText("一覧に戻る")).toBeVisible()
    }
  })

  test("検索フィルターが動作する", async ({ authenticatedPage: page }) => {
    await page.goto("/orders")

    // 検索ボックスが表示される（レスポンシブ実装で desktop/mobile 2 箇所に描画されるため .first()）
    const searchInput = page.getByPlaceholder("発注番号・件名で検索").first()
    await expect(searchInput).toBeVisible()

    // ステータスフィルターが表示される
    const statusFilter = page.locator("select").first()
    await expect(statusFilter).toBeVisible()

    // 検索を実行（存在しない値で検索してフィルタリングが動作することを確認）
    await searchInput.fill("NONEXISTENT_ORDER_12345")

    // デバウンス待ち
    await page.waitForTimeout(500)

    // URLにsearchパラメータが追加される
    await expect(page).toHaveURL(/search=NONEXISTENT_ORDER_12345/)

    // ステータスフィルターを変更
    await searchInput.clear()
    await page.waitForTimeout(500)

    await statusFilter.selectOption("DRAFT")
    await expect(page).toHaveURL(/status=DRAFT/)
  })
})
