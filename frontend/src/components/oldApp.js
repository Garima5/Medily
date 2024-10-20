import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

import './App.css';
//import { create } from 'ipfs-http-client';
import abi from "./contractJson/EHR.json"
// IPFS client setup (using Infura, for example)
//const client = create('https://ipfs.infura.io:5001/api/v0');
const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const contractABI = abi.abi;
//const ethers = require("ethers")
function App() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [doctorRegistered, setDoctorRegistered] = useState(false);
  const [patientId, setPatientId] = useState('');
  const [file, setFile] = useState(null);

  // Check if MetaMask is installed
  const checkWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log('Make sure you have MetaMask installed!');
      return;
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' });
    console.log(accounts)
    if (accounts.length !== 0) {
      const account = accounts[0];
      setCurrentAccount(account);
      console.log("Connected account: ", account);
    } else {
      console.log('No authorized account found');
    }
  };
  // Function to connect wallet
  const connectWalletHandler = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      alert('You need MetaMask to use this feature!');
      return;
    }

    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.error(err);
    }
  };

  // Function to register as a doctor
  const registerDoctor = async () => {
    if (!currentAccount) return;

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      console.log("Provider", provider)
      const signer = await provider.getSigner();
      console.log(signer)
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      const tx = await contract.addDoctor();
      await tx.wait();
      setDoctorRegistered(true);
      console.log('Doctor registered successfully');
    } catch (error) {
      console.error('Error registering doctor: ', error);
    }
  };

  // Function to upload a file to IPFS and return the CID
  
  /*
  const uploadToIPFS = async (file) => {
    try {
      const added = await client.add(file);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      return url;
    } catch (error) {
      console.error('Error uploading file to IPFS: ', error);
    }
  }; */

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
  };

  // Initial wallet connection check
  useEffect(() => {
    checkWalletIsConnected();
  }, []);

  return (
    <div className="App">
      <h1>EHR Dapp</h1>
      
      {!currentAccount ? (
        <button onClick={connectWalletHandler}>Connect Wallet</button>
      ) : (
        <p>Connected account: {currentAccount}</p>
      )}

      {currentAccount && (
        <div>
          {!doctorRegistered ? (
            <button onClick={registerDoctor}>Register as Doctor</button>
          ) : (
            <p>You are registered as a doctor!</p>
          )}

          <div>
            <h2>Add Record</h2>
            <input 
              type="text" 
              placeholder="Patient ID" 
              value={patientId} 
              onChange={(e) => setPatientId(e.target.value)} 
            />
            <input type="file" onChange={handleFileUpload} />
            <button 
              //onClick={async () => {
              //  const ipfsUrl = await uploadToIPFS(file);
              //  console.log('IPFS URL:', ipfsUrl);
                // Here you would call the smart contract function to add the record
              //}}>
              >
              Upload Record
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
