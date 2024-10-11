import React from 'react';
import { useDropzone } from 'react-dropzone';

const FileUploader = ({ onDrop }) => {
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.png', '.jpg'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
            'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
            'application/pdf': ['.pdf']
        }
    });

    return (
        <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            <p>Drag & drop a file here, or click to select one</p>
        </div>
    );
};

export default FileUploader;
