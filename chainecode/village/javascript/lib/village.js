/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class Village extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const villagers = [
            {
                food: 0,
                energy: 0,
                supply: 0 
            },
        ];

        for (let i = 0; i < villagers.length; i++) {
            villagers[i].docType = 'villagers';
            await ctx.stub.putState('VILLAGER' + i, Buffer.from(JSON.stringify(villager[i])));
            console.info('Added <--> ', villager[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async queryVillager(ctx, VillagerNumber ) {
        const villagerAsBytes = await ctx.stub.getState(VillagerNumber); // get the car from chaincode state
        if (!villagerAsBytes || villagerAsBytes.length === 0) {
            throw new Error(`${villagerNumber} does not exist`);
        }
        console.log(villagerAsBytes.toString());
        return villagerAsBytes.toString();
    }

    async createStock(ctx, villagerNumber, food, energy, supply) {
        console.info('============= START : Create Stock ===========');

        const villager = {
            docType: 'stock',
            food,
            energy,
            supply,
        };

        await ctx.stub.putState(villagerNumber, Buffer.from(JSON.stringify(villager)));
        console.info('============= END : Create stock ===========');
    }

    async queryAllVillager(ctx) {
        const startKey = 'VILLAGER0';
        const endKey = 'VILLAGER999';

        const iterator = await ctx.stub.getStateByRange(startKey, endKey);

        const allResults = [];
        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                console.log(res.value.value.toString('utf8'));

                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                allResults.push({ Key, Record });
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.info(allResults);
                return JSON.stringify(allResults);
            }
        }
    }

}

module.exports = village;
