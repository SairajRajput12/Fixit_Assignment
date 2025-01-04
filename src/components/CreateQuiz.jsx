import React, { useState } from 'react';
import './CreateQuiz.css';
import Form from '../UI/Form';
import Button from '../UI/Button';

export default function CreateQuiz() {
  const [quizType, setQuizType] = useState('manual');
  const [timer, setTimer] = useState(10);
  const [questions, setQuestions] = useState([]);
  const [emails, setEmails] = useState(['']);
  const [aiGeneratedContent, setAiGeneratedContent] = useState(null);

  const handleAddQuestion = () => {
    setQuestions([...questions, { title: '', options: [''], answer: '' }]);
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[optIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleAddOption = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].options.push('');
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
    setAiGeneratedContent([
      { title: 'What is React?', options: ['Library', 'Framework', 'Language'], answer: 'Library' },
      { title: 'What is useState?', options: ['Hook', 'Component', 'State'], answer: 'Hook' },
    ]);
  };

  const manualForm = (
    <div className="manual-form" style={{ maxHeight: '400px', overflowY: 'auto' }}>
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
          <div>
            <h4>Options:</h4>
            {q.options.map((option, optIndex) => (
              <input
                key={optIndex}
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, optIndex, e.target.value)}
                placeholder={`Option ${optIndex + 1}`}
              />
            ))}
            <Button className="add-question" onClick={() => handleAddOption(index)}>
              Add Option
            </Button>
          </div>
          <label htmlFor={`answer-${index}`}>Correct Answer:</label>
          <input
            id={`answer-${index}`}
            type="text"
            value={q.answer}
            onChange={(e) => handleQuestionChange(index, 'answer', e.target.value)}
            placeholder="Enter correct option number..."
          />
        </div>
      ))}
      <Button className="add-question" onClick={handleAddQuestion}>
        Add Question
      </Button>
    </div>
  );

  const aiGeneratedForm = (
    <div className="ai-form" style={{ maxHeight: '400px', overflowY: 'auto' }}>
      <h2>AI-Generated Questions</h2>
      {aiGeneratedContent ? (
        aiGeneratedContent.map((q, index) => (
          <div key={index} className="question-entry">
            <label>Question:</label>
            <input
              type="text"
              value={q.title}
              onChange={(e) => handleQuestionChange(index, 'title', e.target.value)}
            />
            <div>
              <h4>Options:</h4>
              {q.options.map((option, optIndex) => (
                <input
                  key={optIndex}
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, optIndex, e.target.value)}
                />
              ))}
              <Button className="add-question" onClick={() => handleAddOption(index)}>
                Add Option
              </Button>
            </div>
            <label>Correct Answer:</label>
            <input
              type="text"
              value={q.answer}
              onChange={(e) => handleQuestionChange(index, 'answer', e.target.value)}
            />
          </div>
        ))
      ) : (
        <p>No AI-generated questions yet. Click the button to generate.</p>
      )}
      <Button className='add-question' onClick={handleGenerateAI}>
        Regenerate AI Questions
      </Button>
    </div>
  );

  return (
    <div className="create-quiz">
      <Form className="quiz-form">
        <h1>Create Quiz</h1>
        <label>Choose Quiz Type:</label>
        <div className="quiz-options">
          <Button className="option-button" onClick={() => setQuizType('manual')}>
            Add Manually
          </Button>
          <Button className="option-button" onClick={() => setQuizType('ai')}>
            Generate Through AI
          </Button>
        </div>
        {quizType === 'manual' ? manualForm : aiGeneratedForm}
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
        <Button className="submit-quiz" onClick={() => alert('Quiz Submitted!')}>
          Submit Quiz
        </Button>
      </Form>
    </div>
  );
}
