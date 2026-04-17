import Link from "next/link"

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-4xl px-6">
      <Link
        href="/"
        className="mb-6 inline-block text-sm text-blue-600 hover:text-blue-800 hover:underline"
      >
        &larr; 戻る
      </Link>

      <h1 className="mb-8 text-3xl font-bold text-gray-900">
        プライバシーポリシー
      </h1>

      <p className="mb-8 text-sm text-gray-600">
        最終更新日: 2026年4月1日
      </p>

      <p className="mb-8 leading-relaxed text-gray-700">
        当社は、受発注Lシステム（以下「本サービス」といいます）の提供にあたり、ユーザーの個人情報の保護を重要な責務と認識し、個人情報の保護に関する法律（個人情報保護法）およびその他の関連法令を遵守します。本プライバシーポリシーは、本サービスにおける個人情報の取扱いについて定めるものです。
      </p>

      <div className="space-y-8 text-gray-700">
        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            1. 個人情報の収集
          </h2>
          <p className="mb-3 leading-relaxed">
            当社は、本サービスの提供にあたり、以下の個人情報を収集することがあります。
          </p>
          <ul className="list-disc space-y-2 pl-6 leading-relaxed">
            <li>
              <strong>氏名</strong>: ユーザーの識別およびサービス内での表示に使用します。
            </li>
            <li>
              <strong>メールアドレス</strong>: アカウント認証、ログイン、通知の送信に使用します。
            </li>
            <li>
              <strong>会社情報</strong>: 所属企業名、部署名、役職等、業務上の連絡および権限管理に使用します。
            </li>
            <li>
              <strong>利用ログ</strong>: アクセス日時、操作内容、IPアドレス、ブラウザ情報等、サービスの安定運用およびセキュリティ確保のために記録します。
            </li>
            <li>
              <strong>業務データ</strong>: 発注情報、請求情報、案件情報等、本サービスの機能提供に必要なデータを収集します。
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            2. 利用目的
          </h2>
          <p className="mb-3 leading-relaxed">
            当社は、収集した個人情報を以下の目的で利用します。
          </p>
          <ol className="list-decimal space-y-2 pl-6 leading-relaxed">
            <li>本サービスの提供、運営、および維持管理</li>
            <li>ユーザー認証およびアカウント管理</li>
            <li>ユーザーからのお問い合わせへの対応およびサポートの提供</li>
            <li>本サービスの改善、新機能の開発、およびユーザー体験の向上</li>
            <li>利用状況の統計的分析（個人を特定しない形式で実施）</li>
            <li>本規約に違反する行為への対応</li>
            <li>法令に基づく対応</li>
            <li>その他上記の利用目的に付随する目的</li>
          </ol>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            3. 第三者提供
          </h2>
          <p className="mb-3 leading-relaxed">
            当社は、以下の場合を除き、あらかじめユーザーの同意を得ることなく、個人情報を第三者に提供することは原則として行いません。
          </p>
          <ol className="list-decimal space-y-2 pl-6 leading-relaxed">
            <li>法令に基づく場合</li>
            <li>
              人の生命、身体または財産の保護のために必要がある場合であって、本人の同意を得ることが困難であるとき
            </li>
            <li>
              公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって、本人の同意を得ることが困難であるとき
            </li>
            <li>
              国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき
            </li>
          </ol>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            4. 安全管理措置
          </h2>
          <p className="mb-3 leading-relaxed">
            当社は、個人情報の漏洩、滅失、毀損の防止その他の安全管理のために、以下の措置を講じます。
          </p>
          <ul className="list-disc space-y-2 pl-6 leading-relaxed">
            <li>
              <strong>通信の暗号化</strong>: すべての通信はSSL/TLSにより暗号化されています。
            </li>
            <li>
              <strong>データの暗号化</strong>: パスワード等の機密情報は暗号化して保存します。
            </li>
            <li>
              <strong>アクセス制御</strong>: 個人情報へのアクセスは、業務上必要な担当者のみに制限します。ユーザーの役割に応じたアクセス権限管理を実施します。
            </li>
            <li>
              <strong>監査ログ</strong>: システムへのアクセスおよび重要な操作について監査ログを記録し、不正アクセスの検知および追跡を可能にします。
            </li>
            <li>
              <strong>定期的な見直し</strong>: セキュリティ対策は定期的に見直し、必要に応じて改善を行います。
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            5. 個人情報の開示・訂正・削除
          </h2>
          <ol className="list-decimal space-y-2 pl-6 leading-relaxed">
            <li>
              ユーザーは、当社に対して自己の個人情報の開示を請求することができます。開示請求があった場合、当社は本人確認を行った上で、遅滞なく開示を行います（当該個人情報が存在しない場合はその旨を通知します）。
            </li>
            <li>
              ユーザーは、自己の個人情報に誤りがある場合、当社が定める手続きにより、個人情報の訂正、追加または削除を請求することができます。
            </li>
            <li>
              ユーザーは、自己の個人情報の利用停止または消去を請求することができます。当社は、請求に理由があると判断した場合、遅滞なく対応し、その結果を通知します。
            </li>
            <li>
              本サービス上のアカウント設定画面から、ユーザー自身が一部の個人情報を確認・修正することも可能です。
            </li>
          </ol>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            6. Cookieの使用
          </h2>
          <p className="mb-3 leading-relaxed">
            本サービスでは、以下の目的でCookieを使用します。
          </p>
          <ul className="list-disc space-y-2 pl-6 leading-relaxed">
            <li>
              <strong>セッション管理</strong>: ユーザーのログイン状態を維持し、安全なサービス利用を実現するために使用します。
            </li>
            <li>
              <strong>セキュリティ</strong>: 不正アクセスの防止およびCSRF対策のために使用します。
            </li>
          </ul>
          <p className="mt-3 leading-relaxed">
            ユーザーはブラウザの設定によりCookieの受け入れを拒否することができますが、その場合、本サービスの一部の機能がご利用いただけなくなる場合があります。
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            7. お問い合わせ窓口
          </h2>
          <p className="leading-relaxed">
            個人情報の取扱いに関するお問い合わせは、以下の窓口までご連絡ください。
          </p>
          <div className="mt-3 rounded-sm bg-gray-100 p-4 text-sm">
            <p>受発注Lシステム 個人情報お問い合わせ窓口</p>
            <p className="mt-1">
              メール: <span className="text-blue-600">privacy@example.co.jp</span>
            </p>
            <p className="mt-1">受付時間: 平日 9:00〜17:00（土日祝日・年末年始を除く）</p>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            8. プライバシーポリシーの変更
          </h2>
          <ol className="list-decimal space-y-2 pl-6 leading-relaxed">
            <li>
              当社は、必要に応じて本プライバシーポリシーを変更することがあります。
            </li>
            <li>
              変更後のプライバシーポリシーは、本サービス上に掲載した時点から効力を生じるものとします。
            </li>
            <li>
              重要な変更を行う場合は、本サービス上での通知、またはメールにてユーザーにお知らせします。
            </li>
            <li>
              変更後も本サービスの利用を継続した場合、ユーザーは変更後のプライバシーポリシーに同意したものとみなされます。
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
