import { useState } from "react";
import { useNavigate } from "react-router-dom";

import'./LogIn.css'
import useUserStore from "../../hooks/userStore";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { user, updateUser} = useUserStore();

  const nav = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const userObject = { "username": username, "password": password }

    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userObject)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.json()}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        updateUser(data)
        nav("/dashboard");
      })
      .catch(error => {
        console.log("error", error.message);
      })
    };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} id='logInForm'>
        <h2 id='logInTitle'>Login</h2>
        <div className="input-group">
          <label className="logInLabel">Username:</label>
          <input
            className="logInInput"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label className="logInLabel">Password:</label>
          <input
            className="logInInput"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" id="logInButton">Login</button>
      </form>
    </div>
  );
}

export default Login;