-- 電子取引Lシステム → 電子取引くん 改名にともなう本番データ更新
-- Neon SQL Editor に貼り付けて実行する（冪等・何度実行しても安全）。
--
-- 対象: 招待レコードの招待メッセージに旧ツール名が残っているため差し替える。
-- 招待メッセージは招待受諾ページ（審査時に閲覧される Fig.3）に表示されるため、
-- 旧名称が残っているとツール名混在と判定されるおそれがある。

UPDATE "Invitation"
SET    message = REPLACE(message, '電子取引Lシステム', '電子取引くん')
WHERE  message LIKE '%電子取引Lシステム%';

-- 確認クエリ: どちらも 0 件になっていれば完了
SELECT COUNT(*) AS "旧名称が残る招待" FROM "Invitation" WHERE message LIKE '%電子取引Lシステム%';
SELECT COUNT(*) AS "新名称の招待"     FROM "Invitation" WHERE message LIKE '%電子取引くん%';
