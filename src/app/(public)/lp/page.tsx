import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "受発注Lシステム｜インボイス対応クラウド受発注・請求管理SaaS",
  description:
    "発注書・請求書をクラウドで一元管理。適格請求書発行事業者番号の国税庁API自動検証、電子帳簿保存法対応、多段階承認ワークフロー、監査ログまで標準搭載。IT導入補助金（デジタル化・AI導入補助金2026）インボイス枠 対応ITツール。",
}

const FEATURES = [
  {
    title: "発注書作成・多段階承認",
    body: "明細行入力で税額まで自動計算。承認フローはスマホ承認にも対応し、押印待ちで業務を止めません。",
  },
  {
    title: "取引先管理＋インボイス番号検証",
    body: "取引先マスタから適格請求書発行事業者番号（T＋13桁）を国税庁Web-APIで自動照合。免税事業者判定まで自動化。",
  },
  {
    title: "請求書作成・適格請求書出力",
    body: "発注書から請求書を自動生成。税率別合計・登録番号を明記した適格請求書レイアウトでPDF出力。",
  },
  {
    title: "電子帳簿保存法 自動対応",
    body: "確定時にSHA-256ハッシュとタイムスタンプを自動付与。検索要件3項目（日付・金額・取引先）を標準搭載。",
  },
  {
    title: "監査ログ・内部統制",
    body: "全操作を改ざん不可なログに記録。管理者画面から日時・操作者・IPで絞り込み可能。",
  },
  {
    title: "ロールベース権限・マルチテナント",
    body: "管理者／発注担当／受注担当の3ロール。会社IDによるデータ分離を強制し、誤閲覧を防止。",
  },
]

const FAQ = [
  {
    q: "IT導入補助金の対象ツールですか？",
    a: "はい。デジタル化・AI導入補助金2026 インボイス枠（インボイス対応類型）の登録ITツールです。申請にはGビズIDプライム取得とSECURITY ACTION宣言が必要で、弊社で申請支援もご案内しています。",
  },
  {
    q: "既存システムからの移行はできますか？",
    a: "取引先マスタ・過去の発注／請求データはCSVでインポート可能です。Standard以上のプランでは初期データ移行の代行サービスもご提供します。",
  },
  {
    q: "無料トライアルはありますか？",
    a: "14日間の全機能無料トライアルをご用意しています。クレジットカード登録不要で、期間終了後の自動課金は発生しません。",
  },
  {
    q: "どのような業種で利用できますか？",
    a: "業種制限はありません。卸売・小売・製造・建設・IT・サービス業など、B2B取引で発注書／請求書を扱うあらゆる事業者でご利用いただけます。",
  },
  {
    q: "スマートフォンから使えますか？",
    a: "はい。レスポンシブWebデザインで、承認・閲覧操作はスマートフォンから快適に行えます。",
  },
  {
    q: "解約時のデータはどうなりますか？",
    a: "解約前であればCSV／JSONでエクスポート可能です。解約後は利用規約に定める保持期間（原則30日）経過後に完全削除されます。",
  },
]

