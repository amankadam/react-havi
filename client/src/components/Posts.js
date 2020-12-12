import React,{useState,useEffect,useContext} from 'react';
import PostItem from './PostItem';
import Message from './Message';
import {AuthContext} from '../Context/AuthContext';
import PostService from '../Services/PostService';

const Post=props=>{
  const [post,setPost]=useState({status:""});
  const [posts,setPosts]=useState([]);
  const [loading,setloading]=useState(true);
  const [message,setMessage]=useState(null);
  const authContext=useContext(AuthContext);

  useEffect(()=>{
    PostService.getPosts().then(data=>{
      setPosts(data.posts);
    })
  },[]);

 const onSubmit=e=>{
   e.preventDefault();
   PostService.createPost(post).then(data=>{
     const {message}=data;
     resetForm();
     if(message!="UnAuthorized"){

       PostService.getPosts().then(getData=>{
         setPosts(getData.posts);
         setMessage("Successfully Created.");
         setloading(false);
       });
     }else if(message=="UnAuthorized"){
       setMessage("Logged Out. Please Login Again");
       authContext.setUser({email:""});
       authContext.setIsAuthenticated(false);

       setloading(false);
     }else{
       setMessage(message);

       setloading(false);
     }

   });
 }

const onChange=e=>{
  setPost({status:e.target.value});
}

const resetForm=()=>{
  setPost({status:""});
}



  return(
    <div className='container'>
     <h3>Your Posts</h3>
    <ul className='li-group'>
    {  posts.map(p=>{
        return <PostItem key={p._id} status={p.status}/>
      })}
    </ul>
    <br/>
    <form onSubmit={onSubmit}>
      <label htmlFor="Post"><b>Enter Status</b></label>
      <input type="text" name="Post" value={post.status}
      onChange={onChange} className='form-control'
      placeholder='Enter Status' required/>
      <button className="btn btn-lg btn-dark btn-block"
      style={{marginTop:'20px',marginLeft:'40%'}}

      type="submit">Submit</button>
    </form>
    {message ? <Message message={message}/>:''}
    </div>
  )
}
export default Post;