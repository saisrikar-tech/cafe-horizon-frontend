import { Dialog } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearLoginError, closeLoginDialog } from "./store/LoginSlice"; // ← all from LoginSlice
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./LoginDialog.css";

function LoginDialog() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isLoggedIn, user, isLoginDialogOpen } = useSelector(
    (state) => state.userLogin // ← single slice for everything
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Auto-close and toast on successful login
  useEffect(() => {
    if (isLoggedIn && user) {
      toast.success(`Welcome ${user.name}!`);
      reset();
      dispatch(closeLoginDialog());
    }
  }, [isLoggedIn, user]);

  // Show error toast
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearLoginError());
    }
  }, [error, dispatch]);

  const onSubmit = (data) => {
    dispatch(loginUser({ ...data, email: data.email.toLowerCase() }));
  };

  const handleRegisterClick = () => {
    dispatch(closeLoginDialog());
    navigate("/register");
  };

  return (
    <Dialog open={isLoginDialogOpen} onClose={() => dispatch(closeLoginDialog())} className="ld-overlay">

      {/* Backdrop */}
      <div className="ld-backdrop" aria-hidden="true" />

      {/* Panel */}
      <div className="ld-wrapper">
        <Dialog.Panel className="ld-panel">

          {/* Close button */}
          <button className="ld-close" onClick={() => dispatch(closeLoginDialog())} aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Logo */}
          <div className="ld-logo">
            <img src="/logo-cafe-white.jpg" alt="Cafe Horizon" />
          </div>

          <Dialog.Title className="ld-title">Sign in to your account</Dialog.Title>

          <form onSubmit={handleSubmit(onSubmit)} className="ld-form">
            <div className="ld-field">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && <p className="ld-error">{errors.email.message}</p>}
            </div>

            <div className="ld-field">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && <p className="ld-error">{errors.password.message}</p>}
            </div>

            <button type="submit" className="ld-btn" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="ld-redirect">
            New user?{" "}
            <span className="ld-link" onClick={handleRegisterClick}>
              Register
            </span>
          </p>

        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default LoginDialog;