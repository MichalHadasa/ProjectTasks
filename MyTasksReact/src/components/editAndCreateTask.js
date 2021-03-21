import { connect } from 'react-redux';
import React, { useState,useEffect } from 'react';

import {actions} from '../Store/actions'
import taskCrud from '../services/taskCrud';

function mapStateToProps(state) {
    return {
        user: state.userReducer.user

    };
}

const mapDispatchToProps = (dispatch) => ({
    // getTasksByUserId: (user_id) => dispatch(actions.getTasksByUserId(user_id)),
    add:(task)=>dispatch(actions.add(task)),
    // deleteTask:(task_id)=>dispatch(actions.deleteTask(task_id)),
    // updateTask:(task)=>dispatch(actions.updateTask(task)),
    // setTasks:(tasks)=>dispatch(actions.setTasks(tasks)),
    update:(task)=>dispatch(actions.update(task))
})

// e 1
export default connect(mapStateToProps, mapDispatchToProps)(function EditAndCreateTask(props) {
    const { user,newTask ,add,update} = props;
    const [title,setTitle]=useState("");
    const [completed,setcCompleted]=useState(false);
    const [flag,setFlag]=useState(false);
    const [flagSuccess,setFlagSuccess]=useState(false)
   
    useEffect(function() {
       if(newTask._id!==0){
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
         debugger
         if(flag){
            taskCrud.updateTask({  _id:newTask._id,userId:newTask.userId,title: title,completed:completed})
            .then((data)=>{
                update(data)
                setFlagSuccess(true);
            })
            .catch((err)=>{
                console.log(err)
            })
            // updateTask({  _id:newTask._id,userId:newTask.userId,title: title,completed:completed})

         }else{
            taskCrud.addTask({userId:user._id,title: title,completed:completed})
            .then((data)=>{
                add(data)
                setFlagSuccess(true);


            })
            .catch((err)=>{ console.log(err)})
            // addTask({userId:user._id,title: title,completed:completed})
         }
         

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
              {flagSuccess? <h1> saved successfuly</h1>:""}
        </>
    );
})

