import { connect } from 'react-redux';
import React, { useState,useEffect } from 'react';

import {actions} from '../Store/actions'


function mapStateToProps(state) {
    return {
        user: state.userReducer.user

    };
}

const mapDispatchToProps = (dispatch) => ({
    getTasksByUserId: (user_id) => dispatch(actions.getTasksByUserId(user_id)),
    addTask:(task)=>dispatch(actions.addTask(task)),
    deleteTask:(task_id)=>dispatch(actions.deleteTask(task_id)),
    updateTask:(task)=>dispatch(actions.updateTask(task)),
    setTasks:(tasks)=>dispatch(actions.setTasks(tasks))
})

// e 1
export default connect(mapStateToProps, mapDispatchToProps)(function EditAndCreateTask(props) {
    const { user,newTask ,addTask,updateTask} = props;
    const [title,setTitle]=useState("");
    const [completed,setcCompleted]=useState(false);
    const [flag,setFlag]=useState(false);
    useEffect(function() {
       if(newTask._id!=0){
        setTitle(newTask.title);
        setFlag(true);
        setcCompleted(newTask.completed);
       }
      }, []);
      function selectItemMy(e) {
        debugger;
        const checked = e.target.checked;
        if (checked) {
            setcCompleted(true);
        } else {
            setcCompleted(false);
        }
      }
      
     function saveTask(){
         if(flag){
            updateTask({  _id:newTask._id,userId:newTask.userId,title: title,completed:completed})

         }else
          addTask({userId:user._id,title: title,completed:completed})

      }

    return (
        <>
           <label>title</label>
           <input type="text" value={title}  onChange={(e)=>setTitle(e.target.value)}></input>
           <label>completed</label>
           <input
                type="checkbox"
                onChange={selectItemMy}
                checked={completed}
              />
              <button onClick={saveTask}>save</button>
               
        </>
    );
})

