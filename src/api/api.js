import axios from 'axios';

// Function to fetch quiz data using the proxy path
export const getQuizData = async () => {
    try {
        const response = await axios.get('/api/Uw5CrX'); // Using proxy
        return response; // Return the entire response object
    } catch (error) {
        throw new Error('Failed to fetch data: ' + error.message); // Handle errors gracefully
    }
};