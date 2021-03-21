
import {actions} from '../Store/actions'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import {
 
  Link

} from "react-router-dom";

import './tasks.css';
import taskCrud from '../services/taskCrud';
function mapStateToProps(state) {
    return {
        user: state.userReducer.user,
        tasks:state.tasksReducer.Tasks
    };
}

const mapDispatchToProps = (dispatch) => ({
    addTask:(task)=>dispatch(actions.addTask(task)),
    deleteTask:(task)=>dispatch(actions.deleteTask(task)),
    add:(task)=>dispatch(actions.add(task)),
})


export default connect(mapStateToProps,mapDispatchToProps)(function Drinks(props) {
  // debugger
    
  //     const [tasks, setTasks] = useState([])
  const [tasksList,setTasksList]=useState([]);

  const [selectedTask, setSelectedTask] = useState([]);
  const{user,add,deleteTask,tasks}=props
      
  
      useEffect(() => {
        debugger;
        axios.get(`https://jsonplaceholder.typicode.com/todos`)
              .then(res => {
                  console.log(res.data)
                  debugger
                  setTasksList(res.data)
                  
                  console.log(res.data) 
              }).catch(err => {
                alert("Sorry there is a problem on our site try later")
              })
      }, [])
  
    
    
    function selectTask(e,index) {
        debugger;
        const checked = e.target.checked;
        const item = tasksList[index];
        let task= {
          userId:user._id,
          title:tasksList[index].title ,
          completed:tasksList[index].completed
        }
        if (checked) {
          setSelectedTask(items => items.concat([item]));
          taskCrud.addTask(task)
            .then((data)=>{
                add(data)
                // setSelectedTask(items => items.concat([item]));
            })
            .catch((err)=>{ alert("Sorry there is a problem on our site try later")})
        
            //  addTask(task)
             debugger;
          
        } else {
          if(selectedTask.includes(item)){
            let task= tasks.filter(x => x.title === item.title && x.completed===item.completed)[0];
            taskCrud.deleteTask(task._id)
      .then((data)=>{
        setSelectedTask(items => items.filter(x => x !== item));
        deleteTask(task._id)
      }).catch((err)=>{alert("Sorry there is a problem on our site try later")}) 
            
          }
        }
        debugger;
      }
 



    return (
        <>
        <h3>You can add tasks from the list!</h3>
          
       
        {/* {tasksList.map((item, index) => (
          <li key={index} style={{ direction: "rtl" }}>
            <label>
              {item.title}
              {item.completed}
              <input
                type="checkbox"
                onChange={(e)=>selectTask(e,index)}
                checked={selectedTask.includes(item)}
              />
            </label>
          </li>
        ))}
      </ul> */}



<div className="table-responsive" id="sailorTableArea">
    <table id="sailorTable" className="table table-striped table-bordered" width="100%">
 
        <thead>
            <tr>
                <th>title</th>
                <th>completed</th>
                <th>check me </th>
                
            </tr>
        </thead>
        <tbody>
      
            {tasksList.map((item, index) => (
          <tr key={index} style={{ direction: "rtl" }}>
            {/* <label> */}
            
           
             <td> 
               <input
                type="checkbox"
                onChange={(e)=>selectTask(e,index)}
                checked={selectedTask.includes(item)}
              /></td>
             
                 <td> {item.completed?<p>V</p>:<p>X</p>}</td>
                <td>{item.title}</td>
            {/* </label> */}
            </tr>
        ))}
        
          
       
        </tbody>
    </table>
    </div>
    <Link to="/UserTasks"><h4>to my tasks</h4></Link>
         
   
       </>
    );
})
