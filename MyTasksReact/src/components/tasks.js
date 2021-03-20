
import {actions} from '../Store/actions'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import {
 
  Link

} from "react-router-dom";



function mapStateToProps(state) {
    return {
        user: state.userReducer.user
     
    };
}

const mapDispatchToProps = (dispatch) => ({
    addTask:(task)=>dispatch(actions.addTask(task)),
    deleteTask:(task)=>dispatch(actions.deleteTask(task))
})


export default connect(mapStateToProps,mapDispatchToProps)(function Drinks(props) {
  // debugger
    
  //     const [tasks, setTasks] = useState([])
  const [tasksList,setTasksList]=useState([]);

  const [selectedTask, setSelectedTask] = useState([]);
  const{user,addTask,deleteTask}=props
      
  
      useEffect(() => {
        debugger;
        axios.get(`https://jsonplaceholder.typicode.com/todos`)
              .then(res => {
                  console.log(res.data)
                  debugger
                  setTasksList(res.data)
                  
                  console.log(res.data) 
              }).catch(err => {
                  alert(err)
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
        
             addTask(task)
             debugger;
            setSelectedTask(items => items.concat([item]));
        } else {
          if(selectedTask.includes(item)){
            setSelectedTask(items => items.filter(x => x !== item));
            deleteTask(task)
          }
        }
        debugger;
      }
 



    return (
        <>
            <Link to="/UserTasks">to my tasks</Link>
        <ul>
        {tasksList.map((item, index) => (
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
      </ul>

         

           {/* {tasksList?
           <ul >
        {tasksList.map(item => (
          <li key={item.id} style={{ direction: "rtl" }}>
            <label>
              {item}
              <input
                type="checkbox"
                onChange={selectTask}
                checked={selectedTask.includes(item)}
              />
            </label>
          </li>
        ))}
      </ul>:""} */}
   
        // </>
    );
})
