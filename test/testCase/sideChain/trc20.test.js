const {PRIVATE_KEY,CONTRACT_ADDRESS20,ADDRESS20_MAPPING,DEPOSIT_FEE, WITHDRAW_FEE, FEE_LIMIT, ADDRESS_BASE58} = require('./config');

const tronWebBuilder = require('../helpers/tronWebBuilder');
const chai = require('chai');
const assert = chai.assert;
const assertThrow = require('../helpers/assertThrow');
const wait = require('../helpers/wait');
const publicMethod = require('./util/PublicMethod');

describe('TronWeb Instance', function() {
    describe('#depositTrc20', function () {
        const tronWeb = tronWebBuilder.createInstanceSide();
        it('deposit trc20 from main chain to side chain', async function () {
            // before trx balance
            const mAccountbefore = await tronWeb.sidechain.mainchain.trx.getAccount();
            const sAccountbefore = await tronWeb.sidechain.sidechain.trx.getAccount();
            const mTrxBalanceBefore = mAccountbefore.balance;
            const sTrxBalanceBefore = sAccountbefore.balance;
            console.log('mTrxBalanceBefore: ' + mTrxBalanceBefore);
            console.log('sTrxBalanceBefore: ' + sTrxBalanceBefore);

            // approve
            const approveId = await tronWeb.sidechain.approveTrc20(100, FEE_LIMIT, CONTRACT_ADDRESS20)
            console.log("approveId: "+approveId);
            assert.equal(approveId.length, 64);
            await wait(90);
            const approveInfo = await tronWeb.sidechain.mainchain.trx.getTransactionInfo(approveId);
            const approveTxFee = typeof(approveInfo.fee)=="undefined"?0:approveInfo.fee;
            console.log('approveTxFee: ' + approveTxFee)

            // before token balance
            const address = tronWeb.address.fromPrivateKey(PRIVATE_KEY);
            let mTrc20Contract = await tronWeb.sidechain.mainchain.contract().at(CONTRACT_ADDRESS20);
            let mTrc20BalanceBefore = await mTrc20Contract.balanceOf(address).call();
            mTrc20BalanceBefore = parseInt(mTrc20BalanceBefore, 16);
            console.log("mTrc20BalanceBefore："+mTrc20BalanceBefore);
            let sTrc20balanceResultBefore=await tronWeb.sidechain.sidechain.transactionBuilder.triggerSmartContract(
                ADDRESS20_MAPPING,
                'balanceOf(address)',
                {_isConstant: true},
                [{type: 'address', value: address}]);
            const sTrc20BalanceBefore = sTrc20balanceResultBefore && sTrc20balanceResultBefore.result ? new tronWeb.BigNumber(sTrc20balanceResultBefore.constant_result[0], 16).valueOf() : 0;
            console.log("sTrc20BalanceBefore:"+sTrc20BalanceBefore);

            // depositTrc20
            const num = 100;
            const depositId = await tronWeb.sidechain.depositTrc20(num, DEPOSIT_FEE, FEE_LIMIT, CONTRACT_ADDRESS20);
            console.log("depositId: "+depositId);
            assert.equal(depositId.length, 64);
            await wait(80);
            const depositInfo = await tronWeb.sidechain.mainchain.trx.getTransactionInfo(depositId);
            const depositTxFee = typeof(depositInfo.fee)=="undefined"?0:depositInfo.fee;
            console.log('depositTxFee: ' + depositTxFee)

            // after trx balance
            const mAccountAfter = await tronWeb.sidechain.mainchain.trx.getAccount();
            const sAccountAfter = await tronWeb.sidechain.sidechain.trx.getAccount();
            const mTrxBalanceAfter = mAccountAfter.balance;
            const sTrxBalanceAfter = sAccountAfter.balance;
            console.log('mTrxBalanceAfter: ' + mTrxBalanceAfter);
            console.log('sTrxBalanceAfter: ' + sTrxBalanceAfter);
            assert.equal(mTrxBalanceBefore-depositTxFee-approveTxFee-DEPOSIT_FEE,mTrxBalanceAfter);
            assert.equal(sTrxBalanceBefore,sTrxBalanceAfter);

            // after token balance
            let mTrc20BalanceAfter = await mTrc20Contract.balanceOf(address).call();
            console.log("mTrc20BalanceAfter："+mTrc20BalanceAfter);
            mTrc20BalanceAfter = parseInt(mTrc20BalanceAfter, 16);
            let sTrc20balanceResultAfter=await tronWeb.sidechain.sidechain.transactionBuilder.triggerSmartContract(
                ADDRESS20_MAPPING,
                'balanceOf(address)',
                {_isConstant: true},
                [{type: 'address', value: address}]);
            const sTrc20BalanceAfter = sTrc20balanceResultAfter && sTrc20balanceResultAfter.result ? new tronWeb.BigNumber(sTrc20balanceResultAfter.constant_result[0], 16).valueOf() : 0;
            console.log("sTrc20BalanceAfter:"+sTrc20BalanceAfter);
            assert.equal(mTrc20BalanceBefore-num,mTrc20BalanceAfter);
            assert.equal(publicMethod.sumBigNumber(sTrc20BalanceBefore,num),sTrc20BalanceAfter);
        });

        it('should throw if an invalid num is passed', async function () {
            const num = 100.01;
            await assertThrow(
                tronWeb.sidechain.depositTrc20(num,10, FEE_LIMIT, CONTRACT_ADDRESS20),
                'Invalid num provided'
            );
        });

        it('should throw if an invalid fee limit is passed', async function () {
            const num = 100;
            const feeLimit = 100000000000;
            await assertThrow(
                tronWeb.sidechain.depositTrc20(num, 0,feeLimit, CONTRACT_ADDRESS20),
                'Invalid feeLimit provided'
            );
        });

        it('should throw if an invalid contract address is passed', async function () {
            await assertThrow(
                tronWeb.sidechain.depositTrc20(100, 0,FEE_LIMIT, 'CONTRACT_ADDRESS20'),
                'Invalid contractAddress address provided'
            );
        });
    });
    describe('#withdrawTrc20', function () {
        describe('#withdrawTrc20', function () {
            const tronWeb = tronWebBuilder.createInstanceSide();
            it('withdraw trc20 from side chain to main chain', async function () {
                // before token balance
                let mTrc20Contract = await tronWeb.sidechain.mainchain.contract().at(CONTRACT_ADDRESS20);
                let mTrc20BalanceBefore = await mTrc20Contract.balanceOf(ADDRESS_BASE58).call();
                mTrc20BalanceBefore = parseInt(mTrc20BalanceBefore, 16);
                console.log("mTrc20BalanceBefore："+mTrc20BalanceBefore);
                let sTrc20balanceResultBefore=await tronWeb.sidechain.sidechain.transactionBuilder.triggerSmartContract(
                    ADDRESS20_MAPPING,
                    'balanceOf(address)',
                    {_isConstant: true},
                    [{type: 'address', value: ADDRESS_BASE58}]);
                const sTrc20BalanceBefore = sTrc20balanceResultBefore && sTrc20balanceResultBefore.result ? new tronWeb.BigNumber(sTrc20balanceResultBefore.constant_result[0], 16).valueOf() : 0;
                console.log("sTrc20BalanceBefore:"+sTrc20BalanceBefore);

                // before trx balance
                const mAccountbefore = await tronWeb.sidechain.mainchain.trx.getAccount();
                const sAccountbefore = await tronWeb.sidechain.sidechain.trx.getAccount();
                const mTrxBalanceBefore = mAccountbefore.balance;
                const sTrxBalanceBefore = sAccountbefore.balance;
                console.log('mTrxBalanceBefore: ' + mTrxBalanceBefore);
                console.log('sTrxBalanceBefore: ' + sTrxBalanceBefore);

                // withdrawTrc20
                const num = 10;
                const withdrawId = await tronWeb.sidechain.withdrawTrc20(num, WITHDRAW_FEE, FEE_LIMIT, ADDRESS20_MAPPING);
                assert.equal(withdrawId.length, 64);
                console.log("withdrawId: "+withdrawId);
                await wait(80);
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
                let mTrc20BalanceAfter = await mTrc20Contract.balanceOf(ADDRESS_BASE58).call();
                mTrc20BalanceAfter = parseInt(mTrc20BalanceAfter, 16);
                console.log("mTrc20BalanceAfter："+mTrc20BalanceAfter);
                let sTrc20balanceResultAfter=await tronWeb.sidechain.sidechain.transactionBuilder.triggerSmartContract(
                    ADDRESS20_MAPPING,
                    'balanceOf(address)',
                    {_isConstant: true},
                    [{type: 'address', value: ADDRESS_BASE58}]);
                const sTrc20BalanceAfter = sTrc20balanceResultAfter && sTrc20balanceResultAfter.result ? new tronWeb.BigNumber(sTrc20balanceResultAfter.constant_result[0], 16).valueOf() : 0;
                console.log("sTrc20BalanceAfter:"+sTrc20BalanceAfter);
                assert.equal(mTrc20BalanceBefore+num,mTrc20BalanceAfter);
                assert.equal(sTrc20BalanceBefore-num,sTrc20BalanceAfter);
            });
        });
    });
});




