import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputForm from "../components/shared/InputForm";
import { useDispatch ,useSelector} from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";
import Spinner from "../components/shared/Spinner";

const Regiser = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

  //redux state
  const {loading}=useSelector(state=>state.alerts)
  //hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name || !lastName || !email || !password) {
        return alert("Please provide all fields");
      }
      dispatch(showLoading());
      const { data } = await axios.post(`${API_BASE_URL}/api/v1/auth/register`, {
        name,
        lastName,
        email,
        password,
      });
      dispatch(hideLoading());
      if (data.success) {
        alert("Successfully registered");
        navigate("/dashboard");
      }
    } catch (error) {
      dispatch(hideLoading());
      alert("Please try again!");
      console.log(error);
    }
  };
  return (
    <>
      {loading?(<Spinner/>):(
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
      )}
    </>
  );
};

export default Regiser;
