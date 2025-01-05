import React, { useEffect, useState } from 'react';
import './ShowQuiz.css';
import Button from '../UI/Button';
import { useParams } from 'react-router-dom';

export default function ShowQuiz() {
  // Example quiz data
  
  // const quizzes = [
  //   { id: 1, title: 'Math Quiz', status: 'ongoing', timer: '10 mins', email: 'example1@gmail.com' },
  //   { id: 2, title: 'Science Quiz', status: 'expired', timer: '15 mins', email: 'example2@gmail.com' },
  //   { id: 3, title: 'History Quiz', status: 'ongoing', timer: '20 mins', email: 'example3@gmail.com' },
  //   { id: 4, title: 'Geography Quiz', status: 'expired', timer: '12 mins', email: 'example4@gmail.com' },
  // ];

  const [quizzes,setQuizzes] = useState([]); 
  
  const {userId} = useParams(); 
  const fecthQuiz = async() => {
    try {
      const response = await fetch('http://127.0.0.1:5000/read_data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username:userId,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        console.log(result.data); 
        const fetchedData = result.data; 
        const yourQuizes = []; 
        alert('Quiz Data Fetched Succesfully !');
        for(const key in fetchedData){
            console.log(key); 

            let quiz_data = fetchedData[key]; 
            console.log('quiz data',quiz_data)
            for(const key1 in quiz_data){
              //  console.log(key1);
              //  console.log(quiz_data[key1]);
               yourQuizes.push(quiz_data[key1]); 
            }             
        }

        console.log(yourQuizes); 
        setQuizzes(yourQuizes); 
      } else {
        console.log('Error');
      }
    } catch (error) {
      console.log(error); 
    }
  }

  useEffect(() => {
      fecthQuiz(); 
  },[]); 

  



  // Filter quizzes based on their status
  const ongoingQuizzes = quizzes.filter((quiz) => quiz.status === 'ongoing');
  const expiredQuizzes = quizzes.filter((quiz) => quiz.status === 'expired');

  const renderQuizCards = (quizList,title) =>
    quizList.map((quiz) => (
      <div key={quiz.QuizId} className="quiz-card">
        <h3>{quiz.title}</h3>
        <p>Duration: {quiz.time}</p>
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
