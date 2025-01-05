import React, { useState } from 'react';
import './CreateQuiz.css';
import Form from '../UI/Form';
import Button from '../UI/Button';
import { useParams } from 'react-router-dom';

export default function CreateQuiz() {
  const [quizType, setQuizType] = useState('manual');
  const [timer, setTimer] = useState(10);
  const [questions, setQuestions] = useState([]);
  const [emails, setEmails] = useState(['']);
  const [aiGeneratedContent, setAiGeneratedContent] = useState(null);
  const [numQuestions, setNumQuestions] = useState(0); 
  const [quizCategory, setQuizCategory] = useState('');
  const [error,setErrorMessage] = useState(''); 
  const {userId} = useParams(); 
  const [quizTitle, setQuizTitle] = useState(''); 

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

  const generateQuestion = async() => {
    try {
      const response = await fetch('http://127.0.0.1:5000/generate_data_ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          questionno:numQuestions,
          type:quizCategory,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Question Generated Successfully!');
        console.log(result.data[0]); 
        setAiGeneratedContent(result.data);
        setQuestions(result.data); 
      } else {
        setErrorMessage(result.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while logging in. Please try again.');
    }
  }

  const handleGenerateAI = (e) => {
    e.preventDefault(); 
    generateQuestion(); 
  };

  const manualForm = (
    <div className="manual-form scrollable-container">
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
              onChange={(e) => {
                const updatedContent = [...aiGeneratedContent];
                updatedContent[index].title = e.target.value;
                setAiGeneratedContent(updatedContent);
              }}
            />
            <div>
              <h4>Options:</h4>
              {q.options.map((option, optIndex) => (
                <input
                  key={optIndex}
                  type="text"
                  value={option}
                  onChange={(e) => {
                    const updatedContent = [...aiGeneratedContent];
                    updatedContent[index].options[optIndex] = e.target.value;
                    setAiGeneratedContent(updatedContent);
                  }}
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
              onChange={(e) => {
                const updatedContent = [...aiGeneratedContent];
                updatedContent[index].answer = e.target.value;
                setAiGeneratedContent(updatedContent);
              }}
            />
          </div>
        ))
      ) : (
        <p>No AI-generated questions yet. Click the button to generate.</p>
      )}
      <div className="ai-settings">
        <label>Number of Questions:</label>
        <input
          type="number"
          value={numQuestions}
          onChange={(e) => setNumQuestions(e.target.value)}
          min="1"
        />
        <label>Quiz Category:</label>
        <input
         type='text'
          value={quizCategory}
          onChange={(e) => setQuizCategory(e.target.value)}
        />
      </div>
      <Button className="add-question" onClick={(e) => handleGenerateAI(e)}>
        Generate AI Questions
      </Button>
    </div>
  );

  console.log(aiGeneratedContent); 

  const emailSetting = (
    <div className="email-setting">
      <h2>Set Allowed Emails</h2>
      <div className="email-container" style={{ maxHeight: '200px', overflowY: 'auto', padding: '5px', border: '1px solid #ccc', borderRadius: '5px' }}>
        {emails.map((email, index) => (
          <div key={index} className="email-entry">
            <label htmlFor={`email-${index}`}>Email {index + 1}:</label>
            <input
              id={`email-${index}`}
              type="text"
              value={email}
              onChange={(e) => handleEmailChange(index, e.target.value)}
              placeholder="Enter usernames..."
            />
          </div>
        ))}
      </div>
      <Button className="add-email" onClick={handleAddEmail}>
        Add Username
      </Button>
    </div>
  );

  const submitInBackend = async() => {
    
    try {
      const response = await fetch('http://127.0.0.1:5000/add_data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username:userId,
          time:timer, 
          mcq:questions, 
          users:emails,
          title: quizTitle, 
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Quiz Started Succesfully !');
      } else {
        setErrorMessage(result.message || 'Server Issue. Please try again.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while logging in. Please try again.');
    }
  }

  const handleSubmitQuiz = (e) =>{
    e.preventDefault(); 
    console.log('clicked on handle submit'); 
    submitInBackend(); 

      setQuizType('manual'); 
      setTimer(10); 
      setQuestions([]); 
      setEmails([]); 
      setAiGeneratedContent(null); 
      setNumQuestions(0); 
      setQuizCategory(''); 
      setQuizTitle('');
  }

  

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

        <div className="quiz-title">
          <label htmlFor="quiz-title">Quiz Title:</label>
          <input
            id="quiz-title"
            type="text"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
            placeholder="Enter quiz title..."
          />
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
        {emailSetting}
        <Button className="submit-quiz" onClick={(e) => handleSubmitQuiz(e)}>
          Submit Quiz
        </Button>
      </Form>
    </div>
  );
}
