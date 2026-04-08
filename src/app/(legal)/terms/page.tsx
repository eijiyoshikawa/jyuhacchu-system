import Link from "next/link"

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-6">
      <Link
        href="/"
        className="mb-6 inline-block text-sm text-blue-600 hover:text-blue-800 hover:underline"
      >
        &larr; 戻る
      </Link>

      <h1 className="mb-8 text-3xl font-bold text-gray-900">利用規約</h1>

      <p className="mb-8 text-sm text-gray-600">
        最終更新日: 2026年4月1日
      </p>

      <div className="space-y-8 text-gray-700">
        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            第1条（目的）
          </h2>
          <p className="leading-relaxed">
            本利用規約（以下「本規約」といいます）は、当社が提供する建設Lシステム（以下「本サービス」といいます）の利用条件を定めるものです。本サービスは、建設業における受発注業務のデジタル化を目的とし、発注・受注・請求・承認等のワークフローを電子的に管理することで、業務効率の向上を支援します。本サービスをご利用いただくすべてのユーザーは、本規約に同意したものとみなされます。
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            第2条（定義）
          </h2>
          <p className="mb-3 leading-relaxed">
            本規約において、以下の用語はそれぞれ以下の意味を有するものとします。
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>「当社」</strong>とは、本サービスを運営・提供する事業者をいいます。
            </li>
            <li>
              <strong>「ユーザー」</strong>とは、本サービスに利用登録を行い、本サービスを利用するすべての個人または法人をいいます。
            </li>
            <li>
              <strong>「本サービス」</strong>とは、当社が提供する建設Lシステムおよびこれに付随するすべてのサービスをいいます。
            </li>
            <li>
              <strong>「アカウント」</strong>とは、ユーザーが本サービスを利用するために必要な認証情報（メールアドレスおよびパスワード）をいいます。
            </li>
            <li>
              <strong>「協力会社」</strong>とは、本サービスにおいて発注先として登録された事業者をいいます。
            </li>
            <li>
              <strong>「案件」</strong>とは、本サービス上で管理される建設工事に関するプロジェクトをいいます。
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            第3条（利用登録）
          </h2>
          <ol className="list-decimal space-y-2 pl-6 leading-relaxed">
            <li>
              本サービスの利用を希望する者は、当社が定める方法により利用登録を申請するものとします。
            </li>
            <li>
              当社は、利用登録の申請者に以下の事由があると判断した場合、利用登録の申請を承認しないことがあります。
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>利用登録の申請に際して虚偽の事項を届け出た場合</li>
                <li>本規約に違反したことがある者からの申請である場合</li>
                <li>その他、当社が利用登録を相当でないと判断した場合</li>
              </ul>
            </li>
            <li>
              利用登録は、管理者権限を持つユーザーが新規ユーザーを登録する方法、または当社が直接登録する方法により行われます。
            </li>
          </ol>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            第4条（アカウント管理）
          </h2>
          <ol className="list-decimal space-y-2 pl-6 leading-relaxed">
            <li>
              ユーザーは、自己の責任においてアカウント情報（メールアドレスおよびパスワード）を適切に管理するものとします。
            </li>
            <li>
              ユーザーは、いかなる場合にも、アカウント情報を第三者に譲渡または貸与し、もしくは第三者と共用することはできません。
            </li>
            <li>
              当社は、メールアドレスとパスワードの組み合わせが登録情報と一致してログインされた場合には、そのアカウントを登録しているユーザー自身による利用とみなします。
            </li>
            <li>
              アカウント情報の管理不十分、第三者の使用等によって生じた損害に関する責任はユーザーが負うものとし、当社は一切の責任を負いません。
            </li>
          </ol>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            第5条（利用料金）
          </h2>
          <ol className="list-decimal space-y-2 pl-6 leading-relaxed">
            <li>
              本サービスは現在テストサービス期間中であり、当該期間中の利用料金は無料とします。
            </li>
            <li>
              テストサービス期間の終了後、有料サービスに移行する場合は、事前にユーザーに通知し、料金体系を別途定めるものとします。
            </li>
            <li>
              有料サービスへの移行に同意しないユーザーは、移行時点でサービスの利用を終了することができます。
            </li>
          </ol>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            第6条（禁止事項）
          </h2>
          <p className="mb-3 leading-relaxed">
            ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。
          </p>
          <ol className="list-decimal space-y-2 pl-6 leading-relaxed">
            <li>法令または公序良俗に違反する行為</li>
            <li>犯罪行為に関連する行為</li>
            <li>
              本サービスの他のユーザーまたは第三者の知的財産権、プライバシー権、名誉権その他の権利または利益を侵害する行為
            </li>
            <li>
              本サービスのサーバーまたはネットワークの機能を破壊したり、妨害したりする行為
            </li>
            <li>本サービスによって得られた情報を商業的に利用する行為（当社が許諾した場合を除く）</li>
            <li>当社のサービスの運営を妨害するおそれのある行為</li>
            <li>不正アクセスをし、またはこれを試みる行為</li>
            <li>他のユーザーに関する個人情報等を収集または蓄積する行為</li>
            <li>不正な目的を持って本サービスを利用する行為</li>
            <li>
              本サービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為
            </li>
            <li>虚偽の情報を登録する行為</li>
            <li>その他、当社が不適切と判断する行為</li>
          </ol>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            第7条（データの取扱い）
          </h2>
          <ol className="list-decimal space-y-2 pl-6 leading-relaxed">
            <li>
              本サービスにおいて作成・送受信される発注書、請求書等の電子データ（以下「電子記録」といいます）は、当社が管理するサーバーに保存されます。
            </li>
            <li>
              当社は、電子記録の保存について合理的な安全管理措置を講じますが、データの完全性、可用性について保証するものではありません。
            </li>
            <li>
              ユーザーは、重要なデータについては自己の責任においてバックアップを取得することを推奨します。
            </li>
            <li>
              本サービスの利用終了後、ユーザーのデータは当社のデータ保持ポリシーに従い、一定期間経過後に削除されます。
            </li>
            <li>
              当社は、個人を特定できない形式に加工した上で、本サービスの改善および統計的分析のためにデータを利用することがあります。
            </li>
          </ol>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            第8条（知的財産権）
          </h2>
          <ol className="list-decimal space-y-2 pl-6 leading-relaxed">
            <li>
              本サービスに関する知的財産権（著作権、特許権、商標権等を含みますが、これらに限りません）はすべて当社または当社にライセンスを許諾している者に帰属します。
            </li>
            <li>
              ユーザーは、本サービスを通じて提供されるコンテンツを、当社の事前の書面による承諾なく、複製、翻案、公衆送信、改変その他の利用をすることはできません。
            </li>
            <li>
              ユーザーが本サービス上で入力・登録したデータの知的財産権は、当該ユーザーまたは元の権利者に帰属します。
            </li>
          </ol>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            第9条（免責事項）
          </h2>
          <ol className="list-decimal space-y-2 pl-6 leading-relaxed">
            <li>
              本サービスは現在テストサービスとして提供されており、当社は本サービスの完全性、正確性、確実性、有用性等について一切保証するものではありません。
            </li>
            <li>
              テストサービスの性質上、本番環境での利用における損害（データの損失、業務の遅延、金銭的損失等を含みますが、これらに限りません）について、当社は一切の責任を負いません。
            </li>
            <li>
              当社は、本サービスに起因してユーザーに生じたあらゆる損害について、当社の故意または重大な過失がある場合を除き、一切の責任を負いません。
            </li>
            <li>
              当社は、本サービスの提供の中断、停止、終了、利用不能または変更、ユーザー情報の削除または消失、機器の故障または損傷その他本サービスに関連してユーザーが被った損害につき、当社に故意または重大な過失がある場合を除き、賠償する責任を負わないものとします。
            </li>
          </ol>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            第10条（サービスの変更・終了）
          </h2>
          <ol className="list-decimal space-y-2 pl-6 leading-relaxed">
            <li>
              当社は、ユーザーに事前に通知することなく、本サービスの内容を変更し、または本サービスの提供を中止することができるものとし、これによってユーザーに生じた損害について一切の責任を負いません。
            </li>
            <li>
              当社は、本サービスの終了に際しては、合理的な期間をもってユーザーに事前に通知するよう努めるものとします。
            </li>
          </ol>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            第11条（準拠法・管轄裁判所）
          </h2>
          <ol className="list-decimal space-y-2 pl-6 leading-relaxed">
            <li>本規約の解釈にあたっては、日本法を準拠法とします。</li>
            <li>
              本サービスに関して紛争が生じた場合には、東京地方裁判所を第一審の専属的合意管轄裁判所とします。
            </li>
          </ol>
        </section>

        <div className="border-t pt-6 text-sm text-gray-500">
          <p>以上</p>
          <p className="mt-2">制定日: 2026年4月1日</p>
        </div>
      </div>
    </div>
  )
}
