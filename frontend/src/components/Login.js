import React, { useState } from 'react';
import './Login.css'; // Adicione o arquivo CSS para estilizar

const Login = ({ setLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para visibilidade da senha
  const [isRegistering, setIsRegistering] = useState(false); // Estado para alternar entre login e cadastro
  const [registeredUsers, setRegisteredUsers] = useState([]); // Estado para armazenar os usuários registrados

  // Manipula o login
  const handleLogin = (e) => {
    e.preventDefault();
    const userExists = registeredUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (userExists) {
      setLoggedIn(true);
    } else {
      alert('E-mail ou senha incorretos.');
    }
  };

  // Manipula o cadastro
  const handleRegister = (e) => {
    e.preventDefault();
    const userExists = registeredUsers.some((user) => user.email === email);

    if (userExists) {
      alert('E-mail já cadastrado.');
    } else {
      setRegisteredUsers([...registeredUsers, { email, password }]);
      alert('Cadastro realizado com sucesso!');
      setIsRegistering(false); // Alterna para a tela de login após o cadastro
      setEmail('');
      setPassword('');
    }
  };

  // Alterna a visibilidade da senha
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login">
      <h2>{isRegistering ? 'Cadastro' : 'Login'}</h2>
      <form onSubmit={isRegistering ? handleRegister : handleLogin}>
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
        <button type="submit">{isRegistering ? 'Cadastrar' : 'Entrar'}</button>
      </form>
      <button
        type="button"
        className="toggle-button"
        onClick={() => setIsRegistering(!isRegistering)}
      >
        {isRegistering ? 'Já tem uma conta? Faça login' : 'Não tem uma conta? Cadastre-se'}
      </button>
    </div>
  );
};

export default Login;
