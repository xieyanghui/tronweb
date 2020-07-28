const {DEPOSIT_FEE, WITHDRAW_FEE, FEE_LIMIT, TOKEN_ID} = require('../util/config');
const tronWebBuilder = require('../util/tronWebBuilder');
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
                const sTrc10BalanceBefore = sAccountBefore.assetV2 ? sAccountBefore.assetV2.filter((item)=> item.key == TOKEN_ID)[0].value : 0;
                console.log("sAccountBefore.assetV2:"+sTrc10BalanceBefore);

                // depositTrc10
                const depositNum = 1000;
                let depositTrc10Map = await publicMethod.depositTrc10(depositNum);
                let depositTxFee = depositTrc10Map.get("depositTxFee");

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
                assert.equal(mTrc10BalanceBefore-depositNum,mTrc10BalanceAfter);
                assert.equal(sTrc10BalanceBefore+depositNum,sTrc10BalanceAfter);
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
                    const sTrc10BalanceBefore = sAccountBefore.assetV2 ? sAccountBefore.assetV2.filter((item)=> item.key == TOKEN_ID)[0].value : 0;
                    console.log("sAccountBefore.assetV2:"+sTrc10BalanceBefore);

                    // withdrawTrc10
                    const withdrawNum = 10e2;
                    let withdrawTrc10Map = await publicMethod.withdrawTrc10(withdrawNum);
                    let withdrawTxFee = withdrawTrc10Map.get("withdrawTxFee");

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
                    assert.equal(mTrc10BalanceBefore+withdrawNum,mTrc10BalanceAfter);
                    assert.equal(sTrc10BalanceBefore-withdrawNum,sTrc10BalanceAfter);
                });
            });
        });
    });
});

