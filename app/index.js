require('dotenv').config();
const path = require('path');

/* eslint-disable no-underscore-dangle */
const express = require('express');

const pick = (obj, keys) => keys.reduce((o, key) => {
  o[key] = obj[key];
  return o
}, {})

const app = express();

app.use((req, res, next) => {
  req.locale = req.query.__blang__ || 'en';
  res.sendDebugJson = (message) => {
    res.json({
      debugMessage: message,
      req: pick(req, ['headers', 'baseUrl', 'hostname', 'ip', 'ips', 'method', 'originalUrl', 'path', 'protocol', 'query', ])
    })
  }
  return next();
});

app.get('/admin', (req, res) => {
  if (req.locale === 'en') {
    res.sendDebugJson('Congratulations! you can access the admin dashboard');
  } else {
    res.sendDebugJson('太棒了，你能正常访问管理页面中文版');
  }
});

app.get('/config', (req, res) => {
  if (req.locale === 'en') {
    res.sendDebugJson('Congratulations! you can access the config page');
  } else {
    res.sendDebugJson('太棒了，你能正常访问配置页面中文版');
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'view/public.html'));
});

app.get('/api', (req, res) => {
  if (req.locale === 'en') {
    res.sendDebugJson('Hooray, you blocklet is up and running');
  } else {
    res.sendDebugJson('太棒了，你的 Blocklet 正常运行中，当前是中文模式');
  }
});

const port = Number(process.env.BLOCKLET_PORT || 3030);
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Blocklet ready at ${port}`);
});

require('./echo');
require('./api');
