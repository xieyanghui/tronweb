const tronWebBuilder = require('../util/tronWebBuilder');
const TronWeb = tronWebBuilder.TronWeb;
const wait = require('../../helpers/wait');
const util = require('util');

const options = {
    fullNode: 'http://39.107.123.182:8590',
    solidityNode: 'http://39.107.123.182:8591',
    eventServer: 'http://39.107.123.182:8590',
    privateKey : 'a723782179b1973a5607bec7e8f8b55917965e953f844b61afacdb789b378295',
};

describe("#multiSignTransaction", async function () {
    const tronWeb = new TronWeb(options);

    var priKey = "a723782179b1973a5607bec7e8f8b55917965e953f844b61afacdb789b378295";
    var transac1 ={
        "result": {
            "result": true
        },
        "transaction": {
            "visible": false,
            "txID": "b41eb01a33c89f5814d13adf87565fcc6f6da2bd6bbe298494ab2254e34a076e",
            "raw_data": {
                "contract": [{
                    "parameter": {
                        "value": {
                            "data": "3be9ece7000000000000000000000000ffda2cdfc7c003e867647d5ac4b7706fbc2499fe00000000000000000000000000000000000000000000000000000000000f42700000000000000000000000000000000000000000000000000000000000000001",
                            "token_id": 1000048,
                            "owner_address": "4180a2189113e76ecfadaee9b75b9c0105e49ec2ea",
                            "call_token_value": 20,
                            "contract_address": "4190d0efb4d9bdbe02278c35085775e084b5227d05",
                            "call_value": 10
                        },
                        "type_url": "type.googleapis.com/protocol.TriggerSmartContract"
                    },
                    "type": "TriggerSmartContract"
                }],
                "ref_block_bytes": "4358",
                "ref_block_hash": "8deb3d8133fe30d4",
                "expiration": 1611057267000,
                "fee_limit": 1000000000,
                "timestamp": 1611057208603
            },
            "raw_data_hex": "0a02435822088deb3d8133fe30d440b882fcd3f12e5ad701081f12d2010a31747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e54726967676572536d617274436f6e7472616374129c010a154180a2189113e76ecfadaee9b75b9c0105e49ec2ea12154190d0efb4d9bdbe02278c35085775e084b5227d05180a22643be9ece7000000000000000000000000ffda2cdfc7c003e867647d5ac4b7706fbc2499fe00000000000000000000000000000000000000000000000000000000000f42700000000000000000000000000000000000000000000000000000000000000001281430f0843d709bbaf8d3f12e90018094ebdc03"
        }
    };
    it('sign', async function () {
        console.log(tronWeb.defaultPrivateKey);
        console.log(tronWeb.defaultAddress.base58);

        // broadcast update transaction
        const signedUpdateTransaction = await tronWeb.trx.sign(
            transac1.transaction, priKey, false,false,false);
        console.log("signedUpdateTransaction: "+util.inspect(signedUpdateTransaction,true,null,true))

        const result = await tronWeb.trx.broadcast(signedUpdateTransaction);
        await wait(3);
        console.log("result: "+util.inspect(result,true,null,true))
    });

})
