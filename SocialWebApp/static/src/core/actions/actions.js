import axios from 'axios';
import {USER_LOGIN, USER_SIGNUP, USER_LOGOUT, NEW_POST, GET_POSTS, MY_USER_DETAIL,USER_BY_FILTER} from './type';

// login axios call
export const login = (phone,password) => dispatch =>{
    axios(
      
      {
        method: 'post',
        url: USER_LOGIN,
        data: {
          phone: phone,
          password:password 
        }
      }).then((res)=>{
        console.log(res+"hi thisssss is the response");
        dispatch({
            type:'USER_LOGIN',
            payload:[res.data.key,res.status]
        })
      }).catch(err=>{
        dispatch({
            type:'USER_LOGIN',
            payload:[err]
      })});

}


// signup axios call
export const signup = (phone,email,first_name,last_name,password) => dispatch =>{
    axios(
      {
        method: 'post',
        url: USER_SIGNUP,
        data: {
          phone: phone,
          email:email,
          first_name:first_name,
          last_name:last_name,
          password:password,
          profile:{"DOB":"22/12/1998"}
        }
      }).then((res)=>{
        console.log(res+"hi thisssss is the response");
        dispatch({
            type:'USER_SIGNUP',
            payload:[res.status]
        })
      }).catch(err=>{
        dispatch({
            type:'USER_SIGNUP',
            payload:[err]
      })});

}



//logout axios call
export const logout = (csrftokencookie) => dispatch =>{
  
  axios({
      method: 'post',
      url: USER_LOGOUT,
      headers: {
        // 'Authorization':"Token 1c50cb2c1ba47f2b568349689b670d63e6e5ee4d"
        'X-CSRFToken': csrftokencookie
      }, 
      data: {
        
      }
    }).then((res)=>{
      dispatch({
          type:'USER_LOGOUT',
          payload:[res] 
      })
    }).catch(err=>console.log(err));

}


// add new post axios call
// export const newPost = (image, csrftokencookie) => dispatch =>{
  
//   axios({
//       method: 'post',
//       url: MY_USER_DETAIL,
//       headers: {
//         // 'Authorization':"Token 1c50cb2c1ba47f2b568349689b670d63e6e5ee4d"
//         'X-CSRFToken': "gA2kcANH8J8CQ1C0yKJuzXroJfYue7CctzS6QtEwX67KwHtMGxEjFmGbE7b36MNC",
//         // 'Content-Type': 'form-data'
//         // 'content-type':'application/x-www-form-urlencoded',
//         // 'Content-Disposition': 'form-data; name="image"; filename='+image.name,
//         // 'Content-Type': 'form-data'
//         'content-type': "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
//         // 'Content-Disposition': 'form-data; name="image"; filename='+image.name,
//       }, 
//       data: {
//         image:image
//       }
//     }).then((res)=>{
//       dispatch({
//           type:'MY_USER_DETAIL',
//           payload:[res] 
//       })
//     }).catch(err=>console.log(err));

// }


// get Posts axios call
export const getPosts = () => dispatch =>{
  axios({
      method: 'get',
      url: GET_POSTS,
      headers: {
        // 'Authorization':"Token 0997d283d37828b28126eb7d3aa008c647816135"
      }
    }).then((res)=>{
      dispatch({
          type:'GET_POSTS',
          payload:res.data
      })
    }).catch(err=>console.log(err));    
}


//get myUserDetail axios call
export const myUserDetail = () => dispatch =>{
  axios({
      method: 'get',
      url: MY_USER_DETAIL,
      headers: {
        // 'Authorization':"Token 0997d283d37828b28126eb7d3aa008c647816135"
      }
    }).then((res)=>{
      dispatch({
          type:'MY_USER_DETAIL',
          payload:res.data
      })
    }).catch(err=>console.log(err));    
}

//get userByFilter axios call
export const userByFilter = (data,csrftokencookie) => dispatch =>{
  
  axios({
      method: 'post',
      url: USER_BY_FILTER,
      headers: {
        // 'Authorization':"Token 1c50cb2c1ba47f2b568349689b670d63e6e5ee4d"
        'X-CSRFToken': csrftokencookie
      }, 
      data: {
        data:data
      }
    }).then((res)=>{
      dispatch({
          type:'USER_BY_FILTER',
          payload:[res] 
      })
    }).catch(err=>console.log(err));

}







// export const getGP_List = () => dispatch =>{
//   axios({
//       method: 'get',
//       // url: GET_PROPERTY_LIST+"/?page_size="+limit,
//       url: GETGP,
//       headers: {
//         // 'Authorization':"Token 0997d283d37828b28126eb7d3aa008c647816135"
//       }
//     }).then((res)=>{
//       dispatch({
//           type:'GETGP',
//           payload:res.data
//       })
//     }).catch(err=>console.log(err));    
// }

