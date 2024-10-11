import React, { useState } from 'react';
import { handleOfficeFileParsing, handleImageOCR } from './utils/fileParsers';
import FileUploader from './components/FileUploader';
import './App.css';

const App = () => {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);

    const handleDrop = async (files) => {
        const file = files[0];
        if (!file) return;

        setLoading(true);
        const fileType = file.type;

        try {
            let extractedText = '';

            if (fileType.includes('image')) {
                extractedText = await handleImageOCR(file);
            } else if (
                fileType === 'application/pdf' ||
                fileType.includes('officedocument') || 
                fileType.includes('presentation') || 
                fileType.includes('spreadsheet')
            ) {
                extractedText = await handleOfficeFileParsing(file);
            } else {
                extractedText = 'Unsupported file type. Please upload images, PDFs, or Office documents.';
            }

            setText(extractedText);
        } catch (error) {
            setText('Error extracting text from file.');
        }

        setLoading(false);
    };

    return (
        <div className="App">
            <h1>Text Recognition for Different Files</h1>
            <FileUploader onDrop={handleDrop} />
            {loading ? <p>Processing...</p> : <p>{text}</p>}
        </div>
    );
};

export default App;
