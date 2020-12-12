import axios from 'axios';

export default{
  login:user=>{
    return axios({
               url:'/user/login',
                method : "post",
                data : JSON.stringify(user),
                headers : {
                    'Content-Type' : 'application/json'
                }
            }).then(res => {
                if(res.status !== 401)
                    return res.data;
                else
                    return { isAuthenticated : false, user : {username : "",role : ""}};
            }).catch((e)=>{
              return {isAuthenticated:false,user:{firstName:"",lastName:"",email:""}};

              console.log(e);
            });
        },
  register:user=>{
    return axios({
      url:'/user/register',
      method:"post",
      data:JSON.stringify(user),
      headers:{
        'Content-Type' : 'application/json'
      }
    }).then(res=>res).catch((e)=>{
      return {isAuthenticated:false,user:{firstName:"",lastName:"",email:""}};

    });
  },
  logout:()=>{
    return fetch('/user/logout').then(res=>res.json()).then(data=>data);
  },

  isAuthenticated:()=>{
    return axios.get('/user/authenticated').then(res=>{
      console.log(res.status);
      console.log('hello');
      if(res.status!==401)
        return res.data;
        else {
           return {isAuthenticated:false,user:{firstName:"",lastName:"",email:""}};

        }
    }).catch((e)=>{
      return {isAuthenticated:false,user:{firstName:"",lastName:"",email:""}};

    });

  }
}
