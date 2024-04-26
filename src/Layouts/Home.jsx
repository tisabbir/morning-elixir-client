import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const Home = () => {

  const loadedCoffee = useLoaderData();

  const [allCoffee, setAllCoffee] = useState(loadedCoffee);

  const handleDelete = (_id) => {
    console.log(_id)

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        fetch(`http://localhost:5000/coffee/${_id}`, {
          method: 'Delete', 
          // headers: {
          //   'content-type' : 'application/json'
          // },
          // body:JSON.stringify()
        })
        .then(res => res.json())
        .then(data => {
          console.log(data);

          // show the remaining in the ui
          const remainingCoffee = allCoffee.filter(coffee => coffee._id !== _id);
          setAllCoffee(remainingCoffee);

          if(data.deletedCount>0){
             Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
          }
        })

       

      }
    });
  }
  return (
    <div>
      <h1>Numbers of coffee : {allCoffee.length}</h1>
     <div className="grid grid-cols-3 gap-2">
     {
        allCoffee.map(coffee=><div key={coffee._id}><div className="card w-96 bg-base-100 shadow-xl">
        <figure><img src={coffee.photo} alt="Shoes" /></figure>
        <div className="flex justify-around btn-secondary mt-2"><button className="btn btn-error" onClick={()=>handleDelete(coffee._id)}>X</button>
        <button className="btn">View</button>
        <Link to={`/update/${coffee._id}`}><button className="btn">Edit</button></Link></div>
        <div className="card-body">
          <h2 className="card-title">
            {coffee.name}
            <div className="badge badge-secondary">{coffee.category}</div>
          </h2>
          <p>{coffee.details}</p>
          <div className="card-actions justify-end">
            <div className="badge badge-outline">{coffee.quantity}</div> 
            <div className="badge badge-outline">{coffee.taste}</div>
          </div>
        </div>
      </div></div>)
      }
     </div>
    </div>
  );
};

export default Home;
