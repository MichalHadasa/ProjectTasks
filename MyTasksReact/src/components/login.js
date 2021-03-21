import React, { useState } from 'react';
import { connect } from 'react-redux';
import './login.css';
import {
    withRouter,
  } from "react-router-dom";
import {actions} from '../Store/actions'
import {compose} from "redux"; 
import UserCrud from '../services/userCrud'
import Spinner from 'react-bootstrap/Spinner'

function mapStateToProps(state) {
    return {
        user: state.userReducer.user,
        
        
     
    };
}

const mapDispatchToProps = (dispatch) => ({
    // loginUser: (login_user) => dispatch(actions.loginUser(login_user)),
    setUser:(user)=>dispatch(actions.setUser(user))


})

// e 1
export default compose(withRouter,connect(mapStateToProps, mapDispatchToProps))(function Login(props) {
    const { history, setUser} = props;
    const [userEmail,setUserEmail]=useState("");
    const [userPassword,setUserPassword]=useState("");
    const [flagEmail,setFlagEmail]=useState(false)
   async function login(){
      debugger;
        UserCrud.loginPromiseUser({userEmail:userEmail,userPassword:userPassword})
        .then((data)=>{
            debugger
        let user =data;
        setUser(user)
        history.push('/tasks');
    })
        .catch((err)=>{
            debugger
            alert(err.messeg)
        })
    }
    function toRegister(){
        history.push('/register');

    }
    function forgetPassword1(){
        UserCrud.forgetPassword1({email:userEmail})
        .then(()=>{setFlagEmail(true)})
        .catch((err)=>alert("Sorry there is a problem on our site try later"))
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
             {/* <Link to="/UserTasks">לבית</Link>
           <Link to="/tasks">למשימות</Link>  */}
               
           <div id="login">
     
        <div className="container">
            <div id="login-row" className="row justify-content-center align-items-center">
                <div id="login-column" className="col-md-6">
                    <div id="login-box" className="col-md-12">
                        {/* <form id="login-form" className="form" > */}
                         
                            <div className="form-group">
                                <label htmlFor="username" className="text-info">email</label><br/>
                                <input type="text"  onChange={(e)=>setUserEmail(e.target.value)}></input>
                            </div>
                           
                            <div className="form-group">
                                <label htmlFor="password" className="text-info">Password</label><br/>
                                <input type="text"  onChange={(e)=>setUserPassword(e.target.value)}></input>
                            </div>
                            <div className="form-group">
                            <button className="btn btn-info btn-md" onClick={login} >login</button>
                            <button className="btn btn-info btn-md" onClick={toRegister} >new user</button>
                            {/* <button className="b" onClick={forgetPassword1} >forget password</button> */}
                            </div>
                            <div className="form-group">
                                {flagEmail?<p>In the next few minutes you will receive an email with the password</p>:""}
                            <button className="b" onClick={forgetPassword1} >forget password</button>
                            </div>

                        {/* </form> */}
                        </div>
                        </div>
                        </div>
                        </div>
                        
               </div>
                 </> 
            
       
    );
})

