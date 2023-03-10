// const { profile } = require('./profile')
const { Wallets, Gateway } = require('fabric-network')
const path = require('path')
const fs = require('fs');
const FabricCAServices = require('fabric-ca-client');
const { buildCAClient, registerAndEnrollUser, enrollAdmin } = require('./CAUtil');
const { buildWallet, buildCCPSro } = require('./AppUtil');
const walletPath = path.join(__dirname, 'wallet');
const mspSro = 'sroMSP';


class clientApplication {
    async generateAndSubmitTxn(role, identityLabel, channelName, chaincodeName, contractName, txnName, ...args) {
        console.log('client js createLand')
        console.log(...args)
        let gateway = new Gateway();
        try {
            // this.Profile = profile[role.toLowerCase()]
            // const ccpPath = path.resolve(this.Profile["CP"])
            // const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf-8'))

            // build an in memory object with the network configuration (also known as a connection profile)
            const ccp = buildCCPSro();

            // build an instance of the fabric ca services client based on
            // the information in the network configuration
            const caClient = buildCAClient(FabricCAServices, ccp, 'ca.sro.land.com');

            // let wallet = await Wallets.newFileSystemWallet(this.Profile["Wallet"])

            // setup the wallet to hold the credentials of the application user
            const wallet = await buildWallet(Wallets, walletPath);

            // in a real application this would be done on an administrative flow, and only once
            await enrollAdmin(caClient, wallet, mspSro);

            await gateway.connect(ccp, { wallet, identity: identityLabel, discovery: { enabled: true, asLocalhost: true } })

            let channel = await gateway.getNetwork(channelName)
            console.log(chaincodeName)
            console.log(contractName)
            let contract = await channel.getContract(chaincodeName) //contractName

            let result = await contract.submitTransaction(txnName, ...args)
            console.log(result)
            return result

        } catch (error) {
            console.log("Error occured", error)

        } finally {
            console.log("Disconnect from the gateway.")
            gateway.disconnect()
        }

    }
    //Querying 
    async generateAndEvaluateTxn(role, identityLabel, channelName, chaincodeName, contractName, txnName, ...args) {
        let gateway = new Gateway();
        try {
            // this.Profile = profile[role.toLowerCase()]
            // const ccpPath = path.resolve(this.Profile["CP"])
            // const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf-8'))
            // let wallet = await Wallets.newFileSystemWallet(this.Profile["Wallet"])

            const ccp = buildCCPSro();
            const caClient = buildCAClient(FabricCAServices, ccp, 'ca.sro.land.com');
            const wallet = await buildWallet(Wallets, walletPath);
            await enrollAdmin(caClient, wallet, mspSro);

            await gateway.connect(ccp, { wallet, identity: identityLabel, discovery: { enabled: true, asLocalhost: true } })
            let channel = await gateway.getNetwork(channelName)
            let contract = await channel.getContract(chaincodeName, contractName)
            let result = await contract.evaluateTransaction(txnName, ...args)
            console.log(result)
            return result

        } catch (error) {
            console.log("Error occured", error)

        } finally {
            console.log("Disconnect from the gateway.")
            gateway.disconnect()
        }

    }

    //delete
    async generateAndDeleteTxn(role, identityLabel, channelName, chaincodeName, contractName, txnName, ...args) {
        let gateway = new Gateway();
        try {
            // this.Profile = profile[role.toLowerCase()]
            // const ccpPath = path.resolve(this.Profile["CP"])
            // const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf-8'))
            // let wallet = await Wallets.newFileSystemWallet(this.Profile["Wallet"])

            const ccp = buildCCPSro();
            const caClient = buildCAClient(FabricCAServices, ccp, 'ca.sro.land.com');
            const wallet = await buildWallet(Wallets, walletPath);
            await enrollAdmin(caClient, wallet, mspSro);


            await gateway.connect(ccp, { wallet, identity: identityLabel, discovery: { enabled: true, asLocalhost: true } })
            let channel = await gateway.getNetwork(channelName)
            let contract = await channel.getContract(chaincodeName, contractName)
            console.log(`generateAndDeleteTxn contractName`, contractName)
            console.log(`generateAndDeleteTxn chaincodeName`, chaincodeName)
            let result = await contract.submitTransaction(txnName, ...args)
            console.log(result)
            return result

        } catch (error) {
            console.log("Error occured", error)

        } finally {
            console.log("Disconnect from the gateway.")
            gateway.disconnect()
        }

    }

    //update
    async generateAndUpdateTxn(role, identityLabel, channelName, chaincodeName, contractName, txnName, ...args) {
        console.log(`in clientjs args`)
        console.log(...args)

        let gateway = new Gateway();
        try {
            const ccp = buildCCPSro();
            const caClient = buildCAClient(FabricCAServices, ccp, 'ca.sro.land.com');
            const wallet = await buildWallet(Wallets, walletPath);
            await enrollAdmin(caClient, wallet, mspSro);

            await gateway.connect(ccp, { wallet, identity: identityLabel, discovery: { enabled: true, asLocalhost: true } })
            let channel = await gateway.getNetwork(channelName)
            let contract = await channel.getContract(chaincodeName, contractName)

            let result = await contract.submitTransaction(txnName, ...args)
            console.log(result)
            return result

        } catch (error) {
            console.log("Error occured", error)

        } finally {
            console.log("Disconnect from the gateway.")
            gateway.disconnect()
        }

    }

    //transfer
    async generateAndTransferTxn(role, identityLabel, channelName, chaincodeName, contractName, txnName, ...args) {
        console.log(`in clientjs args`)
        console.log(...args)

        let gateway = new Gateway();
        try {
            const ccp = buildCCPSro();
            const caClient = buildCAClient(FabricCAServices, ccp, 'ca.sro.land.com');
            const wallet = await buildWallet(Wallets, walletPath);
            await enrollAdmin(caClient, wallet, mspSro);

            await gateway.connect(ccp, { wallet, identity: identityLabel, discovery: { enabled: true, asLocalhost: true } })
            let channel = await gateway.getNetwork(channelName)
            let contract = await channel.getContract(chaincodeName, contractName)

            let result = await contract.submitTransaction(txnName, ...args)
            console.log(result)
            return result

        } catch (error) {
            console.log("Error occured", error)

        } finally {
            console.log("Disconnect from the gateway.")
            gateway.disconnect()
        }

    }

}

module.exports = {
    clientApplication
}