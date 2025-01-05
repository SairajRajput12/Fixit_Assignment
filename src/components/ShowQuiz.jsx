import React, { useEffect, useState } from 'react';
import './ShowQuiz.css';
import Button from '../UI/Button';
import { useParams, useNavigate } from 'react-router-dom';

export default function ShowQuiz() {
  const [quizzes, setQuizzes] = useState([]);
  const { userId } = useParams();
  const navigate = useNavigate(); 

  const fetchQuiz = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/read_data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: userId,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        const fetchedData = result.data;
        const yourQuizzes = [];

        for (const key in fetchedData) {
          const quizData = fetchedData[key];
          for (const key1 in quizData) {
            yourQuizzes.push(quizData[key1]);
          }
        }

        setQuizzes(yourQuizzes);
      } else {
        console.error('Failed to fetch quiz data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  const ongoingQuizzes = quizzes.filter((quiz) => quiz.status === 'ongoing');
  const expiredQuizzes = quizzes.filter((quiz) => quiz.status === 'expired');

  const handleStartQuiz = (quizId) => {
    navigate(`/quiz/${quizId}`); 
  };

  const handleSeeResults = (quizId) => {
    navigate(`/results/${quizId}`); 
  };

  const renderQuizCards = (quizList, buttonTitle, actionHandler) =>
    quizList.map((quiz) => (
      <div key={quiz.QuizId} className="quiz-card">
        <h3>{quiz.title}</h3>
        <p>Duration: {quiz.time}</p>
        <Button className="submitquiz" onClick={() => actionHandler(quiz.QuizId)}>
          {buttonTitle}
        </Button>
      </div>
    ));

  return (
    <div className="show-quiz">
      <h1>Show Quizzes</h1>

      <div className="quiz-category">
        <h2>Ongoing Quizzes</h2>
        {ongoingQuizzes.length > 0 ? (
          <div className="quiz-list">
            {renderQuizCards(ongoingQuizzes, 'Start Quiz', handleStartQuiz)}
          </div>
        ) : (
          <p>No ongoing quizzes.</p>
        )}
      </div>

      <div className="quiz-category">
        <h2>Expired Quizzes</h2>
        {expiredQuizzes.length > 0 ? (
          <div className="quiz-list">
            {renderQuizCards(expiredQuizzes, 'See Results', handleSeeResults)}
          </div>
        ) : (
          <p>No expired quizzes.</p>
        )}
      </div>
    </div>
  );
}
