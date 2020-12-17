const {PRIVATE_KEY, FEE_LIMIT, ADDRESS_BASE58, ADDRESS_HEX, SIDE_CHAIN} = require('../util/config');
const shieldContract = require('../util/contracts').shieldContract;
const trc20Contract = require('../util/contracts').trc20Contract;
const assertThrow = require('../../helpers/assertThrow');
const tronWebBuilder = require('../util/tronWebBuilder');
const publicMethod = require('../util/PublicMethod');
const wait = require('../../helpers/wait');
const shieldedUtils = require('../util/shieldedUtils');
const {Z_TRON: zTronConfig} = require('../util/config');
const TronWeb = tronWebBuilder.TronWeb;
const chai = require('chai');
const util = require('util');
const assert = chai.assert;

describe('TronWeb ztron', function() {
    const tronWeb = tronWebBuilder.createInstance();
    let scalingFactor = 10;
    let trc20ContractAddress;
    let shieldedTRC20ContractAddress;
    // const {shieldedTRC20ContractAddress, trc20ContractAddress} = zTronConfig;
    const keysInfo = {};
    const narrowValue = 2;
    let realCost;
    let shieldedInfo;
    let shieldedInfo1;
    let shieldedInfo2;
    let newOtherAccountKey;
    let newOtherAddress;
    let ownerAddress;
    before(async function () {

        // newOtherAccount = await tronWeb.utils.accounts.generateAccount();
        // newOtherAccountKey = newOtherAccount.privateKey;
        newOtherAccountKey = "04E873F2920C6282FA70D0B5F485B7F456BBCD07771DD64FD46958B5A7C6DBA9";
        console.log("newOtherAccountKey:"+newOtherAccountKey)
        assert.equal(newOtherAccountKey.length, 64);
        newOtherAddress = tronWeb.address.fromPrivateKey(newOtherAccountKey);
        console.log("newOtherAddress:"+newOtherAddress)

        // ownerAddress
        ownerAddress = tronWeb.address.fromPrivateKey(PRIVATE_KEY);

        // deploy shieldedTRC20 contract
        console.log("000")
        trc20ContractAddress = await publicMethod.deployContract(trc20Contract,[ADDRESS_BASE58]);
        console.log("111")
        shieldedTRC20ContractAddress = await publicMethod.deployContract(shieldContract,[trc20ContractAddress,1]);
        console.log("222")

        methodInstance = shieldedUtils.makeShieldedMethodInstance(tronWeb, shieldedTRC20ContractAddress);
        shieldedInfo = await tronWeb.ztron.getNewShieldedAddress();
        console.log("shieldedInfo: "+util.inspect(shieldedInfo,true,null,true));
        realCost = tronWeb.BigNumber(narrowValue).multipliedBy(scalingFactor).toFixed();
    });

    describe('#create function', function() {
        const visibleFalseOptions = {
            visible: false
        }

        describe("#createTransferParams 1V2", function (){
            const visibleOptions = {
                visible: true
            }
            before(async ()=>{
                const startBlockInfo = await tronWeb.trx.getCurrentBlock()
                startBlockIndex = startBlockInfo.block_header.raw_data.number;

                // mint 2 note for shieldedInfo
                for(let i = 0; i < 2; i++){
                    const rcmInfo = await tronWeb.ztron.getRcm();
                    const params = {
                        from_amount: realCost,
                        shielded_receives: {
                            note: {
                                value: narrowValue,
                                payment_address: shieldedInfo.payment_address,
                                rcm: rcmInfo.value
                            }
                        },
                        shielded_TRC20_contract_address: shieldedTRC20ContractAddress,
                        ovk: "4364c875deeb663781a2f1530f9e4f87ea81cc3c757ca2a30fa4768940de2f98"
                    }
                    console.log("noteTxs-false: "+util.inspect(noteTxs,true,null,true))
                    const result = await tronWeb.ztron.createMintParams(params,visibleOptions);
                    assert.ok(result);
                    assert.ok(result.trigger_contract_input);
                    const address = tronWeb.defaultAddress.base58;
                    //approve
                    await shieldedUtils.makeAndSendTransaction(tronWeb, trc20ContractAddress, 'approve(address,uint256)', visibleOptions,
                        [{type: 'address', value: shieldedTRC20ContractAddress},{type: 'uint256', value: narrowValue * scalingFactor}], address)

                    const options = {
                        shieldedParameter: result.trigger_contract_input
                    }
                    const createTx = await shieldedUtils.makeAndSendTransaction(tronWeb, shieldedTRC20ContractAddress, 'mint(uint256,bytes32[9],bytes32[2],bytes32[21])', options, [], address);
                    createTxId = createTx.transaction.txID;
                    assert.equal(createTxId.length, 64);
                    let createInfo;
                    while (true) {
                        createInfo = await tronWeb.trx.getTransactionInfo(createTxId);
                        if (Object.keys(createInfo).length === 0) {
                            await wait(3);
                            continue;
                        } else {
                            // console.log("createInfo:"+util.inspect(createInfo))
                            break;
                        }
                    }
                }

                // scanByIvk
                endBlockIndex = startBlockIndex + 90;
                let params = {
                    "start_block_index": startBlockIndex,
                    "end_block_index": endBlockIndex,
                    "shielded_TRC20_contract_address": await tronWeb.address.toHex(shieldedTRC20ContractAddress),
                    "ivk": shieldedInfo.ivk,
                    "ak": shieldedInfo.ak,
                    "nk": shieldedInfo.nk,
                }
                console.log("params: "+util.inspect(params,true,null,true))
                let result = await tronWeb.ztron.scanShieldedTRC20NotesByIvk(params, visibleOptions);
                assert.ok(result && result.noteTxs && result.noteTxs.length == 2);
                noteTxs = result.noteTxs;
                console.log("noteTxs-false: "+util.inspect(noteTxs,true,null,true))

                params = {
                    "start_block_index": startBlockIndex,
                    "end_block_index": endBlockIndex,
                    "shielded_TRC20_contract_address": shieldedTRC20ContractAddress,
                    "ivk": shieldedInfo.ivk,
                    "ak": shieldedInfo.ak,
                    "nk": shieldedInfo.nk,
                }
                result = await tronWeb.ztron.scanShieldedTRC20NotesByIvk(params, visibleOptions);
                assert.ok(result && result.noteTxs && result.noteTxs.length == 2);
                noteTxs = result.noteTxs;
                console.log("noteTxs-true: "+util.inspect(noteTxs,true,null,true))

                // generate new shieldedAddress
                shieldedInfo1 = await tronWeb.ztron.getNewShieldedAddress();
                shieldedInfo2 = await tronWeb.ztron.getNewShieldedAddress();
            })
            it('should get transferParams with ask is object', async function (){
                // build params
                await wait(10)
                const position = typeof (noteTxs[0].position) === 'number' ? (noteTxs[0].position) : 0;
                let pathInfo = await methodInstance.getPath(position).call();
                shieldedSpends = [{
                    "note": noteTxs[0].note,
                    "alpha": (await tronWeb.ztron.getRcm()).value,
                    "root":  pathInfo[0].replace('0x', ''),
                    "path":  pathInfo[1].map(v => v.replace('0x', '')).join(''),
                    "pos": position
                }];
                shieldedReceives = [{
                    note: {
                        value: 1,
                        payment_address: shieldedInfo1.payment_address,
                        rcm: ( await tronWeb.ztron.getRcm()).value
                    }
                },
                {
                    note: {
                        value: 1,
                        payment_address: shieldedInfo2.payment_address,
                        rcm: ( await tronWeb.ztron.getRcm()).value
                    }
                }];

                // scanByOvk is empty before transfer
                await wait(10);
                let endBlockInfo = await tronWeb.trx.getCurrentBlock();
                endBlockIndex = endBlockInfo.block_header.raw_data.number;
                let params = {
                    "start_block_index": startBlockIndex,
                    "end_block_index": endBlockIndex,
                    "shielded_TRC20_contract_address": shieldedTRC20ContractAddress,
                    "ovk": shieldedInfo.ovk,
                };
                let result = await tronWeb.ztron.scanShieldedTRC20NotesByOvk(params, visibleOptions);
                console.log("scanByOvk-noteTxs-before: "+util.inspect(result));
                assert.isEmpty(result);

                // scanByIvk is empty before transfer
                params = {
                    "start_block_index": startBlockIndex,
                    "end_block_index": endBlockIndex,
                    "shielded_TRC20_contract_address": shieldedTRC20ContractAddress,
                    "ivk": shieldedInfo1.ivk,
                    "ak": shieldedInfo1.ak,
                    "nk": shieldedInfo1.nk,
                    "visible": true
                }
                result = await tronWeb.ztron.scanShieldedTRC20NotesByIvk(params, visibleOptions);
                console.log("scanByIvk-noteTxs-before: "+util.inspect(result));
                assert.isEmpty(result);

                params = {
                    "start_block_index": startBlockIndex,
                    "end_block_index": endBlockIndex,
                    "shielded_TRC20_contract_address": shieldedTRC20ContractAddress,
                    "ivk": shieldedInfo2.ivk,
                    "ak": shieldedInfo2.ak,
                    "nk": shieldedInfo2.nk,
                    "visible": true
                }
                result = await tronWeb.ztron.scanShieldedTRC20NotesByIvk(params, visibleOptions);
                console.log("scanByIvk-noteTxs-before: "+util.inspect(result));
                assert.isEmpty(result);

                // isShieldedTRC20ContractNoteSpent
                await wait(10);
                params = {
                    note: shieldedSpends[0].note,
                    ak: shieldedInfo.ak,
                    nk: shieldedInfo.nk,
                    position: shieldedSpends[0].pos,
                    shielded_TRC20_contract_address: shieldedTRC20ContractAddress
                };
                console.log("params: "+util.inspect(params));
                result = await tronWeb.ztron.isShieldedTRC20ContractNoteSpent(params,visibleOptions);
                console.log("isShieldedTRC20ContractNoteSpent: "+util.inspect(result));
                assert.isEmpty(result);

                // transfer
                params = {
                    shielded_spends: shieldedSpends,
                    shielded_receives: shieldedReceives,
                    shielded_TRC20_contract_address: shieldedTRC20ContractAddress,
                    ovk: shieldedInfo.ovk,
                    ask: shieldedInfo.ask,
                    nsk: shieldedInfo.nsk
                };
                result = await tronWeb.ztron.createTransferParams(params,visibleOptions);
                assert.ok(result && result.trigger_contract_input);
                const options = {
                    shieldedParameter: result.trigger_contract_input,
                    feeLimit:FEE_LIMIT
                };
                console.log("options: "+util.inspect(options,true,null,true))
                const transactionResult = await shieldedUtils.makeAndSendTransaction(tronWeb, shieldedTRC20ContractAddress,
                    'transfer(bytes32[10][],bytes32[2][],bytes32[9][],bytes32[2],bytes32[21][])', options, [], tronWeb.defaultAddress.base58);
                assert.ok(transactionResult && transactionResult.result);

                // isShieldedTRC20ContractNoteSpent
                await wait(10);
                params = {
                    note: shieldedSpends[0].note,
                    ak: shieldedInfo.ak,
                    nk: shieldedInfo.nk,
                    position: shieldedSpends[0].pos,
                    shielded_TRC20_contract_address: shieldedTRC20ContractAddress
                }
                result = await tronWeb.ztron.isShieldedTRC20ContractNoteSpent(params, visibleOptions);
                console.log("isShieldedTRC20ContractNoteSpent: "+util.inspect(result,true,null,true))
                assert.ok(result);
                assert.isTrue(result.is_spent);

                // scanByOvk length is 2 after transfer
                await wait(10)
                endBlockInfo = await tronWeb.trx.getCurrentBlock()
                endBlockIndex = endBlockInfo.block_header.raw_data.number;
                params = {
                    "start_block_index": startBlockIndex,
                    "end_block_index": endBlockIndex,
                    "shielded_TRC20_contract_address": shieldedTRC20ContractAddress,
                    "ovk": shieldedInfo.ovk,
                }
                result = await tronWeb.ztron.scanShieldedTRC20NotesByOvk(params, visibleOptions);
                console.log("scanByOvk-noteTxs-after: "+util.inspect(result))
                assert.ok(result);
                assert.ok(result.noteTxs);
                assert.ok(result.noteTxs.length == 2);

                // scanByIvk length is 1 after transfer
                params = {
                    "start_block_index": startBlockIndex,
                    "end_block_index": endBlockIndex,
                    "shielded_TRC20_contract_address": shieldedTRC20ContractAddress,
                    "ivk": shieldedInfo1.ivk,
                    "ak": shieldedInfo1.ak,
                    "nk": shieldedInfo1.nk,
                }
                result = await tronWeb.ztron.scanShieldedTRC20NotesByIvk(params, visibleOptions);
                console.log("scanByIvk-noteTxs-after: "+util.inspect(result))
                assert.ok(result);
                assert.ok(result.noteTxs);
                assert.ok(result.noteTxs.length == 1);

                params = {
                    "start_block_index": startBlockIndex,
                    "end_block_index": endBlockIndex,
                    "shielded_TRC20_contract_address": shieldedTRC20ContractAddress,
                    "ivk": shieldedInfo2.ivk,
                    "ak": shieldedInfo2.ak,
                    "nk": shieldedInfo2.nk,
                }
                result = await tronWeb.ztron.scanShieldedTRC20NotesByIvk(params, visibleOptions);
                console.log("scanByIvk-noteTxs-after: "+util.inspect(result))
                assert.ok(result);
                assert.ok(result.noteTxs);
                assert.ok(result.noteTxs.length == 1);
            })
        })

        describe("#createTransferParams 2V2", function (){
            const visibleOptions = {
                visible: true
            }
            before(async ()=>{
                const startBlockInfo = await tronWeb.trx.getCurrentBlock()
                startBlockIndex = startBlockInfo.block_header.raw_data.number;

                // mint 2 note for shieldedInfo
                for(let i = 0; i < 2; i++){
                    const rcmInfo = await tronWeb.ztron.getRcm();
                    const params = {
                        from_amount: realCost,
                        shielded_receives: {
                            note: {
                                value: narrowValue,
                                payment_address: shieldedInfo.payment_address,
                                rcm: rcmInfo.value
                            }
                        },
                        shielded_TRC20_contract_address: await tronWeb.address.toHex(shieldedTRC20ContractAddress),
                        ovk: "4364c875deeb663781a2f1530f9e4f87ea81cc3c757ca2a30fa4768940de2f98"
                    }
                    const result = await tronWeb.ztron.createMintParams(params, visibleFalseOptions);
                    assert.ok(result);
                    assert.ok(result.trigger_contract_input);
                    const address = tronWeb.defaultAddress.base58;
                    //approve
                    await shieldedUtils.makeAndSendTransaction(tronWeb, trc20ContractAddress, 'approve(address,uint256)', visibleFalseOptions,
                        [{type: 'address', value: await tronWeb.address.toHex(shieldedTRC20ContractAddress)},{type: 'uint256', value: narrowValue * scalingFactor}], address)

                    const options = {
                        shieldedParameter: result.trigger_contract_input
                    }
                    const createTx = await shieldedUtils.makeAndSendTransaction(tronWeb, shieldedTRC20ContractAddress, 'mint(uint256,bytes32[9],bytes32[2],bytes32[21])', options, [], address);
                    createTxId = createTx.transaction.txID;
                    assert.equal(createTxId.length, 64);
                    let createInfo;
                    while (true) {
                        createInfo = await tronWeb.trx.getTransactionInfo(createTxId);
                        if (Object.keys(createInfo).length === 0) {
                            await wait(3);
                            continue;
                        } else {
                            break;
                        }
                    }
                }

                // scanByIvk
                endBlockIndex = startBlockIndex + 90;
                const params = {
                    "start_block_index": startBlockIndex,
                    "end_block_index": endBlockIndex,
                    "shielded_TRC20_contract_address": await tronWeb.address.toHex(shieldedTRC20ContractAddress),
                    "ivk": shieldedInfo.ivk,
                    "ak": shieldedInfo.ak,
                    "nk": shieldedInfo.nk,
                    "visible": true
                }
                let result = await tronWeb.ztron.scanShieldedTRC20NotesByIvk(params, visibleFalseOptions);
                assert.ok(result && result.noteTxs && result.noteTxs.length == 2);
                noteTxs = result.noteTxs;
                console.log("noteTxs: "+util.inspect(noteTxs))

                // generate new shieldedAddress
                shieldedInfo1 = await tronWeb.ztron.getNewShieldedAddress();
                shieldedInfo2 = await tronWeb.ztron.getNewShieldedAddress();
            })
            it('should get transferParams with ask is object', async function (){
                // build params
                await wait(10)
                const position = typeof (noteTxs[0].position) === 'number' ? (noteTxs[0].position) : 0;
                let pathInfo1 = await methodInstance.getPath(position).call();
                let pathInfo2 = await methodInstance.getPath(noteTxs[1].position).call();
                shieldedSpends = [{
                    "note": noteTxs[0].note,
                    "alpha": (await tronWeb.ztron.getRcm()).value,
                    "root":  pathInfo1[0].replace('0x', ''),
                    "path":  pathInfo1[1].map(v => v.replace('0x', '')).join(''),
                    "pos": position
                },
                {
                    "note": noteTxs[1].note,
                    "alpha": (await tronWeb.ztron.getRcm()).value,
                    "root":  pathInfo2[0].replace('0x', ''),
                    "path":  pathInfo2[1].map(v => v.replace('0x', '')).join(''),
                    "pos": noteTxs[1].position
                }];
                shieldedReceives = [{
                    note: {
                        value: 2,
                        payment_address: shieldedInfo1.payment_address,
                        rcm: ( await tronWeb.ztron.getRcm()).value
                    }
                },
                {
                    note: {
                        value: 2,
                        payment_address: shieldedInfo2.payment_address,
                        rcm: ( await tronWeb.ztron.getRcm()).value
                    }
                }];

                // scanByOvk is empty before transfer
                await wait(10);
                let endBlockInfo = await tronWeb.trx.getCurrentBlock();
                endBlockIndex = endBlockInfo.block_header.raw_data.number;
                let params = {
                    "start_block_index": startBlockIndex,
                    "end_block_index": endBlockIndex,
                    "shielded_TRC20_contract_address": await tronWeb.address.toHex(shieldedTRC20ContractAddress),
                    "ovk": shieldedInfo.ovk,
                };
                let result = await tronWeb.ztron.scanShieldedTRC20NotesByOvk(params, visibleFalseOptions);
                console.log("scanByOvk-noteTxs-before: "+util.inspect(result));
                assert.isEmpty(result);

                // scanByIvk is empty before transfer
                params = {
                    "start_block_index": startBlockIndex,
                    "end_block_index": endBlockIndex,
                    "shielded_TRC20_contract_address": await tronWeb.address.toHex(shieldedTRC20ContractAddress),
                    "ivk": shieldedInfo1.ivk,
                    "ak": shieldedInfo1.ak,
                    "nk": shieldedInfo1.nk,
                    "visible": true
                }
                result = await tronWeb.ztron.scanShieldedTRC20NotesByIvk(params, visibleFalseOptions);
                console.log("scanByIvk-noteTxs-before: "+util.inspect(result));
                assert.isEmpty(result);

                params = {
                    "start_block_index": startBlockIndex,
                    "end_block_index": endBlockIndex,
                    "shielded_TRC20_contract_address": await tronWeb.address.toHex(shieldedTRC20ContractAddress),
                    "ivk": shieldedInfo2.ivk,
                    "ak": shieldedInfo2.ak,
                    "nk": shieldedInfo2.nk,
                    "visible": true
                }
                result = await tronWeb.ztron.scanShieldedTRC20NotesByIvk(params, visibleFalseOptions);
                console.log("scanByIvk-noteTxs-before: "+util.inspect(result));
                assert.isEmpty(result);

                // isShieldedTRC20ContractNoteSpent
                await wait(10);
                params = {
                    note: shieldedSpends[0].note,
                    ak: shieldedInfo.ak,
                    nk: shieldedInfo.nk,
                    position: shieldedSpends[0].pos,
                    shielded_TRC20_contract_address: await tronWeb.address.toHex(shieldedTRC20ContractAddress)
                };
                console.log("params: "+util.inspect(params));
                result = await tronWeb.ztron.isShieldedTRC20ContractNoteSpent(params, visibleFalseOptions);
                console.log("isShieldedTRC20ContractNoteSpent: "+util.inspect(result));
                assert.isEmpty(result);

                params = {
                    note: shieldedSpends[1].note,
                    ak: shieldedInfo.ak,
                    nk: shieldedInfo.nk,
                    position: shieldedSpends[1].pos,
                    shielded_TRC20_contract_address: await tronWeb.address.toHex(shieldedTRC20ContractAddress)
                };
                console.log("params: "+util.inspect(params));
                result = await tronWeb.ztron.isShieldedTRC20ContractNoteSpent(params, visibleFalseOptions);
                console.log("isShieldedTRC20ContractNoteSpent: "+util.inspect(result));
                assert.isEmpty(result);

                // transfer
                params = {
                    shielded_spends: shieldedSpends,
                    shielded_receives: shieldedReceives,
                    shielded_TRC20_contract_address: await tronWeb.address.toHex(shieldedTRC20ContractAddress),
                    ovk: shieldedInfo.ovk,
                    ask: shieldedInfo.ask,
                    nsk: shieldedInfo.nsk
                };
                result = await tronWeb.ztron.createTransferParams(params, visibleFalseOptions);
                assert.ok(result && result.trigger_contract_input);
                const options = {
                    shieldedParameter: result.trigger_contract_input,
                    feeLimit:FEE_LIMIT
                };
                console.log("options: "+util.inspect(options,true,null,true))
                const transactionResult = await shieldedUtils.makeAndSendTransaction(tronWeb, shieldedTRC20ContractAddress,
                    'transfer(bytes32[10][],bytes32[2][],bytes32[9][],bytes32[2],bytes32[21][])', options, [], tronWeb.defaultAddress.base58);
                assert.ok(transactionResult && transactionResult.result);

                // isShieldedTRC20ContractNoteSpent
                await wait(10);
                params = {
                    note: shieldedSpends[0].note,
                    ak: shieldedInfo.ak,
                    nk: shieldedInfo.nk,
                    position: shieldedSpends[0].pos,
                    shielded_TRC20_contract_address: await tronWeb.address.toHex(shieldedTRC20ContractAddress)
                }
                result = await tronWeb.ztron.isShieldedTRC20ContractNoteSpent(params, visibleFalseOptions);
                console.log("isShieldedTRC20ContractNoteSpent: "+util.inspect(result,true,null,true))
                assert.ok(result);
                assert.isTrue(result.is_spent);

                params = {
                    note: shieldedSpends[1].note,
                    ak: shieldedInfo.ak,
                    nk: shieldedInfo.nk,
                    position: shieldedSpends[1].pos,
                    shielded_TRC20_contract_address: await tronWeb.address.toHex(shieldedTRC20ContractAddress)
                }
                result = await tronWeb.ztron.isShieldedTRC20ContractNoteSpent(params, visibleFalseOptions);
                console.log("isShieldedTRC20ContractNoteSpent: "+util.inspect(result,true,null,true))
                assert.ok(result);
                assert.ok(result.is_spent);

                // scanByOvk length is 2 after transfer
                await wait(10)
                endBlockInfo = await tronWeb.trx.getCurrentBlock()
                endBlockIndex = endBlockInfo.block_header.raw_data.number;
                params = {
                    "start_block_index": startBlockIndex,
                    "end_block_index": endBlockIndex,
                    "shielded_TRC20_contract_address": await tronWeb.address.toHex(shieldedTRC20ContractAddress),
                    "ovk": shieldedInfo.ovk,
                }
                result = await tronWeb.ztron.scanShieldedTRC20NotesByOvk(params, visibleFalseOptions);
                console.log("scanByOvk-noteTxs-after: "+util.inspect(result))
                assert.ok(result);
                assert.ok(result.noteTxs);
                assert.ok(result.noteTxs.length == 2);

                // scanByIvk length is 1 after transfer
                params = {
                    "start_block_index": startBlockIndex,
                    "end_block_index": endBlockIndex,
                    "shielded_TRC20_contract_address": await tronWeb.address.toHex(shieldedTRC20ContractAddress),
                    "ivk": shieldedInfo1.ivk,
                    "ak": shieldedInfo1.ak,
                    "nk": shieldedInfo1.nk,
                }
                result = await tronWeb.ztron.scanShieldedTRC20NotesByIvk(params, visibleFalseOptions);
                console.log("scanByIvk-noteTxs-after: "+util.inspect(result,true,null,true))
                assert.ok(result);
                assert.ok(result.noteTxs);
                assert.ok(result.noteTxs.length == 1);

                params = {
                    "start_block_index": startBlockIndex,
                    "end_block_index": endBlockIndex,
                    "shielded_TRC20_contract_address": await tronWeb.address.toHex(shieldedTRC20ContractAddress),
                    "ivk": shieldedInfo2.ivk,
                    "ak": shieldedInfo2.ak,
                    "nk": shieldedInfo2.nk,
                }
                result = await tronWeb.ztron.scanShieldedTRC20NotesByIvk(params, visibleFalseOptions);
                console.log("scanByIvk-noteTxs-after: "+util.inspect(result,true,null,true))
                assert.ok(result);
                assert.ok(result.noteTxs);
                assert.ok(result.noteTxs.length == 1);
            })
        })

        describe("#createTransferParams 2V1", function (){
            const visibleOptions = {
                visible: true
            }
            before(async ()=>{
                const startBlockInfo = await tronWeb.trx.getCurrentBlock()
                startBlockIndex = startBlockInfo.block_header.raw_data.number;

                // mint 2 note for shieldedInfo
                for(let i = 0; i < 2; i++){
                    const rcmInfo = await tronWeb.ztron.getRcm();
                    const params = {
                        from_amount: realCost,
                        shielded_receives: {
                            note: {
                                value: narrowValue,
                                payment_address: shieldedInfo.payment_address,
                                rcm: rcmInfo.value
                            }
                        },
                        shielded_TRC20_contract_address: shieldedTRC20ContractAddress,
                        ovk: "4364c875deeb663781a2f1530f9e4f87ea81cc3c757ca2a30fa4768940de2f98"
                    }
                    const result = await tronWeb.ztron.createMintParams(params);
                    assert.ok(result);
                    assert.ok(result.trigger_contract_input);
                    const address = tronWeb.defaultAddress.base58;
                    //approve
                    await shieldedUtils.makeAndSendTransaction(tronWeb, trc20ContractAddress, 'approve(address,uint256)', {},
                        [{type: 'address', value: shieldedTRC20ContractAddress},{type: 'uint256', value: narrowValue * scalingFactor}], address)

                    const options = {
                        shieldedParameter: result.trigger_contract_input
                    }
                    const createTx = await shieldedUtils.makeAndSendTransaction(tronWeb, shieldedTRC20ContractAddress, 'mint(uint256,bytes32[9],bytes32[2],bytes32[21])', options, [], address);
                    createTxId = createTx.transaction.txID;
                    assert.equal(createTxId.length, 64);
                    let createInfo;
                    while (true) {
                        createInfo = await tronWeb.trx.getTransactionInfo(createTxId);
                        if (Object.keys(createInfo).length === 0) {
                            await wait(3);
                            continue;
                        } else {
                            // console.log("createInfo:"+util.inspect(createInfo))
                            break;
                        }
                    }
                }

                // scanByIvk
                endBlockIndex = startBlockIndex + 90;
                const params = {
                    "start_block_index": startBlockIndex,
                    "end_block_index": endBlockIndex,
                    "shielded_TRC20_contract_address": shieldedTRC20ContractAddress,
                    "ivk": shieldedInfo.ivk,
                    "ak": shieldedInfo.ak,
                    "nk": shieldedInfo.nk,
                    "visible": true
                }
                let result = await tronWeb.ztron.scanShieldedTRC20NotesByIvk(params, visibleOptions);
                assert.ok(result && result.noteTxs && result.noteTxs.length == 2);
                noteTxs = result.noteTxs;
                console.log("noteTxs: "+util.inspect(noteTxs))

                // generate new shieldedAddress
                shieldedInfo1 = await tronWeb.ztron.getNewShieldedAddress();
            })
            it('should get transferParams with ask is object', async function (){
                // build params
                await wait(10)
                const position = typeof (noteTxs[0].position) === 'number' ? (noteTxs[0].position) : 0;
                let pathInfo1 = await methodInstance.getPath(position).call();
                let pathInfo2 = await methodInstance.getPath(noteTxs[1].position).call();
                let shieldedSpends = [{
                    "note": noteTxs[0].note,
                    "alpha": (await tronWeb.ztron.getRcm()).value,
                    "root":  pathInfo1[0].replace('0x', ''),
                    "path":  pathInfo1[1].map(v => v.replace('0x', '')).join(''),
                    "pos": position
                },
                    {
                        "note": noteTxs[1].note,
                        "alpha": (await tronWeb.ztron.getRcm()).value,
                        "root":  pathInfo2[0].replace('0x', ''),
                        "path":  pathInfo2[1].map(v => v.replace('0x', '')).join(''),
                        "pos": noteTxs[1].position
                    }];

                let shieldedReceives = [{
                    note: {
                        value: 4,
                        payment_address: shieldedInfo1.payment_address,
                        rcm: ( await tronWeb.ztron.getRcm()).value
                    }
                }];

                // scanByOvk is empty before transfer
                await wait(10);
                let endBlockInfo = await tronWeb.trx.getCurrentBlock();
                endBlockIndex = endBlockInfo.block_header.raw_data.number;
                let params = {
                    "start_block_index": startBlockIndex,
                    "end_block_index": endBlockIndex,
                    "shielded_TRC20_contract_address": shieldedTRC20ContractAddress,
                    "ovk": shieldedInfo.ovk,
                };
                let result = await tronWeb.ztron.scanShieldedTRC20NotesByOvk(params, visibleOptions);
                console.log("scanByOvk-noteTxs-before: "+util.inspect(result));
                assert.isEmpty(result);

                // scanByIvk is empty before transfer
                params = {
                    "start_block_index": startBlockIndex,
                    "end_block_index": endBlockIndex,
                    "shielded_TRC20_contract_address": shieldedTRC20ContractAddress,
                    "ivk": shieldedInfo1.ivk,
                    "ak": shieldedInfo1.ak,
                    "nk": shieldedInfo1.nk,
                    "visible": true
                }
                result = await tronWeb.ztron.scanShieldedTRC20NotesByIvk(params, visibleOptions);
                console.log("scanByIvk-noteTxs-before: "+util.inspect(result));
                assert.isEmpty(result);

                // isShieldedTRC20ContractNoteSpent
                await wait(10);
                params = {
                    note: shieldedSpends[0].note,
                    ak: shieldedInfo.ak,
                    nk: shieldedInfo.nk,
                    position: shieldedSpends[0].pos,
                    shielded_TRC20_contract_address: shieldedTRC20ContractAddress
                };
                console.log("params: "+util.inspect(params));
                result = await tronWeb.ztron.isShieldedTRC20ContractNoteSpent(params);
                console.log("isShieldedTRC20ContractNoteSpent: "+util.inspect(result));
                assert.isEmpty(result);

                params = {
                    note: shieldedSpends[1].note,
                    ak: shieldedInfo.ak,
                    nk: shieldedInfo.nk,
                    position: shieldedSpends[1].pos,
                    shielded_TRC20_contract_address: shieldedTRC20ContractAddress
                };
                console.log("params: "+util.inspect(params));
                result = await tronWeb.ztron.isShieldedTRC20ContractNoteSpent(params);
                console.log("isShieldedTRC20ContractNoteSpent: "+util.inspect(result));
                assert.isEmpty(result);

                // transfer
                params = {
                    shielded_spends: shieldedSpends,
                    shielded_receives: shieldedReceives,
                    shielded_TRC20_contract_address: shieldedTRC20ContractAddress,
                    ovk: shieldedInfo.ovk,
                    ask: shieldedInfo.ask,
                    nsk: shieldedInfo.nsk
                };
                result = await tronWeb.ztron.createTransferParams(params);
                assert.ok(result && result.trigger_contract_input);
                const options = {
                    shieldedParameter: result.trigger_contract_input,
                    feeLimit:FEE_LIMIT
                };
                console.log("options: "+util.inspect(options,true,null,true))
                const transactionResult = await shieldedUtils.makeAndSendTransaction(tronWeb, shieldedTRC20ContractAddress,
                    'transfer(bytes32[10][],bytes32[2][],bytes32[9][],bytes32[2],bytes32[21][])', options, [], tronWeb.defaultAddress.base58);
                assert.ok(transactionResult && transactionResult.result);

                // isShieldedTRC20ContractNoteSpent
                await wait(10);
                params = {
                    note: shieldedSpends[0].note,
                    ak: shieldedInfo.ak,
                    nk: shieldedInfo.nk,
                    position: shieldedSpends[0].pos,
                    shielded_TRC20_contract_address: shieldedTRC20ContractAddress
                }
                result = await tronWeb.ztron.isShieldedTRC20ContractNoteSpent(params);
                console.log("isShieldedTRC20ContractNoteSpent: "+util.inspect(result,true,null,true))
                assert.ok(result);
                assert.ok(result.is_spent);

                params = {
                    note: shieldedSpends[1].note,
                    ak: shieldedInfo.ak,
                    nk: shieldedInfo.nk,
                    position: shieldedSpends[1].pos,
                    shielded_TRC20_contract_address: shieldedTRC20ContractAddress
                }
                result = await tronWeb.ztron.isShieldedTRC20ContractNoteSpent(params);
                console.log("isShieldedTRC20ContractNoteSpent: "+util.inspect(result,true,null,true))
                assert.ok(result);
                assert.ok(result.is_spent);

                // scanByOvk length is 1 after transfer
                await wait(10)
                endBlockInfo = await tronWeb.trx.getCurrentBlock()
                endBlockIndex = endBlockInfo.block_header.raw_data.number;
                params = {
                    "start_block_index": startBlockIndex,
                    "end_block_index": endBlockIndex,
                    "shielded_TRC20_contract_address": shieldedTRC20ContractAddress,
                    "ovk": shieldedInfo.ovk,
                }
                result = await tronWeb.ztron.scanShieldedTRC20NotesByOvk(params, visibleOptions);
                console.log("scanByOvk-noteTxs-after: "+util.inspect(result))
                assert.ok(result);
                assert.ok(result.noteTxs);
                assert.ok(result.noteTxs.length == 1);

                // scanByIvk length is 1 after transfer
                params = {
                    "start_block_index": startBlockIndex,
                    "end_block_index": endBlockIndex,
                    "shielded_TRC20_contract_address": shieldedTRC20ContractAddress,
                    "ivk": shieldedInfo1.ivk,
                    "ak": shieldedInfo1.ak,
                    "nk": shieldedInfo1.nk,
                }
                result = await tronWeb.ztron.scanShieldedTRC20NotesByIvk(params, options);
                console.log("scanByIvk-noteTxs-after: "+util.inspect(result))
                assert.ok(result);
                assert.ok(result.noteTxs);
                assert.ok(result.noteTxs.length == 1);
            })
        })

        describe.only("#createTransferParamsWithoutAsk 1V2", function (){
            const visibleOptions = {
                visible: true
            }
            let transferParamsResult;
            let spendAuthoritySignature;
            let transferTriggerContractInput;
            let shieldedSpends;
            let shieldedReceives;
            before(async ()=>{
                const startBlockInfo = await tronWeb.trx.getCurrentBlock()
                startBlockIndex = startBlockInfo.block_header.raw_data.number;

                // mint 2 note for shieldedInfo
                for(let i = 0; i < 2; i++){
                    const rcmInfo = await tronWeb.ztron.getRcm();
                    const params = {
                        from_amount: realCost,
                        shielded_receives: {
                            note: {
                                value: narrowValue,
                                payment_address: shieldedInfo.payment_address,
                                rcm: rcmInfo.value
                            }
                        },
                        shielded_TRC20_contract_address: shieldedTRC20ContractAddress,
                        ovk: "4364c875deeb663781a2f1530f9e4f87ea81cc3c757ca2a30fa4768940de2f98"
                    }
                    const result = await tronWeb.ztron.createMintParams(params,visibleOptions);
                    assert.ok(result);
                    assert.ok(result.trigger_contract_input);
                    const address = tronWeb.defaultAddress.base58;
                    //approve
                    await shieldedUtils.makeAndSendTransaction(tronWeb, trc20ContractAddress, 'approve(address,uint256)', visibleOptions,
                        [{type: 'address', value: shieldedTRC20ContractAddress},{type: 'uint256', value: narrowValue * scalingFactor}], address)

                    const options = {
                        shieldedParameter: result.trigger_contract_input
                    }
                    const createTx = await shieldedUtils.makeAndSendTransaction(tronWeb, shieldedTRC20ContractAddress, 'mint(uint256,bytes32[9],bytes32[2],bytes32[21])', options, [], address);
                    createTxId = createTx.transaction.txID;
                    assert.equal(createTxId.length, 64);
                    let createInfo;
                    while (true) {
                        createInfo = await tronWeb.trx.getTransactionInfo(createTxId);
                        if (Object.keys(createInfo).length === 0) {
                            await wait(3);
                            continue;
                        } else {
                            // console.log("createInfo:"+util.inspect(createInfo))
                            break;
                        }
                    }
                }

                // scanByIvk length is 2
                endBlockIndex = startBlockIndex + 90;
                const params = {
                    "start_block_index": startBlockIndex,
                    "end_block_index": endBlockIndex,
                    "shielded_TRC20_contract_address": shieldedTRC20ContractAddress,
                    "ivk": shieldedInfo.ivk,
                    "ak": shieldedInfo.ak,
                    "nk": shieldedInfo.nk,
                }
                let result = await tronWeb.ztron.scanShieldedTRC20NotesByIvk(params, visibleOptions);
                console.log("scanByIvk: "+util.inspect(result,true,null,true))
                assert.ok(result && result.noteTxs && result.noteTxs.length == 2);
                noteTxs = result.noteTxs;

                // generate new shieldedAddress
                shieldedInfo1 = await tronWeb.ztron.getNewShieldedAddress();
                shieldedInfo2 = await tronWeb.ztron.getNewShieldedAddress();
            })

            it('should get transferParams without ask, ak is an object', async function (){
                // build params
                await wait(10)
                const position = typeof (noteTxs[0].position) === 'number' ? (noteTxs[0].position) : 0;
                let pathInfo = await methodInstance.getPath(position).call();
                shieldedSpends = [{
                    "note": noteTxs[0].note,
                    "alpha": (await tronWeb.ztron.getRcm()).value,
                    "root":  pathInfo[0].replace('0x', ''),
                    "path":  pathInfo[1].map(v => v.replace('0x', '')).join(''),
                    "pos": position
                }];
                console.log("shieldedSpends: "+util.inspect(shieldedSpends,true,null,true));
                shieldedReceives = [{
                    note: {
                        value: 1,
                        payment_address: shieldedInfo1.payment_address,
                        rcm: ( await tronWeb.ztron.getRcm()).value
                    }
                },
                {
                    note: {
                        value: 1,
                        payment_address: shieldedInfo2.payment_address,
                        rcm: ( await tronWeb.ztron.getRcm()).value
                    }
                }];

                // scanByOvk is empty before transfer
                await wait(10);
                let endBlockInfo = await tronWeb.trx.getCurrentBlock();
                endBlockIndex = endBlockInfo.block_header.raw_data.number;
                let params = {
                    "start_block_index": startBlockIndex,
                    "end_block_index": endBlockIndex,
                    "shielded_TRC20_contract_address": shieldedTRC20ContractAddress,
                    "ovk": shieldedInfo.ovk,
                };
                let result = await tronWeb.ztron.scanShieldedTRC20NotesByOvk(params, visibleOptions);
                console.log("scanByOvk-noteTxs-before: "+util.inspect(result));
                assert.isEmpty(result);

                // scanByIvk is empty before transfer
                params = {
                    "start_block_index": startBlockIndex,
                    "end_block_index": endBlockIndex,
                    "shielded_TRC20_contract_address": shieldedTRC20ContractAddress,
                    "ivk": shieldedInfo1.ivk,
                    "ak": shieldedInfo1.ak,
                    "nk": shieldedInfo1.nk,
                }
                result = await tronWeb.ztron.scanShieldedTRC20NotesByIvk(params, visibleOptions);
                console.log("scanByIvk-noteTxs-before: "+util.inspect(result));
                assert.isEmpty(result);

                params = {
                    "start_block_index": startBlockIndex,
                    "end_block_index": endBlockIndex,
                    "shielded_TRC20_contract_address": shieldedTRC20ContractAddress,
                    "ivk": shieldedInfo2.ivk,
                    "ak": shieldedInfo2.ak,
                    "nk": shieldedInfo2.nk,
                }
                result = await tronWeb.ztron.scanShieldedTRC20NotesByIvk(params, visibleOptions);
                console.log("scanByIvk-noteTxs-before: "+util.inspect(result));
                assert.isEmpty(result);

                // isShieldedTRC20ContractNoteSpent
                await wait(10);
                params = {
                    note: shieldedSpends[0].note,
                    ak: shieldedInfo.ak,
                    nk: shieldedInfo.nk,
                    position: shieldedSpends[0].pos,
                    shielded_TRC20_contract_address: shieldedTRC20ContractAddress
                };
                console.log("params: "+util.inspect(params));
                result = await tronWeb.ztron.isShieldedTRC20ContractNoteSpent(params,visibleOptions);
                console.log("isShieldedTRC20ContractNoteSpent: "+util.inspect(result));
                assert.isEmpty(result);

                // transfer
                params = {
                    shielded_spends: shieldedSpends,
                    shielded_receives: shieldedReceives,
                    shielded_TRC20_contract_address: shieldedTRC20ContractAddress,
                    ovk: shieldedInfo.ovk,
                    ak: shieldedInfo.ak,
                    nsk: shieldedInfo.nsk
                };
                console.log("transferParamsResult-params: "+util.inspect(params,true,null,true));
                transferParamsResult = await tronWeb.ztron.createTransferParamsWithoutAsk(params,visibleOptions);
                console.log("transferParamsResult: "+util.inspect(transferParamsResult,true,null,true));
                assert.ok(transferParamsResult);
                assert.ok(transferParamsResult.binding_signature);
                assert.ok(transferParamsResult.message_hash);
                // createSpendAuthSig
                const txHash = transferParamsResult.message_hash;
                spendAuthoritySignature = await tronWeb.ztron.createSpendAuthSig(shieldedInfo.ask, txHash, shieldedSpends[0].alpha);
                assert.ok(spendAuthoritySignature && spendAuthoritySignature.value);
                // getTriggerInputForShieldedTRC20Contract
                const shieldedTRC20Parameters = Object.assign({}, transferParamsResult);
                spendAuthoritySignatureArray = [{
                    value: spendAuthoritySignature.value
                }];
                transferTriggerContractInput = await tronWeb.ztron.getTriggerInputForShieldedTRC20Contract(shieldedTRC20Parameters, spendAuthoritySignatureArray);
                assert.ok(transferTriggerContractInput && transferTriggerContractInput.value)
                console.log("transferTriggerContractInput: "+util.inspect(transferTriggerContractInput));

                const options = {
                    shieldedParameter: transferTriggerContractInput.value,
                    feeLimit:FEE_LIMIT
                };
                const transactionResult = await shieldedUtils.makeAndSendTransaction(tronWeb, shieldedTRC20ContractAddress,
                    'transfer(bytes32[10][],bytes32[2][],bytes32[9][],bytes32[2],bytes32[21][])', options, [], tronWeb.defaultAddress.base58);
                console.log("transactionResult: "+util.inspect(transactionResult));
                assert.ok(transactionResult);
                assert.ok(transactionResult.result);

                // isShieldedTRC20ContractNoteSpent
                await wait(20);
                params = {
                    note: shieldedSpends[0].note,
                    ak: shieldedInfo.ak,
                    nk: shieldedInfo.nk,
                    position: shieldedSpends[0].pos,
                    shielded_TRC20_contract_address: shieldedTRC20ContractAddress
                }
                result = await tronWeb.ztron.isShieldedTRC20ContractNoteSpent(params,visibleOptions);
                console.log("isShieldedTRC20ContractNoteSpent: "+util.inspect(result))
                assert.ok(result);
                assert.ok(result.is_spent);

                // scanByOvk length is 2 after transfer
                await wait(10)
                endBlockInfo = await tronWeb.trx.getCurrentBlock()
                endBlockIndex = endBlockInfo.block_header.raw_data.number;
                params = {
                    "start_block_index": startBlockIndex,
                    "end_block_index": endBlockIndex,
                    "shielded_TRC20_contract_address": shieldedTRC20ContractAddress,
                    "ovk": shieldedInfo.ovk,
                }
                result = await tronWeb.ztron.scanShieldedTRC20NotesByOvk(params, visibleOptions);
                console.log("scanByOvk-noteTxs-after: "+util.inspect(result))
                assert.ok(result);
                assert.ok(result.noteTxs);
                assert.ok(result.noteTxs.length == 2);

                // scanByIvk length is 1 after transfer
                params = {
                    "start_block_index": startBlockIndex,
                    "end_block_index": endBlockIndex,
                    "shielded_TRC20_contract_address": shieldedTRC20ContractAddress,
                    "ivk": shieldedInfo1.ivk,
                    "ak": shieldedInfo1.ak,
                    "nk": shieldedInfo1.nk,
                }
                result = await tronWeb.ztron.scanShieldedTRC20NotesByIvk(params, visibleOptions);
                console.log("scanByIvk-noteTxs-after: "+util.inspect(result))
                assert.ok(result);
                assert.ok(result.noteTxs);
                assert.ok(result.noteTxs.length == 1);

                params = {
                    "start_block_index": startBlockIndex,
                    "end_block_index": endBlockIndex,
                    "shielded_TRC20_contract_address": shieldedTRC20ContractAddress,
                    "ivk": shieldedInfo2.ivk,
                    "ak": shieldedInfo2.ak,
                    "nk": shieldedInfo2.nk,
                }
                result = await tronWeb.ztron.scanShieldedTRC20NotesByIvk(params, visibleOptions);
                console.log("scanByIvk-noteTxs-after: "+util.inspect(result))
                assert.ok(result);
                assert.ok(result.noteTxs);
                assert.ok(result.noteTxs.length == 1);
            })
        })

        describe.only("#createTransferParamsWithoutAsk 2V2", function (){
            const visibleOptions = {
                visible: true
            }
            let transferParamsResult;
            let spendAuthoritySignature1;
            let spendAuthoritySignature2;
            let transferTriggerContractInput;
            let shieldedSpends;
            let shieldedReceives;
            before(async ()=>{
                const startBlockInfo = await tronWeb.trx.getCurrentBlock()
                startBlockIndex = startBlockInfo.block_header.raw_data.number;

                // mint 2 note for shieldedInfo
                for(let i = 0; i < 2; i++){
                    const rcmInfo = await tronWeb.ztron.getRcm();
                    const params = {
                        from_amount: realCost,
                        shielded_receives: {
                            note: {
                                value: narrowValue,
                                payment_address: shieldedInfo.payment_address,
                                rcm: rcmInfo.value
                            }
                        },
                        shielded_TRC20_contract_address: await tronWeb.address.toHex(shieldedTRC20ContractAddress),
                        ovk: "4364c875deeb663781a2f1530f9e4f87ea81cc3c757ca2a30fa4768940de2f98"
                    }
                    const result = await tronWeb.ztron.createMintParams(params,visibleFalseOptions);
                    assert.ok(result);
                    assert.ok(result.trigger_contract_input);
                    const address = tronWeb.defaultAddress.base58;
                    //approve
                    await shieldedUtils.makeAndSendTransaction(tronWeb, trc20ContractAddress, 'approve(address,uint256)', visibleFalseOptions,
                        [{type: 'address', value: await tronWeb.address.toHex(shieldedTRC20ContractAddress)},{type: 'uint256', value: narrowValue * scalingFactor}], address)

                    const options = {
                        shieldedParameter: result.trigger_contract_input
                    }
                    const createTx = await shieldedUtils.makeAndSendTransaction(tronWeb, await tronWeb.address.toHex(shieldedTRC20ContractAddress), 'mint(uint256,bytes32[9],bytes32[2],bytes32[21])', options, [], address);
                    createTxId = createTx.transaction.txID;
                    assert.equal(createTxId.length, 64);
                    let createInfo;
                    while (true) {
                        createInfo = await tronWeb.trx.getTransactionInfo(createTxId);
                        if (Object.keys(createInfo).length === 0) {
                            await wait(3);
                            continue;
                        } else {
                            // console.log("createInfo:"+util.inspect(createInfo))
                            break;
                        }
                    }
                }

                // scanByIvk length is 2
                endBlockIndex = startBlockIndex + 90;
                const params = {
                    "start_block_index": startBlockIndex,
                    "end_block_index": endBlockIndex,
                    "shielded_TRC20_contract_address": await tronWeb.address.toHex(shieldedTRC20ContractAddress),
                    "ivk": shieldedInfo.ivk,
                    "ak": shieldedInfo.ak,
                    "nk": shieldedInfo.nk,
                    "visible": true
                }
                let result = await tronWeb.ztron.scanShieldedTRC20NotesByIvk(params, visibleFalseOptions);
                console.log("scanByIvk: "+util.inspect(result,true,null,true))
                assert.ok(result && result.noteTxs && result.noteTxs.length == 2);
                noteTxs = result.noteTxs;

                // generate new shieldedAddress
                shieldedInfo1 = await tronWeb.ztron.getNewShieldedAddress();
                shieldedInfo2 = await tronWeb.ztron.getNewShieldedAddress();
            })

            it('should get transferParams without ask, ak is an object', async function (){
                // build params
                await wait(10)
                const position = typeof (noteTxs[0].position) === 'number' ? (noteTxs[0].position) : 0;
                let pathInfo1 = await methodInstance.getPath(position).call();
                let pathInfo2 = await methodInstance.getPath(noteTxs[1].position).call();
                shieldedSpends = [{
                    "note": noteTxs[0].note,
                    "alpha": (await tronWeb.ztron.getRcm()).value,
                    "root":  pathInfo1[0].replace('0x', ''),
                    "path":  pathInfo1[1].map(v => v.replace('0x', '')).join(''),
                    "pos": noteTxs[0].position
                },
                {
                    "note": noteTxs[1].note,
                    "alpha": (await tronWeb.ztron.getRcm()).value,
                    "root":  pathInfo2[0].replace('0x', ''),
                    "path":  pathInfo2[1].map(v => v.replace('0x', '')).join(''),
                    "pos": noteTxs[1].position
                }];
                console.log("shieldedSpends: "+util.inspect(shieldedSpends,true,null,true));
                shieldedReceives = [{
                    note: {
                        value: 2,
                        payment_address: shieldedInfo1.payment_address,
                        rcm: ( await tronWeb.ztron.getRcm()).value
                    }
                },
                {
                    note: {
                        value: 2,
                        payment_address: shieldedInfo2.payment_address,
                        rcm: ( await tronWeb.ztron.getRcm()).value
                    }
                }];

                // scanByOvk is empty before transfer
                await wait(10);
                let endBlockInfo = await tronWeb.trx.getCurrentBlock();
                endBlockIndex = endBlockInfo.block_header.raw_data.number;
                let params = {
                    "start_block_index": startBlockIndex,
                    "end_block_index": endBlockIndex,
                    "shielded_TRC20_contract_address": await tronWeb.address.toHex(shieldedTRC20ContractAddress),
                    "ovk": shieldedInfo.ovk,
                };
                let result = await tronWeb.ztron.scanShieldedTRC20NotesByOvk(params, visibleFalseOptions);
                console.log("scanByOvk-noteTxs-before: "+util.inspect(result));
                assert.isEmpty(result);

                // scanByIvk is empty before transfer
                params = {
                    "start_block_index": startBlockIndex,
                    "end_block_index": endBlockIndex,
                    "shielded_TRC20_contract_address": await tronWeb.address.toHex(shieldedTRC20ContractAddress),
                    "ivk": shieldedInfo1.ivk,
                    "ak": shieldedInfo1.ak,
                    "nk": shieldedInfo1.nk,
                    "visible": true
                }
                result = await tronWeb.ztron.scanShieldedTRC20NotesByIvk(params, visibleFalseOptions);
                console.log("scanByIvk-noteTxs-before: "+util.inspect(result));
                assert.isEmpty(result);

                params = {
                    "start_block_index": startBlockIndex,
                    "end_block_index": endBlockIndex,
                    "shielded_TRC20_contract_address": await tronWeb.address.toHex(shieldedTRC20ContractAddress),
                    "ivk": shieldedInfo2.ivk,
                    "ak": shieldedInfo2.ak,
                    "nk": shieldedInfo2.nk,
                    "visible": true
                }
                result = await tronWeb.ztron.scanShieldedTRC20NotesByIvk(params, visibleFalseOptions);
                console.log("scanByIvk-noteTxs-before: "+util.inspect(result));
                assert.isEmpty(result);

                // isShieldedTRC20ContractNoteSpent
                await wait(10);
                params = {
                    note: shieldedSpends[0].note,
                    ak: shieldedInfo.ak,
                    nk: shieldedInfo.nk,
                    position: shieldedSpends[0].pos,
                    shielded_TRC20_contract_address: await tronWeb.address.toHex(shieldedTRC20ContractAddress)
                };
                console.log("params: "+util.inspect(params));
                result = await tronWeb.ztron.isShieldedTRC20ContractNoteSpent(params,visibleFalseOptions);
                console.log("isShieldedTRC20ContractNoteSpent: "+util.inspect(result));
                assert.isEmpty(result);

                params = {
                    note: shieldedSpends[1].note,
                    ak: shieldedInfo.ak,
                    nk: shieldedInfo.nk,
                    position: shieldedSpends[1].pos,
                    shielded_TRC20_contract_address: await tronWeb.address.toHex(shieldedTRC20ContractAddress)
                };
                console.log("params: "+util.inspect(params));
                result = await tronWeb.ztron.isShieldedTRC20ContractNoteSpent(params,visibleFalseOptions);
                console.log("isShieldedTRC20ContractNoteSpent: "+util.inspect(result));
                assert.isEmpty(result);

                // transfer
                params = {
                    shielded_spends: shieldedSpends,
                    shielded_receives: shieldedReceives,
                    shielded_TRC20_contract_address: await tronWeb.address.toHex(shieldedTRC20ContractAddress),
                    ovk: shieldedInfo.ovk,
                    ak: shieldedInfo.ak,
                    nsk: shieldedInfo.nsk
                };
                console.log("transferParamsResult-params: "+util.inspect(params,true,null,true));
                transferParamsResult = await tronWeb.ztron.createTransferParamsWithoutAsk(params,visibleFalseOptions);
                console.log("transferParamsResult: "+util.inspect(transferParamsResult,true,null,true));
                assert.ok(transferParamsResult);
                assert.ok(transferParamsResult.binding_signature);
                assert.ok(transferParamsResult.message_hash);
                // createSpendAuthSig
                const txHash = transferParamsResult.message_hash;
                spendAuthoritySignature1 = await tronWeb.ztron.createSpendAuthSig(shieldedInfo.ask, txHash, shieldedSpends[0].alpha);
                assert.ok(spendAuthoritySignature1 && spendAuthoritySignature1.value);
                spendAuthoritySignature2 = await tronWeb.ztron.createSpendAuthSig(shieldedInfo.ask, txHash, shieldedSpends[1].alpha);
                assert.ok(spendAuthoritySignature2 && spendAuthoritySignature2.value);
                // getTriggerInputForShieldedTRC20Contract
                const shieldedTRC20Parameters = Object.assign({}, transferParamsResult);
                spendAuthoritySignatureArray = [{
                    value: spendAuthoritySignature1.value
                },
                {
                    value: spendAuthoritySignature2.value
                }];
                transferTriggerContractInput = await tronWeb.ztron.getTriggerInputForShieldedTRC20Contract(shieldedTRC20Parameters, spendAuthoritySignatureArray);
                assert.ok(transferTriggerContractInput && transferTriggerContractInput.value)
                console.log("transferTriggerContractInput: "+util.inspect(transferTriggerContractInput));

                const options = {
                    shieldedParameter: transferTriggerContractInput.value,
                    feeLimit:FEE_LIMIT
                };
                const transactionResult = await shieldedUtils.makeAndSendTransaction(tronWeb, await tronWeb.address.toHex(shieldedTRC20ContractAddress),
                    'transfer(bytes32[10][],bytes32[2][],bytes32[9][],bytes32[2],bytes32[21][])', options, [], tronWeb.defaultAddress.base58);
                console.log("transactionResult: "+util.inspect(transactionResult));
                assert.ok(transactionResult);
                assert.ok(transactionResult.result);

                // isShieldedTRC20ContractNoteSpent
                await wait(20);
                params = {
                    note: shieldedSpends[0].note,
                    ak: shieldedInfo.ak,
                    nk: shieldedInfo.nk,
                    position: shieldedSpends[0].pos,
                    shielded_TRC20_contract_address: await tronWeb.address.toHex(shieldedTRC20ContractAddress)
                }
                result = await tronWeb.ztron.isShieldedTRC20ContractNoteSpent(params,visibleFalseOptions);
                console.log("isShieldedTRC20ContractNoteSpent: "+util.inspect(result))
                assert.ok(result);
                assert.ok(result.is_spent);

                params = {
                    note: shieldedSpends[1].note,
                    ak: shieldedInfo.ak,
                    nk: shieldedInfo.nk,
                    position: shieldedSpends[1].pos,
                    shielded_TRC20_contract_address: await tronWeb.address.toHex(shieldedTRC20ContractAddress)
                }
                result = await tronWeb.ztron.isShieldedTRC20ContractNoteSpent(params,visibleFalseOptions);
                console.log("isShieldedTRC20ContractNoteSpent: "+util.inspect(result))
                assert.ok(result);
                assert.ok(result.is_spent);

                // scanByOvk length is 2 after transfer
                await wait(10)
                endBlockInfo = await tronWeb.trx.getCurrentBlock()
                endBlockIndex = endBlockInfo.block_header.raw_data.number;
                params = {
                    "start_block_index": startBlockIndex,
                    "end_block_index": endBlockIndex,
                    "shielded_TRC20_contract_address": await tronWeb.address.toHex(shieldedTRC20ContractAddress),
                    "ovk": shieldedInfo.ovk,
                }
                result = await tronWeb.ztron.scanShieldedTRC20NotesByOvk(params, visibleFalseOptions);
                console.log("scanByOvk-noteTxs-after: "+util.inspect(result))
                assert.ok(result);
                assert.ok(result.noteTxs);
                assert.ok(result.noteTxs.length == 2);

                // scanByIvk length is 1 after transfer
                params = {
                    "start_block_index": startBlockIndex,
                    "end_block_index": endBlockIndex,
                    "shielded_TRC20_contract_address": await tronWeb.address.toHex(shieldedTRC20ContractAddress),
                    "ivk": shieldedInfo1.ivk,
                    "ak": shieldedInfo1.ak,
                    "nk": shieldedInfo1.nk,
                }
                result = await tronWeb.ztron.scanShieldedTRC20NotesByIvk(params, visibleFalseOptions);
                console.log("scanByIvk-noteTxs-after: "+util.inspect(result))
                assert.ok(result);
                assert.ok(result.noteTxs);
                assert.ok(result.noteTxs.length == 1);

                params = {
                    "start_block_index": startBlockIndex,
                    "end_block_index": endBlockIndex,
                    "shielded_TRC20_contract_address": await tronWeb.address.toHex(shieldedTRC20ContractAddress),
                    "ivk": shieldedInfo2.ivk,
                    "ak": shieldedInfo2.ak,
                    "nk": shieldedInfo2.nk,
                }
                result = await tronWeb.ztron.scanShieldedTRC20NotesByIvk(params, visibleFalseOptions);
                console.log("scanByIvk-noteTxs-after: "+util.inspect(result))
                assert.ok(result);
                assert.ok(result.noteTxs);
                assert.ok(result.noteTxs.length == 1);
            })
        })

        describe.only("#createTransferParamsWithoutAsk 2V1", function (){
            const visibleOptions = {
                visible: true
            }
            let transferParamsResult;
            let spendAuthoritySignature1;
            let spendAuthoritySignature2;
            let transferTriggerContractInput;
            let shieldedSpends;
            let shieldedReceives;
            before(async ()=>{
                const startBlockInfo = await tronWeb.trx.getCurrentBlock()
                startBlockIndex = startBlockInfo.block_header.raw_data.number;

                // mint 2 note for shieldedInfo
                for(let i = 0; i < 2; i++){
                    const rcmInfo = await tronWeb.ztron.getRcm();
                    const params = {
                        from_amount: realCost,
                        shielded_receives: {
                            note: {
                                value: narrowValue,
                                payment_address: shieldedInfo.payment_address,
                                rcm: rcmInfo.value
                            }
                        },
                        shielded_TRC20_contract_address: shieldedTRC20ContractAddress,
                        ovk: "4364c875deeb663781a2f1530f9e4f87ea81cc3c757ca2a30fa4768940de2f98"
                    }
                    const result = await tronWeb.ztron.createMintParams(params);
                    assert.ok(result);
                    assert.ok(result.trigger_contract_input);
                    const address = tronWeb.defaultAddress.base58;
                    //approve
                    await shieldedUtils.makeAndSendTransaction(tronWeb, trc20ContractAddress, 'approve(address,uint256)', {},
                        [{type: 'address', value: shieldedTRC20ContractAddress},{type: 'uint256', value: narrowValue * scalingFactor}], address)

                    const options = {
                        shieldedParameter: result.trigger_contract_input
                    }
                    const createTx = await shieldedUtils.makeAndSendTransaction(tronWeb, shieldedTRC20ContractAddress, 'mint(uint256,bytes32[9],bytes32[2],bytes32[21])', options, [], address);
                    createTxId = createTx.transaction.txID;
                    assert.equal(createTxId.length, 64);
                    let createInfo;
                    while (true) {
                        createInfo = await tronWeb.trx.getTransactionInfo(createTxId);
                        if (Object.keys(createInfo).length === 0) {
                            await wait(3);
                            continue;
                        } else {
                            // console.log("createInfo:"+util.inspect(createInfo))
                            break;
                        }
                    }
                }

                // scanByIvk length is 2
                endBlockIndex = startBlockIndex + 90;
                const params = {
                    "start_block_index": startBlockIndex,
                    "end_block_index": endBlockIndex,
                    "shielded_TRC20_contract_address": shieldedTRC20ContractAddress,
                    "ivk": shieldedInfo.ivk,
                    "ak": shieldedInfo.ak,
                    "nk": shieldedInfo.nk,
                    "visible": true
                }
                let result = await tronWeb.ztron.scanShieldedTRC20NotesByIvk(params, visibleOptions);
                console.log("scanByIvk: "+util.inspect(result,true,null,true))
                assert.ok(result && result.noteTxs && result.noteTxs.length == 2);
                noteTxs = result.noteTxs;

                // generate new shieldedAddress
                shieldedInfo1 = await tronWeb.ztron.getNewShieldedAddress();
            })

            it('should get transferParams without ask, ak is an object', async function (){
                // build params
                await wait(10)
                const position = typeof (noteTxs[0].position) === 'number' ? (noteTxs[0].position) : 0;
                let pathInfo1 = await methodInstance.getPath(position).call();
                let pathInfo2 = await methodInstance.getPath(noteTxs[1].position).call();
                shieldedSpends = [{
                    "note": noteTxs[0].note,
                    "alpha": (await tronWeb.ztron.getRcm()).value,
                    "root":  pathInfo1[0].replace('0x', ''),
                    "path":  pathInfo1[1].map(v => v.replace('0x', '')).join(''),
                    "pos": noteTxs[0].position
                },
                {
                    "note": noteTxs[1].note,
                    "alpha": (await tronWeb.ztron.getRcm()).value,
                    "root":  pathInfo2[0].replace('0x', ''),
                    "path":  pathInfo2[1].map(v => v.replace('0x', '')).join(''),
                    "pos": noteTxs[1].position
                }];
                console.log("shieldedSpends: "+util.inspect(shieldedSpends,true,null,true));
                shieldedReceives = [{
                    note: {
                        value: 4,
                        payment_address: shieldedInfo1.payment_address,
                        rcm: ( await tronWeb.ztron.getRcm()).value
                    }
                }];

                // scanByOvk is empty before transfer
                await wait(10);
                let endBlockInfo = await tronWeb.trx.getCurrentBlock();
                endBlockIndex = endBlockInfo.block_header.raw_data.number;
                let params = {
                    "start_block_index": startBlockIndex,
                    "end_block_index": endBlockIndex,
                    "shielded_TRC20_contract_address": shieldedTRC20ContractAddress,
                    "ovk": shieldedInfo.ovk,
                };
                let result = await tronWeb.ztron.scanShieldedTRC20NotesByOvk(params, visibleOptions);
                console.log("scanByOvk-noteTxs-before: "+util.inspect(result));
                assert.isEmpty(result);

                // scanByIvk is empty before transfer
                params = {
                    "start_block_index": startBlockIndex,
                    "end_block_index": endBlockIndex,
                    "shielded_TRC20_contract_address": shieldedTRC20ContractAddress,
                    "ivk": shieldedInfo1.ivk,
                    "ak": shieldedInfo1.ak,
                    "nk": shieldedInfo1.nk,
                    "visible": true
                }
                result = await tronWeb.ztron.scanShieldedTRC20NotesByIvk(params, visibleOptions);
                console.log("scanByIvk-noteTxs-before: "+util.inspect(result));
                assert.isEmpty(result);

                // isShieldedTRC20ContractNoteSpent
                await wait(10);
                params = {
                    note: shieldedSpends[0].note,
                    ak: shieldedInfo.ak,
                    nk: shieldedInfo.nk,
                    position: shieldedSpends[0].pos,
                    shielded_TRC20_contract_address: shieldedTRC20ContractAddress
                };
                console.log("params: "+util.inspect(params));
                result = await tronWeb.ztron.isShieldedTRC20ContractNoteSpent(params);
                console.log("isShieldedTRC20ContractNoteSpent: "+util.inspect(result));
                assert.isEmpty(result);

                params = {
                    note: shieldedSpends[1].note,
                    ak: shieldedInfo.ak,
                    nk: shieldedInfo.nk,
                    position: shieldedSpends[1].pos,
                    shielded_TRC20_contract_address: shieldedTRC20ContractAddress
                };
                console.log("params: "+util.inspect(params));
                result = await tronWeb.ztron.isShieldedTRC20ContractNoteSpent(params);
                console.log("isShieldedTRC20ContractNoteSpent: "+util.inspect(result));
                assert.isEmpty(result);

                // transfer
                params = {
                    shielded_spends: shieldedSpends,
                    shielded_receives: shieldedReceives,
                    shielded_TRC20_contract_address: shieldedTRC20ContractAddress,
                    ovk: shieldedInfo.ovk,
                    ak: shieldedInfo.ak,
                    nsk: shieldedInfo.nsk
                };
                console.log("transferParamsResult-params: "+util.inspect(params,true,null,true));
                transferParamsResult = await tronWeb.ztron.createTransferParamsWithoutAsk(params);
                console.log("transferParamsResult: "+util.inspect(transferParamsResult,true,null,true));
                assert.ok(transferParamsResult);
                assert.ok(transferParamsResult.binding_signature);
                assert.ok(transferParamsResult.message_hash);
                // createSpendAuthSig
                const txHash = transferParamsResult.message_hash;
                spendAuthoritySignature1 = await tronWeb.ztron.createSpendAuthSig(shieldedInfo.ask, txHash, shieldedSpends[0].alpha);
                assert.ok(spendAuthoritySignature1 && spendAuthoritySignature1.value);
                spendAuthoritySignature2 = await tronWeb.ztron.createSpendAuthSig(shieldedInfo.ask, txHash, shieldedSpends[1].alpha);
                assert.ok(spendAuthoritySignature2 && spendAuthoritySignature2.value);
                // getTriggerInputForShieldedTRC20Contract
                const shieldedTRC20Parameters = Object.assign({}, transferParamsResult);
                spendAuthoritySignatureArray = [{
                    value: spendAuthoritySignature1.value
                },
                {
                    value: spendAuthoritySignature2.value
                }];
                transferTriggerContractInput = await tronWeb.ztron.getTriggerInputForShieldedTRC20Contract(shieldedTRC20Parameters, spendAuthoritySignatureArray);
                assert.ok(transferTriggerContractInput && transferTriggerContractInput.value)
                console.log("transferTriggerContractInput: "+util.inspect(transferTriggerContractInput));

                const options = {
                    shieldedParameter: transferTriggerContractInput.value,
                    feeLimit:FEE_LIMIT
                };
                const transactionResult = await shieldedUtils.makeAndSendTransaction(tronWeb, shieldedTRC20ContractAddress,
                    'transfer(bytes32[10][],bytes32[2][],bytes32[9][],bytes32[2],bytes32[21][])', options, [], tronWeb.defaultAddress.base58);
                console.log("transactionResult: "+util.inspect(transactionResult));
                assert.ok(transactionResult);
                assert.ok(transactionResult.result);

                // isShieldedTRC20ContractNoteSpent
                await wait(20);
                params = {
                    note: shieldedSpends[0].note,
                    ak: shieldedInfo.ak,
                    nk: shieldedInfo.nk,
                    position: shieldedSpends[0].pos,
                    shielded_TRC20_contract_address: shieldedTRC20ContractAddress
                }
                result = await tronWeb.ztron.isShieldedTRC20ContractNoteSpent(params);
                console.log("isShieldedTRC20ContractNoteSpent: "+util.inspect(result))
                assert.ok(result);
                assert.ok(result.is_spent);

                params = {
                    note: shieldedSpends[1].note,
                    ak: shieldedInfo.ak,
                    nk: shieldedInfo.nk,
                    position: shieldedSpends[1].pos,
                    shielded_TRC20_contract_address: shieldedTRC20ContractAddress
                }
                result = await tronWeb.ztron.isShieldedTRC20ContractNoteSpent(params);
                console.log("isShieldedTRC20ContractNoteSpent: "+util.inspect(result))
                assert.ok(result);
                assert.ok(result.is_spent);

                // scanByOvk length is 1 after transfer
                await wait(10)
                endBlockInfo = await tronWeb.trx.getCurrentBlock()
                endBlockIndex = endBlockInfo.block_header.raw_data.number;
                params = {
                    "start_block_index": startBlockIndex,
                    "end_block_index": endBlockIndex,
                    "shielded_TRC20_contract_address": shieldedTRC20ContractAddress,
                    "ovk": shieldedInfo.ovk,
                }
                result = await tronWeb.ztron.scanShieldedTRC20NotesByOvk(params, visibleOptions);
                console.log("scanByOvk-noteTxs-after: "+util.inspect(result))
                assert.ok(result);
                assert.ok(result.noteTxs);
                assert.ok(result.noteTxs.length == 1);

                // scanByIvk length is 1 after transfer
                params = {
                    "start_block_index": startBlockIndex,
                    "end_block_index": endBlockIndex,
                    "shielded_TRC20_contract_address": shieldedTRC20ContractAddress,
                    "ivk": shieldedInfo1.ivk,
                    "ak": shieldedInfo1.ak,
                    "nk": shieldedInfo1.nk,
                }
                result = await tronWeb.ztron.scanShieldedTRC20NotesByIvk(params, options);
                console.log("scanByIvk-noteTxs-after: "+util.inspect(result))
                assert.ok(result);
                assert.ok(result.noteTxs);
                assert.ok(result.noteTxs.length == 1);
            })
        })

        describe.only("#createBurnParams 1V1T", function (){
            const visibleOptions = {
                visible: true
            }
            let burnShieldedReceives = [];
            let toAmount = "20";
            let burnShieldedSpends;
            const transParentToAddress = zTronConfig.transParentToAddress;
            before(async ()=>{
                shieldedInfo = await tronWeb.ztron.getNewShieldedAddress();
                const startBlockInfo = await tronWeb.trx.getCurrentBlock()
                startBlockIndex = startBlockInfo.block_header.raw_data.number;

                // mint 2 note for shieldedInfo
                for(let i = 0; i < 2; i++){
                    const rcmInfo = await tronWeb.ztron.getRcm();
                    const params = {
                        from_amount: realCost,
                        shielded_receives: {
                            note: {
                                value: narrowValue,
                                payment_address: shieldedInfo.payment_address,
                                rcm: rcmInfo.value
                            }
                        },
                        shielded_TRC20_contract_address: await tronWeb.address.toHex(shieldedTRC20ContractAddress),
                        ovk: "4364c875deeb663781a2f1530f9e4f87ea81cc3c757ca2a30fa4768940de2f98"
                    }
                    const result = await tronWeb.ztron.createMintParams(params,visibleFalseOptions);
                    assert.ok(result);
                    assert.ok(result.trigger_contract_input);
                    const address = tronWeb.defaultAddress.base58;
                    //approve
                    await shieldedUtils.makeAndSendTransaction(tronWeb, trc20ContractAddress, 'approve(address,uint256)', visibleFalseOptions,
                        [{type: 'address', value: await tronWeb.address.toHex(shieldedTRC20ContractAddress)},{type: 'uint256', value: narrowValue * scalingFactor}], address)

                    const options = {
                        shieldedParameter: result.trigger_contract_input
                    }
                    const createTx = await shieldedUtils.makeAndSendTransaction(tronWeb, await tronWeb.address.toHex(shieldedTRC20ContractAddress), 'mint(uint256,bytes32[9],bytes32[2],bytes32[21])', options, [], address);
                    createTxId = createTx.transaction.txID;
                    assert.equal(createTxId.length, 64);
                    let createInfo;
                    while (true) {
                        createInfo = await tronWeb.trx.getTransactionInfo(createTxId);
                        if (Object.keys(createInfo).length === 0) {
                            await wait(3);
                            continue;
                        } else {
                            // console.log("createInfo:"+util.inspect(createInfo))
                            break;
                        }
                    }
                }

                // scanByIvk
                endBlockIndex = startBlockIndex + 90;
                const params = {
                    "start_block_index": startBlockIndex,
                    "end_block_index": endBlockIndex,
                    "shielded_TRC20_contract_address": await tronWeb.address.toHex(shieldedTRC20ContractAddress),
                    "ivk": shieldedInfo.ivk,
                    "ak": shieldedInfo.ak,
                    "nk": shieldedInfo.nk,
                    "visible": true
                }
                let result = await tronWeb.ztron.scanShieldedTRC20NotesByIvk(params, visibleFalseOptions);
                assert.ok(result && result.noteTxs && result.noteTxs.length == 2);
                noteTxs = result.noteTxs;
                console.log("noteTxs: "+util.inspect(noteTxs))

                const pathInfo = await methodInstance.getPath(noteTxs[0].position).call();
                burnShieldedSpends = [{
                    "note": noteTxs[0].note,
                    "alpha": (await tronWeb.ztron.getRcm()).value,
                    "root":  pathInfo[0].replace('0x', ''),
                    "path":  pathInfo[1].map(v => v.replace('0x', '')).join(''),
                    "pos": noteTxs[0].position
                }];

                burnShieldedReceives = [];
            })

            it('should get burnParams with ask is object', async function (){
                let trc20Contract = await tronWeb.contract().at(trc20ContractAddress);
                let trc20BalanceBefore = await trc20Contract.balanceOf(ADDRESS_BASE58).call();
                console.log("trc20BalanceBefore: "+trc20BalanceBefore);

                let params = {
                    shielded_spends: burnShieldedSpends,
                    shielded_receives: burnShieldedReceives,
                    shielded_TRC20_contract_address: await tronWeb.address.toHex(shieldedTRC20ContractAddress),
                    ovk: shieldedInfo.ovk,
                    ask: shieldedInfo.ask,
                    nsk: shieldedInfo.nsk,
                    to_amount: toAmount,
                    transparent_to_address: await tronWeb.address.toHex(transParentToAddress)
                }

                let result = await tronWeb.ztron.createBurnParams(params,visibleFalseOptions);
                assert.ok(result && result.trigger_contract_input);

                const options = {
                    shieldedParameter: result.trigger_contract_input,
                    feeLimit:FEE_LIMIT
                }
                const transactionResult = await shieldedUtils.makeAndSendTransaction(tronWeb, await tronWeb.address.toHex(shieldedTRC20ContractAddress),
                    'burn(bytes32[10],bytes32[2],uint256,bytes32[2],address,bytes32[3],bytes32[9][],bytes32[21][])', options, [], tronWeb.defaultAddress.base58);
                console.log("transactionResult: "+util.inspect(transactionResult,true,null,true))
                assert.ok(transactionResult && transactionResult.result);
                await wait(50);

                // trc20Balance add 20 after burn
                trc20Contract = await tronWeb.contract().at(trc20ContractAddress);
                let trc20BalanceAfter = await trc20Contract.balanceOf(ADDRESS_BASE58).call();
                console.log("trc20BalanceAfter: "+trc20BalanceAfter);
                assert.equal(parseInt(trc20BalanceBefore)+parseInt(20),parseInt(trc20BalanceAfter));

                // isShieldedTRC20ContractNoteSpent
                await wait(10);
                params = {
                    note: burnShieldedSpends[0].note,
                    ak: shieldedInfo.ak,
                    nk: shieldedInfo.nk,
                    position: burnShieldedSpends[0].pos,
                    shielded_TRC20_contract_address: await tronWeb.address.toHex(shieldedTRC20ContractAddress)
                }
                result = await tronWeb.ztron.isShieldedTRC20ContractNoteSpent(params, visibleFalseOptions);
                console.log("isShieldedTRC20ContractNoteSpent: "+util.inspect(result))
                assert.ok(result);
                assert.ok(result.is_spent);

                // scanByOvk length is 1 after burn
                await wait(10)
                endBlockInfo = await tronWeb.trx.getCurrentBlock()
                endBlockIndex = endBlockInfo.block_header.raw_data.number;
                params = {
                    "start_block_index": startBlockIndex,
                    "end_block_index": endBlockIndex,
                    "shielded_TRC20_contract_address": shieldedTRC20ContractAddress,
                    "ovk": shieldedInfo.ovk,
                }
                result = await tronWeb.ztron.scanShieldedTRC20NotesByOvk(params, visibleFalseOptions);
                console.log("scanByOvk-noteTxs-after: "+util.inspect(result))
                let scanByOvkNote = result.noteTxs;
                assert.ok(scanByOvkNote.length == 1);
                assert.ok(scanByOvkNote[0].txid == transactionResult.txid);
                assert.ok(scanByOvkNote[0].to_amount == 20);
                assert.equal(await tronWeb.address.fromHex(scanByOvkNote[0].transparent_to_address), transParentToAddress);
            })

        })

        describe.only("#createBurnParamsWithoutAsk 1V1T", function (){
            let burnParamsResult;
            let spendAuthoritySignature;
            let burnTriggerContractInput;

            const visibleOptions = {
                visible: true
            }
            let burnShieldedReceives = [];
            let toAmount = "20";
            let burnShieldedSpends;
            const transParentToAddress = zTronConfig.transParentToAddress;
            before(async () => {
                shieldedInfo = await tronWeb.ztron.getNewShieldedAddress();
                const startBlockInfo = await tronWeb.trx.getCurrentBlock()
                startBlockIndex = startBlockInfo.block_header.raw_data.number;

                // mint 2 note for shieldedInfo
                for(let i = 0; i < 2; i++){
                    const rcmInfo = await tronWeb.ztron.getRcm();
                    const params = {
                        from_amount: realCost,
                        shielded_receives: {
                            note: {
                                value: narrowValue,
                                payment_address: shieldedInfo.payment_address,
                                rcm: rcmInfo.value
                            }
                        },
                        shielded_TRC20_contract_address: await tronWeb.address.fromHex(shieldedTRC20ContractAddress),
                        ovk: "4364c875deeb663781a2f1530f9e4f87ea81cc3c757ca2a30fa4768940de2f98"
                    }
                    const result = await tronWeb.ztron.createMintParams(params,visibleFalseOptions);
                    assert.ok(result);
                    assert.ok(result.trigger_contract_input);
                    const address = tronWeb.defaultAddress.base58;
                    //approve
                    await shieldedUtils.makeAndSendTransaction(tronWeb, trc20ContractAddress, 'approve(address,uint256)', visibleFalseOptions,
                        [{type: 'address', value: await tronWeb.address.fromHex(shieldedTRC20ContractAddress)},{type: 'uint256', value: narrowValue * scalingFactor}], address)

                    const options = {
                        shieldedParameter: result.trigger_contract_input
                    }
                    const createTx = await shieldedUtils.makeAndSendTransaction(tronWeb, await tronWeb.address.fromHex(shieldedTRC20ContractAddress), 'mint(uint256,bytes32[9],bytes32[2],bytes32[21])', options, [], address);
                    createTxId = createTx.transaction.txID;
                    assert.equal(createTxId.length, 64);
                    let createInfo;
                    while (true) {
                        createInfo = await tronWeb.trx.getTransactionInfo(createTxId);
                        if (Object.keys(createInfo).length === 0) {
                            await wait(3);
                            continue;
                        } else {
                            // console.log("createInfo:"+util.inspect(createInfo))
                            break;
                        }
                    }
                }

                // scanByIvk
                endBlockIndex = startBlockIndex + 90;
                const params = {
                    "start_block_index": startBlockIndex,
                    "end_block_index": endBlockIndex,
                    "shielded_TRC20_contract_address": await tronWeb.address.fromHex(shieldedTRC20ContractAddress),
                    "ivk": shieldedInfo.ivk,
                    "ak": shieldedInfo.ak,
                    "nk": shieldedInfo.nk,
                    "visible": true
                }
                let result = await tronWeb.ztron.scanShieldedTRC20NotesByIvk(params, visibleFalseOptions);
                assert.ok(result && result.noteTxs && result.noteTxs.length == 2);
                noteTxs = result.noteTxs;
                console.log("noteTxs: "+util.inspect(noteTxs))

                const position = typeof (noteTxs[0].position) === 'number' ? (noteTxs[0].position) : 0;
                let pathInfo = await methodInstance.getPath(position).call();
                burnShieldedSpends = [{
                    "note": noteTxs[0].note,
                    "alpha": (await tronWeb.ztron.getRcm()).value,
                    "root":  pathInfo[0].replace('0x', ''),
                    "path":  pathInfo[1].map(v => v.replace('0x', '')).join(''),
                    "pos": position
                }];
            })

            describe('#createBurnParamsWithoutAsk', function (){
                it('should get burnParams without ask, ak is an object', async function (){
                    let trc20Contract = await tronWeb.contract().at(trc20ContractAddress);
                    let trc20BalanceBefore = await trc20Contract.balanceOf(ADDRESS_BASE58).call();
                    console.log("trc20BalanceBefore: "+trc20BalanceBefore);

                    // createBurnParamsWithoutAsk
                    let params = {
                        shielded_spends: burnShieldedSpends,
                        shielded_receives: burnShieldedReceives,
                        shielded_TRC20_contract_address: await tronWeb.address.fromHex(shieldedTRC20ContractAddress),
                        ovk: shieldedInfo.ovk,
                        ak: shieldedInfo.ak,
                        nsk: shieldedInfo.nsk,
                        to_amount: toAmount,
                        transparent_to_address: await tronWeb.address.fromHex(transParentToAddress)
                    }
                    let result = await tronWeb.ztron.createBurnParamsWithoutAsk(params,visibleFalseOptions);
                    console.log("result: "+util.inspect(result,true,null,true))
                    assert.ok(result);
                    assert.ok(result.binding_signature);
                    assert.ok(result.message_hash);
                    burnParamsResult = result;

                    // createSpendAuthSig
                    let txHash = burnParamsResult.message_hash;
                    result = await tronWeb.ztron.createSpendAuthSig(shieldedInfo.ask, txHash, burnShieldedSpends[0].alpha);
                    assert.ok(result && result.value);
                    spendAuthoritySignature = result.value;

                    // getTriggerInputForShieldedTRC20Contract
                    const shieldedTRC20Parameters = Object.assign({}, burnParamsResult);
                    shieldedTRC20Parameters.receive_description = [];
                    const spendAuthoritySignatureArray = [{
                        value: spendAuthoritySignature
                    }];
                    let options = {
                        amount: toAmount,
                        transparent_to_address: await tronWeb.address.fromHex(transParentToAddress),
                        visible: false
                    }
                    result = await tronWeb.ztron.getTriggerInputForShieldedTRC20Contract(shieldedTRC20Parameters, spendAuthoritySignatureArray, options);
                    assert.ok(result && result.value)
                    burnTriggerContractInput = result.value;
                    console.log("burnTriggerContractInput: "+util.inspect(burnTriggerContractInput,true,null,true))

                    // makeAndSendTransaction
                    options = {
                        shieldedParameter: burnTriggerContractInput,
                        feeLimit:FEE_LIMIT
                    }
                    const transactionResult = await shieldedUtils.makeAndSendTransaction(tronWeb, await tronWeb.address.fromHex(shieldedTRC20ContractAddress),
                        'burn(bytes32[10],bytes32[2],uint256,bytes32[2],address,bytes32[3],bytes32[9][],bytes32[21][])', options, [], tronWeb.defaultAddress.base58);
                    console.log("transactionResult: "+util.inspect(transactionResult,true,null,true))
                    assert.ok(transactionResult && transactionResult.result);
                    await wait(50);

                    // trc20Balance add 20 after burn
                    trc20Contract = await tronWeb.contract().at(trc20ContractAddress);
                    let trc20BalanceAfter = await trc20Contract.balanceOf(ADDRESS_BASE58).call();
                    console.log("trc20BalanceAfter: "+trc20BalanceAfter);
                    assert.equal(parseInt(trc20BalanceBefore)+parseInt(20),parseInt(trc20BalanceAfter));

                    // isShieldedTRC20ContractNoteSpent
                    await wait(10);
                    params = {
                        note: burnShieldedSpends[0].note,
                        ak: shieldedInfo.ak,
                        nk: shieldedInfo.nk,
                        position: burnShieldedSpends[0].pos,
                        shielded_TRC20_contract_address: await tronWeb.address.fromHex(shieldedTRC20ContractAddress)
                    }
                    result = await tronWeb.ztron.isShieldedTRC20ContractNoteSpent(params,visibleFalseOptions);
                    console.log("isShieldedTRC20ContractNoteSpent: "+util.inspect(result))
                    assert.ok(result);
                    assert.ok(result.is_spent);

                    // scanByOvk length is 1 after burn
                    await wait(10)
                    endBlockInfo = await tronWeb.trx.getCurrentBlock()
                    endBlockIndex = endBlockInfo.block_header.raw_data.number;
                    params = {
                        "start_block_index": startBlockIndex,
                        "end_block_index": endBlockIndex,
                        "shielded_TRC20_contract_address": await tronWeb.address.fromHex(shieldedTRC20ContractAddress),
                        "ovk": shieldedInfo.ovk,
                    }
                    result = await tronWeb.ztron.scanShieldedTRC20NotesByOvk(params, visibleFalseOptions);
                    console.log("scanByOvk-noteTxs-after: "+util.inspect(result))
                    let scanByOvkNote = result.noteTxs;
                    assert.ok(scanByOvkNote.length == 1);
                    assert.ok(scanByOvkNote[0].txid == transactionResult.txid);
                    assert.ok(scanByOvkNote[0].to_amount == 20);
                    assert.equal(await tronWeb.address.fromHex(scanByOvkNote[0].transparent_to_address), transParentToAddress);
                })
            })
        })
    });
});
