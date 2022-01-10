const mysql2 = require("mysql2");
const config = require("./config");

const connections = mysql2.createPool({
  host: config.MYSQL_HOST,
  port: config.MYSQL_PORT,
  database: config.MYSQL_DATABASE,
  user: config.MYSQL_USER,
  password: config.MYSQL_PASSWORD,
});

connections.getConnection((err, conn) => {
  if (err) return;
  conn.connect((err) => {
    if (err) {
      console.log("连接失败");
    } else {
      console.log("连接成功");
      conn.release();
    }
  });
});

module.exports = connections.promise();
