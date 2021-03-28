// 사용자 조회
exports.selectUser = `
SELECT
  user_id AS id, user_email AS email, user_password AS password,
  user_nickname AS nickname, user_level AS level,
  DATE_FORMAT(reg_dt, '%Y.%m.%d') AS regDt
FROM user WHERE user_email = ?
`;

// me 데이터 조회
exports.selectFullUserInfo = `
  SELECT
    usr.user_id AS id, usr.user_email AS email,
    usr.user_nickname AS nickname, usr.user_level AS level,
    DATE_FORMAT(usr.reg_dt, '%Y.%m.%d') AS regDt,
    COUNT(pst.post_id) AS postCount
  FROM user usr
  LEFT OUTER JOIN post pst ON usr.user_email = pst.user_email
  WHERE
    usr.user_email = ?
`;

// 사용자 존재 여부 체크
exports.selectCountIsExUserByEmail = `
  SELECT 
    COUNT(*) AS cnt 
  FROM user 
  WHERE 
    user_email = ?
`;

// 사용자 등록
exports.insertUser = `
  INSERT INTO user 
    (user_email, user_password, user_nickname, user_level, reg_dt)
  VALUES 
    (?, ?, ?, 1, NOW())
`;

// 비밀번호 변경
exports.updatePassword = `
  UPDATE user SET
    user_password = ?
  WHERE
    user_email = ?
`;
