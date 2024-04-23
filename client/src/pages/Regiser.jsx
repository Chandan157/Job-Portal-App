import { useState } from "react";
import { Link } from "react-router-dom";
import InputForm from "../components/shared/InputForm";

const Regiser = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const[values,setValues]=useState({
  //   name:"",
  //   lastName:"",
  //   email:"",
  //   password:"",
  //   location:""
  // })

  // //handle inputs
  // const handleChange = (e) => {
  //   const value=e.target.value
  //   setValues({...values, [e.target.name]: value });
  // };

  //form function
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      console.log(name,lastName, email, password);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="form-container">
        <form className="card p-2" onSubmit={handleSubmit}>
          <img
            src="/assets/images/logo/logo.png"
            alt="logo"
            height={150}
            width={400}
          />
          <InputForm
            htmlFor="name"
            labelText={"Name"}
            type={"text"}
            value={name}
            handleChange={(e) => setName(e.target.value)}
            name="name"
          />
          <InputForm
            htmlFor="lastName"
            labelText={"Last Name"}
            type={"text"}
            value={lastName}
            handleChange={(e) => setLastName(e.target.value)}
            name="lastName"
          />
          <InputForm
            htmlFor="email"
            labelText={"Email"}
            type={"email"}
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
            name="email"
          />
          <InputForm
            htmlFor="password"
            labelText={"Password"}
            type={"text"}
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
            name="password"
          />

          <div className="d-flex justify-content-between">
            <p>
              Already Register <Link to="/login">Login</Link>
            </p>
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Regiser;
