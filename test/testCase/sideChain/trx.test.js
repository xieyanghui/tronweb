const {DEPOSIT_FEE, WITHDRAW_FEE, FEE_LIMIT} = require('../util/config');
const tronWebBuilder = require('../util/tronWebBuilder');
const assertThrow = require('../../helpers/assertThrow');
const publicMethod = require('../util/PublicMethod');
const wait = require('../../helpers/wait');
const chai = require('chai');
const assert = chai.assert;

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

                // depositTrx
                const depositNum = 10e6;
                let depositTrxMap = await publicMethod.depositTrx(depositNum);
                let depositTxFee = depositTrxMap.get("depositTxFee");

                const mAccountAfter = await tronWeb.sidechain.mainchain.trx.getAccount();
                const sAccountAfter = await tronWeb.sidechain.sidechain.trx.getAccount();
                const mDepositBalanceAfter = mAccountAfter.balance;
                const sDepositBalanceAfter = sAccountAfter.balance;
                console.log('mDepositBalanceAfter: ' +  mDepositBalanceAfter)
                console.log('sDepositBalanceAfter: ' +  sDepositBalanceAfter)
                assert.equal(mDepositBalanceAfter, mDepositBalanceBefore - depositNum - depositTxFee - DEPOSIT_FEE);
                assert.equal(sDepositBalanceAfter, sDepositBalanceBefore + depositNum);
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

                // withdrawTrx
                const withdrawNum = 10e6;
                let withdrawTrxMap = await publicMethod.withdrawTrx(withdrawNum);
                let withdrawTxFee = withdrawTrxMap.get("withdrawTxFee");

                const mAccountAfter = await tronWeb.sidechain.mainchain.trx.getAccount();
                const sAccountAfter = await tronWeb.sidechain.sidechain.trx.getAccount();
                const mWithdrawBalanceAfter = mAccountAfter.balance;
                const sWithdrawBalanceAfter = sAccountAfter.balance;
                console.log('mWithdrawBalanceAfter: ' +  mWithdrawBalanceAfter)
                console.log('sWithdrawBalanceAfter: ' +  sWithdrawBalanceAfter)
                assert.equal(mWithdrawBalanceBefore + withdrawNum, mWithdrawBalanceAfter);
                assert.equal(sWithdrawBalanceAfter, sWithdrawBalanceBefore - withdrawNum - WITHDRAW_FEE - withdrawTxFee);
            });

        });
    });
});

