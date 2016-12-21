
let todoList = {
    todos : [],
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
        var thisTodo = this.todos[index];
        thisTodo.completed = !thisTodo.completed;
    },
    deleteTodo (index) {
        this.todos.splice(index, 1) ;
    },
    toggleAll() {
        var allCompleted = true;
        //if any todo is incomplete then allcompleted is false
        todos.forEach((todo)=>{
            if(!todo.completed){allCompleted = false;}
        });
        // If all completed make them all incomplete if else make them all complete
        todos.forEach((todo)=>{
            todo.completed = (allCompleted)?false:true;
        });    
    }
};

// =============== Variables ===============
let todos = todoList.todos,
    todosUl = document.getElementById('todosUl'),
    toggleAllCheckbox = document.getElementById("toggleAllBtn");
//=====================================
let handlers = {
    addTodo() {
        const todoInputField = document.getElementById('addTodoInputField');
        if(todoInputField.value){
                todoList.addTodo(todoInputField.value);
                todoInputField.value = "";
        }
        view.displayTodos();
    },
    changeTodo(){
        const todoInputField = document.getElementById('changeTodoInputField');
        if (todoInputField.value){
            todoList.changeTodo(todoInputField.parentNode.id , todoInputField.value);
        }
        view.displayTodos();
    },
    deleteTodo(todoIndex) {
        todoList.deleteTodo(parseInt(todoIndex));
        view.displayTodos();
    },
    toggleCompleted(todoIndex) {
        todoList.toggleCompleted(parseInt(todoIndex));
        view.displayTodos();  
    },
    toggleAll () {
        todoList.toggleAll();
        view.displayTodos();
    }
};
//======================================================================
let view = {
    displayTodos () {
        if(todos.length===0){
            todosUl.innerHTML='';
        }else{
            todosUl.innerHTML = '';
            let allCompleted = true;
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
                }else{allCompleted = false;} 
                todoLi.appendChild(this.appendElmts.toggleCompletedBtn(todoLi.id, completeSatusCheck));
                todoLi.appendChild(todoTextNode) ;
                todoLi.appendChild(this.appendElmts.deleteBtns());
                todosUl.appendChild(todoLi);
            });
            toggleAllCheckbox.checked = (allCompleted);
        }
    },
    appendElmts : {
        deleteBtns () {
            let deleteButton = document.createElement('button');
            deleteButton.className = "delete-btn";
            return deleteButton ;
        },
        toggleCompletedBtn(todoIndex, checkedStatus) {
            const toggleDiv = document.createElement('div');
            const toggleBtn = document.createElement('input');
            const toggleBtnLabel = document.createElement('label');
            toggleDiv.className = "toggle-completed";
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
            if(clickedfield.className ==='todo'){
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
view.setupListeners();

//TODO
// Delete All completed