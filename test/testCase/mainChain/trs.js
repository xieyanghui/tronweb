const arguments = process.argv.splice(2);
//const TronWeb = require('tronweb')
const tronWebBuilder = require('../util/tronWebBuilder');
const TronWeb = tronWebBuilder.TronWeb;
const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider("https://api.trongrid.io");
const solidityNode = new HttpProvider("https://api.trongrid.io");
const eventServer = new HttpProvider("https://api.trongrid.io");
const privateKey = "3481E79956D4BD95F358AC96D151C976392FC4E3FC132F78A847906DE588C145";
const tronWeb = new TronWeb(fullNode,solidityNode,eventServer,privateKey);
function getContractFromAbi() {
    console.log(tronWeb.contract([{"constant":false,"inputs":[{"name":"number","type":"uint256"}],"name":"constructor","outputs":[{"name":"result","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"number","type":"uint256"}],"name":"calculateValue","outputs":[{"name":"result","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"input","type":"uint256"},{"indexed":false,"name":"result","type":"uint256"}],"name":"Notify","type":"event"}]))
}
function getContractFromAddress(input) {
    console.log(tronWeb.contract([input]))
}
async function getEventByTransactionID(input) {
    console.log("input:"+input)
    //console.log(await tronWeb.getEventByTransactionID(input))
    tronWeb.getEventByTransactionID(input).then(
        function(data){console.log(data)}
        );
}

async function listExchangesPaginated() {
    console.log("input:"+input)
    //console.log(await tronWeb.getEventByTransactionID(input))
    // tronWeb.getEventByTransactionID(input).then(
    //     function(data){console.log(data)}
    //     );
    let list = await tronWeb.trx.listExchangesPaginated(20, 0);
    console.log("list:"+JSON.stringify(list))

}node

switch(arguments[0]) {
    case "getContractFromAbi":
        getContractFromAbi()
        break;
    case "getContractFromAddress":
        getContractFromAddress(arguments[1])
        break;
    case "getEventByTransactionID":
        getEventByTransactionID(arguments[1])
        break;
    case "listExchangesPaginated":
        listExchangesPaginated()
        break;
    default:
        break;
}
