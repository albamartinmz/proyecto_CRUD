// Declaración de una variable llamada 'todos' que es un array vacío.
let todos = [];

// Función para agregar una tarea a la lista.
function addTodo() {
  // Obtiene el valor del input con el id 'todoInput'.
    let inputValue = document.getElementById("todoInput").value;

  // Agrega un objeto a la lista 'todos' con propiedades 'nombre' e 'id'.
    todos.push({ nombre: inputValue, id: todos.length + 1 });

  // Limpia el valor del input.
    document.getElementById("todoInput").value = "";

  // Muestra las tareas actualizadas.
    showTodos();
}

// Función para mostrar las tareas en la interfaz.
function showTodos() {
  // Obtiene el elemento con el id 'todoList'.
    let list = document.getElementById("todoList");

  // Limpia el contenido de la lista.
    list.innerHTML = "";

  // Itera sobre todas las tareas en 'todos'.
    for (let i = 0; i < todos.length; i++) {
    // Obtiene la tarea actual.
    let todo = todos[i];

    // Crea un nuevo elemento 'div' para cada tarea.
    let div = document.createElement('div');
    div.classList.add('todo-item');

    // Crea un nuevo elemento 'li' para el nombre de la tarea.
    let li = document.createElement('li');
    li.textContent = todo.nombre;

    // Crea un nuevo elemento 'div' para los botones de modificar y borrar.
    let buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('buttons-div');

    // Crea un botón para modificar la tarea.
    let modifyButton = document.createElement('button');
    modifyButton.textContent = 'Modificar';
    modifyButton.classList.add('modify-button');
    // Añade un event listener para llamar a 'modifyTodoById' con el id de la tarea.
    modifyButton.addEventListener('click', function() {
        modifyTodoById(todo.id);
    });

    // Crea un botón para borrar la tarea.
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Borrar';
    deleteButton.classList.add('delete-button');
    // Añade un event listener para llamar a 'deleteTodoById' con el id de la tarea.
    deleteButton.addEventListener('click', function() {
        deleteTodoById(todo.id);
    });

    // Añade los botones al 'buttonsDiv'.
    buttonsDiv.appendChild(modifyButton);
    buttonsDiv.appendChild(deleteButton);

    // Añade el nombre de la tarea y los botones al 'div'.
    div.appendChild(li);
    div.appendChild(buttonsDiv);

    // Añade el 'div' a la lista.
    list.appendChild(div);
    }
}

// Función para modificar una tarea por su id.
function modifyTodoById(id) {
  // Pide al usuario que ingrese el nuevo nombre de la tarea.
    let newName = prompt("Ingresa el nuevo nombre para la tarea número: " + id);
    if (newName) {
    // Busca la tarea por su id y actualiza el nombre.
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id === id) {
        todos[i].nombre = newName;
        break;
        }
    }
    // Muestra las tareas actualizadas.
    showTodos();
    }
}

// Función para borrar una tarea por su id.
function deleteTodoById(id) {
  // Busca la tarea por su id y la borra del array 'todos'.
    for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
        todos.splice(i, 1);
        break;
        }
    }
  // Muestra las tareas actualizadas.
    showTodos();
}

// Añade un event listener al botón con el id 'addButton' para llamar a 'addTodo'.
document.getElementById('addButton').addEventListener('click', function(event) {
    event.preventDefault();
    addTodo();
});

// Al cargar la ventana, muestra las tareas.
window.onload = showTodos;
