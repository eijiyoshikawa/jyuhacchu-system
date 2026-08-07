import type { Metadata } from "next"
import { DocumentShell } from "@/app/(public)/subsidy/_components/document-shell"

export const metadata: Metadata = {
  title: "デモ機・テストアカウント情報｜電子取引Lシステム｜IT導入補助金 電子取引類型",
  description:
    "デジタル化・AI導入補助金2026 インボイス枠 電子取引類型 申請添付書類。電子取引Lシステムのデモ環境URL、テストアカウント情報、招待受諾フローの確認手順を記載。",
}

const TOOL_NAME = "電子取引Lシステム"
const MAKER_NAME = "株式会社LET"
const PROVIDER_NAME = "株式会社LET"
const SCHEME_LABEL = "デジタル化・AI導入補助金2026 インボイス枠（電子取引類型）"

export default function TransactDemoInfoPage() {
  return (
    <DocumentShell
      title="デモ機・テストアカウント情報"
      subtitle={`${SCHEME_LABEL} 申請添付書類`}
      toolName={TOOL_NAME}
      makerName={MAKER_NAME}
      indexHref="/transact/subsidy"
      schemeLabel={SCHEME_LABEL}
      pcode="主Pコード: 共P-02 ／ 副Pコード: 汎P-07"
    >
      <section className="mb-8 avoid-break">
        <table className="w-full border-collapse text-sm">
          <tbody>
            <tr>
              <th className="border-2 border-black bg-black text-white px-4 py-3 text-left w-56 text-sm font-bold">
                ITツール正式名称
              </th>
              <td className="border-2 border-black px-4 py-3 text-xl font-black">
                {TOOL_NAME}
              </td>
            </tr>
            <tr>
              <th className="border-2 border-black bg-black text-white px-4 py-3 text-left text-sm font-bold">
                開発メーカー名
              </th>
              <td className="border-2 border-black px-4 py-3 text-xl font-black">
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
                汎P-07（グループウェア／コラボレーション）
              </td>
            </tr>
            <tr>
              <th className="border-2 border-black bg-black text-white px-4 py-3 text-left text-sm font-bold">
                申請枠・類型
              </th>
              <td className="border-2 border-black px-4 py-3 text-base">
                インボイス枠（<strong>電子取引類型</strong>）
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* §1 デモ機 URL */}
      <section className="mb-8 avoid-break">
        <h2 className="mb-3 bg-black text-white px-4 py-2 text-xl font-black">
          §1. デモ機 URL
        </h2>
        <table className="w-full border-collapse text-sm">
          <tbody>
            <tr>
              <th className="border-2 border-black bg-slate-100 px-3 py-2 text-left w-40 text-sm font-bold">
                サービスログインURL
              </th>
              <td className="border-2 border-black px-3 py-2 font-mono text-base bg-yellow-50">
                https://jyuhacchu-system.vercel.app/auth/login
              </td>
            </tr>
            <tr>
              <th className="border-2 border-black bg-slate-100 px-3 py-2 text-left text-sm font-bold">
                サービスLP（公開）
              </th>
              <td className="border-2 border-black px-3 py-2 font-mono text-sm">
                https://jyuhacchu-system.vercel.app/transact
              </td>
            </tr>
            <tr>
              <th className="border-2 border-black bg-slate-100 px-3 py-2 text-left text-sm font-bold">
                招待発行画面URL
              </th>
              <td className="border-2 border-black px-3 py-2 font-mono text-sm">
                https://jyuhacchu-system.vercel.app/partners/invite
              </td>
            </tr>
            <tr>
              <th className="border-2 border-black bg-slate-100 px-3 py-2 text-left text-sm font-bold">
                招待受諾ページURL
              </th>
              <td className="border-2 border-black px-3 py-2 font-mono text-sm">
                https://jyuhacchu-system.vercel.app/invite/[token]<br />
                <span className="text-xs text-slate-500">※ [token] は招待発行時に自動生成</span>
              </td>
            </tr>
            <tr>
              <th className="border-2 border-black bg-slate-100 px-3 py-2 text-left text-sm font-bold">
                推奨ブラウザ
              </th>
              <td className="border-2 border-black px-3 py-2 text-sm">
                Google Chrome 最新版、Microsoft Edge 最新版（いずれもPC環境）
              </td>
            </tr>
            <tr>
              <th className="border-2 border-black bg-slate-100 px-3 py-2 text-left text-sm font-bold">
                対応端末
              </th>
              <td className="border-2 border-black px-3 py-2 text-sm">
                PC・タブレット・スマートフォン（レスポンシブ対応）
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* §2 テストアカウント */}
      <section className="mb-8 avoid-break">
        <h2 className="mb-3 bg-black text-white px-4 py-2 text-xl font-black">
          §2. テストアカウント（発注側／受注側 各3ロール）
        </h2>
        <p className="mb-4 text-sm leading-relaxed">
          本ITツールは、招待型・両社間電子取引プラットフォームであり、
          <strong>発注側企業</strong>と<strong>招待済みの受注側企業</strong>の両方の
          テストアカウントを提供しています。それぞれ「管理者」「発注担当（発注側のみ）」
          「受注担当（受注側のみ）」のロールを有します。
        </p>

        <h3 className="mt-4 mb-2 text-base font-bold">発注側企業（サンプル商事株式会社）</h3>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="border-2 border-black bg-black text-white px-3 py-2 text-left w-32">
                ロール
              </th>
              <th className="border-2 border-black bg-black text-white px-3 py-2 text-left">
                メールアドレス（ログインID）
              </th>
              <th className="border-2 border-black bg-black text-white px-3 py-2 text-left w-40">
                パスワード
              </th>
              <th className="border-2 border-black bg-black text-white px-3 py-2 text-left">
                利用可能な主要機能
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-yellow-50">
              <td className="border-2 border-black px-3 py-2 font-black">
                管理者<br />
                <span className="text-xs">ADMIN</span>
              </td>
              <td className="border-2 border-black px-3 py-2 font-mono text-xs">
                admin@sample-trading.co.jp
              </td>
              <td className="border-2 border-black px-3 py-2 font-mono text-base font-bold bg-yellow-200">
                password123
              </td>
              <td className="border-2 border-black px-3 py-2 text-xs">
                <strong>取引先招待</strong>（無償アカウント発行）／ユーザー管理／監査ログ／全社データ参照／取引先マスタCRUD／案件管理／発注／請求／承認の全機能
              </td>
            </tr>
            <tr>
              <td className="border-2 border-black px-3 py-2 font-black">
                発注担当<br />
                <span className="text-xs">CONTRACTOR</span>
              </td>
              <td className="border-2 border-black px-3 py-2 font-mono text-xs">
                tanaka@sample-trading.co.jp
              </td>
              <td className="border-2 border-black px-3 py-2 font-mono text-base font-bold bg-yellow-200">
                password123
              </td>
              <td className="border-2 border-black px-3 py-2 text-xs">
                取引先招待（発行のみ）／発注書作成・承認申請／取引先閲覧・登録／案件管理／自社請求書受領
              </td>
            </tr>
          </tbody>
        </table>

        <h3 className="mt-6 mb-2 text-base font-bold">受注側企業（田中サービス株式会社／招待済み）</h3>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="border-2 border-black bg-black text-white px-3 py-2 text-left w-32">
                ロール
              </th>
              <th className="border-2 border-black bg-black text-white px-3 py-2 text-left">
                メールアドレス（ログインID）
              </th>
              <th className="border-2 border-black bg-black text-white px-3 py-2 text-left w-40">
                パスワード
              </th>
              <th className="border-2 border-black bg-black text-white px-3 py-2 text-left">
                利用可能な主要機能
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-green-50">
              <td className="border-2 border-black px-3 py-2 font-black">
                管理者<br />
                <span className="text-xs">ADMIN</span>
              </td>
              <td className="border-2 border-black px-3 py-2 font-mono text-xs">
                admin@tanaka-service.co.jp
              </td>
              <td className="border-2 border-black px-3 py-2 font-mono text-base font-bold bg-yellow-200">
                password123
              </td>
              <td className="border-2 border-black px-3 py-2 text-xs">
                <strong>招待受諾で作成された無償アカウント（費用負担ゼロ）</strong>／自社ユーザー管理／自社取引先マスタ／発注書受領／請求書作成・提出
              </td>
            </tr>
            <tr>
              <td className="border-2 border-black px-3 py-2 font-black">
                受注担当<br />
                <span className="text-xs">SUBCONTRACTOR</span>
              </td>
              <td className="border-2 border-black px-3 py-2 font-mono text-xs">
                suzuki@tanaka-service.co.jp
              </td>
              <td className="border-2 border-black px-3 py-2 font-mono text-base font-bold bg-yellow-200">
                password123
              </td>
              <td className="border-2 border-black px-3 py-2 text-xs">
                発注書受領・受諾／納品報告／請求書作成・提出
              </td>
            </tr>
          </tbody>
        </table>

        <p className="mt-3 text-xs text-slate-600">
          ※ 本テストアカウントは審査確認用の共用環境です。シードデータが投入されており、
          サンプル発注書（PO-20260407-0001）・取引先（3社）・案件（2件）・
          既存招待レコード（受諾済み1件・PENDING1件）等が登録済みです。
          審査期間中の操作・データ追加は自由に行っていただけます。
        </p>
      </section>

      {/* §3 招待型プラットフォームの機能確認手順 */}
      <section className="mb-8 page-break-before">
        <h2 className="mb-3 bg-black text-white px-4 py-2 text-xl font-black">
          §3. 電子取引類型 特有機能（招待型・両社間電子取引）の確認手順
        </h2>
        <p className="mb-4 text-sm leading-relaxed">
          電子取引類型 が求める「発注者と受注者双方が利用可能な電子取引プラットフォーム」
          「招待型・受注側企業無償アカウント発行」の機能について、
          デモ機での確認手順を以下に示します。
        </p>

        <h3 className="mt-5 mb-2 text-base font-bold">
          招待発行 → 受諾 → 両社間電子取引の一連確認手順
        </h3>
        <div className="mb-2">
          <span className="inline-block border-2 border-black bg-yellow-200 px-3 py-1 text-xs font-black">
            電子取引類型 対応 — 招待型プラットフォーム／両社間電子取引成立
          </span>
        </div>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-slate-100">
              <th className="border-2 border-black px-2 py-2 text-left w-12">手順</th>
              <th className="border-2 border-black px-2 py-2 text-left">操作内容</th>
              <th className="border-2 border-black px-2 py-2 text-left w-44">確認できる機能</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-2 border-black px-2 py-2 text-center font-bold">1</td>
              <td className="border-2 border-black px-2 py-2 text-xs">
                発注側管理者アカウント（admin@sample-trading.co.jp）でログイン
                → 左メニュー「取引先招待」→ フォーム入力（会社名・担当者メール等）
                → 「招待URLを発行」ボタンクリック
              </td>
              <td className="border-2 border-black px-2 py-2 text-xs">
                <strong>招待型アカウント発行（電子取引類型 必須要件）</strong>／
                招待URL生成／30日有効期限
              </td>
            </tr>
            <tr>
              <td className="border-2 border-black px-2 py-2 text-center font-bold">2</td>
              <td className="border-2 border-black px-2 py-2 text-xs">
                発行された招待URLをコピー → 別ブラウザ（またはシークレットウィンドウ）で
                招待URLにアクセス → 招待情報表示を確認
              </td>
              <td className="border-2 border-black px-2 py-2 text-xs">
                招待受諾ページの公開表示／招待情報の受注側企業への提示
              </td>
            </tr>
            <tr>
              <td className="border-2 border-black px-2 py-2 text-center font-bold">3</td>
              <td className="border-2 border-black px-2 py-2 text-xs">
                招待受諾ページで会社情報（会社コード等）・管理者情報を入力 →
                「無償アカウントを作成する」ボタンクリック
              </td>
              <td className="border-2 border-black px-2 py-2 text-xs">
                <strong>受注側企業への無償アカウント発行（費用負担ゼロ）</strong>／
                Company + User の同時作成
              </td>
            </tr>
            <tr>
              <td className="border-2 border-black px-2 py-2 text-center font-bold">4</td>
              <td className="border-2 border-black px-2 py-2 text-xs">
                作成された受注側管理者アカウントでログイン → ダッシュボード表示
              </td>
              <td className="border-2 border-black px-2 py-2 text-xs">
                受注側企業の自社データスコープ／ロールベース権限
              </td>
            </tr>
            <tr>
              <td className="border-2 border-black px-2 py-2 text-center font-bold">5</td>
              <td className="border-2 border-black px-2 py-2 text-xs">
                発注側で発注書起票 → 受注側で受領・受諾 →
                受注側で請求書起票 → 発注側で受領・承認 → 支払
              </td>
              <td className="border-2 border-black px-2 py-2 text-xs">
                <strong>両社間の電子取引成立（発注書・請求書の授受）</strong>
              </td>
            </tr>
            <tr>
              <td className="border-2 border-black px-2 py-2 text-center font-bold">6</td>
              <td className="border-2 border-black px-2 py-2 text-xs">
                発注側管理者で「取引先招待」画面の招待一覧を確認 →
                招待ステータス（PENDING → ACCEPTED）表示を確認
              </td>
              <td className="border-2 border-black px-2 py-2 text-xs">
                招待ライフサイクル管理／取消／期限切れ管理
              </td>
            </tr>
          </tbody>
        </table>

        <h3 className="mt-6 mb-2 text-base font-bold">
          共P-02（決済・債権債務・資金回収）の機能確認手順
        </h3>
        <div className="mb-2">
          <span className="inline-block border-2 border-black bg-yellow-200 px-3 py-1 text-xs font-black">
            共P-02 対応 — 発注・仕入／買掛・支払／受注・売上請求／売掛・回収／採算管理
          </span>
        </div>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-slate-100">
              <th className="border-2 border-black px-2 py-2 text-left w-12">手順</th>
              <th className="border-2 border-black px-2 py-2 text-left">操作内容</th>
              <th className="border-2 border-black px-2 py-2 text-left w-44">確認できる機能</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-2 border-black px-2 py-2 text-center font-bold">1</td>
              <td className="border-2 border-black px-2 py-2 text-xs">
                発注側管理者でログイン → 左メニュー「取引先管理」→
                インボイス番号 <span className="font-mono bg-yellow-100 px-1">T1234567890123</span>
                を入力 → 検証
              </td>
              <td className="border-2 border-black px-2 py-2 text-xs">
                国税庁API自動検証（インボイス制度対応）
              </td>
            </tr>
            <tr>
              <td className="border-2 border-black px-2 py-2 text-center font-bold">2</td>
              <td className="border-2 border-black px-2 py-2 text-xs">
                「発注管理」→「新規作成」→ 明細・税率入力 → 申請 → 承認 → 発注確定
              </td>
              <td className="border-2 border-black px-2 py-2 text-xs">
                発注・仕入管理／多段階承認／税率別合計・経過措置自動適用
              </td>
            </tr>
            <tr>
              <td className="border-2 border-black px-2 py-2 text-center font-bold">3</td>
              <td className="border-2 border-black px-2 py-2 text-xs">
                「請求管理」→ サンプル請求書を開く → ステータス遷移確認
              </td>
              <td className="border-2 border-black px-2 py-2 text-xs">
                受注・売上請求／売掛・回収管理
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* §4 セキュリティ・データ取扱注意 */}
      <section className="mb-8 avoid-break">
        <h2 className="mb-3 bg-black text-white px-4 py-2 text-xl font-black">
          §4. デモ環境のセキュリティ・データ取扱
        </h2>
        <ul className="list-disc pl-6 text-sm leading-relaxed space-y-1">
          <li>本テストアカウントは <strong>審査確認専用</strong> です。本番運用には使用しません。</li>
          <li>テスト環境内のデータは全てダミーデータです。実在の取引・取引先・金額情報は含まれません。</li>
          <li>シードデータの会社「サンプル商事株式会社」「田中サービス株式会社」等は架空の事業者です。</li>
          <li>テストアカウントのパスワード「password123」は審査確認用の簡易パスワードです。本番環境では8文字以上＋大文字・小文字・数字を含むポリシーが適用されます。</li>
          <li>招待URLに含まれるトークンは crypto.randomBytes(24) による推測困難な文字列です。</li>
          <li>通信は全てSSL/TLSにより暗号化されており、HTTPSで保護されています。</li>
        </ul>
      </section>

      {/* §5 サポート連絡先 */}
      <section className="mb-4 avoid-break">
        <h2 className="mb-3 bg-black text-white px-4 py-2 text-xl font-black">
          §5. デモ環境利用中の問い合わせ先
        </h2>
        <table className="w-full border-collapse text-sm">
          <tbody>
            <tr className="border-b border-slate-200">
              <th className="w-40 bg-slate-50 px-3 py-2 text-left text-xs font-bold">
                技術サポート
              </th>
              <td className="px-3 py-2 font-mono">support@juhacchu-l.jp</td>
            </tr>
            <tr className="border-b border-slate-200">
              <th className="w-40 bg-slate-50 px-3 py-2 text-left text-xs font-bold">
                審査確認窓口
              </th>
              <td className="px-3 py-2 font-mono">transact@juhacchu-l.jp</td>
            </tr>
            <tr className="border-b border-slate-200">
              <th className="w-40 bg-slate-50 px-3 py-2 text-left text-xs font-bold">
                応対時間
              </th>
              <td className="px-3 py-2 text-sm">平日 9:00〜17:30（土日祝・年末年始を除く）</td>
            </tr>
          </tbody>
        </table>
        <p className="mt-3 text-xs text-slate-500">
          ※ 連絡先メールアドレスは仮置きです。本番公開時に確定した窓口に差し替えます。
        </p>
      </section>
    </DocumentShell>
  )
}
