import Link from "next/link"
import {
  DENSHI_PLANS,
  STANDARD_PLAN,
  jpy,
  yearly,
} from "@/app/(public)/transact/subsidy/_components/denshi-plans"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "電子取引くん｜招待型・無償アカウント発行の電子取引プラットフォーム",
  description:
    "発注側企業が取引先（受注側企業）を無償招待し、発注書・請求書等の商取引情報を電子で授受できるクラウド型電子取引プラットフォーム。IT導入補助金（デジタル化・AI導入補助金2026）インボイス枠 電子取引類型 対応。",
}

const FEATURES = [
  {
    title: "招待型・受注企業は完全無償",
    body: "発注側企業が取引先を招待するだけで、受注側企業はワンクリックでアカウント発行。受注側は費用負担ゼロで発注書受領・請求書提出等の電子取引を利用可能。",
  },
  {
    title: "電子で完結する発注・請求授受",
    body: "紙・PDF・メール添付・FAXを撤廃し、システム上で発注書送付／受領・請求書提出／受領・承認ワークフローが完結。締め処理までワンフローで進行。",
  },
  {
    title: "取引先マスタ＋インボイス番号自動検証",
    body: "取引先の適格請求書発行事業者登録番号（T＋13桁）を国税庁Web-APIで自動照合。免税事業者判定・経過措置適用まで自動化。",
  },
  {
    title: "電子帳簿保存法・電子取引要件対応",
    body: "確定時にSHA-256ハッシュとタイムスタンプを自動付与。検索要件3項目（日付・金額・取引先）を標準搭載し、電子取引データ保存義務に完全対応。",
  },
  {
    title: "多段階承認・ロールベース権限",
    body: "発注側・受注側それぞれに管理者／担当者ロールを配置。承認フロー・閲覧範囲を細かく制御し、内部統制と操作ミスを両立防止。",
  },
  {
    title: "監査ログ・改ざん検知",
    body: "全操作を改ざん不可なログに記録。誰が・いつ・何を承認したか、どの発注書が受領されたかを完全追跡。",
  },
]

const FLOW = [
  {
    step: "STEP 1",
    title: "発注側企業が導入",
    body: "発注側企業が電子取引くんに申し込み。管理者アカウントを取得し、社内ユーザーと取引先招待の準備を行います。",
  },
  {
    step: "STEP 2",
    title: "取引先を無償招待",
    body: "管理画面の「取引先招待」から、取引先の会社名・担当者メールアドレスを入力し、招待URLを発行。取引先へメール等で送付します。",
  },
  {
    step: "STEP 3",
    title: "受注側企業がアカウント作成（費用ゼロ）",
    body: "受注側企業は招待URLから会社情報・担当者情報を入力し、無償でアカウントを作成。以降、両社間で電子取引が可能になります。",
  },
  {
    step: "STEP 4",
    title: "電子で発注・受注・請求の授受",
    body: "発注書送付／受領・請求書提出／受領・承認・締めまで、システム上で完結。紙・メール・押印を撤廃した電子取引が実現します。",
  },
]

const FAQ = [
  {
    q: "IT導入補助金の対象ツールですか？",
    a: "はい。デジタル化・AI導入補助金2026 インボイス枠（電子取引類型）の登録ITツールです。補助上限額は最大350万円、補助率は中小企業2/3・小規模事業者1/2、最大2年分のクラウド利用料を補助対象にできます。",
  },
  {
    q: "受注側企業の費用負担は本当にゼロですか？",
    a: "はい。本ツールは「発注側企業が費用負担し、受注側企業は無償でアカウント発行を受ける」電子取引プラットフォーム型を採用しています。招待を受けた受注企業側にはシステム利用料・アカウント発行料・月額費用等、一切請求されません。",
  },
  {
    q: "受注企業側は招待を受けたら必ず使わないといけませんか？",
    a: "招待は任意ですので、受注企業が招待を辞退することも可能です。招待URLは30日間有効で、期限内に受諾しない場合は自動的に期限切れとなり、以降は使用できません。",
  },
  {
    q: "電子帳簿保存法・電子取引要件に対応していますか？",
    a: "はい。確定した発注書・請求書に対して SHA-256 ハッシュ＋タイムスタンプを自動付与し、日付・金額・取引先の3項目で検索可能な状態で保存します。2024年1月に義務化された電子取引データの電子保存要件を満たしています。",
  },
  {
    q: "既存の取引先が多数いるのですが、まとめて招待できますか？",
    a: "招待は1社ずつ発行しますが、発行できる件数に制限はありません（契約プランの上限数まで）。発行済みの招待は一覧でステータス（招待中／受諾済／取消／期限切れ）を管理でき、取消も行えます。",
  },
  {
    q: "解約時のデータはどうなりますか？",
    a: "解約前であればCSV／JSONでエクスポート可能です。解約後は利用規約に定める保持期間（原則30日）経過後に完全削除されます。受注側企業のアカウントは発注側の解約後も一定期間ご利用いただけます。",
  },
]

