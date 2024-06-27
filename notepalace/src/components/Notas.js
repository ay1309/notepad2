import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../App.css'; // Para estilos globales, mantener esta línea
import backgroundNotes from './BackgroundNotes.png'; // Malditas rutas 

const Notas = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [folders, setFolders] = useState([]);
  const quillRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:7000/api/user/data'); // Ajusta la URL según tu backend
        setTaskList(response.data.tasks);
        setFolders(response.data.folders);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const savePending = async () => {
    const noteContent = quillRef.current.getEditor().root.innerHTML;
    try {
      const response = await axios.post('http://localhost:7000/api/tarea', {
        nombre_tarea: noteContent,
        descripcion: '',
        fecha_limite: null,
        carpetaId: null // Sin carpeta
      });
      setTaskList([...taskList, response.data]);
      alert('Nota guardada en Tareas Pendientes: ' + noteContent);
    } catch (error) {
      console.error('Error saving task:', error);
      alert('Error al guardar la tarea en Tareas Pendientes');
    }
  };

  const saveFolder = async () => {
    const noteContent = quillRef.current.getEditor().root.innerHTML;
    const folderName = prompt('Ingrese el nombre de la carpeta para guardar la nota:', 'Carpeta predeterminada');
    if (folderName) {
      try {
        let folder = folders.find(f => f.nombre_carpeta === folderName);
        if (!folder) {
          const folderResponse = await axios.post('http://localhost:7000/api/carpeta', {
            nombre_carpeta: folderName
          });
          folder = folderResponse.data;
          setFolders([...folders, folder]);
        }
        const response = await axios.post('http://localhost:7000/api/tarea', {
          nombre_tarea: noteContent,
          descripcion: '',
          fecha_limite: null,
          carpetaId: folder._id
        });
        setTaskList([...taskList, response.data]);
        alert('Nota guardada en ' + folderName + ': ' + noteContent);
      } catch (error) {
        console.error('Error saving task in folder:', error);
        alert('Error al guardar la tarea en la carpeta');
      }
    }
  };

  const backgroundStyle = {
    backgroundImage: `url(${backgroundNotes})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    padding: '20px',
  };

  return (
    <div className="notas-container" style={backgroundStyle}>
      <header className="notas-header">
        <div className="notas-menu-icon" onClick={toggleMenu}>&#9776;</div>
        <h1>Tu espacio</h1>
      </header>
      {menuVisible && (
        <div id="menu" className="notas-dropdown-menu">
          <ul>
            <li onClick={() => alert('Nueva nota creada')}>Crear nota</li>
            <li>Configuración</li>
            <li>Cerrar sesión</li>
            <li>Subir archivo</li>
          </ul>
        </div>
      )}
      <main className="notas-main">
        <section className="notas-user-space">
          <h2>Espacio del Usuario</h2>
          <h3>Tareas pendientes</h3>
          <ul id="task-list">
            {taskList.map((task, index) => (
              <li key={index}>{task.nombre_tarea}</li>
            ))}
          </ul>
        </section>
        <section className="notas-notes">
          <h3>Notas</h3>
          <ReactQuill ref={quillRef} placeholder="Escribe algo épico..." theme="snow" />
          <button id="notas-save-pending" onClick={savePending}>Guardar en Tareas Pendientes</button>
          <button id="notas-save-folder" onClick={saveFolder}>Guardar en Carpeta</button>
        </section>
        <section className="notas-folders">
          <h3>Carpetas</h3>
          {folders.map((folder, index) => (
            <div key={index} className="notas-folder">{folder.nombre_carpeta}</div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Notas;
