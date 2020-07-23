const {DEPOSIT_FEE, WITHDRAW_FEE, FEE_LIMIT, ADDRESS_BASE58, SIDE_CHAIN} = require('../util/config');
const tronWebBuilder = require('../../helpers/tronWebBuilder');
const assertThrow = require('../../helpers/assertThrow');
const publicMethod = require('../util/PublicMethod');
const broadcaster = require('../util/broadcaster');
const wait = require('../../helpers/wait');
const chai = require('chai');
const assert = chai.assert;
const util = require('util');

describe('TronWeb Instance', function() {
    describe('#other', function() {
        describe('#setMain、SideGatewayAddress、ChainId', function () {
            const tronWeb = tronWebBuilder.createInstanceSide();
            it('setMainGatewayAddress normal', async function () {
                // before
                let mainGatewayAddressBefore = await tronWeb.sidechain.mainGatewayAddress;
                console.log('mainGatewayAddressBefore: ' + mainGatewayAddressBefore);
                assert.equal(SIDE_CHAIN.sideOptions.mainGatewayAddress, mainGatewayAddressBefore);

                // setMainGatewayAddress
                await tronWeb.sidechain.setMainGatewayAddress(ADDRESS_BASE58);
                let mainGatewayAddressAfter = await tronWeb.sidechain.mainGatewayAddress;
                console.log('mainGatewayAddressAfter: ' + mainGatewayAddressAfter);
                assert.equal(ADDRESS_BASE58, mainGatewayAddressAfter);
            });
            it('should throw if an invalid main gateway address', async function () {
                try {
                    await tronWeb.sidechain.setMainGatewayAddress("THph9K2M2nLvkianrMGswRhz5hjSA9fuH9")
                } catch (e) {
                    console.log("e.message:"+e.message)
                    assert.equal("Invalid main gateway address provided", e.message);
                }

            });
            it('setSideGatewayAddress normal', async function () {
                // before
                let sideGatewayAddressBefore = await tronWeb.sidechain.sideGatewayAddress;
                console.log('sideGatewayAddressBefore: ' + sideGatewayAddressBefore);
                assert.equal(SIDE_CHAIN.sideOptions.sideGatewayAddress, sideGatewayAddressBefore);

                // setSideGatewayAddress
                await tronWeb.sidechain.setSideGatewayAddress(ADDRESS_BASE58);
                let sideGatewayAddressAfter = await tronWeb.sidechain.sideGatewayAddress;
                console.log('sideGatewayAddressAfter: ' + sideGatewayAddressAfter);
                assert.equal(ADDRESS_BASE58, sideGatewayAddressAfter);
            });
            it('should throw if an invalid side gateway address', async function () {
                try {
                    await tronWeb.sidechain.setSideGatewayAddress("THph9K2M2nLvkianrMGswRhz5hjSA9fuH9")
                } catch (e) {
                    console.log("e.message:"+e.message)
                    assert.equal("Invalid side gateway address provided", e.message);
                }

            });
            it('setChainId normal', async function () {
                // before
                let sideChainIdBefore = await tronWeb.sidechain.chainId;
                console.log('sideChainIdBefore: ' + sideChainIdBefore);
                assert.equal(SIDE_CHAIN.sideOptions.sideChainId, sideChainIdBefore);

                // setChainId
                await tronWeb.sidechain.setChainId(ADDRESS_BASE58);
                let sideChainIdAfter = await tronWeb.sidechain.chainId;
                console.log('sideChainIdAfter: ' + sideChainIdAfter);
                assert.equal(ADDRESS_BASE58, sideChainIdAfter);
            });
            it('should throw if an invalid side gateway address', async function () {
                try {
                    await tronWeb.sidechain.setChainId("THph9K2M2nLvkianrMGswRhz5hjSA9fuH9")
                } catch (e) {
                    console.log("e.message:"+e.message)
                    assert.equal("Invalid side chainId provided", e.message);
                }

            });
            after(async function () {
                // setMainGatewayAddress
                await tronWeb.sidechain.setMainGatewayAddress(SIDE_CHAIN.sideOptions.mainGatewayAddress);
                let mainGatewayAddress = await tronWeb.sidechain.mainGatewayAddress;
                console.log('mainGatewayAddress: ' + mainGatewayAddress);
                assert.equal(SIDE_CHAIN.sideOptions.mainGatewayAddress, mainGatewayAddress);
            })
        });
    });
});

