import { useState } from "react";
import { useLoaderData } from "react-router-dom";


const Users = () => {
    const loadedUsers = useLoaderData();
    const [users, setUsers] = useState(loadedUsers);

    const handleDelete =(_id)=>{
        // console.log(_id);
        fetch(`http://localhost:5000/users/${_id}`, {
            method: 'DELETE',
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.deletedCount>0){
            const remaining = users.filter(user => user._id !== _id);
            setUsers(remaining)
            }
        })
    }
    
    return (
        <div>
            <h1>Number of users : {loadedUsers.length} </h1>

            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Email</th>
        <th>Account Creation Time</th>
        <th>Last Logged In Time</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>


     
      {
        users.map((user,index)=><tr key={user._id}>
            <th>{index+1}</th>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.creationTime}</td>
            <td>{user.lastLoggedAt}</td>
            <td><button onClick={()=>handleDelete(user._id)} className="btn">X</button></td>
          </tr>)
      }

    </tbody>
  </table>
</div>
        </div>
    );
};

export default Users;