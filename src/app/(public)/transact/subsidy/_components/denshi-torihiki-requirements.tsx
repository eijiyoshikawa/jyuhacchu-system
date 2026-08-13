/**
 * ITツール登録要領「2-3 各カテゴリーの内容（1）カテゴリー1（ソフトウェア）
 * インボイス枠（電子取引類型）の補助対象となるソフトウェアに関する留意事項」の
 * 各要件と、本ITツールの適合内容。
 *
 * 審査では機能説明資料・価格説明資料の双方から「インボイス枠（電子取引類型）の
 * 対象ITツールであること」を確認するため、両資料で同一の要件番号・同一の要件文言を用いる。
 * requirement の文言は登録要領／申請フォームの表記そのままとし、変更しないこと
 * （表記を言い換えると審査員が該当項目を発見できず「確認できない」と判定される）。
 */

export type DenshiRequirement = {
  no: string
  /** 登録要領・申請フォームの要件文言（言い換え禁止） */
  requirement: string
  /** 機能面の実装内容 */
  implementation: string
  /** 機能説明資料での該当箇所 */
  featureRef: string
  /** 価格説明資料・契約条件での確認箇所 */
  priceRef: string
  /** 価格・契約面で直接確認できる要件（価格説明資料でハイライト表示する） */
  priceCritical?: boolean
}

export const SCHEME_NOTE_TITLE =
  "ITツール登録要領 2-3 各カテゴリーの内容（1）カテゴリー1（ソフトウェア）" +
  "「インボイス枠（電子取引類型）の補助対象となるソフトウェアに関する留意事項」"

export const DENSHI_REQUIREMENTS: DenshiRequirement[] = [
  {
    no: "①",
    requirement: "インボイス制度に対応した受発注の機能を有すること",
    implementation:
      "発注書の起票・多段階承認・発行から、受注側企業による適格請求書の作成・提出、発注側での受領・承認・支払ステータス管理までを一貫して電子化。適格請求書発行事業者登録番号（T＋13桁）を国税庁Web-APIで自動検証し、税率別合計・免税事業者の経過措置（80%→50%→0%）を自動適用した適格請求書を PDF／CSV 出力する。",
    featureRef:
      "「本ITツールは『受発注機能』を有します」ページ／§3-2 発注管理機能／§3-4 請求管理機能／§3-5 インボイス制度対応",
    priceRef: "全プランに標準搭載（オプション課金なし）",
  },
  {
    no: "②",
    requirement:
      "取引関係における発注者側としてソフトウェアを導入する者が、当該取引関係における受注者側に対してアカウントを無償で発行し、利用させることのできる機能を有するクラウド型のソフトウェアであること",
    implementation:
      "発注側企業の管理者が「取引先招待」画面から招待URL（有効期限30日）を発行し、受注側企業は招待受諾ページから自社の会社情報・管理者情報を入力してアカウントを作成する。本ITツールは Webブラウザのみで利用するクラウド型（SaaS）であり、受注側企業のサーバ構築・インストール作業は不要。",
    featureRef: "§3-1 招待管理機能／§4 業務フロー図［図1］／Fig.2 取引先招待画面・Fig.3 招待受諾ページ",
    priceRef:
      "利用料は発注側企業にのみ請求。受注側企業のアカウント発行料・月額利用料等は一切発生しない（0円）",
    priceCritical: true,
  },
  {
    no: "③",
    requirement:
      "発注者側のアカウントと受注者側のアカウントで機能が明確に分かれており、発注者側の機能には、発行した受注者側のアカウントとその利用者の状況が管理できる機能を有すること",
    implementation:
      "会社種別（発注側／受注側）とロール（管理者／発注担当／受注担当）により、メニュー・操作権限・データ参照範囲を明確に分離。発注側管理者は「取引先招待」画面の発行済み招待一覧で、招待先企業名・担当者名・メールアドレス・ステータス（招待中／受諾済／取消／期限切れ）・発行日・有効期限を一覧管理でき、招待の取消も行える。",
    featureRef: "§3-1 招待管理機能（発行済み招待一覧・ステータス管理）／§3-7 承認ワークフロー・権限管理／Fig.2",
    priceRef: "全プランで同一機能を提供（プランによる機能差なし）",
  },
  {
    no: "④",
    requirement:
      "発注者側が受注者側との取引内容を一元管理（契約・発注、請求等）できる機能を有すること（例：契約管理、案件管理、業務進捗管理機能、請求管理、発注管理、プロジェクト管理、タレントマネジメント機能、委託先評価機能など）",
    implementation:
      "案件（契約単位）→ 発注書 → 納品・検収 → 請求書 → 支払 を同一データベース上で相互に関連付けて一元管理。案件管理・発注管理・請求管理・承認（業務進捗）管理・取引先管理を標準搭載し、案件別の発注金額／請求金額の集計も行える。",
    featureRef: "§3-2 発注管理機能／§3-3 取引先管理機能／§3-4 請求管理機能／§4 業務フロー図［図1］",
    priceRef: "全機能を標準提供（初期費用・カスタマイズ費用・オプション費用なし）",
  },
  {
    no: "⑤",
    requirement:
      "発注者側が受注者側の適格請求書発行事業者登録番号（インボイス管理番号）を管理する機能を有すること",
    implementation:
      "取引先マスタに適格請求書発行事業者登録番号（インボイス管理番号）欄を標準搭載し、国税庁Web-APIで登録番号の有効性と登録事業者名を自動照合。取引先一覧画面で全取引先の登録番号を一覧確認でき、請求書出力時には当該登録番号を自動転記する。",
    featureRef: "§3-3 取引先管理機能／§3-5 インボイス制度対応／Fig.6 取引先一覧（インボイス番号表示）",
    priceRef: "全プランに標準搭載（国税庁API連携の従量課金なし）",
  },
  {
    no: "⑥",
    requirement: "受注者側のアカウントを上限なく発行できる契約ではないこと",
    implementation:
      "契約プランごとに受注側アカウントの発行上限数（標準プラン200社／ミドルプラン100社／最小プラン50社）を定めており、上限を超えるアカウント発行は行えない。上限の変更は契約更新時のプラン変更によってのみ可能。",
    featureRef: "§3-1 招待管理機能",
    priceRef:
      "「ITツールの価格」内のプラン別上限表（受注側アカウント発行上限・月次取引件数上限）に明記。上限なく発行できる契約は提供していない",
    priceCritical: true,
  },
]

