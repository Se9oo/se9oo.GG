// 게시글의 가장 마지막 postId 조회
exports.selectMaxPostId = `
  SELECT
    MAX(post_id) AS maxPostId
  FROM
    post
  WHERE
    status = 1
`;

// 모든 게시글 조회
exports.selectPostList = `
  SELECT 
    pst.post_id AS postId, pst.post_title AS title, pst.post_content AS content,
    usr.user_email AS email,
    usr.user_nickname AS nickname
  FROM post pst
  INNER JOIN user usr on pst.user_email = usr.user_email
  WHERE
    pst.post_id < ?
    AND pst.status = 1
  ORDER BY pst.post_id DESC
  LIMIT ?
`;

// 내 게시글 조회
exports.selectMyPostList = `
  SELECT
    pst.post_id AS postId
    , pst.post_title AS title
    , pst.post_content AS content
    , usr.user_email AS email
    , usr.user_nickname AS nickname
  FROM post pst
  INNER JOIN user usr on pst.user_email = usr.user_email
  WHERE
    pst.user_email = ?
    AND pst.status = 1
  ORDER BY pst.post_id DESC
  LIMIT ? OFFSET ?
`;

// 내 게시글 개수 조회
exports.selectMyPostCount = `
  SELECT
    COUNT(*) AS count
  FROM post
  WHERE
    user_email = ?
    AND status = 1
`;

// 게시글 등록
exports.insertPost = `
  INSERT INTO post
    (post_title, post_content, user_email, reg_dt, status)
  VALUES
    (?, ?, ?, NOW(), 1)
`;

// 게시글 id에 해당하는 댓글 조회
exports.selectCommentInfoByPostId = `
  SELECT
    cmt.comment_id AS commentId, cmt.user_email AS email, usr.user_nickname AS nickname,
    cmt.comment_content AS content, cmt.reg_dt AS regDt
  FROM
    comment cmt
  LEFT OUTER JOIN user usr ON cmt.user_email = usr.user_email
  WHERE
    cmt.post_id = ?
`;

// 게시글 삭제
exports.deletePost = `
  UPDATE post SET
    status = 0
  WHERE
    post_id = ?
`;

// 댓글 조회 (댓글 id로)
exports.selectCommentInfoByCommentId = `
  SELECT
    cmt.comment_id AS commentId
    , cmt.user_email AS email
    , usr.user_nickname AS nickname
    , cmt.comment_content AS content
    , cmt.reg_dt AS regDt
  FROM
    comment cmt
  LEFT OUTER JOIN user usr ON cmt.user_email = usr.user_email
  WHERE
    cmt.comment_id = ?
`;

// 댓글 등록
exports.insertComment = `
  INSERT INTO comment
    (user_email, comment_content, reg_dt, post_id)
  VALUES
    (?, ?, NOW(), ?);
`;

// 댓글 삭제
exports.deleteComment = `
  DELETE FROM comment
  WHERE comment_id = ?
`;

// 게시글 좋아요 개수
exports.selectLikeCountByPostId = `
  SELECT
    COUNT(*) AS cnt
  FROM
    likes
  WHERE
    post_id = ?
    AND status = 1
`;

// 해당 게시글 좋아요 여부
exports.selectIsLike = `
  SELECT
    COUNT(*) AS cnt
  FROM
    likes
  WHERE
    user_email = ?
    AND post_id = ?
    AND status = 1
`;

// 게시글 좋아요 등록
exports.addLike = `
  INSERT INTO likes 
    (user_email, post_id, reg_dt, cancel_dt, status)
  VALUES
    (?, ?, NOW(), NULL, 1)
  ON DUPLICATE KEY
  UPDATE cancel_dt = NULL, status = 1;
`;

// 게시글 좋아요 취소
exports.cancelLike = `
  UPDATE likes SET
    status = 0
    , cancel_dt = now()
  WHERE
  user_email = ?
  AND post_id = ?
`;
