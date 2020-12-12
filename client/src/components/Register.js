import React,{useState,useRef,useEffect} from 'react';
import AuthService from '../Services/AuthService';
import Message from '../components/Message';
import {AuthContext} from '../Context/AuthContext';
import DatePicker from "react-datepicker";


const Register =props=>{
  const [user,setUser]=useState({email:"",password:"",firstName:"",lastName:"",dateOfBirth:"",gender:"",username:""});
  const [message,setMessage]=useState(null);
  let timeID=useRef(null);

  useEffect(()=>{
    return ()=>{
      clearTimeout(timeID);
    }
  },[]);


const onChange=e=>{
  setUser({...user,[e.target.name]:e.target.value});
}
const resetForm=()=>{

}
const onSubmit=e=>{
  e.preventDefault();
  AuthService.register(user).then(res=>{
    if(res.status==201){

      setMessage("Registered Successfully");
      resetForm();
      timeID=setTimeout(()=>{
        props.history.push('/login');
      },2000);

    }else{


        setMessage('User already Registered');
    }

  });

}

  return(
    <div class='container'>
        <form onSubmit={onSubmit}>
        <h3>Register</h3>
        {message ? <Message message={message} red />:""}

        <label htmlFor="email" className="sr-only"><b>Email</b></label>
        <input type="email" name="email" onChange={onChange} className="form-control"
        value={user.email}
        placeholder="Enter Email" required/>

        <label htmlFor="password" className="sr-only"><b>Password</b></label>
        <input type="password" name="password" onChange={onChange} className="form-control"
         value={user.password}
        placeholder="Enter Password" required/>

        <div class="row" style={{marginTop:'10px'}}>
        <div class="col">
        <label className="sr-only"><b>First Name</b></label>

         <input type="text" class="form-control" name="firstName" placeholder="First name" aria-label="First name"  onChange={onChange} required/>
         </div>
         <div class="col">
          <label className="sr-only"><b>Last Name</b></label>
      <input type="text" class="form-control" name="lastName" placeholder="Last name" aria-label="Last name"  onChange={onChange} required/>
    </div>
  </div>
  <div className='row'>
  <div className="col-md-6">
    <label for="gender" class="sr-only" ><b>Gender</b></label>
    <select id="inputState" name="gender" class="form-select" onChange={onChange} required>
      <option selected disabled>Choose...</option>
      <option>Male</option>
      <option>Female</option>
      <option>Other</option>
    </select>
  </div>

  <div className="col-md-6">

    <label for="example-date-input" class="sr-only"><b>Date Of Birth</b></label>

    <div class="col-10">
      <input className="form-control" type="date" name="dateOfBirth"  value={user.dateOfBirth} id="example-date-input"  onChange={onChange} required/>
    </div>
  </div>
</div>

        <button className='btn btn-lg btn-dark btn-block' type="submit"
        style={{marginTop:'20px',marginLeft:'40%'}}>
         Register
          </button>

        </form>
    </div>
  )
}
export default Register;
