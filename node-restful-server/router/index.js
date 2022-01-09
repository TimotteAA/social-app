const path = require("path");
const fs = require("fs");

const app = require("../common/index");

const useRoutes = (app) => {
  fs.readdirSync(__dirname).forEach((file) => {
    if (file !== "index.js") {
      const router = require(`./${file}`);
      app.use(router.routes());
      app.use(router.allowedMethods());
    }
  });
};

module.exports = {
  useRoutes,
};
