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
            "inputs": [{
                "internalType": "address",
                "name": "_addressFounder",
                "type": "address"
            }],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        }, {
            "anonymous": false,
            "inputs": [{
                "indexed": true,
                "internalType": "address",
                "name": "_owner",
                "type": "address"
            }, {
                "indexed": true,
                "internalType": "address",
                "name": "_spender",
                "type": "address"
            }, {
                "indexed": false,
                "internalType": "uint256",
                "name": "_value",
                "type": "uint256"
            }],
            "name": "Approval",
            "type": "event"
        }, {
            "anonymous": false,
            "inputs": [{
                "indexed": true,
                "internalType": "address",
                "name": "_from",
                "type": "address"
            }, {
                "indexed": true,
                "internalType": "address",
                "name": "_to",
                "type": "address"
            }, {
                "indexed": false,
                "internalType": "uint256",
                "name": "_value",
                "type": "uint256"
            }],
            "name": "Transfer",
            "type": "event"
        }, {
            "constant": true,
            "inputs": [{
                "internalType": "address",
                "name": "",
                "type": "address"
            }, {
                "internalType": "address",
                "name": "",
                "type": "address"
            }],
            "name": "allowance",
            "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{
                "internalType": "address",
                "name": "_spender",
                "type": "address"
            }, {
                "internalType": "uint256",
                "name": "_value",
                "type": "uint256"
            }],
            "name": "approve",
            "outputs": [{
                "internalType": "bool",
                "name": "success",
                "type": "bool"
            }],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{
                "internalType": "address",
                "name": "",
                "type": "address"
            }],
            "name": "balanceOf",
            "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{
                "internalType": "uint256",
                "name": "_value",
                "type": "uint256"
            }],
            "name": "burn",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "decimals",
            "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "name",
            "outputs": [{
                "internalType": "string",
                "name": "",
                "type": "string"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{
                "internalType": "string",
                "name": "_name",
                "type": "string"
            }],
            "name": "setName",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [],
            "name": "start",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [],
            "name": "stop",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "stopped",
            "outputs": [{
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "symbol",
            "outputs": [{
                "internalType": "string",
                "name": "",
                "type": "string"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "totalSupply",
            "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{
                "internalType": "address",
                "name": "_to",
                "type": "address"
            }, {
                "internalType": "uint256",
                "name": "_value",
                "type": "uint256"
            }],
            "name": "transfer",
            "outputs": [{
                "internalType": "bool",
                "name": "success",
                "type": "bool"
            }],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{
                "internalType": "address",
                "name": "_from",
                "type": "address"
            }, {
                "internalType": "address",
                "name": "_to",
                "type": "address"
            }, {
                "internalType": "uint256",
                "name": "_value",
                "type": "uint256"
            }],
            "name": "transferFrom",
            "outputs": [{
                "internalType": "bool",
                "name": "success",
                "type": "bool"
            }],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }],
        bytecode: "60c060405260066080819052650a8e4dedcd2f60d31b60a09081526100279160009190610135565b5060408051808201909152600580825264054524332360dc1b602090920191825261005491600191610135565b5060066002819055600060055580546001600160a81b031916905534801561007b57600080fd5b50d3801561008857600080fd5b50d2801561009557600080fd5b50604051610b09380380610b09833981810160405260208110156100b857600080fd5b505160068054610100600160a81b0319163361010002179055655af3107a400060058190556001600160a01b0382166000818152600360209081526040808320859055805194855251929391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a3506101d0565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061017657805160ff19168380011785556101a3565b828001600101855582156101a3579182015b828111156101a3578251825591602001919060010190610188565b506101af9291506101b3565b5090565b6101cd91905b808211156101af57600081556001016101b9565b90565b61092a806101df6000396000f3fe608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b50600436106101045760003560e01c806370a08231116100a6578063a9059cbb11610080578063a9059cbb1461027b578063be9a6555146102a7578063c47f0027146102af578063dd62ed3e1461035557610104565b806370a082311461024557806375f12b211461026b57806395d89b411461027357610104565b806318160ddd116100e257806318160ddd146101d057806323b872dd146101ea578063313ce5671461022057806342966c681461022857610104565b806306fdde031461010957806307da68f514610186578063095ea7b314610190575b600080fd5b610111610383565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561014b578181015183820152602001610133565b50505050905090810190601f1680156101785780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b61018e610411565b005b6101bc600480360360408110156101a657600080fd5b506001600160a01b038135169060200135610439565b604080519115158252519081900360200190f35b6101d86104ee565b60408051918252519081900360200190f35b6101bc6004803603606081101561020057600080fd5b506001600160a01b038135811691602081013590911690604001356104f4565b6101d861060f565b61018e6004803603602081101561023e57600080fd5b5035610615565b6101d86004803603602081101561025b57600080fd5b50356001600160a01b03166106ac565b6101bc6106be565b6101116106c7565b6101bc6004803603604081101561029157600080fd5b506001600160a01b038135169060200135610721565b61018e6107e9565b61018e600480360360208110156102c557600080fd5b8101906020810181356401000000008111156102e057600080fd5b8201836020820111156102f257600080fd5b8035906020019184600183028401116401000000008311171561031457600080fd5b91908080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525092955061080e945050505050565b6101d86004803603604081101561036b57600080fd5b506001600160a01b038135811691602001351661083e565b6000805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156104095780601f106103de57610100808354040283529160200191610409565b820191906000526020600020905b8154815290600101906020018083116103ec57829003601f168201915b505050505081565b60065461010090046001600160a01b0316331461042a57fe5b6006805460ff19166001179055565b60065460009060ff161561044957fe5b3361045057fe5b81158061047e57503360009081526004602090815260408083206001600160a01b0387168452909152902054155b61048757600080fd5b3360008181526004602090815260408083206001600160a01b03881680855290835292819020869055805186815290519293927f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925929181900390910190a350600192915050565b60055481565b60065460009060ff161561050457fe5b3361050b57fe5b6001600160a01b03841660009081526003602052604090205482111561053057600080fd5b6001600160a01b038316600090815260036020526040902054828101101561055757600080fd5b6001600160a01b038416600090815260046020908152604080832033845290915290205482111561058757600080fd5b6001600160a01b03808416600081815260036020908152604080832080548801905593881680835284832080548890039055600482528483203384528252918490208054879003905583518681529351929391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a35060019392505050565b60025481565b3360009081526003602052604090205481111561063157600080fd5b336000818152600360209081526040808320805486900390558280527f3617319a054d772f909f7c479a2cebe5066e836a939412e32403c99029b92eff805486019055805185815290519293927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef929181900390910190a350565b60036020526000908152604090205481565b60065460ff1681565b60018054604080516020600284861615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156104095780601f106103de57610100808354040283529160200191610409565b60065460009060ff161561073157fe5b3361073857fe5b3360009081526003602052604090205482111561075457600080fd5b6001600160a01b038316600090815260036020526040902054828101101561077b57600080fd5b336000818152600360209081526040808320805487900390556001600160a01b03871680845292819020805487019055805186815290519293927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef929181900390910190a350600192915050565b60065461010090046001600160a01b0316331461080257fe5b6006805460ff19169055565b60065461010090046001600160a01b0316331461082757fe5b805161083a90600090602084019061085b565b5050565b600460209081526000928352604080842090915290825290205481565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061089c57805160ff19168380011785556108c9565b828001600101855582156108c9579182015b828111156108c95782518255916020019190600101906108ae565b506108d59291506108d9565b5090565b6108f391905b808211156108d557600081556001016108df565b9056fea26474726f6e5820b6dfbf7d9fafd8751ff6c41564fd16f53ec48884e57e72d342297d68a9a29d9564736f6c634300050f0031"
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
    },
    shieldContract: {
        contractName: "shield",
        abi: [
            {
                "inputs": [{
                    "internalType": "address",
                    "name": "trc20ContractAddress",
                    "type": "address"
                }, {
                    "internalType": "uint256",
                    "name": "scalingFactorExponent",
                    "type": "uint256"
                }],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "constructor"
            }, {
                "anonymous": false,
                "inputs": [{
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "position",
                    "type": "uint256"
                }, {
                    "indexed": false,
                    "internalType": "bytes32",
                    "name": "cm",
                    "type": "bytes32"
                }, {
                    "indexed": false,
                    "internalType": "bytes32",
                    "name": "cv",
                    "type": "bytes32"
                }, {
                    "indexed": false,
                    "internalType": "bytes32",
                    "name": "epk",
                    "type": "bytes32"
                }, {
                    "indexed": false,
                    "internalType": "bytes32[21]",
                    "name": "c",
                    "type": "bytes32[21]"
                }],
                "name": "BurnNewLeaf",
                "type": "event"
            }, {
                "anonymous": false,
                "inputs": [{
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "position",
                    "type": "uint256"
                }, {
                    "indexed": false,
                    "internalType": "bytes32",
                    "name": "cm",
                    "type": "bytes32"
                }, {
                    "indexed": false,
                    "internalType": "bytes32",
                    "name": "cv",
                    "type": "bytes32"
                }, {
                    "indexed": false,
                    "internalType": "bytes32",
                    "name": "epk",
                    "type": "bytes32"
                }, {
                    "indexed": false,
                    "internalType": "bytes32[21]",
                    "name": "c",
                    "type": "bytes32[21]"
                }],
                "name": "MintNewLeaf",
                "type": "event"
            }, {
                "anonymous": false,
                "inputs": [{
                    "indexed": false,
                    "internalType": "bytes32",
                    "name": "nf",
                    "type": "bytes32"
                }],
                "name": "NoteSpent",
                "type": "event"
            }, {
                "anonymous": false,
                "inputs": [{
                    "indexed": false,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                }, {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }, {
                    "indexed": false,
                    "internalType": "bytes32[3]",
                    "name": "ciphertext",
                    "type": "bytes32[3]"
                }],
                "name": "TokenBurn",
                "type": "event"
            }, {
                "anonymous": false,
                "inputs": [{
                    "indexed": false,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                }, {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }],
                "name": "TokenMint",
                "type": "event"
            }, {
                "anonymous": false,
                "inputs": [{
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "position",
                    "type": "uint256"
                }, {
                    "indexed": false,
                    "internalType": "bytes32",
                    "name": "cm",
                    "type": "bytes32"
                }, {
                    "indexed": false,
                    "internalType": "bytes32",
                    "name": "cv",
                    "type": "bytes32"
                }, {
                    "indexed": false,
                    "internalType": "bytes32",
                    "name": "epk",
                    "type": "bytes32"
                }, {
                    "indexed": false,
                    "internalType": "bytes32[21]",
                    "name": "c",
                    "type": "bytes32[21]"
                }],
                "name": "TransferNewLeaf",
                "type": "event"
            }, {
                "constant": false,
                "inputs": [{
                    "internalType": "bytes32[10]",
                    "name": "input",
                    "type": "bytes32[10]"
                }, {
                    "internalType": "bytes32[2]",
                    "name": "spendAuthoritySignature",
                    "type": "bytes32[2]"
                }, {
                    "internalType": "uint256",
                    "name": "rawValue",
                    "type": "uint256"
                }, {
                    "internalType": "bytes32[2]",
                    "name": "bindingSignature",
                    "type": "bytes32[2]"
                }, {
                    "internalType": "address",
                    "name": "payTo",
                    "type": "address"
                }, {
                    "internalType": "bytes32[3]",
                    "name": "burnCipher",
                    "type": "bytes32[3]"
                }, {
                    "internalType": "bytes32[9][]",
                    "name": "output",
                    "type": "bytes32[9][]"
                }, {
                    "internalType": "bytes32[21][]",
                    "name": "c",
                    "type": "bytes32[21][]"
                }],
                "name": "burn",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            }, {
                "constant": true,
                "inputs": [{
                    "internalType": "uint256",
                    "name": "position",
                    "type": "uint256"
                }],
                "name": "getPath",
                "outputs": [{
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }, {
                    "internalType": "bytes32[32]",
                    "name": "",
                    "type": "bytes32[32]"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "latestRoot",
                "outputs": [{
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "leafCount",
                "outputs": [{
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }, {
                "constant": false,
                "inputs": [{
                    "internalType": "uint256",
                    "name": "rawValue",
                    "type": "uint256"
                }, {
                    "internalType": "bytes32[9]",
                    "name": "output",
                    "type": "bytes32[9]"
                }, {
                    "internalType": "bytes32[2]",
                    "name": "bindingSignature",
                    "type": "bytes32[2]"
                }, {
                    "internalType": "bytes32[21]",
                    "name": "c",
                    "type": "bytes32[21]"
                }],
                "name": "mint",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            }, {
                "constant": true,
                "inputs": [{
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }],
                "name": "noteCommitment",
                "outputs": [{
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }, {
                "constant": true,
                "inputs": [{
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }],
                "name": "nullifiers",
                "outputs": [{
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }, {
                "constant": true,
                "inputs": [{
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }],
                "name": "roots",
                "outputs": [{
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "scalingFactor",
                "outputs": [{
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }, {
                "constant": false,
                "inputs": [{
                    "internalType": "bytes32[10][]",
                    "name": "input",
                    "type": "bytes32[10][]"
                }, {
                    "internalType": "bytes32[2][]",
                    "name": "spendAuthoritySignature",
                    "type": "bytes32[2][]"
                }, {
                    "internalType": "bytes32[9][]",
                    "name": "output",
                    "type": "bytes32[9][]"
                }, {
                    "internalType": "bytes32[2]",
                    "name": "bindingSignature",
                    "type": "bytes32[2]"
                }, {
                    "internalType": "bytes32[21][]",
                    "name": "c",
                    "type": "bytes32[21][]"
                }],
                "name": "transfer",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            }, {
                "constant": true,
                "inputs": [{
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }],
                "name": "tree",
                "outputs": [{
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }
        ],
        bytecode: "6104806040527f010000000000000000000000000000000000000000000000000000000000000060809081527f817de36ab2d57feb077634bca77819c8e0bd298c04f6fed0e6a83cc1356ca15560a0527fffe9fc03f18b176c998806439ff0bb8ad193afdb27b2ccbc88856916dd804e3460c0527fd8283386ef2ef07ebdbb4383c12a739a953a4d6e0d6fb1139a4036d693bfbb6c60e0527fe110de65c907b9dea4ae0bd83a4b0a51bea175646a64c12b4c9f931b2cb31b49610100527f912d82b2c2bca231f71efcf61737fbf0a08befa0416215aeef53e8bb6d23390a610120527f8ac9cf9c391e3fd42891d27238a81a8a5c1d3a72b1bcbea8cf44a58ce7389613610140527fd6c639ac24b46bd19341c91b13fdcab31581ddaf7f1411336a271f3d0aa52813610160527f7b99abdc3730991cc9274727d7d82d28cb794edbc7034b4f0053ff7c4b680444610180527f43ff5457f13b926b61df552d4e402ee6dc1463f99a535f9a713439264d5b616b6101a0527fba49b659fbd0b7334211ea6a9d9df185c757e70aa81da562fb912b84f49bce726101c0527f4777c8776a3b1e69b73a62fa701fa4f7a6282d9aee2c7a6b82e7937d7081c23c6101e0527fec677114c27206f5debc1c1ed66f95e2b1885da5b7be3d736b1de98579473048610200527f1b77dac4d24fb7258c3c528704c59430b630718bec486421837021cf75dab651610220527fbd74b25aacb92378a871bf27d225cfc26baca344a1ea35fdd94510f3d157082c610240527fd6acdedf95f608e09fa53fb43dcd0990475726c5131210c9e5caeab97f0e642f610260527f1ea6675f9551eeb9dfaaa9247bc9858270d3d3a4c5afa7177a984d5ed1be2451610280527f6edb16d01907b759977d7650dad7e3ec049af1a3d875380b697c862c9ec5d51c6102a0527fcd1c8dbf6e3acc7a80439bc4962cf25b9dce7c896f3a5bd70803fc5a0e33cf006102c0527f6aca8448d8263e547d5ff2950e2ed3839e998d31cbc6ac9fd57bc6002b1592166102e0527f8d5fa43e5a10d11605ac7430ba1f5d81fb1b68d29a640405767749e841527673610300527f08eeab0c13abd6069e6310197bf80f9c1ea6de78fd19cbae24d4a520e6cf3023610320527f0769557bc682b1bf308646fd0b22e648e8b9e98f57e29f5af40f6edb833e2c49610340527f4c6937d78f42685f84b43ad3b7b00f81285662f85c6a68ef11d62ad1a3ee0850610360527ffee0e52802cb0c46b1eb4d376c62697f4759f6c8917fa352571202fd778fd712610380527f16d6252968971a83da8521d65382e61f0176646d771c91528e3276ee45383e4a6103a0527fd2e1642c9a462229289e5b0e3b7f9008e0301cbb93385ee0e21da2545073cb586103c0527fa5122c08ff9c161d9ca6fc462073396c7d7d38e8ee48cdb3bea7e2230134ed6a6103e0527f28e7b841dcbc47cceb69d7cb8d94245fb7cb2ba3a7a6bc18f13f945f7dbd6e2a610400527fe1f34b034d4a3cd28557e2907ebf990c918f64ecb50a94f01d6fda5ca5c7ef72610420527f12935f14b676509b81eb49ef25f39269ed72309238b4c145803544b646dca62d610440527fb2eed031d4d6a4f02a097f80b54cc1541d4163c6b6f5971f88b6e41d35c5381461046052620004b390602890602062000580565b50348015620004c157600080fd5b50d38015620004cf57600080fd5b50d28015620004dd57600080fd5b506040516200354738038062003547833981016040819052620005009162000615565b604d811062000546576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016200053d90620006b5565b60405180910390fd5b600a0a60005560488054336001600160a01b031991821617909155604980549091166001600160a01b039290921691909117905562000713565b8260208101928215620005b1579160200282015b82811115620005b157825182559160200191906001019062000594565b50620005bf929150620005c3565b5090565b620005e091905b80821115620005bf5760008155600101620005ca565b90565b8051620005f081620006ee565b620005fb81620006d0565b9392505050565b80516200060f8162000708565b92915050565b600080604083850312156200062957600080fd5b6000620006378585620005e3565b92505060206200064a8582860162000602565b9150509250929050565b600062000663602a83620006c7565b7f546865207363616c696e67466163746f724578706f6e656e74206973206f757481527f206f662072616e67652100000000000000000000000000000000000000000000602082015260400192915050565b602080825281016200060f8162000654565b90815260200190565b60006001600160a01b0382166200060f565b6001600160a81b031690565b620006f981620006e2565b81146200070557600080fd5b50565b620006f981620005e0565b612e2480620007236000396000f3fe608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b50600436106100c35760003560e01c80639110a55b1161008b5780639110a55b14610134578063ae6dead714610147578063cc1058751461015a578063d7b0fef11461016d578063e176507314610175578063ed3437f814610196576100c3565b80632997e86b146100c85780632a6bb45a146100f157806330e69fc314610104578063313529361461010c578063855d175e1461011f575b600080fd5b6100db6100d6366004611c30565b61019e565b6040516100e89190612a7d565b60405180910390f35b6100db6100ff366004611c30565b6101b0565b6100db6101c2565b6100db61011a366004611c30565b6101c8565b61013261012d366004611c6c565b6101da565b005b610132610142366004611a3d565b6105a9565b6100db610155366004611c30565b610bd4565b610132610168366004611b22565b610be6565b6100db61106c565b610188610183366004611c30565b611072565b6040516100e8929190612a8b565b6100db6111c5565b60036020526000908152604090205481565b60066020526000908152604090205481565b60015481565b60056020526000908152604090205481565b6049546040516323b872dd60e01b815233916000916001600160a01b03909116906323b872dd9061021390859030908b90600401612852565b602060405180830381600087803b15801561022d57600080fd5b505af1158015610241573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052506102659190810190611c12565b90508061028d5760405162461bcd60e51b815260040161028490612ad8565b60405180910390fd5b8435600090815260066020526040902054156102bb5760405162461bcd60e51b815260040161028490612b58565b60006102c6876111cb565b905060006002308389886040516020016102e394939291906127fc565b60408051601f19818403018152908290526102fd91612846565b602060405180830381855afa15801561031a573d6000803e3d6000fd5b5050506040513d601f19601f8201168201806040525061033d9190810190611c4e565b90506060630100000188888585600760015460405161036196959493929190612a1d565b600060405180830381855afa15801561037e573d6000803e3d6000fd5b5050503d80600081146103ad576040519150601f19603f3d011682016040523d82523d6000602084013e6103b2565b606091505b5090506000816000815181106103c457fe5b602002602001015160001c9050806001146103f15760405162461bcd60e51b815260040161028490612b68565b60008260018151811061040057fe5b60209081029190910181015160015463ffffffff016000818152600590935260409092208c359055915081610435578a356007555b60015b826001018110156104aa576002600019830104915084816001018151811061045c57fe5b60200260200101516005600084815260200190815260200160002081905550828114156104a2576000828152600560205260409020546007846021811061049f57fe5b01555b600101610438565b508382600201815181106104ba57fe5b60209081029190910181015160028190556000818152600490925260408220558b906020020135600660008d81602090810291909101358252810191909152604001600090812091909155600180548082019091557fbe22cbc129fd01d04b02a7b3258b72e8c8ae5bfcf054d7f0359779be627a6b27918d9060200201358d600160200201358e600260200201358d60405161055a959493929190612bb8565b60405180910390a17f36bf5aa3964be01dbd95a0154a8930793fe68353bdc580871ffb2c911366bbc7888d60405161059392919061287a565b60405180910390a1505050505050505050505050565b600188108015906105bb575060028811155b6105d75760405162461bcd60e51b815260040161028490612b98565b8786146105f65760405162461bcd60e51b815260040161028490612b08565b60018410801590610608575060028411155b6106245760405162461bcd60e51b815260040161028490612b18565b8381146106435760405162461bcd60e51b815260040161028490612b38565b60005b8881101561070757600360008b8b8481811061065e57fe5b905061014002016000600a811061067157fe5b60200201358152602001908152602001600020546000801b146106a65760405162461bcd60e51b815260040161028490612ba8565b600460008b8b848181106106b657fe5b905061014002016001600a81106106c957fe5b60200201358152602001908152602001600020546000801b14156106ff5760405162461bcd60e51b815260040161028490612af8565b600101610646565b5060005b84811015610773576006600087878481811061072357fe5b9050610120020160006009811061073657fe5b60200201358152602001908152602001600020546000801b1461076b5760405162461bcd60e51b815260040161028490612ae8565b60010161070b565b5060006002308b8b898988886040516020016107959796959493929190612751565b60408051601f19818403018152908290526107af91612846565b602060405180830381855afa1580156107cc573d6000803e3d6000fd5b5050506040513d601f19601f820116820180604052506107ef9190810190611c4e565b9050606063010000028b8b8b8b8b8b8b896000600760015460405161081e9b9a999897969594939291906128bd565b600060405180830381855afa15801561083b573d6000803e3d6000fd5b5050503d806000811461086a576040519150601f19603f3d011682016040523d82523d6000602084013e61086f565b606091505b50905060008160008151811061088157fe5b602002602001015160001c9050806001146108ae5760405162461bcd60e51b815260040161028490612b68565b600160005b888110156109d95760008483806001019450815181106108cf57fe5b602090810291909101015160015490915063ffffffff018b8b848181106108f257fe5b9050610120020160006009811061090557fe5b60008381526005602090815260409091209102919091013590558161094c578b8b8481811061093057fe5b9050610120020160006009811061094357fe5b60200201356007555b60015b826001018110156109c4576002600019830104915086858060010196508151811061097657fe5b60200260200101516005600084815260200190815260200160002081905550828114156109bc57600082815260056020526040902054600784602181106109b957fe5b01555b60010161094f565b505060018054810181559190910190506108b3565b508281815181106109e657fe5b60209081029190910181015160028190556000818152600490925260408220555b8c811015610a8f5760008e8e83818110610a1d57fe5b905061014002016000600a8110610a3057fe5b602002013590508060036000838152602001908152602001600020819055507fd13faa8100906cf559aebacf9c16532cfc9708645c198c8f15798ee049dbcfc181604051610a7e9190612a7d565b60405180910390a150600101610a07565b5060005b88811015610bc457898982818110610aa757fe5b90506101200201600060098110610aba57fe5b6020020135600660008c8c85818110610acf57fe5b90506101200201600060098110610ae257fe5b60200201358152602001908152602001600020819055507f0f190e6ff1f0e1c1f4ec51aecdafdd02278c568898b57df5ca7dccba83a8181c818b8b905003600154038b8b84818110610b3057fe5b90506101200201600060098110610b4357fe5b60200201358c8c85818110610b5457fe5b90506101200201600160098110610b6757fe5b60200201358d8d86818110610b7857fe5b90506101200201600260098110610b8b57fe5b60200201358b8b87818110610b9c57fe5b90506102a00201604051610bb4959493929190612bb8565b60405180910390a1600101610a93565b5050505050505050505050505050565b60046020526000908152604090205481565b6000610bf1896111cb565b905060006002308d888888888e89604051602001610c16989796959493929190612795565b60408051601f1981840301815290829052610c3091612846565b602060405180830381855afa158015610c4d573d6000803e3d6000fd5b5050506040513d601f19601f82011682018060405250610c709190810190611c4e565b8c356000818152600360209081526040909120549293509091908e01359015610cab5760405162461bcd60e51b815260040161028490612ba8565b600081815260046020526040902054610cd65760405162461bcd60e51b815260040161028490612af8565b6001871115610cf75760405162461bcd60e51b815260040161028490612b28565b868514610d165760405162461bcd60e51b815260040161028490612b88565b86610d9d57600063010000038f8f878f88604051610d389594939291906129cc565b602060405180830381855afa158015610d55573d6000803e3d6000fd5b5050506040513d601f19601f82011682018060405250610d789190810190611c12565b905080610d975760405162461bcd60e51b815260040161028490612b68565b50610f21565b610f218e600a806020026040519081016040528092919082600a60200280828437600081840152601f19601f8201169050808301925050505050508e6002806020026040519081016040528092919082600260200280828437600081840152601f19601f820116905080830192505050505050868e6002806020026040519081016040528092919082600260200280828437600081840152601f19601f820116905080830192505050505050878d8d808060200260200160405190810160405280939291908181526020016000905b82821015610eae576040805161012081810190925290808402870190600990839083908082843760009201919091525050508152600190910190602001610e6c565b50505050508c8c808060200260200160405190810160405280939291908181526020016000905b82821015610f1757604080516102a081810190925290808402870190601590839083908082843760009201919091525050508152600190910190602001610ed5565b505050505061124e565b60008281526003602052604090819020839055517fd13faa8100906cf559aebacf9c16532cfc9708645c198c8f15798ee049dbcfc190610f62908490612a7d565b60405180910390a16000604960009054906101000a90046001600160a01b03166001600160a01b031663a9059cbb8c8f6040518363ffffffff1660e01b8152600401610faf92919061287a565b602060405180830381600087803b158015610fc957600080fd5b505af1158015610fdd573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052506110019190810190611c12565b9050806110205760405162461bcd60e51b815260040161028490612b48565b7f1daf70c304f467a9efbc9ac1ca7bfe859a478aa6c4b88131b4dbb1547029b9728b8e8c60405161105393929190612895565b60405180910390a1505050505050505050505050505050565b60025481565b600061107c611842565b600154831061109d5760405162461bcd60e51b815260040161028490612b78565b63ffffffff83016110ac611842565b60006110b7866115ab565b905060006110c587836115fa565b905060005b60208163ffffffff1610156111b4578263ffffffff168163ffffffff16141561110d57818482601f0363ffffffff166020811061110357fe5b60200201526111a2565b600285066111415760056000600187038152602001908152602001600020548482601f0363ffffffff166020811061110357fe5b60018501600090815260056020526040902054156111715760018501600090815260056020526040902054611187565b60288163ffffffff166020811061118457fe5b01545b8482601f0363ffffffff166020811061119c57fe5b60200201525b600260001986010494506001016110ca565b505060025494509092505050915091565b60005481565b60008082116111ec5760405162461bcd60e51b815260040161028490612ac8565b60005461120090839063ffffffff61174c16565b1561121d5760405162461bcd60e51b815260040161028490612ab8565b6000805461123290849063ffffffff61179516565b9050677fffffffffffffff811061124857600080fd5b92915050565b60008260008151811061125d57fe5b602002602001015160006009811061127157fe5b6020020151905060066000828152602001908152602001600020546000801b146112ad5760405162461bcd60e51b815260040161028490612ae8565b604080516001808252818301909252606091816020015b6112cc611861565b8152602001906001900390816112c457905050905088816000815181106112ef57fe5b6020908102919091010152604080516001808252818301909252606091816020015b611319611880565b815260200190600190039081611311579050509050888160008151811061133c57fe5b6020026020010181905250606063010000028383888b8b8e600760015460405161136d98979695949392919061294e565b600060405180830381855afa15801561138a573d6000803e3d6000fd5b5050503d80600081146113b9576040519150601f19603f3d011682016040523d82523d6000602084013e6113be565b606091505b5090506000816000815181106113d057fe5b602002602001015160001c9050806001146113fd5760405162461bcd60e51b815260040161028490612b68565b60008260018151811061140c57fe5b60209081029190910181015160015463ffffffff016000818152600590935260409092208890559150816114405760078790555b60015b826001018110156114b5576002600019830104915084816001018151811061146757fe5b60200260200101516005600084815260200190815260200160002081905550828114156114ad57600082815260056020526040902054600784602181106114aa57fe5b01555b600101611443565b508382600201815181106114c557fe5b602090810291909101810151600281905560008181526004835260408082209290925589815260069092528120889055600180548082019091558a517f3814d251636df4a739162facca3862684b45af01ce54bcc56ea488fa6a69412d928a918d919061152e57fe5b602002602001015160016009811061154257fe5b60200201518c60008151811061155457fe5b602002602001015160026009811061156857fe5b60200201518c60008151811061157a57fe5b6020026020010151604051611593959493929190612bfb565b60405180910390a15050505050505050505050505050565b60015460009063ffffffff83019063fffffffe01825b60026000198301046002600019850104146115f25760026000198401049250600260001983010491506001016115c1565b949350505050565b60015463fffffffe0160008181526005602052604081205490918291829163ffffffff8088019290871661167b578183101561163c5794506112489350505050565b8183141561167b576002830661166b575050600019016000908152600560205260409020549250611248915050565b5050602854935061124892505050565b60005b8763ffffffff168163ffffffff16101561174057600283066116ba576000198301600090815260056020526040902054955090935083906116d5565b81955060288163ffffffff16602081106116d057fe5b015494505b63010000048187876040516116ec93929190612c3e565b602060405180830381855afa158015611709573d6000803e3d6000fd5b5050506040513d601f19601f8201168201806040525061172c9190810190611c4e565b91506002600019840104925060010161167e565b50979650505050505050565b600061178e83836040518060400160405280601881526020017f536166654d6174683a206d6f64756c6f206279207a65726f00000000000000008152506117d7565b9392505050565b600061178e83836040518060400160405280601a81526020017f536166654d6174683a206469766973696f6e206279207a65726f00000000000081525061180b565b600081836117f85760405162461bcd60e51b81526004016102849190612aa7565b5082848161180257fe5b06949350505050565b6000818361182c5760405162461bcd60e51b81526004016102849190612aa7565b50600083858161183857fe5b0495945050505050565b6040518061040001604052806020906020820280388339509192915050565b604051806101400160405280600a906020820280388339509192915050565b60405180604001604052806002906020820280388339509192915050565b80356118a981612d93565b61178e81612cbd565b60008083601f8401126118c457600080fd5b50813567ffffffffffffffff8111156118dc57600080fd5b602083019150836101408202830111156118f557600080fd5b9250929050565b60008083601f84011261190e57600080fd5b50813567ffffffffffffffff81111561192657600080fd5b602083019150836102a08202830111156118f557600080fd5b60008083601f84011261195157600080fd5b50813567ffffffffffffffff81111561196957600080fd5b6020830191508360408202830111156118f557600080fd5b60008083601f84011261199357600080fd5b50813567ffffffffffffffff8111156119ab57600080fd5b602083019150836101208202830111156118f557600080fd5b80610140810183101561124857600080fd5b806102a0810183101561124857600080fd5b806040810183101561124857600080fd5b806060810183101561124857600080fd5b80610120810183101561124857600080fd5b805161124881612daa565b803561124881612db3565b805161124881612db3565b600080600080600080600080600060c08a8c031215611a5b57600080fd5b893567ffffffffffffffff811115611a7257600080fd5b611a7e8c828d016118b2565b995099505060208a013567ffffffffffffffff811115611a9d57600080fd5b611aa98c828d0161193f565b975097505060408a013567ffffffffffffffff811115611ac857600080fd5b611ad48c828d01611981565b95509550506060611ae78c828d016119e8565b93505060a08a013567ffffffffffffffff811115611b0457600080fd5b611b108c828d016118fc565b92509250509295985092959850929598565b6000806000806000806000806000806102a08b8d031215611b4257600080fd5b6000611b4e8d8d6119c4565b9a5050610140611b608d828e016119e8565b995050610180611b728d828e01611a27565b9850506101a0611b848d828e016119e8565b9750506101e0611b968d828e0161189e565b965050610200611ba88d828e016119f9565b9550506102608b013567ffffffffffffffff811115611bc657600080fd5b611bd28d828e01611981565b94509450506102808b013567ffffffffffffffff811115611bf257600080fd5b611bfe8d828e016118fc565b92509250509295989b9194979a5092959850565b600060208284031215611c2457600080fd5b60006115f28484611a1c565b600060208284031215611c4257600080fd5b60006115f28484611a27565b600060208284031215611c6057600080fd5b60006115f28484611a32565b6000806000806104208587031215611c8357600080fd5b6000611c8f8787611a27565b9450506020611ca087828801611a0a565b935050610140611cb2878288016119e8565b925050610180611cc4878288016119d6565b91505092959194509250565b6000611cdc838361203e565b50506101400190565b6000611cdc838361204f565b6000611cfd83836120a3565b50506102a00190565b6000611d1283836120fc565b505060400190565b6000611d128383612154565b6000611d32838361224b565b50506101200190565b6000611d328383612258565b6000611d5383836122a4565b505060200190565b611d6481612cbd565b82525050565b611d64611d7682612cbd565b612d55565b6000611d878385612cab565b9350611d9282612c59565b8060005b85811015611dc857611da88284612cb9565b611db28882611cd0565b9750611dbd83612c8a565b925050600101611d96565b509495945050505050565b6000611ddf8385612cb4565b9350611dea82612c59565b8060005b85811015611dc857611e008284612cb9565b611e0a8882611cd0565b9750611e1583612c8a565b925050600101611dee565b6000611e2b82612c62565b611e358185612cab565b9350611e4083612c5c565b8060005b83811015611dc8578151611e588882611ce5565b9750611e6383612c5c565b925050600101611e44565b6000611e7a8385612cb4565b9350611e8582612c59565b8060005b85811015611dc857611e9b8284612cb9565b611ea58882611cf1565b9750611eb083612c91565b925050600101611e89565b6000611ec78385612cab565b9350611ed282612c59565b8060005b85811015611dc857611ee88284612cb9565b611ef28882611d06565b9750611efd83612c98565b925050600101611ed6565b6000611f1382612c62565b611f1d8185612cab565b9350611f2883612c5c565b8060005b83811015611dc8578151611f408882611d1a565b9750611f4b83612c5c565b925050600101611f2c565b6000611f628385612cab565b9350611f6d82612c59565b8060005b85811015611dc857611f838284612cb9565b611f8d8882611d26565b9750611f9883612c9e565b925050600101611f71565b6000611faf8385612cb4565b9350611fba82612c59565b8060005b85811015611dc857611fd08284612cb9565b611fda8882611d26565b9750611fe583612c9e565b925050600101611fbe565b6000611ffb82612c62565b6120058185612cab565b935061201083612c5c565b8060005b83811015611dc85781516120288882611d3b565b975061203383612c5c565b925050600101612014565b61204b6101408383612d06565b5050565b61205881612c66565b6120628184612cb4565b925061206d82612c59565b8060005b8381101561209b5781516120858782611d47565b965061209083612c5c565b925050600101612071565b505050505050565b61204b6102a08383612d06565b6120b981612c6c565b6120c38184612cb4565b92506120ce82612c59565b8060005b8381101561209b5781516120e68782611d47565b96506120f183612c5c565b9250506001016120d2565b61204b60408383612d06565b61211181612c72565b61211b8184612cb4565b925061212682612c59565b8060005b8381101561209b57815161213e8782611d47565b965061214983612c5c565b92505060010161212a565b61215d81612c72565b6121678184612cb4565b925061217282612c59565b8060005b8381101561209b57815161218a8782611d47565b965061219583612c5c565b925050600101612176565b6121a981612c78565b6121b38184612cb4565b92506121be82612c59565b8060005b8381101561209b5781516121d68782611d47565b96506121e183612c5c565b9250506001016121c2565b6121f581612c7e565b6121ff8184612cb4565b925061220a82612c59565b8060005b8381101561209b5761221f82612d71565b6122298782611d47565b965061223483612ca5565b92505060010161220e565b61204b60608383612d06565b61204b6101208383612d06565b61226181612c84565b61226b8184612cb4565b925061227682612c59565b8060005b8381101561209b57815161228e8782611d47565b965061229983612c5c565b92505060010161227a565b611d6481612c59565b60006122b882612c62565b6122c28185612cb4565b93506122d2818560208601612d12565b9290920192915050565b611d6481612cfb565b60006122f082612c62565b6122fa8185612cab565b935061230a818560208601612d12565b61231381612d7d565b9093019392505050565b600061232a603183612cab565b7f56616c7565206d75737420626520696e7465676572206d756c7469706c6573208152706f66207363616c696e67466163746f722160781b602082015260400192915050565b600061237d601783612cab565b7f56616c7565206d75737420626520706f73697469766521000000000000000000815260200192915050565b60006123b6601483612cab565b735472616e7366657246726f6d206661696c65642160601b815260200192915050565b60006123e6601983612cab565b7f4475706c6963617465206e6f7465436f6d6d69746d656e742100000000000000815260200192915050565b600061241f601683612cab565b7554686520616e63686f72206d7573742065786973742160501b815260200192915050565b6000612451603d83612cab565b7f496e707574206e756d626572206d75737420626520657175616c20746f20737081527f656e64417574686f726974795369676e6174757265206e756d62657221000000602082015260400192915050565b60006124b0601d83612cab565b7f4f7574707574206e756d626572206d7573742062652031206f72203221000000815260200192915050565b60006124e9601e83612cab565b7f4f7574707574206e756d6265722063616e6e6f74206578636565642031210000815260200192915050565b6000612522602883612cab565b7f4f7574707574206e756d626572206d75737420626520657175616c20746f2063815267206e756d6265722160c01b602082015260400192915050565b600061256c601083612cab565b6f5472616e73666572206661696c65642160801b815260200192915050565b6000612598601a83612cab565b7f4475706c6963617465206e6f7465436f6d6d69746d656e747321000000000000815260200192915050565b60006125d1603f83612cab565b7f5468652070726f6f6620616e64207369676e61747572652068617665206e6f7481527f206265656e2076657269666965642062792074686520636f6e74726163742100602082015260400192915050565b6000612630602a83612cab565b7f506f736974696f6e2073686f756c6420626520736d616c6c6572207468616e208152696c656166436f756e742160b01b602082015260400192915050565b600061267c602b83612cab565b7f4f7574707574206e756d626572206d75737420626520657175616c20746f206c81526a656e677468206f6620632160a81b602082015260400192915050565b60006126c9601c83612cab565b7f496e707574206e756d626572206d7573742062652031206f7220322100000000815260200192915050565b6000612702602083612cab565b7f546865206e6f74652068617320616c7265616479206265656e207370656e7421815260200192915050565b611d6481612ce5565b611d6481612cee565b611d6461274c82612cee565b612d66565b600061275d828a611d6a565b60148201915061276e82888a611dd3565b915061277b828688611fa3565b9150612788828486611e6e565b9998505050505050505050565b60006127a1828b611d6a565b6014820191506127b1828a61203e565b610140820191506127c382888a611fa3565b91506127d0828688611e6e565b91506127dc8285611d6a565b6014820191506127ec8284612740565b5060080198975050505050505050565b60006128088287611d6a565b6014820191506128188286612740565b600882019150612828828561224b565b6101208201915061283982846120a3565b506102a001949350505050565b600061178e82846122ad565b606081016128608286611d5b565b61286d6020830185611d5b565b6115f260408301846122a4565b604081016128888285611d5b565b61178e60208301846122a4565b60a081016128a38286611d5b565b6128b060208301856122a4565b6115f2604083018461223f565b61052080825281016128d0818d8f611d7b565b905081810360208301526128e5818b8d611ebb565b905081810360408301526128fa81898b611f56565b905061290960608301886120fc565b61291660a08301876122a4565b61292360c08301866122dc565b61293060e08301856121ec565b61293e6105008301846122a4565b9c9b505050505050505050505050565b6105208082528101612960818b611e20565b90508181036020830152612974818a611f08565b905081810360408301526129888189611ff0565b90506129976060830188612108565b6129a460a08301876122a4565b6129b160c0830186612737565b6129be60e08301856121ec565b6127886105008301846122a4565b61020081016129db828861203e565b6129e96101408301876120fc565b6129f7610180830186612737565b612a056101a08301856120fc565b612a136101e08301846122a4565b9695505050505050565b6105e08101612a2c828961224b565b612a3a6101208301886120fc565b612a48610160830187612737565b612a566101808301866122a4565b612a646101a08301856121ec565b612a726105c08301846122a4565b979650505050505050565b6020810161124882846122a4565b6104208101612a9a82856122a4565b61178e60208301846121a0565b6020808252810161178e81846122e5565b602080825281016112488161231d565b6020808252810161124881612370565b60208082528101611248816123a9565b60208082528101611248816123d9565b6020808252810161124881612412565b6020808252810161124881612444565b60208082528101611248816124a3565b60208082528101611248816124dc565b6020808252810161124881612515565b602080825281016112488161255f565b602080825281016112488161258b565b60208082528101611248816125c4565b6020808252810161124881612623565b602080825281016112488161266f565b60208082528101611248816126bc565b60208082528101611248816126f5565b6103208101612bc782886122a4565b612bd460208301876122a4565b612be160408301866122a4565b612bee60608301856122a4565b612a1360808301846120a3565b6103208101612c0a82886122a4565b612c1760208301876122a4565b612c2460408301866122a4565b612c3160608301856122a4565b612a1360808301846120b0565b60608101612c4c828661272e565b61286d60208301856122a4565b90565b60200190565b5190565b50600a90565b50601590565b50600290565b50602090565b50602190565b50600990565b6101400190565b6102a00190565b60400190565b6101200190565b60010190565b90815260200190565b919050565b5090565b600061124882612ccd565b151590565b6001600160a01b031690565b6001600160a81b031690565b63ffffffff1690565b67ffffffffffffffff1690565b600061124882612cee565b82818337506000910152565b60005b83811015612d2d578181015183820152602001612d15565b83811115612d3c576000848401525b50505050565b6000611248612d5083612c59565b612c59565b600061124882600061124882612d8d565b600061124882612d87565b60006112488254612d42565b601f01601f191690565b60c01b90565b60601b90565b612d9c81612cd9565b8114612da757600080fd5b50565b612d9c81612cc8565b612d9c81612c5956fea36474726f6e58207ef421e01e827fa1d2e384579b655503e18aef0f4bf9ff3e5176a254c97da9036c6578706572696d656e74616cf564736f6c637828302e352e31322d646576656c6f702e323032302e362e31352b636f6d6d69742e34323336323638380065"
    },
    fallbackOldVersionTest: {
        contractName: "Test0",
        abi:[{
            "anonymous": false,
            "inputs": [{
                "indexed": false,
                "internalType": "string",
                "name": "data",
                "type": "string"
            }, {
                "indexed": false,
                "internalType": "bytes",
                "name": "msg",
                "type": "bytes"
            }],
            "name": "FallbackCall",
            "type": "event"
        }, {
            "payable": true,
            "stateMutability": "payable",
            "type": "fallback"
        }],
        bytecode:"608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b506101d98061003a6000396000f3fe60c0604052600860808190526766616c6c6261636b60c01b60a0908152610029916000919061010a565b506040805181815260008054600260001961010060018416150201909116049282018390527f1f0af026fd1015e37743a803fa8c7b92c09a6fc99890b1681a1e3c888427c25e9290918291369190819060208201906060830190869080156100d25780601f106100a7576101008083540402835291602001916100d2565b820191906000526020600020905b8154815290600101906020018083116100b557829003601f168201915b50508381038252848152602001858580828437600083820152604051601f909101601f191690920182900397509095505050505050a1005b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061014b57805160ff1916838001178555610178565b82800160010185558215610178579182015b8281111561017857825182559160200191906001019061015d565b50610184929150610188565b5090565b6101a291905b80821115610184576000815560010161018e565b9056fea26474726f6e5820e77b862582c00095aa34fd5c2839c0d8f209bdac194c0adeec660fa15a08fbe464736f6c634300050f0031"
    },
    fallbackOldversionCall: {
        contractName: "Call",
        abi:[{
            "constant": false,
            "inputs": [{
                "internalType": "contract Test0",
                "name": "test",
                "type": "address"
            }],
            "name": "call",
            "outputs": [{
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        }],
        bytecode:"608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b506101748061003a6000396000f3fe60806040526004361061001e5760003560e01c8063f55332ab14610023575b600080fd5b6100496004803603602081101561003957600080fd5b50356001600160a01b031661005d565b604080519115158252519081900360200190f35b60408051600481526024810182526020810180516001600160e01b031663f85396d760e01b1781529151815160009384936001600160a01b038716939092909182918083835b602083106100c25780518252601f1990920191602091820191016100a3565b6001836020036101000a0380198251168184511680821785525050505050509050019150506000604051808303816000865af19150503d8060008114610124576040519150601f19603f3d011682016040523d82523d6000602084013e610129565b606091505b505090508061013757600080fd5b5060019291505056fea26474726f6e58203498e1c23a661ae640e44836405d25839850ec79748cabd2dab945fd13ee0c7c64736f6c634300050f0031"
    },
    Caller: {
        contractName: "Caller",
        abi:[{
            "inputs": [{
                "internalType": "contract Test0",
                "name": "test",
                "type": "address"
            }],
            "name": "callTest0",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "inputs": [{
                "internalType": "address",
                "name": "test",
                "type": "address"
            }],
            "name": "callTest1",
            "outputs": [{
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }],
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "inputs": [{
                "internalType": "address",
                "name": "test",
                "type": "address"
            }],
            "name": "callTest2",
            "outputs": [{
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }],
            "stateMutability": "payable",
            "type": "function"
        }, {
            "inputs": [{
                "internalType": "contract TestPayable",
                "name": "test",
                "type": "address"
            }],
            "name": "callTestPayable1",
            "outputs": [{
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }],
            "stateMutability": "payable",
            "type": "function"
        }],
        bytecode:"608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b5061045e8061003a6000396000f3fe60806040526004361061003f5760003560e01c80637b09404c1461004457806381cd8690146100a557806383d9d8e2146100cb578063fd8a3f72146100e1575b600080fd5b34801561005057600080fd5b50d3801561005d57600080fd5b50d2801561006a57600080fd5b506100916004803603602081101561008157600080fd5b50356001600160a01b0316610130565b604080519115158252519081900360200190f35b610091600480360360208110156100bb57600080fd5b50356001600160a01b031661026e565b6100916004803603602081101561008157600080fd5b3480156100ed57600080fd5b50d380156100fa57600080fd5b50d2801561010757600080fd5b5061012e6004803603602081101561011e57600080fd5b50356001600160a01b031661034d565b005b60408051600481526024810182526020810180516001600160e01b031663f85396d760e01b1781529151815160009384936001600160a01b038716939092909182918083835b602083106101955780518252601f199092019160209182019101610176565b6001836020036101000a0380198251168184511680821785525050505050509050019150506000604051808303816000865af19150503d80600081146101f7576040519150601f19603f3d011682016040523d82523d6000602084013e6101fc565b606091505b505090508061020a57600080fd5b6040516001600160a01b03841690600081818181865af19150503d8060008114610250576040519150601f19603f3d011682016040523d82523d6000602084013e610255565b606091505b5050809150508061026557600080fd5b50600192915050565b60408051600481526024810182526020810180516001600160e01b031663f85396d760e01b1781529151815160009384936001600160a01b038716936103e893919290918291908083835b602083106102d85780518252601f1990920191602091820191016102b9565b6001836020036101000a03801982511681845116808217855250505050505090500191505060006040518083038185875af1925050503d806000811461033a576040519150601f19603f3d011682016040523d82523d6000602084013e61033f565b606091505b505090508061026557600080fd5b60408051600481526024810182526020810180516001600160e01b031663f85396d760e01b178152915181516000936001600160a01b0386169392918291908083835b602083106103af5780518252601f199092019160209182019101610390565b6001836020036101000a0380198251168184511680821785525050505050509050019150506000604051808303816000865af19150503d8060008114610411576040519150601f19603f3d011682016040523d82523d6000602084013e610416565b606091505b505090508061042457600080fd5b505056fea2646970667358221220a8ba92701840ebc55cfbea4dde793d8c6d1dea0ad717bb4b990a64ad6a3f6d6a64736f6c63430006000033"
    },
    Test0: {
        contractName: "Test0",
        abi:[{
            "anonymous": false,
            "inputs": [{
                "indexed": false,
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
            }, {
                "indexed": false,
                "internalType": "uint256",
                "name": "a",
                "type": "uint256"
            }],
            "name": "FuncCalled",
            "type": "event"
        }],
        bytecode:"6080604052348015600f57600080fd5b50d38015601b57600080fd5b50d28015602757600080fd5b50603f8060356000396000f3fe6080604052600080fdfea264697066735822122024bb1ec3ccbbf5f175773883eecb29e15f63a9ac8ea21b2b896824c218b5e4ac64736f6c63430006000033"
    },
    Test1: {
        contractName: "Test1",
        abi:[{
            "anonymous": false,
            "inputs": [{
                "indexed": false,
                "internalType": "string",
                "name": "a",
                "type": "string"
            }],
            "name": "FuncCalled",
            "type": "event"
        }, {
            "stateMutability": "nonpayable",
            "type": "fallback"
        }],
        bytecode:"608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b506101db8061003a6000396000f3fe608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b506040805180820190915260088082526766616c6c6261636b60c01b602090920191825261005a9160009161010a565b5060408051602080825260008054600260001961010060018416150201909116049183018290527f10c0f70f19b90dec441dc2d497deea85691c944270c9b00cb5743d55f60644ec939092918291820190849080156100fa5780601f106100cf576101008083540402835291602001916100fa565b820191906000526020600020905b8154815290600101906020018083116100dd57829003601f168201915b50509250505060405180910390a1005b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061014b57805160ff1916838001178555610178565b82800160010185558215610178579182015b8281111561017857825182559160200191906001019061015d565b50610184929150610188565b5090565b6101a291905b80821115610184576000815560010161018e565b9056fea2646970667358221220ffc66ea2b1cb16a6d7d26da40c280f75e73eac93c7e707ce82e6b2a42af6d67e64736f6c63430006000033"
    },
    Test2: {
        contractName: "Test2",
        abi:[{
            "anonymous": false,
            "inputs": [{
                "indexed": false,
                "internalType": "string",
                "name": "data",
                "type": "string"
            }],
            "name": "FuncCalled",
            "type": "event"
        }, {
            "stateMutability": "payable",
            "type": "fallback"
        }],
        bytecode:"608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b506101aa8061003a6000396000f3fe60c0604052600860808190526766616c6c6261636b60c01b60a090815261002991600091906100d9565b5060408051602080825260008054600260001961010060018416150201909116049183018290527f10c0f70f19b90dec441dc2d497deea85691c944270c9b00cb5743d55f60644ec939092918291820190849080156100c95780601f1061009e576101008083540402835291602001916100c9565b820191906000526020600020905b8154815290600101906020018083116100ac57829003601f168201915b50509250505060405180910390a1005b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061011a57805160ff1916838001178555610147565b82800160010185558215610147579182015b8281111561014757825182559160200191906001019061012c565b50610153929150610157565b5090565b61017191905b80821115610153576000815560010161015d565b9056fea2646970667358221220f97a67f88304f8e5520cb93af2e3fbb6382554f5af816510e623146ae22df8b464736f6c63430006000033"
    },
    TestPayable: {
        contractName: "TestPayable",
        abi:[{
            "anonymous": false,
            "inputs": [{
                "indexed": false,
                "internalType": "string",
                "name": "a",
                "type": "string"
            }],
            "name": "FuncCalled",
            "type": "event"
        }, {
            "stateMutability": "payable",
            "type": "fallback"
        }, {
            "stateMutability": "payable",
            "type": "receive"
        }],
        bytecode:"608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b506101e38061003a6000396000f3fe6080604052366100e757604080518082019091526007808252667265636569766560c81b602090920191825261003791600091610112565b5060408051602080825260008054600260001961010060018416150201909116049183018290527f10c0f70f19b90dec441dc2d497deea85691c944270c9b00cb5743d55f60644ec939092918291820190849080156100d75780601f106100ac576101008083540402835291602001916100d7565b820191906000526020600020905b8154815290600101906020018083116100ba57829003601f168201915b50509250505060405180910390a1005b6040805180820190915260088082526766616c6c6261636b60c01b6020909201918252610037916000915b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061015357805160ff1916838001178555610180565b82800160010185558215610180579182015b82811115610180578251825591602001919060010190610165565b5061018c929150610190565b5090565b6101aa91905b8082111561018c5760008155600101610196565b9056fea2646970667358221220475f9be6275cfaeda61b73a80462165b5fcc0051f77b4749c029bfc07eb73c5564736f6c63430006000033"
    },
    rawParam: {
        /*
            pragma solidity ^0.4.18;
            contract rawParam {
                uint256 public check;

                constructor(uint256 _check) public {
                    check = _check;
                }

                function setCheck(uint256 _check) public {
                    check = _check;
                }
            }
        */
        contractName: "rawParam",
        abi: [
            {
                constant: false,
                inputs: [
                    {
                        name: "_check",
                        type: "uint256",
                    },
                ],
                name: "setCheck",
                outputs: [],
                payable: false,
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                constant: true,
                inputs: [],
                name: "check",
                outputs: [
                    {
                        name: "",
                        type: "uint256",
                    },
                ],
                payable: false,
                stateMutability: "view",
                type: "function",
            },
        ],
        bytecode:
            "0x608060405234801561001057600080fd5b5060405160208061012583398101806040528101908080519060200190929190505050806000819055505060dc806100496000396000f3006080604052600436106049576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680632c948bd214604e578063919840ad146078575b600080fd5b348015605957600080fd5b5060766004803603810190808035906020019092919050505060a0565b005b348015608357600080fd5b50608a60aa565b6040518082815260200191505060405180910390f35b8060008190555050565b600054815600a165627a7a7230582084a638eb1bcab674b68b98bc8407c96a2e186016c5da95ffcf421c1d40d0feb60029",
    },
    /**
     * contract TronToken {

    string public name = "Tronix";      //  token name
    string public symbol = "TRX";           //  token symbol
    uint256 public decimals = 6;            //  token digit

    mapping (address => uint256) public balanceOf;
    mapping (address => mapping (address => uint256)) public allowance;

    uint256 public totalSupply = 0;
    bool public stopped = false;

    address owner = address(0x0);

    modifier isOwner {
        assert(owner == msg.sender);
        _;
    }

    modifier validAddress {
        assert(address(0x0) != msg.sender);
        _;
    }

    constructor(address _addressFounder,uint256 valueFounder) public {
        owner = msg.sender;
        totalSupply = valueFounder;
        balanceOf[_addressFounder] = valueFounder;
        emit Transfer(address(0x0), _addressFounder, valueFounder);
    }

    function transfer(address _to, uint256 _value) validAddress public returns (bool success) {
        require(balanceOf[msg.sender] >= _value);
        require(balanceOf[_to] + _value >= balanceOf[_to]);
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value) validAddress public returns (bool success) {
        require(_value == 0 || allowance[msg.sender][_spender] == 0);
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function setName(string memory _name) isOwner public {
        name = _name;
    }

    function burn(uint256 _value) public {
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender] -= _value;
        balanceOf[address(0x0)] += _value;
        emit Transfer(msg.sender, address(0x0), _value);
    }

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);
}
     */
    tronToken: {
        contractName: "TronToken",
        abi:[{
            "constant": true,
            "inputs": [],
            "name": "name",
            "outputs": [{
                "name": "",
                "type": "string"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{
                "name": "_spender",
                "type": "address"
            }, {
                "name": "_value",
                "type": "uint256"
            }],
            "name": "approve",
            "outputs": [{
                "name": "success",
                "type": "bool"
            }],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "totalSupply",
            "outputs": [{
                "name": "",
                "type": "uint256"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "decimals",
            "outputs": [{
                "name": "",
                "type": "uint256"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{
                "name": "_value",
                "type": "uint256"
            }],
            "name": "burn",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{
                "name": "",
                "type": "address"
            }],
            "name": "balanceOf",
            "outputs": [{
                "name": "",
                "type": "uint256"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "stopped",
            "outputs": [{
                "name": "",
                "type": "bool"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "symbol",
            "outputs": [{
                "name": "",
                "type": "string"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{
                "name": "_to",
                "type": "address"
            }, {
                "name": "_value",
                "type": "uint256"
            }],
            "name": "transfer",
            "outputs": [{
                "name": "success",
                "type": "bool"
            }],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{
                "name": "_name",
                "type": "string"
            }],
            "name": "setName",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{
                "name": "",
                "type": "address"
            }, {
                "name": "",
                "type": "address"
            }],
            "name": "allowance",
            "outputs": [{
                "name": "",
                "type": "uint256"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [{
                "name": "_addressFounder",
                "type": "address"
            }, {
                "name": "valueFounder",
                "type": "uint256"
            }],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        }, {
            "anonymous": false,
            "inputs": [{
                "indexed": true,
                "name": "_from",
                "type": "address"
            }, {
                "indexed": true,
                "name": "_to",
                "type": "address"
            }, {
                "indexed": false,
                "name": "_value",
                "type": "uint256"
            }],
            "name": "Transfer",
            "type": "event"
        }, {
            "anonymous": false,
            "inputs": [{
                "indexed": true,
                "name": "_owner",
                "type": "address"
            }, {
                "indexed": true,
                "name": "_spender",
                "type": "address"
            }, {
                "indexed": false,
                "name": "_value",
                "type": "uint256"
            }],
            "name": "Approval",
            "type": "event"
        }],
        bytecode:"60c0604052600660808190527f54726f6e6978000000000000000000000000000000000000000000000000000060a090815261003e9160009190610168565b506040805180820190915260038082527f5452580000000000000000000000000000000000000000000000000000000000602090920191825261008391600191610168565b5060066002819055600060055580546001600160a81b03191690553480156100aa57600080fd5b50d380156100b757600080fd5b50d280156100c457600080fd5b50604051610931380380610931833981810160405260408110156100e757600080fd5b50805160209182015160068054610100600160a81b031916336101000217905560058190556001600160a01b03821660008181526003855260408082208490558051848152905194959394929391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef929181900390910190a35050610203565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106101a957805160ff19168380011785556101d6565b828001600101855582156101d6579182015b828111156101d65782518255916020019190600101906101bb565b506101e29291506101e6565b5090565b61020091905b808211156101e257600081556001016101ec565b90565b61071f806102126000396000f3fe608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b50600436106100c35760003560e01c806370a082311161008b57806370a08231146101c657806375f12b21146101ec57806395d89b41146101f4578063a9059cbb146101fc578063c47f002714610228578063dd62ed3e146102ce576100c3565b806306fdde03146100c8578063095ea7b31461014557806318160ddd14610185578063313ce5671461019f57806342966c68146101a7575b600080fd5b6100d06102fc565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561010a5781810151838201526020016100f2565b50505050905090810190601f1680156101375780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6101716004803603604081101561015b57600080fd5b506001600160a01b03813516906020013561038a565b604080519115158252519081900360200190f35b61018d610431565b60408051918252519081900360200190f35b61018d610437565b6101c4600480360360208110156101bd57600080fd5b503561043d565b005b61018d600480360360208110156101dc57600080fd5b50356001600160a01b03166104d4565b6101716104e6565b6100d06104ef565b6101716004803603604081101561021257600080fd5b506001600160a01b038135169060200135610549565b6101c46004803603602081101561023e57600080fd5b81019060208101813564010000000081111561025957600080fd5b82018360208201111561026b57600080fd5b8035906020019184600183028401116401000000008311171561028d57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550610603945050505050565b61018d600480360360408110156102e457600080fd5b506001600160a01b0381358116916020013516610633565b6000805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156103825780601f1061035757610100808354040283529160200191610382565b820191906000526020600020905b81548152906001019060200180831161036557829003601f168201915b505050505081565b60003361039357fe5b8115806103c157503360009081526004602090815260408083206001600160a01b0387168452909152902054155b6103ca57600080fd5b3360008181526004602090815260408083206001600160a01b03881680855290835292819020869055805186815290519293927f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925929181900390910190a350600192915050565b60055481565b60025481565b3360009081526003602052604090205481111561045957600080fd5b336000818152600360209081526040808320805486900390558280527f3617319a054d772f909f7c479a2cebe5066e836a939412e32403c99029b92eff805486019055805185815290519293927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef929181900390910190a350565b60036020526000908152604090205481565b60065460ff1681565b60018054604080516020600284861615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156103825780601f1061035757610100808354040283529160200191610382565b60003361055257fe5b3360009081526003602052604090205482111561056e57600080fd5b6001600160a01b038316600090815260036020526040902054828101101561059557600080fd5b336000818152600360209081526040808320805487900390556001600160a01b03871680845292819020805487019055805186815290519293927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef929181900390910190a350600192915050565b60065461010090046001600160a01b0316331461061c57fe5b805161062f906000906020840190610650565b5050565b600460209081526000928352604080842090915290825290205481565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061069157805160ff19168380011785556106be565b828001600101855582156106be579182015b828111156106be5782518255916020019190600101906106a3565b506106ca9291506106ce565b5090565b6106e891905b808211156106ca57600081556001016106d4565b9056fea26474726f6e5820beed41f928b5943738d1025b93669ec2de5bf400228e6c96355cc6540fc16f4664736f6c63430005090031"
    },
    /**
     *contract TestAddressArray {
    string public name = "Tronix";
    string public symbol = "TRX";
    uint256 public decimals = 6;

    mapping (address => uint256) public balanceOf;
    uint256 public totalSupply = 0;
    uint256 constant valueFounder = 100000000000000000;
    address owner = address(0x0);

    constructor(address[3] memory _addressFounders) public {
        owner = msg.sender;
        totalSupply = valueFounder;
        for (uint i = 0; i < 3; i++) {
            balanceOf[_addressFounders[i]] = 100000000;
            emit Transfer(address(0x0), _addressFounders[i], 100000000);
        }
        balanceOf[owner] = valueFounder;
        emit Transfer(address(0x0), owner, valueFounder);
    }

    function transferWith2(address[2] memory _to, uint256[2] memory _value) public returns (bool success) {
        for (uint i = 0; i < 2; i++) {
            require(balanceOf[msg.sender] >= _value[i]);
            require(balanceOf[_to[i]] + _value[i] >= balanceOf[_to[i]]);
            balanceOf[msg.sender] -= _value[i];
            balanceOf[_to[i]] += _value[i];
            emit Transfer(msg.sender, _to[i], _value[i]);
        }
        return true;
    }

    function transferWithArray(address[] memory _to, uint256[] memory _value) public returns (bool success) {
        for (uint i = 0; i < _to.length; i++) {
            require(balanceOf[msg.sender] >= _value[i]);
            require(balanceOf[_to[i]] + _value[i] >= balanceOf[_to[i]]);
            balanceOf[msg.sender] -= _value[i];
            balanceOf[_to[i]] += _value[i];
            emit Transfer(msg.sender, _to[i], _value[i]);
        }
        return true;
    }

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    }
     */
    testAddressArray: {
        contractName: "TestAddressArray",
        abi:[{
            "inputs": [{
                "internalType": "address[3]",
                "name": "_addressFounders",
                "type": "address[3]"
            }],
            "stateMutability": "nonpayable",
            "type": "constructor"
        }, {
            "anonymous": false,
            "inputs": [{
                "indexed": true,
                "internalType": "address",
                "name": "_from",
                "type": "address"
            }, {
                "indexed": true,
                "internalType": "address",
                "name": "_to",
                "type": "address"
            }, {
                "indexed": false,
                "internalType": "uint256",
                "name": "_value",
                "type": "uint256"
            }],
            "name": "Transfer",
            "type": "event"
        }, {
            "inputs": [{
                "internalType": "address",
                "name": "",
                "type": "address"
            }],
            "name": "balanceOf",
            "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [],
            "name": "decimals",
            "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [],
            "name": "name",
            "outputs": [{
                "internalType": "string",
                "name": "",
                "type": "string"
            }],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [],
            "name": "symbol",
            "outputs": [{
                "internalType": "string",
                "name": "",
                "type": "string"
            }],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [],
            "name": "totalSupply",
            "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [{
                "internalType": "address[2]",
                "name": "_to",
                "type": "address[2]"
            }, {
                "internalType": "uint256[2]",
                "name": "_value",
                "type": "uint256[2]"
            }],
            "name": "transferWith2",
            "outputs": [{
                "internalType": "bool",
                "name": "success",
                "type": "bool"
            }],
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "inputs": [{
                "internalType": "address[]",
                "name": "_to",
                "type": "address[]"
            }, {
                "internalType": "uint256[]",
                "name": "_value",
                "type": "uint256[]"
            }],
            "name": "transferWithArray",
            "outputs": [{
                "internalType": "bool",
                "name": "success",
                "type": "bool"
            }],
            "stateMutability": "nonpayable",
            "type": "function"
        }],
        bytecode:"60c060405260066080819052650a8e4dedcd2f60d31b60a090815261002791600091906101cf565b50604080518082019091526003808252620a8a4b60eb1b6020909201918252610052916001916101cf565b5060066002556000600455600580546001600160a01b031916905534801561007957600080fd5b50d3801561008657600080fd5b50d2801561009357600080fd5b50604051610a90380380610a90833981810160405260608110156100b657600080fd5b50600580546001600160a01b0319163317905567016345785d8a000060045560005b6003811015610175576305f5e100600360008484600381106100f657fe5b60200201516001600160a01b03166001600160a01b031681526020019081526020016000208190555081816003811061012b57fe5b60200201516001600160a01b031660006001600160a01b0316600080516020610a708339815191526305f5e1006040518082815260200191505060405180910390a36001016100d8565b50600580546001600160a01b03908116600090815260036020908152604080832067016345785d8a0000908190559454815195865290519316939192600080516020610a708339815191529281900390910190a350610262565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061021057805160ff191683800117855561023d565b8280016001018555821561023d579182015b8281111561023d578251825591602001919060010190610222565b5061024992915061024d565b5090565b5b80821115610249576000815560010161024e565b6107ff806102716000396000f3fe608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b50600436106100975760003560e01c8063442c0d0a11610075578063442c0d0a1461013b57806361267ff2146101c357806370a08231146102ea57806395d89b411461031057610097565b806306fdde031461009c57806318160ddd14610119578063313ce56714610133575b600080fd5b6100a4610318565b6040805160208082528351818301528351919283929083019185019080838360005b838110156100de5781810151838201526020016100c6565b50505050905090810190601f16801561010b5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6101216103a6565b60408051918252519081900360200190f35b6101216103ac565b6101af6004803603608081101561015157600080fd5b6040805180820182529183019291818301918390600290839083908082843760009201919091525050604080518082018252929594938181019392509060029083908390808284376000920191909152509194506103b29350505050565b604080519115158252519081900360200190f35b6101af600480360360408110156101d957600080fd5b8101906020810181356401000000008111156101f457600080fd5b82018360208201111561020657600080fd5b8035906020019184602083028401116401000000008311171561022857600080fd5b919080806020026020016040519081016040528093929190818152602001838360200280828437600092019190915250929594936020810193503591505064010000000081111561027857600080fd5b82018360208201111561028a57600080fd5b803590602001918460208302840111640100000000831117156102ac57600080fd5b919080806020026020016040519081016040528093929190818152602001838360200280828437600092019190915250929550610575945050505050565b6101216004803603602081101561030057600080fd5b50356001600160a01b031661075d565b6100a461076f565b6000805460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152929183018282801561039e5780601f106103735761010080835404028352916020019161039e565b820191906000526020600020905b81548152906001019060200180831161038157829003601f168201915b505050505081565b60045481565b60025481565b6000805b600281101561056b578281600281106103cb57fe5b602002015160036000336001600160a01b03166001600160a01b0316815260200190815260200160002054101561040157600080fd5b6003600085836002811061041157fe5b60200201516001600160a01b03166001600160a01b031681526020019081526020016000205483826002811061044357fe5b60200201516003600087856002811061045857fe5b60200201516001600160a01b03166001600160a01b031681526020019081526020016000205401101561048a57600080fd5b82816002811061049657fe5b602090810291909101513360009081526003909252604090912080549190910390558281600281106104c457fe5b6020020151600360008684600281106104d957fe5b602090810291909101516001600160a01b031682528101919091526040016000208054909101905583816002811061050d57fe5b60200201516001600160a01b0316337fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef85846002811061054957fe5b60200201516040518082815260200191505060405180910390a36001016103b6565b5060019392505050565b6000805b835181101561056b5782818151811061058e57fe5b602002602001015160036000336001600160a01b03166001600160a01b031681526020019081526020016000205410156105c757600080fd5b600360008583815181106105d757fe5b60200260200101516001600160a01b03166001600160a01b031681526020019081526020016000205483828151811061060c57fe5b60200260200101516003600087858151811061062457fe5b60200260200101516001600160a01b03166001600160a01b031681526020019081526020016000205401101561065957600080fd5b82818151811061066557fe5b602090810291909101810151336000908152600390925260409091208054919091039055825183908290811061069757fe5b6020026020010151600360008684815181106106af57fe5b60200260200101516001600160a01b03166001600160a01b03168152602001908152602001600020600082825401925050819055508381815181106106f057fe5b60200260200101516001600160a01b0316336001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef85848151811061073857fe5b60200260200101516040518082815260200191505060405180910390a3600101610579565b60036020526000908152604090205481565b60018054604080516020600284861615610100026000190190941693909304601f8101849004840282018401909252818152929183018282801561039e5780601f106103735761010080835404028352916020019161039e56fea26469706673582212208d688f20093b0a2c7c148046aa5eec414133ef86914a378392414d6df3cb1e5764736f6c63430007000033ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
    },
    /**
     * contract trcTokenTest{
     trcToken idCon = 0;
     uint256 tokenValueCon=0;
     uint256 callValueCon = 0;

     function TransferTokenTo(address payable toAddress, trcToken id, uint256 amount) public payable{
         toAddress.transferToken(amount,id);
     }

     constructor(address payable toAddress, trcToken id, uint256 amount) public payable {
         idCon = msg.tokenid;
         tokenValueCon = msg.tokenvalue;
         callValueCon = msg.value;
         toAddress.transferToken(amount, id);
     }

     function getResultInCon() public payable returns(trcToken, uint256, uint256) {
         return (idCon, tokenValueCon, callValueCon);
     }
    }
     */
    trcTokenTest070: {
        contractName: "trcTokenTest",
        abi:[{
            "inputs": [{
                "internalType": "address payable",
                "name": "toAddress",
                "type": "address"
            }, {
                "internalType": "trcToken",
                "name": "id",
                "type": "trcToken"
            }, {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }],
            "stateMutability": "payable",
            "type": "constructor"
        }, {
            "inputs": [{
                "internalType": "address payable",
                "name": "toAddress",
                "type": "address"
            }, {
                "internalType": "trcToken",
                "name": "id",
                "type": "trcToken"
            }, {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }],
            "name": "TransferTokenTo",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        }, {
            "inputs": [],
            "name": "getResultInCon",
            "outputs": [{
                "internalType": "trcToken",
                "name": "",
                "type": "trcToken"
            }, {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }, {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }],
            "stateMutability": "payable",
            "type": "function"
        }],
        bytecode:"608060405260008055600060015560006002556040516102143803806102148339818101604052606081101561003457600080fd5b5080516020820151604090920151d3600055d2600155346002559091906001600160a01b03831681156108fc0282848015801561007057600080fd5b50806780000000000000001115801561008857600080fd5b5080620f42401015801561009b57600080fd5b50604051600081818185878a8ad09450505050501580156100c0573d6000803e3d6000fd5b50505050610141806100d36000396000f3fe6080604052600436106100295760003560e01c806305c242001461002e5780633be9ece714610054575b600080fd5b610036610088565b60408051938452602084019290925282820152519081900360600190f35b6100866004803603606081101561006a57600080fd5b506001600160a01b038135169060208101359060400135610096565b005b600054600154600254909192565b6001600160a01b03831681156108fc028284801580156100b557600080fd5b5080678000000000000000111580156100cd57600080fd5b5080620f4240101580156100e057600080fd5b50604051600081818185878a8ad0945050505050158015610105573d6000803e3d6000fd5b5050505056fea2646970667358221220a6d3097688ad04359dcb76e491a45f7c4f39a04739bd5209ad46ac46937ddb0f64736f6c63430007000033"
    },
    trcTokenTest059: {
        contractName: "trcTokenTest",
        abi:[{
            "constant": false,
            "inputs": [],
            "name": "getResultInCon",
            "outputs": [{
                "name": "",
                "type": "trcToken"
            }, {
                "name": "",
                "type": "uint256"
            }, {
                "name": "",
                "type": "uint256"
            }],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{
                "name": "toAddress",
                "type": "address"
            }, {
                "name": "id",
                "type": "trcToken"
            }, {
                "name": "amount",
                "type": "uint256"
            }],
            "name": "TransferTokenTo",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        }, {
            "inputs": [{
                "name": "toAddress",
                "type": "address"
            }, {
                "name": "id",
                "type": "trcToken"
            }, {
                "name": "amount",
                "type": "uint256"
            }],
            "payable": true,
            "stateMutability": "payable",
            "type": "constructor"
        }],
        bytecode:"608060405260008055600060015560006002556040516102123803806102128339818101604052606081101561003457600080fd5b5080516020820151604090920151d3600055d2600155346002559091906001600160a01b03831681156108fc0282848015801561007057600080fd5b50806780000000000000001115801561008857600080fd5b5080620f42401015801561009b57600080fd5b50604051600081818185878a8ad09450505050501580156100c0573d6000803e3d6000fd5b5050505061013f806100d36000396000f3fe6080604052600436106100295760003560e01c806305c242001461002e5780633be9ece714610054575b600080fd5b610036610088565b60408051938452602084019290925282820152519081900360600190f35b6100866004803603606081101561006a57600080fd5b506001600160a01b038135169060208101359060400135610096565b005b600054600154600254909192565b6001600160a01b03831681156108fc028284801580156100b557600080fd5b5080678000000000000000111580156100cd57600080fd5b5080620f4240101580156100e057600080fd5b50604051600081818185878a8ad0945050505050158015610105573d6000803e3d6000fd5b5050505056fea26474726f6e5820b3903cb5f98dfab275d27fa71f437645d2ff94eac94d9a0c30c2c9836819ab7d64736f6c63430005090031"
    },
    funcABIV2: {
        /*
            pragma solidity ^0.4.18;
            contract funcABIV2 {
                uint256 public check;

                constructor(uint256 _check) public {
                    check = _check;
                }

                function setCheck(uint256 _check) public {
                    check = _check;
                }
            }
        */
        contractName: "funcABIV2",
        abi: [
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_check",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "inputs": [],
                "name": "check",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_check",
                        "type": "uint256"
                    }
                ],
                "name": "setCheck",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ],
        bytecode:
            "0x608060405234801561001057600080fd5b5060405160208061012583398101806040528101908080519060200190929190505050806000819055505060dc806100496000396000f3006080604052600436106049576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680632c948bd214604e578063919840ad146078575b600080fd5b348015605957600080fd5b5060766004803603810190808035906020019092919050505060a0565b005b348015608357600080fd5b50608a60aa565b6040518082815260200191505060405180910390f35b8060008190555050565b600054815600a165627a7a7230582084a638eb1bcab674b68b98bc8407c96a2e186016c5da95ffcf421c1d40d0feb60029",
    },
    funcABIV2_2: {
        "bytecode": "0x6060604052341561000f57600080fd5b6102888061001e6000396000f300606060405260043610610041576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063f8a8fd6d14610046575b600080fd5b341561005157600080fd5b61005961006f565b6040516100669190610213565b60405180910390f35b61007761015e565b731d39a67ed2fcff49d955aefef526e36995453e87816000019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff1681525050731a8d6d77ba7102532ce756c64ecbd6d20b36257f816020019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff168152505073cfff478412982dc11d3700747fa1972815853776816040019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff168152505090565b606060405190810160405280600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff1681525090565b6101cb8161022e565b82525050565b6060820160008201516101e760008501826101c2565b5060208201516101fa60208501826101c2565b50604082015161020d60408501826101c2565b50505050565b600060608201905061022860008301846101d1565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff821690509190505600a265627a7a723058206daa289c202b91f390e524f86617f5aa46ded7b43470b1d039eed33244b373fc6c6578706572696d656e74616cf50037",
        "result": "0x0000000000000000000000001d39a67ed2fcff49d955aefef526e36995453e870000000000000000000000001a8d6d77ba7102532ce756c64ecbd6d20b36257f000000000000000000000000cfff478412982dc11d3700747fa1972815853776",
        "interface": "[{\"constant\":true,\"inputs\":[],\"name\":\"test\",\"outputs\":[{\"components\":[{\"name\":\"a\",\"type\":\"address\"},{\"name\":\"b\",\"type\":\"address\"},{\"name\":\"c\",\"type\":\"address\"}],\"name\":\"r0\",\"type\":\"tuple\"}],\"payable\":false,\"stateMutability\":\"pure\",\"type\":\"function\"}]",
        "name": "random-0",
        "runtimeBytecode": "0x606060405260043610610041576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063f8a8fd6d14610046575b600080fd5b341561005157600080fd5b61005961006f565b6040516100669190610213565b60405180910390f35b61007761015e565b731d39a67ed2fcff49d955aefef526e36995453e87816000019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff1681525050731a8d6d77ba7102532ce756c64ecbd6d20b36257f816020019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff168152505073cfff478412982dc11d3700747fa1972815853776816040019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff168152505090565b606060405190810160405280600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff1681525090565b6101cb8161022e565b82525050565b6060820160008201516101e760008501826101c2565b5060208201516101fa60208501826101c2565b50604082015161020d60408501826101c2565b50505050565b600060608201905061022860008301846101d1565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff821690509190505600a265627a7a723058206daa289c202b91f390e524f86617f5aa46ded7b43470b1d039eed33244b373fc6c6578706572696d656e74616cf50037",
        "source": "// Test: random-0\n// Comnpiler: 0.4.18+commit.9cf6e910\n// [{\"type\":\"tuple\",\"name\":\"Struct47985BF5FB\",\"struct\":\"    struct Struct47985BF5FB {\\n        address a;\\n        address b;\\n        address c;\\n    }\\n\",\"value\":[{\"type\":\"address\",\"name\":\"address\",\"value\":\"0x1D39a67eD2fcfF49D955aEfEF526e36995453E87\"},{\"type\":\"address\",\"name\":\"address\",\"value\":\"0x1a8D6D77ba7102532CE756c64EcBd6d20B36257f\"},{\"type\":\"address\",\"name\":\"address\",\"value\":\"0xcFfF478412982dc11d3700747FA1972815853776\"}]}]\n \npragma experimental ABIEncoderV2;\npragma solidity ^0.4.18;\n\ncontract Test {\n    struct Struct47985BF5FB {\n        address a;\n        address b;\n        address c;\n    }\n\n    function test() pure returns (Struct47985BF5FB r0) {\n        r0.a = address(0x1D39a67eD2fcfF49D955aEfEF526e36995453E87);\n        r0.b = address(0x1a8D6D77ba7102532CE756c64EcBd6d20B36257f);\n        r0.c = address(0xcFfF478412982dc11d3700747FA1972815853776);\n    }\n}\n",
        "types": "[\"tuple(address,address,address)\"]",
        "values": "[{\"type\":\"tuple\",\"value\":[{\"type\":\"string\",\"value\":\"0x1D39a67eD2fcfF49D955aEfEF526e36995453E87\"},{\"type\":\"string\",\"value\":\"0x1a8D6D77ba7102532CE756c64EcBd6d20B36257f\"},{\"type\":\"string\",\"value\":\"0xcFfF478412982dc11d3700747FA1972815853776\"}]}]",
        "version": "0.4.18+commit.9cf6e910"
    },
    funcABIV2_3: {
        /*
          pragma experimental ABIEncoderV2;
          contract Test {
            struct Struct47985BF5FB {
              address a;
              address b;
              address c;
            }
            mapping (uint256 => Struct47985BF5FB) public s;

            function setStruct(Struct47985BF5FB calldata _s)  public {
              s[0] = Struct47985BF5FB(_s.a,_s.b,_s.c);
            }

            function get1() public view returns(Struct47985BF5FB memory s2){
                s2 = s[0];

            }
        */
        contractName: "funcABIV2_3",
        abi: [
            {
                "inputs": [],
                "name": "get1",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "address",
                                "name": "a",
                                "type": "address"
                            },
                            {
                                "internalType": "address",
                                "name": "b",
                                "type": "address"
                            },
                            {
                                "internalType": "address",
                                "name": "c",
                                "type": "address"
                            }
                        ],
                        "internalType": "struct Test.Struct47985BF5FB",
                        "name": "s2",
                        "type": "tuple"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "s",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "a",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "b",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "c",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "components": [
                            {
                                "internalType": "address",
                                "name": "a",
                                "type": "address"
                            },
                            {
                                "internalType": "address",
                                "name": "b",
                                "type": "address"
                            },
                            {
                                "internalType": "address",
                                "name": "c",
                                "type": "address"
                            }
                        ],
                        "internalType": "struct Test.Struct47985BF5FB",
                        "name": "_s",
                        "type": "tuple"
                    }
                ],
                "name": "setStruct",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ],
        bytecode:
            "0x608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b506106bd8061003a6000396000f3fe608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b506004361061005b5760003560e01c8063054c1a75146100605780630de3848f1461007e57806352efd6851461009a575b600080fd5b6100686100cc565b60405161007591906105d7565b60405180910390f35b610098600480360381019061009391906104e6565b6101f8565b005b6100b460048036038101906100af9190610513565b610378565b6040516100c3939291906105a0565b60405180910390f35b6100d4610402565b6000808081526020019081526020016000206040518060600160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016002820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681525050905090565b604051806060016040528082600001602081019061021691906104b9565b73ffffffffffffffffffffffffffffffffffffffff16815260200182602001602081019061024491906104b9565b73ffffffffffffffffffffffffffffffffffffffff16815260200182604001602081019061027291906104b9565b73ffffffffffffffffffffffffffffffffffffffff1681525060008080815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555090505050565b60006020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905083565b6040518060600160405280600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff1681525090565b60008135905061047481610659565b61047d816105f2565b905092915050565b60006060828403121561049b5761049a61064f565b5b81905092915050565b6000813590506104b381610670565b92915050565b6000602082840312156104cf576104ce610654565b5b60006104dd84828501610465565b91505092915050565b6000606082840312156104fc576104fb610654565b5b600061050a84828501610485565b91505092915050565b60006020828403121561052957610528610654565b5b6000610537848285016104a4565b91505092915050565b610549816105f2565b82525050565b610558816105f2565b82525050565b6060820160008201516105746000850182610540565b5060208201516105876020850182610540565b50604082015161059a6040850182610540565b50505050565b60006060820190506105b5600083018661054f565b6105c2602083018561054f565b6105cf604083018461054f565b949350505050565b60006060820190506105ec600083018461055e565b92915050565b60006105fd82610604565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600074ffffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600080fd5b600080fd5b61066281610624565b811461066d57600080fd5b50565b61067981610645565b811461068457600080fd5b5056fea26474726f6e5822122033b02c1792f1c2b017ea3cc155a5c31bdd6eff931f11f2a9095eb6c3bfc56c9764736f6c63430008060033",
    },
    funcABIV2_4: {
        /*
          pragma experimental ABIEncoderV2;
          contract Test {
            struct Struct47985BF5FB {
              address a;
              trcToken b;
              address c;
            }
            mapping (uint256 => Struct47985BF5FB) public s;

            function setStruct(Struct47985BF5FB calldata _s)  public {
              s[0] = Struct47985BF5FB(_s.a,_s.b,_s.c);
            }

            function get() public view returns(Struct47985BF5FB memory s2){
                s2 = s[0];
            }

          }
        */
        contractName: "funcABIV2_4",
        abi: [
            {
                "inputs": [],
                "name": "get",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "address",
                                "name": "a",
                                "type": "address"
                            },
                            {
                                "internalType": "trcToken",
                                "name": "b",
                                "type": "trcToken"
                            },
                            {
                                "internalType": "address",
                                "name": "c",
                                "type": "address"
                            }
                        ],
                        "internalType": "struct Test.Struct47985BF5FB",
                        "name": "s2",
                        "type": "tuple"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "s",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "a",
                        "type": "address"
                    },
                    {
                        "internalType": "trcToken",
                        "name": "b",
                        "type": "trcToken"
                    },
                    {
                        "internalType": "address",
                        "name": "c",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "components": [
                            {
                                "internalType": "address",
                                "name": "a",
                                "type": "address"
                            },
                            {
                                "internalType": "trcToken",
                                "name": "b",
                                "type": "trcToken"
                            },
                            {
                                "internalType": "address",
                                "name": "c",
                                "type": "address"
                            }
                        ],
                        "internalType": "struct Test.Struct47985BF5FB",
                        "name": "_s",
                        "type": "tuple"
                    }
                ],
                "name": "setStruct",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ],
        bytecode:
            "0x608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b506106028061003a6000396000f3fe608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b506004361061005b5760003560e01c806352efd685146100605780635aeccbe6146100925780636d4ce63c146100ae575b600080fd5b61007a60048036038101906100759190610430565b6100cc565b604051610089939291906104db565b60405180910390f35b6100ac60048036038101906100a79190610403565b610136565b005b6100b6610255565b6040516100c39190610512565b60405180910390f35b60006020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154908060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905083565b604051806060016040528082600001602081019061015491906103d6565b73ffffffffffffffffffffffffffffffffffffffff1681526020018260200135815260200182604001602081019061018c91906103d6565b73ffffffffffffffffffffffffffffffffffffffff1681525060008080815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506020820151816001015560408201518160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555090505050565b61025d610335565b6000808081526020019081526020016000206040518060600160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600182015481526020016002820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681525050905090565b6040518060600160405280600073ffffffffffffffffffffffffffffffffffffffff16815260200160008152602001600073ffffffffffffffffffffffffffffffffffffffff1681525090565b6000813590506103918161059e565b61039a8161052d565b905092915050565b6000606082840312156103b8576103b7610594565b5b81905092915050565b6000813590506103d0816105b5565b92915050565b6000602082840312156103ec576103eb610599565b5b60006103fa84828501610382565b91505092915050565b60006060828403121561041957610418610599565b5b6000610427848285016103a2565b91505092915050565b60006020828403121561044657610445610599565b5b6000610454848285016103c1565b91505092915050565b6104668161052d565b82525050565b6104758161052d565b82525050565b606082016000820151610491600085018261045d565b5060208201516104a460208501826104bd565b5060408201516104b7604085018261045d565b50505050565b6104c68161053f565b82525050565b6104d58161053f565b82525050565b60006060820190506104f0600083018661046c565b6104fd60208301856104cc565b61050a604083018461046c565b949350505050565b6000606082019050610527600083018461047b565b92915050565b600061053882610549565b9050919050565b6000819050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600074ffffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600080fd5b600080fd5b6105a781610569565b81146105b257600080fd5b50565b6105be8161058a565b81146105c957600080fd5b5056fea26474726f6e5822122003e6f6fe8adb4a16e48e773436d2d36d3bcf3d16227953199ec68896e85b82b264736f6c63430008060033",
    },
    abiV2Test1: {
        /*
        pragma experimental ABIEncoderV2;

        contract viewCall {
            bool stopped = false;
            int i = 32482989;
            int i2 = - 32482989;
            address public origin = 0xdCad3a6d3569DF655070DEd06cb7A1b2Ccd1D3AF;
            mapping(uint => string[]) public map1;
            mapping(uint => bytes[]) public map2;

            trcToken public token =1000002;
            string[] public strs = ["1","2","3"];
            bytes[] public bys;
            struct S {
                uint256 a;
            }
            S[] public structArray;
            struct Data {
                mapping(uint => string[]) val1;
                mapping(uint => bytes[]) val2;
                S val3;
                uint[] val4;
                address addr;
            }
            uint numData;
            mapping (uint => Data) public data;
            event log(int);
            event log(bool);
            event log(address);
            event log(bytes[]);
            event log(string[]);
            event log(S[]);

            constructor(address addr,trcToken token,string[] memory strs,bytes[] memory bys) payable public{
                origin=addr;
                token=token;
                strs=strs;
                bys=bys;
            }

            function changeMapAll(uint num,uint val1key,string[] memory val1value,uint val2key,bytes[] memory val2value,S memory svalue,uint[] memory val4value,address addr) public returns(uint,address,uint[] memory){
                uint numDataID = numData++;
                map1[val1key]=val1value;
                map2[val2key]=val2value;

                Data storage d = data[numDataID];
                d.addr = addr;
                d.val3 = svalue;
                d.val4 = val4value;
                d.val1[numDataID] = map1[val1key];
                d.val2[numDataID] = map2[val2key];
                return (numDataID,d.addr,d.val4);
            }

            function changeStructArray(S calldata param1,S calldata param2) public returns (S[] memory){
                structArray[0] = param1;
                structArray[1] = param2;
                emit log(structArray);
                return structArray;
            }

            function getStructArray() public returns (S[] memory){
                emit log(structArray);
                return structArray;
            }

            function changeStrs(string[] memory param) public returns (string[] memory){
                strs = param;
                emit log(strs);
                return strs;
            }

            function getStrs() public returns (string[] memory){
                emit log(strs);
                return strs;
            }

            function changeBys(bytes[] memory param) public returns (bytes[] memory){
                bys = param;
                emit log(bys);
                return bys;
            }

            function getBys() public returns (bytes[] memory){
                emit log(bys);
                return bys;
            }

            function changeBool(bool param) public returns (bool){
                stopped = param;
                emit log(stopped);
                return stopped;
            }

            function getBool() public returns (bool){
                emit log(stopped);
                return stopped;
            }

            function changeInt(int param) public returns (int){
                i = param;
                emit log(i);
                return i;
            }

            function getInt() public returns (int){
                emit log(i);
                return i;
            }

            function changeNegativeInt(int param) public returns (int){
                i2 = param;
                emit log(i2);
                return i2;
            }

            function getNegativeInt() public returns (int){
                emit log(i2);
                return i2;
            }


        }
         */
        contractName: "abiV2Test1",
        abi:[
            {
                "inputs": [
                    {
                        "components": [{
                            "internalType": "uint256",
                            "name": "a",
                            "type": "uint256"
                        }],
                        "internalType": "struct viewCall.S",
                        "name": "param",
                        "type": "tuple"
                    },
                    {
                        "internalType": "address",
                        "name": "addr",
                        "type": "address"
                    },
                    {
                        "internalType": "trcToken",
                        "name": "t",
                        "type": "trcToken"
                    },
                    {
                        "internalType": "string[]",
                        "name": "s",
                        "type": "string[]"
                    },
                    {
                        "internalType": "bytes[]",
                        "name": "b",
                        "type": "bytes[]"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "int256",
                        "name": "",
                        "type": "int256"
                    }
                ],
                "name": "log",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "name": "log",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "log",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "bytes[]",
                        "name": "",
                        "type": "bytes[]"
                    }
                ],
                "name": "log",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "string[]",
                        "name": "",
                        "type": "string[]"
                    }
                ],
                "name": "log",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "a",
                                "type": "uint256"
                            }
                        ],
                        "indexed": false,
                        "internalType": "struct viewCall.S[]",
                        "name": "",
                        "type": "tuple[]"
                    }
                ],
                "name": "log",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "bys",
                "outputs": [
                    {
                        "internalType": "bytes",
                        "name": "",
                        "type": "bytes"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "bool",
                        "name": "param",
                        "type": "bool"
                    }
                ],
                "name": "changeBool",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "bytes[]",
                        "name": "param",
                        "type": "bytes[]"
                    }
                ],
                "name": "changeBys",
                "outputs": [
                    {
                        "internalType": "bytes[]",
                        "name": "",
                        "type": "bytes[]"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "int256",
                        "name": "param",
                        "type": "int256"
                    }
                ],
                "name": "changeInt",
                "outputs": [
                    {
                        "internalType": "int256",
                        "name": "",
                        "type": "int256"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "val1key",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string[]",
                        "name": "val1value",
                        "type": "string[]"
                    },
                    {
                        "internalType": "uint256",
                        "name": "val2key",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes[]",
                        "name": "val2value",
                        "type": "bytes[]"
                    },
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "a",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct viewCall.S",
                        "name": "svalue",
                        "type": "tuple"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "val4value",
                        "type": "uint256[]"
                    },
                    {
                        "internalType": "address",
                        "name": "addr",
                        "type": "address"
                    },
                    {
                        "internalType": "trcToken",
                        "name": "tokenid",
                        "type": "trcToken"
                    }
                ],
                "name": "changeMapAll",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "",
                        "type": "uint256[]"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "int256",
                        "name": "param",
                        "type": "int256"
                    }
                ],
                "name": "changeNegativeInt",
                "outputs": [
                    {
                        "internalType": "int256",
                        "name": "",
                        "type": "int256"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "string[]",
                        "name": "param",
                        "type": "string[]"
                    }
                ],
                "name": "changeStrs",
                "outputs": [
                    {
                        "internalType": "string[]",
                        "name": "",
                        "type": "string[]"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "a",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct viewCall.S",
                        "name": "param1",
                        "type": "tuple"
                    },
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "a",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct viewCall.S",
                        "name": "param2",
                        "type": "tuple"
                    }
                ],
                "name": "changeStructArray",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "a",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct viewCall.S[]",
                        "name": "",
                        "type": "tuple[]"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "data",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "a",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct viewCall.S",
                        "name": "val3",
                        "type": "tuple"
                    },
                    {
                        "internalType": "address",
                        "name": "addr",
                        "type": "address"
                    },
                    {
                        "internalType": "trcToken",
                        "name": "token",
                        "type": "trcToken"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getBool",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getBys",
                "outputs": [
                    {
                        "internalType": "bytes[]",
                        "name": "",
                        "type": "bytes[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getInt",
                "outputs": [
                    {
                        "internalType": "int256",
                        "name": "",
                        "type": "int256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getNegativeInt",
                "outputs": [
                    {
                        "internalType": "int256",
                        "name": "",
                        "type": "int256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getStrs",
                "outputs": [
                    {
                        "internalType": "string[]",
                        "name": "",
                        "type": "string[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getStructArray",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "a",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct viewCall.S[]",
                        "name": "",
                        "type": "tuple[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "map1",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "map2",
                "outputs": [
                    {
                        "internalType": "bytes",
                        "name": "",
                        "type": "bytes"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "origin",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "strs",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "structArray",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "a",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "token",
                "outputs": [
                    {
                        "internalType": "trcToken",
                        "name": "",
                        "type": "trcToken"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ],
        bytecode:
            "608060405260008060006101000a81548160ff0219169083151502179055506301efa6ad6001557ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe10595360025573dcad3a6d3569df655070ded06cb7a1b2ccd1d3af600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550620f424260065560405180606001604052806040518060400160405280600181526020017f310000000000000000000000000000000000000000000000000000000000000081525081526020016040518060400160405280600181526020017f320000000000000000000000000000000000000000000000000000000000000081525081526020016040518060400160405280600181526020017f33000000000000000000000000000000000000000000000000000000000000008152508152506007906003620001729291906200028d565b503480156200018057600080fd5b50d380156200018e57600080fd5b50d280156200019c57600080fd5b506040516200373e3803806200373e8339818101604052810190620001c291906200090e565b6009604051806020016040528087600001518152509080600181540180825580915050600190039060005260206000200160009091909190915060008201518160000155505083600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555082600681905550816007908051906020019062000268929190620002f4565b508060089080519060200190620002819291906200035b565b50505050505062000cad565b828054828255906000526020600020908101928215620002e1579160200282015b82811115620002e0578251829080519060200190620002cf929190620003c2565b5091602001919060010190620002ae565b5b509050620002f0919062000453565b5090565b82805482825590600052602060002090810192821562000348579160200282015b828111156200034757825182908051906020019062000336929190620003c2565b509160200191906001019062000315565b5b50905062000357919062000453565b5090565b828054828255906000526020600020908101928215620003af579160200282015b82811115620003ae5782518290805190602001906200039d9291906200047b565b50916020019190600101906200037c565b5b509050620003be91906200050c565b5090565b828054620003d09062000b66565b90600052602060002090601f016020900481019282620003f4576000855562000440565b82601f106200040f57805160ff191683800117855562000440565b8280016001018555821562000440579182015b828111156200043f57825182559160200191906001019062000422565b5b5090506200044f919062000534565b5090565b5b808211156200047757600081816200046d919062000553565b5060010162000454565b5090565b828054620004899062000b66565b90600052602060002090601f016020900481019282620004ad5760008555620004f9565b82601f10620004c857805160ff1916838001178555620004f9565b82800160010185558215620004f9579182015b82811115620004f8578251825591602001919060010190620004db565b5b50905062000508919062000534565b5090565b5b8082111562000530576000818162000526919062000599565b506001016200050d565b5090565b5b808211156200054f57600081600090555060010162000535565b5090565b508054620005619062000b66565b6000825580601f1062000575575062000596565b601f01602090049060005260206000209081019062000595919062000534565b5b50565b508054620005a79062000b66565b6000825580601f10620005bb5750620005dc565b601f016020900490600052602060002090810190620005db919062000534565b5b50565b6000620005f6620005f084620009fd565b620009d4565b905080838252602082019050828560208602820111156200061c576200061b62000c3a565b5b60005b858110156200067157815167ffffffffffffffff81111562000646576200064562000c30565b5b80860162000655898262000837565b855260208501945060208401935050506001810190506200061f565b5050509392505050565b6000620006926200068c8462000a2c565b620009d4565b90508083825260208201905082856020860282011115620006b857620006b762000c3a565b5b60005b858110156200070d57815167ffffffffffffffff811115620006e257620006e162000c30565b5b808601620006f189826200086a565b85526020850194506020840193505050600181019050620006bb565b5050509392505050565b60006200072e620007288462000a5b565b620009d4565b9050828152602081018484840111156200074d576200074c62000c3f565b5b6200075a84828562000b30565b509392505050565b600062000779620007738462000a91565b620009d4565b90508281526020810184848401111562000798576200079762000c3f565b5b620007a584828562000b30565b509392505050565b600081519050620007be8162000c5f565b620007c98162000ac7565b905092915050565b600082601f830112620007e957620007e862000c30565b5b8151620007fb848260208601620005df565b91505092915050565b600082601f8301126200081c576200081b62000c30565b5b81516200082e8482602086016200067b565b91505092915050565b600082601f8301126200084f576200084e62000c30565b5b81516200086184826020860162000717565b91505092915050565b600082601f83011262000882576200088162000c30565b5b81516200089484826020860162000762565b91505092915050565b600060208284031215620008b657620008b562000c35565b5b620008c26020620009d4565b90506000620008d484828501620008f7565b60008301525092915050565b600081519050620008f18162000c79565b92915050565b600081519050620009088162000c93565b92915050565b600080600080600060a086880312156200092d576200092c62000c49565b5b60006200093d888289016200089d565b95505060206200095088828901620007ad565b94505060406200096388828901620008e0565b935050606086015167ffffffffffffffff81111562000987576200098662000c44565b5b620009958882890162000804565b925050608086015167ffffffffffffffff811115620009b957620009b862000c44565b5b620009c788828901620007d1565b9150509295509295909350565b6000620009e0620009f3565b9050620009ee828262000b9c565b919050565b6000604051905090565b600067ffffffffffffffff82111562000a1b5762000a1a62000c01565b5b602082029050602081019050919050565b600067ffffffffffffffff82111562000a4a5762000a4962000c01565b5b602082029050602081019050919050565b600067ffffffffffffffff82111562000a795762000a7862000c01565b5b62000a848262000c4e565b9050602081019050919050565b600067ffffffffffffffff82111562000aaf5762000aae62000c01565b5b62000aba8262000c4e565b9050602081019050919050565b600062000ad48262000ae5565b9050919050565b6000819050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600074ffffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b60005b8381101562000b5057808201518184015260208101905062000b33565b8381111562000b60576000848401525b50505050565b6000600282049050600182168062000b7f57607f821691505b6020821081141562000b965762000b9562000bd2565b5b50919050565b62000ba78262000c4e565b810181811067ffffffffffffffff8211171562000bc95762000bc862000c01565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b62000c6a8162000b05565b811462000c7657600080fd5b50565b62000c848162000adb565b811462000c9057600080fd5b50565b62000c9e8162000b26565b811462000caa57600080fd5b50565b612a818062000cbd6000396000f3fe608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b50600436106101515760003560e01c80637cd4f4ba116100d2578063d123b9ed11610096578063d123b9ed146103a8578063e0ed46b2146103d8578063f0ba844014610408578063f1676e051461043a578063f895c66a1461046a578063fc0c546a1461049c57610151565b80637cd4f4ba146102ee5780638fd0cf7d1461031e57806392bbd4d61461033c578063938b5f321461036c578063974f3e531461038a57610151565b80633cbf8c28116101195780633cbf8c281461023457806353340aba1461026457806354bf7f1a1461028257806362738998146102a05780636d689779146102be57610151565b80630f634b741461015657806312a7b914146101865780631f659d8c146101a45780633316f634146101d457806337f4af4414610204575b600080fd5b610170600480360381019061016b9190611adc565b6104ba565b60405161017d9190612428565b60405180910390f35b61018e6104e4565b60405161019b919061235c565b60405180910390f35b6101be60048036038101906101b99190611c13565b6104fa565b6040516101cb9190612377565b60405180910390f35b6101ee60048036038101906101e99190611a9c565b6105b3565b6040516101fb9190612318565b60405180910390f35b61021e600480360381019061021991906119f9565b6106df565b60405161022b91906122d4565b60405180910390f35b61024e60048036038101906102499190611c13565b610809565b60405161025b91906123b4565b60405180910390f35b61026c6108c2565b6040516102799190612399565b60405180910390f35b61028a6108cc565b6040516102979190612318565b60405180910390f35b6102a8610931565b6040516102b59190612399565b60405180910390f35b6102d860048036038101906102d39190611a42565b61093b565b6040516102e5919061235c565b60405180910390f35b610308600480360381019061030391906119b0565b6109af565b6040516103159190612290565b60405180910390f35b610326610ad9565b60405161033391906122d4565b60405180910390f35b61035660048036038101906103519190611adc565b610bb2565b6040516103639190612377565b60405180910390f35b610374610c5e565b6040516103819190612275565b60405180910390f35b610392610c84565b60405161039f9190612290565b60405180910390f35b6103c260048036038101906103bd9190611a6f565b610d5d565b6040516103cf9190612399565b60405180910390f35b6103f260048036038101906103ed9190611adc565b610da9565b6040516103ff91906123b4565b60405180910390f35b610422600480360381019061041d9190611adc565b610e55565b604051610431939291906123d6565b60405180910390f35b610454600480360381019061044f9190611a6f565b610eb3565b6040516104619190612399565b60405180910390f35b610484600480360381019061047f9190611b09565b610eff565b60405161049393929190612443565b60405180910390f35b6104a46110fd565b6040516104b1919061240d565b60405180910390f35b600981815481106104ca57600080fd5b906000526020600020016000915090508060000154905081565b60008060009054906101000a900460ff16905090565b6005602052816000526040600020818154811061051657600080fd5b9060005260206000200160009150915050805461053290612844565b80601f016020809104026020016040519081016040528092919081815260200182805461055e90612844565b80156105ab5780601f10610580576101008083540402835291602001916105ab565b820191906000526020600020905b81548152906001019060200180831161058e57829003601f168201915b505050505081565b606060096040518060200160405280856000013581525090806001815401808255809150506001900390600052602060002001600090919091909150600082015181600001555050600960405180602001604052808460000135815250908060018154018082558091505060019003906000526020600020016000909190919091506000820151816000015550507f0ffb2719457225b3496d50086fa280375d58c6a11277df800a678473547c08966009604051610671919061233a565b60405180910390a16009805480602002602001604051908101604052809291908181526020016000905b828210156106d3578382906000526020600020016040518060200160405290816000820154815250508152602001906001019061069b565b50505050905092915050565b606081600790805190602001906106f7929190611103565b507f45eae716480be83ee40dd1cb77b31470f66ba3cc313fe0fa5b2ae2a1cdc65e19600760405161072891906122f6565b60405180910390a16007805480602002602001604051908101604052809291908181526020016000905b828210156107fe57838290600052602060002001805461077190612844565b80601f016020809104026020016040519081016040528092919081815260200182805461079d90612844565b80156107ea5780601f106107bf576101008083540402835291602001916107ea565b820191906000526020600020905b8154815290600101906020018083116107cd57829003601f168201915b505050505081526020019060010190610752565b505050509050919050565b6004602052816000526040600020818154811061082557600080fd5b9060005260206000200160009150915050805461084190612844565b80601f016020809104026020016040519081016040528092919081815260200182805461086d90612844565b80156108ba5780601f1061088f576101008083540402835291602001916108ba565b820191906000526020600020905b81548152906001019060200180831161089d57829003601f168201915b505050505081565b6000600254905090565b60606009805480602002602001604051908101604052809291908181526020016000905b8282101561092857838290600052602060002001604051806020016040529081600082015481525050815260200190600101906108f0565b50505050905090565b6000600154905090565b6000816000806101000a81548160ff0219169083151502179055507f32458eed3feca62a69292a55ca8a755ae4e6cdc57a38d15c298330064467fdd760008054906101000a900460ff16604051610992919061235c565b60405180910390a160008054906101000a900460ff169050919050565b606081600890805190602001906109c7929190611163565b507f3e7e0752aafa67c79b222ee5298c3795ceb90ad2b4eac91f47e5b0046867ff7160086040516109f891906122b2565b60405180910390a16008805480602002602001604051908101604052809291908181526020016000905b82821015610ace578382906000526020600020018054610a4190612844565b80601f0160208091040260200160405190810160405280929190818152602001828054610a6d90612844565b8015610aba5780601f10610a8f57610100808354040283529160200191610aba565b820191906000526020600020905b815481529060010190602001808311610a9d57829003601f168201915b505050505081526020019060010190610a22565b505050509050919050565b60606007805480602002602001604051908101604052809291908181526020016000905b82821015610ba9578382906000526020600020018054610b1c90612844565b80601f0160208091040260200160405190810160405280929190818152602001828054610b4890612844565b8015610b955780601f10610b6a57610100808354040283529160200191610b95565b820191906000526020600020905b815481529060010190602001808311610b7857829003601f168201915b505050505081526020019060010190610afd565b50505050905090565b60088181548110610bc257600080fd5b906000526020600020016000915090508054610bdd90612844565b80601f0160208091040260200160405190810160405280929190818152602001828054610c0990612844565b8015610c565780601f10610c2b57610100808354040283529160200191610c56565b820191906000526020600020905b815481529060010190602001808311610c3957829003601f168201915b505050505081565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60606008805480602002602001604051908101604052809291908181526020016000905b82821015610d54578382906000526020600020018054610cc790612844565b80601f0160208091040260200160405190810160405280929190818152602001828054610cf390612844565b8015610d405780601f10610d1557610100808354040283529160200191610d40565b820191906000526020600020905b815481529060010190602001808311610d2357829003601f168201915b505050505081526020019060010190610ca8565b50505050905090565b6000816002819055507f2d5b6cb95ba2d00a93cd4ffa61ec07ef4bb1694f20c02a3cccb170a38df81ef8600254604051610d979190612399565b60405180910390a16002549050919050565b60078181548110610db957600080fd5b906000526020600020016000915090508054610dd490612844565b80601f0160208091040260200160405190810160405280929190818152602001828054610e0090612844565b8015610e4d5780601f10610e2257610100808354040283529160200191610e4d565b820191906000526020600020905b815481529060010190602001808311610e3057829003601f168201915b505050505081565b600b60205280600052604060002060009150905080600201604051806020016040529081600082015481525050908060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060050154905083565b6000816001819055507f2d5b6cb95ba2d00a93cd4ffa61ec07ef4bb1694f20c02a3cccb170a38df81ef8600154604051610eed9190612399565b60405180910390a16001549050919050565b60008060606000600a6000815480929190610f19906128c1565b9190505590508a600460008e81526020019081526020016000209080519060200190610f46929190611103565b5088600560008c81526020019081526020016000209080519060200190610f6e929190611163565b506000600b60008381526020019081526020016000209050868160040160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555088816002016000820151816000015590505087816003019080519060200190610ff39291906111c3565b50858160050181905550600460008e8152602001908152602001600020816000016000848152602001908152602001600020908054611033929190611210565b50600560008c815260200190815260200160002081600101600084815260200190815260200160002090805461106a929190611278565b50818160040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1682600301808054806020026020016040519081016040528092919081815260200182805480156110e057602002820191906000526020600020905b8154815260200190600101908083116110cc575b505050505090509450945094505050985098509895505050505050565b60065481565b828054828255906000526020600020908101928215611152579160200282015b828111156111515782518290805190602001906111419291906112e0565b5091602001919060010190611123565b5b50905061115f9190611366565b5090565b8280548282559060005260206000209081019282156111b2579160200282015b828111156111b15782518290805190602001906111a192919061138a565b5091602001919060010190611183565b5b5090506111bf9190611410565b5090565b8280548282559060005260206000209081019282156111ff579160200282015b828111156111fe5782518255916020019190600101906111e3565b5b50905061120c9190611434565b5090565b8280548282559060005260206000209081019282156112675760005260206000209182015b8281111561126657828290805461124b90612844565b611256929190611451565b5091600101919060010190611235565b5b5090506112749190611366565b5090565b8280548282559060005260206000209081019282156112cf5760005260206000209182015b828111156112ce5782829080546112b390612844565b6112be9291906114de565b509160010191906001019061129d565b5b5090506112dc9190611410565b5090565b8280546112ec90612844565b90600052602060002090601f01602090048101928261130e5760008555611355565b82601f1061132757805160ff1916838001178555611355565b82800160010185558215611355579182015b82811115611354578251825591602001919060010190611339565b5b5090506113629190611434565b5090565b5b80821115611386576000818161137d919061156b565b50600101611367565b5090565b82805461139690612844565b90600052602060002090601f0160209004810192826113b857600085556113ff565b82601f106113d157805160ff19168380011785556113ff565b828001600101855582156113ff579182015b828111156113fe5782518255916020019190600101906113e3565b5b50905061140c9190611434565b5090565b5b80821115611430576000818161142791906115ab565b50600101611411565b5090565b5b8082111561144d576000816000905550600101611435565b5090565b82805461145d90612844565b90600052602060002090601f01602090048101928261147f57600085556114cd565b82601f1061149057805485556114cd565b828001600101855582156114cd57600052602060002091601f016020900482015b828111156114cc5782548255916001019190600101906114b1565b5b5090506114da9190611434565b5090565b8280546114ea90612844565b90600052602060002090601f01602090048101928261150c576000855561155a565b82601f1061151d578054855561155a565b8280016001018555821561155a57600052602060002091601f016020900482015b8281111561155957825482559160010191906001019061153e565b5b5090506115679190611434565b5090565b50805461157790612844565b6000825580601f1061158957506115a8565b601f0160209004906000526020600020908101906115a79190611434565b5b50565b5080546115b790612844565b6000825580601f106115c957506115e8565b601f0160209004906000526020600020908101906115e79190611434565b5b50565b60006115fe6115f9846124a6565b612481565b90508083825260208201905082856020860282011115611621576116206129a6565b5b60005b8581101561166f57813567ffffffffffffffff81111561164757611646612997565b5b80860161165489826118ba565b85526020850194506020840193505050600181019050611624565b5050509392505050565b600061168c611687846124d2565b612481565b905080838252602082019050828560208602820111156116af576116ae6129a6565b5b60005b858110156116fd57813567ffffffffffffffff8111156116d5576116d4612997565b5b8086016116e289826118fd565b855260208501945060208401935050506001810190506116b2565b5050509392505050565b600061171a611715846124fe565b612481565b9050808382526020820190508285602086028201111561173d5761173c6129a6565b5b60005b8581101561176d5781611753888261199b565b845260208401935060208301925050600181019050611740565b5050509392505050565b600061178a6117858461252a565b612481565b9050828152602081018484840111156117a6576117a56129ab565b5b6117b1848285612802565b509392505050565b60006117cc6117c78461255b565b612481565b9050828152602081018484840111156117e8576117e76129ab565b5b6117f3848285612802565b509392505050565b60008135905061180a816129d8565b61181381612785565b905092915050565b600082601f8301126118305761182f612997565b5b81356118408482602086016115eb565b91505092915050565b600082601f83011261185e5761185d612997565b5b813561186e848260208601611679565b91505092915050565b600082601f83011261188c5761188b612997565b5b813561189c848260208601611707565b91505092915050565b6000813590506118b4816129ef565b92915050565b600082601f8301126118cf576118ce612997565b5b81356118df848260208601611777565b91505092915050565b6000813590506118f781612a06565b92915050565b600082601f83011261191257611911612997565b5b81356119228482602086016117b9565b91505092915050565b6000602082840312156119415761194061299c565b5b81905092915050565b6000602082840312156119605761195f6129a1565b5b61196a6020612481565b9050600061197a8482850161199b565b60008301525092915050565b60008135905061199581612a1d565b92915050565b6000813590506119aa81612a34565b92915050565b6000602082840312156119c6576119c56129b5565b5b600082013567ffffffffffffffff8111156119e4576119e36129b0565b5b6119f08482850161181b565b91505092915050565b600060208284031215611a0f57611a0e6129b5565b5b600082013567ffffffffffffffff811115611a2d57611a2c6129b0565b5b611a3984828501611849565b91505092915050565b600060208284031215611a5857611a576129b5565b5b6000611a66848285016118a5565b91505092915050565b600060208284031215611a8557611a846129b5565b5b6000611a93848285016118e8565b91505092915050565b60008060408385031215611ab357611ab26129b5565b5b6000611ac18582860161192b565b9250506020611ad28582860161192b565b9150509250929050565b600060208284031215611af257611af16129b5565b5b6000611b008482850161199b565b91505092915050565b600080600080600080600080610100898b031215611b2a57611b296129b5565b5b6000611b388b828c0161199b565b985050602089013567ffffffffffffffff811115611b5957611b586129b0565b5b611b658b828c01611849565b9750506040611b768b828c0161199b565b965050606089013567ffffffffffffffff811115611b9757611b966129b0565b5b611ba38b828c0161181b565b9550506080611bb48b828c0161194a565b94505060a089013567ffffffffffffffff811115611bd557611bd46129b0565b5b611be18b828c01611877565b93505060c0611bf28b828c016117fb565b92505060e0611c038b828c01611986565b9150509295985092959890939650565b60008060408385031215611c2a57611c296129b5565b5b6000611c388582860161199b565b9250506020611c498582860161199b565b9150509250929050565b6000611c5f8383611ff4565b905092915050565b6000611c738383612066565b905092915050565b6000611c8783836120f5565b905092915050565b6000611c9b8383612167565b905092915050565b6000611caf83836121e7565b60208301905092915050565b6000611cc7838361221f565b60208301905092915050565b6000611cdf8383612257565b60208301905092915050565b611cf481612785565b82525050565b6000611d0582612635565b611d0f81856126f3565b935083602082028501611d218561258c565b8060005b85811015611d5d5784840389528151611d3e8582611c53565b9450611d4983612698565b925060208a01995050600181019050611d25565b50829750879550505050505092915050565b6000611d7a82612640565b611d8481856126f3565b935083602082028501611d968561259c565b8060005b85811015611dd157848403895281611db28582611c67565b9450611dbd836126a5565b925060208a01995050600181019050611d9a565b50829750879550505050505092915050565b6000611dee8261264b565b611df88185612704565b935083602082028501611e0a856125b1565b8060005b85811015611e465784840389528151611e278582611c7b565b9450611e32836126b2565b925060208a01995050600181019050611e0e565b50829750879550505050505092915050565b6000611e6382612656565b611e6d8185612704565b935083602082028501611e7f856125c1565b8060005b85811015611eba57848403895281611e9b8582611c8f565b9450611ea6836126bf565b925060208a01995050600181019050611e83565b50829750879550505050505092915050565b6000611ed782612661565b611ee18185612715565b9350611eec836125d6565b8060005b83811015611f1d578151611f048882611ca3565b9750611f0f836126cc565b925050600181019050611ef0565b5085935050505092915050565b6000611f358261266c565b611f3f8185612715565b9350611f4a836125e6565b8060005b83811015611f7a5781611f618882611cbb565b9750611f6c836126d9565b925050600181019050611f4e565b5085935050505092915050565b6000611f9282612677565b611f9c8185612726565b9350611fa7836125fb565b8060005b83811015611fd8578151611fbf8882611cd3565b9750611fca836126e6565b925050600181019050611fab565b5085935050505092915050565b611fee81612797565b82525050565b6000611fff82612682565b6120098185612737565b9350612019818560208601612811565b612022816129ba565b840191505092915050565b600061203882612682565b6120428185612748565b9350612052818560208601612811565b61205b816129ba565b840191505092915050565b6000815461207381612844565b61207d8186612737565b9450600182166000811461209857600181146120aa576120dd565b60ff19831686526020860193506120dd565b6120b38561260b565b60005b838110156120d5578154818901526001820191506020810190506120b6565b808801955050505b50505092915050565b6120ef816127a3565b82525050565b60006121008261268d565b61210a8185612759565b935061211a818560208601612811565b612123816129ba565b840191505092915050565b60006121398261268d565b612143818561276a565b9350612153818560208601612811565b61215c816129ba565b840191505092915050565b6000815461217481612844565b61217e8186612759565b9450600182166000811461219957600181146121ab576121de565b60ff19831686526020860193506121de565b6121b485612620565b60005b838110156121d6578154818901526001820191506020810190506121b7565b808801955050505b50505092915050565b6020820160008201516121fd6000850182612257565b50505050565b6020820160008201516122196000850182612257565b50505050565b60208201600080830154905061223481612876565b6122416000860182612257565b5050505050565b612251816127ad565b82525050565b612260816127f8565b82525050565b61226f816127f8565b82525050565b600060208201905061228a6000830184611ceb565b92915050565b600060208201905081810360008301526122aa8184611cfa565b905092915050565b600060208201905081810360008301526122cc8184611d6f565b905092915050565b600060208201905081810360008301526122ee8184611de3565b905092915050565b600060208201905081810360008301526123108184611e58565b905092915050565b600060208201905081810360008301526123328184611ecc565b905092915050565b600060208201905081810360008301526123548184611f2a565b905092915050565b60006020820190506123716000830184611fe5565b92915050565b60006020820190508181036000830152612391818461202d565b905092915050565b60006020820190506123ae60008301846120e6565b92915050565b600060208201905081810360008301526123ce818461212e565b905092915050565b60006060820190506123eb6000830186612203565b6123f86020830185611ceb565b6124056040830184612248565b949350505050565b60006020820190506124226000830184612248565b92915050565b600060208201905061243d6000830184612266565b92915050565b60006060820190506124586000830186612266565b6124656020830185611ceb565b81810360408301526124778184611f87565b9050949350505050565b600061248b61249c565b90506124978282612890565b919050565b6000604051905090565b600067ffffffffffffffff8211156124c1576124c0612968565b5b602082029050602081019050919050565b600067ffffffffffffffff8211156124ed576124ec612968565b5b602082029050602081019050919050565b600067ffffffffffffffff82111561251957612518612968565b5b602082029050602081019050919050565b600067ffffffffffffffff82111561254557612544612968565b5b61254e826129ba565b9050602081019050919050565b600067ffffffffffffffff82111561257657612575612968565b5b61257f826129ba565b9050602081019050919050565b6000819050602082019050919050565b60008190508160005260206000209050919050565b6000819050602082019050919050565b60008190508160005260206000209050919050565b6000819050602082019050919050565b60008190508160005260206000209050919050565b6000819050602082019050919050565b60008190508160005260206000209050919050565b60008190508160005260206000209050919050565b600081519050919050565b600081549050919050565b600081519050919050565b600081549050919050565b600081519050919050565b600081549050919050565b600081519050919050565b600081519050919050565b600081519050919050565b6000602082019050919050565b6000600182019050919050565b6000602082019050919050565b6000600182019050919050565b6000602082019050919050565b6000600182019050919050565b6000602082019050919050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b6000819050919050565b6000612790826127b7565b9050919050565b60008115159050919050565b6000819050919050565b6000819050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600074ffffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b82818337600083830152505050565b60005b8381101561282f578082015181840152602081019050612814565b8381111561283e576000848401525b50505050565b6000600282049050600182168061285c57607f821691505b602082108114156128705761286f612939565b5b50919050565b6000612889612884836129cb565b61277b565b9050919050565b612899826129ba565b810181811067ffffffffffffffff821117156128b8576128b7612968565b5b80604052505050565b60006128cc826127f8565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8214156128ff576128fe61290a565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b60008160001c9050919050565b6129e1816127d7565b81146129ec57600080fd5b50565b6129f881612797565b8114612a0357600080fd5b50565b612a0f816127a3565b8114612a1a57600080fd5b50565b612a26816127ad565b8114612a3157600080fd5b50565b612a3d816127f8565b8114612a4857600080fd5b5056fea26474726f6e5822122029006ff10a7c6a94dea5d1f38496dd6db215781bda1f898457488c8a8580fd3464736f6c63430008060033",
    },
    abiV2Test2: {
        contractName: "SaiValuesAggregator",
        abi:[
            {
                "outputs": [{
                    "type": "address"
                }],
                "constant": true,
                "name": "sin",
                "stateMutability": "View",
                "type": "Function"
            }, {
                "outputs": [{
                    "type": "address"
                }],
                "constant": true,
                "name": "skr",
                "stateMutability": "View",
                "type": "Function"
            }, {
                "outputs": [{
                    "type": "address"
                }],
                "constant": true,
                "name": "gov",
                "stateMutability": "View",
                "type": "Function"
            }, {
                "outputs": [{
                    "type": "address"
                }],
                "constant": true,
                "name": "tub",
                "stateMutability": "View",
                "type": "Function"
            }, {
                "outputs": [{
                    "name": "blockNumber",
                    "type": "uint256"
                }, {
                    "name": "lad",
                    "type": "address"
                }, {
                    "name": "safe",
                    "type": "bool"
                }, {
                    "name": "r",
                    "type": "uint256[]"
                }],
                "constant": true,
                "inputs": [{
                    "name": "cup",
                    "type": "bytes32"
                }],
                "name": "aggregateCDPValues",
                "stateMutability": "View",
                "type": "Function"
            }, {
                "outputs": [{
                    "type": "address"
                }],
                "constant": true,
                "name": "vox",
                "stateMutability": "View",
                "type": "Function"
            }, {
                "outputs": [{
                    "type": "address"
                }],
                "constant": true,
                "name": "gem",
                "stateMutability": "View",
                "type": "Function"
            }, {
                "outputs": [{
                    "type": "address"
                }],
                "constant": true,
                "name": "sai",
                "stateMutability": "View",
                "type": "Function"
            }, {
                "outputs": [{
                    "name": "blockNumber",
                    "type": "uint256"
                }, {
                    "name": "pipVal",
                    "type": "bytes32"
                }, {
                    "name": "pipSet",
                    "type": "bool"
                }, {
                    "name": "pepVal",
                    "type": "bytes32"
                }, {
                    "name": "pepSet",
                    "type": "bool"
                }, {
                    "name": "sStatus",
                    "type": "bool[]"
                }, {
                    "name": "sValues",
                    "type": "uint256[]"
                }, {
                    "name": "tValues",
                    "type": "uint256[]"
                }],
                "constant": true,
                "inputs": [{
                    "name": "addr",
                    "type": "address"
                }, {
                    "name": "proxy",
                    "type": "address"
                }],
                "name": "aggregateValues",
                "stateMutability": "View",
                "type": "Function"
            }, {
                "outputs": [{
                    "name": "blockNumber",
                    "type": "uint256"
                }, {
                    "name": "saiContracts",
                    "type": "address[]"
                }, {
                    "name": "proxy",
                    "type": "address"
                }],
                "constant": true,
                "inputs": [{
                    "name": "proxyRegistry",
                    "type": "address"
                }, {
                    "name": "addr",
                    "type": "address"
                }],
                "name": "getContractsAddrs",
                "stateMutability": "View",
                "type": "Function"
            }, {
                "outputs": [{
                    "type": "address"
                }],
                "constant": true,
                "name": "pep",
                "stateMutability": "View",
                "type": "Function"
            }, {
                "outputs": [{
                    "type": "address"
                }],
                "constant": true,
                "name": "pip",
                "stateMutability": "View",
                "type": "Function"
            }, {
                "outputs": [{
                    "type": "address"
                }],
                "constant": true,
                "name": "pit",
                "stateMutability": "View",
                "type": "Function"
            }, {
                "outputs": [{
                    "type": "address"
                }],
                "constant": true,
                "name": "tap",
                "stateMutability": "View",
                "type": "Function"
            }, {
                "outputs": [{
                    "type": "address"
                }],
                "constant": true,
                "name": "top",
                "stateMutability": "View",
                "type": "Function"
            }, {
                "inputs": [{
                    "name": "_top",
                    "type": "address"
                }],
                "stateMutability": "Nonpayable",
                "type": "Constructor"
            }
        ],
        bytecode:
            "608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b506040516020806200355c833981016040525160008054600160a060020a03909216600160a060020a03199092169190911790556134ee806200006e6000396000f3006080604052600436106100c15763ffffffff60e060020a600035041663071bafb581146100c65780630f8a771e1461011157806312d43a511461014057806334e70cc21461016f5780633fdb36281461019e57806367550a351461024f5780637bd2bea71461027e5780639166cba4146102ad5780639f184dd5146102dc578063a47b1a6c1461042c578063ace237f5146104e1578063d741e2f914610510578063f03c7c6e1461053f578063fd2210311461056e578063fe6dcdba1461059d575b600080fd5b3480156100d257600080fd5b50d380156100df57600080fd5b50d280156100ec57600080fd5b506100f56105cc565b60408051600160a060020a039092168252519081900360200190f35b34801561011d57600080fd5b50d3801561012a57600080fd5b50d2801561013757600080fd5b506100f5610644565b34801561014c57600080fd5b50d3801561015957600080fd5b50d2801561016657600080fd5b506100f561068b565b34801561017b57600080fd5b50d3801561018857600080fd5b50d2801561019557600080fd5b506100f56106d2565b3480156101aa57600080fd5b50d380156101b757600080fd5b50d280156101c457600080fd5b506101d0600435610726565b6040518085815260200184600160a060020a0316600160a060020a031681526020018315151515815260200180602001828103825283818151815260200191508051906020019060200280838360005b83811015610238578181015183820152602001610220565b505050509050019550505050505060405180910390f35b34801561025b57600080fd5b50d3801561026857600080fd5b50d2801561027557600080fd5b506100f56112d4565b34801561028a57600080fd5b50d3801561029757600080fd5b50d280156102a457600080fd5b506100f561131b565b3480156102b957600080fd5b50d380156102c657600080fd5b50d280156102d357600080fd5b506100f5611362565b3480156102e857600080fd5b50d380156102f557600080fd5b50d2801561030257600080fd5b5061031d600160a060020a03600435811690602435166113a9565b6040805189815260208082018a90528815159282019290925260608101879052851515608082015261010060a0820181815286519183019190915285519192909160c084019160e0850191610120860191898101910280838360005b83811015610391578181015183820152602001610379565b50505050905001848103835286818151815260200191508051906020019060200280838360005b838110156103d05781810151838201526020016103b8565b50505050905001848103825285818151815260200191508051906020019060200280838360005b8381101561040f5781810151838201526020016103f7565b505050509050019b50505050505050505050505060405180910390f35b34801561043857600080fd5b50d3801561044557600080fd5b50d2801561045257600080fd5b5061046d600160a060020a0360043581169060243516612e10565b604051808481526020018060200183600160a060020a0316600160a060020a03168152602001828103825284818151815260200191508051906020019060200280838360005b838110156104cb5781810151838201526020016104b3565b5050505090500194505050505060405180910390f35b3480156104ed57600080fd5b50d380156104fa57600080fd5b50d2801561050757600080fd5b506100f5613197565b34801561051c57600080fd5b50d3801561052957600080fd5b50d2801561053657600080fd5b506100f56131de565b34801561054b57600080fd5b50d3801561055857600080fd5b50d2801561056557600080fd5b506100f5613225565b34801561057a57600080fd5b50d3801561058757600080fd5b50d2801561059457600080fd5b506100f561326c565b3480156105a957600080fd5b50d380156105b657600080fd5b50d280156105c357600080fd5b506100f56132c0565b60006105d66106d2565b600160a060020a031663071bafb56040518163ffffffff1660e060020a028152600401602060405180830381600087803b15801561061357600080fd5b505af1158015610627573d6000803e3d6000fd5b505050506040513d602081101561063d57600080fd5b5051905090565b600061064e6106d2565b600160a060020a0316630f8a771e6040518163ffffffff1660e060020a028152600401602060405180830381600087803b15801561061357600080fd5b60006106956106d2565b600160a060020a03166312d43a516040518163ffffffff1660e060020a028152600401602060405180830381600087803b15801561061357600080fd5b60008060009054906101000a9004600160a060020a0316600160a060020a03166334e70cc26040518163ffffffff1660e060020a028152600401602060405180830381600087803b15801561061357600080fd5b6040805160088082526101208201909252439160009182916060918391829182918291829160208201610100803883390190505095506107646106d2565b945061076e6112d4565b604080517ffdac0025000000000000000000000000000000000000000000000000000000008152600481018d90529051919550600160a060020a0387169163fdac0025916024808201926080929091908290030181600087803b1580156107d457600080fd5b505af11580156107e8573d6000803e3d6000fd5b505050506040513d60808110156107fe57600080fd5b508051602082015160408301516060909301518951929391928a90600090811061082457fe5b9060200190602002018a600181518110151561083c57fe5b9060200190602002018b600281518110151561085457fe5b60209081029091010192909252919052529750600160a060020a038816156112c857604080517fe95823ad000000000000000000000000000000000000000000000000000000008152600481018c90529051600160a060020a0387169163e95823ad9160248083019260209291908290030181600087803b1580156108d857600080fd5b505af11580156108ec573d6000803e3d6000fd5b505050506040513d602081101561090257600080fd5b5051604080517f51f9106600000000000000000000000000000000000000000000000000000000815290519198506109b091600160a060020a038816916351f910669160048083019260209291908290030181600087803b15801561096657600080fd5b505af115801561097a573d6000803e3d6000fd5b505050506040513d602081101561099057600080fd5b50518751889060009081106109a157fe5b906020019060200201516132cf565b604080517ff7c8d634000000000000000000000000000000000000000000000000000000008152600481018d90529051919450600160a060020a0387169163f7c8d634916024808201926020929091908290030181600087803b158015610a1657600080fd5b505af1158015610a2a573d6000803e3d6000fd5b505050506040513d6020811015610a4057600080fd5b5051604080517f495d32cb0000000000000000000000000000000000000000000000000000000081529051919350600091600160a060020a0387169163495d32cb91600480830192602092919082900301818787803b158015610aa257600080fd5b505af1158015610ab6573d6000803e3d6000fd5b505050506040513d6020811015610acc57600080fd5b5051118015610adb5750600082115b610ae6576000610bed565b610bed83610be886600160a060020a031663495d32cb6040518163ffffffff1660e060020a028152600401602060405180830381600087803b158015610b2b57600080fd5b505af1158015610b3f573d6000803e3d6000fd5b505050506040513d6020811015610b5557600080fd5b810190808051906020019092919050505088600160a060020a031663f7c8d6348f6040518263ffffffff1660e060020a028152600401808260001916600019168152602001915050602060405180830381600087803b158015610bb757600080fd5b505af1158015610bcb573d6000803e3d6000fd5b505050506040513d6020811015610be157600080fd5b50516132cf565b613312565b866003815181101515610bfc57fe5b60209081029091010152868015610c7c5750600085600160a060020a031663ab0783da6040518163ffffffff1660e060020a028152600401602060405180830381600087803b158015610c4e57600080fd5b505af1158015610c62573d6000803e3d6000fd5b505050506040513d6020811015610c7857600080fd5b5051115b8015610cf15750600084600160a060020a031663495d32cb6040518163ffffffff1660e060020a028152600401602060405180830381600087803b158015610cc357600080fd5b505af1158015610cd7573d6000803e3d6000fd5b505050506040513d6020811015610ced57600080fd5b5051115b610cfc576000610e63565b610e63610dd084610dcb88600160a060020a031663ab0783da6040518163ffffffff1660e060020a028152600401602060405180830381600087803b158015610d4457600080fd5b505af1158015610d58573d6000803e3d6000fd5b505050506040513d6020811015610d6e57600080fd5b5051604080517f495d32cb0000000000000000000000000000000000000000000000000000000081529051600160a060020a038b169163495d32cb9160048083019260209291908290030181600087803b158015610bb757600080fd5b613332565b604080517ff7c8d634000000000000000000000000000000000000000000000000000000008152600481018e90529051600160a060020a0389169163f7c8d6349160248083019260209291908290030181600087803b158015610e3257600080fd5b505af1158015610e46573d6000803e3d6000fd5b505050506040513d6020811015610e5c57600080fd5b505161334e565b866004815181101515610e7257fe5b9060200190602002018181525050600085600160a060020a03166351f910666040518163ffffffff1660e060020a028152600401602060405180830381600087803b158015610ec057600080fd5b505af1158015610ed4573d6000803e3d6000fd5b505050506040513d6020811015610eea57600080fd5b505111610ef8576000610fed565b610fed610f7e610f408488600160a060020a031663ab0783da6040518163ffffffff1660e060020a028152600401602060405180830381600087803b158015610bb757600080fd5b86600160a060020a031663495d32cb6040518163ffffffff1660e060020a028152600401602060405180830381600087803b158015610bb757600080fd5b86600160a060020a03166351f910666040518163ffffffff1660e060020a028152600401602060405180830381600087803b158015610fbc57600080fd5b505af1158015610fd0573d6000803e3d6000fd5b505050506040513d6020811015610fe657600080fd5b5051613332565b905086610ffb57600061114a565b600086600181518110151561100c57fe5b90602001906020020151116110395785600081518110151561102a57fe5b9060200190602002015161114a565b6000811161104857600061114a565b61114a86600081518110151561105a57fe5b9060200190602002015186600160a060020a031663f000c1bb6040518163ffffffff1660e060020a028152600401602060405180830381600087803b1580156110a257600080fd5b505af11580156110b6573d6000803e3d6000fd5b505050506040513d60208110156110cc57600080fd5b505183116111435786600160a060020a031663f000c1bb6040518163ffffffff1660e060020a028152600401602060405180830381600087803b15801561111257600080fd5b505af1158015611126573d6000803e3d6000fd5b505050506040513d602081101561113c57600080fd5b5051611145565b825b61334e565b86600581518110151561115957fe5b6020908102909101015285516111be908790600590811061117657fe5b9060200190602002015186600160a060020a0316637ec9c3b86040518163ffffffff1660e060020a028152600401602060405180830381600087803b158015610bb757600080fd5b8660068151811015156111cd57fe5b6020908102909101015285516000908790829081106111e857fe5b906020019060200201511180156111ff5750600082115b61120a5760006112ae565b6112ae6112906112528488600160a060020a031663ab0783da6040518163ffffffff1660e060020a028152600401602060405180830381600087803b158015610bb757600080fd5b87600160a060020a0316637ec9c3b86040518163ffffffff1660e060020a028152600401602060405180830381600087803b158015610fbc57600080fd5b87600081518110151561129f57fe5b90602001906020020151613312565b8660078151811015156112bd57fe5b602090810290910101525b50505050509193509193565b60006112de6106d2565b600160a060020a03166367550a356040518163ffffffff1660e060020a028152600401602060405180830381600087803b15801561061357600080fd5b60006113256106d2565b600160a060020a0316637bd2bea76040518163ffffffff1660e060020a028152600401602060405180830381600087803b15801561061357600080fd5b600061136c6106d2565b600160a060020a0316639166cba46040518163ffffffff1660e060020a028152600401602060405180830381600087803b15801561061357600080fd5b43600080808060608080836113bc6131de565b600160a060020a03166359e02dd76040518163ffffffff1660e060020a0281526004016040805180830381600087803b1580156113f857600080fd5b505af115801561140c573d6000803e3d6000fd5b505050506040513d604081101561142257600080fd5b5080516020909101519098509650611438613197565b600160a060020a03166359e02dd76040518163ffffffff1660e060020a0281526004016040805180830381600087803b15801561147457600080fd5b505af1158015611488573d6000803e3d6000fd5b505050506040513d604081101561149e57600080fd5b50805160209182015160408051600480825260a08201909252929950909750909182016080803883390190505093506114d56106d2565b600160a060020a0316636626b26d6040518163ffffffff1660e060020a028152600401602060405180830381600087803b15801561151257600080fd5b505af1158015611526573d6000803e3d6000fd5b505050506040513d602081101561153c57600080fd5b505184518590600090811061154d57fe5b9115156020928302909101909101526115646106d2565b600160a060020a031663b2a1449b6040518163ffffffff1660e060020a028152600401602060405180830381600087803b1580156115a157600080fd5b505af11580156115b5573d6000803e3d6000fd5b505050506040513d60208110156115cb57600080fd5b50518451859060019081106115dc57fe5b9115156020928302909101909101526116c86115f6610644565b600160a060020a03166370a0823161160c6106d2565b6040518263ffffffff1660e060020a0281526004018082600160a060020a0316600160a060020a03168152602001915050602060405180830381600087803b15801561165757600080fd5b505af115801561166b573d6000803e3d6000fd5b505050506040513d602081101561168157600080fd5b505161168b6106d2565b600160a060020a03166351f910666040518163ffffffff1660e060020a028152600401602060405180830381600087803b158015610bb757600080fd5b90506116d26105cc565b600160a060020a03166318160ddd6040518163ffffffff1660e060020a028152600401602060405180830381600087803b15801561170f57600080fd5b505af1158015611723573d6000803e3d6000fd5b505050506040513d602081101561173957600080fd5b50518451908210908590600290811061174e57fe5b9115156020928302909101909101526118166117686105cc565b600160a060020a03166318160ddd6040518163ffffffff1660e060020a028152600401602060405180830381600087803b1580156117a557600080fd5b505af11580156117b9573d6000803e3d6000fd5b505050506040513d60208110156117cf57600080fd5b50516117d96106d2565b600160a060020a031663ab0783da6040518163ffffffff1660e060020a028152600401602060405180830381600087803b158015610bb757600080fd5b81101584600381518110151561182857fe5b9115156020928302919091018201526040805160138082526102808201909252918201610260803883390190505092506118606106d2565b600160a060020a031663509bf2bf6040518163ffffffff1660e060020a028152600401602060405180830381600087803b15801561189d57600080fd5b505af11580156118b1573d6000803e3d6000fd5b505050506040513d60208110156118c757600080fd5b50518351849060009081106118d857fe5b602090810290910101526118ea6106d2565b600160a060020a031663ab0783da6040518163ffffffff1660e060020a028152600401602060405180830381600087803b15801561192757600080fd5b505af115801561193b573d6000803e3d6000fd5b505050506040513d602081101561195157600080fd5b505183518490600190811061196257fe5b602090810290910101526119746106d2565b600160a060020a031663355274ea6040518163ffffffff1660e060020a028152600401602060405180830381600087803b1580156119b157600080fd5b505af11580156119c5573d6000803e3d6000fd5b505050506040513d60208110156119db57600080fd5b50518351849060029081106119ec57fe5b602090810290910101526119fe6106d2565b600160a060020a031663c8e13bb46040518163ffffffff1660e060020a028152600401602060405180830381600087803b158015611a3b57600080fd5b505af1158015611a4f573d6000803e3d6000fd5b505050506040513d6020811015611a6557600080fd5b5051835184906003908110611a7657fe5b60209081029091010152611a886106d2565b600160a060020a03166399c8d5566040518163ffffffff1660e060020a028152600401602060405180830381600087803b158015611ac557600080fd5b505af1158015611ad9573d6000803e3d6000fd5b505050506040513d6020811015611aef57600080fd5b5051835184906004908110611b0057fe5b60209081029091010152611b126106d2565b600160a060020a031663ddca3f436040518163ffffffff1660e060020a028152600401602060405180830381600087803b158015611b4f57600080fd5b505af1158015611b63573d6000803e3d6000fd5b505050506040513d6020811015611b7957600080fd5b5051835184906005908110611b8a57fe5b60209081029091010152611b9c6106d2565b600160a060020a031663c92aecc46040518163ffffffff1660e060020a028152600401602060405180830381600087803b158015611bd957600080fd5b505af1158015611bed573d6000803e3d6000fd5b505050506040513d6020811015611c0357600080fd5b5051835184906006908110611c1457fe5b60209081029091010152611c266106d2565b600160a060020a031663338a02616040518163ffffffff1660e060020a028152600401602060405180830381600087803b158015611c6357600080fd5b505af1158015611c77573d6000803e3d6000fd5b505050506040513d6020811015611c8d57600080fd5b5051835184906007908110611c9e57fe5b60209081029091010152611cb06106d2565b600160a060020a03166320aba08b6040518163ffffffff1660e060020a028152600401602060405180830381600087803b158015611ced57600080fd5b505af1158015611d01573d6000803e3d6000fd5b505050506040513d6020811015611d1757600080fd5b5051835184906008908110611d2857fe5b60209081029091010152611d3a6106d2565b600160a060020a0316636c32c0a66040518163ffffffff1660e060020a028152600401602060405180830381600087803b158015611d7757600080fd5b505af1158015611d8b573d6000803e3d6000fd5b505050506040513d6020811015611da157600080fd5b5051835184906009908110611db257fe5b60209081029091010152611dc46106d2565b600160a060020a03166351f910666040518163ffffffff1660e060020a028152600401602060405180830381600087803b158015611e0157600080fd5b505af1158015611e15573d6000803e3d6000fd5b505050506040513d6020811015611e2b57600080fd5b505183518490600a908110611e3c57fe5b60209081029091010152611e4e6106d2565b600160a060020a0316637ec9c3b86040518163ffffffff1660e060020a028152600401602060405180830381600087803b158015611e8b57600080fd5b505af1158015611e9f573d6000803e3d6000fd5b505050506040513d6020811015611eb557600080fd5b505183518490600b908110611ec657fe5b60209081029091010152611ed86112d4565b600160a060020a031663495d32cb6040518163ffffffff1660e060020a028152600401602060405180830381600087803b158015611f1557600080fd5b505af1158015611f29573d6000803e3d6000fd5b505050506040513d6020811015611f3f57600080fd5b505183518490600c908110611f5057fe5b60209081029091010152611f626112d4565b600160a060020a0316635d6542af6040518163ffffffff1660e060020a028152600401602060405180830381600087803b158015611f9f57600080fd5b505af1158015611fb3573d6000803e3d6000fd5b505050506040513d6020811015611fc957600080fd5b505183518490600d908110611fda57fe5b60209081029091010152611fec6112d4565b600160a060020a031663143e55e06040518163ffffffff1660e060020a028152600401602060405180830381600087803b15801561202957600080fd5b505af115801561203d573d6000803e3d6000fd5b505050506040513d602081101561205357600080fd5b505183518490600e90811061206457fe5b6020908102909101015261207661326c565b600160a060020a031663a551878e6040518163ffffffff1660e060020a028152600401602060405180830381600087803b1580156120b357600080fd5b505af11580156120c7573d6000803e3d6000fd5b505050506040513d60208110156120dd57600080fd5b505183518490600f9081106120ee57fe5b6020908102909101015261210061326c565b600160a060020a0316636c32c0a66040518163ffffffff1660e060020a028152600401602060405180830381600087803b15801561213d57600080fd5b505af1158015612151573d6000803e3d6000fd5b505050506040513d602081101561216757600080fd5b505183518490601090811061217857fe5b602090810290910101526040805160148082526102a08201909252908160200160208202803883390190505091508a600160a060020a0316318260008151811015156121c057fe5b602090810290910101526121d261131b565b600160a060020a03166318160ddd6040518163ffffffff1660e060020a028152600401602060405180830381600087803b15801561220f57600080fd5b505af1158015612223573d6000803e3d6000fd5b505050506040513d602081101561223957600080fd5b505182518390600190811061224a57fe5b6020908102909101015261225c61131b565b600160a060020a03166370a082318c6040518263ffffffff1660e060020a0281526004018082600160a060020a0316600160a060020a03168152602001915050602060405180830381600087803b1580156122b657600080fd5b505af11580156122ca573d6000803e3d6000fd5b505050506040513d60208110156122e057600080fd5b50518251839060029081106122f157fe5b6020908102909101015261230361131b565b600160a060020a03166370a082316123196106d2565b6040518263ffffffff1660e060020a0281526004018082600160a060020a0316600160a060020a03168152602001915050602060405180830381600087803b15801561236457600080fd5b505af1158015612378573d6000803e3d6000fd5b505050506040513d602081101561238e57600080fd5b505182518390600390811061239f57fe5b602090810290910101526123b161131b565b600160a060020a03166370a082316123c761326c565b6040518263ffffffff1660e060020a0281526004018082600160a060020a0316600160a060020a03168152602001915050602060405180830381600087803b15801561241257600080fd5b505af1158015612426573d6000803e3d6000fd5b505050506040513d602081101561243c57600080fd5b505182518390600490811061244d57fe5b6020908102909101015261245f61068b565b600160a060020a03166318160ddd6040518163ffffffff1660e060020a028152600401602060405180830381600087803b15801561249c57600080fd5b505af11580156124b0573d6000803e3d6000fd5b505050506040513d60208110156124c657600080fd5b50518251839060059081106124d757fe5b602090810290910101526124e961068b565b600160a060020a03166370a082318c6040518263ffffffff1660e060020a0281526004018082600160a060020a0316600160a060020a03168152602001915050602060405180830381600087803b15801561254357600080fd5b505af1158015612557573d6000803e3d6000fd5b505050506040513d602081101561256d57600080fd5b505182518390600690811061257e57fe5b6020908102909101015261259061068b565b600160a060020a03166370a082316125a6613225565b6040518263ffffffff1660e060020a0281526004018082600160a060020a0316600160a060020a03168152602001915050602060405180830381600087803b1580156125f157600080fd5b505af1158015612605573d6000803e3d6000fd5b505050506040513d602081101561261b57600080fd5b505182518390600790811061262c57fe5b6020908102909101015261263e61068b565b604080517fdd62ed3e000000000000000000000000000000000000000000000000000000008152600160a060020a038e811660048301528d811660248301529151929091169163dd62ed3e916044808201926020929091908290030181600087803b1580156126ac57600080fd5b505af11580156126c0573d6000803e3d6000fd5b505050506040513d60208110156126d657600080fd5b50518251839060089081106126e757fe5b602090810290910101526126f9610644565b600160a060020a03166318160ddd6040518163ffffffff1660e060020a028152600401602060405180830381600087803b15801561273657600080fd5b505af115801561274a573d6000803e3d6000fd5b505050506040513d602081101561276057600080fd5b505182518390600990811061277157fe5b60209081029091010152612783610644565b600160a060020a03166370a082318c6040518263ffffffff1660e060020a0281526004018082600160a060020a0316600160a060020a03168152602001915050602060405180830381600087803b1580156127dd57600080fd5b505af11580156127f1573d6000803e3d6000fd5b505050506040513d602081101561280757600080fd5b505182518390600a90811061281857fe5b6020908102909101015261282a610644565b600160a060020a03166370a082316128406106d2565b6040518263ffffffff1660e060020a0281526004018082600160a060020a0316600160a060020a03168152602001915050602060405180830381600087803b15801561288b57600080fd5b505af115801561289f573d6000803e3d6000fd5b505050506040513d60208110156128b557600080fd5b505182518390600b9081106128c657fe5b602090810290910101526128d8610644565b600160a060020a03166370a082316128ee61326c565b6040518263ffffffff1660e060020a0281526004018082600160a060020a0316600160a060020a03168152602001915050602060405180830381600087803b15801561293957600080fd5b505af115801561294d573d6000803e3d6000fd5b505050506040513d602081101561296357600080fd5b505182518390600c90811061297457fe5b60209081029091010152612986611362565b600160a060020a03166318160ddd6040518163ffffffff1660e060020a028152600401602060405180830381600087803b1580156129c357600080fd5b505af11580156129d7573d6000803e3d6000fd5b505050506040513d60208110156129ed57600080fd5b505182518390600d9081106129fe57fe5b60209081029091010152612a10611362565b600160a060020a03166370a082318c6040518263ffffffff1660e060020a0281526004018082600160a060020a0316600160a060020a03168152602001915050602060405180830381600087803b158015612a6a57600080fd5b505af1158015612a7e573d6000803e3d6000fd5b505050506040513d6020811015612a9457600080fd5b505182518390600e908110612aa557fe5b60209081029091010152612ab7611362565b600160a060020a03166370a08231612acd61326c565b6040518263ffffffff1660e060020a0281526004018082600160a060020a0316600160a060020a03168152602001915050602060405180830381600087803b158015612b1857600080fd5b505af1158015612b2c573d6000803e3d6000fd5b505050506040513d6020811015612b4257600080fd5b505182518390600f908110612b5357fe5b60209081029091010152612b65611362565b604080517fdd62ed3e000000000000000000000000000000000000000000000000000000008152600160a060020a038e811660048301528d811660248301529151929091169163dd62ed3e916044808201926020929091908290030181600087803b158015612bd357600080fd5b505af1158015612be7573d6000803e3d6000fd5b505050506040513d6020811015612bfd57600080fd5b5051825183906010908110612c0e57fe5b60209081029091010152612c206105cc565b600160a060020a03166318160ddd6040518163ffffffff1660e060020a028152600401602060405180830381600087803b158015612c5d57600080fd5b505af1158015612c71573d6000803e3d6000fd5b505050506040513d6020811015612c8757600080fd5b5051825183906011908110612c9857fe5b60209081029091010152612caa6105cc565b600160a060020a03166370a08231612cc06106d2565b6040518263ffffffff1660e060020a0281526004018082600160a060020a0316600160a060020a03168152602001915050602060405180830381600087803b158015612d0b57600080fd5b505af1158015612d1f573d6000803e3d6000fd5b505050506040513d6020811015612d3557600080fd5b5051825183906012908110612d4657fe5b60209081029091010152612d586105cc565b600160a060020a03166370a08231612d6e61326c565b6040518263ffffffff1660e060020a0281526004018082600160a060020a0316600160a060020a03168152602001915050602060405180830381600087803b158015612db957600080fd5b505af1158015612dcd573d6000803e3d6000fd5b505050506040513d6020811015612de357600080fd5b5051825183906013908110612df457fe5b9060200190602002018181525050509295985092959890939650565b60408051600c8082526101a08201909252439160609160009160208201610180803883395050600080548351939550600160a060020a0316928592508110612e5457fe5b600160a060020a03909216602092830290910190910152612e736106d2565b826001815181101515612e8257fe5b600160a060020a03909216602092830290910190910152612ea161326c565b826002815181101515612eb057fe5b600160a060020a03909216602092830290910190910152612ecf6112d4565b826003815181101515612ede57fe5b600160a060020a03909216602092830290910190910152612efd613225565b826004815181101515612f0c57fe5b600160a060020a03909216602092830290910190910152612f2b6131de565b826005815181101515612f3a57fe5b600160a060020a03909216602092830290910190910152612f59613197565b826006815181101515612f6857fe5b600160a060020a03909216602092830290910190910152612f8761131b565b826007815181101515612f9657fe5b600160a060020a03909216602092830290910190910152612fb561068b565b826008815181101515612fc457fe5b600160a060020a03909216602092830290910190910152612fe3610644565b826009815181101515612ff257fe5b600160a060020a03909216602092830290910190910152613011611362565b82600a81518110151561302057fe5b600160a060020a0390921660209283029091019091015261303f6105cc565b82600b81518110151561304e57fe5b600160a060020a039283166020918202909201810191909152604080517fc4552791000000000000000000000000000000000000000000000000000000008152878416600482015290519288169263c4552791926024808401939192918290030181600087803b1580156130c157600080fd5b505af11580156130d5573d6000803e3d6000fd5b505050506040513d60208110156130eb57600080fd5b50519050600160a060020a03811615801590613181575083600160a060020a031681600160a060020a0316638da5cb5b6040518163ffffffff1660e060020a028152600401602060405180830381600087803b15801561314a57600080fd5b505af115801561315e573d6000803e3d6000fd5b505050506040513d602081101561317457600080fd5b5051600160a060020a0316145b61318c57600061318e565b805b90509250925092565b60006131a16106d2565b600160a060020a031663ace237f56040518163ffffffff1660e060020a028152600401602060405180830381600087803b15801561061357600080fd5b60006131e86106d2565b600160a060020a031663d741e2f96040518163ffffffff1660e060020a028152600401602060405180830381600087803b15801561061357600080fd5b600061322f6106d2565b600160a060020a031663f03c7c6e6040518163ffffffff1660e060020a028152600401602060405180830381600087803b15801561061357600080fd5b60008060009054906101000a9004600160a060020a0316600160a060020a031663fd2210316040518163ffffffff1660e060020a028152600401602060405180830381600087803b15801561061357600080fd5b600054600160a060020a031681565b60006b033b2e3c9fd0803ce80000006133016132eb85856133c6565b60026b033b2e3c9fd0803ce80000005b04613450565b81151561330a57fe5b049392505050565b60008161330161332a85670de0b6b3a76400006133c6565b6002856132fb565b60008161330161332a856b033b2e3c9fd0803ce80000006133c6565b808203828111156133c057604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601560248201527f64732d6d6174682d7375622d756e646572666c6f770000000000000000000000604482015290519081900360640190fd5b92915050565b60008115806133e35750508082028282828115156133e057fe5b04145b15156133c057604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601460248201527f64732d6d6174682d6d756c2d6f766572666c6f77000000000000000000000000604482015290519081900360640190fd5b808201828110156133c057604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601460248201527f64732d6d6174682d6164642d6f766572666c6f77000000000000000000000000604482015290519081900360640190fd00a165627a7a72305820ac5fab73cd78e020005cb35dc1cb004506054df66bbfd35dc7640dcee1e8f976002900000000000000000000004166b807a4f17d984b163438c9b0f9243c54650c87",
    }
}
