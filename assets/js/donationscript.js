function sendEth(e){
e.preventDefault();

const web3 = import('web3');

web3.personal.unlockAccount(addr, pass);
const toAddress = "0xaB8a67743325347Aa53bCC66850f8F13df87e3AF"; // Address of the recipient
const amount = 2000000; // Willing to send 2 ethers
const amountToSend = web3.utils.toWei(amount, "ether"); // Convert to wei value
var send = web3.eth.sendTransaction({ from: addr, to: toAddress, value: amountToSend });
}