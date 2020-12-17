const tronWebBuilder = require('../util/tronWebBuilder');
const TronWeb = tronWebBuilder.TronWeb;
const wait = require('../../helpers/wait');
const util = require('util');

const options = {
    fullNode: 'http://39.107.81.225:9193',
    solidityNode: 'http://39.107.81.225:9197',
    eventServer: 'http://39.107.81.225:9190',
    privateKey : '',
};

describe("#multiSignTransaction", async function () {
    const tronWeb = new TronWeb(options);

    var priKey = "4a2f422b1451b667b7879dbb941f70e651e7f307d310cd51fbb317d0f7ed449c";
    var transac1 ={
        "result": {
            "result": true
        },
        "transaction": {
            "visible": true,
            "txID": "d2c52a12bcdf3c1f61c8eb0a0e14fa104168804ebe5bdc4a61937b94c7915826",
            "raw_data": {
                "contract": [{
                    "parameter": {
                        "value": {
                            "data": "3be9ece7000000000000000000000000b0a2e61466fd35c9e96dd05970dfa9c5279c980600000000000000000000000000000000000000000000000000000000000f424d0000000000000000000000000000000000000000000000000000000000000001",
                            "token_id": 1000013,
                            "owner_address": "TAQ6xsTwofjeqp6MnqU7igizEs31QsS1un",
                            "call_token_value": 20,
                            "contract_address": "TPw5dcyngR4pbe5ng5s2AfKCxW1FnwRYuf",
                            "call_value": 10
                        },
                        "type_url": "type.googleapis.com/protocol.TriggerSmartContract"
                    },
                    "type": "TriggerSmartContract"
                }],
                "ref_block_bytes": "28e5",
                "ref_block_hash": "6d84a14b962cfa66",
                "expiration": 1600855236000,
                "fee_limit": 1000000000,
                "timestamp": 1600855177653
            },
            "raw_data_hex": "0a0228e522086d84a14b962cfa6640a0bba1d3cb2e5ad701081f12d2010a31747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e54726967676572536d617274436f6e7472616374129c010a154104b55be7bf693b787759c1122ca41530f60ba4a0121541992ac6f6b3a5cd83c51985caf30d442957215b3a180a22643be9ece7000000000000000000000000b0a2e61466fd35c9e96dd05970dfa9c5279c980600000000000000000000000000000000000000000000000000000000000f424d0000000000000000000000000000000000000000000000000000000000000001281430cd843d70b5f39dd3cb2e90018094ebdc03"
        }
    };
    it('sign', async function () {
        // broadcast update transaction
        const signedUpdateTransaction = await tronWeb.trx.sign(
            transac1.transaction, priKey, true,true,false);
        const result = await tronWeb.trx.broadcast(signedUpdateTransaction);
        await wait(3);
        console.log("result: "+util.inspect(result,true,null,true))
    });

})
