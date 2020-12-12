import React,{useState,useEffect,useContext} from 'react';
import PostItem from './PostItem';
import Message from './Message';
import {AuthContext} from '../Context/AuthContext';
import PostService from '../Services/PostService';

const Post=props=>{

    const authContext=useContext(AuthContext);
  const {user}=useContext(AuthContext);
  const [post,setPost]=useState({status:"",firstName:user.firstName,lastName:user.lastName});
  const [posts,setPosts]=useState([]);
  const [loading,setloading]=useState(true);
  const [message,setMessage]=useState(null);

  useEffect(()=>{
    PostService.getPosts().then(data=>{
      setPosts(data.posts.reverse());
    });
setloading(false);
  },[]);

 const onSubmit=e=>{
   e.preventDefault();
   PostService.createPost(post).then(data=>{
     const {message}=data;
     resetForm();
     if(message!="UnAuthorized"){

       PostService.getPosts().then(getData=>{
         setPosts(getData.posts.reverse());
         setMessage("Successfully Created.");

       });
     }else if(message=="UnAuthorized"){
       setMessage("Logged Out. Please Login Again");
       authContext.setUser({email:""});
       authContext.setIsAuthenticated(false);

     }else{
       setMessage(message);

     }
   });
 }

const onChange=e=>{

  setPost({status:e.target.value,firstName:user.firstName,lastName:user.lastName});
}

const resetForm=()=>{
  setPost({status:""});
}



  return(
    <div className='container'>

        {message ? <Message message={message}/>:''}
    <form onSubmit={onSubmit}>
      <label htmlFor="Post"><b>Enter Status</b></label>
      <input type="text" name="Post" value={post.status}
      onChange={onChange} className='form-control'
      placeholder='Enter Status' required/>
      <button className="btn btn-lg btn-dark btn-block"
      style={{marginTop:'20px',marginLeft:'40%'}}

      type="submit">Post</button>
    </form>
    <hr/>
     <h3>All Posts</h3>
    <ul className='li-group'>
    { loading?<h4>Loading....</h4> :posts.map(p=>{
        return <PostItem key={p._id} status={p.status} name={p.firstName + " " +p.lastName}/>
      })}
    </ul>
    <br/>

    </div>
  )
}
export default Post;
