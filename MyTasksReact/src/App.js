import React from 'react';
import { Provider } from 'react-redux';
import store from './Store/Store';
// import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import Login from './components/login';
import Register from './components/register';
import Tasks from './components/tasks' 
import Flash from './components/Flash'
import Test from './components/test';
import UserTasks from './components/userTasks'
import Navbar from './components/navbar';
import './App.css';

function App() {
  return (
    <Router>
    <Provider  store={store}>

    <div className="App">

    {/* <Flash> */}
    <Navbar/>
    <Switch>
                    <Route path="/login">
                        <Login  />
                    </Route>
                    <Route path="/test">
                        <Test  />
                    </Route>
                    <Route path="/register/:userId">
                        <Register/>
                    </Route>
                    <Route path="/register">
                        <Register/>
                    </Route>
                    <Route path="/tasks">
                        <Tasks />
                    </Route>
                    <Route path="/UserTasks">
                        <UserTasks />
                    </Route>
                    <Route path="/">
                        <Login />
                    </Route>
                   
                    
                </Switch>
                {/* </Flash> */}

      
    </div>
    {/* <link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
  integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
  crossorigin="anonymous"
/> */}
    </Provider>
    </Router>
    
  );
}

export default App;
{/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}