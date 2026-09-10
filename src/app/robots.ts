import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          // IT導入補助金 申請資料は審査員向けの経路のため検索結果に出さない
          // （受発注Lシステム・電子取引くんの双方を対称に扱う）
          "/subsidy",
          "/subsidy/",
          "/transact/subsidy",
          "/transact/subsidy/",
          "/ai-tools/",
          // 招待受諾ページはトークン付きの個別URLのためインデックスさせない
          "/invite/",
        ],
      },
    ],
  }
}
