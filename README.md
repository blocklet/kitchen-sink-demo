# Kitchen Sink Demo

## Launch on Blocklet Server

[![Launch on Blocklet Server](https://assets.arcblock.io/icons/launch_on_blocklet_server.svg)](https://install.arcblock.io/?action=blocklet-install&meta_url=https%3A%2F%2Fgithub.com%2Fblocklet%2Fkitchen-sink-demo%2Freleases%2Fdownload%2Fv1.4.4%2Fblocklet.json)

## What's Included?

Demo blocklet that showing how to define a blocklet:

- Meta, checkout [blocklet.yml](./blocklet.yml)
- Interfaces: checkout [app/index.js](./app/index.js)
<!-- - Hooks: checkout [app/hooks](./app/hooks) -->

## Requirements

- Node.js v12.x or above
- A running Blocklet Server instance on dev environment

## Getting Started

### 1. Install Blocklet Server

```shell
npm install -g @blocklet/cli
```

### 2. Get the Blocklet

```shell
git clone https://github.com/blocklet/kitchen-sink-demo.git
cd kitchen-sink-demo
npm install # or yarn
```

### 3. Setup the node

```shell
blocklet server init -f
blocklet server start
```

> The Blocklet Server instance is stored under the `.abtnode` directory.

### 4. Deploy the Blocklet

```shell
npm run deploy
```

> The blocklet is bundled under the `.blocklet` directory

Then checkout the blocklet in your Blocklet Server Dashboard.
