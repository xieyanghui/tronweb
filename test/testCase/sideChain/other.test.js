const {DEPOSIT_FEE, WITHDRAW_FEE, FEE_LIMIT, ADDRESS_BASE58, SIDE_CHAIN, PRIVATE_KEY} = require('../util/config');
const tronWebBuilder = require('../util/tronWebBuilder');
const assertThrow = require('../../helpers/assertThrow');
const publicMethod = require('../util/PublicMethod');
const broadcaster = require('../util/broadcaster');
const wait = require('../../helpers/wait');
const chai = require('chai');
const assert = chai.assert;
const util = require('util');

describe('TronWeb Instance', function() {
    describe('#other', function() {
        describe('#setMain、SideGatewayAddress、ChainId', function () {
            const tronWeb = tronWebBuilder.createInstanceSide();
            it('setMainGatewayAddress normal', async function () {
                // before
                let mainGatewayAddressBefore = await tronWeb.sidechain.mainGatewayAddress;
                console.log('mainGatewayAddressBefore: ' + mainGatewayAddressBefore);
                assert.equal(SIDE_CHAIN.sideOptions.mainGatewayAddress, mainGatewayAddressBefore);

                // setMainGatewayAddress
                await tronWeb.sidechain.setMainGatewayAddress(ADDRESS_BASE58);
                let mainGatewayAddressAfter = await tronWeb.sidechain.mainGatewayAddress;
                console.log('mainGatewayAddressAfter: ' + mainGatewayAddressAfter);
                assert.equal(ADDRESS_BASE58, mainGatewayAddressAfter);
            });
            it('should throw if an invalid main gateway address', async function () {
                try {
                    await tronWeb.sidechain.setMainGatewayAddress("THph9K2M2nLvkianrMGswRhz5hjSA9fuH9")
                } catch (e) {
                    console.log("e.message:"+e.message)
                    assert.equal("Invalid main gateway address provided", e.message);
                }

            });
            it('setSideGatewayAddress normal', async function () {
                // before
                let sideGatewayAddressBefore = await tronWeb.sidechain.sideGatewayAddress;
                console.log('sideGatewayAddressBefore: ' + sideGatewayAddressBefore);
                assert.equal(SIDE_CHAIN.sideOptions.sideGatewayAddress, sideGatewayAddressBefore);

                // setSideGatewayAddress
                await tronWeb.sidechain.setSideGatewayAddress(ADDRESS_BASE58);
                let sideGatewayAddressAfter = await tronWeb.sidechain.sideGatewayAddress;
                console.log('sideGatewayAddressAfter: ' + sideGatewayAddressAfter);
                assert.equal(ADDRESS_BASE58, sideGatewayAddressAfter);
            });
            it('should throw if an invalid side gateway address', async function () {
                try {
                    await tronWeb.sidechain.setSideGatewayAddress("THph9K2M2nLvkianrMGswRhz5hjSA9fuH9")
                } catch (e) {
                    console.log("e.message:"+e.message)
                    assert.equal("Invalid side gateway address provided", e.message);
                }

            });
            it('setChainId normal', async function () {
                // before
                let sideChainIdBefore = await tronWeb.sidechain.chainId;
                console.log('sideChainIdBefore: ' + sideChainIdBefore);
                assert.equal(SIDE_CHAIN.sideOptions.sideChainId, sideChainIdBefore);

                // setChainId
                await tronWeb.sidechain.setChainId(ADDRESS_BASE58);
                let sideChainIdAfter = await tronWeb.sidechain.chainId;
                console.log('sideChainIdAfter: ' + sideChainIdAfter);
                assert.equal(ADDRESS_BASE58, sideChainIdAfter);
            });
            it('should throw if an invalid side gateway address', async function () {
                try {
                    await tronWeb.sidechain.setChainId("THph9K2M2nLvkianrMGswRhz5hjSA9fuH9")
                } catch (e) {
                    console.log("e.message:"+e.message)
                    assert.equal("Invalid side chainId provided", e.message);
                }

            });
            after(async function () {
                // setMainGatewayAddress
                await tronWeb.sidechain.setMainGatewayAddress(SIDE_CHAIN.sideOptions.mainGatewayAddress);
                let mainGatewayAddress = await tronWeb.sidechain.mainGatewayAddress;
                console.log('mainGatewayAddress: ' + mainGatewayAddress);
                assert.equal(SIDE_CHAIN.sideOptions.mainGatewayAddress, mainGatewayAddress);
            })
        });
        describe('#injectFund()', function () {
            it('injectFund', async function () {
                const tronWeb = tronWebBuilder.createInstanceSide();
                const txID = await tronWeb.sidechain.injectFund(1000000, FEE_LIMIT);
                assert.equal(txID.length, 64);
            });
        });
        describe('#Sign()', function () {
            it('sign with visible is true', async function () {
                const tronWeb = tronWebBuilder.createInstanceSide();
                var transac1 = {
                    "result": {
                        "result": true
                    },
                    "transaction": {
                        "txID": "3c8fab6e6b94384bbdac8b5dca884aadc8283d43b85b1878fb296ef27ca72e59",
                        "raw_data": {
                            "contract": [
                                {
                                    "parameter": {
                                        "value": {
                                            "data": "464c4dae0000000000000000000000000000000000000000000000000000000000000001",
                                            "owner_address": "4173fc381d3e2afefcced94a57d49520291c38afbb",
                                            "contract_address": "4138e16f3d0d982875d7ca8e221dbb511a4e836983"
                                        },
                                        "type_url": "type.googleapis.com/protocol.TriggerSmartContract"
                                    },
                                    "type": "TriggerSmartContract",
                                    "Permission_id": 2
                                }
                            ],
                            "ref_block_bytes": "b5fd",
                            "ref_block_hash": "6a8d83db006c6271",
                            "expiration": 1589532207000,
                            "fee_limit": 1000000000,
                            "timestamp": 1589532149919
                        },
                        "raw_data_hex": "0a02b5fd22086a8d83db006c62714098cf82bca12e5a9001081f1289010a31747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e54726967676572536d617274436f6e747261637412540a154173fc381d3e2afefcced94a57d49520291c38afbb12154138e16f3d0d982875d7ca8e221dbb511a4e8369832224464c4dae00000000000000000000000000000000000000000000000000000000000000012802709f91ffbba12e90018094ebdc03"
                    }
                };
                var transac2 = {
                        "visible":true,
                        "txID":"1f219b7d1dfa5943ce248457e1e4f684d630e0be0f572cdcfe932ea753f9ecf3",
                        "raw_data":{
                            "contract":[
                                {
                                    "parameter":{
                                        "value":{
                                            "amount":10,
                                            "owner_address":"TRhi3fM4A7mUpUGsjjzPZbW3bAYmbBGb6L",
                                            "to_address":"THph9K2M2nLvkianrMGswRhz5hjSA9fuH7"
                                        },
                                        "type_url":"type.googleapis.com/protocol.TransferContract"
                                    },
                                    "type":"TransferContract"
                                }],
                            "ref_block_bytes":"11b3",
                            "ref_block_hash":"ee11ae95aa575cf4",
                            "expiration":1596022410000,
                            "timestamp":1596022351372
                        },
                        "raw_data_hex":"0a0211b32208ee11ae95aa575cf4409096e5d2b92e5a65080112610a2d747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e5472616e73666572436f6e747261637412300a1541ac939a43b0a1ba0462585a2a482b43d26a8edda31215415624c12e308b03a1a6b21d9b86e3942fac1ab92b180a708ccce1d2b92e"
                    };
                /*tronWeb.sidechain.sign(transac2.transaction,PRIVATE_KEY,true,true,false).then(function (data) {
                    console.log(data.valueOf()["raw_data"]["contract"][0]);
                    console.log(data);
                });*/
                const signedTransaction = await tronWeb.sidechain.sign(transac2,PRIVATE_KEY,true,true,false);
                console.log("signedTransaction:"+util.inspect(signedTransaction))
                const result = await tronWeb.sidechain.sidechain.trx.broadcast(signedTransaction)
                console.log("result:"+util.inspect(result))

                /*let signedTransaction = transaction;
                for (let i = 0; i < 2; i++) {
                    signedTransaction = await tronWeb.sidechain.multiSign(signedTransaction, accounts.pks[i]);
                }

                assert.equal(signedTransaction.signature.length, 2);

                // broadcast multi-sign transaction
                const result = await tronWeb.sidechain.sidechain.trx.broadcast(signedTransaction);
                assert.isTrue(result.result);*/
            });
        });
    });
});

