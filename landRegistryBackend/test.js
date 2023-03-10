const fs = require('fs');
const path = require('path');

const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');

console.log(ccpPath)


const walletPath = path.join(__dirname, 'wallet');

console.log(walletPath)