module.exports = {
    testDeployRevert: {
        contractName: "contractUnknownException",
        abi: [
            {
                "inputs":[
                ],
                "payable":true,
                "stateMutability":"payable",
                "type":"constructor"
            }
        ],
        bytecode: "0x60806040526000600a6040516012906087565b6040518091039082f080158015602c573d6000803e3d6000fd5b5090509050806001600160a01b031663946644cd6040518163ffffffff1660e01b8152600401600060405180830381600087803b158015606b57600080fd5b505af1158015607e573d6000803e3d6000fd5b50505050506092565b60078060dc83390190565b603d80609f6000396000f3fe6080604052600080fdfea26474726f6e5820ec9f264886a0a6be93041d24b4fe16bccd2e9784596c51c231ca1e223d1f05fd64736f6c634300050c00316080604052fefe"
    },
    testTriggerError: {
        contractName: "Test",
        abi: [
            {
                "constant":false,
                "inputs":[
                    {
                        "name":"x",
                        "type":"uint256"
                    }],
                "name":"testOutOfMem",
                "outputs":[
                    {
                        "name":"r",
                        "type":"bytes32"
                    }],
                "payable":false,
                "stateMutability":"nonpayable",
                "type":"function"
            },
            {
                "constant":false,
                "inputs":[
                ],
                "name":"testBadJumpDestination",
                "outputs":[
                ],
                "payable":false,
                "stateMutability":"nonpayable",
                "type":"function"
            }
        ],
        bytecode: "0x608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b5061011f8061003a6000396000f30060806040526004361060485763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416634ef5a0088114604d5780639093b95b14608c575b600080fd5b348015605857600080fd5b50d38015606457600080fd5b50d28015607057600080fd5b50607a60043560b8565b60408051918252519081900360200190f35b348015609757600080fd5b50d3801560a357600080fd5b50d2801560af57600080fd5b5060b660ee565b005b600060608260405190808252806020026020018201604052801560e5578160200160208202803883390190505b50905050919050565b6001805600a165627a7a7230582092ba162087e13f41c6d6c00ba493edc5a5a6250a3840ece5f99aa38b66366a700029"
    },
    trc20Contract: {
        contractName: "trc20Contract",
        abi: [
            {
                "constant":true,
                "inputs":[
                ],
                "name":"name",
                "outputs":[
                    {
                        "name":"",
                        "type":"string"
                    }],
                "payable":false,
                "stateMutability":"view",
                "type":"function"
            },
            {
                "constant":false,
                "inputs":[
                ],
                "name":"stop",
                "outputs":[
                ],
                "payable":false,
                "stateMutability":"nonpayable",
                "type":"function"
            },
            {
                "constant":false,
                "inputs":[
                    {
                        "name":"_spender",
                        "type":"address"
                    },
                    {
                        "name":"_value",
                        "type":"uint256"
                    }],
                "name":"approve",
                "outputs":[
                    {
                        "name":"success",
                        "type":"bool"
                    }],
                "payable":false,
                "stateMutability":"nonpayable",
                "type":"function"
            },
            {
                "constant":true,
                "inputs":[
                ],
                "name":"totalSupply",
                "outputs":[
                    {
                        "name":"",
                        "type":"uint256"
                    }],
                "payable":false,
                "stateMutability":"view",
                "type":"function"
            },
            {
                "constant":false,
                "inputs":[
                    {
                        "name":"_from",
                        "type":"address"
                    },
                    {
                        "name":"_to",
                        "type":"address"
                    },
                    {
                        "name":"_value",
                        "type":"uint256"
                    }],
                "name":"transferFrom",
                "outputs":[
                    {
                        "name":"success",
                        "type":"bool"
                    }],
                "payable":false,
                "stateMutability":"nonpayable",
                "type":"function"
            },
            {
                "constant":true,
                "inputs":[
                ],
                "name":"decimals",
                "outputs":[
                    {
                        "name":"",
                        "type":"uint256"
                    }],
                "payable":false,
                "stateMutability":"view",
                "type":"function"
            },
            {
                "constant":false,
                "inputs":[
                    {
                        "name":"_value",
                        "type":"uint256"
                    }],
                "name":"burn",
                "outputs":[
                ],
                "payable":false,
                "stateMutability":"nonpayable",
                "type":"function"
            },
            {
                "constant":true,
                "inputs":[
                    {
                        "name":"",
                        "type":"address"
                    }],
                "name":"balanceOf",
                "outputs":[
                    {
                        "name":"",
                        "type":"uint256"
                    }],
                "payable":false,
                "stateMutability":"view",
                "type":"function"
            },
            {
                "constant":true,
                "inputs":[
                ],
                "name":"stopped",
                "outputs":[
                    {
                        "name":"",
                        "type":"bool"
                    }],
                "payable":false,
                "stateMutability":"view",
                "type":"function"
            },
            {
                "constant":true,
                "inputs":[
                ],
                "name":"symbol",
                "outputs":[
                    {
                        "name":"",
                        "type":"string"
                    }],
                "payable":false,
                "stateMutability":"view",
                "type":"function"
            },
            {
                "constant":false,
                "inputs":[
                    {
                        "name":"_to",
                        "type":"address"
                    },
                    {
                        "name":"_value",
                        "type":"uint256"
                    }],
                "name":"transfer",
                "outputs":[
                    {
                        "name":"success",
                        "type":"bool"
                    }],
                "payable":false,
                "stateMutability":"nonpayable",
                "type":"function"
            },
            {
                "constant":false,
                "inputs":[
                ],
                "name":"start",
                "outputs":[
                ],
                "payable":false,
                "stateMutability":"nonpayable",
                "type":"function"
            },
            {
                "constant":false,
                "inputs":[
                    {
                        "name":"_name",
                        "type":"string"
                    }],
                "name":"setName",
                "outputs":[
                ],
                "payable":false,
                "stateMutability":"nonpayable",
                "type":"function"
            },
            {
                "constant":true,
                "inputs":[
                    {
                        "name":"",
                        "type":"address"
                    },
                    {
                        "name":"",
                        "type":"address"
                    }],
                "name":"allowance",
                "outputs":[
                    {
                        "name":"",
                        "type":"uint256"
                    }],
                "payable":false,
                "stateMutability":"view",
                "type":"function"
            },
            {
                "inputs":[
                    {
                        "name":"_addressFounder",
                        "type":"address"
                    }],
                "payable":false,
                "stateMutability":"nonpayable",
                "type":"constructor"
            },
            {
                "anonymous":false,
                "inputs":[
                    {
                        "indexed":true,
                        "name":"_from",
                        "type":"address"
                    },
                    {
                        "indexed":true,
                        "name":"_to",
                        "type":"address"
                    },
                    {
                        "indexed":false,
                        "name":"_value",
                        "type":"uint256"
                    }],
                "name":"Transfer",
                "type":"event"
            },
            {
                "anonymous":false,
                "inputs":[
                    {
                        "indexed":true,
                        "name":"_owner",
                        "type":"address"
                    },
                    {
                        "indexed":true,
                        "name":"_spender",
                        "type":"address"
                    },
                    {
                        "indexed":false,
                        "name":"_value",
                        "type":"uint256"
                    }],
                "name":"Approval",
                "type":"event"
            }
        ],
        bytecode: "60c0604052600660808190527f54726f6e6978000000000000000000000000000000000000000000000000000060a090815261003e916000919061013c565b506040805180820190915260038082527f545258000000000000000000000000000000000000000000000000000000000060209092019182526100839160019161013c565b506006600281905560006005558054600160a860020a03191690553480156100aa57600080fd5b50604051602080610a8383398101604081815291516006805461010060a860020a031916336101000217905567016345785d8a00006005819055600160a060020a03821660008181526003602090815286822084905592855294519294909390927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef929181900390910190a3506101d7565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061017d57805160ff19168380011785556101aa565b828001600101855582156101aa579182015b828111156101aa57825182559160200191906001019061018f565b506101b69291506101ba565b5090565b6101d491905b808211156101b657600081556001016101c0565b90565b61089d806101e66000396000f3006080604052600436106100cf5763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166306fdde0381146100d457806307da68f51461015e578063095ea7b31461017557806318160ddd146101ad57806323b872dd146101d4578063313ce567146101fe57806342966c681461021357806370a082311461022b57806375f12b211461024c57806395d89b4114610261578063a9059cbb14610276578063be9a65551461029a578063c47f0027146102af578063dd62ed3e14610308575b600080fd5b3480156100e057600080fd5b506100e961032f565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561012357818101518382015260200161010b565b50505050905090810190601f1680156101505780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561016a57600080fd5b506101736103bd565b005b34801561018157600080fd5b50610199600160a060020a03600435166024356103e5565b604080519115158252519081900360200190f35b3480156101b957600080fd5b506101c2610465565b60408051918252519081900360200190f35b3480156101e057600080fd5b50610199600160a060020a036004358116906024351660443561046b565b34801561020a57600080fd5b506101c2610588565b34801561021f57600080fd5b5061017360043561058e565b34801561023757600080fd5b506101c2600160a060020a0360043516610625565b34801561025857600080fd5b50610199610637565b34801561026d57600080fd5b506100e9610640565b34801561028257600080fd5b50610199600160a060020a036004351660243561069a565b3480156102a657600080fd5b50610173610764565b3480156102bb57600080fd5b506040805160206004803580820135601f81018490048402850184019095528484526101739436949293602493928401919081908401838280828437509497506107899650505050505050565b34801561031457600080fd5b506101c2600160a060020a03600435811690602435166107b9565b6000805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156103b55780601f1061038a576101008083540402835291602001916103b5565b820191906000526020600020905b81548152906001019060200180831161039857829003601f168201915b505050505081565b6006546101009004600160a060020a031633146103d657fe5b6006805460ff19166001179055565b60065460009060ff16156103f557fe5b3315156103fe57fe5b336000818152600460209081526040808320600160a060020a03881680855290835292819020869055805186815290519293927f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925929181900390910190a350600192915050565b60055481565b60065460009060ff161561047b57fe5b33151561048457fe5b600160a060020a0384166000908152600360205260409020548211156104a957600080fd5b600160a060020a03831660009081526003602052604090205482810110156104d057600080fd5b600160a060020a038416600090815260046020908152604080832033845290915290205482111561050057600080fd5b600160a060020a03808416600081815260036020908152604080832080548801905593881680835284832080548890039055600482528483203384528252918490208054879003905583518681529351929391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a35060019392505050565b60025481565b336000908152600360205260409020548111156105aa57600080fd5b336000818152600360209081526040808320805486900390558280527f3617319a054d772f909f7c479a2cebe5066e836a939412e32403c99029b92eff805486019055805185815290519293927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef929181900390910190a350565b60036020526000908152604090205481565b60065460ff1681565b60018054604080516020600284861615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156103b55780601f1061038a576101008083540402835291602001916103b5565b60065460009060ff16156106aa57fe5b3315156106b357fe5b336000908152600360205260409020548211156106cf57600080fd5b600160a060020a03831660009081526003602052604090205482810110156106f657600080fd5b33600081815260036020908152604080832080548790039055600160a060020a03871680845292819020805487019055805186815290519293927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef929181900390910190a350600192915050565b6006546101009004600160a060020a0316331461077d57fe5b6006805460ff19169055565b6006546101009004600160a060020a031633146107a257fe5b80516107b59060009060208401906107d6565b5050565b600460209081526000928352604080842090915290825290205481565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061081757805160ff1916838001178555610844565b82800160010185558215610844579182015b82811115610844578251825591602001919060010190610829565b50610850929150610854565b5090565b61086e91905b80821115610850576000815560010161085a565b905600a165627a7a723058202b251653003f1859e00d30411fa90d271d66cfc390ba62946fe50260d824d6c50029"
    },
    trc721Contract: {
        contractName: "trc721",
        abi: [
            {
                "constant":true,
                "inputs":[
                ],
                "name":"name",
                "outputs":[
                    {
                        "name":"",
                        "type":"string"
                    }],
                "payable":false,
                "stateMutability":"view",
                "type":"function"
            },
            {
                "constant":true,
                "inputs":[
                    {
                        "name":"tokenId",
                        "type":"uint256"
                    }],
                "name":"getApproved",
                "outputs":[
                    {
                        "name":"",
                        "type":"address"
                    }],
                "payable":false,
                "stateMutability":"view",
                "type":"function"
            },
            {
                "constant":false,
                "inputs":[
                    {
                        "name":"to",
                        "type":"address"
                    },
                    {
                        "name":"tokenId",
                        "type":"uint256"
                    }],
                "name":"approve",
                "outputs":[
                ],
                "payable":false,
                "stateMutability":"nonpayable",
                "type":"function"
            },
            {
                "constant":true,
                "inputs":[
                ],
                "name":"gateway",
                "outputs":[
                    {
                        "name":"",
                        "type":"address"
                    }],
                "payable":false,
                "stateMutability":"view",
                "type":"function"
            },
            {
                "constant":false,
                "inputs":[
                    {
                        "name":"from",
                        "type":"address"
                    },
                    {
                        "name":"to",
                        "type":"address"
                    },
                    {
                        "name":"tokenId",
                        "type":"uint256"
                    }],
                "name":"transferFrom",
                "outputs":[
                ],
                "payable":false,
                "stateMutability":"nonpayable",
                "type":"function"
            },
            {
                "constant":false,
                "inputs":[
                    {
                        "name":"to",
                        "type":"address"
                    },
                    {
                        "name":"tokenId",
                        "type":"uint256"
                    }],
                "name":"mint",
                "outputs":[
                ],
                "payable":false,
                "stateMutability":"nonpayable",
                "type":"function"
            },
            {
                "constant":false,
                "inputs":[
                    {
                        "name":"tokenId",
                        "type":"uint256"
                    },
                    {
                        "name":"txData",
                        "type":"bytes"
                    }],
                "name":"withdrawal",
                "outputs":[
                ],
                "payable":false,
                "stateMutability":"nonpayable",
                "type":"function"
            },
            {
                "constant":true,
                "inputs":[
                    {
                        "name":"tokenId",
                        "type":"uint256"
                    }],
                "name":"ownerOf",
                "outputs":[
                    {
                        "name":"",
                        "type":"address"
                    }],
                "payable":false,
                "stateMutability":"view",
                "type":"function"
            },
            {
                "constant":true,
                "inputs":[
                    {
                        "name":"owner",
                        "type":"address"
                    }],
                "name":"balanceOf",
                "outputs":[
                    {
                        "name":"",
                        "type":"uint256"
                    }],
                "payable":false,
                "stateMutability":"view",
                "type":"function"
            },
            {
                "constant":true,
                "inputs":[
                ],
                "name":"symbol",
                "outputs":[
                    {
                        "name":"",
                        "type":"string"
                    }],
                "payable":false,
                "stateMutability":"view",
                "type":"function"
            },
            {
                "constant":false,
                "inputs":[
                    {
                        "name":"to",
                        "type":"address"
                    },
                    {
                        "name":"approved",
                        "type":"bool"
                    }],
                "name":"setApprovalForAll",
                "outputs":[
                ],
                "payable":false,
                "stateMutability":"nonpayable",
                "type":"function"
            },
            {
                "constant":false,
                "inputs":[
                    {
                        "name":"to",
                        "type":"address"
                    },
                    {
                        "name":"tokenId",
                        "type":"uint256"
                    }],
                "name":"transfer",
                "outputs":[
                ],
                "payable":false,
                "stateMutability":"nonpayable",
                "type":"function"
            },
            {
                "constant":true,
                "inputs":[
                    {
                        "name":"owner",
                        "type":"address"
                    },
                    {
                        "name":"operator",
                        "type":"address"
                    }],
                "name":"isApprovedForAll",
                "outputs":[
                    {
                        "name":"",
                        "type":"bool"
                    }],
                "payable":false,
                "stateMutability":"view",
                "type":"function"
            },
            {
                "inputs":[
                    {
                        "name":"_gateway",
                        "type":"address"
                    },
                    {
                        "name":"_name",
                        "type":"string"
                    },
                    {
                        "name":"_symbol",
                        "type":"string"
                    }],
                "payable":false,
                "stateMutability":"nonpayable",
                "type":"constructor"
            },
            {
                "anonymous":false,
                "inputs":[
                    {
                        "indexed":true,
                        "name":"from",
                        "type":"address"
                    },
                    {
                        "indexed":true,
                        "name":"to",
                        "type":"address"
                    },
                    {
                        "indexed":true,
                        "name":"tokenId",
                        "type":"uint256"
                    }],
                "name":"Transfer",
                "type":"event"
            },
            {
                "anonymous":false,
                "inputs":[
                    {
                        "indexed":true,
                        "name":"owner",
                        "type":"address"
                    },
                    {
                        "indexed":true,
                        "name":"approved",
                        "type":"address"
                    },
                    {
                        "indexed":true,
                        "name":"tokenId",
                        "type":"uint256"
                    }],
                "name":"Approval",
                "type":"event"
            },
            {
                "anonymous":false,
                "inputs":[
                    {
                        "indexed":true,
                        "name":"owner",
                        "type":"address"
                    },
                    {
                        "indexed":true,
                        "name":"operator",
                        "type":"address"
                    },
                    {
                        "indexed":false,
                        "name":"approved",
                        "type":"bool"
                    }],
                "name":"ApprovalForAll",
                "type":"event"
            }
        ],
        bytecode: "0x608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b50604051610d84380380610d8483398101604090815281516020808401519284015160048054600160a060020a031916600160a060020a0385161790559284018051929490930191610082916005919085019061009f565b50805161009690600690602084019061009f565b5050505061013a565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106100e057805160ff191683800117855561010d565b8280016001018555821561010d579182015b8281111561010d5782518255916020019190600101906100f2565b5061011992915061011d565b5090565b61013791905b808211156101195760008155600101610123565b90565b610c3b806101496000396000f3006080604052600436106100c45763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166306fdde0381146100c9578063081812fc1461016d578063095ea7b3146101bb578063116191b6146101fb57806323b872dd1461022a57806340c10f191461026e57806349e11893146102ac5780636352211e1461032457806370a082311461035657806395d89b41146103a3578063a22cb465146103d2578063a9059cbb14610412578063e985e9c514610450575b600080fd5b3480156100d557600080fd5b50d380156100e257600080fd5b50d280156100ef57600080fd5b506100f86104a5565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561013257818101518382015260200161011a565b50505050905090810190601f16801561015f5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561017957600080fd5b50d3801561018657600080fd5b50d2801561019357600080fd5b5061019f600435610533565b60408051600160a060020a039092168252519081900360200190f35b3480156101c757600080fd5b50d380156101d457600080fd5b50d280156101e157600080fd5b506101f9600160a060020a0360043516602435610565565b005b34801561020757600080fd5b50d3801561021457600080fd5b50d2801561022157600080fd5b5061019f61061b565b34801561023657600080fd5b50d3801561024357600080fd5b50d2801561025057600080fd5b506101f9600160a060020a036004358116906024351660443561062a565b34801561027a57600080fd5b50d3801561028757600080fd5b50d2801561029457600080fd5b506101f9600160a060020a036004351660243561064f565b3480156102b857600080fd5b50d380156102c557600080fd5b50d280156102d257600080fd5b5060408051602060046024803582810135601f81018590048502860185019096528585526101f99583359536956044949193909101919081908401838280828437509497506107269650505050505050565b34801561033057600080fd5b50d3801561033d57600080fd5b50d2801561034a57600080fd5b5061019f600435610896565b34801561036257600080fd5b50d3801561036f57600080fd5b50d2801561037c57600080fd5b50610391600160a060020a03600435166108c0565b60408051918252519081900360200190f35b3480156103af57600080fd5b50d380156103bc57600080fd5b50d280156103c957600080fd5b506100f86108f3565b3480156103de57600080fd5b50d380156103eb57600080fd5b50d280156103f857600080fd5b506101f9600160a060020a0360043516602435151561094e565b34801561041e57600080fd5b50d3801561042b57600080fd5b50d2801561043857600080fd5b506101f9600160a060020a03600435166024356109d2565b34801561045c57600080fd5b50d3801561046957600080fd5b50d2801561047657600080fd5b50610491600160a060020a03600435811690602435166109e1565b604080519115158252519081900360200190f35b6005805460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152929183018282801561052b5780601f106105005761010080835404028352916020019161052b565b820191906000526020600020905b81548152906001019060200180831161050e57829003601f168201915b505050505081565b600061053e82610a0f565b151561054957600080fd5b50600090815260016020526040902054600160a060020a031690565b600061057082610896565b9050600160a060020a03838116908216141561058b57600080fd5b33600160a060020a03821614806105a757506105a781336109e1565b15156105b257600080fd5b600082815260016020526040808220805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0387811691821790925591518593918516917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591a4505050565b600454600160a060020a031681565b6106343382610a2c565b151561063f57600080fd5b61064a838383610a8b565b505050565b600454600160a060020a0316331461066657600080fd5b600160a060020a038216151561067b57600080fd5b61068481610a0f565b1561068e57600080fd5b600081815260208181526040808320805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a038716908117909155835260029091529020546106db906001610ba6565b600160a060020a0383166000818152600260205260408082209390935591518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b60045460009061073f90600160a060020a0316846109d2565b600480546040517fcb912b1e0000000000000000000000000000000000000000000000000000000081523392810183815260248201879052606060448301908152865160648401528651600160a060020a039094169463cb912b1e949093899389939092909160840190602085019080838360005b838110156107cc5781810151838201526020016107b4565b50505050905090810190601f1680156107f95780820380516001836020036101000a031916815260200191505b50945050505050602060405180830381600087803b15801561081a57600080fd5b505af115801561082e573d6000803e3d6000fd5b505050506040513d602081101561084457600080fd5b505190507fffffffff0000000000000000000000000000000000000000000000000000000081167fcb912b1e000000000000000000000000000000000000000000000000000000001461064a57600080fd5b600081815260208190526040812054600160a060020a03168015156108ba57600080fd5b92915050565b6000600160a060020a03821615156108d757600080fd5b50600160a060020a031660009081526002602052604090205490565b6006805460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152929183018282801561052b5780601f106105005761010080835404028352916020019161052b565b600160a060020a03821633141561096457600080fd5b336000818152600360209081526040808320600160a060020a03871680855290835292819020805460ff1916861515908117909155815190815290519293927f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31929181900390910190a35050565b6109dd338383610a8b565b5050565b600160a060020a03918216600090815260036020908152604080832093909416825291909152205460ff1690565b600090815260208190526040902054600160a060020a0316151590565b600080610a3883610896565b905080600160a060020a031684600160a060020a03161480610a73575083600160a060020a0316610a6884610533565b600160a060020a0316145b80610a835750610a8381856109e1565b949350505050565b82600160a060020a0316610a9e82610896565b600160a060020a031614610ab157600080fd5b600160a060020a0382161515610ac657600080fd5b610acf81610bb3565b600160a060020a038316600090815260026020526040902054610af990600163ffffffff610bfd16565b600160a060020a038085166000908152600260205260408082209390935590841681522054610b2f90600163ffffffff610ba616565b600160a060020a03808416600081815260026020908152604080832095909555858252819052838120805473ffffffffffffffffffffffffffffffffffffffff1916831790559251849391928716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b818101828110156108ba57fe5b600081815260016020526040902054600160a060020a031615610bfa576000818152600160205260409020805473ffffffffffffffffffffffffffffffffffffffff191690555b50565b600082821115610c0957fe5b509003905600a165627a7a72305820fd4516641e72b9245cd9ec59332d38dae59860fc29fb28933cbf477cb46c1cba0029"
    },
    transferTokenContract: {
        contractName: "transferTokenContract",
        abi: [
            {
                "constant":false,
                "inputs":[
                ],
                "name":"getResultInCon",
                "outputs":[
                    {
                        "name":"",
                        "type":"trcToken"
                    },
                    {
                        "name":"",
                        "type":"uint256"
                    },
                    {
                        "name":"",
                        "type":"uint256"
                    }],
                "payable":true,
                "stateMutability":"payable",
                "type":"function"
            },
            {
                "constant":false,
                "inputs":[
                    {
                        "name":"toAddress",
                        "type":"address"
                    },
                    {
                        "name":"id",
                        "type":"trcToken"
                    },
                    {
                        "name":"amount",
                        "type":"uint256"
                    }],
                "name":"TransferTokenTo",
                "outputs":[
                ],
                "payable":true,
                "stateMutability":"payable",
                "type":"function"
            },
            {
                "constant":false,
                "inputs":[
                ],
                "name":"msgTokenValueAndTokenIdTest",
                "outputs":[
                    {
                        "name":"",
                        "type":"trcToken"
                    },
                    {
                        "name":"",
                        "type":"uint256"
                    },
                    {
                        "name":"",
                        "type":"uint256"
                    }],
                "payable":true,
                "stateMutability":"payable",
                "type":"function"
            },
            {
                "inputs":[
                ],
                "payable":true,
                "stateMutability":"payable",
                "type":"constructor"
            }
        ],
        bytecode: "6080604052d3600055d2600155346002556101418061001f6000396000f3006080604052600436106100565763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166305c24200811461005b5780633be9ece71461008157806371dc08ce146100aa575b600080fd5b6100636100b2565b60408051938452602084019290925282820152519081900360600190f35b6100a873ffffffffffffffffffffffffffffffffffffffff600435166024356044356100c0565b005b61006361010d565b600054600154600254909192565b60405173ffffffffffffffffffffffffffffffffffffffff84169082156108fc029083908590600081818185878a8ad0945050505050158015610107573d6000803e3d6000fd5b50505050565bd3d2349091925600a165627a7a72305820a2fb39541e90eda9a2f5f9e7905ef98e66e60dd4b38e00b05de418da3154e7570029"
    },
    testRevert: {
        /*
        pragma solidity ^0.4.18;
        contract TestRevert {
            address owner;
            constructor() public {
            }
            function setOwner(address addr) public {
                require(addr != 0xb6e447d1d576dE6c7f767C32a649F0AD50aE5975, "Address forbidden :-)");
                // TSeFTBYCy3r2kZNYsj86G6Yz6rsmPdYdFs
                owner = addr;
            }
            function getOwner(uint check) public view returns (address) {
                require(check == 1, "Wrong check");
                return owner;
            }
            function getOwner2(uint check) public view returns (address) {
                require(check == 1);
                return owner;
            }
        }
        */
        contractName: "TestRevert",
        abi: [
            {
                "inputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "addr",
                        "type": "address"
                    }
                ],
                "name": "setOwner",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "check",
                        "type": "uint256"
                    }
                ],
                "name": "getOwner",
                "outputs": [
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "check",
                        "type": "uint256"
                    }
                ],
                "name": "getOwner2",
                "outputs": [
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }
        ],
        bytecode: "0x608060405234801561001057600080fd5b5061037d806100206000396000f300608060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806313af40351461005c578063877333461461009f578063c41a360a1461010c575b600080fd5b34801561006857600080fd5b5061009d600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610179565b005b3480156100ab57600080fd5b506100ca60048036038101908080359060200190929190505050610274565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561011857600080fd5b50610137600480360381019080803590602001909291905050506102ae565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b73b6e447d1d576de6c7f767c32a649f0ad50ae597573ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614151515610231576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260158152602001807f41646472657373206d75737420626520213d203078000000000000000000000081525060200191505060405180910390fd5b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b600060018214151561028557600080fd5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b6000600182141515610328576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600b8152602001807f57726f6e6720636865636b00000000000000000000000000000000000000000081525060200191505060405180910390fd5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690509190505600a165627a7a7230582070775fabe424bfe924ea8b9a9f4863306d35202b9c074f195334273994260ef20029"
    },
    testConstant: {
        contractName: "testConstantContract",
        abi: [
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "x",
                        "type": "uint256"
                    },
                    {
                        "name": "y",
                        "type": "uint256"
                    }
                ],
                "name": "testPure",
                "outputs": [
                    {
                        "name": "z",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "pure",
                "type": "function"
            }
        ],
        bytecode: "0x608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b5060e5806100396000396000f300608060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806307fb8ea6146044575b600080fd5b348015604f57600080fd5b50d38015605b57600080fd5b50d28015606757600080fd5b50608e600480360381019080803590602001909291908035906020019092919050505060a4565b6040518082815260200191505060405180910390f35b600080600190508284820101915050929150505600a165627a7a72305820ba2dba126dd3285cfaee13187fa53bf7d9bc09517d6afd04cd7d71098a1f90ee0029"
    },
    testSetVal: {
        "contractName": "SetVal",
        "abi": [
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_val",
                        "type": "uint256"
                    }
                ],
                "name": "set",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ],
        "bytecode": "0x60806040526000805534801561001457600080fd5b50d3801561002157600080fd5b50d2801561002e57600080fd5b5060e08061003d6000396000f3fe6080604052348015600f57600080fd5b50d38015601b57600080fd5b50d28015602757600080fd5b5060043610605d576000357c01000000000000000000000000000000000000000000000000000000009004806360fe47b1146062575b600080fd5b608b60048036036020811015607657600080fd5b810190808035906020019092919050505060a1565b6040518082815260200191505060405180910390f35b600081600081905550600054905091905056fea165627a7a72305820392f2cf7f1b37873349bf7ce496fb370bc80c6539de204bded6197106c530e700029"
    },
    testEmptyAbi: {
        "contractName": "SetVal",
        "abi": [],
        "bytecode": "0x60806040526000805534801561001457600080fd5b50d3801561002157600080fd5b50d2801561002e57600080fd5b5060e08061003d6000396000f3fe6080604052348015600f57600080fd5b50d38015601b57600080fd5b50d28015602757600080fd5b5060043610605d576000357c01000000000000000000000000000000000000000000000000000000009004806360fe47b1146062575b600080fd5b608b60048036036020811015607657600080fd5b810190808035906020019092919050505060a1565b6040518082815260200191505060405180910390f35b600081600081905550600054905091905056fea165627a7a72305820392f2cf7f1b37873349bf7ce496fb370bc80c6539de204bded6197106c530e700029"
    },
    arrayParam: {
        "contractName": "ArrayParam",
        "abi": [
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "balances",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "name": "addresses",
                        "type": "address[]"
                    },
                    {
                        "name": "initialBalances",
                        "type": "uint256[]"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "constructor"
            }
        ],
        "bytecode": "0x608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b506040516102a83803806102a88339810180604052604081101561004d57600080fd5b81019080805164010000000081111561006557600080fd5b8281019050602081018481111561007b57600080fd5b815185602082028301116401000000008211171561009857600080fd5b505092919060200180516401000000008111156100b457600080fd5b828101905060208101848111156100ca57600080fd5b81518560208202830111640100000000821117156100e757600080fd5b5050929190505050600082511115156100ff57600080fd5b8051825114151561010f57600080fd5b60008090505b825181101561019c57818181518110151561012c57fe5b90602001906020020151600080858481518110151561014757fe5b9060200190602002015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508080600101915050610115565b50505060fb806101ad6000396000f3fe6080604052348015600f57600080fd5b50d38015601b57600080fd5b50d28015602757600080fd5b5060043610605d576000357c01000000000000000000000000000000000000000000000000000000009004806327e235e3146062575b600080fd5b60a160048036036020811015607657600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505060b7565b6040518082815260200191505060405180910390f35b6000602052806000526040600020600091509050548156fea165627a7a723058207d447cc574baeda0c964d154c92f29b2c72be467d5118d30741788a8c03c185d0029"
    }
}
