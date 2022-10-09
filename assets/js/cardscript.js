
//$('#card_wallet_connect').click(function(event){
async function Test(){
  console.log("In script");
  try {
     // Will open the MetaMask UI
      // You should disable this button while the request is pending!
      await ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error) {
      console.error(error);
    }
} 


var w_address ;
var Votes;
const APIKEY = 'ckey_bcf2a8cd82204dc3a01733fa007';
const baseURL = 'https://api.covalenthq.com/v1';
const provider = new ethers.providers.Web3Provider(window.ethereum, "goerli");
  let VotesContract;
  let signer;
  
 
  var blockchainChainId;
  var demoAddress =" ";
  console.log("Loaded ");
  const VotesContractAddress = "0x871f0F4e4e585C212c1B601A52889fEd2a026026"; // New Getter Contract 
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
	},
	{
		"inputs": [],
		"name": "status",
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
  
if(window.location.pathname == "/investor_vote"){
  
  $on_vote = $(".getvote");
  console.log("IN HERE");
  $on_vote.click(function(){
    w_address = $(this).attr("data-id");
	GreenToken();
	
  })
  

}


async function GreenToken() {

	var address = w_address;

	const url = new URL(`${baseURL}/5/address/${address}/balances_v2/?key=${APIKEY}&nft=true`);
	console.log(url)
	console.log(w_address)
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
    const addr = waddress;
    const getVotes = await VotesContract.GetVotes(addr);
    const Votes = parseInt(getVotes,16);
    console.log(Votes);
  }
  
  async function IncrementCounter() {
	const setVotesPromise = VotesContract.IncrementCounter(w_address);
	var sts = VotesContract.status;
    await setVotesPromise;
	console.log("Status = "+sts);
	if(sts){
		console.log(setVotesPromise)
		var request = {
			"url":`http://localhost:3000/api/org/inc_vote/${w_address}`,
			"method":"PUT"
		  }
			  
		  $.ajax(request).done(function(response){
			  alert("Voted Successfully!");
			  //location.reload()
		  })
	}
	else{
		console.log("Votes didn't casted!");
	}

  }