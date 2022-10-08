const provider = new ethers.providers.Web3Provider(window.ethereum, "goerli");
let VotesContract;
let signer;
console.log("Loaded ");
const VotesContractAddress = "0xd89a4F936D9712A8Ee5A82A1b083F5A04F80D2bB"; // New Getter Contract 
const VotesContractABI = [
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
	]
]
            
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

  async function GetVotes() {
    const addr = document.getElementById("waddress").value;
    const getVotes = VotesContract.GetVotes(addr).call();
    const Votes = await getVotes;
    console.log(Votes);
  }
  
  async function IncrementCounter() {
    const addr = document.getElementById("waddress").value;
    const setVotesPromise = VotesContract.IncrementCounter(addr).send();
    await setVotesPromise;
  }