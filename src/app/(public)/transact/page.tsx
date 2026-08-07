import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "電子取引Lシステム｜招待型・無償アカウント発行の電子取引プラットフォーム",
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
    body: "発注側企業が電子取引Lシステムに申し込み。管理者アカウントを取得し、社内ユーザーと取引先招待の準備を行います。",
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
    a: "はい。CSVによる一括招待機能を提供予定です。既存の取引先マスタから招待対象を選択し、一括で招待メールを送付できます。",
  },
  {
    q: "解約時のデータはどうなりますか？",
    a: "解約前であればCSV／JSONでエクスポート可能です。解約後は利用規約に定める保持期間（原則30日）経過後に完全削除されます。受注側企業のアカウントは発注側の解約後も一定期間ご利用いただけます。",
  },
]

export default function TransactLandingPage() {
  return (
    <div className="text-slate-900">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0f1e2e] text-white">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
            <div className="lg:col-span-3 space-y-6">
              <div className="flex flex-wrap gap-2 text-xs font-bold">
                <span className="rounded-full bg-orange-500 px-3 py-1 text-white">
                  IT導入補助金 2026 電子取引類型 対応
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-white">
                  招待型・受注企業は完全無償
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-white">
                  電子帳簿保存法対応
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight">
                取引先を招待するだけで、<br />
                商取引を電子化。
              </h1>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                発注書・請求書の授受を紙とメールから解放。<br />
                発注側企業が取引先を招待し、受注企業は無償でアカウント発行。
                <strong className="text-orange-400">両社間の電子取引を一気通貫でデジタル化</strong>する
                クラウド型プラットフォーム。
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/transact/subsidy"
                  className="inline-flex items-center justify-center rounded-sm bg-orange-500 px-6 py-3 text-sm font-bold text-white hover:bg-orange-600"
                >
                  IT導入補助金の申請資料を見る
                </Link>
                <Link
                  href="#flow"
                  className="inline-flex items-center justify-center rounded-sm border border-white/30 bg-white/5 px-6 py-3 text-sm font-bold text-white hover:bg-white/10"
                >
                  導入までの流れを見る
                </Link>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="rounded-lg bg-white/5 border border-white/10 p-5 text-sm">
                <p className="mb-3 text-xs uppercase tracking-widest text-orange-400 font-bold">
                  Invitation Flow
                </p>
                <div className="space-y-3">
                  <div className="rounded-md bg-white/5 border border-white/10 p-3">
                    <p className="text-[10px] text-orange-300 font-bold">発注側企業</p>
                    <p className="text-white text-sm mt-1">取引先を招待</p>
                    <p className="text-slate-400 text-xs">会社名・メール入力 → URL発行</p>
                  </div>
                  <div className="text-center text-orange-400">↓ 招待URL送付</div>
                  <div className="rounded-md bg-orange-500/10 border border-orange-500/40 p-3">
                    <p className="text-[10px] text-orange-300 font-bold">受注側企業（無償）</p>
                    <p className="text-white text-sm mt-1">アカウント作成</p>
                    <p className="text-slate-400 text-xs">費用負担ゼロで利用開始</p>
                  </div>
                  <div className="text-center text-orange-400">↓</div>
                  <div className="rounded-md bg-white/5 border border-white/10 p-3">
                    <p className="text-[10px] text-orange-300 font-bold">電子取引成立</p>
                    <p className="text-white text-sm mt-1">発注書・請求書の電子授受</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-2xl sm:text-3xl font-black mb-10">
            紙とメールの取引で、こんな課題ありませんか？
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                h: "取引先ごとにフォーマット違い",
                p: "発注書・請求書のフォーマットが取引先ごとにバラバラ。転記ミス・確認漏れ・催促連絡が絶えない。",
              },
              {
                h: "受注側の導入コスト問題",
                p: "自社が電子化しても、取引先（受注側）が費用負担できないため電子化が進まず、結局紙運用が残る。",
              },
              {
                h: "電子帳簿保存法の未対応",
                p: "2024年1月に電子取引データの電子保存が義務化。紙・PDFメールのままでは要件を満たせない。",
              },
            ].map((c) => (
              <div key={c.h} className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="mb-2 font-bold text-slate-900">{c.h}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{c.p}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center text-base text-slate-700">
            これらの課題を、<strong className="text-orange-600">受注側企業に費用負担を求めず</strong>
            解決するために設計したのが「電子取引Lシステム」です。
          </p>
        </div>
      </section>

      {/* Flow */}
      <section id="flow" className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-orange-500">Flow</p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-black">導入までの4ステップ</h2>
            <p className="mt-3 text-sm text-slate-600">
              招待→受諾→電子取引開始まで、最短即日
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {FLOW.map((f) => (
              <div key={f.step} className="rounded-lg border border-slate-200 bg-white p-6">
                <p className="text-xs font-bold text-orange-500">{f.step}</p>
                <h3 className="mt-2 text-base font-bold text-slate-900">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 sm:py-20 bg-slate-50">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-orange-500">Features</p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-black">主要機能</h2>
            <p className="mt-3 text-sm text-slate-600">
              発注・請求の電子授受と両社間コミュニケーションを、1つのプラットフォームで
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
              電子帳簿保存法・インボイス制度 完全対応
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-lg bg-white/5 border border-white/10 p-6">
              <h3 className="mb-4 text-lg font-bold text-orange-400">電子取引データ保存</h3>
              <ul className="space-y-2 text-sm leading-relaxed text-slate-200">
                <li>✓ 確定時にSHA-256ハッシュ＋タイムスタンプ自動記録</li>
                <li>✓ 検索要件3項目（取引年月日・取引金額・取引先）標準搭載</li>
                <li>✓ 訂正・削除履歴を改ざん不可なログに保持</li>
                <li>✓ 検索性・見読性・完全性の3要件を満たす保存フォーマット</li>
                <li>✓ 電子取引要件（2024年1月義務化）完全対応</li>
              </ul>
            </div>
            <div className="rounded-lg bg-white/5 border border-white/10 p-6">
              <h3 className="mb-4 text-lg font-bold text-orange-400">インボイス制度対応</h3>
              <ul className="space-y-2 text-sm leading-relaxed text-slate-200">
                <li>✓ 適格請求書発行事業者登録番号を国税庁Web-APIで自動検証</li>
                <li>✓ 標準税率10% / 軽減税率8% 混在計算対応</li>
                <li>✓ 免税事業者からの仕入は経過措置を自動適用</li>
                <li>✓ 適格請求書レイアウトでのPDF出力</li>
                <li>✓ 電子交付・電子受領のいずれもインボイス要件を満たす</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Subsidy CTA Banner */}
      <section className="bg-gradient-to-br from-orange-500 to-orange-600 py-12 text-white">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="text-xl sm:text-2xl font-black">
            IT導入補助金 電子取引類型で、最大2年分のクラウド利用料を補助対象に。
          </h2>
          <p className="mt-3 text-sm opacity-90">
            電子取引Lシステムは「インボイス枠 電子取引類型」の登録ITツールです。
            補助上限額 最大350万円、補助率 中小企業 2/3。
          </p>
          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/transact/subsidy"
              className="inline-flex items-center justify-center rounded-sm bg-white px-6 py-3 text-sm font-bold text-orange-600 hover:bg-orange-50"
            >
              補助金活用ページを見る
            </Link>
            <Link
              href="/transact/subsidy/requirements"
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
            取引先の電子化、うちが主導しませんか。
          </h2>
          <p className="mt-4 text-sm text-slate-300 leading-relaxed">
            受注側企業に費用負担を求めないから、電子化が進む。
            IT導入補助金 電子取引類型の活用で、貴社の商取引デジタル化を強力に後押しします。
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <a
              href="mailto:transact@juhacchu-l.jp"
              className="inline-flex items-center justify-center rounded-sm bg-orange-500 px-6 py-3 text-sm font-bold text-white hover:bg-orange-600"
            >
              資料請求・導入相談
            </a>
            <Link
              href="/transact/subsidy"
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
