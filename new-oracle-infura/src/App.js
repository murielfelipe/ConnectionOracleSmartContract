import "./App.css";
import Web3 from "web3";

var url = "https://goerli.infura.io/v3/203cd42bd60e4f5081db6a9224b4da9a"; //"http://127.0.0.1:7545";
var abi = [
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "symbol",
        type: "bytes4",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "volume",
        type: "uint256",
      },
    ],
    name: "setStock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "symbol",
        type: "bytes4",
      },
    ],
    name: "getStockPrice",
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
        internalType: "bytes4",
        name: "symbol",
        type: "bytes4",
      },
    ],
    name: "getStockVolume",
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
];

function App() {
  async function clickHandler(e) {
    e.preventDefault();
    var web3 = new Web3(Web3.givenProvider || url);
    let AddressOwner = await web3.eth.getAccounts();
    console.log(AddressOwner)
    let contractAddress = "0x502f7aDF60E5CA61c2F8B8d76F4Dd9F5D188a04c";
    let contractInstance = new web3.eth.Contract(abi, contractAddress);
    console.log("Contract:", contractInstance);
    let result = await fetch("http://localhost:8000/");
    let stock = {};
    let json = await result.json();
    let symbol = "0x41424345";
    contractInstance.methods.setStock(symbol,parseInt(json.price),parseInt(json.volume)).send({ from: AddressOwner[0]})
    contractInstance.methods.getStockPrice(symbol).call().then(val => {
      console.log("Get Stock Price:", val);
    })
    contractInstance.methods.getStockVolume(symbol).call().then(val => {
      console.log("Get Stock Price:", val);
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
