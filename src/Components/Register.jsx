import { Link } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import axios from "axios";

const Register = () => {

  const {createUserWithEmail} = useAuth();

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(name, email, password);
    createUserWithEmail(email, password)
    .then(res => {
      console.log('user created ',res.user)
      //new user has been created...
      const creationTime = res?.user?.metadata?.creationTime;

      const user = {name, email, password, creationTime};
      //using axios data post
      axios.post('http://localhost:5000/users/', user)
      .then(data => {
        if(data.data.insertedId){
          console.log('Data added to the userDB',data.data);
        }
      })


      // using fetch
    //   fetch('http://localhost:5000/users/', {
    //     method:"POST",
    //     headers:{
    //       'content-type':"application/json"
    //     },
    //     body: JSON.stringify(user)
    //   })
    //   .then(res => res.json())
    //   .then(data=>{
    //     console.log('user registered',data);
    //     if(data.insertedId){
    //       alert('User added in the data base')
    //     }
    //   })
    // })
    // .catch(err=>{
    //   console.log(err);
    })
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col gap-6 ">
        <div className="text-center">
          <h1 className="text-5xl font-bold">Register now!</h1>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleRegister} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                name="name"
                type="text"
                placeholder="name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                name="password"
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Register</button>
            </div>
          </form>
          <p className="text-center mb-4">
            Already have an account? Please{" "}
            <Link className="text-violet-700 " to={"/login"}>
              Login
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
