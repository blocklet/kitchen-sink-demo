const { session } = require('@blocklet/sdk/lib/middlewares');
const { StreamableHTTPServerTransport } = require('@modelcontextprotocol/sdk/server/streamableHttp.js');

const transport = new StreamableHTTPServerTransport({
  sessionIdGenerator: undefined, // set to undefined for stateless servers
});

async function attachMcpServer(mcpServer) {
  await mcpServer.connect(transport);
}

function attachMcpRoutes(app) {
  app.post('/mcp', session(), async (req, res) => {
    try {
      req.auth = { extra: { user: req.user } };
      await transport.handleRequest(req, res, req.body);
    } catch (error) {
      console.error('Error handling MCP request:', error);
      if (!res.headersSent) {
        res.status(500).json({
          jsonrpc: '2.0',
          error: {
            code: -32603,
            message: 'Internal server error',
          },
          id: null,
        });
      }
    }
  });

  app.get('/mcp', (req, res) => {
    res.header('X-Accel-Buffering', 'no');
    res.writeHead(405).end(
      JSON.stringify({
        jsonrpc: '2.0',
        error: {
          code: -32000,
          message: 'Method not allowed.',
        },
        id: null,
      })
    );
  });

  app.delete('/mcp', (req, res) => {
    res.writeHead(405).end(
      JSON.stringify({
        jsonrpc: '2.0',
        error: {
          code: -32000,
          message: 'Method not allowed.',
        },
        id: null,
      })
    );
  });
}

module.exports = { attachMcpServer, attachMcpRoutes };
