import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import {actions} from '../Store/actions'
import './login.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";

function mapStateToProps(state) {
    return {
        user: state.userReducer.user
     
    };
}

const mapDispatchToProps = (dispatch) => ({
    registerUser: (user) => dispatch(actions.registerUser(user)),
    updateUser:(user)=>dispatch(actions.updateUser(user))

})

// e 1
export default connect(mapStateToProps, mapDispatchToProps)(function Register(props) {
    const { registerUser,user,updateUser } = props;
    const [userFirstName,setUserFirstName]=useState("");
    const [userLastName,setUserLastName]=useState("");
    const [userEmail,setUserEmail]=useState("");
    const [userPassword,setUserPassword]=useState("");
    const {userId}=useParams()
    const [flagUpdateUser,setFlagUpdateUser]=useState(false)
  
    function save(){
        if(flagUpdateUser){     
            updateUser({_id:user._id,firstName:userFirstName,lastName:userLastName
                ,email:userEmail,password:userPassword})
        }
        else{
            registerUser({firstName:userFirstName,lastName:userLastName
                ,email:userEmail,password:userPassword});

        }

       
    }
    useEffect(()=>{
        debugger;
        if(userId){
            setUserFirstName(user.firstName)
            setUserLastName(user.lastName)
            setUserEmail(user.email)
            setUserPassword(user.password)
            setFlagUpdateUser(true)
        }
    },[])


    return (
        <>
       
      
           <div id="login">
     
     <div className="container">
         <div id="login-row" className="row justify-content-center align-items-center">
             <div id="login-column" className="col-md-6">
                 <div id="login-box" className="col-md-12">
                     <form id="login-form" className="form" action="" method="post">
                         <h3 className="text-center text-info">user</h3>
                         <div className="form-group">
                         <label>email   </label>
           {flagUpdateUser==false?<input type="text" value={userEmail} onChange={(e)=>setUserEmail(e.target.value)}></input>
           :<label>{userEmail}</label>}
                         </div>
                        
                         <div className="form-group">
                         <label>firstName   </label>
                        <input type="text" value={userFirstName}  onChange={(e)=>setUserFirstName(e.target.value)}></input>
                         </div>
                         <div className="form-group">
                         <label>lastName</label>
                         <input type="text" value={userLastName}  onChange={(e)=>setUserLastName(e.target.value)}></input>
                         </div>
                         <div className="form-group">
                         <label>password</label>
           <input type="text" value={userPassword}  onChange={(e)=>setUserPassword(e.target.value)}></input>
           </div>
                         <div className="form-group">
                         <button className="btn btn-info btn-md" onClick={save} >save</button>
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

