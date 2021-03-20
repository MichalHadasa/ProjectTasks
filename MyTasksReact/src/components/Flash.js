import React from 'react';
import {
    withRouter
} from "react-router-dom";

export default withRouter(function Flash(props) {
    debugger;
    const { state } = props.location;
    if (state && state.flash) {
      return <p>{state.flash}</p>
    }
    return (props.children)
  });