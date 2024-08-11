export const ContractAbi = {
	address: "0x8EDFFa01e86B1f039b6C168b7f8813169a662364",
	abi: [
		{
			inputs: [
				{
					internalType: "address",
					name: "pythContract_",
					type: "address",
				},
				{
					internalType: "bytes32",
					name: "priceFeedId_",
					type: "bytes32",
				},
			],
			stateMutability: "nonpayable",
			type: "constructor",
		},
		{
			inputs: [],
			name: "AssetsDoNotMatchMsgValue",
			type: "error",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "sender",
					type: "address",
				},
				{
					internalType: "uint256",
					name: "tokenId",
					type: "uint256",
				},
				{
					internalType: "address",
					name: "owner",
					type: "address",
				},
			],
			name: "ERC721IncorrectOwner",
			type: "error",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "operator",
					type: "address",
				},
				{
					internalType: "uint256",
					name: "tokenId",
					type: "uint256",
				},
			],
			name: "ERC721InsufficientApproval",
			type: "error",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "approver",
					type: "address",
				},
			],
			name: "ERC721InvalidApprover",
			type: "error",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "operator",
					type: "address",
				},
			],
			name: "ERC721InvalidOperator",
			type: "error",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "owner",
					type: "address",
				},
			],
			name: "ERC721InvalidOwner",
			type: "error",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "receiver",
					type: "address",
				},
			],
			name: "ERC721InvalidReceiver",
			type: "error",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "sender",
					type: "address",
				},
			],
			name: "ERC721InvalidSender",
			type: "error",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "tokenId",
					type: "uint256",
				},
			],
			name: "ERC721NonexistentToken",
			type: "error",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "receiver",
					type: "address",
				},
				{
					internalType: "uint256",
					name: "assets",
					type: "uint256",
				},
				{
					internalType: "uint256",
					name: "max",
					type: "uint256",
				},
			],
			name: "ExceededMaxDeposit",
			type: "error",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "owner",
					type: "address",
				},
				{
					internalType: "uint256",
					name: "assets",
					type: "uint256",
				},
				{
					internalType: "uint256",
					name: "max",
					type: "uint256",
				},
			],
			name: "ExceededMaxWithdraw",
			type: "error",
		},
		{
			inputs: [],
			name: "NoTokensOwned",
			type: "error",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "owner",
					type: "address",
				},
			],
			name: "OwnableInvalidOwner",
			type: "error",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "account",
					type: "address",
				},
			],
			name: "OwnableUnauthorizedAccount",
			type: "error",
		},
		{
			inputs: [],
			name: "ReentrancyGuardReentrantCall",
			type: "error",
		},
		{
			inputs: [],
			name: "SeedSphere__DepositAmountTooLow",
			type: "error",
		},
		{
			inputs: [],
			name: "SeedSphere__DepositPerUserTooLow",
			type: "error",
		},
		{
			inputs: [],
			name: "SeedSphere__InsufficientFunds",
			type: "error",
		},
		{
			inputs: [],
			name: "SeedSphere__InvalidAddress",
			type: "error",
		},
		{
			inputs: [],
			name: "SeedSphere__NoUsersProvided",
			type: "error",
		},
		{
			inputs: [],
			name: "SeedSphere__PoolFundsZero",
			type: "error",
		},
		{
			inputs: [],
			name: "SeedSphere__PoolNotActive",
			type: "error",
		},
		{
			inputs: [],
			name: "SeedSphere__StalePrice",
			type: "error",
		},
		{
			inputs: [],
			name: "SeedSphere__TotalDepositTooLow",
			type: "error",
		},
		{
			inputs: [],
			name: "SeedSphere__TransferFailed",
			type: "error",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "caller",
					type: "address",
				},
			],
			name: "Unauthorized",
			type: "error",
		},
		{
			inputs: [],
			name: "WithdrawFailed",
			type: "error",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: "address",
					name: "owner",
					type: "address",
				},
				{
					indexed: true,
					internalType: "address",
					name: "approved",
					type: "address",
				},
				{
					indexed: true,
					internalType: "uint256",
					name: "tokenId",
					type: "uint256",
				},
			],
			name: "Approval",
			type: "event",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: "address",
					name: "owner",
					type: "address",
				},
				{
					indexed: true,
					internalType: "address",
					name: "operator",
					type: "address",
				},
				{
					indexed: false,
					internalType: "bool",
					name: "approved",
					type: "bool",
				},
			],
			name: "ApprovalForAll",
			type: "event",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: "address",
					name: "caller",
					type: "address",
				},
				{
					indexed: true,
					internalType: "address",
					name: "receiver",
					type: "address",
				},
				{
					indexed: false,
					internalType: "uint256",
					name: "assets",
					type: "uint256",
				},
				{
					indexed: false,
					internalType: "uint256",
					name: "id",
					type: "uint256",
				},
			],
			name: "Deposit",
			type: "event",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: "address",
					name: "funder",
					type: "address",
				},
				{
					indexed: false,
					internalType: "uint256",
					name: "amount",
					type: "uint256",
				},
				{
					indexed: false,
					internalType: "uint256",
					name: "tokenId",
					type: "uint256",
				},
			],
			name: "Funded",
			type: "event",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: "address",
					name: "user",
					type: "address",
				},
				{
					indexed: false,
					internalType: "uint256",
					name: "amount",
					type: "uint256",
				},
			],
			name: "FundsWithdrawn",
			type: "event",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: "address",
					name: "previousOwner",
					type: "address",
				},
				{
					indexed: true,
					internalType: "address",
					name: "newOwner",
					type: "address",
				},
			],
			name: "OwnershipTransferred",
			type: "event",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: "uint256",
					name: "totalAmount",
					type: "uint256",
				},
				{
					indexed: true,
					internalType: "uint256",
					name: "userAmount",
					type: "uint256",
				},
			],
			name: "PoolEnded",
			type: "event",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: "address",
					name: "funder",
					type: "address",
				},
				{
					indexed: false,
					internalType: "uint256",
					name: "amount",
					type: "uint256",
				},
				{
					indexed: false,
					internalType: "uint256",
					name: "tokenId",
					type: "uint256",
				},
			],
			name: "PoolFunded",
			type: "event",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: false,
					internalType: "bool",
					name: "isActive",
					type: "bool",
				},
			],
			name: "PoolStatusChanged",
			type: "event",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: "address",
					name: "user",
					type: "address",
				},
				{
					indexed: false,
					internalType: "bytes32",
					name: "proposalHash",
					type: "bytes32",
				},
			],
			name: "ProjectAdded",
			type: "event",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: "address",
					name: "from",
					type: "address",
				},
				{
					indexed: true,
					internalType: "address",
					name: "to",
					type: "address",
				},
				{
					indexed: true,
					internalType: "uint256",
					name: "tokenId",
					type: "uint256",
				},
			],
			name: "Transfer",
			type: "event",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: "address",
					name: "caller",
					type: "address",
				},
				{
					indexed: true,
					internalType: "address",
					name: "receiver",
					type: "address",
				},
				{
					indexed: true,
					internalType: "address",
					name: "owner",
					type: "address",
				},
				{
					indexed: false,
					internalType: "uint256",
					name: "assets",
					type: "uint256",
				},
				{
					indexed: false,
					internalType: "uint256",
					name: "id",
					type: "uint256",
				},
			],
			name: "Withdraw",
			type: "event",
		},
		{
			inputs: [
				{
					internalType: "address[]",
					name: "userAddresses",
					type: "address[]",
				},
			],
			name: "_fund",
			outputs: [],
			stateMutability: "payable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "owner",
					type: "address",
				},
			],
			name: "_getTokenIdByOwner",
			outputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "id",
					type: "uint256",
				},
			],
			name: "_getTotalAssetsByTokenId",
			outputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "caller",
					type: "address",
				},
			],
			name: "_isTokenHolder",
			outputs: [
				{
					internalType: "bool",
					name: "",
					type: "bool",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "_poolFunds",
			outputs: [],
			stateMutability: "payable",
			type: "function",
		},
		{
			inputs: [],
			name: "activatePool",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "proposalUserAddress",
					type: "address",
				},
				{
					internalType: "bytes32",
					name: "proposalHash",
					type: "bytes32",
				},
			],
			name: "addOrUpdateProject",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "to",
					type: "address",
				},
				{
					internalType: "uint256",
					name: "tokenId",
					type: "uint256",
				},
			],
			name: "approve",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [],
			name: "asset",
			outputs: [
				{
					internalType: "address",
					name: "",
					type: "address",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "owner",
					type: "address",
				},
			],
			name: "balanceOf",
			outputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "assets",
					type: "uint256",
				},
				{
					internalType: "address",
					name: "receiver",
					type: "address",
				},
			],
			name: "deposit",
			outputs: [
				{
					internalType: "uint256",
					name: "id",
					type: "uint256",
				},
			],
			stateMutability: "payable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address[]",
					name: "userAddresses",
					type: "address[]",
				},
			],
			name: "endPool",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address[]",
					name: "userAddresses",
					type: "address[]",
				},
				{
					internalType: "bytes[]",
					name: "priceUpdate",
					type: "bytes[]",
				},
			],
			name: "fund",
			outputs: [],
			stateMutability: "payable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "tokenId",
					type: "uint256",
				},
			],
			name: "getApproved",
			outputs: [
				{
					internalType: "address",
					name: "",
					type: "address",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "getIsPoolActive",
			outputs: [
				{
					internalType: "bool",
					name: "",
					type: "bool",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "getPriceFeedId",
			outputs: [
				{
					internalType: "bytes32",
					name: "",
					type: "bytes32",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "getPythContractAddress",
			outputs: [
				{
					internalType: "address",
					name: "",
					type: "address",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					components: [
						{
							internalType: "int64",
							name: "price",
							type: "int64",
						},
						{
							internalType: "uint64",
							name: "conf",
							type: "uint64",
						},
						{
							internalType: "int32",
							name: "expo",
							type: "int32",
						},
						{
							internalType: "uint256",
							name: "publishTime",
							type: "uint256",
						},
					],
					internalType: "struct PythStructs.Price",
					name: "price",
					type: "tuple",
				},
			],
			name: "getScaledAmount",
			outputs: [
				{
					internalType: "uint256",
					name: "oneDollarInWei",
					type: "uint256",
				},
			],
			stateMutability: "pure",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "id",
					type: "uint256",
				},
			],
			name: "getTotalFundsInUSD",
			outputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "proposalUserAddress",
					type: "address",
				},
			],
			name: "getUserFunds",
			outputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "proposalUserAddress",
					type: "address",
				},
			],
			name: "getUserProposalHash",
			outputs: [
				{
					internalType: "bytes32",
					name: "",
					type: "bytes32",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "owner",
					type: "address",
				},
				{
					internalType: "address",
					name: "operator",
					type: "address",
				},
			],
			name: "isApprovedForAll",
			outputs: [
				{
					internalType: "bool",
					name: "",
					type: "bool",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "",
					type: "address",
				},
			],
			name: "maxDeposit",
			outputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "owner",
					type: "address",
				},
			],
			name: "maxWithdraw",
			outputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "name",
			outputs: [
				{
					internalType: "string",
					name: "",
					type: "string",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "owner",
			outputs: [
				{
					internalType: "address",
					name: "",
					type: "address",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "tokenId",
					type: "uint256",
				},
			],
			name: "ownerOf",
			outputs: [
				{
					internalType: "address",
					name: "",
					type: "address",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "bytes[]",
					name: "priceUpdate",
					type: "bytes[]",
				},
			],
			name: "poolFunds",
			outputs: [],
			stateMutability: "payable",
			type: "function",
		},
		{
			inputs: [],
			name: "renounceOwnership",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "from",
					type: "address",
				},
				{
					internalType: "address",
					name: "to",
					type: "address",
				},
				{
					internalType: "uint256",
					name: "tokenId",
					type: "uint256",
				},
			],
			name: "safeTransferFrom",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "from",
					type: "address",
				},
				{
					internalType: "address",
					name: "to",
					type: "address",
				},
				{
					internalType: "uint256",
					name: "tokenId",
					type: "uint256",
				},
				{
					internalType: "bytes",
					name: "data",
					type: "bytes",
				},
			],
			name: "safeTransferFrom",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "operator",
					type: "address",
				},
				{
					internalType: "bool",
					name: "approved",
					type: "bool",
				},
			],
			name: "setApprovalForAll",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "bool",
					name: "_poolActive",
					type: "bool",
				},
			],
			name: "setPoolActive",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "bytes4",
					name: "interfaceId",
					type: "bytes4",
				},
			],
			name: "supportsInterface",
			outputs: [
				{
					internalType: "bool",
					name: "",
					type: "bool",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "symbol",
			outputs: [
				{
					internalType: "string",
					name: "",
					type: "string",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "tokenId",
					type: "uint256",
				},
			],
			name: "tokenURI",
			outputs: [
				{
					internalType: "string",
					name: "",
					type: "string",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "totalAssets",
			outputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "from",
					type: "address",
				},
				{
					internalType: "address",
					name: "to",
					type: "address",
				},
				{
					internalType: "uint256",
					name: "tokenId",
					type: "uint256",
				},
			],
			name: "transferFrom",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "newOwner",
					type: "address",
				},
			],
			name: "transferOwnership",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "bytes32",
					name: "_newPriceFeedId",
					type: "bytes32",
				},
			],
			name: "updatePriceFeed",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "_newPythContract",
					type: "address",
				},
			],
			name: "updatePythContract",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "oldUserProposalAddress",
					type: "address",
				},
				{
					internalType: "address",
					name: "newUserProposalAddress",
					type: "address",
				},
			],
			name: "updateUserProposalAddress",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "userProposalAddress",
					type: "address",
				},
				{
					internalType: "bytes32",
					name: "newUserProposalHash",
					type: "bytes32",
				},
			],
			name: "updateUserProposalHash",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "assets",
					type: "uint256",
				},
				{
					internalType: "address",
					name: "receiver",
					type: "address",
				},
				{
					internalType: "address",
					name: "owner",
					type: "address",
				},
			],
			name: "withdraw",
			outputs: [
				{
					internalType: "uint256",
					name: "id",
					type: "uint256",
				},
			],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [],
			name: "withdrawForTesting",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [],
			name: "withdrawFunds",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
	],
};
