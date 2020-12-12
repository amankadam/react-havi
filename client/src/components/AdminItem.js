import React from 'react';

const AdminItem=props=>{
  return(
    <tr>
     <th scope="row">{props.id}</th>
     <td>{props.firstName}</td>
     <td>{props.lastName}</td>
     <td>{props.posts}</td>
   </tr>
  )
}
export default AdminItem;
