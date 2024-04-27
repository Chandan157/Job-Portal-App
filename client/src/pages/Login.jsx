import { useState } from "react";
import InputFrom from "../components/shared/InputForm";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { hideLoading, showLoading } from "../redux/features/AlertSlice";
import Spinner from "../components/shared/Spinner";
import { toast } from "react-toastify";
import { setUser } from "../redux/features/auth/AuthSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  //hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // redux state
  const { loading } = useSelector((state) => state.alerts);

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(showLoading());
      const { data } = await axios.post(`${API_BASE_URL}/api/v1/auth/login`, {
        email,
        password,
      });
      if (data.success) {
        dispatch(hideLoading());
        dispatch(setUser(data.user));
        localStorage.setItem("token", data.token);
        toast.success("Login SUccessfully ");
        navigate("/dashboard");
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Invalid Credintial please try again!");
      console.log(error);
    }
  };
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="form-container">
          <form className="card p-2" onSubmit={handleSubmit}>
            <img
              src="/assets/images/logo/logo.png"
              alt="logo"
              height={150}
              width={400}
            />

            <InputFrom
              htmlFor="email"
              labelText={"Email"}
              type={"email"}
              value={email}
              handleChange={(e) => setEmail(e.target.value)}
              name="email"
            />
            <InputFrom
              htmlFor="password"
              labelText={"Password"}
              type={"password"}
              value={password}
              handleChange={(e) => setPassword(e.target.value)}
              name="password"
            />

            <div className="d-flex justify-content-between">
              <p>
                Not a user <Link to="/register">Register Here!</Link>{" "}
              </p>
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
