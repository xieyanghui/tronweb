const fullHost = "http://127.0.0.1:" + (process.env.HOST_PORT || 9090)

module.exports = {

    PRIVATE_KEY: process.env.PRIVATE_KEY,
    CONSUME_USER_RESOURCE_PERCENT: 30,
    FEE_LIMIT: 100000000,
    FULL_NODE_API: fullHost,
    SOLIDITY_NODE_API: fullHost,
    EVENT_API: fullHost,
    NETWORK_ID: "*",
    /*ADDRESS_HEX: '41928c9af0651632157ef27a2cf17ca72c575a4d21',
    ADDRESS_BASE58: 'TPL66VK2gCXNCD7EJg9pgJRfqcRazjhUZY',*/
    ADDRESS_HEX: '415624c12e308b03a1a6b21d9b86e3942fac1ab92b',
    ADDRESS_BASE58: 'THph9K2M2nLvkianrMGswRhz5hjSA9fuH7',
    UPDATED_TEST_TOKEN_OPTIONS: {
        description: 'Very useless utility token',
        url: 'https://none.example.com',
        freeBandwidth: 10,
        freeBandwidthLimit: 100
    },
    getTokenOptions: () => {
        const rnd = Math.random().toString(36).substr(2);
        return {
            name: `Token${rnd}`,
            abbreviation: `T${rnd.substring(2).toUpperCase()}`,
            description: 'Useless utility token',
            url: `https://example-${rnd}.com/`,
            totalSupply: 100000000,
            saleEnd: Date.now() + 60000, // 1 minute
            frozenAmount: 5,
            frozenDuration: 1,
            trxRatio: 10,
            tokenRatio: 2,
            saleStart: Date.now() + 500,
            freeBandwidth: 100,
            freeBandwidthLimit: 1000
        }
    },
    isProposalApproved: async (tronWeb, proposal) => {
        let chainParameters = await tronWeb.trx.getChainParameters()
        for(let param of chainParameters) {
            if(param.key === proposal) {
                return param.value
            }
        }
        return false
    },
    SUN_NETWORK: process.env.SUN_NETWORK,
    SIDE_CHAIN: {
        fullNode: 'https://testhttpapi.tronex.io',
        solidityNode: 'https://testhttpapi.tronex.io',
        eventServer: 'https://testhttpapi.tronex.io',
        sideOptions: {
            fullNode: 'https://suntest.tronex.io',
            solidityNode: 'https://suntest.tronex.io',
            eventServer: 'https://suntest.tronex.io',
            mainGatewayAddress: 'TFLtPoEtVJBMcj6kZPrQrwEdM3W3shxsBU',
            mainGatewayAddress_hex: '413af23f37da0d48234fdd43d89931e98e1144481b',
            sideGatewayAddress: 'TRDepx5KoQ8oNbFVZ5sogwUxtdYmATDRgX',
            sideGatewayAddress_hex: '41a74544b896f6a50f8ef1c2d64803c462cbdb019d',
            sideChainId: '413AF23F37DA0D48234FDD43D89931E98E1144481B'
        }
    },
    TOKEN_ID: 1000093,
    DEPOSIT_FEE: 0,
    MAPPING_FEE: 1000000000,
    WITHDRAW_FEE: 0,
    RETRY_MAPPING_FEE: 1000000000,
    RETRY_DEPOSIT_FEE: 0,
    RETRY_WITHDRAW_FEE: 0,
    NONCE: 35,

    HASH20: '340736d60acb72d31f3ccf2f239e3037466ad593fe1a810604869ffb37408368',
    CONTRACT_ADDRESS20: 'TKzAbWH9gzPA2SrjSbv6wKsu7JrYwX5ABC',
    CONTRACT_ADDRESS20_HEX: '416ddfaa50bcb0c96cbaf1b5579821aedb87846ddf',

    ADDRESS20_MAPPING: 'TWKgfWi4cLHSEwAfuqMvLE1f8DeUbZrtJx',
    ADDRESS20_MAPPING_HEX: '41df41ed44271678b166ad6bf0434e0b4055b98346',

    HASH721: 'dec0b5e73b4a3ad5061337b9277701ea8a7c1f4dd5ff14e11b9c9eef00c72562',
    CONTRACT_ADDRESS721: 'THczcX2D1mqCDRN1JgkhxyDeEqPBz8oBSR',
    CONTRACT_ADDRESS721_HEX: '4153ee58746945a21c22384ef9b71c04465a5db889',

    ADDRESS721_MAPPING: 'TVG2vHBeWac6AxLCJE5MjuKtD7JVKRKkPn',
    ADDRESS721_MAPPING_HEX: '41d3990b7d3342cdef07d15c59111faea207286aab',
    TRC721_ID: 1001
}
