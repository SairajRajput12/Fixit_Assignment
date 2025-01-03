import React, { useState } from 'react';
import './CreateQuiz.css';
import Form from '../UI/Form';
import Button from '../UI/Button';

export default function CreateQuiz() {
  const [quizType, setQuizType] = useState('manual');
  const [timer, setTimer] = useState(10);
  const [questions, setQuestions] = useState([]);
  const [emails, setEmails] = useState(['']);

  const handleAddQuestion = () => {
    setQuestions([...questions, { title: '', answer: '' }]);
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleEmailChange = (e,index, value) => {
    e.preventDefault();
    const updatedEmails = [...emails];
    updatedEmails[index] = value;
    setEmails(updatedEmails);
  };

  const handleAddEmail = () => {
    setEmails([...emails, '']);
  };

  const createByAI = (
    <div className="ai-auth">
      <Button
        className="ai-button"
        onClick={() => alert('Quiz generated through AI!')}
      >
        Generate Through AI
      </Button>
    </div>
  );

  const manualForm = (
    <div className="manual-form">
      <h2>Manual Question Entry</h2>
      {questions.map((q, index) => (
        <div key={index} className="question-entry">
          <label htmlFor={`question-${index}`}>Question Title:</label>
          <input
            id={`question-${index}`}
            type="text"
            value={q.title}
            onChange={(e) => handleQuestionChange(index, 'title', e.target.value)}
            placeholder="Enter question title..."
          />
          <label htmlFor={`answer-${index}`}>Answer:</label>
          <input
            id={`answer-${index}`}
            type="text"
            value={q.answer}
            onChange={(e) => handleQuestionChange(index, 'answer', e.target.value)}
            placeholder="Enter answer..."
          />
        </div>
      ))}
      <Button className="add-question" onClick={handleAddQuestion}>
        Add Question
      </Button>
    </div>
  );

  const timerSetting = (
    <div className="timer-setting">
      <h2>Set Timer</h2>
      <label htmlFor="timer">Quiz Duration (minutes):</label>
      <input
        id="timer"
        type="number"
        value={timer}
        onChange={(e) => setTimer(e.target.value)}
        min="1"
        placeholder="Enter duration in minutes"
      />
    </div>
  );

  const emailSetting = (
    <div className="email-setting">
      <h2>Set Allowed Emails</h2>
      {emails.map((email, index) => (
        <div key={index} className="email-entry">
          <label htmlFor={`email-${index}`}>Email {index + 1}:</label>
          <input
            id={`email-${index}`}
            type="email"
            value={email}
            onChange={(e) => handleEmailChange(index, e.target.value)}
            placeholder="Enter email..."
          />
        </div>
      ))}
      <Button className="add-email" onClick={handleAddEmail}>
        Add Email
      </Button>
    </div>
  );

  return (
    <div className="create-quiz">
      <Form className="quiz-form">
        <h1>Create Quiz</h1>
        <label>Choose Quiz Type:</label>
        <div className="quiz-options">
          <Button
            className='option-button active'
            onClick={() => setQuizType('manual')}
          >
            Add Manually
          </Button>
          <Button
            className='option-button active'
            onClick={() => setQuizType('ai')}
          >
            Generate Through AI
          </Button>
        </div>
        {quizType === 'manual' ? manualForm : createByAI}
        {timerSetting}
        {emailSetting}
        <Button
          className="submit-quiz"
          onClick={() =>
            alert(
              `Quiz Created Successfully! Timer: ${timer} mins, Emails: ${emails.join(
                ', '
              )}`
            )
          }
        >
          Submit Quiz
        </Button>
      </Form>
    </div>
  );
}
