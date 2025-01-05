import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Quiz.css';
import { io } from "socket.io-client";

export default function Quiz() {
  const { quizId, userId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [timer, setTimer] = useState();
  const [quizTimer, setQuizTimer] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quizTitle, setQuizTitle] = useState('');
  const [activeTab, setActiveTab] = useState('quiz');
  const [users, setUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  const [hostname, setHostname] = useState(null);

  console.log(users); 

  const callForPushResultToBackend = async() => {
    try {
        const response = await fetch('http://127.0.0.1:5000/end_game', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            quiz_id: quizId,
            hostname: hostname,
          }),
        });
  
        const result = await response.json();
        if (response.ok) {
          const fetchedData = result.winners;
          return fetchedData;           
        } else {
          console.error('Failed to fetch quiz data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
  }
  console.log(users); 

  useEffect(() => {
    const socketInstance = io('http://127.0.0.1:5000');
    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const fetchQuiz = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/quiz_data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: userId,
          quizId: quizId,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        const fetchedData = result.data;

        let data = null;
        for (const key in fetchedData) {
          data = fetchedData[key];
        }
        
        setHostname(result.hostname);
        setQuiz(data.Quiz);
        setQuizTimer(data.time * 60);
        setTimer(30);
        setQuizTitle(data.title);

        let users_d = data['visible user emails'];
        let users_dict = [];

        for (const element in users_d) {
          users_dict.push({
            username: users_d[element],
            score: 0,
          });
        }

        console.log(users_dict); 

        setUsers(users_dict);
      } else {
        console.error('Failed to fetch quiz data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (quiz === null) {
      fetchQuiz();
    }

    if (quizTimer === 0) {
      const winner = callForPushResultToBackend(); 
      winner.then(() => handleTabChange('leaderboard'));
    }

    if (timer <= 0) {
      setTimer(30);
      setCurrentIndex((prevIndex) => (prevIndex + 1 < quiz.length ? prevIndex + 1 : prevIndex));
      setQuizTimer((prevTimer) => (prevTimer - 30)); 
      get_data(); 
    }

    const timer1 = setInterval(() => {
      if (timer > 0) {
        setTimer((prev) => prev - 1);
      }
    }, 1000);

    return () => clearInterval(timer1);
  }, [timer, quiz, quizTimer]);

  const get_data = async() => {
    try {
        const response = await fetch('http://127.0.0.1:5000/leaderboard', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            hostname: hostname,
            quiz_id: quizId,
          }),
        });
  
        const result = await response.json();
        
        if (response.ok) {
          let obj = result.data; 
          let user = []; 
          for(const key in obj){
            const userScores = obj[key]; 
            let sum = 0; 
            for(let i = 0; i < userScores.length; i++){
                sum += userScores[i]; 
            }
            user.push({username:key,score:sum}); 
          } 
          setUsers(user); 
        } else {
          console.error('Failed to fetch quiz data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSubmitAnswer = (e, index) => {
    e.preventDefault();
    
    if (socket) {
      socket.emit("submit_answer", {
        username: userId,
        hostname: hostname,
        quiz_id: quizId,
        current_index: currentIndex,
        answer_submitted: (index + 1),
        correct_answer: quiz[currentIndex].answer,
        number_of_questions: quiz.length
      });
    }

    if (currentIndex + 1 >= quiz.length) {
      setActiveTab('leaderboard');
    }
  };

  return (
    <div className="quiz-container">
      <header className="quiz-header">
        <h1>{quizTitle}</h1>
        <div className="tabs">
          <button
            className={`tab-button ${activeTab === 'quiz' ? 'active' : ''}`}
            onClick={() => handleTabChange('quiz')}
            disabled={quizTimer <= 0}  
          >
            Start Quiz
          </button>
          <button
            className={`tab-button ${activeTab === 'leaderboard' ? 'active' : ''}`}
            onClick={() => handleTabChange('leaderboard')}
          >
            Leaderboard
          </button>
        </div>
      </header>

      <div className="tab-content">
        {activeTab === 'quiz' && quiz ? (
          <div className="quiz-tab">
            <p className="timer">Quiz Timer: {quizTimer} seconds</p>
            <p className="timer">Question Timer: {timer} seconds</p>
            <div className="question">
              <h3>Question {currentIndex + 1}</h3>
              <p className="question-text">{quiz[currentIndex].title}</p>
              <div className="options">
                {quiz[currentIndex]?.options?.map((option, index) => (
                  <button onClick={(e) => handleSubmitAnswer(e, index)} key={index} className="option-button">
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : activeTab === 'leaderboard' ? (
          <div className="leaderboard-tab">
            <h2>Leaderboard</h2>
            <ul className="leaderboard-list">
              {users.map((element, index) => (
                <li key={index} className="leaderboard-item">
                  {element.username} - Score: {element.score}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
