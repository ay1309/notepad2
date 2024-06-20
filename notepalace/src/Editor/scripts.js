document.addEventListener('DOMContentLoaded', function() {
    const quill = new quill('#editor', {
        placeholder: 'Compose an epic...',
        theme: 'snow',
    });

    document.addEventListener('click', function(event) {
        var menu = document.getElementById('menu');
        var menuIcon = document.querySelector('.menu-icon');
        if (!menu.contains(event.target) && !menuIcon.contains(event.target)) {
            menu.style.display = 'none';
        }
    });

    window.savePending = function() {
        var noteContent = quill.root.innerHTML;
        alert('Nota guardada en Tareas Pendientes: ' + noteContent);
        // lógica para guardar la nota en la base de datos o local storage
    }

    window.saveFolder = function() {
        var noteContent = quill.root.innerHTML;
        var folder = prompt('Ingrese el nombre de la carpeta para guardar la nota:', 'Carpeta predeterminada');
        if (folder) {
            alert('Nota guardada en ' + folder + ': ' + noteContent);
            // lógica para guardar la nota en la carpeta especificada en la base de datos o local storage
        }
    }
});

function toggleMenu() {
    var menu = document.getElementById('menu');
    if (menu.style.display === "none" || menu.style.display === "") {
        menu.style.display = "block";
    } else {
        menu.style.display = "none";
    }
}

function createNote() {
    alert('Nueva nota creada');
}
