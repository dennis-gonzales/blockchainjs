const WebSocket = require('ws');

const P2P_PORT = process.env.P2P_PORT || 5001;
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];

class P2pServer {
    constructor(blockchain) {
        this.blockchain = blockchain;
        this.sockets = [];

        console.log("connected peers: ", peers);
    }

    listen() {
        // Create a Websocket Server
        const server = new WebSocket.Server({ port: P2P_PORT });

        // Connecting our own socket
        server.on('connection', socket => this.connectSocket(socket));

        // Connecting our peers socket
        this.connectToPeers();

        console.log(`Listening for peer-to-peer connections on: ${P2P_PORT}`);
    }

    connectToPeers() {
        console.log(`Connecting ${peers.length} websocket peers...`);

        peers.forEach(peer => {
            console.log(`Connecting to websocket peer: ${peer}`);
            const socket = new WebSocket(peer);
            socket.on('open', () => this.connectSocket(socket));
        });
    }

    connectSocket(socket) {
        this.sockets.push(socket);
        console.log('Socket connected!');

        // Event listener for replacing the chain
        this.messageHandler(socket);

        // Fire the event
        this.sendChain(socket);
    }

    messageHandler(socket) {
        socket.on('message', message => {
            console.log('Message received, attempting to replace chain...');
            const data = JSON.parse(message);
            this.blockchain.replaceChain(data);
        });
    }

    syncChain() {
        console.log('Server is syncing the chain...');
        this.sockets.forEach(socket => this.sendChain(socket));
    }

    sendChain(socket) {
        console.log('Sending the chain as message...');
        socket.send(JSON.stringify(this.blockchain.chain));
    }
}

module.exports = P2pServer;