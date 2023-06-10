import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import React,{useState} from 'react'

import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import Todo from './components/Todo/Todo'

function Routing() {
  const [loggedIn, setLoggedIn] = useState(false);


  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await fetch('https://mulearn-internship-task-production.up.railway.app/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        
      });

      if (response.ok) {
        const data = await response.json();
        const { access, refresh } = data;
        localStorage.setItem('accessToken', access);
        localStorage.setItem('refreshToken', refresh);

        setLoggedIn(true);
      } else {
        alert('Invalid username or password');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout =async () => {
    try {
      const response = await fetch('https://mulearn-internship-task-production.up.railway.app/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
       
        
      });
      if(response.ok){
        setLoggedIn(false);
      }
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        setLoggedIn(false);
      } 
      catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div>
      <Router>
        <Routes>
          <Route  path='/' element={<Login handleLogin={handleLogin} loggedIn={loggedIn}/>} />  

          <Route path='/signup' element={<Signup/>} />

          <Route path='/todo' element={loggedIn ? (
                  <Todo handleLogout={handleLogout} />
                   ) : (
                   <Login handleLogin={handleLogin} loggedIn={loggedIn} />
                  )} 
                  /> 

        </Routes>
      </Router>
      
    </div>
  )
}

export default Routing
