import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:7000/register', { name, email, password });
      console.log(response.data);
      navigate('/login');
    } catch (error) {
      console.error('Error al registrar usuario:', error.response ? error.response.data : error);
      alert('Registro fallido');
    }
  };

  return (
    <div>
      <form onSubmit={handleRegister}>
        <h2>Registrarse</h2>
        <label>
          Nombre:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Contraseña:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button type="submit">Registrarse</button>
      </form>
      <div>
        <button onClick={() => navigate('/')}>Regresar</button>
      </div>
    </div>
  );
};

export default Register;
