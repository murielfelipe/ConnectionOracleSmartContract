import './App.css';
import Web3 from 'web3';

var url = "http://127.0.0.1:7545";
var abi = [
  {
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "symbol",
				"type": "bytes4"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "volume",
				"type": "uint256"
			}
		],
		"name": "setStock",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "symbol",
				"type": "bytes4"
			}
		],
		"name": "getStockPrice",
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
				"internalType": "bytes4",
				"name": "symbol",
				"type": "bytes4"
			}
		],
		"name": "getStockVolume",
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

function App() {

  async function clickHandler(e) {
      e.preventDefault(); 
      let web3 = new Web3(new Web3.providers.HttpProvider(url));
      web3.eth.getAccounts((error, result)=> { 
        console.log("Address:", result);
      });
      let AddressOwner = "0x940AabB2f41bd20Ab7048e04EFB3638af3497b8d"
      let contractAddress = "0x6D5d0392c5E7330bC947D1Cd72460B5Ba2661005";
      let contractInstance = new web3.eth.Contract(abi, contractAddress);
      console.log("Contract:", contractInstance);
      let result = await fetch("http://localhost:8000/");
      let stock = {};
      let json = await result.json();
      console.log(`Price: ${json.price}`);
      console.log(`Price: ${json.volume}`);
      //Consultar el contrato
      let symbol = "0x41424345"
      contractInstance.methods.setStock(symbol,parseInt(json.price),parseInt(json.volume)).send({ from: AddressOwner}).on('receipt', () => {
          console.log("Stock set Symbol",symbol );
          console.log("Stock set Price",parseInt(json.price));
          console.log("Stock set Volume",parseInt(json.volume));
        })
      contractInstance.methods.getStockPrice('0x41424345').call({ from: AddressOwner}).then(val => {
          console.log("Get Stock Price:", val);
        })
        contractInstance.methods.getStockVolume('0x41424345').call({ from: AddressOwner}).then(val => {
          console.log("Get Stock Volume:", val);
        })
      }
      
  return (
    <div className="App">
      <div className="value">
        <button onClick={clickHandler}> Click me! </button>
      </div>
    </div>
  );
}


export default App;

