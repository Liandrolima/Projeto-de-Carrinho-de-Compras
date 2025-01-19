import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão de envio do formulário
    setError(''); // Limpa o erro anterior, caso haja

    try {
      // Envio da solicitação de login
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });

      // Verifica se a resposta contém um token
      if (response.data.token) {
        // Armazena o token no localStorage
        localStorage.setItem('token', response.data.token);

        // Redireciona para a página de produtos
        navigate('/products');
      } else {
        setError('Erro: Não foi possível fazer login.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao fazer login');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
