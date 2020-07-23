const {DEPOSIT_FEE, WITHDRAW_FEE, FEE_LIMIT, TOKEN_ID} = require('../util/config');
const tronWebBuilder = require('../../helpers/tronWebBuilder');
const assertThrow = require('../../helpers/assertThrow');
const publicMethod = require('../util/PublicMethod');
const wait = require('../../helpers/wait');
const chai = require('chai');
const assert = chai.assert;

describe('TronWeb Instance', function() {
    describe('#trx', function() {
        describe('#depositTrc10()', function () {
            const tronWeb = tronWebBuilder.createInstanceSide();
            it('deposit trc10 from main chain to side chain', async function () {
                // before trx balance
                const mAccountbefore = await tronWeb.sidechain.mainchain.trx.getAccount();
                const sAccountbefore = await tronWeb.sidechain.sidechain.trx.getAccount();
                const mTrxBalanceBefore = mAccountbefore.balance;
                const sTrxBalanceBefore = sAccountbefore.balance;
                console.log('mTrxBalanceBefore: ' + mTrxBalanceBefore);
                console.log('sTrxBalanceBefore: ' + sTrxBalanceBefore);

                // before token balance
                const mAccountBefore = await tronWeb.sidechain.mainchain.trx.getAccount();
                const mTrc10BalanceBefore = mAccountBefore.assetV2.filter((item)=> item.key == TOKEN_ID)[0].value;
                console.log("mAccountBefore.assetV2:"+mTrc10BalanceBefore);
                const sAccountBefore = await tronWeb.sidechain.sidechain.trx.getAccount();
                const sTrc10BalanceBefore = sAccountBefore.assetV2.filter((item)=> item.key == TOKEN_ID)[0].value;
                console.log("sAccountBefore.assetV2:"+sTrc10BalanceBefore);

                // depositTrc10
                const tokenValue = 1000;
                const depositId = await tronWeb.sidechain.depositTrc10(TOKEN_ID, tokenValue, DEPOSIT_FEE, FEE_LIMIT);
                console.log('depositId: ' + depositId)
                assert.equal(depositId.length, 64);
                await wait(80);
                const depositInfo =await tronWeb.sidechain.mainchain.trx.getTransactionInfo(depositId);
                const depositTxFee = typeof(depositInfo.fee)=="undefined"?0:depositInfo.fee;
                console.log('depositTxFee: ' + depositTxFee)

                // after trx balance
                const mAccountAfter = await tronWeb.sidechain.mainchain.trx.getAccount();
                const sAccountAfter = await tronWeb.sidechain.sidechain.trx.getAccount();
                const mTrxBalanceAfter = mAccountAfter.balance;
                const sTrxBalanceAfter = sAccountAfter.balance;
                console.log('mTrxBalanceAfter: ' + mTrxBalanceAfter);
                console.log('sTrxBalanceAfter: ' + sTrxBalanceAfter);
                assert.equal(mTrxBalanceBefore-depositTxFee-DEPOSIT_FEE,mTrxBalanceAfter);
                assert.equal(sTrxBalanceBefore,sTrxBalanceAfter);

                // after token balance
                const mTrc10BalanceAfter = mAccountAfter.assetV2.filter((item)=> item.key == TOKEN_ID)[0].value;
                console.log("mAccountAfter.assetV2:"+mTrc10BalanceAfter);
                const sTrc10BalanceAfter = sAccountAfter.assetV2.filter((item)=> item.key == TOKEN_ID)[0].value;
                console.log("sAccountAfter.assetV2:"+sTrc10BalanceAfter);
                assert.equal(mTrc10BalanceBefore-tokenValue,mTrc10BalanceAfter);
                assert.equal(sTrc10BalanceBefore+tokenValue,sTrc10BalanceAfter);
            });

            describe('#withdrawTrc10()', function () {
                const tronWeb = tronWebBuilder.createInstanceSide();
                it('withdraw trc10 from side chain to main chain', async function () {
                    // before trx balance
                    const mAccountbefore = await tronWeb.sidechain.mainchain.trx.getAccount();
                    const sAccountbefore = await tronWeb.sidechain.sidechain.trx.getAccount();
                    const mTrxBalanceBefore = mAccountbefore.balance;
                    const sTrxBalanceBefore = sAccountbefore.balance;
                    console.log('mTrxBalanceBefore: ' + mTrxBalanceBefore);
                    console.log('sTrxBalanceBefore: ' + sTrxBalanceBefore);

                    // before token balance
                    const mAccountBefore = await tronWeb.sidechain.mainchain.trx.getAccount();
                    const mTrc10BalanceBefore = mAccountBefore.assetV2.filter((item)=> item.key == TOKEN_ID)[0].value;
                    console.log("mAccountBefore.assetV2:"+mTrc10BalanceBefore);
                    const sAccountBefore = await tronWeb.sidechain.sidechain.trx.getAccount();
                    const sTrc10BalanceBefore = sAccountBefore.assetV2.filter((item)=> item.key == TOKEN_ID)[0].value;
                    console.log("sAccountBefore.assetV2:"+sTrc10BalanceBefore);

                    // withdrawTrc10
                    const tokenValue = 1;
                    const withdrawId = await tronWeb.sidechain.withdrawTrc10(TOKEN_ID, tokenValue, WITHDRAW_FEE, FEE_LIMIT);
                    console.log('withdrawId: ' + withdrawId)
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
                    assert.equal(await publicMethod.reduce(await publicMethod.reduce(sTrxBalanceBefore,withdrawTxFee),WITHDRAW_FEE),sTrxBalanceAfter);

                    // after token balance
                    const mTrc10BalanceAfter = mAccountAfter.assetV2.filter((item)=> item.key == TOKEN_ID)[0].value;
                    console.log("mAccountAfter.assetV2:"+mTrc10BalanceAfter);
                    const sTrc10BalanceAfter = sAccountAfter.assetV2.filter((item)=> item.key == TOKEN_ID)[0].value;
                    console.log("sAccountAfter.assetV2:"+sTrc10BalanceAfter);
                    assert.equal(mTrc10BalanceBefore+tokenValue,mTrc10BalanceAfter);
                    assert.equal(sTrc10BalanceBefore-tokenValue,sTrc10BalanceAfter);
                });
            });
        });
    });
});

