import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../css/Editor.css'; // Asegúrate de tener tu CSS en esta ruta

const Editor = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [taskList, setTaskList] = useState([
    'Terminar reporte',
    'Leer capítulo 5',
    'Comprar ingredientes para cena'
  ]);
  const quillRef = useRef(null);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const savePending = () => {
    const noteContent = quillRef.current.getEditor().root.innerHTML;
    alert('Nota guardada en Tareas Pendientes: ' + noteContent);
    // Aquí agregarías la lógica para guardar la nota en la base de datos o local storage
  };

  const saveFolder = () => {
    const noteContent = quillRef.current.getEditor().root.innerHTML;
    const folder = prompt('Ingrese el nombre de la carpeta para guardar la nota:', 'Carpeta predeterminada');
    if (folder) {
      alert('Nota guardada en ' + folder + ': ' + noteContent);
      // Aquí agregarías la lógica para guardar la nota en la carpeta especificada en la base de datos o local storage
    }
  };

  return (
    <div className="container">
      <header>
        <div className="menu-icon" onClick={toggleMenu}>&#9776;</div>
        <h1>NOTEPalace</h1>
      </header>
      {menuVisible && (
        <div id="menu" className="dropdown-menu">
          <ul>
            <li onClick={() => alert('Nueva nota creada')}>Crear nota</li>
            <li>Configuración</li>
            <li>Cerrar sesión</li>
            <li>Subir archivo</li>
          </ul>
        </div>
      )}
      <main>
        <section className="user-space">
          <h2>Charlotte's space</h2>
          <h3>Tareas pendientes</h3>
          <ul id="task-list">
            {taskList.map((task, index) => (
              <li key={index}>{task}</li>
            ))}
          </ul>
        </section>
        <section className="notes">
          <h3>Notas</h3>
          <ReactQuill ref={quillRef} placeholder="Compose an epic..." theme="snow" />
          <button id="save-pending" onClick={savePending}>Guardar en Tareas Pendientes</button>
          <button id="save-folder" onClick={saveFolder}>Guardar en Carpeta</button>
        </section>
        <section className="folders">
          <h3>Carpetas</h3>
          <div className="folder" id="home-folder">Casa</div>
          <div className="folder" id="school-folder">Escuela</div>
          <div className="folder" id="cooking-ideas-folder">Ideas cocina</div>
          <div className="folder" id="work-folder">Trabajo</div>
        </section>
      </main>
    </div>
  );
};

export default Editor;
