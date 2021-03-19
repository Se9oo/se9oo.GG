// 챔피언 한줄평 조회
exports.selectChampionComments = `
  SELECT
    cmt.comment_id AS commentId
    , cmt.champion_name AS championName
    , cmt.content
    , cmt.reg_dt AS regDate
    , cmt.change_dt AS changeDate
    , cmt.cancel_dt AS cancelDate
    , usr.user_email AS userEmail
    , usr.user_nickname AS userNickname
  FROM
    champion_comment cmt
  INNER JOIN user usr ON cmt.user_email = usr.user_email
  WHERE
    cmt.champion_name = ?
    AND cmt.status = 1
  LIMIT ? OFFSET ?
`;

exports.selectTotalChampionCommentsCount = `
  SELECT
    COUNT(*) AS count
  FROM
    champion_comment
  WHERE
    champion_name = ?
    AND status = 1
`;
