exports.selectUser = `
SELECT
  user_id, user_email, user_password,
  user_nickname, DATE_FORMAT(reg_dt, '%Y.%m.%d') AS reg_dt
FROM user WHERE user_email = ?
`;
exports.selectCountIsExUserByEmail = `SELECT COUNT(*) AS cnt FROM user WHERE user_email = ?`;
exports.insertUser = `INSERT INTO user (user_email, user_password, user_nickname, reg_dt) VALUES (?, ?, ?, NOW())`;