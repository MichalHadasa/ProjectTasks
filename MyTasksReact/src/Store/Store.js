import { createStore ,combineReducers,applyMiddleware} from 'redux';
import {loginUser,getList,registerUser,updateUser} from './Middlewares/crud'
import {addTask,getTasksByUserId,deleteTask,updateTask} from './Middlewares/crudTask';
import userReducer from './Reducers/User';
import tasksReducer from './Reducers/Task';


const reducer = combineReducers({userReducer,tasksReducer });

const store = createStore(reducer,applyMiddleware(loginUser,getList,registerUser,addTask,getTasksByUserId,deleteTask,updateTask,updateUser));
window.store = store;
export default store;