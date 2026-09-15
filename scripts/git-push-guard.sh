#!/usr/bin/env bash
# Claude Code PreToolUse フック: `git push` の頻度と危険なオプションを制御する。
#
# 目的: GitHub アカウントのスパム検知フラグ（2026-07〜08 に3回発生。Actions 停止・Vercel App 認可拒否）
# の再発防止。短時間に自動化された push / force-push が連続するとフラグが立ちやすいため、
#   - `--force` / `-f`（--force-with-lease を除く）を拒否
#   - 直近24時間の push 回数が上限（既定 6 回）を超えたら拒否し、コミットをまとめるよう促す
#   - 上限の 2/3 に達した時点で警告を返す
# ログは $HOME/.cache/jyuhacchu-push-guard/pushes.log（1行1タイムスタンプ）。
set -u
LIMIT="${PUSH_GUARD_LIMIT:-6}"
WINDOW_SEC=$((24 * 60 * 60))
LOG_DIR="${HOME:-/tmp}/.cache/jyuhacchu-push-guard"
LOG="$LOG_DIR/pushes.log"

input="$(cat)"
cmd="$(printf '%s' "$input" | jq -r '.tool_input.command // empty' 2>/dev/null || true)"
[ -z "$cmd" ] && exit 0
case "$cmd" in
  *"git push"*) ;;
  *) exit 0 ;;
esac

deny() {
  jq -cn --arg r "$1" '{hookSpecificOutput:{hookEventName:"PreToolUse",permissionDecision:"deny",permissionDecisionReason:$r}}'
  exit 0
}

# 1) force push の禁止（--force-with-lease は許可）
if printf '%s' "$cmd" | grep -Eq -- '(^|[[:space:]])(--force|-f)([[:space:]]|$)'; then
  deny "git push --force は禁止です（GitHub フラグ再発防止・AGENTS.md 運用ルール6）。必要なら --force-with-lease を使い、理由をユーザーに説明してください。"
fi

# 2) 24時間あたりの push 回数
mkdir -p "$LOG_DIR"
touch "$LOG"
now=$(date +%s)
cutoff=$((now - WINDOW_SEC))
recent=$(awk -v c="$cutoff" '$1 >= c' "$LOG" | wc -l | tr -d ' ')
if [ "$recent" -ge "$LIMIT" ]; then
  deny "直近24時間の git push が ${recent} 回に達しました（上限 ${LIMIT}・AGENTS.md 運用ルール6）。コミットをまとめ、ユーザーに確認してから push してください。上限は環境変数 PUSH_GUARD_LIMIT で変更できます。"
fi
printf '%s\n' "$now" >> "$LOG"
next=$((recent + 1))
warn_at=$(( (LIMIT * 2 + 2) / 3 ))
if [ "$next" -ge "$warn_at" ]; then
  jq -cn --arg m "注意: 直近24時間の git push が ${next} 回目です（上限 ${LIMIT}）。以降はコミットをまとめて push してください。" '{systemMessage:$m}'
fi
exit 0
