import React,{useEffect,useState} from 'react';
import PostService from '../Services/PostService';
import AdminItem from './AdminItem';

const renderUsers=(users)=>{
  return (
    <table className="table">  <thead>
  <tr>
    <th scope="col">UserId</th>
    <th scope="col">First</th>
    <th scope="col">Last</th>
    <th scope="col">Posts</th>
  </tr>
  </thead>
  <tbody>  {users.map((u)=>{
  return <AdminItem firstName={u.firstName} lastName={u.lastName}
  id={u._id} posts={u.posts.length} />
})}</tbody>
  </table>
)};

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
    {loading ? <h4>Loading...</h4>:renderUsers(users)

    }
    </div>
  )
}
export default Admin;
