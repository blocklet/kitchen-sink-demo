const { getRelativeUrl } = require('@blocklet/sdk/lib/component');
const { SSEServerTransport } = require('@modelcontextprotocol/sdk/server/sse.js');

function attachSSEServer(app, mcpServer) {
  const transports = new Map();

  app.get('/mcp/sse', async (_, res) => {
    // Set required headers for SSE
    res.header('X-Accel-Buffering', 'no');

    // Create and store transport
    const transport = new SSEServerTransport(getRelativeUrl('/mcp/messages'), res);
    transports.set(transport.sessionId, transport);

    // Clean up on connection close
    res.on('close', () => {
      transports.delete(transport.sessionId);
      transport.close();
    });

    try {
      await mcpServer.connect(transport);
    } catch (error) {
      console.error('Error connecting transport:', error);
      transport.close();
      res.end();
    }
  });

  app.post('/mcp/messages', async (req, res) => {
    const sessionId = req.query.sessionId;
    if (!sessionId) {
      console.error('Message received without sessionId');
      res.status(400).json({ error: 'sessionId is required' });
      return;
    }

    const transport = transports.get(sessionId);
    if (!transport) {
      console.error('No transport found for sessionId:', sessionId);
      res.status(400).json({ error: 'No transport found for sessionId' });
      return;
    }

    try {
      await transport.handlePostMessage(req, res);
    } catch (error) {
      console.error('Error handling message:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
}

module.exports = { attachSSEServer };
