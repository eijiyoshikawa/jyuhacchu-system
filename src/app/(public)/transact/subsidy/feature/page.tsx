import type { Metadata } from "next"
import { DocumentShell } from "@/app/(public)/subsidy/_components/document-shell"
import { ScreenshotPlaceholder } from "@/app/(public)/subsidy/_components/screenshot-placeholder"

export const metadata: Metadata = {
  title: "機能説明資料｜電子取引Lシステム｜IT導入補助金 電子取引類型",
  description:
    "デジタル化・AI導入補助金2026 インボイス枠 電子取引類型 申請添付書類。電子取引Lシステムの機能詳細（招待型・両社間電子取引・電子帳簿保存法対応）。",
}

const TOOL_NAME = "電子取引Lシステム"
const MAKER_NAME = "株式会社LET"
const PROVIDER_NAME = "株式会社LET"
const SCHEME_LABEL = "デジタル化・AI導入補助金2026 インボイス枠（電子取引類型）"

export default function TransactFeaturePage() {
  return (
    <DocumentShell
      title="機能説明資料"
      subtitle={`${SCHEME_LABEL} 申請添付書類`}
      toolName={TOOL_NAME}
      makerName={MAKER_NAME}
      indexHref="/transact/subsidy"
      schemeLabel={SCHEME_LABEL}
      pcode="主Pコード: 共P-02（単独）"
    >
      {/* Cover page */}
      <section className="mb-8 page-break-after avoid-break">
        <div className="border-4 border-black p-6">
          <p className="text-center text-sm font-bold tracking-[0.4em] mb-2">
            IT導入補助金 2026 電子取引類型 申請添付書類
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
                  {TOOL_NAME}
                </td>
              </tr>
              <tr>
                <th className="border-2 border-black bg-black text-white px-4 py-3 text-left text-sm font-bold">
                  開発メーカー名
                </th>
                <td className="border-2 border-black px-4 py-3 text-2xl font-black">
                  {MAKER_NAME}
                </td>
              </tr>
              <tr>
                <th className="border-2 border-black bg-black text-white px-4 py-3 text-left text-sm font-bold">
                  IT導入支援事業者名
                </th>
                <td className="border-2 border-black px-4 py-3 text-lg font-bold">
                  {PROVIDER_NAME}
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
                  設定なし（共P-02 単独申請）
                </td>
              </tr>
              <tr>
                <th className="border-2 border-black bg-black text-white px-4 py-3 text-left text-sm font-bold">
                  申請枠・類型
                </th>
                <td className="border-2 border-black px-4 py-3 text-base">
                  インボイス枠（<strong>電子取引類型</strong>）／補助上限 350万円
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
              本資料は、{SCHEME_LABEL} の ITツール登録申請における「機能説明資料」として、
              IT導入支援事業者 {PROVIDER_NAME} が、開発メーカー {MAKER_NAME} が提供するITツール
              「{TOOL_NAME}」の機能内容、業務フロー、利用方法、および補助金要件への
              適合状況を説明するために作成されたものです。
            </p>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="mb-8 page-break-before page-break-after avoid-break">
        <div className="border-4 border-black p-6">
          <h2 className="text-center text-2xl font-black tracking-widest border-y-4 border-black py-3 mb-4">
            目　次
          </h2>

          <table className="w-full border-collapse text-sm">
            <tbody>
              {[
                { no: "1", label: "製品概要（ITツール正式名称・開発メーカー名・IT導入支援事業者名）", page: "P.3" },
                { no: "2", label: "解決する業務課題と導入効果（受注側企業を無償招待し電子化を推進）", page: "P.4" },
                { no: "★3-0", label: "電子取引類型 必須要件：招待型アカウント発行機能", page: "P.5" },
                { no: "3", label: "機能詳細（招待管理／発注／取引先／請求／インボイス／電帳法／承認／監査）", page: "P.6" },
                { no: "★4", label: "業務フロー図（招待発行→受諾→両社間電子取引成立）", page: "P.9" },
                { no: "★5", label: "ITツールの利用方法（5-1 招待発行〜5-6 管理者運用）", page: "P.10" },
                { no: "6", label: "技術仕様", page: "P.12" },
                { no: "7", label: "導入プロセス", page: "P.13" },
                { no: "8", label: "サポート体制", page: "P.13" },
                { no: "9", label: "お問い合わせ", page: "P.14" },
              ].map((row) => (
                <tr key={row.no}>
                  <td
                    className={
                      "border-2 border-black px-3 py-2 text-center font-bold w-20 " +
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
        </div>
      </section>

      {/* §3-0 電子取引類型 必須要件 明示セクション */}
      <section className="mb-8 page-break-before avoid-break">
        <div className="border-4 border-black p-6">
          <p className="text-center text-sm font-bold tracking-[0.4em] mb-2">
            電子取引類型 必須要件 対応説明
          </p>
          <h2 className="text-center text-2xl font-black tracking-widest border-y-4 border-black py-3 mb-4">
            本ITツールは「招待型 電子取引プラットフォーム」です
          </h2>

          <p className="text-sm leading-relaxed mb-4">
            デジタル化・AI導入補助金2026 インボイス枠 <strong>電子取引類型</strong> は、
            「発注者と受注者双方が利用可能な電子取引プラットフォームであり、
            両社間で商取引情報（発注書・請求書等）を電子的に授受できるソフトウェア」を
            補助対象とします。本ツール「{TOOL_NAME}」が、当該類型の必須要件を
            全て充足していることを以下に明示します。
          </p>

          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="border-2 border-black bg-black text-white px-3 py-2 text-left text-sm font-bold w-56">
                  電子取引類型 の要件
                </th>
                <th className="border-2 border-black bg-black text-white px-3 py-2 text-center text-sm font-bold w-20">
                  本ツール<br />対応
                </th>
                <th className="border-2 border-black bg-black text-white px-3 py-2 text-left text-sm font-bold">
                  本ツールでの実装内容
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-yellow-100">
                <td className="border-2 border-black px-3 py-2 font-black text-base">
                  ① 発注者・受注者双方が<br />利用可能なプラットフォーム
                </td>
                <td className="border-2 border-black px-3 py-2 text-center text-3xl font-black">◎</td>
                <td className="border-2 border-black px-3 py-2 text-xs leading-relaxed">
                  発注側企業と受注側企業の両方が同一プラットフォーム上でアカウントを保有し、
                  発注書・請求書等の商取引情報を電子的に授受可能。
                  Company モデルには companyType（CONTRACTOR＝発注側 / SUBCONTRACTOR＝受注側）が
                  設定され、Invitation 経由で受注側が招待受諾すると自動的に SUBCONTRACTOR 企業として作成される。
                </td>
              </tr>
              <tr className="bg-yellow-100">
                <td className="border-2 border-black px-3 py-2 font-black text-base">
                  ② 招待型・受注側企業への<br />無償アカウント発行
                </td>
                <td className="border-2 border-black px-3 py-2 text-center text-3xl font-black">◎</td>
                <td className="border-2 border-black px-3 py-2 text-xs leading-relaxed">
                  発注側企業が /partners/invite から取引先の会社名・担当者メールアドレスを
                  入力し、招待URL（30日間有効）を発行。受注側企業は招待URLから
                  <strong>費用負担ゼロ</strong>でアカウントを作成できる。
                  受注側企業には課金・アカウント発行料・月額費用等、一切請求されない。
                </td>
              </tr>
              <tr className="bg-yellow-100">
                <td className="border-2 border-black px-3 py-2 font-black text-base">
                  ③ 両社間の電子取引データ<br />授受機能
                </td>
                <td className="border-2 border-black px-3 py-2 text-center text-3xl font-black">◎</td>
                <td className="border-2 border-black px-3 py-2 text-xs leading-relaxed">
                  発注書（Order モデル）・請求書（Invoice モデル）の作成・送付・受領・
                  承認・支払を、両社間で電子的に授受可能。紙・FAX・メール添付・押印を撤廃。
                  発注書 → 検収 → 請求書 → 支払 の一気通貫な電子取引フローを提供。
                </td>
              </tr>
              <tr className="bg-yellow-100">
                <td className="border-2 border-black px-3 py-2 font-black text-base">
                  ④ 電子帳簿保存法<br />電子取引要件対応
                </td>
                <td className="border-2 border-black px-3 py-2 text-center text-3xl font-black">◎</td>
                <td className="border-2 border-black px-3 py-2 text-xs leading-relaxed">
                  確定した発注書・請求書に対して SHA-256 ハッシュ＋タイムスタンプを自動付与し、
                  改ざん防止を担保。検索要件3項目（取引年月日・取引金額・取引先）で
                  絞り込み可能な状態で保存し、2024年1月に義務化された電子取引データの
                  電子保存要件を満たす。
                </td>
              </tr>
              <tr className="bg-yellow-100">
                <td className="border-2 border-black px-3 py-2 font-black text-base">
                  ⑤ インボイス制度対応
                </td>
                <td className="border-2 border-black px-3 py-2 text-center text-3xl font-black">◎</td>
                <td className="border-2 border-black px-3 py-2 text-xs leading-relaxed">
                  適格請求書発行事業者登録番号（T＋13桁）を国税庁Web-APIで自動検証。
                  税率別合計表示、免税事業者からの仕入に対する経過措置（80%→50%→0%）の
                  日付基準での自動適用、適格請求書フォーマットでの PDF 出力に対応。
                </td>
              </tr>
            </tbody>
          </table>

          <div className="mt-4 border-2 border-black p-3 text-xs leading-relaxed">
            <p className="font-bold mb-1">対応する機能セクションへのページ参照</p>
            <ul className="list-disc pl-5 space-y-0.5">
              <li>
                <strong>① 招待型アカウント発行機能の詳細</strong> →
                §3-1 招待管理機能（本資料 P.6）
              </li>
              <li>
                <strong>② 両社間の発注・請求授受機能の詳細</strong> →
                §3-2 発注管理機能／§3-4 請求管理機能（P.7〜P.8）
              </li>
              <li>
                <strong>③ 業務フロー全体（招待発行→受諾→電子取引成立）</strong> →
                §4 業務フロー図［図1］（P.9）
              </li>
              <li>
                <strong>④ 電子取引データ保存の実装</strong> →
                §3-6 電子帳簿保存法対応（P.8）
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 1. Product Overview */}
      <section className="mb-8 avoid-break page-break-before">
        <h2 className="mb-3 border-l-4 border-black pl-3 text-lg font-bold">
          1. 製品概要
        </h2>
        <table className="w-full border-collapse text-sm">
          <tbody>
            {[
              ["ITツール正式名称", TOOL_NAME],
              ["開発メーカー名", MAKER_NAME],
              ["IT導入支援事業者名", PROVIDER_NAME],
              ["提供形態", "クラウド型SaaS（マルチテナント／ブラウザ利用／招待型プラットフォーム）"],
              ["対応ブラウザ", "Chrome / Edge / Safari / Firefox 最新版"],
              ["対応端末", "PC・タブレット・スマートフォン（レスポンシブ対応）"],
              ["対象事業者", "発注側企業（有償契約）／招待を受けた受注側企業（無償利用）"],
              [
                "主要機能",
                "招待型アカウント発行／発注管理／取引先管理（インボイス番号検証）／請求管理／両社間電子取引／承認ワークフロー／監査ログ",
              ],
              [
                "法令対応",
                "適格請求書等保存方式（インボイス制度）／電子帳簿保存法（電子取引要件）／下請法・請負契約一般の必要記載事項",
              ],
              ["主Pコード", "共P-02（決済・債権債務・資金回収）"],
              ["副Pコード", "設定なし（共P-02 単独申請）"],
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
                "取引先側の電子化コストがネックで、電子取引が進まない",
                "招待型・受注側企業は完全無償。発注側企業の負担のみで取引先まで巻き込んだ電子化が可能",
              ],
              [
                "発注書・請求書を紙・FAX・メール添付で運用",
                "両社間電子取引プラットフォームで発注→受注→請求→支払を一気通貫で電子化",
              ],
              [
                "取引先が適格請求書発行事業者かどうか都度確認",
                "国税庁Web-API連携で登録番号を自動検証。登録事業者名を自動取得",
              ],
              [
                "承認の押印フローで業務が数日止まる",
                "電子承認ワークフローで承認スピードを大幅短縮。スマホからも承認可能",
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
        sourceUrl="https://jyuhacchu-system.vercel.app/"
        src="/images/subsidy/dashboard.png"
      />

      {/* 3-1. 招待管理機能 */}
      <section className="page-break-before mb-8">
        <h2 className="mb-3 border-l-4 border-orange-500 pl-3 text-lg font-bold">
          3. 機能詳細
        </h2>

        <h3 className="mt-5 mb-2 text-base font-bold text-slate-900">
          3-1. 招待管理機能（電子取引類型 必須要件の中核機能）
        </h3>
        <div className="mb-2 flex flex-wrap gap-2">
          <span className="inline-block border-2 border-black bg-yellow-200 px-3 py-1 text-xs font-black">
            電子取引類型 対応（招待型アカウント発行／両社間プラットフォーム成立）
          </span>
          <span className="inline-block border-2 border-black bg-yellow-200 px-3 py-1 text-xs font-black">
            共P-02 対応（両社間の発注・請求授受の基盤機能）
          </span>
        </div>
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
                "招待作成",
                "発注側企業の管理者／発注担当者が /partners/invite から取引先の会社名・担当者名・担当者メールを入力し、招待URLを発行",
              ],
              [
                "招待URL トークン",
                "crypto.randomBytes(24) による推測困難なトークンをbase64url形式で生成",
              ],
              [
                "有効期限管理",
                "招待発行から30日間有効。期限を過ぎた招待は自動的に EXPIRED ステータスに遷移し、以後は受諾不可",
              ],
              [
                "招待受諾ページ（公開）",
                "/invite/[token] で招待情報を表示。会社情報（会社コード・住所・電話等）・管理者情報（名前・メール・パスワード）を入力し、Company + User を同時作成",
              ],
              [
                "受注側企業への課金",
                "一切なし。招待受諾で作成された Company・User には課金コードを付与しない設計",
              ],
              [
                "招待取消",
                "招待発行元の管理者は PENDING 状態の招待を取消可能。取消後は招待URLからのアカウント作成不可",
              ],
              [
                "ステータス管理",
                "PENDING（招待中）／ACCEPTED（受諾済）／REVOKED（取消済）／EXPIRED（期限切れ）の4状態",
              ],
              [
                "監査ログ連携",
                "招待発行・受諾・取消の全操作を AuditLog に自動記録（INVITE_CREATE / INVITE_ACCEPT / INVITE_REVOKE）",
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
        caption="取引先招待 画面（発注側管理者による招待URL発行）"
        sourceUrl="https://jyuhacchu-system.vercel.app/partners/invite"
      />
      <ScreenshotPlaceholder
        figure="Fig.3"
        caption="招待受諾ページ（受注側企業が費用ゼロでアカウント作成）"
        sourceUrl="https://jyuhacchu-system.vercel.app/invite/[token]"
      />

      {/* 3-2 Orders */}
      <section className="mb-8 avoid-break">
        <h3 className="mt-5 mb-2 text-base font-bold text-slate-900">
          3-2. 発注管理機能（両社間電子取引の起点）
        </h3>
        <div className="mb-2 flex flex-wrap gap-2">
          <span className="inline-block border-2 border-black bg-yellow-200 px-3 py-1 text-xs font-black">
            共P-02 対応（発注・仕入管理／買掛・支払管理／採算管理）
          </span>
        </div>
        <table className="w-full border-collapse text-sm">
          <tbody>
            {[
              [
                "発注書作成",
                "明細行追加／品名・仕様・数量・単位・単価・金額を入力。税抜→税込を自動計算",
              ],
              ["発注番号自動採番", "PO-YYYYMMDD-XXXX 形式で連番採番し重複を防止"],
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
                "受注側企業への通知",
                "発注書確定と同時に、招待受諾済み受注側企業のダッシュボードに新着表示",
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
        figure="Fig.4"
        caption="発注書 一覧画面"
        sourceUrl="https://jyuhacchu-system.vercel.app/orders"
        src="/images/subsidy/orders-list.png"
      />
      <ScreenshotPlaceholder
        figure="Fig.5"
        caption="発注書 新規作成画面（明細入力・税率自動計算・免税事業者警告表示）"
        sourceUrl="https://jyuhacchu-system.vercel.app/orders/new"
        src="/images/subsidy/orders-new.png"
      />

      {/* 3-3 Partners */}
      <section className="mb-8 avoid-break">
        <h3 className="mt-5 mb-2 text-base font-bold text-slate-900">
          3-3. 取引先管理機能（インボイス制度対応の要）
        </h3>
        <div className="mb-2 flex flex-wrap gap-2">
          <span className="inline-block border-2 border-black bg-yellow-200 px-3 py-1 text-xs font-black">
            共P-02 対応（採算管理／インボイス制度対応）
          </span>
        </div>
        <table className="w-full border-collapse text-sm">
          <tbody>
            {[
              [
                "取引先マスタ CRUD",
                "会社コード、会社種別（発注企業／受注企業）、住所、電話、メール、インボイス番号",
              ],
              [
                "招待からの自動連携",
                "招待を受諾した受注側企業は自動的に取引先マスタに登録される（重複防止）",
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
        sourceUrl="https://jyuhacchu-system.vercel.app/partners"
        src="/images/subsidy/partners-list.png"
      />

      {/* 3-4 Invoice */}
      <section className="mb-8 avoid-break">
        <h3 className="mt-5 mb-2 text-base font-bold text-slate-900">
          3-4. 請求管理機能（両社間電子取引の完結）
        </h3>
        <div className="mb-2 flex flex-wrap gap-2">
          <span className="inline-block border-2 border-black bg-yellow-200 px-3 py-1 text-xs font-black">
            共P-02 対応（受注・売上請求管理／売掛・回収管理）
          </span>
        </div>
        <table className="w-full border-collapse text-sm">
          <tbody>
            {[
              ["請求書作成", "受注側企業が発注書から請求書を自動生成（明細を引き継ぎ、再入力不要）"],
              ["請求番号自動採番", "INV-YYYYMMDD-XXXX 形式"],
              [
                "適格請求書出力",
                "登録番号・税率別合計・消費税額を明記したA4印刷レイアウトに対応",
              ],
              ["CSV出力", "BOM付きUTF-8でExcel直読み込み可能"],
              ["ステータス管理", "下書き／提出済／承認済／却下／支払済 の5状態"],
              [
                "発注側企業への通知",
                "請求書提出と同時に、発注側企業のダッシュボードに新着表示",
              ],
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
        figure="Fig.7"
        caption="請求書 一覧画面"
        sourceUrl="https://jyuhacchu-system.vercel.app/invoices"
        src="/images/subsidy/invoices-list.png"
      />

      {/* 3-5 Invoice compliance */}
      <section className="mb-8 avoid-break">
        <h3 className="mt-5 mb-2 text-base font-bold text-slate-900">
          3-5. インボイス制度対応
        </h3>
        <table className="w-full border-collapse text-sm">
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
                "適格請求書レイアウト",
                "登録番号・税率別対価・税額・発行者名等の必須項目を充足",
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

      {/* 3-6 e-book */}
      <section className="mb-8 avoid-break">
        <h3 className="mt-5 mb-2 text-base font-bold text-slate-900">
          3-6. 電子帳簿保存法 電子取引要件対応
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

      {/* 3-7 Workflow & 3-8 Audit */}
      <section className="mb-8 avoid-break">
        <h3 className="mt-5 mb-2 text-base font-bold text-slate-900">
          3-7. 承認ワークフロー・権限管理
        </h3>
        <ul className="list-disc pl-6 text-sm leading-relaxed space-y-1">
          <li>多段階承認（ApprovalFlow テーブルで柔軟な承認経路を設定）</li>
          <li>却下時のコメント必須入力、再申請時の修正材料として保持</li>
          <li>
            ロールベース権限（管理者／発注担当／受注担当）によるアクセス制御
          </li>
          <li>
            会社ID（companyId）によるマルチテナント自動スコープ、招待受諾で作成された
            受注側企業も自社データのみ閲覧可能
          </li>
        </ul>
      </section>

      <section className="mb-8 avoid-break">
        <h3 className="mt-5 mb-2 text-base font-bold text-slate-900">
          3-8. 監査ログ・内部統制
        </h3>
        <ul className="list-disc pl-6 text-sm leading-relaxed space-y-1">
          <li>作成・更新・削除・承認・却下の全操作を AuditLog に記録</li>
          <li>招待発行・受諾・取消も INVITE_CREATE / INVITE_ACCEPT / INVITE_REVOKE として記録</li>
          <li>操作日時・ユーザー名・IPアドレス・操作内容を保持</li>
          <li>管理者画面から日時・対象種別・操作者で絞り込み閲覧可能</li>
        </ul>
      </section>

      {/* §4 章扉ページ */}
      <section className="mb-6 page-break-before avoid-break">
        <div className="border-4 border-black p-8 text-center">
          <p className="text-sm font-bold mb-2">CHAPTER 4</p>
          <h2 className="text-3xl sm:text-4xl font-black tracking-widest border-y-4 border-black py-4 my-3">
            業 務 フ ロ ー 図
          </h2>
          <p className="text-sm mt-3">［図1］招待発行→受諾→両社間電子取引成立の業務フロー</p>
          <p className="text-xs mt-2 text-slate-600">
            開発メーカー: {MAKER_NAME} ／ ITツール: {TOOL_NAME}
          </p>
        </div>
      </section>

      {/* 4. Business Flow Diagram */}
      <section className="mb-8">
        <h2 className="mb-3 bg-black text-white px-4 py-2 text-xl font-black">
          §4. 業務フロー図
        </h2>
        <div className="mb-3 flex flex-wrap gap-2">
          <span className="inline-block border-2 border-black bg-yellow-200 px-3 py-1 text-xs font-black">
            電子取引類型 対応（招待型・両社間電子取引プラットフォームの成立プロセス）
          </span>
        </div>
        <p className="mb-4 text-sm leading-relaxed">
          電子取引Lシステムの中核となる、招待発行から両社間電子取引成立、
          その後の発注→受注→請求→支払の完結までの業務フローを以下の図に示します。
        </p>

        <figure className="my-6 border-2 border-black p-4 avoid-break">
          <figcaption className="mb-3 text-center text-sm font-bold">
            ［図1］招待発行→受諾→両社間電子取引成立
          </figcaption>

          <svg
            viewBox="0 0 900 820"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
            role="img"
            aria-label="業務フロー図 電子取引Lシステム"
          >
            <defs>
              <marker id="arrow2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#000" />
              </marker>
            </defs>

            <rect x="10" y="10" width="430" height="34" fill="#000" />
            <text x="225" y="33" textAnchor="middle" fill="#fff" fontSize="15" fontWeight="bold">
              発注側企業（招待発行元・有償）
            </text>
            <rect x="460" y="10" width="430" height="34" fill="#000" />
            <text x="675" y="33" textAnchor="middle" fill="#fff" fontSize="15" fontWeight="bold">
              受注側企業（招待受諾者・無償）
            </text>

            {[
              { y: 60, t1: "① 契約・アカウント発行", t2: "有償プラン契約" },
              { y: 140, t1: "② 取引先招待発行", t2: "会社名・メール入力→URL生成" },
              { y: 300, t1: "③ 招待一覧で状態確認", t2: "PENDING→ACCEPTED表示" },
              { y: 400, t1: "④ 発注書起票", t2: "明細・税率／消費税自動計算" },
              { y: 480, t1: "⑤ 多段階承認", t2: "ワークフロー（スマホ承認可）" },
              { y: 560, t1: "⑥ 発注確定", t2: "SHA-256+TS付与→受注側通知" },
              { y: 700, t1: "⑦ 検収→請求書受領", t2: "支払処理→支払済へ" },
            ].map((s) => (
              <g key={`b2-${s.y}`}>
                <rect x="20" y={s.y} width="410" height="54" fill="#fff" stroke="#000" strokeWidth="2" />
                <text x="225" y={s.y + 22} textAnchor="middle" fontSize="14" fontWeight="bold">{s.t1}</text>
                <text x="225" y={s.y + 42} textAnchor="middle" fontSize="11" fill="#333">{s.t2}</text>
              </g>
            ))}

            {[
              { y: 140, t1: "② 招待URL受領", t2: "メール等で招待URL受け取り" },
              { y: 220, t1: "③ 招待受諾", t2: "会社情報入力→無償アカウント作成" },
              { y: 300, t1: "④ ログイン開始", t2: "自社データスコープで利用開始" },
              { y: 400, t1: "⑤ 発注書受領通知", t2: "システム新着＋メール" },
              { y: 480, t1: "⑥ 発注受諾→納品", t2: "履行期間内で作業実施→報告" },
              { y: 620, t1: "⑦ 請求書起票", t2: "発注書から明細自動引継ぎ" },
              { y: 700, t1: "⑧ 適格請求書送付", t2: "SHA-256+TS付与→発注側通知" },
            ].map((s) => (
              <g key={`s2-${s.y}`}>
                <rect x="470" y={s.y} width="410" height="54" fill="#fff" stroke="#000" strokeWidth="2" />
                <text x="675" y={s.y + 22} textAnchor="middle" fontSize="14" fontWeight="bold">{s.t1}</text>
                <text x="675" y={s.y + 42} textAnchor="middle" fontSize="11" fill="#333">{s.t2}</text>
              </g>
            ))}

            {/* Invitation URL arrow */}
            <line x1="430" y1="167" x2="470" y2="167" stroke="#000" strokeWidth="3" markerEnd="url(#arrow2)" />
            <text x="450" y="158" textAnchor="middle" fontSize="11" fill="#000" fontWeight="bold">招待URL</text>

            <rect x="20" y="260" width="860" height="30" fill="#f59e0b" />
            <text x="450" y="280" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="bold">
              ★ 電子取引類型 の中核：無償招待によるアカウント発行が完了 → 両社間電子取引 開始
            </text>

            <line x1="430" y1="427" x2="470" y2="427" stroke="#000" strokeWidth="2" markerEnd="url(#arrow2)" />
            <text x="450" y="418" textAnchor="middle" fontSize="10" fill="#000">発注書</text>

            <line x1="470" y1="647" x2="430" y2="727" stroke="#000" strokeWidth="2" strokeDasharray="4 2" markerEnd="url(#arrow2)" />
            <text x="450" y="695" textAnchor="middle" fontSize="10" fill="#000">請求書</text>
          </svg>

          <p className="mt-3 text-[10px] text-slate-700 leading-relaxed">
            凡例: 実線矢印＝同一企業内のステップ遷移／実線矢印（企業間・横方向）＝
            システム通知・データ伝達／破線矢印＝ステータス情報の同期。
            オレンジ帯は電子取引類型 の中核となる「招待受諾完了→両社間電子取引開始」
            のフェーズ境界を示します。
          </p>
        </figure>
      </section>

      {/* §5 章扉ページ */}
      <section className="mb-6 page-break-before avoid-break">
        <div className="border-4 border-black p-8 text-center">
          <p className="text-sm font-bold mb-2">CHAPTER 5</p>
          <h2 className="text-3xl sm:text-4xl font-black tracking-widest border-y-4 border-black py-4 my-3">
            I T ツ ー ル の 利 用 方 法
          </h2>
          <p className="text-sm mt-3">5-1 招待発行 ／ 5-2 招待受諾 ／ 5-3 発注業務 ／ 5-4 受注業務 ／ 5-5 承認 ／ 5-6 管理者運用</p>
          <p className="text-xs mt-2 text-slate-600">
            開発メーカー: {MAKER_NAME} ／ ITツール: {TOOL_NAME}
          </p>
        </div>
      </section>

      {/* 5. How to use */}
      <section className="mb-8">
        <h2 className="mb-3 bg-black text-white px-4 py-2 text-xl font-black">
          §5. ITツールの利用方法
        </h2>
        <p className="mb-4 text-sm leading-relaxed">
          電子取引Lシステムの日常的な利用手順を、招待発行から両社間電子取引成立、
          その後の発注・受注・請求業務までの典型的な操作フローに沿って説明します。
        </p>

        <h3 className="mt-5 mb-2 text-base font-bold text-slate-900">
          5-1. 招待発行手順（発注側企業）
        </h3>
        <ol className="list-decimal pl-6 text-sm leading-relaxed space-y-1">
          <li>発注側管理者アカウントでログイン。</li>
          <li>サイドバー「取引先招待」→ 招待発行フォームを表示。</li>
          <li>取引先の会社名、担当者名（任意）、担当者メールアドレスを入力。</li>
          <li>任意で招待メッセージを入力し「招待URLを発行」ボタンをクリック。</li>
          <li>発行された招待URLをコピーし、取引先へメール等で送付。</li>
        </ol>

        <h3 className="mt-6 mb-2 text-base font-bold text-slate-900">
          5-2. 招待受諾手順（受注側企業／完全無償）
        </h3>
        <ol className="list-decimal pl-6 text-sm leading-relaxed space-y-1">
          <li>発注側から送付された招待URLをクリック。</li>
          <li>招待情報表示ページで、招待元・招待先・有効期限を確認。</li>
          <li>「アカウント作成フォーム」に会社情報・管理者情報を入力。</li>
          <li>「無償アカウントを作成する」ボタンをクリック。</li>
          <li>作成完了後、ログイン画面へ遷移。作成した管理者アカウントでログイン。</li>
        </ol>

        <h3 className="mt-6 mb-2 text-base font-bold text-slate-900">
          5-3. 発注業務フロー（発注側担当者）
        </h3>
        <ol className="list-decimal pl-6 text-sm leading-relaxed space-y-1">
          <li>「発注管理」→「新規作成」→ 案件・取引先・明細を入力。</li>
          <li>「申請」→ 承認者にメール通知が届く。</li>
          <li>承認完了後、発注書が確定し、受注側企業へ通知される。</li>
        </ol>

        <h3 className="mt-6 mb-2 text-base font-bold text-slate-900">
          5-4. 受注業務フロー（受注側担当者）
        </h3>
        <ol className="list-decimal pl-6 text-sm leading-relaxed space-y-1">
          <li>ログイン → 新着の発注書通知を確認。</li>
          <li>発注内容を確認し、「受諾」を押下。</li>
          <li>納品・作業完了後、「納品報告」を登録。</li>
          <li>検収完了後、「請求管理」→「新規作成」で請求書を起票（明細は発注書から自動引継ぎ）。</li>
          <li>「印刷／PDF出力」で適格請求書を出力し、必要に応じて送付。</li>
        </ol>

        <h3 className="mt-6 mb-2 text-base font-bold text-slate-900">
          5-5. 承認業務フロー（承認者）
        </h3>
        <ol className="list-decimal pl-6 text-sm leading-relaxed space-y-1">
          <li>承認依頼メール受信、もしくはダッシュボードで承認待ち件数を確認。</li>
          <li>「承認」画面で対象を選択し、内容を確認。</li>
          <li>承認または却下（コメント必須）を選択。スマホからも操作可能。</li>
        </ol>

        <h3 className="mt-6 mb-2 text-base font-bold text-slate-900">
          5-6. 管理者運用
        </h3>
        <ol className="list-decimal pl-6 text-sm leading-relaxed space-y-1">
          <li>ユーザー管理：新規ユーザー追加・権限変更・退職者の無効化。</li>
          <li>取引先招待一覧：発行済み招待の状態確認・取消。</li>
          <li>監査ログ：招待発行・受諾・取消を含む全操作を検索。</li>
          <li>取引先マスタ：インボイス番号変更時の再検証、免税事業者の切り替え時期の管理。</li>
        </ol>
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
              ["招待トークン生成", "Node.js crypto.randomBytes(24) → base64url 24バイト＝192ビット強度"],
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
              <th className="border border-slate-300 px-3 py-2 text-left text-xs font-bold w-16">#</th>
              <th className="border border-slate-300 px-3 py-2 text-left text-xs font-bold w-40">フェーズ</th>
              <th className="border border-slate-300 px-3 py-2 text-left text-xs font-bold">内容</th>
              <th className="border border-slate-300 px-3 py-2 text-left text-xs font-bold w-28">目安期間</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["1", "お申込み・契約", "利用規約同意、プラン選択、GビズID連携のご案内", "1〜2営業日"],
              ["2", "発注側アカウント発行", "管理者アカウント＋サブドメイン発行", "即日〜1営業日"],
              ["3", "初期設定", "自社情報・承認フロー設定、社内ユーザー登録", "1〜5営業日"],
              ["4", "取引先招待発行", "既存取引先へ招待URL送付（CSV一括／個別）", "招待発行は即時"],
              ["5", "取引先受諾", "取引先による招待受諾・無償アカウント作成", "取引先ごと"],
              ["6", "社内トレーニング", "運用マニュアル提供＋オンライン説明会", "1営業日"],
              ["7", "本番運用開始", "監視／サポート契約の発効", "—"],
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
              ["受注側企業のサポート", "招待発行元の発注側企業経由でご対応（受注側単独契約は不要）"],
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
              ["IT導入補助金 相談", "transact@juhacchu-l.jp"],
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
