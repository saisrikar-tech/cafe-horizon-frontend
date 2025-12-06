import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { loginUser, clearLoginError } from "./store/LoginSlice";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const dispatch = useDispatch();
  const { loading, error, isLoggedIn, user } = useSelector(
    (state) => state.userLogin
  );
  const navigate=useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Handle form submit
  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  // Success toast
  useEffect(() => {
    if (isLoggedIn && user) {
      toast.success(`Welcome ${user.name} 👋`);
      reset();
      navigate("/");
    }
  }, [isLoggedIn, user, reset]);

  // Error toast
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearLoginError());
    }
  }, [error, dispatch]);

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <input
            type="email"
            placeholder="Enter your email"
            className="login-input"
            {...register("email", { required: "Email is required" })}
          />
          <p className="error-text">{errors.email?.message}</p>

          {/* Password */}
          <input
            type="password"
            placeholder="Enter your password"
            className="login-input"
            {...register("password", { required: "Password is required" })}
          />
          <p className="error-text">{errors.password?.message}</p>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="redirect-text">
          New user?{" "}
          <NavLink to="/register" className="redirect-link">
            Register
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Login;
