import React, { useState } from 'react';

const BlobViewer = ({ blobId, aggregatorUrl }) => {
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

      // Read the content as a blob
      const blob = await response.blob();
      const fileReader = new FileReader();

      // Determine if the blob is an image (or other supported type)
      fileReader.onloadend = () => {
        const contentType = blob.type || 'application/octet-stream';
        console.log("Content type", contentType)
        setFileType(contentType);

        // If it's an image, display it directly
        if (contentType.startsWith('image')) {
          setFileContent(<img src={fileReader.result} alt="Uploaded content" style={{ maxWidth: '100%' }} />);
        } else if (contentType.startsWith('application/pdf')) {
          // For PDF, use iframe to display
          const pdfUrl = URL.createObjectURL(blob);
          setFileContent(<iframe src={pdfUrl} title="PDF Document" style={{ width: '100%', height: '600px' }} />);
        } else {
          // If not image or PDF, provide download link
          const fileUrl = URL.createObjectURL(blob);
          setFileContent(
            <a href={fileUrl} download={`file_${blobId}`} className="btn btn-primary">
              Download File
            </a>
          );
        }
      };

      fileReader.readAsDataURL(blob);
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

export default BlobViewer;
