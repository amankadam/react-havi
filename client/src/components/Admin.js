import React,{useEffect,useState} from 'react';
import PostService from '../Services/PostService';
import AdminItem from './AdminItem';


const Admin=props=>{
  const [users,setUsers]=useState([]);
  const [loading,setLoading]=useState(true);


  useEffect(()=>{
    PostService.getUsers().then(data=>{
      setUsers(data.users);
      setLoading(false);
    });
  },[]);

  return(
    <div className="container">
    <h3>All Users</h3>
    {loading ? <h4>Loading...</h4>:
     users.map((u)=>{
       return <AdminItem name={u.firstName + " "+ u.lastName}/>
     })
    
    }
    </div>
  )
}
export default Admin;
