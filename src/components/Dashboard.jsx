import React, { useState } from 'react'
import CreateQuiz from './CreateQuiz'
import './Dashboard.css'
import SideBoard from './SideBoard'
import Button from '../UI/Button'
import ShowQuiz from './ShowQuiz'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const [selectTab,setSelectTab] = useState('create');
  const navigate = useNavigate(); 
  let content = null; 
  if(selectTab == 'create'){
    content = <CreateQuiz />
  }
  else if(selectTab == 'your'){
    content = <ShowQuiz />
  }

  const handleSignout = () => {
    navigate('/');
  }

  return (
    <div className='dashboard'>
      <SideBoard>
          <Button onClick={() => setSelectTab('create')} className='project-button' >Create Quiz</Button>
          <Button onClick={() => setSelectTab('your')} className='project-button' >Your Quiz's</Button>
          <Button onClick={handleSignout} className='project-button' >Signout</Button>
      </SideBoard>
      {content}
    </div>
  )
}
