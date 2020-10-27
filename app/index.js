/* eslint-disable no-underscore-dangle */
const express = require('express');
const passport = require('@abtnode/passport');

const app = express();

app.use(
  passport({
    nodeHost: `http://127.0.0.1:${process.env.ABT_NODE_PORT}`,
    blockletSk: process.env.BLOCKLET_APP_SK,
    blockletRoutes: [/^\/admin/, /^\/config/],
  })
);

app.use((req, res, next) => {
  req.locale = req.query.__blang__ || 'en';
  return next();
});

app.get('/admin', (req, res) => {
  if (req.locale === 'en') {
    res.send('Congratulations! you can access the admin dashboard');
  } else {
    res.send('太棒了，你能正常访问管理页面中文版');
  }
});

app.get('/config', (req, res) => {
  if (req.locale === 'en') {
    res.send('Congratulations! you can access the config page');
  } else {
    res.send('太棒了，你能正常访问配置页面中文版');
  }
});

app.get('/', (req, res) => {
  if (req.locale === 'en') {
    res.send('Hooray, you blocklet is up and running');
  } else {
    res.send('太棒了，你的 Blocklet 正常运行中，当前是中文模式');
  }
});

app.listen(process.env.BLOCKLET_PORT || 3030, () => {
  // eslint-disable-next-line no-console
  console.log(`Blocklet ready at ${process.env.BLOCKLET_PORT}`);
});
