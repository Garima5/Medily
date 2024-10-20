import React, { useState } from "react";

const ImageUpload = () => {
  const [status, setStatus] = useState("");
  const [blobId, setBlobId] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsUploading(true);
    
    const inputFile = event.target.fileInput.files[0];
    const epochs = event.target.epochsInput.value;
    const publisherUrl = event.target.publisherUrlInput.value;

    try {
      const response = await fetch(`${publisherUrl}/v1/store?epochs=${epochs}`, {
        method: "PUT",
        body: inputFile,
      });
      
      if (response.status === 200) {
        const info = await response.json();
        const blobInfo = info.newlyCreated || info.alreadyCertified;
        setBlobId(blobInfo.blobObject ? blobInfo.blobObject.blobId : blobInfo.blobId);
        setStatus("Upload successful");
      } else {
        throw new Error("Failed to upload image.");
      }
    } catch (error) {
      console.error(error);
      setStatus("An error occurred during upload.");
    }
    setIsUploading(false);
  };

  return (
    <div>
      <h2>Upload Image</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="publisherUrlInput">Walrus Publisher URL:</label>
          <input type="url" id="publisherUrlInput" defaultValue="https://publisher.walrus-testnet.walrus.space" required />
        </div>
        <div>
          <label htmlFor="fileInput">Image to Upload:</label>
          <input type="file" id="fileInput" required />
        </div>
        <div>
          <label htmlFor="epochsInput">Epochs:</label>
          <input type="number" id="epochsInput" defaultValue="1" min="1" required />
        </div>
        <button type="submit" disabled={isUploading}>
          {isUploading ? "Uploading..." : "Upload"}
        </button>
      </form>
      {status && <p>{status}</p>}
      {blobId && <p>Blob ID: {blobId}</p>}
    </div>
  );
};

export default ImageUpload;
