// user
exports.selectUser = `
SELECT
  user_id, user_email, user_password,
  user_nickname, DATE_FORMAT(reg_dt, '%Y.%m.%d') AS reg_dt
FROM user WHERE user_email = ?
`;

exports.selectFullUserInfo = `
  SELECT
    usr.user_id, usr.user_email, usr.user_nickname,
    DATE_FORMAT(usr.reg_dt, '%Y.%m.%d') AS reg_dt,
    COUNT(pst.post_id) AS user_post_count
  FROM user usr
  LEFT OUTER JOIN post pst ON usr.user_email = pst.user_email
  WHERE
    usr.user_email = ?
`;

exports.selectCountIsExUserByEmail = `
  SELECT 
    COUNT(*) AS cnt 
  FROM user 
  WHERE 
    user_email = ?`;

exports.insertUser = `
  INSERT INTO user 
    (user_email, user_password, user_nickname, reg_dt)
  VALUES 
    (?, ?, ?, NOW())`;

// post
exports.insertPost = `
  INSERT INTO post
    (post_title, post_content, user_email, reg_dt)
  VALUES
    (?, ?, ?, NOW())
`;