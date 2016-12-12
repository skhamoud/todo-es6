
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
    todosUl = document.getElementById('todosUl');
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
            todosUl.innerHTML='You have no todos !';
        //if not display list and status
        }else{
            todosUl.innerHTML='My todos : ';
            todos.forEach((todo , index)=> { 
                const todoTextNode = document.createTextNode(todo.todoText);
                let todoLi = document.createElement("li");
                todoLi.id = index ;
                todoLi.className = 'todo';
                todoLi.appendChild(this.appendElmts.toggleBtns());
                // check completed property and add completed class 
                if(todo.completed===true){
                    todoLi.className += " completed" ;
                }
                todoLi.appendChild(todoTextNode) ;
                todoLi.appendChild(this.appendElmts.deleteBtns());
                todosUl.appendChild(todoLi);
             });
        }
    },
    appendElmts : {
        deleteBtns () {
            let deleteButton = document.createElement('button');
            deleteButton.innerHTML = "Delete";
            deleteButton.className = "delete-btn";
            return deleteButton ;
        },
        toggleBtns () {
            let toggleBtn = document.createElement('input');
            toggleBtn.type = "checkbox";
            toggleBtn.className = "toggle-completed";
            return toggleBtn ;
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
        let wrapper = document.getElementById('wrapper');
        // do relevent task, addTodo or changeTodo when Enter is pressed
        wrapper.addEventListener('keypress', function(event){
            const targetField = event.target; 
            if(targetField.className === "text-field"  && event.key=='Enter'){
                if(targetField.id==='addTodoInputField'){handlers.addTodo();}
                else if(targetField.id==='changeTodoInputField'){handlers.changeTodo();}
            }
        });
        // Leave input field When Escape key is pressed
        wrapper.addEventListener('keyup', (event) =>{ 
            const targetField = event.target;
            if(targetField.className === "text-field"  && event.key == "Escape" ){this.displayTodos();}
        });
        // delete todo or togglecomplete when relevant button is pressed
        todosUl.addEventListener('click', (event)=>{
            const clickedButton = event.target;
            const todoToDeleteIndex = clickedButton.parentNode.id;
            if(clickedButton.className ==="delete-btn"){
                handlers.deleteTodo(todoToDeleteIndex);
            } else if(clickedButton.className==="toggle-completed"){
                handlers.toggleCompleted(todoToDeleteIndex);
            }
        });
        // create inputField to change todo
        todosUl.addEventListener('dblclick' , (event)=>{
            const clickedfield = event.target;
            if(clickedfield.className ==='todo'){
                const inputField = this.appendElmts.changeTodoField();
                // grabs only the textContent of textNode which is second after 
                // toggle complete input ;
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