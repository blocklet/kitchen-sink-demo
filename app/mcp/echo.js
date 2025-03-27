const { McpServer, ResourceTemplate } = require('@modelcontextprotocol/sdk/server/mcp.js');
const { z } = require('zod');

const server = new McpServer({
  name: 'Echo',
  version: '1.0.0',
});

server.resource('echo', new ResourceTemplate('echo://{message}', { list: undefined }), (uri, { message }) => ({
  contents: [
    {
      uri: uri.href,
      text: `Resource echo: ${message}`,
    },
  ],
}));

server.tool('echo', { message: z.string() }, ({ message }) => ({
  content: [{ type: 'text', text: `Tool echo: ${message}` }],
}));

server.prompt('echo', { message: z.string() }, ({ message }) => ({
  messages: [
    {
      role: 'user',
      content: {
        type: 'text',
        text: `Please process this message: ${message}`,
      },
    },
  ],
}));

module.exports = server;
