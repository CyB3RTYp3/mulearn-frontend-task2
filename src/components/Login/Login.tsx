import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './login.css'

interface Props {
  handleLogin: (username: string, password: string) => void;
  loggedIn: boolean;
}

const Login = ({ handleLogin, loggedIn }: Props) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      // Make API call to authenticate user and get tokens
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.ok) {
        const { access, refresh } = await response.json();

        // Store tokens in local storage or in a state management solution
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);

        handleLogin(username, password);
        navigate('/todo');
      } else {
        throw new Error('Invalid username or password');
      }
    } catch (error) {
      console.error(error);
      alert('Error occurred during login');
    }
  };

  if (loggedIn) {
    return <p>You are already logged in!</p>;
  }

  return (
    <div className='login'>
      <div className="login-div">
        <h1>Login In</h1>
        <form className='form' onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button type='submit' className="login-btn">Login</button>
        </form>
        <Link to='/signup' style={{ textDecoration: 'none' }}><p className='p-login' >SignUp?</p></Link>
      </div>
    </div>
  );
}

export default Login;
