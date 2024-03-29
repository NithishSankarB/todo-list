import {useState,useEffect} from 'react';
const  API_BASE="http://localhost:3001";
function App() {
  const [todos,setTodos]=useState([]);
  const[popupActive,setPopupActive]=useState(false);
  const [newTodo,setNewTodo]=useState("");
  useEffect(()=>{
      GetTodos();
      // console.log(todos);
  },[])
  const GetTodos=()=>{
    fetch(API_BASE +'/todos')
    .then(res=>res.json())
    .then(data=>setTodos(data))
    .catch(err=>console.error("Error: ",err));
  }
  const completeTodo=async id=>{
    const data=await fetch(API_BASE +'/todo/complete/'+id)
    .then(res=>res.json());
    setTodos(todos=>todos.map(todo=>{
      if(todo._id===data._id){
        todo.complete=data.complete;
      }
      return todo;
    }));
  }
  const deleteTodo=async id=>{
    try{
    const data=await fetch(API_BASE +'/todo/delete/'+id,{method:'DELETE'}).then(res=>res.json());
    setTodos(todos=>todos.filter(todo=>todo._id !==data.remove_id));
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
  }
  const addTodo=async()=>{
    try{
    const data=await fetch(API_BASE+"/todo/new",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify({text:newTodo})
  }).then(res=>res.json());
  setTodos([...todos,data]);
  setPopupActive(false);
  setNewTodo("");
} catch (error) {
  console.error("Error addtodo:", error);
}
  }
  return (
    <div className="App">
      <h1>Welcome,Gentleman</h1>
      <h4>Events to do</h4>
      <div className="todos">
        {todos.length>0 ? todos.map(todo=>(
        <div className={"todo "+(todo.complete?" is-complete":"")
        } key={todo._id} onClick={()=>completeTodo(todo._id)}>
          <div className="checkbox"></div>
            <div className="text">
              {todo.text}
            </div>
            <div className="delete-todo" onClick={()=>deleteTodo(todo._id)}>X</div>
          </div>
          

        )):(<p>Currently have no tasks</p>
        )}
        
        </div>
        <div className ="addPopup" onClick={()=>setPopupActive(true)}>+</div>
        {popupActive?(
          <div className="popup">
            <div clasName="closePopup" onClick={()=>setPopupActive(false)}>X</div>
            <div className="content">
              <h3>Add Task</h3>
              
              <input type="text" className="add-todo-input" onChange={e=>setNewTodo(e.target.value)}value={newTodo}/>
              <div className="button" onClick={addTodo}>Create Task</div>

            </div>

          </div>
        ):''}
    </div>
  );
}

export default App;
