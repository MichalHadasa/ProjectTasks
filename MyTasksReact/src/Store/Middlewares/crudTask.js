import { actions } from '../actions';
import axios from 'axios';
export const addTask = ({ dispatch, getState }) => next => action => {
    debugger;
    if (action.type === 'ADD_TASK') {
        axios.post(`http://localhost:4000/saveTask`,action.payload , {
          headers: {
            authorization: `token ${ localStorage.getItem("token")}`
          }
        } )
        .then(res => {
          let task = res.data.task;
          dispatch(actions.add(task));
        }).catch(err=>{
           console.log(err);
            
        })

    }
    // remeber!!!!!!!!!!!
    return next(action);
};
export const getTasksByUserId = ({ dispatch, getState }) => next => action => {
    debugger;
    if (action.type === 'GET_TASKS_BY_USER_ID') {
        let userId=getState().userReducer.user._id;
        axios.get(`http://localhost:4000/getTaskByUserId/${userId}`, {
          headers: {
            authorization: `token ${ localStorage.getItem("token")}`
          }
        } )
        .then(res => {
          let tasks = res.data;
          dispatch(actions.setTasks(tasks));
        }).catch(err=>{
           console.log(err);
            
        })

    }
    // remeber!!!!!!!!!!!
    return next(action);
};
export const deleteTask = ({ dispatch, getState }) => next => action => {
    debugger;
    if (action.type === 'DELETE_TASK') {
        axios.delete(`http://localhost:4000/deleteTask/${action.payload}` , {
          headers: {
            authorization: `token ${ localStorage.getItem("token")}`
          }
        } )
        .then(res => {
          dispatch(actions.delete(action.payload));
        }).catch(err=>{
           console.log(err);
            
        })

    }
    // remeber!!!!!!!!!!!
    return next(action);
};
export const updateTask = ({ dispatch, getState }) => next => action => {
    debugger;
    if (action.type === 'UPDATE_TASK') {
        axios.put(`http://localhost:4000/updateTask/${action.payload._id}`,action.payload , {
          headers: {
            authorization: `token ${ localStorage.getItem("token")}`
          }
        }  )
        .then(res => {
          let task = res.data.task;
          dispatch(actions.update(task));
        }).catch(err=>{
           console.log(err);    
        })

    }
    // remeber!!!!!!!!!!!
    return next(action);
};
