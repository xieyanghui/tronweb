const {PRIVATE_KEY,ADDRESS_HEX, MAPPING_FEE, DEPOSIT_FEE, WITHDRAW_FEE, FEE_LIMIT, ADDRESS_BASE58, SIDE_CHAIN} = require('../util/config');
const trc721Contract = require('../util/contracts').trc721Contract;
const tronWebBuilder = require('../util/tronWebBuilder');
const assertThrow = require('../../helpers/assertThrow');
const publicMethod = require('../util/PublicMethod');
const broadcaster = require('../util/broadcaster');
const wait = require('../../helpers/wait');
const chai = require('chai');
const util = require('util');
const assert = chai.assert;

describe('TronWeb Instance', function() {
    const tronWeb = tronWebBuilder.createInstanceSide();
    let createTxId;
    let contractAddress;
    let trc721Id;
    let sideChainContractAddress;
    before(async function () {
        let deployMap = await publicMethod.deployTrc721ContractAndMappingAndMint();
        trc721Id = deployMap.get("trc721Id");
        createTxId = deployMap.get("createTxId");
        contractAddress = deployMap.get("contractAddress");
        sideChainContractAddress = deployMap.get("sideChainContractAddress");
    });
    describe('#depositTrc721', function () {
        it('deposit trc721 from main chain to side chain', async function () {
            await wait(10);
            // before trx balance
            const mAccountbefore = await tronWeb.sidechain.mainchain.trx.getAccount();
            const sAccountbefore = await tronWeb.sidechain.sidechain.trx.getAccount();
            const mTrxBalanceBefore = mAccountbefore.balance;
            const sTrxBalanceBefore = sAccountbefore.balance;
            console.log('mTrxBalanceBefore: ' + mTrxBalanceBefore);
            console.log('sTrxBalanceBefore: ' + sTrxBalanceBefore);

            // approveTrc721
            let approveTrc721Map = await publicMethod.approveTrc721(trc721Id, contractAddress);
            let approveTxFee = approveTrc721Map.get("approveTxFee");
            const mAccountAfter1 = await tronWeb.sidechain.mainchain.trx.getAccount();
            const mTrxBalanceAfter1 = mAccountAfter1.balance;
            console.log('mTrxBalanceAfter1: ' + mTrxBalanceAfter1);
            assert.equal(mTrxBalanceBefore-approveTxFee,mTrxBalanceAfter1);

            // depositTrc721
            let depositTrc721Map = await publicMethod.depositTrc721(trc721Id, contractAddress);
            let depositTxFee = depositTrc721Map.get("depositTxFee");

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
            let mTrc721Contract = await tronWeb.sidechain.mainchain.contract().at(contractAddress);
            let mTrc721BalanceAfter = await mTrc721Contract.ownerOf(trc721Id).call()
            let sTrc721OwnerResultAfter=await tronWeb.sidechain.sidechain.transactionBuilder.triggerSmartContract(
                sideChainContractAddress,
                'ownerOf(uint256)',
                {_isConstant: true},
                [{type: 'uint256', value: trc721Id}]);
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
            let withdrawTrc721Map = await publicMethod.withdrawTrc721(trc721Id, sideChainContractAddress);
            let withdrawTxFee = withdrawTrc721Map.get("withdrawTxFee");

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
            let mTrc721Contract = await tronWeb.sidechain.mainchain.contract().at(contractAddress);
            let mTrc721BalanceAfter = await mTrc721Contract.ownerOf(trc721Id).call()
            assert.equal(mTrc721BalanceAfter,ADDRESS_HEX)
            await assertThrow(
                tronWeb.sidechain.sidechain.transactionBuilder.triggerSmartContract(
                    sideChainContractAddress,
                    'ownerOf(uint256)',
                    {_isConstant: true},
                    [{type: 'uint256', value: trc721Id}]
                ),
                'REVERT opcode executed'
            );
        });
    });
});




