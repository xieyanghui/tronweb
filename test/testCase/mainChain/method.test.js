const {PRIVATE_KEY, ADDRESS_BASE58} = require('../util/config');
const testRevertContract = require('../util/contracts').testRevert;
const testSetValContract = require('../util/contracts').testSetVal;
const testEmptyAbi = require('../util/contracts').testEmptyAbi;
const tronWebBuilder = require('../util/tronWebBuilder');
const assertThrow = require('../../helpers/assertThrow');
const broadcaster = require('../util/broadcaster');
const wait = require('../util/wait');
const TronWeb = tronWebBuilder.TronWeb;
const chai = require('chai');
const util = require('util');
const assert = chai.assert;
const _ = require('lodash');

describe('#contract.method', function () {

    let accounts;
    let tronWeb;
    let emptyAccount;

    before(async function () {
        tronWeb = tronWebBuilder.createInstance();
        await tronWebBuilder.newTestAccountsInMain(3);
        accounts = await tronWebBuilder.getTestAccountsInMain(3);
        emptyAccount = await TronWeb.createAccount();
    });

    describe('#send()', function () {

        let testRevert
        let testSetVal

        before(async function () {
            const tx = await broadcaster.broadcaster(tronWeb.transactionBuilder.createSmartContract({
                abi: testRevertContract.abi,
                bytecode: testRevertContract.bytecode
            }, accounts.b58[0]), accounts.pks[0])
            testRevert = await tronWeb.contract().at(tx.transaction.contract_address)
            console.log("tx.transaction.contract_address:"+tx.transaction.contract_address);

            const tx2 = await broadcaster.broadcaster(tronWeb.transactionBuilder.createSmartContract({
                abi: testSetValContract.abi,
                bytecode: testSetValContract.bytecode
            }, accounts.b58[0]), accounts.pks[0])
            testSetVal = await tronWeb.contract().at(tx2.transaction.contract_address)
            console.log("tx2.transaction.contract_address:"+tx2.transaction.contract_address);

        })

        it("should set accounts[2] as the owner and check it with getOwner(1)", async function () {
            console.log("setOwnerBegin:");
            console.log("accounts.b58[2]:"+accounts.b58[2]);
            await testRevert.setOwner(accounts.b58[2]).send()
            console.log("accounts.b58[2]:"+accounts.b58[2]);
            assert.equal(await testRevert.getOwner(1).call(), accounts.hex[2])
        })

        it("should revert if trying to set TSeFTBYCy3r2kZNYsj86G6Yz6rsmPdYdFs as the owner", async function () {
            this.timeout(30000)
            await assertThrow(testRevert.setOwner('TSeFTBYCy3r2kZNYsj86G6Yz6rsmPdYdFs').send({shouldPollResponse: true}),
                null,
                'REVERT'
            )
        });

        it("should set the val to 123", async function () {
            this.timeout(30000)
            let result = await testSetVal.set(123).send({
                shouldPollResponse: true,
                keepTxID: true
            })
            assert.equal(result[0].length, 64)
            assert.equal(result[1].toNumber(), 123)
        });

    });

    describe('#empty abi()', function () {

        let testRevert
        let testSetVal

        before(async function () {
            const tx1 = await broadcaster.broadcaster(tronWeb.transactionBuilder.createSmartContract({
                abi: testEmptyAbi.abi,
                bytecode: testEmptyAbi.bytecode
            }, accounts.b58[0]), accounts.pks[0])
            contractAddress1 = tronWeb.address.fromHex(tx1.transaction.contract_address)
            console.log("contractAddress1:"+contractAddress1);

            const tx2 = await broadcaster.broadcaster(tronWeb.transactionBuilder.createSmartContract({
                abi:[{}],
                bytecode: testEmptyAbi.bytecode
            }, accounts.b58[0]), accounts.pks[0])
            contractAddress2 = tronWeb.address.fromHex(tx2.transaction.contract_address)
            console.log("contractAddress2:"+contractAddress2);

            const tx3 = await broadcaster.broadcaster(tronWeb.transactionBuilder.createSmartContract({
                abi: testSetValContract.abi,
                bytecode: testSetValContract.bytecode
            }, accounts.b58[0]), accounts.pks[0])
            contractAddress3 = tronWeb.address.fromHex(tx3.transaction.contract_address)
            console.log("contractAddress3:"+contractAddress3);

        })

        it("abi is []", async function () {
            const functionSelector = 'set(uint256)';
            const parameter = [
                {type: 'uint256', value: 123}
            ]
            // abi:[]
            const triggerTransaction = await tronWeb.transactionBuilder.triggerSmartContract(
                contractAddress1, functionSelector, {}, parameter, ADDRESS_BASE58);
            console.log("triggerTransaction:"+util.inspect(triggerTransaction))
            const triggerTx = await broadcaster.broadcaster(null, PRIVATE_KEY, triggerTransaction.transaction);
            console.log("triggerTx:"+util.inspect(triggerTx))
            assert.equal(triggerTx.transaction.txID.length, 64);
            let triggerInfo;
            while (true) {
                triggerInfo = await tronWeb.trx.getTransactionInfo(triggerTx.transaction.txID);
                if (Object.keys(triggerInfo).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    console.log("triggerInfo:"+util.inspect(triggerInfo))
                    break;
                }
            }
            const contractResult = triggerInfo &&new tronWeb.BigNumber(triggerInfo.contractResult[0], 16).valueOf();
            console.log("contractResult: "+contractResult);
        });
        it("abi is [{}]", async function () {
            const functionSelector = 'set(uint256)';
            const parameter = [
                {type: 'uint256', value: 123}
            ]
            // abi:[{}]
            const triggerTransaction2 = await tronWeb.transactionBuilder.triggerSmartContract(
                contractAddress2, functionSelector, {}, parameter, ADDRESS_BASE58);
            console.log("triggerTransaction2:"+util.inspect(triggerTransaction2))
            const triggerTx2 = await broadcaster.broadcaster(null, PRIVATE_KEY, triggerTransaction2.transaction);
            console.log("triggerTx2:"+util.inspect(triggerTx2))
            assert.equal(triggerTx2.transaction.txID.length, 64);
            let triggerInfo2;
            while (true) {
                triggerInfo2 = await tronWeb.trx.getTransactionInfo(triggerTx2.transaction.txID);
                if (Object.keys(triggerInfo2).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    console.log("triggerInfo2:"+util.inspect(triggerInfo2))
                    break;
                }
            }
            const contractResult2 = triggerInfo2 &&new tronWeb.BigNumber(triggerInfo2.contractResult[0], 16).valueOf();
            console.log("contractResult2: "+contractResult2);
        });
        it("abi is {}", async function () {
            const functionSelector = 'set(uint256)';
            const parameter = [
                {type: 'uint256', value: 123}
            ]
            // clear abi
            const clearAbiTransaction = await tronWeb.transactionBuilder.clearABI(contractAddress3, accounts.b58[0]);
            console.log("clearAbiTransaction:"+util.inspect(clearAbiTransaction))
            const clearAbiTx = await broadcaster.broadcaster(null, accounts.pks[0], clearAbiTransaction);
            while (true) {
                let clearAbiInfo = await tronWeb.trx.getTransactionInfo(clearAbiTx.transaction.txID);
                if (Object.keys(clearAbiInfo).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    console.log("clearAbiInfo:"+util.inspect(clearAbiInfo))
                    break;
                }
            }
            // abi:{}
            const triggerTransaction3 = await tronWeb.transactionBuilder.triggerSmartContract(
                contractAddress3, functionSelector, {}, parameter, ADDRESS_BASE58);
            console.log("triggerTransaction3:"+util.inspect(triggerTransaction3))
            const triggerTx3 = await broadcaster.broadcaster(null, PRIVATE_KEY, triggerTransaction3.transaction);
            console.log("triggerTx3:"+util.inspect(triggerTx3))
            assert.equal(triggerTx3.transaction.txID.length, 64);
            let triggerInfo3;
            while (true) {
                triggerInfo3 = await tronWeb.trx.getTransactionInfo(triggerTx3.transaction.txID);
                if (Object.keys(triggerInfo3).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    console.log("triggerInfo3:"+util.inspect(triggerInfo3))
                    break;
                }
            }
            const contractResult3 = triggerInfo3 &&new tronWeb.BigNumber(triggerInfo3.contractResult[0], 16).valueOf();
            console.log("contractResult3: "+contractResult3);

        });

    });

    describe('#call()', function () {

        let testRevert

        before(async function () {
            const tx = await broadcaster.broadcaster(tronWeb.transactionBuilder.createSmartContract({
                abi: testRevertContract.abi,
                bytecode: testRevertContract.bytecode
            }, accounts.b58[0]), accounts.pks[0])
            testRevert = await tronWeb.contract().at(tx.transaction.contract_address)
            await testRevert.setOwner(accounts.b58[2]).send()
        })

        it("should getOwner(1) and get accounts[2]", async function () {
            assert.equal(await testRevert.getOwner(1).call(), accounts.hex[2])
        })

        it("should revert if call getOwner(2)", async function () {
            await assertThrow(testRevert.getOwner(2).call()
            )
        })

        it("should revert if call getOwner2()", async function () {
            await assertThrow(testRevert.getOwner2(2).call()
            )
        })

    });

});
