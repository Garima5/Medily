//import { ethers } from "ethers";
import abi from "./contractJson/EHR.json"
console.log(abi)

let provider;
let contract;
const ethers = require("ethers")
//const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
//const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
//const contractAddress =   '0x5FbDB2315678afecb367f032d93F642f64180aa3'
const contractAddress =   '0x5FbDB2315678afecb367f032d93F642f64180aa3'
//0x5FbDB2315678afecb367f032d93F642f64180aa3


const contractABI = abi.abi;

async function init() {
    if (window.ethereum) {
        //const provider = new ethers.BrowserProvider(window.ethereum);
        //console.log("Provider", provider)
        provider = new ethers.providers.Web3Provider(window.ethereum);
        console.log("Provider", provider)
        await provider.send("eth_requestAccounts", []); // Request user accounts
        const signer = await provider.getSigner();
        contract = new ethers.Contract(contractAddress, contractABI, signer);
        contract = provider.getContract(contractAddress, contractABI)
        console.log("Contract Original", contract)
    } else {
        console.error("Please install MetaMask!");
    }
}

export { init, contract };
