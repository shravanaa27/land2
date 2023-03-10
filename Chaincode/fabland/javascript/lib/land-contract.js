/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class LandContract extends Contract {

    async landExists(ctx, landId) {
        const buffer = await ctx.stub.getState(landId);
        console.log(landId);
        return (!!buffer && buffer.length > 0);
        
    }
    
    
    //SRO 

    async createLand(ctx, landId, district, subRegistrarOffice, taluk, village, blockNo, resurveyNo,
        areaAcres, areaCent, eastBoundary, northBoundary, westBoundary, southBoundary, remarks, presentOwner, oldsurveyNo) {

        const mspID = ctx.clientIdentity.getMSPID();
        console.log(mspID);

        if (mspID === 'sroMSP') {
            const exists = await this.landExists(ctx, landId);
            if (exists) {
                throw new Error(`The land ${landId} already exists`);
            }

            const landAsset = {
                district, subRegistrarOffice, taluk, village, blockNo, resurveyNo,
                areaAcres, areaCent, eastBoundary, northBoundary, westBoundary, southBoundary, remarks, presentOwner, oldsurveyNo,
                status: 'Land registered in blockchain from SRO Office (Mutation is pending)',
                isLandMortgaged: false, isLandMutated: false
            };
            console.log(landAsset);

            const buffer = Buffer.from(JSON.stringify(landAsset));
            console.log(buffer);
            await ctx.stub.putState(landId, buffer);

            let addLandEventData = { Type: 'Land creation', Model: resurveyNo };
            await ctx.stub.setEvent('addLandEvent', Buffer.from(JSON.stringify(addLandEventData)));


        }
        else {
            return (`User with MSP ID : ${mspID} cannot perform this action`)
        }
    }

    async readLand(ctx, landId) {
        const exists = await this.landExists(ctx, landId);
        if (!exists) {
            throw new Error(`The land ${landId} does not exist`);
        }
        const buffer = await ctx.stub.getState(landId);
        console.log(buffer);
        const asset = JSON.parse(buffer.toString());
        console.log(asset);
        return asset;
    }

    // async updateLand(ctx, landId, newValue) {
    //     const exists = await this.landExists(ctx, landId);
    //     if (!exists) {
    //         throw new Error(`The land ${landId} does not exist`);
    //     }
    //     const asset = { value: newValue };
    //     console.log(asset);
    //     const buffer = Buffer.from(JSON.stringify(asset));
    //     console.log(buffer);
    //     await ctx.stub.putState(landId, buffer);
    // }

    async deleteLand(ctx, landId) {
        const mspID = ctx.clientIdentity.getMSPID();
        console.log(mspID);

        if (mspID === 'sroMSP') {
            const exists = await this.landExists(ctx, landId);
            if (!exists) {
                throw new Error(`The land ${landId} does not exist`);
            }
            await ctx.stub.deleteState(landId);
        }
        else {
            return (`User with MSP ID : ${mspID} cannot perform this action`)
        }
    }

    
}



module.exports = LandContract;
