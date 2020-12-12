import React,{useContext} from 'react';
import {Link} from 'react-router-dom';
import AuthService from '../Services/AuthService';
import {AuthContext} from '../Context/AuthContext';


const Navbar= props=>{
  const {isAuthenticated,user,setIsAuthenticated,setUser}=useContext(AuthContext);
  const onCLickLogoutHandler=()=>{
    AuthService.logout().then(data=>{
      if(data.success){
        setUser(data.user);
        setIsAuthenticated(false);
      }

    });
  }
  const unauthenticatedNavBar=()=>{
    return(
      <>
        <Link to='/login' style={{textDecoration:'none'}}>
          <li className='nav-item nav-link' style={{color:'white'}}s>Login</li>
        </Link>

         <Link to='/register' style={{textDecoration:'none'}}>
           <li className='nav-item nav-link' style={{color:'white'}}>Register</li>
         </Link>
      </>
    )
  }
  const authenticatedNavBar=()=>{
    return(
      <>
       <Link to='/' style={{textDecoration:'none'}}>
         <li className='nav-item nav-link' style={{color:'white'}}>Home</li>
       </Link>

       <Link to='/admin' style={{textDecoration:'none'}}>
         <li className='nav-item nav-link' style={{color:'white'}}>Admin</li>
       </Link>
       <button style={{color:'white'}} type="button" className="btn btn-link nav-item nav-link" onClick={onCLickLogoutHandler}>
       Logout
       </button>
      </>
    )
  }
  return(
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
             <Link to="/" style={{textDecoration:'none'}}>
                 <div className="navbar-brand" style={{color:'white'}}>Havi</div>
             </Link>
             <div className="collapse navbar-collapse" id="navbarText" >
                 <ul className="navbar-nav mr-auto" >
                     { !isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}
                 </ul>
             </div>
         </nav>
  )
}
export default Navbar;
