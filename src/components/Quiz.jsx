// src/components/Quiz.jsx
import React, { useState } from 'react';
import useDataQuiz from '../hooks/useQuizData';
import '../Quiz.css'; // Importing the CSS styles

const Quiz = ({ userName }) => {
    const { data, loading, error } = useDataQuiz(); // Fetch quiz data using the custom hook
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswerId, setSelectedAnswerId] = useState(null);
    const [score, setScore] = useState(0);
    const [completed, setCompleted] = useState(false);

    const handleAnswerSelect = (optionId) => {
        setSelectedAnswerId(optionId);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!data || !data.questions || !data.questions.length) {
            return; // Prevent errors if data is not available
        }

        const currentQuestionData = data.questions[currentQuestionIndex];
        const correctAnswerId = currentQuestionData.options.find(option => option.is_correct)?.id;

        if (selectedAnswerId === correctAnswerId) {
            setScore(prevScore => prevScore + 1);
        }

        // Move to the next question
        if (currentQuestionIndex < data.questions.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            setSelectedAnswerId(null); // Reset selected answer for the next question
        } else {
            setCompleted(true); // Mark the quiz as complete
        }
    };

    if (loading) {
        return <div className="loading-container">
                <div className="spinner"></div>
                <p className="loading-message">Please Wait!</p>
            </div>; // Show loading message
    }

    if (error) {
        return <p className="error-message">Error fetching quiz data: {error.message || error}</p>; // Display error
    }

    if (!data || !data.questions.length) {
        return <p className="error-message">No quiz data available.</p>; // Display if no data/questions are present
    }

    const currentQuestionData = data.questions[currentQuestionIndex]; // Get current question data

    return (
        <div className="quiz-wrapper">
            <header>
                <h1>
                    Quiz Master 🎉 <br />
                    <span className="greetings">
                        Hey {userName},Ready to challenge your wits with some fun and quirky questions? 🚀
                    </span>
                </h1>
            </header>

            <div className="container">
                {completed ? (
                   <h2 className="completed-message">
                        🎉 Quiz Completed! 🎉 <br />
                        <span className="score-display">
                            You scored <strong>{score}</strong> out of <strong>{data.questions.length}</strong>!  
                        </span>  
                        <br />  
                        {score > data.questions.length / 2 ? "Great job! 🔥 Keep it up!" : "Nice effort! Try again to beat your score! 💪"}
                    </h2>
               
                ) : (
                    <>
                        <h2 className='quiz-title'>{data.title}</h2>
                        <h3 className='question-number'>Question {currentQuestionIndex + 1} of {data.questions.length}</h3>
                        <div className="question">
                            <p>{currentQuestionData.description}</p>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="options">
                                {currentQuestionData.options.map(option => (
                                    <div key={option.id} className="option">
                                        <input
                                            type="radio"
                                            id={option.id}
                                            name="answer"
                                            value={option.id}
                                            checked={selectedAnswerId === option.id}
                                            onChange={() => handleAnswerSelect(option.id)}
                                        />
                                        <label htmlFor={option.id}>{option.description}</label>
                                    </div>
                                ))}
                            </div>
                            <button type="submit" disabled={selectedAnswerId === null} className="submit-button">
                                Submit Answer
                            </button>
                        </form>
                    </>
                )}
            </div>
            <footer>
                <p>© 2025 Quiz Application. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Quiz;