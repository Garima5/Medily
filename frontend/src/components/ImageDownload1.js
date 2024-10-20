
import React, { useState } from "react";

const ImageDownload = () => {
  const [blobId, setBlobId] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const aggregatorUrl = event.target.aggregatorUrlInput.value;

    try {
      const blobUrl = `${aggregatorUrl}/v1/${blobId}`;
      setImageSrc(blobUrl);
    } catch (error) {
      console.error("Error downloading image", error);
    }
    
    setIsLoading(false);
  };

  return (
    <div>
      <h2>Download Image</h2>
      <form onSubmit={handleDownload}>
        <div>
          <label htmlFor="aggregatorUrlInput">Walrus Aggregator URL:</label>
          <input type="url" id="aggregatorUrlInput" defaultValue="https://aggregator.walrus-testnet.walrus.space" required />
        </div>
        <div>
          <label htmlFor="blobIdInput">Blob ID:</label>
          <input type="text" id="blobIdInput" value={blobId} onChange={(e) => setBlobId(e.target.value)} required />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Downloading..." : "Download"}
        </button>
      </form>
      {imageSrc && <img src={imageSrc} alt="Downloaded Blob" style={{ maxWidth: "100%" }} />}
    </div>
  );
};

export default ImageDownload;
