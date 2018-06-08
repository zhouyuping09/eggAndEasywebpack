module.exports = app => {
  app.beforeStart(async () => {
    try {
      await Promise.all([
        getBaseInfo(app),
        cacheBaseInfo(app),
      ]);
    } catch (error) {
      process.exit(1);
    }
  });
};

async function cacheBaseInfo(app) {
  const baseInfo = {};
  app.baseInfo = baseInfo;
}

async function getBaseInfo(app) {
  return {};
}
