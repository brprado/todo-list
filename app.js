//Seleção de DOM
const todoInput = document.querySelector(".todo-input"); //seleciona id, tag ou classe
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todos");

console.log(todoInput);
console.log(todoButton);
console.log(todoList);

//Eventos de escutas
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteAndCheck);
filterOption.addEventListener("click", filterTodo);
//Funções
function addTodo(event) {
  event.preventDefault(); //previne que ele recarregue a página
  const todoDiv = document.createElement("div"); //responsável por criar um elemento HTML
  todoDiv.classList.add("todo"); //atribuindo uma classe

  const todoLi = document.createElement("li");
  todoLi.classList.add("todo-list");
  todoLi.innerText = todoInput.value;
  todoInput.value = "";

  todoDiv.appendChild(todoLi); //adicionando a li à minha div (junte o filho ao pai)

  const completedButton = document.createElement("button"); //criando botao de tarefa completa
  completedButton.innerHTML = '<i class="fa-solid fa-check"></i>'; //icone do botão
  completedButton.classList.add("completed-btn");
  todoDiv.appendChild(completedButton);

  

  const trashButton = document.createElement("button"); //criando botao de apagar o elemento
  trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  todoList.appendChild(todoDiv);
}

//função delete

function deleteAndCheck(event) {
  console.log(event.target); //mostra onde o elemento que o usuário clicou
  const item = event.target;

  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement; //todo = pai por completo
    todo.classList.add("fall"); //evento
    todo.addEventListener("transitionend", () => {
      todo.remove(); //remove quando for escutado
    });
  }

  /*o event listener funciona como um vigia
  ele irá esperar o evento ser executado para
  executar a função determinada como parâmetro.
  a classe fall do css já está funcionando como transição,
  por isso ele já reconhece*/

  if (item.classList[0] === "completed-btn") {
    const todo = item.parentElement;
    const task = todo.textContent; //pegando o conteudo textual do nosso elemento
    todo.classList.toggle("completed"); //classe estilizada lá no meu CSS
  }
}

function filterTodo(event) {
  const todos = todoList.childNodes; //retorna a coleção de filhos (nesse caso, as li's) em forma de array
  todos.forEach((todo) => {
    switch (event.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          //verifica se a div contem a classe
          todo.style.display = "flex"; //visivel
        } else {
          todo.style.display = "none"; //invisível
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}


