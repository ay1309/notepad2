import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FondoBosque from './FondoBosque.jpg';

const Login = () => {

  const backgroundStyle = {
    backgroundImage: `url(${FondoBosque})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  };

  const boxStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Blanco semitransparente
    padding: '20px',
    borderRadius: '10px',
  };


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:7000/login', { email, password });
      console.log(response.data); 
      navigate('/notas'); // notas después del login exitoso
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Inicio de sesión fallido');
    }
  };

  const handleHomeRedirect = () => {
    navigate('/home'); 
  };

  return (
    <div style={backgroundStyle}>
      <div style={boxStyle}>
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
       <button onClick={handleHomeRedirect}>Regresar</button>
      </div>
    </div>
  );
};

export default Login;
