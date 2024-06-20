import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Notas from './components/Notas';
import Editor from './components/Editor'; // Editor Componente Quill

const App = () => {
  return (
    <Router>
      <Header />
      <div className="container mt-3">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/notas" element={<Notas />} />
          <Route path="/editor" element={<Editor />} /> {/* nueva ruta para Editor */}
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
