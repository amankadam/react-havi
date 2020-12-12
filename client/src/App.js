import React,{useContext} from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Posts from './components/Posts';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import{AuthContext} from './Context/AuthContext';


function App() {
  const {user,setUser,isAuthenticated,setIsAuthenticated}=useContext(AuthContext);
  console.log(user);
  console.log(isAuthenticated);
  return (
      <Router>
       <Navbar/>
       <Route exact path='/' component={isAuthenticated?Posts:Login}/>
       <Route exact path='/login' component={Login}/>
       <Route exact path='/register' component={Register}/>

      </Router>
  );
}

export default App;
