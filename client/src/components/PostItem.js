import React from 'react';
const PostItem=props=>{
  return(
//     <div class="alert alert-light" role="alert">
//   <h4 class="alert-heading">{props.name}</h4>
//   <p>{props.status}</p>
//   <hr/>
// </div>
<div className='shadow-sm card'>
<p className='status'>
{props.status}
</p>
<span>
<i>Posted By:-<b>{props.name}</b></i>
</span>

</div>
     // <li>{props.status} +{props.name}</li>
  )
}
export default PostItem;
