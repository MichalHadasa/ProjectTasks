import React, { useState,useEffect } from 'react';
import EditAndCreateTask from './editAndCreateTask';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import {
 
  Link

} from "react-router-dom";
import {actions} from '../Store/actions'
import taskCrud from '../services/taskCrud';
// import {
//     Redirect
// } from "react-router-dom";
// import { func } from 'prop-types';
import './userTasks.css';

function mapStateToProps(state) {
    return {
        user: state.userReducer.user,
        tasks:state.tasksReducer.Tasks

    };
}

const mapDispatchToProps = (dispatch) => ({
    // getTasksByUserId: (user_id) => dispatch(actions.getTasksByUserId(user_id)),
    // addTask:(task)=>dispatch(actions.addTask(task)),
    deleteTask:(task_id)=>dispatch(actions.deleteTask(task_id)),
    // updateTask:(task)=>dispatch(actions.updateTask(task)),
    setTasks:(tasks)=>dispatch(actions.setTasks(tasks))
})

// e 1
export default connect(mapStateToProps, mapDispatchToProps)(function UserTasks(props) {
    const { tasks,user,deleteTask ,setTasks} = props;
    // const { user,getTasksByUserId,deleteTask } = props;
    const [newTask,setNewTask]=useState({_id: 0,userId:0,title: "",completed:false})
    const [flagNewTask,setFlagNewTask]=useState(false);
    const [show, setShow] = useState(false);
    
   function handleClose(){
    setShow(false);
    setFlagNewTask(false)
   }

   useEffect(function() {
      debugger
      taskCrud.getTasksByUserId(user._id)
      .then((data)=>{
        setTasks(data)
      }).catch((err)=>{alert("Sorry there is a problem on our site try later")})
      // getTasksByUserId(user._id);

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
     
      taskCrud.deleteTask(taskToDelete._id)
      .then((data)=>{
        deleteTask(taskToDelete._id);
      }).catch((err)=>{alert("Sorry there is a problem on our site try later")})
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
          
     {/* {tasks.map((task, index) => (
       <Card style={{width:"13rem", height:"10%", border: 'transparent',direction:'rtl',padding: '0.01rem'}}  key={index}>
       <Card.Header>Task {index}</Card.Header>
       <Card.Body className="card-body" style={{fontSize:"80%",height:"40%"}}>
       { task.completed?  <Card.Title className="card-title">task accomplished </Card.Title>
       :<Card.Title className="card-title">Perform me </Card.Title>}
         <Card.Text className="card-text">
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
      <Link to="/tasks">למשימות</Link> */}
          <div className="d"> 
     <div className="add">
      <Button id="bj" className="but" variant="secondary"onClick={addTask}>add new task</Button>
      <Link  to="/tasks">add existing task</Link></div>
     {tasks.map((task, index) => (
       <Card  key={index} >
       <Card.Header>Task {index+1}</Card.Header>
       <Card.Body className="card-body" style={{fontSize:"80%",height:"40%"}}>
       <Card.Text className="card-text">
         {task.title}
         </Card.Text>
       { task.completed?  <Card.Title className="card-title">task accomplished </Card.Title>
       :<Card.Title className="card-title">Perform me </Card.Title>}
         <Button  className="but" onClick={(e)=>deleteOneTask(e,index)}>delete me</Button>
         <Button  className="but" onClick={(e)=>editTask(e,index)}>edit me</Button>
       </Card.Body>
        </Card>

        ))}
        </div>
  
     
   <Modal overlayClassName="myoverlay" className="mymodal"  show={show} onHide={handleClose}>
  < Modal.Header className="n"  onClick={handleClose}><h3>x</h3></Modal.Header>
  
        <Modal.Body> {flagNewTask? <EditAndCreateTask newTask={newTask} {...props}></EditAndCreateTask>:""}</Modal.Body>

        <Modal.Footer>
          {/* <Button className="but" >
            Close
          </Button> */}
        </Modal.Footer>
      </Modal>
        </>
    );
})

