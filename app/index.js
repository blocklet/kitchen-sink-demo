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
