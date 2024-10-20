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
        // This needs to be seen - may not exist as newlyCreated
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

export default App;
