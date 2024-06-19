import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();




  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:7000/login', { email, password });
      console.log(response.data); // procesar la respuesta del servidor
      navigate('/home');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Inicio de sesión fallido');
    }
  };


  const handleHomeRedirect = () => {
    navigate('/');
  };
  
  return (
    <div>
      <form onSubmit={handleLogin}>
        <h2>Iniciar Sesión</h2>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Contraseña:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button type="submit">Iniciar Sesión</button>
      </form>
      <div>
        <button onClick={handleHomeRedirect}>Regresar</button>
      </div>
    </div>  
  );
};

export default Login;