export default function TransactLandingPage() {
  return (
    <div className="text-slate-900">
      {/* ── Hero: 左コピー + 右に招待フローのミニカード ── */}
      <section className="bg-slate-950 text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:py-24">
          <div>
            <p className="inline-block border border-teal-400/60 px-3 py-1 text-[11px] font-bold tracking-widest text-teal-300">
              インボイス枠 電子取引類型 対応ITツール
            </p>
            <h1 className="mt-5 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
              取引先を<span className="text-teal-300">無償で招待</span>して、
              <br />
              発注から請求までを電子化する。
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
              発注側企業が取引先（受注側企業）に無償でアカウントを発行し、
              発注書・請求書を両社間で電子的に授受できるクラウド型の電子取引プラットフォームです。
              受注側企業の費用負担はありません。
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#flow"
                className="rounded-lg bg-teal-500 px-6 py-3 text-sm font-bold text-slate-950 hover:bg-teal-400"
              >
                導入の流れを見る
              </Link>
              <Link
                href="mailto:sales@aigrowthx.pro"
                className="rounded-lg border border-slate-600 px-6 py-3 text-sm font-bold text-white hover:bg-slate-800"
              >
                資料請求・お問い合わせ
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
            <p className="text-xs font-bold tracking-widest text-teal-300">招待から電子取引まで</p>
            <ol className="mt-4 space-y-4">
              {[
                ["発注側が招待URLを発行", "取引先の会社名とメールアドレスを入力するだけ"],
                ["受注側が受諾・アカウント作成", "費用負担ゼロ。ブラウザだけで完了"],
                ["両社間で発注書・請求書を授受", "紙・FAX・押印は不要"],
              ].map(([t, d], i) => (
                <li key={t} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-teal-400 text-sm font-black text-teal-300">
                    {i + 1}
                  </span>
                  <span>
                    <span className="block text-sm font-bold">{t}</span>
                    <span className="block text-xs text-slate-400">{d}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── 数字で見る ── */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-px bg-slate-200 px-6 py-0 sm:grid-cols-3">
          {[
            ["0円", "受注側企業の利用料", "アカウント発行料・月額利用料とも発生しません"],
            [`${STANDARD_PLAN.partnerAccountLimit}社`, "招待できる取引先数（標準プラン）", "上限なく発行できる契約は提供していません"],
            ["3項目", "電帳法の検索要件に標準対応", "取引年月日・取引金額・取引先で横断検索"],
          ].map(([n, t, d]) => (
            <div key={t} className="bg-white px-2 py-10 text-center">
              <p className="text-4xl font-black text-teal-700">{n}</p>
              <p className="mt-2 text-sm font-bold">{t}</p>
              <p className="mt-1 text-xs text-slate-500">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 課題と解決（2カラム対比） ── */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionLabel no="01" title="取引先の電子化が進まない理由" />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="border-2 border-slate-300 p-6">
              <p className="mb-4 text-sm font-black text-slate-500">これまでの課題</p>
              <ul className="space-y-3 text-sm leading-relaxed">
                {[
                  "取引先にシステム利用料を負担してもらえず、電子化に協力を得られない",
                  "発注書はメール、請求書は郵送と、書類ごとに経路がばらばら",
                  "2024年1月に義務化された電子取引データの電子保存に対応できていない",
                  "適格請求書発行事業者登録番号の確認を目視で行っている",
                ].map((t) => (
                  <li key={t} className="flex gap-2">
                    <span className="text-slate-400">×</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-2 border-teal-700 p-6">
              <p className="mb-4 text-sm font-black text-teal-700">電子取引くんの解決</p>
              <ul className="space-y-3 text-sm leading-relaxed">
                {[
                  "受注側企業のアカウントは無償。取引先に費用負担を求めません",
                  "発注書・請求書の授受を同一プラットフォーム上で完結",
                  "確定時に SHA-256 ハッシュとタイムスタンプを自動付与して保存",
                  "登録番号を国税庁Web-APIで自動照合し、経過措置も自動適用",
                ].map((t) => (
                  <li key={t} className="flex gap-2">
                    <span className="font-black text-teal-700">○</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 主要機能（番号付きリスト） ── */}
      <section id="features" className="border-y border-slate-200 bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionLabel no="02" title="主要機能" />
          <div className="mt-8 grid gap-x-10 gap-y-8 md:grid-cols-2">
            {FEATURES.map((f, i) => (
              <div key={f.title} className="border-l-4 border-teal-700 pl-5">
                <p className="text-xs font-black text-teal-700">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-1 text-base font-bold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 導入フロー（横型ステッパー） ── */}
      <section id="flow" className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionLabel no="03" title="導入までの4ステップ" />
          <ol className="mt-8 grid gap-6 md:grid-cols-4">
            {FLOW.map((f, i) => (
              <li key={f.step} className="relative">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-950 text-sm font-black text-teal-300">
                    {i + 1}
                  </span>
                  {i < FLOW.length - 1 && (
                    <span className="hidden h-px flex-1 bg-slate-300 md:block" />
                  )}
                </div>
                <h3 className="mt-3 text-sm font-bold">{f.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">{f.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── 料金プラン ── */}
      <section id="pricing" className="border-y border-slate-200 bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionLabel no="04" title="料金プラン" />
          <p className="mt-4 text-sm text-slate-600">
            発注側企業のみの課金です。初期費用・オプション費用はありません。
            プラン間で機能差はなく、招待できる取引先数と月次取引件数の上限のみが異なります。
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {DENSHI_PLANS.map((pl) => (
              <div
                key={pl.name}
                className="flex flex-col border-2 border-slate-900 bg-white p-6"
              >
                <p className="text-sm font-black">{pl.name}</p>
                <p className="mt-4 text-3xl font-black">
                  {jpy(pl.monthly)}
                  <span className="text-sm font-bold text-slate-500">／月（税抜）</span>
                </p>
                <p className="mt-1 text-xs text-slate-500">年額 {jpy(yearly(pl))}（税抜）</p>
                <dl className="mt-5 space-y-2 border-t border-slate-200 pt-4 text-xs">
                  <div className="flex justify-between">
                    <dt className="text-slate-500">招待できる取引先</dt>
                    <dd className="font-bold">{pl.partnerAccountLimit}社まで</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-500">月次取引件数</dt>
                    <dd className="font-bold">
                      {pl.monthlyTransactionLimit.toLocaleString("ja-JP")}件まで
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-500">受注側企業の利用料</dt>
                    <dd className="font-bold text-teal-700">0円</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 補助金 ── */}
      <section className="bg-slate-950 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs font-bold tracking-widest text-teal-300">IT導入補助金</p>
          <h2 className="mt-2 text-2xl font-black sm:text-3xl">
            デジタル化・AI導入補助金2026 インボイス枠（電子取引類型）の登録ITツールです
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-300">
            補助上限額 最大350万円、補助率 中小企業 2/3・小規模事業者 1/2。
            クラウド利用料は最大2年分を補助対象経費として申請できます。
            交付申請に必要な資料のご用意も、IT導入支援事業者としてお手伝いします。
          </p>
          <Link
            href="mailto:transact@aigrowthx.pro"
            className="mt-8 inline-block rounded-lg bg-teal-500 px-6 py-3 text-sm font-bold text-slate-950 hover:bg-teal-400"
          >
            補助金の活用について相談する
          </Link>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <SectionLabel no="05" title="よくあるご質問" />
          <dl className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
            {FAQ.map((f) => (
              <div key={f.q} className="py-6">
                <dt className="flex gap-3 text-sm font-bold">
                  <span className="text-teal-700">Q.</span>
                  {f.q}
                </dt>
                <dd className="mt-2 flex gap-3 text-sm leading-relaxed text-slate-600">
                  <span className="font-bold text-slate-400">A.</span>
                  {f.a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t-4 border-teal-700 bg-white py-14">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-black sm:text-2xl">
              取引先を無償で招待して、電子取引をはじめませんか。
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              導入のご相談・お見積り・デモのご依頼を承っています。
            </p>
          </div>
          <Link
            href="mailto:sales@aigrowthx.pro"
            className="shrink-0 rounded-lg bg-slate-950 px-8 py-4 text-sm font-bold text-white hover:bg-slate-800"
          >
            お問い合わせ
          </Link>
        </div>
      </section>
    </div>
  )
}

/** 番号付きの区切り見出し（受発注L版の中央寄せ見出しとは別形状） */
function SectionLabel({ no, title }: { no: string; title: string }) {
  return (
    <div className="flex items-end gap-4 border-b-2 border-slate-900 pb-3">
      <span className="text-3xl font-black text-teal-700">{no}</span>
      <h2 className="text-2xl font-black sm:text-3xl">{title}</h2>
    </div>
  )
}
