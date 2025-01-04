import React, { useState } from 'react';
import './CreateQuiz.css';
import Form from '../UI/Form';
import Button from '../UI/Button';

export default function CreateQuiz() {
  const [quizType, setQuizType] = useState('manual');
  const [timer, setTimer] = useState(10);
  const [questions, setQuestions] = useState([]);
  const [emails, setEmails] = useState(['']);
  const [aiGeneratedContent, setAiGeneratedContent] = useState(null); // New state for AI-generated content

  const handleAddQuestion = () => {
    setQuestions([...questions, { title: '', answer: '' }]);
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleEmailChange = (index, value) => {
    const updatedEmails = [...emails];
    updatedEmails[index] = value;
    setEmails(updatedEmails);
  };

  const handleAddEmail = () => {
    setEmails([...emails, '']);
  };

  const handleGenerateAI = () => {
    // Simulate AI-generated content
    setAiGeneratedContent([
      { title: 'What is React?', answer: 'A JavaScript library for building user interfaces.' },
      { title: 'What is useState?', answer: 'A React Hook for managing state in functional components.' },
    ]);
  };

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
            onChange={(e) =>
              handleQuestionChange(index, 'title', e.target.value)
            }
            placeholder="Enter question title..."
          />
          <label htmlFor={`answer-${index}`}>Answer:</label>
          <input
            id={`answer-${index}`}
            type="text"
            value={q.answer}
            onChange={(e) =>
              handleQuestionChange(index, 'answer', e.target.value)
            }
            placeholder="Enter answer..."
          />
        </div>
      ))}
      <Button className="add-question" onClick={handleAddQuestion}>
        Add Question
      </Button>
    </div>
  );

  const aiGeneratedForm = (
    <div className="ai-form">
      <h2>AI-Generated Questions</h2>
      {aiGeneratedContent ? (
        aiGeneratedContent.map((q, index) => (
          <div key={index} className="question-entry">
            <p><strong>Q:</strong> {q.title}</p>
            <p><strong>A:</strong> {q.answer}</p>
          </div>
        ))
      ) : (
        <p>No AI-generated questions yet. Click the button to generate.</p>
      )}
      <Button className="generate-again" onClick={handleGenerateAI}>
        Regenerate AI Questions
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
        onChange={(e) => setTimer(parseInt(e.target.value, 10))}
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

  const handleSubmitQuiz = () => {
    if (questions.some((q) => !q.title || !q.answer)) {
      alert('Please fill in all question titles and answers!');
      return;
    }

    alert(
      `Quiz Created Successfully! Timer: ${timer} mins, Emails: ${emails.join(
        ', '
      )}`
    );
  };

  return (
    <div className="create-quiz">
      <Form className="quiz-form">
        <h1>Create Quiz</h1>
        <label>Choose Quiz Type:</label>
        <div className="quiz-options">
          <Button
            className="option-button"
            onClick={() => setQuizType('manual')}
          >
            Add Manually
          </Button>
          <Button
            className="option-button"
            onClick={() => setQuizType('ai')}
          >
            Generate Through AI
          </Button>
        </div>
        {quizType === 'manual' ? manualForm : aiGeneratedForm}
        {timerSetting}
        {emailSetting}
        <Button className="submit-quiz" onClick={handleSubmitQuiz}>
          Submit Quiz
        </Button>
      </Form>
    </div>
  );
}
