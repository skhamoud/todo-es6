"use strict";

let todoList = {
    todos: [],
    addTodo (todotext) {
        this.todos.push({
            todoText : todotext ,
            completed : false
        });
        
    },
    changeTodo (index, newtext) {
        this.todos[index].todoText = newtext;
        
    },
    toggleCompleted (index) { 
        const thisTodo = this.todos[index];
        thisTodo.completed = !thisTodo.completed;
    },
    deleteTodo (index) {
        this.todos.splice(index, 1);
        
    },
    toggleAll() {
        let allCompleted = true;
        //if any todo is incomplete then allcompleted is false
        this.todos.forEach((todo)=>{
            if(!todo.completed){allCompleted = false;}
        });
        // If all completed make them all incomplete if else make them all complete
        this.todos.forEach((todo)=>{
            todo.completed = (allCompleted)?false:true;
        });
    },
    deleteAllCompleted() {
        this.todos = this.todos.filter(todo => !todo.completed);
        
    },
    populateStorage() {
        localStorage.clear();
        if(this.todos.length>0) localStorage.setItem("todos", JSON.stringify(this.todos));
    },
    retrieveTodos() {
        this.todos = JSON.parse(localStorage.getItem("todos")) || this.todos;
    }
};

// =============== Variables ===============
let todosUl = document.getElementById('todosUl'),
    toggleAllCheckbox = document.getElementById("toggleAllBtn"),
    todosLeftSpan = document.querySelector(".todos-left"),
    deleteAllBtn = document.querySelector(".delete-all");
    
//=====================================
let handlers = {
    addTodo() {
        const todoInputField = document.getElementById('addTodoInputField');
        if(todoInputField.value){
                todoList.addTodo(todoInputField.value);
                todoInputField.value = "";
        }
        view.displayTodos();
        todoList.populateStorage();
    },
    changeTodo(){
        const todoInputField = document.getElementById('changeTodoInputField');
        if (todoInputField.value){
            todoList.changeTodo(todoInputField.parentNode.id , todoInputField.value);
        }
        view.displayTodos();
        todoList.populateStorage();
    },
    deleteTodo(todoIndex) {
        todoList.deleteTodo(parseInt(todoIndex));
        view.displayTodos();
        todoList.populateStorage();
    },
    toggleCompleted(todoIndex) {
        todoList.toggleCompleted(parseInt(todoIndex));
        view.displayTodos();
        todoList.populateStorage();  
    },
    toggleAll () {
        todoList.toggleAll();
        view.displayTodos();
        todoList.populateStorage();
    },
    deleteAllCompleted() {
        todoList.deleteAllCompleted();
        view.displayTodos();
        todoList.populateStorage();
        toggleAllCheckbox.checked = false;
        deleteAllBtn.style.display = "none";
    }
};
//======================================================================
let view = {
    displayTodos() {
        const todos = todoList.todos;
        let allCompleted = true;
        let todosLeft = 0,todosDone = 0;
        if(todos.length===0){
            todosUl.innerHTML='';
        }else{
            todosUl.innerHTML = '';
            todos.forEach((todo , index)=> { 
                const todoTextNode = document.createTextNode(todo.todoText);
                const todoLi = document.createElement("li");
                let completeSatusCheck = "";
                todoLi.id = index ;
                todoLi.className = 'todo';
                // check completed property and add completed class 
                // if one is incomplete the allcompleted is false
                if(todo.completed){
                    todoLi.className += " completed";
                    completeSatusCheck = true;
                    todosDone++;
                } else {
                    allCompleted = false;
                    todosLeft++;
                } 
                todoLi.appendChild(this.appendElmts.toggleCompletedBtn(todoLi.id, completeSatusCheck));
                todoLi.appendChild(todoTextNode) ;
                todoLi.appendChild(this.appendElmts.deleteBtns());
                todosUl.appendChild(todoLi);
            });
            toggleAllCheckbox.checked = (allCompleted);
            deleteAllBtn.style.display = (todosDone>0)? "block":"none";
            todosLeftSpan.textContent = todosLeft > 0 ? `${todosLeft} left.` : "";
        }
    },
    appendElmts : {
        deleteBtns () {
            let deleteButton = document.createElement('button');
            deleteButton.className = "delete-btn";
            deleteButton.title = "Delete";
            return deleteButton ;
        },
        toggleCompletedBtn(todoIndex, checkedStatus) {
            const toggleDiv = document.createElement('div');
            const toggleBtn = document.createElement('input');
            const toggleBtnLabel = document.createElement('label');
            toggleDiv.className = "toggle-completed";
            toggleDiv.title = "Tick Completed";
            toggleBtn.className = "toggle-checkbox";
            toggleBtn.type = "checkbox";
            toggleBtn.checked = checkedStatus;
            toggleBtn.id = `toggleTodo${todoIndex}`;
            toggleBtnLabel.htmlFor = toggleBtn.id;
            toggleDiv.appendChild(toggleBtn);
            toggleDiv.appendChild(toggleBtnLabel);
            return toggleDiv ;
        },
        changeTodoField() {
            const inputField = document.createElement('input');
            inputField.type = "text";
            inputField.className = "text-field";
            inputField.id = "changeTodoInputField";
            return inputField;
        }
    },
    setupListeners() {
        const wrapper = document.getElementById('wrapper');
        const textInput = document.querySelectorAll('.text-field');
        // do relevent task, addTodo or changeTodo when Enter is pressed
        wrapper.addEventListener('keypress', function(event){
            const targetField = event.target; 
            if(targetField.className === "text-field"  && event.key=='Enter'){
                if(targetField.id==='addTodoInputField'){handlers.addTodo();}
                else if(targetField.id==='changeTodoInputField'){handlers.changeTodo();}
            }
        });
        // Leave input field When Escape key is pressed or it loses focus
        wrapper.addEventListener('keyup', (event) =>{ 
            if(event.target.className === "text-field"  && event.key == "Escape" ){this.displayTodos();}
        });
        wrapper.addEventListener('blur', (event) => {
            if (event.target.className === "text-field") { this.displayTodos();}
        }, true);
        
        // delete todo when relevant button is pressed
        todosUl.addEventListener('click', (event)=>{
            const clickedButton = event.target;
            const todoIndex = clickedButton.parentNode.id;
            if(clickedButton.className ==="delete-btn"){
                handlers.deleteTodo(todoIndex);
            }
        });
        // toggle completed todos or all todos 
        wrapper.addEventListener('change', (event) => {
            const clickedButton = event.target;
            const todoIndex = clickedButton.parentNode.parentNode.id;
            if (clickedButton.id === "toggleAllBtn") {
                handlers.toggleAll();
            } else if (clickedButton.className === "toggle-checkbox") {
                handlers.toggleCompleted(todoIndex);
            }
        });
        // create inputField to change todo
        todosUl.addEventListener('dblclick' , (event)=>{
            const clickedfield = event.target;
            if (clickedfield.className === 'todo') {
                const inputField = this.appendElmts.changeTodoField();
                // grabs only the textContent of textNode which is second after 
                // toggle complete input ; (Will need some refractoring)
                const currentText = clickedfield.childNodes[1].textContent;
                inputField.value = currentText;
                clickedfield.innerHTML = "";
                clickedfield.appendChild(inputField).focus();
            }
        });
    }
};
function setup() {
    todoList.retrieveTodos();
    view.setupListeners();
    view.displayTodos();
}
setup();
//TODO
// store details with the text of todo