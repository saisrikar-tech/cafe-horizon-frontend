import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearRegisterState } from "./store/RegisterSlice";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import "./Registration.css";
import Swal from "sweetalert2"; 

const Registration = () => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.register);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm();
  const navigate = useNavigate();

  // Clear registration state on component unmount  
  const password = watch("password", "");

  const onSubmit = (data) => {
      // Convert email to lowercase
  const formattedData = {
    ...data,
    email: data.email.toLowerCase()
  };
    dispatch(registerUser(formattedData));
  };

  // Success toast
useEffect(() => {
  if (success) {
    Swal.fire({
      title: "Success!",
      text: "Registration successful!",
      icon: "success",
      confirmButtonText: "Go to Login",
      showCancelButton: true,
      cancelButtonText: "Go to Home",
    }).then((result) => {

      if (result.isConfirmed) {
        navigate("/login");
      } else {
        navigate("/");
      }

      dispatch(clearRegisterState()); // correct reset

    });
  }
}, [success, navigate, dispatch]);
  // Error toast
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="registration-container">
      <h2>Registration Sign Up:</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Row: Name + Email */}
        <div className="form-row">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              {...register("name", {
                required: "Name is required",
                minLength: { value: 3, message: "Minimum 3 characters" }
              })}
            />
            <p className="error-text">{errors.name?.message}</p>
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email"
                }
              })}
            />
            <p className="error-text">{errors.email?.message}</p>
          </div>
        </div>

        {/* Row: Phone + DOB */}
        <div className="form-row">
          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              {...register("phone", {
                required: "Phone is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Enter 10 digit phone number"
                }
              })}
            />
            <p className="error-text">{errors.phone?.message}</p>
          </div>

          <div className="form-group">
            <label>Date of Birth</label>
            <input
              type="date"
              {...register("DOB", { required: "DOB is required" })}
            />
            <p className="error-text">{errors.DOB?.message}</p>
          </div>
        </div>

        {/* Gender */}
        <div className="form-group">
          <label>Gender</label>
          <div className="gender-options">
            <label>
              <input type="radio" value="Male" {...register("gender", { required: "Select gender" })} /> Male
            </label>
            <label>
              <input type="radio" value="Female" {...register("gender", { required: "Select gender" })} /> Female
            </label>
            <label>
              <input type="radio" value="Other" {...register("gender", { required: "Select gender" })} /> Other
            </label>
          </div>
          <p className="error-text">{errors.gender?.message}</p>
        </div>

        {/* Row: Password + Confirm Password */}
        <div className="form-row">
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" }
              })}
            />
            <p className="error-text">{errors.password?.message}</p>
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Confirm password",
                validate: (value) =>
                  value === password || "Passwords do not match"
              })}
            />
            <p className="error-text">{errors.confirmPassword?.message}</p>
          </div>
        </div>
         {/* Address */}
        <div className="form-group">
          <label>Address</label>
          <textarea
            rows={3}
            {...register("address", {
              required: "Address is required",
              minLength: { value: 10, message: "Minimum 10 characters" },
              maxLength: { value: 200, message: "Maximum 200 characters" }
            })}
          />
          <p className="error-text">{errors.address?.message}</p>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        <div className="signin-text">
          Already registered?{" "}
          <NavLink to="/login" className="signin-link">
            Sign In
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default Registration;
