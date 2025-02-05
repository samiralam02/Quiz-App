// src/components/WelcomePage.jsx
import React, { useState } from 'react';
import '../Quiz.css'; // Import the CSS styles

const WelcomePage = ({ onStartQuiz }) => {
    const [name, setName] = useState('');

    const handleStartQuiz = () => {
        if (name.trim()) {
            onStartQuiz(name); // Pass the user's name to the parent component
        } else {
            alert('Please enter your name.'); // Alert if the name is empty
        }
    };

    return (
        <div className="wrappers welcome-page">
            <h1>Welcome to the Quiz App!</h1>
            <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Enter Your Name" 
                className="name-input"
            />
            <button onClick={handleStartQuiz} className="start-quiz">
                Let's Start the Quiz
            </button>
        </div>
    );
};

export default WelcomePage;