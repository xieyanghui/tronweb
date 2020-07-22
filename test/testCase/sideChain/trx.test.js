const {DEPOSIT_FEE, WITHDRAW_FEE, FEE_LIMIT} = require('./config');

const tronWebBuilder = require('../helpers/tronWebBuilder');
const chai = require('chai');
const assert = chai.assert;
const assertThrow = require('../helpers/assertThrow');
const wait = require('../helpers/wait');

describe('TronWeb Instance', function() {

    describe('#trx normal', function() {

        describe('#depositTrx()', function () {
            const tronWeb = tronWebBuilder.createInstanceSide();

            it('deposit trx from main chain to side chain', async function () {
                const mAccountBefore = await tronWeb.sidechain.mainchain.trx.getAccount();
                const sAccountBefore = await tronWeb.sidechain.sidechain.trx.getAccount();
                const mDepositBalanceBefore = mAccountBefore.balance;
                const sDepositBalanceBefore = sAccountBefore.balance;
                console.log('mDepositBalanceBefore: ' + mDepositBalanceBefore);
                console.log('sDepositBalanceBefore: ' + sDepositBalanceBefore);

                const callValue = 10000000;
                const depositId = await tronWeb.sidechain.depositTrx(callValue, DEPOSIT_FEE,FEE_LIMIT);
                console.log("depositId:"+depositId)
                assert.equal(depositId.length, 64);
                await wait(90);
                const depositInfo =await tronWeb.sidechain.mainchain.trx.getTransactionInfo(depositId);
                console.log("depositInfo:"+depositInfo)
                const depositTxFee = typeof(depositInfo.fee)=="undefined"?0:depositInfo.fee;
                console.log('depositTxFee: ' + depositTxFee)

                const mAccountAfter = await tronWeb.sidechain.mainchain.trx.getAccount();
                const sAccountAfter = await tronWeb.sidechain.sidechain.trx.getAccount();
                const mDepositBalanceAfter = mAccountAfter.balance;
                const sDepositBalanceAfter = sAccountAfter.balance;
                console.log('mDepositBalanceAfter: ' +  mDepositBalanceAfter)
                console.log('sDepositBalanceAfter: ' +  sDepositBalanceAfter)
                assert.equal(mDepositBalanceAfter, mDepositBalanceBefore - callValue - depositTxFee - DEPOSIT_FEE);
                assert.equal(sDepositBalanceAfter, sDepositBalanceBefore + callValue);
            });
        });

        describe('#withdrawTrx()', function () {
            const tronWeb = tronWebBuilder.createInstanceSide();
            it('withdraw trx from side chain to main chain', async function () {
                const mAcountBefore = await tronWeb.sidechain.mainchain.trx.getAccount();
                const sAcountBefore = await tronWeb.sidechain.sidechain.trx.getAccount();
                const mWithdrawBalanceBefore = mAcountBefore.balance;
                const sWithdrawBalanceBefore = sAcountBefore.balance;
                console.log('mWithdrawBalanceBefore: ' + mWithdrawBalanceBefore);
                console.log('sWithdrawBalanceBefore: ' + sWithdrawBalanceBefore);

                const callValue = 10000000;
                const withdrawId = await tronWeb.sidechain.withdrawTrx(callValue, WITHDRAW_FEE,FEE_LIMIT);
                console.log("withdrawId: "+withdrawId);
                assert.equal(withdrawId.length, 64);
                await wait(90);
                const withdrawInfo =await tronWeb.sidechain.sidechain.trx.getTransactionInfo(withdrawId);
                const withdrawTxFee = typeof(withdrawInfo.fee)=="undefined"?0:withdrawInfo.fee;
                console.log('withdrawTxFee: ' + withdrawTxFee)

                const result =await tronWeb.sidechain.mainchain.trx.getTransactionInfo(withdrawId);
                console.log("result:"+result)
                const mAccountAfter = await tronWeb.sidechain.mainchain.trx.getAccount();
                const sAccountAfter = await tronWeb.sidechain.sidechain.trx.getAccount();
                const mWithdrawBalanceAfter = mAccountAfter.balance;
                const sWithdrawBalanceAfter = sAccountAfter.balance;
                console.log('mWithdrawBalanceAfter: ' +  mWithdrawBalanceAfter)
                console.log('sWithdrawBalanceAfter: ' +  sWithdrawBalanceAfter)
                assert.equal(mWithdrawBalanceBefore + callValue, mWithdrawBalanceAfter);
                assert.equal(sWithdrawBalanceAfter, sWithdrawBalanceBefore - callValue - WITHDRAW_FEE - withdrawTxFee);
            });

        });
    });
});

