const provider = new ethers.providers.Web3Provider(window.ethereum, "goerli");
let VotesContract;
let signer;

const APIKEY = 'ckey_bcf2a8cd82204dc3a01733fa007';
const baseURL = 'https://api.covalenthq.com/v1';
var blockchainChainId;
var demoAddress =" ";
console.log("Loaded ");
const VotesContractAddress = "0xd89a4F936D9712A8Ee5A82A1b083F5A04F80D2bB"; // New Getter Contract 
const VotesContractABI =
	[
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_orgadd",
					"type": "address"
				}
			],
			"name": "IncrementCounter",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "orgAdd",
					"type": "address"
				}
			],
			"name": "GetVotes",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		}
	];
            
provider.send("eth_requestAccounts", []).then(() => {
    provider.listAccounts().then((accounts) => {
      signer = provider.getSigner(accounts[0]);
      VotesContract = new ethers.Contract(
        VotesContractAddress,
        VotesContractABI,
        signer
      );
    });
  });



const token_ids = []
let output = "";

async function GreenToken() {

	const address = document.getElementById("waddress").value;

	const url = new URL(`${baseURL}/5/address/${address}/balances_v2/?key=${APIKEY}&nft=true`);

	//const url = "https://api.covalenthq.com/v1/137/address/0xDc35C75d027E4E65824cC656f655BcA90505C722/balances_v2/?key=ckey_bcf2a8cd82204dc3a01733fa007&nft=true"

	const response = await fetch(url);
	const result = await response.json();
	const data = result.data.items;
	var found = 0;
	for(var i = 0;i<data.length;i++){
		if(data[i].contract_address == 0xad1209db97e0f933eb344ccf8fffabc981d617c6){
			found = 1;
			break;
		}
		
	}
	if(found ==1){
		console.log("You are Eligible to Vote as you are a member of Green Inc DAO");
		IncrementCounter();
	}else{
		console.log("You are not a member of Green Inc DAO");
	}
}

  async function GetVotes() {
    const addr = document.getElementById("waddress").value;
    const getVotes = VotesContract.GetVotes(addr);
    const Votes = await getVotes;
    console.log(Votes);
  }
  
  async function IncrementCounter() {
	const addr = document.getElementById("waddress").value;
	const setVotesPromise = VotesContract.IncrementCounter(addr);
    await setVotesPromise;
  }
