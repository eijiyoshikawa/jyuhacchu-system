import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          // IT導入補助金 申請資料は審査員向けの非公開経路
          "/transact/subsidy",
          "/transact/subsidy/",
        ],
      },
    ],
  }
}
