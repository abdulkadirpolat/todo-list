 const form  = document.querySelector('.form')  
 const todoInput = document.querySelector('.todo-add');   
 const listgroup = document.querySelector('.list-group');   
 const head = document.querySelector('.card-head');   
 const body = document.querySelector('.card-body');  
 const keyInput = document.querySelector('#key');    
  
 const clear = document.querySelector('#clear-todo');  
 
 
EventListener();

 function  EventListener(){
    form.addEventListener('submit',todovalue)
    document.addEventListener('DOMContentLoaded',loaded)
    body.addEventListener('click',delTodo)
    keyInput.addEventListener('keyup',keyvalue)
    clear.addEventListener('click',todosClear)
 }
 
function todosClear(e){
 if(confirm('Tüm todoları silmek istediğinize emin misiniz? ')){
   
 
  while(listgroup.firstElementChild  !=null){
   listgroup.removeChild(listgroup.firstElementChild);   
  }

  localStorage.removeItem('todos')
 }
   
} 

function keyvalue(e){
const filtervalue = e.target.value.toLowerCase(); 

const  listItem = document.querySelectorAll('.list-todo');

listItem.forEach(function(listI){

const text = listI.textContent.toLowerCase();
                
if(text.indexOf(filtervalue)=== -1){                  
listI.setAttribute('style','display : none  ');

}

else{

   listI.setAttribute('style','display : flex');
}

})
}

 function delTodo(e){
   if (e.target.className=== 'fas fa-trash-alt'){
     e.target.parentElement.parentElement.remove();
     deleteTodoStorage(e.target.parentElement.parentElement.textContent)
     showAlert('success','Başarıyla Silindi');
  
   }
   
   }
  
 function loaded (){
    let todos = stringStorage();
   todos.forEach(function(todo){
      newTodoUI(todo);
   })
 }

 function todovalue(e){
 
   const newTodo =  todoInput.value.trim();

  if(newTodo === ''){
  showAlert('danger','Lütfen Todo Giriniz...!')
  }

   else{

      showAlert('success','Tebrikler Todo Eklendi')
      newStorage(newTodo);
      newTodoUI(newTodo);
       
   }
 
 e.preventDefault();
 }
 
  
function deleteTodoStorage (deletetodo){
 let todos = stringStorage();

  todos.forEach(function(todo,index){
if(todo === deletetodo){                              
 todos.splice(index,1);
}
  });
  localStorage.setItem('todos',JSON.stringify(todos));
}

 
function stringStorage(){
   let todos;

   if(localStorage.getItem('todos')===null){
       todos=[];
      }
  
   else{
     todos=JSON.parse(localStorage.getItem('todos'));
  }
  return todos;
  
 }

function newStorage(newTodo){
 let todos = stringStorage();
todos.push(newTodo);
  localStorage.setItem('todos',JSON.stringify(todos));
 
}
 
 
 function showAlert(type,message){
   const alertTodo = document.createElement('div');
   
   alertTodo.className =  `alert alert-${type} `;
   alertTodo.textContent = message;
   head.appendChild(alertTodo);

   setTimeout(function(){
alertTodo.remove();
   },1000)

 }

 function newTodoUI(newTodo){
 
const listTodo= document.createElement('li');
const deleteTodo = document.createElement('a');
 
 listTodo.className ='list-todo';
 deleteTodo.href ='#';
 deleteTodo.className ='delete-todo';
 deleteTodo.innerHTML ='<i class="fas fa-trash-alt"></i>'
 listTodo.appendChild(document.createTextNode(newTodo))
 listTodo.appendChild(deleteTodo);
 listgroup.appendChild(listTodo);

 
 todoInput.value = '';

 }