import React, { useState } from 'react';
import './Login.css'; // Adicione o arquivo CSS para estilizar

const Login = ({ setLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para visibilidade da senha

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'usuario@exemplo.com' && password === '374012') {
      setLoggedIn(true);
    } else {
      alert('E-mail ou senha incorretos.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="password-input-container">
          <input
            type={showPassword ? 'text' : 'password'} // Alterna entre 'text' e 'password'
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="eye-icon"
            onClick={togglePasswordVisibility} // Alterna a visibilidade
          >
            {showPassword ? (
              <i className="fas fa-eye-slash"></i> // Ícone de olho fechado
            ) : (
              <i className="fas fa-eye"></i> // Ícone de olho aberto
            )}
          </button>
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
