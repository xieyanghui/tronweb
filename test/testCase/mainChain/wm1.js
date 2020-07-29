const tronWebBuilder = require('../util/tronWebBuilder');
const TronWeb = tronWebBuilder.TronWeb;
const options = {
    fullNode: 'https://api.nileex.io',
    solidityNode: 'https://api.nileex.io',
    eventServer: 'https://event.nileex.io',
    privateKey : '',
};
const tronWeb = new TronWeb(options);
/**
 * test toHex('')
 */
console.log(tronWeb.toHex(''),2);
console.log(tronWeb.toHex('  '),3);
console.log(tronWeb.toHex('we '),4);
console.log(tronWeb.toHex('we we'),5);
console.log(tronWeb.toHex('we we    we'),6);
console.log(tronWeb.toHex(true),7);
console.log(tronWeb.toHex(1234),8);
console.log(tronWeb.toHex(" 1234 "),9);
console.log(tronWeb.toHex("12x"),10);
console.log(tronWeb.toHex("x34"),11);
console.log(tronWeb.toHex("12 34"),12);
console.log(tronWeb.toHex(),14);
// tronWeb.trx.getAccount('TDQsxPhq9bgmnw9CeDSrXsYjqt2rb1b3pg').then(function(data) {
//     console.log(data);
// });
var priKey = "553c7b0dee17d3f5b334925f5a90fe99fb0b93d47073d69ec33eead8459d171e";
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
tronWeb.trx.sign(transac1.transaction,priKey,true,true,false).then(function (data) {
    console.log(data.valueOf()["raw_data"]["contract"][0]);
    console.log(data);
});
tronWeb.trx.broadcast(transac1.transaction).then(function (data) {
    console.log(data)
});
