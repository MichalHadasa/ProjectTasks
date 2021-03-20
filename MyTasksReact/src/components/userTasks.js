import React, { useState,useEffect } from 'react';
import EditAndCreateTask from './editAndCreateTask';
import { connect } from 'react-redux';
import axios from 'axios';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import {
 
  Link

} from "react-router-dom";
import {actions} from '../Store/actions'
import {
    Redirect
} from "react-router-dom";
import { func } from 'prop-types';


function mapStateToProps(state) {
    return {
        user: state.userReducer.user,
        tasks:state.tasksReducer.Tasks

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
export default connect(mapStateToProps, mapDispatchToProps)(function UserTasks(props) {
    const { tasks,user,getTasksByUserId,deleteTask } = props;
    const [newTask,setNewTask]=useState({_id: 0,userId:0,title: "",completed:false})
    const [flagNewTask,setFlagNewTask]=useState(false);
    const [show, setShow] = useState(false);
   function handleClose(){
    setShow(false);
    setFlagNewTask(false)
   }

    useEffect(function() {
      debugger
      getTasksByUserId(user._id);

      }, []);
      function addTask(){
        debugger
        setShow(true);
        setNewTask({_id: 0,userId:0,title: "",completed:false});
        setFlagNewTask(true);
      }
    function  deleteOneTask(e,index){
      debugger
      let taskToDelete=tasks[index];
      deleteTask(taskToDelete._id);
      }
      function editTask(e,index){
        debugger
        setShow(true);
        let taskToEdit=tasks[index];
        setNewTask(taskToEdit);
        setFlagNewTask(true);

      }

    return (
        <>
          
     {tasks.map((task, index) => (
       <Card border="primary" style={{ width: '18rem' }}  key={index}>
       <Card.Header>Task {index}</Card.Header>
       <Card.Body>
       { task.completed?  <Card.Title>task accomplished </Card.Title>:<Card.Title>Perform me </Card.Title>}
         <Card.Text>
         {task.title}
         </Card.Text>
         <Button variant="secondary" onClick={(e)=>deleteOneTask(e,index)}>delete me</Button>
         <Button variant="secondary"onClick={(e)=>editTask(e,index)}>edit me</Button>
       </Card.Body>
        </Card>

        ))}
      <Button variant="secondary"onClick={addTask}>add new task</Button>
     
   <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body> {flagNewTask? <EditAndCreateTask newTask={newTask} {...props}></EditAndCreateTask>:""}</Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Link to="/tasks">למשימות</Link>
        </>
    );
})

