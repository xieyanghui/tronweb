const {PRIVATE_KEY,ADDRESS_HEX, TRC721_ID,ADDRESS721_MAPPING,CONTRACT_ADDRESS721, DEPOSIT_FEE, WITHDRAW_FEE, FEE_LIMIT, ADDRESS_BASE58, SIDE_CHAIN} = require('./config');

const tronWebBuilder = require('../helpers/tronWebBuilder');
const TronWeb = tronWebBuilder.TronWeb;
const log = require('../helpers/log')
const chai = require('chai');
const assert = chai.assert;
const assertThrow = require('../helpers/assertThrow');
const wait = require('../helpers/wait');
const util = require('util');

describe('TronWeb Instance', function() {
    describe('#depositTrc721', function () {
        const tronWeb = tronWebBuilder.createInstanceSide();
        it('deposit trc721 from main chain to side chain', async function () {
            // before trx balance
            const mAccountbefore = await tronWeb.sidechain.mainchain.trx.getAccount();
            const sAccountbefore = await tronWeb.sidechain.sidechain.trx.getAccount();
            const mTrxBalanceBefore = mAccountbefore.balance;
            const sTrxBalanceBefore = sAccountbefore.balance;
            console.log('mTrxBalanceBefore: ' + mTrxBalanceBefore);
            console.log('sTrxBalanceBefore: ' + sTrxBalanceBefore);

            // approveTrc721
            const approveId = await tronWeb.sidechain.approveTrc721(TRC721_ID, 1000000000, CONTRACT_ADDRESS721)
            console.log("approveId: "+approveId);
            assert.equal(approveId.length, 64);
            await wait(90);
            const approveInfo = await tronWeb.sidechain.mainchain.trx.getTransactionInfo(approveId);
            const approveTxFee = typeof(approveInfo.fee)=="undefined"?0:approveInfo.fee;
            console.log('approveTxFee: ' + approveTxFee)

            // depositTrc721
            const depositId = await tronWeb.sidechain.depositTrc721(TRC721_ID, DEPOSIT_FEE,FEE_LIMIT, CONTRACT_ADDRESS721);
            console.log("depositId: "+depositId);
            assert.equal(depositId.length, 64);
            await wait(90);
            const depositInfo =await tronWeb.sidechain.mainchain.trx.getTransactionInfo(depositId);
            console.log("depositInfo: "+util.inspect(depositInfo));
            const depositTxFee = typeof(depositInfo.fee)=="undefined"?0:depositInfo.fee;
            console.log('depositTxFee: ' + depositTxFee)

            // after trx balance
            const mAccountAfter = await tronWeb.sidechain.mainchain.trx.getAccount();
            const sAccountAfter = await tronWeb.sidechain.sidechain.trx.getAccount();
            const mTrxBalanceAfter = mAccountAfter.balance;
            const sTrxBalanceAfter = sAccountAfter.balance;
            console.log('mTrxBalanceAfter: ' + mTrxBalanceAfter);
            console.log('sTrxBalanceAfter: ' + sTrxBalanceAfter);
            assert.equal(mTrxBalanceBefore-depositTxFee-approveTxFee,mTrxBalanceAfter);
            assert.equal(sTrxBalanceBefore,sTrxBalanceAfter);

            // after token balance
            const address = tronWeb.address.fromPrivateKey(PRIVATE_KEY);
            let mTrc721Contract = await tronWeb.sidechain.mainchain.contract().at(CONTRACT_ADDRESS721);
            let mTrc721BalanceAfter = await mTrc721Contract.ownerOf(TRC721_ID).call()
            let sTrc721OwnerResultAfter=await tronWeb.sidechain.sidechain.transactionBuilder.triggerSmartContract(
                ADDRESS721_MAPPING,
                'ownerOf(uint256)',
                {_isConstant: true},
                [{type: 'uint256', value: TRC721_ID}]);
            let sTrc721OwnerAfter = sTrc721OwnerResultAfter && sTrc721OwnerResultAfter.result ? sTrc721OwnerResultAfter.constant_result[0].toLocaleString().toLowerCase() : 0;
            sTrc721OwnerAfter = "41"+sTrc721OwnerAfter.substr(24);
            assert.equal(mTrc721BalanceAfter,SIDE_CHAIN.sideOptions.mainGatewayAddress_hex)
            assert.equal(sTrc721OwnerAfter,ADDRESS_HEX)
        });
    });
    describe('#withdrawTrc721', async function () {
        const tronWeb = tronWebBuilder.createInstanceSide();
        it('withdraw trc721 from side chain to main chain', async function () {
            // before trx balance
            const mAccountbefore = await tronWeb.sidechain.mainchain.trx.getAccount();
            const sAccountbefore = await tronWeb.sidechain.sidechain.trx.getAccount();
            const mTrxBalanceBefore = mAccountbefore.balance;
            const sTrxBalanceBefore = sAccountbefore.balance;
            console.log('mTrxBalanceBefore: ' + mTrxBalanceBefore);
            console.log('sTrxBalanceBefore: ' + sTrxBalanceBefore);

            // withdrawTrc721
            const withdrawId = await tronWeb.sidechain.withdrawTrc721(TRC721_ID, WITHDRAW_FEE,FEE_LIMIT, ADDRESS721_MAPPING);
            console.log("withdrawId: "+withdrawId);
            assert.equal(withdrawId.length, 64);
            await wait(90);
            const withdrawInfo =await tronWeb.sidechain.sidechain.trx.getTransactionInfo(withdrawId);
            const withdrawTxFee = typeof(withdrawInfo.fee)=="undefined"?0:withdrawInfo.fee;
            console.log('withdrawTxFee: ' + withdrawTxFee)

            // after trx balance
            const mAccountAfter = await tronWeb.sidechain.mainchain.trx.getAccount();
            const sAccountAfter = await tronWeb.sidechain.sidechain.trx.getAccount();
            const mTrxBalanceAfter = mAccountAfter.balance;
            const sTrxBalanceAfter = sAccountAfter.balance;
            console.log('mTrxBalanceAfter: ' + mTrxBalanceAfter);
            console.log('sTrxBalanceAfter: ' + sTrxBalanceAfter);
            assert.equal(mTrxBalanceBefore,mTrxBalanceAfter);
            assert.equal(sTrxBalanceBefore-withdrawTxFee-WITHDRAW_FEE,sTrxBalanceAfter);

            // after token balance
            let mTrc721Contract = await tronWeb.sidechain.mainchain.contract().at(CONTRACT_ADDRESS721);
            let mTrc721BalanceAfter = await mTrc721Contract.ownerOf(TRC721_ID).call()
            assert.equal(mTrc721BalanceAfter,ADDRESS_HEX)
            await assertThrow(
                tronWeb.sidechain.sidechain.transactionBuilder.triggerSmartContract(
                    ADDRESS721_MAPPING,
                    'ownerOf(uint256)',
                    {_isConstant: true},
                    [{type: 'uint256', value: TRC721_ID}]
                ),
                'REVERT opcode executed'
            );
        });
    });
});




