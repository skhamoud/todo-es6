
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
        // debugger;
        let todoInput = document.querySelector('#todoInput');
        if(todoInput.value){
                todoList.addTodo(todoInput.value);
                todoInput.value = "";
        }
        view.displayTodos();
    },
    changeTodo(todoIndex, newText){
        todoList.changeTodo(todoIndex, newText);
        view.displayTodos();
    },
    deleteTodo(todoIndex) {
      todoList.deleteTodo(parseInt(todoIndex));
    //   todoNum.value = "";
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
            let thisTodoText;
            // show text of all todos and status 
            todosUl.innerHTML='My todos : ';
            todos.forEach((todo , index)=> { 
                let todoTextNode = document.createTextNode(todo.todoText);
                let todoLi = document.createElement("li");
                todoLi.id = index ;
                todoLi.appendChild(this.appendElmts.toggleBtns());
                // check completed property and change status 
                if(todo.completed===true){
                    let strikeThrough = document.createElement('strike');
                    strikeThrough.appendChild(todoTextNode);
                    todoLi.appendChild(strikeThrough);
                }else{
                    todoLi.appendChild(todoTextNode) ;
                }
                todoLi.className = 'todo';
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
        }
    },
    setupListeners: {
        init () {
            this.Listen();
            todoInput.addEventListener('keypress', function(e){
                if(e.which==13){
                    handlers.addTodo();
                } // or use e.keyCode or e.charCode == 13
            });
        },
        Listen () {
            todosUl.addEventListener('click', (event)=>{
                let clickedButton = event.target;
                const todoToDeleteIndex = clickedButton.parentNode.id;
                if(clickedButton.className ==="delete-btn"){
                    
                    handlers.deleteTodo(todoToDeleteIndex);
                } else if(clickedButton.className==="toggle-completed"){
                    handlers.toggleCompleted(todoToDeleteIndex);
                }
            });
        }
    }
};
view.setupListeners.init();

//TODO
// Change todo on double click
// Delete todo
// Delete All completed
//
//** Problem within the loop running with eventlisteners