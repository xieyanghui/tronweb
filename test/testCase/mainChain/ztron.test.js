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
    const tronWeb = tronWebBuilder.createInstanceSide();
    let scalingFactor = 10;
    let trc20ContractAddress;
    let shieldedTRC20ContractAddress;
    // const {shieldedTRC20ContractAddress, trc20ContractAddress} = zTronConfig;
    const keysInfo = {};
    const narrowValue = 2;
    let realCost;
    let shieldedInfo;
    let shieldedInfo2;
    let newOtherAccountKey;
    let newOtherAccount;
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

    describe('#get function', function() {
        describe('#constructor()', function () {
            it('should have been set a full instance in tronWeb', function () {
                assert.instanceOf(tronWeb.ztron, TronWeb.ZTron);
            });
        });

        describe('#getspendingkey', function (){
            it('should get a value', async function (){
                const spendingKeyInfo = await tronWeb.ztron.getSpendingKey();
                assert.ok(spendingKeyInfo.value);
                assert.strictEqual(spendingKeyInfo.value.length, 64);
                keysInfo.spendingKey = spendingKeyInfo.value
            })
        });

        describe("#getExpandedSpendingKey", function (){
            it('should get spending keys with the spendingKey', async function (){
                const result  = await tronWeb.ztron.getExpandedSpendingKey(keysInfo.spendingKey);
                assert.ok(result.ask);
                assert.ok(result.nsk);
                assert.ok(result.ovk);
                assert.strictEqual(result.ask.length, 64);
                assert.strictEqual(result.nsk.length, 64);
                assert.strictEqual(result.ovk.length, 64);
                keysInfo.ask = result.ask;
                keysInfo.nsk = result.nsk;
                keysInfo.ovk = result.ovk;
            })

            it('should throw if The length of spendingKey is not equal to 64', async function (){
                const invalidSpendingKey = keysInfo.spendingKey.slice(0, 54);
                const result = await tronWeb.ztron.getExpandedSpendingKey(invalidSpendingKey);
                assert.ok(result.Error.indexOf('should be 64') !== -1)
            })

            it('should throw if spendingKey is null.', async function (){
                await assertThrow(
                    tronWeb.ztron.getExpandedSpendingKey(null),
                    'Invalid spendingKey provided'
                )
            })

            it('should throw if spendingKey is undefined.', async function (){
                await assertThrow(
                    tronWeb.ztron.getExpandedSpendingKey(undefined),
                    'Invalid spendingKey provided'
                )
            })

            it('should throw if spendingKey is empty string.', async function (){
                await assertThrow(
                    tronWeb.ztron.getExpandedSpendingKey(''),
                    'Invalid spendingKey provided'
                )
            })

        })

        describe("#getAkFromAsk", function (){

            it('should get ak value with ask', async function (){
                const result = await tronWeb.ztron.getAkFromAsk(keysInfo.ask);
                assert.ok(result.value);
                assert.strictEqual(result.value.length, 64);
                keysInfo.ak = result.value;
            })

            it('should throw if The length of ask is not equal to 64', async function (){
                const invalidAsk = keysInfo.ask.slice(0, 54)
                const result = await tronWeb.ztron.getAkFromAsk(invalidAsk);
                assert.ok(result.Error.indexOf('should be 64') !== -1)
            })

            it('should throw if ask is null.', async function (){
                await assertThrow(
                    tronWeb.ztron.getAkFromAsk(null),
                    'Invalid ask provided'
                )
            })

            it('should throw if ask is undefined.', async function (){
                await assertThrow(
                    tronWeb.ztron.getAkFromAsk(undefined),
                    'Invalid ask provided'
                )
            })

            it('should throw if ask is empty string.', async function (){
                await assertThrow(
                    tronWeb.ztron.getAkFromAsk(''),
                    'Invalid ask provided'
                )
            })
        })

        describe("#getNkFromNsk", function (){

            it('should get nk value with nsk', async function (){
                const result = await tronWeb.ztron.getNkFromNsk(keysInfo.nsk);
                assert.ok(result.value);
                assert.strictEqual(result.value.length, 64);
                keysInfo.nk = result.value;
            })

            it('should throw if The length of nsk is not equal to 64', async function (){
                const invalidNsk = keysInfo.nsk.slice(0, 54);
                const result = await tronWeb.ztron.getNkFromNsk(invalidNsk);
                assert.ok(result.Error.indexOf('should be 64') !== -1)
            })

            it('should throw if nsk is null.', async function (){
                await assertThrow(
                    tronWeb.ztron.getNkFromNsk(null),
                    'Invalid nsk provided'
                )
            })

            it('should throw if nsk is undefined.', async function (){
                await assertThrow(
                    tronWeb.ztron.getNkFromNsk(undefined),
                    'Invalid nsk provided'
                )
            })

            it('should throw if nsk is empty string.', async function (){
                await assertThrow(
                    tronWeb.ztron.getNkFromNsk(''),
                    'Invalid nsk provided'
                )
            })
        })

        describe("#getDiversifier", function (){
            it('should get a value', async function (){
                const result = await tronWeb.ztron.getDiversifier();
                assert.ok(result.d);
                keysInfo.d = result.d
            })
        })

        describe("#getIncomingViewingKey", function (){
            it('should get ivk', async function (){
                const result = await tronWeb.ztron.getIncomingViewingKey(keysInfo.ak, keysInfo.nk);
                assert.ok(result.ivk);
                assert.strictEqual(result.ivk.length, 64);
                keysInfo.ivk = result.ivk;
            })

            it('should throw if ak is empty string', async function (){
                await assertThrow(
                    tronWeb.ztron.getIncomingViewingKey('', keysInfo.nk),
                    'Invalid ak provided'
                )
            })

            it('should throw if ak provides an irregular length', async function (){
                const result = await tronWeb.ztron.getIncomingViewingKey(keysInfo.ak.slice(0, 10), keysInfo.nk);
                assert.ok(result.Error.indexOf('param length must be 32') !== -1)
            })


            it('should throw if nk is empty string', async function (){
                await assertThrow(
                    tronWeb.ztron.getIncomingViewingKey(keysInfo.ak, ''),
                    'Invalid nk provided'
                )
            })

            it('should throw if nk provides an irregular length', async function (){
                const result = await tronWeb.ztron.getIncomingViewingKey(keysInfo.ak, keysInfo.nk.slice(0, 10));
                assert.ok(result.Error.indexOf('param length must be 32') !== -1)
            })
        })

        describe("#getZenPaymentAddress", function (){
            it('should get paymentAddress', async function (){
                const result = await tronWeb.ztron.getZenPaymentAddress(keysInfo.ivk, keysInfo.d);
                assert.ok(result.payment_address && result.pkD);
                keysInfo.pkD = result.pkD;
                keysInfo.payment_address = result.payment_address;
            })

            it('should throw if The length of ivk does not match the rules', async function (){
                const result = await tronWeb.ztron.getZenPaymentAddress(keysInfo.ivk.slice(0, 10), keysInfo.d);
                assert.ok(result.Error.indexOf('param length must be 32') !== -1);
            })

            it('should throw if an invalid d is passed', async function (){
                const result = await tronWeb.ztron.getZenPaymentAddress(keysInfo.ivk, '52a2416b346f416ed75049');
                assert.ok(result.Error.indexOf('d is not valid') !== -1);
            })

            it('should throw if ivk is an empty string', async function (){
                await assertThrow(
                    tronWeb.ztron.getZenPaymentAddress('', keysInfo.d),
                    'Invalid ivk provided'
                )
            })

            it('should throw if d is an empty string', async function (){
                await assertThrow(
                    tronWeb.ztron.getZenPaymentAddress(keysInfo.ivk, ''),
                    'Invalid d provided'
                )
            })
        })

        describe("#getRcm", function (){
            it('should get rcm value', async function (){
                const result = await tronWeb.ztron.getRcm();
                assert.ok(result.value);
                assert.strictEqual(result.value.length, 64);
                keysInfo.rcm = result.value
            })
        })

        describe("#getNewShieldedAddress", function (){
            it('should get shieldedTRC20ContractAddress value', async function () {
                const result = await tronWeb.ztron.getNewShieldedAddress();
                assert.ok(result.sk && result.ask && result.nsk && result.ovk
                    && result.ak && result.nk && result.ivk && result.d && result.pkD && result.payment_address);
                assert.strictEqual(result.sk.length, 64);
                assert.strictEqual(result.ask.length, 64);
                assert.strictEqual(result.nsk.length, 64);
                assert.strictEqual(result.ovk.length, 64);
                assert.strictEqual(result.ak.length, 64);
                assert.strictEqual(result.nk.length, 64);
                assert.strictEqual(result.ivk.length, 64);
                assert.strictEqual(result.d.length, 22);
                assert.strictEqual(result.pkD.length, 64);
                assert.strictEqual(result.payment_address.length, 81);
            })
        })
    });

    describe('#create function', function() {
        describe("#createMintParams", function (){
            it('should get mintParams with ovk is object', async function (){
                const startBlockInfo = await tronWeb.trx.getCurrentBlock()

                // createMintParams
                for(let i = 0; i < 1; i++){
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
                        ovk: shieldedInfo.ovk
                    }

                    const result = await tronWeb.ztron.createMintParams(params);
                    assert.ok(result);
                    console.log("result: "+util.inspect(result))
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
                    console.log("createTxId: "+createTxId)
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
                startBlockIndex = startBlockInfo.block_header.raw_data.number;
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
                const options = {
                    visible: true
                }
                // scanShieldedTRC20NotesByIvk lentgh is 1
                const result = await tronWeb.ztron.scanShieldedTRC20NotesByIvk(params, options);
                assert.ok(result && result.noteTxs && result.noteTxs.length > 0);
                assert.equal(result.noteTxs.length,1);
                noteTxs = result.noteTxs;
                console.log("noteTxs: "+util.inspect(noteTxs));
                assert.equal(shieldedInfo.payment_address, noteTxs[0].note.payment_address);
                assert.equal(narrowValue, noteTxs[0].note.value);
                assert.equal(createTxId, noteTxs[0].txid);
            })

            it('should get mintParams with Expanded parameters', async function(){
                const rcmInfo = await tronWeb.ztron.getRcm();
                const shieldedReceives = {
                    note: {
                        value: narrowValue,
                        payment_address: shieldedInfo.payment_address,
                        rcm: rcmInfo.value
                    }
                }
                const result = await tronWeb.ztron.createMintParams(shieldedInfo.ovk, realCost, shieldedReceives, shieldedTRC20ContractAddress);
                assert.ok(result && result.trigger_contract_input);
            })

            it('should get mintParams with options param', async function (){
                const rcmInfo = await tronWeb.ztron.getRcm();
                const shieldedReceives = {
                    note: {
                        value: narrowValue,
                        payment_address: shieldedInfo.payment_address,
                        rcm: rcmInfo.value
                    }
                }
                const options = {
                    visible: false,
                    from_amount: tronWeb.BigNumber(10).multipliedBy(scalingFactor).toFixed(),
                    shielded_receives: {
                        note: {
                            value: 10,
                            payment_address: shieldedInfo.payment_address,
                            rcm: rcmInfo.value
                        }
                    }
                }
                const result = await tronWeb.ztron.createMintParams(shieldedInfo.ovk, realCost, shieldedReceives, shieldedTRC20ContractAddress, options);
                assert.ok(result && result.trigger_contract_input);
            })

            it('should throw if ovk not a string', async function (){
                const rcmInfo = await tronWeb.ztron.getRcm();
                const invalidOvk = 1111;
                const shieldedReceives = {
                    note: {
                        value: 100,
                        payment_address: shieldedInfo.payment_address,
                        rcm: rcmInfo.value
                    }
                }
                const fromAmount = '1000';
                await assertThrow(
                    tronWeb.ztron.createMintParams(invalidOvk, fromAmount, shieldedReceives, shieldedTRC20ContractAddress),
                    'Invalid ovk provided'
                )
                await assertThrow(
                    tronWeb.ztron.createMintParams({
                        from_amount: fromAmount,
                        shielded_receives: shieldedReceives,
                        shielded_TRC20_contract_address: shieldedTRC20ContractAddress,
                        ovk: invalidOvk
                    }),
                    'Invalid ovk provided'
                )
            })

            it('should throw if fromAmount not a string', async function (){
                const rcmInfo = await tronWeb.ztron.getRcm();
                const ovk = shieldedInfo.ovk;
                const shieldedReceives = {
                    note: {
                        value: 100,
                        payment_address: shieldedInfo.payment_address,
                        rcm: rcmInfo.value
                    }
                }
                const invalidFromAmount = 1000;
                await assertThrow(
                    tronWeb.ztron.createMintParams(ovk, invalidFromAmount, shieldedReceives, shieldedTRC20ContractAddress),
                    'Invalid fromAmount provided'
                )
                await assertThrow(
                    tronWeb.ztron.createMintParams({
                        from_amount: invalidFromAmount,
                        shielded_receives: shieldedReceives,
                        shielded_TRC20_contract_address: shieldedTRC20ContractAddress,
                        ovk: ovk
                    }),
                    'Invalid fromAmount provided'
                )
            })

            it('should throw if shieldedReceives is an empty Object', async function (){
                const ovk = shieldedInfo.ovk;
                const shieldedReceivesEmpty = {};
                const fromAmount = '1000';
                await assertThrow(
                    tronWeb.ztron.createMintParams(ovk, fromAmount, shieldedReceivesEmpty, shieldedTRC20ContractAddress),
                    'Invalid shieldedReceives provided'
                )
                await assertThrow(
                    tronWeb.ztron.createMintParams({
                        from_amount: fromAmount,
                        shielded_receives: null,
                        shielded_TRC20_contract_address: shieldedTRC20ContractAddress,
                        ovk: ovk
                    }),
                    'Invalid shieldedReceives provided'
                )
            })

            it('should throw if shieldedTRC20ContractAddress not an address', async function (){
                const rcmInfo = await tronWeb.ztron.getRcm();
                const ovk = shieldedInfo.ovk;
                const shieldedReceives = {
                    note: {
                        value: 100,
                        payment_address: shieldedInfo.payment_address,
                        rcm: rcmInfo.value
                    }
                }
                const fromAmount = '1000';
                const invalidAddress = shieldedTRC20ContractAddress.slice(0, shieldedTRC20ContractAddress.length - 3);
                await assertThrow(
                    tronWeb.ztron.createMintParams(ovk, fromAmount, shieldedReceives, invalidAddress),
                    'Invalid shieldedTRC20ContractAddress address provided'
                )
                await assertThrow(
                    tronWeb.ztron.createMintParams({
                        from_amount: fromAmount,
                        shielded_receives: shieldedReceives,
                        shielded_TRC20_contract_address: invalidAddress,
                        ovk: ovk
                    }),
                    'Invalid shieldedTRC20ContractAddress address provided'
                )
            })
        })

        describe("#createMintParamsWithoutAsk", function (){

            it('should get mintParams with ovk is object', async function (){
                const startBlockInfo = await tronWeb.trx.getCurrentBlock()

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
                        ovk: shieldedInfo.ovk
                    }

                    const result = await tronWeb.ztron.createMintParamsWithoutAsk(params);
                    assert.ok(result);
                    console.log("result: "+util.inspect(result))
                    assert.ok(result.trigger_contract_input);

                    const address = tronWeb.defaultAddress.base58;
                    //approve
                    await shieldedUtils.makeAndSendTransaction(tronWeb, trc20ContractAddress, 'approve(address,uint256)', {},
                        [{type: 'address', value: shieldedTRC20ContractAddress},{type: 'uint256', value: narrowValue * scalingFactor}], address)

                    let block = await tronWeb.trx.getCurrentBlock();
                    console.log("block: "+util.inspect(block,true,null,true));
                    const options = {
                        shieldedParameter: result.trigger_contract_input
                    }
                    const createTx = await shieldedUtils.makeAndSendTransaction(tronWeb, shieldedTRC20ContractAddress, 'mint(uint256,bytes32[9],bytes32[2],bytes32[21])', options, [], address);
                    createTxId = createTx.transaction.txID;
                    console.log("createTxId: "+createTxId)
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
                // const endBlockInfo = await tronWeb.trx.getCurrentBlock();
                startBlockIndex = startBlockInfo.block_header.raw_data.number;
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
                const options = {
                    visible: true
                }
                const result = await tronWeb.ztron.scanShieldedTRC20NotesByIvk(params, options);
                assert.ok(result && result.noteTxs && result.noteTxs.length > 0);
                assert.equal(result.noteTxs.length,2);
                noteTxs = result.noteTxs;
                console.log("noteTxs: "+util.inspect(noteTxs));
                assert.equal(shieldedInfo.payment_address, noteTxs[1].note.payment_address);
                assert.equal(narrowValue, noteTxs[1].note.value);
                assert.equal(createTxId, noteTxs[1].txid);
                // noteTxs = result.noteTxs.filter(item => !item.is_spent)
            })

            it('should get mintParams with Expanded parameters', async function(){
                const rcmInfo = await tronWeb.ztron.getRcm();
                const shieldedReceives = {
                    note: {
                        value: 100,
                        payment_address: shieldedInfo.payment_address,
                        rcm: rcmInfo.value
                    }
                }
                const result = await tronWeb.ztron.createMintParamsWithoutAsk(shieldedInfo.ovk, '1000', shieldedReceives, shieldedTRC20ContractAddress);
                assert.ok(result && result.trigger_contract_input);
            })

            it('should get mintParams with options param', async function (){
                const rcmInfo = await tronWeb.ztron.getRcm();
                const shieldedReceives = {
                    note: {
                        value: 100,
                        payment_address: shieldedInfo.payment_address,
                        rcm: rcmInfo.value
                    }
                }
                const options = {
                    visible: false,
                    from_amount: '10000',
                    shielded_receives: {
                        note: {
                            value: 1000,
                            payment_address: shieldedInfo.payment_address,
                            rcm: rcmInfo.value
                        }
                    }
                }
                const result = await tronWeb.ztron.createMintParamsWithoutAsk(shieldedInfo.ovk, '1000', shieldedReceives, shieldedTRC20ContractAddress, options);
                assert.ok(result && result.trigger_contract_input);
            })

            it('should throw if ovk not a string', async function (){
                const rcmInfo = await tronWeb.ztron.getRcm();
                const invalidOvk = 1111;
                const shieldedReceives = {
                    note: {
                        value: 100,
                        payment_address: shieldedInfo.payment_address,
                        rcm: rcmInfo.value
                    }
                }
                const fromAmount = '1000';
                await assertThrow(
                    tronWeb.ztron.createMintParamsWithoutAsk(invalidOvk, fromAmount, shieldedReceives, shieldedTRC20ContractAddress),
                    'Invalid ovk provided'
                )
                await assertThrow(
                    tronWeb.ztron.createMintParamsWithoutAsk({
                        from_amount: fromAmount,
                        shielded_receives: shieldedReceives,
                        shielded_TRC20_contract_address: shieldedTRC20ContractAddress,
                        ovk: invalidOvk
                    }),
                    'Invalid ovk provided'
                )
            })

            it('should throw if fromAmount not a string', async function (){
                const rcmInfo = await tronWeb.ztron.getRcm();
                const ovk = shieldedInfo.ovk;
                const shieldedReceives = {
                    note: {
                        value: 100,
                        payment_address: shieldedInfo.payment_address,
                        rcm: rcmInfo.value
                    }
                }
                const invalidFromAmount = 1000;
                await assertThrow(
                    tronWeb.ztron.createMintParamsWithoutAsk(ovk, invalidFromAmount, shieldedReceives, shieldedTRC20ContractAddress),
                    'Invalid fromAmount provided'
                )
                await assertThrow(
                    tronWeb.ztron.createMintParamsWithoutAsk({
                        from_amount: invalidFromAmount,
                        shielded_receives: shieldedReceives,
                        shielded_TRC20_contract_address: shieldedTRC20ContractAddress,
                        ovk: ovk
                    }),
                    'Invalid fromAmount provided'
                )
            })

            it('should throw if shieldedReceives is an empty Object', async function (){
                const ovk = shieldedInfo.ovk;
                const shieldedReceivesEmpty = {};
                const fromAmount = '1000';
                await assertThrow(
                    tronWeb.ztron.createMintParamsWithoutAsk(ovk, fromAmount, shieldedReceivesEmpty, shieldedTRC20ContractAddress),
                    'Invalid shieldedReceives provided'
                )
                await assertThrow(
                    tronWeb.ztron.createMintParamsWithoutAsk({
                        from_amount: fromAmount,
                        shielded_receives: null,
                        shielded_TRC20_contract_address: shieldedTRC20ContractAddress,
                        ovk: ovk
                    }),
                    'Invalid shieldedReceives provided'
                )
            })

            it('should throw if shieldedTRC20ContractAddress not an address', async function (){
                const rcmInfo = await tronWeb.ztron.getRcm();
                const ovk = shieldedInfo.ovk;
                const shieldedReceives = {
                    note: {
                        value: 100,
                        payment_address: shieldedInfo.payment_address,
                        rcm: rcmInfo.value
                    }
                }
                const fromAmount = '1000';
                const invalidAddress = shieldedTRC20ContractAddress.slice(0, shieldedTRC20ContractAddress.length - 3);
                await assertThrow(
                    tronWeb.ztron.createMintParamsWithoutAsk(ovk, fromAmount, shieldedReceives, invalidAddress),
                    'Invalid shieldedTRC20ContractAddress address provided'
                )
                await assertThrow(
                    tronWeb.ztron.createMintParamsWithoutAsk({
                        from_amount: fromAmount,
                        shielded_receives: shieldedReceives,
                        shielded_TRC20_contract_address: invalidAddress,
                        ovk: ovk
                    }),
                    'Invalid shieldedTRC20ContractAddress address provided'
                )
            })

        })
        
        describe("#scanShieldedTRC20NotesByIvk", function (){
            const options = {
                visible: true
            }
            it('should get noteTxs with startBlockIndex is object', async function (){
                await wait(10)
                const params = {
                    "start_block_index": startBlockIndex,
                    "end_block_index": endBlockIndex,
                    "shielded_TRC20_contract_address": shieldedTRC20ContractAddress,
                    "ivk": shieldedInfo.ivk,
                    "ak": shieldedInfo.ak,
                    "nk": shieldedInfo.nk,
                }
                const result = await tronWeb.ztron.scanShieldedTRC20NotesByIvk(params, options);
                assert.ok(result && result.noteTxs && result.noteTxs.length > 0);
                noteTxs = result.noteTxs
            })

            it('should get noteTxs with The parameters are expanded', async function (){
                const result = await tronWeb.ztron.scanShieldedTRC20NotesByIvk(startBlockIndex, endBlockIndex, shieldedInfo.ivk,
                    shieldedInfo.ak, shieldedInfo.nk, shieldedTRC20ContractAddress, options);
                assert.ok(result && result.noteTxs && result.noteTxs.length > 0);
            })

            it('should throw if startBlockIndex not a positive-integer', async function (){
                const invalidStartBlockIndex = -10;
                await assertThrow(
                    tronWeb.ztron.scanShieldedTRC20NotesByIvk(invalidStartBlockIndex, endBlockIndex, shieldedInfo.ivk,
                        shieldedInfo.ak, shieldedInfo.nk, shieldedTRC20ContractAddress, options),
                    'startBlockIndex must be a positive integer'
                )
                const stringStartBlockIndex = '1001';
                await assertThrow(
                    tronWeb.ztron.scanShieldedTRC20NotesByIvk(stringStartBlockIndex, endBlockIndex, shieldedInfo.ivk,
                        shieldedInfo.ak, shieldedInfo.nk, shieldedTRC20ContractAddress, options),
                    'startBlockIndex must be a positive integer'
                )
            })

            it('should throw if endBlockIndex not a positive-integer', async function (){
                const invalidEndBlockIndex = -10;
                await assertThrow(
                    tronWeb.ztron.scanShieldedTRC20NotesByIvk(startBlockIndex, invalidEndBlockIndex, shieldedInfo.ivk,
                        shieldedInfo.ak, shieldedInfo.nk, shieldedTRC20ContractAddress, options),
                    'endBlockIndex must be a positive integer'
                )
                const stringEndBlockIndex = '1001';
                await assertThrow(
                    tronWeb.ztron.scanShieldedTRC20NotesByIvk(startBlockIndex, stringEndBlockIndex, shieldedInfo.ivk,
                        shieldedInfo.ak, shieldedInfo.nk, shieldedTRC20ContractAddress, options),
                    'endBlockIndex must be a positive integer'
                )
            })

            it('should throw if ivk|ak|nk is not a string', async function (){
                const invalidIvk = 1111;
                const invalidAk = 1111;
                const invalidNk = 1111;
                await assertThrow(
                    tronWeb.ztron.scanShieldedTRC20NotesByIvk(startBlockIndex, endBlockIndex, invalidIvk,
                        shieldedInfo.ak, shieldedInfo.nk, shieldedTRC20ContractAddress, options),
                    'Invalid ivk provided'
                )

                await assertThrow(
                    tronWeb.ztron.scanShieldedTRC20NotesByIvk(startBlockIndex, endBlockIndex, shieldedInfo.ivk,
                        invalidAk, shieldedInfo.nk, shieldedTRC20ContractAddress, options),
                    'Invalid ak provided'
                )

                await assertThrow(
                    tronWeb.ztron.scanShieldedTRC20NotesByIvk(startBlockIndex, endBlockIndex, shieldedInfo.ivk,
                        shieldedInfo.ak, invalidNk, shieldedTRC20ContractAddress, options),
                    'Invalid nk provided'
                )
            })

            it('should throw if shieldedTRC20ContractAddress is not an address', async  function (){
                const invalidShieldedTRC20ContractAddress = shieldedTRC20ContractAddress.slice(0, 10);
                await assertThrow(
                    tronWeb.ztron.scanShieldedTRC20NotesByIvk(startBlockIndex, endBlockIndex, shieldedInfo.ivk,
                        shieldedInfo.ak, shieldedInfo.nk, invalidShieldedTRC20ContractAddress, options),
                    'Invalid shieldedTRC20ContractAddress address provided'
                )
            })

            after(async () => {
            })
        })

        describe("#createTransferParams", function (){
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

                // generate new shieldedTRC20ContractAddress
                shieldedInfo2 = await tronWeb.ztron.getNewShieldedAddress();
            })
            it('should get transferParams with ask is object', async function (){
                // build params
                await wait(10)
                let pathInfo = await methodInstance.getPath(noteTxs[0].position).call();
                console.log("pathInfo:"+util.inspect(pathInfo,true,null,true))
                shieldedSpends = [{
                    "note": noteTxs[0].note,
                    "alpha": (await tronWeb.ztron.getRcm()).value,
                    "root":  pathInfo[0].replace('0x', ''),
                    "path":  pathInfo[1].map(v => v.replace('0x', '')).join(''),
                    "pos": noteTxs[0].position
                }];
                shieldedReceives = [{
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
                    shieldedParameter: result.trigger_contract_input
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
                    "ivk": shieldedInfo2.ivk,
                    "ak": shieldedInfo2.ak,
                    "nk": shieldedInfo2.nk,
                }
                result = await tronWeb.ztron.scanShieldedTRC20NotesByIvk(params, options);
                console.log("scanByIvk-noteTxs-after: "+util.inspect(result))
                assert.ok(result);
                assert.ok(result.noteTxs);
                assert.ok(result.noteTxs.length == 1);
            })

            it('should get transferParams with Expanded parameters', async function(){
                const result = await tronWeb.ztron.createTransferParams(shieldedInfo.ask, shieldedInfo.nsk, shieldedInfo.ovk,
                    shieldedSpends, shieldedReceives, shieldedTRC20ContractAddress, {});
                assert.ok(result && result.trigger_contract_input);
            })

            it('should throw if ask|nsk|ovk not a string', async function (){
                const invalidAsk = 1111;
                const invalidNsk = 1111;
                const invalidOvk = 1111;

                await assertThrow(
                    tronWeb.ztron.createTransferParams(invalidAsk, shieldedInfo.nsk, shieldedInfo.ovk,
                        shieldedSpends, shieldedReceives, shieldedTRC20ContractAddress, {}),
                    'Invalid ask provided'
                )
                await assertThrow(
                    tronWeb.ztron.createTransferParams({
                        shielded_spends: shieldedSpends,
                        shielded_receives: shieldedReceives,
                        shielded_TRC20_contract_address: shieldedTRC20ContractAddress,
                        ovk: shieldedInfo.ovk,
                        ask: invalidAsk,
                        nsk: shieldedInfo.nsk
                    }),
                    'Invalid ask provided'
                )

                await assertThrow(
                    tronWeb.ztron.createTransferParams(shieldedInfo.ask, invalidNsk, shieldedInfo.ovk,
                        shieldedSpends, shieldedReceives, shieldedTRC20ContractAddress, {}),
                    'Invalid nsk provided'
                )

                await assertThrow(
                    tronWeb.ztron.createTransferParams(shieldedInfo.ask, shieldedInfo.nsk, invalidOvk,
                        shieldedSpends, shieldedReceives, shieldedTRC20ContractAddress, {}),
                    'Invalid ovk provided'
                )
            })

            it('should throw if shieldedSpends|shieldedReceives not an array', async function (){
                const invalidShieldedSpends = {};
                const invalidShieldedReceives = {};
                await assertThrow(
                    tronWeb.ztron.createTransferParams(shieldedInfo.ask, shieldedInfo.nsk, shieldedInfo.ovk,
                        invalidShieldedSpends, shieldedReceives, shieldedTRC20ContractAddress, {}),
                    'Invalid shieldedSpends provided'
                )

                await assertThrow(
                    tronWeb.ztron.createTransferParams(shieldedInfo.ask, shieldedInfo.nsk, shieldedInfo.ovk,
                        shieldedSpends, invalidShieldedReceives, shieldedTRC20ContractAddress, {}),
                    'Invalid shieldedReceives provided'
                )
            })

            it('should throw if shieldedTRC20ContractAddress is not an address', async function (){
                const invalidShieldedTRC20ContractAddress = shieldedTRC20ContractAddress.slice(0, 10);
                await assertThrow(
                    tronWeb.ztron.createTransferParams(shieldedInfo.ask, shieldedInfo.nsk, shieldedInfo.ovk,
                        shieldedSpends, shieldedReceives, invalidShieldedTRC20ContractAddress, {}),
                    'Invalid shieldedTRC20ContractAddress address provided'
                )
            })
        })

        describe("#scanShieldedTRC20NotesByOvk", function (){
            const options = {
                visible: true
            }
            it('should get noteTxs with startBlockIndex is object', async function (){
                await wait(10)
                const params = {
                    "start_block_index": startBlockIndex,
                    "end_block_index": endBlockIndex,
                    "shielded_TRC20_contract_address": shieldedTRC20ContractAddress,
                    "ovk": shieldedInfo.ovk,
                }
                const result = await tronWeb.ztron.scanShieldedTRC20NotesByOvk(params, options);
                assert.ok(result && result.noteTxs && result.noteTxs.length > 0);
            })

            it('should get noteTxs with The parameters are expanded', async function (){
                const result = await tronWeb.ztron.scanShieldedTRC20NotesByOvk(startBlockIndex, endBlockIndex, shieldedInfo.ovk, shieldedTRC20ContractAddress, options);
                assert.ok(result && result.noteTxs && result.noteTxs.length > 0);
            })

            it('should throw if startBlockIndex not a positive-integer', async function (){
                const invalidStartBlockIndex = -10;
                await assertThrow(
                    tronWeb.ztron.scanShieldedTRC20NotesByOvk(invalidStartBlockIndex, endBlockIndex, shieldedInfo.ovk, shieldedTRC20ContractAddress, options),
                    'startBlockIndex must be a positive integer'
                )
                const stringStartBlockIndex = '1001';
                await assertThrow(
                    tronWeb.ztron.scanShieldedTRC20NotesByOvk(stringStartBlockIndex, endBlockIndex, shieldedInfo.ovk, shieldedTRC20ContractAddress, options),
                    'startBlockIndex must be a positive integer'
                )
            })

            it('should throw if endBlockIndex not a positive-integer', async function (){
                const invalidEndBlockIndex = -10;
                await assertThrow(
                    tronWeb.ztron.scanShieldedTRC20NotesByOvk(startBlockIndex, invalidEndBlockIndex, shieldedInfo.ovk, shieldedTRC20ContractAddress, options),
                    'endBlockIndex must be a positive integer'
                )
                const stringEndBlockIndex = '1001';
                await assertThrow(
                    tronWeb.ztron.scanShieldedTRC20NotesByOvk(startBlockIndex, stringEndBlockIndex, shieldedInfo.ovk, shieldedTRC20ContractAddress, options),
                    'endBlockIndex must be a positive integer'
                )
            })

            it('should throw if ovk is not a string', async function (){
                const invalidOvk = 1111;
                await assertThrow(
                    tronWeb.ztron.scanShieldedTRC20NotesByOvk(startBlockIndex, endBlockIndex, invalidOvk, shieldedTRC20ContractAddress, options),
                    'Invalid ovk provided'
                )
            })

            it('should throw if shieldedTRC20ContractAddress is not an address', async  function (){
                const invalidShieldedTRC20ContractAddress = shieldedTRC20ContractAddress.slice(0, 10);
                await assertThrow(
                    tronWeb.ztron.scanShieldedTRC20NotesByOvk(startBlockIndex, endBlockIndex, shieldedInfo.ovk, invalidShieldedTRC20ContractAddress, options),
                    'Invalid shieldedTRC20ContractAddress address provided'
                )
            })
        })

        describe("#isShieldedTRC20ContractNoteSpent", function (){
            let spendNote, pendingNote;

            before(async () => {
                spendNote = shieldedSpends[0].note;
                pendingNote = noteTxs[noteTxs.length - 1]
            })

            it('should return is_spent is true, The ak is an object', async function (){
                const params = {
                    note: spendNote,
                    ak: shieldedInfo.ak,
                    nk: shieldedInfo.nk,
                    position: shieldedSpends[0].pos,
                    shielded_TRC20_contract_address: shieldedTRC20ContractAddress
                }
                const result = await tronWeb.ztron.isShieldedTRC20ContractNoteSpent(params);
                assert.ok(result && result.is_spent);
            });

            it('should return is_spent is true, The parameters are expanded', async function (){
                const result = await tronWeb.ztron.isShieldedTRC20ContractNoteSpent(shieldedInfo.ak, shieldedInfo.nk, spendNote, shieldedSpends[0].pos, shieldedTRC20ContractAddress);
                assert.ok(result && result.is_spent);
            });

            it('should return is_spent is false', async function (){
                const params = {
                    note: pendingNote.note,
                    ak: shieldedInfo.ak,
                    nk: shieldedInfo.nk,
                    position: pendingNote.position,
                    shielded_TRC20_contract_address: shieldedTRC20ContractAddress
                }
                const result = await tronWeb.ztron.isShieldedTRC20ContractNoteSpent(params);
                assert.ok(result && !result.is_spent);
            })

            it('should throw if ak|nk is not a string', async function (){
                const invalidAk = 1111;
                const invalidNk = 1111;
                await assertThrow(
                    tronWeb.ztron.isShieldedTRC20ContractNoteSpent(invalidAk, shieldedInfo.nk, spendNote, shieldedSpends[0].pos, shieldedTRC20ContractAddress),
                    'Invalid ak provided'
                )

                await assertThrow(
                    tronWeb.ztron.isShieldedTRC20ContractNoteSpent(shieldedInfo.ak, invalidNk, spendNote, shieldedSpends[0].pos, shieldedTRC20ContractAddress),
                    'Invalid nk provided'
                )
            })

            it('should throw if note is not an object', async function (){
                const invalidNote = []
                await assertThrow(
                    tronWeb.ztron.isShieldedTRC20ContractNoteSpent(shieldedInfo.ak, shieldedInfo.nk, invalidNote, shieldedSpends[0].pos, shieldedTRC20ContractAddress),
                    'Invalid note provided'
                )
            })

            it('should throw if position is not an integer', async function (){
                const invalidPosition = "1"
                await assertThrow(
                    tronWeb.ztron.isShieldedTRC20ContractNoteSpent(shieldedInfo.ak, shieldedInfo.nk, spendNote, invalidPosition, shieldedTRC20ContractAddress),
                    'Invalid position provided'
                )
            })

            it('should throw if shieldedTRC20ContractAddress is not an address', async  function (){
                const invalidShieldedTRC20ContractAddress = shieldedTRC20ContractAddress.slice(0, 10);
                await assertThrow(
                    tronWeb.ztron.isShieldedTRC20ContractNoteSpent(shieldedInfo.ak, shieldedInfo.nk, spendNote, shieldedSpends[0].pos, invalidShieldedTRC20ContractAddress),
                    'Invalid shieldedTRC20ContractAddress address provided'
                )
            })
        })

        describe("#createTransferParamsWithoutAsk", function (){
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

                // generate new shieldedTRC20ContractAddress
                shieldedInfo2 = await tronWeb.ztron.getNewShieldedAddress();
            })

            it('should get transferParams without ask, ak is an object', async function (){
                // build params
                await wait(10)
                let pathInfo = await methodInstance.getPath(noteTxs[0].position).call();
                console.log("noteTxs[0]: "+util.inspect(noteTxs[0],true,null,true));
                console.log("rcm: "+util.inspect(noteTxs[0].note.rcm,true,null,true));
                shieldedSpends = [{
                    "note": noteTxs[0].note,
                    "alpha": (await tronWeb.ztron.getRcm()).value,
                    "root":  pathInfo[0].replace('0x', ''),
                    "path":  pathInfo[1].map(v => v.replace('0x', '')).join(''),
                    "pos": noteTxs[0].position
                }];
                console.log("shieldedSpends: "+util.inspect(shieldedSpends,true,null,true));
                shieldedReceives = [{
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
                spendAuthoritySignature = await tronWeb.ztron.createSpendAuthSig(shieldedInfo.ask, txHash, shieldedSpends[0].alpha);
                assert.ok(spendAuthoritySignature && spendAuthoritySignature.value);
                console.log("spendAuthoritySignature-alpha: "+util.inspect(spendAuthoritySignature));
                // getTriggerInputForShieldedTRC20Contract
                const shieldedTRC20Parameters = Object.assign({}, transferParamsResult);
                spendAuthoritySignatureArray = [{
                    value: spendAuthoritySignature.value
                }];
                transferTriggerContractInput = await tronWeb.ztron.getTriggerInputForShieldedTRC20Contract(shieldedTRC20Parameters, spendAuthoritySignatureArray);
                assert.ok(transferTriggerContractInput && transferTriggerContractInput.value)
                console.log("transferTriggerContractInput: "+util.inspect(transferTriggerContractInput));

                const options = {
                    shieldedParameter: transferTriggerContractInput.value
                };
                const transactionResult = await shieldedUtils.makeAndSendTransaction(tronWeb, shieldedTRC20ContractAddress,
                    'transfer(bytes32[10][],bytes32[2][],bytes32[9][],bytes32[2],bytes32[21][])', options, [], tronWeb.defaultAddress.base58);
                console.log("transactionResult: "+util.inspect(transactionResult));
                // assert.ok(transactionResult);
                // assert.ok(transactionResult.result);

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
                    "ivk": shieldedInfo2.ivk,
                    "ak": shieldedInfo2.ak,
                    "nk": shieldedInfo2.nk,
                }
                result = await tronWeb.ztron.scanShieldedTRC20NotesByIvk(params, options);
                console.log("scanByIvk-noteTxs-after: "+util.inspect(result))
                assert.ok(result);
                assert.ok(result.noteTxs);
                assert.ok(result.noteTxs.length == 1);
            })

            /*it('should get transferParams without ask, The parameters are expanded', async function (){
                const result = await tronWeb.ztron.createTransferParamsWithoutAsk(shieldedInfo.ak, shieldedInfo.nsk, shieldedInfo.ovk,
                    shieldedSpends, shieldedReceives, shieldedTRC20ContractAddress, {});
                assert.ok(result && result.binding_signature && result.message_hash);
            })

            it('should trow if ak|nsk|ovk is not a string', async function (){
                const invalidAk = 1111;
                const invalidNsk = 1111;
                const invalidOvk = 1111;

                await assertThrow(
                    tronWeb.ztron.createTransferParamsWithoutAsk(invalidAk, shieldedInfo.nsk, shieldedInfo.ovk,
                        shieldedSpends, shieldedReceives, shieldedTRC20ContractAddress, {}),
                    'Invalid ak provided'
                )

                await assertThrow(
                    tronWeb.ztron.createTransferParamsWithoutAsk(shieldedInfo.ak, invalidNsk, shieldedInfo.ovk,
                        shieldedSpends, shieldedReceives, shieldedTRC20ContractAddress, {}),
                    'Invalid nsk provided'
                )

                await assertThrow(
                    tronWeb.ztron.createTransferParamsWithoutAsk(shieldedInfo.ak, shieldedInfo.nsk, invalidOvk,
                        shieldedSpends, shieldedReceives, shieldedTRC20ContractAddress, {}),
                    'Invalid ovk provided'
                )
            })

            it('should throw if shieldedSpends|shieldedReceives not an array', async function (){
                const invalidShieldedSpends = {};
                const invalidShieldedReceives = {};
                await assertThrow(
                    tronWeb.ztron.createTransferParamsWithoutAsk(shieldedInfo.ak, shieldedInfo.nsk, shieldedInfo.ovk,
                        invalidShieldedSpends, shieldedReceives, shieldedTRC20ContractAddress, {}),
                    'Invalid shieldedSpends provided'
                )

                await assertThrow(
                    tronWeb.ztron.createTransferParamsWithoutAsk(shieldedInfo.ak, shieldedInfo.nsk, shieldedInfo.ovk,
                        shieldedSpends, invalidShieldedReceives, shieldedTRC20ContractAddress, {}),
                    'Invalid shieldedReceives provided'
                )
            })

            it('should throw if shieldedTRC20ContractAddress is not an address', async function (){
                const invalidShieldedTRC20ContractAddress = shieldedTRC20ContractAddress.slice(0, 10);
                await assertThrow(
                    tronWeb.ztron.createTransferParamsWithoutAsk(shieldedInfo.ak, shieldedInfo.nsk, shieldedInfo.ovk,
                        shieldedSpends, shieldedReceives, invalidShieldedTRC20ContractAddress, {}),
                    'Invalid shieldedTRC20ContractAddress address provided'
                )
            })

            describe("#createSpendAuthSig", async function (){
                let txHash;
                let alpha;
                before(async () => {
                    txHash = transferParamsResult.message_hash;
                    alpha = (await tronWeb.ztron.getRcm()).value;
                })
                it('should get a value with txHash', async function (){
                    const rcmInfo = await tronWeb.ztron.getRcm();
                    const result = await tronWeb.ztron.createSpendAuthSig(shieldedInfo.ask, txHash, rcmInfo.value);
                    assert.ok(result && result.value);
                    spendAuthoritySignature = result.value;
                })

                it('should throw if ask is an empty string or not a string', async function (){
                    const askNotString = 1111;
                    const askEmptyString = '';
                    await assertThrow(
                        tronWeb.ztron.createSpendAuthSig(askNotString, txHash, alpha),
                        'Invalid ask provided'
                    )

                    await assertThrow(
                        tronWeb.ztron.createSpendAuthSig(askEmptyString, txHash, alpha),
                        'Invalid ask provided'
                    )
                })

                it('should throw if txHash is an empty string or not a string', async function (){
                    const txHashNotString = 1111;
                    const txHashEmptyString = '';
                    await assertThrow(
                        tronWeb.ztron.createSpendAuthSig(shieldedInfo.ask, txHashNotString, alpha),
                        'Invalid txHash provided'
                    )

                    await assertThrow(
                        tronWeb.ztron.createSpendAuthSig(shieldedInfo.ask, txHashEmptyString, alpha),
                        'Invalid txHash provided'
                    )
                })

                it('should throw if alpha is not a string', async function (){
                    const alphaNotString = 1111;
                    await assertThrow(
                        tronWeb.ztron.createSpendAuthSig(shieldedInfo.ask, txHash, alphaNotString),
                        'Invalid alpha provided'
                    )
                })
            })

            describe("#getTriggerInputForShieldedTRC20Contract", function (){
                const shieldedTRC20Parameters = {};
                let spendAuthoritySignatureArray;

                before(async ()=> {
                    Object.assign(shieldedTRC20Parameters, transferParamsResult);
                    spendAuthoritySignatureArray = [{
                        value: spendAuthoritySignature
                    }];
                })

                it('it should return transfer trigger_contract_input value', async function (){
                    const result = await tronWeb.ztron.getTriggerInputForShieldedTRC20Contract(shieldedTRC20Parameters, spendAuthoritySignatureArray);
                    assert.ok(result && result.value)
                    transferTriggerContractInput = result.value;
                })

                it('should throw if shieldedTRC20Parameters is not an object', async function (){
                    const invalidShieldedTRC20Parameters = [];
                    await assertThrow(
                        tronWeb.ztron.getTriggerInputForShieldedTRC20Contract(invalidShieldedTRC20Parameters, spendAuthoritySignatureArray),
                        'Invalid shieldedTRC20Parameters provided'
                    )
                })

                it('should throw if spendAuthoritySignature is not an array', async function (){
                    const invalidSpendAuthoritySignature = {};
                    await assertThrow(
                        tronWeb.ztron.getTriggerInputForShieldedTRC20Contract(shieldedTRC20Parameters, invalidSpendAuthoritySignature),
                        'Invalid spendAuthoritySignature provided'
                    )
                })

                it('should throw if shieldedTRC20Parameters.spend_description is not an array', async function (){
                    const invalidShieldedTRC20Parameters = {
                        spend_description: {}
                    };
                    await assertThrow(
                        tronWeb.ztron.getTriggerInputForShieldedTRC20Contract(Object.assign({}, shieldedTRC20Parameters, invalidShieldedTRC20Parameters), spendAuthoritySignatureArray),
                        'Invalid shieldedTRC20Parameters.spend_description provided'
                    )
                })

                it('should throw if shieldedTRC20Parameters.receive_description is not an array', async function (){
                    const invalidShieldedTRC20Parameters = {
                        receive_description: {}
                    };
                    await assertThrow(
                        tronWeb.ztron.getTriggerInputForShieldedTRC20Contract(Object.assign({}, shieldedTRC20Parameters, invalidShieldedTRC20Parameters), spendAuthoritySignatureArray),
                        'Invalid shieldedTRC20Parameters.receive_description provided'
                    )
                })

                it('should throw if shieldedTRC20Parameters.binding_signature is not a string', async function (){
                    const invalidShieldedTRC20Parameters = {
                        binding_signature: 1111,
                    };
                    await assertThrow(
                        tronWeb.ztron.getTriggerInputForShieldedTRC20Contract(Object.assign({}, shieldedTRC20Parameters, invalidShieldedTRC20Parameters), spendAuthoritySignatureArray),
                        'Invalid shieldedTRC20Parameters.binding_signature provided'
                    )
                })

                it('should throw if shieldedTRC20Parameters.message_hash is not a string', async function (){
                    const invalidShieldedTRC20Parameters = {
                        message_hash: 1111,
                    };
                    await assertThrow(
                        tronWeb.ztron.getTriggerInputForShieldedTRC20Contract(Object.assign({}, shieldedTRC20Parameters, invalidShieldedTRC20Parameters), spendAuthoritySignatureArray),
                        'Invalid shieldedTRC20Parameters.message_hash provided'
                    )
                })

                it('should throw if shieldedTRC20Parameters.parameter_type is not a string', async function (){
                    const invalidShieldedTRC20Parameters = {
                        parameter_type: 1111,
                    };
                    await assertThrow(
                        tronWeb.ztron.getTriggerInputForShieldedTRC20Contract(Object.assign({}, shieldedTRC20Parameters, invalidShieldedTRC20Parameters), spendAuthoritySignatureArray),
                        'Invalid shieldedTRC20Parameters.parameter_type provided'
                    )
                })
            })*/
        })

        describe.only("#createBurnParams", function (){
            const visibleOptions = {
                visible: true
            }
            let burnShieldedReceives = [];
            let toAmount = "10";
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

                const pathInfo = await methodInstance.getPath(noteTxs[0].position).call();
                burnShieldedSpends = [{
                    "note": noteTxs[0].note,
                    "alpha": (await tronWeb.ztron.getRcm()).value,
                    "root":  pathInfo[0].replace('0x', ''),
                    "path":  pathInfo[1].map(v => v.replace('0x', '')).join(''),
                    "pos": noteTxs[0].position
                }];

                // generate new shieldedTRC20ContractAddress
                shieldedInfo2 = await tronWeb.ztron.getNewShieldedAddress();
                burnShieldedReceives = [{
                    note: {
                        value: 1,
                        payment_address: shieldedInfo2.payment_address,
                        rcm: ( await tronWeb.ztron.getRcm()).value
                    }
                }];
            })

            it('should get burnParams with ask is object', async function (){
                let trc20Contract = await tronWeb.contract().at(trc20ContractAddress);
                let trc20BalanceBefore = await trc20Contract.balanceOf(ADDRESS_BASE58).call();
                console.log("trc20BalanceBefore: "+trc20BalanceBefore);

                let params = {
                    shielded_spends: burnShieldedSpends,
                    shielded_receives: burnShieldedReceives,
                    shielded_TRC20_contract_address: shieldedTRC20ContractAddress,
                    ovk: shieldedInfo.ovk,
                    ask: shieldedInfo.ask,
                    nsk: shieldedInfo.nsk,
                    to_amount: toAmount,
                    transparent_to_address: transParentToAddress
                }

                let result = await tronWeb.ztron.createBurnParams(params);
                assert.ok(result && result.trigger_contract_input);

                const options = {
                    shieldedParameter: result.trigger_contract_input
                }
                const transactionResult = await shieldedUtils.makeAndSendTransaction(tronWeb, shieldedTRC20ContractAddress,
                    'burn(bytes32[10],bytes32[2],uint256,bytes32[2],address,bytes32[3],bytes32[9][],bytes32[21][])', options, [], tronWeb.defaultAddress.base58);
                console.log("transactionResult: "+util.inspect(transactionResult,true,null,true))
                assert.ok(transactionResult && transactionResult.result);
                await wait(50);

                trc20Contract = await tronWeb.contract().at(trc20ContractAddress);
                let trc20BalanceAfter = await trc20Contract.balanceOf(ADDRESS_BASE58).call();
                console.log("trc20BalanceAfter: "+trc20BalanceAfter);
                assert.equal(parseInt(parseInt(trc20BalanceBefore)+10),parseInt(trc20BalanceAfter));

                // isShieldedTRC20ContractNoteSpent
                await wait(10);
                params = {
                    note: burnShieldedSpends[0].note,
                    ak: shieldedInfo.ak,
                    nk: shieldedInfo.nk,
                    position: burnShieldedSpends[0].pos,
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
                let scanByOvkNote = result.noteTxs;
                assert.ok(scanByOvkNote.length == 2);
                assert.ok(scanByOvkNote[0].note.value == 1);
                assert.ok(scanByOvkNote[0].txid == scanByOvkNote[1].txid);
                assert.ok(scanByOvkNote[1].to_amount == 10);
                assert.equal(scanByOvkNote[1].transparent_to_address, transParentToAddress);


                // scanByIvk length is 1 after transfer
                params = {
                    "start_block_index": startBlockIndex,
                    "end_block_index": endBlockIndex,
                    "shielded_TRC20_contract_address": shieldedTRC20ContractAddress,
                    "ivk": shieldedInfo2.ivk,
                    "ak": shieldedInfo2.ak,
                    "nk": shieldedInfo2.nk,
                }
                result = await tronWeb.ztron.scanShieldedTRC20NotesByIvk(params, options);
                console.log("scanByIvk-noteTxs-after: "+util.inspect(result,true,null,true))
                assert.ok(result);
                assert.ok(result.noteTxs);
                assert.ok(result.noteTxs.length == 1);
                assert.ok(result.noteTxs[0].note.value == 1);
            })

            it('should get burnParams with Expanded parameters', async function(){
                const result = await tronWeb.ztron.createBurnParams(shieldedInfo.ask, shieldedInfo.nsk, shieldedInfo.ovk,
                    burnShieldedSpends, burnShieldedReceives, transParentToAddress, toAmount, shieldedTRC20ContractAddress);
                assert.ok(result && result.trigger_contract_input);
            })

            it('should throw if ask|nsk|ovk not a string', async function (){
                const invalidAsk = 1111;
                const invalidNsk = 1111;
                const invalidOvk = 1111;

                await assertThrow(
                    tronWeb.ztron.createBurnParams(invalidAsk, shieldedInfo.nsk, shieldedInfo.ovk,
                        burnShieldedSpends, burnShieldedReceives, transParentToAddress, toAmount, shieldedTRC20ContractAddress),
                    'Invalid ask provided'
                )

                await assertThrow(
                    tronWeb.ztron.createBurnParams(shieldedInfo.ask, invalidNsk, shieldedInfo.ovk,
                        burnShieldedSpends, burnShieldedReceives, transParentToAddress, toAmount, shieldedTRC20ContractAddress),
                    'Invalid nsk provided'
                )

                await assertThrow(
                    tronWeb.ztron.createBurnParams(shieldedInfo.ask, shieldedInfo.nsk, invalidOvk,
                        burnShieldedSpends, burnShieldedReceives, transParentToAddress, toAmount, shieldedTRC20ContractAddress),
                    'Invalid ovk provided'
                )
            })

            it('should throw if shieldedSpends|shieldedReceives not an array', async function (){
                const invalidShieldedSpends = {};
                const invalidShieldedReceives = {};
                await assertThrow(
                    tronWeb.ztron.createBurnParams(shieldedInfo.ask, shieldedInfo.nsk, shieldedInfo.ovk,
                        invalidShieldedSpends, burnShieldedReceives, transParentToAddress, toAmount, shieldedTRC20ContractAddress),
                    'Invalid shieldedSpends provided'
                )

                await assertThrow(
                    tronWeb.ztron.createBurnParams(shieldedInfo.ask, shieldedInfo.nsk, shieldedInfo.ovk,
                        burnShieldedSpends, invalidShieldedReceives, transParentToAddress, toAmount, shieldedTRC20ContractAddress),
                    'Invalid shieldedReceives provided'
                )
            })

            it('should throw if toAmount is not a string', async function (){
                const invalidToAmount = 10;
                await assertThrow(
                    tronWeb.ztron.createBurnParams(shieldedInfo.ask, shieldedInfo.nsk, shieldedInfo.ovk,
                        burnShieldedSpends, burnShieldedReceives, transParentToAddress, invalidToAmount, shieldedTRC20ContractAddress),
                    'Invalid toAmount provided'
                )
            })

            it('should throw if transparentToAddress is not an address', async function (){
                const invalidTransparentToAddress = transParentToAddress.slice(0, 10);
                await assertThrow(
                    tronWeb.ztron.createBurnParams(shieldedInfo.ask, shieldedInfo.nsk, shieldedInfo.ovk,
                        burnShieldedSpends, burnShieldedReceives, invalidTransparentToAddress, toAmount, shieldedTRC20ContractAddress),
                    'Invalid transparentToAddress address provided'
                )
            })

            it('should throw if shieldedTRC20ContractAddress is not an address', async function (){
                const invalidShieldedTRC20ContractAddress = shieldedTRC20ContractAddress.slice(0, 10);
                await assertThrow(
                    tronWeb.ztron.createBurnParams(shieldedInfo.ask, shieldedInfo.nsk, shieldedInfo.ovk,
                        burnShieldedSpends, burnShieldedReceives, transParentToAddress, toAmount, invalidShieldedTRC20ContractAddress),
                    'Invalid shieldedTRC20ContractAddress address provided'
                )
            })
        })

        describe.only("#createBurnParamsWithoutAsk chain", function (){
            let burnParamsResult;
            let spendAuthoritySignature;
            let burnTriggerContractInput;

            const visibleOptions = {
                visible: true
            }
            let burnShieldedReceives = [];
            let toAmount = "10";
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

                const pathInfo = await methodInstance.getPath(noteTxs[0].position).call();
                burnShieldedSpends = [{
                    "note": noteTxs[0].note,
                    "alpha": (await tronWeb.ztron.getRcm()).value,
                    "root":  pathInfo[0].replace('0x', ''),
                    "path":  pathInfo[1].map(v => v.replace('0x', '')).join(''),
                    "pos": noteTxs[0].position
                }];

                // generate new shieldedTRC20ContractAddress
                shieldedInfo2 = await tronWeb.ztron.getNewShieldedAddress();
                burnShieldedReceives = [{
                    note: {
                        value: 1,
                        payment_address: shieldedInfo2.payment_address,
                        rcm: ( await tronWeb.ztron.getRcm()).value
                    }
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
                        shielded_TRC20_contract_address: shieldedTRC20ContractAddress,
                        ovk: shieldedInfo.ovk,
                        ak: shieldedInfo.ak,
                        nsk: shieldedInfo.nsk,
                        to_amount: toAmount,
                        transparent_to_address: transParentToAddress
                    }
                    let result = await tronWeb.ztron.createBurnParamsWithoutAsk(params);
                    console.log("result: "+util.inspect(result,true,null,true))
                    assert.ok(result);
                    assert.ok(result.binding_signature);
                    assert.ok(result.message_hash);
                    burnParamsResult = result;

                    // createSpendAuthSig
                    let txHash = burnParamsResult.message_hash;
                    const rcmInfo = await tronWeb.ztron.getRcm();
                    result = await tronWeb.ztron.createSpendAuthSig(shieldedInfo.ask, txHash, burnShieldedSpends[0].alpha);
                    assert.ok(result && result.value);
                    spendAuthoritySignature = result.value;

                    // getTriggerInputForShieldedTRC20Contract
                    const shieldedTRC20Parameters = Object.assign({}, burnParamsResult);
                    const spendAuthoritySignatureArray = [{
                        value: spendAuthoritySignature
                    }];
                    let options = {
                        amount: toAmount,
                        transparent_to_address: transParentToAddress,
                        visible: true
                    }
                    result = await tronWeb.ztron.getTriggerInputForShieldedTRC20Contract(shieldedTRC20Parameters, spendAuthoritySignatureArray, options);
                    assert.ok(result && result.value)
                    burnTriggerContractInput = result.value;
                    console.log("burnTriggerContractInput: "+util.inspect(burnTriggerContractInput,true,null,true))

                    // makeAndSendTransaction
                    options = {
                        shieldedParameter: burnTriggerContractInput
                    }
                    const transactionResult = await shieldedUtils.makeAndSendTransaction(tronWeb, shieldedTRC20ContractAddress,
                        'burn(bytes32[10],bytes32[2],uint256,bytes32[2],address,bytes32[3],bytes32[9][],bytes32[21][])', options, [], tronWeb.defaultAddress.base58);
                    console.log("transactionResult: "+util.inspect(transactionResult,true,null,true))
                    assert.ok(transactionResult && transactionResult.result);
                    await wait(50);

                    trc20Contract = await tronWeb.contract().at(trc20ContractAddress);
                    let trc20BalanceAfter = await trc20Contract.balanceOf(ADDRESS_BASE58).call();
                    console.log("trc20BalanceAfter: "+trc20BalanceAfter);
                    assert.equal(parseInt(trc20BalanceBefore)+10,parseInt(trc20BalanceAfter));

                    // isShieldedTRC20ContractNoteSpent
                    await wait(10);
                    params = {
                        note: burnShieldedSpends[0].note,
                        ak: shieldedInfo.ak,
                        nk: shieldedInfo.nk,
                        position: burnShieldedSpends[0].pos,
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
                    let scanByOvkNote = result.noteTxs;
                    assert.ok(scanByOvkNote.length == 2);
                    assert.ok(scanByOvkNote[0].note.value == 1);
                    assert.ok(scanByOvkNote[0].txid == scanByOvkNote[1].txid);
                    assert.ok(scanByOvkNote[1].to_amount == 10);
                    assert.equal(scanByOvkNote[1].transparent_to_address, transParentToAddress);


                    // scanByIvk length is 1 after transfer
                    params = {
                        "start_block_index": startBlockIndex,
                        "end_block_index": endBlockIndex,
                        "shielded_TRC20_contract_address": shieldedTRC20ContractAddress,
                        "ivk": shieldedInfo2.ivk,
                        "ak": shieldedInfo2.ak,
                        "nk": shieldedInfo2.nk,
                    }
                    result = await tronWeb.ztron.scanShieldedTRC20NotesByIvk(params, options);
                    console.log("scanByIvk-noteTxs-after: "+util.inspect(result,true,null,true))
                    assert.ok(result);
                    assert.ok(result.noteTxs);
                    assert.ok(result.noteTxs.length == 1);
                    assert.ok(result.noteTxs[0].note.value == 1);
                })
                
                it('should get transferParams without ask, The parameters are expanded', async function (){
                    const result = await tronWeb.ztron.createBurnParamsWithoutAsk(shieldedInfo.ak, shieldedInfo.nsk, shieldedInfo.ovk,
                        burnShieldedSpends, burnShieldedReceives, transParentToAddress, toAmount, shieldedTRC20ContractAddress);
                    assert.ok(result && result.binding_signature && result.message_hash);
                })

                it('should trow if ak|nsk|ovk is not a string', async function (){
                    const invalidAk = 1111;
                    const invalidNsk = 1111;
                    const invalidOvk = 1111;

                    await assertThrow(
                        tronWeb.ztron.createBurnParamsWithoutAsk(invalidAk, shieldedInfo.nsk, shieldedInfo.ovk,
                            burnShieldedSpends, burnShieldedReceives, transParentToAddress, toAmount, shieldedTRC20ContractAddress),
                        'Invalid ak provided'
                    )

                    await assertThrow(
                        tronWeb.ztron.createBurnParamsWithoutAsk(shieldedInfo.ak, invalidNsk, shieldedInfo.ovk,
                            burnShieldedSpends, burnShieldedReceives, transParentToAddress, toAmount, shieldedTRC20ContractAddress),
                        'Invalid nsk provided'
                    )

                    await assertThrow(
                        tronWeb.ztron.createBurnParamsWithoutAsk(shieldedInfo.ak, shieldedInfo.nsk, invalidOvk,
                            burnShieldedSpends, burnShieldedReceives, transParentToAddress, toAmount, shieldedTRC20ContractAddress),
                        'Invalid ovk provided'
                    )
                })

                it('should throw if shieldedSpends|shieldedReceives not an array', async function (){
                    const invalidShieldedSpends = {};
                    const invalidShieldedReceives = {};
                    await assertThrow(
                        tronWeb.ztron.createBurnParamsWithoutAsk(shieldedInfo.ak, shieldedInfo.nsk, shieldedInfo.ovk,
                            invalidShieldedSpends, burnShieldedReceives, transParentToAddress, toAmount, shieldedTRC20ContractAddress),
                        'Invalid shieldedSpends provided'
                    )

                    await assertThrow(
                        tronWeb.ztron.createBurnParamsWithoutAsk(shieldedInfo.ak, shieldedInfo.nsk, shieldedInfo.ovk,
                            burnShieldedSpends, invalidShieldedReceives, transParentToAddress, toAmount, shieldedTRC20ContractAddress),
                        'Invalid shieldedReceives provided'
                    )
                })

                it('should throw if toAmount is not a string', async function (){
                    const invalidToAmount = 10;
                    await assertThrow(
                        tronWeb.ztron.createBurnParamsWithoutAsk(shieldedInfo.ask, shieldedInfo.nsk, shieldedInfo.ovk,
                            burnShieldedSpends, burnShieldedReceives, transParentToAddress, invalidToAmount, shieldedTRC20ContractAddress),
                        'Invalid toAmount provided'
                    )
                })

                it('should throw if transparentToAddress is not an address', async function (){
                    const invalidTransparentToAddress = transParentToAddress.slice(0, 10);
                    await assertThrow(
                        tronWeb.ztron.createBurnParamsWithoutAsk(shieldedInfo.ask, shieldedInfo.nsk, shieldedInfo.ovk,
                            burnShieldedSpends, burnShieldedReceives, invalidTransparentToAddress, toAmount, shieldedTRC20ContractAddress),
                        'Invalid transparentToAddress address provided'
                    )
                })

                it('should throw if shieldedTRC20ContractAddress is not an address', async function (){
                    const invalidShieldedTRC20ContractAddress = shieldedTRC20ContractAddress.slice(0, 10);
                    await assertThrow(
                        tronWeb.ztron.createBurnParamsWithoutAsk(shieldedInfo.ak, shieldedInfo.nsk, shieldedInfo.ovk,
                            burnShieldedSpends, burnShieldedReceives, transParentToAddress, toAmount, invalidShieldedTRC20ContractAddress),
                        'Invalid shieldedTRC20ContractAddress address provided'
                    )
                })
            })
        })
    });

    describe("redjubjub tool", function (){
        it('should all passed.', function (){
            const keys = tronWeb.ztron.generate_keys();
            assert.ok(keys.sk && keys.ask && keys.nsk && keys.ovk && keys.ak && keys.nk && keys.ivk && keys.d && keys.pk_d && keys.payment_address)

            const keysBySk = tronWeb.ztron.generate_keys_by_sk(keys.sk)
            assert.ok(keysBySk.sk && keysBySk.ask && keysBySk.nsk && keysBySk.ovk && keysBySk.ak && keysBySk.nk
                && keysBySk.ivk && keysBySk.d && keysBySk.pk_d && keysBySk.payment_address)

            const keysByskd = tronWeb.ztron.generate_keys_by_sk_d(keys.sk, keysBySk.d)
            assert.ok(keysByskd.sk && keysByskd.ask && keysByskd.nsk && keysByskd.ovk && keysByskd.ak && keysByskd.nk
                && keysByskd.ivk && keysByskd.d && keysByskd.pk_d && keysByskd.payment_address)

            const rk_by_ask = tronWeb.ztron.generate_rk_by_ask(keys.ask, '2608999c3a97d005a879ecdaa16fd29ae434fb67b177c5e875b0c829e6a1db05')
            assert.ok(rk_by_ask)

            const spend_auth_sign = tronWeb.ztron.generate_spend_auth_sig(keys.ask, '2608999c3a97d005a879ecdaa16fd29ae434fb67b177c5e875b0c829e6a1db05', '3b78fee6e956f915ffe082284c5f18640edca9c57a5f227e5f7d7eb65ad61502')
            assert.ok(spend_auth_sign)

            const  verifySpendAuthSig = tronWeb.ztron.verify_spend_auth_sig(rk_by_ask, '3b78fee6e956f915ffe082284c5f18640edca9c57a5f227e5f7d7eb65ad61502', spend_auth_sign)
            assert.ok(verifySpendAuthSig === true)

            const generate_pk_by_sk = tronWeb.ztron.generate_pk_by_sk(keys.ask);
            assert.ok(generate_pk_by_sk)

            const generate_binding_sig = tronWeb.ztron.generate_binding_sig(keys.ask, '3b78fee6e956f915ffe082284c5f18640edca9c57a5f227e5f7d7eb65ad61502');
            assert.ok(generate_binding_sig)

            const verify_binding_sig = tronWeb.ztron.verify_binding_sig(generate_pk_by_sk, '3b78fee6e956f915ffe082284c5f18640edca9c57a5f227e5f7d7eb65ad61502', generate_binding_sig)
            assert.ok(verify_binding_sig === true)
        })
    })
});
