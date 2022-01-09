const crypto = require("crypto");

const md5password = (password) => {
  const md5 = crypto.createHash("md5");
  //   返回值是对象
  const result = md5.update(password).digest("hex");
  return result;
};

module.exports = { md5password };
