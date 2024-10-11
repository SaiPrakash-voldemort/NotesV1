const officeParser = require('officeparser');
import Tesseract from 'tesseract.js';

const config = {
    newlineDelimiter: " ",  // Separate new lines with a space instead of the default \n.
    ignoreNotes: true       // Ignore notes while parsing presentation files like pptx or odp.
};

// Function to handle Office document parsing
export const handleOfficeFileParsing = async (file) => {
    try {
        const parsedText = await officeParser.parseOfficeAsync(file.path, config);
        return parsedText;
    } catch (err) {
        console.error('Error while parsing office file:', err);
        throw new Error('Failed to parse the office document');
    }
};

// Function to handle OCR for images
export const handleImageOCR = (file) => {
    return new Promise((resolve, reject) => {
        Tesseract.recognize(file, 'eng', {
            logger: (m) => console.log(m), // Optional: track progress
        }).then(({ data: { text } }) => resolve(text))
        .catch(reject);
    });
};
