import { useQuery } from "@tanstack/react-query";
// import useAuth from "../Hooks/useAuth";

const Users2 = () => {

    const {isPending, error, isError, data : users} = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/users/')
            return res.json();
        }
    })

    // const {users, setUsers} = useAuth();



    const handleDelete =(_id)=>{
        // console.log(_id);
        fetch(`http://localhost:5000/users/${_id}`, {
            method: 'DELETE',
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.deletedCount>0){
            // const remaining = users.filter(user => user._id !== _id);
            // setUsers(remaining)
            }
        })
    }

    if(isPending){
        return <span className="loading loading-infinity loading-lg"></span>
    }

    if(isError){
        console.log(error);
    }
    return (
        <div>
            <div>

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
        users?.map((user,index)=><tr key={user._id}>
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
        </div>
    );
};

export default Users2;