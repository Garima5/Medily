import React, { useState, useEffect } from "react";
//import  from "./UploadImage"; // Component for uploading images
//import DownloadImage from "./DownloadImage"; // Component for downloading images

import ImageDownload from "./components/ImageDownload1";
import ImageUpload from "./components/ImageUpload1";
const App = () => {
    const [selectedOption, setSelectedOption] = useState(""); // State to track user choice
   

    // Handle option selection
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div className="App">
            <header>
                <h1>Walrus Image Storage</h1>
                <p>Choose an option:</p>
            </header>

            <div style={{ display: "flex" }}>
                {/* Main Content */}
                <main style={{ flex: 2 }}>
                    {/* Radio buttons for choosing between upload or download */}
                    <div>
                        <label>
                            <input
                                type="radio"
                                value="upload"
                                checked={selectedOption === "upload"}
                                onChange={handleOptionChange}
                            />
                            Upload Image
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="download"
                                checked={selectedOption === "download"}
                                onChange={handleOptionChange}
                            />
                            Download Image
                        </label>
                    </div>

                    {/* Conditional rendering based on selected option */}
                    {selectedOption === "upload" && <ImageUpload />}
                    {selectedOption === "download" && <ImageDownload />}
                </main>

                {/* Sidebar for displaying the Noun image */}
                
            </div>
        </div>
    );
};

export default App;
