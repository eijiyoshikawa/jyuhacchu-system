#!/usr/bin/env bash
# Vercel ビルド中の `prisma migrate deploy` を再試行付きで実行する。
#
# 背景: Neon のコンピュートが休止中だと最初の接続が Prisma の既定タイムアウト（5秒）を
# 超えて `P1001: Can't reach database server` になり、ビルド全体が落ちる
# （2026-09-16 本番 / 2026-10-17 プレビューで発生。docs/ERROR_HISTORY.md §12）。
# 1回目の接続で Neon が起き上がるので、少し待って再試行すれば通る。
#
# 環境変数で調整可:
#   PRISMA_MIGRATE_ATTEMPTS  試行回数（既定 5）
#   PRISMA_MIGRATE_SLEEP     失敗後の待機秒数（既定 10）
set -u

attempts="${PRISMA_MIGRATE_ATTEMPTS:-5}"
sleep_sec="${PRISMA_MIGRATE_SLEEP:-10}"

for ((i = 1; i <= attempts; i++)); do
  echo "[prisma migrate deploy] attempt ${i}/${attempts}"
  npx prisma migrate deploy
  status=$?
  if ((status == 0)); then
    exit 0
  fi
  if ((i < attempts)); then
    echo "[prisma migrate deploy] failed (exit ${status}); retrying in ${sleep_sec}s..."
    sleep "${sleep_sec}"
  fi
done

echo "[prisma migrate deploy] giving up after ${attempts} attempts" >&2
exit "${status:-1}"
