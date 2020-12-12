import axios from 'axios';
export default {
  getPosts:()=>{
    return axios.get('/user/posts').then(res=>{
      console.log(res);
      if(res.status!==401){
        return res.data;
      }else{
        return {message:"UnAuthorized"}
      }
    }).catch((e)=>{
        return {message:"UnAuthorized"}
    });
},
 createPost: post=>{
   return axios({
     url:'/user/post',
     method:"post",
     data:JSON.stringify(post),
     headers:{
       'Content-Type':'application/json'
     }
   }).then(res=>{
     console.log(res);
     if(res.status!==401){
       return res.data;
     }else{
       return {message:"UnAuthorized"}
     }
   }).catch((e)=>{
       return {message:"UnAuthorized"}
   });
 }
}
