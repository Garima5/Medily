import React  from "react";

import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from "react"
import abi from "./contractJson/Coffee.json"
import Memos from './components/Memos';
import Buy from './components/buy';
//import {ethers} from "ethers"
const ethers = require("ethers")

function App() {
  const [state, setState ]= useState({
    provider: null,
    signer: null,
    contractor: null
  })
  //console. log("ethers version", ethers.version)
  const [ethaccount,setAccount] = useState('Not connected');
  useEffect(()=>{
    const template= async()=>{
      //const contractAddress = "0xa2655F1105E037bD604B8cC7F723c6735808C616"
      const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
      const contractAbi = abi.abi
      //console.log(contractAbi)
      
      // Metamask - to do transactions on any network and also because it has Infura API - which helps us in connecting to blockchain
      // Metamask injects ethereum object inside our window
      try{
        //const {ethereum} =  window;
        /*console.log("window.ethereum",window.ethereum)
        if (typeof window.ethereum === 'undefined') {
          console.log()
          console.log('Window ethereum object not found')
        }*/
      const account = await window.ethereum.request({
        method: "eth_requestAccounts"
    }  )
    window.ethereum.on('accountsChanged',()=>{
      window.location.reload();
    })
      setAccount(account)
      console.log("accounts", ethaccount)
    const provider = new ethers.providers.Web3Provider(window.ethereum); // read the blockchain
    const signer = provider.getSigner(); //write to blockchain
    // create instance
    const contract = new ethers.Contract(
      contractAddress,
      contractAbi,
      signer
    )
    console.log("contract",contract)
    setState({provider, signer, contract})
      }

      catch(err){
        console.log(err)
      }
      
    } 
    template();
  },[])
  return (
    <div className='App'>
      Connected account : {ethaccount}
      <hr></hr>
      <Buy state = {state}> </Buy>
      <Memos state = {state}> </Memos>

    </div>
  );
}

export default App;
