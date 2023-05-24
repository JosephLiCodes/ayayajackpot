import { useState } from 'react';
import { auth } from '../firebase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      // Successful login, you can redirect or perform other actions here
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div>
      <input type="email" value={email} onChange={handleEmailChange} placeholder="Email" />
      <input
        type="password"
        value={password}
        onChange={handlePasswordChange}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
