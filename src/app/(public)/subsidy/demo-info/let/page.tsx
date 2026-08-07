import type { Metadata } from "next"
import { DocumentShell } from "../../_components/document-shell"

export const metadata: Metadata = {
  title: "デモ機・テストアカウント情報｜受発注Lシステム｜IT導入補助金 申請書類",
  description:
    "デジタル化・AI導入補助金2026 インボイス枠 申請添付書類。受発注Lシステムのデモ環境URL、テストアカウント情報、確認手順を記載。",
}

export default function DemoInfoLetPage() {
  return (
    <DocumentShell
      title="デモ機・テストアカウント情報"
      subtitle="デジタル化・AI導入補助金2026 インボイス枠（インボイス対応類型）申請添付書類"
    >
      {/* Cover identification */}
      <section className="mb-8 avoid-break">
        <table className="w-full border-collapse text-sm">
          <tbody>
            <tr>
              <th className="border-2 border-black bg-black text-white px-4 py-3 text-left w-56 text-sm font-bold">
                ITツール正式名称
              </th>
              <td className="border-2 border-black px-4 py-3 text-xl font-black">
                受発注Lシステム
              </td>
            </tr>
            <tr>
              <th className="border-2 border-black bg-black text-white px-4 py-3 text-left text-sm font-bold">
                開発メーカー名
              </th>
              <td className="border-2 border-black px-4 py-3 text-xl font-black">
                株式会社LET
              </td>
            </tr>
            <tr>
              <th className="border-2 border-black bg-black text-white px-4 py-3 text-left text-sm font-bold">
                IT導入支援事業者名
              </th>
              <td className="border-2 border-black px-4 py-3 text-lg font-bold">
                株式会社LET
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
                なし
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
                https://lsystem.let-inc.net/
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
          §2. テストアカウント（3ロール）
        </h2>
        <p className="mb-4 text-sm leading-relaxed">
          本ITツールは「管理者」「発注担当」「受注担当」の3ロールを有し、
          ロールごとに利用可能な機能が異なります。審査確認のため、3アカウント
          すべてのログイン情報を提供します。
        </p>

        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="border-2 border-black bg-black text-white px-3 py-2 text-left w-32">
                ロール
              </th>
              <th className="border-2 border-black bg-black text-white px-3 py-2 text-left">
                メールアドレス（ログインID）
              </th>
              <th className="border-2 border-black bg-black text-white px-3 py-2 text-left w-44">
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
                ユーザー管理／監査ログ／全社データ参照／取引先マスタCRUD／案件管理／発注／請求／承認の全機能
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
                発注書作成・承認申請／取引先閲覧・登録／案件管理／自社請求書受領
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
          サンプル発注書（PO-20260407-0001）・取引先（3社）・案件（2件）等が登録済みです。
          審査期間中の操作・データ追加は自由に行っていただけます。
        </p>
      </section>

      {/* §3 各Pコード機能の確認手順 */}
      <section className="mb-8 page-break-before">
        <h2 className="mb-3 bg-black text-white px-4 py-2 text-xl font-black">
          §3. 選択プロセス（Pコード）に該当する機能の確認手順
        </h2>
        <p className="mb-4 text-sm leading-relaxed">
          申請ポータルで選択した <strong>共P-02（決済・債権債務・資金回収）</strong>
          に該当する機能の、デモ機での確認手順を以下に示します。
        </p>

        {/* 共P-02 */}
        <h3 className="mt-5 mb-2 text-base font-bold">
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
                管理者アカウントでログイン → ダッシュボード表示
              </td>
              <td className="border-2 border-black px-2 py-2 text-xs">採算管理（発注件数・請求件数・今月の発注金額）</td>
            </tr>
            <tr>
              <td className="border-2 border-black px-2 py-2 text-center font-bold">2</td>
              <td className="border-2 border-black px-2 py-2 text-xs">
                左メニュー「取引先管理」→「新規登録」→ インボイス番号
                <span className="font-mono bg-yellow-100 px-1">T1234567890123</span>
                を入力 →「確認」ボタン
              </td>
              <td className="border-2 border-black px-2 py-2 text-xs">適格請求書発行事業者登録番号の国税庁API自動検証</td>
            </tr>
            <tr>
              <td className="border-2 border-black px-2 py-2 text-center font-bold">3</td>
              <td className="border-2 border-black px-2 py-2 text-xs">
                左メニュー「発注管理」→「新規作成」→ 案件・取引先・明細・税率を選択 → 申請
              </td>
              <td className="border-2 border-black px-2 py-2 text-xs">発注・仕入管理／多段階承認ワークフロー／税率別合計・経過措置の自動適用</td>
            </tr>
            <tr>
              <td className="border-2 border-black px-2 py-2 text-center font-bold">4</td>
              <td className="border-2 border-black px-2 py-2 text-xs">
                既存サンプル発注「PO-20260407-0001」を開く → 「印刷／PDF」ボタン
              </td>
              <td className="border-2 border-black px-2 py-2 text-xs">適格請求書フォーマットでの帳票出力（買掛・支払管理）</td>
            </tr>
            <tr>
              <td className="border-2 border-black px-2 py-2 text-center font-bold">5</td>
              <td className="border-2 border-black px-2 py-2 text-xs">
                左メニュー「請求管理」→ 既存請求書を開く → ステータス確認
              </td>
              <td className="border-2 border-black px-2 py-2 text-xs">受注・売上請求管理／売掛・回収管理（提出→承認→支払のステータス遷移）</td>
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
          <li>シードデータの会社「サンプル商事株式会社」「田中サービス株式会社」「山田物産株式会社」は架空の事業者です。</li>
          <li>テストアカウントのパスワード「password123」は審査確認用の簡易パスワードです。本番環境では8文字以上＋大文字・小文字・数字を含むポリシーが適用されます。</li>
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
              <td className="px-3 py-2 font-mono">subsidy@juhacchu-l.jp</td>
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
