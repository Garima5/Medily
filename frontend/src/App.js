import React from "react";
import ImageUpload from "./components/ImageUpload1";
import ImageDownload from "./components/ImageDownload1";
export default function App(){
  return(
    <div>
      <ImageDownload />
    </div>
  )
}



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