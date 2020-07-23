const tronWebBuilder = require('../../helpers/tronWebBuilder');
const {ADDRESS_BASE58,PRIVATE_KEY, DEPOSIT_FEE, FEE_LIMIT} = require('./config');
const jlog = require('../../helpers/jlog')
const wait = require('../../helpers/wait');
const chalk = require('chalk')
const util = require('util');
const chai = require('chai');
const assert = chai.assert;

const accAdd = async (A, B) => {
    var r1,r2,m;
    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
    m=Math.pow(10,Math.max(r1,r2))
    return (arg1*m+arg2*m)/m
}

const sumBigNumber = async (a, b) => {
    var res = '',
        temp = 0;
    a = a.toString().split('');
    b = b.toString().split('');
    while (a.length || b.length || temp) {
        temp += ~~a.pop() + ~~b.pop();
        res = (temp % 10) + res;
        temp = temp > 9;
    }
    return res.replace(/^0+/, '');
}

const reduce = async (a, b) => {
    console.log("a:"+a)
    console.log("b:"+b)
    a = a.toString().split('');
    b = b.toString().split('');
    var aMaxb = a.length > b.length; // 标记A是否大于B
    if(a.length == b.length)
    {
        for(var i=0, len=a.length; i<len; i++)
        {
            if(a[i] == b[i]) continue;
            aMaxb = a[i] > b[i];
            break;
        }
    }
    if(!aMaxb){
        a = [b, b = a][0]; // 只要A不比B大都交换
    }
    var result = '';
    while(a.length)
    {
        var temp = parseInt(a.pop()) - parseInt(b.pop() || 0);
        if(temp >= 0) {
            result = temp + result;
        } else{
            result = temp + 10 + result;
            a[a.length-1]--; // 由于已经保证了a一定大于等于b，所以不存在a[i-1]为undefined的情况
        }
    }
    var resultEnd = (aMaxb?'':'-') + result.replace(/^0*/g, '');// 去掉前面可能的无效0
    if(resultEnd === '-'){
        resultEnd = '0'
    }
    return resultEnd;
}

const newMainTestAccounts = async (amount) => {
    const tronWeb = tronWebBuilder.createInstance();

    console.log(chalk.blue(`Generating ${amount} new accounts...`))
    await tronWeb.fullNode.request('/admin/temporary-accounts-generation?accounts=' + amount);
    const lastCreated = await getTestAccounts(-1)
    jlog(lastCreated.b58)
}

const getTestAccounts = async (block) => {
    const accounts = {
        b58: [],
        hex: [],
        pks: []
    }
    const tronWeb = tronWebBuilder.createInstance();
    const accountsJson = await tronWeb.fullNode.request('/admin/accounts-json');
    const index = typeof block === 'number'
        ? (block > -1 && block < accountsJson.more.length ? block : accountsJson.more.length - 1)
        : undefined
    accounts.pks = typeof block === 'number'
        ? accountsJson.more[index].privateKeys
        : accountsJson.privateKeys;
    for (let i = 0; i < accounts.pks.length; i++) {
        let addr = tronWeb.address.fromPrivateKey(accounts.pks[i]);
        accounts.b58.push(addr);
        accounts.hex.push(tronWeb.address.toHex(addr));
    }
    return Promise.resolve(accounts);
}

const newSideTestAccounts = async (amount) => {
    await newMainTestAccounts(amount);
    const tronWeb = tronWebBuilder.createInstanceSide();
    let accounts = await tronWebBuilder.getTestAccounts(-1);
    for (let i = 0; i < amount-1; i++) {
        let ownerAddress = accounts.b58[i];
        let ownerPk = accounts.pks[i];
        const callValue = 3000000000;
        console.log("deposit--"+i+",ownerPk: "+ownerPk)
        const depositId = await tronWeb.sidechain.depositTrx(callValue, DEPOSIT_FEE,FEE_LIMIT,{},ownerPk.toString(),false);
        console.log("deposit--"+i+",txId: "+depositId)
        assert.equal(depositId.length, 64);
        /*const depositInfo =await tronWeb.sidechain.mainchain.trx.getTransactionInfo(depositId);
        console.log("depositInfo:"+util.inspect(depositInfo))
        console.log("depositInfo.receipt.result:"+util.inspect(depositInfo).receipt.result)
        assert.equal(depositInfo.receipt.result, "SUCCESS");*/
    }
        await wait(90);
}

const getSideTestAccounts = async (block) => {
    /*const accounts = {
        b58: [],
        hex: [],
        pks: []
    }
    const tronWeb = tronWebBuilder.createInstanceSide();
    const accountsJson = await tronWeb.sidechain.sidechain.fullNode.request('/admin/accounts-json');
    const index = typeof block === 'number'
        ? (block > -1 && block < accountsJson.more.length ? block : accountsJson.more.length - 1)
        : undefined
    accounts.pks = typeof block === 'number'
        ? accountsJson.more[index].privateKeys
        : accountsJson.privateKeys;
    for (let i = 0; i < accounts.pks.length; i++) {
        let addr = tronWeb.address.fromPrivateKey(accounts.pks[i]);
        accounts.b58.push(addr);
        accounts.hex.push(tronWeb.address.toHex(addr));
    }
    return Promise.resolve(accounts);*/
}

module.exports = {
    reduce,
    sumBigNumber,
    accAdd,
    newMainTestAccounts,
    getTestAccounts,
    newSideTestAccounts
}
