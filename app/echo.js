const axon = require('axon');
const sock = axon.socket('rep');

const port = Number(process.env.BLOCKLET_ECHO_PORT || 9999);

sock.bind(port, '127.0.0.1');
sock.on('message', async (raw, reply) => {
  console.info('receive message', { raw });
  reply(String(raw));
});

console.info(`Echo server ready on port ${port}`);
