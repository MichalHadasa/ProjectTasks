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
import {compose} from "redux"; 

import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'


function mapStateToProps(state) {
    return {
        user: state.userReducer.user
     
    };
}



// e 1
export default compose(withRouter,connect(mapStateToProps, null))(function Navbar(props) {
    const { history ,user} = props;
   
    function toEdit(){
        history.push('/register/'+user._id);

    }
    function sighnOut(){
        console.log(sighnOut)
    }
    useEffect(function() {
        debugger
        console.log("hhh")}
        , []);


    return (
        <>
      
        <h1>My Tasks</h1>
      {user._id!=0?<div><h3>Hello {user.firstName}  {user.lastName}</h3>
      <DropdownButton id="dropdown-item-button" title="user">
      <Dropdown.Item as="button" onClick={toEdit}>Edit your details</Dropdown.Item>
      <Dropdown.Item as="button"onClick={sighnOut}>sighn Out</Dropdown.Item>
    </DropdownButton></div>:""}
      
  

               
        </>
    );
})

