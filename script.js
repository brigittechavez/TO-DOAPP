document.addEventListener('DOMContentLoaded', () => {
    const addCardBtn = document.getElementById('addCardBtn'); 
    const cardsContainer = document.getElementById('cardsContainer'); 
    const cardTemplate = document.getElementById('cardTemplate'); 
  
    // nueva card 
    addCardBtn.addEventListener('click', () => {
      
      const newCard = cardTemplate.cloneNode(true);
      newCard.style.display = 'block'; 
  
      // Añadr la card al contenedor
      cardsContainer.appendChild(newCard);

      const addTaskBtn = newCard.querySelector('.add-task-btn');
      const taskInput = newCard.querySelector('.task-input');
      const taskList = newCard.querySelector('.task-list');
  
      //agregar tarea a la card.
      addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
          const taskItem = document.createElement('li');
          taskItem.classList.add('list-group-item');
          taskItem.textContent = taskText;
  
          taskList.appendChild(taskItem);
  
          taskInput.value = '';
  
          //Para eliminar tarea
          const deleteBtn = document.createElement('button');
          deleteBtn.textContent = 'Eliminar';
          deleteBtn.classList.add('btn', 'btn-danger', 'btn-sm', 'ms-2');
          taskItem.appendChild(deleteBtn);
  
          deleteBtn.addEventListener('click', () => {
            taskItem.remove();
          });
  
          // tachar la tarea completada
          taskItem.addEventListener('click', () => {
            taskItem.classList.toggle('completed');
          });
        } else {
          alert('¡Por favor escribe una tarea!');
        }
      });
    });
  });
  