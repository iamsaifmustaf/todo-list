import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu'
import Login from './login/Login'
import Signup from './signup/Signup'
import TodoList from './todo-list/TodoList'

import './App.css';

export default class App extends Component{

  componentWillUnmount(){
    this.onLogout();
  }

  onLogout(){
    localStorage.removeItem('token')
    localStorage.removeItem('username')
  }

  render() {
    return (

      <BrowserRouter>
        <Menu right>
          <li id="home" className="menu-item"><Link to={"/"}>Home</Link></li>
          <li id="events" className="menu-item"><Link to={"/login"}>Login</Link></li>
          <li id="signup" className="menu-item"><Link to={"/signup"}>Signup</Link></li>
          <li id="logout" className="menu-item" onClick={this.onLogout}><Link to={"/login"}>Logout</Link></li>
        </Menu>
        <Switch>
          <Route exact path="/" component={TodoList} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </BrowserRouter>
    )

  }


}
