// Método GET R (read) del CRUD para obtener series.
async function getSeries() {
  const result = await fetch("http://localhost:3000/series");
  const data = await result.json();
  return data;
}

// Método DELETE D (delete) del CRUD para eliminar una serie.
async function deleteSeriesById(element) {
  try {
      // Obtenemos el ID de la serie desde el atributo data-id del botón.
      const id = element.getAttribute("data-id");

      const result = await fetch(`http://localhost:3000/series/${id}`, {
          method: "DELETE"
      });

      if (result.ok) {
          // Actualizamos la interfaz después de eliminar la serie.
          showSeries();
      } else {
          console.error(`No se encontró la serie con ID ${id}`);
      }

      return result;
  } catch (error) {
      console.error('Error:', error);
  }
}

// Método POST C (create) del CRUD para agregar una nueva serie.
async function addSeries(name, genre, seasons) {
  const newSerie = {
      "name": name,
      "genre": genre,
      "seasons": seasons
  };

  const options = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(newSerie),
  };

  const result = await fetch(`http://localhost:3000/series`, options);
  // Actualizamos la interfaz después de agregar la serie.
  showSeries();
  return result;
}

// Método PUT U (update) del CRUD para modificar una serie por su id.
async function modifySeriesById(id) {
  let newName = prompt("Ingresa el nuevo nombre para la serie número " + id);
  if (newName) {
      const result = await fetch(`http://localhost:3000/series/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: newName }),
      });
      // Actualizamos la interfaz después de modificar la serie.
      showSeries();
      return result;
  }
}

// Método GET R (read) del CRUD para mostrar series.
async function showSeries() {
  let series = await getSeries();
  seriesList.innerHTML = ""; // Limpiamos el contenido anterior.

  series.map(serie => {
      seriesList.innerHTML += `
          <li>${serie.name} - ${serie.genre} (${serie.seasons} seasons)
              <div class="buttons-div">
                  <button class="modify-button" onclick="modifySeriesById(${serie.id})">Editar</button>
                  <button class="delete-button" onclick="deleteSeriesById(this)" data-id="${serie.id}">Eliminar</button>
              </div>
          </li>
      `;
  });
}

// Manejador de eventos para el formulario de agregar serie.
document.getElementById('addButton').addEventListener('click', function(event) {
  event.preventDefault(); // Evita que el formulario se envíe automáticamente.
  addSeriesFromForm();
});

function addSeriesFromForm() {
  let name = document.getElementById("seriesInput").value;
  let genre = document.getElementById("genreInput").value;
  let seasons = document.getElementById("seasonsInput").value;

  if (name && genre && seasons) {
      addSeries(name, genre, seasons);
      document.getElementById("seriesInput").value = "";
      document.getElementById("genreInput").value = "";
      document.getElementById("seasonsInput").value = "";
  } else {
      alert("Por favor, completa todos los campos.");
  }
}

// Al cargar la ventana, obtenemos y mostramos las series.
window.onload = showSeries;

