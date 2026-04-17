import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const MARKETING_HOST = "lsystem.let-inc.net";

const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    return {
      beforeFiles: [
        // Custom marketing domain: root path serves the LP
        {
          source: "/",
          has: [{ type: "host", value: MARKETING_HOST }],
          destination: "/lp",
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
  async redirects() {
    return [
      // Avoid duplicate-content on the custom domain: /lp -> /
      {
        source: "/lp",
        has: [{ type: "host", value: MARKETING_HOST }],
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  silent: !process.env.CI,
  widenClientFileUpload: true,
  sourcemaps: {
    disable: true,
  },
});
