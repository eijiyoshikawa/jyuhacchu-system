import type { Metadata } from "next"
import { DocumentShell } from "../_components/document-shell"
import { ScreenshotPlaceholder } from "../_components/screenshot-placeholder"

export const metadata: Metadata = {
  title: "機能説明資料｜受発注Lシステム｜IT導入補助金 申請書類",
  description:
    "デジタル化・AI導入補助金2026 インボイス枠（インボイス対応類型）の申請添付書類。受発注Lシステムの機能詳細。",
}

export default function FeatureDocumentPage() {
  return (
    <DocumentShell
      title="機能説明資料"
      subtitle="デジタル化・AI導入補助金2026 インボイス枠（インボイス対応類型）申請添付書類"
      pcode="主Pコード: 共P-02"
    >
      {/* Cover page — print-safe with black borders & bold text, independent of background color printing */}
      <section className="mb-8 page-break-after avoid-break">
        <div className="border-4 border-black p-6">
          <p className="text-center text-sm font-bold tracking-[0.4em] mb-2">
            IT導入補助金 2026 申請添付書類
          </p>
          <h2 className="text-center text-3xl sm:text-4xl font-black tracking-widest border-y-4 border-black py-4 my-4">
            機 能 説 明 資 料
          </h2>

          <table className="w-full border-collapse text-sm mt-6">
            <tbody>
              <tr>
                <th className="border-2 border-black bg-black text-white px-4 py-3 text-left w-56 text-sm font-bold">
                  ITツール正式名称
                </th>
                <td className="border-2 border-black px-4 py-3 text-2xl font-black">
                  受発注Lシステム
                </td>
              </tr>
              <tr>
                <th className="border-2 border-black bg-black text-white px-4 py-3 text-left text-sm font-bold">
                  開発メーカー名
                </th>
                <td className="border-2 border-black px-4 py-3 text-2xl font-black">
                  株式会社LET
                </td>
              </tr>
              <tr>
                <th className="border-2 border-black bg-black text-white px-4 py-3 text-left text-sm font-bold">
                  IT導入支援事業者名
                </th>
                <td className="border-2 border-black px-4 py-3 text-lg font-bold">
                  株式会社TX.企画
                </td>
              </tr>
              <tr>
                <th className="border-2 border-black bg-black text-white px-4 py-3 text-left text-sm font-bold">
                  主Pコード
                </th>
                <td className="border-2 border-black px-4 py-3 text-base">
                  共P-02（決済・債権債務・資金回収）
                </td>
              </tr>
              <tr>
                <th className="border-2 border-black bg-black text-white px-4 py-3 text-left text-sm font-bold">
                  副Pコード
                </th>
                <td className="border-2 border-black px-4 py-3 text-base">
                  共P-03（供給・在庫・物流）
                </td>
              </tr>
              <tr>
                <th className="border-2 border-black bg-black text-white px-4 py-3 text-left text-sm font-bold">
                  申請枠・類型
                </th>
                <td className="border-2 border-black px-4 py-3 text-base">
                  インボイス枠（インボイス対応類型）
                </td>
              </tr>
              <tr>
                <th className="border-2 border-black bg-black text-white px-4 py-3 text-left text-sm font-bold">
                  版
                </th>
                <td className="border-2 border-black px-4 py-3 text-base">2026年4月 初版</td>
              </tr>
            </tbody>
          </table>

          <div className="mt-8 border-t-2 border-black pt-4">
            <p className="text-xs leading-relaxed">
              本資料は、デジタル化・AI導入補助金2026 インボイス枠（インボイス対応類型）の
              ITツール登録申請における「機能説明資料」として、IT導入支援事業者
              株式会社TX.企画 が、開発メーカー 株式会社LET が提供するITツール
              「受発注Lシステム」の機能内容、業務フロー、利用方法、および
              補助金要件への適合状況を説明するために作成されたものです。
            </p>
          </div>
        </div>
      </section>

      {/* Table of Contents — explicit pointer to required sections (added in response to 3rd review) */}
      <section className="mb-8 page-break-before page-break-after avoid-break">
        <div className="border-4 border-black p-6">
          <h2 className="text-center text-2xl font-black tracking-widest border-y-4 border-black py-3 mb-4">
            目　次
          </h2>

          <p className="text-xs text-slate-600 mb-3">
            ※ 本資料の確認において特に重要な項目は ★ 印で示しています。
          </p>

          <table className="w-full border-collapse text-sm">
            <tbody>
              {[
                { no: "1", label: "製品概要（ITツール正式名称・開発メーカー名・IT導入支援事業者名）", page: "P.3" },
                { no: "2", label: "解決する業務課題と導入効果", page: "P.4" },
                { no: "3", label: "機能詳細（発注／取引先／請求／インボイス／電帳法／承認／監査）", page: "P.5" },
                { no: "★4", label: "業務フロー図（［図1］受発注Lシステム 業務フロー図）", page: "P.7" },
                { no: "★5", label: "ITツールの利用方法（5-1 〜 5-5）", page: "P.8" },
                { no: "6", label: "技術仕様", page: "P.10" },
                { no: "7", label: "導入プロセス", page: "P.11" },
                { no: "8", label: "サポート体制", page: "P.11" },
                { no: "9", label: "お問い合わせ", page: "P.12" },
              ].map((row) => (
                <tr key={row.no}>
                  <td
                    className={
                      "border-2 border-black px-3 py-2 text-center font-bold w-16 " +
                      (row.no.startsWith("★") ? "bg-black text-white text-base" : "")
                    }
                  >
                    §{row.no}
                  </td>
                  <td
                    className={
                      "border-2 border-black px-3 py-2 " +
                      (row.no.startsWith("★") ? "bg-yellow-100 font-bold text-base" : "")
                    }
                  >
                    {row.label}
                  </td>
                  <td className="border-2 border-black px-3 py-2 text-center w-20 font-mono">
                    {row.page}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 border-2 border-black p-3 text-xs leading-relaxed">
            <p className="font-bold mb-1">本資料の対象ITツール（再掲）</p>
            <ul className="list-none pl-0 space-y-0.5">
              <li>　ITツール正式名称：<span className="font-black text-base">受発注Lシステム</span></li>
              <li>　開発メーカー名：<span className="font-black text-base">株式会社LET</span></li>
              <li>　IT導入支援事業者名：<span className="font-bold">株式会社TX.企画</span></li>
            </ul>
          </div>

          <p className="mt-3 text-xs text-slate-600">
            ※ ページ番号は印刷時の目安です（A4・余白標準・背景グラフィック有効）。
          </p>
        </div>
      </section>

      {/* 受発注機能 明示セクション — 4回目の不備対応（共P-02 受発注機能を有すること） */}
      <section className="mb-8 page-break-before avoid-break">
        <div className="border-4 border-black p-6">
          <p className="text-center text-sm font-bold tracking-[0.4em] mb-2">
            ITツール登録要領 2-3 (1) 4. の対応説明
          </p>
          <h2 className="text-center text-2xl font-black tracking-widest border-y-4 border-black py-3 mb-4">
            本ITツールは「受発注機能」を有します
          </h2>

          <p className="text-sm leading-relaxed mb-4">
            ITツール登録要領「2-3 各カテゴリーの内容（1）カテゴリー1 ソフトウェア
            4. 『会計』『受発注』『決済』の3つの機能のいずれかを有するソフトウェアに関する留意事項」
            に基づき、本ITツール「受発注Lシステム」が
            <strong className="bg-yellow-200">『受発注』機能</strong>
            を有していることを以下の表で明示します。
          </p>

          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="border-2 border-black bg-black text-white px-3 py-2 text-left text-sm font-bold w-44">
                  カテゴリ機能
                </th>
                <th className="border-2 border-black bg-black text-white px-3 py-2 text-center text-sm font-bold w-24">
                  本ツールでの<br />該当有無
                </th>
                <th className="border-2 border-black bg-black text-white px-3 py-2 text-left text-sm font-bold">
                  本ツールでの実装内容
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-2 border-black px-3 py-2 font-bold">
                  会計機能
                </td>
                <td className="border-2 border-black px-3 py-2 text-center text-2xl font-black">
                  ×
                </td>
                <td className="border-2 border-black px-3 py-2 text-xs">
                  仕訳・元帳・試算表・財務三表等の会計機能は提供しません。
                </td>
              </tr>
              <tr className="bg-yellow-100">
                <td className="border-2 border-black px-3 py-2 font-black text-base">
                  受発注機能<br />（本ツールが該当）
                </td>
                <td className="border-2 border-black px-3 py-2 text-center text-3xl font-black">
                  ◎
                </td>
                <td className="border-2 border-black px-3 py-2 text-xs leading-relaxed">
                  <strong>買い手側（発注）機能</strong>:
                  発注書作成（PO-YYYYMMDD-XXXX 自動採番）、明細・税率・消費税の自動計算、
                  仕入管理、買掛・支払管理（ステータス: 発注済→請負済→納品完了→検収完了→支払済）。
                  <br />
                  <strong>売り手側（受注）機能</strong>:
                  発注書からの請求書自動生成（INV-YYYYMMDD-XXXX 採番）、
                  売上請求管理、売掛・回収管理（ステータス: 提出→承認→支払）、
                  適格請求書等保存方式準拠のPDF／CSV出力。
                  <br />
                  <strong>取引先・契約条件管理</strong>:
                  取引先マスタ（適格請求書発行事業者登録番号の国税庁Web-API自動検証、
                  納入条件・支払サイト等）、案件管理（案件名・納入先・履行期間）。
                  <br />
                  <strong>承認・統制機能</strong>:
                  多段階承認ワークフロー、監査ログ、SHA-256ハッシュ＋タイムスタンプ
                  による改ざん防止（電子帳簿保存法 電子取引要件準拠）。
                </td>
              </tr>
              <tr>
                <td className="border-2 border-black px-3 py-2 font-bold">
                  決済機能
                </td>
                <td className="border-2 border-black px-3 py-2 text-center text-2xl font-black">
                  ×
                </td>
                <td className="border-2 border-black px-3 py-2 text-xs">
                  POSレジ等の決済機能や、商品売買に伴う金銭のやり取りで債権債務を解消する機能は提供しません。
                </td>
              </tr>
            </tbody>
          </table>

          <div className="mt-4 border-2 border-black p-3 text-xs leading-relaxed">
            <p className="font-bold mb-1">対応する機能セクションへのページ参照</p>
            <ul className="list-disc pl-5 space-y-0.5">
              <li>
                <strong>買い手側 受発注機能の詳細</strong> →
                §3-1 発注管理機能（P.5）／ §3-2 取引先管理機能（P.6）
              </li>
              <li>
                <strong>売り手側 受発注機能（請求）の詳細</strong> →
                §3-3 請求管理機能（P.7）／ §3-4 インボイス制度対応（P.7）
              </li>
              <li>
                <strong>業務フロー全体（買い手側／売り手側 並列）</strong> →
                §4 業務フロー図［図1］（P.9）
              </li>
              <li>
                <strong>受発注業務の利用方法（ロール別）</strong> →
                §5 ITツールの利用方法（5-2 発注担当／5-4 受注担当）（P.10）
              </li>
            </ul>
          </div>

          <p className="mt-3 text-xs text-slate-600">
            ※ 本セクションは ITツール登録要領「2-3 各カテゴリーの内容（1）4.」の留意事項に対応するために設けたものです。
          </p>
        </div>
      </section>

      {/* 1. Product Overview */}
      <section className="mb-8 avoid-break">
        <h2 className="mb-3 border-l-4 border-black pl-3 text-lg font-bold">
          1. 製品概要
        </h2>
        <table className="w-full border-collapse text-sm">
          <tbody>
            {[
              ["ITツール正式名称", "受発注Lシステム"],
              ["開発メーカー名", "株式会社LET"],
              ["IT導入支援事業者名", "株式会社TX.企画"],
              ["提供形態", "クラウド型SaaS（マルチテナント／ブラウザ利用）"],
              ["対応ブラウザ", "Chrome / Edge / Safari / Firefox 最新版"],
              ["対応端末", "PC・タブレット・スマートフォン（レスポンシブ対応）"],
              ["対象事業者", "中小企業・小規模事業者（業種不問／B2B取引事業者）"],
              [
                "主要機能",
                "発注管理／取引先管理（インボイス番号検証）／請求管理／承認ワークフロー／監査ログ",
              ],
              [
                "法令対応",
                "適格請求書等保存方式（インボイス制度）／電子帳簿保存法（電子取引要件）／下請法・請負契約一般の必要記載事項",
              ],
              ["主Pコード", "共P-02（決済・債権債務・資金回収）"],
              [
                "副Pコード",
                "共P-03（供給・在庫・物流）",
              ],
            ].map(([k, v]) => (
              <tr key={k} className="border-b-2 border-black">
                <th className="w-40 border-2 border-black bg-slate-100 px-3 py-2 text-left text-xs font-bold text-slate-900">
                  {k}
                </th>
                <td className="border-2 border-black px-3 py-2 font-medium">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* 2. Problem & Benefit */}
      <section className="mb-8 avoid-break">
        <h2 className="mb-3 border-l-4 border-orange-500 pl-3 text-lg font-bold">
          2. 解決する業務課題と導入効果
        </h2>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2 text-left text-xs font-bold">
                導入前の課題
              </th>
              <th className="border border-slate-300 px-3 py-2 text-left text-xs font-bold">
                本ツールによる解決／効果
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              [
                "発注書をExcel・Wordで個別作成しフォーマットが統一されていない",
                "テンプレート化された発注書で全社共通フォーマットを強制。起票時間を約70%削減",
              ],
              [
                "承認の押印フローで業務が数日止まる",
                "電子承認ワークフローで承認スピードを大幅短縮。スマホからも承認可能",
              ],
              [
                "取引先が適格請求書発行事業者かどうか都度確認",
                "国税庁Web-API連携で登録番号を自動検証。登録事業者名を自動取得",
              ],
              [
                "免税事業者対応の税額計算が煩雑",
                "経過措置（80%→50%→0%）を日付基準で自動適用し、控除可能／不可な税額を表示",
              ],
              [
                "電子帳簿保存法 電子取引要件が未対応",
                "確定時にSHA-256ハッシュ＋タイムスタンプを自動付与、検索3項目を標準搭載",
              ],
              [
                "監査・内部統制の証跡が残らない",
                "全操作を監査ログに自動記録、ADMINから絞り込み閲覧可能",
              ],
            ].map(([before, after]) => (
              <tr key={before}>
                <td className="border border-slate-300 px-3 py-2 align-top">{before}</td>
                <td className="border border-slate-300 px-3 py-2 align-top">{after}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <ScreenshotPlaceholder
        figure="Fig.1"
        caption="ダッシュボード（サマリカード・最近の発注／請求）"
        sourceUrl="https://juhacchu-l.jp/ （ログイン後トップ）"
        src="/images/subsidy/dashboard.png"
      />

      {/* 3. Feature Detail: Purchase Order */}
      <section className="page-break-before mb-8">
        <h2 className="mb-3 border-l-4 border-orange-500 pl-3 text-lg font-bold">
          3. 機能詳細
        </h2>

        <h3 className="mt-5 mb-2 text-base font-bold text-slate-900">
          3-1. 発注管理機能（補助対象の中核機能）
        </h3>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2 text-left text-xs font-bold w-48">
                機能
              </th>
              <th className="border border-slate-300 px-3 py-2 text-left text-xs font-bold">
                詳細
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              [
                "発注書作成",
                "明細行追加／品名・仕様・数量・単位・単価・金額を入力。税抜→税込を自動計算。品目プリセット・発注書テンプレートに対応",
              ],
              [
                "発注番号自動採番",
                "PO-YYYYMMDD-XXXX 形式で連番採番し重複を防止",
              ],
              [
                "承認ワークフロー",
                "多段階承認（申請→1次承認→2次承認→…→発注済）。却下コメント必須、差戻し可能",
              ],
              [
                "ステータス遷移",
                "下書き／申請中／承認済／発注済／請負済／納品完了／検収完了／却下／取消 の9状態管理",
              ],
              [
                "確定（電帳法対応）",
                "検収完了時点で SHA-256 ハッシュと確定日時を自動記録し、以後は編集不可",
              ],
              [
                "発注書印刷／PDF出力",
                "A4最適化の印刷レイアウト。適格請求書対応の登録番号表記、取引契約必要記載事項欄を完備",
              ],
              [
                "取引契約 必要記載事項チェック",
                "案件名称・納入先・履行期間・取引金額・支払条件・契約日の欠落を自動検出し準拠バッジ表示",
              ],
            ].map(([k, v]) => (
              <tr key={k}>
                <td className="border border-slate-300 bg-slate-50 px-3 py-2 align-top text-xs font-bold">
                  {k}
                </td>
                <td className="border border-slate-300 px-3 py-2 align-top">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <ScreenshotPlaceholder
        figure="Fig.2"
        caption="発注管理 一覧画面"
        sourceUrl="https://juhacchu-l.jp/orders"
        src="/images/subsidy/orders-list.png"
      />
      <ScreenshotPlaceholder
        figure="Fig.3"
        caption="発注書 新規作成画面（明細入力・税率自動計算・免税事業者警告表示）"
        sourceUrl="https://juhacchu-l.jp/orders/new"
        src="/images/subsidy/orders-new.png"
      />
      <ScreenshotPlaceholder
        figure="Fig.4"
        caption="発注書 詳細画面（承認フロー・ステータスタイムライン表示）"
        sourceUrl="https://juhacchu-l.jp/orders/[id]"
        src="/images/subsidy/orders-detail.png"
      />
      <ScreenshotPlaceholder
        figure="Fig.5"
        caption="発注書 印刷プレビュー（適格請求書要件対応レイアウト）"
        sourceUrl="https://juhacchu-l.jp/orders/[id]/print"
        src="/images/subsidy/orders-print.png"
      />

      {/* 3-2 Partners */}
      <section className="mb-8 avoid-break">
        <h3 className="mt-5 mb-2 text-base font-bold text-slate-900">
          3-2. 取引先管理機能（インボイス制度対応の要）
        </h3>
        <table className="w-full border-collapse text-sm">
          <tbody>
            {[
              [
                "取引先マスタ CRUD",
                "会社コード、会社種別（発注企業／受注企業）、住所、電話、メール、インボイス番号",
              ],
              [
                "インボイス番号フォーマット検証",
                "T＋13桁数字 / チェックデジットの整合性を入力時にリアルタイム検証",
              ],
              [
                "国税庁Web-API 連携",
                "公表サイトAPIで登録番号の有効性を照会し、登録事業者名を自動取得",
              ],
              [
                "免税事業者判定",
                "登録番号未設定＝免税事業者として扱い、発注書作成時に画面上で警告表示",
              ],
            ].map(([k, v]) => (
              <tr key={k} className="border-b border-slate-200">
                <th className="w-48 bg-slate-50 px-3 py-2 text-left text-xs font-bold align-top">
                  {k}
                </th>
                <td className="px-3 py-2">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <ScreenshotPlaceholder
        figure="Fig.6"
        caption="取引先管理 一覧画面（インボイス番号列を含む）"
        sourceUrl="https://juhacchu-l.jp/partners"
        src="/images/subsidy/partners-list.png"
      />
      <ScreenshotPlaceholder
        figure="Fig.7"
        caption="取引先 新規登録画面（適格請求書発行事業者登録番号 入力欄）"
        sourceUrl="https://juhacchu-l.jp/partners/new"
        src="/images/subsidy/partners-new.png"
      />

      {/* 3-3 Invoice */}
      <section className="mb-8 avoid-break">
        <h3 className="mt-5 mb-2 text-base font-bold text-slate-900">
          3-3. 請求管理機能
        </h3>
        <table className="w-full border-collapse text-sm">
          <tbody>
            {[
              ["請求書作成", "発注書から請求書を自動生成（明細を引き継ぎ、再入力不要）"],
              ["請求番号自動採番", "INV-YYYYMMDD-XXXX 形式"],
              [
                "適格請求書出力",
                "登録番号・税率別合計・消費税額を明記したA4印刷レイアウトに対応",
              ],
              ["CSV出力", "BOM付きUTF-8でExcel直読み込み可能"],
              ["ステータス管理", "下書き／提出済／承認済／却下／支払済 の5状態"],
              [
                "確定（電帳法対応）",
                "発注書と同様に SHA-256 ハッシュ＋タイムスタンプを自動記録",
              ],
            ].map(([k, v]) => (
              <tr key={k} className="border-b border-slate-200">
                <th className="w-48 bg-slate-50 px-3 py-2 text-left text-xs font-bold align-top">
                  {k}
                </th>
                <td className="px-3 py-2">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <ScreenshotPlaceholder
        figure="Fig.8"
        caption="請求書 一覧画面"
        sourceUrl="https://juhacchu-l.jp/invoices"
        src="/images/subsidy/invoices-list.png"
      />
      <ScreenshotPlaceholder
        figure="Fig.9"
        caption="請求書 新規作成画面（発注書からの自動引き継ぎに対応）"
        sourceUrl="https://juhacchu-l.jp/invoices/new"
        src="/images/subsidy/invoices-new.png"
      />

      {/* 3-4 Invoice compliance */}
      <section className="mb-8 avoid-break">
        <h3 className="mt-5 mb-2 text-base font-bold text-slate-900">
          3-4. インボイス制度対応（補助金必須要件）
        </h3>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2 text-left text-xs font-bold w-56">
                要件項目
              </th>
              <th className="border border-slate-300 px-3 py-2 text-left text-xs font-bold">
                対応内容
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              [
                "適格請求書発行事業者登録番号",
                "取引先／自社マスタに登録。国税庁Web-APIで自動検証",
              ],
              [
                "税率別合計表示",
                "標準税率10%／軽減税率8%の混在明細に対応、税率別合計を表示・出力",
              ],
              [
                "経過措置の自動適用",
                "2023/10〜:控除80%、2026/10〜:控除50%、2029/10〜:控除0%を発注日基準で自動適用",
              ],
              [
                "控除可能／不可税額の可視化",
                "発注書作成画面の TaxSummary コンポーネントで視覚的に表示",
              ],
              [
                "適格請求書レイアウト",
                "登録番号・税率別対価・税額・発行者名等の必須項目を充足",
              ],
            ].map(([k, v]) => (
              <tr key={k}>
                <td className="border border-slate-300 bg-slate-50 px-3 py-2 align-top text-xs font-bold">
                  {k}
                </td>
                <td className="border border-slate-300 px-3 py-2 align-top">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* 3-5 e-book */}
      <section className="mb-8 avoid-break">
        <h3 className="mt-5 mb-2 text-base font-bold text-slate-900">
          3-5. 電子帳簿保存法対応
        </h3>
        <table className="w-full border-collapse text-sm">
          <tbody>
            {[
              [
                "電子取引要件",
                "発注書・請求書データをクラウドに原本保存、2024年1月の電子取引保存義務化に対応",
              ],
              [
                "改ざん防止措置",
                "確定時に SHA-256 ハッシュ＋確定タイムスタンプを自動付与",
              ],
              [
                "検索要件3項目",
                "取引年月日・取引金額・取引先名による絞り込みを標準画面で提供",
              ],
              [
                "スキャナ保存要件",
                "解像度・タイムスタンプ要件を満たす文書保管（今後のアップデートで拡張）",
              ],
              [
                "データ保全",
                "日次自動バックアップ、障害時は最大24時間前まで復旧可能",
              ],
            ].map(([k, v]) => (
              <tr key={k} className="border-b border-slate-200">
                <th className="w-48 bg-slate-50 px-3 py-2 text-left text-xs font-bold align-top">
                  {k}
                </th>
                <td className="px-3 py-2">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* 3-6 Workflow & 3-7 Audit */}
      <section className="mb-8 avoid-break">
        <h3 className="mt-5 mb-2 text-base font-bold text-slate-900">
          3-6. 承認ワークフロー・権限管理
        </h3>
        <ul className="list-disc pl-6 text-sm leading-relaxed space-y-1">
          <li>多段階承認（ApprovalFlow テーブルで柔軟な承認経路を設定）</li>
          <li>却下時のコメント必須入力、再申請時の修正材料として保持</li>
          <li>
            ロールベース権限（管理者／発注担当／受注担当）によるアクセス制御
          </li>
          <li>
            会社ID（companyId）によるマルチテナント自動スコープ、ADMINのみ横断参照可
          </li>
        </ul>
      </section>

      <section className="mb-8 avoid-break">
        <h3 className="mt-5 mb-2 text-base font-bold text-slate-900">
          3-7. 監査ログ・内部統制
        </h3>
        <ul className="list-disc pl-6 text-sm leading-relaxed space-y-1">
          <li>作成・更新・削除・承認・却下の全操作を AuditLog に記録</li>
          <li>操作日時・ユーザー名・IPアドレス・操作内容を保持</li>
          <li>管理者画面から日時・対象種別・操作者で絞り込み閲覧可能</li>
        </ul>
      </section>

      <ScreenshotPlaceholder
        figure="Fig.10"
        caption="ユーザー管理 一覧画面（ロールベース権限管理）"
        sourceUrl="https://juhacchu-l.jp/admin/users"
        src="/images/subsidy/users.png"
      />
      <ScreenshotPlaceholder
        figure="Fig.11"
        caption="監査ログ 一覧画面（ADMIN）"
        sourceUrl="https://juhacchu-l.jp/admin/audit-logs"
        src="/images/subsidy/audit-logs.png"
      />

      {/* §4 章扉ページ — マシン的にも視認しやすく強化 (3rd review対応) */}
      <section className="mb-6 page-break-before avoid-break">
        <div className="border-4 border-black p-8 text-center">
          <p className="text-sm font-bold mb-2">CHAPTER 4</p>
          <h2 className="text-3xl sm:text-4xl font-black tracking-widest border-y-4 border-black py-4 my-3">
            業 務 フ ロ ー 図
          </h2>
          <p className="text-sm mt-3">［図1］受発注Lシステム 業務フロー図</p>
          <p className="text-xs mt-2 text-slate-600">
            開発メーカー: 株式会社LET ／ ITツール: 受発注Lシステム
          </p>
        </div>
      </section>

      {/* 4. Business Flow Diagram — SVG-based flowchart (print-safe) */}
      <section className="mb-8">
        <h2 className="mb-3 bg-black text-white px-4 py-2 text-xl font-black">
          §4. 業務フロー図
        </h2>
        <p className="mb-4 text-sm leading-relaxed">
          受発注Lシステムを利用した、発注企業（買い手側）と受注企業（売り手側）の
          間の業務フローを以下の図に示します。発注起票から請求・支払完了までの全工程が、
          本システム上で一貫してデジタル化されます。
        </p>

        <figure className="my-6 border-2 border-black p-4 avoid-break">
          <figcaption className="mb-3 text-center text-sm font-bold">
            ［図1］受発注Lシステム 業務フロー図（発注から支払完了まで）
          </figcaption>

          <svg
            viewBox="0 0 900 740"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
            role="img"
            aria-label="業務フロー図 受発注Lシステム"
          >
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#000" />
              </marker>
            </defs>

            <rect x="10" y="10" width="430" height="34" fill="#000" />
            <text x="225" y="33" textAnchor="middle" fill="#fff" fontSize="15" fontWeight="bold">
              発注企業（買い手側）
            </text>
            <rect x="460" y="10" width="430" height="34" fill="#000" />
            <text x="675" y="33" textAnchor="middle" fill="#fff" fontSize="15" fontWeight="bold">
              受注企業（売り手側）
            </text>

            {[
              { y: 60, t1: "① 案件登録", t2: "案件名／納入先／履行期間" },
              { y: 130, t1: "② 取引先選択", t2: "国税庁APIで登録番号自動検証" },
              { y: 200, t1: "③ 発注書起票", t2: "明細・単価・税率／消費税自動計算" },
              { y: 270, t1: "④ 多段階承認", t2: "ワークフロー（スマホ承認可）" },
              { y: 340, t1: "⑤ 発注確定", t2: "SHA-256ハッシュ＋タイムスタンプ付与" },
              { y: 500, t1: "⑥ 納品検収", t2: "検収完了ステータスへ遷移" },
              { y: 570, t1: "⑦ 請求書受領", t2: "税率別合計を自動照合" },
              { y: 640, t1: "⑧ 支払処理", t2: "支払済ステータスへ更新" },
            ].map((s) => (
              <g key={`b-${s.y}`}>
                <rect x="20" y={s.y} width="410" height="54" fill="#fff" stroke="#000" strokeWidth="2" />
                <text x="225" y={s.y + 22} textAnchor="middle" fontSize="14" fontWeight="bold">{s.t1}</text>
                <text x="225" y={s.y + 42} textAnchor="middle" fontSize="11" fill="#333">{s.t2}</text>
              </g>
            ))}

            {[
              { y: 60, t1: "① 発注書受領通知", t2: "メール＋システム新着表示" },
              { y: 130, t1: "② 内容確認・受諾", t2: "受諾ステータスへ遷移" },
              { y: 200, t1: "③ 納品・作業実施", t2: "履行期間内で作業実施" },
              { y: 270, t1: "④ 納品報告登録", t2: "納品報告ステータス" },
              { y: 340, t1: "⑤ 検収結果確認", t2: "発注企業側の検収完了受信" },
              { y: 500, t1: "⑥ 請求書起票", t2: "発注書から明細を自動引継ぎ" },
              { y: 570, t1: "⑦ 適格請求書出力", t2: "PDF／CSVで送付" },
              { y: 640, t1: "⑧ 入金確認", t2: "支払済ステータスへ更新" },
            ].map((s) => (
              <g key={`s-${s.y}`}>
                <rect x="470" y={s.y} width="410" height="54" fill="#fff" stroke="#000" strokeWidth="2" />
                <text x="675" y={s.y + 22} textAnchor="middle" fontSize="14" fontWeight="bold">{s.t1}</text>
                <text x="675" y={s.y + 42} textAnchor="middle" fontSize="11" fill="#333">{s.t2}</text>
              </g>
            ))}

            {[114, 184, 254, 324, 554, 624].map((y) => (
              <line key={`bA-${y}`} x1="225" y1={y} x2="225" y2={y + 14} stroke="#000" strokeWidth="2" markerEnd="url(#arrow)" />
            ))}
            {[114, 184, 254, 324, 554, 624].map((y) => (
              <line key={`sA-${y}`} x1="675" y1={y} x2="675" y2={y + 14} stroke="#000" strokeWidth="2" markerEnd="url(#arrow)" />
            ))}

            <line x1="430" y1="87" x2="470" y2="87" stroke="#000" strokeWidth="2" markerEnd="url(#arrow)" />
            <text x="450" y="78" textAnchor="middle" fontSize="10" fill="#000">通知</text>

            <line x1="470" y1="367" x2="430" y2="527" stroke="#000" strokeWidth="2" strokeDasharray="4 2" markerEnd="url(#arrow)" />

            <line x1="470" y1="597" x2="430" y2="597" stroke="#000" strokeWidth="2" markerEnd="url(#arrow)" />
            <text x="450" y="588" textAnchor="middle" fontSize="10" fill="#000">請求書</text>

            <line x1="430" y1="667" x2="470" y2="667" stroke="#000" strokeWidth="2" markerEnd="url(#arrow)" />
            <text x="450" y="658" textAnchor="middle" fontSize="10" fill="#000">支払</text>

            <rect x="20" y="420" width="860" height="58" fill="#000" />
            <text x="450" y="443" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">
              【システム内ステータス（発注書）】
            </text>
            <text x="450" y="465" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="bold">
              下書き → 申請中 → 承認済 → 発注済 → 請負済 → 納品完了 → 検収完了
            </text>
          </svg>

          <p className="mt-3 text-[10px] text-slate-700 leading-relaxed">
            凡例: 実線矢印＝同一企業内のステップ遷移／実線矢印（企業間・横方向）＝
            システム通知・データ伝達／破線矢印＝ステータス情報の同期。
            発注書は各ステータス遷移時に監査ログを自動記録し、検収完了時に SHA-256
            ハッシュとタイムスタンプを付与して電子帳簿保存法の改ざん防止要件に準拠します。
          </p>
        </figure>

        <p className="mt-2 text-xs text-slate-500">
          ※ 図は標準的な運用フローを示した概念図です。実運用では、承認段数・承認者・
          ステータス分岐等を案件ごとに柔軟に設定できます。
        </p>
      </section>

      {/* §5 章扉ページ — マシン的にも視認しやすく強化 (3rd review対応) */}
      <section className="mb-6 page-break-before avoid-break">
        <div className="border-4 border-black p-8 text-center">
          <p className="text-sm font-bold mb-2">CHAPTER 5</p>
          <h2 className="text-3xl sm:text-4xl font-black tracking-widest border-y-4 border-black py-4 my-3">
            I T ツ ー ル の 利 用 方 法
          </h2>
          <p className="text-sm mt-3">5-1 利用開始 ／ 5-2 発注担当 ／ 5-3 承認者 ／ 5-4 受注担当 ／ 5-5 管理者</p>
          <p className="text-xs mt-2 text-slate-600">
            開発メーカー: 株式会社LET ／ ITツール: 受発注Lシステム
          </p>
        </div>
      </section>

      {/* 5. How to use the IT tool */}
      <section className="mb-8">
        <h2 className="mb-3 bg-black text-white px-4 py-2 text-xl font-black">
          §5. ITツールの利用方法
        </h2>
        <p className="mb-4 text-sm leading-relaxed">
          受発注Lシステムの日常的な利用手順を、ユーザーの典型的な操作フローに沿って説明します。
          Webブラウザがあれば PC・タブレット・スマートフォンのいずれからでも利用可能です。
        </p>

        <h3 className="mt-5 mb-2 text-base font-bold text-slate-900">
          5-1. 利用開始までの手順
        </h3>
        <ol className="list-decimal pl-6 text-sm leading-relaxed space-y-1">
          <li>
            IT導入支援事業者から発行された<strong>管理者アカウント（メール＋初期パスワード）</strong>
            を受領。
          </li>
          <li>
            WebブラウザからサービスURL（例: <code className="bg-slate-100 px-1 font-mono text-xs">https://juhacchu-l.jp</code>）にアクセスし、ログイン画面でメールアドレスとパスワードを入力。
          </li>
          <li>
            管理者画面から
            <strong>自社情報（会社名・住所・適格請求書発行事業者登録番号）</strong>を登録。
          </li>
          <li>
            ユーザー管理画面から、発注担当者・受注担当者・承認者の各アカウントを追加
            （ロールを指定：管理者／発注担当／受注担当）。
          </li>
          <li>
            取引先管理画面から、主要な取引先の会社情報とインボイス番号を登録
            （国税庁Web-APIにより登録番号の有効性を自動検証）。
          </li>
          <li>
            承認フロー設定画面で、発注書・請求書ごとの多段階承認フローを定義
            （承認段数と承認者を指定）。
          </li>
        </ol>

        <h3 className="mt-6 mb-2 text-base font-bold text-slate-900">
          5-2. 日常的な利用フロー（発注担当者）
        </h3>
        <ol className="list-decimal pl-6 text-sm leading-relaxed space-y-1">
          <li>
            ログイン → <strong>ダッシュボード</strong>で発注件数／請求件数／承認待ち件数／
            今月の発注金額を確認。
          </li>
          <li>
            サイドバーの「案件管理」→「新規作成」から案件を登録（案件名・納入先・履行期間）。
          </li>
          <li>
            「発注管理」→「新規作成」で発注書を起票（案件選択、取引先選択、明細入力）。
            消費税額と税率別合計は入力に応じて自動計算される。
          </li>
          <li>
            「申請」ボタンで承認ワークフローを起動。設定された承認者にメール通知が届く。
          </li>
          <li>
            すべての承認者が承認すると「承認済」→「発注済」ステータスに遷移し、
            取引先側にも発注通知が届く。
          </li>
        </ol>

        <h3 className="mt-6 mb-2 text-base font-bold text-slate-900">
          5-3. 日常的な利用フロー（承認者）
        </h3>
        <ol className="list-decimal pl-6 text-sm leading-relaxed space-y-1">
          <li>
            承認依頼メール受信、もしくはログイン後のダッシュボードで「承認待ち件数」を確認。
          </li>
          <li>
            「承認」画面から対象の発注書／請求書を選択し、内容を確認。
          </li>
          <li>
            <strong>承認</strong>または<strong>却下（コメント必須）</strong>を選択。
            スマートフォンからも同じ操作が可能。
          </li>
        </ol>

        <h3 className="mt-6 mb-2 text-base font-bold text-slate-900">
          5-4. 日常的な利用フロー（受注担当者）
        </h3>
        <ol className="list-decimal pl-6 text-sm leading-relaxed space-y-1">
          <li>ログイン → 新着の発注書通知を確認。</li>
          <li>
            発注内容を確認し、「受諾」を押下して受諾ステータスに遷移。
          </li>
          <li>納品・作業完了後、「納品報告」を登録。</li>
          <li>
            発注企業の検収完了を受けて、「請求管理」→「新規作成」から請求書を起票
            （発注書から明細が自動引き継がれる）。
          </li>
          <li>
            「印刷／PDF出力」で適格請求書フォーマットの帳票を出力し、
            必要に応じて取引先に送付。
          </li>
        </ol>

        <h3 className="mt-6 mb-2 text-base font-bold text-slate-900">
          5-5. 管理者の運用
        </h3>
        <ol className="list-decimal pl-6 text-sm leading-relaxed space-y-1">
          <li>
            <strong>ユーザー管理</strong>：新規ユーザー追加・権限変更・退職者の無効化。
          </li>
          <li>
            <strong>監査ログ</strong>：日時・ユーザー・操作・対象・IPアドレスで検索
            （内部監査・インシデント調査）。
          </li>
          <li>
            <strong>取引先マスタ</strong>：インボイス番号変更時の再検証、
            免税事業者の切り替え時期の管理。
          </li>
          <li>
            <strong>承認フロー設定</strong>：組織変更時の承認者更新、
            承認段数の追加／削減。
          </li>
        </ol>

        <div className="mt-6 rounded border border-slate-300 bg-slate-50 p-4 text-xs leading-relaxed">
          <p className="font-bold mb-1">サポート窓口の利用</p>
          <p>
            運用中の不明点は、平日9:00〜17:30のメール／チャットサポート窓口で対応します。
            詳細は本資料「§8 サポート体制」を参照してください。
          </p>
        </div>
      </section>

      {/* 6. Tech stack */}
      <section className="mb-8 avoid-break page-break-before">
        <h2 className="mb-3 border-l-4 border-orange-500 pl-3 text-lg font-bold">
          6. 技術仕様
        </h2>
        <table className="w-full border-collapse text-sm">
          <tbody>
            {[
              ["フロントエンド", "Next.js 16（App Router）／React 19／TypeScript 5／Tailwind CSS 4"],
              ["バックエンド", "Next.js Route Handlers（Node.js ランタイム）"],
              ["データベース", "PostgreSQL 16（東京リージョン）"],
              ["ORM", "Prisma 5"],
              ["認証", "NextAuth.js v5（JWT セッション、bcrypt によるパスワードハッシュ化）"],
              ["バリデーション", "Zod（全POST／PUTエンドポイントで検証）"],
              ["ホスティング", "Vercel（東京リージョン hnd1、自動SSL）"],
              ["監視", "Sentry（ランタイムエラー・パフォーマンス監視）"],
              ["CI/CD", "GitHub Actions（ESLint・型チェック・E2Eテスト）"],
              ["E2Eテスト", "Playwright（Chromium）"],
            ].map(([k, v]) => (
              <tr key={k} className="border-b border-slate-200">
                <th className="w-40 bg-slate-50 px-3 py-2 text-left text-xs font-bold">{k}</th>
                <td className="px-3 py-2">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* 7. Process flow */}
      <section className="mb-8 avoid-break">
        <h2 className="mb-3 border-l-4 border-orange-500 pl-3 text-lg font-bold">
          7. 導入プロセス
        </h2>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2 text-left text-xs font-bold w-16">
                #
              </th>
              <th className="border border-slate-300 px-3 py-2 text-left text-xs font-bold w-40">
                フェーズ
              </th>
              <th className="border border-slate-300 px-3 py-2 text-left text-xs font-bold">
                内容
              </th>
              <th className="border border-slate-300 px-3 py-2 text-left text-xs font-bold w-28">
                目安期間
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              ["1", "お申込み・契約", "利用規約同意、プラン選択、GビズID連携のご案内", "1〜2営業日"],
              ["2", "アカウント発行", "管理者アカウント＋サブドメイン発行", "即日〜1営業日"],
              [
                "3",
                "初期設定",
                "自社情報・承認フロー設定、取引先マスタ登録、ユーザー登録",
                "1〜5営業日",
              ],
              [
                "4",
                "データ移行（任意）",
                "過去の取引先／発注／請求データCSVインポート、代行移行サービス",
                "1〜3週間",
              ],
              ["5", "社内トレーニング", "運用マニュアル提供＋オンライン説明会", "1営業日"],
              ["6", "本番運用開始", "監視／サポート契約の発効", "—"],
            ].map(([n, phase, detail, period]) => (
              <tr key={n}>
                <td className="border border-slate-300 px-3 py-2 text-center">{n}</td>
                <td className="border border-slate-300 px-3 py-2 font-bold">{phase}</td>
                <td className="border border-slate-300 px-3 py-2">{detail}</td>
                <td className="border border-slate-300 px-3 py-2 text-xs">{period}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* 8. Support */}
      <section className="mb-8 avoid-break">
        <h2 className="mb-3 border-l-4 border-orange-500 pl-3 text-lg font-bold">
          8. サポート体制
        </h2>
        <table className="w-full border-collapse text-sm">
          <tbody>
            {[
              ["窓口", "メール（24時間受付／平日営業時間内対応）、チャット（標準プラン）"],
              ["対応時間", "平日 9:00〜17:30（土日祝・年末年始を除く）"],
              ["SLA目標", "稼働率 99.5%／障害発生時30分以内に状況通知"],
              ["バックアップ", "日次自動バックアップ、最大24時間前までリストア可"],
              ["セキュリティ対応", "脆弱性報告への24時間以内の初動"],
              ["契約期間", "月額（最低契約期間なし）／年額（10%割引）"],
            ].map(([k, v]) => (
              <tr key={k} className="border-b border-slate-200">
                <th className="w-40 bg-slate-50 px-3 py-2 text-left text-xs font-bold">{k}</th>
                <td className="px-3 py-2">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* 9. Contact */}
      <section className="mb-4 avoid-break">
        <h2 className="mb-3 border-l-4 border-orange-500 pl-3 text-lg font-bold">
          9. お問い合わせ
        </h2>
        <table className="w-full border-collapse text-sm">
          <tbody>
            {[
              ["導入相談・見積", "sales@juhacchu-l.jp"],
              ["IT導入補助金 相談", "subsidy@juhacchu-l.jp"],
              ["技術サポート", "support@juhacchu-l.jp"],
            ].map(([k, v]) => (
              <tr key={k} className="border-b border-slate-200">
                <th className="w-40 bg-slate-50 px-3 py-2 text-left text-xs font-bold">{k}</th>
                <td className="px-3 py-2 font-mono">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-2 text-xs text-slate-500">
          ※ 連絡先は仮置きです。正式公開時に確定した窓口に差し替えます。
        </p>
      </section>
    </DocumentShell>
  )
}
