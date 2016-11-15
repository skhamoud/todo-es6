var todoList = {
    todos : [],
    displayTodos : function () {
        var todo = this.todos; // particular todo object of the array
        // check if todos array is empty 
        if(todo.length==0){
            console.log('You have no todos !');
            todosUl.innerHTML='You have no todos !';
        //if not display list and status
        }else{
            // show text of all todos and status 
            var status;
            console.log("My todos :");
            todosUl.innerHTML='My todos : ';
            for (var i = 0; i < this.todos.length; i++){
                if(todo[i].completed===true){status = "(X)";}// for console change status
                else{status = "( )";}
                var thisTodoText = todo[i].todoText ; 
                // console.log(thisTodoText,  status);
                // debugger;
                var showTodo = function(todoText){ 
                    // debugger
                    // create and append a li to todosUl ul
                    var aTodo = document.createElement("li"); 
                    // check completed property and change status 
                    if(todo[i].completed===true){
                        // add strike tag
                        var strikeThrough = document.createElement('strike');
                        strikeThrough.innerHTML = todoText;
                        aTodo.appendChild(strikeThrough);
                    }else{aTodo.innerHTML = todoText;}
                    aTodo.className = 'todo';
                    todosUl.appendChild(aTodo);
                }
                showTodo(thisTodoText);
            }
        }
    },
    addTodo : function(todotext){
        this.todos.push({
            todoText : todotext ,
            completed : false
        });
        
        this.displayTodos();
    },
    changeTodo : function(index, newtext){
        this.todos[index].todoText = newtext;
        this.displayTodos();
    },
    toggleCompleted : function(index){ 
        var thisTodo = this.todos[index];
        thisTodo.completed = !thisTodo.completed;
        this.displayTodos();
    },
    deleteTodo : function(index){
        this.todos.splice(index, 1) ;
        this.displayTodos();
    },
    //toggle All incomplete if all complete
    // toglle complete if else
    toggleAll : function(){
        var allCompleted = true;
        //if any todo is incomplete then all completed is false
        for(var i = 0 ; i<this.todos.length ;i++){
            if(!this.todos[i].completed){
                allCompleted = false;
            }
        }
            var i = 0;
            while(i<this.todos.length){
                if(allCompleted) {
                 this.todos[i].completed = false;
                }else{
                    this.todos[i].completed = true;
                }
                i++;
            }
            this.displayTodos();
        
    }
};

// html elements collecting
var 
todosUl = document.getElementById('todosUl'),
// todos = document.getElementsByClassName('todo'),
todoInput= document.getElementById('todoText'),
todoNum = document.getElementById('todoNum'),
newTodoText = document.getElementById('newTodoText');

var handlers = {
    
    addTodo: function(){
        debugger;
        if(todoInput.value){
            todoList.addTodo(todoInput.value);
            todoInput.value = "";
        }
    },
    displayTodos: function(){
        todoList.displayTodos();
    },
    changeTodo: function(){
        todoList.changeTodo(todoNum.valueAsNumber -1 , newTodoText.value);
        todoNum.value = "";         newTodoText.value = "";
    },
    deleteTodo : function(){
      todoList.deleteTodo(todoNum.valueAsNumber-1);
      todoNum.value = "";
    },
    toggleCompleted : function(){
      todoList.toggleCompleted(todoNum.valueAsNumber -1);  
    },
    toggleAll : function(){
        todoList.toggleAll();
    }
};

//TODO
// Add todo on keypress of Enter
// Change todo on double click
// Delete todo