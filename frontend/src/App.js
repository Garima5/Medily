
import React, { useEffect, useState } from "react";

import abi from "./contractJson/EHR.json";  // Ensure you have your ABI file
const ethers = require("ethers")
const App = () => {
    const [ethaccount, setAccount] = useState("Not Connected");
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [contract, setContract] = useState(null);
    const [isDoctor, setIsDoctor] = useState(false);
    const [isPatient, setIsPatient] = useState(false);

    const contractAddress=   '0x5FbDB2315678afecb367f032d93F642f64180aa3'; // Replace with your contract address
    const contractABI = abi.abi
    const [state, setState ]= useState({
      provider: null,
      signer: null,
      contractor: null
    })
    //console. log("ethers version", ethers.version)
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
        <div className="App">
            <header>
                <h1>EHR System</h1>
                <p>Connected as: {account}</p>
            </header>
            <main>
                {isDoctor && <p>You are registered as a Doctor.</p>}
                {isPatient && <p>You are registered as a Patient.</p>}
                {!isDoctor && !isPatient && <p>You must be a registered doctor or patient to access the system.</p>}
            </main>
        </div>
    );
};

export default App;


/*import React, { useEffect, useState } from "react";
import { init, contract } from "./web3connection"; // Ensure you have the init and contract functions
const ethers = require("ethers")
const App = () => {
    console.log("ethers version", ethers.version)
    const [account, setAccount] = useState("");
    const [isDoctor, setIsDoctor] = useState(false);
    const [isPatient, setIsPatient] = useState(false);

    useEffect(() => {
        const loadBlockchainData = async () => {
            
                // Initialize the blockchain connection
                await init();
                console.log("Initialized");
                console.log("contract", contract);

                // Get the user's Metamask account
                console.log("getting accts")
                const accounts = await window.ethereum.request({ method: "eth_accounts" });
                console.log("got accts: ", accounts)
                if (accounts.length === 0) {
                    console.log("No accounts found. Please connect Metamask.");
                    return;
                }
                setAccount(accounts[0]);
                console.log("Connected account in APP:", accounts[0]);
                const val = await contract.returnRandomVal()
                console.log(val)

                // Check if the account is a doctor by calling the contract mapping
                //const doctorsData = await contract.methods.doctors(accounts[0]).call();
                const doctorsData = await contract.doctors(accounts[0])
                console.log("Doctor Data:", doctorsData);

                if (doctorsData.id.toLowerCase() === accounts[0].toLowerCase()) {
                    setIsDoctor(true);
                    console.log("This account is a registered doctor.");
                } else {
                    console.log("This account is not a registered doctor.");
                }

                // Optionally: Check if the account is a patient
                const patientsData = await contract.methods.patients(accounts[0]).call();
                console.log("Patient Data:", patientsData);

                if (patientsData.id.toLowerCase() === accounts[0].toLowerCase()) {
                    setIsPatient(true);
                    console.log("This account is a registered patient.");
                } else {
                    console.log("This account is not a registered patient.");
                }
            
        };

        loadBlockchainData();
    }, []);

    return (
        <div className="App">
            <header>
                <h1>EHR System</h1>
                <p>Connected as: {account}</p>
            </header>
            <main>
                {isDoctor && <p>You are registered as a Doctor.</p>}
                {isPatient && <p>You are registered as a Patient.</p>}
                {!isDoctor && !isPatient && <p>You must be a registered doctor or patient to access the system.</p>}
            </main>
        </div>
    );
};

export default App;
*/





/*import React from "react";
import ImageUpload from "./components/ImageUpload1";
import ImageDownload from "./components/ImageDownload1";
export default function App(){
  return(
    <div>
      <ImageDownload />
    </div>
  )
}*/