export default function LandingPage() {
  return (
    <div className="text-slate-900">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#1a2332] text-white">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
            <div className="lg:col-span-3 space-y-6">
              <div className="flex flex-wrap gap-2 text-xs font-bold">
                <span className="rounded-full bg-orange-500 px-3 py-1 text-white">
                  IT導入補助金 2026 対応ツール
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-white">
                  インボイス制度対応
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-white">
                  電子帳簿保存法対応
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight">
                受発注業務を、<br />
                紙とメールから卒業しよう。
              </h1>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                インボイス制度も電子帳簿保存法も、ひとつのクラウドで。<br />
                発注書の作成・承認・請求・監査までを一気通貫でデジタル化する、
                業種を問わない受発注プラットフォーム。
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/subsidy"
                  className="inline-flex items-center justify-center rounded-sm bg-orange-500 px-6 py-3 text-sm font-bold text-white hover:bg-orange-600"
                >
                  IT導入補助金の詳細を見る
                </Link>
                <Link
                  href="#pricing"
                  className="inline-flex items-center justify-center rounded-sm border border-white/30 bg-white/5 px-6 py-3 text-sm font-bold text-white hover:bg-white/10"
                >
                  料金プランを見る
                </Link>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="rounded-lg bg-white/5 border border-white/10 p-5 text-sm">
                <p className="mb-3 text-xs uppercase tracking-widest text-orange-400 font-bold">
                  Dashboard Preview
                </p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/subsidy/dashboard.png"
                  alt="受発注Lシステム ダッシュボード画面"
                  className="w-full rounded-md border border-white/10"
                  data-screenshot-source="/"
                />
                <p className="mt-3 text-xs text-slate-400">
                  ダッシュボード：発注件数・請求件数・承認待ち件数・今月の発注金額を一覧表示
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-2xl sm:text-3xl font-black mb-10">
            まだこんな受発注業務、続けていませんか？
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                h: "紙・Excel・メールの受発注",
                p: "発注書のフォーマットが担当者ごとにバラバラ。承認印待ちで業務が何日も止まる。",
              },
              {
                h: "インボイス制度対応の負荷",
                p: "取引先が適格請求書発行事業者かどうか毎回調べて、税率の混在計算もミスが出る。",
              },
              {
                h: "電子帳簿保存法の未対応",
                p: "2024年1月に電子取引データの電子保存が義務化。紙・PDFのまま運用していて不安。",
              },
            ].map((c) => (
              <div key={c.h} className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="mb-2 font-bold text-slate-900">{c.h}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{c.p}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center text-base text-slate-700">
            これらの課題を、<strong className="text-orange-600">中小企業でもすぐに、最小コスト</strong>で
            解決するために設計したのが「受発注Lシステム」です。
          </p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-orange-500">Features</p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-black">主要機能</h2>
            <p className="mt-3 text-sm text-slate-600">
              受発注・請求業務の一連の流れを、1つのクラウドで完結
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-lg border border-slate-200 bg-white p-6 hover:shadow-md transition-shadow"
              >
                <h3 className="mb-2 text-base font-bold text-slate-900">{f.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="bg-slate-900 py-16 sm:py-20 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-orange-400">Compliance</p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-black">
              インボイス制度・電子帳簿保存法 両対応
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-lg bg-white/5 border border-white/10 p-6">
              <h3 className="mb-4 text-lg font-bold text-orange-400">インボイス制度対応</h3>
              <ul className="space-y-2 text-sm leading-relaxed text-slate-200">
                <li>✓ 適格請求書発行事業者登録番号（T＋13桁）の国税庁API自動検証</li>
                <li>✓ 標準税率10% / 軽減税率8% 混在計算対応</li>
                <li>✓ 免税事業者からの仕入は経過措置（80%→50%→0%）を自動適用</li>
                <li>✓ 控除可能／不可な税額を画面上で可視化</li>
                <li>✓ 適格請求書レイアウトでのPDF出力</li>
              </ul>
            </div>
            <div className="rounded-lg bg-white/5 border border-white/10 p-6">
              <h3 className="mb-4 text-lg font-bold text-orange-400">電子帳簿保存法対応</h3>
              <ul className="space-y-2 text-sm leading-relaxed text-slate-200">
                <li>✓ 確定時にSHA-256ハッシュ＋タイムスタンプを自動記録</li>
                <li>✓ 検索要件3項目（取引年月日・取引金額・取引先）を標準搭載</li>
                <li>✓ 監査ログに全操作履歴を保持</li>
                <li>✓ 電子取引要件（2024年1月義務化）に対応</li>
                <li>✓ スキャナ保存要件の解像度・タイムスタンプにも対応予定</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-orange-500">Pricing</p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-black">料金プラン</h2>
            <p className="mt-3 text-sm text-slate-600">
              IT導入補助金 インボイス枠の活用で、最大2年分のSaaS利用料＋初期費用が補助対象
            </p>
          </div>
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-4 py-3 text-left font-bold">プラン</th>
                  <th className="px-4 py-3 text-center font-bold">月額（税抜）</th>
                  <th className="px-4 py-3 text-center font-bold">ユーザー</th>
                  <th className="px-4 py-3 text-center font-bold">発注・請求件数</th>
                  <th className="px-4 py-3 text-center font-bold">サポート</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="px-4 py-3 font-bold">Starter</td>
                  <td className="px-4 py-3 text-center">¥125,000</td>
                  <td className="px-4 py-3 text-center">〜3名</td>
                  <td className="px-4 py-3 text-center">月100件</td>
                  <td className="px-4 py-3 text-center">メール</td>
                </tr>
                <tr className="bg-orange-50">
                  <td className="px-4 py-3 font-bold">Standard<span className="ml-2 rounded bg-orange-500 px-2 py-0.5 text-xs text-white">標準</span></td>
                  <td className="px-4 py-3 text-center font-bold">¥250,000</td>
                  <td className="px-4 py-3 text-center">〜10名</td>
                  <td className="px-4 py-3 text-center">月1,000件</td>
                  <td className="px-4 py-3 text-center">メール＋チャット</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-center text-sm text-slate-600">
            ※ いずれも初期費用なし／オプションなしのシンプル設計。年額契約で10%OFF。
          </p>
          <div className="mt-8 text-center">
            <Link
              href="/subsidy/pricing"
              className="inline-flex items-center rounded-sm border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-900 hover:bg-slate-50"
            >
              価格説明資料を見る（補助金申請用）
            </Link>
          </div>
        </div>
      </section>

      {/* Subsidy CTA Banner */}
      <section className="bg-gradient-to-br from-orange-500 to-orange-600 py-12 text-white">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="text-xl sm:text-2xl font-black">
            IT導入補助金 インボイス枠で、最大2年分の利用料が補助対象に。
          </h2>
          <p className="mt-3 text-sm opacity-90">
            受発注Lシステムは「インボイス対応類型（受発注機能）」の登録ITツールです。
            交付申請に必要な機能説明資料・価格説明資料はこちらから確認できます。
          </p>
          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/subsidy"
              className="inline-flex items-center justify-center rounded-sm bg-white px-6 py-3 text-sm font-bold text-orange-600 hover:bg-orange-50"
            >
              補助金活用ページを見る
            </Link>
            <Link
              href="/subsidy/requirements"
              className="inline-flex items-center justify-center rounded-sm border border-white bg-transparent px-6 py-3 text-sm font-bold text-white hover:bg-white/10"
            >
              Pコード・要件対応を確認
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-10 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-orange-500">FAQ</p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-black">よくあるご質問</h2>
          </div>
          <div className="space-y-4">
            {FAQ.map((item) => (
              <details
                key={item.q}
                className="group rounded-lg border border-slate-200 bg-white p-5"
              >
                <summary className="cursor-pointer font-bold text-slate-900 list-none flex items-start justify-between gap-3">
                  <span>{item.q}</span>
                  <span className="shrink-0 text-orange-500 group-open:rotate-45 transition-transform">＋</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-slate-900 py-16 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-black">
            受発注業務の生産性を、今日から上げよう。
          </h2>
          <p className="mt-4 text-sm text-slate-300 leading-relaxed">
            14日間の無料トライアルで、貴社の業務フローにどうフィットするかを確かめてください。
            IT導入補助金の活用をご検討の場合は、個別相談で最適プランをご提案します。
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <a
              href="mailto:sales@juhacchu-l.jp"
              className="inline-flex items-center justify-center rounded-sm bg-orange-500 px-6 py-3 text-sm font-bold text-white hover:bg-orange-600"
            >
              資料請求・導入相談
            </a>
            <Link
              href="/subsidy"
              className="inline-flex items-center justify-center rounded-sm border border-white/30 bg-transparent px-6 py-3 text-sm font-bold text-white hover:bg-white/10"
            >
              IT導入補助金の申請資料を見る
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
