import { TransactDocumentShell } from "./transact-document-shell"
import { DSYSTEM_BRAND } from "@/lib/brand"

/** ITツール正式名称。改名時は src/lib/brand.ts のみを直す */
const TOOL_NAME = DSYSTEM_BRAND.toolName
const MAKER_NAME = "株式会社LET"
const SCHEME_LABEL = "デジタル化・AI導入補助金2026 インボイス枠（電子取引類型）"

export function TransactDemoInfoDocument({
  providerName,
  variantSuffix = "",
}: {
  providerName: string
  /** バリアント用のURLサフィックス（TX.企画版は "/tx"） */
  variantSuffix?: string
}) {
  return (
    <TransactDocumentShell
      title="デモ機・テストアカウント情報"
      subtitle={`${SCHEME_LABEL} 申請添付書類`}
      toolName={TOOL_NAME}
      makerName={MAKER_NAME}
      providerName={providerName}
      docNo="資料⑤ デモ機・テストアカウント情報"
      indexHref={`/transact/subsidy${variantSuffix}`}
      schemeLabel={SCHEME_LABEL}
      pcode="主Pコード: 共P-02（単独）"
    >

      {/* ★ 提出要求項目（①URL ②ID/PW）を1画面で確認できるサマリ */}
      <section className="mb-8 avoid-break">
        <div className="border-4 border-black p-6">
          <p className="text-center text-sm font-bold tracking-[0.3em] mb-2">
            デモ機・テストアカウントに関する情報
          </p>
          <h2 className="text-center text-xl sm:text-2xl font-black tracking-wide border-y-4 border-black py-3 mb-4">
            ① デモ機・テストアカウントのURL ／ ② ログインID・パスワード
          </h2>
          <p className="mb-4 text-sm leading-relaxed">
            本資料は、ITツール登録要領「ITツール登録申請時の留意事項」「（別紙1）提出資料」に基づき
            ご提出する<strong>「デモ機やテストアカウントに関する情報」</strong>です。
            審査に必要な <strong>① URL</strong> と <strong>② ログインID・パスワード</strong> を
            本ページに集約して記載しています（詳細は §1〜§3）。
            本デモ機は<strong>実際に稼働している本番同等の環境</strong>であり、
            下記アカウントで即時にログインしてご確認いただけます。
          </p>

          <table className="w-full border-collapse text-sm mb-4">
            <tbody>
              <tr>
                <th className="border-2 border-black bg-black text-white px-3 py-3 text-left text-base font-black w-56">
                  ① デモ機URL<br />
                  <span className="text-xs font-bold">（ログイン画面）</span>
                </th>
                <td className="border-2 border-black bg-yellow-100 px-3 py-3 font-mono text-lg font-bold">
                  https://dlsystem.aigrowthx.pro/auth/login
                </td>
              </tr>
            </tbody>
          </table>

          <p className="mb-2 text-base font-black">
            ② ログインID・パスワード（4アカウント／パスワードは全て共通）
          </p>
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="border-2 border-black bg-black text-white px-3 py-2 text-left text-sm font-bold w-48">
                  区分・ロール
                </th>
                <th className="border-2 border-black bg-black text-white px-3 py-2 text-left text-sm font-bold">
                  ログインID（メールアドレス）
                </th>
                <th className="border-2 border-black bg-black text-white px-3 py-2 text-left text-sm font-bold w-44">
                  パスワード
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                ["発注側企業 管理者", "admin@aoba-sangyo.example.jp", true],
                ["発注側企業 発注担当", "kimura@aoba-sangyo.example.jp", false],
                ["受注側企業 管理者", "admin@keyaki-koubou.example.jp", false],
                ["受注側企業 受注担当", "mori@keyaki-koubou.example.jp", false],
              ].map(([role, mail, primary]) => (
                <tr key={mail as string} className={primary ? "bg-yellow-100" : undefined}>
                  <td className="border-2 border-black px-3 py-2 text-sm font-bold">
                    {role as string}
                    {primary ? (
                      <>
                        <br />
                        <span className="text-xs">※ まずはこちらでログインしてください</span>
                      </>
                    ) : null}
                  </td>
                  <td className="border-2 border-black px-3 py-2 font-mono text-base font-bold">
                    {mail as string}
                  </td>
                  <td className="border-2 border-black px-3 py-2 font-mono text-base font-bold bg-yellow-200">
                    password123
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 border-2 border-black p-3 text-sm leading-relaxed">
            <p className="font-bold mb-1">
              申請プロセス（主Pコード 共P-02）に該当する機能の確認手順
            </p>
            <p>
              発注側企業 管理者アカウントでログイン後、左メニューの
              「発注管理」「取引先管理」「請求管理」「承認」から、共P-02
              （決済・債権債務・資金回収）に該当する機能をご確認いただけます。
              画面別の具体的な操作手順は <strong>§3</strong> に記載しています。
              サンプルデータ（発注書 PO-20260422-0101／請求書 INV-20260630-0101／
              取引先3社／招待レコード2件）が登録済みのため、初回ログイン直後から
              実データでご確認いただけます。
            </p>
          </div>
        </div>
      </section>

      {/* ★ 前回提出からの修正箇所 — 別紙1(2) */}
      <section className="mb-8 avoid-break">
        <h2 className="mb-3 bg-black text-white px-4 py-2 text-xl font-black">
          ★ 前回提出（2026-09-09）からの修正箇所
        </h2>
        <p className="mb-3 text-sm leading-relaxed">
          2026-09-10 付の事務局からの修正依頼「提出されたデモ機・テストアカウントで『ログインの実行』が
          できませんでした」への対応として、以下を実施しました。
        </p>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-slate-100">
              <th className="border-2 border-black px-2 py-1.5 text-left text-xs font-bold w-10">#</th>
              <th className="border-2 border-black px-2 py-1.5 text-left text-xs font-bold">修正内容</th>
            </tr>
          </thead>
          <tbody>
            {[
              "本番環境（デモ機）のデータベースに、本資料 §2 記載の4アカウント（メールアドレス・パスワード・所属企業・権限）を再投入し、記載どおりの ID・パスワードでログインできることを IT導入支援事業者が再確認しました。",
              "ログアウト後の遷移先を本デモ機（dlsystem.aigrowthx.pro）のログイン画面に固定しました（他システムの画面へ遷移しないよう修正）。",
              "デモ機の稼働状態を外部から確認できる URL を §1 に追加しました（https://dlsystem.aigrowthx.pro/api/health — denshiKunDemoUsers が 4 であればテストアカウントが有効です）。",
            ].map((t, i) => (
              <tr key={t}>
                <td className="border-2 border-black px-2 py-1.5 text-center font-bold">{i + 1}</td>
                <td className="border-2 border-black px-2 py-1.5">{t}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-2 text-xs text-slate-600">
          ※ テストアカウントの ID・パスワード自体に変更はありません。ID・パスワードは半角英数で、前後に空白を入れずに入力してください。
        </p>
      </section>

      {/* §1 デモ機 URL */}
      <section className="mb-8 avoid-break page-break-before">
        <h2 className="mb-3 bg-black text-white px-4 py-2 text-xl font-black">
          §1. デモ機 URL（詳細）
        </h2>
        <table className="w-full border-collapse text-sm">
          <tbody>
            <tr>
              <th className="border-2 border-black bg-slate-100 px-3 py-2 text-left w-40 text-sm font-bold">
                サービスログインURL
              </th>
              <td className="border-2 border-black px-3 py-2 font-mono text-base bg-yellow-50">
                https://dlsystem.aigrowthx.pro/auth/login
              </td>
            </tr>
            <tr>
              <th className="border-2 border-black bg-slate-100 px-3 py-2 text-left text-sm font-bold">
                サービスLP（公開）
              </th>
              <td className="border-2 border-black px-3 py-2 font-mono text-sm">
                https://dlsystem.aigrowthx.pro/
              </td>
            </tr>
            <tr>
              <th className="border-2 border-black bg-slate-100 px-3 py-2 text-left text-sm font-bold">
                招待発行画面URL
              </th>
              <td className="border-2 border-black px-3 py-2 font-mono text-sm">
                https://dlsystem.aigrowthx.pro/partners/invite<br />
                <span className="text-xs text-slate-500">※ ADMIN 権限でログイン後に利用可能</span>
              </td>
            </tr>
            <tr>
              <th className="border-2 border-black bg-slate-100 px-3 py-2 text-left text-sm font-bold">
                アカウント利用状況URL
              </th>
              <td className="border-2 border-black px-3 py-2 font-mono text-sm">
                https://dlsystem.aigrowthx.pro/partners/accounts<br />
                <span className="text-xs text-slate-500">
                  ※ 発行済み受注側アカウントの一覧・インボイス管理番号・発行上限の消化状況（本ITツール固有機能）
                </span>
              </td>
            </tr>
            <tr>
              <th className="border-2 border-black bg-slate-100 px-3 py-2 text-left text-sm font-bold">
                電子取引アーカイブURL
              </th>
              <td className="border-2 border-black px-3 py-2 font-mono text-sm">
                https://dlsystem.aigrowthx.pro/archive<br />
                <span className="text-xs text-slate-500">
                  ※ 電子帳簿保存法 検索要件3項目（取引年月日・取引金額・取引先）での横断検索（本ITツール固有機能）
                </span>
              </td>
            </tr>
            <tr>
              <th className="border-2 border-black bg-slate-100 px-3 py-2 text-left text-sm font-bold">
                招待受諾ページURL
              </th>
              <td className="border-2 border-black px-3 py-2 font-mono text-sm">
                https://dlsystem.aigrowthx.pro/invite/[token]<br />
                <span className="text-xs text-slate-500">※ [token] は招待発行時に自動生成</span>
              </td>
            </tr>
            <tr>
              <th className="border-2 border-black bg-slate-100 px-3 py-2 text-left text-sm font-bold">
                稼働確認URL（ログイン不要）
              </th>
              <td className="border-2 border-black px-3 py-2 font-mono text-sm">
                https://dlsystem.aigrowthx.pro/api/health<br />
                <span className="text-xs text-slate-500">
                  ※ 応答の denshiKunDemoUsers が 4 であれば、§2 の4アカウントが有効な状態です
                </span>
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
          §2. テストアカウント（発注側2ロール＋受注側2ロール・計4アカウント）
        </h2>
        <p className="mb-4 text-sm leading-relaxed">
          本ITツールは、招待型・両社間電子取引プラットフォームであり、
          <strong>発注側企業</strong>と<strong>招待済みの受注側企業</strong>の両方の
          テストアカウントを提供しています。発注側は「管理者」「発注担当」、
          受注側は「管理者」「受注担当」のロールを有します。
        </p>

        <h3 className="mt-4 mb-2 text-base font-bold">発注側企業（株式会社アオバ産業）</h3>
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
                admin@aoba-sangyo.example.jp
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
                kimura@aoba-sangyo.example.jp
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

        <h3 className="mt-6 mb-2 text-base font-bold">受注側企業（ケヤキ工房株式会社／招待受諾済み）</h3>
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
                admin@keyaki-koubou.example.jp
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
                mori@keyaki-koubou.example.jp
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
          サンプル発注書（PO-20260422-0101）・サンプル請求書（INV-20260630-0101・
          電子帳簿保存法タイムスタンプ付与済み）・取引先（3社）・案件（2件）・
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
                発注側管理者アカウント（admin@aoba-sangyo.example.jp）でログイン
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
          <li>シードデータの会社「株式会社アオバ産業」「ケヤキ工房株式会社」等は架空の事業者です。</li>
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
              <td className="px-3 py-2 font-mono">support@aigrowthx.pro</td>
            </tr>
            <tr className="border-b border-slate-200">
              <th className="w-40 bg-slate-50 px-3 py-2 text-left text-xs font-bold">
                審査確認窓口
              </th>
              <td className="px-3 py-2 font-mono">transact@aigrowthx.pro</td>
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
    </TransactDocumentShell>
  )
}