/*
// With image as base 64
import React, { useState } from 'react';

const App = () => {
  const [file, setFile] = useState(null);
  const [epochs, setEpochs] = useState(1);
  const [status, setStatus] = useState("");
  const [blobUrl, setBlobUrl] = useState("");
  const [publisherUrl, setPublisherUrl] = useState("https://publisher.walrus-testnet.walrus.space");
  const [aggregatorUrl, setAggregatorUrl] = useState("https://aggregator.walrus-testnet.walrus.space");

  // Function to handle file change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Function to convert file to Base64
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(',')[1]; // remove the data URL part
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file); // read the file as a base64 data URL
    });
  };

  // Function to upload the file to Walrus
  const uploadToWalrus = async () => {
    try {
      if (!file) {
        alert("Please select a file first.");
        return;
      }
      setStatus("Uploading...");

      // Convert file to Base64
      const base64File = await convertFileToBase64(file);

      // Fetch request to upload the base64 file to Walrus
      const response = await fetch(`${publisherUrl}/v1/store?epochs=${epochs}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ data: base64File }), // Send base64 string as the payload
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        let blobId = '';

        if (result.newlyCreated) {
          blobId = result.newlyCreated.blobObject.blobId;
        } else {
          blobId = result.alreadyCertified.blobId;
        }

        const blobUrl = `${aggregatorUrl}/v1/${blobId}`;
        setBlobUrl(blobUrl);
        setStatus("File uploaded successfully!");
      } else {
        setStatus("Upload failed.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setStatus("An error occurred.");
    }
  };

  return (
    <div className="App">
      <h1>Walrus File Upload</h1>

      <input type="file" onChange={handleFileChange} />
      <br />
      <label>
        Epochs: 
        <input 
          type="number" 
          value={epochs} 
          onChange={(e) => setEpochs(e.target.value)} 
          min="1"
        />
      </label>
      <br />

      <button onClick={uploadToWalrus}>Upload</button>

      <p>Status: {status}</p>
      
      {blobUrl && (
        <div>
          <h3>Uploaded Blob:</h3>
          <a href={blobUrl} target="_blank" rel="noopener noreferrer">
            {blobUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default App;
*/


/*
// WORKING CODE TO UPLOAD FILE TO WALRUS
import React, { useState } from 'react';
import { ethers } from 'ethers';
const App = () => {
  const [file, setFile] = useState(null);
  const [epochs, setEpochs] = useState(1);
  const [status, setStatus] = useState("");
  const [blobUrl, setBlobUrl] = useState("");
  const [publisherUrl, setPublisherUrl] = useState("https://publisher.walrus-testnet.walrus.space");
  const [aggregatorUrl, setAggregatorUrl] = useState("https://aggregator.walrus-testnet.walrus.space");

  // Function to handle file change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Function to upload the file to Walrus
  const uploadToWalrus = async () => {
    try {
      if (!file) {
        alert("Please select a file first.");
        return;
      }
      setStatus("Uploading...");

      // Fetch request to upload the file
      const response = await fetch(`${publisherUrl}/v1/store?epochs=${epochs}`, {
        method: "PUT",
        body: file,
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result)
        let blobId = ''
        if (result.newlyCreated)
        {

          blobId = result.newlyCreated.blobObject.blobId;

        }
        else{
          blobId = result.alreadyCertified.blobId;
        }
        const blobUrl = `${aggregatorUrl}/v1/${blobId}`;
        setBlobUrl(blobUrl);
        setStatus("File uploaded successfully!");
      } else {
        setStatus("Upload failed.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setStatus("An error occurred.");
    }
  };

  return (
    <div className="App">
      <h1>Walrus File Upload</h1>

      <input type="file" onChange={handleFileChange} />
      <br />
      <label>
        Epochs: 
        <input 
          type="number" 
          value={epochs} 
          onChange={(e) => setEpochs(e.target.value)} 
          min="1"
        />
      </label>
      <br />

      <button onClick={uploadToWalrus}>Upload</button>

      <p>Status: {status}</p>
      
      {blobUrl && (
        <div>
          <h3>Uploaded Blob:</h3>
          <a href={blobUrl} target="_blank" rel="noopener noreferrer">
            {blobUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default App; */

////////////////////////

/*
import React, { useState } from 'react';
//import BlobViewer from './components/BlobViewer';
import BlobViewer64 from './components/Blob64viewer';
const App = () => {
  const [blobId, setBlobId] = useState('');
  const aggregatorUrl = 'https://aggregator.walrus-testnet.walrus.space';

  return (
    <div className="App">
      <h1>Walrus File Viewer</h1>

      <input
        type="text"
        placeholder="Enter Blob ID"
        value={blobId}
        onChange={(e) => setBlobId(e.target.value)}
      />
      <br />

      {blobId && (
        <BlobViewer64 blobId={blobId} aggregatorUrl={aggregatorUrl} />
      )}
    </div>
  );
  
};

export default App; */