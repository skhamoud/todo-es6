var todoList = {
    todos : [],
    addTodo : function(todotext){
        this.todos.push({
            todoText : todotext ,
            completed : false
        });
        
        
    },
    changeTodo : function(index, newtext){
        this.todos[index].todoText = newtext;
        
    },
    toggleCompleted : function(index){ 
        var thisTodo = this.todos[index];
        thisTodo.completed = !thisTodo.completed;
        
    },
    deleteTodo : function(index){
        this.todos.splice(index, 1) ;
        
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
            
        
    }
};

// html elements collecting
var todos = todoList.todos,
        todosUl = document.getElementById('todosUl'),
        todoInput= document.getElementById('todoText'),
        todoNum = document.getElementById('todoNum'),
        newTodoText = document.getElementById('newTodoText');


var view = {
    displayTodos : function () {
        
        if(todos.length===0){
            todosUl.innerHTML='You have no todos !';
        //if not display list and status
        }else{
            // show text of all todos and status 
            todosUl.innerHTML='My todos : ';
            for (var i = 0; i < todos.length; i++){
                var thisTodoText = todos[i].todoText ;
                var showTodo = function (todoText){
                    // create and append a li to todosUl ul
                    var aTodo = document.createElement("li"); 
                    // check completed property and change status 
                    if(todos[i].completed===true){
                        // add strike tag
                        var strikeThrough = document.createElement('strike');
                        strikeThrough.innerHTML = todoText;
                        aTodo.appendChild(strikeThrough);
                    }else{aTodo.innerHTML = todoText;}
                    aTodo.className = 'todo';
                    todosUl.appendChild(aTodo);
                };
                showTodo(thisTodoText);
            }
        }
    }
};
todoInput.addEventListener('keypress', function(e){
    if(e.which==13){handlers.addTodo();} // or use e.keyCode or e.charCode == 13
});
var handlers = {
    addTodo: function(){
        // debugger;
        if(todoInput.value){
                todoList.addTodo(todoInput.value);
                todoInput.value = "";
        }
        view.displayTodos();
    },
    changeTodo: function(){
        todoList.changeTodo(todoNum.valueAsNumber -1 , newTodoText.value);
        todoNum.value = "";         newTodoText.value = "";
        view.displayTodos();
    },
    deleteTodo : function(){
      todoList.deleteTodo(todoNum.valueAsNumber-1);
      todoNum.value = "";
      view.displayTodos();
    },
    toggleCompleted : function(){
      todoList.toggleCompleted(todoNum.valueAsNumber -1);
      view.displayTodos();  
    },
    toggleAll : function(){
        todoList.toggleAll();
        view.displayTodos();
    }
};

//TODO
// Add todo on keypress of Enter
// Change todo on double click
// Delete todo
// Delete All completed