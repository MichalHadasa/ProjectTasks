import React, { useState } from 'react';
import { connect } from 'react-redux';
import './login.css';
import {
    BrowserRouter as Router,
    withRouter,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";
import {actions} from '../Store/actions'
import {compose} from "redux"; 


function mapStateToProps(state) {
    return {
        user: state.userReducer.user
     
    };
}

const mapDispatchToProps = (dispatch) => ({
    loginUser: (login_user) => dispatch(actions.loginUser(login_user))

})

// e 1
export default compose(withRouter,connect(mapStateToProps, mapDispatchToProps))(function Login(props) {
    const { loginUser,history } = props;
    const [userEmail,setUserEmail]=useState("");
    const [userPassword,setUserPassword]=useState("");
   function login(){
      debugger;
        loginUser({userEmail:userEmail,userPassword:userPassword});
        // history.push('/UserTasks');
    }
    function toRegister(){
        history.push('/register');

    }


    return (
       <>
                 
                     {/* <label>email</label>
           <input type="text"  onChange={(e)=>setUserEmail(e.target.value)}></input>
           <label>password</label>
           <input type="text"  onChange={(e)=>setUserPassword(e.target.value)}></input>
           <button onClick={login} >login</button>
           <button onClick={toRegister} >new user</button>
           <Link to="/UserTasks">לבית</Link>
           <Link to="/tasks">למשימות</Link> */}
             <Link to="/UserTasks">לבית</Link>
           <Link to="/tasks">למשימות</Link> 
               
           <div id="login">
     
        <div className="container">
            <div id="login-row" className="row justify-content-center align-items-center">
                <div id="login-column" className="col-md-6">
                    <div id="login-box" className="col-md-12">
                        <form id="login-form" className="form" action="" method="post">
                            <h3 className="text-center text-info">Login</h3>
                            <div className="form-group">
                                <label htmlFor="username" className="text-info">email:</label><br/>
                                <input type="text"  onChange={(e)=>setUserEmail(e.target.value)}></input>
                            </div>
                           
                            <div className="form-group">
                                <label htmlFor="password" className="text-info">Password</label><br/>
                                <input type="text"  onChange={(e)=>setUserPassword(e.target.value)}></input>
                            </div>
                            <div className="form-group">
                            <button className="btn btn-info btn-md" onClick={login} >login</button>
                            <button className="btn btn-info btn-md" onClick={toRegister} >new user</button>
                            </div>
                           
                
                        </form>
                        </div>
                        </div>
                        </div>
                        </div>
                        
               </div>
                 </> 
            
       
    );
})

