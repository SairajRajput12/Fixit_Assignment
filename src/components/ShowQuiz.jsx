import React from 'react';
import './ShowQuiz.css';
import Button from '../UI/Button';

export default function ShowQuiz() {
  // Example quiz data
  const quizzes = [
    { id: 1, title: 'Math Quiz', status: 'ongoing', timer: '10 mins', email: 'example1@gmail.com' },
    { id: 2, title: 'Science Quiz', status: 'expired', timer: '15 mins', email: 'example2@gmail.com' },
    { id: 3, title: 'History Quiz', status: 'ongoing', timer: '20 mins', email: 'example3@gmail.com' },
    { id: 4, title: 'Geography Quiz', status: 'expired', timer: '12 mins', email: 'example4@gmail.com' },
  ];

  // Filter quizzes based on their status
  const ongoingQuizzes = quizzes.filter((quiz) => quiz.status === 'ongoing');
  const expiredQuizzes = quizzes.filter((quiz) => quiz.status === 'expired');

  const renderQuizCards = (quizList,title) =>
    quizList.map((quiz) => (
      <div key={quiz.id} className="quiz-card">
        <h3>{quiz.title}</h3>
        <p>Duration: {quiz.timer}</p>
        <Button className='submitquiz'>{title}</Button>
      </div>
    ));

  return (
    <div className="show-quiz">
      <h1>Show Quizzes</h1>

      <div className="quiz-category">
        <h2>Ongoing Quizzes</h2>
        {ongoingQuizzes.length > 0 ? (
          <div className="quiz-list">{renderQuizCards(ongoingQuizzes,'start')}</div>
        ) : (
          <p>No ongoing quizzes.</p>
        )}
      </div>

      <div className="quiz-category">
        <h2>Expired Quizzes</h2>
        {expiredQuizzes.length > 0 ? (
          <div className="quiz-list">{renderQuizCards(expiredQuizzes,'see results')}</div>
        ) : (
          <p>No expired quizzes.</p>
        )}
      </div>
    </div>
  );
}
