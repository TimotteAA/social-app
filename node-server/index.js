const path = require("path");
const bodyParser = require("koa-bodyparser");
const helmet = require("koa-helmet");
const config = require("./common/config");
const app = require("./common/index");
const { useRoutes } = require("./router");
const cors = require("@koa/cors");
const static = require("koa-static");

// const Router = require("koa-router");

// const router = new Router();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    allowHeaders: "Content-Type",
  })
);
app.use(helmet());
app.use(bodyParser());
useRoutes(app);
app.use(static(path.resolve(__dirname, "./public")));

app.listen(config.APP_PORT, () => {
  console.log(`服务器启动成功，端口号:${config.APP_PORT}`);
});
