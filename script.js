document.addEventListener('DOMContentLoaded', () => {
  const addCardBtn = document.getElementById('addCardBtn');
  const cardsContainer = document.getElementById('cardsContainer');
  const cardTemplate = document.getElementById('cardTemplate');
  

  //guardar las tarjetas
  function saveCards() {
      const cards = [];
      cardsContainer.querySelectorAll('.card').forEach(card => {
          if (card.id !== 'cardTemplate') {
              const title = card.querySelector('.card-title').value;
              const tasks = [];
              card.querySelectorAll('.task-list li').forEach(li => {
                  tasks.push({
                      text: li.querySelector('span').textContent,
                      completed: li.classList.contains('completed')
                  });
              });
              cards.push({ title, tasks });
          }
      });
      localStorage.setItem('todoCards', JSON.stringify(cards));
  }

  function deleteAllCards() {
    //confirmación ANTES DE BORRAR
    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar todas las listas?');
    
    if (confirmDelete) {
        // Eliminar todas las tarjetas del DOM 
        const cards = cardsContainer.querySelectorAll('.card');
        cards.forEach(card => {
            if (card.id !== 'cardTemplate') {
                card.remove();
            }
        });
        
        // Limpiar el localStorage
        localStorage.removeItem('todoCards');
    }
}

//evento para botoneliminar
deleteCardBtn.addEventListener('click', deleteAllCards);


  //crear una tarea
  function createTask(taskList, taskText, completed = false) {
      const taskItem = document.createElement('li');
      taskItem.classList.add('list-group-item');
      if (completed) {
          taskItem.classList.add('completed');
      }

      const textSpan = document.createElement('span');
      textSpan.textContent = taskText;
      taskItem.appendChild(textSpan);

      //btn eliminar
      const deleteBtn = document.createElement('button');
      //deleteBtn.textContent = 'fd';
      deleteBtn.classList.add('btn', 'btn-danger', 'btn-sm', 'ms-2');
      deleteBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
        </svg>`;

    // Ajustar el estilo del botón
    deleteBtn.style.padding = '4px 8px'; 
    deleteBtn.style.lineHeight = '1'; 


      deleteBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          taskItem.remove();
          saveCards();
      });

      taskItem.addEventListener('click', () => {
          taskItem.classList.toggle('completed');
          saveCards();
      });

      taskItem.appendChild(deleteBtn);
      taskList.appendChild(taskItem);
  }

  //coonfigurar una nueva tarjeta
  function setupCard(card, title = '') {
      const taskInput = card.querySelector('.task-input');
      const addTaskBtn = card.querySelector('.add-task-btn');
      const taskList = card.querySelector('.task-list');
      const titleInput = card.querySelector('.card-title');

      titleInput.value = title;
      titleInput.addEventListener('change', saveCards);

      addTaskBtn.addEventListener('click', () => {
          const taskText = taskInput.value.trim();
          if (taskText) {
              createTask(taskList, taskText);
              taskInput.value = '';
              saveCards();
          }
      });

      taskInput.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') {
              addTaskBtn.click();
          }
      });
  }

  //cargar las tarjetas guardadas
  function loadCards() {
      const savedCards = localStorage.getItem('todoCards');
      if (savedCards) {
          const cards = JSON.parse(savedCards);
          cards.forEach(cardData => {
              const newCard = cardTemplate.cloneNode(true);
              newCard.removeAttribute('id');
              newCard.style.display = 'block';
              
              setupCard(newCard, cardData.title);
              
              cardData.tasks.forEach(task => {
                  createTask(
                      newCard.querySelector('.task-list'),
                      task.text,
                      task.completed
                  );
              });

              cardsContainer.appendChild(newCard);
          });
      }
  }

  // Evento para añadir nueva card
  addCardBtn.addEventListener('click', () => {
      const newCard = cardTemplate.cloneNode(true);
      newCard.removeAttribute('id');
      newCard.style.display = 'block';
      setupCard(newCard);
      cardsContainer.appendChild(newCard);
      saveCards();
  });

  //cargar las tarjetas al iniciar
  loadCards();
});
