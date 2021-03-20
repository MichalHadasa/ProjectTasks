import produce from 'immer';
import createReducer from "./ReducerUtils";


const initialState = {
  Tasks:[
  //    {
  //   _id: 0,
  //   userId:0,
  //   title: "",
  //   completed:false
  // }
]
}

const users = {
  setTasks(state, action) {
    debugger
    state.Tasks = action.payload;
  },
  add(state, action) {
   
    debugger
    state.Tasks = [... state.Tasks, action.payload]
  },
  delete(state, action) {
    debugger
    let tasks=state.Tasks.filter(task => task._id !== action.payload) ;
    state.Tasks=tasks;

  }
  ,
  update(state, action) {
    debugger
   let tasks= state.Tasks.filter(task => task._id !== action.payload._id) ;
    state.Tasks = [... tasks, action.payload]
  }

};

export default produce((state, action) => createReducer(state, action, users), initialState);
