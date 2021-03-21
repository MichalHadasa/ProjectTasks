
import axios from 'axios';
import fire from '../firebase';
class TaskCrud{
    addTask = (task) =>new Promise((resolve, reject)=> {
        debugger;
       
            axios.post(`http://localhost:4000/saveTask`,task , {
              headers: {
                authorization: `token ${ localStorage.getItem("token")}`
              }
            } )
            .then(res => {
              let task = res.data.task;
              resolve(task)
            }).catch(err=>{
               console.log(err);
               reject(err)
                
            })
    
    });
    getTasksByUserId = (user_id) => new Promise((resolve, reject)=> {
        debugger;
   
            axios.get(`http://localhost:4000/getTaskByUserId/${user_id}`, {
              headers: {
                authorization: `token ${ localStorage.getItem("token")}`
              }
            } )
            .then(res => {
              let tasks = res.data;
              resolve(tasks)
            }).catch(err=>{
               console.log(err);
               reject(err)
            })
    
    });
    deleteTask = (task_id) => new Promise((resolve, reject)=>  {
        debugger;
       
            axios.delete(`http://localhost:4000/deleteTask/${task_id}` , {
              headers: {
                authorization: `token ${ localStorage.getItem("token")}`
              }
            } )
            .then(res => {
                resolve(true)
            }).catch(err=>{
                reject(err)
                
            })
      
    });
   updateTask = (task) => new Promise((resolve, reject)=> {
        debugger;
            axios.put(`http://localhost:4000/updateTask/${task._id}`,task , {
              headers: {
                authorization: `token ${ localStorage.getItem("token")}`
              }
            }  )
            .then(res => {
              let task = res.data.task;
              resolve(task);
            }).catch(err=>{
                reject(err);    
            })
    
        
    });
    

}
export default new TaskCrud();