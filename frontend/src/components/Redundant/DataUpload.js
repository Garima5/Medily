// component to simply upload images using fetch

import React, { useState } from 'react';

const WalrusImgUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert('Please select a file.');
      return;
    }

    setIsUploading(true);
    setUploadSuccess(null);

    try {
      const response = await fetch('https://publisher.walrus-testnet.walrus.space/v1/store?epochs=5', {
        method: 'PUT',
        body: selectedFile,
      });

      if (response.status === 200) {
        // response is also a promise
        const info = await response.json()
        console.log(info)
        setUploadSuccess(true);
      } else {
        setUploadSuccess(false);
        console.error('Upload failed with status:', response.status);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadSuccess(false);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container">
      <h2>Simple File Upload</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="file-input" className="form-label">Choose a file to upload</label>
          <input
            type="file"
            id="file-input"
            className="form-control"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={isUploading}>
          {isUploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>

      {uploadSuccess === true && (
        <div className="alert alert-success mt-3">File uploaded successfully!</div>

      )}
      {uploadSuccess === false && (
        <div className="alert alert-danger mt-3">Failed to upload file.</div>
      )}
    </div>
  );
};

export default WalrusImgUpload;