/**
 * 機能説明資料 向け：要件 × 実装内容 × 本資料の該当箇所
 */
export function DenshiRequirementTableForFeature() {
  return (
    <table className="w-full border-collapse text-sm">
      <thead>
        <tr>
          <th className="border-2 border-black bg-black text-white px-2 py-2 text-center text-sm font-bold w-10">
            No
          </th>
          <th className="border-2 border-black bg-black text-white px-3 py-2 text-left text-sm font-bold w-64">
            登録要領 留意事項 の要件
          </th>
          <th className="border-2 border-black bg-black text-white px-2 py-2 text-center text-sm font-bold w-16">
            適合
          </th>
          <th className="border-2 border-black bg-black text-white px-3 py-2 text-left text-sm font-bold">
            本ITツールでの実装内容 ／ 本資料の該当箇所
          </th>
        </tr>
      </thead>
      <tbody>
        {DENSHI_REQUIREMENTS.map((r) => (
          <tr key={r.no} className="bg-yellow-50">
            <td className="border-2 border-black px-2 py-2 text-center text-xl font-black align-top">
              {r.no}
            </td>
            <td className="border-2 border-black px-3 py-2 text-xs font-bold leading-relaxed align-top">
              {r.requirement}
            </td>
            <td className="border-2 border-black px-2 py-2 text-center text-3xl font-black align-top">
              ◎
            </td>
            <td className="border-2 border-black px-3 py-2 text-xs leading-relaxed align-top">
              {r.implementation}
              <br />
              <span className="mt-1 inline-block border-2 border-black bg-white px-2 py-0.5 text-[11px] font-bold">
                該当箇所: {r.featureRef}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

/**
 * 価格説明資料 向け：要件 × 価格・契約面での確認箇所 × 機能面の該当箇所
 */
export function DenshiRequirementTableForPricing() {
  return (
    <table className="w-full border-collapse text-sm">
      <thead>
        <tr>
          <th className="border-2 border-black bg-black text-white px-2 py-2 text-center text-sm font-bold w-10">
            No
          </th>
          <th className="border-2 border-black bg-black text-white px-3 py-2 text-left text-sm font-bold w-64">
            登録要領 留意事項 の要件
          </th>
          <th className="border-2 border-black bg-black text-white px-2 py-2 text-center text-sm font-bold w-16">
            適合
          </th>
          <th className="border-2 border-black bg-black text-white px-3 py-2 text-left text-sm font-bold">
            本資料（価格・契約条件）での確認箇所 ／ 機能説明資料の該当箇所
          </th>
        </tr>
      </thead>
      <tbody>
        {DENSHI_REQUIREMENTS.map((r) => (
          <tr key={r.no} className={r.priceCritical ? "bg-yellow-100" : undefined}>
            <td className="border-2 border-black px-2 py-2 text-center text-xl font-black align-top">
              {r.no}
            </td>
            <td className="border-2 border-black px-3 py-2 text-xs font-bold leading-relaxed align-top">
              {r.requirement}
            </td>
            <td className="border-2 border-black px-2 py-2 text-center text-3xl font-black align-top">
              ◎
            </td>
            <td className="border-2 border-black px-3 py-2 text-xs leading-relaxed align-top">
              {r.priceCritical ? (
                <strong className="bg-yellow-200 border-2 border-black px-1">
                  【本資料で確認可】{r.priceRef}
                </strong>
              ) : (
                <>本資料での扱い: {r.priceRef}</>
              )}
              <br />
              <span className="mt-1 inline-block border-2 border-black bg-white px-2 py-0.5 text-[11px] font-bold">
                機能説明資料 該当箇所: {r.featureRef}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
