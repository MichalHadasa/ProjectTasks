import { actions } from '../actions';
import axios from 'axios';
import fire from '../../firebase';
const createToken = () => {
  const user = fire.auth().currentUser;
  const token = user && ( user.getIdToken());
  const payloadHeader = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  return payloadHeader;
}
export const loginUser =  ({ dispatch, getState }) => next => action => {
    debugger;

    // const handleSubmit = (e) => {
    //   e.preventDefault();
    //   fire.auth().signInWithEmailAndPassword(email, password)
    //     .catch((error) => {
    //       console.error('Incorrect username or password');
    //     });
    //   }

      
 

    if (action.type === 'LOGIN_USER') {
      fire.auth().signInWithEmailAndPassword(action.payload.userEmail, action.payload.userPassword)
      .then(()=>{
        debugger
        const header =  createToken();
        axios.get(`http://localhost:4000/login/${action.payload.userEmail}/${action.payload.userPassword}`,header)
      .then(res => {
        debugger;
        console.log(res.data)
        let user = res.data.user;
        // localStorage.setItem("token", res.data.token );
        localStorage.setItem("token", res.data.token );
        dispatch(actions.setUser(user));
      })  
      })
        .catch((error) => {
          console.log('Incorrect username or password');
        });
        

    }
    // remeber!!!!!!!!!!!
    return next(action);
};
export const registerUser = ({ dispatch, getState }) => next => action => {
  debugger;
  if (action.type === 'REGISTER_USER') {
    fire.auth().createUserWithEmailAndPassword(action.payload.email, action.payload.password)
    .then(()=>{
      debugger;
      const header =  createToken();
      axios.post(`http://localhost:4000/register`,action.payload ,header)
      .then(res => {
        
        let user = res.data.user;
        // localStorage.setItem("token", res.data.token );
        localStorage.setItem("token", res.data.token );
        dispatch(actions.setUser(user));
      }).catch(err=>{
         console.log(err);
          
      })
      console.log('hiiii')})
        .catch((error) => {
          console.log('Incorrect username or password');
        });
      // const header =  createToken();
    // axios.post(`http://localhost:4000/register`,action.payload ,header)
    // .then(res => {
    //   let user = res.data.user;
    //   // localStorage.setItem("token", res.data.token );
    //   localStorage.setItem("token", res.data.token );
    //   dispatch(actions.setUser(user));
    // }).catch(err=>{
    //    console.log(err);
        
    // })

  }
  // remeber!!!!!!!!!!!
  return next(action);
};
export const getList = ({ dispatch, getState }) => next => action => {
  debugger;
  if (action.type === 'GET_LIST') {
    axios.get(`https://jsonplaceholder.typicode.com/todos`)
    .then(res => {
      console.log(res.data)
    }).catch(err=>{
       console.log(err);
        
    })

  }
  return next(action);
};
export const updateUser = ({ dispatch, getState }) => next => action => {
  debugger;
  if (action.type === 'UPDATE_USER') {
      axios.put(`http://localhost:4000/update/${action.payload._id}`,action.payload , {
        headers: {
          authorization: `token ${ localStorage.getItem("token")}`
        }
      }  )
      .then(res => {
        let user = res.data.user;
        dispatch(actions.setUser(user));
      }).catch(err=>{
         console.log(err);    
      })

  }
  // remeber!!!!!!!!!!!
  return next(action);
};
