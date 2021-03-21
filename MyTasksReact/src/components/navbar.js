import React, { useState ,useEffect} from 'react';
import { connect } from 'react-redux';
import {
    BrowserRouter as Router,
    withRouter,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";
import {actions} from '../Store/actions'
import { compose } from "redux";
import fire from '../firebase.js';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Navbar from 'react-bootstrap/Navbar'
import './navbar.css'

function mapStateToProps(state) {
    return {
        user: state.userReducer.user
     
    };
}

const mapDispatchToProps = (dispatch) => ({
    setUser: (user) => dispatch(actions.setUser(user)),
   

})

// e 1
export default compose(withRouter,connect(mapStateToProps, mapDispatchToProps))(function Navbar(props) {
    const { history ,user,setUser} = props;
   
    function toEdit(){
        history.push('/register/'+user._id);

    }
    function signOut(){
        fire.auth().signOut();
        localStorage.clear()
        setUser({
            _id:0,
            firstName: "",
            lastName: "",
            email:"",
            password:""
          })
    }
    useEffect(function() {
        debugger
        console.log("hhh")}
        , []);


    return (
        <>
      
    
    <div className="top-bar"><div style={{background:"#0f7be0"},{height: "45px"}, {color: "#fff"}, {fontWeight: "normal"}, {fontSize: "20px"} ,{width: "100%"},{ textAlign:"center"}, {padding:"0px"}}>
	<div className="warp" dir="rtl">
    
		<div className="welcome">
							{user._id!=0?<Link   title="user details" to={`/register/${user._id}`}> {user.firstName}  {user.lastName}
               
              </Link>:""}
              {user._id!=0?<Link   title="sign out" onClick={signOut}> sign Out </Link>:""}
              {/* {user._id!=0?<div>
      <DropdownButton id="dropdown-item-button" title="user">
      <Dropdown.Item as="button" onClick={toEdit}>Edit your details</Dropdown.Item>
      <Dropdown.Item as="button"onClick={signOut}>sign Out</Dropdown.Item>
    </DropdownButton></div>:""} */}
         
          </div>
          <h1>My Tasks</h1>
     

        </div>
      </div>
      </div>

               
        </>
    );
})


