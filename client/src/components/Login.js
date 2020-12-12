import React,{useState,useContext} from 'react';
import AuthService from '../Services/AuthService';
import Message from '../components/Message';
import {AuthContext} from '../Context/AuthContext';


const Login =props=>{
  const [user,setUser]=useState({username:"",password:""});
  const [message,setMessage]=useState(null);
  const authContext=useContext(AuthContext);

const onChange=e=>{
  e.preventDefault();
  setUser({...user,[e.target.name]:e.target.value});

}
const onSubmit=e=>{
  e.preventDefault();
  AuthService.login(user).then(data=>{
    console.log('hy');
    console.log(data);
    const {isAuthenticated,user}=data;
    console.log(data);
    if(isAuthenticated){
      console.log('lggdein');
      authContext.setUser(user);
      authContext.setIsAuthenticated(isAuthenticated);
      props.history.push('/');
  }else
  setMessage('Email or Password is incorrect');
  });

}

  return(
    <div class='container'>
        <form onSubmit={onSubmit}>
        <h3>Sign In</h3>
        {message ? <Message message={message} red />:""}

        <label htmlFor="email" className="sr-only"><b>Email</b></label>

        <input type="text" name="username" onChange={onChange} className="form-control"
        placeholder="Enter Email" required/>

        <label htmlFor="password" className="sr-only"><b>Password</b></label>

        <input type="password" name="password" onChange={onChange} className="form-control"
        placeholder="Enter Password" required/>

        <button className='btn btn-lg btn-dark btn-block' type="submit"
           style={{marginTop:'20px',marginLeft:'40%'}}
        > Log In </button>

        </form>
    </div>
  )
}
export default Login;;
