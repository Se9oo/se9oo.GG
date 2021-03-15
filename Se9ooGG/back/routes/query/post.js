// 모든 게시글 조회
exports.selectPostList = `
  SELECT 
    pst.post_id AS postId, pst.post_title AS title, pst.post_content AS content,
    usr.user_email AS email,
    usr.user_nickname AS nickname
  FROM post pst
  INNER JOIN user usr on pst.user_email = usr.user_email
  ORDER BY pst.post_id DESC
`;

// 게시글 등록
exports.insertPost = `
  INSERT INTO post
    (post_title, post_content, user_email, reg_dt)
  VALUES
    (?, ?, ?, NOW())
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
  DELETE FROM post
  WHERE post_id = ?
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
