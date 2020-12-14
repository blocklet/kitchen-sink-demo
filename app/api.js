const express = require('express');

const app = express();

app.get('/api', (req, res) => {
  res.jsonp({ code: 'ok', data: { time: Date.now() } });
});

const port = Number(process.env.BLOCKLET_API_PORT || 3031);
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Blocklet API ready at ${port}`);
});
