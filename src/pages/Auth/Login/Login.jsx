import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import Logo from "../../../components/Shared/Logo/Logo";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineEmail } from "react-icons/md";
import { GoLock } from "react-icons/go";
import { Link, useLocation, useNavigate } from "react-router";
import { TbCircleLetterC } from "react-icons/tb";
import toast from "react-hot-toast";

const Login = () => {
  const { loginUser, googleSignIn, loading, setLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    const { email, password } = data;

    loginUser(email, password)
      .then(() => {
        toast.success('Login successful!')
        navigate(from);
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err.message);
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(() => {
        toast.success('Login successful!')
        navigate("/");
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err.message);
      });
  };
  return (
    <div className="flex justify-center">
      <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl my-5">
        <div className="card-body">
          <div className="flex justify-center">
            <Logo />
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-semibold">Welcome Back</h3>
            <p className="text-accent text-lg">
              Login to continue to ClubSphere
            </p>
          </div>
          <button
            onClick={handleGoogleSignIn}
            className="btn border-2 bg-white border-primary mt-2 rounded-xl text-lg py-6 text-primary hover:text-white hover:bg-primary"
          >
            <FcGoogle size={20} />
            Continue with Google
          </button>
          <div className="divider mb-0">OR</div>
          <form onSubmit={handleSubmit(handleLogin)}>
            <fieldset className="fieldset text-lg ">
              <label>Email</label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="you@exampl.com"
                  className="input w-full pl-11 py-6 rounded-xl focus:border-0 outline-primary text-lg"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                />
                <MdOutlineEmail
                  size={24}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10"
                />
              </div>
              {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
              )}

              <label>Password</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Create a password"
                  className="input w-full pl-11 py-6 rounded-xl focus:border-0 outline-primary text-lg"
                  {...register("password", {
                    required: "Password is required",
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                      message:
                        "Password must be at least 6 characters with upper & lower case letters.",
                    },
                  })}
                />
                <GoLock
                  size={24}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10"
                />
              </div>
              {errors.password && (
                <span className="text-red-500">{errors.password.message}</span>
              )}

              <button
                type="submit"
                className="btn btn-primary text-white rounded-xl text-lg mt-4 py-6"
              >
                {loading ? (
                  <TbCircleLetterC size={32} className="animate-spin " />
                ) : (
                  "Log In"
                )}
              </button>
            </fieldset>
          </form>

          <p className="text-center text-lg text-accent">
            Don't have account?{" "}
            <Link to={"/register"} className="text-primary font-medium">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
