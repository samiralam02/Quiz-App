// src/App.jsx
import React, { useState } from 'react';
import useQuizData from './hooks/useQuizData'; // Import the custom hook for quiz data
import Quiz from './components/Quiz'; // Import the Quiz component
import WelcomePage from './components/WelcomePage'; // Import the WelcomePage component
import './App.css'; // Shared styles

function App() {
    const { quizData, error } = useQuizData(); // Use the custom hook to fetch quiz data
    const [userName, setUserName] = useState(null); // State for user's name

    if (error) return <p>{error}</p>; // Show error message if fetch failed

    // Function to handle when the user starts the quiz
    const handleStartQuiz = (name) => {
        setUserName(name); // Set the user's name
    };

    return (
        <div className="app">
            {userName ? (
                <Quiz quizData={quizData} userName={userName} /> // Render Quiz component if userName is set
            ) : (
                <WelcomePage onStartQuiz={handleStartQuiz} /> // Render WelcomePage otherwise
            )}
        </div>
    );
}

export default App;