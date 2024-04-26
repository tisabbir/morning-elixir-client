import { Link } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { data } from "autoprefixer";

const Login = () => {
  const {signInWithEmail} = useAuth()
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    signInWithEmail(email, password)
    .then(result => {
    console.log(result.user);

    const user = {
      email,
      lastLoggedAt : result?.user?.metadata?.lastSignInTime,
    }

    // update last logged at  in the database
    fetch('http://localhost:5000/users/', {
      method:"PATCH",
      headers:{
        'content-type' : "application/json"
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
    })

    })
    .catch(err => {
      console.log(err);
    })


  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col gap-6 ">
        <div className="text-center">
          <h1 className="text-5xl font-bold">Login now!</h1>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleLogin} className="card-body">
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
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
          <p className="text-center mb-4">
            New Here? Please{" "}
            <Link className="text-violet-700 " to={"/register"}>
              Register
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
