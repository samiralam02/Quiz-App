import { useState, useEffect } from 'react';
import { getQuizData } from '../api/api'; // Correct

const useDataQuiz = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getQuizDataAsync = async () => {
            try {
                const response = await getQuizData();
                setData(response.data); // Use response.data directly
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        getQuizDataAsync();
    }, []);

    return { data, loading, error };
};

export default useDataQuiz;