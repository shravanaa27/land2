const express = require('express');
const cors = require('cors');
const LandRegistryDB = require('./model/LandRegistryDB');
const { clientApplication } = require('./client/client')
const app = express();
app.use(cors());

// Post Method
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//find Land from mondoDB
app.post('/api/findLand', (req, res) => {
    const filter = (req.body);
    console.log(filter);


    LandRegistryDB.LandDetailsInfo.find(filter)
        .then(function (data) {
            res.send(data)
        });

});


//adding land to blockchain
app.post('/api/addLand', (req, res) => {
    console.log(req.body);

    const data = req.body;
    const SROClient = new clientApplication();
    console.log(data)

    SROClient.generateAndSubmitTxn(
        "sro",
        "admin", //Admin for minifab
        "landchannel",
        "fabland", //KBA-Landregistry 
        "LandContract",
        "createLand",
        data.landId,//temporary actual : data.landId,
        data.district,
        data.subRegistrarOffice,
        data.taluk,
        data.village,
        data.blockNo,
        data.resurveyNo,
        data.areaAcres,
        data.areaCent,
        data.eastBoundary,
        data.northBoundary,
        data.westBoundary,
        data.southBoundary,
        data.remarks,
        data.presentOwner,
        data.oldSurveyNo
    ).then(message => {
        if (message) {
            res.status(200).send({ message: `Added Land ${data.landId} to blockchain successfully` })
        } else {
            res.status(500).send({ error: `Failed to Add Land ${data.landId} to blockchain` })
        }
    })
        .catch(error => {
            console.log("Error is ", error);
            res.status(500).send({ error: "Failed to add Land", message: `${error}` })
        })
});

//find Land from blockChain
app.post('/api/blockChainfindLand', (req, res) => {
    const landId = (req.body.landId);
    console.log(req.body.landId);

    const SROClient = new clientApplication();

    SROClient.generateAndEvaluateTxn(
        "sro",
        "admin", //Admin
        "landchannel",
        "fabland", //KBA-Landregistry
        "LandContract",
        "readLand",
        landId
    ).then(message => {
        if (message) {
            res.send(message.toString());
        } else {
            res.status(500).send({ error: `No records found` })
        }
    })
        .catch(error => {
            console.log("Error is ", error);
            res.status(500).send({ error: "Failed to add Land", message: `${error}` })
        })



});

//delete Land from blockChain api/blockChainDeleteLand
app.post('/api/blockChainDeleteLand', (req, res) => {
    const landId = (req.body.landId);
    console.log(req.body.landId);

    const SROClient = new clientApplication();

    SROClient.generateAndDeleteTxn(
        "sro",
        "admin", //Admin
        "landchannel",
        "fabland", //KBA-Landregistry
        "LandContract",
        "deleteLand",
        landId
    ).then(message => {
        if (message) {
            res.status(200).send({ message: `Deleted Land ${landId} from blockchain successfully` })
        } else {
            res.status(500).send({ error: `No records found` })
        }
    })
        .catch(error => {
            console.log("Error is ", error);
            res.status(500).send({ error: "Failed to add Land", message: `${error}` })
        })



});

//update land to blockchain
app.post('/api/blockChainUpdateLand', (req, res) => {
    console.log(req.body);
    const landId = req.body.landId;
    const updatedLandData = req.body.searchedLandData;
    const SROClient = new clientApplication();
    console.log('updated land in index.js')
    console.log(updatedLandData)

    SROClient.generateAndUpdateTxn(
        "sro",
        "admin", //Admin for minifab
        "landchannel",
        "fabland", //KBA-Landregistry 
        "LandContract",
        "updateLand",
        landId,
        updatedLandData.district,
        updatedLandData.subRegistrarOffice,
        updatedLandData.taluk,
        updatedLandData.village,
        updatedLandData.blockNo,
        updatedLandData.resurveyNo,
        updatedLandData.areaAcres,
        updatedLandData.areaCent,
        updatedLandData.eastBoundary,
        updatedLandData.northBoundary,
        updatedLandData.westBoundary,
        updatedLandData.southBoundary,
        updatedLandData.remarks,
        updatedLandData.presentOwner,
        updatedLandData.oldsurveyNo,
        updatedLandData.status,
        updatedLandData.isLandMortgaged,
        updatedLandData.isLandMutated


    ).then(message => {
        if (message) {
            res.status(200).send({ message: `Updated Land ${landId} to blockchain successfully` })
        } else {
            res.status(500).send({ error: `Failed to Update Land ${landId} to blockchain` })
        }
    })
        .catch(error => {
            console.log("Error is ", error);
            res.status(500).send({ error: "Failed to add Land", message: `${error}` })
        })
});


//transfer land 
app.post('/api/blockChainTransferLand', (req, res) => {
    console.log(req.body);
    const landId = req.body.transferLandData.landId;
    const newOwner = req.body.transferLandData.newOwner;
    const newOwnerAadhaar = req.body.transferLandData.newOwnerAadhaar;

    // console.log(landId);
    // console.log(newOwner);
    // console.log(newOwnerAadhaar);

    const SROClient = new clientApplication();

    SROClient.generateAndTransferTxn(
        "sro",
        "admin", //Admin for minifab
        "landchannel",
        "fabland", //KBA-Landregistry 
        "LandContract",
        "transferLand",
        landId,
        newOwner,
        newOwnerAadhaar
    ).then(message => {
        if (message) {
            res.status(200).send({ message: `Updated Land ${landId} to blockchain successfully` })
        } else {
            res.status(500).send({ error: `Failed to Update Land ${landId} to blockchain` })
        }
    })
        .catch(error => {
            console.log("Error is ", error);
            res.status(500).send({ error: "Failed to add Land", message: `${error}` })
        })
});


// Port number
app.listen(5000, () => {
    console.log("Listening on port 5000");
})

