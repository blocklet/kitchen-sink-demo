require('dotenv').config();

const path = require('path');
const EventBus = require('@blocklet/sdk/service/eventbus');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const logger = require('@blocklet/logger');

/* eslint-disable no-underscore-dangle */
const express = require('express');

const events = require('./libs/event');
const { attachMcpRoutes, attachMcpServer } = require('./mcp/streamable');
const echoServer = require('./mcp/echo');

events.init();

const pick = (obj, keys) => keys.reduce((o, key) => {
  o[key] = obj[key];
  return o
}, {})

const app = express();

app.set('trust proxy', true);

app.use(cookieParser());
app.use(morgan('combined', { stream: logger.getAccessLogStream() }));

attachMcpRoutes(app);

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

app.get('/event', async (req, res) => {
  try {
    const event = req.query.full ? 'kitchen.full' : 'kitchen.empty';
    await EventBus.publish(event, {
      data: { object: { message: 'Hello, world!' } },
    });
    res.json({ message: `event ${event} emitted` });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.get('/api', (req, res) => {
  if (req.locale === 'en') {
    res.sendDebugJson('Hooray, you blocklet is up and running');
  } else {
    res.sendDebugJson('太棒了，你的 Blocklet 正常运行中，当前是中文模式');
  }
});

const port = Number(process.env.BLOCKLET_PORT || 3030);
app.listen(port, async () => {
  await attachMcpServer(echoServer);

  // eslint-disable-next-line no-console
  console.log(`Blocklet ready at ${port}`);
});

require('./echo');
