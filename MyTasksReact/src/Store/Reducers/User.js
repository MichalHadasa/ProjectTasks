import produce from 'immer';
import createReducer from "./ReducerUtils";


const initialState = {
  user: {
    _id:0,
    firstName: "",
    lastName: "",
    email:"",
    password:""
  }
}

const users = {
  setUserFirstName(state, action) {
    debugger
    state.user.firstName = action.payload;
  },
  setUserLastName(state, action) {
    debugger
    state.user.lastName = action.payload;
  },
  setUserEmail(state, action) {
    state.user.email = action.payload;
  },
  setUserPassword(state, action) {
    state.user.password = action.payload;
  },
  setUser(state, action)
  {
    state.user = action.payload;
  }

};

export default produce((state, action) => createReducer(state, action, users), initialState);
