// Code to view Base 64 image
import React, { useState } from 'react';

const BlobViewer64 = ({ blobId, aggregatorUrl }) => {
  const [fileContent, setFileContent] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch and display the file content
  const fetchFileContent = async () => {
    if (!blobId) {
      setError("Please provide a valid Blob ID.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Fetch the file from the aggregator
      const response = await fetch(`${aggregatorUrl}/v1/${blobId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch the file.");
      }

      // Read the content as text (base64 encoded data)
      const result = await response.json();
      console.log("result", result)
      const base64String = result.data;  // Assuming the file data is stored under `data`

      // Detect file type
      const fileType = result.fileType || 'application/octet-stream';
      setFileType(fileType);

      // If the file is an image, display it
      if (fileType.startsWith('image')) {
        const imageSrc = `data:${fileType};base64,${base64String}`;
        setFileContent(<img src={imageSrc} alt="Uploaded content" style={{ maxWidth: '100%' }} />);
      } else if (fileType.startsWith('application/pdf')) {
        // For PDFs, use an iframe to display it
        const pdfSrc = `data:${fileType};base64,${base64String}`;
        setFileContent(<iframe src={pdfSrc} title="PDF Document" style={{ width: '100%', height: '600px' }} />);
      } else {
        // If the file is not an image or PDF, provide a download link
        const fileUrl = `data:${fileType};base64,${base64String}`;
        setFileContent(
          <a href={fileUrl} download={`file_${blobId}`} className="btn btn-primary">
            Download File
          </a>
        );
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="BlobViewer">
      <h3>View Blob Content</h3>
      <button onClick={fetchFileContent} className="btn btn-secondary">Fetch File Content</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {fileContent && (
        <div>
          <h4>File Content</h4>
          {fileContent}
        </div>
      )}
    </div>
  );
};

export default BlobViewer64;
