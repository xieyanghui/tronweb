const {tronToken} = require('../util/contracts');
const tronWebBuilder = require('../util/tronWebBuilder');
const TronWeb = tronWebBuilder.TronWeb;
const wait = require('../util/wait');
var request = require('request');
const util = require('util');
const {
    ADDRESS_HEX,
    ADDRESS_BASE58,
    UPDATED_TEST_TOKEN_OPTIONS,
    PRIVATE_KEY,
    FEE_LIMIT,
    getTokenOptions,
    isProposalApproved,
    TOKEN_ID
} = require('../util/config');

const options = {
    fullNode: 'http://39.107.123.182:8590',
    solidityNode: 'http://39.107.123.182:8591',
    eventServer: 'http://39.107.123.182:8590',
    privateKey : 'a723782179b1973a5607bec7e8f8b55917965e953f844b61afacdb789b378295',
};

describe("#multiSignTransaction", async function () {
    const tronWeb = tronWebBuilder.createInstance();

    var priKey = "08aada4fd538d204e8f7073872d1771331bf6d32e36111461b5cec6c5bb13712";
    var transac1 ={
        "result": {
            "result": true
        },
        "transaction": {
            "visible": true,
            "txID": "4fc0e7c4569508bcbb647207ddaf99c7001328f8659559f29d9913a014cb934d",
            "raw_data": {
                "contract": [{
                    "parameter": {
                        "value": {
                            "data": "3be9ece7000000000000000000000000151b012710360bf29c3095305dea8812d163e4b800000000000000000000000000000000000000000000000000000000000f42930000000000000000000000000000000000000000000000000000000000000001",
                            "token_id": 1000083,
                            "owner_address": "TNsbP2WfkfVMmvhR3tyaKHCf9N4cjbwzq6",
                            "call_token_value": 20,
                            "contract_address": "TFEnv3pK6yKjgnbPB46pjtYh6jp6aQ9p3n",
                            "call_value": 10
                        },
                        "type_url": "type.googleapis.com/protocol.TriggerSmartContract"
                    },
                    "type": "TriggerSmartContract"
                }],
                "ref_block_bytes": "fc04",
                "ref_block_hash": "eaf68476fb368636",
                "expiration": 1641450258000,
                "fee_limit": 1000000000,
                "timestamp": 1641450200022
            },
            "raw_data_hex": "0a02fc042208eaf68476fb36863640d0fcbcf0e22f5ad701081f12d2010a31747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e54726967676572536d617274436f6e7472616374129c010a15418d89d1fccacc31f3d7e591641729c537f755789312154139cb2d92727b07aa5ef4a739b1690a6734dd9af7180a22643be9ece7000000000000000000000000151b012710360bf29c3095305dea8812d163e4b800000000000000000000000000000000000000000000000000000000000f4293000000000000000000000000000000000000000000000000000000000000000128143093853d70d6b7b9f0e22f90018094ebdc03"
        }
    };

    /*// createSmartContract
    const options = {
        abi: tronToken.abi,
        bytecode: tronToken.bytecode,
        parameters: [ADDRESS_BASE58],
        feeLimit:FEE_LIMIT,
    };
    const createTransaction = await tronWeb.transactionBuilder.createSmartContract(options, ADDRESS_BASE58);
    const createTx = await broadcaster.broadcaster(null, PRIVATE_KEY, createTransaction);
    assert.equal(createTx.transaction.txID.length, 64);
    let createInfo;
    while (true) {
        createInfo = await tronWeb.trx.getTransactionInfo(createTx.transaction.txID);
        if (Object.keys(createInfo).length === 0) {
            await wait(3);
            continue;
        } else {
            console.log("createInfo:"+util.inspect(createInfo))
            break;
        }
    }
    const contractAddress = createInfo.contract_address;

    let requestData = {
        "owner_address": "\""+ADDRESS_BASE58+"\"",
        "contract_address": "\""+contractAddress+"\"",
        "function_selector": "transfer(address, uint256)",
        "parameter": "000000000000000000000000a929a71b8d84b83b187d660020ad54c8fbc5916300000000000000000000000000000000000000000000000000000000000f42750000000000000000000000000000000000000000000000000000000000000001",
        "fee_limit": 1000000000,
        "call_value": 10,
        "token_id": 1000053,
        "call_token_value": 20,
        "visible": "true"
    };
    request({
        url: url,
        method: "POST",
        json: true,
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(requestData)
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
        }
    });*/
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
